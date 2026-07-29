#!/usr/bin/env node
/**
 * seed-indicadores.mjs
 *
 * Lê:
 *   - contextos/conteudo-base/ucs-elementos-da-competencia.md  (9 UCs do Ano 1:
 *     nome, ano_curso, conhecimentos, habilidades, indicadores)
 *   - contextos/conteudo-base/distribuicao-trimestral-ano1.md  (em que
 *     trimestre(s) cada indicador é trabalhado, plano oficial)
 *   - contextos/turmas.md                                      (turmas)
 *   - avaliacoes/av0{1..6}/meta.yaml                           (avaliações)
 *
 * ... e gera o JSON de import esperado por `POST /api/admin/seed` (T5).
 *
 * Uso:
 *   node platform/scripts/seed-indicadores.mjs > /tmp/seed-indicadores.json
 *   node platform/scripts/seed-indicadores.mjs --post <WORKER_URL> --token <JWT admin>
 *
 *   # ou, sem colar token: preencha platform/scripts/.env (copie de .env.example)
 *   # com ADMIN_USERNAME/ADMIN_PASSWORD e rode com --env-file:
 *   node --env-file=platform/scripts/.env platform/scripts/seed-indicadores.mjs --post <WORKER_URL>
 *
 * Só processa o Ano 1 (única fonte com código oficial de UC hoje — ver
 * plan.md da spec 03-avaliacoes-por-indicador, seção "De onde vêm ucs,
 * indicadores.trimestres e turmas"). Quando Ano 2/3 ganharem código oficial
 * de UC, estenda lendo os arquivos -ano2.md/-ano3.md com os mesmos parsers.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getAdminToken } from './lib/admin-auth.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')

const UCS_MD = path.join(ROOT, 'contextos/conteudo-base/ucs-elementos-da-competencia.md')
const TRIMESTRAL_MD = path.join(ROOT, 'contextos/conteudo-base/distribuicao-trimestral-ano1.md')
const TURMAS_MD = path.join(ROOT, 'contextos/turmas.md')
const AVALIACOES_DIR = path.join(ROOT, 'avaliacoes')
const AVALIACAO_SLUGS = ['av01', 'av02', 'av03', 'av04', 'av05', 'av06']

// ---------------------------------------------------------------------------
// Duplicado de platform/shared/pure.ts (TS puro — não dá pra importar direto
// de um .mjs Node sem loader TS, e o resto do repo não assume um; mesmo
// motivo pelo qual build-all.mjs duplica seu próprio parseYaml em vez de
// importar). Manter em sincronia manual com pure.ts se a forma do código
// mudar lá.
// ---------------------------------------------------------------------------

export function parseIndicadorCodigo(codigo) {
  const match = /^(UC\d+)\.(\d+)$/.exec(codigo)
  if (!match) return null
  return { uc: match[1], numero: Number(match[2]) }
}

export function formatIndicadorCodigo(parts) {
  return `${parts.uc}.${parts.numero}`
}

// ---------------------------------------------------------------------------
// Parser YAML simplificado (duplicado de build-all.mjs, que não exporta o
// seu). Mesmas duas formas de lista suportadas: inline `[A, B]` e multilinha
// `- A`. Não é YAML genérico — só o suficiente pros meta.yaml deste repo.
// ---------------------------------------------------------------------------

export function parseMetaYaml(content) {
  const result = {}
  const lines = content.split('\n')
  const unwrapQuotes = (s) => s.trim().replace(/^["']|["']$/g, '')

  let i = 0
  while (i < lines.length) {
    const trimmed = lines[i].trim()
    if (!trimmed || trimmed.startsWith('#')) { i++; continue }

    const colonIdx = trimmed.indexOf(':')
    if (colonIdx === -1) { i++; continue }

    const key = trimmed.slice(0, colonIdx).trim()
    const valuePart = trimmed.slice(colonIdx + 1).trim()

    // Lista multilinha: "chave:" sozinho na linha, seguido de "  - item"
    if (valuePart === '') {
      const items = []
      let j = i + 1
      while (j < lines.length && lines[j].trim().startsWith('- ')) {
        items.push(unwrapQuotes(lines[j].trim().slice(2)))
        j++
      }
      if (items.length > 0 && key) {
        result[key] = items
        i = j
        continue
      }
      i++
      continue
    }

    // Lista inline: "chave: [A, B, C]"
    if (valuePart.startsWith('[') && valuePart.endsWith(']')) {
      const inner = valuePart.slice(1, -1).trim()
      if (key) {
        result[key] = inner === '' ? [] : inner.split(',').map(unwrapQuotes)
      }
      i++
      continue
    }

    // Escalar simples
    const value = unwrapQuotes(valuePart)
    if (key && value) result[key] = value
    i++
  }
  return result
}

// ---------------------------------------------------------------------------
// Fonte: contextos/conteudo-base/ucs-elementos-da-competencia.md
// ---------------------------------------------------------------------------

// Parser interno de uma seção "## UCxx — Nome" -> { codigo, nome, indicadores,
// conhecimentos, habilidades }. Compartilhado por parseUcsMd e
// parseIndicadoresMd (as duas leem a mesma seção, só extraem campos
// diferentes) — evita duas passadas divergentes sobre o mesmo markdown.
function parseUcSection(section) {
  const lines = section.split('\n')
  const header = lines[0].trim()
  const headerMatch = /^(UC\d{2})\s*(?:—|-)\s*(.+)$/.exec(header)
  if (!headerMatch) return null
  const [, codigo, nome] = headerMatch

  const indicadores = []
  const conhecimentos = []
  const habilidades = []
  let bloco = null // 'indicadores' | 'conhecimentos' | 'habilidades' | null

  for (const raw of lines.slice(1)) {
    const line = raw.trim()
    if (line === '---') break // fim da seção (separador antes da próxima UC)
    if (line === '') continue

    if (/^\*\*Indicadores\*\*/.test(line)) { bloco = 'indicadores'; continue }
    if (/^\*\*Conhecimentos\*\*/.test(line)) { bloco = 'conhecimentos'; continue }
    if (/^\*\*Habilidades\*\*/.test(line)) { bloco = 'habilidades'; continue }
    // Qualquer outra linha em negrito (Carga horária, Articulação com a
    // Formação Geral Básica) fecha o bloco atual sem virar dado.
    if (/^\*\*.+\*\*/.test(line)) { bloco = null; continue }

    if (bloco === 'indicadores') {
      const m = /^(\d+)\.\s+(.+)$/.exec(line)
      if (m) indicadores.push({ numero: Number(m[1]), descricao: m[2].trim() })
    } else if (bloco === 'conhecimentos') {
      const m = /^-\s+(.+)$/.exec(line)
      if (m) conhecimentos.push(m[1].trim())
    } else if (bloco === 'habilidades') {
      const m = /^-\s+(.+)$/.exec(line)
      if (m) habilidades.push(m[1].trim())
    }
  }

  return { codigo, nome, indicadores, conhecimentos, habilidades }
}

function getUcSections(content) {
  return content.split(/^## /m).slice(1).map(parseUcSection).filter(Boolean)
}

// ano_curso é sempre 1 neste arquivo (é o documento oficial só do Ano 1 —
// ver cabeçalho do md). Quando ucs-elementos-da-competencia-ano2.md/-ano3.md
// ganharem código oficial de UC, este parser roda de novo sobre eles com
// anoCurso 2/3 (hoje é gap conhecido, fora de escopo — ver plan.md).
export function parseUcsMd(content) {
  return getUcSections(content).map((s) => ({
    codigo: s.codigo,
    nome: s.nome,
    anoCurso: 1,
    conhecimentos: s.conhecimentos.join('\n'),
    habilidades: s.habilidades.join('\n'),
  }))
}

// `ucsPorCodigo`: mapa `{ [codigo]: uc }` (tipicamente o resultado de
// `parseUcsMd` indexado por `codigo`) usado só pra validar que todo indicador
// resolve numa UC existente antes de virar linha de seed (spec.md,
// Invariantes: "todo indicador.uc resolve pra uma linha existente em ucs").
export function parseIndicadoresMd(content, ucsPorCodigo) {
  const indicadores = []
  for (const s of getUcSections(content)) {
    if (!ucsPorCodigo[s.codigo]) {
      console.warn(`⚠️  ${s.codigo} tem indicadores no md mas não foi encontrada em ucsPorCodigo — pulando`)
      continue
    }
    for (const { numero, descricao } of s.indicadores) {
      indicadores.push({
        codigo: formatIndicadorCodigo({ uc: s.codigo, numero }),
        uc: s.codigo,
        numero,
        descricao,
        trimestres: '', // preenchido por quem chama, cruzando com parseTrimestresMd (RF4b)
      })
    }
  }
  return indicadores
}

// ---------------------------------------------------------------------------
// Fonte: contextos/conteudo-base/distribuicao-trimestral-ano1.md
// ---------------------------------------------------------------------------

// Devolve `{ [codigoIndicador]: 'T1,T2' }` — CSV ordenado T1→T2→T3 de em quais
// trimestres o indicador é trabalhado, segundo o plano oficial. Indicador que
// não aparece em nenhuma linha da tabela simplesmente não entra no objeto
// (quem chama decide o default, RF4b: "o seed não inventa").
export function parseTrimestresMd(content) {
  const porCodigo = {} // { [codigo]: Set<'T1'|'T2'|'T3'> }
  const sections = content.split(/^## /m).slice(1)

  for (const section of sections) {
    const lines = section.split('\n')
    const header = lines[0].trim()
    const headerMatch = /\((UC\d{2})\)\s*$/.exec(header)
    if (!headerMatch) continue
    const uc = headerMatch[1]

    const rowRegex = /^\|\s*(T[123])\s*\|\s*[\d.,]+\s*\|\s*([\d,\s]+)\s*\|$/
    for (const raw of lines.slice(1)) {
      const m = rowRegex.exec(raw.trim())
      if (!m) continue
      const [, trimestre, numerosRaw] = m
      const numeros = numerosRaw.split(',').map((n) => Number(n.trim())).filter((n) => !Number.isNaN(n))
      for (const numero of numeros) {
        const codigo = formatIndicadorCodigo({ uc, numero })
        if (!porCodigo[codigo]) porCodigo[codigo] = new Set()
        porCodigo[codigo].add(trimestre)
      }
    }
  }

  const ORDEM = ['T1', 'T2', 'T3']
  const csv = {}
  for (const [codigo, trimestres] of Object.entries(porCodigo)) {
    csv[codigo] = ORDEM.filter((t) => trimestres.has(t)).join(',')
  }
  return csv
}

// ---------------------------------------------------------------------------
// Fonte: contextos/turmas.md
// ---------------------------------------------------------------------------

export function parseTurmasMd(content) {
  const turmas = []
  const rowRegex = /^\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|$/gm
  let m
  while ((m = rowRegex.exec(content))) {
    const [, id, anoIngresso, status] = m
    if (id.toLowerCase() === 'id') continue // guarda contra o cabeçalho, se algum dia tiver ano_ingresso numérico coincidente
    turmas.push({ id: id.trim(), anoIngresso: Number(anoIngresso), status: status.trim() })
  }
  return turmas
}

// ---------------------------------------------------------------------------
// Montagem do payload de POST /api/admin/seed
// ---------------------------------------------------------------------------

function readMetaYaml(slug) {
  const metaPath = path.join(AVALIACOES_DIR, slug, 'meta.yaml')
  return parseMetaYaml(fs.readFileSync(metaPath, 'utf8'))
}

export function buildSeedPayload({
  ucsContent = fs.readFileSync(UCS_MD, 'utf8'),
  trimestralContent = fs.readFileSync(TRIMESTRAL_MD, 'utf8'),
  turmasContent = fs.readFileSync(TURMAS_MD, 'utf8'),
  metasPorSlug = Object.fromEntries(AVALIACAO_SLUGS.map((slug) => [slug, readMetaYaml(slug)])),
} = {}) {
  const ucs = parseUcsMd(ucsContent)
  const ucsPorCodigo = Object.fromEntries(ucs.map((u) => [u.codigo, u]))

  const indicadoresBase = parseIndicadoresMd(ucsContent, ucsPorCodigo)
  const trimestresPorCodigo = parseTrimestresMd(trimestralContent)

  const indicadores = indicadoresBase.map((ind) => ({
    ...ind,
    // Sem distribuição oficial (gap de Ano2/3, ou indicador não mapeado
    // ainda) => '' — RF4b: o seed não inventa trimestre.
    trimestres: trimestresPorCodigo[ind.codigo] ?? '',
  }))
  const indicadoresPorCodigo = Object.fromEntries(indicadores.map((i) => [i.codigo, i]))

  const turmas = parseTurmasMd(turmasContent)
  const turmasAtivas = turmas.filter((t) => t.status === 'ativa')

  const avaliacoes = []
  const avaliacaoIndicadores = []
  const avaliacoesTurma = []

  for (const slug of AVALIACAO_SLUGS) {
    const meta = metasPorSlug[slug]
    const metaSlug = meta.id ?? slug

    avaliacoes.push({
      slug: metaSlug,
      titulo: meta.titulo,
      tipo: meta.tipo ?? null,
      trimestre: meta.trimestre,
      status: meta.status,
    })

    const indicadoresMeta = Array.isArray(meta.indicadores) ? meta.indicadores : []
    for (const codigoRaw of indicadoresMeta) {
      const parsed = parseIndicadorCodigo(codigoRaw)
      if (!parsed) {
        console.warn(`⚠️  ${metaSlug}: indicador '${codigoRaw}' não bate com o formato UCxx.N — ignorado`)
        continue
      }
      const codigo = formatIndicadorCodigo(parsed)
      avaliacaoIndicadores.push({ avaliacaoSlug: metaSlug, indicadorCodigo: codigo })

      // Achado 🟡 do analyze.md: avisar (não bloquear) quando a avaliação
      // referencia um indicador fora do(s) trimestre(s) em que a
      // distribuição oficial marca ele como trabalhado.
      const indicador = indicadoresPorCodigo[codigo]
      const trimestresOficiais = indicador && indicador.trimestres ? indicador.trimestres.split(',') : []
      if (trimestresOficiais.length > 0 && !trimestresOficiais.includes(meta.trimestre)) {
        console.warn(
          `⚠️  ${metaSlug} (${meta.trimestre}) referencia ${codigo}, mas a distribuição trimestral só marca ${codigo} em ${trimestresOficiais.join(',')}`
        )
      }
    }

    const prazoLabel = meta.prazoLabel ?? meta['prazo-label'] ?? null
    for (const turma of turmasAtivas) {
      avaliacoesTurma.push({
        turmaId: turma.id,
        avaliacaoSlug: metaSlug,
        prazo: meta.prazo ?? null,
        prazoLabel,
        status: meta.status,
      })
    }
  }

  return { ucs, indicadores, avaliacoes, avaliacaoIndicadores, turmas, avaliacoesTurma }
}

async function main() {
  const payload = buildSeedPayload()

  const args = process.argv.slice(2)
  const postIdx = args.indexOf('--post')
  const tokenIdx = args.indexOf('--token')

  if (postIdx === -1) {
    console.log(JSON.stringify(payload, null, 2))
    return
  }

  const workerUrl = args[postIdx + 1]
  if (!workerUrl) {
    console.error('Uso: node platform/scripts/seed-indicadores.mjs --post <WORKER_URL> [--token <JWT admin>]')
    process.exit(1)
  }

  let token = tokenIdx !== -1 ? args[tokenIdx + 1] : null
  if (!token) {
    try {
      token = await getAdminToken(workerUrl)
    } catch (err) {
      console.error(err.message)
      process.exit(1)
    }
  }
  if (!token) {
    console.error(
      'Sem token. Passe --token <JWT admin>, ou preencha ADMIN_USERNAME/ADMIN_PASSWORD em platform/scripts/.env ' +
        '(copie de .env.example) e rode com: node --env-file=platform/scripts/.env platform/scripts/seed-indicadores.mjs --post <WORKER_URL>'
    )
    process.exit(1)
  }

  try {
    const res = await fetch(`${workerUrl}/api/admin/seed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(JSON.stringify(data))
    console.log('Seed aplicado:', JSON.stringify(data))
  } catch (err) {
    console.error('Falha ao aplicar seed:', err.message)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main()
