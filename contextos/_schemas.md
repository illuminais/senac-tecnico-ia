# Schemas de Planejamento — Curso Técnico em IA Senac

> Fonte de verdade para formato de todos os arquivos de planejamento.
> Agentes DEVEM seguir estes schemas ao criar ou editar arquivos.
> Violação de schema = arquivo rejeitado pelo revisor-commit.

---

## Hierarquia e Fluxo de Dados

```
roteiro-t{N}.md          ← navegação do trimestre (1 linha/aula)
  └── semanas/semana{NN}.md  ← plano operacional semanal (tabelas)
        └── contextos/contexto-{uc}.md  ← histórico append-only por UC
              └── metodologias-ativas-senac.md  ← referência estática
```

Cada camada APONTA para a próxima via links. Nunca duplicar conteúdo entre camadas.

---

## Schema 1 — roteiro-t{N}.md

**Propósito:** mapa de navegação do trimestre inteiro.
**Regra de ouro:** 1 linha por aula. Sem prose. Sem seções extras.
**Tamanho máximo:** 60 linhas (frontmatter + cabeçalho + tabela).

```markdown
---
schema: roteiro-trimestre
trimestre: T{N}
inicio: AAAA-MM-DD
fim: AAAA-MM-DD
---

# Roteiro T{N}

| S | Aula | Data | Tipo | UCs | Método | Semana |
|---|---|---|---|---|---|---|
| 01 | A26 | 21/05 | Sem1-Qui | UC05·UC03·UC04 | sala-inversa·tipos-compostos | [S01](semanas/semana01.md) |
```

**Campos obrigatórios:**
- `S` — número da semana (01, 02, ...)
- `Aula` — código (A26, A27, ...)
- `Data` — DD/MM
- `Tipo` — Sem1-Qui | Sem1-Sex | Sem2-Qui | Sem2-Sex | Reposição
- `UCs` — separadas por `·`, incluindo HA: `UC05·UC03·UC04`
- `Método` — metodologia principal separada por `·` (ver valores abaixo)
- `Semana` — link markdown para o arquivo da semana

**Valores válidos para Método:**
`sala-inversa` | `expositivo` | `live-coding` | `pbl` | `simulacao` | `gamificacao` |
`projeto` | `avaliacao` | `visita-tecnica` | `debate`

---

## Schema 2 — semanas/semana{NN}.md

**Propósito:** plano operacional de uma semana (2 aulas em geral).
**Regra de ouro:** tabela por classe de bloco. Sem prose. Uma linha "Fio condutor".
**Tamanho máximo:** 60 linhas.

```markdown
---
schema: semana
semana: 01
aulas: [A26, A27]
periodo: AAAA-MM-DD / AAAA-MM-DD
---

# Semana 01 — DD–DD/mmm

## Fio condutor
{uma frase: o que conecta as aulas desta semana}

## A26 — DD/MM · Tipo

| # | UC | HA | Método | Tópicos | Ind. |
|---|---|---|---|---|---|
| 1 | UC05 | 1h30 | sala-inversa | {o que alunos fazem} | — |
| 2 | UC05 | 1h30 | live-coding | {tópicos separados por ·} | UC05-1 |

**Prep:** {lista de materiais/arquivos a preparar antes da aula, ou "—"}

## A27 — DD/MM · Tipo

[mesma estrutura]

## Refs
→ [contexto-python](../contextos/contexto-python-para-ia.md) · [metodologias](../metodologias-ativas-senac.md)
```

**Campos obrigatórios por linha de bloco:**
- `#` — número do bloco na aula
- `UC` — código (UC05, UC08...)
- `HA` — duração real (1h, 1h30, 30min)
- `Método` — mesmo vocabulário do Schema 1
- `Tópicos` — lista compacta separada por `·`
- `Ind.` — indicadores ativados ou `—`

**Regras:**
- Bloco de sala-inversa: tópicos descrevem o que o ALUNO faz, não o professor
- Prep é obrigatório (escrever `—` se não houver nada)
- Refs aponta para todos os contextos UC usados na semana

---

## Schema 3 — contextos/contexto-{uc}.md

**Propósito:** histórico vivo por UC. Única fonte de verdade sobre o que foi dado.
**Regra de ouro:** seções de histórico são APPEND-ONLY. Nunca editar linha existente.
**Tamanho máximo:** 120 linhas. Se ultrapassar, comprimir seção "Aulas Realizadas" em bloco `<details>`.

**Seções e mutabilidade:**

| Seção | Mutabilidade | Quem edita |
|---|---|---|
| Estado Geral (tabela HA) | Atualizar HA Dado a cada aula | atualizador-pos-aula |
| Indicadores Curriculares | Atualizar Status T{N} | atualizador-pos-aula |
| Aulas Realizadas | APPEND-ONLY — só adicionar linhas | atualizador-pos-aula |
| Conceitos Consolidados | APPEND-ONLY — só adicionar linhas | atualizador-pos-aula |
| Tópicos Pendentes | Riscar com `~~item~~` quando concluído | atualizador-pos-aula |
| Feedback de Campo | APPEND-ONLY — só adicionar linhas | atualizador-pos-aula |
| Conexões com Outras Disciplinas | Imutável | — |

**Regra de compressão (quando > 120 linhas):**
```markdown
<details>
<summary>Aulas Realizadas — T1 (A01–A22, comprimido)</summary>

| Aula | Data | HA | Tópicos Principais |
...
</details>
```

---

## Schema 4 — ATIVIDADES_AVALIATIVAS.md

**Propósito:** fonte de verdade de todas as avaliações do trimestre.
**Regra de ouro:** uma linha por avaliação. Status nunca retroativo.

```markdown
---
schema: avaliacoes
trimestre: T{N}
---

# Atividades Avaliativas T{N}

| Av. | Data | UCs | Título | Método | Status |
|---|---|---|---|---|---|
| Av01 | 27/03 | UC02·UC04 | Glossário IA em Inglês | individual | ✅ Concluída |
| Av02 | 30/04 | UC07 | Limber | projeto-equipe | ⏳ Pendente |
```

**Valores válidos para Status:**
`✅ Concluída` | `⏳ Pendente` | `🔄 Em andamento` | `❌ Cancelada`

---

## Convenções de Linkagem entre Arquivos

```
→ link interno entre arquivos do mesmo repositório
↑ link para arquivo pai (camada acima)
↓ link para arquivo filho (camada abaixo)
```

Exemplo no rodapé de semana01.md:
```
↑ [roteiro-t2](../roteiro-t2.md)
→ [contexto-python](../contextos/contexto-python-para-ia.md)
→ [metodologias](../metodologias-ativas-senac.md)
```
