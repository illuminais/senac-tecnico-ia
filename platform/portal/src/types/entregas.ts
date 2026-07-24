/** Entrega de um aluno para uma avaliação — espelha o retorno de
 *  `GET /api/entregas` no Worker (platform/worker/src/index.ts,
 *  handleGetEntregas). `updatedAt` é epoch em segundos (`unixepoch()` do SQLite). */
export interface Entrega {
  link: string
  updatedAt: number
}

/** Mapa das entregas do aluno logado, indexado por `avaliacaoSlug`
 *  (mesmo valor de `route.params.id` em AvaliacaoView). Vazio (`{}`) quando
 *  o aluno ainda não enviou nada — nunca 404. */
export type EntregasMap = Record<string, Entrega>
