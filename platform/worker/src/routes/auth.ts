/**
 * Login/senha/OAuth (admin + aluno). Movido de platform/worker/src/index.ts
 * (spec 04-worker-arquitetura-modular, T6).
 */

import type { Env, AdminUserRow } from '../types'
import { isAllowedStudentEmail as isAllowedStudentEmailPure } from '../../../shared/pure'
import { jsonResponse } from '../lib/http'
import { signJwt } from '../lib/jwt'
import { hashPassword, verifyPassword, sha256Hex } from '../lib/crypto'
import { adminJwt, isAllowedOrigin, isForgotPasswordAllowed } from '../lib/auth'
import { sendPasswordResetEmail } from '../lib/email'

export async function handleLogin(request: Request, env: Env): Promise<Response> {
  let body: { username?: string; password?: string }
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  const { username, password } = body
  if (!username || !password) return jsonResponse({ error: 'Missing credentials' }, 400)

  const admin = await env.DB.prepare(
    `SELECT id, username, email, password_hash, google_sub FROM admin_users WHERE username = ? OR email = ?`
  ).bind(username, username).first<AdminUserRow>()

  if (!admin || !(await verifyPassword(password, admin.password_hash))) {
    return jsonResponse({ error: 'Invalid credentials' }, 401)
  }

  const token = await adminJwt(admin.id, admin.username, env.JWT_SECRET ?? '')
  return jsonResponse({ token })
}

export async function handleForgotPassword(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  let body: { email?: string; resetUrlBase?: string }
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  const { email, resetUrlBase } = body
  if (!email || !resetUrlBase) return jsonResponse({ error: 'Missing email or resetUrlBase' }, 400)

  let origin: string
  try { origin = new URL(resetUrlBase).origin } catch { return jsonResponse({ error: 'Invalid resetUrlBase' }, 400) }
  if (!isAllowedOrigin(origin, env)) return jsonResponse({ error: 'Origin not allowed' }, 400)

  const admin = await env.DB.prepare(
    `SELECT id, username, email FROM admin_users WHERE email = ?`
  ).bind(email).first<AdminUserRow>()

  // Roda mesmo quando o email não existe, para não criar uma checagem extra que
  // só acontece se a conta existir (evitaria virar mais um sinal de timing).
  const allowed = await isForgotPasswordAllowed(email, env)

  // A "reserva" da tentativa (INSERT em password_reset_attempts) precisa
  // acontecer aqui, síncrona e com await, ANTES do return — simétrica entre
  // email existente/inexistente (depende só do histórico de tentativas do
  // endereço, não de o admin existir). Se isso fosse adiado para dentro do
  // ctx.waitUntil (depois da resposta já enviada), requisições concorrentes
  // pro mesmo email todas leriam o mesmo estado "nenhuma tentativa ainda" em
  // isForgotPasswordAllowed e todas passariam no rate limit — o limite ficaria
  // trivialmente burlável com concorrência. Gravando aqui, a janela de corrida
  // cai de "duração de uma chamada de rede externa" (fetch pro Resend) para
  // "duração de um INSERT local no D1".
  if (allowed) {
    await env.DB.prepare(`
      INSERT INTO password_reset_attempts (id, email)
      VALUES (?, ?)
    `).bind(crypto.randomUUID(), email).run()
  }

  // Sempre responde ok imediatamente, sem esperar o envio de fato — não revela se
  // o email existe (evita enumeração de contas) nem se a tentativa foi barrada
  // pelo rate limit (mesma resposta e mesma latência nos dois casos). Só o que é
  // lento e só faz sentido quando a conta existe de fato (gerar token, gravar em
  // password_reset_tokens, e o fetch pro Resend) roda em background via
  // ctx.waitUntil, para que ele NUNCA atrase a resposta ao client — do contrário,
  // o branch "email existe" ficaria mensuravelmente mais lento que "não
  // existe/rate limited", vazando a existência da conta por timing.
  if (admin && allowed) {
    ctx.waitUntil(sendPasswordResetEmail(env, admin, resetUrlBase))
  }

  return jsonResponse({ ok: true })
}

export async function handleResetPassword(request: Request, env: Env): Promise<Response> {
  let body: { token?: string; newPassword?: string }
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  const { token, newPassword } = body
  if (!token || !newPassword) return jsonResponse({ error: 'Missing token or newPassword' }, 400)
  if (newPassword.length < 8) return jsonResponse({ error: 'Senha precisa ter ao menos 8 caracteres' }, 422)

  const tokenHash = await sha256Hex(token)
  const row = await env.DB.prepare(
    `SELECT admin_user_id, expires_at, used FROM password_reset_tokens WHERE token_hash = ?`
  ).bind(tokenHash).first<{ admin_user_id: string; expires_at: number; used: number }>()

  if (!row || row.used || row.expires_at < Math.floor(Date.now() / 1000)) {
    return jsonResponse({ error: 'Token inválido ou expirado' }, 401)
  }

  const passwordHash = await hashPassword(newPassword)
  await env.DB.batch([
    env.DB.prepare(`UPDATE admin_users SET password_hash = ? WHERE id = ?`).bind(passwordHash, row.admin_user_id),
    // Invalida TODOS os tokens pendentes desse admin, não só o usado agora — evita que um
    // link de reset antigo (ex: esquecido numa caixa de email) ainda funcione após a troca.
    env.DB.prepare(`UPDATE password_reset_tokens SET used = 1 WHERE admin_user_id = ? AND used = 0`).bind(row.admin_user_id),
  ])

  return jsonResponse({ ok: true })
}

export async function handleGoogleCallback(request: Request, env: Env): Promise<Response> {
  let body: { code?: string; redirectUri?: string }
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  const { code, redirectUri } = body
  if (!code || !redirectUri) return jsonResponse({ error: 'Missing code or redirectUri' }, 400)

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID ?? '',
      client_secret: env.GOOGLE_CLIENT_SECRET ?? '',
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  })
  if (!tokenRes.ok) return jsonResponse({ error: 'Google token exchange failed' }, 401)
  const tokenData = await tokenRes.json() as { access_token?: string }
  if (!tokenData.access_token) return jsonResponse({ error: 'Google token exchange failed' }, 401)

  const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  })
  if (!userRes.ok) return jsonResponse({ error: 'Google userinfo failed' }, 401)
  const profile = await userRes.json() as { sub: string; email: string; email_verified: boolean }

  if (!profile.email || !profile.email_verified) {
    return jsonResponse({ error: 'Email do Google não verificado' }, 403)
  }

  // Só loga quem já é admin cadastrado — login com Google nunca cria conta nova
  const admin = await env.DB.prepare(
    `SELECT id, username, email, google_sub FROM admin_users WHERE email = ?`
  ).bind(profile.email).first<AdminUserRow>()

  if (!admin) return jsonResponse({ error: 'Email não autorizado para acesso admin' }, 403)

  if (admin.google_sub !== profile.sub) {
    await env.DB.prepare(`UPDATE admin_users SET google_sub = ? WHERE id = ?`).bind(profile.sub, admin.id).run()
  }

  const token = await adminJwt(admin.id, admin.username, env.JWT_SECRET ?? '')
  return jsonResponse({ token })
}

// Parseia o CSV de STUDENT_EMAIL_DOMAINS e delega a checagem de sufixo pra
// versão pura em shared/pure.ts (testada via Vitest no portal). Mantém a
// assinatura local `(email, env)` pra não mudar nenhum call-site aqui.
function isAllowedStudentEmail(email: string, env: Env): boolean {
  const domains = (env.STUDENT_EMAIL_DOMAINS ?? '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
  return isAllowedStudentEmailPure(email, domains)
}

export async function handleStudentGoogleCallback(request: Request, env: Env): Promise<Response> {
  let body: { code?: string; redirectUri?: string }
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  const { code, redirectUri } = body
  if (!code || !redirectUri) return jsonResponse({ error: 'Missing code or redirectUri' }, 400)

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID ?? '',
      client_secret: env.GOOGLE_CLIENT_SECRET ?? '',
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  })
  if (!tokenRes.ok) return jsonResponse({ error: 'Google token exchange failed' }, 401)
  const tokenData = await tokenRes.json() as { access_token?: string }
  if (!tokenData.access_token) return jsonResponse({ error: 'Google token exchange failed' }, 401)

  const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  })
  if (!userRes.ok) return jsonResponse({ error: 'Google userinfo failed' }, 401)
  const profile = await userRes.json() as { sub: string; email: string; email_verified: boolean; name?: string; picture?: string }

  if (!profile.email || !profile.email_verified) {
    return jsonResponse({ error: 'Email do Google não verificado' }, 403)
  }

  if (!isAllowedStudentEmail(profile.email, env)) {
    return jsonResponse({ error: 'Email não autorizado para acesso de aluno' }, 403)
  }

  // Login de aluno CRIA conta automaticamente no primeiro acesso (diferente do
  // fluxo admin, que nunca cria conta) — upsert em users por id (sub do Google).
  await env.DB.prepare(`
    INSERT INTO users (id, nome, email)
    VALUES (?, ?, ?)
    ON CONFLICT (id) DO UPDATE SET nome = excluded.nome, email = excluded.email
  `).bind(profile.sub, profile.name ?? null, profile.email).run()

  // picture não é persistida em D1 — repassada direto do userinfo do Google
  // a cada login, igual name, só pra exibir avatar no portal.
  const token = await signJwt(
    { sub: profile.sub, email: profile.email, name: profile.name ?? null, picture: profile.picture ?? null, role: 'student', exp: Math.floor(Date.now() / 1000) + 30 * 86400 },
    env.JWT_SECRET ?? '',
  )
  return jsonResponse({ token })
}
