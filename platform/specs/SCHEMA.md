---
type: meta
title: Schema do Grafo de Estado (contexto vivo)
updated: 2026-07-21
---

# Schema do Grafo de Estado — vault Obsidian da plataforma

`platform/specs/` é um **vault Obsidian**. Abra a pasta no Obsidian → *Graph View*.

## Regra-mãe (o que o grafo é e o que NÃO é)

O grafo guarda **só o que o código não consegue contar**: *por quê* (decisão), *pra onde* (rumo), *o que está em obra agora* (status). **Não é espelho do código.** Se a informação dá pra ler no código ou já está na skill `platform-contexto`, ela **não** entra como prosa aqui.

### Fronteira de verdade (dono único por pergunta — isto mata o drift)

| Pergunta | Dono único |
|---|---|
| O que o código **faz** (comportamento) | o código |
| O que **existe** hoje (rotas, endpoints, tabelas, arquitetura) | skill `platform-contexto` |
| **Por quê** está assim | grafo → `decisao` |
| **Pra onde** evolui | grafo → `rumo` |
| O que está **em obra agora** + status | grafo → `feature` (frontmatter `status`) + `tasks.md` |
| Requisitos/critérios de uma feature | `spec.md` da sprint (efêmero) |
| Como implementar a feature | `plan.md` da sprint (efêmero) |

Quando uma sprint fecha, o "o que passou a existir" vai pra **`platform-contexto`** (skill), não pra um nó de código. O nó `feature` só vira `shipped`.

## Orçamento de contexto (isto impede a explosão da janela)

- **Leovio, por turno, lê no máximo:** `_MOC.md` (índice pequeno) + o `spec/plan/tasks` da sprint ativa + os **≤4 nós que a sprint linka**. **Nunca** varre `nodes/` inteiro.
- **Especialistas (subagentes) leem ZERO grafo.** Recebem só um *brief* de task do Leovio + a própria skill. Isso mantém o contexto de cada especialista plano, independente do tamanho do vault.
- **Uma invocação do Leovio = uma fase** (ou um lote de tasks do Implement), depois retorna. Nenhum agente segura a sprint inteira → contexto limitado e checkpoints continuam interativos no fluxo principal.
- **Nós são atômicos: corpo ≤ ~12 linhas.** Um conceito por arquivo. Se passou disso, quebre ou é prosa que devia estar no código/spec.

## Tipos de nó

Duráveis (vivem entre sprints, quase não driftam):

| type | é | corpo |
|---|---|---|
| `decisao` | ADR — decisão de arquitetura (fato histórico, append-only) | `## Contexto` · `## Decisão` · `## Consequência` |
| `rumo` | direção/horizonte pra onde features evoluem (intenção) | `## Visão` · `## Grafo` |
| `feature` | capacidade voltada ao usuário; frontmatter carrega o `status` | 1 linha + pointer p/ spec + `## Grafo` |

Opcional e fino:

| type | é | regra |
|---|---|---|
| `modulo` | âncora pra um artefato de código referenciado por **2+** features/decisões | **stub ≤6 linhas**: path + papel em 1 linha + `## Grafo`. **Nunca** descreve comportamento (o código faz isso). Só crie se ele "ganha o lugar" sendo linkado por mais de um lugar. |
| `sprint` | hub de uma sprint SDD; conecta a `feature` entregue aos docs de processo (`spec/plan/tasks`, que ficam **fora** do grafo, linkados por path relativo) | thin: 1 linha + links de processo + `## Grafo` |

## Frontmatter

```yaml
---
type: feature | decisao | rumo | modulo
status: idea | speccing | planned | building | shipped | deprecated
title: Nome legível
tags: [auth, aluno]                     # viram labels de issue
updated: 2026-07-21
sprint: "[[01-login-aluno-real]]"      # opcional
part_of: "[[rumo-experiencia-aluno]]"  # opcional
depends_on: ["[[login-aluno]]"]        # opcional
issue:                                  # nº da issue GitHub (quando criada)
---
```

`status` vive **só** aqui (nunca duplicado no `_MOC`). Ciclo, casado com o SDD:

```
idea ─Specify→ speccing ─Plan+Tasks ok→ planned ─Implement→ building ─QA+merge→ shipped ─(revertida)→ deprecated
```

## Consistência mecânica (não disciplina)

`_MOC.md` é **só índice de links** — sem coluna de status (verdade única fica no nó). Um validador (`platform/scripts/validate-graph.mjs`, a construir) roda na fase **Analyze** e no **pre-commit** e falha se:
- algum `[[link]]` aponta pra nó inexistente (dangling);
- frontmatter sem campo obrigatório ou `type`/`status` fora do enum;
- nó órfão (sem link de entrada nem saída), exceto `rumo` e `_MOC`;
- nó com corpo acima do teto de linhas.

Slugs de nó são **imutáveis** uma vez criados (renomear quebra backlinks no CLI) — para aposentar, use `status: deprecated`, não renomeie.

## Protocolo do Leovio (única mão que escreve nós)

Atualiza o grafo **em cada transição** (parte do "done", não etapa separada):
1. **Specify ok** → `feature` vira `speccing`; linka `sprint` e `part_of`.
2. **Plan+Tasks ok** → `feature` vira `planned`. (Detalhe de módulo mora no `plan.md`, não vira nó — só cria `modulo` se for linkado por 2+.)
3. **Cada task QA-verde** → atualiza `updated:` do `feature`; se tocou algo linkado por 2+, atualiza o `modulo` stub.
4. **Sprint fechada** → `feature` vira `shipped`; atualiza a skill `platform-contexto` (o que passou a existir); registra a data no log do `_MOC`.
5. **Decisão não-óbvia** → cria `decisao` (ADR) e linka dos afetados.

## Geração de issues em massa (futuro)

Nós com `status ∈ {idea, planned}` e sem `issue:` = backlog. `platform/scripts/nodes-to-issues.mjs` (a construir) lê o frontmatter → `gh issue create` (title=`title`, labels=`tags`, body=pointer p/ spec) e grava o nº em `issue:`.
