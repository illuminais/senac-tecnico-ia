/**
 * Contexto de turma compartilhado pelas rotas admin de painel/grade/boletim.
 * Movido de platform/worker/src/index.ts (spec 04-worker-arquitetura-modular, T5).
 */

import type { Env } from '../types'
import { jsonResponse } from './http'

// Ano do curso relevante para o mapa curricular do painel/boletim (RF9). Hoje
// só existe catálogo semeado para ano_curso=1 (sprint 03, uma turma/um ano
// ativos); quando houver mais de um ano em curso simultaneamente, essa
// resolução vai precisar derivar de qual turma foi passada (ex.: turma ->
// coorte -> ano corrente), mas essa relação não existe no schema ainda (D8
// trata turma e ano_curso como eixos deliberadamente separados). Mantido como
// constante isolada — quando a segunda turma/ano chegar, é aqui que entra a
// lógica nova, sem espalhar um "1" mágico pelas queries de painel/boletim.
export const ANO_CURSO_ATUAL = 1

// Resolve o turma_id efetivo para as rotas admin que listam alunos/notas de
// uma turma (painel, grade, boletim — RF17/D8). Se `turma` vem na query,
// usa direto sem validar existência (se não existir, a query simplesmente
// não encontra ninguém — não é erro). Se omitido, só resolve sozinho quando
// existe exatamente uma turma `status='ativa'`; com zero ou duas+ turmas
// ativas, responde 400 — nunca mistura alunos de turmas diferentes
// silenciosamente (CA8).
export async function resolveTurmaParam(url: URL, env: Env): Promise<{ turmaId: string } | { error: Response }> {
  const turmaParam = url.searchParams.get('turma')
  if (turmaParam) return { turmaId: turmaParam }

  const ativas = await env.DB.prepare(
    `SELECT id FROM turmas WHERE status = 'ativa'`
  ).all<{ id: string }>()
  const rows = ativas.results ?? []

  if (rows.length === 1) return { turmaId: rows[0].id }

  return {
    error: jsonResponse(
      { error: 'Parâmetro turma obrigatório: existem múltiplas turmas ativas (ou nenhuma)' },
      400,
    ),
  }
}
