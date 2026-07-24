/**
 * Cloudflare Worker — API LMS
 * POST /api/sync                       — persiste progresso (requer JWT — aluno ou admin)
 * POST /api/auth/login                  — autentica admin (usuário/senha), retorna JWT
 * POST /api/auth/forgot-password        — envia email de reset (Resend), com rate limit por email
 * POST /api/auth/reset-password         — troca senha via token do email
 * POST /api/auth/google/callback        — troca code OAuth por sessão (JWT), só admin já cadastrado
 * POST /api/auth/student/google/callback — troca code OAuth por sessão (JWT) de aluno; cria conta no primeiro login se o email bater com STUDENT_EMAIL_DOMAINS
 * POST /api/entregas                    — grava/atualiza link de entrega de avaliação (requer JWT aluno)
 * GET  /api/entregas                    — mapa das entregas do caller { [avaliacaoSlug]: {link, updatedAt} } (requer JWT aluno)
 * GET  /api/message                     — busca mensagem do professor (público)
 * PUT  /api/message                     — atualiza mensagem (requer JWT admin)
 * GET  /api/calendar                    — calendário condensado de aulas (público)
 * POST /api/calendar/import             — upsert em lote de dias/blocos (requer JWT admin)
 * GET  /api/calendar/resumo-ha          — soma de HA dada por UC, bucketizado em T1/T2/T3 (público)
 */

import { b64url, decodeB64url, toHex, fromHex, isAllowedStudentEmail as isAllowedStudentEmailPure, isValidEntregaUrl } from '../../shared/pure'

interface Env {
  DB: D1Database
  JWT_SECRET: string          // wrangler secret
  RESEND_API_KEY: string      // wrangler secret — https://resend.com
  RESEND_FROM: string         // var — ex: 'LMS Senac <onboarding@resend.dev>' (domínio verificado em produção)
  GOOGLE_CLIENT_ID: string    // var — não é segredo, usado também no portal
  GOOGLE_CLIENT_SECRET: string // wrangler secret
  ALLOWED_ORIGINS: string     // var — CSV de origens permitidas p/ link de reset (evita open-redirect no email)
  STUDENT_EMAIL_DOMAINS: string // var — CSV de domínios de email autorizados a criar conta de aluno
}

interface SyncPayload {
  aulaId: string
  progresso: number
  respostas: Record<string, string>
}

interface CalendarBlocoPayload {
  uc: string
  disciplina?: string
  conteudo?: string
  ha?: number
}

interface CalendarDayPayload {
  id: string
  numero?: string
  data: string
  tipo?: string
  status?: string
  observacao?: string
  blocos?: CalendarBlocoPayload[]
}

// ---------------------------------------------------------------------------
// JWT (HS256 via Web Crypto — sem deps externas)
// ---------------------------------------------------------------------------

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

async function signJwt(payload: Record<string, unknown>, secret: string): Promise<string> {
  const header = b64url(new TextEncoder().encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })))
  const body   = b64url(new TextEncoder().encode(JSON.stringify(payload)))
  const key    = await importKey(secret)
  const sig    = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${header}.${body}`))
  return `${header}.${body}.${b64url(sig)}`
}

async function verifyJwt(token: string, secret: string): Promise<Record<string, unknown> | null> {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const key = await importKey(secret)
  const valid = await crypto.subtle.verify(
    'HMAC', key,
    decodeB64url(parts[2]),
    new TextEncoder().encode(`${parts[0]}.${parts[1]}`),
  )
  if (!valid) return null
  try {
    const payload = JSON.parse(new TextDecoder().decode(decodeB64url(parts[1])))
    if (payload.exp && Date.now() / 1000 > payload.exp) return null
    return payload
  } catch { return null }
}

// Comparação em tempo constante p/ prevenir timing attacks
async function safeEqual(a: string, b: string): Promise<boolean> {
  const ka = await crypto.subtle.importKey('raw', new TextEncoder().encode(a), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const kb = await crypto.subtle.importKey('raw', new TextEncoder().encode(b), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sentinel = new Uint8Array(32)
  const [sa, sb] = await Promise.all([
    crypto.subtle.sign('HMAC', ka, sentinel),
    crypto.subtle.sign('HMAC', kb, sentinel),
  ])
  const ua = new Uint8Array(sa), ub = new Uint8Array(sb)
  let diff = 0
  for (let i = 0; i < ua.length; i++) diff |= ua[i] ^ ub[i]
  return diff === 0
}

// ---------------------------------------------------------------------------
// Senha (PBKDF2-HMAC-SHA256 via Web Crypto — sem deps externas)
// Formato armazenado: pbkdf2$<iteracoes>$<saltHex>$<hashHex>
// Compatível byte-a-byte com platform/scripts/create-admin.mjs (Node crypto.pbkdf2Sync)
// ---------------------------------------------------------------------------

const PBKDF2_ITERATIONS = 100_000

async function pbkdf2(password: string, salt: Uint8Array, iterations: number): Promise<string> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    key,
    256,
  )
  return toHex(bits)
}

async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const hash = await pbkdf2(password, salt, PBKDF2_ITERATIONS)
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toHex(salt)}$${hash}`
}

async function verifyPassword(password: string, stored: string | null): Promise<boolean> {
  if (!stored) return false
  const parts = stored.split('$')
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false
  const iterations = parseInt(parts[1], 10)
  const salt = fromHex(parts[2])
  const expected = parts[3]
  const actual = await pbkdf2(password, salt, iterations)
  return safeEqual(actual, expected)
}

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
  return toHex(digest)
}

function randomToken(): string {
  return toHex(crypto.getRandomValues(new Uint8Array(32)))
}

// ---------------------------------------------------------------------------
// Email (Resend — https://resend.com/docs/api-reference/emails/send-email)
// ---------------------------------------------------------------------------

async function sendEmail(env: Env, to: string, subject: string, html: string): Promise<boolean> {
  if (!env.RESEND_API_KEY) return false
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: env.RESEND_FROM || 'onboarding@resend.dev', to: [to], subject, html }),
  })
  return res.ok
}

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() })
    }

    if (request.method === 'POST' && url.pathname === '/api/sync') {
      return handleSync(request, env)
    }

    if (request.method === 'POST' && url.pathname === '/api/auth/login') {
      return handleLogin(request, env)
    }

    if (request.method === 'POST' && url.pathname === '/api/auth/forgot-password') {
      return handleForgotPassword(request, env, ctx)
    }

    if (request.method === 'POST' && url.pathname === '/api/auth/reset-password') {
      return handleResetPassword(request, env)
    }

    if (request.method === 'POST' && url.pathname === '/api/auth/google/callback') {
      return handleGoogleCallback(request, env)
    }

    if (request.method === 'POST' && url.pathname === '/api/auth/student/google/callback') {
      return handleStudentGoogleCallback(request, env)
    }

    if (request.method === 'POST' && url.pathname === '/api/entregas') {
      return handleCreateEntrega(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/entregas') {
      return handleGetEntregas(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/message') {
      return handleGetMessage(env)
    }

    if (request.method === 'PUT' && url.pathname === '/api/message') {
      return handlePutMessage(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/calendar') {
      return handleGetCalendar(env)
    }

    if (request.method === 'POST' && url.pathname === '/api/calendar/import') {
      return handleImportCalendar(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/calendar/resumo-ha') {
      return handleGetResumoHa(env)
    }

    return new Response('Not found', { status: 404 })
  },
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

interface AdminUserRow {
  id: string
  username: string
  email: string
  password_hash: string | null
  google_sub: string | null
}

function adminJwt(adminId: string, username: string, secret: string): Promise<string> {
  return signJwt(
    { sub: adminId, username, role: 'admin', exp: Math.floor(Date.now() / 1000) + 86400 },
    secret,
  )
}

async function handleLogin(request: Request, env: Env): Promise<Response> {
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

// Extrai e valida o JWT do header Authorization — genérico, não checa role.
// Cada handler decide o que fazer com payload.role (ou se nem liga pra role).
function requireAuth(request: Request, env: Env): Promise<Record<string, unknown> | null> {
  const authHeader = request.headers.get('Authorization') ?? ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  return verifyJwt(token, env.JWT_SECRET ?? '')
}

// Mantido como alias específico de admin — os handlers admin-only já chamam
// `requireAdmin` e checam `role === 'admin'`; não duplicar essa checagem aqui
// para não mudar o contrato existente (retorna o payload cru, igual antes).
function requireAdmin(request: Request, env: Env): Promise<Record<string, unknown> | null> {
  return requireAuth(request, env)
}

// Origem do link de reset precisa bater com uma origem conhecida — evita que o
// endpoint seja usado para mandar emails "oficiais" com link para site de terceiro.
function isAllowedOrigin(origin: string, env: Env): boolean {
  const allowed = (env.ALLOWED_ORIGINS ?? '').split(',').map(s => s.trim()).filter(Boolean)
  return allowed.includes(origin)
}

// Rate limit de POST /api/auth/forgot-password: no máximo 3 envios por hora,
// por email, com backoff progressivo entre eles (1min antes do 2º, 2min antes
// do 3º). A janela é sempre "últimos 60min" (sent_at > now - 3600), não o
// histórico inteiro do email — assim, conforme os envios de uma rajada
// completam 1h de idade, eles saem da contagem e a cota volta a liberar uma
// rajada rápida de novo (em vez de travar para sempre em 1 email/hora depois
// da primeira rajada de 3). Cada linha de password_reset_attempts representa
// um envio que realmente aconteceu; uma tentativa negada por este rate limit
// não grava nada (ver handleForgotPassword).
async function isForgotPasswordAllowed(email: string, env: Env): Promise<boolean> {
  const rows = await env.DB.prepare(
    `SELECT sent_at FROM password_reset_attempts WHERE email = ? AND sent_at > (unixepoch() - 3600) ORDER BY sent_at DESC LIMIT 3`
  ).bind(email).all<{ sent_at: number }>()
  const attempts = rows.results ?? []
  const now = Math.floor(Date.now() / 1000)

  if (attempts.length === 0) return true
  if (attempts.length === 1) return now - attempts[0].sent_at >= 60
  if (attempts.length === 2) return now - attempts[0].sent_at >= 120
  return now - attempts[0].sent_at >= 3600
}

async function handleForgotPassword(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
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

// Disparada via ctx.waitUntil a partir de handleForgotPassword — nunca deve ser
// awaited ali, senão volta a vazar timing entre os branches do forgot-password.
// Só cuida do que depende de rede externa (Resend); o registro da tentativa em
// password_reset_attempts já aconteceu no caminho síncrono, antes da resposta.
async function sendPasswordResetEmail(
  env: Env,
  admin: AdminUserRow,
  resetUrlBase: string,
): Promise<void> {
  const rawToken = randomToken()
  const tokenHash = await sha256Hex(rawToken)
  const expiresAt = Math.floor(Date.now() / 1000) + 3600 // 1h

  await env.DB.prepare(`
    INSERT INTO password_reset_tokens (token_hash, admin_user_id, expires_at)
    VALUES (?, ?, ?)
  `).bind(tokenHash, admin.id, expiresAt).run()

  const link = `${resetUrlBase}?token=${rawToken}`
  await sendEmail(env, admin.email, 'Redefinir senha — Portal Técnico em IA', `
    <p>Foi solicitada a redefinição da sua senha do painel do professor.</p>
    <p><a href="${link}">Clique aqui para criar uma nova senha</a> (expira em 1 hora).</p>
    <p>Se você não pediu isso, ignore este email.</p>
  `)
}

async function handleResetPassword(request: Request, env: Env): Promise<Response> {
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

async function handleGoogleCallback(request: Request, env: Env): Promise<Response> {
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

async function handleStudentGoogleCallback(request: Request, env: Env): Promise<Response> {
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

async function handleGetMessage(env: Env): Promise<Response> {
  const row = await env.DB.prepare(
    `SELECT value FROM site_config WHERE key = 'professor_message'`
  ).first<{ value: string }>()
  return jsonResponse({ message: row?.value ?? '' })
}

async function handlePutMessage(request: Request, env: Env): Promise<Response> {
  const payload = await requireAdmin(request, env)
  if (!payload || payload.role !== 'admin') {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  let body: { message?: string }
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  if (typeof body.message !== 'string') return jsonResponse({ error: 'message must be a string' }, 422)

  // Sanitização básica: limitar tamanho
  const message = body.message.slice(0, 5000)

  await env.DB.prepare(`
    INSERT INTO site_config (key, value, updated_at)
    VALUES ('professor_message', ?, unixepoch())
    ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
  `).bind(message).run()

  return jsonResponse({ ok: true })
}

async function handleSync(request: Request, env: Env): Promise<Response> {
  const payload = await requireAuth(request, env)
  if (!payload || typeof payload.sub !== 'string') return jsonResponse({ error: 'Unauthorized' }, 401)
  const userId = payload.sub

  let body: SyncPayload
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  const { aulaId, progresso, respostas } = body
  if (!aulaId || typeof progresso !== 'number') {
    return jsonResponse({ error: 'Missing required fields: aulaId, progresso' }, 422)
  }

  await env.DB.prepare(`
    INSERT INTO progress (user_id, aula_slug, progresso, updated_at)
    VALUES (?, ?, ?, unixepoch())
    ON CONFLICT (user_id, aula_slug)
    DO UPDATE SET progresso = excluded.progresso, updated_at = excluded.updated_at
  `).bind(userId, aulaId, progresso).run()

  if (respostas && typeof respostas === 'object') {
    for (const [questaoId, resposta] of Object.entries(respostas)) {
      await env.DB.prepare(`
        INSERT INTO respostas (user_id, aula_slug, questao_id, resposta, updated_at)
        VALUES (?, ?, ?, ?, unixepoch())
        ON CONFLICT (user_id, aula_slug, questao_id)
        DO UPDATE SET resposta = excluded.resposta, updated_at = excluded.updated_at
      `).bind(userId, aulaId, questaoId, resposta).run()
    }
  }

  return jsonResponse({ ok: true })
}

async function handleCreateEntrega(request: Request, env: Env): Promise<Response> {
  const payload = await requireAuth(request, env)
  if (!payload || typeof payload.sub !== 'string') return jsonResponse({ error: 'Unauthorized' }, 401)
  if (payload.role !== 'student') return jsonResponse({ error: 'Forbidden' }, 403)

  let body: { avaliacaoId?: string; link?: string }
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  const { avaliacaoId, link } = body
  if (!avaliacaoId || !link) return jsonResponse({ error: 'Missing required fields: avaliacaoId, link' }, 422)

  // Só http(s) — evita gravar javascript:/data: URIs que um dia podem virar
  // <a href> no painel do professor. Mesma função (`isValidEntregaUrl`) usada
  // pelo portal, garantindo que os dois lados aceitam o mesmo conjunto.
  if (!isValidEntregaUrl(link)) return jsonResponse({ error: 'link inválido' }, 422)

  const userId = payload.sub

  await env.DB.prepare(`
    INSERT INTO entregas (user_id, avaliacao_slug, link, updated_at)
    VALUES (?, ?, ?, unixepoch())
    ON CONFLICT (user_id, avaliacao_slug)
    DO UPDATE SET link = excluded.link, updated_at = excluded.updated_at
  `).bind(userId, avaliacaoId, link.slice(0, 2000)).run()

  return jsonResponse({ ok: true })
}

// Devolve só as entregas do próprio caller — nunca de outros alunos
// (`WHERE user_id = ?` vem do JWT, nunca de um parâmetro do client).
async function handleGetEntregas(request: Request, env: Env): Promise<Response> {
  const payload = await requireAuth(request, env)
  if (!payload || typeof payload.sub !== 'string') return jsonResponse({ error: 'Unauthorized' }, 401)
  if (payload.role !== 'student') return jsonResponse({ error: 'Forbidden' }, 403)

  const userId = payload.sub

  const rows = await env.DB.prepare(
    `SELECT avaliacao_slug, link, updated_at FROM entregas WHERE user_id = ?`
  ).bind(userId).all<{ avaliacao_slug: string; link: string; updated_at: number }>()

  const result: Record<string, { link: string; updatedAt: number }> = {}
  for (const row of rows.results ?? []) {
    result[row.avaliacao_slug] = { link: row.link, updatedAt: row.updated_at }
  }

  return jsonResponse(result)
}

async function handleGetCalendar(env: Env): Promise<Response> {
  const days = await env.DB.prepare(
    `SELECT id, numero, data, tipo, status, observacao FROM calendar_days ORDER BY data ASC`
  ).all<{ id: string; numero: string | null; data: string; tipo: string; status: string; observacao: string | null }>()

  const blocos = await env.DB.prepare(
    `SELECT calendar_day_id, uc, disciplina, conteudo, ha, ordem FROM calendar_blocos ORDER BY calendar_day_id, ordem ASC`
  ).all<{ calendar_day_id: string; uc: string; disciplina: string | null; conteudo: string | null; ha: number | null; ordem: number }>()

  const blocosByDay = new Map<string, unknown[]>()
  for (const b of blocos.results ?? []) {
    const list = blocosByDay.get(b.calendar_day_id) ?? []
    list.push({ uc: b.uc, disciplina: b.disciplina, conteudo: b.conteudo, ha: b.ha })
    blocosByDay.set(b.calendar_day_id, list)
  }

  const result = (days.results ?? []).map(d => ({
    ...d,
    blocos: blocosByDay.get(d.id) ?? [],
  }))

  return jsonResponse({ days: result })
}

async function handleGetResumoHa(env: Env): Promise<Response> {
  const rows = await env.DB.prepare(
    `SELECT b.uc,
      SUM(CASE WHEN d.data <= '2026-05-14' THEN b.ha ELSE 0 END) AS t1,
      SUM(CASE WHEN d.data > '2026-05-14' AND d.data <= '2026-09-04' THEN b.ha ELSE 0 END) AS t2,
      SUM(CASE WHEN d.data > '2026-09-04' THEN b.ha ELSE 0 END) AS t3
    FROM calendar_blocos b
    JOIN calendar_days d ON d.id = b.calendar_day_id
    WHERE d.status = 'dada'
    GROUP BY b.uc
    ORDER BY b.uc`
  ).all<{ uc: string; t1: number; t2: number; t3: number }>()

  return jsonResponse({ ucs: rows.results ?? [] })
}

async function handleImportCalendar(request: Request, env: Env): Promise<Response> {
  const payload = await requireAdmin(request, env)
  if (!payload || payload.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 401)

  let body: { days?: CalendarDayPayload[] }
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  if (!Array.isArray(body.days) || body.days.length === 0) {
    return jsonResponse({ error: 'Missing days array' }, 422)
  }

  const statements: D1PreparedStatement[] = []

  for (const day of body.days) {
    if (!day.id || !day.data) continue

    statements.push(env.DB.prepare(`
      INSERT INTO calendar_days (id, numero, data, tipo, status, observacao, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, unixepoch())
      ON CONFLICT (id) DO UPDATE SET
        numero = excluded.numero, data = excluded.data, tipo = excluded.tipo,
        status = excluded.status, observacao = excluded.observacao, updated_at = excluded.updated_at
    `).bind(day.id, day.numero ?? null, day.data, day.tipo ?? 'aula', day.status ?? 'planejada', day.observacao ?? null))

    statements.push(env.DB.prepare(`DELETE FROM calendar_blocos WHERE calendar_day_id = ?`).bind(day.id))

    ;(day.blocos ?? []).forEach((bloco, i) => {
      if (!bloco.uc) return
      statements.push(env.DB.prepare(`
        INSERT INTO calendar_blocos (id, calendar_day_id, uc, disciplina, conteudo, ha, ordem)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).bind(`${day.id}-${bloco.uc}`, day.id, bloco.uc, bloco.disciplina ?? null, bloco.conteudo ?? null, bloco.ha ?? null, i))
    })
  }

  if (statements.length === 0) return jsonResponse({ error: 'Nothing to import' }, 422)

  await env.DB.batch(statements)
  return jsonResponse({ ok: true, dias: body.days.length })
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function corsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  })
}

