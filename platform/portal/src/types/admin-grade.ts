// Payloads camelCase de `GET /api/admin/grade/:slug` e `PUT /api/admin/notas`
// (`platform/worker/src/index.ts`, `handleAdminGrade`/`handleAdminNotasUpdate`).
// Mesmo princípio de `types/admin-painel.ts`: shape já resolvido que o client
// consome, não a linha D1 crua.

/** Valor lançado de um indicador (Senac: Atendido / Parcialmente Atendido /
 *  Não Atendido). */
export type NotaValor = 'A' | 'PA' | 'NA'

/** Célula da grade no estado local do professor: `null` = não avaliado
 *  (distinto de `'NA'`, RF12) — nunca serializado como string vazia. */
export type NotaCelula = NotaValor | null

export interface GradeAvaliacao {
  slug: string
  titulo: string
  tipo: string | null
  trimestre: string
  status: string
}

/** `null` quando a turma ainda não tem broadcast desta avaliação
 *  (`avaliacoes_turma` sem linha para o par turma+slug). */
export interface GradeAvaliacaoTurma {
  prazo: string | null
  prazoLabel: string | null
  status: string
}

export interface GradeIndicador {
  codigo: string // 'UC05.2'
  uc: string // 'UC05'
  descricao: string
}

export interface GradeAluno {
  id: string
  nome: string | null
  email: string | null
  entregou: boolean
  /** Só traz indicador com nota lançada — ausência de chave = não avaliado (RF12). */
  notas: Record<string, NotaValor>
}

/** `GET /api/admin/grade/:slug?turma=...` */
export interface GradeApi {
  avaliacao: GradeAvaliacao
  avaliacaoTurma: GradeAvaliacaoTurma | null
  indicadores: GradeIndicador[]
  alunos: GradeAluno[]
}

/** Uma entrada do batch de `PUT /api/admin/notas`. `valor: null` apaga a
 *  linha (volta a "não avaliado", nunca vira NA implícito — RF12/CA4). */
export interface NotaUpdate {
  userId: string
  avaliacaoSlug: string
  indicadorCodigo: string
  valor: NotaCelula
}
