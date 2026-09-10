#!/usr/bin/env node
/**
 * checar-repeticao.mjs — Avisa quando uma aula nova repete conteúdo já dado na mesma UC.
 *
 * Existe por causa de um erro real: em 09/09/2026 a A54 foi gerada repetindo quase slide a
 * slide o bloco UC01 da A48, porque o contexto-*.md estava três aulas atrasado. Confiar no
 * contexto não basta; é preciso olhar os slides.md que existem de fato.
 *
 * Uso:  node scripts/checar-repeticao.mjs aulas/09set/A54_UC01_10set/slides.md
 *       node scripts/checar-repeticao.mjs --uc=UC01        (varre a UC inteira)
 */

import { readFileSync, readdirSync, existsSync } from 'fs'
import { join, basename, dirname } from 'path'

const ROOT = join(import.meta.dirname, '..')
const AULAS = join(ROOT, 'aulas')

const c = { reset: '\x1b[0m', bold: '\x1b[1m', red: '\x1b[31m', yellow: '\x1b[33m',
            green: '\x1b[32m', gray: '\x1b[90m', cyan: '\x1b[36m' }

// Palavras sem valor discriminante ao comparar títulos
const VAZIAS = new Set(['a','o','as','os','de','da','do','das','dos','e','em','no','na','nos','nas',
  'um','uma','uns','umas','que','com','por','para','ao','aos','à','às','se','sem','sobre','the',
  'você','voce','vocês','voces','é','são','sao','foi','vai','ser','tem','mais','já','ja','isso',
  'não','nao','como','qual','quais','onde','quando','aula','bloco','slide','até','ate','antes',
  'depois','agora','hoje','amanhã','amanha','fixação','fixacao','exercício','exercicio'])

const normaliza = s => s.toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()

const tokens = s => new Set(normaliza(s).split(' ').filter(w => w.length > 2 && !VAZIAS.has(w)))

function jaccard(a, b) {
  const A = tokens(a), B = tokens(b)
  if (!A.size || !B.size) return 0
  const inter = [...A].filter(x => B.has(x)).length
  return inter / new Set([...A, ...B]).size
}

/** Todas as pastas de aula, com número, UCs e caminho do slides.md */
function todasAulas() {
  const out = []
  for (const mes of readdirSync(AULAS)) {
    const dirMes = join(AULAS, mes)
    for (const pasta of readdirSync(dirMes)) {
      const m = pasta.match(/^A(\d+)_UC([\d+]+)_/)
      if (!m) continue
      const slides = join(dirMes, pasta, 'slides.md')
      if (!existsSync(slides)) continue
      out.push({ num: Number(m[1]), ucs: m[2].split('+').map(u => 'UC' + u.padStart(2, '0')),
                 pasta, slides })
    }
  }
  return out.sort((a, b) => a.num - b.num)
}

// Títulos estruturais repetem de propósito (convenção do curso), não são repetição de conteúdo
const ESTRUTURAIS = [
  /^tarefa de casa/i, /^no laborat/i, /^checklist/i, /^onde estamos/i,
  /^crit[ée]rios de avalia/i, /^at[ée] /i, /^fechando/i, /^antes de /i,
  /^(aula|bloco)\s/i, /^amanh[ãa]/i, /^quinta:/i, /^(regras|duas regras)/i,
  /^anote(m)? no caderno/i, /^ache a sua trilha/i,
  /^[A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9\s]+$/,          // divisores em caixa alta (LABORATÓRIO, PRIMEIRO, ...)
  /^como funciona/i, /^trilha [A-C]:/i, /^desafio/i,
]

const titulos = p => readFileSync(p, 'utf8').split('\n')
  .filter(l => l.startsWith('# ')).map(l => l.slice(2).trim())
  .filter(t => !ESTRUTURAIS.some(re => re.test(t)))

/** Conceitos já consolidados no contexto da UC */
function consolidados(uc) {
  const SLUG = { UC01: 'fundamentos-de-computacao', UC02: 'ingles-instrumental',
    UC03: 'fundamentos-matematicos', UC04: 'fundamentos-e-conceitos-de-ia',
    UC05: 'python-para-ia', UC06: 'arquitetura-computadores-gpu',
    UC07: 'transformacao-digital', UC08: 'banco-de-dados', UC09: 'estatistica-aplicada' }
  const p = join(ROOT, `contextos/contexto-${SLUG[uc]}.md`)
  if (!existsSync(p)) return []
  const txt = readFileSync(p, 'utf8')
  const i = txt.indexOf('## Conceitos Consolidados')
  if (i < 0) return []
  return txt.slice(i).split('\n---')[0].split('\n')
    .filter(l => l.startsWith('| ') && !l.includes('---') && !/\|\s*Conceito\s*\|/.test(l))
    .map(l => l.split('|')[1].replace(/\*\*/g, '').trim()).filter(Boolean)
}

function checar(alvo) {
  const aulas = todasAulas()
  const eu = aulas.find(a => a.slides.endsWith(alvo) || alvo.endsWith(a.pasta + '/slides.md'))
  if (!eu) { console.error(`Não achei a aula de ${alvo}`); process.exit(1) }

  const meus = titulos(eu.slides)
  console.log(`\n${c.bold}${eu.pasta}${c.reset}  ${meus.length} títulos · UCs ${eu.ucs.join(', ')}`)

  let achados = 0
  for (const uc of eu.ucs) {
    const anteriores = aulas.filter(a => a.num < eu.num && a.ucs.includes(uc))
    console.log(`\n${c.cyan}${uc}${c.reset} ${c.gray}comparando com ${anteriores.length} aula(s) anterior(es)${c.reset}`)

    for (const ant of anteriores) {
      for (const t of titulos(ant.slides)) {
        for (const meu of meus) {
          const s = jaccard(meu, t)
          if (s >= 0.5) {
            achados++
            const cor = s >= 0.8 ? c.red : c.yellow
            console.log(`  ${cor}${s >= 0.8 ? '❌' : '⚠️ '} ${(s * 100).toFixed(0)}%${c.reset} "${meu}"`)
            console.log(`     ${c.gray}A${ant.num}: "${t}"${c.reset}`)
          }
        }
      }
    }

    const corpo = normaliza(readFileSync(eu.slides, 'utf8'))
    for (const conc of consolidados(uc)) {
      // Só as palavras longas discriminam. "quem/quando/para" aparecem em qualquer aula.
      const t = [...tokens(conc)].filter(w => w.length > 6)
      if (t.length >= 2 && t.every(w => corpo.includes(w))) {
        achados++
        console.log(`  ${c.yellow}⚠️  consolidado${c.reset} "${conc}" ${c.gray}(já dado, aparece no corpo)${c.reset}`)
      }
    }
  }

  console.log(achados
    ? `\n${c.yellow}${achados} possível(is) repetição(ões). Confira antes de publicar.${c.reset}\n`
    : `\n${c.green}✅ Nenhuma repetição detectada.${c.reset}\n`)
  return achados
}

const arg = process.argv[2]
if (!arg) { console.error('Uso: node scripts/checar-repeticao.mjs <caminho/slides.md>'); process.exit(1) }
if (arg.startsWith('--uc=')) {
  const uc = arg.slice(5)
  for (const a of todasAulas().filter(a => a.ucs.includes(uc))) checar(a.slides)
} else {
  checar(arg)
}
