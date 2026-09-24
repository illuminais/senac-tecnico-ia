---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 59"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 59"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-09-25"
unlockHour: 13
layout: cover
---

<!-- SLIDE 1: Capa -->

# Aula 59
## Plantão da Vigilância, dia 1: consultas

**Banco de Dados (UC08)** · Épico 2, dia 1 de 5

**Indicador 5:** cria e manipula consultas SQL de forma adequada para resolução de problemas

25 de setembro de 2026 · 6 horas-aula

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 2: Onde estamos -->

<!-- objetivo: aluno sabe o que cada um dos 5 dias do épico pede e quando é avaliado -->

# Onde estamos

<SlideTable compact>

| Dia | O que você faz no seu banco | Avaliação | |
|---|---|---|---|
| **25/09** | **consultas: perguntar e conferir** | | **você está aqui** |
| 01/10 | consultas que juntam duas tabelas | **Indicador 5**, nas 2 últimas horas-aula | |
| 02/10 | decidir quem pode ver o quê no banco | | |
| 08/10 | guardar uma cópia do banco e recuperar | **Indicadores 4 e 6**, nas 2 últimas horas-aula | |
| 09/10 | recuperação e segunda chamada | | |

</SlideTable>

O banco é o mesmo nos 5 dias: o `dengue_NN`, um por aluno, no computador do professor.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 3: Como usar este material -->

<!-- objetivo: aluno conhece as convenções do deck antes de precisar delas -->

# Como usar este material

- `Texto nesta letra` é o que você digita no DBeaver, letra por letra, com os mesmos acentos.
- **Preveja:** escreva na ficha o que você espera ver (quantas linhas, qual número) **antes** de rodar.
- **Confira:** diz onde está o número oficial. As tabelas T1, T2 e T3 estão impressas na sua mesa.
- **Antes e depois:** nos slides de comando, a caixa de baixo mostra a tabela antes do comando e o que o banco devolve. Tabela grande aparece em parte, e o título diz quantas linhas ela tem.
- **NN** é o seu número da chamada, com dois dígitos. O número 3 usa `03`.
- O DBeaver mostra número sem ponto de milhar: `6614` é 6.614.
- O gabarito de cada pergunta aparece no próprio slide a partir das 13h de 25/09.

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 4: Divisor bloco 1 -->

# BLOCO 1: ABERTURA DO PLANTÃO

## Sem computador: monitor desligado

<!--
Professor: bloco curto, uns 30 minutos. Os 20 minutos que sobram vão para o SQL humano (bloco 2),
que é o que mais corre risco de estourar. Entregar a ficha (página 1) logo no começo.
-->

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 5: Você é o analista de plantão -->

<!-- objetivo: aluno entende o cenário do dia, o banco individual e o período coberto pelos dados -->

# Você é o analista de plantão

Você trabalha na vigilância de dengue do Paraná. O banco `dengue_NN` guarda os casos de 17 municípios, mês a mês, em 2024 e 2025. Ele é só seu.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 5x: Você é o analista de plantão (cont.) -->

<!-- objetivo: aluno conhece as 5 perguntas do chamado e como cada número vira registro na ficha -->

# Você é o analista de plantão (cont.)

**O chamado de hoje.** A secretária de saúde quer 5 números até o fim do plantão:

1. Quantos casos Londrina teve em março de 2025?
2. Quantos casos Londrina teve em 2025 inteiro?
3. Quantos casos cada macrorregional (as 4 regiões de saúde: Leste, Noroeste, Norte e Oeste) teve em 2025?
4. Quais os 5 municípios com mais casos em 2025?
5. Em que mês de 2025 houve mais casos?

Cada número vai para a ficha junto com a consulta que o gerou e com o lugar onde você o conferiu.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 6: A ficha do plantão -->

<!-- objetivo: aluno sabe preencher a página 1 da ficha e para que ela serve -->

# A ficha do plantão

Você recebe uma folha: a **página 1 da ficha do plantão**. Escreva no alto o seu nome e o seu número da chamada (é o NN do seu login).

Para cada uma das 5 perguntas, a ficha tem cinco campos: **minha previsão**, **a consulta que escrevi**, **o número do banco**, **onde conferi** e **bateu?**.

A previsão vem primeiro, com o monitor desligado. Se ela não bater com o banco, não apague: escreva ao lado o que o banco devolveu e por que você acha que foi diferente.

No fim do dia a ficha fica com o professor e volta para você em 01/10, quando ganha a página 2. Na avaliação de 01/10, ela mostra como você chegou em cada número.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 7: Uma linha da tabela casos_dengue -->

<!-- objetivo: aluno lê uma linha da tabela em português e identifica as colunas de identificação -->

# Uma linha da tabela `casos_dengue`

Em voz alta: *"Em janeiro de 2024, Apucarana, da macrorregional Norte, teve 5.603 casos prováveis de dengue."*

<SlideTable compact>

| Coluna | Nesta linha | O que guarda |
|---|---|---|
| `codigo_ibge` | 4101408 | o número oficial do município no IBGE |
| `municipio` | Apucarana | o nome do município, com acento |
| `macrorregional` | Norte | a região de saúde: Leste, Noroeste, Norte ou Oeste |
| `ano` | 2024 | 2024 ou 2025 |

</SlideTable>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 7x: Uma linha da tabela casos_dengue (cont.) -->

<!-- objetivo: aluno completa a leitura das colunas da tabela casos_dengue e conhece a fonte do dado -->

# Uma linha da tabela `casos_dengue` (cont.)

<SlideTable compact>

| Coluna | Nesta linha | O que guarda |
|---|---|---|
| `mes` | 1 | o mês em número: 1 é janeiro, 3 é março, 12 é dezembro |
| `data_referencia` | 2024-01-01 | o primeiro dia daquele mês, no formato ano-mês-dia |
| `casos` | 5603 | casos prováveis: notificações de dengue que nenhum exame descartou |

</SlideTable>

Fonte: InfoDengue (Fiocruz e FGV), o dado que a turma limpou em Fundamentos de Computação.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 8: Preveja, quantas linhas -->

<!-- objetivo: aluno faz a primeira previsão do dia, conferida no bloco 3 com count(*) -->

# Preveja na ficha: quantas linhas tem a tabela?

Cada linha da `casos_dengue` é **um município em um mês de um ano**, como a linha de Apucarana em janeiro de 2024.

- São 17 municípios.
- Cada município tem 12 meses.
- Os meses vêm de 2 anos: 2024 e 2025.

Escreva na ficha, no campo **linhas da tabela**, quantas linhas você acha que a `casos_dengue` tem, e a conta que fez.

A conferência é no bloco 3, já no computador, com o banco contando as linhas.

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 9: Divisor bloco 2 -->

# BLOCO 2: SQL HUMANO

## De pé, sem computador: cada um é uma linha da tabela

<!--
Professor: marcar os 4 cantos da sala com folhas: Leste, Noroeste, Norte, Oeste.
34 cartões para 30 alunos: 4 alunos ficam com dois cartões, março e abril do MESMO município
(ficam na mesma macrorregional na rodada 5). Ou o professor segura os 4 que sobram.
Plano B, se a sala não comportar todo mundo de pé: cartões na mesa, grupos de 5,
e cada rodada vira "separem os cartões".
-->

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 10: O que é uma consulta -->

<!-- objetivo: aluno define consulta como pergunta num idioma do banco (SQL), que sempre devolve uma tabela -->

# Uma consulta é uma pergunta que o banco entende

**Consulta** é uma pergunta escrita num idioma que o banco de dados entende. Em inglês se diz *query*. O idioma se chama **SQL** (do inglês *Structured Query Language*, linguagem estruturada de consulta).

O banco lê a consulta, procura na tabela e **devolve sempre uma tabela**, mesmo quando a resposta é um número só: uma tabela de 1 linha e 1 coluna.

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 10x: Uma consulta é uma pergunta que o banco entende (cont.) -->

<!-- objetivo: aluno vê um exemplo concreto de consulta e sabe que hoje ele escreve perguntas assim -->

# Uma consulta é uma pergunta que o banco entende (cont.)

**Exemplo.** A pergunta "Quantos casos Apucarana teve em janeiro de 2024?", escrita em SQL, faz o banco olhar as 408 linhas e devolver isto:

```text
casos
------
 5603
```

Hoje você escreve essas perguntas, primeiro com o corpo e depois no DBeaver.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 11: Como funciona o SQL humano -->

<!-- objetivo: aluno entende que o cartão é uma linha real do banco e a regra de agir só se o cartão cumpre o comando -->

# Como funciona o SQL humano

Cada um recebe um cartão. **Um cartão é uma linha real do seu banco**: são os 17 municípios em março e em abril de 2025, 34 cartões. O cartão de Curitiba em março é esta linha:

```text
 codigo_ibge | municipio | macrorregional | ano  | mes | data_referencia | casos
-------------+-----------+----------------+------+-----+-----------------+-------
     4106902 | Curitiba  | Leste          | 2025 |   3 | 2025-03-01      |  2070
```

Os 34 cartões juntos formam uma tabela, que aqui chamamos de `cartoes`. Ela existe só na sala.

**Regra:** a cada rodada vem um comando. Você age **só se o seu cartão cumpre o comando**. Quem tem dois cartões segura um em cada mão e levanta só a mão do cartão que cumpre.

Nos slides das rodadas, as grades mostram algumas linhas e só as colunas que a rodada usa.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 12: Rodada 1, SELECT * -->

<!-- objetivo: aluno entende SELECT (quais colunas) e FROM (qual tabela) com o cartão na mão -->

# Rodada 1 · `SELECT * FROM cartoes`: todo mundo lê

**O comando:** "Cada um lê o seu cartão em voz alta."

`FROM cartoes` diz **de qual tabela** vêm as linhas. `SELECT` diz **quais colunas** voltam, e o `*` quer dizer "todas as colunas". Sem mais nada, voltam as 34 linhas, cada uma com as 7 colunas.

::output::

<div class="antes-depois uma-coluna">
<div>

**Antes e depois são iguais** · 34 linhas (aparecem 6)

```text
 municipio | macrorregional | mes | casos
-----------+----------------+-----+-------
 Curitiba  | Leste          |   3 |  2070
 Curitiba  | Leste          |   4 |  1239
 Londrina  | Norte          |   3 |  6614
 Londrina  | Norte          |   4 |  5482
 Toledo    | Oeste          |   3 |  1844
 Toledo    | Oeste          |   4 |  1436
```

</div>
</div>

::note::

**Ordem em que o banco executa, até agora:** `FROM cartoes` → `SELECT *`

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 13: Rodada 2, WHERE -->

<!-- objetivo: aluno entende que WHERE testa cada linha e deixa só as que dão verdadeiro -->

# Rodada 2 · `WHERE mes = 3`: de pé, só março

**O comando:** "Fiquem de pé só os cartões de março."

`WHERE` testa uma condição **em cada linha, uma por uma**. A linha em que a condição é verdadeira fica no resultado; as outras saem (continuam na tabela, só não voltam). `mes = 3` é verdadeiro quando o mês do cartão é 3. O `SELECT` escolhe colunas; o `WHERE` escolhe linhas.

::output::

<div class="antes-depois">
<div>

**Antes** · 34 cartões (aparecem 6)

```text
municipio | mes | casos
----------+-----+-------
Curitiba  |   3 |  2070  ← fica
Curitiba  |   4 |  1239  ← sai
Londrina  |   3 |  6614  ← fica
Londrina  |   4 |  5482  ← sai
Toledo    |   3 |  1844  ← fica
Toledo    |   4 |  1436  ← sai
```

</div>
<div>

**Depois** · 17 de pé (aparecem 3)

```text
municipio | mes | casos
----------+-----+-------
Curitiba  |   3 |  2070
Londrina  |   3 |  6614
Toledo    |   3 |  1844
```

</div>
</div>

::note::

**Ordem em que o banco executa, até agora:** `FROM cartoes` → `WHERE mes = 3` → `SELECT *`

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 14: Rodada 3, AND -->

<!-- objetivo: aluno entende que AND exige as duas condições verdadeiras na mesma linha -->

# Rodada 3 · `AND`: março e Oeste

**O comando:** "De pé, só os cartões de março **e** da macrorregional Oeste."

`AND` junta duas condições. A linha fica só se **as duas** forem verdadeiras **no mesmo cartão**. Texto vai entre aspas simples: `WHERE mes = 3 AND macrorregional = 'Oeste'`. Ficam 5 pessoas de pé.

::output::

<div class="antes-depois">
<div>

**Antes** · 34 cartões (aparecem 4)

```text
municipio | macrorregional | mes
----------+----------------+-----
Cascavel  | Oeste          |   3  ← fica
Cascavel  | Oeste          |   4  ← sai
Londrina  | Norte          |   3  ← sai
Toledo    | Oeste          |   3  ← fica
```

</div>
<div>

**Depois** · 5 de pé (todas as linhas)

```text
municipio     | casos
--------------+-------
Cascavel          |  3421
Foz do Iguaçu     |  1278
Francisco Beltrão |   772
Pato Branco       |  1004
Toledo            |  1844
```

</div>
</div>

::note::

**Ordem em que o banco executa, até agora:** `FROM cartoes` → `WHERE mes = 3 AND macrorregional = 'Oeste'` → `SELECT *`

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 15: Rodada 4, Norte e Noroeste, o erro silencioso -->

<!-- objetivo: aluno vê o erro silencioso acontecer (AND contraditório) e entende por que a previsão pega o erro -->

# Rodada 4 · Norte **e** Noroeste: ninguém levanta

**O comando:** "De pé, quem é da macrorregional Norte **e** da Noroeste." No quadro: `WHERE macrorregional = 'Norte' AND macrorregional = 'Noroeste'`.

Cada cartão tem **uma** macrorregional. Nenhuma linha é Norte e Noroeste ao mesmo tempo, então o `AND` não deixa ninguém. O banco devolve uma tabela vazia e **nenhuma mensagem de erro**. Isso é um **erro silencioso**: a consulta roda e a resposta está errada. Só percebe quem tinha previsto que o Norte e o Noroeste têm casos.

::output::

<div class="antes-depois">
<div>

**Antes** · 34 cartões (aparecem 4)

```text
municipio | macrorregional
----------+----------------
Apucarana | Norte           ← sai
Londrina  | Norte           ← sai
Maringá   | Noroeste        ← sai
Umuarama  | Noroeste        ← sai
```

</div>
<div>

**Depois** · nenhuma linha

```text
municipio | macrorregional
----------+----------------
(nenhuma linha)
```

</div>
</div>

<!--
Professor: o estudo por trás do "prever antes de rodar" é Tucker, Wang, Son e Stigler (2024),
Learning and Instruction 91, 101871. Com 121 universitários sem experiência, quem previa a saída
aprendeu mais e reagiu melhor às mensagens de erro. Fica aqui, não no slide.
-->

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 16: Rodada 4 (cont.), OR e IN -->

<!-- objetivo: aluno escreve o "e" do português como OR ou IN -->

# Rodada 4 (cont.) · `OR` e `IN`: Norte **ou** Noroeste

**O comando:** "Agora, de pé quem é da Norte **ou** da Noroeste." Levantam 14 cartões: 7 municípios, março e abril.

`OR` (ou): a linha fica se **pelo menos uma** condição for verdadeira. `IN ('Norte', 'Noroeste')`: a linha fica se o valor estiver **na lista**. É o mesmo resultado do `OR`, escrito mais curto. Quando alguém pede "os casos do Norte e do Noroeste", em SQL isso é `IN`.

::output::

<div class="antes-depois">
<div>

**Antes** · 34 cartões (aparecem 4)

```text
municipio | macrorregional
----------+----------------
Curitiba  | Leste           ← sai
Londrina  | Norte           ← fica
Maringá   | Noroeste        ← fica
Toledo    | Oeste           ← sai
```

</div>
<div>

**Depois** · 14 de pé (aparecem 4)

```text
municipio    | macrorregional | mes
-------------+----------------+-----
Campo Mourão   | Noroeste       |   3
Maringá        | Noroeste       |   3
Joaquim Távora | Norte          |   4
Londrina       | Norte          |   4
```

</div>
</div>

::note::

**Ordem em que o banco executa, até agora:** `FROM cartoes` → `WHERE macrorregional IN ('Norte', 'Noroeste')` → `SELECT *`

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 17: Rodada 5, GROUP BY -->

<!-- objetivo: aluno entende GROUP BY como juntar em pilhas as linhas com o mesmo valor -->

# Rodada 5 · `GROUP BY macrorregional`: cada um no seu canto

**O comando:** "Só os cartões de março. Cada um vai para o canto da sua macrorregional."

`GROUP BY macrorregional` junta numa **pilha** as linhas que têm o mesmo valor na coluna `macrorregional`. As 17 linhas de março viram 4 pilhas: Leste com 5 cartões, Noroeste com 4, Norte com 3, Oeste com 5. No resultado, **cada pilha vira uma linha**. O que está dentro dela só aparece com um resumo, como a soma da rodada 6.

::output::

<div class="antes-depois">
<div>

**Antes** · 17 cartões de março (aparecem 5)

```text
municipio | macrorregional
----------+----------------
Apucarana | Norte           → canto Norte
Curitiba  | Leste           → canto Leste
Londrina  | Norte           → canto Norte
Maringá   | Noroeste        → canto Noroeste
Toledo    | Oeste           → canto Oeste
```

</div>
<div>

**Depois** · 4 pilhas, 4 linhas

```text
macrorregional
---------------
Leste
Noroeste
Norte
Oeste
```

</div>
</div>

::note::

**Ordem, até agora:** `FROM cartoes` → `WHERE mes = 3` → `GROUP BY macrorregional` → `SELECT macrorregional`

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 18: Rodada 6, SUM -->

<!-- objetivo: aluno entende SUM como função que junta várias linhas num número, uma soma por pilha -->

# Rodada 6 · `SUM(casos)`: cada canto soma

**O comando:** "Cada canto soma os casos dos seus cartões." Use a calculadora do celular.

`SUM(casos)` soma os valores da coluna `casos`. Com o `GROUP BY`, a soma é feita **dentro de cada pilha**, e cada pilha vira uma linha com o total. No canto Leste: 2.070 + 312 + 321 + 1.153 + 215 = **4.071**. Uma função que transforma várias linhas em um número só se chama **função de agregação**.

::output::

<div class="antes-depois">
<div>

**Antes** · a pilha Leste (5 cartões)

```text
municipio       | casos
----------------+-------
Curitiba             |  2070
Guarapuava           |   312
Paranaguá            |   321
Ponta Grossa         |  1153
São José dos Pinhais |   215
```

</div>
<div>

**Depois** · 4 pilhas, uma soma cada

```text
macrorregional |  sum
---------------+-------
Leste          |  4071
Noroeste       |  6553
Norte          | 10941
Oeste          |  8319
```

</div>
</div>

::note::

**Ordem, até agora:** `FROM cartoes` → `WHERE mes = 3` → `GROUP BY macrorregional` → `SELECT macrorregional, SUM(casos)`

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 19: Rodada 7, ORDER BY DESC -->

<!-- objetivo: aluno entende que ORDER BY só muda a ordem das linhas, e a diferença entre DESC e ASC -->

# Rodada 7 · `ORDER BY ... DESC`: a fila do maior para o menor

**O comando:** "Os 4 cantos formam uma fila: o canto com mais casos na frente."

`ORDER BY` arruma as linhas do resultado pela coluna que você escolher. `DESC` (do inglês *descending*, decrescente) põe do maior para o menor. `ASC` (*ascending*, crescente) põe do menor para o maior, e é o que o banco faz quando você não escreve nenhum dos dois. Nenhuma linha entra ou sai: muda só a ordem.

::output::

<div class="antes-depois">
<div>

**Antes** · as 4 somas, sem ordem combinada

```text
macrorregional |  sum
---------------+-------
Leste          |  4071
Noroeste       |  6553
Norte          | 10941
Oeste          |  8319
```

</div>
<div>

**Depois** · a fila, do maior para o menor

```text
macrorregional |  sum
---------------+-------
Norte          | 10941
Oeste          |  8319
Noroeste       |  6553
Leste          |  4071
```

</div>
</div>

::note::

**Ordem, até agora:** `FROM` → `WHERE mes = 3` → `GROUP BY macrorregional` → `SELECT macrorregional, SUM(casos)` → `ORDER BY SUM(casos) DESC`

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 20: A consulta do SQL humano no banco, e o AS -->

<!-- objetivo: aluno vê a consulta inteira das rodadas no banco de verdade e entende o AS -->

# A consulta do SQL humano, no banco, e o `AS`

No banco não existe `cartoes`: os cartões são as linhas de março de **2025** da `casos_dengue`, que tem os dois anos. Por isso o `WHERE` ganha `ano = 2025`. **`AS total`** dá o nome `total` à coluna da soma (sem ele, a coluna se chama `sum`), e o `ORDER BY` passa a usar esse nome.

```sql
SELECT macrorregional, SUM(casos) AS total
FROM casos_dengue
WHERE ano = 2025 AND mes = 3
GROUP BY macrorregional
ORDER BY total DESC;
```
<!-- sql: espera
Norte|10941
Oeste|8319
Noroeste|6553
Leste|4071
-->

::output::

<div class="antes-depois">
<div>

**Antes** · `casos_dengue`, 408 linhas (aparecem 6)

```text
macrorregional | ano  | mes | casos
---------------+------+-----+-------
Norte          | 2024 |   3 | 20108  ← sai
Norte          | 2025 |   3 |  6614  ← fica
Norte          | 2025 |   4 |  5482  ← sai
Leste          | 2024 |   3 | 12247  ← sai
Leste          | 2025 |   3 |  2070  ← fica
Leste          | 2025 |   4 |  1239  ← sai
```

</div>
<div>

**Depois** · 4 linhas, os números dos cantos

```text
macrorregional | total
---------------+-------
Norte          | 10941
Oeste          |  8319
Noroeste       |  6553
Leste          |  4071
```

</div>
</div>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 21: A ordem em que o banco executa -->

<!-- objetivo: aluno distingue a ordem de escrita da ordem de execução e entende por que o ORDER BY enxerga o nome do AS -->

# O banco não executa na ordem em que você escreve

<SlideTable compact>

| Passo | Parte da consulta | O que o banco faz | No SQL humano |
|---|---|---|---|
| 1 | `FROM casos_dengue` | pega a tabela | pegar os cartões |
| 2 | `WHERE ano = 2025 AND mes = 3` | testa cada linha e deixa as verdadeiras | ficar de pé |
| 3 | `GROUP BY macrorregional` | junta as linhas em pilhas | ir para o canto |
| 4 | `SELECT macrorregional, SUM(casos) AS total` | calcula a soma de cada pilha e dá nome às colunas | somar no canto |
| 5 | `ORDER BY total DESC` | arruma as linhas do resultado | fazer a fila |

</SlideTable>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 21x: O banco não executa na ordem em que você escreve (cont.) -->

<!-- objetivo: aluno entende por que o ORDER BY consegue usar o apelido que o SELECT deu à coluna -->

# O banco não executa na ordem em que você escreve (cont.)

Você **escreve** começando pelo `SELECT`, mas o banco **executa** começando pelo `FROM`. É por isso que o `ORDER BY` consegue usar o nome `total`: quando ele roda, no passo 5, o `SELECT` já deu esse nome à coluna no passo 4.

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 22: Divisor bloco 3 -->

# BLOCO 3: CONECTAR E A PERGUNTA 1

## No computador, cada um no seu banco

<!--
Professor: host no quadro (o verificar.sh imprime o IP). Aluno com banco estranho:
cd scripts/dataset-dengue/servidor && ./resetar.sh NN  (só o banco dele, em segundos, sem depurar).
-->

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 23: Seu banco, sua conta -->

<!-- objetivo: aluno sabe os 5 campos de conexão e que o banco é individual -->

# Seu banco, sua conta

<SlideTable compact>

| Campo no DBeaver | O que preencher |
|---|---|
| Host | o endereço escrito no quadro |
| Port | `5432` |
| Database | `dengue_NN` |
| Username | `alunoNN` |
| Password | `dengueNN` |

</SlideTable>

`NN` é o seu número da chamada, com dois dígitos. O número 3 preenche `dengue_03`, `aluno03` e `dengue03`.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 23x: Seu banco, sua conta (cont.) -->

<!-- objetivo: aluno entende que o banco é individual e que o professor pode resetar só o seu, sem afetar os outros -->

# Seu banco, sua conta (cont.)

Cada aluno tem um banco só dele, no computador do professor. O que você faz no seu banco não aparece no banco de ninguém. Se o seu banco ficar estranho, o professor devolve ele ao estado do primeiro dia, sem mexer nos outros.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 24: Conectar no DBeaver -->

<!-- objetivo: aluno cria a conexão com o próprio banco, com os rótulos exatos do DBeaver -->

# Conectar no DBeaver

1. Menu **Database** → **New Database Connection**.
2. Na lista de bancos, clique em **PostgreSQL** (o ícone do elefante) → **Next**.
3. Na aba **Main**, preencha: Host (no quadro), Port `5432`, Database `dengue_NN`, Username `alunoNN`, Password `dengueNN`.
4. Clique em **Test Connection ...**, no canto de baixo, à esquerda. Se abrir a janela **Download driver files**, clique em **Download** e espere.
5. Apareceu **Connected**: clique em **OK** e depois em **Finish**.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 24x: Conectar no DBeaver (cont.) -->

<!-- objetivo: aluno confirma a conexão criada e sabe o que fazer diante dos dois erros mais comuns -->

# Conectar no DBeaver (cont.)

**Confira:** na coluna da esquerda (**Database Navigator**) aparece uma conexão nova com o ícone do elefante.

Deu erro de senha? Confira o NN nos três campos. Deu *Connection refused* ou *timed out*? Chame o professor: é a rede, não a sua digitação.

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 25: Banco e tabela na árvore do DBeaver -->

<!-- objetivo: aluno define banco e tabela vendo os dois na árvore do DBeaver -->

# Banco e tabela, na árvore do DBeaver

**Banco de dados** é um conjunto de tabelas guardado e organizado por um programa. O programa aqui é o **Postgres**, que roda no computador do professor. O seu banco se chama `dengue_NN`.

**Tabela** é um conjunto de linhas que têm as mesmas colunas. Na `casos_dengue`, cada linha é um município em um mês, e cada coluna é uma informação sobre ele.

Na árvore da esquerda, abra: `dengue_NN` → **Databases** → `dengue_NN` → **Schemas** → **public** (a pasta padrão das tabelas) → **Tables**. Aparecem duas tabelas: `casos_dengue`, a de hoje, e `municipios`, com a população, que fica para 01/10.

Dê dois cliques em `casos_dengue` e abra a aba **Data**: é a tabela inteira, antes de qualquer consulta.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 26: Abrir o editor SQL e rodar -->

<!-- objetivo: aluno abre o editor, roda uma consulta com Ctrl+Enter e sabe onde aparece o resultado -->

# Abrir o editor SQL e rodar

1. Clique com o botão direito na conexão `dengue_NN` → **SQL Editor** → **New SQL script** (atalho `Ctrl+]`).
2. Abre uma aba em branco: é o **editor**, onde você escreve a consulta.
3. Escreva a consulta e termine com `;` (ponto e vírgula).
4. Com o cursor em cima da consulta, aperte `Ctrl+Enter`. O DBeaver roda só a consulta onde está o cursor.
5. O resultado aparece numa grade, embaixo do editor.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 26x: Abrir o editor SQL e rodar (cont.) -->

<!-- objetivo: aluno sabe rodar várias consultas no mesmo editor e o que fazer diante de uma mensagem de erro -->

# Abrir o editor SQL e rodar (cont.)

Várias consultas no mesmo editor: deixe uma linha em branco entre uma e outra.

Se aparecer uma mensagem em vermelho no lugar da grade, a consulta não rodou. Leia a mensagem antes de mudar qualquer coisa: ela diz em que ponto o banco parou.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 27: count(*) -->

<!-- objetivo: aluno conta as linhas com count(*) e confere a previsão do bloco 1 -->

# `count(*)` conta as linhas: confira a sua previsão

`count(*)` devolve **quantas linhas** existem. O `*` aqui quer dizer "a linha inteira": o banco conta linhas, não soma valores. Digite e rode:

```sql
SELECT count(*) FROM casos_dengue;
```
<!-- sql: espera
408
-->

::output::

<div class="antes-depois uma-coluna">
<div>

**Antes** · `casos_dengue`, com as 7 colunas (aparecem 3 linhas)

```text
codigo_ibge | municipio | macrorregional | ano  | mes | data_referencia | casos
------------+-----------+----------------+------+-----+-----------------+-------
    4101408 | Apucarana | Norte          | 2024 |   1 | 2024-01-01      |  5603
    4101408 | Apucarana | Norte          | 2024 |   2 | 2024-02-01      |  5003
    4101408 | Apucarana | Norte          | 2024 |   3 | 2024-03-01      |  4287
```

**Depois** · 1 linha, 1 coluna

```text
count
------
  408
```

</div>
</div>

::note::

**Confira** na ficha: 17 municípios × 12 meses × 2 anos = 408. O banco devolveu outro número? Chame o professor.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 28: SELECT com colunas -->

<!-- objetivo: aluno escolhe colunas pelo nome e distingue cortar colunas (SELECT) de cortar linhas (WHERE) -->

# `SELECT` com nomes de colunas: você escolhe o que volta

No lugar do `*`, escreva os nomes das colunas, separados por vírgula. Voltam só essas colunas, na ordem em que você escreveu. Aqui o `WHERE` da rodada 2 corta as linhas (fica março de 2025) e o `SELECT` corta as colunas (ficam 3 das 7).

```sql
SELECT municipio, mes, casos
FROM casos_dengue
WHERE ano = 2025 AND mes = 3;
```
<!-- sql: espera
Apucarana|3|3851
Campo Mourão|3|63
Cascavel|3|3421
Curitiba|3|2070
Foz do Iguaçu|3|1278
Francisco Beltrão|3|772
Guarapuava|3|312
Joaquim Távora|3|476
Londrina|3|6614
Maringá|3|5090
Paranaguá|3|321
Paranavaí|3|881
Pato Branco|3|1004
Ponta Grossa|3|1153
São José dos Pinhais|3|215
Toledo|3|1844
Umuarama|3|519
-->

::output::

<div class="antes-depois">
<div>

**Antes** · 7 colunas: `codigo_ibge`, `municipio`, `macrorregional`, `ano`, `mes`, `data_referencia`, `casos`

</div>
<div>

**Depois** · 17 linhas, 3 colunas (aparecem 4)

```text
  municipio   | mes | casos
--------------+-----+-------
 Apucarana    |   3 |  3851
 Campo Mourão |   3 |    63
 Cascavel     |   3 |  3421
 Curitiba     |   3 |  2070
```

</div>
</div>

---
layout: code-output
card: true
bgPreset: default
outputLabel: "A mensagem que aparece no lugar da grade"
outputTone: error
---

<!-- SLIDE 29: Texto vai entre aspas simples -->

<!-- objetivo: aluno escreve texto entre aspas simples, idêntico ao da tabela, e reconhece o erro de quando esquece -->

# Texto vai entre aspas simples; número, sem aspas

Número se escreve sem aspas: `mes = 3`. Texto vai entre **aspas simples**: `municipio = 'Londrina'`. Sem as aspas, o banco acha que `Londrina` é o nome de uma coluna, procura, não acha e para:

```sql
SELECT municipio, mes, casos
FROM casos_dengue
WHERE municipio = Londrina;
```
<!-- sql: erro "does not exist" -->

::output::

```text
SQL Error [42703]: ERROR: column "londrina" does not exist
```

Em português: *a coluna "londrina" não existe*. O Postgres passa para minúscula todo nome que não está entre aspas.

::note::

Com aspas, o texto tem que ser **idêntico** ao da tabela: mesma letra maiúscula, mesmo acento. `'londrina'` ou `'Maringa'` devolvem **0 linhas**, sem mensagem nenhuma.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 30: WHERE com três condições, exemplo resolvido -->

<!-- objetivo: aluno vê um WHERE com três condições ligadas por AND funcionando no banco, no molde da pergunta 1 -->

# `WHERE` com três condições: Apucarana, janeiro de 2024

A pergunta: quantos casos Apucarana teve em janeiro de 2024? Cada condição corta linhas, e o `AND` exige as três verdadeiras **na mesma linha**. É a linha que você leu em voz alta no bloco 1.

```sql
SELECT municipio, ano, mes, casos
FROM casos_dengue
WHERE municipio = 'Apucarana' AND ano = 2024 AND mes = 1;
```
<!-- sql: espera
Apucarana|2024|1|5603
-->

::output::

<div class="antes-depois">
<div>

**Antes** · `casos_dengue`, 408 linhas (aparecem 4)

```text
municipio | ano  | mes | casos
----------+------+-----+-------
Apucarana | 2024 |   1 |  5603  ← fica
Apucarana | 2024 |   2 |  5003  ← sai (mês)
Apucarana | 2025 |   1 |   470  ← sai (ano)
Londrina  | 2024 |   1 |  5997  ← sai (município)
```

</div>
<div>

**Depois** · 1 linha

```text
municipio | ano  | mes | casos
----------+------+-----+-------
Apucarana | 2024 |   1 |  5603
```

</div>
</div>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 31: Conferir em par -->

<!-- objetivo: aluno sabe o protocolo de conferência em par, falando, com o monitor desligado -->

# Conferir em par: como funciona

Cada um roda a consulta **no próprio banco**. A dupla existe só para conversar.

1. Desliguem os dois monitores (o botão do monitor, não o do computador). Sem a tela, você explica com as suas palavras em vez de ler.
2. Um fala e o outro escuta: o número que o banco devolveu, a previsão que estava na ficha, e em qual tabela impressa conferiu.
3. Troquem.
4. Os números não bateram? Liguem os monitores e comparem as **consultas**, parte por parte: `SELECT`, `FROM`, `WHERE`. Os dois bancos têm os mesmos dados; a diferença está na consulta.

Os 10 minutos de conferência valem para as 5 perguntas do dia.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 32: Pergunta 1 -->

<!-- objetivo: aluno escreve a primeira consulta do chamado adaptando o exemplo da Apucarana -->

# Pergunta 1: quantos casos Londrina teve em março de 2025?

**Exercício · 15 min · individual, no seu banco**

1. **Preveja** na ficha: quantas linhas vão voltar, e qual número.
2. Escreva a consulta no editor. Parta do exemplo da Apucarana e troque o município, o ano e o mês.
3. Rode com `Ctrl+Enter` e anote na ficha o número que o banco devolveu.
4. **Confira** com o cartão de Londrina, março de 2025 (os cartões ficam com o professor).
5. Conferir em par, com os monitores desligados.

Travou? Peça as **tiras da pergunta 1**, monte a consulta na mesa e só depois digite.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 32x: Pergunta 1 (cont.) -->

<!-- objetivo: aluno confere a resposta da pergunta 1 e o erro mais provável -->

# Pergunta 1 (cont.): gabarito

<AdminOnly>

**Gabarito:**

```sql
SELECT municipio, mes, casos
FROM casos_dengue
WHERE municipio = 'Londrina' AND ano = 2025 AND mes = 3;
```
<!-- sql: espera
Londrina|3|6614
-->

1 linha, **6.614** casos. **Erro provável:** esquecer o `ano = 2025`. Voltam 2 linhas, março de 2024 (20.108) e março de 2025 (6.614), porque a tabela tem os dois anos.

</AdminOnly>

---
layout: two-cols-text
card: true
bgPreset: default
---

<!-- SLIDE 33: Terminou antes? Travou? -->

<!-- objetivo: aluno sabe o que fazer quando termina antes e quando trava, sem ficar parado -->

# Terminou antes? Travou?

**Terminou antes**

1. **pgexercises.com**, seções *Basic* e *Aggregates*. Os exercícios são em inglês, num banco de um clube esportivo, e o site confere a sua resposta.
2. **O desafio do fim da aula:** qual município teve a maior queda de casos de 2024 para 2025? Ele usa o `GROUP BY` do bloco 5, e dá para começar depois dele.

::right::

**Travou**

1. Peça as **tiras** da pergunta. Cada tira é um pedaço da consulta: monte na mesa, na ordem certa, e só depois digite.
2. Leia a mensagem vermelha do DBeaver e compare a sua consulta com o exemplo resolvido do slide anterior à pergunta.
3. Banco estranho (sumiu linha, apareceu tabela nova, erro que não sai)? Chame o professor. Ele devolve o **seu** banco ao estado do primeiro dia em segundos, sem mexer no de ninguém.

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 34: Divisor bloco 4 -->

# BLOCO 4: SOMAR

## A pergunta 2, e o erro que não avisa

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 35: Preveja, 1, 12 ou 408 linhas -->

<!-- objetivo: aluno prevê que SUM sem GROUP BY devolve 1 linha, antes de ver o resultado -->

# Preveja: quantas linhas esta consulta devolve?

Antes de rodar, escreva na ficha: **1, 12 ou 408 linhas?** E por quê, em uma frase.

```sql
SELECT SUM(casos)
FROM casos_dengue
WHERE municipio = 'Maringá' AND ano = 2025;
```
<!-- sql: espera
18854
-->

Duas perguntas ajudam: quantas linhas de Maringá em 2025 o `WHERE` deixa? E o que o `SUM` faz com elas? No SQL humano, os 5 cartões do canto Leste viraram um número só.

Depois de escrever a previsão, rode no DBeaver.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 36: SUM com WHERE -->

<!-- objetivo: aluno entende que o WHERE roda antes e o SUM junta as linhas que sobraram em uma -->

# `SUM` junta numa linha só o que o `WHERE` deixou

O `WHERE` roda primeiro e deixa 12 linhas: os 12 meses de Maringá em 2025. O `SUM(casos)` soma a coluna `casos` dessas 12: 865 + 1.750 + 5.090 + 4.179 + 3.215 + 1.019 + 279 + 320 + 469 + 600 + 660 + 408 = **18.854**. Sem `GROUP BY`, tudo que sobrou forma uma pilha só, e volta **1 linha**.

```sql
SELECT SUM(casos)
FROM casos_dengue
WHERE municipio = 'Maringá' AND ano = 2025;
```
<!-- sql: espera
18854
-->

::output::

<div class="antes-depois">
<div>

**Antes** · `casos_dengue`, 408 linhas (aparecem 5)

```text
municipio | ano  | mes | casos
----------+------+-----+-------
Maringá   | 2025 |   1 |   865  ← fica
Maringá   | 2025 |   2 |  1750  ← fica
Maringá   | 2025 |   3 |  5090  ← fica
Maringá   | 2024 |   1 |  3027  ← sai (ano)
Londrina  | 2025 |   1 |  2100  ← sai (município)
```

</div>
<div>

**Depois** · 1 linha

```text
sum
-----
18854
```

**Confira** na T2, linha Maringá, coluna `casos_2025`: 18.854.

</div>
</div>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 37: Pergunta 2 -->

<!-- objetivo: aluno escreve a consulta com SUM e WHERE adaptando o exemplo de Maringá -->

# Pergunta 2: quantos casos Londrina teve em 2025 inteiro?

**Exercício · 15 min · individual, no seu banco**

1. **Preveja** na ficha: quantas linhas? O número é maior ou menor que os 6.614 de março?
2. Escreva a consulta. Parta da consulta de Maringá.
3. Rode com `Ctrl+Enter` e anote o número na ficha.
4. **Confira** na T2, linha Londrina, coluna `casos_2025`.
5. Conferir em par, com os monitores desligados.

Travou? Peça as **tiras da pergunta 2**.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 37x: Pergunta 2 (cont.) -->

<!-- objetivo: aluno confere a resposta da pergunta 2 e os dois erros mais prováveis -->

# Pergunta 2 (cont.): gabarito

<AdminOnly>

**Gabarito:**

```sql
SELECT SUM(casos)
FROM casos_dengue
WHERE municipio = 'Londrina' AND ano = 2025;
```
<!-- sql: espera
32804
-->

**32.804**, 1 linha. **Erros prováveis:** deixar o `mes = 3` da pergunta 1 (volta 6.614, só março) ou esquecer o `ano = 2025` (volta 112.145, que é 79.341 de 2024 mais 32.804 de 2025).

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 38: Preveja, o que volta -->

<!-- objetivo: aluno prevê o resultado de uma consulta com AND contraditório antes de rodar -->

# Preveja: o que esta consulta devolve?

Alguém recebeu o pedido "a soma dos casos do Norte e do Noroeste" e escreveu a consulta abaixo. Escreva na ficha: **quantas linhas voltam, e qual número?** Depois rode.

```sql
SELECT SUM(casos)
FROM casos_dengue
WHERE macrorregional = 'Norte' AND macrorregional = 'Noroeste';
```
<!-- sql: espera -->

É o mesmo `AND` da rodada 4 do SQL humano, quando o comando pediu "Norte e Noroeste" e ninguém levantou. A diferença é que agora tem um `SUM` na frente.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 39: NULL -->

<!-- objetivo: aluno entende NULL como falta de valor e reconhece o [NULL] do DBeaver como sinal de erro silencioso -->

# `NULL`: a soma de nenhuma linha

Nenhuma linha é Norte e Noroeste ao mesmo tempo, então o `WHERE` não deixa nenhuma. O `SUM` de nenhuma linha devolve **1 linha com a célula vazia**, e o DBeaver escreve `[NULL]` nela. **`NULL`** quer dizer *sem valor*. Não é zero: zero é um número, e `NULL` é a falta de um número. Não aparece mensagem de erro: é um erro silencioso.

```sql
SELECT SUM(casos)
FROM casos_dengue
WHERE macrorregional = 'Norte' AND macrorregional = 'Noroeste';
```
<!-- sql: espera -->

::output::

<div class="antes-depois">
<div>

**Antes** · `casos_dengue`, 408 linhas (aparecem 4)

```text
municipio | macrorregional
----------+----------------
Curitiba  | Leste           ← sai
Londrina  | Norte           ← sai
Maringá   | Noroeste        ← sai
Toledo    | Oeste           ← sai
```

</div>
<div>

**Depois** · 1 linha, sem valor

```text
sum
------
[NULL]
```

</div>
</div>

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 40: O conserto com IN -->

<!-- objetivo: aluno conserta o AND contraditório com IN e confere somando dois números da T3 -->

# O conserto com `IN`: Norte e Noroeste em 2025

Em português, "os casos do Norte e do Noroeste" quer dizer as linhas de **uma ou da outra**. Em SQL, isso é `IN` (ou `OR`). O `AND ano = 2025` continua valendo para as duas.

```sql
SELECT SUM(casos)
FROM casos_dengue
WHERE macrorregional IN ('Norte', 'Noroeste') AND ano = 2025;
```
<!-- sql: espera
69428
-->

::output::

<div class="antes-depois">
<div>

**Antes** · `casos_dengue`, 408 linhas (aparecem 4)

```text
municipio | macrorregional | ano
----------+----------------+------
Maringá   | Noroeste       | 2025  ← fica
Londrina  | Norte          | 2025  ← fica
Londrina  | Norte          | 2024  ← sai (ano)
Curitiba  | Leste          | 2025  ← sai (Leste)
```

</div>
<div>

**Depois** · 1 linha

```text
sum
-----
69428
```

**Confira** na T3, coluna `casos_2025`: Norte 44.080 + Noroeste 25.348 = 69.428.

</div>
</div>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 41: O erro silencioso também é o erro da IA -->

<!-- objetivo: aluno liga o erro silencioso ao que a IA erra ao escrever SQL, com números conferidos -->

# O erro silencioso também é o erro da IA

Existem programas de IA que recebem uma pergunta em linguagem comum e escrevem a consulta SQL sozinhos. Para medir quanto eles acertam, pesquisadores montaram o **BIRD**, uma prova com milhares de perguntas sobre bancos de dados de verdade.

- O melhor sistema de IA acerta **82,39%** das perguntas (placar de 22/08/2026). Pessoas que trabalham com banco de dados, e estudantes da área, acertam **92,96%**.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 41x: O erro silencioso também é o erro da IA (cont.) -->

<!-- objetivo: aluno conecta o tipo de erro mais comum da IA ao erro silencioso visto na aula -->

# O erro silencioso também é o erro da IA (cont.)

- Um estudo de 2025 conferiu as consultas que o GPT-3.5 escreveu para o BIRD: **47,8%** tinham pelo menos um erro. O tipo mais comum foi o erro de significado: a consulta roda, devolve uma tabela e responde outra pergunta.

É o mesmo tipo de erro do `AND` com duas macrorregionais: nenhuma mensagem vermelha. Quem pega é quem sabe mais ou menos que número esperar e confere numa fonte.

Fontes: bird-bench.github.io · arxiv.org/abs/2501.09310

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 42: Divisor bloco 5 -->

# BLOCO 5: AGRUPAR

## A pergunta 3, e o erro que o Postgres avisa

<!--
Professor: distribuir o cartão das 4 etapas agora. Ele fica na mesa o épico inteiro.
-->

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 43: GROUP BY ano -->

<!-- objetivo: aluno aplica GROUP BY às 408 linhas e confere o total de cada ano na T1 -->

# `GROUP BY ano`: 408 linhas entram, 2 saem

`GROUP BY ano` junta numa pilha as linhas com o mesmo ano: 204 linhas de 2024 e 204 de 2025. O `SUM(casos)` soma cada pilha, e cada pilha vira uma linha. O `ORDER BY ano` põe 2024 antes de 2025.

```sql
SELECT ano, SUM(casos) AS total
FROM casos_dengue
GROUP BY ano
ORDER BY ano;
```
<!-- sql: espera
2024|385520
2025|126732
-->

::output::

<div class="antes-depois">
<div>

**Antes** · `casos_dengue`, 408 linhas (aparecem 4)

```text
municipio | ano  | mes | casos
----------+------+-----+-------
Apucarana | 2024 |   1 |  5603  → pilha 2024
Apucarana | 2025 |   1 |   470  → pilha 2025
Londrina  | 2024 |   1 |  5997  → pilha 2024
Londrina  | 2025 |   1 |  2100  → pilha 2025
```

</div>
<div>

**Depois** · 2 linhas

```text
ano  | total
-----+--------
2024 | 385520
2025 | 126732
```

**Confira** na T1, linha `total`: 385.520 em 2024 e 126.732 em 2025.

</div>
</div>

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 44: O cartão das 4 etapas -->

<!-- objetivo: aluno usa as 4 etapas nomeadas para planejar uma consulta com grupo antes de escrever -->

# O cartão das 4 etapas

Antes de escrever uma consulta com grupos, responda 4 perguntas, nesta ordem:

1. **Filtrar linhas** (`WHERE`): quais linhas entram na conta?
2. **Definir o grupo** (`GROUP BY`): o resultado tem uma linha para cada o quê?
3. **Calcular o resumo** (`SUM` dentro do `SELECT`): o que calcular em cada grupo?
4. **Filtrar grupos:** fica vazia hoje. Em 01/10 ela ganha um comando próprio.

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 44x: O cartão das 4 etapas (cont.) -->

<!-- objetivo: aluno vê as 4 etapas aplicadas numa consulta real, cada uma etiquetada na linha certa -->

# O cartão das 4 etapas (cont.)

A consulta do SQL humano, com cada parte etiquetada:

```sql
SELECT macrorregional, SUM(casos) AS total  -- 3. calcular o resumo
FROM casos_dengue
WHERE ano = 2025 AND mes = 3                -- 1. filtrar linhas
GROUP BY macrorregional                     -- 2. definir o grupo
                                            -- 4. filtrar grupos: vazia hoje
ORDER BY total DESC;
```
<!-- sql: espera
Norte|10941
Oeste|8319
Noroeste|6553
Leste|4071
-->

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 45: Pergunta 3 -->

<!-- objetivo: aluno planeja com as 4 etapas e escreve uma consulta com GROUP BY -->

# Pergunta 3: quantos casos cada macrorregional teve em 2025?

**Exercício · 20 min · individual, no seu banco**

1. Na ficha, no quadro da pergunta 3, responda as **4 etapas** do cartão para esta pergunta.
2. **Preveja:** quantas linhas vão voltar?
3. Escreva a consulta. Parta da consulta do SQL humano, a do cartão das 4 etapas.
4. Rode e anote os 4 números.
5. **Confira** na T3, coluna `casos_2025`. Depois, conferir em par, com os monitores desligados.

Travou? Peça as **tiras da pergunta 3**. Atenção: uma das tiras não faz parte da resposta.

<AdminOnly>

**Gabarito:**

```sql
SELECT macrorregional, SUM(casos) AS total_2025
FROM casos_dengue
WHERE ano = 2025
GROUP BY macrorregional
ORDER BY total_2025 DESC;
```
<!-- sql: espera
Norte|44080
Oeste|38681
Noroeste|25348
Leste|18623
-->

**Erro provável:** deixar o `mes = 3` do SQL humano. Voltam os números dos cantos (Norte 10.941...), que são só de março.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 46: Preveja, esta consulta roda -->

<!-- objetivo: aluno prevê o erro de coluna fora do GROUP BY antes de rodar -->

# Preveja: esta consulta roda?

Alguém quer o total de cada município **em cada ano** e escreveu a consulta abaixo. Escreva na ficha: **roda ou dá erro?** Se roda, quantas linhas voltam?

```sql
SELECT municipio, ano, SUM(casos)
FROM casos_dengue
GROUP BY municipio;
```
<!-- sql: erro "must appear in the GROUP BY clause" -->

Uma pergunta ajuda: dentro da pilha de Londrina, quantos anos diferentes existem?

Depois de escrever a previsão, rode no DBeaver.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "A mensagem que aparece no lugar da grade"
outputTone: error
---

<!-- SLIDE 47: Coluna fora do GROUP BY -->

<!-- objetivo: aluno entende por que o Postgres recusa coluna fora do GROUP BY e distingue erro com mensagem de erro silencioso -->

# Coluna fora do `GROUP BY`: o Postgres avisa

```sql
SELECT municipio, ano, SUM(casos)
FROM casos_dengue
GROUP BY municipio;
```
<!-- sql: erro "must appear in the GROUP BY clause" -->

::output::

```text
SQL Error [42803]: ERROR: column "casos_dengue.ano" must appear in
the GROUP BY clause or be used in an aggregate function
```

Em português: *a coluna `ano` precisa aparecer no `GROUP BY` ou ser usada dentro de uma função de agregação (como o `SUM`)*.

::note::

**Por quê:** a pilha de Londrina tem 24 linhas, 12 de 2024 e 12 de 2025. Cada pilha vira uma linha, e na célula `ano` dessa linha cabe um valor só. O banco não escolhe um ano por você: ele para e avisa. No `AND` com duas macrorregionais foi o contrário: rodou sem aviso e devolveu `[NULL]`.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 48: Agrupar por duas colunas -->

<!-- objetivo: aluno agrupa por duas colunas e entende que cada combinação vira uma pilha -->

# O conserto: agrupar por duas colunas

`GROUP BY municipio, ano` faz uma pilha para cada **combinação** de município e ano: 17 × 2 = 34 pilhas. Cada pilha tem um ano só, então o `ano` pode ir para o `SELECT`. O `ORDER BY municipio, ano` ordena pelo município e, dentro do mesmo município, pelo ano.

```sql
SELECT municipio, ano, SUM(casos) AS total
FROM casos_dengue
GROUP BY municipio, ano
ORDER BY municipio, ano;
```
<!-- sql: espera
Apucarana|2024|19755
Apucarana|2025|10271
Campo Mourão|2024|674
Campo Mourão|2025|213
Cascavel|2024|44117
Cascavel|2025|12372
Curitiba|2024|48313
Curitiba|2025|8337
Foz do Iguaçu|2024|28822
Foz do Iguaçu|2025|10728
Francisco Beltrão|2024|23822
Francisco Beltrão|2025|3555
Guarapuava|2024|5704
Guarapuava|2025|1082
Joaquim Távora|2024|1414
Joaquim Távora|2025|1005
Londrina|2024|79341
Londrina|2025|32804
Maringá|2024|39058
Maringá|2025|18854
Paranaguá|2024|4685
Paranaguá|2025|1512
Paranavaí|2024|8816
Paranavaí|2025|3393
Pato Branco|2024|10542
Pato Branco|2025|3419
Ponta Grossa|2024|31453
Ponta Grossa|2025|6643
São José dos Pinhais|2024|2586
São José dos Pinhais|2025|1049
Toledo|2024|18676
Toledo|2025|8607
Umuarama|2024|17742
Umuarama|2025|2888
-->

::output::

<div class="antes-depois">
<div>

**Antes** · `casos_dengue`, 408 linhas (aparecem 4)

```text
municipio | ano  | mes | casos
----------+------+-----+-------
Apucarana | 2024 |   1 |  5603  → Apucarana 2024
Apucarana | 2024 |   2 |  5003  → Apucarana 2024
Apucarana | 2025 |   1 |   470  → Apucarana 2025
Apucarana | 2025 |   2 |  1096  → Apucarana 2025
```

</div>
<div>

**Depois** · 34 linhas (aparecem 4)

```text
municipio   | ano  | total
------------+------+-------
Apucarana    | 2024 | 19755
Apucarana    | 2025 | 10271
Campo Mourão | 2024 |   674
Campo Mourão | 2025 |   213
```

</div>
</div>

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 49: Divisor bloco 6 -->

# BLOCO 6: ORDENAR E CORTAR

## As perguntas 4 e 5, e a entrega da ficha

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 50: ORDER BY no banco -->

<!-- objetivo: aluno ordena um resultado agrupado pela coluna calculada, do maior para o menor -->

# `ORDER BY`: o Noroeste em 2025, do maior para o menor

`ORDER BY total DESC` arruma as linhas do resultado pela coluna `total`, da maior para a menor. Sem `ORDER BY`, o banco devolve as linhas na ordem que for mais rápida para ele, e essa ordem pode mudar de uma vez para outra.

```sql
SELECT municipio, SUM(casos) AS total
FROM casos_dengue
WHERE ano = 2025 AND macrorregional = 'Noroeste'
GROUP BY municipio
ORDER BY total DESC;
```
<!-- sql: espera
Maringá|18854
Paranavaí|3393
Umuarama|2888
Campo Mourão|213
-->

::output::

<div class="antes-depois">
<div>

**Antes** · o mesmo resultado sem o `ORDER BY`

```text
municipio   | total
------------+-------
Campo Mourão |   213
Maringá      | 18854
Paranavaí    |  3393
Umuarama     |  2888
```

</div>
<div>

**Depois** · as mesmas 4 linhas, em fila

```text
municipio   | total
------------+-------
Maringá      | 18854
Paranavaí    |  3393
Umuarama     |  2888
Campo Mourão |   213
```

</div>
</div>

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois"
outputTone: neutral
---

<!-- SLIDE 51: LIMIT -->

<!-- objetivo: aluno corta o resultado com LIMIT e entende que ele roda depois do ORDER BY -->

# `LIMIT`: os 3 meses de 2024 com mais casos

`LIMIT 3` corta o resultado depois das 3 primeiras linhas. Ele roda **por último**, depois do `ORDER BY`: o banco faz a fila do maior para o menor e fica com os 3 da frente. Sem o `ORDER BY`, seriam 3 linhas quaisquer.

```sql
SELECT mes, SUM(casos) AS total
FROM casos_dengue
WHERE ano = 2024
GROUP BY mes
ORDER BY total DESC
LIMIT 3;
```
<!-- sql: espera
3|103609
4|87085
5|60117
-->

::output::

<div class="antes-depois">
<div>

**Antes** · sem o `LIMIT`: 12 linhas (aparecem 5)

```text
mes | total
----+--------
  3 | 103609
  4 |  87085
  5 |  60117
  2 |  53111
  1 |  25054
```

</div>
<div>

**Depois** · as 3 primeiras

```text
mes | total
----+--------
  3 | 103609
  4 |  87085
  5 |  60117
```

**Confira** na T1, coluna `casos_2024`: mar, abr e mai.

</div>
</div>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 52: Pergunta 4 -->

<!-- objetivo: aluno combina WHERE, GROUP BY, ORDER BY DESC e LIMIT numa consulta só -->

# Pergunta 4: quais os 5 municípios com mais casos em 2025?

**Exercício · 15 min · individual, no seu banco**

1. **Preveja** na ficha: quantas linhas voltam, e quais municípios aparecem?
2. Escreva a consulta: parta do exemplo do Noroeste, tire a macrorregional e acrescente o `LIMIT`.
3. Rode e anote os 5 municípios, com os números.
4. **Confira** na T2, linhas 1 a 5. A T2 já vem ordenada por casos.
5. Conferir em par, com os monitores desligados.

Travou? Peça as **tiras da pergunta 4**. Uma das tiras não faz parte da resposta.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 52x: Pergunta 4 (cont.) -->

<!-- objetivo: aluno confere a resposta da pergunta 4 e os dois erros mais prováveis -->

# Pergunta 4 (cont.): gabarito

<AdminOnly>

**Gabarito:**

```sql
SELECT municipio, SUM(casos) AS total_2025
FROM casos_dengue
WHERE ano = 2025
GROUP BY municipio
ORDER BY total_2025 DESC
LIMIT 5;
```
<!-- sql: espera
Londrina|32804
Maringá|18854
Cascavel|12372
Foz do Iguaçu|10728
Apucarana|10271
-->

**Erros prováveis:** esquecer o `DESC` (voltam os 5 com **menos** casos, começando por Campo Mourão, 213) ou esquecer o `ano = 2025` (Curitiba aparece em 3º, porque somou 2024; a T2 denuncia).

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 53: Pergunta 5 -->

<!-- objetivo: aluno agrupa por mês e usa ORDER BY com LIMIT 1 para achar o maior -->

# Pergunta 5: em que mês de 2025 houve mais casos?

**Exercício · 15 min · individual, no seu banco**

1. **Preveja** na ficha: qual mês você acha que é, e quantas linhas a consulta devolve?
2. Escreva a consulta: parta do exemplo dos 3 meses de 2024 e mude o ano e o `LIMIT`.
3. Rode e anote o mês e o número.
4. **Confira** na T1, coluna `casos_2025`: procure o maior número.
5. Conferir em par, com os monitores desligados.

Travou? Peça as **tiras da pergunta 5**. Uma das tiras não faz parte da resposta.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 53x: Pergunta 5 (cont.) -->

<!-- objetivo: aluno confere a resposta da pergunta 5 e entende por que só a T1 pega o erro -->

# Pergunta 5 (cont.): gabarito

<AdminOnly>

**Gabarito:**

```sql
SELECT mes, SUM(casos) AS total
FROM casos_dengue
WHERE ano = 2025
GROUP BY mes
ORDER BY total DESC
LIMIT 1;
```
<!-- sql: espera
3|29884
-->

**Março, 29.884.** **Erro provável:** esquecer o `ano = 2025`. Volta março também, mas com 133.493 (2024 e 2025 somados). O mês bate e o número não: só a conferência na T1 pega esse erro.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 54: Desafio -->

<!-- objetivo: aluno que terminou usa GROUP BY com duas colunas para comparar os dois anos -->

# Desafio: qual município perdeu mais casos de 2024 para 2025?

**Exercício · para quem terminou as 5 perguntas**

1. Escreva uma consulta que devolva o total de cada município em cada ano: `GROUP BY municipio, ano`. São 34 linhas.
2. Para cada município, faça no celular a conta **total de 2024 menos total de 2025**.
3. Qual município teve a maior queda, em número de casos?
4. Escreva no verso da ficha: o nome, os dois totais e a diferença.

Em 01/10 aparece um jeito de fazer isso com uma consulta só, sem a conta no celular.

<AdminOnly>

**Gabarito:** **Londrina**, 79.341 em 2024 e 32.804 em 2025: **46.537 casos a menos**. Em segundo vem Curitiba (48.313 para 8.337, 39.976 a menos). Nenhum dos 17 municípios teve mais casos em 2025 do que em 2024.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 55: Os comandos de hoje -->

<!-- objetivo: aluno tem uma tabela de consulta com todos os comandos do dia, para usar em 01/10 -->

# Os comandos de hoje

<SlideTable compact>

| Comando | O que faz | Exemplo do dia |
|---|---|---|
| `SELECT` | escolhe as colunas que voltam (`*` = todas) | `SELECT municipio, mes, casos` |
| `FROM` | diz de qual tabela vêm as linhas | `FROM casos_dengue` |
| `WHERE` | deixa só as linhas em que a condição é verdadeira | `WHERE ano = 2025` |
| `AND` | as duas condições verdadeiras na mesma linha | `ano = 2025 AND mes = 3` |
| `IN` ou `OR` | basta uma das condições ser verdadeira | `IN ('Norte', 'Noroeste')` |

</SlideTable>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 55x: Os comandos de hoje (cont.) -->

<!-- objetivo: aluno tem a segunda metade da tabela de consulta: contar, somar, agrupar e ordenar -->

# Os comandos de hoje (cont.)

<SlideTable compact>

| Comando | O que faz | Exemplo do dia |
|---|---|---|
| `count(*)` | conta as linhas | `SELECT count(*)` devolve 408 |
| `SUM(coluna)` | soma a coluna; com grupo, uma soma por grupo | `SUM(casos)` |
| `AS` | dá nome a uma coluna do resultado | `SUM(casos) AS total` |
| `GROUP BY` | junta em pilhas as linhas com o mesmo valor | `GROUP BY macrorregional` |
| `ORDER BY` | ordena; `DESC` põe do maior para o menor | `ORDER BY total DESC` |
| `LIMIT` | fica só com as primeiras linhas | `LIMIT 5` |

</SlideTable>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 56: Entrega da ficha -->

<!-- objetivo: aluno confere se a ficha está completa antes de entregar -->

# Entrega da ficha

Antes de entregar, confira se a ficha tem:

- No alto: o seu nome e o seu número da chamada.
- **Linhas da tabela:** a sua previsão e o número que o `count(*)` devolveu.
- **Perguntas 1 a 5:** para cada uma, a previsão, a consulta, o número do banco, onde você conferiu (o cartão, a T1, a T2 ou a T3) e se bateu.
- **Pergunta 3:** as 4 etapas respondidas.
- Toda previsão que não bateu continua lá, com o número do banco ao lado.

Entregue ao professor. A ficha volta para você em 01/10 e ganha a página 2.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 57: Próximo plantão -->

<!-- objetivo: aluno sai sabendo o chamado de 01/10 e que a avaliação do Indicador 5 é nas 2 últimas horas-aula -->

# Próximo plantão: 01/10

**O chamado de 01/10:** "Londrina teve 32.804 casos em 2025, e Umuarama teve 2.888. Isso quer dizer que Londrina está pior?"

Para responder, falta saber **quantas pessoas moram** em cada município. Essa informação está na outra tabela do seu banco, a `municipios`, que você ainda não usou. Uma consulta que junta duas tabelas usa o `JOIN`, que é o comando de 01/10.

**Avaliação do Indicador 5** (cria e manipula consultas SQL de forma adequada para resolução de problemas): nas 2 últimas horas-aula de 01/10, individual, no seu banco, com a ficha como evidência.

---
layout: end
bgPreset: palette
---

<!-- SLIDE 58: Fim -->

# Até 01/10

## Fim do plantão de hoje
