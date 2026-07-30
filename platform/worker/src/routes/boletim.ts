/**
 * Boletim consolidado por trimestre/turma (admin). Movido de
 * platform/worker/src/index.ts (spec 04-worker-arquitetura-modular, T11).
 */

import type { Env } from '../types'
import { consolidarNota } from '../../../shared/pure'
import { jsonResponse } from '../lib/http'
import { requireAdmin } from '../lib/auth'
import { ANO_CURSO_ATUAL, resolveTurmaParam } from '../lib/turma-context'

// Boletim consolidado de um trimestre, para uma turma (RF13, CA3). Junta
// TODOS os valores de `notas` de cada (aluno, indicador) — independente da
// avaliação — e aplica `consolidarNota` (max A>PA>NA, shared/pure.ts, T2).
// Indicador sem nenhuma nota não entra no mapa `consolidado` daquele aluno
// (RF12 — ausência de chave, não um valor nulo no JSON).
export async function handleAdminBoletim(request: Request, env: Env): Promise<Response> {
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
  const codigos = indicadores.map(i => i.codigo)

  const alunosRows = await env.DB.prepare(
    `SELECT id, nome, email FROM users WHERE turma_id = ? ORDER BY nome`
  ).bind(turmaId).all<{ id: string; nome: string | null; email: string | null }>()
  const alunos = alunosRows.results ?? []

  if (codigos.length === 0 || alunos.length === 0) {
    return jsonResponse({
      indicadores,
      alunos: alunos.map(a => ({ id: a.id, nome: a.nome, email: a.email, consolidado: {} })),
    })
  }

  const placeholders = codigos.map(() => '?').join(',')
  const notasRows = await env.DB.prepare(`
    SELECT user_id, indicador_codigo, valor
    FROM notas
    WHERE indicador_codigo IN (${placeholders}) AND user_id IN (SELECT id FROM users WHERE turma_id = ?)
  `).bind(...codigos, turmaId).all<{ user_id: string; indicador_codigo: string; valor: 'A' | 'PA' | 'NA' }>()

  const valoresByUserIndicador = new Map<string, Array<'A' | 'PA' | 'NA'>>()
  for (const row of notasRows.results ?? []) {
    const key = `${row.user_id}:${row.indicador_codigo}`
    const list = valoresByUserIndicador.get(key) ?? []
    list.push(row.valor)
    valoresByUserIndicador.set(key, list)
  }

  const alunosResult = alunos.map(a => {
    const consolidado: Record<string, 'A' | 'PA' | 'NA'> = {}
    for (const codigo of codigos) {
      const valores = valoresByUserIndicador.get(`${a.id}:${codigo}`) ?? []
      const consolidadoValor = consolidarNota(valores)
      if (consolidadoValor !== null) consolidado[codigo] = consolidadoValor
    }
    return { id: a.id, nome: a.nome, email: a.email, consolidado }
  })

  return jsonResponse({ indicadores, alunos: alunosResult })
}
