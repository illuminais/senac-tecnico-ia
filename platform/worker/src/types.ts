/**
 * Env (bindings/secrets/vars) + payload interfaces usados pelo Worker.
 * Movido de platform/worker/src/index.ts (spec 04-worker-arquitetura-modular,
 * T1) — nenhuma forma mudou, só a localização.
 */

export interface Env {
  DB: D1Database
  JWT_SECRET: string          // wrangler secret
  RESEND_API_KEY: string      // wrangler secret — https://resend.com
  RESEND_FROM: string         // var — ex: 'LMS Senac <onboarding@resend.dev>' (domínio verificado em produção)
  GOOGLE_CLIENT_ID: string    // var — não é segredo, usado também no portal
  GOOGLE_CLIENT_SECRET: string // wrangler secret
  ALLOWED_ORIGINS: string     // var — CSV de origens permitidas p/ link de reset (evita open-redirect no email)
  STUDENT_EMAIL_DOMAINS: string // var — CSV de domínios de email autorizados a criar conta de aluno
}

export interface SyncPayload {
  aulaId: string
  progresso: number
  respostas: Record<string, string>
}

export interface CalendarBlocoPayload {
  uc: string
  disciplina?: string
  conteudo?: string
  ha?: number
}

export interface CalendarDayPayload {
  id: string
  numero?: string
  data: string
  tipo?: string
  status?: string
  observacao?: string
  blocos?: CalendarBlocoPayload[]
}

// Payload de POST /api/admin/seed — shape produzido por
// platform/scripts/seed-indicadores.mjs (ver T4/T5 da spec 03-avaliacoes-por-indicador).
export interface SeedUcPayload {
  codigo: string
  nome: string
  anoCurso: number
  conhecimentos: string
  habilidades: string
}

export interface SeedIndicadorPayload {
  codigo: string
  uc: string
  numero: number
  descricao: string
  trimestres: string // CSV 'T1,T2' ou '' — ver RF4b
}

export interface SeedAvaliacaoPayload {
  slug: string
  titulo: string
  tipo?: string | null
  trimestre: string
  status: string
}

export interface SeedAvaliacaoIndicadorPayload {
  avaliacaoSlug: string
  indicadorCodigo: string
}

export interface SeedTurmaPayload {
  id: string
  anoIngresso: number
  status: string
}

export interface SeedAvaliacaoTurmaPayload {
  turmaId: string
  avaliacaoSlug: string
  prazo?: string | null
  prazoLabel?: string | null
  status: string
}

export interface SeedPayload {
  ucs?: SeedUcPayload[]
  indicadores?: SeedIndicadorPayload[]
  avaliacoes?: SeedAvaliacaoPayload[]
  avaliacaoIndicadores?: SeedAvaliacaoIndicadorPayload[]
  turmas?: SeedTurmaPayload[]
  avaliacoesTurma?: SeedAvaliacaoTurmaPayload[]
}

export interface AdminUserRow {
  id: string
  username: string
  email: string
  password_hash: string | null
  google_sub: string | null
}

export interface NotaUpdatePayload {
  userId?: string
  avaliacaoSlug?: string
  indicadorCodigo?: string
  valor?: 'A' | 'PA' | 'NA' | null
  comentario?: string | null
}
