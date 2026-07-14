#!/usr/bin/env node
/**
 * seed-calendar.mjs
 * Lê AULAS-DADAS.md (aulas já dadas) + a rotação planejada do T2 restante
 * (contextos/semanas/horario-rotacao-t2.md, hardcoded abaixo pois esse trecho
 * ainda não foi detalhado semana a semana) e gera o JSON de import esperado
 * por POST /api/calendar/import.
 *
 * Uso:
 *   node platform/scripts/seed-calendar.mjs > /tmp/calendar-seed.json
 *   node platform/scripts/seed-calendar.mjs --post <WORKER_URL> --token <JWT>
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const AULAS_DADAS = path.join(ROOT, 'AULAS-DADAS.md')

export const UC_NOMES = {
  UC01: 'Fundamentos de Computação',
  UC02: 'Inglês Instrumental',
  UC03: 'Fundamentos Matemáticos',
  UC04: 'Fundamentos e Conceitos de IA',
  UC05: 'Python para IA',
  UC06: 'Arquitetura de Computadores e GPU',
  UC07: 'Transformação Digital',
  UC08: 'Banco de Dados',
  UC09: 'Estatística Aplicada',
}

export function toIsoDate(dd, mm, yyyy) {
  return `${yyyy}-${mm}-${dd}`
}

export function parseAulasDadas(content) {
  const days = []
  const sections = content.split(/^## /m).slice(1)

  for (const section of sections) {
    // "A{NN} — DD/MM/AAAA" (aula numerada) ou "Dia não numerado — DD/MM/AAAA"
    // (dia sintético sem número confirmado — ver merge-orion-calendar.mjs)
    const headerMatch = section.match(/^(?:A(\d+)|Dia não numerado) — (\d{2})\/(\d{2})\/(\d{4})/)
    if (!headerMatch) continue // pula o bloco de template no rodapé

    const [, numero, dd, mm, yyyy] = headerMatch
    const data = toIsoDate(dd, mm, yyyy)
    const id = numero ? `A${numero}` : `D${data}`

    const blocos = []
    const rowRegex = /^\|\s*(UC\d{2})\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*~?([\d,.]+)\s*\|$/gm
    let m
    while ((m = rowRegex.exec(section))) {
      const [, uc, disciplina, conteudo, haRaw] = m
      blocos.push({
        uc,
        disciplina: disciplina.trim() || UC_NOMES[uc] || uc,
        conteudo: conteudo.trim(),
        ha: parseFloat(haRaw.replace(',', '.')),
      })
    }

    if (blocos.length) {
      days.push({ id, numero: numero ? id : null, data, tipo: 'aula', status: 'dada', blocos })
    }
  }

  return days
}

// Rotação planejada A42–A53 (30/07–04/09), confirmada com o professor em 14/07/2026
// via contextos/semanas/horario-rotacao-t2.md. Conteúdo detalhado ainda não existe
// (fica para o @planejador-mensal, semana09.md em diante) — entra só a dupla de UCs.
const PLANEJADAS = [
  { id: 'A42', numero: 'A42', data: '2026-07-30', ucs: ['UC07', 'UC01'] },
  { id: 'A43', numero: 'A43', data: '2026-07-31', ucs: ['UC05', 'UC03'] },
  { id: 'A44', numero: 'A44', data: '2026-08-06', ucs: ['UC08', 'UC09'] },
  { id: 'A45', numero: 'A45', data: '2026-08-07', ucs: ['UC07', 'UC04'] },
  { id: 'A46', numero: 'A46', data: '2026-08-13', ucs: ['UC05', 'UC02'] },
  { id: 'A47', numero: 'A47', data: '2026-08-14', ucs: ['UC08', 'UC06'] },
  { id: 'A48', numero: 'A48', data: '2026-08-20', ucs: ['UC07', 'UC01'] },
  { id: 'A49', numero: 'A49', data: '2026-08-21', ucs: ['UC05', 'UC03'] },
  { id: 'A50', numero: 'A50', data: '2026-08-27', ucs: ['UC08', 'UC09'] },
  { id: 'A51', numero: 'A51', data: '2026-08-28', ucs: ['UC07', 'UC04'] },
  { id: 'A52', numero: 'A52', data: '2026-09-03', ucs: ['UC05', 'UC02'] },
  { id: 'A53', numero: 'A53', data: '2026-09-04', ucs: ['UC08', 'UC06'], observacao: 'Último dia do T2' },
].map(a => ({
  id: a.id,
  numero: a.numero,
  data: a.data,
  tipo: 'aula',
  status: 'planejada',
  observacao: a.observacao ?? null,
  blocos: a.ucs.map(uc => ({ uc, disciplina: UC_NOMES[uc] })),
}))

const RECESSO = [
  { id: 'RECESSO-JUL-2026', data: '2026-07-13', tipo: 'recesso', status: 'dada', observacao: 'Recesso de julho (13 a 25/07)', blocos: [] },
]

function main() {
  const content = fs.readFileSync(AULAS_DADAS, 'utf-8')
  const dadas = parseAulasDadas(content)
  const days = [...dadas, ...RECESSO, ...PLANEJADAS]

  const args = process.argv.slice(2)
  const postIdx = args.indexOf('--post')
  const tokenIdx = args.indexOf('--token')

  if (postIdx === -1) {
    console.log(JSON.stringify({ days }, null, 2))
    return
  }

  const workerUrl = args[postIdx + 1]
  const token = tokenIdx !== -1 ? args[tokenIdx + 1] : null
  if (!workerUrl || !token) {
    console.error('Uso: node platform/scripts/seed-calendar.mjs --post <WORKER_URL> --token <JWT admin>')
    process.exit(1)
  }

  fetch(`${workerUrl}/api/calendar/import`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ days }),
  })
    .then(async res => {
      const data = await res.json()
      if (!res.ok) throw new Error(JSON.stringify(data))
      console.log(`Importado: ${data.dias} dias.`)
    })
    .catch(err => {
      console.error('Falha ao importar:', err.message)
      process.exit(1)
    })
}

if (import.meta.url === `file://${process.argv[1]}`) main()
