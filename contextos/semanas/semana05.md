---
schema: semana
semana: "05"
aulas: [A34, A35]
periodo: 2026-06-18 / 2026-06-19
tipo: Sem 2
override: true
override-motivo: "Override de rotação — Copa Analytics: UC08+UC03 na quinta, UC05+UC09 na sexta. Horário original seria UC07+UC01 / UC05+UC03."
---

# Semana 05 — 18–19/jun

## Fio condutor
Copa do Mundo 2026 como dataset vivo: dois dias de ABP onde cada time de alunos é um analista de dados contratado para entregar um relatório de scout — quinta explora os dados com SQL e matemática, sexta programa e estatiza em Python.

> **Override:** roteiro Sem 2 previa UC07+UC01 (qui) e UC05+UC03 (sex).
> Professor substituiu por Copa Analytics para aproveitar o dado real em tempo real e engajar a turma com tema atual.
> UC07 e UC01 recuperam em A36/A37 (semana 06).

---

## A34 — 18/06 · Qui · Sem 2 (UC08 + UC03)

| # | UC | HA | Método | Tópicos | Ind. |
|---|---|---|---|---|---|
| 1 | UC08 | 3h | ABP — exploração | Abertura da dinâmica: professor entrega dataset Copa 2026 impresso (dicionário de dados + copa2026_selecoes + copa2026_partidas) · cada time escolhe uma pergunta-guia (ver lista no DICIONARIO.md) · SQL no DB Browser ou Colab: SELECT · WHERE com condições booleanas (AND/OR) · ORDER BY · GROUP BY · INNER JOIN entre selecoes e partidas para cruzar dados de grupos com resultados · cada time anota as queries que responderam a pergunta escolhida | UC08-2 · UC08-3 |
| 2 | UC03 | 3h | ABP — modelagem | Professor para a turma: "o WHERE com AND que vocês escreveram no SQL é isso aqui na matemática" → tabela verdade AND/OR/NOT no papel · Conjuntos formais com os dados Copa: diagrama de Venn ("seleções com saldo positivo ∩ menos de 2 amarelos") · INNER JOIN = interseção de conjuntos · Função linear: ranking_fifa vs pontos — os times plotam no papel quadriculado e identificam se há correlação visual · Fechamento: cada time escreve 3 linhas justificando a resposta à pergunta-guia usando linguagem matemática | UC03-Ind.2 · UC03-Ind.3 · UC03-Ind.5 |

**Prep A34:**
- Imprimir DICIONARIO.md (1 por time) e copa2026_selecoes.csv + copa2026_partidas.csv em A4 (1 por time)
- DB Browser instalado ou Colab com SQLite carregado (testar antes)
- Folha tabela verdade em branco (AND/OR/NOT · 4 linhas cada)
- Papel quadriculado para gráfico ranking × pontos
- Definir times com mistura de perfil antes da aula (não deixar a turma escolher)

---

## A35 — 19/06 · Sex · Sem 2 (UC05 + UC09)

| # | UC | HA | Método | Tópicos | Ind. |
|---|---|---|---|---|---|
| 1 | UC05 | 3h | ABP — construção | Times retomam a pergunta-guia do dia anterior · Carregam copa2026_stats.csv com pandas (read_csv · .head() · .describe()) · Representam os dados em Python: dict por seleção (nome → {pontos, gols_pro, saldo}) · set para filtrar (seleções com saldo positivo) · tuple para lacrar o resultado final (melhor_selecao, pontos) — imutável · Função que recebe um dict e retorna a seleção que melhor responde à pergunta-guia · Peer review: time A testa o código do time B | UC05-Ind.1 · UC05-Ind.2 · UC05-Ind.3 |
| 2 | UC09 | 3h | ABP — análise | Estatística descritiva com copa2026_historico.csv (3 Copas + 2026) · média de gols por Copa por seleção · mediana vs média: Brasil tem média alta mas perdeu nas quartas — por quê? (outlier Mineirazo 2014) · Qual seleção é mais consistente? (menor variância de desempenho) · Cada time atualiza a justificativa da resposta com dados históricos · **Apresentação final (20 min):** cada time apresenta 2 min — "Com base nos dados de 2026 e no histórico, nossa resposta à pergunta-guia é..." | UC09-Ind.1 · UC09-Ind.2 · UC09-Ind.3 |

**Prep A35:**
- copa2026_stats.csv e copa2026_historico.csv disponíveis no Colab ou pendrive
- Folha de peer review por time (rodou? erros encontrados?)
- Cronômetro visível para apresentação final

---

## Perguntas-guia disponíveis para os times

Cada time escolhe uma no início de A34 e mantém até a apresentação final de A35:

| # | Pergunta | Ângulo |
|---|---|---|
| 1 | Qual seleção tem o melhor custo-benefício em gols por chute? | Performance analítica |
| 2 | Se você fosse patrocinador, qual seleção escolheria e por quê? | Negócio / marketing |
| 3 | Qual grupo tem o futebol mais imprevisível — e o que os dados dizem? | Estatística / variância |
| 4 | Qual seleção mais evoluiu nas últimas 3 Copas? | Histórico / tendência |
| 5 | Qual cidade-sede recebeu mais gols na Rodada 1? | Exploração de dados |

---

## Papéis dentro do time

Cada pessoa tem entrega obrigatória — ninguém assiste:

| Papel | Entrega |
|---|---|
| Analista de Dados | Roda as queries SQL (A34) e o código Python (A35) |
| Estrategista | Define a pergunta, interpreta os números, redige a justificativa |
| Visualizador | Monta o gráfico no papel (A34) ou descreve o gráfico em Python (A35) |
| Apresentador | Faz o pitch de 2 min na sexta |

---

## Refs
↑ [roteiro-t2](../roteiro-t2.md) · [horario-rotacao-t2](horario-rotacao-t2.md)
→ [contexto-banco-de-dados](../contexto-banco-de-dados.md) · [contexto-fundamentos-matematicos](../contexto-fundamentos-matematicos.md)
→ [contexto-python-para-ia](../contexto-python-para-ia.md) · [contexto-estatistica-aplicada](../contexto-estatistica-aplicada.md)
→ [semana04](semana04.md) · [semana06](semana06.md)
→ dados: [A34/dados/DICIONARIO.md](../../aulas/06jun/A34_UC08+03_18jun/dados/DICIONARIO.md)
