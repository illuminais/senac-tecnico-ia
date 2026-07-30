/**
 * Upsert em lote de ucs/indicadores/avaliações/vínculos/turmas/avaliacoes_turma
 * a partir do payload já resolvido por platform/scripts/seed-indicadores.mjs
 * (ou de um payload parcial, ex.: platform/scripts/publish-avaliacao.mjs).
 *
 * Exceção documentada (constitution §9, spec 04-worker-arquitetura-modular):
 * é o único endpoint que decide o que fazer pelo formato do payload (uma
 * seção por tabela do currículo) — mantido porque já é atômico por seção;
 * NUNCA toca `notas` nem `users.turma_id` (RF5, CA5) — nenhuma statement
 * abaixo referencia essas duas coisas.
 *
 * Ordem das statements respeita as FKs "soft" do schema (ucs -> indicadores ->
 * avaliacoes -> avaliacao_indicadores -> turmas -> avaliacoes_turma). D1/SQLite
 * não impõe PRAGMA foreign_keys aqui (ver platform-schema-d1), então um
 * indicador com `uc` inexistente não derruba o batch — só fica com join órfão;
 * aceito conscientemente (mesmo risco já registrado no schema.sql para `notas`).
 *
 * avaliacao_indicadores: escolhido "delete por avaliacao_slug + reinsert",
 * igual ao padrão de handleImportCalendar com calendar_blocos — mais simples
 * que resolver upsert na PK composta quando o conjunto de vínculos de uma
 * avaliação pode encolher entre dois seeds (ex.: um indicador removido do
 * meta.yaml). Upsert puro nunca apagaria o vínculo antigo; delete+reinsert
 * sim, e é upsert-only do ponto de vista do estado final (idempotente).
 *
 * Movido de platform/worker/src/index.ts (spec 04-worker-arquitetura-modular, T9).
 */

import type { Env, SeedPayload } from '../types'
import { jsonResponse } from '../lib/http'
import { requireAdmin } from '../lib/auth'

export async function handleAdminSeed(request: Request, env: Env): Promise<Response> {
  const payload = await requireAdmin(request, env)
  if (!payload || payload.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 401)

  let body: SeedPayload
  try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }

  const ucs = body.ucs ?? []
  const indicadores = body.indicadores ?? []
  const avaliacoes = body.avaliacoes ?? []
  const avaliacaoIndicadores = body.avaliacaoIndicadores ?? []
  const turmas = body.turmas ?? []
  const avaliacoesTurma = body.avaliacoesTurma ?? []

  const statements: D1PreparedStatement[] = []

  // 1. ucs
  for (const uc of ucs) {
    if (!uc.codigo) continue
    statements.push(env.DB.prepare(`
      INSERT INTO ucs (codigo, nome, ano_curso, conhecimentos, habilidades, updated_at)
      VALUES (?, ?, ?, ?, ?, unixepoch())
      ON CONFLICT (codigo) DO UPDATE SET
        nome = excluded.nome, ano_curso = excluded.ano_curso,
        conhecimentos = excluded.conhecimentos, habilidades = excluded.habilidades,
        updated_at = excluded.updated_at
    `).bind(uc.codigo, uc.nome, uc.anoCurso, uc.conhecimentos, uc.habilidades))
  }

  // 2. indicadores (FK "soft" -> ucs.codigo)
  for (const ind of indicadores) {
    if (!ind.codigo) continue
    statements.push(env.DB.prepare(`
      INSERT INTO indicadores (codigo, uc, numero, descricao, trimestres, updated_at)
      VALUES (?, ?, ?, ?, ?, unixepoch())
      ON CONFLICT (codigo) DO UPDATE SET
        uc = excluded.uc, numero = excluded.numero, descricao = excluded.descricao,
        trimestres = excluded.trimestres, updated_at = excluded.updated_at
    `).bind(ind.codigo, ind.uc, ind.numero, ind.descricao, ind.trimestres ?? ''))
  }

  // 3. avaliacoes
  for (const av of avaliacoes) {
    if (!av.slug) continue
    statements.push(env.DB.prepare(`
      INSERT INTO avaliacoes (slug, titulo, tipo, trimestre, status, updated_at)
      VALUES (?, ?, ?, ?, ?, unixepoch())
      ON CONFLICT (slug) DO UPDATE SET
        titulo = excluded.titulo, tipo = excluded.tipo, trimestre = excluded.trimestre,
        status = excluded.status, updated_at = excluded.updated_at
    `).bind(av.slug, av.titulo, av.tipo ?? null, av.trimestre, av.status))
  }

  // 4. avaliacao_indicadores — delete por avaliacao_slug antes de reinserir
  // (ver nota de design acima da função).
  const slugsComVinculo = new Set(avaliacaoIndicadores.map((v) => v.avaliacaoSlug))
  for (const slug of slugsComVinculo) {
    statements.push(env.DB.prepare(`DELETE FROM avaliacao_indicadores WHERE avaliacao_slug = ?`).bind(slug))
  }
  for (const v of avaliacaoIndicadores) {
    if (!v.avaliacaoSlug || !v.indicadorCodigo) continue
    statements.push(env.DB.prepare(`
      INSERT INTO avaliacao_indicadores (avaliacao_slug, indicador_codigo)
      VALUES (?, ?)
    `).bind(v.avaliacaoSlug, v.indicadorCodigo))
  }

  // 5. turmas
  for (const t of turmas) {
    if (!t.id) continue
    statements.push(env.DB.prepare(`
      INSERT INTO turmas (id, ano_ingresso, status, updated_at)
      VALUES (?, ?, ?, unixepoch())
      ON CONFLICT (id) DO UPDATE SET
        ano_ingresso = excluded.ano_ingresso, status = excluded.status, updated_at = excluded.updated_at
    `).bind(t.id, t.anoIngresso, t.status))
  }

  // 6. avaliacoes_turma (PK composta turma_id+avaliacao_slug)
  for (const at of avaliacoesTurma) {
    if (!at.turmaId || !at.avaliacaoSlug) continue
    statements.push(env.DB.prepare(`
      INSERT INTO avaliacoes_turma (turma_id, avaliacao_slug, prazo, prazo_label, status, updated_at)
      VALUES (?, ?, ?, ?, ?, unixepoch())
      ON CONFLICT (turma_id, avaliacao_slug) DO UPDATE SET
        prazo = excluded.prazo, prazo_label = excluded.prazo_label, status = excluded.status,
        updated_at = excluded.updated_at
    `).bind(at.turmaId, at.avaliacaoSlug, at.prazo ?? null, at.prazoLabel ?? null, at.status))
  }

  if (statements.length === 0) return jsonResponse({ error: 'Nothing to seed' }, 422)

  await env.DB.batch(statements)

  return jsonResponse({
    ok: true,
    contagens: {
      ucs: ucs.length,
      indicadores: indicadores.length,
      avaliacoes: avaliacoes.length,
      avaliacaoIndicadores: avaliacaoIndicadores.length,
      turmas: turmas.length,
      avaliacoesTurma: avaliacoesTurma.length,
    },
  })
}
