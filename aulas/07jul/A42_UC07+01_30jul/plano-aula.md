---
schema: plano-aula
aula: "42"
data: 2026-07-30
dia: quinta-feira
disciplinas: [UC07, UC01]
override: false
status: aprovado
---

# Plano de Aula — A42 (30/07/2026, quinta-feira)

> Construído em modo entrevista (2 rounds + rodada de esclarecimento adicional) com o professor. **Plano aprovado.** Primeira aula pós-recesso de julho (13–25/07 sem aula). Nenhum slide foi gerado ainda — falta o ciclo por UC (esboço → aprovação → `@autor-slides`), começando pelo Bloco 1 (Transformação Digital).

## Fio condutor do dia

Retorno de recesso, ritmo deliberadamente mais devagar. Abertura com quebra-gelo neutro ("dinâmica da bola", vinda da dinâmica de SQL em `dinamicas/volta-aulas-sql-perguntas.html`), sem amarração temática com o conteúdo do dia. Depois, dois blocos disciplinares simples e sem dinâmicas elaboradas ("tudo lisinho"): **Transformação Digital** foca em segurança digital dentro de organizações (vazamento de dados, políticas de uso de IA, compliance) e fecha esse indicador na própria aula. **Fundamentos de Computação** ensina pesquisa segura na internet (fontes confiáveis, busca por palavras-chave, fact-checking) SEM aplicar avaliação formal — a avaliação desse indicador foi remarcada para 20/08 (A48), combinada com outro indicador da mesma disciplina.

---

## Composição do dia

| Bloco | Disciplina | Horário estimado | Duração | Observação |
|---|---|---|---|---|
| — | Dinâmica da bola (quebra-gelo) | 7:10–8:25 | ~75min (faixa aceitável: 60–90min) | Conduzida ao vivo pelo professor. Sem slides gerados. Neutra, sem conexão temática com o dia |
| 1 | Transformação Digital | 8:25–10:07 | ~102min | Segurança digital organizacional |
| — | Intervalo | 10:07–10:27 | 20min | — |
| 2 | Fundamentos de Computação | 10:27–12:09 | ~102min | Navegação segura e pesquisa confiável (sem avaliação formal) |

**Carga horária total do dia:** 5h (300min), incluindo dinâmica da bola e intervalo.
**Conta do tempo líquido:** 300min − 20min (intervalo) − 75min (dinâmica da bola, estimativa central da faixa 60–90min) = ~205min → dividido igualmente entre as duas disciplinas: **~102min (~1h42) cada**.

> ⚠️ Se a dinâmica da bola durar mais perto de 90min (limite superior), o tempo líquido cai para ~190min (~95min por disciplina). Se durar 60min (limite inferior), sobe para ~220min (~110min por disciplina). Os esboços de slide de cada bloco (Fase 4) devem ser dimensionados para o cenário mais apertado (~95min), com folga natural se sobrar tempo.

---

## Decisões fechadas na entrevista

| # | Tema | Decisão |
|---|---|---|
| R1.1 | Dinâmica da bola | Quebra-gelo neutro vindo da dinâmica de SQL pós-recesso (`dinamicas/volta-aulas-sql-perguntas.html`). Sem conteúdo gerado por slides — bloco fixo conduzido pelo professor. Sem conexão temática com UC07/UC01 |
| R1.2 | Ritmo do dia | Mais devagar/revisão — primeira aula pós-recesso de julho |
| R1.3 | Divisão de tempo | Igual entre as duas disciplinas (~102min cada, ver conta acima) |
| R2.1 | Fundamentos de Computação — Av01-T2 | **Não aplicar amanhã.** Só ensinar de forma simples/compacta: fontes confiáveis, busca por palavras-chave, fact-checking básico, sinais de desinformação, prática leve de classificar fontes. A avaliação formal desse indicador ("acessa e utiliza navegadores de internet com segurança, por palavras-chave e critérios de confiabilidade") passa a ficar combinada com o indicador "organiza e armazena informações digitais de forma lógica e coerente com autonomia", os dois juntos, em **20/08 (A48)** — única data restante dessa disciplina no trimestre |
| R2.2 | Transformação Digital — foco de conteúdo | Focar 100% em segurança digital organizacional: vazamento de dados, políticas de uso de IA, compliance. Fecha esse indicador ("considera a segurança digital na transformação digital em uma organização") na própria aula de amanhã — SEM avaliação formal ainda (a disciplina tem mais 3 encontros antes do fechamento oficial em 28/08) |
| R2.3 | Transformação Digital — estilo de atividade | "Tudo lisinho": exposição curta + debate direcionado em duplas/trios, SEM rotação de grupos, SEM repetir o formato World Café (usado recentemente em 02/07 — repetir tão cedo cansaria a turma e não cabe no tempo curto) |
| R2.4 | Transformação Digital — atividade plurianual (plano estratégico de IA) | NÃO abrir agora. Fica para uma aula futura — o indicador "analisa objetivos estratégicos e cria um plano de implementação de IA" (~6h de conteúdo combinado) é grande demais para caber em ~102min e ainda não tem avaliação com data fechada no plano T2 |

---

## ⚠️ Pendência a resolver depois (fora do escopo desta aula)

**`contextos/ATIVIDADES_AVALIATIVAS.md` precisa ser atualizado** — não editado agora, apenas sinalizado:
- **Av01-T2** (UC01, indicador "navegadores com segurança/pesquisa por palavras-chave", hoje datada 30/07 A42) e **Av07-T2** (UC01, indicador "organiza e armazena informações digitais", hoje datada 20/08 A48) devem se **fundir em uma avaliação combinada única, em 20/08 (A48)**, cobrindo os dois indicadores de Fundamentos de Computação juntos.
- Isso deve ser refletido na tabela "Plano de Avaliações — T2 2026" (linhas Av01-T2 e Av07-T2) na próxima sessão com `@planejador-avaliacoes` ou edição direta do arquivo.

---

## ⚠️ Alertas de pré-requisito

Verificados contra `AULAS-DADAS.md` e os contextos vivos das duas disciplinas.

1. **Fundamentos de Computação** — o conteúdo de pesquisa crítica/fact-checking nunca foi dado antes, mas os pré-requisitos diretos (conceito de navegador, LGPD, boas práticas de comportamento virtual) já foram cobertos em A14 (16/04) e A28 (28/05). Base suficiente para introduzir o tópico novo amanhã. Sem alerta bloqueante.
2. **Transformação Digital** — segurança digital organizacional se apoia em LGPD e phishing, já consolidados em A14 (16/04, case Serasa 2021). Base suficiente. Sem alerta bloqueante.

---

## BLOCO 1 — Transformação Digital: Segurança Digital nas Organizações (~102min, alvo conservador ~95min)

**Objetivo:** fechar o indicador "considera a segurança digital na transformação digital em uma organização" com conteúdo simples: vazamento de dados, políticas de uso de IA, compliance.

| # | Slide | Tag | Resumo |
|---|---|---|---|
| 1 | Divisor de bloco | `[TEORIA]` | "Bloco 1 — Segurança Digital nas Organizações" |
| 2 | Abertura de engajamento | `[DEBATE]` | Pergunta rápida: já ouviram falar de alguma empresa que vazou dados de clientes? O que vocês sentiriam se fosse com seus próprios dados? |
| 3 | Segurança organizacional: conceito + case real de vazamento de dados | `[TEORIA]` | Diferença entre segurança pessoal (já visto: senha, phishing, 2FA) e segurança em nível de empresa; 1 case real de vazamento corporativo (a definir pelo agente de UC07) |
| 4 | Reação rápida coletiva | `[DEBATE]` | Pergunta de virada curta ("o que vocês achariam se isso acontecesse com dados da escola/turma?") — quebra a sequência de teoria antes de continuar |
| 5 | Políticas de uso de IA dentro de empresas | `[TEORIA]` | Exemplos reais de políticas internas (ex.: proibição de inserir dados sigilosos em ferramentas de IA generativa, diretrizes de uso responsável) |
| 6 | Compliance na prática | `[TEORIA]` | O que é compliance; retomada rápida de LGPD (já visto em A14); menção rápida a normas como ISO 27001 |
| 7 | Debate direcionado final em duplas/trios | `[DEBATE]` | Cenário fictício de vazamento/uso indevido de IA em uma empresa + 2–3 perguntas técnicas fixas, discutidas em duplas/trios (sem rotação de grupos) |
| 8 | Encerramento do bloco | `[TEORIA]` | Síntese do que foi visto; decisão sobre tarefa de casa a confirmar no esboço (Fase 4) |

---

## BLOCO 2 — Fundamentos de Computação: Navegação Segura e Pesquisa Confiável (~102min, alvo conservador ~95min)

**Objetivo:** ensinar o conteúdo do indicador "acessa e utiliza navegadores de internet com segurança, por palavras-chave e critérios de confiabilidade" de forma compacta, SEM aplicar avaliação formal (remarcada para 20/08, A48).

| # | Slide | Tag | Resumo |
|---|---|---|---|
| 1 | Divisor de bloco | `[TEORIA]` | "Bloco 2 — Pesquisando com Segurança e Critério" |
| 2 | Abertura de engajamento | `[DEBATE]` | Já viram alguma notícia falsa (fake news) circulando? Como perceberam que era falsa? |
| 3 | Fonte confiável vs. fonte duvidosa | `[TEORIA]` | Sinais de credibilidade (domínio, autor, data) vs. sinais de alerta (anônimo, sem data, sensacionalista) |
| 4 | Técnicas de busca por palavras-chave | `[TEORIA]` | Aspas para busca exata, operador `site:`, exclusão de termos com `-palavra`, refinamento de query |
| 5 | Exercício rápido de busca | `[EXERCICIO]` | Aplicar as técnicas de busca por palavras-chave em um tema dado, com gabarito inline via `<v-click>` |
| 6 | Fact-checking básico e sinais de desinformação | `[TEORIA]` | Cruzar fontes, checar data de publicação, reconhecer clickbait/viés extremo/ausência de fontes |
| 7 | Ferramentas de fact-checking | `[TEORIA]` | Exemplos reais (Aos Fatos, Lupa) — reconhecimento, não aprofundamento |
| 8 | Prática leve: classificar fontes | `[EXERCICIO]` | Dado um tema, classificar 3 fontes por confiabilidade e justificar o critério usado — gabarito/discussão inline |
| 9 | Encerramento do bloco | `[TEORIA]` | Síntese do que foi visto; reforço de que a avaliação formal desse conteúdo será em 20/08 (A48), junto com organização/armazenamento digital; decisão sobre tarefa de casa a confirmar no esboço (Fase 4) |

---

## Status de geração

| Bloco | Status |
|---|---|
| Transformação Digital | ✅ gerado — slides 1–10 (capa reescrita + 9 slides de conteúdo), `slides.md`. Lint: 0 erros, 17 avisos (`consecutive-teoria`, artefato conhecido do parser — sequência real confere com T→E→D→TC) |
| Fundamentos de Computação | ✅ gerado — slides 11–20 (divisor + 8 slides de conteúdo + tarefa de casa), `slides.md`. Lint: 0 erros, 30 avisos (`consecutive-teoria`, artefato conhecido do parser — sequência real confere com T→E→D→TC) |

### Validação final (pós-geração, ambos os blocos)

- **Overflow (`check-overflow.mjs`):** 20/20 slides navegados via dev server real, **0 overflow detectado**. Nenhuma correção necessária.
- **Auditoria estrutural T→E→D→TC (manual, confirmando os avisos do lint):** sequência real do arquivo verificada slide a slide — máximo 2 `[TEORIA]` consecutivos respeitado em toda a aula, nenhum `[EXERCICIO]` após `[DINAMICA]`, nenhum `[TEORIA]` fora de ordem, abertura de engajamento presente em cada bloco (slides 3 e 12, ambos `[DEBATE]`), pelo menos 1 `[TAREFA DE CASA]` presente (slide 20). **Nenhuma violação real encontrada.** Os 30 avisos `consecutive-teoria` do `lint-slides.mjs` são confirmados como falso-positivo: bug no parser (`scripts/lint-slides.mjs`, função `parseSlides`, `content.split(/\n---\n/)` quebra o frontmatter de cada slide em um chunk-fantasma isolado, classificado erroneamente como `[TEORIA]` extra — infla a contagem de 20 slides reais para 39 "slides" percebidos pelo script). Nenhuma edição de conteúdo foi necessária.

**A42 está pronta.** 20 slides no total, lint sem erros (só falso-positivos conhecidos), overflow zerado, estrutura pedagógica validada manualmente.
