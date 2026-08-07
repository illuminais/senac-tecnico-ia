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
| `[ATIV AVALIATIVA]` | Avaliação formal (prova, instrumento com nota) — **não é `[TEORIA]`**, conta como quebra estrutural igual `[EXERCICIO]` | comentário HTML `<!-- [ATIV AVALIATIVA] ... -->`, instruções de prova, questões numeradas com gabarito/rubrica A/PA/NA |

---

## Violações a detectar

- `[EXERCICIO]` após `[DINAMICA]` (exceto warm-up no início do grupo)
- `[TEORIA]` após `[DINAMICA]` (teoria fora de ordem)
- `[TEORIA]` após `[TAREFA DE CASA]`
- Mais de 2 `[TEORIA]` consecutivos sem `[EXERCICIO]`, `[DINAMICA]` ou `[ATIV AVALIATIVA]` entre eles

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
- Pelo menos 1 `[DINAMICA]` OU 1 `[DEBATE]`
- Pelo menos 1 `[TAREFA DE CASA]`
- A abertura deve ser um slide de engajamento (`[DEBATE]` ou brainstorm)

**Exceção carryover:** grupos que continuam exercícios da aula anterior não precisam ter abertura de engajamento se forem designados como `[EXCECAO: carryover]`.

---

## Templates de slides obrigatórios

### Slide de Debate (quando ausente)

**Regra 1 — dilema de escolha forçada (feedback do professor — perguntas abertas genéricas viram silêncio ou são puladas):** nunca usar pergunta aberta de reflexão ("o que vocês acham de X?"). Sempre montar como **dilema de escolha forçada**: duas posições concretas e opostas, ligadas ao dado/caso real da aula (dataset, case, exercício que acabaram de fazer), cada aluno/grupo precisa escolher um lado e justificar com algo concreto (um dado, uma linha da tabela, um trecho do case). Perguntas técnicas soltas sem posição pra defender voltam a ser genéricas — evitar.

**Regra 2 — estrutura obrigatória (feedback do professor, 06/08/2026: "não vou fazer debate lendo um slide e esperando eles discutir entre eles"):** todo `[DEBATE]` (Time A x Time B, ou variações) precisa deixar explícito no(s) slide(s):

- **Como a turma se divide e quantas pessoas debatem entre si** — nunca implícito. Ex: "turma dividida ao meio" ou "grupos de N alunos, C grupos por lado" (usar o tamanho real da turma e o agrupamento já usado na aula, quando existir).
- **Papel de cada um dentro do grupo** — quem argumenta em voz alta, quem cronometra, quem escreve/anota. Ninguém fica de fora do processo assistindo.
- **Começo, meio e fim com tempo definido por etapa** — nunca só "escolham um lado, 5 minutos" sem dizer o que acontece dentro desses 5 minutos. Etapas típicas: preparar (grupo monta o argumento) → apresentar (cada lado fala, tempo cronometrado) → réplica → síntese.
- **Entrega parcial concreta em cada etapa** — ex: o grupo escreve o argumento no papel antes de falar, escolhe o representante antes da etapa de apresentação. Isso é sobre manter todo mundo engajado durante a etapa, não sobre nota/pontuação (rubricas de avaliação seguem critério A/PA/NA, nunca ponto numérico — ver skill `revisao-conteudo`).

Isso normalmente exige **2 slides** (setup + papéis, depois confronto + fechamento) em vez de 1 slide estático de leitura.

```markdown
---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula NN"
---

<!-- debate: [aula NN] — setup -->

# Debate: [Tema Principal da Aula]

**[Dilema concreto ligado ao dado/caso da aula, com duas posições opostas nomeadas, ex: "Time A defende ___ · Time B defende ___"]**

- [Como a turma se divide: "turma dividida ao meio" ou "N grupos de M, metade defende Time A, metade Time B"]
- Dentro do grupo: 1 pessoa argumenta em voz alta, 1 cronometra, o resto ajuda a montar o argumento
- **[X] min:** cada grupo escreve o argumento mais forte, ligado a um dado/linha/trecho concreto do material da aula

---
layout: brainstorm
card: true
bgPreset: palette
pulse: false
---

<!-- debate: [aula NN] — confronto e fechamento -->

# Debate: [Tema Principal da Aula] (cont.)

- **[X] min:** Time A apresenta o argumento
- **[X] min:** Time B apresenta o argumento
- **[X] min:** réplica livre (qualquer um dos dois lados)
- **[X] min:** professor sintetiza e conecta com o próximo tópico

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

Máximo 2 slides `[TEORIA]` consecutivos sem um `[EXERCICIO]`, `[DINAMICA]` ou `[ATIV AVALIATIVA]` no meio.

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
