export interface AvaliacaoMeta {
  id: string
  titulo: string
  tipo: string
  prazo: string
  prazoLabel: string
  ucs: string[]
  status: 'published' | 'em-planejamento' | 'concluida'
}

/** Um indicador coberto por uma avaliação, como devolvido por `GET /api/avaliacoes`
 *  (sprint 03 — avaliações por trimestre e indicador). `notaValor`/`comentario`
 *  (sprint 04) são a nota/justificativa do PRÓPRIO aluno (JWT), sempre `null`
 *  sem sessão de aluno ou antes de corrigido. */
export interface IndicadorRef {
  codigo: string // 'UC05.2'
  uc: string // 'UC05'
  descricao: string
  notaValor: 'A' | 'PA' | 'NA' | null
  comentario: string | null
}

/** Shape real de `GET /api/avaliacoes` (`handleGetAvaliacoes` em
 *  `platform/worker/src/index.ts`), servido do D1 a partir da sprint 03.
 *  Não confundir com `AvaliacaoMeta` acima: aquele é o shape estático de
 *  `avaliacoes.json`, ainda gerado pelo `build-all.mjs` e usado só no pipeline
 *  de build das aulas — não apague. Este é o payload que `AvaliacoesView.vue`
 *  consome via fetch. `tipo`/`prazoLabel`/`status` podem vir `null`: `status`
 *  aqui é o de APLICAÇÃO (`avaliacoes_turma.status`), que fica `null` quando
 *  nenhuma turma foi resolvida (sem turma ativa ou sem vínculo ainda semeado
 *  em `avaliacoes_turma`) — trate como "não disponível", nunca como erro. */
export interface AvaliacaoApi {
  slug: string
  titulo: string
  tipo: string | null
  trimestre: 'T1' | 'T2' | 'T3'
  /** (sprint 04) data crua do prazo, formato 'DD/MM/YYYY' (como escrito no
   *  meta.yaml) — usada só pra comparar com hoje (prazo encerrado ou não);
   *  `prazoLabel` é o texto amigável de exibição. */
  prazo: string | null
  prazoLabel: string | null
  status: string | null
  /** (sprint 04) `null` sem sessão de aluno; senão, existe linha em `entregas`. */
  entregou: boolean | null
  indicadores: IndicadorRef[]
}
