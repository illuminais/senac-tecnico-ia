---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 33"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 33"
bgPreset: palette
aulaDate: "2026-06-13"
unlockHour: 9
layout: cover
---

# Aula 33
## Mini README + Python com Dict

---
layout: brainstorm
bgPreset: palette
pulse: true
pulseDuration: 6
---

<!-- ABERTURA -->

## Três dias. Dois blocos. Uma entrega.

Quinta: você leu documentação em inglês e descobriu vocabulário.

Sexta: você escreveu comentários EN e testou se comunicavam.

<v-click>

**Hoje:** você produz o README do seu código — e digita o código do colega lendo só os comentários dele.

</v-click>

<v-click>

> Ao fim da aula: README impresso + Dicionário com 15+ termos = prova de que você documenta código em inglês.

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
### Mini README — Day 3

---
layout: brainstorm
bgPreset: palette
pulse: true
pulseDuration: 6
---

<!-- SLIDE 3 -->

## O que é um README?

É o primeiro arquivo que qualquer pessoa lê num projeto.

<v-click>

Você já viu README no GitHub: é o texto que aparece na página do repositório.

- Explica o que o projeto faz
- Mostra como usar
- Dá um exemplo

</v-click>

<v-click>

> Todo projeto de IA tem um README. Kaggle, Hugging Face, GitHub — todos em inglês. Hoje você escreve o do seu.

</v-click>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 4 -->

## O Template do Mini README

4 seções. 1 página. Tudo em inglês.

```markdown
## What it does
[1-2 frases: o que o código faz]

## How to use
[como chamar a função, quais parâmetros]

## Example
[trecho de código mostrando a chamada e o resultado]

## Author
[seu nome]
```

<v-click>

> Preencha cada seção com frases curtas. Use os verbos do Comment Engineer.

</v-click>

---
layout: default
bgPreset: default
card: true
pulse: false
---

## Exemplo preenchido

```markdown
## What it does
This function calculates the average of a list of numbers
and returns the result as a float.

## How to use
Call calcular_media() with a list of numbers as input.

## Example
calcular_media([7.5, 8.0, 9.5])  # returns 8.33

## Author
Ana Silva
```

<v-click>

Leia as seções na ordem: o que faz → como usar → exemplo → autor. É o README mínimo que qualquer projeto de IA precisa.

</v-click>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 5 -->

## Mini README — grupos (20 minutos)

Em dupla ou trio: escolham **uma função** das que escreveram na quinta ou sexta.

<v-click>

**Preencham as 4 seções em inglês:**

1. `## What it does` — 1 ou 2 frases. Use os verbos do Comment Engineer
2. `## How to use` — "Call [função]() with [tipo] as input"
3. `## Example` — copie a chamada e escreva o resultado esperado
4. `## Author` — nomes do grupo

</v-click>

<v-click>

**Dicas de escrita:**
- `What it does`: "This function **[verb]** [what] and **returns** [what]"
- `How to use`: "Call `nome()` with **[tipo]** — [descrição do parâmetro]"
- `Example`: mostre entrada e saída esperada com `#`

</v-click>

<AdminOnly>

**Para o professor:** Circule e corrija: frase no presente simples ("calculates", não "is calculating"), tipo específico no How to use, resultado real no Example.

Grupos que terminarem cedo: escrever README para uma segunda função — ou acrescentar seção `## Why we built this` em 1 frase.

</AdminOnly>

---
layout: brainstorm
bgPreset: palette
pulse: true
pulseDuration: 6
---

<!-- SLIDE 6 -->

## Apresentação Oral — 3 minutos por grupo

Cada grupo apresenta o README para a turma.

<v-click>

**Estrutura da apresentação:**

> "This function **[verbo]**… it **takes** [tipo] as input… it **returns** [tipo]… **Example:** [chamada]"

</v-click>

<v-click>

**Verbos que vão aparecer naturalmente:**
- *defines* · *calculates* · *checks* · *returns* · *takes* · *appends* · *gets*

</v-click>

<v-click>

> Falar código em inglês em voz alta é diferente de escrever. Cada grupo tem 1 minuto — vai rápido.

</v-click>

<AdminOnly>

**Para o professor:** Não corrija pronúncia agora — o objetivo é fluência técnica, não fonética. Corrija só vocabulário técnico errado ("the function is doing" → "the function does"). Aplauda quem usar os verbos do dicionário corretamente.

</AdminOnly>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 7 -->

## Dicionário Pessoal — entrega final do sprint

Este é o último dia do sprint UC02 de 3 dias.

<v-click>

**Meta acumulada:**

<SlideTable compact>

| Dia | Atividade | Termos esperados |
|---|---|
| Thu (A31) | Doc Hunter + Error Detective | 8 termos |
| Fri (A32) | Comment Engineer + Passa o Código | +5 verbos → 13 |
| Sat (A33) | Mini README + apresentação oral | +2 novos → **15** |

</SlideTable>

</v-click>

<v-click>

**Entrega hoje:**
- Dicionário manuscrito com **mínimo 15 termos** preenchidos (onde vi + o que significa aqui)
- README impresso ou fotografado

</v-click>

<v-click>

> Esse dicionário continua. Toda aula de UC02 e UC05 vai adicionar novos termos até o fim do T2.

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
### Python no Papel — Parte 2 + Compilação Real

---
layout: brainstorm
bgPreset: palette
pulse: true
pulseDuration: 6
---

<!-- SLIDE 9 -->

## Dict: o tipo de dado mais útil em IA

Em Python de IA, quase tudo é um dicionário.

<v-click>

- Resultado de um modelo: `{"label": "gato", "score": 0.97}`
- Configuração de treinamento: `{"epochs": 10, "lr": 0.001}`
- Linha de um dataset: `{"idade": 25, "salario": 3500}`

</v-click>

<v-click>

> `dict` não é só uma estrutura — é a forma como dados reais chegam até você.

</v-click>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 10 -->

## Dict — `.get()`: acesso seguro

```python
pessoa = {"nome": "Ana", "idade": 20, "cidade": "Pato Branco"}
```

**`.get(chave)` — acessa sem travar se a chave não existir**

```python
pessoa.get("nome")       # "Ana"
pessoa.get("email")      # None — sem KeyError
pessoa.get("email", "—") # "—" como padrão
```

<v-click>

> `dict["chave"]` trava com `KeyError` se a chave não existe. `.get()` retorna `None` — ou o padrão que você definir.

</v-click>

---
layout: default
bgPreset: default
card: true
pulse: false
---

## Dict — `.keys()` e `.items()`: iterar

```python
for chave in pessoa.keys():
    print(chave)          # nome, idade, cidade

for chave, valor in pessoa.items():
    print(f"{chave}: {valor}")
```

<v-click>

> `.items()` devolve pares `(chave, valor)` — precisa de dois nomes no `for`.

</v-click>

---
layout: default
bgPreset: default
card: true
pulse: false
---

## Dict — função que recebe e processa

```python
def resumir(dados):
    return f"{dados.get('nome')} tem {dados.get('idade')} anos"

aluno = {"nome": "Ana", "idade": 20}
print(resumir(aluno))   # Ana tem 20 anos
```

<v-click>

> A função recebe o dict como parâmetro — não acessa variável global. Isso é o padrão para funções de IA que processam linhas de um dataset.

</v-click>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 11 -->

## Python no Papel — Parte 2: Trecho 1

Escreva no papel, sem consulta. Embaixo: comentário EN.

**Trecho 1 — dict com `.get`, `.items` ou `.keys`**

```
[dict definido à mão com 3+ pares]
[loop com .keys() ou .items()]
```

<v-click>

**Comentário EN logo abaixo:**
```
# This code defines a dict and iterates over its [keys / items]
# It uses: dict, .get(), .items() / .keys()
```

</v-click>

---
layout: default
bgPreset: default
card: true
pulse: false
---

## Python no Papel — Parte 2: Trecho 2

**Trecho 2 — função que recebe dict e retorna valor calculado**

```
def nome_funcao(dicionario):
    [acessa chaves com .get()]
    return [resultado calculado]
```

<v-click>

**Comentário EN logo abaixo:**
```
# This function receives a dict and returns [resultado]
# It uses: .get() to access values safely
```

</v-click>

<AdminOnly>

**Para o professor:** Peer review igual à sexta (RODA ✓ / ERRO ✗ + motivo). Erros comuns: usar `dict["chave"]` sem verificar existência — correto com `.get()`. Esquecer `return` na função. Função sem parâmetro quando deveria receber o dict.

</AdminOnly>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 12 -->

## Peer Review — 5 minutos

Troca o papel com o colega. Avalia os 2 trechos.

<v-click>

**Para cada trecho:**

```
Trecho 1: RODA ✓ / ERRO ✗
Motivo: [o que está certo ou errado]
```

</v-click>

<v-click>

**O que verificar:**
- Dict: chaves entre aspas, vírgula entre pares `chave: valor`?
- `.get()`: passando a chave como string?
- `.items()`: dois nomes no `for` (`chave, valor`)?
- Função: tem `def`, `:`, `return`? Recebe o dict como parâmetro?

</v-click>

<AdminOnly>

**Erros comuns para o professor:**
- `for chave, valor in pessoa` em vez de `pessoa.items()` → TypeError
- `pessoa[chave]` em vez de `pessoa.get(chave)` — funciona, mas não é o que foi pedido
- `def resumir():` sem parâmetro → NameError ao usar a variável
- Chave sem aspas: `{nome: "Ana"}` → NameError

</AdminOnly>

---
layout: brainstorm
bgPreset: palette
pulse: true
pulseDuration: 6
---

<!-- SLIDE 13 -->

## Compilação Real — 30 minutos

Agora o código sai do papel e vai pro VS Code.

<v-click>

**Regra única:** você digita o código **do colega**, lendo **só os comentários EN** dele.

Não olha para o código. Só para os comentários.

</v-click>

<v-click>

**Objetivo:** se o código rodar sem modificação → os comentários foram precisos.

Se precisar corrigir → volta pro colega e pergunta: "what does this line do?"

</v-click>

<v-click>

> Uma dupla por computador é suficiente. Quem não tiver computador digita no papel de rascunho e o colega confirma.

</v-click>

<AdminOnly>

**Para o professor:** Mínimo 1 computador por dupla. Pode usar VS Code, Colab ou IDLE. Não ajude com a lógica — só com erros de digitação.

O teste real: o código do colega roda? Se sim, os comentários funcionaram como documentação. Se não, discutir o que estava ambíguo.

Registre os pares que conseguiram — é evidência de indicador UC02 Ind.3 (produção escrita técnica funcional).

</AdminOnly>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 14 -->

## Compilação Real — o que observar

Enquanto você digita o código do colega:

<v-click>

**Se o código rodou:**
- Os comentários eram precisos o suficiente
- Tipo certo, verbo certo, resultado descrito corretamente

</v-click>

<v-click>

**Se não rodou:**
- Qual linha causou o erro?
- O comentário dizia o suficiente para escrever essa linha?
- O que faltou no comentário?

</v-click>

<v-click>

> Este é o teste definitivo do sprint: **código documentado em inglês que outra pessoa consegue recriar.**

</v-click>

---
layout: end
bgPreset: palette
github: LeoZanini
avatar: https://github.com/LeoZanini.png?size=256
---

<!-- SLIDE END -->

## Até a próxima!

**Sprint UC02 — 3 dias concluídos:**

- A31: Doc Hunter + Error Detective → vocabulário real de docstrings e tracebacks
- A32: Comment Engineer + Passa o Código → documentação de função em inglês
- A33: Mini README + apresentação oral + Dicionário (15+ termos)

**Aula 33 concluída:**

- UC02: Mini README escrito + apresentado oralmente + Dicionário entregue
- UC05: dict com `.get`, `.items`, `.keys` + função com dict + compilação real do código do colega

**Próxima semana (A34 — 18/06):**
- UC07: Transformação Digital
- UC01: Fundamentos de Computação
