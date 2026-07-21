import type { CalendarDay } from '@/types/calendar'

/** Rótulos de UC no formato usado por `calendar_blocos.uc` ('UC01'..'UC09'),
 *  distinto do formato curto ('1'..'9') de `useUcLabels` (usado em `AulaMeta.ucs`).
 *  Não unificar os dois — são chaves diferentes vindas de fontes diferentes. */
export const calendarUcLabels: Record<string, string> = {
  UC01: 'UC01 Computação', UC02: 'UC02 Inglês', UC03: 'UC03 Matemática',
  UC04: 'UC04 Conceitos IA', UC05: 'UC05 Python', UC06: 'UC06 GPU e CPU',
  UC07: 'UC07 Trans. Digital', UC08: 'UC08 Banco de Dados', UC09: 'UC09 Estatística',
}

export interface CalendarMarker {
  date: string // 'YYYY-MM-DD'
  label: string
  title: string
}

export interface CalendarRow {
  thu: number | null
  fri: number | null
  sat: number | null
}

/** Uma linha "normal" (Qui/Sex/Sáb) ou uma linha-exceção (um único dia fora
 *  de Qui/Sex/Sáb, ex. a reposição de segunda-feira), na ordem cronológica do mês. */
export type CalendarGridRow =
  | { kind: 'week'; row: CalendarRow }
  | { kind: 'exception'; day: number }

const NOMES_MES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

/** Nome completo do mês (1-12), ex. "Fevereiro". */
export function nomeMes(monthIndex: number): string {
  return NOMES_MES[monthIndex - 1] ?? String(monthIndex)
}

/** Separa `days` em 12 baldes (índice 0 = janeiro), usando `Number(d.data.slice(5,7))`. */
export function bucketizeByMonth(days: CalendarDay[]): CalendarDay[][] {
  const buckets: CalendarDay[][] = Array.from({ length: 12 }, () => [])
  for (const d of days) {
    const month = Number(d.data.slice(5, 7))
    if (month >= 1 && month <= 12) buckets[month - 1].push(d)
  }
  return buckets
}

/** Monta as linhas Qui/Sex/Sáb de um mês, uma linha por semana civil. */
export function buildWeekRows(year: number, monthIndex: number): CalendarRow[] {
  const lastDay = new Date(year, monthIndex, 0).getDate()
  const rows: CalendarRow[] = []
  let current: CalendarRow | null = null

  for (let d = 1; d <= lastDay; d++) {
    const wd = new Date(year, monthIndex - 1, d).getDay() // 0=Dom...6=Sáb
    if (wd === 4) {
      current = { thu: d, fri: null, sat: null }
      rows.push(current)
    } else if (wd === 5) {
      if (!current || current.fri !== null) {
        current = { thu: null, fri: d, sat: null }
        rows.push(current)
      } else {
        current.fri = d
      }
    } else if (wd === 6) {
      if (!current || current.sat !== null) {
        current = { thu: null, fri: null, sat: d }
        rows.push(current)
      } else {
        current.sat = d
      }
    }
  }

  return rows
}

/** Monta as linhas do mês em ordem cronológica, intercalando linhas-exceção
 *  (dias com `CalendarDay` fora de Qui/Sex/Sáb) na posição correta. */
export function buildGridRows(year: number, monthIndex: number, monthDays: CalendarDay[]): CalendarGridRow[] {
  const weekRows = buildWeekRows(year, monthIndex).map<CalendarGridRow>(row => ({ kind: 'week', row }))

  const exceptionDays = monthDays
    .map(d => Number(d.data.slice(8, 10)))
    .filter(day => {
      const wd = new Date(year, monthIndex - 1, day).getDay()
      return wd !== 4 && wd !== 5 && wd !== 6
    })

  const exceptionRows = [...new Set(exceptionDays)]
    .sort((a, b) => a - b)
    .map<CalendarGridRow>(day => ({ kind: 'exception', day }))

  const merged = [...weekRows, ...exceptionRows]
  merged.sort((a, b) => firstDayOf(a) - firstDayOf(b))
  return merged
}

function firstDayOf(row: CalendarGridRow): number {
  if (row.kind === 'exception') return row.day
  return row.row.thu ?? row.row.fri ?? row.row.sat ?? 0
}

/** Encontra o `CalendarDay` de um dia específico do mês (ou `null`). */
export function findDay(monthDays: CalendarDay[], day: number): CalendarDay | null {
  return monthDays.find(d => Number(d.data.slice(8, 10)) === day) ?? null
}

/** Encontra o marco (se houver) para uma data 'YYYY-MM-DD'. */
export function findMarker(markers: CalendarMarker[], date: string): CalendarMarker | undefined {
  return markers.find(m => m.date === date)
}
