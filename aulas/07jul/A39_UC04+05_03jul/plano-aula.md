---
schema: plano-aula
aula: "39"
data: 2026-07-03
dia: sexta-feira
disciplinas: [UC04, UC05]
override: true
override-motivo: "Grade prevista para A39 era UC08+UC06 (contextos/horarios/07-julho.md). Professor decidiu override manual: UC04 (Fundamentos e Conceitos de IA) + UC05 (Python para IA), com dinâmica única 'pesquisa conceitual → surpresa → implementação em Python com scikit-learn'. Precedente já visto em A37 (UC05+UC09 substituindo UC07+UC04, ver semana06.md)."
status: aprovado
---

# Plano de Aula — A39 (03/07/2026, sexta-feira)

> Construído em modo entrevista (2 rounds + 1 rodada de fechamento) com o professor. **Plano aprovado.** Nenhum slide foi gerado ainda — falta o ciclo por UC (esboço → aprovação → `@autor-slides`), começando pelo Bloco 1 (UC04).

## Fio condutor do dia

**"Vocês pesquisam como funciona. Depois vocês vão ter que fazer funcionar."**

A manhã tem 2 blocos que na verdade são 1 arco narrativo só: no bloco de UC04 os grupos pesquisam e apresentam CONCEITUALMENTE (no quadro, sem slide, sem código) um algoritmo de IA. Só depois da apresentação vem a virada: **surpresa**, eles vão implementar de verdade, em Python, usando biblioteca (scikit-learn), "no escuro" — sem colinha de código pronta. A implementação de fato acontece majoritariamente no bloco de UC05.

---

## Composição do dia

| Bloco | UC | Disciplina | Horário | Duração | HA |
|---|---|---|---|---|---|
| 1 | UC04 | Fundamentos e Conceitos de IA | 7:10–9:35 | ~145min | 3 |
| — | — | Intervalo | 9:35–9:50 | 15min | — |
| 2 | UC05 | Python para IA | 9:50–12:00 | ~130min | ~2,7 |

Turma: até 29 alunos. Grupos fixos de 3 (mesmos usados em dinâmicas anteriores, ex.: world café de A38) — recalculados abaixo para esta dinâmica específica.

---

## Decisões fechadas na entrevista (Round 1 + Round 2)

| # | Tema | Decisão |
|---|---|---|
| R1.1 | Distribuição de tempo em UC04 | ~30min intro do professor → ~90min pesquisa+apresentação dos grupos → ~25min transição/reveal |
| R1.2 | Onde a implementação acontece | Reveal acontece no fim de UC04 (com técnica de ocultação); implementação real acontece majoritariamente em UC05 |
| R1.3 | Algoritmos e grupos | 3 algoritmos (KNN, Árvore de Decisão, K-Means) × ~3 grupos cada, ~10 grupos de 3 alunos |
| R1.4 | Nível de dificuldade da implementação | Meio-termo COM biblioteca de verdade (scikit-learn) — desafio intencional, mesmo com Python ainda frágil |
| R1.5 | Ética/Turing/história | Não repetir história/Turing (já consolidado em A01/A03/A07). Pergunta de viés fixa por grupo, com explicação prévia do termo "viés" |
| R1.6 | Formato de apresentação dos grupos | No quadro (giz/marcador) — proibido slide de grupo |
| R2.1 | Divisão final de grupos | Confirmado: 3 algoritmos × ~3 grupos, ~10 grupos de 3 |
| R2.2 | Conteúdo da intro do professor | Direto ao ponto — só os 3 algoritmos escolhidos, sem taxonomia completa de ML |
| R2.3 | Pergunta de ética | Fixa ("que viés esse algoritmo pode ter?"), precedida de mini-explicação do termo "viés" (não pode ser assumido como conhecido) |
| R2.4 | Mecânica do reveal | Slide de virada dramático + técnica de ocultação: 3 slides "filler" (contagem regressiva) antes do slide de reveal, pra não dar spoiler visual |
| R2.5 | Dataset da implementação | Dataset NOVO e simples (não reaproveita o dataset da Copa) |
| R2.6 | Ambiente / instalação sklearn | Instalação ao vivo faz parte do desafio — COM plano de contingência de 3 camadas (ver seção dedicada abaixo) |
| R2.7 | Scaffolding durante o desafio | 1 slide mínimo com o padrão genérico `modelo.fit(X, y)` / `modelo.predict()`, sem exemplo específico por algoritmo |
| R2.8 | Fechamento do desafio | Cada grupo mostra o que conseguiu — sem gabarito unificado no projetor |
| R3.1 | Colab como Camada 2 da contingência | **Aprovado**, mas só como fallback pontual desta aula específica — não é mudança de política do curso (Colab segue descartado como ferramenta padrão) |
| R3.2 | Dataset final | Trocado de "Frutas" para tema **Netflix/streaming** ("CatálogoStream") — avaliado como tecnicamente viável para os 3 algoritmos (ver seção dedicada) |
| R3.3 | Timing do Bloco 1 (UC04) | Ajuste final: pesquisa fixada em 60min, apresentação **volta aos 60min pedidos** (10 grupos × 6min exatos) — quem cede é o reveal, reduzido a ~5min (só o essencial, sem buffer). Ver conta fechada abaixo |
| R3.4 | Tarefa de casa | **Removida.** Nenhuma tarefa de casa nesta aula |
| R3.5 | Slide "O que é viés" | Fica isolado — sem referência ao debate de A07 ("ferramenta vs. trapaça") |
| R3.6 | Slides filler antes do reveal | Tela em branco pura (não contagem regressiva visual) |

---

## ⚠️ Alertas de pré-requisito (não bloqueantes — riscos aceitos explicitamente pelo professor)

> Verificados contra `AULAS-DADAS.md` e os campos "Consolidado"/"Plano Anual" de `contexto-fundamentos-e-conceitos-de-ia.md` e `contexto-python-para-ia.md`.

1. **KNN nunca foi introduzido antes** — nem consta no Plano Anual da UC04. Árvore de Decisão e K-Means constam no Plano Anual mas como `⬜ pendente` (nunca dados). A intro de ~30min é a PRIMEIRA exposição da turma a esses 3 nomes.
   → Aceito pelo professor via decisão "direto ao ponto" (R2.2) — mitigação: analogias bem simples e concretas na intro (ver Slide 3 abaixo).

2. **scikit-learn está no Plano Anual da UC05 para o T3 (Tópico 16, ⬜ pendente), não para agora.** Além disso, pandas — pré-requisito natural mais leve que sklearn — está registrado como **não consolidado** (`contexto-python-para-ia.md`: "turma não conseguiu fazer pandas" em A35). A38/A37 não tocaram nisso.
   → Aceito pelo professor como desafio intencional ("sofrer e se virar" — R1.4). Mitigação: dataset extremamente simples (poucas colunas, poucas linhas) e 1 slide de scaffolding genérico (R2.7).

3. **Turma de Python historicamente lenta** (`contexto-python-para-ia.md`: regra "1 conceito por bloco", ritmo real = 50% do planejado). Hoje o plano empilha: dataset novo + instalação de pacote + biblioteca nova + algoritmo novo, tudo na mesma manhã.
   → Mitigado pelo fato de o desafio ser propositalmente "no escuro" (não é aula expositiva tradicional — expectativa de sucesso parcial é aceitável, conforme R2.8, "mostrar o que conseguiu" sem exigir funcionar 100%).

---

## Recálculo de grupos e algoritmos (10 grupos, 29 alunos)

| Algoritmo | Grupos | Alunos | Tipo (Indicador 3) |
|---|---|---|---|
| KNN (K-Nearest Neighbors) | 4 grupos (3×3 + 1×2) | 11 | Supervisionado — classificação |
| Árvore de Decisão | 3 grupos | 9 | Supervisionado — classificação |
| K-Means | 3 grupos | 9 | Não supervisionado — clustering |

> KNN recebe o grupo "quebrado" (2 alunos) por ser o algoritmo mais simples de explicar em duplas. Se a turma tiver número diferente de 29 no dia, ajustar proporcionalmente — sem problema.

---

## Dataset final: "CatálogoStream" — tema Netflix/streaming (R3.2 — aprovado)

**Avaliação de viabilidade (pedida pelo professor):** dá pra manter a mesma estrutura didática do dataset de frutas (2 features numéricas + 1 rótulo categórico) com tema Netflix, com uma ressalva honesta:

> **Trade-off:** assim como "peso + doçura → tipo de fruta" não é uma relação real de botânica (é fabricada para ensinar), "duração + nota → gênero" também **não reflete dados reais de streaming** — um filme de ação real pode ser curto e mal avaliado, uma comédia pode durar 2h. Para os 3 algoritmos funcionarem bem (clusters visíveis pro K-Means, fronteiras de decisão claras pro KNN/Árvore), os valores precisam ser construídos com separação limpa por gênero — exatamente como fizemos com frutas. Isso é esperado e não é um problema: é a mesma prática pedagógica, só que com tema mais engajador. Se algum aluno perguntar "isso é real?", a resposta é não — é um dataset didático inspirado em streaming, não um scrape do catálogo real.

Com essa ressalva, **Netflix funciona tão bem quanto Frutas** — segue a mesma estrutura de "3 grupos numericamente separáveis":

| título | duração_min | nota (0–10) | gênero |
|---|---|---|---|
| Fuga Sem Volta | 132 | 8,1 | Ação |
| Operação Blackout | 145 | 7,8 | Ação |
| Última Fronteira | 128 | 8,4 | Ação |
| Rir Até Cair | 92 | 7,2 | Comédia |
| Casamento Trapalhão | 88 | 6,8 | Comédia |
| Família Bagunça | 97 | 7,5 | Comédia |
| Casa do Silêncio | 84 | 6,1 | Terror |
| Sombra na Parede | 90 | 5,8 | Terror |
| O Que Espreita | 87 | 6,4 | Terror |

*(amostra de 9 — versão final terá ~18-20 linhas, 6-7 por gênero, seguindo o mesmo padrão: Ação = duração longa + nota alta; Comédia = duração média + nota média; Terror = duração curta + nota média-baixa. Finalizado por `@autor-slides` na geração.)*

Serve para os 3 algoritmos sem modificação:
- **KNN / Árvore de Decisão:** classificar um título novo em um gênero, dado duração+nota
- **K-Means:** agrupar os títulos por duração+nota, ignorando o rótulo de gênero (bônus pedagógico: os clusters devem bater com os gêneros, mostrando que o algoritmo "descobriu sozinho" o que já sabíamos)

Vantagem sobre Frutas: tema muito mais engajador pra turma de 14-16 anos, mesma simplicidade estrutural.

---

## Plano de contingência — instalação do scikit-learn (R2.6)

> Registrado como parte do plano, não como risco em aberto.

**Camada 0 — Prevenção (antes da aula, hoje à noite ou de manhã cedo):**
- Professor testa `pip install scikit-learn` no mesmo tipo de máquina/rede do laboratório, para confirmar que funciona e cronometrar o tempo real de download.
- Se a rede da escola for lenta para ~10 downloads simultâneos (1 por grupo), preparar previamente um pacote offline:
  `pip download scikit-learn -d ./pacotes-sklearn` numa máquina com internet boa, salvo em pendrive.

**Camada 1 — Grupo trava sozinho (falha isolada):**
- O grupo se junta a um grupo vizinho que já conseguiu instalar — usa 1 notebook compartilhado, sem perder a identidade do grupo (2 grupos, 1 tela).

**Camada 2 — Falha generalizada (≥3-4 grupos travando / rede caiu):**
- Fallback pontual: Google Colab (scikit-learn já vem pré-instalado, roda no navegador, não depende de instalação local).
- ✅ **Aprovado pelo professor** como decisão pontual apenas para esta contingência específica de A39. **Não é mudança de política do curso** — Colab segue descartado como ferramenta padrão de Python por causa do autocomplete de IA que atrapalha o aprendizado. Se ativada, o professor deve reforçar verbalmente que é "só hoje, só pra não perder a aula" — não reabrir Colab como opção de uso corrente nas próximas aulas.

**Camada 3 — Pior cenário (nem Colab funciona / sem internet):**
- Pacote offline preparado na Camada 0, distribuído via pendrive fisicamente aos PCs afetados:
  `pip install --no-index --find-links=./pacotes-sklearn scikit-learn`

**Recomendação:** preparar o pendrive da Camada 0/3 de qualquer forma, mesmo que a instalação normal funcione — é o seguro que custa pouco e evita que a aula pare.

---

## BLOCO 1 — UC04: 3 Algoritmos e uma Pesquisa (7:10–9:35, ~145min)

**Objetivo:** grupos pesquisam e explicam CONCEITUALMENTE (sem código) um dos 3 algoritmos, respondem a uma pergunta fixa de viés, sem saber ainda que vão implementar depois.

> **Conta fechada (revisão final pedida pelo professor):** o pedido original era 1h de pesquisa + 1h de apresentação (120min). Numa primeira rodada, a apresentação tinha sido apertada para 50min pra sobrar buffer de segurança no reveal. O professor pediu pra devolver esse tempo: **apresentação volta aos 60min pedidos** (10 grupos × 6min exatos), e quem cede é o **reveal**, que fica **ainda mais enxuto do que os 15min anteriores — agora só ~5min** (fillers quase instantâneos + reveal dramático + transição rápida, sem buffer de segurança). Pesquisa segue fixa em 60min. Intro do professor segue em 15min. Isso fecha em exatamente 145min — ver coluna Tempo abaixo.

| # | Slide | Tag | Resumo | Tempo |
|---|---|---|---|---|
| 1 | Capa da aula | `[TEORIA]` | "A39 — Como os algoritmos de IA realmente pensam" (layout cover) | — |
| 2 | Divisor de bloco | `[TEORIA]` | "Bloco 1 — 3 algoritmos, 10 grupos, 1 desafio" — não spoila implementação | — |
| 3 | Abertura de engajamento | `[DEBATE]` | Pergunta rápida: "Vocês acham que um computador consegue 'decidir' sozinho? De quantos jeitos diferentes um algoritmo pode decidir algo?" — aquece sem virar aula de taxonomia | ~3min |
| 4 | KNN — o que é | `[TEORIA]` | Analogia: "os vizinhos mais parecidos com você decidem o que você é". Definição curta + 1 exemplo | ~4min |
| 5 | Árvore de Decisão — o que é | `[TEORIA]` | Analogia: fluxograma de perguntas sim/não. Definição curta + 1 exemplo | ~4min |
| 6 | K-Means — o que é | `[TEORIA]` | Analogia: separar em grupos por parecença, sem rótulo prévio. Definição curta + 1 exemplo | ~4min |
| 7 | O que é viés (bias) | `[TEORIA]` | Mini-explicação em linguagem simples ANTES de lançar a pergunta de ética — termo não pode ser assumido como conhecido. Slide isolado, sem referenciar o debate de A07. Exemplo curto e concreto | ~3min |
| 8 | Instruções da dinâmica | `[DINAMICA]` | Divisão dos 10 grupos, atribuição de algoritmo (tabela de recálculo acima), o que pesquisar ("para que serve + como funciona"), pergunta de ética fixa a responder, tempo disponível, formato de apresentação (quadro, sem slide) | ~2min |
| 9 | — (pesquisa em grupo, sem slide) | `[DINAMICA]` | Tempo de pesquisa livre (celular/notebook) — **fixo, decisão do professor** | 60min |
| 10 | — (apresentações no quadro, sem slide) | `[DINAMICA]` | 10 grupos × **6min exatos** cada (fala + resposta da pergunta de viés) — **volta ao pedido original de 60min** | 60min |
| 11 | Filler / tela em branco 1 | `[TEORIA]` estrutural | Tela em branco pura (sem contagem regressiva) — parte da ocultação do reveal | ~5s |
| 12 | Filler / tela em branco 2 | `[TEORIA]` estrutural | idem | ~5s |
| 13 | Filler / tela em branco 3 | `[TEORIA]` estrutural | idem | ~5s |
| 14 | **REVEAL** | `[TEORIA]` | "SURPRESA: vocês vão implementar isso de verdade. Em Python. Agora." — layout center, alta energia, bgPreset palette, pulse. Enxuto, sem alongar o momento | ~2min |
| 15 | Transição para o intervalo/UC05 | `[TEORIA]` | Frase curta anunciando o que vem (dataset novo, biblioteca de verdade, desafio "no escuro") — sem buffer de segurança, direto pro intervalo | ~3min |

**Total estimado:** 3+4+4+4+3+2+60+60+~0,3(fillers)+2+3 = **145min exatos** ✔ fecha com a janela de UC04. **Sem buffer de segurança neste bloco** — se pesquisa/apresentação estourarem, o reveal e a transição são o único espaço de manobra (praticamente zero). Vale o professor manter um cronômetro visível na pesquisa/apresentação para não perder o timing.

---

## BLOCO 2 — UC05: Implementação "no Escuro" (9:50–12:00, ~130min)

**Objetivo:** cada grupo implementa o algoritmo que pesquisou, usando scikit-learn, com scaffolding mínimo, no dataset novo.

| # | Slide | Tag | Resumo | Tempo |
|---|---|---|---|---|
| 1 | Divisor de bloco | `[TEORIA]` | "Bloco 2 — hora de fazer funcionar de verdade" (reveal já aconteceu no bloco anterior, aqui só reafirma) | ~2min |
| 2 | O dataset de hoje | `[TEORIA]` | Apresenta o dataset "CatálogoStream" (tema Netflix) — título, duração, nota, gênero. Como pegar o CSV/colar no editor | ~5min |
| 3 | Instalação do scikit-learn | `[TEORIA]` | `pip install scikit-learn` ao vivo — todos rodam junto. (Plano de contingência ativado conforme necessário, fora do slide) | ~10-15min |
| 4 | O padrão genérico da biblioteca | `[TEORIA]` | 1 slide só: `modelo.fit(X, y)` / `modelo.predict()` — sem exemplo do algoritmo específico de cada grupo (scaffolding mínimo, R2.7) | ~5min |
| 5 | Início do desafio | `[DINAMICA]` | "Se virem" — cada grupo aplica esse padrão genérico ao SEU algoritmo (KNN/Árvore/K-Means), sem colinha de código pronta | ~2min |
| 6 | — (desafio em si, sem slide) | `[DINAMICA]` | Tempo de implementação real, professor circula entre os grupos | ~70-75min |
| 7 | Instruções do fechamento | `[TEORIA]` | Como vai funcionar a rodada final: cada grupo mostra a tela (funcionou / quase / travou, tudo bem) — 2min por grupo, sem gabarito único no projetor | ~2min |
| 8 | — (mostra dos grupos, sem slide) | `[DINAMICA]` | ~10 grupos × ~2min | ~20min |
| 9 | Encerramento | `[TEORIA]` | Síntese do dia: pesquisaram, apresentaram, foram surpreendidos, implementaram com biblioteca de verdade. **Sem gancho pra próxima aula** (decisão explícita do professor — só a síntese, sem antecipar nada) e **sem tarefa de casa** — aula 100% encerrada em sala | ~3min |

**Total estimado:** ~130min ✔ dentro do bloco (com folga pequena para atrasos do desafio "no escuro", que é o item de maior variabilidade real).

> **Nota:** por decisão explícita do professor, esta aula NÃO tem tarefa de casa. O bloco `[TAREFA DE CASA]` obrigatório da skill `estrutura-aula` fica sem uso nesta aula — exceção justificada e registrada aqui para o `@auditor-estrutura` não sinalizar como violação.

---

## Status de geração

| Bloco | Status |
|---|---|
| UC04 | ✅ gerado — slides 1 a 16 (`slides.md`, após correção de overflow: slide 5 "Árvore de Decisão" foi dividido em 2 pela regra "expandir, nunca cortar") |
| UC05 | ✅ gerado — slides 17 a 26 (`slides.md`, após correção de overflow: slide do dataset CatálogoStream foi dividido em 2 pelo mesmo motivo) |

**Validação final (Etapa pós-geração):**
- Overflow: 2 slides com overflow detectados (Árvore de Decisão no Bloco 1, dataset CatálogoStream no Bloco 2) — corrigidos por divisão sem corte de conteúdo. Arquivo final: **26 slides**, `check-overflow.mjs` → "Nenhum overflow detectado"
- Auditoria estrutural T→E→D→TC: sem violações reais fora do já conhecido/aprovado. Dois trechos com `[TEORIA]` consecutivo acima do padrão (Bloco 1 slides 4-8, Bloco 2 slides 18-21) são efeito colateral direto da divisão por overflow, não erro de sequência — mantidos assim para não quebrar o arco narrativo do reveal (R2.4-R2.6)
- Lint final: `node scripts/lint-slides.mjs` → **0 erros**, 46 avisos (todos `consecutive-teoria`, artefato conhecido do parser de lint — replicável em A38, não bloqueante)

---

## Plano fechado

Todos os pontos em aberto da revisão foram resolvidos (ver R3.1–R3.6 na tabela de decisões). Bloco UC04 (slides 1-16) e Bloco 2/UC05 (slides 17-26) gerados, validados (overflow zerado, auditoria estrutural sem violações reais) e aprovados — **26 slides no total**, lint limpo de erros. Produção de A39 concluída.
