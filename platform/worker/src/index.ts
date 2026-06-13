/**
 * Cloudflare Worker — API LMS
 *
 * Rotas públicas:
 *   GET  /api/message                — mensagem do professor
 *   POST /api/auth/login             — login admin (username/password → JWT)
 *   GET  /api/auth/google            — inicia OAuth Google (redirect)
 *   GET  /api/auth/google/callback   — callback OAuth Google (emite JWT aluno)
 *
 * Rotas autenticadas (aluno ou admin):
 *   GET  /api/auth/me                — retorna dados do usuário logado
 *   POST /api/sync                   — salva progresso (aluno)
 *   POST /api/entregas               — registra entrega de avaliação (aluno)
 *
 * Rotas autenticadas (admin):
 *   PUT  /api/message                — atualiza mensagem do professor
 */

interface Env {
  DB: D1Database
  ADMIN_USERNAME: string        // wrangler secret
  ADMIN_PASSWORD: string        // wrangler secret
  JWT_SECRET: string            // wrangler secret
  GOOGLE_CLIENT_ID: string      // wrangler secret
  GOOGLE_CLIENT_SECRET: string  // wrangler secret
  GOOGLE_ALLOWED_DOMAIN: string // wrangler secret: escola.pr.gov.br
  PORTAL_URL: string            // wrangler var: URL do frontend
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

function b64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function decodeB64url(str: string): Uint8Array {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/')
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0))
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
// Auth helpers
// ---------------------------------------------------------------------------

async function requireAuth(request: Request, env: Env): Promise<Record<string, unknown> | null> {
  const authHeader = request.headers.get('Authorization') ?? ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  if (!token) return null
  return verifyJwt(token, env.JWT_SECRET)
}

function oauthCallbackUri(request: Request): string {
  const url = new URL(request.url)
  return `${url.protocol}//${url.host}/api/auth/google/callback`
}

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() })
    }

    // Públicas
    if (request.method === 'GET'  && url.pathname === '/api/message')                return handleGetMessage(env)
    if (request.method === 'POST' && url.pathname === '/api/auth/login')             return handleAdminLogin(request, env)
    if (request.method === 'GET'  && url.pathname === '/api/auth/google')            return handleGoogleInit(request, env)
    if (request.method === 'GET'  && url.pathname === '/api/auth/google/callback')   return handleGoogleCallback(request, env)

    // Autenticadas
    if (request.method === 'GET'  && url.pathname === '/api/auth/me')    return handleMe(request, env)
    if (request.method === 'POST' && url.pathname === '/api/sync')       return handleSync(request, env)
    if (request.method === 'POST' && url.pathname === '/api/entregas')   return handleEntrega(request, env)

    // Admin
    if (request.method === 'PUT' && url.pathname === '/api/message')     return handlePutMessage(request, env)

    return new Response('Not found', { status: 404 })
  },
}

// ---------------------------------------------------------------------------
// Handlers — públicos
// ---------------------------------------------------------------------------

async function handleAdminLogin(request: Request, env: Env): Promise<Response> {
  let body: { username?: string; password?: string }
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  const { username, password } = body
  if (!username || !password) return jsonResponse({ error: 'Missing credentials' }, 400)

  const userOk = await safeEqual(username, env.ADMIN_USERNAME ?? '')
  const passOk = await safeEqual(password, env.ADMIN_PASSWORD ?? '')
  if (!userOk || !passOk) return jsonResponse({ error: 'Invalid credentials' }, 401)

  const token = await signJwt(
    { sub: username, role: 'admin', exp: Math.floor(Date.now() / 1000) + 86400 },
    env.JWT_SECRET ?? '',
  )
  return jsonResponse({ token })
}

async function handleGoogleInit(request: Request, env: Env): Promise<Response> {
  // State é um JWT assinado com 5 min de expiração — stateless, sem KV
  const state = await signJwt(
    { purpose: 'oauth_state', exp: Math.floor(Date.now() / 1000) + 300 },
    env.JWT_SECRET,
  )
  const params = new URLSearchParams({
    client_id:     env.GOOGLE_CLIENT_ID,
    redirect_uri:  oauthCallbackUri(request),
    response_type: 'code',
    scope:         'openid email profile',
    state,
    prompt:        'select_account',
  })
  return Response.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`, 302)
}

async function handleGoogleCallback(request: Request, env: Env): Promise<Response> {
  const url       = new URL(request.url)
  const code      = url.searchParams.get('code')
  const state     = url.searchParams.get('state')
  const portalUrl = env.PORTAL_URL ?? ''

  // Valida state anti-CSRF
  if (!state) return authErrorRedirect(portalUrl, 'invalid_state')
  const statePayload = await verifyJwt(state, env.JWT_SECRET)
  if (!statePayload || statePayload.purpose !== 'oauth_state') {
    return authErrorRedirect(portalUrl, 'invalid_state')
  }

  if (!code) return authErrorRedirect(portalUrl, 'no_code')

  // Troca code por access_token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id:     env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri:  oauthCallbackUri(request),
      grant_type:    'authorization_code',
    }),
  })
  if (!tokenRes.ok) return authErrorRedirect(portalUrl, 'token_exchange_failed')

  const tokenData = await tokenRes.json() as { access_token?: string }
  if (!tokenData.access_token) return authErrorRedirect(portalUrl, 'no_access_token')

  // Busca info do usuário
  const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  })
  if (!userRes.ok) return authErrorRedirect(portalUrl, 'userinfo_failed')

  const userInfo = await userRes.json() as { sub?: string; email?: string; name?: string }
  const { sub, email, name } = userInfo
  if (!sub || !email) return authErrorRedirect(portalUrl, 'missing_user_info')

  // Valida domínio — suporta múltiplos separados por vírgula (ex: "escola.pr.gov.br,gmail.com" para testes)
  const allowedDomains = (env.GOOGLE_ALLOWED_DOMAIN ?? 'escola.pr.gov.br').split(',').map(d => d.trim())
  if (!allowedDomains.some(d => email.endsWith(`@${d}`))) {
    return authErrorRedirect(portalUrl, 'invalid_domain')
  }

  // Upsert do aluno no D1
  await env.DB.prepare(`
    INSERT INTO users (id, nome, email, created_at)
    VALUES (?, ?, ?, unixepoch())
    ON CONFLICT (id) DO UPDATE SET nome = excluded.nome, email = excluded.email
  `).bind(sub, name ?? email, email).run()

  // Emite JWT do aluno (30 dias)
  const jwt = await signJwt(
    { sub, email, name: name ?? email, role: 'student', exp: Math.floor(Date.now() / 1000) + 86400 * 30 },
    env.JWT_SECRET,
  )
  return Response.redirect(`${portalUrl}/auth/callback?token=${encodeURIComponent(jwt)}`, 302)
}

// ---------------------------------------------------------------------------
// Handlers — autenticados
// ---------------------------------------------------------------------------

async function handleMe(request: Request, env: Env): Promise<Response> {
  const payload = await requireAuth(request, env)
  if (!payload) return jsonResponse({ error: 'Unauthorized' }, 401)
  return jsonResponse({ sub: payload.sub, email: payload.email, name: payload.name, role: payload.role })
}

// ---------------------------------------------------------------------------
// Handlers — públicos (continuação)
// ---------------------------------------------------------------------------

async function handleGetMessage(env: Env): Promise<Response> {
  const row = await env.DB.prepare(
    `SELECT value FROM site_config WHERE key = 'professor_message'`
  ).first<{ value: string }>()
  return jsonResponse({ message: row?.value ?? '' })
}

async function handlePutMessage(request: Request, env: Env): Promise<Response> {
  const payload = await requireAuth(request, env)
  if (!payload || payload.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 401)

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
  if (!payload) return jsonResponse({ error: 'Unauthorized' }, 401)

  let body: { aulaId?: string; progresso?: number; respostas?: Record<string, string> }
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  const { aulaId, progresso, respostas } = body
  if (!aulaId || typeof progresso !== 'number') {
    return jsonResponse({ error: 'Missing required fields: aulaId, progresso' }, 422)
  }

  const userId = payload.sub as string

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

async function handleEntrega(request: Request, env: Env): Promise<Response> {
  const payload = await requireAuth(request, env)
  if (!payload) return jsonResponse({ error: 'Unauthorized' }, 401)
  if (payload.role !== 'student') return jsonResponse({ error: 'Forbidden' }, 403)

  let body: { avaliacaoId?: string; link?: string }
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  const { avaliacaoId, link } = body
  if (!avaliacaoId || !link) return jsonResponse({ error: 'Missing avaliacaoId or link' }, 422)
  try { new URL(link) } catch { return jsonResponse({ error: 'link must be a valid URL' }, 422) }

  const userId = payload.sub as string

  await env.DB.prepare(`
    INSERT INTO entregas (user_id, avaliacao_slug, link, updated_at)
    VALUES (?, ?, ?, unixepoch())
    ON CONFLICT (user_id, avaliacao_slug)
    DO UPDATE SET link = excluded.link, updated_at = excluded.updated_at
  `).bind(userId, avaliacaoId, link.slice(0, 2000)).run()

  return jsonResponse({ ok: true })
}

// ---------------------------------------------------------------------------
// Handlers — admin
// ---------------------------------------------------------------------------

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

function authErrorRedirect(portalUrl: string, error: string): Response {
  return Response.redirect(`${portalUrl}/auth/callback?error=${error}`, 302)
}

