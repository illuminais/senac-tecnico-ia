#!/usr/bin/env node
/**
 * build-all.mjs
 * Builda todas as aulas Slidev do monorepo e agrega em platform/dist/
 *
 * Filtro de release: só builda aulas com status: published
 * Use --all para incluir todas (modo dev/preview local)
 *
 * Incremental por HASH DE CONTEÚDO (platform/dist/.build-cache.json), não por
 * mtime — sobrevive a checkout/sandbox novo/qualquer coisa que reescreva
 * arquivos sem mudar o conteúdo. Só rebuilda a aula se slides.md/meta.yaml/etc
 * realmente mudaram desde o último build bem-sucedido.
 *
 * Uso:
 *   node platform/scripts/build-all.mjs          ← só published (incremental)
 *   node platform/scripts/build-all.mjs --all    ← todas (dev local, incremental)
 *   node platform/scripts/build-all.mjs --force  ← rebuilda tudo do zero
 *   node platform/scripts/build-all.mjs --all --force
 */

import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT  = path.resolve(__dirname, '../..')
const DIST  = path.resolve(__dirname, '../dist')
const CACHE_FILE = path.join(DIST, '.build-cache.json')

const includeAll    = process.argv.includes('--all')
const forceRebuild  = process.argv.includes('--force')

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** A{NN}_UC07+01+02_09abr → a11-uc07-01-02-09abr */
function toSlug(dirName) {
  return dirName.toLowerCase().replace(/_/g, '-').replace(/\+/g, '-')
}

/** Parse simples de YAML linha a linha (sem dep externa) */
function parseYaml(content) {
  const result = {}
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const colonIdx = trimmed.indexOf(':')
    if (colonIdx === -1) continue
    const key = trimmed.slice(0, colonIdx).trim()
    const value = trimmed.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (key && value) result[key] = value
  }
  return result
}

function readMeta(aulaDir) {
  const metaPath = path.join(aulaDir, 'meta.yaml')
  if (!fs.existsSync(metaPath)) return null
  return parseYaml(fs.readFileSync(metaPath, 'utf8'))
}

function log(msg, color = '') {
  const colors = { green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m', cyan: '\x1b[36m', reset: '\x1b[0m' }
  console.log(`${colors[color] || ''}${msg}${colors.reset}`)
}

/**
 * Hash de conteúdo (não mtime) dos fontes de uma aula: slides.md, meta.yaml e
 * todos os .vue/.ts/.js/.css/.json da pasta. Baseado em conteúdo (não em
 * timestamp) porque mtime não é confiável entre ambientes — um `git
 * checkout`, um sandbox recém-criado, ou qualquer operação que reescreva os
 * arquivos pode "tocar" o mtime sem o conteúdo ter mudado, forçando rebuild
 * de tudo à toa (foi exatamente o que aconteceu — build de 39 aulas do zero
 * mesmo sem nenhuma ter sido editada).
 */
function contentHash(aulaDir) {
  const TRACK_EXT = /\.(md|yaml|vue|ts|js|css|json)$/
  const files = []
  const stack = [aulaDir]
  while (stack.length) {
    const dir = stack.pop()
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === '.slidev' || entry.name === 'dist') continue
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) { stack.push(full); continue }
      if (!TRACK_EXT.test(entry.name)) continue
      files.push(full)
    }
  }
  files.sort() // ordem estável independente da ordem de leitura do FS

  const hash = crypto.createHash('sha256')
  for (const f of files) {
    hash.update(path.relative(aulaDir, f))
    hash.update(fs.readFileSync(f))
  }
  return hash.digest('hex')
}

function loadCache() {
  if (!fs.existsSync(CACHE_FILE)) return {}
  try { return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')) } catch { return {} }
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8')
}

// ---------------------------------------------------------------------------
// 1. Descobrir pastas de aula
// ---------------------------------------------------------------------------

const AULAS_BASE = path.join(ROOT, 'aulas')
const AULA_PATTERN = /^A\d+/

// Escaneia aulas/{mes}/{dirName}/ e ordena pelo número da aula (A01, A02...)
const aulaDirs = []
if (fs.existsSync(AULAS_BASE)) {
  for (const mes of fs.readdirSync(AULAS_BASE).sort()) {
    const mesDir = path.join(AULAS_BASE, mes)
    if (!fs.statSync(mesDir).isDirectory()) continue
    for (const name of fs.readdirSync(mesDir).sort()) {
      if (!AULA_PATTERN.test(name)) continue
      if (!fs.statSync(path.join(mesDir, name)).isDirectory()) continue
      aulaDirs.push({ dirName: name, aulaDir: path.join(mesDir, name) })
    }
  }
}
// Garante ordem cronológica pelo número (A01 < A02 < ... independente do mês)
aulaDirs.sort((a, b) => {
  const nA = parseInt(a.dirName.match(/^A(\d+)/)?.[1] ?? '0')
  const nB = parseInt(b.dirName.match(/^A(\d+)/)?.[1] ?? '0')
  return nA - nB
})

log(`\n📚 Plataforma LMS — Build das Aulas`, 'cyan')
log(`   Root: ${ROOT}`, 'cyan')
log(`   Modo: ${includeAll ? 'ALL (dev)' : 'published only'}`, 'cyan')
log(`   Aulas encontradas: ${aulaDirs.length}\n`, 'cyan')

// ---------------------------------------------------------------------------
// 2. Filtrar por status e coletar metadados
// ---------------------------------------------------------------------------

const aulasMeta = []

for (const { dirName, aulaDir } of aulaDirs) {
  const meta = readMeta(aulaDir)

  if (!meta) {
    log(`  ⚠  ${dirName} — sem meta.yaml, pulando`, 'yellow')
    continue
  }

  const status = meta.status || 'draft'
  const isPublished = status === 'published'

  if (!includeAll && !isPublished) {
    log(`  ⏭  ${dirName} — status: ${status} (pulado)`, 'yellow')
    continue
  }

  const slug = toSlug(dirName)

  // Verificar colisão de slug
  const collision = aulasMeta.find(a => a.slug === slug)
  if (collision) {
    log(`  ⛔ Colisão de slug "${slug}": ${collision.dirName} e ${dirName} — abortando`, 'red')
    process.exit(1)
  }

  aulasMeta.push({ dirName, aulaDir, slug, meta, status })
  log(`  ✓  ${dirName} → /${slug}/  [${status}]`)
}

if (aulasMeta.length === 0) {
  log(`\n  Nenhuma aula para buildar. Use --all ou publique uma aula (status: published).`, 'yellow')
  // Gera aulas.json vazio para o portal não quebrar com 404
  if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true })
  fs.writeFileSync(path.join(DIST, 'aulas.json'), '[]', 'utf8')
  log(`\n  📄 aulas.json gerado: 0 aulas (nenhuma published)`, 'yellow')
  process.exit(0)
}

log(`\n  ${aulasMeta.length} aula(s) para buildar\n`, 'green')

// ---------------------------------------------------------------------------
// 3. Preparar pasta dist
// ---------------------------------------------------------------------------

if (!fs.existsSync(DIST)) {
  fs.mkdirSync(DIST, { recursive: true })
}

// ---------------------------------------------------------------------------
// 4. Buildar cada aula
// ---------------------------------------------------------------------------

const results = []
const cache = loadCache()
const newCache = {}

for (const { dirName, aulaDir, slug, meta } of aulasMeta) {
  const aulaDistDir = path.join(DIST, slug)
  const hash = contentHash(aulaDir)
  newCache[slug] = hash

  // Build incremental: pular se o hash de conteúdo bate com o último build
  // bem-sucedido E o dist ainda existe (não confia só no hash se o dist sumiu).
  const upToDate = !forceRebuild
    && cache[slug] === hash
    && fs.existsSync(path.join(aulaDistDir, 'index.html'))

  if (upToDate) {
    log(`  ⏩ ${dirName} — sem alterações, pulando`, 'yellow')
    results.push({ dirName, slug, status: 'skipped', meta })
    continue
  }

  log(`\n─────────────────────────────────────────`, 'cyan')
  log(`  Buildando: ${dirName}`, 'cyan')
  log(`  Slug: /${slug}/`, 'cyan')

  // Limpar dist anterior desta aula
  if (fs.existsSync(aulaDistDir)) {
    fs.rmSync(aulaDistDir, { recursive: true })
  }

  try {
    // O Slidev usa --base para definir o subpath e --out para o output
    execSync(
      `npx slidev build --base "/${slug}/" --out "${aulaDistDir}"`,
      { cwd: aulaDir, stdio: 'inherit' }
    )

    results.push({ dirName, slug, status: 'ok', meta })
    log(`  ✅ ${dirName} buildado com sucesso`, 'green')
  } catch (err) {
    log(`  ❌ Erro ao buildar ${dirName}: ${err.message}`, 'red')
    results.push({ dirName, slug, status: 'error', meta, error: err.message })
    delete newCache[slug] // não cacheia build que falhou — próxima rodada tenta de novo
  }
}

// Persiste o cache (só aulas que buildaram OK ou já estavam em dia entram aqui)
saveCache(newCache)

// ---------------------------------------------------------------------------
// 5. Gerar aulas.json
// ---------------------------------------------------------------------------

const aulasJson = results
  .filter(r => r.status === 'ok' || r.status === 'skipped')
  .map(({ dirName, slug, meta }) => {
    // Extrair UCs do nome do dir. Padrão certo: A11_UC07+01+02_09abr → ['7','1','2']
    // (só o primeiro segmento leva "UC" — os seguintes são número puro). Mas
    // algumas pastas (A39-A41) foram criadas fora do padrão, tipo
    // A39_UC04+UC05_03jul (com "UC" repetido em cada segmento) — o
    // .replace(/^UC/i, '') tolera os dois formatos sem precisar renomear pasta.
    const ucMatch = dirName.match(/_UC([^_]+)_/)
    const ucs = ucMatch
      ? ucMatch[1].split('+').map(uc => uc.replace(/^UC/i, '').replace(/^0+/, '')).filter(Boolean)
      : []

    return {
      slug,
      dirName,
      numero: meta.aula || '',
      data: meta.date || '',
      titulo: meta.title || `Aula ${meta.aula || dirName}`,
      ucs,
      tipo: meta.tipo || 'normal',
      status: meta.status || 'published',
    }
  })
  // Ordenar por número da aula
  .sort((a, b) => Number(a.numero) - Number(b.numero))

fs.writeFileSync(
  path.join(DIST, 'aulas.json'),
  JSON.stringify(aulasJson, null, 2),
  'utf8'
)

log(`\n  📄 aulas.json gerado: ${aulasJson.length} aulas`, 'green')

// ---------------------------------------------------------------------------
// 5b. Gerar avaliacoes.json + copiar content.md
// ---------------------------------------------------------------------------

const AVALS_BASE = path.join(ROOT, 'avaliacoes')
const avalsJson = []

if (fs.existsSync(AVALS_BASE)) {
  const avDirs = fs.readdirSync(AVALS_BASE)
    .filter(n => /^av\d+/i.test(n))
    .sort()
    .map(n => ({ id: n, dir: path.join(AVALS_BASE, n) }))
    .filter(({ dir }) => fs.statSync(dir).isDirectory())

  for (const { id, dir } of avDirs) {
    const metaPath = path.join(dir, 'meta.yaml')
    if (!fs.existsSync(metaPath)) continue
    const meta = parseYaml(fs.readFileSync(metaPath, 'utf8'))
    avalsJson.push({
      id:        meta.id        || id,
      titulo:    meta.titulo    || id,
      tipo:      meta.tipo      || 'TC',
      prazo:     meta.prazo     || 'TBD',
      prazoLabel: meta['prazo-label'] || meta.prazoLabel || meta.prazo || 'A definir',
      ucs:       Array.isArray(meta.ucs) ? meta.ucs : [],
      status:    meta.status    || 'em-planejamento',
    })

    // Copiar content.md se existir e avaliação publicada
    const contentSrc = path.join(dir, 'content.md')
    if (fs.existsSync(contentSrc)) {
      const contentDst = path.join(DIST, 'avaliacoes', id)
      fs.mkdirSync(contentDst, { recursive: true })
      fs.copyFileSync(contentSrc, path.join(contentDst, 'content.md'))
      log(`  📋 ${id}/content.md copiado`, 'green')
    }
  }
  log(`  📄 avaliacoes.json gerado: ${avalsJson.length} avaliações`, 'green')
}

fs.writeFileSync(
  path.join(DIST, 'avaliacoes.json'),
  JSON.stringify(avalsJson, null, 2),
  'utf8'
)

// ---------------------------------------------------------------------------
// 6. Relatório final
// ---------------------------------------------------------------------------
const ok      = results.filter(r => r.status === 'ok').length
const skipped = results.filter(r => r.status === 'skipped').length
const error   = results.filter(r => r.status === 'error').length

log(`\n═══════════════════════════════════════`, 'cyan')
log(`  ✅ OK:      ${ok} aula(s) buildada(s)`, 'green')
if (skipped > 0) log(`  ⏩ Puladas: ${skipped} aula(s) sem alteração`, 'yellow')
if (error > 0) {
  log(`  ❌ Erro:  ${error} aula(s)`, 'red')
  results.filter(r => r.status === 'error').forEach(r => {
    log(`     - ${r.dirName}`, 'red')
  })
}
log(`  📁 Output: ${DIST}`, 'cyan')
log(`\n  Próximo passo: npm run build:portal`, 'cyan')
log(`═══════════════════════════════════════\n`, 'cyan')

if (error > 0) process.exit(1)
