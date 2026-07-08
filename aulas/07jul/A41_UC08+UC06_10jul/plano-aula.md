# Plano de Aula — A41 (10/07/2026, sexta)

**Composição:** UC08 Banco de Dados (3h) + UC06 Arquitetura de Computadores e GPU (3h) - Rotação 1
**Fonte:** `contextos/semanas/semana08.md` (plano já fechado em conversa direta com o professor - sem entrevista de rounds)

---

## Fio condutor do dia

Continuação direta da A40. Mesmo dataset (`aulas/07jul/A40_UC05+UC02_09jul/dados/gabarito_suspeitos.csv`, 29 suspeitos do "Caso do Detetive"). Ontem a turma agrupou os suspeitos em Python (`groupby`); hoje o mesmo arquivo sobe pro SQLite e a investigação continua em SQL (`GROUP BY` + `HAVING`), fechando com uma ponte técnica real para GPU: o mesmo princípio de "operar em todos os 29 suspeitos de uma vez, sem fila" que sustenta o `groupby` vetorizado é o princípio do SIMD que faz uma GPU valer a pena para reconhecimento facial e forense.

Dataset verificado manualmente antes da geração (`dados/gabarito_suspeitos.csv`):
- `GROUP BY suspicious_item` sem filtro: 7 grupos, `chave_mestra` = 5 linhas, os outros 6 itens = 4 linhas cada - confirmado.
- `HAVING COUNT(*) >= 5` sobre o agrupamento acima: isola só `chave_mestra` (5) - confirmado.
- `WHERE has_witness = 'no' GROUP BY suspicious_item HAVING COUNT(*) >= 4`: isola só `chave_mestra` (4 das 5 linhas do item não têm testemunha; a quinta, suspeito 22, tem testemunha) - confirmado.

---

## Bloco 1 - UC08 Banco de Dados (3h)

**Objetivo:** fechar o Tópico 11 do Plano Anual - `GROUP BY` já foi coberto em A36; o foco único e profundo de hoje é `HAVING`.

**Metodologia:** lab-guiado.

**Decisões:**
- Não introduzir `JOIN` com uma segunda tabela (já coberto em A36) - fica para quando uma tabela de evidências separada fizer sentido.
- Regra de sala (feedback A36: "turma não escreve SQL de cabeça sem modelo"): escrever a query no papel antes de digitar - reforçada em todos os 3 slides de exercício do bloco.
- Progressão: revisão de `GROUP BY` (slide 5, já consolidado) → conceito novo `HAVING` isolado (slides 7-9) → combinação `WHERE` + `GROUP BY` + `HAVING` (slides 10-11), fechando com o mesmo resultado nítido do plano (`chave_mestra`).

## Bloco 2 - UC06 GPU (3h)

**Objetivo:** foco único e profundo em metade do Tópico 3 do Plano Anual - só `SIMD` e `CUDA cores`. VRAM e tensor cores não são mencionados nesta aula (ficam para retomada futura do Tópico 3).

**Metodologia:** expositivo, ancorado na analogia do `groupby` vetorizado da A40.

**Decisões:**
- Gancho real (não genérico): `groupby` roda em cima de NumPy e aplica a mesma operação em todos os 29 suspeitos de uma vez, sem loop - ponte direta para SIMD (Single Instruction, Multiple Data) vs. SISD (CPU tradicional).
- Fechamento com aplicação real: por que reconhecimento facial/forense usa GPU (comparar uma foto contra milhares, em paralelo).
- Nenhuma menção a VRAM ou tensor cores.

---

## Lista de Slides (22 total)

| # | Título | Tag | Resumo |
|---|---|---|---|
| 1 | Capa - Aula 41 | `[TEORIA]` estrutural | Abertura, fio condutor do dia |
| 2 | Bloco 1 - Banco de Dados: HAVING fecha a investigação | `[TEORIA]` estrutural | Divisor de bloco |
| 3 | Ontem vocês agruparam no Python. E no SQL? | `[DEBATE]` | Abertura de engajamento, ponte groupby → SQL |
| 4 | O mesmo caso, agora no SQLite | `[TEORIA]` | Contextualização + regra de sala (papel antes de digitar) |
| 5 | Exercício: reproduza o agrupamento em SQL | `[EXERCICIO]` | Revisão de GROUP BY (já consolidado em A36) |
| 6 | O resultado bate com o Python? | `[TEORIA]` | Reveal da revisão (two-cols-text) |
| 7 | Conceito novo: HAVING | `[TEORIA]` | WHERE x HAVING (two-cols-text) |
| 8 | Exercício N1: complete a query com HAVING | `[EXERCICIO]` | Lacuna no threshold do HAVING |
| 9 | O resultado aponta um item só | `[TEORIA]` | Reveal: chave_mestra = 5 |
| 10 | Exercício N2: estreite ainda mais a investigação | `[EXERCICIO]` | Escrita guiada combinando WHERE + HAVING |
| 11 | A investigação se fecha | `[TEORIA]` | Reveal: chave_mestra = 4 sem testemunha |
| 12 | Debate: por que WHERE não bastava? | `[DEBATE]` | Fechamento Bloco 1, gancho para JOIN futuro |
| 13 | Bloco 2 - GPU: SIMD e CUDA cores | `[TEORIA]` estrutural | Divisor de bloco |
| 14 | Lembra do groupby de ontem? | `[DEBATE]` | Abertura de engajamento, ativação SIMD |
| 15 | groupby é uma operação vetorizada | `[TEORIA]` | Ponte NumPy/vetorização |
| 16 | CPU é SISD. GPU é SIMD | `[TEORIA]` | Comparação SISD x SIMD (two-cols-text) |
| 17 | Exercício: SISD ou SIMD? | `[EXERCICIO]` | Classificação de cenários |
| 18 | CUDA cores: centenas de "trabalhadores" na mesma tarefa | `[TEORIA]` | Aprofunda CUDA (mencionado em A03) |
| 19 | Por que reconhecimento facial usa GPU | `[TEORIA]` | Aplicação real forense |
| 20 | Debate: SIMD no dia a dia | `[DEBATE]` | Fechamento Bloco 2, gancho VRAM/tensor cores futuro |
| 21 | Tarefa de Casa: Aula 41 | `[TAREFA DE CASA]` | SQL (WHERE+GROUP BY+HAVING nova pergunta) + 3 exemplos de SIMD |
| 22 | Fim da Aula 41 | `[TEORIA]` estrutural | Encerramento |

**Status:** ✅ gerado (slides 1-22, ambos os blocos, em uma única sessão)

**Verificação pós-geração (`editor-slides`):**
- Lint (`scripts/lint-slides.mjs`): 0 erros. Os 25 avisos reportados são falso-positivo confirmado de um bug de parsing pré-existente no script (`content.split(/\n---\n/)` conta abertura/fechamento de frontmatter como slides distintos) - mesmo padrão presente em A39 (48 avisos) e A40 (26 avisos), ambas já aprovadas.
- Overflow (`scripts/check-overflow.mjs`): 2 slides com overflow na primeira passada (slide 6 e slide 7, tabela/código + texto empilhados em `layout: default`). Corrigido convertendo ambos para `layout: two-cols-text`, redistribuindo o mesmo conteúdo em colunas, sem remover nada. Segunda passada: 0 slides com overflow em 22 slides reais.
- Auditoria estrutural independente: sequência de tags confirmada exatamente conforme planejado (nenhum >2 TEORIA consecutivos fora de divisores/cover/end; múltiplos DEBATE; 1 TAREFA DE CASA; nenhum EXERCICIO/TEORIA depois da tarefa de casa exceto o slide end). Zero violações.
- Gabaritos: todos os 4 blocos de gabarito (slides 5, 8, 10, 17) usam `<AdminOnly>`, conforme convenção pedida explicitamente para esta sessão (divergindo do `<v-click>` usado pontualmente em A40 a pedido do professor naquela sessão).

## Refs
→ [semana08](../../../contextos/semanas/semana08.md)
→ [gabarito_suspeitos.csv](../A40_UC05+UC02_09jul/dados/gabarito_suspeitos.csv)
→ [plano-aula A40](../A40_UC05+UC02_09jul/plano-aula.md)
