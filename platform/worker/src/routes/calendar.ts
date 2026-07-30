/**
 * Calendário de aulas (dias/blocos) + resumo de HA por UC. Movido de
 * platform/worker/src/index.ts (spec 04-worker-arquitetura-modular, T8).
 */

import type { Env, CalendarDayPayload } from '../types'
import { jsonResponse } from '../lib/http'
import { requireAdmin } from '../lib/auth'

export async function handleGetCalendar(env: Env): Promise<Response> {
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

export async function handleGetResumoHa(env: Env): Promise<Response> {
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

export async function handleImportCalendar(request: Request, env: Env): Promise<Response> {
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
