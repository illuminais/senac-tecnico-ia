# Plano de Aula — A40 (09/07/2026, quinta)

**Composição:** UC02 Inglês Instrumental (3h) + UC05 Python para IA (3h) — Rotação 1
**Fonte:** `contextos/semanas/semana08.md` (plano já fechado em conversa direta com o professor — sem entrevista de rounds)

---

## Fio condutor do dia

**"Caso do Detetive."** O Troféu de Robótica sumiu da Sala de Projetos. 29 alunos = 29 suspeitos únicos. Gabarito real pronto (`dados/gabarito_suspeitos.csv`, 29 linhas: `suspect_id, alibi_location, motive, suspicious_item, has_witness`) — os alunos decodificam o schema em inglês via cartões individuais, não inventam o dado.

Dataset verificado manualmente antes da geração:
- `suspicious_item == 'chave_mestra'` aparece em exatamente **5 das 29 linhas** (as demais categorias têm 4 cada) — confirmado.
- `has_witness == 'no'`: **18** linhas · `yes`: **11** linhas — confirmado.
- Suspeitos sem testemunha por `alibi_location`: sala_de_projetos (4) > banheiro/biblioteca/corredor (3 cada) > cantina/patio (2 cada) > laboratorio (1) — confirmado, soma 18.

---

## Bloco 1 — UC02 Inglês Instrumental (3h)

**Objetivo:** vocabulário técnico de documentação de schema (`column`, `datatype`, `string`, `integer`, `boolean`, `format`, `lowercase`) via descoberta individual (information gap); início do Bloco 4 do Plano Anual (`import`, `library` garantidos).

**Metodologia:** descoberta individual (information gap) + oral/vocabulário contextual.

**Decisões:**
- Vocabulário de investigação (suspect, alibi, motive, witness) é tempero narrativo, não rastreado como aprendizado.
- Mecânica de circulação (15 cartões de schema para 29 alunos) tratada como **duas dinâmicas consecutivas** (`[DINAMICA]` → `[DINAMICA]`), não como dinâmica seguida de exercício — isso evita a violação estrutural "[EXERCICIO] após [DINAMICA]" da skill `estrutura-aula`. A formalização do vocabulário (tabela das 5 regras) vem depois, como `[TEORIA]`, e só então um `[EXERCICIO]` real (quiz de classificação de datatype).
- Termos do Bloco 4 além de import/library (`variable`, `function`, `loop`, `list`, `dictionary`, `return`) não são obrigatórios — Bloco 4 fica "começado".

## Bloco 2 — UC05 Python para IA (3h)

**Objetivo:** fechar o Tópico 14 do Plano Anual (pandas) — `groupby` é o único conceito novo.

**Metodologia:** live-coding + prática, progressão N0 (leitura) → N1 (completar lacunas) → N2 (escrita guiada).

**Decisões:**
- Nenhum conceito novo além de `groupby` — sem NumPy, sklearn, tuple ou set (regra da turma, mesmo com o precedente de mistura em A39).
- N2 reaproveita filtragem booleana (`df[df['col'] == val]`), já consolidada em A37 — não conta como conceito novo.
- Reveals de resultado (`chave_mestra` = 5/29; `sala_de_projetos` = 4 suspeitos sem testemunha) usados como fechamento narrativo, sem antecipar SIMD/GPU (conteúdo de UC06 na A41) — o debate de fechamento fica em nível conceitual puro Python ("por que não usar um for?").

---

## Lista de Slides (24 total)

| # | Título | Tag | Resumo |
|---|---|---|---|
| 1 | Capa — Aula 40 | `[TEORIA]` estrutural | Abertura, fio condutor do dia |
| 2 | Bloco 1 — Inglês: O Caso do Detetive | `[TEORIA]` estrutural | Divisor de bloco |
| 3 | O Troféu de Robótica sumiu | `[DEBATE]` | Abertura de engajamento, raciocínio sobre álibi |
| 4 | O caso: Sala de Projetos, hoje de manhã | `[TEORIA]` | Contextualização da investigação |
| 5 | As peças que faltam | `[TEORIA]` | Mecânica da atividade |
| 6 | Dinâmica: colete as 5 regras | `[DINAMICA]` | Circulação, coleta das 5 regras de schema |
| 7 | Dinâmica (continuação): reescreva seu cartão | `[DINAMICA]` | Aplica as regras ao próprio cartão |
| 8 | As 5 regras, formalizadas | `[TEORIA]` | Consolidação formal do vocabulário |
| 9 | Exercício: identifique o datatype | `[EXERCICIO]` | Quiz de classificação datatype/format |
| 10 | Novo vocabulário: import e library | `[TEORIA]` | Bloco 4, ponte pro pandas |
| 11 | Debate: e se fossem 29 mil suspeitos? | `[DEBATE]` | Fechamento Bloco 1, ponte de escala |
| 12 | Bloco 2 — Python: fechando a investigação com groupby | `[TEORIA]` estrutural | Divisor de bloco |
| 13 | Como vocês organizariam 29 fichas? | `[DEBATE]` | Abertura de engajamento, ativação groupby |
| 14 | O dataset da investigação | `[TEORIA]` | Recap import/read_csv (já consolidado) |
| 15 | Leia a tabela: as primeiras linhas | `[EXERCICIO]` | Leitura N0 do preview real, motiva o groupby |
| 16 | Novo conceito: groupby | `[TEORIA]` | Analogia + sintaxe mínima |
| 17 | N0 - Leia o resultado | `[EXERCICIO]` | Leitura de groupby rodado pelo professor |
| 18 | N1 - Complete o código | `[EXERCICIO]` | Lacunas em groupby |
| 19 | O resultado bate? | `[TEORIA]` | Reveal do N1 (chave_mestra = 5/29) |
| 20 | N2 - Escreva sua própria consulta | `[EXERCICIO]` | Escrita guiada, pergunta nova |
| 21 | A investigação aponta um lugar | `[TEORIA]` | Reveal do N2 (sala_de_projetos = 4) |
| 22 | Debate: por que não usar um for? | `[DEBATE]` | Fechamento Bloco 2, sem antecipar GPU |
| 23 | Tarefa de Casa: Aula 40 | `[TAREFA DE CASA]` | Pergunta nova + ponte pro SQL de amanhã |
| 24 | Fim da Aula 40 | `[TEORIA]` estrutural | Encerramento |

**Status:** ✅ gerado (slides 1-24, ambos os blocos, em uma única sessão)

**Verificação pós-geração (`editor-slides`):**
- Lint (`scripts/lint-slides.mjs`): 0 erros. 1 aviso real corrigido (slide 20 tinha 2 blocos de código `python` fenced — convertido o gabarito para code spans inline). Avisos remanescentes de "TEORIA consecutivo" são falso-positivo de um bug de parsing no script (`parseSlides()` duplica segmentos por slide) — confirmado o mesmo padrão em A39 (já aprovada), não é problema do A40.
- Overflow (`scripts/check-overflow.mjs`): 0 slides com overflow em 24 slides reais.
- Auditoria estrutural independente: encontrou 3 `[TEORIA]` consecutivos reais (slides 14-15-16, não cobertos pela exceção documentada dos slides 6-7). Corrigido transformando o slide 15 num exercício de leitura N0 (pergunta sobre a tabela + gabarito `<v-click>`) — reforça o motivo pedagógico do `groupby` em vez de só cortar a sequência.

---

## Nota sobre gabaritos

Gabaritos de exercícios usam `<v-click>` conforme instrução explícita do professor para esta sessão (slides 7, 9, 17, 18, 20). Isso diverge da convenção padrão em `.github/agents/referencia-tecnica.md` (que recomenda `<AdminOnly>` para proteger respostas do horário de liberação). Sinalizado ao professor no fechamento da sessão.

## Refs
→ [semana08](../../../contextos/semanas/semana08.md)
→ [gabarito_suspeitos.csv](dados/gabarito_suspeitos.csv)
→ [materiais-impressao-cartoes.md](dados/materiais-impressao-cartoes.md)
