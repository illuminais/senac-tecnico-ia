// Espelha o schema D1 de `platform/worker/schema.sql` (sprint 03 — avaliações
// por trimestre e indicador). Tipos aqui são as linhas CRUAS das tabelas
// (snake_case, mesmo shape do banco) — os payloads camelCase que o Worker
// devolve nas rotas (`GET /api/avaliacoes`, `/api/admin/painel`, etc.) são
// tipos derivados, definidos perto de quem os consome (ver `avaliacoes.ts`
// pro shape hoje ainda estático de `avaliacoes.json`, que esta sprint substitui
// por API — atualizar lá quando a rota entrar, T7).

export interface Turma {
  id: string // '2026A' — livre, escolhido na autoria
  ano_ingresso: number
  status: 'ativa' | 'concluida'
  updated_at: number
}

/** UC — conhecimento curricular invariável (D9): nome, ano_curso,
 *  conhecimentos e habilidades não têm vínculo 1:1 com indicador na fonte
 *  oficial, só com a UC inteira. */
export interface Uc {
  codigo: string // 'UC05'
  nome: string
  ano_curso: 1 | 2 | 3
  conhecimentos: string // texto (bullets \n-separados), somente leitura
  habilidades: string
  updated_at: number
}

export interface Indicador {
  codigo: string // 'UC05.2'
  uc: string // 'UC05' — referencia Uc.codigo
  numero: number
  descricao: string
  trimestres: string // CSV 'T1,T2' — em quais é trabalhado (plano oficial, não cobertura real)
  updated_at: number
}

/** Linha D1 de `avaliacoes` — TEMPLATE de currículo, sem turma nem prazo
 *  (prazo/status de aplicação vivem em `AvaliacaoTurma`, D8). Não confundir
 *  com `AvaliacaoMeta` em `avaliacoes.ts`, hoje ainda lido de `avaliacoes.json`
 *  estático — esta sprint move essa verdade pro D1/API (T7). */
export interface AvaliacaoRow {
  slug: string // 'av07'
  titulo: string
  tipo: string | null
  trimestre: 'T1' | 'T2' | 'T3'
  status: 'em-planejamento' | 'draft' | 'published'
  updated_at: number
}

export interface AvaliacaoIndicador {
  avaliacao_slug: string
  indicador_codigo: string
}

/** Instância por turma de uma avaliação: o que muda (prazo, status de
 *  aplicação) quando a mesma avaliação é aplicada por turmas diferentes. */
export interface AvaliacaoTurma {
  turma_id: string
  avaliacao_slug: string
  prazo: string | null
  prazo_label: string | null
  status: string
  updated_at: number
}

/** Veredito Senac por aluno x avaliação x indicador. Ausência de linha
 *  significa "não avaliado" — distinto de `valor === 'NA'` (RF12). */
export interface Nota {
  user_id: string
  avaliacao_slug: string
  indicador_codigo: string
  valor: 'A' | 'PA' | 'NA'
  updated_at: number
}
