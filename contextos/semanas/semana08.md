---
schema: semana
semana: "08"
aulas: [A40, A41]
periodo: 2026-07-09 / 2026-07-10
tipo: Rotação 1
override: true
override-motivo: "Calendário T2 (contextos/semanas/horario-rotacao-t2.md) previa Rotação 2 para a Semana 08. Decisão do professor em 08/07: retomar o ciclo pela Rotação 1 em A40/A41 (UC05+UC02 na quinta, UC08+UC06 na sexta), deslocando Rotação 2 para a Semana 09 (30-31/07, pós-recesso). Ver bloco 'Estado da Rotação' em horario-rotacao-t2.md."
---

# Semana 08 — 09–10/jul

## Fio condutor

**"O Roubo da Coroa"** — golpe estilo Lupin, elegante e lúdico: a Coroa Real foi roubada do Museu, e cada um dos 29 alunos é um suspeito diferente sendo investigado. O gabarito completo (`gabarito_suspeitos.csv`) já vem pronto do professor; a turma decodifica o schema em inglês através de cartões (1 Case File + 1 Schema Card por aluno, no máximo 2-3 conversas pra cada um completar as 4 regras). Esse dataset atravessa a semana inteira — pandas na quinta (`groupby` fecha o Tópico 14), SQL na sexta (`GROUP BY` + `HAVING` fecha o Tópico 11) — e fecha com uma ponte técnica real para GPU: o mesmo princípio de "operar em todos os 29 suspeitos de uma vez, sem fila" que sustenta o `groupby` vetorizado é o princípio do SIMD que faz uma GPU valer a pena para reconhecimento facial e forense.

---

## A40 — 09/07 · Qui · UC02 + UC05 · Rotação 1

### Bloco 0 — O Roubo da Coroa: cada aluno é um suspeito diferente (~60-70min, dentro do bloco UC02)

**Objetivo:** ensinar vocabulário técnico de **documentação de schema de dados** (não vocabulário geral de investigação) através de uma atividade de descoberta individual, e gerar o dataset da semana sem depender de transcrição em sala.

**Tema:** golpe estilo Lupin — a Coroa Real foi roubada do Museu. **29 alunos = 29 suspeitos únicos**, cada um com seu Case File (pré-escrito pelo professor, não inventado pela turma) e um espaço pra inventar o próprio **codinome de ladrão** (personalização livre, sem gabarito).

- O professor já leva pronto o **gabarito completo** (`gabarito_suspeitos.csv`, 29 linhas, colunas `suspect_id, alibi_location, motive, tool, has_witness` — `has_witness` é booleano real, `True`/`False`, não string `yes`/`no`) — é esse arquivo que carrega no pandas à tarde e no SQL na sexta. A atividade da turma é de **prática de leitura/formatação**, não a fonte real do dado (exceto o codinome, que é só flavor). Se alguém faltar, o professor cobre a linha da pessoa — o dataset nunca fica incompleto.
- Vocabulário tecnicamente rastreável (documentação de schema, em inglês): `column` · `datatype` · `string` · `boolean` · `format` · `lowercase` — isso cobre `string` do **Bloco 4 do Plano Anual** (início do bloco, ainda não tinha sido dado)
- Vocabulário de sabor da história (suspect, alibi, motive, tool...) aparece nos cartões só como tempero narrativo — **não é rastreado como aprendizado**
- Mecânica redesenhada pra escalar em sala de 29: cada aluno recebe **exatamente 2 cartões** — 1 Case File (seu suspeito) + 1 Schema Card (1 de só 4 regras possíveis). Como só existem 4 regras e cada aluno já sabe 1, **no máximo 3 conversas** completam as 4 (na prática, 2-3, já que cada conversa revela mais de uma regra de uma vez). Ninguém precisa falar com a turma inteira.
- Materiais: cartões prontos pra imprimir em `aulas/07jul/A40_UC05+UC02_09jul/dados/cartoes-para-imprimir.html` (abrir no navegador e imprimir); roteiro passo a passo em `dados/materiais-impressao-cartoes.md`
- `import`/`library` (também Bloco 4) entram à parte, conectando com o motivo de usar pandas à tarde: "por que importar uma ferramenta pronta (pandas) em vez de processar os 29 suspeitos na mão?"
- Os demais termos do Bloco 4 (`variable`, `function`, `loop`, `list`, `dictionary`, `integer`, `return`) **não são obrigatórios** — só entram se a conversa permitir naturalmente. Bloco 4 fica "começado", não "concluído"

**Metodologia:** descoberta individual (information gap) + oral/vocabulário contextual — cada aluno com informação única, precisa circular pra completar o quadro

### Bloco 2 — UC05 Python (3h)

**Objetivo:** fechar o Tópico 14 do Plano Anual (pandas) — só falta `groupby` — usando o dataset real da turma (29 suspeitos, decodificado no bloco de UC02).

- Carregam `gabarito_suspeitos.csv` (colunas: `suspect_id, alibi_location, motive, tool, has_witness`)
- Investigam com `groupby`:
  ```python
  df.groupby('has_witness')['motive'].count()
  df.groupby('tool').size()
  ```
  (o dataset foi montado de propósito para `tool == 'master_key'` aparecer em exatamente 5 das 29 linhas — o grupo mais numeroso, um resultado nítido pra fechar a investigação)
- Progressão obrigatória (regra "1 conceito por bloco" da UC05):
  - **N0 (leitura):** professor roda o `groupby` ao vivo, turma lê e interpreta o resultado
  - **N1 (completar lacunas):** starter code com `df.groupby('___')['___'].count()` para completar
  - **N2 (escrita guiada):** pergunta diferente do exemplo (ex: "quantos suspeitos por local de álibi não têm testemunha?"), starter code mínimo
- Regra da turma: **nenhum conceito novo além de `groupby`** — nada de NumPy, sklearn, tuple ou set nesta aula (mesmo com o precedente de mistura em A39; aqui a regra volta a valer estritamente)

**Metodologia:** live-coding + prática

| # | UC | HA | Método | Tópicos | Ind. |
|---|---|---|---|---|---|
| 1 | UC02 Inglês | 3h | descoberta individual (information gap) · oral | O Roubo da Coroa: 29 suspeitos únicos, cada aluno com 1 Case File + 1 Schema Card (só 4 regras no total) · vocabulário técnico rastreado (column, datatype, string, boolean, format, lowercase) · início do Bloco 4 (import, library garantidos) · codinome personalizado | UC02-1, UC02-2 |
| 2 | UC05 Python | 3h | live-coding · prática | pandas: groupby (fecha Tópico 14) — groupby('has_witness')['motive'].count(), groupby('tool').size(); progressão N0→N1→N2 sobre gabarito_suspeitos.csv | UC05-2 |

**Prep A40:**
- Imprimir `dados/cartoes-para-imprimir.html` (abrir no navegador, Ctrl+P): 29 Schema Cards (8 alibi_location, 7 motive, 7 tool, 7 has_witness) + 29 Case Files, um par por aluno
- `dados/gabarito_suspeitos.csv` pronto e testado — é o arquivo real que carrega no pandas, independente do que acontecer em sala
- Starter code com os 3 níveis de exercício de groupby (N0 exemplo pronto, N1 lacunas, N2 pergunta nova)
- Se algum aluno faltar, o professor já sabe qual linha do gabarito cobrir por ele

---

## A41 — 10/07 · Sex · UC08 + UC06 · Rotação 1

### Bloco 1 — UC08 Banco de Dados (3h)

**Objetivo:** fechar o Tópico 11 do Plano Anual — `GROUP BY` já foi coberto em A36; hoje o foco único e profundo é `HAVING`. A mesma tabela de 29 suspeitos (`gabarito_suspeitos.csv`) sobe pro SQLite, dando continuidade direta à investigação que começou no pandas.

- Sobem `gabarito_suspeitos.csv` (mesmo arquivo da A40) para o SQLite (sqliteonline.com)
- Revisão rápida — reproduzir em SQL o que já fizeram em Python:
  ```sql
  SELECT tool, COUNT(*) FROM suspeitos GROUP BY tool;
  ```
- Conceito novo: `HAVING` — o dataset foi montado pra dar um resultado nítido aqui: `master_key` é a única ferramenta com 5 suspeitos (todas as outras têm 4), então o filtro isola exatamente esse grupo:
  ```sql
  SELECT tool, COUNT(*) AS qtd
  FROM suspeitos
  GROUP BY tool
  HAVING COUNT(*) >= 5;
  ```
  — "só a ferramenta que mais se repete entre os suspeitos continua na lista final." Pode fechar combinando com `WHERE has_witness = False` pra estreitar ainda mais (de 5 suspeitos com master_key, 4 não têm testemunha)
- **Não introduzir JOIN** com uma segunda tabela nesta aula — JOIN já foi coberto em A36; fica para quando fizer sentido aprofundar com uma tabela separada de evidências/locais
- Regra de sala (feedback A36: "turma não escreve SQL de cabeça sem modelo"): escrever a query no papel antes de digitar

**Metodologia:** lab-guiado

### Bloco 2 — UC06 GPU (3h)

**Objetivo:** foco único e profundo em metade do Tópico 3 do Plano Anual — **SIMD e CUDA cores** apenas (VRAM e tensor cores ficam para uma aula futura).

- Gancho real, não genérico: o `groupby` do pandas (A40) é uma operação vetorizada — roda em cima de NumPy, aplicando a mesma operação em TODOS os suspeitos de uma vez, sem percorrer um por um com loop
- Esse é o mesmo princípio do **SIMD** (Single Instruction, Multiple Data): uma GPU tem centenas de núcleos CUDA executando a MESMA instrução em MUITOS dados ao mesmo tempo — diferente de uma CPU (SISD), que processa um de cada vez
- Fechamento com aplicação real: "por que reconhecimento facial/forense usa GPU — comparar uma foto contra milhares, em paralelo, não em fila"
- Não mencionar VRAM ou tensor cores nesta aula — fica para retomada futura do Tópico 3

**Metodologia:** expositivo, ancorado na analogia do `groupby`

| # | UC | HA | Método | Tópicos | Ind. |
|---|---|---|---|---|---|
| 1 | UC08 Banco de Dados | 3h | lab-guiado | GROUP BY (revisão, já coberto A36) + HAVING (novo, fecha Tópico 11) — gabarito_suspeitos.csv no SQLite, escrever no papel antes de digitar | UC08-5 |
| 2 | UC06 GPU | 3h | expositivo | Tópico 3 (parcial): SIMD e CUDA cores — groupby vetorizado do pandas como ponte para paralelismo de GPU; CPU (SISD) vs GPU (SIMD); aplicação em reconhecimento facial/forense | UC06-2 |

**Prep A41:**
- Subir `gabarito_suspeitos.csv` (o mesmo da A40) no sqliteonline.com antes da aula
- Testar as queries GROUP BY e HAVING no banco antes da aula (confirmar que `master_key` retorna 5)
- Modelo/folha para escrever SQL no papel antes de digitar
- Slides da analogia SIMD/CUDA cores ancorados no groupby da A40 — sem menção a VRAM/tensor cores

---

## Indicadores ativados

| UC | Indicadores | Tópico |
|---|---|---|
| UC02 | Ind.1 (vocabulário técnico em inglês em interfaces e ambientes de programação) · Ind.2 (interpreta instruções simples em inglês) | Bloco 4 começado (import, library) + vocabulário de documentação de schema (column, datatype, string, boolean, format, lowercase) — vocabulário de investigação (suspect, alibi, tool...) é só tempero narrativo, não rastreado |
| UC05 | Ind.2 (utiliza comandos de integração dos códigos construídos conforme estrutura projetada) | pandas: groupby — fecha Tópico 14 |
| UC08 | Ind.5 (cria e manipula consultas SQL para resolução de problemas) | GROUP BY (revisão) + HAVING (novo) — fecha Tópico 11 |
| UC06 | Ind.2 (reconhece e aplica conceitos de Pipeline para GPU) | Tópico 3 parcial — SIMD e CUDA cores |

---

## Refs
↑ [roteiro-t2](../roteiro-t2.md)
→ [roteiro + gabarito](../../aulas/07jul/A40_UC05+UC02_09jul/dados/materiais-impressao-cartoes.md)
→ [cartões para imprimir (HTML)](../../aulas/07jul/A40_UC05+UC02_09jul/dados/cartoes-para-imprimir.html)
→ [contexto-ingles-instrumental](../contexto-ingles-instrumental.md)
→ [contexto-python-para-ia](../contexto-python-para-ia.md)
→ [contexto-banco-de-dados](../contexto-banco-de-dados.md)
→ [contexto-arquitetura-computadores-gpu](../contexto-arquitetura-computadores-gpu.md)
→ [horario-rotacao-t2](horario-rotacao-t2.md)
→ [semana07](semana07.md)
