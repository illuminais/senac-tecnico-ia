import { describe, expect, it } from 'vitest'
import fc from 'fast-check'
import { consolidarNota, parseIndicadorCodigo, formatIndicadorCodigo, toCsvRow } from '@shared/pure'

// Property-based tests (fast-check) para as funções novas da sprint 03
// (`consolidarNota`, `parseIndicadorCodigo`/`formatIndicadorCodigo`, `toCsvRow`)
// em platform/shared/pure.ts. Mesmo padrão de __tests__/shared-pure.property.test.ts:
// numRuns: 1000 para as propriedades genéricas, comentários explicando por que
// cada gerador foi desenhado daquele jeito, exemplos/casos-fixos separados
// das propriedades.

const NUM_RUNS = 1000

// ---------------------------------------------------------------------------
// consolidarNota (D3/D4 — max(A > PA > NA), ordem-invariante, idempotente)
// ---------------------------------------------------------------------------

type NotaValor = 'A' | 'PA' | 'NA'
const notaValor: fc.Arbitrary<NotaValor> = fc.constantFrom('A', 'PA', 'NA')

describe('consolidarNota', () => {
  it('[] (vazio) sempre devolve null', () => {
    expect(consolidarNota([])).toBeNull()
  })

  it('é idempotente: consolidarNota([x, x]) === x para qualquer x em {A, PA, NA}', () => {
    fc.assert(
      fc.property(notaValor, x => {
        expect(consolidarNota([x, x])).toBe(x)
      }),
      { numRuns: NUM_RUNS },
    )
  })

  it('é ordem-invariante: embaralhar o array não muda o resultado', () => {
    // fc.array gera o array-base; .chain encadeia um segundo arbitrary que
    // depende do valor gerado no primeiro passo (aqui, `arr`) — é assim que o
    // fast-check expressa "gere X, depois gere uma permutação de X" sem
    // recorrer a Math.random() dentro do corpo da property (o que quebraria
    // a reprodutibilidade/shrinking). `fc.shuffledSubarray` com
    // minLength === maxLength === arr.length garante uma permutação completa
    // (mesmo multiset, ordem diferente), nunca um subconjunto menor.
    const arrEShuffled = fc
      .array(notaValor, { minLength: 1, maxLength: 12 })
      .chain(arr =>
        fc
          .shuffledSubarray(arr, { minLength: arr.length, maxLength: arr.length })
          .map(shuffled => ({ arr, shuffled })),
      )

    fc.assert(
      fc.property(arrEShuffled, ({ arr, shuffled }) => {
        expect(consolidarNota(shuffled)).toBe(consolidarNota(arr))
      }),
      { numRuns: NUM_RUNS },
    )
  })

  it('o resultado é sempre o máximo pela ordem A > PA > NA', () => {
    fc.assert(
      fc.property(fc.array(notaValor, { minLength: 1, maxLength: 12 }), valores => {
        const resultado = consolidarNota(valores)
        if (valores.includes('A')) {
          expect(resultado).toBe('A')
        } else if (valores.includes('PA')) {
          expect(resultado).toBe('PA')
        } else {
          expect(resultado).toBe('NA')
        }
      }),
      { numRuns: NUM_RUNS },
    )
  })
})

// ---------------------------------------------------------------------------
// parseIndicadorCodigo ⇄ formatIndicadorCodigo — roundtrip
// ---------------------------------------------------------------------------

describe('parseIndicadorCodigo ⇄ formatIndicadorCodigo', () => {
  it('roundtrip: parse(format(x)) === x para qualquer {uc, numero} bem formado', () => {
    // uc: 'UC' + inteiro >= 1 (sem exigir zero-padding de 2 dígitos — o
    // roundtrip é sobre a forma canônica que a própria dupla parse/format
    // produz e consome, não sobre a convenção de nomenclatura real do curso,
    // que já é coberta pelos exemplos contra dados reais em
    // seed-indicadores.test.ts). numero: inteiro >= 0 (indicador '.0' não
    // ocorre na prática, mas o parser aceita e não há razão pra excluir).
    const indicadorParts = fc.record({
      uc: fc.integer({ min: 1, max: 999 }).map(n => `UC${n}`),
      numero: fc.integer({ min: 0, max: 999 }),
    })

    fc.assert(
      fc.property(indicadorParts, parts => {
        expect(parseIndicadorCodigo(formatIndicadorCodigo(parts))).toEqual(parts)
      }),
      { numRuns: NUM_RUNS },
    )
  })

  it('nunca lança para qualquer string de entrada', () => {
    fc.assert(
      fc.property(fc.string(), s => {
        expect(() => parseIndicadorCodigo(s)).not.toThrow()
      }),
      { numRuns: NUM_RUNS },
    )
  })

  // Casos fixos de entrada malformada listados na task — devem devolver
  // `null` sem lançar.
  it('rejeita entrada malformada devolvendo null, sem lançar', () => {
    expect(parseIndicadorCodigo('UC05')).toBeNull() // sem ponto
    expect(parseIndicadorCodigo('uc05.2')).toBeNull() // minúsculo
    expect(parseIndicadorCodigo('UC05.x')).toBeNull() // não numérico
    expect(parseIndicadorCodigo('')).toBeNull() // vazio
  })
})

// ---------------------------------------------------------------------------
// toCsvRow — roundtrip de escape (RFC4180, um campo pode conter vírgula,
// aspas ou quebra de linha)
// ---------------------------------------------------------------------------

// Parser de referência mínimo, RFC4180, só pra UMA linha/registro (o
// suficiente pro que toCsvRow produz — quem junta várias linhas com '\n' é
// responsabilidade de outra camada, não de toCsvRow). Escrito a partir do
// contrato documentado em toCsvRow (campo com vírgula/aspas/'\n' vai entre
// aspas, aspas internas viram ""), não copiado do corpo da função — mesmo
// princípio da reimplementação de referência de `isValidEntregaUrl` em
// shared-pure.property.test.ts: se toCsvRow divergir do contrato (esquecer
// de escapar aspas, trocar a ordem, etc.), a comparação de roundtrip abaixo
// detecta a divergência.
function parseCsvRow(row: string): string[] {
  const fields: string[] = []
  let i = 0
  const n = row.length
  while (true) {
    let field = ''
    if (row[i] === '"') {
      i++ // pula a aspa de abertura
      while (i < n) {
        if (row[i] === '"') {
          if (row[i + 1] === '"') {
            field += '"' // aspas duplicadas => uma aspa literal
            i += 2
          } else {
            i++ // aspa de fechamento
            break
          }
        } else {
          field += row[i]
          i++
        }
      }
    } else {
      while (i < n && row[i] !== ',') {
        field += row[i]
        i++
      }
    }
    fields.push(field)
    if (row[i] === ',') {
      i++
      continue
    }
    break
  }
  return fields
}

// Charset que mistura texto comum com os três caracteres especiais do RFC4180
// (vírgula, aspas, quebra de linha) — sem isso, fc.string() sozinho
// raramente geraria vírgula/aspas/'\n' com frequência suficiente pra
// exercitar o caminho de escape.
const csvSpecialChar = fc.constantFrom(...'abc123 XYZ,"\n'.split(''))
const csvFieldComEspeciais = fc
  .array(csvSpecialChar, { minLength: 0, maxLength: 15 })
  .map(cs => cs.join(''))

// Campo de teste: mistura strings arbitrárias (unicode de verdade, via
// 'grapheme') com o gerador acima enviesado pra vírgula/aspas/quebra de
// linha — mesma estratégia de mistura de fontes de isValidEntregaUrl.
const csvField = fc.oneof(fc.string({ unit: 'grapheme', maxLength: 15 }), csvFieldComEspeciais)

// minLength: 1 — um array vazio de campos é um caso degenerado (toCsvRow([])
// produz '', que uma reconstrução ingênua não consegue distinguir de "uma
// linha com um único campo vazio"; RFC4180 não define univocamente "zero
// colunas"). O boletim real sempre tem pelo menos 1 coluna.
const csvRow = fc.array(csvField, { minLength: 1, maxLength: 8 })

describe('toCsvRow', () => {
  it('roundtrip: parseCsvRow(toCsvRow(campos)) === campos, para qualquer array de campos', () => {
    fc.assert(
      fc.property(csvRow, campos => {
        expect(parseCsvRow(toCsvRow(campos))).toEqual(campos)
      }),
      { numRuns: NUM_RUNS },
    )
  })

  // Casos fixos explícitos, além da propriedade geral acima.
  it('campo com vírgula sai entre aspas', () => {
    expect(toCsvRow(['a,b', 'c'])).toBe('"a,b",c')
  })

  it('campo com aspas internas duplica as aspas', () => {
    expect(toCsvRow(['a"b', 'c'])).toBe('"a""b",c')
  })

  it('campo com quebra de linha sai entre aspas', () => {
    expect(toCsvRow(['a\nb', 'c'])).toBe('"a\nb",c')
  })

  it('nenhum campo especial não altera nada', () => {
    expect(toCsvRow(['a', 'b', 'c'])).toBe('a,b,c')
  })
})
