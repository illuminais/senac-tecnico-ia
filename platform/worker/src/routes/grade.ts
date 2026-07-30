/**
 * Grade aluno x indicador de uma avaliação, para uma turma (admin). Movido de
 * platform/worker/src/index.ts (spec 04-worker-arquitetura-modular, T11).
 */

import type { Env } from '../types'
import { jsonResponse } from '../lib/http'
import { requireAdmin } from '../lib/auth'
import { resolveTurmaParam } from '../lib/turma-context'

// Grade aluno x indicador de UMA avaliação, para UMA turma (RF10). `alunos`
// vem só de `users` filtrado por `turma_id` (CA8 — nunca de outra turma).
// `notas` no retorno de cada aluno só traz os indicadores com nota lançada —
// ausência de chave é "não avaliado" (RF12), nunca um valor inventado.
export async function handleAdminGrade(request: Request, env: Env, slug: string): Promise<Response> {
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
    `SELECT user_id, link, updated_at FROM entregas WHERE avaliacao_slug = ? AND user_id IN (SELECT id FROM users WHERE turma_id = ?)`
  ).bind(slug, turmaId).all<{ user_id: string; link: string; updated_at: number }>()
  const entregaByUser = new Map(entregasRows.results?.map(r => [r.user_id, r]) ?? [])

  const notasRows = await env.DB.prepare(
    `SELECT user_id, indicador_codigo, valor, comentario FROM notas WHERE avaliacao_slug = ? AND user_id IN (SELECT id FROM users WHERE turma_id = ?)`
  ).bind(slug, turmaId).all<{ user_id: string; indicador_codigo: string; valor: string; comentario: string | null }>()

  const notasByUser = new Map<string, Record<string, string>>()
  const comentariosByUser = new Map<string, Record<string, string | null>>()
  for (const row of notasRows.results ?? []) {
    const map = notasByUser.get(row.user_id) ?? {}
    map[row.indicador_codigo] = row.valor
    notasByUser.set(row.user_id, map)

    const comentarioMap = comentariosByUser.get(row.user_id) ?? {}
    comentarioMap[row.indicador_codigo] = row.comentario
    comentariosByUser.set(row.user_id, comentarioMap)
  }

  const alunosResult = alunos.map(a => {
    const entrega = entregaByUser.get(a.id)
    return {
      id: a.id,
      nome: a.nome,
      email: a.email,
      entregou: !!entrega,
      entregaLink: entrega?.link ?? null,
      entregaEm: entrega?.updated_at ?? null,
      notas: notasByUser.get(a.id) ?? {},
      comentarios: comentariosByUser.get(a.id) ?? {},
    }
  })

  return jsonResponse({
    avaliacao,
    avaliacaoTurma: avaliacaoTurmaRow
      ? { prazo: avaliacaoTurmaRow.prazo, prazoLabel: avaliacaoTurmaRow.prazo_label, status: avaliacaoTurmaRow.status }
      : null,
    indicadores,
    alunos: alunosResult,
  })
}
