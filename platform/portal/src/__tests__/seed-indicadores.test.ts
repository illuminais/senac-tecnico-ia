import { describe, expect, it } from 'vitest'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseUcsMd, parseIndicadoresMd, parseTrimestresMd, parseTurmasMd } from '../../../scripts/seed-indicadores.mjs'

// Testes de exemplo (não property-based) para os parsers de
// platform/scripts/seed-indicadores.mjs (T4), rodados contra os arquivos
// markdown REAIS do repositório — não fixtures inventadas. Segue o mesmo
// espírito de shared-pure.property.test.ts (comentários explicando por que
// cada asserção existe), mas aqui a "propriedade" é o dado real do curso, não
// um gerador — por isso vive num arquivo separado, sem numRuns/fast-check.
//
// IMPORTANTE (achado da T4, repassado pelo Leovio): o curso tem **57**
// indicadores no total, não 55 como o spec.md/plan.md estimavam antes de
// contra-checar com o markdown oficial (contagem real por UC: UC04:4, UC05:4,
// UC06:5, UC07:10, UC08:6, UC09:10, UC01:6, UC02:4, UC03:8 = 57). E **nenhum**
// indicador aparece em 3 trimestres simultâneos na distribuição oficial — o
// máximo observado é 2 (UC01.3 sai como 'T1,T2', não 'T1,T2,T3' como o
// plan.md cogitava como exemplo antes de checar contra o dado real). Os
// asserts abaixo refletem essa realidade, não a suposição original.

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// __tests__ -> src -> portal -> platform -> raiz do repo (senac-tecnico-ia)
const REPO_ROOT = path.resolve(__dirname, '../../../../')

const UCS_MD_PATH = path.join(REPO_ROOT, 'contextos/conteudo-base/ucs-elementos-da-competencia.md')
const TRIMESTRAL_MD_PATH = path.join(REPO_ROOT, 'contextos/conteudo-base/distribuicao-trimestral-ano1.md')
const TURMAS_MD_PATH = path.join(REPO_ROOT, 'contextos/turmas.md')

describe('parseUcsMd — contra ucs-elementos-da-competencia.md real', () => {
  const content = fs.readFileSync(UCS_MD_PATH, 'utf8')
  const ucs = parseUcsMd(content)

  it('encontra as 9 UCs do Ano 1', () => {
    expect(ucs).toHaveLength(9)
  })

  it('toda UC sai com anoCurso === 1 (documento é só do Ano 1)', () => {
    for (const uc of ucs) {
      expect(uc.anoCurso).toBe(1)
    }
  })

  it('toda UC sai com conhecimentos e habilidades não vazios', () => {
    for (const uc of ucs) {
      expect(typeof uc.conhecimentos).toBe('string')
      expect(uc.conhecimentos.length).toBeGreaterThan(0)
      expect(typeof uc.habilidades).toBe('string')
      expect(uc.habilidades.length).toBeGreaterThan(0)
    }
  })
})

describe('parseIndicadoresMd + parseTrimestresMd — contra os arquivos reais', () => {
  const ucsContent = fs.readFileSync(UCS_MD_PATH, 'utf8')
  const trimestralContent = fs.readFileSync(TRIMESTRAL_MD_PATH, 'utf8')

  const ucs = parseUcsMd(ucsContent)
  const ucsPorCodigo = Object.fromEntries(ucs.map((u: { codigo: string }) => [u.codigo, u]))
  const indicadoresBase = parseIndicadoresMd(ucsContent, ucsPorCodigo)
  const trimestresPorCodigo = parseTrimestresMd(trimestralContent)

  const indicadores = indicadoresBase.map((ind: { codigo: string }) => ({
    ...ind,
    trimestres: trimestresPorCodigo[ind.codigo] ?? '',
  }))

  it('conta 57 indicadores no total (não 55 — ver nota acima)', () => {
    expect(indicadores).toHaveLength(57)
  })

  it('todo indicador.uc resolve para uma das 9 UCs existentes (nenhum indicador órfão)', () => {
    const codigosUc = new Set(ucs.map((u: { codigo: string }) => u.codigo))
    expect(codigosUc.size).toBe(9)
    for (const ind of indicadores) {
      expect(codigosUc.has(ind.uc)).toBe(true)
    }
  })

  it("UC01.3 (maior número de trimestres na distribuição real) sai com trimestres === 'T1,T2'", () => {
    const uc01_3 = indicadores.find((ind: { codigo: string }) => ind.codigo === 'UC01.3')
    expect(uc01_3).toBeDefined()
    expect(uc01_3.trimestres).toBe('T1,T2')
  })

  it('nenhum indicador aparece em 3 trimestres simultâneos na distribuição oficial', () => {
    for (const ind of indicadores) {
      const qtd = ind.trimestres === '' ? 0 : ind.trimestres.split(',').length
      expect(qtd).toBeLessThanOrEqual(2)
    }
  })
})

describe('parseTurmasMd — contra contextos/turmas.md real', () => {
  const content = fs.readFileSync(TURMAS_MD_PATH, 'utf8')
  const turmas = parseTurmasMd(content)

  it('encontra pelo menos a turma 2026A com status ativa', () => {
    const turma2026A = turmas.find((t: { id: string }) => t.id === '2026A')
    expect(turma2026A).toBeDefined()
    expect(turma2026A.status).toBe('ativa')
  })
})
