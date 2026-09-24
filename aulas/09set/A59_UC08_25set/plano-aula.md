# Plano da A59: Plantão da Vigilância, dia 1 (consultas)

> **Épico 2, Banco de Dados (UC08)** · sexta 25/09/2026 · 6 HA · desenho do épico em `contextos/epicos/ep02-uc08.md`
> **Indicador 5:** cria e manipula consultas SQL de forma adequada para resolução de problemas
> **Status:** em planejamento, falta a aprovação do professor antes de gerar os slides
>
> Todo bloco ```sql deste arquivo roda de verdade no banco. Para conferir:
> `node scripts/checar-sql.mjs aulas/09set/A59_UC08_25set/plano-aula.md` (servidor de pé).

## Objetivo do dia

O aluno responde uma pergunta sobre a dengue no Paraná escrevendo uma consulta com `SELECT`, `WHERE`, `SUM`, `GROUP BY` e `ORDER BY`. Ele **prevê** o resultado antes de rodar e **confere** o número numa tabela impressa.

**O que não é objetivo hoje:** `JOIN` e `HAVING` (ficam para a A60), permissões (A61), backup (A62).

## Chamado do dia

> "A secretária de saúde quer **5 números** até o fim do plantão. Cada número tem que vir com a consulta que o gerou e com a conferência numa tabela oficial."

| # | Pergunta da secretária | O que exige | Número | Onde conferir (gabarito impresso) |
|---|---|---|---|---|
| 1 | Quantos casos Londrina teve em março de 2025? | `WHERE` com 3 condições, sem soma | **6.614** | o cartão que o aluno segurou no SQL humano |
| 2 | Quantos casos Londrina teve em 2025 inteiro? | `WHERE` + `SUM` | **32.804** | T2, linha Londrina |
| 3 | Quantos casos cada macrorregional teve em 2025? | `GROUP BY` | Norte 44.080 · Oeste 38.681 · Noroeste 25.348 · Leste 18.623 | T3 |
| 4 | Quais os 5 municípios com mais casos em 2025? | `GROUP BY` + `ORDER BY ... DESC` + `LIMIT` | Londrina, Maringá, Cascavel, Foz do Iguaçu, Apucarana | T2, linhas 1 a 5 |
| 5 | Em que mês de 2025 houve mais casos? | `GROUP BY mes` + `ORDER BY` | **março, 29.884** | T1, coluna 2025 |

Gabarito impresso: as tabelas T1, T2 e T3 da aba `03_comparacoes` do `dengue_pr_comparado.xlsx`, uma folha por mesa. Conferi os 5 números contra elas em 23/09.

## Blocos (1 bloco = 1 HA)

Molde do épico: **pensar no papel → fazer no PC → conferir em par, falando → fechar no quadro.** Nenhum bloco tem mais de 20 minutos seguidos no PC.

### Bloco 1: Abertura do plantão (sem PC)

- **Entrega da ficha do plantão** (página 1), com nome e número da chamada. O número da chamada é o NN do login.
- **O dado em 5 minutos, no quadro:** uma linha da tabela `casos_dengue` escrita inteira (Apucarana, Norte, jan/2024, 5.603 casos). O que é cada coluna, com um exemplo por coluna.
- **Primeira previsão na ficha:** "São 17 municípios, 12 meses e 2 anos. Quantas linhas tem a tabela?" A conta é 17 × 12 × 2 = **408**. Esse número volta no bloco 3, quando eles rodam o `count(*)`.
- **Teoria curta:** o que é uma consulta. "Uma pergunta escrita num idioma que o banco entende. O banco devolve uma tabela." Ainda sem nenhum comando.

### Bloco 2: SQL humano (sem PC, de pé)

34 cartões impressos, cada um com **uma linha real** do banco: os 17 municípios em março e abril de 2025. Com 30 alunos, 4 ficam com dois cartões ou o professor segura. Cada cartão traz município, macrorregional, mês e casos, e um espaço vazio.

| Rodada | O professor diz | A turma faz | O que aparece no quadro |
|---|---|---|---|
| 1 | "Quem tem um cartão, leia a linha em voz alta" | lê | `SELECT * FROM cartoes` devolve todas as linhas |
| 2 | "Fiquem de pé só os cartões de março" | levanta quem tem mes = 3 (17 pessoas) | `WHERE mes = 3` corta linhas, não colunas |
| 3 | "De pé, só março **e** macrorregional Oeste" | 5 pessoas | `AND`: as duas condições **na mesma linha** |
| 4 | "De pé, quem é Norte **e** Noroeste ao mesmo tempo" | ninguém levanta | **Erro silencioso 7:** nenhuma linha é Norte e Noroeste ao mesmo tempo. O certo é `OR` ou `IN`. O banco não avisa: devolve vazio |
| 5 | "Só março. Agora cada um vai para o canto da sua macrorregional" | 4 grupos | `GROUP BY macrorregional`: 17 linhas viram 4 pilhas |
| 6 | "Cada canto soma os casos" (celular como calculadora) | Leste 4.071 · Noroeste 6.553 · Norte 10.941 · Oeste 8.319 | `SUM(casos)`: uma linha por pilha |
| 7 | "Os cantos se ordenam do maior para o menor" | Norte, Oeste, Noroeste, Leste | `ORDER BY ... DESC` |

**O que fica no quadro no fim** (ordem em que o banco executa, erro 10 da pesquisa):
`FROM` (pegar os cartões) → `WHERE` (quem fica de pé) → `GROUP BY` (ir para o canto) → `SUM` (somar no canto) → `ORDER BY` (fila por tamanho).

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

**Plano B, se a sala não comportar 30 pessoas em pé:** cartões na mesa, grupos de 5, e cada rodada vira "separem os cartões".

### Bloco 3: Primeira conexão e a pergunta 1 (PC, depois conferir)

- **Conexão no DBeaver:** Nova conexão, PostgreSQL. Host e porta no quadro. Database `dengue_NN`, usuário `alunoNN`, senha `dengueNN`. Um slide com o caminho completo de cliques, com o rótulo exato do DBeaver.
- **Conferir a previsão do bloco 1:**

```sql
SELECT count(*) FROM casos_dengue;
```
<!-- sql: espera
408
-->

- **Pergunta 1:** o aluno acha no DBeaver o próprio cartão do SQL humano.

```sql
SELECT municipio, mes, casos
FROM casos_dengue
WHERE municipio = 'Londrina' AND ano = 2025 AND mes = 3;
```
<!-- sql: espera
Londrina|3|6614
-->

- **Conferir em par:** "o número do banco é o do cartão que o colega segurou?"
- **Trilha de quem trava:** tiras de Parsons (`SELECT` · `municipio, mes, casos` · `FROM casos_dengue` · `WHERE` · `municipio = 'Londrina'` · `AND ano = 2025` · `AND mes = 3`).

### Bloco 4: Somar com WHERE, e a pergunta 2 (papel → PC → conferir)

- **Teoria curta:** `SUM` é a soma de uma coluna. Com `WHERE`, soma só as linhas que ficaram.
- **Prever no papel:** "a consulta abaixo devolve quantas linhas? 1, 12 ou 408?" (a resposta é 1).

```sql
SELECT SUM(casos)
FROM casos_dengue
WHERE municipio = 'Londrina' AND ano = 2025;
```
<!-- sql: espera
32804
-->

- **Conferir:** T2, linha Londrina (32.804).
- **Consulta errada impressa (erro 7, silencioso):** "o que volta? por quê?"

```sql
SELECT SUM(casos)
FROM casos_dengue
WHERE macrorregional = 'Norte' AND macrorregional = 'Noroeste';
```
<!-- sql: espera

-->

Volta **uma linha com a célula vazia** (no DBeaver aparece `[NULL]`: soma de nenhuma linha). Nenhuma linha tem duas macrorregionais, e o banco não mostra mensagem de erro. O certo:

```sql
SELECT SUM(casos)
FROM casos_dengue
WHERE macrorregional IN ('Norte', 'Noroeste') AND ano = 2025;
```
<!-- sql: espera
69428
-->

### Bloco 5: GROUP BY, e a pergunta 3 (papel → PC → conferir)

- **Volta aos cantos da sala:** "no bloco 2 vocês eram 4 pilhas. `GROUP BY` faz isso com as 408 linhas."
- **Cartão das 4 etapas na mesa** (Margulieux): 1. filtrar linhas (`WHERE`) · 2. definir o grupo (`GROUP BY`) · 3. calcular o resumo (`SUM`) · 4. filtrar grupos (fica vazio hoje, é o `HAVING` da A60).

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

- **Conferir:** T3, coluna `casos_2025`.
- **Consulta errada impressa (erro 1, o Postgres avisa):** coluna no `SELECT` que não está no `GROUP BY`. Mostrar a mensagem de erro traduzida: "a coluna `ano` precisa estar no `GROUP BY` ou dentro de uma soma".

```sql
SELECT municipio, ano, SUM(casos)
FROM casos_dengue
GROUP BY municipio;
```
<!-- sql: erro "must appear in the GROUP BY clause" -->

### Bloco 6: ORDER BY e LIMIT, perguntas 4 e 5, e fechamento

- **Pergunta 4:**

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

- **Pergunta 5:**

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

- **Conferir:** T2 linhas 1 a 5, e T1 coluna 2025 (março, 29.884).
- **Fechamento (sem PC, últimos 15 min):**
  - A ficha fica com os 5 números, cada um com a tabela onde foi conferido.
  - O professor recolhe as fichas.
  - O chamado da A60 é anunciado: "Londrina teve 32.804 casos e Umuarama 2.888. Isso quer dizer que Londrina está pior?" A pergunta fica aberta. A resposta depende da população, que está em outra tabela, e isso é o `JOIN` da A60.

## Trilhas

- **Quem termina antes:** pgexercises.com (seção Basic e Aggregates), ou o desafio "total de 2024 contra 2025, município por município" (resolve com duas consultas; na A60 aparece o jeito com uma só).
- **Quem trava:** as tiras de Parsons de cada pergunta e o cartão das 4 etapas. Se o banco quebrou: `./resetar.sh NN`, sem depuração.

## Materiais a produzir

| Material | Formato | Observação |
|---|---|---|
| `slides.md` | Slidev | Um slide por conceito (teoria esmiuçada), com a tabela antes e depois em todo slide de comando. Rodar `checar-sql.mjs` e `checar-repeticao.mjs` antes de publicar |
| 34 cartões do SQL humano | HTML para imprimir, gerado do banco | município, macrorregional, mês e casos de mar/abr 2025 |
| Ficha do plantão, página 1 | HTML para imprimir | Previsão das 408 linhas, os 5 números com a consulta e o lugar da conferência |
| Tiras de Parsons | HTML para imprimir | Uma tira por parte, perguntas 1 a 5 |
| Cartão das 4 etapas | HTML para imprimir | Fica na mesa o épico inteiro |
| Gabarito T1, T2 e T3 | impressão da aba `03_comparacoes` | Uma folha por mesa |

## Pendências antes de gerar os slides

1. ✅ **Resolvido em 23/09:** a linha que se chamava "Jacarezinho" era Joaquim Távora (código IBGE 4112801). Renomeada em todo lugar: planilhas, banco, rubrica da Av01-T3 e slides da A56 e da A58. Nenhum número mudou.
2. **Cuidado com o canário:** Pato Branco tem 3.419 casos em 2025, a 2 do canário 3.417. Não usar esse número em slide sem avisar, para não confundir a conferência da Av01-T3.
3. Testar a conexão de outra máquina do laboratório (Plano A) antes de sexta.
4. Confirmar impressão dos cartões e da ficha.
