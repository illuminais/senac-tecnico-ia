# Estrutura da Aula — Mapeamento Completo
**Arquivo:** `slides.md` | **Última revisão:** 2026-07-08
**Total estimado de slides Slidev:** 24

> Gerado a partir de `plano-aula.md`, com base no plano já aprovado em `contextos/semanas/semana08.md`.

---

## Legenda de Tags

| Tag | Significado |
|---|---|
| `[TEORIA]` | Slide expositivo de conteúdo teórico |
| `[DEBATE]` | Pergunta aberta para debate coletivo ou brainstorming |
| `[EXERCICIO]` | Atividade individual ou em dupla com entrega ou resposta |
| `[DINAMICA]` | Atividade interativa, jogo, roleplay ou dinâmica de grupo |
| `[TAREFA DE CASA]` | Atividade para fazer fora da aula |

---

## SECAO 1 — Bloco 1: Inglês, O Caso do Detetive (UC02)
**Slides: 1 a 11** | Tópico principal: vocabulário de documentação de schema (column, datatype, string, integer, boolean, format, lowercase) + import/library (Bloco 4)

| Slide(s) | Título | Tag | Resumo |
|---|---|---|---|
| 1 | Capa — Aula 40 | `[TEORIA]` estrutural | Abertura, fio condutor do dia |
| 2 | Bloco 1 — Inglês: O Caso do Detetive | `[TEORIA]` estrutural | Divisor de bloco |
| 3 | O Troféu de Robótica sumiu | `[DEBATE]` | Abertura de engajamento |
| 4 | O caso: Sala de Projetos, hoje de manhã | `[TEORIA]` | Contextualização |
| 5 | As peças que faltam | `[TEORIA]` | Mecânica da atividade |
| 6 | Dinâmica: colete as 5 regras | `[DINAMICA]` | Circulação, coleta de schema |
| 7 | Dinâmica (continuação): reescreva seu cartão | `[DINAMICA]` | Aplicação das regras ao próprio cartão |
| 8 | As 5 regras, formalizadas | `[TEORIA]` | Consolidação formal |
| 9 | Exercício: identifique o datatype | `[EXERCICIO]` | Quiz de classificação |
| 10 | Novo vocabulário: import e library | `[TEORIA]` | Bloco 4, ponte pro pandas |
| 11 | Debate: e se fossem 29 mil suspeitos? | `[DEBATE]` | Fechamento Bloco 1 |

---

## SECAO 2 — Bloco 2: Python, groupby (UC05)
**Slides: 12 a 23** | Tópico principal: pandas groupby (fecha Tópico 14 do Plano Anual)

| Slide(s) | Título | Tag | Resumo |
|---|---|---|---|
| 12 | Bloco 2 — Python: fechando a investigação com groupby | `[TEORIA]` estrutural | Divisor de bloco |
| 13 | Como vocês organizariam 29 fichas? | `[DEBATE]` | Abertura de engajamento |
| 14 | O dataset da investigação | `[TEORIA]` | Recap import/read_csv |
| 15 | Leia a tabela: as primeiras linhas | `[EXERCICIO]` | Leitura N0 do preview real, motiva o groupby |
| 16 | Novo conceito: groupby | `[TEORIA]` | Analogia + sintaxe mínima |
| 17 | N0 - Leia o resultado | `[EXERCICIO]` | Leitura de groupby pronto |
| 18 | N1 - Complete o código | `[EXERCICIO]` | Lacunas em groupby |
| 19 | O resultado bate? | `[TEORIA]` | Reveal N1 (chave_mestra = 5/29) |
| 20 | N2 - Escreva sua própria consulta | `[EXERCICIO]` | Escrita guiada |
| 21 | A investigação aponta um lugar | `[TEORIA]` | Reveal N2 (sala_de_projetos = 4) |
| 22 | Debate: por que não usar um for? | `[DEBATE]` | Fechamento Bloco 2 |
| 23 | Tarefa de Casa: Aula 40 | `[TAREFA DE CASA]` | Ponte pro SQL de amanhã (A41) |

---

## SECAO 3 — Fechamento
**Slides: 24**

| Slide(s) | Título | Tag | Resumo |
|---|---|---|---|
| 24 | Fim da Aula 40 | `[TEORIA]` estrutural | Síntese do dia e gancho para A41 |

---

## Verificação de regras estruturais (skill `estrutura-aula`)

- Abertura de engajamento: ✅ slide 3 (`[DEBATE]`, layout brainstorm)
- Ao menos 1 `[DINAMICA]` ou `[DEBATE]` por bloco: ✅ ambos os blocos têm debate de abertura e fechamento; Bloco 1 tem 2 dinâmicas
- Ao menos 1 `[TAREFA DE CASA]`: ✅ slide 23
- `[EXERCICIO]` após `[DINAMICA]`: evitado deliberadamente — slides 6-7 são ambos `[DINAMICA]` (mesma atividade contínua); o `[EXERCICIO]` real (slide 9) só aparece após um `[TEORIA]` (slide 8)
- Máx. 2 `[TEORIA]` consecutivos sem quebra: ✅ — auditoria independente do `editor-slides` identificou que a sequência original (slides 14-15-16, todos `[TEORIA]`) formava 3 consecutivos. Corrigido reformulando o slide 15 ("As primeiras linhas" → "Leia a tabela: as primeiras linhas") como um exercício de leitura N0 (pergunta sobre a tabela + gabarito em `<v-click>`), que também reforça pedagogicamente por que o `groupby` é necessário. Maior sequência agora é 2 consecutivos (slides 4-5).
- `[TEORIA]` após `[TAREFA DE CASA]`: não ocorre (slide 24 é encerramento estrutural, não teoria de conteúdo novo)
- Cover sempre slide 1, end sempre último: ✅
- Densidade (`editor-slides`, lint `multi-code-block`): slide 20 tinha 2 blocos `python` fenced (starter code + gabarito) — corrigido convertendo o gabarito para code spans inline, mesmo padrão do slide 18.
