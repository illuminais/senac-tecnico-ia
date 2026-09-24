#!/usr/bin/env node
/**
 * checar-sql.mjs: roda de verdade todo bloco ```sql de um slides.md (ou plano-aula.md)
 * no servidor de dengue e confere se o que o slide promete é o que o banco devolve.
 *
 * Existe para que nenhum número de slide seja inventado: se a consulta do slide não roda,
 * ou devolve outra coisa, o slide não está pronto.
 *
 * Roda como o aluno 32 (conta de folga) no banco dengue_32, dentro de BEGIN ... ROLLBACK:
 * nada que o bloco cria, apaga ou altera fica no banco.
 *
 * Uso:  node scripts/checar-sql.mjs aulas/09set/A59_UC08_25set/slides.md
 *       node scripts/checar-sql.mjs <arquivo> --mostrar     (imprime a saída de todo bloco)
 *
 * Marcações opcionais, num comentário HTML logo DEPOIS do bloco (invisível no Slidev):
 *
 *   <!-- sql: pular -->                   não roda (ex.: CREATE DATABASE, que não aceita ROLLBACK)
 *   <!-- sql: erro -->                    o bloco TEM que falhar (slide de consulta errada)
 *   <!-- sql: erro "GROUP BY clause" -->  tem que falhar, e a mensagem tem que conter o trecho
 *   <!-- sql: espera
 *   Norte|12345
 *   Oeste|6789
 *   -->                                   a saída tem que ser exatamente esta (colunas com |)
 *
 * No SQL, o texto NN vira 32 (ex.: robo_ia_NN → robo_ia_32), para os slides poderem
 * mostrar o nome genérico que cada aluno troca pelo seu número.
 *
 * Pré-requisito: o servidor de pé (scripts/dataset-dengue/servidor, docker compose up -d).
 */

import { readFileSync, existsSync } from 'fs'
import { spawnSync } from 'child_process'

const c = { reset: '\x1b[0m', bold: '\x1b[1m', red: '\x1b[31m', yellow: '\x1b[33m',
            green: '\x1b[32m', gray: '\x1b[90m' }

const args = process.argv.slice(2)
const arquivo = args.find(a => !a.startsWith('--'))
const mostrar = args.includes('--mostrar')
if (!arquivo || !existsSync(arquivo)) {
  console.error('uso: node scripts/checar-sql.mjs <slides.md> [--mostrar]')
  process.exit(2)
}

const CONTAINER = 'dengue'
const ALUNO = '32'

function extrairBlocos(texto) {
  const linhas = texto.split('\n')
  const blocos = []
  for (let i = 0; i < linhas.length; i++) {
    if (!/^\s*```sql(\s|\{|$)/.test(linhas[i])) continue
    const inicio = i + 1
    const corpo = []
    i++
    while (i < linhas.length && !/^\s*```\s*$/.test(linhas[i])) corpo.push(linhas[i++])
    // marcação: primeiro comentário <!-- sql: ... --> depois do bloco, pulando linhas em branco
    let j = i + 1
    while (j < linhas.length && linhas[j].trim() === '') j++
    let marca = null
    if (j < linhas.length && /^\s*<!--\s*sql:/.test(linhas[j])) {
      const partes = [linhas[j]]
      while (!partes.at(-1).includes('-->') && j + 1 < linhas.length) partes.push(linhas[++j])
      marca = partes.join('\n').replace(/^\s*<!--\s*sql:\s*/, '').replace(/-->\s*$/, '').trim()
    }
    blocos.push({ linha: inicio, sql: corpo.join('\n'), marca })
  }
  return blocos
}

function interpretarMarca(marca) {
  if (!marca) return { tipo: 'roda' }
  if (marca === 'pular') return { tipo: 'pular' }
  const erro = marca.match(/^erro(?:\s+"(.*)")?$/s)
  if (erro) return { tipo: 'erro', trecho: erro[1] }
  if (marca.startsWith('espera')) {
    return { tipo: 'espera', saida: marca.replace(/^espera\s*/, '').trim() }
  }
  return { tipo: 'desconhecida', marca }
}

function rodar(sql) {
  const entrada = `BEGIN;\n${sql.replaceAll('NN', ALUNO)}\n;\nROLLBACK;\n`
  const r = spawnSync('docker', ['exec', '-i', '-e', `PGPASSWORD=dengue${ALUNO}`, CONTAINER,
    'psql', '-h', 'localhost', '-U', `aluno${ALUNO}`, '-d', `dengue_${ALUNO}`,
    '-X', '-q', '-tA', '-F', '|', '-v', 'ON_ERROR_STOP=1'], { input: entrada, encoding: 'utf8' })
  return { ok: r.status === 0, saida: (r.stdout || '').trim(), erro: (r.stderr || '').trim() }
}

// o servidor está de pé?
const ping = spawnSync('docker', ['exec', CONTAINER, 'pg_isready', '-h', 'localhost'], { encoding: 'utf8' })
if (ping.status !== 0) {
  console.error(`${c.red}O servidor de dengue não está de pé.${c.reset} Suba com:`)
  console.error('  cd scripts/dataset-dengue/servidor && docker compose up -d && ./verificar.sh')
  process.exit(2)
}

const blocos = extrairBlocos(readFileSync(arquivo, 'utf8'))
if (!blocos.length) {
  console.log(`${c.yellow}Nenhum bloco \`\`\`sql em ${arquivo}${c.reset}`)
  process.exit(0)
}

let falhas = 0
const recuo = s => s.split('\n').map(l => `      ${l}`).join('\n')
console.log(`\n${c.bold}checar-sql${c.reset}  ${arquivo}  (${blocos.length} blocos, como aluno${ALUNO} em dengue_${ALUNO}, com ROLLBACK)\n`)

for (const b of blocos) {
  const m = interpretarMarca(b.marca)
  const titulo = `linha ${String(b.linha).padStart(4)}  ${b.sql.split('\n').find(l => l.trim())?.trim().slice(0, 60) ?? ''}`
  if (m.tipo === 'pular') { console.log(`${c.gray}pulado ${titulo}${c.reset}`); continue }
  if (m.tipo === 'desconhecida') {
    console.log(`${c.red}FALHOU${c.reset} ${titulo}\n      marcação desconhecida: ${m.marca}`); falhas++; continue
  }

  const r = rodar(b.sql)
  let ok, motivo = ''
  if (m.tipo === 'erro') {
    ok = !r.ok && (!m.trecho || r.erro.includes(m.trecho))
    if (r.ok) motivo = 'era para dar erro, mas rodou'
    else if (!ok) motivo = `deu erro, mas sem o trecho "${m.trecho}"`
  } else if (m.tipo === 'espera') {
    ok = r.ok && r.saida === m.saida
    motivo = r.ok ? 'a saída não bate com a esperada' : 'deu erro'
  } else {
    ok = r.ok
    motivo = 'deu erro'
  }

  if (ok) {
    console.log(`${c.green}ok${c.reset}     ${titulo}${m.tipo !== 'roda' ? c.gray + `  (${m.tipo})` + c.reset : ''}`)
    if (mostrar) console.log(c.gray + recuo(r.ok ? r.saida || '(sem linhas)' : r.erro) + c.reset)
  } else {
    falhas++
    console.log(`${c.red}FALHOU${c.reset} ${titulo}\n      ${motivo}`)
    if (m.tipo === 'espera') console.log(`${c.yellow}      esperado:${c.reset}\n${recuo(m.saida)}`)
    console.log(`${c.yellow}      o banco devolveu:${c.reset}\n${recuo(r.ok ? r.saida || '(sem linhas)' : r.erro)}`)
  }
}

console.log(falhas
  ? `\n${c.red}${falhas} bloco(s) com problema.${c.reset} Corrija o slide ou a marcação antes de publicar.\n`
  : `\n${c.green}Todos os blocos conferem com o banco.${c.reset}\n`)
process.exit(falhas ? 1 : 0)
