# Plano de Aula — A44

**Data:** 06/08/2026 (quinta-feira) · **Tipo:** Rotação 3 · **Semana:** 10
**Fonte:** `contextos/semanas/semana10.md` (plano já aprovado pelo professor — entrevista pulada por decisão explícita)
**Fio condutor do dia:** "Classificar para decidir" — `abrigo_adocao.csv` atravessa os dois blocos como instrumentos de avaliação SEPARADOS (SQL de um lado, estatística do outro).

---

## Composição do Dia

| # | UC | Disciplina | HA | Método | Indicador(es) |
|---|---|---|---|---|---|
| 1 | UC08 | Banco de Dados | 3h | lab-guiado (trilhas diferenciadas + papel antes do PC) | UC08-5 |
| 2 | UC09 | Estatística Aplicada | 3h | expositivo breve + lab-guiado (Av03-T2) | UC09-5, UC09-6 |

**Dataset único do dia:** `abrigo_adocao.csv` (~25-29 linhas: `nome_animal, especie, porte, idade_meses, dias_no_abrigo, adotado`) — subido previamente no sqliteonline.com. Mesma tabela usada nos dois blocos, mas como **instrumentos de avaliação separados** (decisão explícita do professor em 30/07: não misturar nota de SQL com nota de Estatística).

---

## Decisões já tomadas (herdadas de semana10.md — não renegociar)

| Item | Decisão |
|---|---|
| Dataset | Abrigo de animais para adoção — tema neutro em gênero, sem correlação com games, com apelo narrativo (alternativa aprovada pelo professor, rejeitando dataset técnico genérico de ML) |
| UC08 — nivelamento | Diagnóstico no papel (~10min) separa a turma em Trilha A (revisão SELECT/WHERE/ORDER BY/GROUP BY) e Trilha B (subquery "acima da média", novo) |
| UC08 — papel antes do PC | Obrigatório em ambas as trilhas: aluno escreve a query à mão no caderno ANTES de digitar no sqliteonline.com (~10-15min extra reservados). Serve de "visto no caderno", segunda dimensão de avaliação contra cópia de tela |
| UC08 — ajuda de sintaxe | Slide/handout deliberadamente FRACO: só esqueleto (`SELECT ___ FROM ___ WHERE ___`, `GROUP BY ___`, lembrete `(SELECT ...)` dentro do WHERE para subquery). **Sem nenhum exemplo com colunas reais do abrigo, sem query pronta.** Só destrava sintaxe, não entrega resposta |
| UC08 — fechamento | Professor roda a subquery ao vivo para toda a turma |
| UC09 — separação de instrumento | Av03-T2 (Ind.5+Ind.6) é avaliação PRÓPRIA de Estatística, não depende das queries de UC08 — conta-se direto na tabela, sem SQL |
| UC09 — conteúdo | Variável qualitativa (nominal/ordinal/binária) vs. quantitativa discreta, usando colunas do abrigo; probabilidade básica (espaço amostral = tabela toda, P(A), P(A∩B), condicional bônus P(adotado\|porte grande)) |
| UC09 — formato | Mini-projeto Ato 1/2 (Ato 2 = Av09-T2 em 27/08, A50) |
| **Template de Debate (novo)** | Aprovado pelo professor durante a produção de A44: perguntas abertas genéricas ficavam sem resposta. Todo slide `[DEBATE]` desta aula em diante usa **dilema de escolha forçada**: Time A vs. Time B, cada lado ancorado em um dado real do dataset/exercício da aula, grupo escolhe lado e justifica com dado concreto (nunca opinião solta). Ver `.claude/skills/estrutura-aula/SKILL.md`, seção "Slide de Debate" |

---

## Verificação de pré-requisitos

| Pré-requisito | Necessário para | Status |
|---|---|---|
| GROUP BY + funções de agregação (AVG, COUNT) | UC08 subquery "acima da média" (usa `AVG(dias_no_abrigo)`) | ✅ Confirmado em A36 (25/06) — `contexto-banco-de-dados.md` |
| HAVING | Contexto de SQL-DQL avançado (Tópico 11) | ✅ Confirmado em A41 (10/07) |
| SELECT/WHERE/ORDER BY | Trilha A (revisão) | ✅ Confirmado desde A06/A10/A36/A41 |

Nenhum alerta de pré-requisito não confirmado para A44 — toda a base necessária já consta em `AULAS-DADAS.md` e no log de execução de UC08.

> Nota: UC09 Tópicos 6 (variável quali/quanti) e 7 (probabilidade básica) aparecem como `⬜ pendente` no Plano Anual — é conteúdo NOVO desta aula, não uma lacuna de pré-requisito.

---

## Esboço de Slides — Visão Geral do Dia

### BLOCO 1 — UC08 Banco de Dados (slides 1–17 · ✅ GERADO em 04/08, auditado em 04/08)

| # | Tag | Título | Resumo |
|---|---|---|---|
| 1 | `[TEORIA]` | Capa da aula | Estrutural |
| 2 | `[TEORIA]` | Divisor — BLOCO 1: Banco de Dados | Estrutural, abre o bloco |
| 3 | `[DEBATE]` | Dilema: filhote ou quem espera mais? | Escolha forçada Time A (idade_meses baixa, Rex) vs. Time B (dias_no_abrigo alto, Mel) — novo template de dilema aplicado |
| 4 | `[TEORIA]` | Conheça o abrigo (colunas) | Explica as 6 colunas da tabela `abrigo` |
| 5 | `[TEORIA]` | Conheça o abrigo: mais colunas | Completa o mapeamento de colunas — desmembrado de (4) por densidade |
| 6 | `[EXERCICIO]` | Checkpoint rápido: levante a mão | Mini-checkpoint de participação (inserido na auditoria de 04/08 para quebrar sequência de 4 `[TEORIA]` consecutivos, slides 4-7) |
| 7 | `[TEORIA]` | Conheça o abrigo (cont., tabela de exemplo) | 8 animais reais em `SlideTable`, inclui Rex/Mel do debate |
| 8 | `[TEORIA]` | Conheça o abrigo: o dilema nos dados | Conecta dados reais (Rex vs. Mel) ao debate inicial |
| 9 | `[EXERCICIO]` | Diagnóstico rápido (papel, ~10min) | 3 perguntas de autoavaliação; critério de corte em `<AdminOnly>` |
| 10 | `[TEORIA]` | Duas trilhas, uma tabela | Explica trilhas + regra "papel antes do PC" |
| 11 | `[TEORIA]` | Colinha de sintaxe SQL (esqueleto mínimo) | Ajuda deliberadamente fraca, sem exemplos do abrigo |
| 12 | `[EXERCICIO]` | Trilha A — Query 1 (WHERE + ORDER BY) | Papel → sqliteonline.com. Gabarito em `<AdminOnly>` |
| 13 | `[EXERCICIO]` | Trilha A — Query 2 (GROUP BY + COUNT) | Papel → sqliteonline.com. Gabarito em `<AdminOnly>` |
| 14 | `[TEORIA]` | Trilha B — o que é uma subquery | Conceito genérico (tabela `turma`/`nota`, fora do abrigo, não entrega resposta) |
| 15 | `[EXERCICIO]` | Trilha B — subquery "acima da média" | Papel → sqliteonline.com. Gabarito em `<AdminOnly>` |
| 16 | `[DINAMICA]` | Fechamento comum — professor roda ao vivo | "A trilha B chegou aqui sozinha, a trilha A viu o caminho" |
| 17 | `[TAREFA DE CASA]` | Tarefa UC08 | Repetir tipo de query com outro critério (espécie/idade_meses), papel antes do PC |

> Divergência vs. esboço original: "Conheça o abrigo" foi desmembrado em 2 slides físicos (regra de densidade). Auditoria de 04/08 detectou que esse desmembramento criou 4 `[TEORIA]` consecutivos (slides 4-7 na numeração anterior) e inseriu o slide 6 (`[EXERCICIO]` checkpoint de participação leve) para corrigir, sem cortar nenhum conteúdo. Ordem, tags e essência pedagógica preservadas.

### BLOCO 2 — UC09 Estatística Aplicada (slides 18–32 · ✅ GERADO, auditado e revisado (QA) em 04/08)

| # | Tag | Título | Resumo |
|---|---|---|---|
| 18 | `[TEORIA]` | Divisor — BLOCO 2: Estatística Aplicada | Estrutural |
| 19 | `[DEBATE]` | Qual espécie tem tempo de espera mais imprevisível? | Reformulado após QA: Time A (gatas, Luna 8 dias vs. Mel 210 dias, diferença 202) vs. Time B (cães, Thor 5 dias vs. Bento 180 dias, diferença 175) — dado real decide sem contradição lógica |
| 20 | `[DEBATE]` | (cont.) Cálculo da diferença + conexão futura | Conexão futura corrigida: aponta para P(cão) e P(cão∩adotado), que é o que de fato é calculado depois |
| 21 | `[TEORIA]` | Variável qualitativa vs. quantitativa | Definição geral |
| 22 | `[TEORIA]` | Discreta ou contínua? | **Novo (pós-QA):** ensina a distinção antes de a Av03-T2 cobrar, com exemplo fora do abrigo (altura, tempo de reação) |
| 23 | `[EXERCICIO]` | Checkpoint rápido: nota de prova é contínua? | **Novo (pós-QA):** quebra a sequência de `[TEORIA]` (21-22) antes de aplicar ao abrigo |
| 24 | `[TEORIA]` | Classificando o abrigo | `especie` (nominal), `adotado` (binária), `idade_meses`/`dias_no_abrigo` (quanti discreta) |
| 25 | `[EXERCICIO]` | Checkpoint rápido: levante a mão (porte) | Mini-checkpoint de participação (auditoria de 04/08) |
| 26 | `[TEORIA]` | Classificando o abrigo (cont.) | `porte` (ordinal — por que não é quanti?) |
| 27 | `[EXERCICIO]` | Checagem rápida de classificação | Mini prática, gabarito em `<AdminOnly>`, reforço antes da avaliação |
| 28 | `[TEORIA]` | Probabilidade básica | Espaço amostral = tabela toda, P(A), P(A∩B), condicional bônus P(adotado\|porte grande) |
| 29 | `[EXERCICIO]` | Exemplo resolvido coletivo | Calcular P(cão) e P(cão∩adotado) junto com a turma, passo a passo |
| 30 | `[ATIV AVALIATIVA]` | Av03-T2 — Mini-projeto Ato 1/2 | Instrumento avaliativo próprio (Ind.5+Ind.6), ~2h, folha impressa |
| 31 | `[TAREFA DE CASA]` | Tarefa UC09 | A definir no checkpoint da UC |
| 32 | `[TEORIA]` | Encerramento do dia (layout end) | Fecha A44, prévia de A45 (UC07 cases + UC04 Av04-T2) |

> Revisão de qualidade pedagógica (`@revisor-aula`, 04/08) encontrou 2 problemas reais neste bloco: (1) Av03-T2 cobrava "quantitativa contínua" sem esse conceito ter sido ensinado → corrigido com os slides 22-23 novos; (2) o debate original ("cão ou gato, quem sai mais rápido") usava evidência que contradizia a própria posição e prometia uma conta que nunca era calculada → reformulado nos slides 19-20. Overflow do debate reformulado gerou o split 19/20. Nenhum conteúdo foi cortado.

---

## Status de Geração

| Bloco | Status |
|---|---|
| UC08 Banco de Dados | ✅ Gerado e auditado (slides 1–17 de `slides.md`). Auditoria de 04/08 (`--mode=audit`) encontrou 4 `[TEORIA]` consecutivos reais (slides 4-7 antigos) e inseriu 1 slide `[EXERCICIO]` de checkpoint leve (slide 6 atual) para corrigir, sem cortar conteúdo. Revisão de qualidade (`@revisor-aula`, 04/08): 🟢 aprovado, só 1 ressalva menor no critério de corte do diagnóstico (não bloqueante) |
| UC09 Estatística Aplicada | ✅ Gerado, auditado e corrigido pós-QA (slides 18–32 de `slides.md`). Auditoria de 04/08 encontrou 3 `[TEORIA]` consecutivos reais e inseriu 1 checkpoint. Revisão de qualidade (`@revisor-aula`, 04/08): 🔴 encontrou 2 problemas reais (ver nota na seção do esboço acima) → ambos corrigidos via `editor-slides --mode=edit` no mesmo dia |

**Contagem final:** 24 slides (pós overflow-fix) → 27 (overflow-fix) → 29 (auditoria estrutural, +2 checkpoints) → **32 slides** (correções pós-QA: +2 slides de ensino discreta/contínua + checkpoint, +1 slide do split de overflow no debate reformulado).

**Pipeline de qualidade aplicado nesta aula:** `autor-slides` (geração) → `editor-slides --mode=overflow` (densidade) → `editor-slides --mode=audit` (estrutura T→E→D→TC) → `@revisor-aula` (conteúdo: genericidade, profundidade vs. indicador, adequação etária, coerência) → `editor-slides --mode=edit` (correções apontadas pelo QA) → overflow/lint re-verificados. Agente `@revisor-aula` criado em 04/08 (`.claude/agents/revisor-aula.md`) especificamente para fechar essa lacuna de QA de conteúdo.

---

## Refs

↑ [semana10](../../../contextos/semanas/semana10.md)
→ [contexto-banco-de-dados](../../../contextos/contexto-banco-de-dados.md) · [contexto-estatistica-aplicada](../../../contextos/contexto-estatistica-aplicada.md)
→ [ATIVIDADES_AVALIATIVAS](../../../contextos/ATIVIDADES_AVALIATIVAS.md) (Av03-T2, linha A44)
