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
├── .claude/skills/             ← Skills reutilizáveis (14 skills)
│   ├── estilo-pedagogico/      ← linguagem ~14 anos, sem en-dash
│   ├── layouts-slidev/         ← frontmatter, componentes Vue, convenções visuais
│   ├── densidade-slides/       ← limites por layout, corte natural
│   ├── estrutura-aula/         ← ordem T→E→D→TC, tags, templates
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

- **Última aula ministrada**: A45 (07/08/2026) — UC07 Transformação Digital (cases brasileiros) + UC04 Fundamentos e Conceitos de IA (Av04-T2, encerra UC04 no T2). ⚠️ A44 e A45 ainda não foram registradas em `AULAS-DADAS.md` — rodar `atualizador-pos-aula` com o relato
- **Próxima aula**: A46 (13/08) — UC05 Python para IA (funções na prática) + UC02 Inglês Instrumental (Av05-T2 Error Report) · plano em `contextos/semanas/semana11.md`
- **Avaliações T2 aplicadas**: Av02-T2 (31/07 UC03), Av03-T2 (06/08 UC09), Av04-T2 (07/08 UC04)
- **Próximas avaliações**: Av05-T2 (13/08 UC02) · Av06-T2 (14/08 + 27/08, UC08 + UC06, dois atos) · Av07-T2 (20/08 UC01) · Av08-T2 e Av12-T2 (21/08, UC03 e UC05) · Av09-T2 (27/08 UC09) · Av10-T2 (20/08 + 28/08, UC07, dois atos) · Av11-T2 (04/09 UC06)
- **Histórico completo**: ver `AULAS-DADAS.md`
- **Calendário e composição de UCs**: ver `contextos/horarios/08-agosto.md`
- **Plano de avaliações T2 e conta de fechamento**: ver `contextos/ATIVIDADES_AVALIATIVAS.md`

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
