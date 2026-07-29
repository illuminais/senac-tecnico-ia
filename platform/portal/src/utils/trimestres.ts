export interface TrimestreRange {
  id: 'T1' | 'T2' | 'T3'
  inicio: string // 'YYYY-MM-DD'
  fim: string // 'YYYY-MM-DD'
}

// Datas confirmadas pelo professor (curso 2026) — sem tabela no banco pra
// isso ainda, T3 sem currículo fechado mas com datas de calendário já certas.
export const TRIMESTRES: TrimestreRange[] = [
  { id: 'T1', inicio: '2026-03-05', fim: '2026-05-14' },
  { id: 'T2', inicio: '2026-05-21', fim: '2026-09-04' },
  { id: 'T3', inicio: '2026-09-08', fim: '2026-12-18' },
]

/** Trimestre cuja janela contém `hoje` ('YYYY-MM-DD'); em recesso entre
 *  trimestres, cai no último cujo início já passou. */
export function trimestreAtual(hoje: string = new Date().toISOString().slice(0, 10)): TrimestreRange['id'] {
  const contendo = TRIMESTRES.find(t => hoje >= t.inicio && hoje <= t.fim)
  if (contendo) return contendo.id

  const anteriores = TRIMESTRES.filter(t => t.inicio <= hoje)
  return anteriores.length ? anteriores[anteriores.length - 1].id : TRIMESTRES[0].id
}
