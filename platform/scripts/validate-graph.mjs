#!/usr/bin/env node
// Valida o grafo de estado (vault Obsidian em platform/specs/).
// Consistência mecânica, não disciplina: dangling links, enums, campos
// obrigatórios, órfãos e teto de linhas por nó.
// Uso: node platform/scripts/validate-graph.mjs [--dashboard]
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, basename, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'specs')

const TYPES = new Set(['feature', 'decisao', 'rumo', 'modulo', 'sprint', 'meta'])
const STATUS = new Set(['idea', 'speccing', 'planned', 'building', 'shipped', 'deprecated'])
const STATUS_REQUIRED = new Set(['feature', 'decisao', 'rumo', 'modulo'])
const ORPHAN_EXEMPT = new Set(['rumo', 'meta'])
const MAX_BODY_LINES = 14
const LINK_RE = /\[\[([^\]|#]+?)(?:[#|][^\]]*)?\]\]/g

// Nó do grafo = arquivo direto na raiz do vault (meta: _MOC/SCHEMA/constitution)
// ou dentro de nodes/. Docs de processo (spec/plan/tasks em NN-slug/) NÃO são nós.
const isNodeFile = rel => rel.startsWith('nodes/') || !rel.includes('/')
// Links dentro de blocos/spans de código são exemplos, não navegação.
const stripCode = t => t.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '')

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (extname(p) === '.md') out.push(p)
  }
  return out
}

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/)
  const fm = {}
  if (m) for (const line of m[1].split('\n')) {
    const mm = line.match(/^(\w+):\s*(.*)$/)
    if (mm) fm[mm[1]] = mm[2].trim()
  }
  return { fm, body: m ? text.slice(m[0].length) : text }
}

const files = walk(ROOT)
const basenames = new Set(files.map(f => basename(f, '.md')))
const errors = []
const warnings = []
const nodes = []

for (const file of files) {
  const rel = relative(ROOT, file)
  const text = readFileSync(file, 'utf8')

  // Links (fora de código) — checados em TODO arquivo do vault
  const outLinks = [...stripCode(text).matchAll(LINK_RE)].map(m => m[1].trim())
  for (const target of outLinks) {
    if (!basenames.has(target)) errors.push(`${rel}: link quebrado [[${target}]]`)
  }

  // Metadados de nó — só em nós/meta (docs de processo ficam de fora)
  if (!isNodeFile(rel)) continue
  const { fm, body } = parseFrontmatter(text)
  if (!fm.type) { errors.push(`${rel}: falta 'type' no frontmatter`); continue }
  if (!TYPES.has(fm.type)) errors.push(`${rel}: type inválido '${fm.type}'`)
  if (!fm.title) errors.push(`${rel}: falta 'title'`)
  if (!fm.updated) warnings.push(`${rel}: falta 'updated'`)
  if (STATUS_REQUIRED.has(fm.type)) {
    if (!fm.status) errors.push(`${rel}: falta 'status'`)
    else if (!STATUS.has(fm.status)) errors.push(`${rel}: status inválido '${fm.status}'`)
  }
  if (fm.type !== 'meta') {
    const bodyLines = body.split('\n').filter(l => l.trim()).length
    if (bodyLines > MAX_BODY_LINES) warnings.push(`${rel}: corpo com ${bodyLines} linhas (>~${MAX_BODY_LINES}) — nó pouco atômico`)
  }
  nodes.push({ slug: basename(file, '.md'), rel, type: fm.type, status: fm.status, title: fm.title, outLinks })
}

const inbound = new Map()
for (const n of nodes) for (const t of n.outLinks) inbound.set(t, (inbound.get(t) || 0) + 1)
for (const n of nodes) {
  if (ORPHAN_EXEMPT.has(n.type)) continue
  if (n.outLinks.length === 0 && !(inbound.get(n.slug) > 0)) {
    warnings.push(`${n.rel}: nó órfão (sem links de entrada nem saída)`)
  }
}

if (process.argv.includes('--dashboard')) {
  const byType = {}
  for (const n of nodes) (byType[n.type] ??= []).push(n)
  console.log('\n=== Dashboard do grafo ===')
  for (const t of Object.keys(byType).sort()) {
    console.log(`\n${t}:`)
    for (const n of byType[t].sort((a, b) => a.slug.localeCompare(b.slug))) {
      console.log(`  [${n.status ?? '-'}] ${n.slug}${n.title ? ' — ' + n.title : ''}`)
    }
  }
  console.log('')
}

for (const w of warnings) console.warn(`⚠️  ${w}`)
for (const e of errors) console.error(`❌ ${e}`)
console.log(`\n${errors.length} erro(s), ${warnings.length} aviso(s), ${nodes.length} nó(s) no grafo.`)
process.exit(errors.length ? 1 : 0)
