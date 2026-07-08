---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 40"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 40"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-07-09"
layout: cover
---

<!-- SLIDE 1 -->
<!-- objetivo: aluno se situa no fio condutor do dia antes de qualquer conteúdo -->

# Aula 40
## O Roubo da Coroa: 29 suspeitos, 1 coroa roubada

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 2 -->
<!-- objetivo: aluno entende a estrutura do bloco antes de começar -->

# Bloco 1
## Inglês: O Roubo da Coroa

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 3 -->
<!-- objetivo: ativar raciocínio sobre álibi e evidência antes de entrar no vocabulário técnico -->

# A Coroa Real foi roubada do Museu
## Você é um dos 29 suspeitos

- Você estava em algum lugar na hora do sumiço. Como provar isso?
- O que alguém precisaria saber sobre você para te tirar (ou não) da lista de suspeitos?

> Guarde sua resposta: é exatamente o que um banco de dados de investigação registra.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 4 -->
<!-- objetivo: aluno entende que existe um registro oficial e que hoje ele vai aprender a linguagem usada para escrever nesse registro -->

# O caso: o Museu, hoje de manhã

- A Coroa Real foi roubada do Museu
- Existe um arquivo oficial com **29 suspeitos**: um é você, os outros são seus colegas
- Esse arquivo já existe pronto - é ele que a turma vai usar em Python (hoje) e SQL (amanhã)
- Hoje a missão não é resolver o caso. É aprender a **língua** que esse arquivo usa para registrar cada suspeito - e ela está em inglês

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 5 -->
<!-- objetivo: aluno entende a mecânica da atividade antes de receber os cartões -->

# As peças que faltam

- Você vai receber **2 cartões**: um **Case File** (sua história de suspeito, em português) e um **Schema Card** (1 regra de formato, em inglês)
- No seu Case File, invente também um **codinome de ladrão** - é só para diversão, sem gabarito
- Só existem **4 regras** no total: `alibi_location`, `motive`, `tool`, `has_witness`. Você já chega sabendo 1 delas
- Circule e troque informação: no máximo **2 a 3 conversas** bastam para completar as 4

---
layout: default
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 6 -->
<!-- objetivo: aluno participa da dinâmica de circulação para coletar as 5 regras de schema -->

# Dinâmica: colete as 4 regras

**Tempo: 5 a 10 minutos**

1. Circule e converse com quem tem uma regra diferente da sua
2. Para cada regra encontrada, anote no caderno: **column** (nome da coluna) + **datatype** (tipo de dado) + **format** (formato exigido)
3. Você termina quando tiver as 4 regras completas:

---
layout: default
card: true
bgPreset: palette
pulse: false
---

<!-- SLIDE 7 -->
<!-- objetivo: aluno visualiza as 4 colunas que compõem as regras a coletar na dinâmica -->

# Dinâmica: colete as 4 regras (cont.)

<SlideTable compact>

| # | Column |
|---|---|
| 1 | alibi_location |
| 2 | motive |
| 3 | tool |
| 4 | has_witness |

</SlideTable>

> Ninguém senta até ter as 4 anotadas.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 8 -->
<!-- objetivo: aluno continua a dinâmica aplicando as 5 regras coletadas ao próprio cartão -->

# Dinâmica (continuação): reescreva seu cartão

Agora que você tem as 4 regras, pegue o **seu** Case File (em português) e reescreva no formato:

`suspect_id,alibi_location,motive,tool,has_witness`

**Exemplo, Suspeito #2:** "Você estava na Loja de Lembranças do museu. Motivo: precisa pagar uma dívida. Foi visto com uma mala de lona grande. Um funcionário confirma seu álibi."

<AdminOnly>

> Formato correto: `2,gift_shop,debt,duffel_bag,True`

</AdminOnly>

Cole a versão formatada no caderno. O professor vai circular conferindo.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 9 -->
<!-- objetivo: aluno consolida formalmente o vocabulário de schema descoberto na prática -->

# O schema completo, formalizado

<SlideTable>

| column | datatype | format |
|---|---|---|
| suspect_id | integer | whole number, no letters |
| alibi_location | string | lowercase, "_" instead of space |
| motive | string | lowercase, "_" instead of space |
| tool | string | lowercase, "_" instead of space |
| has_witness | boolean | True or False, capitalized, no quotes |

</SlideTable>

`column` = nome da coluna · `datatype` = tipo de dado · `string` = texto · `integer` = número inteiro · `boolean` = verdadeiro/falso · `format` = formato exigido · `lowercase` = tudo minúsculo

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 10 -->
<!-- objetivo: aluno pratica classificar datatype e format de valores soltos -->

# Exercício: identifique o datatype

**Exercício:** para cada valor abaixo, diga se o `datatype` é `integer`, `string` ou `boolean`, e se o `format` está correto:

1. `29`
2. `Quadra de Esportes`
3. `true`

<AdminOnly>

> **Gabarito:**
> 1. `integer` - correto
> 2. `string`, mas errado: devia ser `quadra_de_esportes` (lowercase, "_" no lugar do espaço)
> 3. `boolean`, mas errado: devia ser `True` (capitalizado, sem aspas)

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 11 -->
<!-- objetivo: aluno entende o motivo de usar uma biblioteca pronta em vez de processar dados na mão -->

# Novo vocabulário: import e library

- `import` = "trazer uma ferramenta pronta para o seu código"
- `library` = "caixa de ferramentas pronta", feita por outra pessoa, que você importa

Hoje vocês formataram **1 suspeito cada, na mão**. Existe uma `library` (o pandas) que processa os **29 suspeitos de uma vez, automaticamente**.

> À tarde vocês vão importar essa `library` de verdade: `import pandas as pd`

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 12 -->
<!-- objetivo: debate de fechamento conectando escala do vocabulário de schema com a necessidade de automação -->

# Debate: e se fossem 29 mil suspeitos?

- Hoje vocês formataram 1 cartão cada, na mão. Levou uns minutos.
- Um banco de dados de verdade pode ter milhares (ou milhões) de registros.
- Dá pra formatar cada um na mão? O que muda quando é `import pandas` fazendo isso?

> Conexão: é exatamente esse "fazer para todos de uma vez" que vocês vão ver com `groupby`, depois do intervalo.

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 13 -->
<!-- objetivo: transição de bloco, aluno se situa no que vem a seguir -->

# Bloco 2
## Python: fechando a investigação com groupby

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 14 -->
<!-- objetivo: ativar raciocínio sobre agrupamento de dados antes da sintaxe -->

# Como vocês organizariam 29 fichas?

- Imagine as 29 fichas de suspeito, uma por aluno, empilhadas na sua mesa
- Você quer saber: quantos suspeitos foram vistos com cada objeto suspeito?
- Você conta ficha por ficha, ou existe um jeito mais rápido?

> Hoje esse "jeito mais rápido" tem nome: `groupby`.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 15 -->
<!-- objetivo: recapitular import e read_csv já consolidados antes de introduzir groupby -->

# O dataset da investigação

```python
import pandas as pd

df = pd.read_csv("gabarito_suspeitos.csv")
df.head(3)
```

29 linhas: uma por suspeito, no mesmo formato que a turma acabou de aprender de manhã.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 16 -->
<!-- objetivo: exercício de leitura N0 - aluno interpreta o dataset real antes de qualquer código novo -->

# Leia a tabela: as primeiras linhas

<SlideTable compact>

| suspect_id | alibi_location | motive | tool | has_witness |
|---|---|---|---|---|
| 1 | security_room | revenge | master_key | False |
| 2 | gift_shop | debt | duffel_bag | True |
| 3 | wine_cellar | fame | rope_ladder | False |

</SlideTable>

**Exercício:** olhando só essa tabela, quantos suspeitos foram vistos com uma `master_key`, e algum deles tem testemunha (`has_witness = True`)?

<AdminOnly>

> **Gabarito:** nessas 3 linhas, só o suspeito 1 foi visto com `master_key`, e ele não tem testemunha (`False`). Para saber o total nas 29 linhas, precisa de `groupby` - é o que vem a seguir.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 17 -->
<!-- objetivo: aluno entende a ideia de groupby por analogia antes da sintaxe -->

# Novo conceito: groupby

É como separar as 29 fichas em pilhas, uma pilha por valor da coluna escolhida, e depois contar cada pilha - tudo de uma vez, sem passar ficha por ficha.

```python
df.groupby('coluna_para_separar_pilhas')
```

Você escolhe a coluna que vira "pilha", e depois diz o que fazer com cada pilha: contar? somar? média?

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 18 -->
<!-- objetivo: exercício N0 de leitura - aluno interpreta o resultado de um groupby já pronto, rodado pelo professor -->

# N0 - Leia o resultado

O professor roda ao vivo:

```python
df.groupby('has_witness')['motive'].count()

# saída:
# has_witness
# False    18
# True     11
# Name: motive, dtype: int64
```

**Exercício:** o que essa linha de código está contando? O que significam os números 18 e 11?

<AdminOnly>

> **Gabarito:** conta quantos suspeitos têm `has_witness = False` (18) e quantos têm `has_witness = True` (11). A coluna `motive` só é usada para contar - o resultado seria igual com qualquer outra coluna no lugar dela.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 19 -->
<!-- objetivo: exercício N1 - completar lacunas em código de groupby -->

# N1 - Complete o código

**Exercício:** complete o código para descobrir quantos suspeitos foram vistos com cada objeto suspeito (`tool`):

```python
df.groupby('___')['___'].count()
```

<AdminOnly>

> **Gabarito:** `df.groupby('tool')['motive'].count()` (ou `df.groupby('tool').size()`)

</AdminOnly>

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 20 -->
<!-- objetivo: aluno confere o resultado real do groupby que acabou de escrever, celebrando o fechamento do Tópico 14 -->

# O resultado bate?

```
tool
duffel_bag        4
grappling_hook    4
lockpick_kit      4
master_key        5
rope_ladder       4
silk_gloves       4
smoke_bomb        4
Name: motive, dtype: int64
```

`master_key` aparece em **5 das 29 linhas** - o único item com mais de 4 suspeitos. É o grupo mais numeroso do dataset inteiro.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 21 -->
<!-- objetivo: exercício N2 - escrita guiada com pergunta nova, reaproveitando filtragem já consolidada -->

# N2 - Escreva sua própria consulta

**Exercício:** quantos suspeitos por `alibi_location` **não têm testemunha** (`has_witness == False`)?

Starter code:

```python
sem_testemunha = df[df['has_witness'] == ___]
sem_testemunha.groupby('___').size()
```

<AdminOnly>

> **Gabarito:**
> - `sem_testemunha = df[df['has_witness'] == False]`
> - `sem_testemunha.groupby('alibi_location').size()`

</AdminOnly>

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 22 -->
<!-- objetivo: fechamento narrativo da investigação, celebrando o fechamento do Tópico 14 do Plano Anual -->

# A investigação aponta um lugar

```
alibi_location
east_wing        4
garden           2
gift_shop        3
parking_lot      3
security_room    1
staff_lounge     3
wine_cellar      2
Name: motive, dtype: int64
```

**East Wing** (a ala onde a coroa estava exposta) é o local com mais suspeitos sem testemunha: 4. E é lá que suspeitos foram vistos com uma `master_key`.

Com `groupby`, a turma acaba de fechar o último tópico de pandas do ano.

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 23 -->
<!-- objetivo: debate de fechamento reforçando o valor do groupby vetorizado sem antecipar conteúdo de GPU/SIMD -->

# Debate: por que não usar um for?

- Vocês poderiam escrever um `for` que passa por cada um dos 29 suspeitos, um de cada vez, contando na mão
- `groupby` faz a mesma coisa, só que processando todos ao mesmo tempo
- Com 29 linhas, quase não faz diferença. Com 29 milhões?

> Amanhã (A41) a mesma tabela sobe pro SQL, com `GROUP BY` e `HAVING`, para continuar a investigação.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 24 -->
<!-- tarefa de casa: aula 40 -->

# Tarefa de Casa: Aula 40

> **Prazo: início da próxima aula (A41, 10/07)**

1. No caderno, escreva à mão (sem digitar) **uma pergunta nova** sobre os suspeitos que o `groupby` de hoje ainda não respondeu (ex: "quantos suspeitos por motivo têm testemunha?")
2. Junto da pergunta, escreva a linha de código Python que você usaria para responder, no formato `df.groupby('___')['___'].count()`

Traga o caderno amanhã: essa mesma pergunta vira uma consulta SQL na aula de banco de dados.

---
layout: end
bgPreset: palette
---

<!-- SLIDE 25 -->
<!-- objetivo: aluno reconhece o percurso completo do dia e a ponte para a próxima aula -->

# Fim da Aula 40

<ul class="mt-4 space-y-3 text-left text-lg">
  <li v-click>Decodificaram um schema em inglês (column, datatype, string, integer, boolean, format, lowercase) só circulando e trocando informação</li>
  <li v-click>Reformataram um registro real, no formato certo, sem inventar dado nenhum</li>
  <li v-click>Fecharam o último tópico de pandas do ano: groupby, sobre o próprio dataset da turma</li>
  <li v-click>Descobriram que a East Wing (a ala leste do museu) concentra os suspeitos sem álibi confirmado</li>
</ul>

<p v-click class="text-green-400 font-bold text-xl mt-6">Amanhã a investigação continua no SQL.</p>
