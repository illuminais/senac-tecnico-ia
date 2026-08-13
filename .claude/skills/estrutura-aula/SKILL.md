---
name: estrutura-aula
description: Ordem pedagógica T→E→D→TC, inferência de tags, blocos obrigatórios por aula e template de tarefa de casa. Debate só quando o professor pedir. Use ao criar ou auditar slides.
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
| `[ATIV AVALIATIVA]` | Avaliação formal (prova, instrumento com nota) — **não é `[TEORIA]`**, conta como quebra estrutural igual `[EXERCICIO]` | comentário HTML `<!-- [ATIV AVALIATIVA] ... -->`, instruções de prova, questões numeradas com gabarito/rubrica A/PA/NA |

---

## Violações a detectar

- `[EXERCICIO]` após `[DINAMICA]` (exceto warm-up no início do grupo)
- `[TEORIA]` após `[DINAMICA]` (teoria fora de ordem)
- `[TEORIA]` após `[TAREFA DE CASA]`
- Mais de 4 `[TEORIA]` consecutivos sem `[EXERCICIO]` ou `[ATIV AVALIATIVA]` entre eles

---

## Regras de inferência de tag

| Sinal no slide | Tag inferida |
|---|---|
| `layout: brainstorm` + mecânica de jogo, pontuação, ação física | `[DINAMICA]` |
| `layout: brainstorm` + perguntas abertas, sem mecânica | `[DEBATE]` |
| Menciona "exercício", "nível N", caminho de arquivo, "Salve como" | `[EXERCICIO]` |
| `layout: cover`, `layout: end`, `layout: center` com texto divisor | `[TEORIA]` |
| Menciona "Tarefa de Casa" ou "Atividade para Casa" | `[TAREFA DE CASA]` |
| Comentário HTML `[ATIV AVALIATIVA]`, ou menciona "prova", "avaliação individual", "questão N" com gabarito/rubrica A/PA/NA | `[ATIV AVALIATIVA]` (não é `[TEORIA]` — conta como quebra estrutural) |

---

## Blocos obrigatórios por `aulaNum`

Cada grupo de slides de uma aula DEVE ter:
- Pelo menos 1 `[EXERCICIO]` ou 1 `[ATIV AVALIATIVA]`
- Pelo menos 1 `[TAREFA DE CASA]`

**Exceção carryover:** grupos que continuam exercícios da aula anterior não precisam de tarefa própria se forem designados como `[EXCECAO: carryover]`.

### Debate não é obrigatório (decisão do professor, 12/08/2026)

> **Nunca gere um slide `[DEBATE]` por conta própria.** Só inclua debate se o professor pedir explicitamente para aquela aula.

Motivo, nas palavras do professor: dividir a turma, distribuir papéis e rodar as etapas custa cerca de **1 hora de aula** e o retorno não compensa. Quando faltar conteúdo de engajamento, **acrescente teoria que complemente** o que vem depois (contexto, comparação entre conceitos, por que aquilo existe), não um debate.

O mesmo vale para `[DINAMICA]`: só quando pedida.

---

## Templates de slides obrigatórios

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

Máximo 4 slides `[TEORIA]` consecutivos sem um `[EXERCICIO]` ou `[ATIV AVALIATIVA]` no meio.

> Limite subiu de 2 para 4 em 12/08/2026, junto com a decisão de não gerar debates: teoria bem encadeada passou a ser o recurso padrão para preparar terreno antes de um exercício.

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
