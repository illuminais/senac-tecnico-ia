/**
 * Mensagem do professor pro banner do portal. Movido de
 * platform/worker/src/index.ts (spec 04-worker-arquitetura-modular, T7).
 */

import type { Env } from '../types'
import { jsonResponse } from '../lib/http'
import { requireAdmin } from '../lib/auth'

export async function handleGetMessage(env: Env): Promise<Response> {
  const row = await env.DB.prepare(
    `SELECT value FROM site_config WHERE key = 'professor_message'`
  ).first<{ value: string }>()
  return jsonResponse({ message: row?.value ?? '' })
}

export async function handlePutMessage(request: Request, env: Env): Promise<Response> {
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
