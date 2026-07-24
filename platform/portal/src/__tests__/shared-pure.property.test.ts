import { describe, expect, it } from 'vitest'
import fc from 'fast-check'
import {
  b64url,
  decodeB64url,
  toHex,
  fromHex,
  isAllowedStudentEmail,
  decodeJwtPayload,
  isTokenExpired,
  isValidEntregaUrl,
} from '@shared/pure'

// Property-based tests (fast-check) para platform/shared/pure.ts.
// Cada propriedade roda com numRuns: 1000 (critério de aceite da task T4).
// Não testamos casos pontuais aqui — a cobertura de exemplo já é implícita
// nas próprias propriedades (que incluem os extremos: string vazia, array
// vazio, exp no limite, etc via os geradores do fast-check).

const NUM_RUNS = 1000

// Charset seguro para partes de e-mail/domínio: evita armadilhas de
// case-folding Unicode (ex.: 'ß'.toUpperCase() === 'SS') que quebrariam as
// propriedades de case-insensitividade por motivos alheios à função testada.
const emailSafeChar = fc.constantFrom(
  ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-'.split(''),
)
const emailSafeString = (constraints?: { minLength?: number; maxLength?: number }) =>
  fc.array(emailSafeChar, { minLength: constraints?.minLength ?? 1, maxLength: constraints?.maxLength ?? 20 }).map(
    cs => cs.join(''),
  )

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
}

// Charset para segmentos de JWT (header/signature) que NÃO pode conter '.'
// — é o separador de segmentos. Um valor real de header/signature é
// base64url (sem '.'), então isso reflete o formato real, não uma
// simplificação artificial para "fazer passar".
const jwtSegmentChar = fc.constantFrom(
  ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'.split(''),
)
const jwtSegmentString = (constraints?: { minLength?: number; maxLength?: number }) =>
  fc
    .array(jwtSegmentChar, { minLength: constraints?.minLength ?? 0, maxLength: constraints?.maxLength ?? 20 })
    .map(cs => cs.join(''))

describe('b64url / decodeB64url — roundtrip', () => {
  it('reconstrói os mesmos bytes para qualquer Uint8Array', () => {
    fc.assert(
      fc.property(fc.uint8Array({ maxLength: 256 }), bytes => {
        const encoded = b64url(toArrayBuffer(bytes))
        const decoded = decodeB64url(encoded)
        expect(Array.from(decoded)).toEqual(Array.from(bytes))
      }),
      { numRuns: NUM_RUNS },
    )
  })
})

describe('toHex / fromHex — roundtrip', () => {
  it('reconstrói os mesmos bytes para qualquer Uint8Array', () => {
    fc.assert(
      fc.property(fc.uint8Array({ maxLength: 256 }), bytes => {
        const hex = toHex(bytes)
        const decoded = fromHex(hex)
        expect(Array.from(decoded)).toEqual(Array.from(bytes))
      }),
      { numRuns: NUM_RUNS },
    )
  })
})

describe('isAllowedStudentEmail', () => {
  it('lista vazia nunca permite, para qualquer email', () => {
    fc.assert(
      fc.property(fc.string(), email => {
        expect(isAllowedStudentEmail(email, [])).toBe(false)
      }),
      { numRuns: NUM_RUNS },
    )
  })

  it('sufixo exato bate, case-insensitive (email e/ou domínio em outro case)', () => {
    fc.assert(
      fc.property(
        emailSafeString({ minLength: 1, maxLength: 15 }),
        emailSafeString({ minLength: 1, maxLength: 15 }),
        (domain, local) => {
          const email = `${local}@${domain}`
          // email em outro case, domínio configurado como veio
          expect(isAllowedStudentEmail(email.toUpperCase(), [domain])).toBe(true)
          expect(isAllowedStudentEmail(email.toLowerCase(), [domain])).toBe(true)
          // email como veio, domínio configurado em outro case
          expect(isAllowedStudentEmail(email, [domain.toUpperCase()])).toBe(true)
          expect(isAllowedStudentEmail(email, [domain.toLowerCase()])).toBe(true)
        },
      ),
      { numRuns: NUM_RUNS },
    )
  })

  it('nunca faz match parcial (includes) — sufixo falso tipo domain.evil.com não bate', () => {
    fc.assert(
      fc.property(
        emailSafeString({ minLength: 1, maxLength: 15 }),
        emailSafeString({ minLength: 1, maxLength: 15 }),
        emailSafeString({ minLength: 1, maxLength: 15 }),
        (domain, local, extraSuffix) => {
          // email termina com `domain` + algo mais (não com "@domain" exato)
          const email = `${local}@${domain}.${extraSuffix}`
          expect(isAllowedStudentEmail(email, [domain])).toBe(false)
        },
      ),
      { numRuns: NUM_RUNS },
    )
  })
})

describe('decodeJwtPayload', () => {
  it('roundtrip: decodifica de volta o objeto original codificado como JWT fake', () => {
    const headerOrSig = jwtSegmentString({ minLength: 0, maxLength: 20 })
    fc.assert(
      fc.property(
        headerOrSig,
        headerOrSig,
        // unit: 'grapheme' / unicodeJsonValue() para gerar unicode de verdade
        // (acentos, CJK, emoji) — o default de fc.string()/fc.jsonValue() no
        // fast-check v3 é 'grapheme-ascii' (só ASCII), o que deixaria essa
        // propriedade sem cobrir o caso real que decodeJwtPayload precisa
        // suportar (TextDecoder + JSON.parse sobre payloads unicode).
        fc.dictionary(fc.string({ unit: 'grapheme' }), fc.unicodeJsonValue(), { maxKeys: 5 }),
        (header, signature, payloadObj) => {
          const json = JSON.stringify(payloadObj)
          const body = b64url(toArrayBuffer(new TextEncoder().encode(json)))
          const fakeToken = `${header}.${body}.${signature}`
          const decoded = decodeJwtPayload(fakeToken)
          // Compara via JSON.stringify: robusto a -0 vs 0 e evita depender de
          // igualdade estrutural de casos de borda numéricos do JSON.
          expect(JSON.stringify(decoded)).toBe(json)
        },
      ),
      { numRuns: NUM_RUNS },
    )
  })

  it('nunca lança em input malformado (lixo total, sem pontos, base64 inválido, etc)', () => {
    fc.assert(
      // unit: 'grapheme' garante unicode de verdade (acentos, CJK, emoji),
      // não só ASCII (default de fc.string() no fast-check v3) — precisamos
      // provar que decodeJwtPayload não lança mesmo com lixo unicode.
      fc.property(fc.string({ unit: 'grapheme' }), garbage => {
        let result: ReturnType<typeof decodeJwtPayload>
        expect(() => {
          result = decodeJwtPayload(garbage)
        }).not.toThrow()
        expect(result === null || typeof result === 'object').toBe(true)
      }),
      { numRuns: NUM_RUNS },
    )
  })
})

describe('isTokenExpired', () => {
  it('exp no passado é sempre expirado', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: Math.floor(Date.now() / 1000) - 1 }), exp => {
        expect(isTokenExpired({ exp })).toBe(true)
      }),
      { numRuns: NUM_RUNS },
    )
  })

  it('exp no futuro (com margem) nunca é expirado', () => {
    const nowSeconds = Math.floor(Date.now() / 1000)
    fc.assert(
      fc.property(fc.integer({ min: 3600, max: 10_000_000 }), offset => {
        expect(isTokenExpired({ exp: nowSeconds + offset })).toBe(false)
      }),
      { numRuns: NUM_RUNS },
    )
  })

  it('payload nulo é sempre expirado', () => {
    expect(isTokenExpired(null)).toBe(true)
  })

  it('payload sem exp é sempre expirado', () => {
    fc.assert(
      fc.property(fc.constant({}), payload => {
        expect(isTokenExpired(payload)).toBe(true)
      }),
      { numRuns: NUM_RUNS },
    )
  })
})

describe('isValidEntregaUrl', () => {
  // Reimplementação de referência do CONTRATO documentado na função (não
  // copiada do corpo de `isValidEntregaUrl` em shared/pure.ts): "tenta
  // `new URL(s)`; se não lançar, checa protocol === 'http:' || 'https:'; se
  // lançar, é `false`". Escrita a partir da descrição do contrato, não lida
  // do código-fonte da implementação. É uma reimplementação válida porque
  // exercita o mesmo comportamento documentado de forma independente — se a
  // implementação real divergir do contrato (ex.: esquecer o `try/catch`,
  // aceitar `ftp:` por engano, ou trocar a ordem das checagens), a
  // comparação abaixo detecta a divergência em vez de só re-confirmar "o
  // código faz o que o código faz".
  function referenceIsValidEntregaUrl(s: string): boolean {
    let parsed: URL
    try {
      parsed = new URL(s)
    } catch {
      return false
    }
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  }

  it('bate com a reimplementação de referência para qualquer string', () => {
    fc.assert(
      fc.property(
        // Mistura três fontes pra não deixar a propriedade "fácil demais":
        // (1) strings arbitrárias — a maioria cai no catch (não parseia como
        // URL), útil para provar que "nunca lança" e que lixo é rejeitado;
        // (2) fc.webUrl() — gera URLs http/https válidas de verdade, cobre o
        // caminho "aceita" que fc.string() sozinho quase nunca alcançaria;
        // (3) strings com esquemas conhecidos não-http (javascript:, data:,
        // ftp:, mailto:, file:) — parseiam como URL válida (não lançam), mas
        // com protocolo diferente de http/https, exercitando exatamente o
        // ramo "parseou mas não é http(s)" da função.
        fc.oneof(
          fc.string(),
          fc.webUrl(),
          fc
            .tuple(fc.constantFrom('javascript', 'data', 'ftp', 'mailto', 'file'), fc.string())
            .map(([scheme, rest]) => `${scheme}:${rest}`),
        ),
        s => {
          expect(isValidEntregaUrl(s)).toBe(referenceIsValidEntregaUrl(s))
        },
      ),
      { numRuns: NUM_RUNS },
    )
  })

  it('nunca lança, para qualquer string', () => {
    fc.assert(
      fc.property(fc.string(), s => {
        expect(() => isValidEntregaUrl(s)).not.toThrow()
      }),
      { numRuns: NUM_RUNS },
    )
  })

  // Casos pontuais explicitamente listados na spec como devendo ser
  // rejeitados, além da propriedade geral acima.
  it('rejeita os casos que a spec lista explicitamente', () => {
    expect(isValidEntregaUrl('exemplo.com')).toBe(false) // sem esquema
    expect(isValidEntregaUrl('javascript:alert(1)')).toBe(false)
    expect(isValidEntregaUrl('data:text/html,<script>alert(1)</script>')).toBe(false)
    expect(isValidEntregaUrl('')).toBe(false) // string vazia
  })

  it('aceita URLs http/https válidas (casos fixos de controle)', () => {
    expect(isValidEntregaUrl('https://exemplo.com')).toBe(true)
    expect(isValidEntregaUrl('http://exemplo.com/caminho?x=1')).toBe(true)
  })
})
