---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 29"
author: Leonardo Zanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 29"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-05-29"
unlockHour: 13
---


<!-- SLIDE 1 -->

# Aula 29
## Python: Tuple + UC03: Lógica na Prática

**UC05 - Python para IA** · Dict review + Tuple estreia
**UC03 - Fundamentos Matemáticos** · Tabela verdade + if aninhado

> 29 de maio de 2026 · 5 HA

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
aulaNum: "Aula 29"
---

<!-- SLIDE 2 -->

# BLOCO 1
## UC05 - Python para IA
### Dict Review Rápido

Ind. 2 - Tipos compostos: revisão de dict antes de avançar

---
layout: brainstorm
bgPreset: palette
pulse: true
aulaNum: "Aula 29"
---

<!-- SLIDE 3 -->

# Revisão relâmpago: dict

Na A26 vimos dict. Vamos confirmar o que ficou:

- O que é uma chave e o que é um valor?
- Como você acessa o valor de uma chave?
- Como você adiciona uma nova entrada no dicionário?

> Quem responde ganha o direito de digitar o código no projetor.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 29"
---

<!-- SLIDE 4 -->

<!-- objetivo: aluno consolida acesso, atualização e inserção em dict antes de avançar para tuple (UC05 Ind.2) -->

# Dict - exercício direto (15 min)

Dado o dicionário abaixo:

```python
alunos = {
    "Ana": 8.5,
    "João": 6.0,
    "Bia": 9.2
}
```

Faça 3 coisas:

1. Acesse a nota de **Ana**
2. Atualize a nota de **João** para `7.5`
3. Adicione um novo aluno: **"Pedro"** com nota **8.0**

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 29"
---

<!-- SLIDE 5 -->

<!-- objetivo: aluno vê o gabarito do exercício de dict e confirma a sintaxe antes de seguir para tuple -->

# Dict - gabarito

```python
alunos = {"Ana": 8.5, "João": 6.0, "Bia": 9.2}

# 1. Acessar nota de Ana
print(alunos["Ana"])      # 8.5

# 2. Atualizar nota de João
alunos["João"] = 7.5

# 3. Adicionar Pedro
alunos["Pedro"] = 8.0

print(alunos)
```

<MLToast title="DICA">
  Para acessar: colchetes com a chave. Para atualizar ou adicionar: atribuição direta.
</MLToast>

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
aulaNum: "Aula 29"
---

<!-- SLIDE 6 -->

# BLOCO 2
## UC05 - Python para IA
### Tuple: estreia

Ind. 2 - Tipos compostos: tuple (imutável)

---
layout: brainstorm
bgPreset: palette
pulse: true
aulaNum: "Aula 29"
---

<!-- SLIDE 7 -->

# Os quatro tipos compostos do Python

Existem quatro tipos para guardar coleções de dados. Você já conheceu alguns:

- **list** - uma lista que pode mudar
- **dict** - pares de chave e valor
- **tuple** - uma lista que não pode mudar (hoje!)
- **set** - conjunto sem repetição (proximas aulas)

> Hoje o foco é **tuple**. Os outros você já conhece ou vai conhecer em breve.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 29"
---

<!-- SLIDE 8 -->

<!-- objetivo: aluno vê o panorama dos 4 tipos compostos com 1 linha cada antes de focar em tuple (Panorama dos Vizinhos) -->

# Panorama dos Vizinhos

```python
# Os quatro tipos - só para reconhecer que existem
lista    = [1, 2, 3]           # list   - pode mudar
dicio    = {"nome": "Ana"}     # dict   - chave:valor
tupla    = (1, 2, 3)           # tuple  - NÃO pode mudar (hoje)
conjunto = {1, 2, 3}           # set    - sem repetição (depois)
```

Repare: list usa `[ ]`, dict usa `{ }`, tuple usa `( )`, set usa `{ }` mas sem chave.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 29"
---

<!-- SLIDE 9 -->

<!-- objetivo: aluno entende o conceito de imutabilidade de tuple com analogia cotidiana -->

# Tuple é como um CPF

Quando você nasceu, recebeu um CPF. Esse número nunca muda - é **imutável**.

**Tuple funciona assim:** você cria com os valores e eles ficam travados para sempre.

```python
meu_cpf = ("123", "456", "789", "00")
# Não dá pra mudar um CPF depois de criado
```

Use tuple quando os dados **não devem mudar**: coordenadas, datas, configurações fixas.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 29"
---

<!-- SLIDE 10 -->

<!-- objetivo: aluno aprende sintaxe básica de tuple: criar, acessar por índice, comprimento -->

# Tuple - sintaxe básica

```python
# Criar uma tuple
cores = ("vermelho", "verde", "azul")

# Acessar por índice (igual à list)
print(cores[0])   # vermelho
print(cores[1])   # verde
print(cores[-1])  # azul (último)

# Comprimento
print(len(cores))  # 3
```

Acesso por índice é **igual ao de list**. A diferença está na imutabilidade.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 29"
---

<!-- SLIDE 11 -->

<!-- objetivo: aluno confirma que tuple é imutável tentando alterar um elemento -->

# Por que imutável?

```python
cores = ("vermelho", "verde", "azul")

# Isso dá ERRO:
cores[0] = "amarelo"
# TypeError: 'tuple' object does not support item assignment
```

Isso é uma proteção. Se você precisa de dados que **nunca devem ser alterados por acidente**, use tuple.

<MLToast title="QUANDO USAR">
  Coordenadas GPS, dimensões de imagem, constantes de configuração - qualquer coisa que não deve mudar.
</MLToast>

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 29"
---

<!-- SLIDE 12 -->

<!-- objetivo: aluno aprende os métodos .count() e .index() de tuple -->

# Tuple - dois métodos úteis

```python
notas = (8, 7, 9, 7, 10, 7)

# .count() - quantas vezes um valor aparece
print(notas.count(7))    # 3

# .index() - em qual posição está o primeiro valor
print(notas.index(9))    # 2
```

Tuple tem poucos métodos justamente porque ela não pode ser modificada.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 29"
---

<!-- SLIDE 13 -->

<!-- objetivo: aluno pratica tuple em contexto real - coordenadas GPS do Parque Tecnológico de Pato Branco -->

# Exercício: coordenadas do Parque Tecnológico

O Parque Tecnológico de Pato Branco fica em:
**Latitude:** -26.2226 · **Longitude:** -52.6716

Crie uma tuple com as coordenadas e responda:

1. Guarde latitude e longitude em uma tuple chamada `parque_tech`
2. Acesse e imprima a latitude
3. Acesse e imprima a longitude
4. Tente alterar a latitude - o que acontece?

> Coordenadas GPS são um exemplo perfeito de tuple: nunca devem mudar.

---
layout: default
bgPreset: default
card: false
aulaNum: "Aula 29"
---

<!-- SLIDE 13a -->

<!-- objetivo: gabarito do exercício de coordenadas GPS -->

# Exercício - gabarito

```python
parque_tech = (-26.2226, -52.6716)

# Acessar latitude
print(parque_tech[0])   # -26.2226

# Acessar longitude
print(parque_tech[1])   # -52.6716

# Tentar alterar - dá erro
parque_tech[0] = 0      # TypeError!
```

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
aulaNum: "Aula 29"
---

<!-- SLIDE 14 -->

# BLOCO 3
## UC03 - Fundamentos Matemáticos
### Lógica Matemática na Prática

Ind. 2 - Tabela verdade + if aninhado

---
layout: brainstorm
bgPreset: palette
pulse: true
aulaNum: "Aula 29"
---

<!-- SLIDE 15 -->

# Revisão oral: and, or, not

Quem lembra o que é `and`, `or` e `not`?

- Me dê um exemplo de `and` com palavras do dia a dia
- Me dê um exemplo de `or`
- O que `not` faz com um valor verdadeiro?

> Quem responder vai montar a tabela verdade no quadro.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 29"
---

<!-- SLIDE 16 -->

<!-- objetivo: aluno registra visualmente a tabela verdade de AND e OR como referência -->

# Tabela verdade - registro visual

<SlideTable fullWidth>

| A | B | A and B | A or B | not A |
|---|---|---|---|---|
| True | True | True | True | False |
| True | False | False | True | False |
| False | True | False | True | True |
| False | False | False | False | True |

</SlideTable>

> Guarde no caderno - você vai usar isso durante toda a aula.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 29"
---

<!-- SLIDE 17 -->

<!-- objetivo: aluno aplica and/or em condições reais de Python antes de montar exercício completo (UC03 Ind.2) -->

# Tabela verdade em Python

```python
tem_ingresso = True
maior_de_18  = False

# and: as duas precisam ser verdadeiras
pode_entrar = tem_ingresso and maior_de_18
print(pode_entrar)   # False

# or: pelo menos uma precisa ser verdadeira
pode_tentar = tem_ingresso or maior_de_18
print(pode_tentar)   # True
```

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 29"
---

<!-- SLIDE 18 -->

<!-- objetivo: aluno constrói condição composta com and em contexto escolar real -->

# Exercício: aprovado ou não?

Um aluno é aprovado se **nota >= 7 AND presença >= 75%**.

Monte a condição completa em Python:

```python
nota     = float(input("Nota: "))
presenca = float(input("Presenca (%): "))

# Escreva a condição aqui
if ___________:
    print("Aprovado!")
else:
    print("Reprovado.")
```

Qual é a condição que vai dentro do `if`?

---
layout: default
bgPreset: default
card: false
aulaNum: "Aula 29"
---

<!-- SLIDE 18a -->

<!-- objetivo: gabarito do exercício de aprovação com and -->

# Exercício - gabarito

```python
nota     = float(input("Nota: "))
presenca = float(input("Presenca (%): "))

if nota >= 7 and presenca >= 75:
    print("Aprovado!")
else:
    print("Reprovado.")
```

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
aulaNum: "Aula 29"
---

<!-- SLIDE 19 -->

# BLOCO 4
## UC03 - Fundamentos Matemáticos
### if dentro de if (nested if)

---
layout: brainstorm
bgPreset: palette
pulse: true
aulaNum: "Aula 29"
---

<!-- SLIDE 20 -->

# A porta dentro da porta

Imagine que para entrar em um show você passa por duas portas:

1. **Primeira porta:** tem ingresso?
2. **Segunda porta (só se passou pela primeira):** tem mais de 18 anos?

Você só chega na segunda porta se passou pela primeira.

> Isso é um `if` dentro de outro `if`. Em programação chamamos de **nested if** (if aninhado).

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 29"
---

<!-- SLIDE 21 -->

<!-- objetivo: aluno vê a estrutura de nested if com indentação clara (UC03 Ind.2) -->

# Nested if - estrutura

```python
tem_ingresso = True
idade = 16

if tem_ingresso:
    print("Passou pela primeira porta")
    if idade >= 18:
        print("Pode entrar!")
    else:
        print("Menor de idade - nao pode entrar.")
else:
    print("Sem ingresso - nem chega na segunda porta.")
```

Repare na **indentação dupla** do `if` interno.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 29"
---

<!-- SLIDE 22 -->

<!-- objetivo: aluno pratica nested if em contexto escolar: aprovado / recuperação / reprovado -->

# Exercício: aprovado, recuperação ou reprovado?

Regra da escola:
- Nota >= 7: **Aprovado**
- Nota >= 5 (e < 7): **Recuperação**
- Nota < 5: **Reprovado**

> Complete o `if` aninhado no próximo slide.

---
layout: default
bgPreset: default
card: false
aulaNum: "Aula 29"
---

<!-- SLIDE 22b -->

# Exercício - starter code

```python
nota = float(input("Nota: "))

if nota >= 7:
    print("Aprovado")
else:
    if ___:
        print("Recuperacao")
    else:
        print("Reprovado")
```

---
layout: default
bgPreset: default
card: false
aulaNum: "Aula 29"
---

<!-- SLIDE 22a -->

<!-- objetivo: gabarito do exercício de aprovado/recuperação/reprovado com nested if -->

# Exercício - gabarito

```python
nota = float(input("Nota: "))

if nota >= 7:
    print("Aprovado")
else:
    if nota >= 5:
        print("Recuperacao")
    else:
        print("Reprovado")
```

<MLToast title="CURIOSIDADE">
  Esse mesmo código poderia usar elif. Mas entender o nested if primeiro ajuda a ver como o Python realmente pensa.
</MLToast>

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 29"
---

<!-- SLIDE 23 -->

<!-- objetivo: aluno conecta nested if com elif e entende quando usar cada um -->

# Nested if vs. elif

Os dois fazem a mesma coisa, mas `elif` é mais limpo.

Com **nested if** (o que aprendemos):

```python
if nota >= 7:
    print("Aprovado")
else:
    if nota >= 5:
        print("Recuperacao")
    else:
        print("Reprovado")
```

---
layout: default
bgPreset: default
card: false
aulaNum: "Aula 29"
---

<!-- SLIDE 23b -->

# Nested if vs. elif (cont.)

Com **elif** (mais direto, menos indentação):

```python
if nota >= 7:
    print("Aprovado")
elif nota >= 5:
    print("Recuperacao")
else:
    print("Reprovado")
```

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 29"
---

<!-- SLIDE 24 -->

# Tarefa de Casa - Aula 29

**Prazo:** próxima aula (02/06/2026)

Escreva um programa que verifique se um aluno pode fazer recuperação.

Regras:
- Nota entre 4 e 6.9 **E** presença >= 60%: pode fazer recuperação
- Nota < 4: reprovado direto
- Nota >= 7: aprovado

---
layout: default
bgPreset: default
card: false
aulaNum: "Aula 29"
---

<!-- SLIDE 24a -->

# Tarefa de Casa (cont.)

Use nested if (ou elif) e `and` para montar as condições.

```python
nota     = float(input("Nota: "))
presenca = float(input("Presenca (%): "))

# monte a lógica aqui
```

---
layout: end
bgPreset: palette
github: LeoZanini
avatar: https://github.com/LeoZanini.png?size=256
aulaNum: "Aula 29"
---

<!-- SLIDE 25 -->

# Até a próxima!

**Aula 29 - Concluída**

**O que fizemos hoje:**
- Dict review: acesso, atualização e inserção (UC05)
- Tuple: imutabilidade, acesso por índice, .count(), .index() (UC05)
- Tabela verdade na prática em Python: and, or, not (UC03)
- if aninhado (nested if): estrutura + exercício aprovado/recuperação/reprovado (UC03)
