---
schema: contexto-uc
uc: UC04
disciplina: Fundamentos e Conceitos de IA
ha-total: 41
ha-dado: 12
ha-restante: 29
trimestre-atual: T2
---

# Contexto — UC04 Fundamentos e Conceitos de IA

## Plano Anual

| T | # | Tópico | HA | Status |
|---|---|---|---|---|
| T1 | 1 | Definição IA · história (1943→2024) · tipos ANI/AGI/ASI · ML/DL/NLP/ética/LGPD | 5 | ✅ A01/A03 |
| T1 | 2 | Vocabulário avançado: Token · LLM · Backpropagation · Epoch · Embedding | 1 | ✅ A04 |
| T1 | 3 | Decision Trees · Random Forest · SVM · comparação | 2 | ✅ A39 |
| T1 | 4 | Clustering: K-Means · DBSCAN · exemplos práticos | 1 | ✅ A39 |
| T1 | 5 | Bias · fairness · impacto social — aprofundamento com debate | 1 | ⬜ |
| T2 | 6 | Shark Tank Tech — arquitetura de solução IA (entrada→IA→saída→GPU→custo) | 3 | ✅ A26/A27 |
| T2 | 7 | Métricas de avaliação: acurácia · precisão · recall · F1 | 2 | ⬜ |
| T2 | 8 | Computer Vision: CNN · detecção de objetos · demo prática | 2 | ⬜ |
| T2 | 9 | NLP avançado: tokenização · embeddings práticos · demo LLM | 2 | ⬜ |
| T2 | 10 | IA generativa: GANs · diffusion models · ChatGPT por dentro | 2 | ⬜ |
| T2 | 11 | Projeto: comparar algoritmos num dataset real com sklearn | 3 | ⬜ |
| T3 | 12 | Ética avançada: viés sistêmico · impacto racial/social · LGPD aprofundado | 3 | ⬜ |
| T3 | 13 | RL na prática: AlphaGo · agentes de jogo · openAI Gym | 2 | ⬜ |
| T3 | 14 | Tendências: AGI · multimodal · agentes autônomos · regulamentação | 2 | ⬜ |
| T3 | 15 | Projeto final: pitch técnico de solução IA real | 5 | ⬜ |
| T3 | 16 | Revisão e avaliação integradora | 2 | ⬜ |

**Legenda:** ✅ concluído · ⏳ próxima aula · ⬜ pendente

---

## Estado Geral

| Trim. | HA Alocado | HA Dado | HA Restante |
|---|---|---|---|
| T1 | 11 (ajustado) | 6 | 5 |
| T2 | 14 | ~3 (A26/A27 Shark Tank) | ~11 |
| T3 | 14 | 0 | 14 |

---

## Última Aula
<!-- REPLACE a cada aula — não é append -->
A39 · 03/07 · Pesquisa conceitual de 3 algoritmos IA: KNN, Árvore de Decisão, K-Means + análise de viés

---

## Indicadores Curriculares

| Ind. | Descrição | T1 | T2 | T3 |
|---|---|---|---|---|
| 1 | Identifica conceitos e fundamentos de Inteligência Artificial | ✅ principal | — | — |
| 2 | Classifica diferentes métodos, algoritmos e técnicas em IA | 🔄 fraco | ✅ foco | — |
| 3 | Compreende e utiliza resultados supervisionados, não supervisionados e por reforço | — | ✅ foco | 🔄 continua |
| 4 | Compreende e aplica questões éticas e impactos sociais relacionados ao uso de IA | — | — | ✅ foco |

---

## Log de Execução
<!-- APPEND-ONLY — nunca editar linhas existentes -->

| Aula | Data | HA | Tópicos | Feedback |
|---|---|---|---|---|
| A01 | 26/02 | ~2 | Demo ML pixels→modelo · ML · DL · NLP · robôs · carros · ética · LGPD | — |
| A03 | 05/03 | ~3 | Definição formal · história (1943→2024) · ML 3 tipos · redes neurais · DL · NLP · ética | — |
| A04 | 06/03 | ~1 | Vocabulário avançado: NLP · Token · LLM · Backpropagation · Epoch · Embedding | — |
| A26 | 21/05 | ~2 | Shark Tank Rodadas 2+3: arquitetura da solução (entrada→IA→saída→GPU) · modelo de negócio | — |
| A27 | 22/05 | ~1 | Ensaio final · Pitch Final (4 min + 2 perguntas) · veredicto e encerramento | — |
| A39 | 03/07 | ~3 | KNN (k-nearest neighbors) · Árvore de Decisão · K-Means (clustering) — análise de viés em cada algoritmo | — |

---

## Conteúdo Consolidado (Ind. 1 — não retornar ao mesmo nível)

- **Definição:** "sistemas computacionais que executam tarefas que requerem inteligência humana"
- **Linha do tempo:** 1943 McCulloch-Pitts → 1950 Turing → 1956 Dartmouth → 2012 AlexNet → 2017 Transformer → 2022 ChatGPT
- **Tipos de ML:** supervisionado (labeled → predição) · não-sup. (unlabeled → padrões) · reforço (agente + recompensa)
- **Arquiteturas:** redes neurais · Deep Learning · NLP
- **Ética (semeada):** LGPD · viés em dados · deepfakes · debate "ferramenta vs trapaça" resolvido

## Não Cobrir Novamente (mesmo nível)

- Linha do tempo história da IA (A01+A03)
- Definição geral ML/DL/NLP (A03)
- Turing Test e Dartmouth Conference
- Mapa hierárquico IA→ML→DL→CV/NLP/RL (debate A07)
- Debate "IA é trapaça ou ferramenta?" — já resolvido (A07)

## Conexões com Outras Disciplinas

| Conceito | Disciplina | Observação |
|---|---|---|
| Python para sklearn/modelos | UC05 | Cada algoritmo UC04 tem código Python paralelo |
| GPU para treino | UC06 | Shark Tank levantou questão de custo de GPU |
| Custo-benefício implementar IA | UC07 | Explorado em A27 (estreia UC07 T2) |
| Dados e datasets | UC08 | SQL → datasets de treino |

## Refs
↑ [roteiro-t2](roteiro-t2.md)
→ [contexto-python](contexto-python-para-ia.md) · [contexto-uc07](contexto-transformacao-digital.md) · [contexto-uc06](contexto-arquitetura-computadores-gpu.md)
→ [semana01](semanas/semana01.md)
→ [metodologias](conteudo-base/metodologias-ativas-senac.md)
