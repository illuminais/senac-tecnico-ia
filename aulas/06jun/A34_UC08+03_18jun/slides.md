---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 34 — Copa Analytics"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 34"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-06-18"
unlockHour: 9
layout: cover
---

<!-- SLIDE 1 -->

# Aula 34
## Copa Analytics: Banco de Dados e Matematica

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 34"
---

<!-- SLIDE 2 -->
<!-- debate: abertura A34 -->

# Voce e analista de dados da Copa

**Contexto da aula - 3 minutos**

- A Copa do Mundo 2026 acabou de comecar. Doze jogos da Rodada 1 ja aconteceram.
- Voce foi contratado como analista de dados junior por uma empresa de estatisticas esportivas.
- Sua missao: responder uma pergunta de negocio usando SQL e Matematica.

> **Pergunta inicial:** Se voce fosse escolher uma selecao para acompanhar essa Copa, qual voce escolheria? Por que?

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
aulaNum: "Aula 34"
---

<!-- SLIDE 3 -->

# UC08 - Banco de Dados
## Bloco 2 - Copa Analytics com SQL

---
layout: default
card: true
bgPreset: animate
aulaNum: "Aula 34"
---

<!-- SLIDE 4 -->
<!-- objetivo: aluno compreende a estrutura dos 4 datasets da Copa 2026 (normalização e dicionário de dados) -->

# Os dados que voce vai usar hoje

**Quatro arquivos CSV formam o banco Copa 2026:**

<SlideTable>

| Arquivo | O que contem |
|---|---|
| `copa2026_selecoes.csv` | 24 selecoes, 6 grupos (A/B/C/D/I/J), ranking FIFA |
| `copa2026_partidas.csv` | 12 resultados reais da Rodada 1 |
| `copa2026_stats.csv` | Gols, saldo, posse, chutes, amarelos por selecao |
| `copa2026_historico.csv` | Desempenho nas Copas 2014, 2018 e 2022 |

</SlideTable>

> **Por que 4 arquivos separados?** Para nao repetir dado. Cada tabela guarda um tipo de informacao - isso e **normalizacao** (organizar o banco para evitar duplicatas).

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 5 -->
<!-- objetivo: aluno consegue ler os resultados reais da Rodada 1 e identificar os times no dataset -->

# Rodada 1 - Resultados reais

<SlideTable compact>

| Partida | Placar | Partida | Placar |
|---|---|---|---|
| Brasil x Marrocos | 1 x 1 | Franca x Senegal | 3 x 1 |
| Escocia x Haiti | 1 x 0 | Noruega x Iraque | 4 x 1 |
| Mexico x Africa do Sul | 2 x 0 | Argentina x Argelia | 3 x 0 |
| Coreia do Sul x Tchecia | 2 x 1 | Austria x Jordania | 3 x 1 |
| EUA x Paraguai | 4 x 1 | Canada x Bosnia | 1 x 1 |
| Australia x Turquia | 2 x 0 | Catar x Suica | 1 x 1 |

</SlideTable>

> Esses resultados estao em `copa2026_partidas.csv`. Cada linha e uma partida: `time_casa`, `gols_casa`, `gols_fora`, `cidade`.

---
layout: default
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 34"
---

<!-- SLIDE 6 -->
<!-- objetivo: aluno entende as 5 perguntas-guia e escolhe uma para o time -->

# Escolha a pergunta do seu time

**Cada time escolhe UMA pergunta-guia. Voces vao responder ela com SQL.**

1. Qual selecao tem melhor custo-beneficio em gols por chute?
2. Se voce fosse patrocinador, qual selecao escolheria e por que?
3. Qual grupo tem o futebol mais imprevisivel?
4. Qual selecao mais evoluiu nas ultimas 3 Copas?
5. Qual cidade-sede recebeu mais gols na Rodada 1?

<!-- professor: cada time escolhe agora e anota no papel. Papeis dos membros: Analista de Dados, Estrategista, Visualizador, Apresentador -->

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 7 -->
<!-- objetivo: aluno lembra SELECT, WHERE, ORDER BY e prepara a base para usar com dados da Copa -->

# Revisao rapida: SELECT, WHERE, ORDER BY

```sql
-- Listar selecoes em ordem de ranking FIFA
SELECT nome, grupo, ranking_fifa
FROM copa2026_selecoes
ORDER BY ranking_fifa ASC;
```

**O que cada parte faz:**
- `SELECT` - escolhe quais colunas mostrar
- `FROM` - diz de qual tabela buscar
- `ORDER BY` - ordena o resultado (`ASC` = crescente, `DESC` = decrescente)

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 8 -->
<!-- objetivo: aluno usa WHERE com AND para filtrar dados da Copa -->

# WHERE com AND

```sql
-- AND: selecoes com saldo positivo E menos de 2 amarelos
SELECT nome, saldo_gols, amarelos
FROM copa2026_stats
WHERE saldo_gols > 0 AND amarelos < 2
ORDER BY saldo_gols DESC;
```

**AND exige que as DUAS condicoes sejam verdadeiras ao mesmo tempo.**

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 8b -->
<!-- objetivo: aluno usa WHERE com OR para filtrar dados da Copa -->

# WHERE com OR (cont.)

```sql
-- OR: selecoes do grupo A OU do grupo B
SELECT nome, grupo
FROM copa2026_selecoes
WHERE grupo = 'A' OR grupo = 'B'
ORDER BY nome;
```

**OR aceita linhas onde pelo menos UMA das condicoes e verdadeira.**

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 8c -->
<!-- objetivo: aluno usa WHERE com NOT para filtrar dados da Copa -->

# WHERE com NOT (cont.)

```sql
-- NOT: selecoes que NAO empataram (ou seja, venceram ou perderam)
SELECT nome, saldo_gols
FROM copa2026_stats
WHERE NOT saldo_gols = 0
ORDER BY saldo_gols DESC;
```

**NOT inverte a condicao: seleciona tudo que NAO satisfaz o criterio.**

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 9 -->
<!-- objetivo: aluno usa GROUP BY para agregar dados por grupo da Copa -->

# GROUP BY - agrupando por grupo

```sql
-- Total de gols marcados por grupo na Rodada 1
SELECT s.grupo,
       SUM(p.gols_casa + p.gols_fora) AS total_gols
FROM copa2026_partidas p
INNER JOIN copa2026_selecoes s ON p.time_casa = s.nome
GROUP BY s.grupo
ORDER BY total_gols DESC;
```

**O que `GROUP BY` faz:**
- Junta todas as linhas que tem o mesmo valor em `grupo`
- Aplica uma funcao de agregacao: `SUM`, `COUNT`, `AVG`, `MAX`, `MIN`
- Resultado: uma linha por grupo com o calculo pronto

---
layout: default
card: true
bgPreset: animate
aulaNum: "Aula 34"
---

<!-- SLIDE 10 -->
<!-- objetivo: aluno entende o problema que o INNER JOIN resolve -->

# INNER JOIN - por que precisamos cruzar tabelas?

**Problema:** `copa2026_partidas` tem o nome do time, mas nao tem o grupo. `copa2026_selecoes` tem o grupo, mas nao tem os gols.

**Solucao:** usar `INNER JOIN` para cruzar as duas tabelas em uma so consulta.

- A condicao de ligacao (`ON`) diz qual coluna conecta as duas tabelas
- So aparecem no resultado as linhas que existem nas DUAS tabelas ao mesmo tempo

---
layout: default
card: true
bgPreset: animate
aulaNum: "Aula 34"
---

<!-- SLIDE 10b -->
<!-- objetivo: aluno le e interpreta a sintaxe do INNER JOIN -->

# INNER JOIN - a query completa (cont.)

```sql
-- INNER JOIN: traz so as linhas que existem nas DUAS tabelas
SELECT s.nome,
       s.grupo,
       p.gols_casa,
       p.gols_fora,
       p.cidade
FROM copa2026_selecoes s
INNER JOIN copa2026_partidas p
       ON s.nome = p.time_casa OR s.nome = p.time_fora
WHERE s.grupo = 'C';
```

> `ON` e a condicao de ligacao entre as duas tabelas. Se um time nao tiver partida registrada, ele nao aparece no resultado.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 11 -->
<!-- objetivo: aluno pratica INNER JOIN com um exemplo guiado antes de partir para o exercicio livre -->

# INNER JOIN - exemplo com dois times

```sql
-- Partidas do Grupo C com detalhes de cada selecao
SELECT s.nome        AS selecao,
       s.ranking_fifa,
       p.gols_casa,
       p.gols_fora,
       p.cidade
FROM copa2026_selecoes s
INNER JOIN copa2026_partidas p
       ON s.nome = p.time_casa OR s.nome = p.time_fora
WHERE s.grupo = 'C'
ORDER BY s.ranking_fifa;
```

**Leitura em voz alta:** "Selecione nome e ranking de cada selecao, cruze com as partidas onde esse time jogou, filtre pelo Grupo C."

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 12 -->
<!-- objetivo: aluno aplica SELECT+WHERE com AND/OR no contexto da pergunta-guia do time -->

# Exercicio 1 - Nível 1: Leitura de query

**O que esta query retorna?**

```sql
SELECT nome, gols_pro, saldo_gols, posse_media
FROM copa2026_stats
WHERE gols_pro >= 3 AND saldo_gols > 0
ORDER BY saldo_gols DESC;
```

- A) Todas as selecoes do banco de dados
- B) Selecoes que marcaram 3 ou mais gols E tem saldo positivo
- C) Selecoes que marcaram 3 gols OU tem saldo positivo
- D) Selecoes com saldo negativo

<AdminOnly>

**Gabarito:** B

A condicao `WHERE gols_pro >= 3 AND saldo_gols > 0` usa AND: as DUAS condicoes precisam ser verdadeiras ao mesmo tempo. O resultado traz selecoes como Argentina (3 gols, saldo +3), EUA (4 gols, saldo +3), Noruega (4 gols, saldo +3).

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 13 -->
<!-- objetivo: aluno escreve query com WHERE e ORDER BY para responder a pergunta-guia -->

# Exercicio 2 - Nivel 2: Escreva a query

**Missao do Analista de Dados do time:**

Escreva uma query que mostre as selecoes com **mais de 2 chutes** E **saldo de gols maior que 0**, ordenadas do maior saldo para o menor.

Tabela: `copa2026_stats` - colunas: `nome`, `chutes`, `saldo_gols`, `amarelos`

```sql
-- Complete a query abaixo:
SELECT nome, chutes, saldo_gols
FROM copa2026_stats
WHERE _____ AND _____
ORDER BY _____ _____;
```

<AdminOnly>

**Gabarito:**

```sql
SELECT nome, chutes, saldo_gols
FROM copa2026_stats
WHERE chutes > 2 AND saldo_gols > 0
ORDER BY saldo_gols DESC;
```

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 14 -->
<!-- objetivo: aluno constrói um INNER JOIN para cruzar stats com grupo da selecao -->

# Exercicio 3 - Nivel 3: INNER JOIN na pratica

**Missao:** Mostre o nome, grupo, saldo de gols e quantidade de amarelos das selecoes do Grupo A.

Voce precisa cruzar `copa2026_selecoes` com `copa2026_stats`.

```sql
-- Complete o JOIN e o filtro:
SELECT s.nome, s.grupo, st.saldo_gols, st.amarelos
FROM copa2026_selecoes s
INNER JOIN copa2026_stats st ON _______
WHERE s.grupo = _______
ORDER BY st.saldo_gols DESC;
```

<AdminOnly>

**Gabarito:**

```sql
SELECT s.nome, s.grupo, st.saldo_gols, st.amarelos
FROM copa2026_selecoes s
INNER JOIN copa2026_stats st ON s.nome = st.nome
WHERE s.grupo = 'A'
ORDER BY st.saldo_gols DESC;
```

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 15 -->
<!-- objetivo: aluno aplica GROUP BY com JOIN para calcular gols por grupo -->

# Exercicio 4 - Nivel 4: GROUP BY com JOIN

**Missao:** Calcule o total de gols marcados por cada grupo na Rodada 1.

Cruze `copa2026_partidas` com `copa2026_selecoes` e agrupe por grupo.

```sql
-- Esqueleto da query:
SELECT s.grupo,
       SUM(_______) AS total_gols
FROM copa2026_partidas p
INNER JOIN copa2026_selecoes s ON _______
GROUP BY _______
ORDER BY total_gols DESC;
```

<AdminOnly>

**Gabarito:**

```sql
SELECT s.grupo,
       SUM(p.gols_casa + p.gols_fora) AS total_gols
FROM copa2026_partidas p
INNER JOIN copa2026_selecoes s ON p.time_casa = s.nome
GROUP BY s.grupo
ORDER BY total_gols DESC;
```

Nota: esse JOIN usa apenas `time_casa` para nao contar os gols em dobro. Cada partida e contada uma vez.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 16 -->
<!-- objetivo: aluno aplica os 4 comandos SQL para responder a pergunta-guia do time -->

# Exercicio 5 - Nivel 5: Pergunta-guia do time

**Agora e com voces.**

Cada time usa os comandos aprendidos para responder a pergunta-guia escolhida no inicio.

**Estrutura esperada da resposta:**
1. Query principal que responde a pergunta
2. Resultado da query (pelo menos 3 linhas da saida)
3. Uma frase de conclusao: "Com base nos dados, a selecao X..."

**Salve como:** `SENAC-TecIA/Aula-34/copa_analytics_[nome_do_time].sql`

<!-- professor: times tem 20-25 minutos para escrever as queries. Circule e ajude com erros de sintaxe. O Apresentador vai fazer pitch de 2 min na proxima aula. -->

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 34"
---

<!-- SLIDE 17 -->
<!-- debate: A34 UC08 -->

# Debate: O que o SQL nao consegue responder?

**Reflexao coletiva - 5 minutos**

- Voce conseguiu responder a pergunta-guia so com SQL?
- O que faltou nos dados para responder melhor?
- Se voce fosse criar um banco de dados para a Copa, que tabela nova voce adicionaria?

> **Conexao com UC03:** agora que voce ja filtrou com `AND` e `OR` em SQL, vamos ver de onde esses operadores vieram na Matematica.

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
aulaNum: "Aula 34"
---

<!-- SLIDE 18 -->

# UC03 - Matematica para Computacao
## Bloco 2 - Logica Booleana e Conjuntos com dados da Copa

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 34"
---

<!-- SLIDE 19 -->
<!-- debate: abertura UC03 -->

# O AND que voce escreveu e Matematica

**Conexao direta - 3 minutos**

Voce acabou de escrever:
```sql
WHERE saldo_gols > 0 AND amarelos < 2
```

- Na Matematica, isso se chama **logica booleana** (logica de verdadeiro/falso).
- George Boole descreveu esse sistema em 1854. O computador inteiro funciona assim.
- **Pergunta:** se `saldo_gols > 0` e verdadeiro para o Brasil e `amarelos < 2` e falso, o Brasil aparece no resultado?

---
layout: default
card: true
bgPreset: animate
aulaNum: "Aula 34"
---

<!-- SLIDE 20 -->
<!-- objetivo: aluno constrói a tabela verdade de AND e OR usando dados reais da Copa -->

# Tabela Verdade com dados Copa

**Situacao:** A = "saldo de gols maior que zero" / B = "menos de 2 amarelos"

<SlideTable>

| A (saldo > 0) | B (amarelos < 2) | A AND B | A OR B |
|---|---|---|---|
| Verdadeiro | Verdadeiro | Verdadeiro | Verdadeiro |
| Verdadeiro | Falso | Falso | Verdadeiro |
| Falso | Verdadeiro | Falso | Verdadeiro |
| Falso | Falso | Falso | Falso |

</SlideTable>

> **AND**: os DOIS precisam ser verdadeiros. **OR**: pelo menos UM precisa ser verdadeiro. **NOT**: inverte: verdadeiro vira falso, falso vira verdadeiro.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 21 -->
<!-- objetivo: aluno le a tabela verdade do NOT e entende a inversao logica -->

# NOT - invertendo a condicao

**NOT transforma verdadeiro em falso e falso em verdadeiro:**

<SlideTable>

| A (saldo > 0) | NOT A |
|---|---|
| Verdadeiro | Falso |
| Falso | Verdadeiro |

</SlideTable>

> Computadores executam bilhoes de operacoes AND, OR, NOT por segundo. Cada pixel da tela, cada byte de dados - tudo passa por portas logicas que fazem exatamente isso.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 21b -->
<!-- objetivo: aluno identifica o NOT no SQL e as formas equivalentes de escrita -->

# NOT no SQL (cont.)

**No SQL que voce escreveu:**

```sql
WHERE NOT saldo_gols = 0
```

e o mesmo que:

```sql
WHERE saldo_gols <> 0
-- ou
WHERE saldo_gols != 0
```

**Tres formas de escrever "diferente de zero" em SQL. O NOT e a mais legivel para iniciantes.**

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 22 -->
<!-- objetivo: aluno representa conjuntos com notacao formal e diagrama de Venn usando dados da Copa -->

# Conjuntos com dados Copa

**Notacao formal de conjuntos:**

- **A** = { selecoes com saldo positivo } - ex: Argentina, EUA, Franca, Noruega...
- **B** = { selecoes com menos de 2 amarelos } - ex: Brasil, Escocia, Australia...
- **A ∩ B** (intersecao - "A E B") = selecoes que tem saldo positivo E menos de 2 amarelos
- **A ∪ B** (uniao - "A OU B") = selecoes que tem saldo positivo OU menos de 2 amarelos (ou os dois)
- **A - B** (diferenca) = selecoes com saldo positivo mas que receberam 2 ou mais amarelos

> **Conexao SQL:** `AND` em SQL = `∩` em conjuntos. `OR` em SQL = `∪` em conjuntos. Sao a mesma ideia escrita de formas diferentes.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 23 -->
<!-- objetivo: aluno entende visualmente que INNER JOIN é a intersecao de dois conjuntos -->

# INNER JOIN = Intersecao de Conjuntos

**O JOIN que voce fez em SQL e exatamente a intersecao ∩:**

- **Conjunto S** = todas as selecoes em `copa2026_selecoes`
- **Conjunto P** = todos os times em `copa2026_partidas`
- **S ∩ P** = times que existem nas DUAS tabelas = o resultado do `INNER JOIN`

**Se um time esta em S mas nao esta em P** (por exemplo, uma selecao que ainda nao jogou): ele NAO aparece no resultado do `INNER JOIN`.

> Isso e exatamente o diagrama de Venn que voce vai desenhar agora no papel quadriculado.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 24 -->
<!-- objetivo: aluno desenha diagramas de Venn e identifica intersecao/uniao/diferenca com dados reais -->

# Exercicio 6 - Nivel 1: Diagrama de Venn no papel

**Missao do Visualizador:** no papel, desenhe dois circulos sobrepostos.

- **Circulo A:** selecoes com saldo de gols positivo (dados da Rodada 1)
- **Circulo B:** selecoes do Grupo A ou Grupo B

Coloque cada selecao no lugar: so em A / intersecao A∩B / so em B / fora dos dois.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 24b -->
<!-- objetivo: gabarito do exercicio 6 para o professor -->

# Exercicio 6 - Gabarito (cont.)

<AdminOnly>

**Gabarito parcial:**

Selecoes com saldo positivo na Rodada 1: Argentina (+3), EUA (+3), Noruega (+3), Franca (+2), Mexico (+2), Coreia do Sul (+1), Escocia (+1), Australia (+2), Austria (+2).

Grupos A e B dependem de como o professor distribuiu os grupos na tabela `copa2026_selecoes.csv`.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 25 -->
<!-- objetivo: aluno monta tabela verdade para uma condicao de tres variaveis usando dados da Copa -->

# Exercicio 7 - Nivel 2: Tabela verdade de tres condicoes

Monte a tabela verdade para: `WHERE saldo_gols > 0 AND amarelos < 2 AND gols_pro >= 2`

A = "saldo > 0" · B = "amarelos < 2" · C = "gols_pro >= 2"

No papel, preencha as 8 combinacoes possiveis de V/F para A, B e C — e o resultado de `A AND B AND C`.

> Dica: com 3 variaveis booleanas, quantas linhas a tabela tem ao total?

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 25b -->
<!-- objetivo: gabarito do exercicio 7 para o professor -->

# Exercicio 7 - Gabarito (cont.)

<AdminOnly>

**Gabarito:**

Com 3 variaveis booleanas: 2³ = 8 combinacoes ao total (a tabela acima mostra 4, faltam mais 4 com A=Falso).

A AND B AND C so e Verdadeiro quando as TRES sao verdadeiras. Resultado: apenas a primeira linha (V, V, V) = Verdadeiro.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 26 -->
<!-- objetivo: aluno plota pontos em grafico cartesiano e identifica correlacao visual entre ranking e pontos -->

# Funcao linear: Ranking FIFA vs Pontos

**O que queremos descobrir:** times bem ranqueados pontuam melhor?

**Missao do Visualizador:**

No papel quadriculado, crie um grafico:
- Eixo X: ranking FIFA (use valores de 1 a 80)
- Eixo Y: gols_pro (de 0 a 5)
- Plote um ponto para cada selecao com seus dados reais

**Depois:** trace uma reta que "parece" passar pelo meio dos pontos. Isso e a **funcao linear** (y = ax + b).

<!-- professor: mostre como seria no grafico: se a reta cai da esquerda para direita (times menores numero = mais gols), isso indica correlacao negativa - times mais bem ranqueados tendem a marcar mais -->

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 27 -->
<!-- objetivo: aluno identifica o significado de cada parametro da funcao linear no contexto do grafico -->

# Lendo a funcao linear: y = ax + b

**No nosso grafico, cada letra tem um significado:**

- **y** = gols marcados na Rodada 1
- **x** = ranking FIFA
- **a** = inclinacao da reta (negativa = quanto menor o ranking, mais gols)
- **b** = onde a reta cruza o eixo Y (gols quando ranking = 0)

> Se `a` for negativo, times com ranking menor (ex: 1, 2, 3) tendem a marcar mais gols. Isso faria sentido?

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 27b -->
<!-- objetivo: aluno calcula a inclinacao da reta com dois pontos reais do grafico -->

# Calculando a inclinacao da reta (cont.)

**Exemplo de leitura com dados reais:**

Se a reta passa pelos pontos (1, 4) e (80, 1):

- inclinacao a = (4 - 1) / (1 - 80) = 3 / (-79) ≈ -0,038
- Para x = 10: y = -0,038 × 10 + b

**Interpretacao:** a cada 10 posicoes de ranking pior, esperamos aproximadamente 0,38 gols a menos.

> Isso e o inicio do que, na IA, se chama **regressao linear** - um dos algoritmos mais usados para prever valores numericos.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 28 -->
<!-- objetivo: aluno aplica logica booleana e funcao linear para justificar a pergunta-guia do time -->

# Exercicio 8 - Nivel 4: Justificativa matematica

**Missao do Estrategista do time:**

Com base nos dados que o Analista de Dados encontrou e no grafico do Visualizador, escreva 3 linhas respondendo a pergunta-guia do time usando linguagem matematica.

> Use os resultados do Exercicio 7 (grafico) e do Exercicio 6 (query AND) para embasar as 3 frases.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 28b -->
<!-- objetivo: aluno consulta a estrutura minima e salva o arquivo de justificativa -->

# Exercicio 8 - Nivel 4: Justificativa matematica (cont.)

**Estrutura minima das 3 frases:**
1. "A intersecao dos conjuntos A ∩ B mostra que..."
2. "A query com AND retornou X selecoes porque..."
3. "O grafico indica [correlacao positiva / negativa / nenhuma correlacao] porque..."

**Salve como:** `SENAC-TecIA/Aula-34/justificativa_matematica_[nome_do_time].txt`

<!-- professor: esse texto sera usado na apresentacao da proxima aula. Cobrar linguagem tecnica correta: intersecao, uniao, correlacao, funcao linear -->

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 34"
---

<!-- SLIDE 29 -->
<!-- debate: A34 UC03 -->

# Debate: A Matematica que o computador usa

**Reflexao coletiva - 5 minutos**

- Por que voce acha que computadores usam 0 e 1 e nao numeros maiores?
- A tabela verdade que voce montou tem alguma relacao com como a IA toma decisoes?
- O que e mais util para voce: o SQL ou a Matematica por tras dele?

> **Conexao futura:** na proxima aula de Estatistica, vamos calcular correlacao de forma precisa - nao so no olho, mas com formula matematica real.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 30 -->
<!-- tarefa de casa: aula 34 — parte SQL -->

# Tarefa de Casa - Aula 34

> **Prazo: inicio da proxima aula**

**Parte 1 - SQL (UC08):**
Escreva uma query que responda: "Quais selecoes tiveram mais gols marcados do que sofridos E menos de 3 amarelos?" Ordene pelo saldo de gols.

**Salve como:** `SENAC-TecIA/Aula-34/tarefa_sql_[seu_nome].sql`

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 34"
---

<!-- SLIDE 30b -->
<!-- tarefa de casa: aula 34 — parte matematica -->

# Tarefa de Casa - Aula 34 (cont.)

**Parte 2 - Matematica (UC03):**
No papel quadriculado (ou no computador), plote o grafico de ranking FIFA (eixo X) vs saldo de gols (eixo Y) para todas as 12 selecoes que jogaram na Rodada 1. Escreva uma frase descrevendo a correlacao que voce observou.

**Salve como:** `SENAC-TecIA/Aula-34/tarefa_grafico_[seu_nome].jpg` (foto do papel) ou `.png`

---
layout: end
github: LeoZanini
avatar: https://github.com/LeoZanini.png?size=256
aulaNum: "Aula 34"
bgPreset: palette
---

<!-- SLIDE 31 -->

# Ate a proxima aula!

**Proxima aula:** Pitch dos times - cada time apresenta 2 minutos respondendo a pergunta-guia com os dados.

> Traga o arquivo SQL salvo e a justificativa matematica do time.
