export interface CalendarBloco {
  uc: string
  disciplina: string | null
  conteudo: string | null
  ha: number | null
}

export interface CalendarDay {
  id: string
  numero: string | null
  data: string // 'YYYY-MM-DD'
  tipo: 'aula' | 'reposicao' | 'feriado' | 'recesso'
  status: 'planejada' | 'dada'
  observacao: string | null
  blocos: CalendarBloco[]
}

export interface ResumoHaUc {
  uc: string
  t1: number
  t2: number
  t3: number
}
