# Contexto — Arquitetura de Computadores e GPU (UC06)

**Código:** UC06  
**UC:** UC06 — Reconhecimento de Modelos de Arquitetura de Computadores e GPU  
**Disciplina:** Arquitetura de Computadores e GPU  
**Carga Total:** 33h (40 HA) | `T1: 13 HA (ajustado: 11) · T2: 14 HA · T3: 13 HA`

---

## Estado Geral

| Trim. | HA Alocado | HA Dado | HA Restante |
|---|---|---|---|
| T1 | 11 (ajustado) | 1 | 10 |
| T2 | 14 | 0 | 14 |
| T3 | 13 | 0 | 13 |

---

## Indicadores Curriculares

| Ind. | Descrição | T1 | T2 | T3 |
|---|---|---|---|---|
| 1 | Reconhece modelos aplicados em arquitetura de computadores e GPU | ✅ principal | — | — |
| 2 | Reconhece e aplica conceitos de Pipeline para GPU | 🔄 fraco | ✅ foco | — |
| 3 | Interpreta processos e threads em arquitetura de computadores e GPU | — | ✅ foco | — |
| 4 | Reconhece protocolos e serviços básicos de redes de computadores | — | ✅ foco | 🔄 continua |
| 5 | Compreende e aplica endereçamento de redes IPv4 e IPv6 | — | — | ✅ foco |

---

## Resumo por Aula

| Aula | Data | HA | Conteúdo |
|---|---|---|---|
| A01 | 26/02/2026 | 0 | Não trabalhada |
| A02 | 27/02/2026 | 0 | Não trabalhada |
| A03 | 05/03/2026 | ~1 | CPU vs GPU (paralelismo vs IA), RAM, HD vs SSD vs NVMe, periféricos, comparativo de componentes |
| A04 | 06/03/2026 | 0 | Não trabalhada (Sem2-Sex — bloco UC05/UC08/UC06, mas tempo todo consumido por UC05 e UC08) |
| A05 | 12/03/2026 | 0 | Não trabalhada (Sem1-Qui — bloco UC05/UC03/UC04) |
| A06 | 13/03/2026 | 0 | Não trabalhada (Sem1-Sex — bloco UC08/UC09) |
| A07 | 19/03/2026 | 0 | Não trabalhada (Sem2-Qui — bloco UC07/UC01/UC02) |
| A08 | 20/03/2026 | 0 | Não trabalhada — bloco UC06 não foi aberto; tempo consumido por dificuldades UC05 (if/else) + UC08 |
| A09 | 26/03/2026 | 0 | Não trabalhada (Sem1-Qui — bloco UC05/UC03/UC04) |
| A10 | 27/03/2026 | 0 | Não trabalhada (Sem1-Sex — gincana Python + SQL extenso) |

---

## Conteúdo Coberto (A03 — nível introdutório)

### Comparativo de Hardware (Ind. 1 — parcial)
- **CPU vs GPU:** CPU = poucas cores poderosas (sequencial), GPU = milhares de cores simples (paralelo)
- Analogia: CPU é um chef de cozinha experiente (poucos, cada um excelente); GPU é um batalhão de cozinheiros (muitos, tarefas simples em paralelo)
- **RAM:** memória volátil, velocidade de acesso vs capacidade
- **HD vs SSD vs NVMe:** velocidade × custo × durabilidade
- **Periféricos:** I/O básico (mencionado como parte do modelo E-P-S de D01)

**Profundidade:** Apenas comparativo visual e funcional — arquitetura interna não foi coberta.

---

## Próximos Tópicos (Ind. 1 continuação + Ind. 2)

| Seq. | Tópico | HA |
|---|---|---|
| 1 | Arquitetura CPU: ALU, CU, registradores, barramento, ciclo fetch-decode-execute | 2 |
| 2 | Arquitetura GPU: CUDA cores, VRAM, tensor cores, SIMD | 2 |
| 3 | Pipeline GPU: como um modelo de ML usa a GPU (batch processing, CUDA stream) | 2 |
| 4 | Comparativo CPU vs GPU em inferência vs treino | 1 |
| 5 | Exercício: configurar um servidor de treino de ML (qual GPU, quanta VRAM, qual CPU?) | 2 |
| 6 | Cloud computing: GPU na nuvem (Google Colab, AWS, Azure) | 1 |

---

## Vocabulário Introduzido (A03)

| Termo | Definição Resumida | Status |
|---|---|---|
| CPU | Central Processing Unit — processador principal | Consolidado |
| GPU | Graphics Processing Unit — processador de imagem + IA | Consolidado |
| RAM | Random Access Memory — memória de trabalho | Consolidado |
| SSD | Solid State Drive — armazenamento rápido sem partes móveis | Consolidado |
| NVMe | Protocolo de alta velocidade para SSDs modernos | Introduzido |
| Paralelismo | Execução simultânea de múltiplas tarefas | Consolidado |
| CUDA | Plataforma de computação paralela da NVIDIA para GPU | Mencionado |

---

## Conexões com UC01 (Fundamentos de Computação)

- Em A01 de D01, o modelo E-P-S (Entrada-Processamento-Saída) foi apresentado como base
- Os componentes CPU/GPU/RAM/SSD se encaixam dentro do "P" (Processamento) desse modelo
- Esta disciplina aprofunda o que D01 apenas introduziu

---

## Regras para o Copilot

1. CPU vs GPU básico (A03) — está consolidado. Não reintroduzir a analogia do chef/batalhão
2. Próximas aulas: arquitetura interna, ciclo fetch-decode-execute, CUDA
3. Todo conceito de GPU deve ter referência a tarefas reais de treino de ML
4. Mostrar `torch.cuda.is_available()` e `device = torch.device('cuda')` quando abordar CUDA
5. Pipeline GPU (Ind. 2) — prioridade após Ind. 1 estar consolidado
