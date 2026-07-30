/**
 * Painel de cobertura curricular por trimestre/turma (admin). Movido de
 * platform/worker/src/index.ts (spec 04-worker-arquitetura-modular, T11).
 */

import type { Env } from '../types'
import { jsonResponse } from '../lib/http'
import { requireAdmin } from '../lib/auth'
import { ANO_CURSO_ATUAL, resolveTurmaParam } from '../lib/turma-context'

// Painel de cobertura de um trimestre (RF9, CA2): lista TODOS os indicadores
// do mapa curricular daquele trimestre (`ano_curso` fixo, não filtrado por
// turma — grade fixa do currículo), inclusive os sem nenhuma avaliação
// vinculada. `avaliacoes` inclui TODAS as avaliações ligadas ao indicador,
// independente do trimestre da própria avaliação (achado do analyze.md: os
// dois podem discordar; o painel é por trimestre do INDICADOR).
export async function handleAdminPainel(request: Request, env: Env): Promise<Response> {
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
