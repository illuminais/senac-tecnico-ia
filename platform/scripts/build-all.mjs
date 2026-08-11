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
 * O hash de cada aula inclui um GLOBAL_HASH (tema + lockfile + versão do
 * slidev + bytes deste script), então editar o tema compartilhado invalida
 * todas as aulas em vez de gerar deploy silenciosamente desatualizado.
 *
 * ⚠️  Este script faz PRUNE do platform/dist: tudo que não é slug válido nem
 * artefato conhecido é apagado, INCLUSIVE o output do portal (que o
 * `build:portal` regenera logo em seguida, já que o vite roda com
 * emptyOutDir:false pra não apagar as aulas). Isso é o que torna o dist uma
 * função pura da árvore atual — pré-requisito pra confiar num cache
 * persistido no CI. Consequência: rodar SÓ `build:aulas` e servir o dist
 * deixa sem portal até rodar `build:portal`.
 *
 * Uso:
 *   node platform/scripts/build-all.mjs          ← só published (incremental)
 *   node platform/scripts/build-all.mjs --all    ← todas (dev local, incremental)
 *   node platform/scripts/build-all.mjs --force  ← rebuilda tudo do zero
 *   node platform/scripts/build-all.mjs --all --force
 *
 * Env:
 *   FORCE_REBUILD=1        ← equivalente a --force (usado pelo workflow_dispatch)
 *   BUILD_CONCURRENCY=N    ← builds simultâneos (default: min(4, cpus, mem/2GB))
 */

import fs from 'fs'
import os from 'os'
import path from 'path'
import crypto from 'crypto'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT  = path.resolve(__dirname, '../..')
const DIST  = path.resolve(__dirname, '../dist')
const CACHE_FILE = path.join(DIST, '.build-cache.json')

const SELF       = fileURLToPath(import.meta.url)
const THEME_DIR  = path.join(ROOT, 'neural-slides-template')
const SLIDEV_BIN = path.join(ROOT, 'node_modules/@slidev/cli/bin/slidev.mjs')

/** Bump manual: invalida TODAS as aulas na próxima rodada. Use quando mudar a
 *  lógica de build de um jeito que muda o output sem mudar bytes de fonte. */
const SCRIPT_VERSION = '1'

const includeAll = process.argv.includes('--all')

// A env var existe porque `npm run build:pages -- --force` anexa o flag ao
// ÚLTIMO comando do `&&` (o build:portal), que ignora em silêncio. O
// workflow_dispatch usa FORCE_REBUILD=1.
const forceRebuild = process.argv.includes('--force') || process.env.FORCE_REBUILD === '1'

// Runner do GitHub é 4 vCPU / 16 GB. O teto por memória existe porque cada
// build vite/rollup come ~1-1.5 GB — numa máquina de 7 GB, 4 simultâneos
// derrubam a build por OOM.
const CONCURRENCY = Number(process.env.BUILD_CONCURRENCY) || Math.max(1, Math.min(
  4,
  os.cpus().length,
  Math.floor(os.totalmem() / (2 * 1024 ** 3)),
))

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** A{NN}_UC07+01+02_09abr → a11-uc07-01-02-09abr */
function toSlug(dirName) {
  return dirName.toLowerCase().replace(/_/g, '-').replace(/\+/g, '-')
}

/**
 * Parse simples de YAML linha a linha (sem dep externa). Entende chave: valor
 * escalar (com unwrap de aspas) e os dois formatos de lista usados nos
 * meta.yaml deste repo:
 *   - inline:     ucs: [UC01, UC02, UC04]
 *   - multilinha: ucs:
 *                   - UC01
 *                   - UC02
 * Não é um parser YAML genérico — só o suficiente pra esses dois formatos.
 */
function parseYaml(content) {
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

function readMeta(aulaDir) {
  const metaPath = path.join(aulaDir, 'meta.yaml')
  if (!fs.existsSync(metaPath)) return null
  return parseYaml(fs.readFileSync(metaPath, 'utf8'))
}

function log(msg, color = '') {
  const colors = { green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m', cyan: '\x1b[36m', reset: '\x1b[0m' }
  console.log(`${colors[color] || ''}${msg}${colors.reset}`)
}

// Deny-list de diretórios derivados. Era um allow-list de extensões, que
// perdia .csv/.html/.webp/.db/.sql — a deny-list erra pro lado de
// over-invalidar, e rebuildar à toa custa 12s enquanto NÃO rebuildar quando
// devia entrega slide errado em produção.
const IGNORE_DIRS  = new Set(['node_modules', '.slidev', 'dist', '.git', '.vite', '.cache', '.temp'])
// Metadados de VCS/SO: não são lidos por vite nem slidev, então não podem
// mudar o output. Ficam de fora pra que editar o .gitignore do tema não
// custe um rebuild das 43 aulas.
const IGNORE_FILES = new Set(['.DS_Store', 'Thumbs.db', 'desktop.ini', '.gitignore', '.gitattributes'])

// O slidev escreve <aulaDir>/index.html como entry do vite durante o build e
// apaga no fim — mas o arquivo SOBREVIVE se o build for interrompido (Ctrl+C,
// ou o cancel-in-progress do CI). Sem essa exclusão, o resto de um build morto
// muda o hash da aula e força rebuild na rodada seguinte.
const AULA_IGNORE_REL = new Set(['index.html'])

function collectFiles(root, ignoreRel = new Set()) {
  const files = []
  const stack = [root]
  while (stack.length) {
    const dir = stack.pop()
    let entries
    try { entries = fs.readdirSync(dir, { withFileTypes: true }) } catch { continue }
    for (const entry of entries) {
      // Nunca seguir symlink: o package.json da A20_UC07+04_02mai ainda se
      // chama "neural-slides-template", então o npm workspaces planta
      // node_modules/neural-slides-template → aquela pasta de aula. Seguir o
      // link faria o walk andar em círculo.
      if (entry.isSymbolicLink()) continue
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (!IGNORE_DIRS.has(entry.name)) stack.push(full)
        continue
      }
      if (!entry.isFile() || IGNORE_FILES.has(entry.name)) continue
      if (ignoreRel.has(path.relative(root, full).split(path.sep).join('/'))) continue
      files.push(full)
    }
  }
  return files.sort() // ordem estável independente da ordem de leitura do FS
}

/**
 * Hash de conteúdo (não mtime) de uma árvore. Baseado em conteúdo porque mtime
 * não é confiável entre ambientes — um `git checkout`, um sandbox recém-criado,
 * ou qualquer operação que reescreva os arquivos pode "tocar" o mtime sem o
 * conteúdo ter mudado, forçando rebuild de tudo à toa (foi exatamente o que
 * aconteceu — build de 39 aulas do zero sem nenhuma ter sido editada).
 */
function hashTree(root, ignoreRel) {
  const hash = crypto.createHash('sha256')
  for (const f of collectFiles(root, ignoreRel)) {
    // Separador \0 entre path e conteúdo: sem ele "ab"+"c" e "a"+"bc" colidem.
    // path.sep normalizado pra "/": a criação de aula tem variante PowerShell,
    // e sem isso o mesmo commit hasheia diferente no Windows e no Linux.
    hash.update(path.relative(root, f).split(path.sep).join('/'))
    hash.update('\0')
    hash.update(crypto.createHash('sha256').update(fs.readFileSync(f)).digest())
  }
  return hash.digest('hex')
}

function hashFile(file) {
  if (!fs.existsSync(file)) return 'missing'
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
}

function installedSlidevVersion() {
  try {
    const pkg = path.join(ROOT, 'node_modules/@slidev/cli/package.json')
    return JSON.parse(fs.readFileSync(pkg, 'utf8')).version
  } catch { return 'unknown' }
}

/**
 * Tudo que afeta o output de QUALQUER aula, computado uma vez. O tema é o item
 * central: neural-slides-template/ é usado por 43 das 44 aulas e ficava de fora
 * do hash, então editar o tema gerava deploy silenciosamente desatualizado.
 *
 * Hashear os bytes deste próprio script faz uma edição de comentário rebuildar
 * tudo. É de propósito: a alternativa (confiar na disciplina de bumpar
 * SCRIPT_VERSION) falha em silêncio e pra sempre na primeira vez que alguém
 * esquecer, e um rebuild completo em paralelo é ~3 min.
 */
const GLOBAL_HASH = (() => {
  const h = crypto.createHash('sha256')
  h.update(`v=${SCRIPT_VERSION}\0`)
  h.update(`slidev=${installedSlidevVersion()}\0`)
  h.update(`script=${hashFile(SELF)}\0`)
  h.update(`lock=${hashFile(path.join(ROOT, 'package-lock.json'))}\0`)
  h.update(`theme=${fs.existsSync(THEME_DIR) ? hashTree(THEME_DIR) : 'missing'}\0`)
  return h.digest('hex')
})()

function aulaHash(aulaDir) {
  return crypto.createHash('sha256')
    .update(GLOBAL_HASH).update('\0').update(hashTree(aulaDir, AULA_IGNORE_REL))
    .digest('hex')
}

/**
 * Builda uma aula em processo separado. Chama o bin do slidev direto via
 * process.execPath (sem shell, args em array) — nomes de pasta têm "+"
 * (A44_UC08+09_06ago) e isso evita tanto quoting quanto o overhead do npx.
 */
function buildAula({ dirName, aulaDir, slug, meta }) {
  return new Promise((resolve) => {
    const aulaDistDir = path.join(DIST, slug)
    // Limpar dist anterior desta aula
    fs.rmSync(aulaDistDir, { recursive: true, force: true })

    const child = spawn(
      process.execPath,
      [SLIDEV_BIN, 'build', '--base', `/${slug}/`, '--out', aulaDistDir],
      { cwd: aulaDir, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, FORCE_COLOR: '1' } },
    )

    // Buffer do output em vez de stdio:'inherit': com N builds simultâneos as
    // linhas de 4 aulas se embaralham e o log de CI vira ilegível.
    const chunks = []
    child.stdout.on('data', c => chunks.push(c))
    child.stderr.on('data', c => chunks.push(c))
    child.on('error', (err) => chunks.push(Buffer.from(`spawn error: ${err.message}\n`)))
    child.on('close', (code) => {
      const ok = code === 0
      const grouped = process.env.GITHUB_ACTIONS === 'true'
      if (grouped) console.log(`::group::${ok ? '✅' : '❌'} ${dirName} → /${slug}/`)
      else log(`\n─── ${ok ? '✅' : '❌'} ${dirName} → /${slug}/`, ok ? 'green' : 'red')
      process.stdout.write(Buffer.concat(chunks).toString())
      if (grouped) console.log('::endgroup::')
      resolve({ dirName, slug, meta, ok, error: ok ? null : `slidev build saiu com código ${code}` })
    })
  })
}

/** Pool com limite fixo: N workers puxando da mesma fila, resultado na ordem de entrada. */
async function runPool(items, limit, fn) {
  const out = []
  let next = 0
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    for (let i = next++; i < items.length; i = next++) out[i] = await fn(items[i])
  }))
  return out
}

const KEEP_FILES = new Set(['aulas.json', 'avaliacoes.json', '.build-cache.json'])
const KEEP_DIRS  = new Set(['avaliacoes'])

/**
 * Torna platform/dist uma função pura da árvore atual: o que não é slug válido
 * nem artefato conhecido é lixo — slug renomeado/despublicado, ou output antigo
 * do portal que o vite não apaga porque roda com emptyOutDir:false.
 *
 * Sem isso o cache de CI transforma lixo em lixo IMORTAL. E é pior que
 * desperdício: o _redirects tem 301 das aulas A39-A41 renomeadas, e no Pages
 * arquivo estático ganha de regra de redirect — uma pasta órfã
 * a39-uc04-uc05-03jul/ mascararia o próprio 301 pra sempre.
 */
function pruneDist(validSlugs) {
  for (const entry of fs.readdirSync(DIST, { withFileTypes: true })) {
    const name = entry.name
    if (validSlugs.has(name)) continue
    if (entry.isDirectory() ? KEEP_DIRS.has(name) : KEEP_FILES.has(name)) continue
    fs.rmSync(path.join(DIST, name), { recursive: true, force: true })
    log(`  🧹 dist/${name} removido (órfão ou output do portal)`, 'yellow')
  }
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
log(`   Modo: ${includeAll ? 'ALL (dev)' : 'published only'}${forceRebuild ? ' + FORCE' : ''}`, 'cyan')
log(`   Hash global: ${GLOBAL_HASH.slice(0, 12)} (tema + lockfile + slidev ${installedSlidevVersion()})`, 'cyan')
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

pruneDist(new Set(aulasMeta.map(a => a.slug)))

// ---------------------------------------------------------------------------
// 4. Buildar cada aula
// ---------------------------------------------------------------------------

const results = []
const cache = loadCache()

// Carry-forward em vez de {}: uma rodada published-only não pode apagar a
// entrada de uma aula draft. Era isso que fazia alternar entre `build:aulas` e
// `build:aulas:all` rebuildar tudo à toa.
const newCache = { ...cache }

// Fase 1 (serial, barata): hashear e particionar em pular/buildar.
const toBuild = []

for (const { dirName, aulaDir, slug, meta } of aulasMeta) {
  const hash = aulaHash(aulaDir)
  newCache[slug] = hash

  // Build incremental: pular se o hash de conteúdo bate com o último build
  // bem-sucedido E o dist ainda existe (não confia só no hash se o dist sumiu).
  const upToDate = !forceRebuild
    && cache[slug] === hash
    && fs.existsSync(path.join(DIST, slug, 'index.html'))

  if (upToDate) {
    log(`  ⏩ ${dirName} — sem alterações, pulando`, 'yellow')
    results.push({ dirName, slug, status: 'skipped', meta })
    continue
  }

  toBuild.push({ dirName, aulaDir, slug, meta })
}

// Fase 2 (paralela): builds isolados — cada aula é workspace própria, com seu
// node_modules/.vite e seu .slidev/, sem estado mutável compartilhado.
if (toBuild.length > 0) {
  log(`\n─────────────────────────────────────────`, 'cyan')
  log(`  Buildando ${toBuild.length} aula(s) — concorrência: ${CONCURRENCY}`, 'cyan')
  log(`─────────────────────────────────────────`, 'cyan')

  const built = await runPool(toBuild, CONCURRENCY, buildAula)

  for (const { dirName, slug, meta, ok, error } of built) {
    if (ok) {
      results.push({ dirName, slug, status: 'ok', meta })
    } else {
      log(`  ❌ Erro ao buildar ${dirName}: ${error}`, 'red')
      results.push({ dirName, slug, status: 'error', meta, error })
      delete newCache[slug] // não cacheia build que falhou — próxima rodada tenta de novo
    }
  }
}

// Descarta entradas de slug que sumiu do disco (aula renomeada/deletada), senão
// o manifesto cresce pra sempre. Usa aulaDirs (todas as pastas) e não
// aulasMeta (só as filtradas), pra não anular o carry-forward acima.
const knownSlugs = new Set(aulaDirs.map(a => toSlug(a.dirName)))
for (const slug of Object.keys(newCache)) {
  if (!knownSlugs.has(slug)) delete newCache[slug]
}

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
