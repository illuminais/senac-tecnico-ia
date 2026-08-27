---
schema: semana
semana: 13
aulas: [A50, A51]
periodo: 2026-08-27 / 2026-08-28
tipo: Rotação 3
---

# Semana 13 — 27–28/ago

## Fio condutor

**"O abrigo vira uma organização."** O abrigo já é o objeto comum de A44, A45 e A47. Esta
semana ele ganha banco, conta de crescimento e política de descarte. Na quinta o dado **nasce**
(estrutura física + permissão) e a turma aprende a medir o que cresce rápido demais. Na sexta a
mesma curva reaparece com outro objeto (o Pix, ruptura tecnológica) e o dado criado na quinta
percorre o **ciclo de vida** até o descarte.

A A45 deixou duas promessas explícitas aos alunos que nunca foram colhidas: o slide *"O dado
tem um caminho dentro do Nubank"* e o debate *"guardar mais dado ou descartar mais rápido?"*,
fechado com *"essa mesma tensão vai voltar em Banco de Dados quando vocês estudarem permissão
de acesso"*. A A47 cumpriu a parte da permissão. **A sexta colhe o resto.**

⚠️ Quatro dos cinco blocos são o **último slot da UC no T2**. Sem margem para remarcação.

## Dossiê do Abrigo

> Resposta ao problema relatado pelo professor em 26/08: *"a gente vai perdendo tudo, se são só
> aulas pontuais"*.

Seção fixa no caderno, aberta na A50, com **uma página por aula**. É o **material consultável
nas avaliações** — é isso que lhe dá valor real e faz o aluno manter. Custa zero de impressão,
o que resolve a restrição da quinta.

| Página | Título | Aula |
|---|---|---|
| 1 | O banco do abrigo | A50 bloco 1 |
| 2 | O que cresce rápido | A50 bloco 2 |
| 3 | A curva da ruptura | A51 bloco 1 |
| 4 | O caminho do dado | A51 bloco 2 |

## Ciclo pedagógico obrigatório

Continua valendo, definido em 19/08 (ver [semana12](semana12.md)):
**conceito → ensino esmiuçado → exercício de fixação no caderno → atividade.**

## Escala de verbos de indicador

> Nova diretriz do professor, 26/08. Skill em `.claude/skills/verbos-indicadores/SKILL.md`.

O verbo inicial do indicador define a profundidade exigida. Aplicado a esta semana:

| Indicador | Verbo | Nível | Consequência |
|---|---|---|---|
| UC08-3 **Cria** estrutura física *conforme requisitos* | Cria | **5** | Verbo mais alto da semana **e morre no T2**. Maior fatia, execução real |
| UC08-5 Cria **e manipula** consultas | composto | teto **3** | Continua no T3, não precisa fechar |
| UC09-3/4 **Compreende e aplica** log/exponencial | composto | teto **3** | **Fora:** propriedades, identidades, mudança de base. Sem esse corte não cabia em 3h |
| UC07-4 **Compreende** rupturas | simples | **2** | Morre no T2 **mas é barato**. Fecha rápido, libera tempo |
| UC07-7 **Estuda e avalia** cultura organizacional | composto | teto **4** | Caro, mas continua no T3 |

## Restrição de material

| Dia | Impressão |
|---|---|
| **A50 · 27/08 · quinta** | ❌ **Não há.** Tudo no caderno, copiado de modelo projetado. O que seria folha vira slide permanente |
| **A51 · 28/08 · sexta** | ✅ Disponível (confirmar) |

---

## A50 — 27/08 · Qui · Rotação 3

| # | UC | HA | Método | Tópicos | Ind. |
|---|---|---|---|---|---|
| 1 | UC08 | 3h | avaliacao | **Av06-T2 ato 2** — requisito → alavanca de schema, `CREATE TABLE` com PK/FK/CHECK/UNIQUE no Postgres, teste de violação, query permitida vs negada | UC08-3, UC08-5 |
| 2 | UC09 | 3h | avaliacao | **Av09-T2** — exponencial contra linear (tabela de dobras), logaritmo como pergunta inversa, aplicação em dado real do Pix | UC09-3, UC09-4 |

### Bloco 1 — UC08 (3h)

**Ambiente:** Postgres + DBeaver, continuidade da A47 (`abrigo_dNN` / `duplaNN`). A A47 saiu
**parcial** — parte da turma não executou — então abre com ~20min de nivelamento, cada dupla
que conseguiu adotando a que travou.

**Detalhe operacional:** as tabelas da A47 já existem. Cada dupla trabalha em schema próprio
(`CREATE SCHEMA meu_abrigo` + `SET search_path`), o que preserva o banco da A47 como gabarito
de comparação.

**O conceito novo não é a sintaxe** (vista em A08/A10), é a **rastreabilidade**: cinco alavancas
(`tipo`, `NOT NULL`, `PRIMARY KEY`/`UNIQUE`, `REFERENCES`, `CHECK`), cada uma respondendo a um
requisito numerado de negócio. Fixação com 7 requisitos, sendo R5 ("um animal só pode ser
adotado uma vez") a pegadinha: quase todos respondem FK, e FK não resolve unicidade.

**Teste de violação obrigatório:** cada dupla roda 3 `INSERT` que violam R3, R4 e R5 e copia a
mensagem de erro exata da tela. Sem o erro, constraint é fé.

**Rubrica Ind.3:** A = as três tabelas rodam **E** cada cláusula é rastreável a um requisito
numerado. Schema correto sem rastreabilidade = PA.

### Bloco 2 — UC09 (3h)

**Não é aula nova, é atividade.** Log e exponencial já foram vistos em T1 (A05/A18/A21, marcado
`🔄 fraco`). Como o teto do verbo é *aplicar*, **a atividade é a avaliação**.

Núcleo pedagógico: o **contraste com linear**, em duas colunas preenchidas à mão (`2ⁿ` contra
`1+50n`), com a pergunta "em que dia o exponencial ultrapassa?" (entre 8 e 9). Descobrir que
*começa perdendo e depois dispara* é a intuição inteira. Log entra como **a mesma tabela lida ao
contrário**, não como fórmula nova.

Av09-T2 fecha com dado real do Pix (8,9 bi em 2021 → ~80 bi em 2025, BCB): quantas vezes
dobrou? Log aplicado **sem calculadora**, e gancho literal para a sexta.

**Prep A50:**
- Rodar todo o SQL do gabarito no Postgres do laboratório, **inclusive os 3 `INSERT` de
  violação**, para conferir a mensagem de erro exata (varia com versão e idioma do servidor)
- Confirmar que cada dupla consegue `CREATE SCHEMA` com a conta `duplaNN`
- Nenhum impresso. Conferir que os slides de requisitos e tabelas ficam legíveis projetados

---

## A51 — 28/08 · Sex · Rotação 3 ⚠️

| # | UC | HA | Método | Tópicos | Ind. |
|---|---|---|---|---|---|
| 1 | UC07 | 3h | avaliacao | **Av10-T2 ato 2 (parte Ind.4)** — curva do Pix com dado do BCB, curva em S, ruptura vs melhoria, classificação do próprio número trazido de casa | UC07-4 |
| 2 | UC07 | 3h | avaliacao | **Av10-T2 ato 2 (parte Ind.7)** — ciclo de vida da informação (7 etapas), cultura organizacional em 3 camadas, decisão de descarte do CPF | UC07-7 |
| 3 | UC04 | — | recuperação | 2ª e última janela da Av04-T2, cenários novos do abrigo. Não é avaliação nova | UC04-2, UC04-3 |

**Entradas prontas:** vencem hoje a tarefa da A48 (*"quem precisa dizer sim para o plano sair do
papel?"* — insumo direto de cultura organizacional) e a tarefa da A50 (um número real que
cresceu, com fonte e conta de dobras — vira o caso que o aluno classifica no Ind.4).

### Bloco 1 — UC07 Ind.4 (nível 2, morre no T2)

Barato por desenho: evidência de A é **explicar com as próprias palavras + ler um caso novo**.
Sem canvas, sem produção.

**A profundidade real está na curva em S.** Se fosse exponencial puro, o Pix cresceria 100% ao
ano. Não cresce: 229% → 43% → 52% → 26%. A curva explode **e depois verga**. Ruptura é a parte
íngreme; saturação é a vergada. Ensinar só a primeira metade vira slogan.

Definição de ruptura: tecnologia que **não melhora o incumbente, troca a lógica dele**. O Pix não
é um TED mais rápido. Alunos pesquisam em sala no [dados abertos do
BCB](https://dadosabertos.bcb.gov.br/dataset/pix) e conferem o que o Pix deslocou, com link de
fonte. Sem LGPD (tema saturado) e sem os cases já consolidados.

### Bloco 2 — UC07 Ind.7 (teto nível 4)

**Ciclo de vida da informação, modelo de Beal (2012)**, 7 etapas: identificação de necessidades ·
obtenção · tratamento · distribuição · uso · armazenamento · **descarte**. Vale dizer em aula
que o **descarte é a única etapa que não aparece em nenhum outro modelo** (Davenport, Choo,
McGee & Prusak, Valentim) — é exatamente a etapa que o debate da A45 levantou e ninguém fechou.

Fixação: seguir **uma coluna só**, o `cpf` da tabela que eles criaram na quinta, pelas 7 etapas.

**Cultura organizacional em 3 camadas** (artefatos · valores declarados · pressupostos) entra
como o **critério** que o nível 4 exige. Tese da aula: **as permissões que eles escreveram são a
cultura da organização em código.** Se a política diz "protegemos o adotante" e o estagiário tem
`SELECT` em `adotantes`, o artefato desmente o valor declarado.

**Evidência de nível 4:** decisão individual escrita — *por quanto tempo o abrigo deve guardar o
CPF, e quem decide isso?* — com prazo concreto, justificativa citando a etapa de descarte, e
quem aprova pelo cargo. A = decide e justifica pelo critério. PA = decide por opinião. NA = não
decide.

### UC04 — recuperação

Só quem ficou PA/NA na Av04-T2. Quem já atendeu não refaz: consolida o Dossiê e vira **arguidor**,
lendo a decisão de dois colegas e escrevendo uma pergunta difícil para cada. Cenários novos
(não supervisionado e por reforço), sem reutilizar as questões da A45.

**Prep A51:**
- Confirmar impressão
- Recolher as duas tarefas na abertura, não no fim
- Ter a página do BCB aberta e testada na rede do laboratório

---

## Refs
↑ [roteiro-t2](../roteiro-t2.md)
→ [contexto-banco-de-dados](../contexto-banco-de-dados.md) · [contexto-estatistica-aplicada](../contexto-estatistica-aplicada.md) · [contexto-transformacao-digital](../contexto-transformacao-digital.md) · [contexto-fundamentos-e-conceitos-de-ia](../contexto-fundamentos-e-conceitos-de-ia.md)
→ [indicadores-t2](../indicadores-t2.md) · [ATIVIDADES_AVALIATIVAS](../ATIVIDADES_AVALIATIVAS.md) · [av06-t2](../aval/av06-t2-acesso-e-threads.md)
→ [horario-rotacao-t2](horario-rotacao-t2.md) · [semana12](semana12.md)
