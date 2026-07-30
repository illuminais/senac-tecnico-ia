/**
 * Auth genérica (extração/validação de JWT, allowlist de origem, rate limit
 * de forgot-password). Movido de platform/worker/src/index.ts
 * (spec 04-worker-arquitetura-modular, T4).
 */

import type { Env } from '../types'
import { signJwt, verifyJwt } from './jwt'

export function adminJwt(adminId: string, username: string, secret: string): Promise<string> {
  return signJwt(
    { sub: adminId, username, role: 'admin', exp: Math.floor(Date.now() / 1000) + 86400 },
    secret,
  )
}

// Extrai e valida o JWT do header Authorization — genérico, não checa role.
// Cada handler decide o que fazer com payload.role (ou se nem liga pra role).
export function requireAuth(request: Request, env: Env): Promise<Record<string, unknown> | null> {
  const authHeader = request.headers.get('Authorization') ?? ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  return verifyJwt(token, env.JWT_SECRET ?? '')
}

// Mantido como alias específico de admin — os handlers admin-only já chamam
// `requireAdmin` e checam `role === 'admin'`; não duplicar essa checagem aqui
// para não mudar o contrato existente (retorna o payload cru, igual antes).
export function requireAdmin(request: Request, env: Env): Promise<Record<string, unknown> | null> {
  return requireAuth(request, env)
}

// Origem do link de reset precisa bater com uma origem conhecida — evita que o
// endpoint seja usado para mandar emails "oficiais" com link para site de terceiro.
export function isAllowedOrigin(origin: string, env: Env): boolean {
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
export async function isForgotPasswordAllowed(email: string, env: Env): Promise<boolean> {
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
