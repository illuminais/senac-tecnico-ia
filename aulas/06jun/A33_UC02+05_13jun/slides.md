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
## Python: os 4 tipos de coleção + Mini README

---
layout: brainstorm
bgPreset: palette
pulse: true
pulseDuration: 6
---

<!-- ABERTURA -->

## Hoje o ciclo fecha.

Você escreve o código. Você documenta. Alguém usa só a documentação pra recriar.

<v-click>

- **Bloco 1:** `list` · `tuple` · `set` · `dict` — lado a lado, no papel
- **Bloco 2:** README do seu próprio código — e um colega vai tentar recriar

</v-click>

<v-click>

> Ao final da aula: código escrito, documentado e testado por outra pessoa.

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
## UC05 - Python
### Os 4 tipos de coleção

---
layout: brainstorm
bgPreset: palette
pulse: true
pulseDuration: 6
---

<!-- SLIDE 3 -->

## Você já ouviu os 4.

`list` · `tuple` · `set` · `dict`

<v-click>

A questão é: **quando usar qual?**

- `list`: listas com `for`, `.append()`
- `tuple`: viu que não dá pra mudar — gera `TypeError`
- `set`: usou `|` e `&` para união e interseção
- `dict`: acessou com `.get()`, iterou com `.items()`

</v-click>

<v-click>

> Hoje você vê os 4 juntos e aprende a escolher o certo para cada situação.

</v-click>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 4 -->

## A diferença que importa

<SlideTable>

| Estrutura | Tem ordem? | Pode mudar? | Repete item? | Acessa por |
|---|---|---|---|---|
| `list` | sim | sim | sim | índice `[0]` |
| `tuple` | sim | **não** | sim | índice `[0]` |
| `set` | não | sim | **não** | iteração |
| `dict` | sim | sim | chaves: **não** | chave `["nome"]` |

</SlideTable>

<v-click>

> `dict` acessa por chave, não por posição — mesmo que tenha ordem interna.

</v-click>

---
layout: brainstorm
bgPreset: palette
pulse: true
pulseDuration: 6
---

<!-- SLIDE 5 -->

## Quando usar qual — a regra prática

<v-click>

**`list`** — sequência que vai crescer ou mudar
*notas de um aluno, nomes de arquivos, resultado de busca*

</v-click>

<v-click>

**`tuple`** — valores fixos que não devem ser alterados
*coordenadas GPS `(lat, lon)`, cor RGB `(255, 0, 0)`*

</v-click>

<v-click>

**`set`** — coleção sem repetição, quando duplicata não faz sentido
*palavras únicas de um texto, usuários que acessaram hoje*

</v-click>

<v-click>

**`dict`** — cada valor tem um nome (chave)
*dados de aluno, resultado de modelo de IA, configuração*

</v-click>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 6 -->

## Cenário 1 — `list`

Guarde os nomes de 5 linguagens de programação **em ordem**. Depois adicione `"Rust"` ao final.

```python
linguagens = [_______, _______, _______, _______, _______]
linguagens._______(________)
print(linguagens)
```

<v-click>

**Dica:** quer ordem + poder adicionar → `list` + `.append()`

</v-click>

<AdminOnly>

```python
linguagens = ["Python", "JavaScript", "Java", "C++", "R"]
linguagens.append("Rust")
print(linguagens)  # ['Python', 'JavaScript', 'Java', 'C++', 'R', 'Rust']
```

</AdminOnly>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 7 -->

## Cenário 2 — `tuple`

Guarde as coordenadas do Parque Tecnológico de Pato Branco: latitude `-26.22`, longitude `-52.67`. **Não pode mudar nunca.**

```python
COLOQUE O CODIGO AQUI
print(coordenadas[0])   # latitude
# tente: coordenadas[0] = 0  → o que acontece?
```

<v-click>

**Dica:** valor fixo → `tuple`. Tentar mudar gera `TypeError`.

</v-click>

<AdminOnly>

```python
coordenadas = (-26.22, -52.67)
print(coordenadas[0])   # -26.22
# coordenadas[0] = 0  → TypeError: 'tuple' object does not support item assignment
```

</AdminOnly>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 8 -->

## Cenário 3 — `dict`

Guarde os dados de uma aluna: nome `"Ana"`, idade `16`, nota `8.5`. Depois acesse o nome com `.get()`.

```python
# preencha as chaves (entre aspas) e os valores
aluna = {
    "_______": _______,
    "_______": _______,
    "_______": _______
}
print(aluna.get("_______"))
```

<v-click>

**Dica:** cada valor tem um rótulo → `dict`. Acesso seguro → `.get("chave")`.

</v-click>

<AdminOnly>

```python
aluna = {"nome": "Ana", "idade": 16, "nota": 8.5}
print(aluna.get("nome"))  # Ana
```

Erros comuns: chaves sem aspas `{nome: "Ana"}` → NameError · `.get(nome)` sem aspas → NameError.

</AdminOnly>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 10 -->

## Peer Review — 5 minutos

Troca o papel com o colega. Avalia os 3 cenários.

<v-click>

```
Cenário 1 (list):  CERTO ✓ / ERRO ✗  →  motivo: ___________
Cenário 2 (tuple): CERTO ✓ / ERRO ✗  →  motivo: ___________
Cenário 3 (dict):  CERTO ✓ / ERRO ✗  →  motivo: ___________
```

</v-click>

<v-click>

**O que verificar:** estrutura certa para o cenário? Colchetes/parênteses/chaves/aspas corretos?

</v-click>

<AdminOnly>

Erros comuns: cenário 2 com `list` em vez de `tuple` (funciona mas não atende "não muda") · cenário 3 sem aspas nas chaves `{nome: "Ana"}` → NameError · `.get(nome)` sem aspas → NameError.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 11 -->

# BLOCO 2
## UC02 - Inglês Instrumental
### Mini README — Day 3

---
layout: brainstorm
bgPreset: palette
pulse: true
pulseDuration: 6
---

<!-- SLIDE 12 -->

## Você tem código. Agora documente.

Você acabou de escrever 4 trechos de código.

<v-click>

Qualquer pessoa que receba esse código vai precisar saber:
- O que ele faz?
- Como usar?
- Qual o exemplo?

</v-click>

<v-click>

> Um README responde isso em 1 página. Kaggle, GitHub, Hugging Face — todos têm README, todos em inglês. Hoje você escreve o do seu código.

</v-click>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 13 -->

## O Template do Mini README

4 seções. 1 página. Tudo em inglês.

```markdown
## What it does
[1-2 frases: o que o código faz]

## How to use
[como criar a estrutura, qual método usar]

## Example
[trecho de código + resultado esperado]

## Author
[seu nome]
```

<v-click>

> Verbos: `stores` · `returns` · `removes` · `converts` · `calculates` · `checks`

</v-click>

---
layout: default
bgPreset: default
card: true
pulse: false
---

## Exemplo preenchido — README do Cenário 4

```markdown
## What it does
This code stores student data in a dict with three
keys: name, age, and grade.

## How to use
Create a dict with "nome", "idade", "nota" as keys.
Use .get("key") to access values safely.

## Example
aluna = {"nome": "Ana", "idade": 16, "nota": 8.5}
aluna.get("nome")  # returns "Ana"

## Author
Ana Silva
```

<v-click>

Leia na ordem: o que faz → como usar → exemplo → autor.

</v-click>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 14 -->

## Mini README — em dupla (20 minutos)

Escolha **um** dos 4 cenários que você escreveu. Escreva o README em inglês.

<v-click>

1. `## What it does` → "This code **[verbo]** [o quê] using **[estrutura]**"
2. `## How to use` → como criar a estrutura, qual método usar
3. `## Example` → copie o código do papel + escreva o resultado esperado
4. `## Author` → seu nome

</v-click>

<v-click>

> Guarde o README. Ele vai ser usado na próxima atividade.

</v-click>

<AdminOnly>

Circule e corrija: presente simples ("stores", não "is storing") · tipo específico no How to use · resultado real no Example. Quem terminar: escrever README para um segundo cenário.

</AdminOnly>

---
layout: brainstorm
bgPreset: palette
pulse: true
pulseDuration: 6
---

<!-- SLIDE 15 -->

## Compilação Real — 20 minutos

Você recebe o README do colega. **Sem ver o código** — só o README.

<v-click>

**Regra única:** leia o README e escreva o código do zero no VS Code.

</v-click>

<v-click>

**O teste:** se o código rodar → o README foi preciso o suficiente.

Se precisar corrigir → o que estava ambíguo no README?

</v-click>

<v-click>

> Isso é o que acontece em projetos reais: outro dev pega seu README e tenta recriar seu código. README vago = ninguém consegue.

</v-click>

<AdminOnly>

1 computador por dupla. Não ajude com a lógica — só erros de digitação. Registre quem conseguiu: evidência de UC02-Ind.3 (produção técnica funcional).

</AdminOnly>

---
layout: default
bgPreset: default
card: true
---

<!-- SLIDE 16 -->

## Dicionário Pessoal — entrega final do sprint

Último dia do sprint UC02.

<v-click>

<SlideTable compact>

| Dia | Atividade | Meta |
|---|---|---|
| Thu (A31) | Doc Hunter + Error Detective | 8 termos |
| Fri (A32) | Comment Engineer + Passa o Código | 13 termos |
| Sat (A33) | Mini README + Compilação Real | **15 termos** |

</SlideTable>

</v-click>

<v-click>

**Entrega:** dicionário manuscrito com **mínimo 15 termos** + README escrito.

</v-click>

<v-click>

> Esse dicionário continua. Toda aula de UC02 e UC05 vai adicionar termos até o fim do T2.

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

- A31: Doc Hunter + Error Detective → vocabulário real de docs e tracebacks
- A32: Comment Engineer + Passa o Código → documentação de função em inglês
- A33: Mini README + Compilação Real → README testado por outra pessoa

**Aula 33 concluída:**

- UC05: `list` · `tuple` · `set` · `dict` — comparados, escolhidos, codados no papel
- UC02: Mini README em inglês + Compilação Real validada

**Próxima semana (A34 — 18/06):**
- UC07: Transformação Digital
- UC01: Fundamentos de Computação
