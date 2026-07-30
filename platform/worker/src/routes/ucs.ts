/**
 * Referência estática de UCs (admin). Movido de platform/worker/src/index.ts
 * (spec 04-worker-arquitetura-modular, T10).
 */

import type { Env } from '../types'
import { jsonResponse } from '../lib/http'
import { requireAdmin } from '../lib/auth'

// Referência estática (RF19, D9): buscada uma vez pelo client e usada
// localmente para resolver conhecimentos/habilidades de qualquer indicador
// exibido no painel/grade, sem inflar o payload dessas rotas com o texto
// inteiro da UC repetido por indicador.
export async function handleGetUcs(request: Request, env: Env): Promise<Response> {
  const payload = await requireAdmin(request, env)
  if (!payload || payload.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 401)

  const rows = await env.DB.prepare(
    `SELECT codigo, nome, ano_curso, conhecimentos, habilidades FROM ucs ORDER BY codigo`
  ).all<{ codigo: string; nome: string; ano_curso: number; conhecimentos: string; habilidades: string }>()

  const result = (rows.results ?? []).map(u => ({
    codigo: u.codigo,
    nome: u.nome,
    anoCurso: u.ano_curso,
    conhecimentos: u.conhecimentos,
    habilidades: u.habilidades,
  }))
  return jsonResponse(result)
}
