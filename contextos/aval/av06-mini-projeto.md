---
id: av06
titulo: Seminário — Funções Matemáticas na Prática
tipo: Seminário
ucs: UC09, UC03, UC05
indicadores: "UC09: Ind.1+2+3+4 · UC03: Ind.4 · UC05: Ind.2"
data-dev: "07/05/2026"
data-apresentacao: "08/05/2026"
avaliacao: individual
status: detalhada
nota-pedagogica: "6 grupos de 5 alunos. Quinta = desenvolvimento em sala. Sexta = apresentação sem consulta. UC08 Ind.1 coberto na Av.05 via FK+JOIN obrigatório."
---

# Av.06 — Seminário: Funções Matemáticas na Prática

> **Status:** ✅ Detalhada

**Tipo:** Seminário em grupo · Avaliação **individual** por aluno
**Quinta 07/05:** desenvolvimento em sala (pesquisa + Colab)
**Sexta 08/05:** apresentações — 6 grupos × 12 min · sem celular · sem consulta
**UCs cobertas:** UC09, UC03, UC05
**Indicadores:** UC09 Ind.1+2+3+4 · UC03 Ind.4 · UC05 Ind.2

---

## Contexto pedagógico

Substitui o MP de código original. A avaliação de UC08 Ind.1 foi absorvida pela Av.05 (FK declarada + JOIN obrigatório na Fase 3). A Av.06 cobre apenas os indicadores de funções matemáticas e bibliotecas — formato seminário elimina o problema do Gemini/Colab interferindo durante a avaliação: o aluno pesquisa na quinta, explica sem consulta na sexta.

**14/05 = recuperação**: alunos com PA/NA reapresentam a parte pendente (15 min individual).

---

## Grupos (6 × 5 alunos)

| Grupo | Tema | Indicador principal |
|---|---|---|
| 1 | Funções Lineares | UC09 Ind.1 |
| 2 | Funções Quadráticas | UC09 Ind.2 |
| 3 | Funções Polinomiais grau 3+ | UC09 Ind.2 |
| 4 | Funções Logarítmicas | UC09 Ind.3 |
| 5 | Funções Exponenciais | UC09 Ind.4 |
| 6 | Sequências e Padrões Numéricos | UC03 Ind.4 |

---

## Critérios de Avaliação por Indicador

| UC | Indicador | **A** | **PA** | **NA** |
|---|---|---|---|---|
| UC09 Ind.1–4 | Explica a função | Claro, com fórmula e comportamento do gráfico | Explica com imprecisão | Não consegue explicar |
| UC09 Ind.1–4 | Relaciona com IA/dados | Exemplo concreto e correto | Exemplo vago | Sem exemplo |
| UC03 Ind.4 | Identifica padrão | Identifica o padrão e nomeia o tipo (PA/PG/etc.) | Identifica mas não nomeia | Não identifica |
| UC05 Ind.2 | Explica o código numpy/matplotlib | Sabe o que cada função faz | Sabe o que o código faz mas não as funções | Não sabe explicar |

---

## Orientações para o Professor

**Quinta:**
- Definir grupos no início da aula
- Circular entre os grupos — verificar se o Colab está funcionando, se o gráfico aparece
- Não corrigir o código por eles — orientar, não entregar

**Sexta:**
- Ordem de apresentação sorteada na hora
- Cada grupo: ~10 min de apresentação + 2 min de perguntas do professor ao grupo
- Anotar individualmente quem explicou bem e quem ficou mudo
- Perguntas finais (para toda a turma) ao encerrar as apresentações

**Perguntas por indicador** (2 por indicador — direcionar para alunos específicos):

| Indicador | Pergunta 1 | Pergunta 2 |
|---|---|---|
| UC09 Ind.1 | "Se o coeficiente angular dobra, o que acontece com a inclinação?" | "Cite um exemplo real de relação linear em dados." |
| UC09 Ind.2 | "Por que a parábola tem um ponto mais alto ou mais baixo?" | "O que acontece com y quando x fica muito grande numa cúbica?" |
| UC09 Ind.3 | "Por que usamos escala logarítmica para medir decibéis?" | "O que np.log10(1000) retorna? Por que?" |
| UC09 Ind.4 | "Qual a diferença entre crescimento linear e exponencial?" | "O que np.exp(0) retorna? E np.exp(1)?" |
| UC03 Ind.4 | "2, 4, 8, 16 é PA ou PG? Como você sabe?" | "Que função matemática representa esse padrão?" |
| UC05 Ind.2 | "Para que serve o np.linspace?" | "O que plt.legend() faz no gráfico?" |

**14/05 — Recuperação:**
- Alunos com NA reapresentam sua parte em até 15 min individual
- Alunos com PA respondem 2 perguntas adicionais sobre o ponto fraco

Enunciado completo: [avaliacoes/av06/content.md](../../../../avaliacoes/av06/content.md)
