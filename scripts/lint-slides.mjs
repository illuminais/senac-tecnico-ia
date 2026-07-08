#!/usr/bin/env node
/**
 * lint-slides.mjs — Lint de slides Slidev para o curso Técnico em IA
 *
 * Verifica:
 * - Overflow: >8 linhas texto, >15 linhas código por slide
 * - Estrutura: code + tabela no mesmo slide, >1 tabela, >2 code blocks
 * - Frontmatter: layouts válidos, campos obrigatórios
 * - Conteúdo: em-dashes (—), slides fantasma, >2 TEORIA consecutivos
 *
 * Uso: node scripts/lint-slides.mjs [caminho/slides.md]
 *       node scripts/lint-slides.mjs                       # lint em todas as aulas
 */

import { readFileSync, existsSync } from 'fs'
import path, { join, relative } from 'path'
import { globSync } from 'fs'

const ROOT = join(import.meta.dirname, '..')

const VALID_LAYOUTS = [
  'cover', 'default', 'center', 'end', 'brainstorm',
  'two-cols', 'two-cols-text', 'two-cols-img', 'two-cols-img-and-text',
  'three-cols-img', 'big-img-text', 'social'
]

const LIMITS = {
  textLines: 8,
  codeLines: 15,
  listItems: 6,
  codeBlocksDefault: 1,
  tablesPerSlide: 1,
  consecutiveTeoria: 2
}

function parseSlides(content) {
  // Split by --- separators (slide boundaries)
  const rawSlides = content.split(/\n---\n/)
  const slides = []
  let slideNum = 0

  for (const raw of rawSlides) {
    slideNum++
    // Skip first block if it's just global frontmatter
    if (slideNum === 1 && raw.includes('theme:')) continue

    const slide = { num: slideNum, raw, issues: [] }

    // Extract frontmatter
    const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---/)
    if (fmMatch) {
      slide.frontmatter = fmMatch[1]
      slide.body = raw.slice(fmMatch[0].length)
    } else {
      slide.frontmatter = ''
      slide.body = raw
    }

    // Extract layout
    const layoutMatch = slide.frontmatter.match(/layout:\s*(.+)/)
    slide.layout = layoutMatch ? layoutMatch[1].trim() : 'default'

    // Extract title
    const titleMatch = slide.body.match(/^#+\s+(.+)/m)
    slide.title = titleMatch ? titleMatch[1].trim() : `(slide ${slideNum})`

    slides.push(slide)
  }

  return slides
}

function lintSlide(slide) {
  const { body, layout, frontmatter } = slide
  const lines = body.split('\n').filter(l => l.trim())

  // ── Layout validation ──
  if (layout && !VALID_LAYOUTS.includes(layout)) {
    slide.issues.push({
      severity: 'error',
      rule: 'invalid-layout',
      msg: `Layout "${layout}" não está em VALID_LAYOUTS: ${VALID_LAYOUTS.join(', ')}`
    })
  }

  // ── Em-dash check ──
  if (body.includes('—')) {
    slide.issues.push({
      severity: 'error',
      rule: 'em-dash',
      msg: 'Contém em-dash (—) — substituir por "-", ":" ou "," (regra inviolável)'
    })
  }

  // ── Emoji check ──
  const emojiRegex = /\p{Emoji_Presentation}|\p{Extended_Pictographic}/gu
  const emojiMatches = body.match(emojiRegex)
  if (emojiMatches) {
    slide.issues.push({
      severity: 'error',
      rule: 'emoji',
      msg: `Contém emoji(s): ${[...new Set(emojiMatches)].join(' ')} — proibido em slides (quebra tipografia do tema)`
    })
  }

  // ── Code blocks ──
  const codeBlocks = body.match(/```[\s\S]*?```/g) || []
  const totalCodeLines = codeBlocks.reduce((sum, block) => {
    return sum + block.split('\n').length - 2 // subtract opening/closing ```
  }, 0)

  if (totalCodeLines > LIMITS.codeLines) {
    slide.issues.push({
      severity: 'warn',
      rule: 'code-overflow',
      msg: `${totalCodeLines} linhas de código (limite: ${LIMITS.codeLines})`
    })
  }

  if (layout === 'default' && codeBlocks.length > LIMITS.codeBlocksDefault) {
    slide.issues.push({
      severity: 'warn',
      rule: 'multi-code-block',
      msg: `${codeBlocks.length} blocos de código em layout default (limite: ${LIMITS.codeBlocksDefault})`
    })
  }

  // ── Tables ──
  const tableMatches = body.match(/\|.*\|.*\|/g) || []
  const tableHeaders = tableMatches.filter(l => l.includes('---'))
  if (tableHeaders.length > LIMITS.tablesPerSlide) {
    slide.issues.push({
      severity: 'warn',
      rule: 'multi-table',
      msg: `${tableHeaders.length} tabelas (limite: ${LIMITS.tablesPerSlide})`
    })
  }

  // ── Code + Table in same slide ──
  if (codeBlocks.length > 0 && tableHeaders.length > 0) {
    slide.issues.push({
      severity: 'error',
      rule: 'code-plus-table',
      msg: 'Código + tabela no mesmo slide (PROIBIDO — separar em 2 slides)'
    })
  }

  // ── Text overflow (excluding code, tables, frontmatter, directives) ──
  const bodyNoCode = body.replace(/```[\s\S]*?```/g, '')
  const bodyNoTable = bodyNoCode.replace(/\|.*\|/g, '')
  const bodyNoDirective = bodyNoTable
    .replace(/<v-click[\s\S]*?<\/v-click>/g, '')
    .replace(/<AdminOnly[\s\S]*?<\/AdminOnly>/g, '')
  const textLines = bodyNoDirective.split('\n')
    .filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('<!--') && !l.startsWith('::'))
  if (textLines.length > LIMITS.textLines) {
    slide.issues.push({
      severity: 'warn',
      rule: 'text-overflow',
      msg: `${textLines.length} linhas de texto (limite: ${LIMITS.textLines})`
    })
  }

  // ── Ghost slide check (comment between two ---) ──
  if (frontmatter.includes('<!--') && frontmatter.includes('-->') && !body.trim()) {
    slide.issues.push({
      severity: 'error',
      rule: 'ghost-slide',
      msg: 'Possível slide fantasma: comentário no frontmatter sem corpo'
    })
  }

  return slide.issues
}

function lintConsecutiveTeoria(slides) {
  const issues = []
  let teoriaCount = 0
  let teoriaStart = null

  for (const slide of slides) {
    // Simple heuristic: slide without brainstorm layout, without exercise keywords
    const isTeoria = slide.layout !== 'brainstorm' &&
      slide.layout !== 'end' &&
      slide.layout !== 'cover' &&
      !slide.body.match(/exerc[ií]cio|gabarito|tarefa de casa|salve como/i)

    if (isTeoria) {
      if (teoriaCount === 0) teoriaStart = slide.num
      teoriaCount++
    } else {
      teoriaCount = 0
    }

    if (teoriaCount > LIMITS.consecutiveTeoria) {
      issues.push({
        slideNum: slide.num,
        severity: 'warn',
        rule: 'consecutive-teoria',
        msg: `${teoriaCount} slides TEORIA consecutivos desde slide ${teoriaStart} (limite: ${LIMITS.consecutiveTeoria})`
      })
    }
  }

  return issues
}

function lintFile(filepath) {
  const content = readFileSync(filepath, 'utf8')
  const slides = parseSlides(content)
  const relPath = relative(ROOT, filepath)

  let errorCount = 0
  let warnCount = 0

  // Per-slide checks
  for (const slide of slides) {
    lintSlide(slide)
    for (const issue of slide.issues) {
      const icon = issue.severity === 'error' ? '❌' : '⚠️ '
      console.log(`  ${icon} Slide ${slide.num} "${slide.title}": [${issue.rule}] ${issue.msg}`)
      if (issue.severity === 'error') errorCount++
      else warnCount++
    }
  }

  // Cross-slide checks
  const crossIssues = lintConsecutiveTeoria(slides)
  for (const issue of crossIssues) {
    const icon = issue.severity === 'error' ? '❌' : '⚠️ '
    console.log(`  ${icon} Slide ${issue.slideNum}: [${issue.rule}] ${issue.msg}`)
    if (issue.severity === 'error') errorCount++
    else warnCount++
  }

  return { slides: slides.length, errors: errorCount, warnings: warnCount }
}

// ── Main ──
const args = process.argv.slice(2)
let files = []

if (args.length > 0) {
  files = args.map(a => path.resolve(ROOT, a)).filter(f => existsSync(f))
} else {
  // Find all slides.md in aulas/
  const { execSync } = await import('child_process')
  const found = execSync(`find "${join(ROOT, 'aulas')}" -name "slides.md" -not -path "*/node_modules/*"`, { encoding: 'utf8' })
  files = found.trim().split('\n').filter(Boolean)
}

if (files.length === 0) {
  console.log('Nenhum slides.md encontrado.')
  process.exit(0)
}

console.log('╔═════════════════════════════════════════════════╗')
console.log('║          Lint de Slides — Senac Técnico IA      ║')
console.log('╚═════════════════════════════════════════════════╝\n')

let totalErrors = 0
let totalWarnings = 0

for (const file of files) {
  const relPath = relative(ROOT, file)
  console.log(`\n📄 ${relPath}`)
  const result = lintFile(file)
  totalErrors += result.errors
  totalWarnings += result.warnings

  if (result.errors === 0 && result.warnings === 0) {
    console.log(`  ✅ ${result.slides} slides — sem problemas`)
  } else {
    console.log(`  → ${result.slides} slides: ${result.errors} erros, ${result.warnings} avisos`)
  }
}

console.log(`\n── Resumo ──`)
console.log(`  Arquivos: ${files.length}`)
console.log(`  Erros: ${totalErrors}`)
console.log(`  Avisos: ${totalWarnings}`)

if (totalErrors > 0) {
  console.log('\n  ❌ Lint falhou — corrigir erros acima.\n')
  process.exit(1)
} else if (totalWarnings > 0) {
  console.log('\n  ⚠️  Avisos encontrados — revisar quando possível.\n')
  process.exit(0)
} else {
  console.log('\n  ✅ Todos os slides passaram.\n')
  process.exit(0)
}
