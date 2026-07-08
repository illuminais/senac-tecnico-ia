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

**"Caso do Detetive."** Um mistério criado do zero pelos próprios alunos, em papel, sem IA: cada time inventa um suspeito (nome, álibi, motivo, arma, testemunha) na abertura da A40. Esse material vira a base de dados que atravessa a semana inteira — pandas na quinta (`groupby` fecha o Tópico 14), SQL na sexta (`GROUP BY` + `HAVING` fecha o Tópico 11) — e fecha com uma ponte técnica real para GPU: o mesmo princípio de "operar em todos os suspeitos de uma vez, sem fila" que sustenta o `groupby` vetorizado é o princípio do SIMD que faz uma GPU valer a pena para reconhecimento facial e forense.

---

## A40 — 09/07 · Qui · UC02 + UC05 · Rotação 1

### Bloco 0 — Abertura física do caso (~15min, contabilizado dentro do bloco UC02)

**Objetivo:** criar a matéria-prima da semana inteira, no papel, sem nenhuma ferramenta digital.

- Cada time recebe uma ficha em branco e cria **1 suspeito**: nome, álibi (local), motivo, arma/pista, testemunha (sim/não)
- Regra explícita: só escrita à mão — nenhuma IA, nenhum celular
- Rápido e direto — é gancho, não é a atividade principal do dia

### Bloco 1 — UC02 Inglês (3h)

**Objetivo:** vocabulário técnico em dois eixos que se cruzam na história do caso — palavras de investigação e as palavras de programação que historicamente travam a turma.

- Vocabulário de investigação (novo): `suspect` · `alibi` · `evidence` · `witness`
- Vocabulário de programação (**início do Bloco 4 do Plano Anual** — ainda não tinha sido dado): `import` · `library` — os dois termos que a turma mais confunde desde A37 (feedback: "não compreende por que importar bibliotecas, como instalar, sintaxe de import/alias")
- `import`/`library` são o núcleo garantido da aula. Os demais termos do Bloco 4 (`variable`, `function`, `loop`, `list`, `dictionary`, `string`, `integer`, `return`) **não são obrigatórios** — se a situação da história permitir naturalmente (ex: "cada suspeito é uma `variable` no nosso caso", "vamos rodar essa `function` de novo"), o professor pode encaixar 1 ou 2 de forma orgânica, sem forçar a lista inteira nem virar aula de vocabulário decorado
- Bloco 4 fica com status "começado" ao final desta aula, não "concluído" — o restante retoma em sessão futura
- Fechamento do bloco: transcrição rápida das fichas de suspeito de todos os times para uma planilha/CSV compartilhado — `suspeitos.csv` com colunas `nome, alibi_local, motivo, arma, testemunha`

**Metodologia:** oral + vocabulário contextual, com a dinâmica do caso como fio condutor (não lista de palavras isolada)

### Bloco 2 — UC05 Python (3h)

**Objetivo:** fechar o Tópico 14 do Plano Anual (pandas) — só falta `groupby` — usando a base de dados que os próprios alunos criaram.

- Carregam `suspeitos.csv` (o mesmo arquivo montado no bloco de UC02)
- Investigam com `groupby`:
  ```python
  df.groupby('testemunha')['motivo'].count()
  df.groupby('arma').size()
  ```
- Progressão obrigatória (regra "1 conceito por bloco" da UC05):
  - **N0 (leitura):** professor roda o `groupby` ao vivo, turma lê e interpreta o resultado
  - **N1 (completar lacunas):** starter code com `df.groupby('___')['___'].count()` para completar
  - **N2 (escrita guiada):** pergunta diferente do exemplo (ex: "quantos suspeitos por motivo têm testemunha?"), starter code mínimo
- Regra da turma: **nenhum conceito novo além de `groupby`** — nada de NumPy, sklearn, tuple ou set nesta aula (mesmo com o precedente de mistura em A39; aqui a regra volta a valer estritamente)

**Metodologia:** live-coding + prática

| # | UC | HA | Método | Tópicos | Ind. |
|---|---|---|---|---|---|
| 1 | UC02 Inglês | 3h | oral · vocabulário contextual | Abertura física do caso (fichas de suspeito em papel) · vocabulário de investigação (suspect, alibi, evidence, witness) · início do Bloco 4 — import, library garantidos, mais 1-2 palavras extra do bloco se a situação permitir naturalmente · transcrição para suspeitos.csv | UC02-1, UC02-2 |
| 2 | UC05 Python | 3h | live-coding · prática | pandas: groupby (fecha Tópico 14) — groupby('testemunha')['motivo'].count(), groupby('arma').size(); progressão N0→N1→N2 sobre suspeitos.csv | UC05-2 |

**Prep A40:**
- Fichas de papel em branco para criação de suspeito (1 por time): nome, álibi, motivo, arma, testemunha
- Planilha/CSV compartilhado pronto para receber a transcrição ao vivo (`suspeitos.csv`)
- Starter code com os 3 níveis de exercício de groupby (N0 exemplo pronto, N1 lacunas, N2 pergunta nova)
- Lista de vocabulário bilíngue impressa ou em slide: suspect/alibi/evidence/witness + import/library

---

## A41 — 10/07 · Sex · UC08 + UC06 · Rotação 1

### Bloco 1 — UC08 Banco de Dados (3h)

**Objetivo:** fechar o Tópico 11 do Plano Anual — `GROUP BY` já foi coberto em A36; hoje o foco único e profundo é `HAVING`. Mesma tabela `suspeitos` sobe pro SQLite, dando continuidade direta à investigação que começou no pandas.

- Sobem `suspeitos.csv` (mesmo arquivo da A40) para o SQLite (sqliteonline.com)
- Revisão rápida — reproduzir em SQL o que já fizeram em Python:
  ```sql
  SELECT arma, COUNT(*) FROM suspeitos GROUP BY arma;
  ```
- Conceito novo: `HAVING`
  ```sql
  SELECT arma, COUNT(*) AS qtd
  FROM suspeitos
  GROUP BY arma
  HAVING COUNT(*) >= 2;
  ```
  — "só suspeitos cujo grupo (por arma, por falta de testemunha) tem 2 ou mais candidatos continuam na lista"
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
| 1 | UC08 Banco de Dados | 3h | lab-guiado | GROUP BY (revisão, já coberto A36) + HAVING (novo, fecha Tópico 11) — suspeitos.csv no SQLite, escrever no papel antes de digitar | UC08-5 |
| 2 | UC06 GPU | 3h | expositivo | Tópico 3 (parcial): SIMD e CUDA cores — groupby vetorizado do pandas como ponte para paralelismo de GPU; CPU (SISD) vs GPU (SIMD); aplicação em reconhecimento facial/forense | UC06-2 |

**Prep A41:**
- Subir `suspeitos.csv` (gerado na A40) no sqliteonline.com antes da aula
- Testar as queries GROUP BY e HAVING no banco antes da aula
- Modelo/folha para escrever SQL no papel antes de digitar
- Slides da analogia SIMD/CUDA cores ancorados no groupby da A40 — sem menção a VRAM/tensor cores

---

## Indicadores ativados

| UC | Indicadores | Tópico |
|---|---|---|
| UC02 | Ind.1 (vocabulário técnico em inglês em interfaces e ambientes de programação) · Ind.2 (interpreta instruções simples em inglês) | Bloco 4 começado (import, library garantidos + extras oportunistas) + vocabulário de investigação |
| UC05 | Ind.2 (utiliza comandos de integração dos códigos construídos conforme estrutura projetada) | pandas: groupby — fecha Tópico 14 |
| UC08 | Ind.5 (cria e manipula consultas SQL para resolução de problemas) | GROUP BY (revisão) + HAVING (novo) — fecha Tópico 11 |
| UC06 | Ind.2 (reconhece e aplica conceitos de Pipeline para GPU) | Tópico 3 parcial — SIMD e CUDA cores |

---

## Refs
↑ [roteiro-t2](../roteiro-t2.md)
→ [contexto-ingles-instrumental](../contexto-ingles-instrumental.md)
→ [contexto-python-para-ia](../contexto-python-para-ia.md)
→ [contexto-banco-de-dados](../contexto-banco-de-dados.md)
→ [contexto-arquitetura-computadores-gpu](../contexto-arquitetura-computadores-gpu.md)
→ [horario-rotacao-t2](horario-rotacao-t2.md)
→ [semana07](semana07.md)
