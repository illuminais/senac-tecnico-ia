#!/usr/bin/env node
/**
 * merge-orion-calendar.mjs
 * Reconcilia o diário/frequência do OrionWeb (via parse-orion-diario.mjs) com
 * AULAS-DADAS.md e os 9 contexto-{uc}.md, e emite o JSON pronto para
 * POST /api/calendar/import.
 *
 * Regras (ver plano em .claude/plans/pegue-e-jogue-isso-compiled-church.md):
 *  - Chave do merge é (data, uc), não só data.
 *  - Bloco (data,uc) já existe em AULAS-DADAS.md -> combina texto (Orion nunca
 *    sobrescreve, só complementa). Linha combinada "UC+UC" é tratada como opaca
 *    (não mexe) por ambiguidade de atribuição.
 *  - Dia já existe mas falta o bloco da UC -> adiciona bloco novo ao dia.
 *  - Dia não existe: se a data cai em A12-A22/A24-A30 (evidência cruzada
 *    confirmada manualmente, tabela RECONSTRUCTED abaixo) -> cria com o número
 *    real. Senão -> cria com id sintético `D{data}` e ressalva forte.
 *  - Placeholder A?? em contexto-{uc}.md que bate com uma data reconstruída
 *    vira o número real, enriquecido com o texto do Orion.
 *
 * Uso:
 *   node platform/scripts/merge-orion-calendar.mjs --dry-run   # só mostra o plano
 *   node platform/scripts/merge-orion-calendar.mjs --write     # aplica em AULAS-DADAS.md + contexto-*.md e imprime o JSON do calendário
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseOrionDump } from './parse-orion-diario.mjs'
import { parseAulasDadas, UC_NOMES, toIsoDate } from './seed-calendar.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const AULAS_DADAS_PATH = path.join(ROOT, 'AULAS-DADAS.md')
const ORION_DUMP_PATH = path.join(ROOT, 'orionweb/relatorio-diario-14jul2026.txt')

const CONTEXTO_PATH = {
  UC01: 'contextos/contexto-fundamentos-de-computacao.md',
  UC02: 'contextos/contexto-ingles-instrumental.md',
  UC03: 'contextos/contexto-fundamentos-matematicos.md',
  UC04: 'contextos/contexto-fundamentos-e-conceitos-de-ia.md',
  UC05: 'contextos/contexto-python-para-ia.md',
  UC06: 'contextos/contexto-arquitetura-computadores-gpu.md',
  UC07: 'contextos/contexto-transformacao-digital.md',
  UC08: 'contextos/contexto-banco-de-dados.md',
  UC09: 'contextos/contexto-estatistica-aplicada.md',
}

// Evidência cruzada (contextos/arquivados/contexto-calendario.md A12-A22 +
// contextos/panorama-primeiro-ano-ucs.md A24-A30), validada contra 5
// contexto-{uc}.md independentes em 14/07/2026. A23 e A31-A34 ficam de fora
// (numeração ambígua/documentada como inconsistente) -> id sintético.
const RECONSTRUCTED_NUMERO_BY_DATE = {
  '2026-04-10': 'A12',
  '2026-04-11': 'A13',
  '2026-04-16': 'A14',
  '2026-04-17': 'A15',
  '2026-04-20': 'A16',
  '2026-04-23': 'A17',
  '2026-04-24': 'A18',
  '2026-04-30': 'A19',
  '2026-05-07': 'A20',
  '2026-05-08': 'A21',
  '2026-05-14': 'A22',
  '2026-05-15': 'A24',
  '2026-05-16': 'A25',
  '2026-05-21': 'A26',
  '2026-05-22': 'A27',
  '2026-05-28': 'A28',
  '2026-05-29': 'A29',
  '2026-05-30': 'A30',
}

function log(...args) { console.error('[merge-orion]', ...args) }

// ---------------------------------------------------------------------------
// Helpers de leitura de rows de tabela markdown de AULAS-DADAS.md
// ---------------------------------------------------------------------------

// Retorna, para os UCs de uma cela de tabela (ex: "UC02+UC04"), a lista de códigos.
function ucsInCell(cell) {
  return [...cell.matchAll(/UC\d{2}/g)].map(m => m[0])
}

function isoToBr(iso) {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

// ---------------------------------------------------------------------------
// 1. Carrega e parseia as fontes
// ---------------------------------------------------------------------------

const aulasDadasRaw = fs.readFileSync(AULAS_DADAS_PATH, 'utf-8')
const orionEntries = parseOrionDump(fs.readFileSync(ORION_DUMP_PATH, 'utf-8'))
const existingDays = parseAulasDadas(aulasDadasRaw) // [{id,numero,data,blocos:[{uc,disciplina,conteudo,ha}]}]

log(`Orion: ${orionEntries.length} entradas (uc,data) parseadas.`)
log(`AULAS-DADAS.md: ${existingDays.length} dias já registrados.`)

// ---------------------------------------------------------------------------
// 2. Estado de trabalho: daysState por id (A-number real ou sintético D{data})
// ---------------------------------------------------------------------------

const daysState = new Map() // id -> { id, numero, data, isNewDay, blocks: Map(uc->{...,isNewBlock}) }
const dateToExistingId = new Map() // 'YYYY-MM-DD' -> id (para dias já em AULAS-DADAS.md)

for (const day of existingDays) {
  const blocks = new Map()
  for (const b of day.blocos) {
    blocks.set(b.uc, { ...b, isNewBlock: false })
  }
  daysState.set(day.id, { id: day.id, numero: day.numero, data: day.data, isNewDay: false, blocks })
  dateToExistingId.set(day.data, day.id)
}

const stats = { blocoCombinado: 0, blocoNovoEmDiaExistente: 0, diaNovoReconstruido: 0, diaNovoSintetico: 0, puloUcCombinada: 0, puloSemMudanca: 0 }

for (const entry of orionEntries) {
  const { uc, data, ha, conteudo } = entry

  let id = dateToExistingId.get(data)
  let isNewDay = false
  let numero = null

  if (!id) {
    const reconstructed = RECONSTRUCTED_NUMERO_BY_DATE[data]
    if (reconstructed) {
      id = reconstructed
      numero = reconstructed
      isNewDay = true
    } else {
      id = `D${data}`
      numero = null
      isNewDay = true
    }
  }

  if (!daysState.has(id)) {
    daysState.set(id, { id, numero, data, isNewDay, blocks: new Map() })
  }
  const day = daysState.get(id)

  const existingBlock = day.blocks.get(uc)

  if (existingBlock) {
    // idempotência: o texto do Orion já está presente nesse bloco, seja porque
    // já foi combinado ("— Diário Orion: ...") ou porque o bloco nasceu direto
    // do Orion numa rodada anterior (prefixo "[Orion...] " sem o marcador).
    if (existingBlock.conteudo.includes(conteudo)) {
      stats.puloSemMudanca++
      continue
    }
    const marker = 'Diário Orion:'
    existingBlock.conteudo = `${existingBlock.conteudo} — ${marker} ${conteudo}`
    if (existingBlock.ha == null) existingBlock.ha = ha // HA existente é autoritativo; só preenche se faltava
    stats.blocoCombinado++
    continue
  }

  // checa rows "opacas" (ex: "UC02+UC04") já existentes em AULAS-DADAS.md pra essa UC nesse dia
  const rawSection = !day.isNewDay ? null : null // placeholder — checagem de opacidade é feita abaixo via existingDays original
  const originalDay = existingDays.find(d => d.id === day.id)
  const coveredByCombinedRow = originalDay?.blocos?.some(b => false) // parseAulasDadas já ignora rows combinadas — ver checagem textual abaixo

  const prefix = isNewDay
    ? (numero ? '[Orion]' : '[Orion, não confirmado]')
    : '[Orion]'

  day.blocks.set(uc, {
    uc,
    disciplina: UC_NOMES[uc] ?? uc,
    conteudo: `${prefix} ${conteudo}`,
    ha,
    isNewBlock: true,
  })

  if (isNewDay) {
    if (numero) stats.diaNovoReconstruido++
    else stats.diaNovoSintetico++
  } else {
    stats.blocoNovoEmDiaExistente++
  }
}

log('Resumo:', JSON.stringify(stats, null, 2))

// ---------------------------------------------------------------------------
// 3. Guarda de segurança: linhas "UC+UC" combinadas em AULAS-DADAS.md — não
//    mexemos nelas, então se o Orion tem dado para uma UC que só aparece
//    dentro de uma cela combinada, temos que EVITAR duplicar o bloco.
//    Fazemos isso re-varrendo o texto bruto da seção original.
// ---------------------------------------------------------------------------

function sectionRawText(day) {
  // 's' pro '.' cruzar linhas dentro da seção; sem 'm' — '^'/'$' aqui teriam
  // que se referir a início/fim de LINHA (bug: '$' cortaria no fim do header).
  const headerText = day.numero ? `A${day.numero.replace('A', '')}` : 'Dia não numerado'
  const re = new RegExp(`(?:^|\\n)(## ${headerText} — [\\s\\S]*?)(?=\\n## |$)`, 's')
  const m = aulasDadasRaw.match(re)
  return m ? m[1] : null
}

for (const [id, day] of daysState) {
  if (day.isNewDay || !day.numero) continue // dias sintéticos (Dia não numerado) não têm rows combinadas "UC+UC" pra checar
  const raw = sectionRawText(day)
  if (!raw) continue
  const tableLines = raw.split('\n').filter(l => l.startsWith('|') && !l.includes('---') && !l.includes('**Total**'))
  const combinedUcs = new Set()
  for (const line of tableLines) {
    const firstCell = line.split('|')[1] ?? ''
    const ucs = ucsInCell(firstCell)
    if (ucs.length > 1) ucs.forEach(u => combinedUcs.add(u))
  }
  for (const uc of combinedUcs) {
    const block = day.blocks.get(uc)
    if (block?.isNewBlock) {
      log(`Pulando ${uc} em ${day.id} (${day.data}) — já coberta por uma linha combinada de UCs, não mexo.`)
      day.blocks.delete(uc)
      stats.puloUcCombinada++
      stats.blocoNovoEmDiaExistente--
    }
  }
}

// ---------------------------------------------------------------------------
// 4. Regenerar tabela markdown de uma seção (usada tanto pra seções
//    modificadas quanto pra seções novas)
// ---------------------------------------------------------------------------

function formatHa(ha) {
  if (ha == null) return '?'
  return Number.isInteger(ha) ? String(ha) : String(ha).replace('.', ',')
}

function buildTable(day, combinedRowsRawLines) {
  const rows = [...day.blocks.values()].map(b =>
    `| ${b.uc} | ${b.disciplina} | ${b.conteudo} | ~${formatHa(b.ha)} |`
  )
  const allRowsForTotal = [...day.blocks.values()].map(b => b.ha ?? 0)
  const total = allRowsForTotal.reduce((s, h) => s + h, 0)
  const lines = [
    '| UC | Disciplina | Conteúdo | HA |',
    '|---|---|---|---|',
    ...(combinedRowsRawLines ?? []),
    ...rows,
    `| | **Total** | | **~${formatHa(total)}** |`,
  ]
  return lines.join('\n')
}

function buildNewSection(day) {
  const header = day.numero
    ? `## ${day.numero} — ${isoToBr(day.data)}`
    : `## Dia não numerado — ${isoToBr(day.data)}`
  const caveat = day.numero
    ? '' // número reconstruído com evidência cruzada — sem ressalva extra aqui, já está no conteúdo de cada bloco
    : '\n\n**Feedback:** ⚠️ Dia sem número de aula confirmado (id interno `' + day.id + '`) — conteúdo vindo só do diário do OrionWeb, não confirmado pelo professor. Serve para contagem de HA/saldo, não leve o conteúdo ao pé da letra.'
  return `${header}\n\n${buildTable(day)}${caveat}\n`
}

// ---------------------------------------------------------------------------
// 5. Aplica nas seções existentes que mudaram (regenera só a tabela)
// ---------------------------------------------------------------------------

let newAulasDadas = aulasDadasRaw

for (const [id, day] of daysState) {
  if (day.isNewDay) continue
  const hasChange = [...day.blocks.values()].some(b => b.isNewBlock)
  if (!hasChange) continue

  const raw = sectionRawText(day)
  if (!raw) { log(`AVISO: não achei a seção de ${day.id} pra atualizar — pulando.`); continue }

  const tableMatch = raw.match(/\| UC \| Disciplina \| Conteúdo \| HA \|\n\|---\|---\|---\|---\|\n([\s\S]*?)\n\| \| \*\*Total\*\* \| \| \*\*~?[\d,.]+\*\* \|/)
  if (!tableMatch) { log(`AVISO: não achei a tabela de ${day.id} pra atualizar — pulando.`); continue }

  const oldTableRowsBlock = tableMatch[1]
  const combinedRowsRawLines = oldTableRowsBlock.split('\n').filter(l => {
    const firstCell = l.split('|')[1] ?? ''
    return ucsInCell(firstCell).length > 1
  })

  const newTable = buildTable(day, combinedRowsRawLines)
  const oldTableFull = raw.slice(raw.indexOf('| UC | Disciplina'), tableMatch.index + tableMatch[0].length)
  const newRaw = raw.replace(oldTableFull, newTable)
  newAulasDadas = newAulasDadas.replace(raw, newRaw)
  log(`Atualizado ${day.id} (${day.data}) em AULAS-DADAS.md.`)
}

// ---------------------------------------------------------------------------
// 6. Insere seções novas (reconstruídas ou sintéticas), na posição certa
// ---------------------------------------------------------------------------

const newDaySections = [...daysState.values()]
  .filter(d => d.isNewDay && d.blocks.size > 0)
  .sort((a, b) => a.data.localeCompare(b.data))

for (const day of newDaySections) {
  const sectionText = buildNewSection(day)
  // acha o ponto de inserção: depois da última seção existente (numerada ou já
  // inserida por este loop) cuja data seja menor que a desta
  const allNumeroSections = [...newAulasDadas.matchAll(/^## (A\d+|Dia não numerado) — (\d{2})\/(\d{2})\/(\d{4})/gm)]
  let insertAfter = null
  for (const m of allNumeroSections) {
    const secDate = `${m[4]}-${m[3]}-${m[2]}`
    if (secDate < day.data) insertAfter = m
    else break
  }
  const insertionAnchor = insertAfter
    ? newAulasDadas.indexOf('\n---\n', insertAfter.index)
    : newAulasDadas.indexOf('\n---\n')

  if (insertionAnchor === -1) {
    newAulasDadas += `\n---\n\n${sectionText}\n---\n`
  } else {
    const pos = insertionAnchor + '\n---\n'.length
    newAulasDadas = newAulasDadas.slice(0, pos) + `\n${sectionText}\n---\n` + newAulasDadas.slice(pos)
  }
  log(`Inserido ${day.numero ?? day.id} (${day.data}) em AULAS-DADAS.md.`)
}

// ---------------------------------------------------------------------------
// 7. contexto-{uc}.md — enriquece placeholders A?? e appenda linhas novas
// ---------------------------------------------------------------------------

const contextoPatches = new Map() // uc -> novo conteúdo completo

function patchContexto(uc, fn) {
  const relPath = CONTEXTO_PATH[uc]
  const fullPath = path.join(ROOT, relPath)
  const current = contextoPatches.get(uc) ?? fs.readFileSync(fullPath, 'utf-8')
  contextoPatches.set(uc, fn(current))
}

for (const [id, day] of daysState) {
  for (const [uc, block] of day.blocks) {
    if (!block.isNewBlock) continue
    const dataBr = isoToBr(day.data).slice(0, 5) // DD/MM

    patchContexto(uc, (content) => {
      const placeholderRegex = new RegExp(`\\| A\\?\\? \\| ${dataBr.replace('/', '\\/')} \\| ([^|]*) \\| ([^|]*) \\| ([^|]*) \\|`)
      const placeholderMatch = content.match(placeholderRegex)

      if (placeholderMatch) {
        const numeroCell = day.numero ?? 'A??'
        const feedbackCaveat = day.numero
          ? '(enriquecido via diário OrionWeb)'
          : '(OrionWeb, não confirmado — só p/ contagem de HA)'
        const newRow = `| ${numeroCell} | ${dataBr} | ${formatHa(block.ha)} | ${block.conteudo.replace(/^\[Orion[^\]]*\]\s*/, '')} | ${feedbackCaveat} |`
        log(`Enriquecendo placeholder A?? de ${uc} em ${dataBr} -> ${numeroCell}.`)
        return content.replace(placeholderMatch[0], newRow)
      }

      // idempotência: já existe uma linha de log com essa Data?
      const existingRowRegex = new RegExp(`\\| A[\\d?]+ \\| ${dataBr.replace('/', '\\/')} \\|`)
      if (existingRowRegex.test(content)) {
        log(`${uc} já tem linha de log pra ${dataBr} — não duplico.`)
        return content
      }

      const logHeaderRegex = /(## Log de Execução\s*\n(?:<!--[^\n]*-->\s*\n)?\|[^\n]*\|\s*\n\|[-\s|]*\|\s*\n)/
      if (!logHeaderRegex.test(content)) {
        log(`AVISO: não achei "## Log de Execução" em ${uc} — pulando append.`)
        return content
      }

      const numeroCell = day.numero ?? 'A??'
      const feedbackCaveat = day.numero
        ? 'Reconstruído via diário OrionWeb'
        : 'OrionWeb, não confirmado — só p/ contagem de HA'
      const newRow = `| ${numeroCell} | ${dataBr} | ~${formatHa(block.ha)} | ${block.conteudo.replace(/^\[Orion[^\]]*\]\s*/, '')} | ${feedbackCaveat} |\n`

      return content.replace(logHeaderRegex, `$1${newRow}`)
    })
  }
}

// ---------------------------------------------------------------------------
// 8. JSON final pro /api/calendar/import
// ---------------------------------------------------------------------------

const calendarDays = [...daysState.values()].map(day => ({
  id: day.id,
  numero: day.numero,
  data: day.data,
  tipo: 'aula',
  status: 'dada',
  observacao: (day.isNewDay && !day.numero) ? 'Fonte: OrionWeb, não confirmado — apenas para contagem de HA/saldo.' : null,
  blocos: [...day.blocks.values()].map(b => ({ uc: b.uc, disciplina: b.disciplina, conteudo: b.conteudo, ha: b.ha })),
}))

// ---------------------------------------------------------------------------
// 9. Execução
// ---------------------------------------------------------------------------

const args = process.argv.slice(2)
const write = args.includes('--write')

if (write) {
  fs.writeFileSync(AULAS_DADAS_PATH, newAulasDadas)
  log('AULAS-DADAS.md atualizado.')
  for (const [uc, content] of contextoPatches) {
    fs.writeFileSync(path.join(ROOT, CONTEXTO_PATH[uc]), content)
    log(`${CONTEXTO_PATH[uc]} atualizado.`)
  }
  fs.writeFileSync(path.join(ROOT, 'platform/scripts/data-calendar-orion-merge.json'), JSON.stringify({ days: calendarDays }, null, 2))
  log('platform/scripts/data-calendar-orion-merge.json escrito (colar em /admin/calendario ou usar com --post).')
} else {
  console.log('--- DRY RUN (use --write para aplicar) ---')
  console.log(JSON.stringify({ days: calendarDays }, null, 2))
}
