// Payloads camelCase servidos pelas rotas admin novas da sprint 03
// (`GET /api/admin/turmas`, `/api/admin/ucs`, `/api/admin/painel` em
// `platform/worker/src/index.ts`). Não confundir com os tipos "linha crua"
// de `types/indicadores.ts` (snake_case, espelham `schema.sql` 1:1) — estes
// aqui são o shape já resolvido que o client consome.

/** `GET /api/admin/turmas` — pro seletor de turma (`SeletorTurma.vue`). */
export interface TurmaApi {
  id: string // '2026A'
  anoIngresso: number
  status: 'ativa' | 'concluida'
}

/** `GET /api/admin/ucs` — referência estática buscada uma vez pelo client
 *  (RF19/CA10) e resolvida localmente por `indicador.uc` ao expandir. */
export interface UcApi {
  codigo: string // 'UC05'
  nome: string
  anoCurso: 1 | 2 | 3
  conhecimentos: string // texto (bullets \n-separados)
  habilidades: string
}

/** Um indicador do mapa curricular do trimestre, como devolvido por
 *  `GET /api/admin/painel` — inclusive os sem nenhuma avaliação vinculada
 *  (`avaliacoes: []`), que é a razão de ser da tela (CA2). */
export interface PainelIndicador {
  codigo: string // 'UC05.2'
  uc: string // 'UC05'
  descricao: string
  avaliacoes: { slug: string; titulo: string }[]
  totalAlunos: number
  corrigidos: number
}
