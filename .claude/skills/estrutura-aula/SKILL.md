---
name: estrutura-aula
description: Ordem pedagógica T→E→D→TC, inferência de tags, blocos obrigatórios por aula e templates de debate e tarefa. Use ao criar ou auditar slides.
---
---
name: estrutura-aula
---
# Skill: Estrutura de Aula — Técnico em IA (T→E→D→TC)

Use esta skill ao criar ou auditar slides para garantir que a sequência pedagógica está correta.

---

## Ordem obrigatória: T→E→D→TC

Cada bloco de aula (`aulaNum`) deve seguir esta ordem:

| Tag | Significado | Exemplos |
|---|---|---|
| `[TEORIA]` | Slide expositivo: conceito, definição, comparação, divisor de bloco | cover, default com lista, center com definição |
| `[EXERCICIO]` | Prática guiada ou individual com gabarito | exercício numerado, código com `<AdminOnly>` |
| `[DINAMICA]` | Atividade interativa: jogo, roleplay, votação, game | brainstorm com mecânica de jogo, contagem de pontos |
| `[DEBATE]` | Pergunta aberta para reflexão coletiva | brainstorm sem mecânica de jogo, perguntas técnicas |
| `[TAREFA DE CASA]` | Atividade para entregar na próxima aula | slide layout default com prazo e instruções |

---

## Violações a detectar

- `[EXERCICIO]` após `[DINAMICA]` (exceto warm-up no início do grupo)
- `[TEORIA]` após `[DINAMICA]` (teoria fora de ordem)
- `[TEORIA]` após `[TAREFA DE CASA]`
- Mais de 2 `[TEORIA]` consecutivos sem `[EXERCICIO]` ou `[DINAMICA]` entre eles

---

## Regras de inferência de tag

| Sinal no slide | Tag inferida |
|---|---|
| `layout: brainstorm` + mecânica de jogo, pontuação, ação física | `[DINAMICA]` |
| `layout: brainstorm` + perguntas abertas, sem mecânica | `[DEBATE]` |
| Menciona "exercício", "nível N", caminho de arquivo, "Salve como" | `[EXERCICIO]` |
| `layout: cover`, `layout: end`, `layout: center` com texto divisor | `[TEORIA]` |
| Menciona "Tarefa de Casa" ou "Atividade para Casa" | `[TAREFA DE CASA]` |

---

## Blocos obrigatórios por `aulaNum`

Cada grupo de slides de uma aula DEVE ter:
- Pelo menos 1 `[DINAMICA]` OU 1 `[DEBATE]`
- Pelo menos 1 `[TAREFA DE CASA]`
- A abertura deve ser um slide de engajamento (`[DEBATE]` ou brainstorm)

**Exceção carryover:** grupos que continuam exercícios da aula anterior não precisam ter abertura de engajamento se forem designados como `[EXCECAO: carryover]`.

---

## Templates de slides obrigatórios

### Slide de Debate (quando ausente)

**Regra (feedback do professor — perguntas abertas genéricas viram silêncio ou são puladas):** nunca usar pergunta aberta de reflexão ("o que vocês acham de X?"). Sempre montar como **dilema de escolha forçada**: duas posições concretas e opostas, ligadas ao dado/caso real da aula (dataset, case, exercício que acabaram de fazer), cada aluno/grupo precisa escolher um lado e justificar com algo concreto (um dado, uma linha da tabela, um trecho do case). Perguntas técnicas soltas sem posição pra defender voltam a ser genéricas — evitar.

```markdown
---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula NN"
---

<!-- debate: [aula NN] -->

# Debate: [Tema Principal da Aula]

**Escolham um lado — 5 minutos**

**[Dilema concreto ligado ao dado/caso da aula, com duas posições opostas nomeadas, ex: "Time A defende ___ · Time B defende ___"]**

- Time A: [posição 1, ligada a um dado/linha/trecho concreto]
- Time B: [posição 2, ligada a um dado/linha/trecho concreto]
- Cada grupo justifica com um exemplo real do material da aula (não vale opinião solta)

> **Conexão futura:** [como conecta com próximo tópico]
```

### Slide de Tarefa de Casa (quando ausente)

```markdown
---
layout: default
card: true
bgPreset: default
aulaNum: "Aula NN"
---

<!-- tarefa de casa: aula NN -->

# Tarefa de Casa: Aula NN

> **Prazo: início da próxima aula**

[Descrição com pelo menos 2 partes, referenciando conteúdo da aula.
Especifique: o que criar, onde salvar (caminho SENAC-TecIA/Aula-NN/...), formato esperado.]
```

---

## Máximo de `[TEORIA]` consecutivos

Máximo 2 slides `[TEORIA]` consecutivos sem um `[EXERCICIO]` ou `[DINAMICA]` no meio.

**Nota:** Slides divisores (`layout: center` com "AULA NN") são `[TEORIA]` estrutural — não contam para a regra de consecutivos.

---

## Exceções permanentes conhecidas

| Exceção | Motivo |
|---|---|
| SECAO 1 tipo carryover | Continua exercícios da aula anterior — sem abertura e sem tarefa própria |
| ING 03 agrupado com dinâmicas | Atividade oral de reconhecimento — posicionada com dinâmicas intencionalmente |
| Slides divisores `layout: center` | São `[TEORIA]` estrutural — não contam para violação de consecutivos |
| Cover slide (`layout: cover`) | Sempre slide 1, nunca mover |
| End slide (`layout: end`) | Sempre o último slide, nunca mover |
