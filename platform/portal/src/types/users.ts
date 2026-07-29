export interface User {
  id: string // claim "sub" da conta Google do aluno (login OAuth)
  nome: string | null
  email: string | null
  turma_id: string | null // turmas.id; nullable — ver contextos/turmas.md e plan.md da sprint 03 (fallback de atribuição automática)
  created_at: number
}

/** Linha crua de `entregas` no D1 (snake_case, espelha `schema.sql` 1:1).
 *  Não confundir com `Entrega` de `types/entregas.ts` (camelCase, shape já
 *  resolvido de `GET /api/entregas` consumido pelo aluno) — colisão de nome
 *  identificada no analyze.md da sprint 03, resolvida renomeando esta para
 *  `EntregaRow` (é a que representa a linha D1 crua). */
export interface EntregaRow {
  user_id: string // referencia users.id (sub da conta Google)
  avaliacao_slug: string
  link: string
  updated_at: number
}
