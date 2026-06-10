---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 32"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 32"
bgPreset: palette
aulaDate: "2026-06-12"
unlockHour: 13
layout: cover
---

# Aula 32
## Comment Engineer + Python no Papel

---
layout: brainstorm
bgPreset: palette
pulse: true
pulseDuration: 6
---

<!-- ABERTURA -->

## Quem sou eu? v2 — 5 minutos

Ontem você descobriu o seu cartão. Agora explica o do colega.

<v-click>

Em dupla: **explique em 1 frase o que era o cartão do seu colega.**

> *"[Termo] é [definição] — exemplo: [código]"*

</v-click>

<v-click>

**Exemplos:**
- "Function é um bloco de código reutilizável — `def calcular(x):`"
- "TypeError é um erro de tipo — `print('nota: ' + 9)`"
- "Loop é uma repetição — `for item in lista:`"

</v-click>

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 2 -->

# BLOCO 1
## UC02 - Inglês Instrumental
### Comment Engineer

---
layout: brainstorm
bgPreset: palette
pulse: true
pulseDuration: 6
---

<!-- SLIDE 3 -->

## O que faz um Comment Engineer?

Você já sabe escrever código Python.

Hoje você vai aprender a **documentar** esse código em inglês.

<v-click>

Um Comment Engineer escreve comentários tão claros que:

- Qualquer colega entende o que o código faz
- Qualquer colega consegue recriar o código lendo só os comentários
- O código vira comunicação, não só instrução para a máquina

</v-click>

<v-click>

> A habilidade mais valiosa de um dev: código que não precisa de explicação extra.

</v-click>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 4 -->

## O Template de Comentário EN

Três linhas. Toda função documentada.

```python
# This function [verbo] [o quê]
# Input: [tipo] — [descrição]
# Returns: [tipo] — [descrição]
```

<v-click>

> Qualquer função Python cabe nesse template. Você vai praticar agora.

</v-click>

---
layout: default
bgPreset: default
card: true
pulse: false
---

## Exemplo aplicado

```python
# This function calculates the average of a list of numbers
# Input: list — a list of numeric values
# Returns: float — the mean value

def calcular_media(valores):
    return sum(valores) / len(valores)
```

<v-click>

Leia de baixo para cima: código → comentários → você entende o contrato da função sem executar nada.

</v-click>

---
layout: default
bgPreset: default
card: true
pulse: false
---

## Verbos do Comment Engineer

<SlideTable compact>

| Verbo EN | Quando usar |
|---|---|
| `calculates` | faz uma conta |
| `checks` | verifica uma condição |
| `returns` | devolve um valor |
| `appends` | adiciona ao final |
| `gets` | recupera um valor |
| `defines` | declara / cria algo |

</SlideTable>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 5 -->

## Comment Engineer — 20 minutos

Escreva no papel: uma função Python + os comentários em inglês.

<v-click>

**Escolha uma das funções:**

1. Recebe uma lista e retorna a soma
2. Recebe uma string e retorna ela em maiúsculo
3. Verifica se um número é par (`True` ou `False`)
4. Qualquer função que você já conhece

</v-click>

<v-click>

**Formato obrigatório no papel:**

```
# This function [verb] [what]
# Input: [type] — [description]
# Returns: [type] — [description]

def nome_da_funcao(parametro):
    [código]
    return resultado
```

</v-click>

<AdminOnly>

**Para o professor:** Corrija enquanto escrevem. Erros comuns:
- "This function do the sum" → "calculates the sum of"
- "Input: number" sem tipo → "Input: int — the value to check"
- "Returns: the result" sem tipo → "Returns: float — the calculated average"
- Verbo no gerúndio ("calculating") → verbo simples ("calculates")

</AdminOnly>

---
layout: brainstorm
bgPreset: palette
pulse: true
pulseDuration: 6
---

<!-- SLIDE 6 -->

## Passa o Código — 15 minutos

Três pessoas. Uma função. Comunicação testada.

<v-click>

**Rodada em trio:**

1. **Aluno A** escreve a função (código + comentários EN) no papel
2. **Aluno B** recebe **só os comentários** — escreve o código sem ver o original
3. **Aluno A** compara: o código de B resolve o mesmo problema?

</v-click>

<v-click>

Se o código de B faz o mesmo que o de A → **os comentários comunicaram.**

Se não → o que estava ambíguo?

</v-click>

<v-click>

> Depois trocam papéis. B vira A, C vira B. Todos passam pelos dois lados.

</v-click>

<AdminOnly>

**Para o professor:** B não pode perguntar nada — só lê e escreve. Isso força A a escrever comentários completos.

Se B errou: discutir o que estava ambíguo. Ex: "# Returns: number" → ambíguo (int? float?). "# Returns: int — the count of items" → específico.

O objetivo não é implementação idêntica — é que o código de B resolva o mesmo problema com os mesmos inputs/outputs.

</AdminOnly>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 7 -->

## Dicionário Pessoal — atualizar agora

Adicione os verbos e termos que você usou hoje.

<v-click>

**Verbos do Comment Engineer — adicionar ao dicionário:**

```
TERMO        | ONDE VI              | O QUE SIGNIFICA AQUI
-------------|----------------------|-------------------------
calculates   | # This function...   | faz uma conta
checks       | # This function...   | verifica uma condição
returns      | # Returns: int       | devolve um valor
appends      | template comentário  | adiciona ao final
gets         | help(dict.get)       | recupera valor por chave
defines      | # This function...   | declara / cria algo
```

</v-click>

<v-click>

**Meta acumulada:** ao fim da A32 você deve ter no mínimo **13 termos** no dicionário.

> A31: 8 termos · A32: +5 verbos = 13

</v-click>

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 8 -->

# BLOCO 2
## UC05 - Python
### Python no Papel — Parte 1

---
layout: brainstorm
bgPreset: palette
pulse: true
pulseDuration: 6
---

<!-- SLIDE 9 -->

## Código sem teclado. Você é o compilador.

<v-click>

Escrever código no papel:
- Força você a pensar antes de tentar
- Remove autocomplete e destaque de erro do VS Code
- O erro que aparece agora vem da **sua cabeça**, não do editor

</v-click>

<v-click>

> Piloto de avião treina no simulador antes de voar. Desenvolvedor de IA treina no papel antes de executar.

</v-click>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 10 -->

## Os 4 Trechos — referência (1/2)

Você vai escrever os 4 no papel. Sem consulta.

**Trecho 1 — `for` com lista**
```python
frutas = ["maçã", "banana", "laranja"]
for fruta in frutas:
    print(fruta)
```

**Trecho 2 — função com parâmetro + `return`**
```python
def dobrar(numero):
    return numero * 2
```

---
layout: default
bgPreset: default
card: true
pulse: false
---

## Os 4 Trechos — referência (2/2)

**Trecho 3 — tuple imutável**
```python
ponto = (10, 20)
# ponto[0] = 99  → TypeError: não dá pra mudar
```

**Trecho 4 — set com ∪ e ∩**
```python
a = {1, 2, 3}
b = {2, 3, 4}
print(a | b)   # {1, 2, 3, 4}
print(a & b)   # {2, 3}
```

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 11 -->

## Python no Papel — Parte 1 (25 minutos)

Escreva os 4 trechos no papel. Embaixo de cada um, o comentário EN.

<v-click>

**Formato por trecho:**

```
[código escrito à mão]

# This code [verb] [what]
# It uses: [estrutura]
```

</v-click>

<v-click>

**Exemplos de comentários EN:**
- `# This code iterates over a list and prints each item`
- `# This function doubles a number and returns the result`
- `# This tuple stores two coordinates — it cannot be modified`
- `# This code calculates the union and intersection of two sets`

</v-click>

<AdminOnly>

**Para o professor:** Peer review com os papéis (RODA ✓ / ERRO ✗ + motivo). Antes de "Cria o Bug", todos devem ter os 4 trechos escritos. Quem terminar antes: adicionar variações (ex: for com range, função com dois parâmetros).

</AdminOnly>

---
layout: brainstorm
bgPreset: palette
pulse: true
pulseDuration: 6
---

<!-- SLIDE 12 -->

## Cria o Bug, Passa o Bug — 10 minutos

Agora você vai **criar** um bug intencional.

<v-click>

**Como jogar:**
1. Escolha um dos 4 trechos que você escreveu
2. Reescreva com **um bug** — pode ser sutil
3. Passa pro colega da direita
4. Colega: (1) identifica, (2) fala o nome em inglês, (3) corrige no papel

</v-click>

<AdminOnly>

**Para o professor:** Incentive bugs sutis. Os mais difíceis: NameError com typo (`resutado` em vez de `resultado`), IndentationError em função curta, ou TypeError com operação implícita.

Bugs fáceis demais: esquecer `:` no `def` — qualquer um vê. Ao final, o autor explica o raciocínio para a turma.

</AdminOnly>

---
layout: brainstorm
bgPreset: palette
pulse: false
pulseDuration: 6
---

## Tipos de bug que valem

<SlideTable compact>

| Erro EN | O que é |
|---|---|
| `TypeError` | tipo errado — somar `str` + `int` |
| `NameError` | variável não definida antes de usar |
| `SyntaxError` | esqueceu `:` no `def`, `for` ou `if` |
| `IndentationError` | `return` fora da indentação da função |

</SlideTable>

<v-click>

> **Quem criou o bug mais difícil de achar ganha o round.**

</v-click>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 13 -->

## Peer Review Final — 5 minutos

Troca o papel com o colega. Avalia os 4 trechos.

<v-click>

**Para cada trecho, escreva:**

```
Trecho 1: RODA ✓ / ERRO ✗
Motivo: [o que está certo ou o que está errado]
```

</v-click>

<v-click>

**O que verificar:**
- `for`: itera sobre a lista com `:` no final?
- função: tem `def`, parênteses, `:`, `return`?
- tuple: parênteses, vírgula entre elementos?
- set: chaves `{}`, operadores `|` e `&` corretos?

</v-click>

<AdminOnly>

**Erros comuns para o professor:**
- `for fruta in frutas` sem `:` → SyntaxError
- `def dobrar(numero)` sem `:` → SyntaxError
- `return` sem indentação dentro da função → IndentationError
- `ponto = (10 20)` sem vírgula → SyntaxError
- `{1, 2, 3}` escrito como `[1, 2, 3]` → list, não set

</AdminOnly>

---
layout: end
bgPreset: palette
github: LeoZanini
avatar: https://github.com/LeoZanini.png?size=256
---

<!-- SLIDE END -->

## Até a próxima!

**Aula 32 concluída:**

- UC02: Comment Engineer — template 3 linhas, função no papel + comentários EN, Passa o Código + Dicionário (13+ termos)
- UC05: Python no papel — `for`, função com `return`, tuple, set + Cria o Bug, Passa o Bug + peer review

**Próxima aula (A33 — sábado reposição):**
- UC02: Mini README — grupos produzem 1 página de README para o código dos 2 dias anteriores
- UC05: Python Parte 2 — `dict` + função que recebe dict → últimos 30 min: digitam o código do colega no VS Code lendo só os comentários EN
