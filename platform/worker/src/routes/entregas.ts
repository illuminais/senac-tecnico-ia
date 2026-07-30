/**
 * Entrega de link de resposta de avaliação (aluno) + histórico (admin).
 * Movido de platform/worker/src/index.ts (spec 04-worker-arquitetura-modular, T7).
 */

import type { Env } from '../types'
import { isValidEntregaUrl } from '../../../shared/pure'
import { jsonResponse } from '../lib/http'
import { requireAuth, requireAdmin } from '../lib/auth'

export async function handleCreateEntrega(request: Request, env: Env): Promise<Response> {
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

  // Trava (sprint 04): assim que existe QUALQUER nota lançada pra esse
  // aluno+avaliação, a entrega é considerada corrigida — reenviar por cima
  // apagaria o lastro que a nota se baseou. "Reabrir" é o professor apagar as
  // notas (PUT /api/admin/notas com valor:null), não um endpoint novo.
  const notaExistente = await env.DB.prepare(
    `SELECT 1 FROM notas WHERE user_id = ? AND avaliacao_slug = ? LIMIT 1`
  ).bind(userId, avaliacaoId).first()
  if (notaExistente) {
    return jsonResponse({ error: 'Entrega já corrigida — peça ao professor pra reabrir.' }, 403)
  }

  const linkTruncado = link.slice(0, 2000)

  await env.DB.prepare(`
    INSERT INTO entregas (user_id, avaliacao_slug, link, updated_at)
    VALUES (?, ?, ?, unixepoch())
    ON CONFLICT (user_id, avaliacao_slug)
    DO UPDATE SET link = excluded.link, updated_at = excluded.updated_at
  `).bind(userId, avaliacaoId, linkTruncado).run()

  // Histórico append-only (sprint 04) — nunca atualizado nem deletado, só
  // acumula uma linha por envio, pra auditoria de qual link existia quando.
  await env.DB.prepare(`
    INSERT INTO entregas_historico (user_id, avaliacao_slug, link, enviado_at)
    VALUES (?, ?, ?, unixepoch())
  `).bind(userId, avaliacaoId, linkTruncado).run()

  return jsonResponse({ ok: true })
}

// Devolve só as entregas do próprio caller — nunca de outros alunos
// (`WHERE user_id = ?` vem do JWT, nunca de um parâmetro do client).
export async function handleGetEntregas(request: Request, env: Env): Promise<Response> {
  const payload = await requireAuth(request, env)
  if (!payload || typeof payload.sub !== 'string') return jsonResponse({ error: 'Unauthorized' }, 401)
  if (payload.role !== 'student') return jsonResponse({ error: 'Forbidden' }, 403)

  const userId = payload.sub

  const rows = await env.DB.prepare(
    `SELECT avaliacao_slug, link, updated_at FROM entregas WHERE user_id = ?`
  ).bind(userId).all<{ avaliacao_slug: string; link: string; updated_at: number }>()

  // `corrigida` (sprint 04) — mesma regra de trava do handleCreateEntrega:
  // existe nota lançada pra essa avaliação? Portal usa isso pra travar o
  // formulário no client também (defesa em profundidade, não só o 403 do POST).
  const notasRows = await env.DB.prepare(
    `SELECT DISTINCT avaliacao_slug FROM notas WHERE user_id = ?`
  ).bind(userId).all<{ avaliacao_slug: string }>()
  const corrigidas = new Set((notasRows.results ?? []).map(r => r.avaliacao_slug))

  const result: Record<string, { link: string; updatedAt: number; corrigida: boolean }> = {}
  for (const row of rows.results ?? []) {
    result[row.avaliacao_slug] = {
      link: row.link,
      updatedAt: row.updated_at,
      corrigida: corrigidas.has(row.avaliacao_slug),
    }
  }

  return jsonResponse(result)
}

// Sprint 04 — histórico completo de envios de UM aluno numa avaliação
// (`entregas_historico`, append-only). Só chamado sob demanda quando o
// professor abre o painel de detalhe de um aluno — não vem de brinde no
// handleAdminGrade pra não inflar o payload da lista inteira.
export async function handleAdminEntregasHistorico(
  request: Request, env: Env, avaliacaoSlug: string, userId: string,
): Promise<Response> {
  const payload = await requireAdmin(request, env)
  if (!payload || payload.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 401)

  const rows = await env.DB.prepare(
    `SELECT link, enviado_at FROM entregas_historico WHERE user_id = ? AND avaliacao_slug = ? ORDER BY enviado_at DESC`
  ).bind(userId, avaliacaoSlug).all<{ link: string; enviado_at: number }>()

  const result = (rows.results ?? []).map(r => ({ link: r.link, enviadoAt: r.enviado_at }))
  return jsonResponse(result)
}
