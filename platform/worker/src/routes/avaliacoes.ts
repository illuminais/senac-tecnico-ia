/**
 * Listagem pública de avaliações (com indicadores/UC/prazo/status pela turma)
 * + badge de novidade + marcar-vistas do aluno. Movido de
 * platform/worker/src/index.ts (spec 04-worker-arquitetura-modular, T10).
 */

import type { Env } from '../types'
import { jsonResponse } from '../lib/http'
import { requireAuth } from '../lib/auth'

// Resolve de qual turma puxar prazoLabel/status de aplicação em
// GET /api/avaliacoes (D8, plan.md "Fallback de /api/avaliacoes sem turma
// resolvida"). JWT é opcional: se presente, válido e de aluno com
// `turma_id` não nulo, usa a turma daquele aluno especificamente (busca
// `users` fresco — o JWT não carrega turma_id, ela pode mudar depois do
// login). Caso contrário, cai para a turma `status='ativa'` mais recente
// por `ano_ingresso` (hoje sempre resolve para a única turma, '2026A').
async function resolveAvaliacoesTurmaId(request: Request, env: Env): Promise<string | null> {
  const payload = await requireAuth(request, env)
  if (payload && payload.role === 'student' && typeof payload.sub === 'string') {
    const user = await env.DB.prepare(
      `SELECT turma_id FROM users WHERE id = ?`
    ).bind(payload.sub).first<{ turma_id: string | null }>()
    if (user?.turma_id) return user.turma_id
  }

  const turma = await env.DB.prepare(
    `SELECT id FROM turmas WHERE status = 'ativa' ORDER BY ano_ingresso DESC LIMIT 1`
  ).first<{ id: string }>()
  return turma?.id ?? null
}

// Pública — nunca retorna 401/403 por falta de JWT (RF6). O `status` no
// retorno é o de APLICAÇÃO (avaliacoes_turma.status), não o de conteúdo
// (avaliacoes.status) — cuidado para não confundir os dois na leitura.
//
// Sprint 04: quando há JWT de aluno, também resolve `entregou` (existe linha
// em `entregas`) e, por indicador, a própria nota/comentário já lançados —
// mesma resposta alimenta tanto o card da listagem quanto a tela de detalhe,
// sem endpoint separado só pra isso.
export async function handleGetAvaliacoes(request: Request, env: Env): Promise<Response> {
  const turmaId = await resolveAvaliacoesTurmaId(request, env)

  const authPayload = await requireAuth(request, env)
  const userId = authPayload && authPayload.role === 'student' && typeof authPayload.sub === 'string'
    ? authPayload.sub
    : null

  const avaliacoesRows = await env.DB.prepare(
    `SELECT slug, titulo, tipo, trimestre FROM avaliacoes ORDER BY trimestre, slug`
  ).all<{ slug: string; titulo: string; tipo: string | null; trimestre: string }>()

  const avaliacaoTurmaRows = turmaId
    ? await env.DB.prepare(
        `SELECT avaliacao_slug, prazo, prazo_label, status FROM avaliacoes_turma WHERE turma_id = ?`
      ).bind(turmaId).all<{ avaliacao_slug: string; prazo: string | null; prazo_label: string | null; status: string }>()
    : null

  const turmaBySlug = new Map<string, { prazo: string | null; prazoLabel: string | null; status: string }>()
  for (const row of avaliacaoTurmaRows?.results ?? []) {
    turmaBySlug.set(row.avaliacao_slug, { prazo: row.prazo, prazoLabel: row.prazo_label, status: row.status })
  }

  const indicadorRows = await env.DB.prepare(`
    SELECT ai.avaliacao_slug, i.codigo, i.uc, i.descricao
    FROM avaliacao_indicadores ai
    JOIN indicadores i ON i.codigo = ai.indicador_codigo
    ORDER BY ai.avaliacao_slug, i.uc, i.numero
  `).all<{ avaliacao_slug: string; codigo: string; uc: string; descricao: string }>()

  const indicadoresBySlug = new Map<string, { codigo: string; uc: string; descricao: string }[]>()
  for (const row of indicadorRows.results ?? []) {
    const list = indicadoresBySlug.get(row.avaliacao_slug) ?? []
    list.push({ codigo: row.codigo, uc: row.uc, descricao: row.descricao })
    indicadoresBySlug.set(row.avaliacao_slug, list)
  }

  const entregaSlugs = new Set<string>()
  const notasByAvaliacao = new Map<string, Map<string, { valor: string; comentario: string | null }>>()
  if (userId) {
    const entregaRows = await env.DB.prepare(
      `SELECT avaliacao_slug FROM entregas WHERE user_id = ?`
    ).bind(userId).all<{ avaliacao_slug: string }>()
    for (const row of entregaRows.results ?? []) entregaSlugs.add(row.avaliacao_slug)

    const notaRows = await env.DB.prepare(
      `SELECT avaliacao_slug, indicador_codigo, valor, comentario FROM notas WHERE user_id = ?`
    ).bind(userId).all<{ avaliacao_slug: string; indicador_codigo: string; valor: string; comentario: string | null }>()
    for (const row of notaRows.results ?? []) {
      const map = notasByAvaliacao.get(row.avaliacao_slug) ?? new Map()
      map.set(row.indicador_codigo, { valor: row.valor, comentario: row.comentario })
      notasByAvaliacao.set(row.avaliacao_slug, map)
    }
  }

  const result = (avaliacoesRows.results ?? []).map((av) => {
    const turma = turmaBySlug.get(av.slug)
    const notasIndicador = notasByAvaliacao.get(av.slug)
    return {
      slug: av.slug,
      titulo: av.titulo,
      tipo: av.tipo,
      trimestre: av.trimestre,
      prazo: turma?.prazo ?? null,
      prazoLabel: turma?.prazoLabel ?? null,
      status: turma?.status ?? null,
      entregou: userId ? entregaSlugs.has(av.slug) : null,
      indicadores: (indicadoresBySlug.get(av.slug) ?? []).map(ind => ({
        ...ind,
        notaValor: notasIndicador?.get(ind.codigo)?.valor ?? null,
        comentario: notasIndicador?.get(ind.codigo)?.comentario ?? null,
      })),
    }
  })

  return jsonResponse(result)
}

// Sprint 04 — badge de notificação da sidebar (aluno): existe avaliação
// visível pra turma do aluno que ele ainda não "viu" (sem linha em
// `avaliacoes_vistas`)? Resposta leve, de propósito — não carrega a lista
// inteira só pra acender um pontinho.
export async function handleAvaliacoesNovidade(request: Request, env: Env): Promise<Response> {
  const payload = await requireAuth(request, env)
  if (!payload || payload.role !== 'student' || typeof payload.sub !== 'string') {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }
  const userId = payload.sub

  const turmaId = await resolveAvaliacoesTurmaId(request, env)
  if (!turmaId) return jsonResponse({ hasNovidade: false })

  const row = await env.DB.prepare(`
    SELECT 1
    FROM avaliacoes_turma at
    WHERE at.turma_id = ? AND at.status IN ('published', 'concluida')
      AND at.avaliacao_slug NOT IN (
        SELECT avaliacao_slug FROM avaliacoes_vistas WHERE user_id = ?
      )
    LIMIT 1
  `).bind(turmaId, userId).first()

  return jsonResponse({ hasNovidade: !!row })
}

// Sprint 04 — marca avaliações como vistas (some o badge). Upsert idempotente:
// chamar de novo com o mesmo slug só atualiza `visto_at`, nunca duplica.
export async function handleMarcarAvaliacoesVistas(request: Request, env: Env): Promise<Response> {
  const payload = await requireAuth(request, env)
  if (!payload || payload.role !== 'student' || typeof payload.sub !== 'string') {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }
  const userId = payload.sub

  let body: { slugs?: string[] }
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  const slugs = (body.slugs ?? []).filter((s): s is string => typeof s === 'string' && s.length > 0)
  if (slugs.length === 0) return jsonResponse({ ok: true })

  const statements = slugs.map(slug => env.DB.prepare(`
    INSERT INTO avaliacoes_vistas (user_id, avaliacao_slug, visto_at)
    VALUES (?, ?, unixepoch())
    ON CONFLICT (user_id, avaliacao_slug) DO UPDATE SET visto_at = excluded.visto_at
  `).bind(userId, slug))

  await env.DB.batch(statements)
  return jsonResponse({ ok: true })
}
