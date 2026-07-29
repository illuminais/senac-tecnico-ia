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
 * POST /api/admin/seed                  — upsert em lote de ucs/indicadores/avaliações/vínculos/turmas/avaliacoes_turma (requer JWT admin); nunca toca `notas`
 * GET  /api/avaliacoes                  — lista de avaliações com trimestre/indicador/UC (público; JWT de aluno opcional resolve prazo/status pela turma)
 * GET  /api/admin/turmas                — lista todas as turmas (requer JWT admin)
 * GET  /api/admin/ucs                   — lista todas as UCs com conhecimentos/habilidades (requer JWT admin)
 * GET  /api/admin/painel                — indicadores de um trimestre (mapa curricular) com cobertura de avaliação/correção por turma (requer JWT admin)
 * GET  /api/admin/grade/:slug           — grade aluno x indicador de uma avaliação, para uma turma (requer JWT admin)
 * PUT  /api/admin/notas                 — batch upsert/delete de notas A/PA/NA (requer JWT admin)
 * GET  /api/admin/boletim               — boletim consolidado (max A>PA>NA) de um trimestre, para uma turma (requer JWT admin)
 */

import { b64url, decodeB64url, toHex, fromHex, isAllowedStudentEmail as isAllowedStudentEmailPure, isValidEntregaUrl, consolidarNota } from '../../shared/pure'

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

// Payload de POST /api/admin/seed — shape produzido por
// platform/scripts/seed-indicadores.mjs (ver T4/T5 da spec 03-avaliacoes-por-indicador).
interface SeedUcPayload {
  codigo: string
  nome: string
  anoCurso: number
  conhecimentos: string
  habilidades: string
}

interface SeedIndicadorPayload {
  codigo: string
  uc: string
  numero: number
  descricao: string
  trimestres: string // CSV 'T1,T2' ou '' — ver RF4b
}

interface SeedAvaliacaoPayload {
  slug: string
  titulo: string
  tipo?: string | null
  trimestre: string
  status: string
}

interface SeedAvaliacaoIndicadorPayload {
  avaliacaoSlug: string
  indicadorCodigo: string
}

interface SeedTurmaPayload {
  id: string
  anoIngresso: number
  status: string
}

interface SeedAvaliacaoTurmaPayload {
  turmaId: string
  avaliacaoSlug: string
  prazo?: string | null
  prazoLabel?: string | null
  status: string
}

interface SeedPayload {
  ucs?: SeedUcPayload[]
  indicadores?: SeedIndicadorPayload[]
  avaliacoes?: SeedAvaliacaoPayload[]
  avaliacaoIndicadores?: SeedAvaliacaoIndicadorPayload[]
  turmas?: SeedTurmaPayload[]
  avaliacoesTurma?: SeedAvaliacaoTurmaPayload[]
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
  // Todo o corpo (não só o parse do payload) precisa estar dentro do
  // try/catch: `decodeB64url` usa `atob()`, que lança `InvalidCharacterError`
  // (não devolve null) quando a parte do token não é base64url válido — um
  // token malformado (não só "assinatura errada") derrubava isso pra fora da
  // função como exceção não tratada em vez de retornar null como o contrato
  // desta função promete. Isso importa especialmente para rotas públicas com
  // JWT opcional (ex.: GET /api/avaliacoes) — nunca podem quebrar por causa
  // de um Authorization header malformado vindo do client.
  try {
    const key = await importKey(secret)
    const valid = await crypto.subtle.verify(
      'HMAC', key,
      decodeB64url(parts[2]),
      new TextEncoder().encode(`${parts[0]}.${parts[1]}`),
    )
    if (!valid) return null
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

    if (request.method === 'POST' && url.pathname === '/api/admin/seed') {
      return handleAdminSeed(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/avaliacoes') {
      return handleGetAvaliacoes(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/admin/turmas') {
      return handleGetTurmas(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/admin/ucs') {
      return handleGetUcs(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/admin/painel') {
      return handleAdminPainel(request, env)
    }

    if (request.method === 'PUT' && url.pathname === '/api/admin/notas') {
      return handleAdminNotasUpdate(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/admin/boletim') {
      return handleAdminBoletim(request, env)
    }

    // Rota dinâmica /api/admin/grade/:slug — o roteador do resto do arquivo é
    // baseado em `pathname === 'string exata'`; slug variável exige regex.
    const gradeMatch = url.pathname.match(/^\/api\/admin\/grade\/([^/]+)$/)
    if (request.method === 'GET' && gradeMatch) {
      return handleAdminGrade(request, env, gradeMatch[1])
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

// Upsert em lote de ucs/indicadores/avaliações/vínculos/turmas/avaliacoes_turma —
// dono é o seed (D2, spec.md); esta rota só aplica o payload já resolvido por
// platform/scripts/seed-indicadores.mjs. NUNCA toca `notas` nem `users.turma_id`
// (RF5, CA5) — nenhuma statement abaixo referencia essas duas coisas.
//
// Ordem das statements respeita as FKs "soft" do schema (ucs -> indicadores ->
// avaliacoes -> avaliacao_indicadores -> turmas -> avaliacoes_turma). D1/SQLite
// não impõe PRAGMA foreign_keys aqui (ver platform-schema-d1), então um
// indicador com `uc` inexistente não derruba o batch — só fica com join órfão;
// aceito conscientemente (mesmo risco já registrado no schema.sql para `notas`).
//
// avaliacao_indicadores: escolhido "delete por avaliacao_slug + reinsert",
// igual ao padrão de handleImportCalendar com calendar_blocos — mais simples
// que resolver upsert na PK composta quando o conjunto de vínculos de uma
// avaliação pode encolher entre dois seeds (ex.: um indicador removido do
// meta.yaml). Upsert puro nunca apagaria o vínculo antigo; delete+reinsert
// sim, e é upsert-only do ponto de vista do estado final (idempotente).
async function handleAdminSeed(request: Request, env: Env): Promise<Response> {
  const payload = await requireAdmin(request, env)
  if (!payload || payload.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 401)

  let body: SeedPayload
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  const ucs = body.ucs ?? []
  const indicadores = body.indicadores ?? []
  const avaliacoes = body.avaliacoes ?? []
  const avaliacaoIndicadores = body.avaliacaoIndicadores ?? []
  const turmas = body.turmas ?? []
  const avaliacoesTurma = body.avaliacoesTurma ?? []

  const statements: D1PreparedStatement[] = []

  // 1. ucs
  for (const uc of ucs) {
    if (!uc.codigo) continue
    statements.push(env.DB.prepare(`
      INSERT INTO ucs (codigo, nome, ano_curso, conhecimentos, habilidades, updated_at)
      VALUES (?, ?, ?, ?, ?, unixepoch())
      ON CONFLICT (codigo) DO UPDATE SET
        nome = excluded.nome, ano_curso = excluded.ano_curso,
        conhecimentos = excluded.conhecimentos, habilidades = excluded.habilidades,
        updated_at = excluded.updated_at
    `).bind(uc.codigo, uc.nome, uc.anoCurso, uc.conhecimentos, uc.habilidades))
  }

  // 2. indicadores (FK "soft" -> ucs.codigo)
  for (const ind of indicadores) {
    if (!ind.codigo) continue
    statements.push(env.DB.prepare(`
      INSERT INTO indicadores (codigo, uc, numero, descricao, trimestres, updated_at)
      VALUES (?, ?, ?, ?, ?, unixepoch())
      ON CONFLICT (codigo) DO UPDATE SET
        uc = excluded.uc, numero = excluded.numero, descricao = excluded.descricao,
        trimestres = excluded.trimestres, updated_at = excluded.updated_at
    `).bind(ind.codigo, ind.uc, ind.numero, ind.descricao, ind.trimestres ?? ''))
  }

  // 3. avaliacoes
  for (const av of avaliacoes) {
    if (!av.slug) continue
    statements.push(env.DB.prepare(`
      INSERT INTO avaliacoes (slug, titulo, tipo, trimestre, status, updated_at)
      VALUES (?, ?, ?, ?, ?, unixepoch())
      ON CONFLICT (slug) DO UPDATE SET
        titulo = excluded.titulo, tipo = excluded.tipo, trimestre = excluded.trimestre,
        status = excluded.status, updated_at = excluded.updated_at
    `).bind(av.slug, av.titulo, av.tipo ?? null, av.trimestre, av.status))
  }

  // 4. avaliacao_indicadores — delete por avaliacao_slug antes de reinserir
  // (ver nota de design acima da função).
  const slugsComVinculo = new Set(avaliacaoIndicadores.map((v) => v.avaliacaoSlug))
  for (const slug of slugsComVinculo) {
    statements.push(env.DB.prepare(`DELETE FROM avaliacao_indicadores WHERE avaliacao_slug = ?`).bind(slug))
  }
  for (const v of avaliacaoIndicadores) {
    if (!v.avaliacaoSlug || !v.indicadorCodigo) continue
    statements.push(env.DB.prepare(`
      INSERT INTO avaliacao_indicadores (avaliacao_slug, indicador_codigo)
      VALUES (?, ?)
    `).bind(v.avaliacaoSlug, v.indicadorCodigo))
  }

  // 5. turmas
  for (const t of turmas) {
    if (!t.id) continue
    statements.push(env.DB.prepare(`
      INSERT INTO turmas (id, ano_ingresso, status, updated_at)
      VALUES (?, ?, ?, unixepoch())
      ON CONFLICT (id) DO UPDATE SET
        ano_ingresso = excluded.ano_ingresso, status = excluded.status, updated_at = excluded.updated_at
    `).bind(t.id, t.anoIngresso, t.status))
  }

  // 6. avaliacoes_turma (PK composta turma_id+avaliacao_slug)
  for (const at of avaliacoesTurma) {
    if (!at.turmaId || !at.avaliacaoSlug) continue
    statements.push(env.DB.prepare(`
      INSERT INTO avaliacoes_turma (turma_id, avaliacao_slug, prazo, prazo_label, status, updated_at)
      VALUES (?, ?, ?, ?, ?, unixepoch())
      ON CONFLICT (turma_id, avaliacao_slug) DO UPDATE SET
        prazo = excluded.prazo, prazo_label = excluded.prazo_label, status = excluded.status,
        updated_at = excluded.updated_at
    `).bind(at.turmaId, at.avaliacaoSlug, at.prazo ?? null, at.prazoLabel ?? null, at.status))
  }

  if (statements.length === 0) return jsonResponse({ error: 'Nothing to seed' }, 422)

  await env.DB.batch(statements)

  return jsonResponse({
    ok: true,
    contagens: {
      ucs: ucs.length,
      indicadores: indicadores.length,
      avaliacoes: avaliacoes.length,
      avaliacaoIndicadores: avaliacaoIndicadores.length,
      turmas: turmas.length,
      avaliacoesTurma: avaliacoesTurma.length,
    },
  })
}

// Resolve de qual turma puxar prazoLabel/status de aplicação em
// GET /api/avaliacoes (D8, plan.md "Fallback de /api/avaliacoes sem turma
// resolvida"). JWT é opcional: se presente, válido e de aluno com
// `turma_id` não nulo, usa a turma daquele aluno especificamente (busca
// `users` fresco — o JWT não carrega turma_id, ela pode mudar depois do
// login). Caso contrário, cai para a turma `status='ativa'` mais recente
// por `ano_ingresso` (hoje sempre resolve para a única turma, '2026A').
async function resolveAvaliacoesTurmaId(request: Request, env: Env): Promise<string | null> {
  const payload = await requireAuth(request, env)
  if (payload && payload.role === 'student' && typeof payload.sub === 'string') {
    const user = await env.DB.prepare(
      `SELECT turma_id FROM users WHERE id = ?`
    ).bind(payload.sub).first<{ turma_id: string | null }>()
    if (user?.turma_id) return user.turma_id
  }

  const turma = await env.DB.prepare(
    `SELECT id FROM turmas WHERE status = 'ativa' ORDER BY ano_ingresso DESC LIMIT 1`
  ).first<{ id: string }>()
  return turma?.id ?? null
}

// Pública — nunca retorna 401/403 por falta de JWT (RF6). O `status` no
// retorno é o de APLICAÇÃO (avaliacoes_turma.status), não o de conteúdo
// (avaliacoes.status) — cuidado para não confundir os dois na leitura.
async function handleGetAvaliacoes(request: Request, env: Env): Promise<Response> {
  const turmaId = await resolveAvaliacoesTurmaId(request, env)

  const avaliacoesRows = await env.DB.prepare(
    `SELECT slug, titulo, tipo, trimestre FROM avaliacoes ORDER BY trimestre, slug`
  ).all<{ slug: string; titulo: string; tipo: string | null; trimestre: string }>()

  const avaliacaoTurmaRows = turmaId
    ? await env.DB.prepare(
        `SELECT avaliacao_slug, prazo_label, status FROM avaliacoes_turma WHERE turma_id = ?`
      ).bind(turmaId).all<{ avaliacao_slug: string; prazo_label: string | null; status: string }>()
    : null

  const turmaBySlug = new Map<string, { prazoLabel: string | null; status: string }>()
  for (const row of avaliacaoTurmaRows?.results ?? []) {
    turmaBySlug.set(row.avaliacao_slug, { prazoLabel: row.prazo_label, status: row.status })
  }

  const indicadorRows = await env.DB.prepare(`
    SELECT ai.avaliacao_slug, i.codigo, i.uc, i.descricao
    FROM avaliacao_indicadores ai
    JOIN indicadores i ON i.codigo = ai.indicador_codigo
    ORDER BY ai.avaliacao_slug, i.uc, i.numero
  `).all<{ avaliacao_slug: string; codigo: string; uc: string; descricao: string }>()

  const indicadoresBySlug = new Map<string, { codigo: string; uc: string; descricao: string }[]>()
  for (const row of indicadorRows.results ?? []) {
    const list = indicadoresBySlug.get(row.avaliacao_slug) ?? []
    list.push({ codigo: row.codigo, uc: row.uc, descricao: row.descricao })
    indicadoresBySlug.set(row.avaliacao_slug, list)
  }

  const result = (avaliacoesRows.results ?? []).map((av) => {
    const turma = turmaBySlug.get(av.slug)
    return {
      slug: av.slug,
      titulo: av.titulo,
      tipo: av.tipo,
      trimestre: av.trimestre,
      prazoLabel: turma?.prazoLabel ?? null,
      status: turma?.status ?? null,
      indicadores: indicadoresBySlug.get(av.slug) ?? [],
    }
  })

  return jsonResponse(result)
}

// ---------------------------------------------------------------------------
// Painel / Grade / Notas / Boletim do professor (sprint 03, T6)
// ---------------------------------------------------------------------------

// Ano do curso relevante para o mapa curricular do painel/boletim (RF9). Hoje
// só existe catálogo semeado para ano_curso=1 (sprint 03, uma turma/um ano
// ativos); quando houver mais de um ano em curso simultaneamente, essa
// resolução vai precisar derivar de qual turma foi passada (ex.: turma ->
// coorte -> ano corrente), mas essa relação não existe no schema ainda (D8
// trata turma e ano_curso como eixos deliberadamente separados). Mantido como
// constante isolada — quando a segunda turma/ano chegar, é aqui que entra a
// lógica nova, sem espalhar um "1" mágico pelas queries de painel/boletim.
const ANO_CURSO_ATUAL = 1

// Resolve o turma_id efetivo para as rotas admin que listam alunos/notas de
// uma turma (painel, grade, boletim — RF17/D8). Se `turma` vem na query,
// usa direto sem validar existência (se não existir, a query simplesmente
// não encontra ninguém — não é erro). Se omitido, só resolve sozinho quando
// existe exatamente uma turma `status='ativa'`; com zero ou duas+ turmas
// ativas, responde 400 — nunca mistura alunos de turmas diferentes
// silenciosamente (CA8).
async function resolveTurmaParam(url: URL, env: Env): Promise<{ turmaId: string } | { error: Response }> {
  const turmaParam = url.searchParams.get('turma')
  if (turmaParam) return { turmaId: turmaParam }

  const ativas = await env.DB.prepare(
    `SELECT id FROM turmas WHERE status = 'ativa'`
  ).all<{ id: string }>()
  const rows = ativas.results ?? []

  if (rows.length === 1) return { turmaId: rows[0].id }

  return {
    error: jsonResponse(
      { error: 'Parâmetro turma obrigatório: existem múltiplas turmas ativas (ou nenhuma)' },
      400,
    ),
  }
}

async function handleGetTurmas(request: Request, env: Env): Promise<Response> {
  const payload = await requireAdmin(request, env)
  if (!payload || payload.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 401)

  const rows = await env.DB.prepare(
    `SELECT id, ano_ingresso, status FROM turmas ORDER BY ano_ingresso DESC, id`
  ).all<{ id: string; ano_ingresso: number; status: string }>()

  const result = (rows.results ?? []).map(t => ({
    id: t.id,
    anoIngresso: t.ano_ingresso,
    status: t.status,
  }))
  return jsonResponse(result)
}

// Referência estática (RF19, D9): buscada uma vez pelo client e usada
// localmente para resolver conhecimentos/habilidades de qualquer indicador
// exibido no painel/grade, sem inflar o payload dessas rotas com o texto
// inteiro da UC repetido por indicador.
async function handleGetUcs(request: Request, env: Env): Promise<Response> {
  const payload = await requireAdmin(request, env)
  if (!payload || payload.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 401)

  const rows = await env.DB.prepare(
    `SELECT codigo, nome, ano_curso, conhecimentos, habilidades FROM ucs ORDER BY codigo`
  ).all<{ codigo: string; nome: string; ano_curso: number; conhecimentos: string; habilidades: string }>()

  const result = (rows.results ?? []).map(u => ({
    codigo: u.codigo,
    nome: u.nome,
    anoCurso: u.ano_curso,
    conhecimentos: u.conhecimentos,
    habilidades: u.habilidades,
  }))
  return jsonResponse(result)
}

// Painel de cobertura de um trimestre (RF9, CA2): lista TODOS os indicadores
// do mapa curricular daquele trimestre (`ano_curso` fixo, não filtrado por
// turma — grade fixa do currículo), inclusive os sem nenhuma avaliação
// vinculada. `avaliacoes` inclui TODAS as avaliações ligadas ao indicador,
// independente do trimestre da própria avaliação (achado do analyze.md: os
// dois podem discordar; o painel é por trimestre do INDICADOR).
async function handleAdminPainel(request: Request, env: Env): Promise<Response> {
  const payload = await requireAdmin(request, env)
  if (!payload || payload.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 401)

  const url = new URL(request.url)
  const trimestre = url.searchParams.get('trimestre')
  if (!trimestre) return jsonResponse({ error: 'Parâmetro trimestre obrigatório' }, 400)

  const turmaResult = await resolveTurmaParam(url, env)
  if ('error' in turmaResult) return turmaResult.error
  const { turmaId } = turmaResult

  const indicadoresRows = await env.DB.prepare(`
    SELECT i.codigo, i.uc, i.descricao
    FROM indicadores i
    JOIN ucs u ON u.codigo = i.uc
    WHERE u.ano_curso = ? AND i.trimestres LIKE '%' || ? || '%'
    ORDER BY i.uc, i.numero
  `).bind(ANO_CURSO_ATUAL, trimestre).all<{ codigo: string; uc: string; descricao: string }>()
  const indicadores = indicadoresRows.results ?? []

  if (indicadores.length === 0) return jsonResponse([])

  const codigos = indicadores.map(i => i.codigo)
  const placeholders = codigos.map(() => '?').join(',')

  const avRows = await env.DB.prepare(`
    SELECT ai.indicador_codigo, av.slug, av.titulo
    FROM avaliacao_indicadores ai
    JOIN avaliacoes av ON av.slug = ai.avaliacao_slug
    WHERE ai.indicador_codigo IN (${placeholders})
    ORDER BY av.slug
  `).bind(...codigos).all<{ indicador_codigo: string; slug: string; titulo: string }>()

  const avaliacoesByIndicador = new Map<string, { slug: string; titulo: string }[]>()
  for (const row of avRows.results ?? []) {
    const list = avaliacoesByIndicador.get(row.indicador_codigo) ?? []
    list.push({ slug: row.slug, titulo: row.titulo })
    avaliacoesByIndicador.set(row.indicador_codigo, list)
  }

  const totalAlunosRow = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM users WHERE turma_id = ?`
  ).bind(turmaId).first<{ n: number }>()
  const totalAlunos = totalAlunosRow?.n ?? 0

  const corrigidosRows = await env.DB.prepare(`
    SELECT indicador_codigo, COUNT(DISTINCT user_id) AS n
    FROM notas
    WHERE indicador_codigo IN (${placeholders}) AND user_id IN (SELECT id FROM users WHERE turma_id = ?)
    GROUP BY indicador_codigo
  `).bind(...codigos, turmaId).all<{ indicador_codigo: string; n: number }>()

  const corrigidosByIndicador = new Map<string, number>()
  for (const row of corrigidosRows.results ?? []) {
    corrigidosByIndicador.set(row.indicador_codigo, row.n)
  }

  const result = indicadores.map(ind => ({
    codigo: ind.codigo,
    uc: ind.uc,
    descricao: ind.descricao,
    avaliacoes: avaliacoesByIndicador.get(ind.codigo) ?? [],
    totalAlunos,
    corrigidos: corrigidosByIndicador.get(ind.codigo) ?? 0,
  }))

  return jsonResponse(result)
}

// Grade aluno x indicador de UMA avaliação, para UMA turma (RF10). `alunos`
// vem só de `users` filtrado por `turma_id` (CA8 — nunca de outra turma).
// `notas` no retorno de cada aluno só traz os indicadores com nota lançada —
// ausência de chave é "não avaliado" (RF12), nunca um valor inventado.
async function handleAdminGrade(request: Request, env: Env, slug: string): Promise<Response> {
  const payload = await requireAdmin(request, env)
  if (!payload || payload.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 401)

  const url = new URL(request.url)
  const turmaResult = await resolveTurmaParam(url, env)
  if ('error' in turmaResult) return turmaResult.error
  const { turmaId } = turmaResult

  const avaliacao = await env.DB.prepare(
    `SELECT slug, titulo, tipo, trimestre, status FROM avaliacoes WHERE slug = ?`
  ).bind(slug).first<{ slug: string; titulo: string; tipo: string | null; trimestre: string; status: string }>()

  if (!avaliacao) return jsonResponse({ error: 'Avaliação não encontrada' }, 404)

  const avaliacaoTurmaRow = await env.DB.prepare(
    `SELECT prazo, prazo_label, status FROM avaliacoes_turma WHERE turma_id = ? AND avaliacao_slug = ?`
  ).bind(turmaId, slug).first<{ prazo: string | null; prazo_label: string | null; status: string }>()

  const indicadoresRows = await env.DB.prepare(`
    SELECT i.codigo, i.uc, i.descricao
    FROM avaliacao_indicadores ai
    JOIN indicadores i ON i.codigo = ai.indicador_codigo
    WHERE ai.avaliacao_slug = ?
    ORDER BY i.uc, i.numero
  `).bind(slug).all<{ codigo: string; uc: string; descricao: string }>()
  const indicadores = indicadoresRows.results ?? []

  const alunosRows = await env.DB.prepare(
    `SELECT id, nome, email FROM users WHERE turma_id = ? ORDER BY nome`
  ).bind(turmaId).all<{ id: string; nome: string | null; email: string | null }>()
  const alunos = alunosRows.results ?? []

  const entregasRows = await env.DB.prepare(
    `SELECT user_id FROM entregas WHERE avaliacao_slug = ? AND user_id IN (SELECT id FROM users WHERE turma_id = ?)`
  ).bind(slug, turmaId).all<{ user_id: string }>()
  const entregaUserIds = new Set((entregasRows.results ?? []).map(r => r.user_id))

  const notasRows = await env.DB.prepare(
    `SELECT user_id, indicador_codigo, valor FROM notas WHERE avaliacao_slug = ? AND user_id IN (SELECT id FROM users WHERE turma_id = ?)`
  ).bind(slug, turmaId).all<{ user_id: string; indicador_codigo: string; valor: string }>()

  const notasByUser = new Map<string, Record<string, string>>()
  for (const row of notasRows.results ?? []) {
    const map = notasByUser.get(row.user_id) ?? {}
    map[row.indicador_codigo] = row.valor
    notasByUser.set(row.user_id, map)
  }

  const alunosResult = alunos.map(a => ({
    id: a.id,
    nome: a.nome,
    email: a.email,
    entregou: entregaUserIds.has(a.id),
    notas: notasByUser.get(a.id) ?? {},
  }))

  return jsonResponse({
    avaliacao,
    avaliacaoTurma: avaliacaoTurmaRow
      ? { prazo: avaliacaoTurmaRow.prazo, prazoLabel: avaliacaoTurmaRow.prazo_label, status: avaliacaoTurmaRow.status }
      : null,
    indicadores,
    alunos: alunosResult,
  })
}

interface NotaUpdatePayload {
  userId?: string
  avaliacaoSlug?: string
  indicadorCodigo?: string
  valor?: 'A' | 'PA' | 'NA' | null
}

// Batch upsert/delete de notas (RF12, CA4). `valor: null` DELETA a linha —
// nunca vira 'NA' implícito, volta a "não avaliado". Statements são
// preparadas e rodadas via `env.DB.batch` (mesmo padrão do resto do arquivo);
// entradas malformadas (faltando algum campo) são ignoradas silenciosamente,
// mas contam para `aplicadas` só as que de fato viraram uma statement.
async function handleAdminNotasUpdate(request: Request, env: Env): Promise<Response> {
  const payload = await requireAdmin(request, env)
  if (!payload || payload.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 401)

  let body: { notas?: NotaUpdatePayload[] }
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  const notas = body.notas ?? []
  if (!Array.isArray(notas) || notas.length === 0) return jsonResponse({ error: 'Missing notas array' }, 422)

  const statements: D1PreparedStatement[] = []
  for (const n of notas) {
    if (!n.userId || !n.avaliacaoSlug || !n.indicadorCodigo) continue

    if (n.valor === null || n.valor === undefined) {
      statements.push(env.DB.prepare(
        `DELETE FROM notas WHERE user_id = ? AND avaliacao_slug = ? AND indicador_codigo = ?`
      ).bind(n.userId, n.avaliacaoSlug, n.indicadorCodigo))
    } else if (n.valor === 'A' || n.valor === 'PA' || n.valor === 'NA') {
      statements.push(env.DB.prepare(`
        INSERT INTO notas (user_id, avaliacao_slug, indicador_codigo, valor, updated_at)
        VALUES (?, ?, ?, ?, unixepoch())
        ON CONFLICT (user_id, avaliacao_slug, indicador_codigo) DO UPDATE SET
          valor = excluded.valor, updated_at = excluded.updated_at
      `).bind(n.userId, n.avaliacaoSlug, n.indicadorCodigo, n.valor))
    }
    // valor com qualquer outro valor (string inválida) é silenciosamente
    // ignorado — mesmo tratamento das outras entradas malformadas acima.
  }

  if (statements.length === 0) return jsonResponse({ ok: true, aplicadas: 0 })

  await env.DB.batch(statements)
  return jsonResponse({ ok: true, aplicadas: statements.length })
}

// Boletim consolidado de um trimestre, para uma turma (RF13, CA3). Junta
// TODOS os valores de `notas` de cada (aluno, indicador) — independente da
// avaliação — e aplica `consolidarNota` (max A>PA>NA, shared/pure.ts, T2).
// Indicador sem nenhuma nota não entra no mapa `consolidado` daquele aluno
// (RF12 — ausência de chave, não um valor nulo no JSON).
async function handleAdminBoletim(request: Request, env: Env): Promise<Response> {
  const payload = await requireAdmin(request, env)
  if (!payload || payload.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 401)

  const url = new URL(request.url)
  const trimestre = url.searchParams.get('trimestre')
  if (!trimestre) return jsonResponse({ error: 'Parâmetro trimestre obrigatório' }, 400)

  const turmaResult = await resolveTurmaParam(url, env)
  if ('error' in turmaResult) return turmaResult.error
  const { turmaId } = turmaResult

  const indicadoresRows = await env.DB.prepare(`
    SELECT i.codigo, i.uc, i.descricao
    FROM indicadores i
    JOIN ucs u ON u.codigo = i.uc
    WHERE u.ano_curso = ? AND i.trimestres LIKE '%' || ? || '%'
    ORDER BY i.uc, i.numero
  `).bind(ANO_CURSO_ATUAL, trimestre).all<{ codigo: string; uc: string; descricao: string }>()
  const indicadores = indicadoresRows.results ?? []
  const codigos = indicadores.map(i => i.codigo)

  const alunosRows = await env.DB.prepare(
    `SELECT id, nome, email FROM users WHERE turma_id = ? ORDER BY nome`
  ).bind(turmaId).all<{ id: string; nome: string | null; email: string | null }>()
  const alunos = alunosRows.results ?? []

  if (codigos.length === 0 || alunos.length === 0) {
    return jsonResponse({
      indicadores,
      alunos: alunos.map(a => ({ id: a.id, nome: a.nome, email: a.email, consolidado: {} })),
    })
  }

  const placeholders = codigos.map(() => '?').join(',')
  const notasRows = await env.DB.prepare(`
    SELECT user_id, indicador_codigo, valor
    FROM notas
    WHERE indicador_codigo IN (${placeholders}) AND user_id IN (SELECT id FROM users WHERE turma_id = ?)
  `).bind(...codigos, turmaId).all<{ user_id: string; indicador_codigo: string; valor: 'A' | 'PA' | 'NA' }>()

  const valoresByUserIndicador = new Map<string, Array<'A' | 'PA' | 'NA'>>()
  for (const row of notasRows.results ?? []) {
    const key = `${row.user_id}:${row.indicador_codigo}`
    const list = valoresByUserIndicador.get(key) ?? []
    list.push(row.valor)
    valoresByUserIndicador.set(key, list)
  }

  const alunosResult = alunos.map(a => {
    const consolidado: Record<string, 'A' | 'PA' | 'NA'> = {}
    for (const codigo of codigos) {
      const valores = valoresByUserIndicador.get(`${a.id}:${codigo}`) ?? []
      const consolidadoValor = consolidarNota(valores)
      if (consolidadoValor !== null) consolidado[codigo] = consolidadoValor
    }
    return { id: a.id, nome: a.nome, email: a.email, consolidado }
  })

  return jsonResponse({ indicadores, alunos: alunosResult })
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

