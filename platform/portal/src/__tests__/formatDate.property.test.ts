import { describe, expect, it } from 'vitest'
import fc from 'fast-check'
import { formatEntregaDate } from '@/utils/formatDate'

// Property-based tests (fast-check) para src/utils/formatDate.ts, seguindo o
// mesmo padrão de __tests__/shared-pure.property.test.ts (numRuns: 1000,
// describe/it por função, comentários explicando por que cada gerador é
// "seguro" pra propriedade que está sendo testada).

const NUM_RUNS = 1000

// Range de epoch "razoável": ~10 anos pra trás e ~6 pra frente a partir de
// hoje, evitando datas absurdas (ano 0, ano 275760, etc.) que poderiam
// estourar os limites de `Date`/`Intl.DateTimeFormat` por motivos alheios à
// função testada (não é isso que a propriedade quer cobrir).
const EPOCH_MIN = Math.floor(Date.UTC(2015, 0, 1) / 1000)
const EPOCH_MAX = Math.floor(Date.UTC(2032, 0, 1) / 1000)
const reasonableEpoch = fc.integer({ min: EPOCH_MIN, max: EPOCH_MAX })

// Extrai os componentes DD/MM/YYYY de "DD/MM/YYYY às HH:mm" via regex — não
// reimplementa parsing de data "de verdade", só lê de volta os dígitos que
// `formatEntregaDate` escreveu, pra comparar contra os getters locais do
// `Date` (ver comentário abaixo sobre por que os getters *locais*, não UTC).
function extractDatePart(formatted: string): { day: number; month: number; year: number } {
  const match = formatted.match(/^(\d{2})\/(\d{2})\/(\d{4}) às \d{2}:\d{2}$/)
  if (!match) throw new Error(`formato inesperado: ${formatted}`)
  return { day: Number(match[1]), month: Number(match[2]), year: Number(match[3]) }
}

describe('formatEntregaDate', () => {
  it('é determinística: mesmo epoch produz sempre a mesma string', () => {
    fc.assert(
      fc.property(reasonableEpoch, epoch => {
        expect(formatEntregaDate(epoch)).toBe(formatEntregaDate(epoch))
      }),
      { numRuns: NUM_RUNS },
    )
  })

  it('o dia exibido corresponde ao dia LOCAL de new Date(epoch * 1000), não ao dia UTC', () => {
    fc.assert(
      fc.property(reasonableEpoch, epoch => {
        const date = new Date(epoch * 1000)
        const { day, month, year } = extractDatePart(formatEntregaDate(epoch))
        // Comparação deliberada contra os getters LOCAIS (getDate/getMonth/
        // getFullYear), não os UTC (getUTCDate/etc.). Se a asserção usasse os
        // getters UTC, a propriedade ficaria "cega" pro exato bug de
        // off-by-one de fuso que ela existe pra pegar: num fuso com offset
        // negativo (ex. America/Sao_Paulo, UTC-3), um epoch próximo da
        // meia-noite UTC pode cair num dia UTC diferente do dia local — é o
        // dia local que `toLocaleDateString('pt-BR')` (sem fuso explícito)
        // deve refletir, porque é isso que o aluno vê no relógio dele.
        expect(day).toBe(date.getDate())
        expect(month).toBe(date.getMonth() + 1)
        expect(year).toBe(date.getFullYear())
      }),
      { numRuns: NUM_RUNS },
    )
  })

  it('sempre produz o formato "DD/MM/YYYY às HH:mm"', () => {
    fc.assert(
      fc.property(reasonableEpoch, epoch => {
        expect(formatEntregaDate(epoch)).toMatch(/^\d{2}\/\d{2}\/\d{4} às \d{2}:\d{2}$/)
      }),
      { numRuns: NUM_RUNS },
    )
  })
})
