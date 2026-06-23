# SQL com SQLite - Referencia

Todos os exemplos usam as tabelas da Copa 2026.
Tabelas disponiveis: `selecoes`, `historico`, `partidas`, `stats`, `analise_estatistica`

---

## DQL - Consultando dados

DQL = Data Query Language. Voce so le os dados, nao muda nada.

---

### SELECT basico

Escolhe quais colunas mostrar de uma tabela.

```sql
SELECT nome, grupo, ranking_fifa
FROM selecoes;
```

Para trazer todas as colunas de uma vez:

```sql
SELECT *
FROM selecoes;
```

---

### WHERE - filtrando linhas

Mostra so as linhas que passam na condicao.

```sql
SELECT nome, ranking_fifa
FROM selecoes
WHERE ranking_fifa < 20;
```

**Operadores que voce pode usar no WHERE:**

| Operador | Significado | Exemplo |
|---|---|---|
| `=` | igual | `grupo = 'C'` |
| `!=` ou `<>` | diferente | `fase_eliminada != 'grupo'` |
| `>` `<` `>=` `<=` | maior/menor | `ranking_fifa <= 10` |
| `AND` | as duas condicoes precisam ser verdade | `grupo = 'A' AND ranking_fifa < 30` |
| `OR` | basta uma condicao ser verdade | `grupo = 'A' OR grupo = 'B'` |
| `NOT` | inverte a condicao | `NOT fase_eliminada = 'grupo'` |
| `LIKE` | busca por padrao de texto | `nome LIKE 'Bra%'` |
| `IN` | valor esta dentro de uma lista | `fase_eliminada IN ('semi', 'final', 'campeao')` |
| `BETWEEN` | valor esta entre dois numeros | `ranking_fifa BETWEEN 1 AND 20` |
| `IS NULL` | campo esta vazio | `gols_pro IS NULL` |
| `IS NOT NULL` | campo tem valor | `gols_pro IS NOT NULL` |

```sql
-- Times do grupo C que estao na CONMEBOL
SELECT nome, confederacao
FROM selecoes
WHERE grupo = 'C' AND confederacao = 'CONMEBOL';
```

```sql
-- Selecoes cujo nome comeca com 'Arg'
SELECT nome
FROM selecoes
WHERE nome LIKE 'Arg%';
```

```sql
-- Times que chegaram as oitavas, semi ou final em 2022
SELECT selecao, fase_eliminada
FROM historico
WHERE copa = 2022
  AND fase_eliminada IN ('oitavas', 'semi', 'final', 'campeao');
```

---

### ORDER BY - ordenando o resultado

```sql
SELECT nome, ranking_fifa
FROM selecoes
ORDER BY ranking_fifa ASC;   -- ASC = crescente (padrao)
```

```sql
SELECT selecao, gols_pro
FROM historico
WHERE copa = 2022
ORDER BY gols_pro DESC;      -- DESC = decrescente
```

Ordenar por mais de uma coluna:

```sql
SELECT selecao, copa, gols_pro
FROM historico
ORDER BY copa DESC, gols_pro DESC;
```

---

### LIMIT - limitando o numero de linhas

```sql
-- Os 5 times com mais gols em 2022
SELECT selecao, gols_pro
FROM historico
WHERE copa = 2022
ORDER BY gols_pro DESC
LIMIT 5;
```

---

### DISTINCT - removendo duplicatas

```sql
-- Quais confederacoes aparecem no banco? (sem repetir)
SELECT DISTINCT confederacao
FROM selecoes;
```

---

### Funcoes de agregacao

Calculam um valor resumido para um conjunto de linhas.

| Funcao | O que faz | Exemplo |
|---|---|---|
| `COUNT(*)` | conta quantas linhas | `COUNT(*)` |
| `SUM(coluna)` | soma os valores | `SUM(gols_pro)` |
| `AVG(coluna)` | calcula a media | `AVG(chutes)` |
| `MAX(coluna)` | maior valor | `MAX(ranking_fifa)` |
| `MIN(coluna)` | menor valor | `MIN(ranking_fifa)` |
| `ROUND(valor, casas)` | arredonda | `ROUND(AVG(chutes), 1)` |

```sql
-- Media de gols marcados em 2022 (so times que jogaram)
SELECT ROUND(AVG(gols_pro), 1) AS media_gols
FROM historico
WHERE copa = 2022 AND jogos > 0;
```

---

### AS - renomeando colunas no resultado

```sql
SELECT selecao,
       gols_pro AS gols_marcados,
       gols_contra AS gols_sofridos
FROM historico
WHERE copa = 2022;
```

---

### GROUP BY - agrupando antes de calcular

Divide as linhas em grupos e aplica uma funcao de agregacao em cada grupo.

**Regra:** toda coluna no SELECT que nao e uma funcao de agregacao precisa estar no GROUP BY.

```sql
-- Media de chutes por fase (qual fase chuta mais?)
SELECT fase_eliminada,
       ROUND(AVG(chutes), 1) AS media_chutes,
       COUNT(*) AS quantidade_times
FROM analise_estatistica
WHERE jogos > 0
GROUP BY fase_eliminada
ORDER BY media_chutes DESC;
```

```sql
-- Total de gols por confederacao em 2022
SELECT s.confederacao,
       SUM(h.gols_pro) AS total_gols
FROM historico h
INNER JOIN selecoes s ON h.selecao = s.nome
WHERE h.copa = 2022 AND h.jogos > 0
GROUP BY s.confederacao
ORDER BY total_gols DESC;
```

---

### HAVING - filtrando depois do GROUP BY

WHERE filtra antes de agrupar. HAVING filtra depois.

```sql
-- Confederacoes com mais de 10 gols somados em 2022
SELECT s.confederacao,
       SUM(h.gols_pro) AS total_gols
FROM historico h
INNER JOIN selecoes s ON h.selecao = s.nome
WHERE h.copa = 2022 AND h.jogos > 0
GROUP BY s.confederacao
HAVING total_gols > 10
ORDER BY total_gols DESC;
```

---

### INNER JOIN - cruzando duas tabelas

Junta linhas de duas tabelas quando uma coluna em comum combina.
So aparece no resultado se existir nas DUAS tabelas.

```sql
SELECT s.nome,
       s.confederacao,
       h.fase_eliminada,
       h.gols_pro
FROM selecoes s
INNER JOIN historico h ON s.nome = h.selecao
WHERE h.copa = 2022 AND h.jogos > 0
ORDER BY h.gols_pro DESC;
```

Estrutura sempre igual:

```
FROM tabela_a a
INNER JOIN tabela_b b ON a.coluna_comum = b.coluna_comum
```

---

### LEFT JOIN - trazendo tudo da tabela da esquerda

Igual ao INNER JOIN, mas inclui as linhas da tabela da esquerda mesmo se nao tiver par na direita. O valor da direita aparece como NULL.

```sql
-- Todos os times, mesmo os que nao tem historico
SELECT s.nome,
       h.fase_eliminada,
       h.copa
FROM selecoes s
LEFT JOIN historico h ON s.nome = h.selecao
WHERE h.copa = 2022 OR h.copa IS NULL;
```

---

### Subquery - query dentro de query

Resultado de uma SELECT usado como valor dentro de outra.

```sql
-- Times que chutaram mais que a media geral em 2022
SELECT selecao, chutes
FROM analise_estatistica
WHERE copa = 2022
  AND chutes > (SELECT AVG(chutes) FROM analise_estatistica WHERE copa = 2022 AND jogos > 0)
ORDER BY chutes DESC;
```

---

## DDL - Criando e alterando estrutura

DDL = Data Definition Language. Cria, modifica e apaga tabelas.

---

### Tipos de dados no SQLite

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `INTEGER` | numeros inteiros | id, jogos, gols |
| `REAL` | numeros com decimal | posse_media, accuracy |
| `TEXT` | texto | nome, fase, confederacao |
| `BLOB` | arquivos binarios | imagens (raro) |
| `NULL` | campo vazio | qualquer tipo pode ser NULL |

---

### CREATE TABLE

```sql
CREATE TABLE times (
    id          INTEGER PRIMARY KEY,
    nome        TEXT NOT NULL,
    pais        TEXT,
    ranking     INTEGER
);
```

**Restricoes importantes:**

| Restricao | O que faz |
|---|---|
| `PRIMARY KEY` | identificador unico da linha (nao pode repetir) |
| `NOT NULL` | o campo e obrigatorio |
| `UNIQUE` | o valor nao pode se repetir na tabela |
| `DEFAULT valor` | valor padrao quando nao informado |
| `FOREIGN KEY` | liga com a chave primaria de outra tabela |

```sql
-- Tabela com FOREIGN KEY
CREATE TABLE resultados (
    id          INTEGER PRIMARY KEY,
    time_id     INTEGER NOT NULL,
    copa        INTEGER NOT NULL,
    gols        INTEGER DEFAULT 0,
    FOREIGN KEY (time_id) REFERENCES times(id)
);
```

---

### DROP TABLE - apagando uma tabela

Apaga a tabela inteira com todos os dados. Nao tem desfazer.

```sql
DROP TABLE resultados;
```

Se quiser apagar so se a tabela existir (sem erro):

```sql
DROP TABLE IF EXISTS resultados;
```

---

### ALTER TABLE - modificando uma tabela

Adicionar coluna:

```sql
ALTER TABLE times
ADD COLUMN fundacao INTEGER;
```

Renomear coluna (SQLite 3.25+):

```sql
ALTER TABLE times
RENAME COLUMN pais TO pais_sede;
```

Renomear tabela:

```sql
ALTER TABLE times
RENAME TO selecoes_historicas;
```

> No SQLite nao da pra apagar ou alterar o tipo de uma coluna com ALTER TABLE.
> Para isso: cria uma tabela nova, copia os dados, apaga a velha.

---

## DML - Inserindo, atualizando e apagando dados

DML = Data Manipulation Language. Modifica os dados dentro das tabelas.

---

### INSERT INTO - inserindo linhas

Uma linha por vez:

```sql
INSERT INTO times (id, nome, pais, ranking)
VALUES (1, 'Brasil', 'Brasil', 5);
```

Varias linhas de uma vez:

```sql
INSERT INTO times (id, nome, pais, ranking)
VALUES
    (2, 'Argentina', 'Argentina', 1),
    (3, 'Franca',    'Franca',    2),
    (4, 'Marrocos',  'Marrocos', 14);
```

> Se omitir as colunas, precisa informar TODOS os valores na ordem da tabela:
> `INSERT INTO times VALUES (5, 'Japao', 'Japao', 17);`

---

### UPDATE - atualizando linhas existentes

```sql
UPDATE times
SET ranking = 3
WHERE nome = 'Brasil';
```

Atualizar mais de uma coluna:

```sql
UPDATE times
SET ranking = 3,
    pais = 'Brasil (atualizado)'
WHERE id = 1;
```

> SEMPRE use WHERE no UPDATE. Sem WHERE, todas as linhas sao alteradas.

---

### DELETE - apagando linhas

```sql
DELETE FROM times
WHERE ranking > 50;
```

> SEMPRE use WHERE no DELETE. Sem WHERE, todos os dados da tabela sao apagados.

Apagar tudo (mas manter a tabela):

```sql
DELETE FROM times;
```

---

## Ordem de execucao de uma SELECT

Quando o banco roda uma query, a ordem interna e:

```
1. FROM / JOIN     -> de onde vem os dados
2. WHERE           -> filtra as linhas
3. GROUP BY        -> agrupa
4. HAVING          -> filtra os grupos
5. SELECT          -> escolhe as colunas
6. DISTINCT        -> remove duplicatas
7. ORDER BY        -> ordena
8. LIMIT           -> limita a quantidade
```

Isso explica por que voce NAO pode usar um alias do SELECT dentro do WHERE
(o WHERE roda antes do SELECT definir o alias).

---

## Erros comuns no SQLite

| Erro | Causa mais comum |
|---|---|
| `no such table` | nome da tabela errado ou banco errado aberto |
| `no such column` | nome da coluna errado (SQLite e case-sensitive nos dados, nao nos nomes) |
| `syntax error near "..."` | palavra-chave escrita errada ou virgula faltando |
| `UNIQUE constraint failed` | tentou inserir um valor que ja existe na PRIMARY KEY |
| `NOT NULL constraint failed` | tentou inserir NULL em campo obrigatorio |
| resultado vazio | WHERE muito restritivo ou tabela vazia |
