/**
 * Cloudflare Worker — API LMS
 * POST /api/sync                       — persiste progresso (requer JWT — aluno ou admin)
 * POST /api/auth/login                  — autentica admin (usuário/senha), retorna JWT
 * POST /api/auth/forgot-password        — envia email de reset (Resend), com rate limit por email
 * POST /api/auth/reset-password         — troca senha via token do email
 * POST /api/auth/google/callback        — troca code OAuth por sessão (JWT), só admin já cadastrado
 * POST /api/auth/student/google/callback — troca code OAuth por sessão (JWT) de aluno; cria conta no primeiro login se o email bater com STUDENT_EMAIL_DOMAINS
 * POST /api/entregas                    — grava/atualiza link de entrega de avaliação (requer JWT aluno)
 * GET  /api/entregas                    — mapa das entregas do caller { [avaliacaoSlug]: {link, updatedAt} } (requer JWT aluno)
 * GET  /api/message                     — busca mensagem do professor (público)
 * PUT  /api/message                     — atualiza mensagem (requer JWT admin)
 * GET  /api/calendar                    — calendário condensado de aulas (público)
 * POST /api/calendar/import             — upsert em lote de dias/blocos (requer JWT admin)
 * GET  /api/calendar/resumo-ha          — soma de HA dada por UC, bucketizado em T1/T2/T3 (público)
 * POST /api/admin/seed                  — upsert em lote de ucs/indicadores/avaliações/vínculos/turmas/avaliacoes_turma (requer JWT admin); nunca toca `notas`
 * GET  /api/avaliacoes                  — lista de avaliações com trimestre/indicador/UC (público; JWT de aluno opcional resolve prazo/status pela turma)
 * GET  /api/admin/turmas                — lista todas as turmas (requer JWT admin)
 * GET  /api/admin/ucs                   — lista todas as UCs com conhecimentos/habilidades (requer JWT admin)
 * GET  /api/admin/painel                — indicadores de um trimestre (mapa curricular) com cobertura de avaliação/correção por turma (requer JWT admin)
 * GET  /api/admin/grade/:slug           — grade aluno x indicador de uma avaliação, para uma turma (requer JWT admin)
 * PUT  /api/admin/notas                 — batch upsert/delete de notas A/PA/NA (requer JWT admin)
 * GET  /api/admin/boletim               — boletim consolidado (max A>PA>NA) de um trimestre, para uma turma (requer JWT admin)
 * GET  /api/admin/entregas-historico/:avaliacaoSlug/:userId — histórico de envios de um aluno numa avaliação (requer JWT admin)
 * GET  /api/avaliacoes/novidade         — badge de notificação de avaliação nova/atualizada (requer JWT aluno)
 * POST /api/avaliacoes/marcar-vistas    — marca avaliações como vistas pelo aluno (requer JWT aluno)
 *
 * Reorganizado em módulos por entidade (spec 04-worker-arquitetura-modular):
 * este arquivo é só o dispatcher — nenhuma lógica de negócio vive aqui.
 */

import { corsHeaders } from './lib/http'
import { handleSync } from './routes/sync'
import {
  handleLogin,
  handleForgotPassword,
  handleResetPassword,
  handleGoogleCallback,
  handleStudentGoogleCallback,
} from './routes/auth'
import {
  handleCreateEntrega,
  handleGetEntregas,
  handleAdminEntregasHistorico,
} from './routes/entregas'
import { handleGetMessage, handlePutMessage } from './routes/message'
import {
  handleGetCalendar,
  handleImportCalendar,
  handleGetResumoHa,
} from './routes/calendar'
import { handleAdminSeed } from './routes/seed'
import {
  handleGetAvaliacoes,
  handleAvaliacoesNovidade,
  handleMarcarAvaliacoesVistas,
} from './routes/avaliacoes'
import { handleGetTurmas } from './routes/turmas'
import { handleGetUcs } from './routes/ucs'
import { handleAdminPainel } from './routes/painel'
import { handleAdminNotasUpdate } from './routes/notas'
import { handleAdminBoletim } from './routes/boletim'
import { handleAdminGrade } from './routes/grade'
import type { Env } from './types'

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() })
    }

    if (request.method === 'POST' && url.pathname === '/api/sync') {
      return handleSync(request, env)
    }

    if (request.method === 'POST' && url.pathname === '/api/auth/login') {
      return handleLogin(request, env)
    }

    if (request.method === 'POST' && url.pathname === '/api/auth/forgot-password') {
      return handleForgotPassword(request, env, ctx)
    }

    if (request.method === 'POST' && url.pathname === '/api/auth/reset-password') {
      return handleResetPassword(request, env)
    }

    if (request.method === 'POST' && url.pathname === '/api/auth/google/callback') {
      return handleGoogleCallback(request, env)
    }

    if (request.method === 'POST' && url.pathname === '/api/auth/student/google/callback') {
      return handleStudentGoogleCallback(request, env)
    }

    if (request.method === 'POST' && url.pathname === '/api/entregas') {
      return handleCreateEntrega(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/entregas') {
      return handleGetEntregas(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/message') {
      return handleGetMessage(env)
    }

    if (request.method === 'PUT' && url.pathname === '/api/message') {
      return handlePutMessage(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/calendar') {
      return handleGetCalendar(env)
    }

    if (request.method === 'POST' && url.pathname === '/api/calendar/import') {
      return handleImportCalendar(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/calendar/resumo-ha') {
      return handleGetResumoHa(env)
    }

    if (request.method === 'POST' && url.pathname === '/api/admin/seed') {
      return handleAdminSeed(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/avaliacoes') {
      return handleGetAvaliacoes(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/admin/turmas') {
      return handleGetTurmas(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/admin/ucs') {
      return handleGetUcs(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/admin/painel') {
      return handleAdminPainel(request, env)
    }

    if (request.method === 'PUT' && url.pathname === '/api/admin/notas') {
      return handleAdminNotasUpdate(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/api/admin/boletim') {
      return handleAdminBoletim(request, env)
    }

    // Rota dinâmica /api/admin/grade/:slug — o roteador do resto do arquivo é
    // baseado em `pathname === 'string exata'`; slug variável exige regex.
    const gradeMatch = url.pathname.match(/^\/api\/admin\/grade\/([^/]+)$/)
    if (request.method === 'GET' && gradeMatch) {
      return handleAdminGrade(request, env, gradeMatch[1])
    }

    // Sprint 04 — histórico de envios de UM aluno numa avaliação (painel de
    // detalhe do professor, sob demanda, não vem de brinde no handleAdminGrade).
    const historicoMatch = url.pathname.match(/^\/api\/admin\/entregas-historico\/([^/]+)\/([^/]+)$/)
    if (request.method === 'GET' && historicoMatch) {
      return handleAdminEntregasHistorico(request, env, historicoMatch[1], historicoMatch[2])
    }

    if (request.method === 'GET' && url.pathname === '/api/avaliacoes/novidade') {
      return handleAvaliacoesNovidade(request, env)
    }

    if (request.method === 'POST' && url.pathname === '/api/avaliacoes/marcar-vistas') {
      return handleMarcarAvaliacoesVistas(request, env)
    }

    return new Response('Not found', { status: 404 })
  },
}
