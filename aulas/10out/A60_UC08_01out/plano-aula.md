# Plano da A60: Plantão da Vigilância, dia 2 (consultas)

> **Épico 2, Banco de Dados (UC08)** · quinta 01/10/2026 · 6 HA · desenho do épico em `contextos/epicos/ep02-uc08.md`
> **Indicador 5:** cria e manipula consultas SQL de forma adequada para resolução de problemas
> **Status:** blocos 2 a 6 da A59, que não chegou a eles (25/09 fechou só o bloco 1). Slides já prontos, movidos da A59 em 29/09.
>
> Todo bloco ```sql deste arquivo roda de verdade no banco. Para conferir:
> `node scripts/checar-sql.mjs aulas/10out/A60_UC08_01out/plano-aula.md` (servidor de pé).

## Objetivo do dia

O aluno responde uma pergunta sobre a dengue no Paraná escrevendo uma consulta com `SELECT`, `WHERE`, `SUM`, `GROUP BY` e `ORDER BY`. Ele **prevê** o resultado antes de rodar e **confere** o número numa tabela impressa.

**O que não é objetivo hoje:** `JOIN` e `HAVING` (saíram do núcleo do épico em 30/09: o `JOIN` vira demonstração de 5 minutos na A61 e o `HAVING` fica como desafio), permissões (A61, depois da avaliação do Indicador 5) e backup (A62).

**A prova de sexta (A61) só cobra o que esta aula praticar.** Se a aula parar antes do `ORDER BY`, a prova não cobra ranking.

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

### Abertura: de volta ao plantão (sem PC, 10 min)

- Devolver a ficha do plantão (página 1). Quem faltou em 25/09 recebe a ficha e copia a previsão de linhas de um colega, com a conta.
- **Três perguntas de memória**, no verso da ficha: ler uma linha da `casos_dengue` em voz alta · a previsão das linhas e a conta (17 × 12 × 2 = 408) · as 4 macrorregionais.
- O chamado continua: os 5 números da secretária.

**Orçamento:** abertura (10 min) + blocos 2 a 6 (5 HA) cabem em 6 HA com uns 40 min de folga. A A59 só fechou o bloco 1 porque uma atividade extraclasse ocupou o começo da aula, não pelo ritmo da turma (relato do professor em 30/09); por isso o desenho fica como está, com o relógio e a ordem de corte abaixo como rede.

**Relógio** (minutos de aula, sem contar o intervalo):

| Minuto | Tem que estar feito |
|---|---|
| 60 | SQL humano terminado. Se não terminou, as rodadas 6 e 7 vão para o quadro, sem mover a turma |
| 110 | todo mundo conectado, com o `count(*)` e a pergunta 1 |
| 210 | pergunta 3 feita |
| 285 | começa o fechamento: ficha preenchida e recolhida |

**Ordem de corte**, do primeiro ao último a cair: 1º o desafio do bloco 6 · 2º a rodada 7 do SQL humano (`ORDER BY` fica no quadro) · 3º o "Preveja: 1, 12 ou 408 linhas?" do bloco 4 vira pergunta oral · 4º a pergunta 5 vai para o aquecimento da A61 · 5º a pergunta 4 também. **Não pode cair:** a conexão, o `count(*)` e as perguntas 1, 2 e 3 com conferência, que são a base da prova de sexta.

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
- **Cartão das 4 etapas na mesa** (Margulieux): 1. filtrar linhas (`WHERE`) · 2. definir o grupo (`GROUP BY`) · 3. calcular o resumo (`SUM`) · 4. filtrar grupos (fica vazio hoje, é o `HAVING` da A61).

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
  - O chamado da A61 (02/10) é anunciado: "A dengue em Maringá mudou de 2024 para 2025?", com a resposta exigida em números do banco e a consulta de cada um. A pergunta fica aberta. Trocado em 30/09, duas vezes: Londrina × Umuarama por 100 mil não tinha virada (Londrina é pior também por habitante), e Curitiba × Toledo repetia a taxa por 100 mil, que a turma já trabalhou muito (A56 e A59). O chamado de Maringá pede conceitos novos: comparar números no `WHERE`, contar linhas contra somar valores, e conferir com outra consulta.
  - Também é anunciado que a avaliação do Indicador 5 é no meio do dia de 02/10 (depois do aquecimento) e que, depois dela, vem o Indicador 4 com o robô de IA.

## Trilhas

- **Quem termina antes:** pgexercises.com (seção Basic e Aggregates), ou o desafio "total de 2024 contra 2025, município por município" (resolve com `GROUP BY municipio, ano` e a conta no celular).
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
4. ✅ Cartões do SQL humano prontos (confirmado pelo professor em 30/09).
5. ✅ **Feito em 30/09 (o professor rodou o comando; `verificar.sh`: 42 bancos, tudo certo).** **Contas até 40 (30/09):** a chamada vai até 40, com buracos de desistentes, e o servidor carregado em 23/09 tinha só 32 contas. O `banco.py` já gera 42 (41 e 42 de folga). No servidor ligado, as contas 33 a 42 são acrescentadas sem zerar ninguém, com o comando em `scripts/dataset-dengue/servidor/SUBIR-O-SERVIDOR.md` (linha "Acrescentar contas sem zerar a turma"). **Conferir antes da aula** que o `verificar.sh` diz "42 bancos".
6. Teste de 5 minutos para a A62: conectar num PC do laboratório com a conta de folga `aluno41` e fazer um backup pelo DBeaver. Se reclamar de versão, atualizar antes da A62.
