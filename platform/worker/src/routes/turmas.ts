/**
 * Lista de turmas (admin). Movido de platform/worker/src/index.ts
 * (spec 04-worker-arquitetura-modular, T10).
 */

import type { Env } from '../types'
import { jsonResponse } from '../lib/http'
import { requireAdmin } from '../lib/auth'

export async function handleGetTurmas(request: Request, env: Env): Promise<Response> {
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
