#!/usr/bin/env node
/**
 * reset-admin-password.mjs
 * "Break-glass" — reseta a senha de um admin já existente direto no D1, sem
 * passar pelo fluxo de email (POST /api/auth/forgot-password). Útil quando
 * você tem acesso via wrangler mas esqueceu a senha (ou o RESEND_API_KEY
 * ainda não está configurado). Busca por EMAIL (não por username — é o que
 * você mais provavelmente lembra, e é UNIQUE na tabela admin_users).
 *
 * Uso:
 *   node platform/scripts/reset-admin-password.mjs --email voce@exemplo.com --new-password "nova-senha"
 *   node platform/scripts/reset-admin-password.mjs --email voce@exemplo.com --new-password "nova-senha" --execute --local
 *   node platform/scripts/reset-admin-password.mjs --email voce@exemplo.com --new-password "nova-senha" --execute --remote
 *
 * Sem --execute, só imprime o SQL e os comandos wrangler pra você rodar manualmente.
 * Também invalida qualquer token de reset por email pendente daquele admin
 * (mesma lógica de handleResetPassword no Worker), pra não deixar um link
 * antigo ainda válido depois do reset manual.
 */

import { execFileSync } from 'child_process'
import { hashPassword } from './lib/password-hash.mjs'

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = { execute: args.includes('--execute'), remote: args.includes('--remote') }
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--email') opts.email = args[++i]
    if (args[i] === '--new-password') opts.newPassword = args[++i]
  }
  return opts
}

const opts = parseArgs()

if (!opts.email || !opts.newPassword) {
  console.error('Uso: node platform/scripts/reset-admin-password.mjs --email <email> --new-password <senha> [--execute --local|--remote]')
  process.exit(1)
}

if (opts.newPassword.length < 8) {
  console.error('A senha precisa ter ao menos 8 caracteres.')
  process.exit(1)
}

const passwordHash = hashPassword(opts.newPassword)
const emailEscaped = opts.email.replace(/'/g, "''")

const statements = [
  `UPDATE admin_users SET password_hash = '${passwordHash}' WHERE email = '${emailEscaped}';`,
  `UPDATE password_reset_tokens SET used = 1 WHERE admin_user_id = (SELECT id FROM admin_users WHERE email = '${emailEscaped}') AND used = 0;`,
]

console.log('\nSQL gerado:\n')
statements.forEach(s => console.log(s))

if (opts.execute) {
  const flag = opts.remote ? '--remote' : '--local'
  console.log(`\nExecutando via wrangler d1 execute (${flag})...\n`)
  // execFileSync (sem shell) — o hash tem `$` (pbkdf2$iter$salt$hash), que um
  // shell expandiria como variável dentro de aspas duplas (foi esse bug que
  // corrompeu a senha em produção da primeira vez — "$100000$..." virava
  // "000000..." silenciosamente, sem erro nenhum).
  for (const sql of statements) {
    execFileSync('npx', ['wrangler', 'd1', 'execute', 'lms-progress', flag, '--command', sql], {
      cwd: new URL('..', import.meta.url).pathname,
      stdio: 'inherit',
    })
  }
  console.log(`\nSe nenhuma linha foi afetada no primeiro UPDATE, o email '${opts.email}' não existe em admin_users — confira com:`)
  console.log(`  npx wrangler d1 execute lms-progress ${flag} --command "SELECT id, username, email FROM admin_users"`)
} else {
  console.log('\nPara aplicar, rode um dos comandos (a partir de platform/), um por linha:\n')
  for (const sql of statements) {
    console.log(`  npx wrangler d1 execute lms-progress --local --command "${sql}"`)
  }
  console.log('  # (troque --local por --remote pra produção)')
  console.log('\nOu re-rode este script com --execute --local ou --execute --remote.')
  console.log(`\nPra descobrir seu username/email cadastrado, se não lembrar nem o email:`)
  console.log(`  npx wrangler d1 execute lms-progress --remote --command "SELECT id, username, email FROM admin_users"`)
}
