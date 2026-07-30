/**
 * Sync de progresso/respostas do aluno. Movido de platform/worker/src/index.ts
 * (spec 04-worker-arquitetura-modular, T6).
 */

import type { Env, SyncPayload } from '../types'
import { jsonResponse } from '../lib/http'
import { requireAuth } from '../lib/auth'

export async function handleSync(request: Request, env: Env): Promise<Response> {
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
