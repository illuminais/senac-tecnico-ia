---
schema: semana
semana: "07"
aulas: [A38, A39]
periodo: 2026-07-02 / 2026-07-03
tipo: Sem 1
override: true
override-motivo: "Grade prevista (contextos/horarios/07-julho.md) era A38: UC05+UC02 e A39: UC08+UC06. Overrides reais: A38 = UC07+UC06 (Von Neumann/Harvard + o que a IA não deveria decidir sozinha, dinâmica World Café); A39 = UC04+UC05 (algoritmos de IA pesquisados em grupo + implementação surpresa em Python com scikit-learn). Precedente já visto em A37 (semana06.md) — turma real diverge do planejamento estático com frequência."
---

# Semana 07 — 02–03/jul

## Fio condutor

**"Do como decidir ao como implementar."** A38 discute arquitetura de computadores (Von Neumann/Harvard) e limites éticos de decisão automatizada via World Café. A39 fecha o arco IA-conceitual-para-código: grupos pesquisam um algoritmo de IA, apresentam conceitualmente sem saber que vão ser surpreendidos, e implementam de verdade em Python com biblioteca (scikit-learn), "no escuro".

---

## A38 — 02/07 · Qui · UC07 + UC06

> Override de rotação: substitui UC05+UC02 previstos.

**Status:** já ministrada. Resumo de alto nível a partir do `meta.yaml` e materiais gerados — registro formal completo pendente via `atualizador-pos-aula`.

- **Título da aula:** "Von Neumann, Harvard e o que a IA não deveria decidir sozinha"
- **UC06:** arquitetura de computadores — arquitetura Von Neumann vs. Harvard
- **UC07:** ética/limites de decisão automatizada por IA
- **Dinâmica:** World Café (cartões e fichas dedicados gerados — `cartoes-world-cafe.html`, `fichas-world-cafe.html`, `cartoes-world-cafe-extra.html`)
- Pasta: `aulas/07jul/A38_UC07+06_02jul/`

> ⚠️ Pendência: rodar `atualizador-pos-aula` com o relato do professor sobre A38 para atualizar `contexto-arquitetura-computadores-gpu.md`, `contexto-transformacao-digital.md` e `AULAS-DADAS.md`.

---

## A39 — 03/07 · Sex · UC04 + UC05

> Override de rotação: substitui UC08+UC06 previstos. Plano completo construído em entrevista de 2 rounds + 1 rodada de fechamento com o professor — **produção concluída**: 26 slides gerados e validados (overflow zerado, auditoria estrutural sem violações reais, lint 0 erros). Ver `aulas/07jul/A39_UC04+UC05_03jul/plano-aula.md` para o detalhamento slide a slide. Resumo operacional abaixo.
>
> ⚠️ Pendência simétrica à de A38: rodar `atualizador-pos-aula` depois que a aula acontecer de fato (03/07), para registrar em `AULAS-DADAS.md` e atualizar `contexto-fundamentos-e-conceitos-de-ia.md` / `contexto-python-para-ia.md` com o que realmente rolou em sala (a dinâmica é aberta — pesquisa, reveal e desafio "no escuro" podem sair diferente do plano na prática).

### Bloco 1 — UC04 (145min exatos): 3 algoritmos, 10 grupos, 1 pesquisa

**Objetivo:** grupos pesquisam e apresentam CONCEITUALMENTE (no quadro, sem slide) um dos 3 algoritmos de IA — sem saber ainda que vão implementar depois.

**Estrutura (conta fechada, ajuste final):**
- ~15min: intro do professor, direto ao ponto (sem taxonomia completa de ML — já consolidada em A01/A03/A07), cobrindo só KNN, Árvore de Decisão e K-Means com analogias simples + mini-explicação isolada do termo "viés" (sem referência ao debate de A07) antes da pergunta de ética
- 60min pesquisa em grupo (fixo) + **60min apresentação no quadro** (10 grupos × 6min exatos — volta ao pedido original do professor), cada grupo responde à pergunta fixa "que viés esse algoritmo pode ter?"
- ~5min: 3 slides filler em **tela branca pura** (ocultação do reveal, sem contagem regressiva) → **REVEAL** enxuto → transição rápida pro intervalo/UC05. Sem buffer de segurança — quem cedeu tempo pra apresentação voltar a 60min foi justamente o reveal

**Divisão de grupos (29 alunos, ~10 grupos de 3):**

| Algoritmo | Grupos | Alunos |
|---|---|---|
| KNN | 4 grupos (3×3 + 1×2) | 11 |
| Árvore de Decisão | 3 grupos | 9 |
| K-Means | 3 grupos | 9 |

**Pré-requisito não confirmado:** KNN nunca foi introduzido antes (nem consta no Plano Anual UC04); Árvore de Decisão e K-Means constavam como `⬜ pendente`. Risco aceito pelo professor — mitigado por analogias simples na intro.

---

### Bloco 2 — UC05 (~130min): implementação "no escuro" com scikit-learn

**Objetivo:** cada grupo implementa o algoritmo que pesquisou, em Python, com scikit-learn, scaffolding mínimo.

**Estrutura:**
- Apresentação do dataset final: **"CatálogoStream"** (tema Netflix/streaming — título, duração_min, nota, gênero; ~18-20 linhas; Ação/Comédia/Terror separados por duração+nota). Trade-off registrado: valores construídos didaticamente pra separação limpa, não são dados reais de streaming (mesma lógica que se usaria com qualquer dataset didático de ML 101)
- Instalação ao vivo do `scikit-learn` — plano de contingência de 3 camadas ativo (ver `plano-aula.md` da A39: prevenção com pacote offline em pendrive → agrupamento com grupo vizinho → **fallback pontual Colab aprovado só para esta aula, não é mudança de política do curso** → instalação offline via pendrive)
- 1 slide mínimo de scaffolding: padrão genérico `modelo.fit(X, y)` / `modelo.predict()`, sem exemplo específico por algoritmo
- ~70-75min de desafio real, professor circulando
- Fechamento: cada grupo mostra o que conseguiu (funcionou/quase/travou) — sem gabarito unificado no projetor
- **Sem tarefa de casa** — decisão explícita do professor, aula encerra 100% em sala

**Pré-requisito não confirmado:** scikit-learn estava planejado para o T3 (Tópico 16 do Plano Anual UC05), não agora. Pandas — pré-requisito mais leve — está registrado como **não consolidado** (`contexto-python-para-ia.md`, A35: "turma não conseguiu fazer pandas"). Risco aceito pelo professor como desafio intencional ("sofrer e se virar").

---

## Indicadores ativados

| UC | Indicadores | Tópico |
|---|---|---|
| UC04 | Ind.2 (classifica métodos/algoritmos/técnicas em IA — foco T2) · Ind.3 (supervisionado/não supervisionado/reforço — foco T2) | KNN, Árvore de Decisão, K-Means — pesquisa conceitual + viés |
| UC05 | Ind.2 (integração de código conforme estrutura projetada — foco T2) · Ind.4 (bibliotecas de manipulação de dados — foco T3, antecipado) | scikit-learn: fit/predict, dataset novo, desafio "no escuro" |

---

## Refs
- [roteiro-t2](../roteiro-t2.md)
- [contexto-fundamentos-e-conceitos-de-ia](../contexto-fundamentos-e-conceitos-de-ia.md)
- [contexto-python-para-ia](../contexto-python-para-ia.md)
- [horario 07-julho](../horarios/07-julho.md)
- [semana06](semana06.md)
- [plano-aula A39](../../aulas/07jul/A39_UC04+UC05_03jul/plano-aula.md)
