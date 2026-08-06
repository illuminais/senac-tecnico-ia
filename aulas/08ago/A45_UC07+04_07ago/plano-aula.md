# Plano de Aula — A45

**Data:** 07/08/2026 (sexta-feira) · **Tipo:** Rotação 3 · **Semana:** 10
**Fonte:** `contextos/semanas/semana10.md` (plano já aprovado pelo professor — entrevista pulada por decisão explícita do professor ao acionar o produtor-aula)
**Fio condutor do dia:** a fluência em classificar dados (ganha na quinta com o `abrigo_adocao.csv`) puxa a sexta: os cases brasileiros de UC07 mostram empresas reais decidindo com dados, e a prova de UC04 usa o próprio rótulo `adotado` (sim/não) do abrigo como âncora de aprendizado supervisionado vs. não supervisionado.

> ⚠️ **Janela rígida de avaliação:** A45 é a 1ª e ÚNICA aplicação nova de Av04-T2 (UC04, Ind.2+3). A51 (28/08) é só recuperação para quem ficou PA/NA — não pode virar 3ª tentativa.

---

## Composição do Dia

| # | UC | Disciplina | HA | Método | Indicador(es) |
|---|---|---|---|---|---|
| 1 | UC07 | Transformação Digital | 3h | mesa-redonda | UC07-7, UC07-3 |
| 2 | UC04 | Fundamentos e Conceitos de IA | 3h | expositivo breve + avaliação individual | UC04-2, UC04-3 |

---

## Decisões já tomadas (herdadas de semana10.md — não renegociar)

| Item | Decisão |
|---|---|
| UC07 — Tópico | Tópico 12 do Plano Anual: cases brasileiros Nubank (crédito/score), iFood (logística/recomendação), Embrapa (visão computacional no agro) |
| UC07 — dinâmica | Mesa-redonda: grupos analisam 1 case cada com perguntas estruturadas (qual problema resolveu · que dado usou · qual risco/ética envolvida · "e sem IA?") |
| UC07 — pergunta fixa (resposta a feedback de 30/07) | Toda ficha de case inclui a pergunta: **"que dado sensível esse case usa, e como ele deveria ser protegido (LGPD)?"** — resposta direta à crítica de atividades de LGPD genéricas na A42 |
| UC07 — profundidade dos cases (revisão de 05/08) | Professor rejeitou a versão superficial do esboço original ("Nubank usa IA pra crédito, iFood pra logística, Embrapa pra visão computacional") e forneceu pesquisa real e concreta sobre os 3 cases. Cada case agora segue estrutura **pesquisa → entendimento → conclusão** com dados/números reais (ver seção "Material de pesquisa dos cases" abaixo), mantendo a pergunta fixa de LGPD. Prioriza slides completos e bem explicados a cortar conteúdo |
| UC04 — revisão | KNN, Árvore de Decisão, K-Means: revisão rápida (~20min), já vistos em A39 (03/07) — **não reensinar do zero** |
| UC04 — conteúdo novo | Aprendizado por reforço (agente-ambiente-recompensa), exemplo simples, ~20min, **sem aprofundar** (aprofundamento fica para T3 Tópico 13) |
| UC04 — ponte conceitual | `adotado` (sim/não) do abrigo (A44) é rótulo conhecido → exemplo de aprendizado supervisionado; agrupar animais por perfil (porte/idade/dias no abrigo) sem usar o rótulo → exemplo de não supervisionado |
| UC04 — avaliação | Av04-T2 (~2h, prova individual em papel): classificar algoritmo e tipo de aprendizado em cenários próprios, ancorada no exemplo do abrigo — encerra Ind.2+3. 1ª e única aplicação nova; A51 é só recuperação |
| **Template de Debate** | Todo slide `[DEBATE]` desta aula usa **dilema de escolha forçada**: duas posições concretas opostas ligadas a um dado/case real, nunca pergunta aberta genérica. Ver `.claude/skills/estrutura-aula/SKILL.md`, seção "Slide de Debate" |

---

## Verificação de pré-requisitos

| Pré-requisito | Necessário para | Status |
|---|---|---|
| LGPD na prática (titular, controlador, operador, ANPD, dados sensíveis) | Pergunta fixa de LGPD em cada case de UC07 | ✅ Confirmado em A14 (16/04) — `contexto-transformacao-digital.md` |
| Segurança organizacional/compliance | Contextualização de risco nos cases de UC07 | ✅ Confirmado em A42 (30/07) |
| KNN, Árvore de Decisão, K-Means (conceito + viés) | Revisão rápida de abertura de UC04 | ✅ Confirmado em A39 (03/07) — `contexto-fundamentos-e-conceitos-de-ia.md` |
| `abrigo_adocao.csv` e coluna `adotado` (sim/não) | Ponte conceitual supervisionado/não supervisionado em UC04 | ✅ Confirmado em A44 (06/08, aula anterior da mesma semana) |

Nenhum alerta de pré-requisito não confirmado para A45.

> Nota: aprendizado por reforço é conteúdo NOVO (Tópico 13 do T3 antecipado brevemente aqui), não lacuna de pré-requisito — tratado como introdução leve, sem avaliação sobre ele nesta prova.

---

## Material de pesquisa dos cases (fornecido pelo professor em 05/08 — usar como base real, não simplificar)

### Nubank — modelo nuFormer (crédito)

Em vez do modelo tradicional de score (tabela estática de atributos, que descarta padrões sazonais e comportamentais), o Nubank criou o **nuFormer**: a mesma lógica de arquitetura dos modelos de linguagem (tipo ChatGPT, que preveem a próxima palavra numa frase), só que aplicada ao histórico de gastos de um cliente. Cada compra vira uma sequência de ~14 "tokens" (valor, data, categoria do estabelecimento, tipo de transação); um ano de gastos vira uma sequência longa e conectada, onde cada transação ajuda a interpretar as outras (efeito de contexto, igual numa frase). Treinado com ~600 bilhões de tokens (1ª geração), usado em decisões de aumento de limite de crédito.
- **Pesquisa:** como o nuFormer trata histórico financeiro como se fosse texto
- **Entendimento:** por que "prever o próximo gasto" é parecido com "prever a próxima palavra", e por que isso é melhor que uma tabela fixa de atributos
- **Conclusão:** dado sensível = histórico completo de transações financeiras de milhões de pessoas; risco de LGPD = esse dado revela padrão de vida (onde a pessoa gasta, quando, com que frequência)

### iFood — recomendação + logística

Os algoritmos de recomendação cruzam histórico de pedidos, horário de consumo, preferências declaradas e implícitas, localização e até dados de clima, considerando também eventos sazonais brasileiros (festa junina, Natal, Carnaval) para ajustar sugestões. Resultado: taxa de conversão 40% maior que recomendação genérica. Na logística, modelos de ML decidem em tempo real qual entregador alocar, qual rota seguir e o tempo de entrega (incluindo tempo de preparo do prato). Escala: 17 times de ML, 120 modelos de IA rodando, ~10 bilhões de recomendações/mês, 14 bilhões de previsões/mês.
- **Pesquisa:** quantas variáveis diferentes entram numa única recomendação (pedido, horário, local, clima, sazonalidade)
- **Entendimento:** por que cruzar tantas variáveis dá resultado melhor que uma regra simples ("sugere o mais pedido")
- **Conclusão:** dado sensível = localização em tempo real + hábitos de consumo (o que, quando, com que frequência a pessoa come); risco de LGPD = perfil de comportamento muito íntimo do dia a dia

### Embrapa — visão computacional no agro

Redes neurais convolucionais (CNNs, o mesmo tipo de rede usada em reconhecimento de imagem) detectam doenças e pragas em folhas a partir de fotos, usando não só imagens comuns (RGB) mas também dados multiespectrais e hiperespectrais (câmeras que enxergam faixas de luz que o olho humano não vê, revelando sinais de doença antes de aparecerem visualmente). Tratores e pulverizadores modernos usam essa visão computacional junto com algoritmos como Random Forest e SVM para aplicar defensivo agrícola só onde tem praga ou erva daninha, em vez da lavoura inteira (pulverização seletiva). Drones monitoram rebanhos.
- **Pesquisa:** como uma câmera "vê" uma doença antes dela aparecer a olho nu (luz que o olho humano não capta)
- **Entendimento:** por que pulverizar só onde precisa (visão computacional) economiza defensivo e reduz impacto ambiental, comparado a pulverizar a lavoura toda
- **Conclusão:** dado sensível = imagens da propriedade rural + dados de produtividade do produtor; risco de LGPD/ética = quem é dono desse dado, a empresa de tecnologia ou o agricultor?

> Linguagem nos slides: acessível a ~14-17 anos, termos técnicos (token, CNN, multiespectral, Random Forest, SVM) explicados em parênteses na primeira ocorrência, seguindo `.claude/skills/estilo-pedagogico/SKILL.md`. Analogia antes do mecanismo, mecanismo antes do dado técnico.

---

## Esboço de Slides — Visão Geral do Dia

### BLOCO 1 — UC07 Transformação Digital: Cases Brasileiros (⏳ pendente · esboço revisado em 05/08 para maior profundidade)

| # | Tag | Título | Resumo |
|---|---|---|---|
| 1 | `[TEORIA]` | Capa da aula | Estrutural |
| 2 | `[TEORIA]` | Divisor — BLOCO 1: Transformação Digital (Cases Brasileiros) | Estrutural, abre o bloco |
| 3 | `[DEBATE]` | Abertura: tabela fixa ou ler o histórico como um texto? | Escolha forçada ancorada no Nubank: Time A defende o modelo tradicional de score (tabela de atributos fixa, fácil de auditar) · Time B defende um modelo que lê o histórico de gastos inteiro como uma sequência conectada, igual um texto (teaser do nuFormer, sem entregar o mecanismo ainda) |
| 4 | `[TEORIA]` | Metodologia do dia: pesquisa, entendimento, conclusão | Explica a estrutura de 3 etapas de cada case + a pergunta fixa de dado sensível/LGPD + "e sem IA?" |
| 5 | `[TEORIA]` | Case Nubank: o problema do crédito e a ideia do nuFormer | Contexto (por que decidir aumentar limite é difícil, limite do score tradicional) + pesquisa introdutória: analogia com modelo de linguagem prevendo a próxima palavra |
| 6 | `[EXERCICIO]` | Checkpoint rápido: o que vira "token" aqui? | Verificação leve (levante a mão) do mecanismo recém-explicado |
| 7 | `[TEORIA]` | Case Nubank: um ano de gastos vira uma sequência | Pesquisa aprofundada: ~14 tokens por transação, sequência longa e conectada, ~600 bilhões de tokens de treino |
| 8 | `[TEORIA]` | Case Nubank: entendimento e conclusão | Por que prever o próximo gasto é como prever a próxima palavra + dado sensível (histórico financeiro completo) + resposta à pergunta fixa de LGPD |
| 9 | `[EXERCICIO]` | Checkpoint rápido: recapitulando Nubank | Quebra a sequência de TEORIA antes de abrir o próximo case |
| 10 | `[TEORIA]` | Case iFood: o problema de recomendar e entregar rápido ao mesmo tempo | Contexto (recomendação + logística no mesmo app) + pesquisa introdutória: por que uma regra simples não basta |
| 11 | `[TEORIA]` | Case iFood: a escala por trás da recomendação | Pesquisa aprofundada: variáveis cruzadas (pedido, horário, local, clima, sazonalidade brasileira) + números reais (17 times de ML, 120 modelos, ~10 bi recomendações/mês, +40% conversão) |
| 12 | `[EXERCICIO]` | Checkpoint rápido: cadê o clima nessa conta? | Quebra a sequência de TEORIA |
| 13 | `[TEORIA]` | Case iFood: entendimento e conclusão | Por que cruzar variáveis bate uma regra simples + dado sensível (localização em tempo real + hábitos de consumo) + resposta à pergunta fixa de LGPD |
| 14 | `[TEORIA]` | Case Embrapa: o problema de cuidar de uma lavoura gigante sozinho | Contexto (escala do agro brasileiro) + pesquisa introdutória: câmeras que enxergam além do olho humano (multiespectral/hiperespectral) |
| 15 | `[EXERCICIO]` | Checkpoint rápido: o que a câmera enxerga que o olho não vê? | Quebra a sequência de TEORIA |
| 16 | `[TEORIA]` | Case Embrapa: pulverização seletiva | Pesquisa aprofundada: CNN detectando doença/praga na folha + Random Forest/SVM decidindo onde aplicar defensivo |
| 17 | `[TEORIA]` | Case Embrapa: entendimento e conclusão | Por que pulverizar só onde precisa economiza e reduz impacto ambiental + dado sensível (imagens da propriedade + produtividade) + pergunta em aberto: de quem é esse dado? + resposta à pergunta fixa de LGPD |
| 18 | `[EXERCICIO]` | Ficha de análise em grupo: aprofunde seu case | Mesa-redonda: cada grupo recebe 1 case e escreve, com as próprias palavras, pesquisa → entendimento → conclusão + "e sem IA?" + resposta final à pergunta de dado sensível/LGPD. Rubrica/critério em `<AdminOnly>` |
| 19 | `[DINAMICA]` | Rodízio de apresentação entre grupos | Cada grupo compartilha a análise do seu case com a turma |
| 20 | `[DEBATE]` | Fechamento: qual case guarda o dado mais delicado? | Escolha forçada: Time A defende Nubank (histórico financeiro completo de milhões de pessoas) · Time B defende Embrapa (a disputa de quem é dono do dado do produtor rural) — cada lado justifica com o que aprendeu na ficha do case |
| 21 | `[TAREFA DE CASA]` | Tarefa UC07 | Pesquisar 1 outro case brasileiro de IA (fora dos 3 vistos) e aplicar a mesma estrutura pesquisa → entendimento → conclusão + a pergunta fixa de LGPD |

> Revisão de 05/08: esboço original tinha 12 slides com os 3 cases descritos de forma genérica (1 slide cada). Professor apontou superficialidade e forneceu pesquisa real e detalhada. Esboço revisado passa para 21 slides: cada case ganha 3-4 slides próprios (contexto+pesquisa introdutória, pesquisa aprofundada com números reais, entendimento+conclusão), intercalados com checkpoints leves para respeitar o limite de 2 `[TEORIA]` consecutivos. Nenhum conteúdo cortado; profundidade prevalece sobre economia de slides.

### BLOCO 2 — UC04 Fundamentos e Conceitos de IA: Revisão + Reforço + Av04-T2 (⏳ pendente)

| # | Tag | Título | Resumo |
|---|---|---|---|
| 13 | `[TEORIA]` | Divisor — BLOCO 2: Fundamentos e Conceitos de IA (encerramento do T2) | Estrutural |
| 14 | `[DEBATE]` | Dilema: usar o rótulo ou não? | Escolha forçada ancorada no abrigo: Time A defende treinar um modelo com `adotado` (sim/não) pra prever quem será adotado (supervisionado) · Time B defende agrupar os animais por perfil (porte/idade/dias no abrigo) sem olhar `adotado`, pra descobrir padrões novos (não supervisionado) |
| 15 | `[TEORIA]` | Revisão rápida: KNN | Recap direto, sem reensinar do zero (já visto em A39) |
| 16 | `[TEORIA]` | Revisão rápida: Árvore de Decisão e K-Means | Recap direto, sem reensinar do zero |
| 17 | `[EXERCICIO]` | Checkpoint de revisão | Quebra a sequência de TEORIA antes do conteúdo novo |
| 18 | `[TEORIA]` | Novo: aprendizado por reforço | Conceito agente-ambiente-recompensa, introdução |
| 19 | `[TEORIA]` | Exemplo simples de aprendizado por reforço | Exemplo concreto, sem aprofundar (fica para T3 Tópico 13) |
| 20 | `[EXERCICIO]` | Checkpoint: identifique o tipo | Mini-prática de classificação rápida antes da ponte com o abrigo |
| 21 | `[TEORIA]` | Ponte conceitual: o abrigo como exemplo | `adotado` (rótulo conhecido) = supervisionado · agrupar sem rótulo = não supervisionado |
| 22 | `[TEORIA]` | Recapitulando os 3 tipos de aprendizado | Mapa mental: supervisionado (KNN/Árvore) · não supervisionado (K-Means) · reforço (novo), com exemplos do abrigo |
| 23 | `[ATIV AVALIATIVA]` | Av04-T2 — prova individual (~2h) | Cenários próprios ancorados no abrigo; classifica algoritmo + tipo de aprendizado; encerra Ind.2+3. Gabarito/rubrica em `<AdminOnly>` |
| 24 | `[TAREFA DE CASA]` | Tarefa UC04 | Pesquisar 1 exemplo real de aprendizado por reforço (jogo, robô, carro autônomo) e anotar agente/ambiente/recompensa — prepara T3 Tópico 13 |
| 25 | `[TEORIA]` | Encerramento do dia (layout end) | Fecha A45, prévia de A46 (UC02 Av05-T2) |

> Contagem de slides é estimativa de esboço — `@autor-slides` pode desmembrar por densidade (ex: cada case pode virar 2 slides físicos se a ficha tiver muito conteúdo). Ajustes de contagem serão registrados no checkpoint de cada UC.

---

## Status de Geração

| Bloco | Status |
|---|---|
| UC07 Transformação Digital | ⏳ Pendente |
| UC04 Fundamentos e Conceitos de IA | ⏳ Pendente |

---

## Refs

↑ [semana10](../../../contextos/semanas/semana10.md)
→ [contexto-transformacao-digital](../../../contextos/contexto-transformacao-digital.md) · [contexto-fundamentos-e-conceitos-de-ia](../../../contextos/contexto-fundamentos-e-conceitos-de-ia.md)
→ [ATIVIDADES_AVALIATIVAS](../../../contextos/ATIVIDADES_AVALIATIVAS.md) (Av04-T2, linha A45)
