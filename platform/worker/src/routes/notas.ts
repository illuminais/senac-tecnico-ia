/**
 * Batch upsert/delete de notas A/PA/NA (admin). Movido de
 * platform/worker/src/index.ts (spec 04-worker-arquitetura-modular, T11).
 */

import type { Env, NotaUpdatePayload } from '../types'
import { jsonResponse } from '../lib/http'
import { requireAdmin } from '../lib/auth'

// Batch upsert/delete de notas (RF12, CA4). `valor: null` DELETA a linha —
// nunca vira 'NA' implícito, volta a "não avaliado". Statements são
// preparadas e rodadas via `env.DB.batch` (mesmo padrão do resto do arquivo);
// entradas malformadas (faltando algum campo) são ignoradas silenciosamente,
// mas contam para `aplicadas` só as que de fato viraram uma statement.
//
// Sprint 04: `valor` PA/NA exige `comentario` não-vazio — justificativa de
// por que a nota não foi A. Entrada rejeitada por isso conta em `rejeitadas`,
// separado de `aplicadas`, pro portal avisar o professor em vez de salvar
// silenciosamente incompleto.
export async function handleAdminNotasUpdate(request: Request, env: Env): Promise<Response> {
  const payload = await requireAdmin(request, env)
  if (!payload || payload.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 401)

  let body: { notas?: NotaUpdatePayload[] }
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  const notas = body.notas ?? []
  if (!Array.isArray(notas) || notas.length === 0) return jsonResponse({ error: 'Missing notas array' }, 422)

  const statements: D1PreparedStatement[] = []
  let rejeitadas = 0
  for (const n of notas) {
    if (!n.userId || !n.avaliacaoSlug || !n.indicadorCodigo) continue

    if (n.valor === null || n.valor === undefined) {
      statements.push(env.DB.prepare(
        `DELETE FROM notas WHERE user_id = ? AND avaliacao_slug = ? AND indicador_codigo = ?`
      ).bind(n.userId, n.avaliacaoSlug, n.indicadorCodigo))
    } else if (n.valor === 'A' || n.valor === 'PA' || n.valor === 'NA') {
      const comentario = n.comentario?.trim() || null
      if (n.valor !== 'A' && !comentario) {
        rejeitadas++
        continue
      }
      statements.push(env.DB.prepare(`
        INSERT INTO notas (user_id, avaliacao_slug, indicador_codigo, valor, comentario, updated_at)
        VALUES (?, ?, ?, ?, ?, unixepoch())
        ON CONFLICT (user_id, avaliacao_slug, indicador_codigo) DO UPDATE SET
          valor = excluded.valor, comentario = excluded.comentario, updated_at = excluded.updated_at
      `).bind(n.userId, n.avaliacaoSlug, n.indicadorCodigo, n.valor, comentario))
    }
    // valor com qualquer outro valor (string inválida) é silenciosamente
    // ignorado — mesmo tratamento das outras entradas malformadas acima.
  }

  if (statements.length === 0) return jsonResponse({ ok: true, aplicadas: 0, rejeitadas })

  await env.DB.batch(statements)
  return jsonResponse({ ok: true, aplicadas: statements.length, rejeitadas })
}
