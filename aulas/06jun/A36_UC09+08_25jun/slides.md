---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 36"
author: Leonardo Zanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 36"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-06-25"
unlockHour: 13
layout: cover
---

# Aula 36
## Do achismo ao dado que convence

**UC09 Estatística Descritiva + UC08 GROUP BY e JOIN**

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

# BLOCO 1
## UC09 - Estatística Descritiva
### Fechando o ciclo Copa Analytics

---
layout: brainstorm
bgPreset: palette
pulse: true
---

<!-- objetivo: ativar memória da A35 e criar conflito cognitivo com o dado real (Copa Analytics) -->

# Na aula passada...

**Vocês levantaram hipóteses sobre a Copa.**

- "Times que chutam mais ganham mais"
- "Marrocos foi longe jogando diferente"
- "Posse de bola não decide campeonato"

<v-click>

## Mas eram hipóteses. Hoje os dados falam.

**Será que o achismo bate o número?**

</v-click>

---
layout: default
bgPreset: animate
---

<!-- objetivo: aluno recorda a definição de média e mediana distinguindo robustez a outlier (Rumsey, Statistics for Dummies, 2016) -->

# Retomada: Média e Mediana

**Média** soma tudo e divide pelo total de valores

$$\bar{x} = \frac{x_1 + x_2 + \cdots + x_n}{n}$$

<v-click>

**Mediana** é o valor do meio quando você ordena os dados

- Com n par: média dos dois valores centrais
- Com n ímpar: valor exatamente central

</v-click>

<v-click>

> **Por que isso importa?** A mediana ignora outliers. Um time que jogou 1 jogo com 80 chutes não distorce a mediana do grupo.

</v-click>

---
layout: default
bgPreset: animate
---

<!-- SLIDE 5 -->
<!-- objetivo: aluno compreende desvio padrão como medida de consistência antes de ver a fórmula (Wheelan, Naked Statistics, 2013) -->

# Desvio Padrão: o que é consistência?

**Dois times, mesma média de chutes por jogo: 10**

| Jogo | Time A | Time B |
|------|--------|--------|
| 1 | 10 | 4 |
| 2 | 10 | 18 |
| 3 | 10 | 8 |

<v-click>

- Time A: sempre 10 - **consistente**
- Time B: de 4 a 18 - **irregular**

**Desvio padrão mede isso: o quanto os valores se afastam da média.**

</v-click>

---
layout: center
bgPreset: animate
---

<!-- SLIDE 5b -->
<!-- objetivo: aluno vê a fórmula do desvio padrão após ter a intuição do conceito estabelecida -->

# Desvio Padrão: a fórmula

$$\sigma = \sqrt{\frac{\sum(x_i - \bar{x})^2}{n}}$$

*Parece complexo - mas vamos fazer passo a passo.*

---
layout: default
bgPreset: default
---

<!-- objetivo: aluno visualiza na tabela real que fase_eliminada se correlaciona com chutes e finalizacoes (dados: copa_analise_estatistica.csv) -->

# Os dados reais da Copa

**Professor: abrir copa_analise_estatistica.csv na tela**

<SlideTable>

| Seleção | Copa | Fase | Chutes | Finalizações |
|---------|------|------|--------|--------------|
| Argentina | 2022 | Campeã | 76 | 38 |
| França | 2022 | Vice | 92 | 40 |
| Marrocos | 2022 | Semi | 61 | 17 |
| Brasil | 2022 | Quartas | 70 | 30 |
| Japão | 2022 | Oitavas | 34 | 13 |
| Marrocos | 2018 | Grupo | 27 | 9 |

</SlideTable>

<v-click>

**Padrão óbvio:** mais chutes = chegou mais longe... mas Marrocos 2022 quebra a regra!

</v-click>

---
layout: two-cols-text
bgPreset: default
---

<!-- objetivo: aluno identifica que desvio padrão baixo explica o desempenho de Marrocos 2022 além da média de chutes -->

# Argentina vs Marrocos 2022

**Argentina 2022 - Campeã**
- Chutes totais: 76 (em 7 jogos)
- Média por jogo: ~10,9
- Finalizações: 38
- Chutes por jogo: variados (10, 9, 12, 11, 11, 10, 13)

::right::

**Marrocos 2022 - Semifinal**
- Chutes totais: 61 (em 7 jogos)
- Média por jogo: ~8,7
- Finalizações: 17
- Chutes por jogo: consistentes (9, 8, 10, 7, 9, 8, 10)

<v-click>

**A pergunta:** Marrocos chutou MENOS. Por que chegou tão longe?

**Resposta:** Desvio padrão baixo = time consistente = defesa organizada e sem variação.

</v-click>

---
layout: default
bgPreset: palette
card: true
---

<!-- SLIDE 8 -->
<!-- objetivo: aluno aplica os 3 indicadores calculando manualmente com dados reais do Japão 2022 -->

# Atividade Individual - Papel e Caneta

**Chutes por jogo do Japão em 2022:**

| Jogo | Adversário | Chutes |
|------|------------|--------|
| 1 | vs Alemanha | 12 |
| 2 | vs Costa Rica | 8 |
| 3 | vs Espanha | 6 |
| 4 | vs Croácia | 8 |

---
layout: default
bgPreset: palette
card: true
---

<!-- SLIDE 8b -->
<!-- objetivo: aluno sabe quais cálculos executar antes de ver o passo a passo -->

# Atividade Individual - Papel e Caneta (cont.)

**Calcule:**
1. A média de chutes por jogo
2. A mediana de chutes por jogo
3. O desvio padrão passo a passo
4. O que o DP diz sobre o estilo de jogo do Japão?

*Professor: chame os alunos um por vez enquanto a turma resolve (2 min cada)*

---
layout: default
bgPreset: default
---

<!-- SLIDE 9 -->
<!-- objetivo: aluno executa o cálculo de desvio padrão passo a passo com valores concretos -->

# Passo a Passo: Desvio Padrao do Japao

**Dados: 12, 8, 6, 8**

**Passo 1 - Calcular a media:**

$$\bar{x} = \frac{12 + 8 + 6 + 8}{4} = \frac{34}{4} = 8{,}5$$

---
layout: default
bgPreset: default
aulaNum: "Aula 36"
---

<!-- SLIDE 9b -->
<!-- objetivo: aluno calcula as diferencas e quadrados para chegar ao desvio padrao -->

# Passo a Passo: Desvio Padrao do Japao (cont.)

**Passo 2 - Diferencas em relacao a media (8,5):**

| $x_i$ | $x_i - 8{,}5$ | $(x_i - 8{,}5)^2$ |
|--------|----------------|-------------------|
| 12 | 3,5 | 12,25 |
| 8 | -0,5 | 0,25 |
| 6 | -2,5 | 6,25 |
| 8 | -0,5 | 0,25 |

---
layout: default
bgPreset: default
---

<!-- SLIDE 9b -->
<!-- objetivo: aluno calcula a média dos quadrados como terceiro passo do desvio padrão -->

# Passo a Passo: Desvio Padrão do Japão (cont.)

**Passo 3 - Média dos quadrados:**

$$\frac{12{,}25 + 0{,}25 + 6{,}25 + 0{,}25}{4} = \frac{19}{4} = 4{,}75$$

---
layout: default
bgPreset: default
---

<!-- SLIDE 9c -->
<!-- objetivo: aluno conclui o cálculo aplicando a raiz quadrada e obtém o desvio padrão final -->

# Passo a Passo: Desvio Padrão do Japão (cont.)

**Passo 4 - Raiz quadrada:**

$$\sigma = \sqrt{4{,}75} \approx 2{,}18$$

---
layout: default
bgPreset: default
card: true
---

<!-- objetivo: aluno interpreta o desvio padrão comparando dois times para consolidar o conceito de consistência -->

# Granulado: Compare Japão e Marrocos 2022

**Quem terminou a atividade principal - tente este:**

**Marrocos 2022 - chutes por jogo:** 9, 8, 10, 7, 9, 8, 10

Calcule os 3 indicadores do Marrocos e responda:

1. Qual time teve desvio padrão menor?
2. Qual foi mais consistente nos chutes?
3. Sendo consistente nos chutes, Marrocos chegou mais longe que o Japão. O que isso sugere?

<AdminOnly>

**Gabarito:**
- Média Marrocos: (9+8+10+7+9+8+10)/7 = 61/7 ≈ 8,7
- Mediana Marrocos: ordenar [7, 8, 8, 9, 9, 10, 10] → mediana = 9
- DP Marrocos: desvios (-0,3 / -0,7 / 1,3 / -1,7 / 0,3 / -0,7 / 1,3) → quadrados (0,09/0,49/1,69/2,89/0,09/0,49/1,69) → soma=7,43 → média=1,06 → raiz≈1,03
- DP Japão ≈ 2,18 vs DP Marrocos ≈ 1,03 → Marrocos foi mais consistente
- Consistência + defesa organizada = campanha longa sem precisar dominar estatisticamente

</AdminOnly>

---
layout: default
bgPreset: default
---

<!-- objetivo: professor conduz entrevista individual avaliativa (AdminOnly) enquanto turma resolve atividade -->

# Entrevista Individual

*Professor: use este slide somente na sua tela*

<AdminOnly>

**3 perguntas por aluno (2 min cada):**

1. "O que é mediana e por que ela é diferente de média?"
   - Resposta esperada: mediana é o valor do meio quando os dados estão ordenados; média divide a soma total pelo n. A mediana não muda se um valor extremo mudar.

2. "[mostra 4 números: 3, 7, 2, 9] Qual é a mediana desses números?"
   - Resposta: ordenar [2, 3, 7, 9] → mediana = (3+7)/2 = 5

3. "Um time tem desvio padrão alto de gols marcados. O que isso me diz?"
   - Resposta esperada: o time é irregular - às vezes marca muitos gols, às vezes poucos. Não é consistente no ataque.

**Critério:** resposta completa = A (atendido), incompleta = PA (parcialmente atendido), não sabe = NA

</AdminOnly>

---
layout: default
bgPreset: default
---

<!-- SLIDE 12 -->
<!-- objetivo: aluno consolida os 3 indicadores e sua interpretação aplicada ao contexto real da Copa -->

# O que os dados provaram

**Hipótese simples:** "times que chutam mais chegam mais longe"

**O que os números mostram:**

| Fase | Média de Chutes |
|------|-----------------|
| Campeão / Vice | 76-92 chutes |
| Semifinal | 61-85 chutes |
| Quartas | 68-70 chutes |
| Oitavas | 34-50 chutes |
| Grupo | 24-32 chutes |

---
layout: default
bgPreset: default
---

<!-- SLIDE 12b -->
<!-- objetivo: aluno interpreta a exceção do Marrocos 2022 e recebe conexão com a aula seguinte -->

# O que os dados provaram (cont.)

<v-click>

**A regra geral se confirma - mas Marrocos 2022 quebra a lógica simples.**

Desvio padrão baixo = consistência = também importa para chegar longe.

</v-click>

<v-click>

> **Na sexta:** vocês criam a própria base de dados e calculam tudo isso em Python com pandas.

</v-click>

---
layout: brainstorm
bgPreset: palette
pulse: true
---

<!-- objetivo: debate sobre o que é mais importante - volume de chutes ou consistência - conectando ao que verão em SQL -->

# Debate: Quantidade ou Consistência?

**Marrocos 2022 chegou à semifinal com menos chutes que a Argentina campeã.**

> Se você fosse o técnico de um time, o que priorizaria para o próximo campeonato?

**A) Volume de ataque** - chute mais, crie mais oportunidades

**B) Consistência defensiva** - varie menos, seja previsível para você e imprevisível para o adversário

**C) Depende do adversário** - mude a estratégia conforme quem enfrenta

*Não existe resposta certa. O argumento é o que importa.*

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

# BLOCO 2
## UC08 - Banco de Dados
### GROUP BY e JOIN com os dados da Copa

---
layout: brainstorm
bgPreset: palette
pulse: true
---

<!-- objetivo: criar conexão entre o cálculo manual feito no Bloco 1 e o que SQL pode fazer automaticamente -->

# SQL vai confirmar o que você calculou na mão

**No bloco anterior você calculou:**
- Média de chutes do Japão: 8,5
- Mediana: 8
- Desvio padrão: 2,18

<v-click>

**Agora imagine:**

> E se você tivesse 300 times para calcular?

**SQL resolve isso em 2 linhas.** E vai mostrar exatamente os mesmos números que você calculou na mão.

</v-click>

---
layout: default
bgPreset: default
---

<!-- SLIDE 16 -->
<!-- objetivo: aluno relembra a estrutura básica de SELECT antes de avançar para GROUP BY (revisão necessária dado o diagnóstico de A34) -->

# Revisão: SELECT do zero

**Ambiente:** sqliteonline.com - professor já carregou copa2026.db

A estrutura básica do SQL:

```sql
SELECT coluna1, coluna2
FROM tabela
WHERE condicao
ORDER BY coluna ASC;
```

---
layout: default
bgPreset: default
---

<!-- SLIDE 16b -->
<!-- objetivo: aluno lê o SELECT linha por linha e fixa a analogia em linguagem natural -->

# Revisão: SELECT do zero (cont.)

**Leia linha por linha:**
- `SELECT` - o que quero ver
- `FROM` - de qual tabela
- `WHERE` - com qual filtro
- `ORDER BY` - em qual ordem

<v-click>

> É como dizer ao banco: *"Me mostre as colunas X e Y, da tabela Z, onde Y vale tal coisa, ordenado por X."*

</v-click>

---
layout: default
bgPreset: default
card: true
---

<!-- objetivo: aluno executa SELECT simples com WHERE e ORDER BY como aquecimento antes do GROUP BY -->

# Exercício de Aquecimento

**Tarefa:** Liste os times do grupo C por ranking FIFA

```sql
SELECT nome, grupo, ranking_fifa
FROM selecoes
WHERE grupo = 'C'
ORDER BY ranking_fifa ASC;
```

**Digite no sqliteonline.com e veja o resultado.**

<AdminOnly>

**Resultado esperado:** lista dos times do grupo C em ordem crescente de ranking FIFA. Se der erro, verificar: aspas simples no 'C', ponto e vírgula no final, nome da tabela correto (selecoes sem acento).

</AdminOnly>

---
layout: default
bgPreset: animate
---

<!-- objetivo: aluno compreende GROUP BY como "separar em pilhas e calcular em cada pilha" antes de ver o código (analogia de ensino) -->

# GROUP BY: separar em pilhas

**Problema:** Qual e a media de chutes de cada fase do torneio?

**Sem GROUP BY:** voce calcularia fase por fase - 1 query por fase, 6 queries no total.

**Com GROUP BY:** uma query que separa automaticamente.

> O banco pega todos os times, **separa em pilhas** pela fase, e **calcula** a media de cada pilha.

---
layout: default
bgPreset: animate
aulaNum: "Aula 36"
---

<!-- objetivo: aluno visualiza as pilhas do GROUP BY com exemplos reais antes de ver o codigo -->

# GROUP BY: as pilhas na pratica

| Pilha "grupo" | Pilha "oitavas" | Pilha "semi" | Pilha "campeao" |
|---|---|---|---|
| Marrocos 2018 | Japao 2022 | Marrocos 2022 | Argentina 2022 |
| Japao 2014 | Mexico 2014 | Brasil 2014 | Franca 2018 |
| ... | ... | ... | ... |
| **Media: ~28** | **Media: ~44** | **Media: ~71** | **Media: ~83** |

> Cada pilha vira uma linha no resultado. O SQL faz isso em uma so query.

---
layout: default
bgPreset: default
---

<!-- objetivo: aluno lê e executa GROUP BY com AVG confirmando na tela os valores calculados manualmente no bloco UC09 -->

# GROUP BY com AVG - Live Coding

**Professor: digitar linha por linha, comentar cada uma**

```sql {1|2-3|4|5|6}
SELECT fase_eliminada,
       ROUND(AVG(chutes), 1) AS media_chutes,
       COUNT(*) AS qtd_times
FROM analise_estatistica
WHERE jogos > 0
GROUP BY fase_eliminada
ORDER BY media_chutes DESC;
```

---
layout: default
bgPreset: default
aulaNum: "Aula 36"
---

<!-- objetivo: aluno le cada parte da query GROUP BY e entende o que cada linha faz -->

# GROUP BY com AVG - Lendo a query

- `AVG(chutes)` - media da coluna chutes para cada pilha
- `ROUND(..., 1)` - arredondar para 1 casa decimal
- `COUNT(*)` - quantos times em cada pilha
- `WHERE jogos > 0` - excluir times que nao se classificaram
- `GROUP BY fase_eliminada` - a instrucao que cria as pilhas

---
layout: default
bgPreset: default
card: true
---

<!-- objetivo: aluno conhece as 4 funções de agregação principais com exemplos curtos -->

# Funções de Agregação SQL

<SlideTable>

| Função | O que faz | Exemplo |
|--------|-----------|---------|
| `AVG(coluna)` | Média dos valores | `AVG(chutes)` |
| `COUNT(*)` | Conta as linhas | `COUNT(*)` |
| `SUM(coluna)` | Soma total | `SUM(gols_pro)` |
| `MAX(coluna)` | Maior valor | `MAX(finalizacoes)` |
| `MIN(coluna)` | Menor valor | `MIN(faltas)` |
| `ROUND(valor, n)` | Arredonda | `ROUND(AVG(chutes), 1)` |

</SlideTable>

<v-click>

**Regra:** funções de agregação sempre andam com `GROUP BY` quando há outra coluna no `SELECT`.

</v-click>

---
layout: default
bgPreset: animate
---

<!-- objetivo: aluno compreende JOIN como "juntar duas planilhas pelo campo em comum" antes de ver o código -->

# INNER JOIN: juntar duas tabelas

**Problema:** quero ver a confederação de cada time que chegou às semis em 2022.

**Mas:** a tabela `analise_estatistica` tem fase e chutes. A tabela `selecoes` tem confederação e ranking. São tabelas separadas.

<v-click>

> **JOIN** junta as duas tabelas pelo campo que elas têm em comum: o nome da seleção.

</v-click>

<v-click>

**Analogia:** você tem duas planilhas Excel. Uma com notas dos alunos, outra com o nome completo. Você junta pelo número de matrícula. JOIN é isso - mas automático e sem copiar/colar.

</v-click>

---
layout: default
bgPreset: default
---

<!-- objetivo: aluno lê e executa INNER JOIN com WHERE filtrando fase e copa -->

# INNER JOIN - Live Coding

```sql {1-2|3|4-5|6}
SELECT s.nome, s.confederacao,
       h.fase_eliminada
FROM selecoes s
INNER JOIN historico h ON s.nome = h.selecao
WHERE h.copa = 2022
  AND h.fase_eliminada IN ('semi', 'final', 'vice', 'campeao')
ORDER BY h.fase_eliminada;
```

<v-click>

**Leia junto:**
- `selecoes s` - apelido `s` para a tabela de seleções
- `historico h` - apelido `h` para o histórico
- `ON s.nome = h.selecao` - o campo em comum entre as tabelas
- `IN ('semi', 'final', ...)` - filtrar múltiplos valores de uma vez

</v-click>

<v-click>

**O resultado:** nome + confederação + fase - de duas tabelas diferentes, numa só query.

</v-click>

---
layout: default
bgPreset: default
---

<!-- objetivo: aluno fixa a diferença visual entre usar alias (s. e h.) e o que acontece sem eles -->

# Por que usar alias nas tabelas?

**Sem alias - verboso:**
```sql
SELECT selecoes.nome, selecoes.confederacao,
       historico.fase_eliminada
FROM selecoes
INNER JOIN historico ON selecoes.nome = historico.selecao
```

<v-click>

**Com alias - limpo:**
```sql
SELECT s.nome, s.confederacao,
       h.fase_eliminada
FROM selecoes s
INNER JOIN historico h ON s.nome = h.selecao
```

</v-click>

<v-click>

**Regra:** quando tem JOIN, sempre use alias. O código fica legível e menos propenso a erro de digitação.

</v-click>

---
layout: default
bgPreset: palette
card: true
---

<!-- objetivo: aluno aplica GROUP BY e JOIN em atividade guiada com queries semi-prontas para preencher -->

# Atividade em Grupos - Atividade SQL A36

**Material:** folha impressa em mãos (colinha-sql + atividade-sql-a36)

**Regra de ouro:** escrevam a query NO PAPEL antes de digitar no computador.

**As hipóteses que vocês vão testar:**

1. Aquecimento: times do grupo C por ranking (já fizemos juntos)
2. Hipótese 1: qual fase teve mais faltas em média?
3. Hipótese 2: quais confederações chegaram às semis em 2022?
4. Hipótese 3: times com mais de 5 amarelos - em que fases estavam?
5. Hipótese livre: escrevam a hipótese do próprio grupo e tentem provar

**Grupos de até 3 - 1 computador por grupo**

---
layout: default
bgPreset: default
---

<!-- objetivo: professor monitora e usa AdminOnly como gabarito das 4 hipóteses da atividade -->

# Gabaritos da Atividade (Professor)

<AdminOnly>

**Hipótese 1 - média de faltas por fase:**
```sql
SELECT fase_eliminada,
       ROUND(AVG(faltas), 1) AS media_faltas,
       COUNT(*) AS qtd_times
FROM analise_estatistica
WHERE jogos > 0
GROUP BY fase_eliminada
ORDER BY media_faltas DESC;
```

**Hipótese 2 - confederações nas semis 2022:**
```sql
SELECT s.nome, s.confederacao, h.fase_eliminada
FROM selecoes s
INNER JOIN historico h ON s.nome = h.selecao
WHERE h.copa = 2022
  AND h.fase_eliminada IN ('semi', 'vice', 'campeao')
ORDER BY h.confederacao;
```

**Hipótese 3 - times com mais de 5 amarelos:**
```sql
SELECT selecao, copa, fase_eliminada, amarelos
FROM analise_estatistica
WHERE amarelos > 5 AND jogos > 0
ORDER BY amarelos DESC;
```

</AdminOnly>

---
layout: default
bgPreset: default
card: true
---

<!-- objetivo: aluno consolida GROUP BY + INNER JOIN reconhecendo quando usar cada um -->

# Quando usar GROUP BY vs JOIN?

<SlideTable>

| Situação | Use... |
|----------|--------|
| Quero calcular média, soma ou contagem por categoria | `GROUP BY` |
| Quero juntar informações de tabelas diferentes | `INNER JOIN` |
| Quero filtrar os grupos depois de agregar | `HAVING` (próxima aula) |
| Quero múltiplos filtros em uma lista | `WHERE ... IN (...)` |

</SlideTable>

<v-click>

**Regra prática:** se a pergunta começa com "qual é a média/soma/contagem de X por Y" - é GROUP BY. Se começa com "quero ver X e Y juntos e estão em tabelas diferentes" - é JOIN.

</v-click>

---
layout: brainstorm
bgPreset: palette
pulse: true
---

<!-- objetivo: debate sobre utilidade do SQL vs planilhas conectando ao futuro com Python e pandas -->

# SQL vs Planilha: quando usar cada um?

**Vocês calcularam à mão, viram no SQL e na sexta vão calcular em Python.**

> Por que existem 3 formas de fazer a mesma coisa?

**Debate rápido:**

- Quando uma planilha Excel é suficiente?
- Quando o SQL faz mais sentido?
- O que pandas (Python) traz que os outros dois não têm?

*Guarda essa pergunta para a sexta. Na A37 você vai entender na prática.*

---
layout: default
bgPreset: default
---

<!-- objetivo: aluno sabe o que vem na sexta e vê o encadeamento das 3 ferramentas -->

# Fechamento: o que fizemos hoje

**UC09 - Estatística:**
- Relembrou média e mediana
- Entendeu desvio padrão como consistência
- Calculou DP passo a passo com dados reais do Japão 2022
- Comparou Marrocos e Argentina usando os 3 indicadores

**UC08 - SQL:**
- Revisou SELECT / WHERE / ORDER BY
- Aprendeu GROUP BY: separar em pilhas e agregar
- Aprendeu INNER JOIN: juntar tabelas pelo campo em comum
- Testou hipóteses reais da Copa com queries

<v-click>

**Na sexta (A37):**
- Vocês criam a própria base de dados em Excel
- Carregam com pandas em Python
- Calculam média, mediana e DP com código
- Constroem um sistema de consulta que responde perguntas

</v-click>

---
layout: end
bgPreset: palette
github: LeoZanini
avatar: https://github.com/LeoZanini.png?size=256
---

# Até sexta!

**A37 - 26/jun - Sexta**

UC05 pandas do zero + UC09 desvio padrão em Python

> "Hoje o número provou o que o achismo não podia. Na sexta, você escreve o código que faz isso automaticamente."
