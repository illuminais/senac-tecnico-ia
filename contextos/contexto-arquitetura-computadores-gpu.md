---
schema: contexto-uc
uc: UC06
disciplina: Arquitetura de Computadores e GPU
ha-total: 40
ha-dado: 7
ha-restante: 33
trimestre-atual: T2
---

# Contexto — UC06 Arquitetura de Computadores e GPU

## Plano Anual

| T | # | Tópico | HA | Status |
|---|---|---|---|---|
| T1 | 1 | CPU vs GPU: paralelismo vs IA · RAM · HD vs SSD vs NVMe · periféricos (comparativo funcional) | 1 | ✅ A03 |
| T1 | 2 | Arquitetura CPU: ALU · CU · registradores · barramento · ciclo fetch-decode-execute · Von Neumann vs. Harvard (modelos de arquitetura) | 2 | ✅ A38 |
| T1 | 3 | Arquitetura GPU: CUDA cores · VRAM · tensor cores · SIMD | 2 | ✅ A41 (Taxonomia de Flynn: SISD/SIMD/MISD/MIMD — CUDA cores/VRAM/tensor cores pendentes) |
| T1 | 4 | Pipeline GPU: como um modelo ML usa a GPU (batch processing · CUDA stream) | 2 | ⬜ |
| T1 | 5 | Comparativo CPU vs GPU em inferência vs treino · escolha de hardware | 2 | ⬜ |
| T1 | 6 | Exercício: configurar servidor de treino ML (qual GPU, quanta VRAM, qual CPU?) | 2 | ⬜ |
| T2 | 7 | Processos e threads: concorrência · GIL Python · multiprocessing | 3 | ⬜ |
| T2 | 8 | Cloud computing: GPU na nuvem — Google Colab · AWS · Azure · custo estimado | 2 | ⬜ |
| T2 | 9 | Redes de computadores: protocolos básicos · TCP/IP · DNS · HTTP/HTTPS | 3 | ⬜ |
| T2 | 10 | Desmontagem prática: identificar componentes em hardware real | 2 | ✅ A30 |
| T2 | 11 | Benchmark: medir performance CPU vs GPU com Python (timeit · torch.cuda) | 2 | ⬜ |
| T2 | 12 | Protocolos e serviços de rede: FTP · SSH · SMTP · portas padrão | 2 | ⬜ |
| T3 | 13 | Endereçamento IPv4: classes · máscara de sub-rede · CIDR | 3 | ⬜ |
| T3 | 14 | Endereçamento IPv6: estrutura · transição · exemplos | 2 | ⬜ |
| T3 | 15 | Segurança em redes: firewall · VPN · criptografia TLS | 3 | ⬜ |
| T3 | 16 | Projeto: diagrama de rede para uma empresa que usa IA | 3 | ⬜ |
| T3 | 17 | Virtualização e contêineres: VMs · Docker (intro) · uso em deploy de modelos | 2 | ⬜ |

**Legenda:** ✅ concluído · ⏳ próxima aula · ⬜ pendente

---

## Estado Geral

| Trim. | HA Alocado | HA Dado | HA Restante |
|---|---|---|---|
| T1 | 11 (ajustado) | 1 | 10 |
| T2 | 14 | ~4 | ~10 |
| T3 | 13 | 0 | 13 |

---

## Última Aula
<!-- REPLACE a cada aula — não é append -->
A41 · 10/07 · Taxonomia de Flynn: SISD · SIMD · MISD · MIMD · exercício prático

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

## Log de Execução
<!-- APPEND-ONLY — nunca editar linhas existentes -->

| Aula | Data | HA | Tópicos | Feedback |
|---|---|---|---|---|
| A41 | 10/07 | ~2 | Taxonomia de Flynn: SISD · SIMD · MISD · MIMD · exercício prático — Diário Orion: SIMD e MIMD. Reconhece modelos aplicados em arquitetura de computadores e GPU. Reconhece e aplica conceitos de Pipeline para GPU. | Exercício "top" — engajamento alto |
| A?? | 12/06 | ~3 | 1 Indicador: Reconhece modelos aplicados em arquitetura de computadores e GPU. 2 Indicador: Reconhece e aplica conceitos de Pipeline para GPU. Conhecimentos: - Introdução à arquitetura de computadores: modelos de Von Neumann e Harvard; registradores e memória principal; barramentos de dados, endereços e controle; arquiteturas RISC, CISC, SIMD e MIMD. - Processos e threads: conceito de processos e threads; estados de um processo. | OrionWeb, não confirmado — só p/ contagem de HA |
| A15 | 17/04 | ~2 | cpu z | Reconstruído via diário OrionWeb |
| A12 | 10/04 | ~2 | - Introdução às GPUs e papel das GPUs na IA: papel das GPUs na computação moderna, diferenças entre CPU e GPU. Modelo de programação CUDA: kernels, threads, blocos e grades. Memória na GPU: hierarquia de memória em GPUs, incluindo registradores, memória compartilhada e memória global. conceitos básicos de pipelining e estágios do Pipeline. | Reconstruído via diário OrionWeb |
| A08 | 20/03 | ~2 | CPU vs GPU (paralelismo vs IA), RAM, HD vs SSD vs NVMe, periféricos, comparativo de componentes / | Reconstruído via diário OrionWeb |
| A03 | 05/03 | ~1 | CPU vs GPU (paralelismo vs IA) · RAM · HD vs SSD vs NVMe · periféricos (comparativo funcional) | Apenas comparativo visual/funcional — arquitetura interna não coberta |
| A30 | 30/05 | ~2 | Desmontagem de PC ao vivo · identificação física de CPU, GPU, RAM, SSD, placa-mãe · vocabulário técnico PT/EN · apresentação criativa por grupos | — |
| A38 | 02/07 | ~1,5 | Von Neumann vs. Harvard · modelos de arquitetura · atividade comparativa em papel · fluxo de dados · componentes | Dinâmica World Café integrada (UC07) engajou muito; estratégia de rotação provou efetiva |

---

## Conteúdo Coberto

- **CPU vs GPU:** CPU = poucas cores poderosas (sequencial) · GPU = milhares de cores simples (paralelo)
- Analogia: CPU é chef experiente · GPU é batalhão de cozinheiros — analogia já usada, não repetir
- **RAM:** memória volátil · velocidade de acesso vs capacidade
- **HD vs SSD vs NVMe:** velocidade × custo × durabilidade
- **Periféricos:** I/O básico mencionado no modelo E-P-S de UC01
- **Desmontagem prática (A30):** identificação física dos componentes reais (CPU, GPU, RAM, SSD, placa-mãe) · vocabulário técnico bilíngue PT/EN · apresentação criativa por grupos

**Não reintroduzir:** analogia chef/batalhão · comparativo funcional CPU/GPU básico · identificação visual de componentes (já feita fisicamente)

---

## Feedback de Campo

| Data | Observação | Ação |
|---|---|---|
| 2026-07-02 | Dinâmica World Café (integrada com UC07) gerou engajamento extraordinário — estratégia de rotação em pequenos grupos com cartões de debate funcionou muito bem para turma | Manter formato para próximas aulas de ética/arquitetura |

---

## Vocabulário Introduzido (A03)

| Termo | Definição | Status |
|---|---|---|
| CPU | Central Processing Unit — processador principal | Consolidado |
| GPU | Graphics Processing Unit — processador de imagem + IA | Consolidado |
| RAM | Random Access Memory — memória de trabalho | Consolidado |
| SSD | Solid State Drive — armazenamento rápido sem partes móveis | Consolidado |
| NVMe | Protocolo de alta velocidade para SSDs modernos | Introduzido |
| Paralelismo | Execução simultânea de múltiplas tarefas | Consolidado |
| CUDA | Plataforma de computação paralela da NVIDIA para GPU | Mencionado |

---

## Conexões com Outras Disciplinas

| Conceito | Disciplina | Observação |
|---|---|---|
| GPU para treino de modelos | UC04 IA | Shark Tank levantou questão de custo de GPU |
| `torch.cuda.is_available()` | UC05 Python | Mostrar quando abordar CUDA |
| CPU/GPU no modelo E-P-S | UC01 Computação | UC01 introduziu superficialmente — aprofundar aqui |

## Refs
↑ [roteiro-t2](roteiro-t2.md)
→ [contexto-python](contexto-python-para-ia.md) · [contexto-uc04](contexto-fundamentos-e-conceitos-de-ia.md)
→ [metodologias](conteudo-base/metodologias-ativas-senac.md)
