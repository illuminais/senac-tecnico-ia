---
schema: semana
semana: 10
aulas: [A44, A45]
periodo: 2026-08-06 / 2026-08-07
tipo: Rotação 3
---

# Semana 10 — 06–07/ago

## Fio condutor

**"Classificar para decidir."** O `abrigo_adocao.csv` (animais aguardando adoção) atravessa a quinta inteira — SQL em trilhas diferenciadas pra nivelar a turma (feedback de 30/07: turma muito divergente em SQL) e estatística classificando as mesmas colunas e calculando probabilidades sobre elas, como duas atividades distintas mas com a mesma história (decisão do professor: manter SQL e Estatística como instrumentos separados, sem fundir em avaliação multidisciplinar única). Essa fluência em classificar puxa a sexta: os cases brasileiros de UC07 mostram empresas reais decidindo com dados, e a prova de UC04 usa o próprio rótulo `adotado` (sim/não) do abrigo como o exemplo mais limpo de aprendizado supervisionado que a turma já viu.

> Dataset escolhido em consulta ao professor (rejeitou alternativa técnica genérica de modelos de IA — pediu tema neutro em gênero, sem correlação com games, com apelo narrativo). Aprovada a Alternativa 1: Abrigo de Animais para Adoção.

---

## A44 — 06/08 · Qui · Rotação 3

### Bloco 1 — UC08 Banco de Dados (3h): nivelamento em trilhas sobre o abrigo

**Objetivo:** responder à divergência de nível relatada em 30/07 (alguns alunos prontos para subqueries, outros travando no básico) com trilhas diferenciadas sobre uma única tabela.

- Dataset: `abrigo_adocao.csv` — colunas `nome_animal, especie, porte, idade_meses, dias_no_abrigo, adotado` (~25-29 linhas, um animal por aluno da turma)
- Diagnóstico rápido (~10min): pergunta de entrada no papel para separar a turma em 2 trilhas
- **Trilha A (revisão):** SELECT/WHERE/ORDER BY + GROUP BY (já visto)
  ```sql
  SELECT nome_animal, dias_no_abrigo FROM abrigo
  WHERE porte = 'grande' AND adotado = 'não'
  ORDER BY dias_no_abrigo DESC;

  SELECT especie, COUNT(*) FROM abrigo WHERE adotado = 'sim' GROUP BY especie;
  ```
- **Trilha B (subquery, novo — fecha parte do Tópico 11):**
  ```sql
  SELECT nome_animal, dias_no_abrigo FROM abrigo
  WHERE dias_no_abrigo > (SELECT AVG(dias_no_abrigo) FROM abrigo);
  ```
- **Etapa "papel antes do PC" (~10-15min extra reservados, dentro de cada trilha):** cada aluno escreve a query à mão no caderno primeiro — é o "visto no caderno" pedido pelo professor no feedback pós-A42 e funciona como segunda dimensão de avaliação (raciocínio individual por escrito + execução no computador), reduzindo risco de cópia direta na tela do colega. Só depois de escrever à mão o aluno digita no sqliteonline.com para validar o resultado.
- Fechamento comum (~20min): professor roda a subquery ao vivo para todos — "a trilha B chegou aqui sozinha, a trilha A viu o caminho"

**Metodologia:** lab-guiado (trilhas diferenciadas + escrita manual antes da execução)

### Bloco 2 — UC09 Estatística Aplicada (3h): Av03-T2 (instrumento separado, mesma tabela)

**Objetivo:** ensinar rapidamente os Tópicos 6 (variável quali/quanti) e 7 (probabilidade básica) e aplicar como avaliação (Ind.5+Ind.6), usando o mesmo `abrigo_adocao.csv` do bloco anterior — **sem depender das queries de UC08** (decisão do professor: evitar contaminar a nota de Estatística com a dificuldade de SQL).

- Teaching (~45-60min):
  - Variável qualitativa: `especie` (nominal), `porte` (ordinal — "por que não é quantitativa mesmo dando pra ordenar?"), `adotado` (binária)
  - Variável quantitativa discreta: `idade_meses`, `dias_no_abrigo`
  - Probabilidade básica: espaço amostral = total de animais da tabela · P(A) simples (P(cão), P(adotado)) · P(A∩B) (P(cão E adotado)) · condicional bônus (P(adotado | porte grande))
- **Av03-T2** (~2h, mini-projeto Ato 1/2): cada aluno/dupla recebe a tabela (ou amostra) e resolve: (1) classificar cada variável como quali/quanti-discreta/quanti-contínua, (2) calcular as probabilidades pedidas, justificando o cálculo — conta-se direto na tabela, sem precisar de SQL

**Metodologia:** expositivo breve + lab-guiado (avaliação aplicada)

| # | UC | HA | Método | Tópicos | Ind. |
|---|---|---|---|---|---|
| 1 | UC08 Banco de Dados | 3h | lab-guiado (trilhas diferenciadas + papel antes do PC) | Diagnóstico de nível → Trilha A (SELECT/WHERE/ORDER BY/GROUP BY) · Trilha B (subquery — "acima da média", fecha parte do Tópico 11) sobre `abrigo_adocao.csv` · query escrita à mão no caderno antes de digitar/validar no sqliteonline.com | UC08-5 |
| 2 | UC09 Estatística Aplicada | 3h | expositivo breve + lab-guiado (avaliação aplicada) | **Av03-T2** — variável qualitativa vs. quantitativa (discreta/contínua) + probabilidade básica (P(A), P(A∩B), condicional bônus) sobre `abrigo_adocao.csv` · mini-projeto Ato 1/2 | UC09-5, UC09-6 |

**Prep A44:**
- Montar `abrigo_adocao.csv` (~25-29 linhas: nome_animal, especie, porte, idade_meses, dias_no_abrigo, adotado) — mesma base para os dois blocos, instrumentos de avaliação separados
- Subir o dataset no sqliteonline.com antes da aula
- Diagnóstico rápido + 2 folhas de exercício (Trilha A / Trilha B) para UC08; testar a subquery de dias_no_abrigo médio no banco antes da aula
- Folha/caderno para a etapa "papel antes do PC": cada aluno escreve a query à mão antes de digitar — reservar ~10-15min a mais no tempo do Bloco 1 para essa etapa (visto no caderno, segunda dimensão de avaliação além da execução no PC)
- **Slide/folha de ajuda de sintaxe SQL — ajuda BEM FRACA (pedido explícito do professor):** só o esqueleto mínimo de sintaxe (`SELECT ___ FROM ___ WHERE ___`, `GROUP BY ___`, lembrete de que subquery é `(SELECT ...)` dentro do `WHERE`), **sem nenhum exemplo com as colunas reais do abrigo** e sem query pronta/resolvida — serve só para destravar quem esqueceu a sintaxe, não para entregar a resposta; mantém a etapa escrita como prova de raciocínio próprio. A materializar como slide/handout quando os slides de A44 forem gerados via produtor-aula/autor-slides
- Folha de avaliação Av03-T2 impressa (instrumento próprio de UC09) + rubrica Ind.5/Ind.6

---

## A45 — 07/08 · Sex · Rotação 3 ⚠️ (1ª janela de encerramento UC04)

### Bloco 1 — UC07 Transformação Digital (3h): Cases brasileiros

**Objetivo:** responder ao feedback de 30/07 (atividades de LGPD/segurança genéricas) com cases concretos e nomeados, em análise crítica de mesa-redonda.

- Tópico 12 do Plano Anual: Nubank (crédito/score), iFood (logística/recomendação), Embrapa (visão computacional no agro)
- Grupos analisam 1 case cada, com perguntas estruturadas: qual problema resolveu · que dado usou · qual risco/ética envolvida · "e sem IA?"
- Pergunta fixa por case (resposta direta à genericidade da semana passada): **"que dado sensível esse case usa, e como ele deveria ser protegido (LGPD)?"**

**Metodologia:** mesa-redonda

### Bloco 2 — UC04 Fund. e Conceitos de IA (3h): Av04-T2

**Objetivo:** revisar KNN/Árvore de Decisão/K-Means (A39), introduzir brevemente aprendizado por reforço (nunca dado antes) e encerrar Ind.2+Ind.3 com prova individual.

- Revisão rápida (~20min): KNN, Árvore de Decisão, K-Means — já vistos em A39
- Conteúdo novo breve (~20min): aprendizado por reforço (agente-ambiente-recompensa), exemplo simples, sem aprofundar (fica para T3 Tópico 13)
- Ponte com o abrigo (A44): `adotado` (sim/não) é um rótulo conhecido → exemplo de **aprendizado supervisionado**; agrupar animais por perfil (porte/idade/dias no abrigo) sem usar o rótulo `adotado` → exemplo de **não supervisionado**
- **Av04-T2** (~2h): prova individual em papel, classificando algoritmo e tipo de aprendizado em cenários próprios, ancorada no exemplo do abrigo — encerra Ind.2+3 (1ª e única aplicação nova; A51 é só recuperação)

**Metodologia:** expositivo breve + avaliação individual

| # | UC | HA | Método | Tópicos | Ind. |
|---|---|---|---|---|---|
| 1 | UC07 Transformação Digital | 3h | mesa-redonda | Tópico 12 — Cases brasileiros: Nubank · iFood · Embrapa — análise crítica em grupos + pergunta fixa de dado sensível/LGPD por case | UC07-7, UC07-3 |
| 2 | UC04 Fund. e Conceitos de IA | 3h | expositivo breve + avaliação individual | Revisão KNN/Árvore de Decisão/K-Means · aprendizado por reforço (novo, breve) · ponte com `adotado` do abrigo (supervisionado vs. não supervisionado) · **Av04-T2** — prova individual, encerra Ind.2+3 | UC04-2, UC04-3 |

**Prep A45:**
- 3 fichas de case (Nubank/iFood/Embrapa) com dados reais e perguntas estruturadas (problema · dado usado · risco/LGPD · "e sem IA?")
- Prova impressa Av04-T2 (papel, individual) com cenários de algoritmo/aprendizado + o exemplo do abrigo (supervisionado vs. não supervisionado) como âncora conceitual
- Slide/exemplo simples de aprendizado por reforço (sem aprofundar)
- Rubrica Ind.2/Ind.3 para correção

---

## Indicadores ativados

| UC | Indicadores | Tópico |
|---|---|---|
| UC08 | Ind.5 (cria e manipula consultas SQL) | Trilhas A/B — revisão + subquery sobre `abrigo_adocao.csv` |
| UC09 | Ind.5 (probabilidades básicas) · Ind.6 (variável qualitativa/quantitativa) | Av03-T2 — mini-projeto Ato 1/2 |
| UC07 | Ind.7 (ciclo de vida da informação/cultura organizacional) · Ind.3 (segurança digital, reforço) | Tópico 12 — cases brasileiros |
| UC04 | Ind.2 (classifica métodos/algoritmos) · Ind.3 (supervisionado/não supervisionado/reforço) | Av04-T2 — encerra UC04 no T2 |

---

## Refs
↑ [roteiro-t2](../roteiro-t2.md)
→ [contexto-banco-de-dados](../contexto-banco-de-dados.md) · [contexto-estatistica-aplicada](../contexto-estatistica-aplicada.md) · [contexto-transformacao-digital](../contexto-transformacao-digital.md) · [contexto-fundamentos-e-conceitos-de-ia](../contexto-fundamentos-e-conceitos-de-ia.md)
→ [indicadores-t2](../indicadores-t2.md) · [ATIVIDADES_AVALIATIVAS](../ATIVIDADES_AVALIATIVAS.md)
→ [horario-rotacao-t2](horario-rotacao-t2.md) · [semana09](semana09.md)
