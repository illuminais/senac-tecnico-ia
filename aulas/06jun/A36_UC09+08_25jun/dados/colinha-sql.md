# Colinha SQL — Copa 2026

**Banco de dados:** `copa2026.db`
**Tabelas:** `selecoes` · `historico` · `stats` · `analise_estatistica` · `partidas`

---

## Estrutura basica

```sql
SELECT coluna1, coluna2
FROM tabela
WHERE condicao
ORDER BY coluna DESC
LIMIT 10;
```

---

## WHERE — filtros

```sql
WHERE copa = 2022
WHERE fase_eliminada = 'semi'
WHERE jogos > 0
WHERE confederacao = 'CONMEBOL'
WHERE fase_eliminada IN ('semi', 'final', 'campeao')
WHERE nome LIKE 'Arg%'          -- comeca com Arg
WHERE jogos > 0 AND copa = 2022
WHERE grupo = 'A' OR grupo = 'B'
```

---

## Funcoes de calculo

```sql
AVG(chutes)          -- media
SUM(gols_pro)        -- soma
COUNT(*)             -- quantidade de linhas
MAX(gols_pro)        -- maior valor
MIN(ranking_fifa)    -- menor valor
ROUND(AVG(chutes), 1)  -- arredondar com 1 casa decimal
```

---

## GROUP BY — agrupar e calcular

```sql
SELECT fase_eliminada,
       ROUND(AVG(chutes), 1) AS media_chutes,
       COUNT(*) AS qtd_times
FROM analise_estatistica
WHERE jogos > 0
GROUP BY fase_eliminada
ORDER BY media_chutes DESC;
```

---

## INNER JOIN — cruzar duas tabelas

```sql
SELECT s.nome, s.confederacao, h.fase_eliminada
FROM selecoes s
INNER JOIN historico h ON s.nome = h.selecao
WHERE h.copa = 2022
  AND h.jogos > 0
ORDER BY h.gols_pro DESC;
```

---

## Colunas por tabela

**selecoes:** `id` `nome` `grupo` `confederacao` `ranking_fifa`

**historico:** `selecao` `copa` `fase_eliminada` `jogos` `gols_pro` `gols_contra` `amarelos`

**analise_estatistica:** `selecao` `copa` `fase_eliminada` `jogos` `gols_pro` `gols_contra` `chutes` `finalizacoes` `faltas` `posse_media` `amarelos`

**stats (Copa 2026 - rodada 1):** `nome` `grupo` `jogos` `vitorias` `empates` `derrotas` `gols_pro` `gols_contra` `pontos` `posse_media` `chutes` `amarelos`

---

## Valores de fase_eliminada

`grupo` · `oitavas` · `quartas` · `semi` · `final` · `vice` · `campeao` · `nao_classificou`
