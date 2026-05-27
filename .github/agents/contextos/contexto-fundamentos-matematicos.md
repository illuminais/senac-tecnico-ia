# Contexto — Fundamentos Matemáticos para Computação e IA (UC03)

**Código:** UC03  
**UC:** UC03 — Fundamentos Matemáticos para Computação e IA  
**Disciplina:** Fundamentos Matemáticos para Computação e IA  
**Carga Total:** 33h (40 HA) | `T1: 13 HA · T2: 14 HA · T3: 13 HA`

---

## Estado Geral

| Trim. | HA Alocado | HA Dado | HA Restante |
|---|---|---|---|
| T1 | 13 | 3 | 10 |
| T2 | 14 | 0 | 14 |
| T3 | 13 | 0 | 13 |

---

## Indicadores Curriculares

| Ind. | Descrição | T1 | T2 | T3 |
|---|---|---|---|---|
| 1 | Aplica operações fundamentais da aritmética e da álgebra em problemas de computação | ✅ principal | — | — |
| 2 | Utiliza conceitos de lógica matemática para estruturar raciocínios e algoritmos simples | ✅ principal | — | — |
| 3 | Emprega noções de conjuntos, funções e matrizes na organização e representação de informações | ✅ principal | — | — |
| 4 | Reconhece padrões e sequências numéricas para apoiar a construção de algoritmos básicos | 🔄 quase nada | ✅ foco | — |
| 5 | Interpreta e representa dados em tabelas e gráficos, aplicando conceitos estatísticos iniciais | — | ✅ foco | — |
| 6 | Resolve situações-problema utilizando estratégias matemáticas aplicadas à computação e IA | — | ✅ foco | 🔄 continua |
| 7 | Demonstra clareza, estrutura lógica e capacidade de comunicação na explicação de procedimentos matemáticos | — | — | ✅ foco |
| 8 | Age com persistência, criticidade e ética no uso da matemática em contextos digitais | — | — | ✅ foco |

---

## Resumo por Aula

| Aula | Data | HA | Conteúdo |
|---|---|---|---|
| A01 | 26/02/2026 | 0 | Não trabalhada |
| A02 | 27/02/2026 | 0 | Não trabalhada |
| A03 | 05/03/2026 | 0 | Não trabalhada |
| A04 | 06/03/2026 | 0 | Não trabalhada |
| A05 | 12/03/2026 | ~2 | **INICIO:** Aritmética computacional (int, float, `//`, `%`, `**`, PEMDAS), Álgebra: variável vs incógnita, equação linear `y = 2x + 5` |
| A06 | 13/03/2026 | 0 | Não trabalhada (Sem1-Sex — bloco UC08/UC09) |
| A07 | 19/03/2026 | 0 | Não trabalhada (Sem2-Qui — bloco UC07/UC01/UC02) |
| A08 | 20/03/2026 | 0 | Não trabalhada (Sem2-Sex — bloco UC05/UC08/UC06) |
| A09 | 26/03/2026 | ~1 | **Potências e raízes** (`**`, `**0.5`, tabela potências de 2, contexto bytes/RGB), **Expressões algébricas** (x como ingrediente, tabela de valores), **Equações** (verificador com `==` — trial & error para resolver `2x+5=11`) |
| A10 | 27/03/2026 | 0 | Não trabalhada (Sem1-Sex — gincana Python + SQL) |

---

## Pré-requisitos dos Alunos (estimativa)

- **Operações básicas:** Provavelmente consolidadas (adição, subtração, multiplicação, divisão)
- **Álgebra básica:** Lacunas esperadas — equações do 1º grau podem precisar de revisão rápida
- **Frações e porcentagem:** Lacunas esperadas — importante para estatística e pesos de modelos
- **Funções:** Conceito provavelmente visto, mas não consolidado
- **Matrizes:** Provavelmente não visto ainda

---

## Sequência Planejada T1 (13 HA)

| Seq. | Tópico | HA | Conexão com IA/Python |
|---|---|---|---|
| 1 | Aritmética básica + notação computacional (int, float, operadores Python) | 2 | Operadores `+, -, *, /, //, %, **` já vistos em A04 |
| 2 | Álgebra: variáveis, equações lineares, substituição | 2 | `x = 10; y = 2*x + 5` em Python |
| 3 | Lógica matemática: AND, OR, NOT, tabela verdade → `if/elif/else` | 2 | Direto para condicional Python |
| 4 | Conjuntos e funções: domínio, imagem, bijeção | 2 | `set()` em Python; função matemática = `def f(x)` |
| 5 | Matrizes: linha × coluna, operações básicas | 2 | `numpy.array` e produto matricial |
| 6 | Padrões e sequências: PA, PG, Fibonacci | 2 | Loop Python gerando a sequência |
| 7 | Revisão integrada + exercícios com datasets de IA | 1 | Parâmetros de tabela de dados |

---

## Vocabulário Matemático Introduzido

| `int` | Número inteiro em Python | A05 |
| `float` | Número decimal em Python | A05 |
| divisão inteira | `//` descarta a vírgula | A05 |
| resto (módulo) | `%` retorna o sobra da divisão | A05 |
| potência | `**` eleva à potência | A05 |
| PEMDAS | ordem de operações: potência, mult, div, adição, subtração | A05 |
| variável (matemática) | incógnita em álgebra, diferente de atribuição Python | A05 |
| equação linear | `y = ax + b` | A05 || `potência` | $b^n$ — `b ** n` em Python | A09 |
| `expoente` | o número de cima na potência | A09 |
| `raiz quadrada` | $\sqrt{x}$ = `x ** 0.5` em Python | A09 |
| `expressão algébrica` | receita com variável: `2*x + 5` | A09 |
| `equação` | expressão com `=` que precisa ser resolvida | A09 |
---

## Conexões Identificadas com Outras Disciplinas

| Conceito | Quando Usar | Disciplina Relacionada |
|---|---|---|
| Operadores aritméticos | Na primeira aula — alunos já viram em Python A04 | UC05 Python |
| Lógica booleana | Após operadores | UC05 Python (`and`, `or`, `not`) |
| Funções matemáticas | Após conjuntos | UC09 Estatística (pré-req. para funções lin/exp/log) |
| Matrizes | Após funções | UC05 Python (numpy), D08 (tabelas SQL) |
| Probabilidade (T2) | Início do T2 | UC04 (modelos probabilísticos de IA) |

---

## Regras para o Copilot

1. **Primeira aula:** Começar pelo tópico 1 da sequência acima — verificar se D05 A04 já aconteceu (sim) para referenciar os operadores já vistos
2. **Todo conceito matemático tem código Python** ao lado — é inviolável para esta disciplina neste contexto
3. **Contexto IA always:** datasets, pixels, scores, pesos de modelos — nunca exercícios sem contexto tecnológico
4. **Verificar UC09** antes de avançar para funções — coordenar para não repetir
