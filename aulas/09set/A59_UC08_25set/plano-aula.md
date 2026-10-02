# Plano da A59: Plantão da Vigilância, dia 1 (consultas)

> **Épico 2, Banco de Dados (UC08)** · sexta 25/09/2026 · 6 HA · desenho do épico em `contextos/epicos/ep02-uc08.md`
> **Indicador 5:** cria e manipula consultas SQL de forma adequada para resolução de problemas
> **Status:** dada em 25/09, só o bloco 1
> **Dividida em 29/09:** a turma mal fechou o bloco 1 em 25/09. O SQL humano não aconteceu. Os blocos 2 a 6 passaram inteiros para a **A60 (01/10)**, em `aulas/10out/A60_UC08_01out/`. Aqui fica só o que foi dado.
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

### Blocos 2 a 6: passaram para a A60

SQL humano, conexão no DBeaver e as 5 perguntas estão em `aulas/10out/A60_UC08_01out/plano-aula.md`. A ficha (página 1) ficou com o professor, com a previsão das 408 linhas.
