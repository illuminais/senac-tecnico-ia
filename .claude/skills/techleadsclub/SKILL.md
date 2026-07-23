---
name: techleadsclub
description: Spec-Driven Development (SDD) — metodologia do Tech Leads Club / GitHub Spec Kit adaptada à plataforma LMS. Fluxo Constitution → Specify → Plan → Tasks → Analyze → Implement com checkpoints de validação humana, orquestrado pelo Leovio e validado com property-based testing (fast-check). Use ao planejar uma sprint ou feature nova em platform/.
---

# Skill: Spec-Driven Development (Tech Leads Club)

Metodologia para transformar uma ideia de feature/sprint em código verificado, **escrevendo a especificação antes do código** e usando os agentes de IA (Leovio + especialistas) como executores do contrato. Baseada no "Spec-Driven Development: Guia Completo" (Tech Leads Club) e no GitHub Spec Kit.

Princípio central: **a spec é o artefato durável; o código é descartável e regenerável a partir dela.** Você não pula fase — não planeja antes de especificar, não implementa antes de ter tarefas. Entre cada fase há um **checkpoint de validação humana** (o professor aprova antes de avançar). Erro pego cedo não se propaga.

---

## As 6 fases

| # | Fase | Comando mental | Produz | Foco |
|---|---|---|---|---|
| 0 | **Constitution** | "regras da estrada" | `constitution.md` | princípios não-negociáveis do projeto (uma vez, raramente muda) |
| 1 | **Specify** | "o quê e por quê" | `spec.md` | requisitos, comportamento, critérios de aceite — **sem** stack técnica |
| 2 | **Plan** | "como" | `plan.md` | arquitetura: componentes, schema, contratos de API, camadas afetadas |
| 3 | **Tasks** | "em que ordem" | `tasks.md` | tarefas atômicas e verificáveis, com ordem de dependência e checkpoints |
| 4 | **Analyze** | "está consistente?" | (parecer, read-only) | cruza spec × plan × tasks; acha lacunas, ambiguidade, contradição |
| 5 | **Implement** | "executa e valida" | código + testes | executa tasks uma a uma, cada uma validada por teste + humano |

**Diamante azul = checkpoint humano.** Depois de Specify, Plan, Tasks e Analyze, PARE e peça aprovação do professor antes de avançar. Nunca gere as quatro fases de enfiada sem checkpoint.

**Cerimônia proporcional ao risco.** Os artefatos existem pra reduzir risco, não por ritual. Feature grande/arriscada (auth, schema, dado sensível) = spec + plan + tasks separados. Feature pequena (1 endpoint, 1 tela) = pode fundir `plan.md` + `tasks.md` num arquivo só, ou `tasks.md` enxuto referenciando o plano. Não gere 3 docs cheios pra algo trivial — isso só enche contexto.

---

## Onde os artefatos vivem neste repo

```
platform/specs/
├── constitution.md                 ← princípios do projeto (fase 0, compartilhado)
└── <NN>-<slug-da-sprint>/          ← uma pasta por sprint/feature (ex: 01-login-aluno-real)
    ├── spec.md                     ← fase 1
    ├── plan.md                     ← fase 2
    ├── tasks.md                    ← fase 3 (checkbox por task, atualizada durante Implement)
    └── analyze.md                  ← fase 4 (parecer de consistência), opcional
```

A `constitution.md` complementa — não substitui — a skill `platform-contexto`: a skill descreve o que **existe**; a constituição descreve o que é **inegociável** (ex.: "Worker sem dependências npm", "nada de deploy sem aprovação", "toda lógica pura ganha property test").

---

## Orquestração pelo Leovio

O Leovio é o **motor de Implement** desta metodologia. O papel de cada fase:

- **Fases 0–4 (Constitution → Analyze)**: o Leovio (ou você, com o professor) escreve os artefatos e coleta aprovação. É trabalho de planejamento, não de código. Não delega ainda.
- **Fase 5 (Implement)**: o Leovio lê `tasks.md` e delega **task por task** na ordem de dependência para os especialistas (`@platform-schema-d1` → `@platform-api-worker` → `@platform-componentes-vue` → `@platform-ui-ux`), fechando cada bloco com `@platform-qa`. Cada task só é marcada `[x]` em `tasks.md` quando: (1) o especialista entregou, (2) o teste da task passa, (3) o professor validou o checkpoint.

Regra: **uma task de `tasks.md` mapeia para no máximo uma delegação por especialista.** Se uma task precisa de duas camadas, ela estava grande demais — quebre em Tasks, não em Implement.

---

## Grafo de Estado (contexto vivo, estilo Obsidian)

`platform/specs/` é um **vault Obsidian** — o grafo guarda **só o que o código não conta**: por quê (`decisao`), pra onde (`rumo`), o que está em obra + status (`feature`). **Não é espelho do código** — "o que existe" mora na skill `platform-contexto`. Schema, fronteira de verdade, tipos de nó e protocolo completo em **`platform/specs/SCHEMA.md`** (leia antes de escrever qualquer nó).

**Só o Leovio escreve nós**, e atualiza o grafo em cada transição de fase/task (parte do "done").

### Orçamento de contexto (regra dura, impede explodir a janela)

- **Leovio, por turno, lê no máximo:** `_MOC.md` + o `spec/plan/tasks` da sprint ativa + os **≤4 nós que a sprint linka**. Nunca varre `nodes/` inteiro.
- **Especialistas leem ZERO grafo** — só o *brief* de task + a própria skill. Contexto de subagente fica plano por design.
- **Uma invocação do Leovio = uma fase** (ou um lote de tasks), depois retorna. Nenhum agente segura a sprint inteira.
- Nós atômicos, corpo ≤ ~12 linhas.

### Quem conduz os checkpoints

O Leovio é subagente e **não pausa pra pedir aprovação no meio**. Por isso o **fluxo principal (você, com o professor) é o maestro**: dirige os checkpoints Specify/Plan/Tasks/Analyze e invoca o Leovio **uma fase por vez** com um brief compacto. O Leovio orquestra só o **Implement** (delega aos especialistas). Assim os checkpoints continuam interativos e o contexto nunca acumula a sprint toda.

---

## Property-Based Testing como quality gate (fast-check)

Toda fase Implement termina com testes. Para **lógica pura com invariantes** (funções de transformação, matemática de grid, bucketização, roundtrips de encode/decode, clamps), o teste preferido é **property-based** com [fast-check](https://fast-check.dev), não só exemplos pontuais.

Property test = você descreve uma **propriedade que vale para toda entrada** e o fast-check gera centenas de casos (incluindo os malignos) e faz *shrinking* até o menor contraexemplo.

Alvos de property test neste repo (invariantes reais):
- `useCalendarGrid.ts` — grid de mês sempre tem N células, primeiro dia alinha com o weekday correto, semanas completas.
- `useCalendarStats.ts` / `resumo-ha` — soma de HA por bucket = soma total; nenhum bucket negativo.
- `useProgress.ts` — `setProgresso(x)` sempre resulta em `0 ≤ progresso ≤ 1` (clamp) para qualquer x, inclusive `NaN`/`Infinity`.
- `toSlug()` (build-all.mjs) — idempotente (`slug(slug(x)) === slug(x)`), nunca produz `+`/maiúscula/espaço.
- Worker: `b64url`/`decodeB64url` e `toHex`/`fromHex` — roundtrip (`decode(encode(x)) === x`) para qualquer buffer.

Padrão de invariante útil: **roundtrip** (encode→decode volta ao original), **idempotência** (aplicar 2x = 1x), **limites** (saída sempre dentro de um range), **conservação** (soma das partes = total), **ordem-invariância** (resultado não depende da ordem de entrada).

### Infra de teste

O portal (`platform/portal/`) é workspace npm com `vue-tsc` — é onde vitest + fast-check entram (`devDependencies`, script `"test": "vitest run"`). O Worker **não tem `package.json`**; para property-testar funções puras do Worker, extraia-as para um módulo testável importado tanto pelo Worker quanto pelo teste do portal, ou trate como fora de escopo até o Worker ganhar seu próprio harness. **Nunca** adicione `package.json` ao Worker sem aprovação do professor (regra da constituição / `platform-contexto`).

---

## Templates

### `spec.md` (fase 1 — o quê/por quê, sem stack)

```markdown
# Spec: <nome da feature>

## Contexto / problema
<que dor do usuário — aluno ou professor — isso resolve. Por que agora.>

## Usuários e cenários
- Como <papel>, quero <ação> para <benefício>.

## Requisitos funcionais
- RF1: O sistema DEVE ...
- RF2: ...

## Comportamento esperado
<fluxos passo a passo, casos de borda, estados vazio/erro/carregando>

## Critérios de aceite (verificáveis)
- [ ] CA1: dado <estado>, quando <ação>, então <resultado observável>
- [ ] CA2: ...

## Fora de escopo
<o que explicitamente NÃO entra nesta spec>

## Invariantes (candidatos a property test)
<propriedades que valem para toda entrada — alimenta a fase 5>
```

### `plan.md` (fase 2 — o como)

```markdown
# Plan: <nome da feature>

## Camadas afetadas
- [ ] Schema D1  - [ ] API Worker  - [ ] Componentes Vue  - [ ] UI/UX

## Schema (se aplicável)
<tabelas/colunas/índices novos — idempotente>

## Contratos de API
<rota, método, auth, request, response — um bloco por endpoint>

## Frontend
<views/components/composables novos ou alterados; rotas>

## Decisões de arquitetura e trade-offs
<escolhas não-óbvias e por quê>

## Estratégia de teste
<o que vira property test (fast-check) vs teste de exemplo vs verificação manual>
```

### `tasks.md` (fase 3 — ordem executável)

```markdown
# Tasks: <nome da feature>

Ordem de dependência: schema → API → Vue → UI/UX → QA.

- [ ] T1 [schema] ... — especialista: @platform-schema-d1 — checkpoint: <como validar>
- [ ] T2 [api] ... — @platform-api-worker — depende de: T1
- [ ] T3 [vue] ... — @platform-componentes-vue — depende de: T2
- [ ] T4 [test] property tests de <função> — critério: propriedade X vale p/ 1000 casos
- [ ] T5 [qa] @platform-qa — build + type-check + revisão de convenções
```

---

## Checklist de uso (resumo)

1. Constituição existe? Se não, escreva `platform/specs/constitution.md` (uma vez).
2. **Specify** → `spec.md` → **checkpoint professor**.
3. **Plan** → `plan.md` → **checkpoint professor**.
4. **Tasks** → `tasks.md` → **checkpoint professor**.
5. **Analyze** → cruza os três; corrige inconsistências → **checkpoint professor**.
6. **Implement** (Leovio orquestra): task por task, cada uma com teste (property-based quando houver invariante) e checkpoint, fechando com `@platform-qa`. Marque `[x]` em `tasks.md` **e atualize o Grafo de Estado** (`nodes/`) conforme avança.

> Em toda fase, atualizar o **Grafo de Estado** (`platform/specs/nodes/` + `_MOC.md`) é parte do "done" — não é etapa separada.
