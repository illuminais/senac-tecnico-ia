#!/usr/bin/env node
/**
 * parse-orion-diario.mjs
 * Parser reutilizável do extrato "RelChamada.asp" do OrionWeb (frequência +
 * diário de classe, colado em texto). Para cada disciplina, cruza:
 *   - o cabeçalho do grid de frequência (`CH  DD/MM-Nh  DD/MM-Nh  ...`) → HA por data
 *   - o diário de classe (`DD/MM/AAAA  BASE TECNOLÓGICA: ...` [+ `OBSERVAÇÕES:`]) → conteúdo por data
 * Só emite datas presentes no diário — confirmado que o diário é sempre um
 * subconjunto das colunas do grid (colunas sem diário são datas futuras
 * pré-alocadas pelo Orion, ainda sem aula real).
 * Não parseia o grid de presença por aluno (fora de escopo — sem tabela de
 * frequência no schema da plataforma, e não foi pedido).
 *
 * Uso:
 *   node platform/scripts/parse-orion-diario.mjs orionweb/relatorio-diario-14jul2026.txt
 */

import fs from 'fs'

export const DISCOD_TO_UC = {
  '17525': 'UC01',
  '17526': 'UC02',
  '17527': 'UC03',
  '17528': 'UC04',
  '17529': 'UC05',
  '17530': 'UC06',
  '17531': 'UC07',
  '17532': 'UC08',
  '17533': 'UC09',
}

function normalizeWhitespace(s) {
  // colapsa espaços/quebras de linha E escapa `|` — o texto vira célula de
  // tabela markdown mais adiante (em AULAS-DADAS.md/contexto-*.md), e o
  // diário do Orion às vezes tem `|` soltos (typo, ou uma linha de tabela
  // colada por engano) que quebrariam a tabela de destino.
  return s.replace(/\s+/g, ' ').replace(/\|/g, '/').trim()
}

export function parseOrionDump(text) {
  const chunks = text.split(/(?=Disciplina:\s*\d+\s*-)/)

  const freqByDiscod = new Map()   // discod -> Map('DD/MM' -> ha)
  const diarioByDiscod = new Map() // discod -> Map('DD/MM' -> { conteudo, ano })
  const nomeByDiscod = new Map()

  for (const chunk of chunks) {
    const discMatch = chunk.match(/Disciplina:\s*(\d+)\s*-\s*([^\n]+?)\s*-\s*CH:/)
    if (!discMatch) continue
    const [, discod, nomeRaw] = discMatch
    nomeByDiscod.set(discod, nomeRaw.trim())

    if (chunk.includes('BASE TECNOLÓGICA:')) {
      const map = diarioByDiscod.get(discod) ?? new Map()
      const entryRegex = /(\d{2})\/(\d{2})\/(\d{4})\s+BASE TECNOLÓGICA:\s*\n([\s\S]*?)(?=\n\d{2}\/\d{2}\/\d{4}\s+BASE TECNOLÓGICA:|\n_{5,}|$)/g
      let m
      while ((m = entryRegex.exec(chunk))) {
        const [, dd, mm, yyyy, body] = m
        const obsIdx = body.indexOf('OBSERVAÇÕES:')
        const baseTexto = normalizeWhitespace(obsIdx === -1 ? body : body.slice(0, obsIdx))
        const obsTexto = obsIdx === -1 ? '' : normalizeWhitespace(body.slice(obsIdx + 'OBSERVAÇÕES:'.length))
        const conteudo = obsTexto ? `${baseTexto} — Observações: ${obsTexto}` : baseTexto
        map.set(`${dd}/${mm}`, { conteudo, ano: yyyy })
      }
      diarioByDiscod.set(discod, map)
    } else {
      const map = freqByDiscod.get(discod) ?? new Map()
      const headerMatch = chunk.match(/^CH((?:\s+\d{2}\/\d{2}-\d+h)+)\s+Faltas/m)
      if (headerMatch) {
        const tokenRegex = /(\d{2})\/(\d{2})-(\d+)h/g
        let hm
        while ((hm = tokenRegex.exec(headerMatch[1]))) {
          const [, dd, mm, ha] = hm
          map.set(`${dd}/${mm}`, Number(ha))
        }
      }
      freqByDiscod.set(discod, map)
    }
  }

  const result = []
  for (const [discod, diarioMap] of diarioByDiscod) {
    const uc = DISCOD_TO_UC[discod]
    if (!uc) {
      console.error(`[parse-orion-diario] DisCod desconhecido: ${discod} (${nomeByDiscod.get(discod)}) — pulando`)
      continue
    }
    const freqMap = freqByDiscod.get(discod) ?? new Map()
    for (const [dateKey, { conteudo, ano }] of diarioMap) {
      const ha = freqMap.get(dateKey) ?? null
      if (ha === null) {
        console.error(`[parse-orion-diario] ${uc} ${dateKey}: sem HA correspondente no grid de frequência — data ignorada`)
        continue
      }
      const [dd, mm] = dateKey.split('/')
      result.push({ uc, discod, disciplina: nomeByDiscod.get(discod), data: `${ano}-${mm}-${dd}`, ha, conteudo })
    }
  }

  return result.sort((a, b) => a.data.localeCompare(b.data) || a.uc.localeCompare(b.uc))
}

function main() {
  const filePath = process.argv[2]
  if (!filePath) {
    console.error('Uso: node platform/scripts/parse-orion-diario.mjs <caminho-do-dump.txt>')
    process.exit(1)
  }
  const text = fs.readFileSync(filePath, 'utf-8')
  const result = parseOrionDump(text)
  console.log(JSON.stringify(result, null, 2))
}

if (import.meta.url === `file://${process.argv[1]}`) main()
