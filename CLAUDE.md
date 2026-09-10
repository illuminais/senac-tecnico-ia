# Claude Code — Instruções do Workspace

Este workspace é um monorepo de apresentações Slidev para o **Curso Técnico em Inteligência Artificial do SENAC**.

## Estrutura do Projeto

```
senac-tecnico-ia/
├── .github/agents/             ← FONTE DA VERDADE — agentes e contextos (Copilot)
├── .claude/agents/             ← Agentes para Claude Code (12 agentes)
│   ├── produtor-aula.md        ← orquestrador de aula completa
│   ├── autor-slides.md         ← gera slides via Handoff Card
│   ├── autor-exercicios.md
│   ├── editor-slides.md        ← edição + overflow + auditoria (4 modos)
│   ├── gerador-uc.md           ← consultor de disciplina (substitui os 9 UC agents)
│   ├── atualizador-pos-aula.md
│   ├── criar-nova-aula.md
│   ├── revisor-commit.md
│   ├── planejador-avaliacoes.md
│   ├── planejador-curricular.md
│   ├── planejador-mensal.md    ← planeja um mês inteiro → gera semanaXX.md
│   └── platform-agent.md (name: Leovio)
├── .claude/skills/             ← Skills reutilizáveis (15 skills)
│   ├── estilo-pedagogico/      ← linguagem ~14 anos, sem en-dash
│   ├── layouts-slidev/         ← frontmatter, componentes Vue, convenções visuais
│   ├── densidade-slides/       ← limites por layout, corte natural
│   ├── estrutura-aula/         ← ordem T→E→D→TC, tags, templates
│   ├── verbos-indicadores/     ← profundidade por verbo do indicador (escala 5 níveis)
│   ├── revisao-conteudo/       ← checklists de revisão e commit
│   └── uc01/ … uc09/           ← diretrizes, consolidado e indicadores por disciplina
├── contextos/   ← memória viva por disciplina (compartilhada por ambos)
│   ├── MAPA.md                     ← ÍNDICE: o que é cada arquivo e quando ler
│   ├── ATIVIDADES_AVALIATIVAS.md
│   ├── contexto-banco-de-dados.md
│   ├── contexto-python-para-ia.md
│   ├── … (9 arquivos contexto-*.md)
│   ├── horarios/                   ← planejamento mensal jun–dez (A31–A82)
│   └── semanas/                    ← rotação T2 + planos operacionais por semana
├── .github/agents/referencia-tecnica.md  ← referência técnica (ler antes de gerar slides)
├── AULAS-DADAS.md              ← histórico cronológico de todas as aulas (A01–atual)
├── AULAS-DESENVOLVIMENTO-PROG.md ← tracking de produção de slides por sprint
├── slidev-theme-neural/        ← tema Slidev personalizado (NÃO editar para criar conteúdo)
├── neural-slides-template/     ← template Slidev puro — base para novas aulas (SEM .github/)
├── aulas/                      ← pastas de aula organizadas por mês (02fev/, 03mar/, 04abr/)
├── avaliacoes/                 ← avaliações T1 (av01–av06)
└── package.json                ← raiz do monorepo
```

## Como usar com Claude Code

```bash
# Iniciar o Claude Code na raiz do projeto
cd /home/leo-zanini/Documents/senac-tecnico-ia
claude

# No REPL do Claude Code, invocar agentes por nome:
# "use produtor-aula" → produz uma aula completa no modo iterativo
# "use atualizador-pos-aula" → atualiza contextos após uma aula dada
# "use criar-nova-aula" → cria nova pasta de aula (ex: A20 05mai)
# "use autor-slides" → gera slides para uma UC
# "use editor-slides" → edita slides existentes cirurgicamente
```

## Regras Fundamentais

1. **Agentes vivem em `.claude/agents/`** (Claude Code) ou `.github/agents/` (Copilot) — nunca criar `.github/` dentro de subpastas de aula
2. **Navegação de contextos** — em dúvida sobre o que ler, comece por `contextos/MAPA.md`
3. **Contextos são a memória viva** — antes de gerar qualquer slide, leia `contextos/contexto-{disciplina}.md`
4. **Horário trimestral** — ciclo Sem1/Sem2/Sem3 em `contextos/semanas/horario-rotacao-t2.md` · planejamento mensal em `contextos/horarios/`
5. **Plano de avaliações** — para saber avaliações pendentes e aprovadas, leia `contextos/ATIVIDADES_AVALIATIVAS.md`
6. **Nunca** criar arquivos de apresentação dentro de `slidev-theme-neural/`
7. **Nunca** copiar `.github/agents/` para pastas de aula — os agentes são globais
8. **referencia-tecnica.md** — leia SEMPRE em `.github/agents/referencia-tecnica.md` antes de gerar qualquer slide

## Fluxo Pós-Aula (após cada aula dada)

Use o agente `atualizador-pos-aula` com um relato em linguagem natural:
> "Na A07 dei Python: operadores de comparação ==, !=, <, > e lógicos and/or/not, if/elif/else com comparação. ~3 HA. Turma teve dificuldade com precedência de operadores."

O agente vai atualizar automaticamente:
- `contextos/contexto-python-para-ia.md`
- `AULAS-DADAS.md`

## Fluxo de Nova Aula

Use o agente `criar-nova-aula` para criar a próxima pasta de aula. O agente copia a estrutura Slidev do `neural-slides-template/`, configura `package.json`. Nunca cria `.github/` na nova pasta.

## Contexto Atual do Curso

- **Trimestre**: T3 (10/09 a 18/12/2026), rodando em **modelo de épicos** desde 10/09. A rotação Sem1/Sem2/Sem3 foi abandonada. O dia inteiro (6 HA) é de uma UC só; quando o conteúdo acaba, aplica-se a avaliação, faz-se a recuperação, fecha-se a menção e o próximo épico começa. Mapa em `contextos/roteiro-t3.md`
- **Última aula ministrada**: A53 (04/09/2026) — último dia do T2, recuperação geral. ⚠️ A44 a A51 ainda não foram registradas em `AULAS-DADAS.md` — rodar `atualizador-pos-aula`
- **Próxima aula**: A54 (10/09) — **Épico 1: UC01 Fundamentos de Computação**, dia 1 de 4 · slides prontos em `aulas/09set/A54_UC01_10set/`, plano em `contextos/semanas/semana15.md`
- **Épico 1 em curso (A54 a A57, 19 HA)**: os quatro dias já estão gerados. Arco Indicador 4 → 5 → 6 sobre **um arquivo só** (`painel_dengue_pr.xlsx`) que ganha uma aba por dia. Verbos: organizar, comparar, decidir, refazer. Glossário fixo de 5 palavras (registro, atributo, critério, padrão, relação). Dado real de dengue do InfoDengue, entregue sujo de propósito, em `aulas/09set/A54_UC01_10set/public/dados/` (ler o `README.md`, tem o gabarito). Avaliação **Av01-T3** em A56, recuperação por trilha em A57
- ⚠️ **Indicador 4 de UC01 está saturado** (dado em A42, avaliado em A48 e retomado por outro professor em set/2026). No épico entra só como diagnóstico de 1 HA. O peso vai para o Indicador 6, nível 4 e nunca tocado
- **Ordem dos épicos**: UC01 → UC04 → UC03 → UC09 → UC05 → UC08 → UC06 → UC02 → UC07 (ver `contextos/roteiro-t3.md`)
- **Saldo de horas**: 294 HA dadas de 481. Faltam 187 HA e o calendário tem 174 → **déficit de 13 HA**, absorvido com corte em UC05 (-3), UC08 (-5) e UC07 (-5)
- **Fonte de verdade de horas**: OrionWeb, transcrito em `orionweb/*.csv`. Rodar `node scripts/balanco-ha.mjs` após cada aula — ele regenera `contextos/relatorio-horas-t3.md`, o CSV de faltas e a seção Estado Geral dos 9 contextos. **Nunca editar HA à mão.**
- **Antes de gerar slides de qualquer UC**: rodar `node scripts/checar-repeticao.mjs <slides.md>`. Em 09/09 a primeira versão da A54 repetiu quase slide a slide o bloco UC01 da A48 porque o contexto estava três aulas atrasado. Contexto desatualizado gera aula repetida; o script compara contra os `slides.md` que existem de fato
- **Frequência**: 6 alunos abaixo de 75% (ver `orionweb/faltas-2026-09-09.csv`)
- **Histórico completo**: ver `AULAS-DADAS.md`
- **Plano de avaliações**: ver `contextos/ATIVIDADES_AVALIATIVAS.md`

> ⚠️ **Manter esta seção atualizada** após cada uso de `atualizador-pos-aula`.

## Comandos Principais

```bash
# Rodar uma aula em modo desenvolvimento
npm run dev:a05

# Build de uma aula
npm run build:a06

# Trabalhar no tema
npm run theme:dev
```

## Tecnologias

- **Slidev** `^0.49` — framework de apresentações em Markdown
- **slidev-theme-neural** — tema local com fundo de rede neural animado, dark mode, IBM Plex Sans
- **Vue 3**, **TailwindCSS**, **Shiki** (syntax highlighting)
- **TypeScript**
