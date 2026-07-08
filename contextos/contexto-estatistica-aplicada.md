---
schema: contexto-uc
uc: UC09
disciplina: Estatística Aplicada e Lógica Matemática em IA
ha-total: 40
ha-dado: 21
ha-restante: 19
trimestre-atual: T2
---

# Contexto — UC09 Estatística Aplicada e Lógica Matemática em IA

## Plano Anual

| T | # | Tópico | HA | Status |
|---|---|---|---|---|
| T1 | 1 | Função linear: y=ax+b · coeficientes · Python def f(x) | 1 | ✅ A05 |
| T1 | 2 | Funções polinomial · exponencial · logarítmica · Kahoot | 3 | ✅ A06 |
| T2 | 3 | pandas: read_csv · .head() · .describe() | 1 | ✅ A37 (conteúdo formalizado em UC05; interpretação em UC09 com .std() para desvio padrão) |
| T2 | 4 | Média vs mediana: robustez a outlier · mean() vs median() em Python | 1 | ✅ A36 |
| T2 | 5 | Desvio padrão: consistência · variação em torno da média | 1 | ✅ A36 |
| T2 | 5b | Exercício guiado: modelos_ia.csv completo | 1 | ⏳ A37 |
| T2 | 6 | Variáveis: qualitativas vs quantitativas · discretas vs contínuas | 1 | ⬜ |
| T2 | 7 | Probabilidades básicas: espaço amostral · P(A) · P(A∩B) | 2 | ⬜ |
| T2 | 8 | matplotlib: scatter · hist · personalização de eixos | 2 | ⬜ |
| T2 | 9 | Exercício integrador: CSV → gráfico → média/mediana → conclusão | 2 | ⬜ |
| T3 | 10 | Frequência: absoluta · relativa · tabela de frequências | 2 | ⬜ |
| T3 | 11 | Variância e desvio padrão: np.std() · np.var() · o que medem | 2 | ⬜ |
| T3 | 12 | Distribuição normal: curva de Gauss · regra 68-95-99.7 | 2 | ⬜ |
| T3 | 13 | Correlação: Pearson · scatter matrix · heatmap | 2 | ⬜ |
| T3 | 14 | Projeto final: análise estatística de dataset de IA | 3 | ⬜ |

**Legenda:** ✅ concluído · ⏳ próxima aula · ⬜ pendente

---

## Estado Geral

| Trim. | HA Alocado | HA Dado | HA Restante |
|---|---|---|---|
| T1 | 13 | 9 | 0 (T1 encerrado, 4 HA de déficit absorvidos) |
| T2 | 14 | 12 | 2 |
| T3 | 13 | 0 | 13 |

> T1 encerrado com déficit de 7 HA — conteúdo de pandas/matplotlib/estatística descritiva migrado para T2.

---

## Última Aula
<!-- REPLACE a cada aula — não é append -->
A37 · 26/06 · Fórmula do desvio padrão (6 passos) · cálculo manual (Japão 2022: 12, 8, 6, 8) · .std() em pandas · interpretação: DP baixo = consistência · comparação estilos de jogo (Japão vs time hipotético)

---

## Indicadores Curriculares

| Ind. | Descrição | T1 | T2 | T3 |
|---|---|---|---|---|
| 1 | Compreende e aplica funções matemáticas lineares | ✅ principal | — | — |
| 2 | Compreende e aplica funções matemáticas polinomiais | ✅ principal | — | — |
| 3 | Compreende e aplica funções matemáticas logarítmicas | 🔄 fraco | ✅ foco | — |
| 4 | Compreende e aplica funções matemáticas exponenciais | 🔄 fraco | ✅ foco | — |
| 5 | Interpreta e aplica probabilidades básicas | — | ✅ foco | — |
| 6 | Compreende variável qualitativa e quantitativa | — | ✅ foco | — |
| 7 | Aplica dados discretos e contínuos | — | ✅ foco | 🔄 continua |
| 8 | Aplica frequência absoluta e relativa | — | — | ✅ foco |
| 9 | Usa medidas de tendência central em aplicações de IA | — | — | ✅ foco |
| 10 | Aplica raiz quadrada da variância em aplicações de IA | — | — | ✅ foco |

---

## Log de Execução
<!-- APPEND-ONLY — nunca editar linhas existentes -->

| Aula | Data | HA | Tópicos | Feedback |
|---|---|---|---|---|
| A37 | 26/06 | ~3 | Fórmula do desvio padrão (6 passos) · cálculo manual passo a passo (Japão 2022: 12, 8, 6, 8) · .std() em pandas · interpretação prática (DP baixo = consistência) · comparação estilos de jogo | Conceitos de DP consolidados; dificuldade na comparação SQL vs pandas vs Excel — necessário reforço em como ferramentas diferentes resolvem mesmo problema |
| A05/A06 | 12–13/03 | ~4 | Função linear (y=ax+b, coef. angular/linear, Python def f_linear) · f. polinomial · f. exponencial · f. logarítmica · Kahoot | Registros informais — sistema não registrou essas datas como UC09 |
| A?? | 27/03 | 3 | tópicos não registrados no contexto — ver AULAS-DADAS.md | — |
| A?? | 24/04 | 3 | tópicos não registrados no contexto — ver AULAS-DADAS.md | — |
| A?? | 08/05 | 3 | tópicos não registrados no contexto — ver AULAS-DADAS.md | — |
| A25 | 16/05 | 3 | T2 — tópicos não registrados no contexto | — |
| A36 | 25/06 | ~3 | Média · mediana (robustez a outlier) · desvio padrão (conceito, fórmula, cálculo passo a passo) · análise Copa 2022 · comparação Argentina vs Marrocos 2022 | Conceitos consolidados através de cálculo manual com dados reais |

---

## Feedback de Campo

| Data | Observação | Ação tomada |
|---|---|---|
| 2026-06-26 | Turma não absorveu bem a comparação SQL vs pandas vs Excel para confirmar hipótese — mesmo que todos os métodos tenham sido mostrados lado a lado | Próxima aula (matplotlib): reforçar que SQL (agregação por phase), pandas (filtragem e cálculo), e Excel (fórmula manual) chegam ao mesmo resultado; criar exercício focado: "use 3 ferramentas, compare resultados" |
| 2026-03-12 | Python def/return já visto em UC05 — ponto de entrada natural para f(x) matemático | Conectar sempre math notation ↔ código Python |
| 2026-03-13 | Kahoot funcionou bem como revisão; exemplos do cotidiano (Richter, juros) engajaram | Manter contextos reais e Brazilian-daily em todos os exercícios |

---

## Conexões com Outras Disciplinas

| Conceito | Disciplina | Observação |
|---|---|---|
| def/return Python | UC05 Python | f(x) matemático = def f(x): return em Python — usar sempre |
| Funções (linear, log, exp) | UC03 Fundamentos Matemáticos | Verificar contexto-fundamentos-matematicos.md antes de gerar — nunca repetir |
| pandas / NumPy | UC05 Python | Apresentar pandas em A27 coordenado com UC05 |
| matplotlib | UC05 Python | Introduzir no T2 junto com a progressão de Python |

## Refs
↑ [roteiro-t2](roteiro-t2.md)
→ [semana01](semanas/semana01.md)
→ [contexto-fundamentos-matematicos](contexto-fundamentos-matematicos.md)
→ [metodologias](../metodologias-ativas-senac.md)
