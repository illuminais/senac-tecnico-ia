---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 61"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 61"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-10-02"
unlockHour: 13
layout: cover
---

<!-- SLIDE 1: Capa -->

# Aula 61
## Plantão da Vigilância, dia 3: avaliação e o robô

**Banco de Dados (UC08)** · Épico 2, dia 3 de 5

**Indicador 5 (avaliação hoje):** cria e manipula consultas SQL de forma adequada para resolução de problemas

**Indicador 4:** gerencia a permissão de acesso ao banco de dados, de acordo com o perfil do usuário e as políticas de acesso

2 de outubro de 2026 · 6 horas-aula

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 2: Onde estamos -->

<!-- objetivo: aluno sabe o que cada dia do épico pede e quando é avaliado -->

# Onde estamos

<SlideTable compact>

| Dia | O que você faz no seu banco | Avaliação | |
|---|---|---|---|
| 25/09 | abertura: o dado e a primeira previsão | | |
| 01/10 | consultas: perguntar e conferir | | |
| **02/10** | **responder sozinho a um chamado novo; depois, decidir o que um robô de IA pode ler no seu banco** | **Indicador 5**, no meio do dia | **você está aqui** |
| 08/10 | guardar uma cópia do banco e recuperar os dados a partir dela | **Indicadores 4 e 6**, na segunda metade do dia | |
| 09/10 | plantão final: um chamado novo, com tudo do épico | **prova do plantão**, para todos | |

</SlideTable>

O banco é o mesmo em todos os dias: o `dengue_NN`, um por aluno, no computador do professor.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 3: Como usar este material -->

<!-- objetivo: aluno conhece as convenções do deck antes de precisar delas, incluindo as duas conexões do bloco do robô -->

# Como usar este material

- `Texto nesta letra` é o que você digita no DBeaver, letra por letra, com os mesmos acentos.
- **Preveja:** escreva na ficha o que você espera ver (quantas linhas, qual número) **antes** de rodar.
- **Confira:** diz onde está o número oficial (T1, T2 ou T3, impressas na mesa) ou qual outra consulta tem que concordar com ele.
- **Conexão do dono** (`alunoNN`) e **conexão do robô** (`robo_ia_NN`): a partir do bloco do robô, todo slide de comando diz em qual das duas rodar.
- **NN** é o seu número da chamada, com dois dígitos. O número 3 usa `03`.
- O DBeaver mostra número sem ponto de milhar: `15253` é 15.253.
- O gabarito de cada exercício aparece no próprio slide a partir das 13h de 02/10.

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 4: Divisor abertura -->

# ABERTURA: DE VOLTA AO PLANTÃO

## Sem computador: monitor desligado

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 5: Três perguntas de memória -->

<!-- objetivo: aluno recupera de memória o WHERE, o GROUP BY e a ordem de execução antes da avaliação -->

# Três perguntas de memória

**Exercício · 5 min · no alto da página 2 da ficha, sem olhar os slides de 01/10**

1. O que o `WHERE` faz com as linhas da tabela?
2. O que acontece com as 408 linhas da `casos_dengue` num `GROUP BY macrorregional`?
3. Em que ordem o banco executa `SELECT`, `FROM`, `WHERE`, `GROUP BY` e `ORDER BY`?

<AdminOnly>

**Gabarito:** 1. Deixa só as linhas em que a condição é verdadeira: corta linhas, não colunas. 2. Viram 4 linhas, uma por macrorregional, como os 4 cantos da sala no SQL humano. 3. `FROM`, `WHERE`, `GROUP BY`, `SELECT`, `ORDER BY`: o banco não executa na ordem em que você escreve.

</AdminOnly>

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 6: Divisor aquecimento -->

# AQUECIMENTO

## A dengue em Maringá mudou de 2024 para 2025?

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 7: O chamado e a previsão -->

<!-- objetivo: aluno registra uma previsão antes de consultar o banco e conhece a regra da resposta com número -->

# O chamado: a dengue em Maringá mudou de 2024 para 2025?

**Exercício · 5 min · na ficha, sem computador**

A secretária quer saber se a dengue em Maringá mudou de 2024 para 2025. **Regra do chamado:** a resposta só vale com números do banco e a consulta que gerou cada um.

1. **Preveja** na ficha: em quantos meses de 2025 Maringá passou de 1.000 casos? E em 2024?
2. Escreva, em uma frase, o que você acha que mudou. No fim do aquecimento ela vai ser conferida com os números do banco.

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 8: Comparar números no WHERE -->

<!-- objetivo: aluno usa >, <, >=, <= e <> no WHERE para deixar passar só as linhas acima ou abaixo de um limite -->

# Comparar números no `WHERE`: maior, menor, diferente

**Conceito** · Até aqui o `WHERE` procurou valor **igual**: `mes = 3`, `municipio = 'Londrina'`. Com números, ele também **compara**, e passam só as linhas em que a comparação é verdadeira.

<SlideTable compact>

| Sinal | Quer dizer | Exemplo | Um mês com 1.019 casos passa? |
|---|---|---|---|
| `>` | maior que | `casos > 1000` | sim |
| `<` | menor que | `casos < 1000` | não |
| `>=` | maior ou igual | `casos >= 1019` | sim |
| `<=` | menor ou igual | `casos <= 1000` | não |
| `<>` | diferente | `casos <> 1019` | não |

</SlideTable>

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 8x: Comparar números no WHERE (cont.) -->

<!-- objetivo: aluno liga os sinais de comparação do SQL aos do Python que já usou, e não confunde = com == -->

# Comparar números no `WHERE` (cont.): o mesmo sinal no Python

Os sinais de comparação são os mesmos que você usou no Python (A07), com duas diferenças de escrita:

<SlideTable compact>

| Comparação | No Python | No SQL |
|---|---|---|
| igual | `==` | `=` |
| diferente | `!=` | `<>` |
| maior, menor, maior ou igual, menor ou igual | `>` `<` `>=` `<=` | `>` `<` `>=` `<=` |

</SlideTable>

No SQL, um `=` só já compara: não existe `==`.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 9: Passo 1, meses acima de 1.000 -->

<!-- objetivo: aluno roda a primeira consulta com > e vê quais meses passam pelo limite -->

# Passo 1: os meses de Maringá acima de 1.000 casos em 2025

**Exercício · 8 min · no seu banco** · Digite e rode. Depois compare o número de linhas que voltou com a sua previsão na ficha.

```sql
SELECT mes, casos
FROM casos_dengue
WHERE municipio = 'Maringá' AND ano = 2025 AND casos > 1000
ORDER BY mes;
```
<!-- sql: espera
2|1750
3|5090
4|4179
5|3215
6|1019
-->

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 9x: Passo 1 (cont.) -->

<!-- objetivo: aluno vê, mês a mês, quais linhas passaram pelo limite de 1.000 casos -->

# Passo 1 (cont.): quais meses passaram

Os 12 meses de Maringá em 2025, e o que o `WHERE casos > 1000` fez com cada um:

<SlideTable compact>

| Mês | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Casos | 865 | 1750 | 5090 | 4179 | 3215 | 1019 | 279 | 320 | 469 | 600 | 660 | 408 |
| Passou? | não | **sim** | **sim** | **sim** | **sim** | **sim** | não | não | não | não | não | não |

</SlideTable>

O banco devolveu só as 5 linhas com **sim**: os meses 2 a 6.

**Confira:** quantos meses você previu? Junho passou por pouco (1.019). Com `casos > 1100`, ele sairia: o limite escolhido muda a resposta, e a resposta tem que dizer qual limite usou.

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 10: Contar linhas não é somar valores -->

<!-- objetivo: aluno distingue count(*) (quantas linhas passaram) de SUM(coluna) (quanto somam os valores dessas linhas) -->

# Contar linhas não é somar valores

**Conceito**

- **`count(*)`** conta **quantas linhas** passaram pelo `WHERE`. Nos meses de Maringá, cada linha é um mês: `count(*)` responde "em quantos meses?".
- **`SUM(casos)`** soma a coluna `casos` **dessas mesmas linhas**: responde "quantos casos houve nesses meses?".
- Com o mesmo `WHERE`, os dois devolvem números diferentes, e cada um responde a uma pergunta diferente.
- **Analogia:** numa fila de 5 pessoas com sacolas, contar as pessoas dá 5; somar o peso das sacolas dá outro número.
- Trocar um pelo outro dá uma consulta que roda sem erro e **não responde** à pergunta da secretária.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 11: Passo 2, preveja count ou SUM -->

<!-- objetivo: aluno prevê qual consulta devolve a contagem de meses e qual devolve a soma de casos, e confere rodando -->

# Passo 2: qual consulta dá 5, e qual dá 15.253?

**Exercício · 8 min · na ficha, depois no seu banco**

```sql
-- consulta A
SELECT count(*) FROM casos_dengue
WHERE municipio = 'Maringá' AND ano = 2025 AND casos > 1000;

-- consulta B
SELECT SUM(casos) FROM casos_dengue
WHERE municipio = 'Maringá' AND ano = 2025 AND casos > 1000;
```
<!-- sql: espera
5
15253
-->

1. **Preveja** na ficha: qual das duas devolve 5, e qual devolve 15.253?
2. Rode cada uma: cursor em cima dela, `Ctrl+Enter`.
3. Escreva na ficha, com as suas palavras, o que o 5 conta e o que o 15.253 soma.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 11x: Passo 2 (cont.) -->

<!-- objetivo: aluno confere a previsão e reconhece o erro de responder quantidade de casos com count(*) -->

# Passo 2 (cont.): gabarito

<AdminOnly>

**Gabarito:** a consulta A (`count(*)`) devolve **5**: são 5 linhas, e cada linha é um mês. A consulta B (`SUM(casos)`) devolve **15.253**: é a soma dos casos desses 5 meses (1.750 + 5.090 + 4.179 + 3.215 + 1.019).

**Erro provável:** responder "quantos casos Maringá teve nos meses acima de 1.000?" com `count(*)`. A consulta roda, devolve 5, e o 5 não é número de casos: é número de meses.

</AdminOnly>

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 12: Conferir com outra consulta -->

<!-- objetivo: aluno confere um resultado que não está impresso com uma segunda consulta, pela regra de que as partes somam o todo -->

# Conferir com outra consulta: as partes somam o todo

**Conceito**

- Os meses de Maringá não estão em nenhuma tabela impressa. Para conferir, você usa **outra consulta que tem que concordar** com a primeira.
- **A regra:** o que passou pelo `WHERE` mais o que não passou é o total. Os meses com mais de 1.000 casos mais os meses com até 1.000 casos dão os 12 meses do ano.

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 12x: Conferir com outra consulta (cont.) -->

<!-- objetivo: aluno entende por que a soma das partes denuncia um WHERE errado -->

# Conferir com outra consulta (cont.): por que funciona

- O mesmo vale para os casos: os das duas partes somados dão o total de Maringá em 2025, que está na **T2**.
- **Por que funciona:** se o `WHERE` estiver errado (ano trocado, sinal trocado), uma das partes muda e a soma deixa de bater.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 13: Passo 3, a outra parte -->

<!-- objetivo: aluno escreve a consulta da parte complementar com <= e fecha as duas conferências -->

# Passo 3: a outra parte, com `<=`

**Exercício · 8 min · no seu banco**

1. Escreva uma consulta que devolva, **numa linha só**, quantos meses de 2025 Maringá teve **com até 1.000 casos** e quantos casos somam esses meses. Dica: `SELECT count(*), SUM(casos)` põe os dois números lado a lado.
2. Rode e anote os dois números na ficha.
3. **Confira:** os meses das duas partes somam 12? Os casos das duas partes somam o total de Maringá na T2?

Travou? Parta da consulta B do passo 2 e troque só o sinal.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 13x: Passo 3 (cont.) -->

<!-- objetivo: aluno confere a consulta complementar e entende por que o sinal certo é <= e não < -->

# Passo 3 (cont.): gabarito

<AdminOnly>

**Gabarito:**

```sql
SELECT count(*), SUM(casos)
FROM casos_dengue
WHERE municipio = 'Maringá' AND ano = 2025 AND casos <= 1000;
```
<!-- sql: espera
7|3601
-->

7 meses e 3.601 casos. **Conferências:** 5 + 7 = 12 meses; 15.253 + 3.601 = 18.854, a linha de Maringá na T2.

**Por que `<=` e não `<`:** o contrário de "mais de 1.000" é "até 1.000". Um mês com exatamente 1.000 casos não passaria em `> 1000` nem em `< 1000`, e sumiria das duas partes.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 13y: Planeje com o cartão das 4 etapas -->

<!-- objetivo: aluno planeja com o cartão das 4 etapas uma consulta nova, com comparação e grupo, antes de ver a resposta -->

# Planeje com o cartão das 4 etapas: os dois anos

**Exercício · 5 min · no verso da ficha, antes de ver a consulta**

A secretária quer, numa consulta só, quantos meses Maringá passou de 1.000 casos e quantos casos houve nesses meses, em 2024 e em 2025. Responda as 4 etapas do cartão:

1. **Filtrar linhas** (`WHERE`): quais linhas entram na conta?
2. **Definir o grupo** (`GROUP BY`): o resultado tem uma linha para cada o quê?
3. **Calcular o resumo:** o que calcular em cada grupo?
4. **Filtrar grupos:** fica vazia.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 13z: Planeje com o cartão (cont.) -->

<!-- objetivo: aluno confere as 4 etapas planejadas e o erro de filtrar um ano só -->

# Planeje com o cartão (cont.): gabarito

<AdminOnly>

**Gabarito:** 1. só Maringá, e só os meses com mais de 1.000 casos: `municipio = 'Maringá' AND casos > 1000`, sem filtro de ano, porque a pergunta quer os dois anos. 2. uma linha por ano: `GROUP BY ano`. 3. dois resumos: `count(*)` para os meses e `SUM(casos)` para os casos. 4. vazia. **Erro provável:** pôr `ano = 2025` no `WHERE` e perder 2024.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 14: Os dois anos numa consulta só -->

<!-- objetivo: aluno junta o WHERE com comparação ao GROUP BY da A60 para comparar os dois anos numa consulta só -->

# Os dois anos numa consulta só

**Conceito** · O `WHERE` de hoje filtra os meses acima de 1.000; o `GROUP BY ano` da A60 separa o que sobrou em duas pilhas, uma por ano. O banco executa nessa ordem: `FROM`, `WHERE`, `GROUP BY`, e só então calcula `count(*)` e `SUM` em cada pilha.

```sql
SELECT ano, count(*) AS meses_acima, SUM(casos) AS casos_nesses_meses
FROM casos_dengue
WHERE municipio = 'Maringá' AND casos > 1000
GROUP BY ano
ORDER BY ano;
```
<!-- sql: espera
2024|6|36146
2025|5|15253
-->

**Preveja** na ficha: quantas linhas esta consulta devolve? E o que cada coluna vai mostrar?

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 15: Passo 4, a resposta para a secretária -->

<!-- objetivo: aluno responde ao chamado com uma frase apoiada nos números do banco, usando contagem e soma juntas -->

# Passo 4: a resposta para a secretária

**Exercício · 12 min · no seu banco e na ficha**

1. Rode a consulta do slide anterior e copie os 4 números na ficha.
2. Escreva a **resposta para a secretária**, em uma frase, com os números: o que mudou de 2024 para 2025, e o que ficou parecido.
3. Compare com a frase que você escreveu no começo, antes de consultar o banco.
4. **Conferir em par:** leia a sua resposta para o colega. Ele aponta de qual consulta saiu cada número.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 15x: Passo 4 (cont.) -->

<!-- objetivo: aluno compara a própria resposta com uma resposta apoiada em contagem e soma -->

# Passo 4 (cont.): gabarito

<AdminOnly>

**O banco devolve 2 linhas:** 2024, 6 meses acima de 1.000, 36.146 casos nesses meses; 2025, 5 meses, 15.253 casos.

**Uma resposta completa:** "A temporada de 2025 durou quase o mesmo que a de 2024 (5 meses acima de 1.000 casos, contra 6), mas teve menos da metade dos casos nesses meses (15.253, contra 36.146)."

Só com o `count(*)`, a resposta seria "quase igual". Só com o `SUM`, "caiu muito". As duas juntas descrevem o que mudou e o que ficou parecido.

</AdminOnly>

---
layout: two-cols-text
card: true
bgPreset: default
---

<!-- SLIDE 16: Terminou antes? Travou? -->

<!-- objetivo: aluno sabe o que fazer quando termina antes e quando trava, sem ficar parado -->

# Terminou antes? Travou?

**Terminou antes**

1. **Foz do Iguaçu:** faça o mesmo para 2025. Um dos meses acima de 1.000 casos não está no começo do ano. Qual é?
2. **Trilha do `JOIN`,** no próximo slide: município, população e total na mesma consulta.

::right::

**Travou**

1. Peça as **tiras** do passo. Monte a consulta na mesa, na ordem certa, e só depois digite.
2. Leia a mensagem vermelha do DBeaver antes de mudar qualquer coisa: ela diz em que ponto o banco parou.
3. Banco estranho? Chame o professor: ele devolve o **seu** banco ao estado do primeiro dia, sem mexer no de ninguém.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 16x: Trilha do JOIN -->

<!-- objetivo: aluno que terminou antes junta as duas tabelas pelo código IBGE e vê colunas das duas na mesma consulta -->

# Trilha: juntar as duas tabelas com `JOIN`

**Para quem terminou antes** · A população de cada município está só na tabela `municipios`. O `JOIN` (junção, em inglês) casa cada linha da `casos_dengue` com a linha da `municipios` que tem o mesmo `codigo_ibge`. O `ON` diz qual coluna casa com qual.

```sql
SELECT c.municipio, m.populacao, SUM(c.casos) AS total_2025
FROM casos_dengue c
JOIN municipios m ON m.codigo_ibge = c.codigo_ibge
WHERE c.ano = 2025
GROUP BY c.municipio, m.populacao
ORDER BY total_2025 DESC
LIMIT 3;
```
<!-- sql: espera
Londrina|588125|32804
Maringá|454146|18854
Cascavel|350644|12372
-->

**Confira** na T2: a população e o total de Londrina, Maringá e Cascavel.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 16y: Trilha do JOIN (cont.) -->

<!-- objetivo: aluno que terminou antes vê que, sem o ON, o JOIN multiplica as linhas sem dar erro -->

# Trilha (cont.): o que o `ON` faz

Rode as duas e compare. A primeira casa cada linha da `casos_dengue` com o seu município. A segunda não tem `ON`: o banco casa **cada** linha de uma tabela com **todas** as da outra, 408 × 17, e não dá erro nenhum.

```sql
SELECT count(*) FROM casos_dengue c JOIN municipios m ON m.codigo_ibge = c.codigo_ibge;

SELECT count(*) FROM casos_dengue, municipios;
```
<!-- sql: espera
408
6936
-->

408 contra 6.936 linhas: é um erro silencioso, como o de "Norte **e** Noroeste" de 01/10. Só percebe quem sabia quantas linhas esperar.


---
layout: cover
bgPreset: palette
---

<!-- SLIDE 17: Divisor avaliação -->

# AVALIAÇÃO

## Indicador 5: sozinho, no seu banco

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 18: Como funciona a avaliação -->

<!-- [ATIV AVALIATIVA] Av02-T3 parte 1, Indicador 5. Rubrica: contextos/aval/av02-t3-plantao.md -->

# Como funciona a avaliação

**Avaliação · 100 min · individual, no seu banco**

- Você recebe a folha do **chamado de sexta**, com 5 itens.
- Pode consultar a sua ficha do plantão, o cartão das 4 etapas e as tabelas T1, T2 e T3 impressas. Estes slides ficam fora da tela.
- Em cada item: a **previsão** antes de rodar, a consulta, o número do banco, onde conferiu (tabela impressa ou outra consulta), se bateu, e a **resposta para a secretária**, numa frase, com o número.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 18x: Como funciona a avaliação (cont.) -->

<!-- [ATIV AVALIATIVA] Av02-T3 parte 1, regras (cont.) -->

# Como funciona a avaliação (cont.)

- Resposta sem número do banco não conta.
- Travou num item? Peça as tiras daquele item e marque "usei tiras" na folha. O item vale, mas fica em Parcialmente Atendido.
- No fim, entregue a folha e a ficha.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 19: O que conta para Atendido -->

<!-- [ATIV AVALIATIVA] rubrica em linguagem de aluno, igual à de contextos/aval/av02-t3-plantao.md -->

# O que conta para Atendido

<SlideTable compact>

| Menção | O que precisa aparecer na sua folha |
|---|---|
| **Atendido** | Você escreveu sozinho as consultas dos itens 1 a 4, e cada uma responde exatamente ao que foi perguntado (o ano, o município, a ordem), com previsão, conferência e resposta com número. Quando o banco não devolve nada, a sua resposta diz isso, sem inventar número |
| **Parcialmente Atendido** | Pelo menos um item certo com consulta sua, mas: consulta que roda e não responde ao que foi perguntado, ou falta previsão ou conferência, ou o item foi montado com as tiras |
| **Não Atendido** | Nenhuma consulta que responda a um item, ou números copiados das tabelas sem consulta, ou respostas sem número do banco |

</SlideTable>

Errou e percebeu na conferência? Conserte e anote na folha: pegar o próprio erro conta a favor.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 20: O chamado de sexta, itens 1 a 3 -->

<!-- [ATIV AVALIATIVA] enunciado igual ao da folha impressa -->

# O chamado de sexta: itens 1 a 3

A secretária mandou cinco perguntas. Para cada uma, na folha: previsão, consulta, número do banco, conferência e resposta com o número.

1. Quantos casos **Ponta Grossa** teve em **2025**?
2. Quantos casos **cada macrorregional** teve em **2024**? Liste da maior para a menor.
3. Em que **mês de 2024** houve mais casos, e quantos?

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 21: O chamado de sexta, itens 4 e 5 -->

<!-- [ATIV AVALIATIVA] enunciado igual ao da folha impressa -->

# O chamado de sexta: itens 4 e 5

4. Quais os **3 municípios com menos casos** em **2025**?
5. Quantos casos a macrorregional **Centro-Sul** teve em **2025**?

Terminou os cinco? Revise as conferências: todo número da folha bate com uma tabela impressa ou com outra consulta?

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 22: Terminou a avaliação -->

<!-- objetivo: aluno que terminou a avaliação entrega e segue numa trilha sem atrapalhar quem ainda está fazendo -->

# Terminou a avaliação?

1. Entregue a folha do chamado e a ficha do plantão.
2. Não comente os itens com quem ainda está fazendo.
3. Enquanto espera: a **trilha do `JOIN`** (slide depois do aquecimento), **Foz do Iguaçu** (qual mês acima de 1.000 casos fica fora do começo do ano?), ou **pgexercises.com**, seções *Basic* e *Aggregates*.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 22x: Gabarito da avaliação, itens 1 e 2 -->

<!-- professor: não projetar durante a avaliação. O gabarito também libera às 13h. -->

# Gabarito da avaliação: itens 1 e 2

<AdminOnly>

```sql
-- item 1: 6.643 (T2, Ponta Grossa)
SELECT SUM(casos) FROM casos_dengue WHERE municipio = 'Ponta Grossa' AND ano = 2025;

-- item 2: Oeste, Norte, Leste, Noroeste (T3, coluna casos_2024)
SELECT macrorregional, SUM(casos) AS total_2024 FROM casos_dengue WHERE ano = 2024
GROUP BY macrorregional ORDER BY total_2024 DESC;
```
<!-- sql: espera
6643
Oeste|125979
Norte|100510
Leste|92741
Noroeste|66290
-->

**Erro provável que separa A de PA:** o item 1 sem o filtro de ano, que soma 2024 e 2025 juntos.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 22y: Gabarito da avaliação, itens 3 e 4 -->

<!-- professor: não projetar durante a avaliação. -->

# Gabarito da avaliação: itens 3 e 4

<AdminOnly>

```sql
-- item 3: março, 103.609 (T1, coluna 2024)
SELECT mes, SUM(casos) AS total FROM casos_dengue WHERE ano = 2024
GROUP BY mes ORDER BY total DESC LIMIT 1;

-- item 4: Campo Mourão, Joaquim Távora, São José dos Pinhais (T2, fim da tabela)
SELECT municipio, SUM(casos) AS total_2025 FROM casos_dengue WHERE ano = 2025
GROUP BY municipio ORDER BY total_2025 LIMIT 3;
```
<!-- sql: espera
3|103609
Campo Mourão|213
Joaquim Távora|1005
São José dos Pinhais|1049
-->

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 22z: Gabarito da avaliação, item 5 -->

<!-- professor: não projetar durante a avaliação. Item 5 é o canário: número inventado vira conversa individual antes da menção. -->

# Gabarito da avaliação: item 5

<AdminOnly>

```sql
-- item 5: a consulta volta vazia ([NULL]), porque Centro-Sul não existe no banco
SELECT SUM(casos) FROM casos_dengue WHERE macrorregional = 'Centro-Sul' AND ano = 2025;
```
<!-- sql: espera -->

Resposta certa: "não existe macrorregional Centro-Sul no banco; as quatro são Leste, Noroeste, Norte e Oeste". Para provar, basta listar as macrorregionais com `GROUP BY macrorregional`: voltam 4 linhas.

</AdminOnly>


---
layout: cover
bgPreset: palette
---

<!-- SLIDE 23: Divisor o robô -->

# O ROBÔ: INDICADOR 4

## O que um robô de IA pode ver no seu banco?

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 24: Portaria, como funciona -->

<!-- professor: 5 voluntários, crachás em branco; três portas com o nome escrito em folha: casos_dengue, municipios, painel. O professor é o porteiro. -->

# Portaria: como funciona

**Dinâmica · 15 min · sem computador, de pé**

- Cinco voluntários recebem um **crachá** em branco. Cada crachá é uma **conta** do banco.
- A sala tem três portas, cada uma com um nome: `casos_dengue`, `municipios` e `painel` (um resumo com os totais).
- O **porteiro** confere o crachá antes de abrir qualquer porta. Crachá sem carimbo não entra em lugar nenhum.
- Um **carimbo** no crachá diz o que a conta pode fazer, e em qual porta: por exemplo, "pode ler o painel".

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 25: Portaria, as 5 rodadas -->

<!-- objetivo: aluno associa GRANT a carimbar e REVOKE a riscar o carimbo, antes de ver os comandos no banco -->

# Portaria: as 5 rodadas

<SlideTable compact>

| Rodada | O que acontece | No banco |
|---|---|---|
| 1 | O crachá sem carimbo tenta entrar em `casos_dengue`: barrado | uma conta nova não pode nada |
| 2 | O porteiro carimba "pode ler o painel" | `GRANT SELECT ON painel TO conta;` |
| 3 | Com esse carimbo, tenta entrar em `casos_dengue`: barrado | a permissão vale só para a porta do carimbo |
| 4 | Tenta apagar alguma coisa no painel: barrado | ler (`SELECT`) não é apagar (`DELETE`) |
| 5 | O porteiro risca o carimbo, e o crachá é barrado no painel | `REVOKE SELECT ON painel FROM conta;` |

</SlideTable>

`GRANT` quer dizer conceder, em inglês. `REVOKE` quer dizer revogar: tirar o que foi concedido.

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 26: Conta não é pessoa -->

<!-- objetivo: aluno define conta (role) como uma identidade com permissões, usada por uma pessoa ou por um programa -->

# Conta não é pessoa

**Conceito**

- **O que é:** uma conta (em inglês, *role*) é uma identidade dentro do banco: um nome, uma senha e a lista do que ela pode fazer.
- **Exemplo:** `alunoNN` é a sua conta. Quem entra com ela é você, pelo DBeaver.
- **Analogia:** o crachá da portaria. O porteiro confere o crachá, não a pessoa.
- **Para que serve:** um programa também usa conta. O painel automático da secretaria vai ter a dele, separada da sua e com outras permissões.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Antes e depois, no banco de quem é dono"
outputTone: neutral
---

<!-- SLIDE 27: O dono pode tudo -->

<!-- objetivo: aluno entende que o dono de uma tabela pode ler, mudar e apagar tudo nela, e que nenhuma permissão barra o dono -->

# O dono da tabela pode tudo

**Conceito** · Quem cria uma tabela é o **dono** dela. O dono pode ler, mudar e apagar qualquer linha, e nenhuma permissão barra o dono. No seu banco, o dono das tabelas é a conta `alunoNN`.

Com a conta de dono, um único comando `DELETE` (apagar, em inglês) tira da tabela as 24 linhas de Londrina: 12 meses × 2 anos. Este slide só mostra o resultado: **não rode**.

::output::

<div class="antes-depois">
<div>

**Antes** · `SELECT count(*) FROM casos_dengue;`

```text
count
------
  408
```

</div>
<div>

**Depois do `DELETE` de Londrina**

```text
count
------
  384
```

</div>
</div>

::note::

408 − 24 = 384. É por isso que o robô não vai usar a conta de dono.

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 28: Menor privilégio -->

<!-- objetivo: aluno define o princípio do menor privilégio e o aplica à conta do painel (Saltzer e Schroeder, 1975) -->

# Menor privilégio: só o que o trabalho precisa

**Conceito**

- **O que é:** cada conta recebe só as permissões que o trabalho dela precisa, e nenhuma a mais.
- **Exemplo:** o painel mostra o total de casos por município e ano. A conta do painel precisa ler esse resumo, e nada mais.
- **Analogia:** quem entrega pizza recebe o código do portão do prédio, não a chave do apartamento.
- **Para que serve:** se a conta errar, ou for usada por quem não devia, o estrago fica do tamanho da permissão.

Fonte: Saltzer e Schroeder, *The Protection of Information in Computer Systems*, 1975.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 29: Fixação no caderno -->

<!-- objetivo: aluno aplica o menor privilégio ao perfil do robô antes de criar a conta -->

# Fixação: o que o robô do painel precisa?

**Exercício · 5 min · no caderno**

O painel automático mostra o total de casos por município e ano. Marque o que a conta do robô precisa para esse trabalho:

- **a)** ler a tabela `casos_dengue` inteira, linha por linha
- **b)** ler só o resumo com os totais
- **c)** apagar linhas
- **d)** criar tabelas novas

Para cada letra que você **não** marcou, escreva em uma frase o que poderia dar errado se o robô tivesse aquela permissão.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 29x: Fixação no caderno (cont.) -->

<!-- objetivo: aluno confere a fixação e o motivo de cada permissão negada -->

# Fixação (cont.): gabarito

<AdminOnly>

**Gabarito:** só a letra **b**. Com a letra a, o robô veria dados de que o painel não precisa. Com a c, um erro do robô apagaria dados. Com a d, o robô poderia encher o banco de tabelas.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 30: OWASP LLM06 -->

<!-- objetivo: aluno reconhece, numa fonte de segurança real, que um agente de IA que só precisa ler não deve poder apagar (OWASP, 2025) -->

# O agente de IA que só precisa ler

A **OWASP** é uma fundação sem fins lucrativos que publica listas dos riscos de segurança mais comuns em software. Na lista de 2025 para aplicações com **LLM** (modelo de linguagem grande, em inglês *large language model*: o tipo de IA do ChatGPT), o risco LLM06 é a **agência excessiva**: um agente de IA com mais permissão do que a tarefa precisa.

Fonte: OWASP Top 10 para aplicações com LLM, 2025, item LLM06.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 30x: OWASP LLM06 (cont.) -->

<!-- objetivo: aluno lê o exemplo original da OWASP e a tradução, e liga o exemplo ao robô do painel -->

# O agente de IA que só precisa ler (cont.)

O exemplo do próprio texto da OWASP:

> *"an LLM agent that uses a product database in order to make purchase recommendations to a customer might only need read access to a 'products' table; it should not have access to other tables, nor the ability to insert, update or delete records."*

**Tradução:** um agente de IA que usa o banco de produtos para recomendar compras talvez só precise ler a tabela de produtos. Ele não deve ter acesso a outras tabelas, nem poder inserir, alterar ou apagar registros.

O robô do painel é esse agente: ele só precisa ler o resumo com os totais.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 31: Replit, 18/07/2025 -->

<!-- objetivo: aluno relaciona um incidente real à permissão que o agente tinha, não à intenção do agente (AIID 1152) -->

# Replit, 18/07/2025: o agente apagou porque podia

**Caso real**

- A Replit é uma empresa de programação pela internet. Ela oferece um agente de IA que escreve e roda código.
- Em 18/07/2025, durante um período em que ninguém devia mexer em nada (o *code freeze*, congelamento do código), o agente apagou o **banco de produção** de um cliente, o banco de verdade que o sistema usava, mesmo com ordem explícita de não mexer.

Fonte: AI Incident Database, incidente 1152 · Fast Company, 2025.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 31x: Replit (cont.) -->

<!-- objetivo: aluno identifica a permissão de apagar como a causa do estrago, e não a intenção do agente -->

# Replit (cont.): o que a permissão mudaria

- Depois de apagar, o agente afirmou que não dava para recuperar os dados. Era falso: o cliente recuperou.
- A conta que o agente usava **tinha permissão para apagar**. Sem essa permissão, o comando teria sido barrado, como o crachá sem carimbo da portaria.

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 32: VIEW -->

<!-- objetivo: aluno define VIEW como uma consulta guardada com nome, que mostra só o resultado dessa consulta -->

# VIEW: uma consulta com nome

**Conceito**

- **O que é:** uma VIEW (visão, em inglês) é uma consulta guardada no banco com um nome. Quem lê a VIEW recebe o resultado da consulta, e só ele.
- **Exemplo:** a consulta da A60 com o total de cada município em cada ano (`GROUP BY municipio, ano`, 34 linhas) vira a VIEW `painel_totais`.
- **Analogia:** a vitrine de uma loja mostra alguns produtos, e o estoque fica nos fundos. Quem só pode ver a vitrine não entra no estoque.
- **Para que serve:** dá para liberar a VIEW para uma conta sem liberar a tabela `casos_dengue`. É a porta "painel" da portaria.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 33: Passo 1, criar a conta do robô -->

<!-- objetivo: aluno cria uma conta nova com CREATE ROLE, usando o próprio número para não colidir com as contas dos colegas -->

# Passo 1, na conexão do dono: criar a conta do robô

**Exercício · 5 min · no editor da conexão `alunoNN`**

```sql
CREATE ROLE robo_ia_NN LOGIN PASSWORD 'roboNN';
```

- `CREATE ROLE` cria uma conta nova.
- `LOGIN` deixa a conta entrar pelo DBeaver. `PASSWORD 'roboNN'` é a senha dela.
- Troque os dois `NN` pelo seu número da chamada. As contas valem no servidor inteiro, não só no seu banco: dois alunos criando `robo_ia` sem número dariam erro de conta que já existe.

**Confira:** rodou sem mensagem vermelha? A conta existe.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 34: Passo 2, a segunda conexão -->

<!-- objetivo: aluno cria uma conexão com a conta do robô, porque testar com a conta de dono não testa permissão nenhuma -->

<!-- professor: conferir no laboratório o rótulo do Rename (pode aparecer em pt-BR) -->

# Passo 2: a segunda conexão, com a conta do robô

**Exercício · 10 min**

1. Menu **Database** → **New Database Connection** → **PostgreSQL** (o ícone do elefante) → **Next**.
2. Aba **Main**: o mesmo Host (no quadro) e Port `5432`, Database `dengue_NN`, Username `robo_ia_NN`, Password `roboNN`.
3. **Test Connection ...** → apareceu **Connected** → **OK** → **Finish**.
4. Na coluna da esquerda aparece uma segunda conexão. Clique nela com o botão direito → **Rename** (renomear) e escreva `robo_ia_NN`.

Testar com a conta de dono não testa nada: o dono nunca é barrado.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 34x: Passo 2 (cont.) -->

<!-- objetivo: aluno abre um editor ligado à conexão do robô e sabe conferir em qual conexão está rodando -->

# Passo 2 (cont.): um editor para cada conexão

1. Clique com o botão direito na conexão `robo_ia_NN` → **SQL Editor** → **New SQL script**.
2. Esse editor novo roda tudo como o robô. O nome da conexão aparece na aba do editor: confira antes de rodar.
3. O editor de 01/10 continua ligado à conexão `alunoNN`, a do dono.

Daqui em diante, cada slide de comando diz em qual conexão rodar.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 35: Passo 3, preveja -->

<!-- objetivo: aluno prevê o que acontece quando uma conta sem permissão tenta ler a tabela -->

# Passo 3, na conexão do robô: o robô consegue ler a tabela?

**Exercício · 5 min**

1. **Preveja** na ficha: o robô consegue ler a tabela `casos_dengue`? Sim ou não, e por quê.
2. No editor do robô, rode:

```sql
SELECT * FROM casos_dengue LIMIT 3;
```
<!-- sql: pular -->

3. Copie na ficha a mensagem que o banco devolveu.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "O que o DBeaver mostrou, no editor do robô"
outputTone: error
---

<!-- SLIDE 35x: Passo 3 (cont.) -->

<!-- objetivo: aluno lê a mensagem de permissão negada e liga o código 42501 à falta de permissão -->

# Passo 3 (cont.): permissão negada

```sql
SELECT * FROM casos_dengue LIMIT 3;
```
<!-- sql: pular -->

::output::

```text
SQL Error [42501]: ERROR: permission denied for table casos_dengue
```

::note::

**Em português:** permissão negada para a tabela `casos_dengue`. O `42501` é o código que o Postgres usa para falta de permissão. A conta do robô nasceu sem nenhum carimbo: como o crachá em branco da rodada 1, não entra em lugar nenhum.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 36: Passo 4, a VIEW do painel -->

<!-- objetivo: aluno cria a VIEW do painel reaproveitando a consulta de totais da A60 e prevê quantas linhas ela tem -->

# Passo 4, conexão do dono: a VIEW do painel

**Exercício · 8 min** · **Preveja** na ficha: quantas linhas a VIEW vai ter? Depois rode, no editor do dono:

```sql
CREATE VIEW painel_totais AS
SELECT municipio, ano, SUM(casos) AS total
FROM casos_dengue
GROUP BY municipio, ano;
```

A VIEW aparece na árvore do DBeaver, em **Views**, dentro de **public**. Se não aparecer, clique na conexão e aperte `F5` para atualizar.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "O que voltou (34 linhas, aparecem 3)"
outputTone: neutral
---

<!-- SLIDE 36x: Passo 4 (cont.) -->

<!-- objetivo: aluno lê a VIEW como se fosse uma tabela e confere as 34 linhas -->

# Passo 4 (cont.): ler a VIEW como uma tabela

Ainda no editor do dono:

```sql
SELECT * FROM painel_totais ORDER BY municipio, ano;
```
<!-- sql: pular -->

::output::

```text
  municipio   | ano  | total
--------------+------+-------
 Apucarana    | 2024 | 19755
 Apucarana    | 2025 | 10271
 Campo Mourão | 2024 |   674
```

::note::

**Confira:** 17 municípios × 2 anos = 34 linhas.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 37: Passo 5, o carimbo só na VIEW -->

<!-- objetivo: aluno dá ao robô só a permissão de ler a VIEW, lendo cada parte do comando GRANT -->

# Passo 5, conexão do dono: o carimbo só na VIEW

**Exercício · 3 min**

```sql
GRANT SELECT ON painel_totais TO robo_ia_NN;
```
<!-- sql: pular -->

`GRANT` dá uma permissão; `SELECT` é a permissão de ler; `ON painel_totais` diz em qual VIEW, e só nela; `TO robo_ia_NN` diz para qual conta.

Nada muda na tabela `casos_dengue`: o robô continua sem permissão nela.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 38: Passo 6, três provas -->

<!-- objetivo: aluno prova, com a conta do robô, o que a permissão deixa e o que ela barra -->

# Passo 6, na conexão do robô: três provas

**Exercício · 12 min** · Para cada linha: **preveja** na ficha, rode no editor do robô e copie o que o banco devolveu.

<SlideTable compact>

| Prova | Consulta, no editor do robô |
|---|---|
| 1. Ler o painel | `SELECT count(*) FROM painel_totais;` |
| 2. Ler a tabela | `SELECT * FROM casos_dengue LIMIT 3;` |
| 3. Apagar | `DELETE FROM casos_dengue WHERE ano = 2023;` |

</SlideTable>

A prova 3 tenta apagar as linhas de 2023, que não existem na tabela. Se você rodar por engano na conexão do dono, nada se perde.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 38x: Passo 6 (cont.) -->

<!-- objetivo: aluno confere as três provas e reconhece o sinal de que rodou na conexão errada -->

# Passo 6 (cont.): gabarito

<AdminOnly>

**Prova 1:** 34. **Prova 2:** `permission denied for table casos_dengue`. **Prova 3:** `permission denied for table casos_dengue`: o banco barra o `DELETE` antes de procurar as linhas, então nem importa que 2023 não exista.

**Rodou na conexão errada?** Na do dono, a prova 2 mostra 3 linhas e a prova 3 diz que apagou 0 linhas: o dono não é barrado. Confira o nome da conexão na aba do editor.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 39: Passo 7, tirar e devolver o carimbo -->

<!-- objetivo: aluno tira a permissão com REVOKE, prova o efeito e devolve com GRANT -->

# Passo 7: tirar o carimbo e devolver

**Exercício · 8 min**

1. **Conexão do dono:** `REVOKE SELECT ON painel_totais FROM robo_ia_NN;`
2. **Conexão do robô:** **preveja**, e rode de novo `SELECT count(*) FROM painel_totais;`
3. **Conexão do dono:** `GRANT SELECT ON painel_totais TO robo_ia_NN;` de novo.
4. **Conexão do robô:** rode a consulta do item 2 mais uma vez. Voltaram as 34 linhas?

O robô precisa ficar funcionando: ele volta a trabalhar no próximo plantão.

<AdminOnly>

**Gabarito:** no item 2, `permission denied for view painel_totais` (agora a mensagem diz *view*, não *table*). No item 4, 34.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 40: Verso da ficha -->

<!-- objetivo: aluno registra, com a prova de cada linha, o que o robô pode e não pode, e justifica pelo perfil -->

# Verso da ficha: o que o robô pode e não pode

**Exercício · 8 min · no verso da página 2**

<SlideTable compact>

| Ação | O robô pode? | O que o banco respondeu | Por quê |
|---|---|---|---|
| Ler o painel (`painel_totais`) | | | |
| Ler a tabela `casos_dengue` | | | |
| Apagar linhas | | | |

</SlideTable>

Na coluna "por quê", use o trabalho do robô (o que o painel mostra) e o princípio do menor privilégio.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 41: Trilha, uma conta que só vê o Norte -->

<!-- objetivo: aluno que já sabia dar permissões cria um segundo perfil, com uma VIEW filtrada por macrorregional -->

# Trilha: uma conta que só vê o Norte

**Para quem terminou, ou já sabia dar permissões (A47 e A50)** · A regional de saúde do Norte vai ter um painel só com os municípios dela. Na conexão do dono:

```sql
CREATE VIEW painel_norte AS
SELECT municipio, ano, mes, casos
FROM casos_dengue
WHERE macrorregional = 'Norte';
CREATE ROLE norte_NN LOGIN PASSWORD 'norteNN';
GRANT SELECT ON painel_norte TO norte_NN;
SELECT count(*) FROM painel_norte;
```
<!-- sql: espera
72
-->

Depois crie a conexão com a conta `norte_NN` e prove o limite: a VIEW abre (72 linhas, 3 municípios × 24 meses) e a tabela dá `permission denied`.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 42: Os comandos de hoje, consultas -->

<!-- objetivo: aluno tem uma tabela de consulta com o que foi novo hoje nas consultas -->

# Os comandos de hoje: consultas

<SlideTable compact>

| Comando | O que faz | Exemplo do dia |
|---|---|---|
| `>` `<` `>=` `<=` `<>` | comparam números no `WHERE` | `casos > 1000` |
| `count(*)` | conta as linhas que passaram pelo `WHERE` | 5 meses |
| `SUM(casos)` | soma a coluna `casos` dessas linhas | 15.253 casos |
| outra consulta | confere o que não está impresso: as partes somam o todo | 5 + 7 = 12 meses |

</SlideTable>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 42x: Os comandos de hoje, permissões -->

<!-- objetivo: aluno tem uma tabela de consulta com os comandos de permissão do dia -->

# Os comandos de hoje: permissões

<SlideTable compact>

| Comando | O que faz | Exemplo do dia |
|---|---|---|
| `CREATE ROLE` | cria uma conta | `CREATE ROLE robo_ia_NN LOGIN PASSWORD 'roboNN';` |
| `CREATE VIEW` | guarda uma consulta com um nome | `painel_totais`, 34 linhas |
| `GRANT` | dá uma permissão numa tabela ou VIEW | `GRANT SELECT ON painel_totais TO robo_ia_NN;` |
| `REVOKE` | tira uma permissão | `REVOKE SELECT ON painel_totais FROM robo_ia_NN;` |

</SlideTable>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 43: Entrega da ficha -->

<!-- objetivo: aluno confere se a página 2 da ficha está completa antes de entregar -->

# Entrega da ficha

Antes de entregar, confira se a página 2 tem:

- As três perguntas de memória respondidas.
- O aquecimento de Maringá: as previsões, os números do banco, as duas conferências (12 meses e o total da T2) e a **resposta para a secretária, com os números**.
- No verso: a tabela do que o robô pode e não pode, com o que o banco respondeu e o porquê.

Entregue a página 2 junto com a folha da avaliação. A ficha volta para você em 08/10 e ganha a página 3.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 44: Próximo plantão -->

<!-- objetivo: aluno sai sabendo o que acontece em 08/10 e que os Indicadores 4 e 6 são avaliados nesse dia -->

# Próximo plantão: 08/10

- O robô continua ligado no seu banco, com a permissão que você deu hoje.
- Você aprende a guardar uma cópia do banco (em inglês, *backup*) e a recuperar os dados a partir dela.
- **Avaliação dos Indicadores 4 e 6**, na segunda metade do dia. O 4 é o de hoje: gerencia a permissão de acesso ao banco de dados, de acordo com o perfil do usuário e as políticas de acesso. O 6: cria e manipula armazenamento e backup de banco de dados.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 45: Tarefa de casa -->

<!-- tarefa de casa: aula 61 -->

# Tarefa de Casa: Aula 61

> **Prazo: início da próxima aula (08/10)** · no caderno

Os aplicativos do seu celular também têm permissões, como a conta do robô.

1. Escolha um app que você usa todo dia e abra as permissões dele. **Android:** Configurações → Apps (em alguns celulares, Aplicativos) → o app → Permissões. **iPhone:** Ajustes → role até o app → toque nele.
2. Anote **duas** permissões que ele tem e que combinam com o que ele faz (exemplo: câmera, num app de fotos).
3. Anote **uma** permissão que ele tem e de que não precisa para o que você usa, e explique em uma frase por quê, usando o princípio do menor privilégio.

---
layout: end
bgPreset: palette
---

<!-- SLIDE 46: Fim -->

# Até 08/10

## Fim do plantão de hoje
