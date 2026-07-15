export interface User {
  id: string // claim "sub" da conta Google do aluno (login OAuth)
  nome: string | null
  email: string | null
  created_at: number
}

export interface Entrega {
  user_id: string // referencia users.id (sub da conta Google)
  avaliacao_slug: string
  link: string
  updated_at: number
}
