#!/usr/bin/env node
/**
 * criar-aula.mjs — Cria uma nova pasta de aula no monorepo senac-tecnico-ia
 *
 * Uso standalone:  node scripts/criar-aula.mjs
 * Via menu:        node scripts/senac.mjs  →  opção 1
 *
 * Cross-platform: Linux + Windows (Node.js 18+)
 */

import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')
const TEMPLATE  = path.join(ROOT, 'neural-slides-template')
const AULAS_BASE = path.join(ROOT, 'aulas')

// ANSI — funciona no Linux e no Windows Terminal moderno
const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  cyan:   '\x1b[36m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  red:    '\x1b[31m',
  gray:   '\x1b[90m',
}

const MES_FOLDER = {
  jan: '01jan', fev: '02fev', mar: '03mar', abr: '04abr',
  mai: '05mai', jun: '06jun', jul: '07jul', ago: '08ago',
  set: '09set', out: '10out', nov: '11nov', dez: '12dez',
}

// Exclui da cópia do template
// Pastas que vivem no neural-slides-template (tema compartilhado) — não copiar por aula.
// Slidev serve automaticamente o public/ do tema, então assets compartilhados
// (senac-logo, icons, etc.) ficam apenas em neural-slides-template/public/.
const EXCLUIR_DIRS  = new Set(['.github', '.git', 'node_modules', 'dist', '.slidev',
  'components', 'composables', 'layouts', 'styles',
  'public',  // assets compartilhados → neural-slides-template/public/ (tema auto-serve)
  'types',   // tipos idênticos em todo aula → vivem no tema
])
const EXCLUIR_FILES = new Set(['AULAS-DADAS.md', 'package-lock.json', 'README.md',
  'PROJETO-AULAS-1-TRIMESTRE.md', 'slides-demo.md'])

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toSlug(dirName) {
  return dirName.toLowerCase().replace(/_/g, '-').replace(/\+/g, '-')
}

function ask(rl, question) {
  return new Promise(resolve => rl.question(question, resolve))
}

function copyDir(src, dest) {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (EXCLUIR_DIRS.has(entry.name))  continue
    if (EXCLUIR_FILES.has(entry.name)) continue
    const srcPath  = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true })
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function ok(msg)   { console.log(`${c.green}  ✓ ${msg}${c.reset}`) }
function warn(msg) { console.log(`${c.gray}  ~ ${msg}${c.reset}`) }
function step(n, msg) { console.log(`\n${c.yellow}[${n}] ${msg}${c.reset}`) }

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`\n${c.cyan}${c.bold}╔══════════════════════════════════════════╗`)
  console.log(`║   SENAC — Criar Nova Aula                ║`)
  console.log(`╚══════════════════════════════════════════╝${c.reset}\n`)

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  // ---------- Coleta interativa ----------

  // 1. Número da aula
  let numAula
  while (true) {
    const raw = (await ask(rl, `${c.yellow}Número da aula${c.reset} (ex: 21): `)).trim()
    if (/^\d{1,2}$/.test(raw)) {
      numAula = raw.padStart(2, '0')
      break
    }
    console.log(`${c.red}  ✗ Digite apenas o número (ex: 21 ou 7)${c.reset}`)
  }

  // 2. Data
  let dia, mesAbrev
  while (true) {
    const raw = (await ask(rl, `${c.yellow}Data da aula${c.reset} (ex: 07mai): `)).trim().toLowerCase()
    const m   = raw.match(/^(\d{2})([a-z]{3})$/)
    if (m && MES_FOLDER[m[2]]) {
      dia      = m[1]
      mesAbrev = m[2]
      break
    }
    const validos = Object.keys(MES_FOLDER).join(' ')
    console.log(`${c.red}  ✗ Formato inválido. Use DDmmm (ex: 07mai). Meses: ${validos}${c.reset}`)
  }

  // 3. UCs
  console.log(`
${c.cyan}  ┌─ UCs disponíveis ──────────────────────────────────┐
  │  01  Fundamentos de Computacao                     │
  │  02  Ingles Instrumental                           │
  │  03  Fundamentos Matematicos para Computacao e IA  │
  │  04  Fundamentos e Conceitos de IA                 │
  │  05  Desenvolvimento de Linguagem Python           │
  │  06  Arquitetura de Computadores e GPU             │
  │  07  Transformacao Digital e Estrategias de IA     │
  │  08  Desenvolvimento de Banco de Dados             │
  │  09  Estatistica Aplicada e Logica Matematica em IA│
  └────────────────────────────────────────────────────┘${c.reset}
${c.gray}  Separe por + ou espaco (ex: 05+01+02). Enter = UCXX (a definir)${c.reset}`)
  const ucsInput = (await ask(rl, `${c.yellow}UCs do dia${c.reset} (ex: 05+01+02, Enter para UCXX): `)).trim()

  // 4. Título (opcional)
  const titleInput = (await ask(rl, `${c.yellow}Título da aula${c.reset} (opcional, Enter para deixar em branco): `)).trim()

  let ucPart
  if (!ucsInput) {
    ucPart = 'UCXX'
  } else {
    const ucs = ucsInput
      .replace(/^UC/i, '')
      .split(/[\s+,]+/)
      .filter(Boolean)
      .map(u => u.padStart(2, '0'))
    ucPart = 'UC' + ucs.join('+')
  }

  // ---------- Derivar nomes ----------

  const dirName  = `A${numAula}_${ucPart}_${dia}${mesAbrev}`
  const slug     = toSlug(dirName)
  const mesPasta = MES_FOLDER[mesAbrev]
  const destDir  = path.join(AULAS_BASE, mesPasta, dirName)

  // Date ISO: derivar o ano atual do sistema
  const MES_NUM = {
    jan:'01', fev:'02', mar:'03', abr:'04', mai:'05', jun:'06',
    jul:'07', ago:'08', set:'09', out:'10', nov:'11', dez:'12'
  }
  const ano = new Date().getFullYear()
  const dateISO = `${ano}-${MES_NUM[mesAbrev]}-${dia}`

  // ---------- Confirmação ----------

  console.log(`\n${c.cyan}  ┌──────────────────────────────────────────┐`)
  console.log(`  │  Diretório:  ${c.bold}${dirName}${c.reset}${c.cyan}`)
  console.log(`  │  Slug:       ${slug}`)
  console.log(`  │  Destino:    aulas/${mesPasta}/${dirName}`)
  console.log(`  └──────────────────────────────────────────┘${c.reset}\n`)

  const confirm = (await ask(rl, `Confirmar criação? [S/n]: `)).trim().toLowerCase()
  rl.close()

  if (confirm === 'n' || confirm === 'nao' || confirm === 'não') {
    console.log(`\n${c.gray}  Cancelado.${c.reset}\n`)
    return
  }

  // ---------- Validações pré-criação ----------

  if (!fs.existsSync(TEMPLATE)) {
    console.error(`\n${c.red}✗ neural-slides-template não encontrado em:\n  ${TEMPLATE}${c.reset}`)
    process.exit(1)
  }
  if (fs.existsSync(destDir)) {
    console.error(`\n${c.red}✗ Pasta "${dirName}" já existe em aulas/${mesPasta}/${c.reset}`)
    process.exit(1)
  }

  // ---------- Execução ----------

  step('1/6', 'Copiando neural-slides-template...')
  fs.mkdirSync(destDir, { recursive: true })
  copyDir(TEMPLATE, destDir)
  // public/ vazia — assets compartilhados ficam em neural-slides-template/public/
  // e são servidos pelo vite.config.ts gerado abaixo; coloque aqui só imagens desta aula
  fs.mkdirSync(path.join(destDir, 'public'), { recursive: true })
  const count = countFiles(destDir)
  ok(`${count} arquivos copiados → aulas/${mesPasta}/${dirName}`)

  // ---------- package.json da aula ----------

  step('2/6', 'Configurando package.json da aula...')
  const aulaPkgPath = path.join(destDir, 'package.json')
  if (fs.existsSync(aulaPkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(aulaPkgPath, 'utf8'))
    pkg.name        = slug
    pkg.description = `Aula ${dirName} — Tecnico em Inteligencia Artificial SENAC`
    fs.writeFileSync(aulaPkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8')
    ok(`name: "${slug}"`)
  } else {
    warn('package.json não encontrado — pulando')
  }

  // ---------- meta.yaml ----------

  step('3/5', 'Configurando meta.yaml...')
  const metaPath = path.join(destDir, 'meta.yaml')
  const ucList   = ucPart === 'UCXX'
    ? '[]'
    : '[' + ucPart.replace(/^UC/, '').split('+').map(u => `"UC${u}"`).join(', ') + ']'
  const metaContent = `# Metadados da Aula — Neural Slides

aula: "${numAula}"
slug: "${slug}"
title: "${titleInput}"
author: "Leonardo Zanini"
courseTitle: "Técnico em Inteligência Artificial"

disciplines: ${ucList}

# formato ISO: YYYY-MM-DD
date: "${dateISO}"

# em-planejamento | ready | published
status: em-planejamento

deployUrl: ""

agentsUsed: []
`
  fs.writeFileSync(metaPath, metaContent, 'utf8')
  ok(`meta.yaml gerado (aula: "${numAula}", date: "${dateISO}")`)

  // ---------- slides.md ----------

  step('4/5', 'Gerando slides.md inicial...')
  const aulaLabel = `Aula ${numAula}`
  const slides = `---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — ${aulaLabel}"
author: Leonardo Zanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "${aulaLabel}"
bgPreset: palette
layout: cover
---

<!-- SLIDE 1 — Capa -->

# ${aulaLabel}
## Conteúdo a definir

> Use @produtor-aula para gerar os slides desta aula.
`
  fs.writeFileSync(path.join(destDir, 'slides.md'), slides, 'utf8')
  ok('slides.md criado com frontmatter base')

  // ---------- Scripts no package.json raiz ----------

  step('5/5', 'Registrando scripts no package.json raiz...')
  const rootPkgPath = path.join(ROOT, 'package.json')
  const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf8'))
  rootPkg.scripts[`dev:${slug}`]    = `npm run dev --workspace=${slug}`
  rootPkg.scripts[`build:${slug}`]  = `npm run build --workspace=${slug}`
  rootPkg.scripts[`export:${slug}`] = `npm run export --workspace=${slug}`
  fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + '\n', 'utf8')
  ok(`dev:${slug}  build:${slug}  export:${slug}`)

  // ---------- Relatório final ----------

  console.log(`\n${c.cyan}${c.bold}╔══════════════════════════════════════════╗`)
  console.log(`║   ✅ Aula criada!                        ║`)
  console.log(`╚══════════════════════════════════════════╝${c.reset}`)
  console.log(`
  ${c.bold}${dirName}${c.reset}
  aulas/${mesPasta}/${dirName}/
  ${c.gray}date: ${dateISO} · title: ${titleInput || '(em branco)'}${c.reset}

${c.yellow}Próximos passos:${c.reset}
  npm run dev:${slug}
  → Use @produtor-aula para gerar os slides
  → Mude status para "published" quando pronto
`)
}

function countFiles(dir) {
  let n = 0
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) n += countFiles(path.join(dir, e.name))
    else n++
  }
  return n
}

main().catch(err => {
  console.error(`\n${c.red}✗ Erro inesperado:${c.reset}`, err.message)
  process.exit(1)
})
