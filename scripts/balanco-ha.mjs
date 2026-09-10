#!/usr/bin/env node
/**
 * balanco-ha.mjs — Balanço de horas-aula e faltas a partir do OrionWeb.
 *
 * O OrionWeb é a fonte de verdade de HA dado. Este script NUNCA inventa número:
 * lê a transcrição dos extratos em orionweb/*.csv e deriva todo o resto.
 *
 * Entradas (transcrição manual dos extratos, atualizar após cada aula):
 *   orionweb/disciplinas.csv         uc,codigo,nome,ch_relogio,meta_ha,periodo_inicio,periodo_fim
 *   orionweb/aulas-registradas.csv   uc,data,ha
 *   orionweb/faltas-por-uc.csv       aluno,uc,faltas
 *   orionweb/ajustes-denominador.csv aluno,uc,ha_nao_computadas,motivo
 *   contextos/horarios/*.md          calendário de aulas futuras (linhas | A## | DD/MM | ... | 6 |)
 *
 * Saídas:
 *   contextos/relatorio-horas-t3.md  balanço por UC + capacidade + déficit
 *   orionweb/faltas-AAAA-MM-DD.csv   faltas por aluno x disciplina, com % e frequência
 *
 * Uso: node scripts/balanco-ha.mjs [--cutoff=2026-09-04] [--data=2026-09-09]
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'

const ROOT = join(import.meta.dirname, '..')
const arg = (k, d) => (process.argv.find(a => a.startsWith(`--${k}=`)) || `=${d}`).split('=').pop()

// Última aula já registrada no OrionWeb. Aulas depois disso são capacidade futura.
const CUTOFF = arg('cutoff', '2026-09-04')
const HOJE   = arg('data', new Date().toISOString().slice(0, 10))

// ── CSV mínimo, com suporte a campo entre aspas ──
function parseCSV(path) {
  const linhas = readFileSync(join(ROOT, path), 'utf8').trim().split('\n')
  const cols = linhas.shift().split(',')
  return linhas.map(l => {
    const vals = l.match(/("([^"]*)"|[^,]*)(,|$)/g).map(v => v.replace(/,$/, '').replace(/^"|"$/g, ''))
    return Object.fromEntries(cols.map((c, i) => [c, vals[i]]))
  })
}

const disciplinas = parseCSV('orionweb/disciplinas.csv')
const registradas = parseCSV('orionweb/aulas-registradas.csv')
const faltas      = parseCSV('orionweb/faltas-por-uc.csv')
const ajustes     = parseCSV('orionweb/ajustes-denominador.csv')

const UCS = disciplinas.map(d => d.uc)

// ── HA dado por UC ──
const dado = Object.fromEntries(UCS.map(u => [u, 0]))
for (const r of registradas) {
  if (r.data > CUTOFF) throw new Error(`aula ${r.uc} ${r.data} é posterior ao cutoff ${CUTOFF}`)
  dado[r.uc] += Number(r.ha)
}

// ── Capacidade restante: aulas futuras em contextos/horarios/*.md ──
const HORARIOS = join(ROOT, 'contextos/horarios')
const aulas = new Map()
for (const f of readdirSync(HORARIOS).filter(f => f.endsWith('.md'))) {
  const mes = Number(f.slice(0, 2))
  for (const l of readFileSync(join(HORARIOS, f), 'utf8').split('\n')) {
    const m = l.match(/^\|\s*A(\d+)\s*\|\s*(\d{2})\/(\d{2})\s*\|/)
    if (!m) continue
    const ha = Number((l.match(/\|\s*(\d+)\s*\|\s*$/) || [, 6])[1])
    aulas.set(Number(m[1]), { data: `2026-${m[3]}-${m[2]}`, ha, mes })
  }
}
const futuras = [...aulas.entries()].filter(([, a]) => a.data > CUTOFF).sort((a, b) => a[0] - b[0])
const capacidade = futuras.reduce((s, [, a]) => s + a.ha, 0)

// ── Tabela por UC ──
const linhas = disciplinas.map(d => {
  const meta = Number(d.meta_ha)
  const s = dado[d.uc]
  return { ...d, meta, dado: s, falta: meta - s, dias: (meta - s) / 6 }
})
const T = k => linhas.reduce((s, l) => s + l[k], 0)
const deficit = capacidade - T('falta')

// ── Denominadores de frequência ──
const denom = {}
for (const l of linhas) denom[l.uc] = l.dado
const ajusteDe = a => {
  const d = { ...denom }
  for (const x of ajustes.filter(x => x.aluno === a)) d[x.uc] -= Number(x.ha_nao_computadas)
  return d
}

// ── CSV de faltas ──
const alunos = [...new Set(faltas.map(f => f.aluno))]
const fmap = Object.fromEntries(alunos.map(a => [a, {}]))
for (const f of faltas) fmap[f.aluno][f.uc] = Number(f.faltas)

// decimal com ponto: o arquivo é delimitado por vírgula, separador decimal vírgula quebraria as colunas
const pct = (n, d) => d === 0 ? '' : (100 * n / d).toFixed(1)
const head = ['Aluno', ...UCS.flatMap(u => [`${u}_faltas`, `${u}_pct`]),
              'TOTAL_faltas', 'TOTAL_HA', 'TOTAL_pct', 'FREQ_pct']
const linhasCsv = alunos.map(a => {
  const d = ajusteDe(a)
  const tf = UCS.reduce((s, u) => s + fmap[a][u], 0)
  const th = UCS.reduce((s, u) => s + d[u], 0)
  return [`"${a}"`, ...UCS.flatMap(u => [fmap[a][u], pct(fmap[a][u], d[u])]),
          tf, th, pct(tf, th), pct(th - tf, th)].join(',')
})
const csvPath = `orionweb/faltas-${HOJE}.csv`
writeFileSync(join(ROOT, csvPath), [head.join(','), ...linhasCsv].join('\n') + '\n')

// ── Relatório markdown ──
const tabela = linhas.map(l =>
  `| ${l.uc} | ${l.codigo} | ${l.nome} | ${l.ch_relogio} | ${l.meta} | ${l.dado} | **${l.falta}** | ${l.dias.toFixed(1).replace('.', ',')} |`
).join('\n')

const porMes = {}
for (const [, a] of futuras) porMes[a.mes] = (porMes[a.mes] || 0) + a.ha
const NOME_MES = { 9: 'setembro', 10: 'outubro', 11: 'novembro', 12: 'dezembro' }

const md = `---
schema: relatorio-horas
trimestre: T3
fonte: OrionWeb (extratos por disciplina)
ha-aula-duracao: 50min
cutoff: ${CUTOFF}
gerado-em: ${HOJE}
gerado-por: scripts/balanco-ha.mjs
---

# Relatório de Horas T3 — Fonte: OrionWeb

> Turma: 9-202600029 — Técnico em Inteligência Artificial
> Instrutor: Leonardo Zanini Niclote
>
> **Arquivo gerado. Não editar à mão.** Para corrigir um número, corrija a transcrição em
> \`orionweb/aulas-registradas.csv\` e rode \`node scripts/balanco-ha.mjs\`.
>
> Conversão: CH em hora-relógio x 60/50 = HA. Ex.: 34h x 1,2 = 40,8 → 41 HA.

## Balanço por UC

| UC | Cód. | Disciplina | CH | Meta HA | Dado | Falta | Dias de 6 HA |
|---|---|---|---|---|---|---|---|
${tabela}
| | | **Total** | | **${T('meta')}** | **${T('dado')}** | **${T('falta')}** | **${(T('falta') / 6).toFixed(1).replace('.', ',')}** |

## Capacidade restante

| Mês | Aulas | HA |
|---|---|---|
${Object.entries(porMes).map(([m, ha]) => `| ${NOME_MES[m]} | ${futuras.filter(([, a]) => a.mes == m).length} | ${ha} |`).join('\n')}
| **Total** | **${futuras.length}** | **${capacidade}** |

Primeira aula futura: **A${futuras[0][0]}** (${futuras[0][1].data}) ·
última: **A${futuras.at(-1)[0]}** (${futuras.at(-1)[1].data}).

## Fechamento

- Falta dar: **${T('falta')} HA**
- Calendário disponível: **${capacidade} HA**
- Saldo: **${deficit >= 0 ? '+' : ''}${deficit} HA**${deficit < 0 ? ` — déficit de ${-deficit} HA (${(-deficit / 6).toFixed(1).replace('.', ',')} dias). Herdado do T1, que fechou -42 HA.` : ''}

## Refs
→ [relatorio-horas-t1](relatorio-horas-t1.md) · [panorama](panorama-primeiro-ano-ucs.md)
→ [roteiro-t3](roteiro-t3.md) · [horarios](horarios/)
`
writeFileSync(join(ROOT, 'contextos/relatorio-horas-t3.md'), md)

// ── Sincroniza os contextos de UC com o OrionWeb ──
// Os contexto-*.md eram mantidos à mão e apodreceram (UC01 dizia 10 HA quando o real era 22).
// Agora o frontmatter e a tabela Estado Geral são derivados daqui.
const CORTE_T1 = '2026-05-14'   // fim do T1 (ver relatorio-horas-t1.md)
const CORTE_T2 = '2026-09-04'   // fim do T2
const ALOCADO = { // plano oficial Senac, conteudo-base/distribuicao-trimestral-ano1.md
  UC01: [13, 14, 14], UC02: [13, 14, 13], UC03: [13, 14, 13], UC04: [13, 14, 14],
  UC05: [26, 27, 27], UC06: [13, 14, 13], UC07: [26, 27, 27], UC08: [26, 27, 27], UC09: [13, 14, 13],
}
const SLUG = {
  UC01: 'fundamentos-de-computacao', UC02: 'ingles-instrumental', UC03: 'fundamentos-matematicos',
  UC04: 'fundamentos-e-conceitos-de-ia', UC05: 'python-para-ia', UC06: 'arquitetura-computadores-gpu',
  UC07: 'transformacao-digital', UC08: 'banco-de-dados', UC09: 'estatistica-aplicada',
}
const epicos = Object.fromEntries(parseCSV('orionweb/epicos-t3.csv').map(e => [e.uc, e]))

let sincronizados = 0
for (const l of linhas) {
  const path = join(ROOT, `contextos/contexto-${SLUG[l.uc]}.md`)
  let txt
  try { txt = readFileSync(path, 'utf8') } catch { continue }

  const dadoT = [0, 0, 0]
  for (const r of registradas.filter(r => r.uc === l.uc)) {
    dadoT[r.data <= CORTE_T1 ? 0 : r.data <= CORTE_T2 ? 1 : 2] += Number(r.ha)
  }
  const ep = epicos[l.uc]
  const aloc = [...ALOCADO[l.uc]]
  aloc[2] = Number(ep.ha_epico)   // T3 real é o tamanho do épico, não o plano oficial

  txt = txt
    .replace(/^ha-total: .*$/m, `ha-total: ${l.meta}`)
    .replace(/^ha-dado: .*$/m, `ha-dado: ${l.dado}`)
    .replace(/^ha-restante: .*$/m, `ha-restante: ${l.falta}`)
    .replace(/^trimestre-atual: .*$/m, 'trimestre-atual: T3')

  const tabela = [
    '| Trim. | HA Alocado | HA Dado | HA Restante |',
    '|---|---|---|---|',
    ...[0, 1, 2].map(i => `| T${i + 1} | ${aloc[i]} | ${dadoT[i]} | ${aloc[i] - dadoT[i]} |`),
    `| **Total** | **${aloc.reduce((a, b) => a + b, 0)}** | **${l.dado}** | **${l.falta}** |`,
  ].join('\n')

  const bloco = `## Estado Geral

<!-- GERADO por scripts/balanco-ha.mjs a partir do OrionWeb. Não editar à mão. -->

> Épico ${ep.ordem} do T3: **${ep.ha_epico} HA**, encerra em **${ep.encerra_em_aula}** (${ep.encerra_em_data})${Number(ep.corte) ? ` · corte de ${ep.corte} HA para caber no calendário` : ''}.

${tabela}
`
  const re = /## Estado Geral\n[\s\S]*?(?=\n---\n)/
  if (!re.test(txt)) { console.warn(`  ! ${l.uc}: seção "Estado Geral" não encontrada, só frontmatter atualizado`) }
  txt = txt.replace(re, bloco)
  writeFileSync(path, txt)
  sincronizados++
}
console.log(`→ ${sincronizados} contexto-*.md sincronizados com o OrionWeb`)

console.log(`dado ${T('dado')} · meta ${T('meta')} · falta ${T('falta')} · capacidade ${capacidade} · saldo ${deficit}`)
console.log(`→ contextos/relatorio-horas-t3.md`)
console.log(`→ ${csvPath} (${alunos.length} alunos)`)
