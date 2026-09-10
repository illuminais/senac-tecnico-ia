#!/usr/bin/env node
/**
 * validate-ha.mjs — Reconcilia HA entre contextos de disciplina e AULAS-DADAS.md
 *
 * Lê os 9 arquivos contexto-*.md, extrai "HA Dado" por trimestre,
 * e compara com a soma de HA reportada em AULAS-DADAS.md por UC.
 *
 * Uso: node scripts/validate-ha.mjs
 */

import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const ROOT = join(import.meta.dirname, '..')
const CONTEXTOS_DIR = join(ROOT, 'contextos')
const AULAS_DADAS = join(ROOT, 'AULAS-DADAS.md')

// UC code → slug mapping
const UC_SLUGS = {
  UC01: 'fundamentos-de-computacao',
  UC02: 'ingles-instrumental',
  UC03: 'fundamentos-matematicos',
  UC04: 'fundamentos-e-conceitos-de-ia',
  UC05: 'python-para-ia',
  UC06: 'arquitetura-computadores-gpu',
  UC07: 'transformacao-digital',
  UC08: 'banco-de-dados',
  UC09: 'estatistica-aplicada',
}

// Meta de HA por UC — lida de orionweb/disciplinas.csv, que é a transcrição do OrionWeb.
// Nunca escreva estes números à mão: o OrionWeb é a fonte de verdade (ver contextos/relatorio-horas-t3.md).
const TOTAL_HA = Object.fromEntries(
  readFileSync(join(ROOT, 'orionweb/disciplinas.csv'), 'utf8')
    .trim().split('\n').slice(1)
    .map(l => l.split(','))
    .map(([uc, , , , meta]) => [uc, Number(meta)])
)

// ── Extract HA from context files ──
function parseContextHA(uc, slug) {
  const filename = `contexto-${slug}.md`
  const filepath = join(CONTEXTOS_DIR, filename)
  let content
  try {
    content = readFileSync(filepath, 'utf8')
  } catch {
    return { file: filename, error: 'FILE NOT FOUND' }
  }

  // Look for Estado Geral table: | T1 | NN | NN | NN |  (NN may have text like "20 (ajustado)")
  const rows = []
  const tableRegex = /\|\s*T([123])\s*\|\s*(\d+)(?:\s*\([^)]*\))?\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|/g
  let match
  while ((match = tableRegex.exec(content)) !== null) {
    rows.push({
      trimestre: `T${match[1]}`,
      alocado: parseInt(match[2]),
      dado: parseInt(match[3]),
      restante: parseInt(match[4])
    })
  }

  return { file: filename, rows }
}

// ── Extract HA from AULAS-DADAS.md ──
function parseAulasDadas() {
  const content = readFileSync(AULAS_DADAS, 'utf8')
  const ucTotals = {}

  // Match table rows: | UC{NN} | Disciplina | Conteúdo | ~N |
  // Also match: | UC{NN}+UC{NN} | ...
  const rowRegex = /\|\s*(UC\d{2}(?:\+UC\d{2})*)\s*\|[^|]+\|[^|]+\|\s*~?([\d,\.]+)\s*\|/g
  let match
  while ((match = rowRegex.exec(content)) !== null) {
    const ucs = match[1].split('+')
    const ha = parseFloat(match[2].replace(',', '.'))
    const haPerUc = ha / ucs.length  // split evenly when combined
    for (const uc of ucs) {
      ucTotals[uc] = (ucTotals[uc] || 0) + haPerUc
    }
  }

  return ucTotals
}

// ── Main ──
console.log('╔══════════════════════════════════════════════════════════╗')
console.log('║        Validação Cruzada de HA — Senac Técnico IA       ║')
console.log('╚══════════════════════════════════════════════════════════╝\n')

const contextData = {}
let hasErrors = false

// 1. Parse context files
console.log('── Contextos de Disciplina ──\n')
for (const [uc, slug] of Object.entries(UC_SLUGS)) {
  const result = parseContextHA(uc, slug)
  contextData[uc] = result

  if (result.error) {
    console.log(`  ❌ ${uc}: ${result.error}`)
    hasErrors = true
    continue
  }

  if (result.rows.length === 0) {
    console.log(`  ⚠️  ${uc} (${result.file}): Tabela "Estado Geral" não encontrada`)
    continue
  }

  for (const row of result.rows) {
    const sum = row.dado + row.restante
    if (sum !== row.alocado) {
      console.log(`  ❌ ${uc} ${row.trimestre}: dado(${row.dado}) + restante(${row.restante}) = ${sum} ≠ alocado(${row.alocado})`)
      hasErrors = true
    }
  }

  const t1 = result.rows.find(r => r.trimestre === 'T1')
  if (t1) {
    console.log(`  ✅ ${uc} T1: ${t1.dado} dado / ${t1.restante} restante / ${t1.alocado} alocado`)
  }
}

// 2. Parse AULAS-DADAS.md
console.log('\n── AULAS-DADAS.md (HA reportado por UC) ──\n')
const aulasDadas = parseAulasDadas()

for (const [uc] of Object.entries(UC_SLUGS)) {
  const reported = aulasDadas[uc] || 0
  const ctx = contextData[uc]
  const ctxDado = ctx?.rows?.find(r => r.trimestre === 'T1')?.dado

  if (ctxDado !== undefined) {
    const diff = Math.abs(reported - ctxDado)
    const icon = diff <= 1 ? '✅' : '⚠️ '
    console.log(`  ${icon} ${uc}: AULAS-DADAS=${reported.toFixed(1)} HA | contexto T1.dado=${ctxDado} HA | diff=${diff.toFixed(1)}`)
    if (diff > 1) hasErrors = true
  } else {
    console.log(`  ℹ️  ${uc}: AULAS-DADAS=${reported.toFixed(1)} HA (sem contexto para comparar)`)
  }
}

// 3. Summary
console.log('\n── Resumo ──\n')
const totalReported = Object.values(aulasDadas).reduce((a, b) => a + b, 0)
console.log(`  Total HA reportado em AULAS-DADAS: ${totalReported.toFixed(1)}`)

if (hasErrors) {
  console.log('\n  ⚠️  Divergências encontradas — revisar arquivos acima.\n')
  process.exit(1)
} else {
  console.log('\n  ✅ Todos os valores consistentes.\n')
  process.exit(0)
}
