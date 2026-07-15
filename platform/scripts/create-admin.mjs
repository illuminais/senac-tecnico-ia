#!/usr/bin/env node
/**
 * create-admin.mjs
 * Gera (e opcionalmente aplica) o INSERT SQL do primeiro admin em admin_users.
 * O hash é PBKDF2-HMAC-SHA256 (100.000 iterações), formato compatível com
 * platform/worker/src/index.ts: pbkdf2$<iteracoes>$<saltHex>$<hashHex>
 *
 * Uso:
 *   node platform/scripts/create-admin.mjs --username leo --email voce@exemplo.com --password "sua-senha"
 *   node platform/scripts/create-admin.mjs --username leo --email voce@exemplo.com --password "sua-senha" --execute --local
 *   node platform/scripts/create-admin.mjs --username leo --email voce@exemplo.com --password "sua-senha" --execute --remote
 *
 * Sem --execute, só imprime o SQL e o comando wrangler para você rodar manualmente.
 */

import { execFileSync } from 'child_process'
import { randomUUID } from 'crypto'
import { hashPassword } from './lib/password-hash.mjs'

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = { execute: args.includes('--execute'), remote: args.includes('--remote') }
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--username') opts.username = args[++i]
    if (args[i] === '--email') opts.email = args[++i]
    if (args[i] === '--password') opts.password = args[++i]
  }
  return opts
}

const opts = parseArgs()

if (!opts.username || !opts.email || !opts.password) {
  console.error('Uso: node platform/scripts/create-admin.mjs --username <user> --email <email> --password <senha> [--execute --local|--remote]')
  process.exit(1)
}

if (opts.password.length < 8) {
  console.error('A senha precisa ter ao menos 8 caracteres.')
  process.exit(1)
}

const id = randomUUID()
const passwordHash = hashPassword(opts.password)

const sql = `INSERT INTO admin_users (id, username, email, password_hash) VALUES ('${id}', '${opts.username}', '${opts.email}', '${passwordHash}') ON CONFLICT (username) DO UPDATE SET email = excluded.email, password_hash = excluded.password_hash;`

console.log('\nSQL gerado:\n')
console.log(sql)

if (opts.execute) {
  const flag = opts.remote ? '--remote' : '--local'
  console.log(`\nExecutando via wrangler d1 execute (${flag})...\n`)
  // execFileSync (sem shell) — o SQL tem `$` (formato pbkdf2$iter$salt$hash), que
  // um shell interpretaria como expansão de variável se isso passasse por
  // execSync com uma string ("pbkdf2$100000$..." vira "pbkdf2000000..." — foi
  // exatamente esse bug que corrompeu o hash gravado em produção antes.
  execFileSync('npx', ['wrangler', 'd1', 'execute', 'lms-progress', flag, '--command', sql], {
    cwd: new URL('..', import.meta.url).pathname,
    stdio: 'inherit',
  })
} else {
  console.log('\nPara aplicar, rode um dos comandos (a partir de platform/):\n')
  console.log(`  npx wrangler d1 execute lms-progress --local --command "${sql}"`)
  console.log(`  npx wrangler d1 execute lms-progress --remote --command "${sql}"   # produção`)
  console.log('\nOu re-rode este script com --execute --local ou --execute --remote.')
}
