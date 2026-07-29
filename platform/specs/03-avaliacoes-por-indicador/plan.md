# Plan: Avaliações por trimestre e indicador

> Revisão 2026-07-28: reaberto depois do Analyze pra incorporar a dimensão **turma**, decidida pelo professor (ver [[dec-turma-dimensao]]). Turmas coexistem sobrepostas — turma nova entra no Ano1 enquanto a anterior já está no Ano2/Ano3 — e cada UC pertence a exatamente um ano do curso (grade fixa). Isso não é mais uma questão aberta: é modelo confirmado, detalhado abaixo.

## Camadas afetadas
- [x] Build/dados — `parseYaml` conserta lista; 6 `meta.yaml` ganham `trimestre` + `indicadores`
- [x] Schema D1 — **7 tabelas novas** (`turmas`, `ucs`, `indicadores`, `avaliacoes`, `avaliacao_indicadores`, `avaliacoes_turma`, `notas`) + `users` ganha `turma_id`
- [x] Seed — `seed-indicadores.mjs` (markdown + yaml → JSON de import), estendido pra semear `turmas` e `avaliacoes_turma`
- [x] API Worker — 1 rota pública + 7 rotas admin (turmas e ucs novas; painel/grade/boletim ganham parâmetro de turma)
- [x] Componentes Vue — 1 view de aluno refatorada + 3 views de professor + seletor de turma
- [x] Shared — `consolidarNota`, `parseIndicadorCodigo`, `toCsvRow`
- [x] Script — `dump-indicadores.mjs` (D1 → markdown de cobertura)

## Schema

```sql
CREATE TABLE IF NOT EXISTS turmas (
  id           TEXT PRIMARY KEY,        -- '2026A' — livre, escolhido na autoria (não deriva de ano civil sozinho)
  ano_ingresso INTEGER NOT NULL,        -- 2026
  status       TEXT NOT NULL DEFAULT 'ativa',  -- 'ativa' | 'concluida'
  updated_at   INTEGER NOT NULL DEFAULT (unixepoch())
);

-- ucs é conhecimento curricular invariável (nome, ano_curso, conhecimentos,
-- habilidades) — mesmo princípio de dec-seed-fonte-unica. conhecimentos/habilidades
-- não têm vínculo 1:1 com indicador na fonte oficial, só com a UC inteira (D9).
CREATE TABLE IF NOT EXISTS ucs (
  codigo        TEXT PRIMARY KEY,       -- 'UC05'
  nome          TEXT NOT NULL,          -- 'Desenvolvimento de linguagem de programação Python'
  ano_curso     INTEGER NOT NULL CHECK (ano_curso IN (1,2,3)),
  conhecimentos TEXT NOT NULL,          -- lista em texto (bullets \n-separados), somente leitura
  habilidades   TEXT NOT NULL,
  updated_at    INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS indicadores (
  codigo     TEXT PRIMARY KEY,          -- 'UC05.2'
  uc         TEXT    NOT NULL,          -- 'UC05'
  numero     INTEGER NOT NULL,
  descricao  TEXT    NOT NULL,
  trimestres TEXT    NOT NULL,          -- CSV 'T1,T2' — em quais é trabalhado (plano oficial, não cobertura real)
  updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (uc) REFERENCES ucs(codigo)
);

CREATE INDEX IF NOT EXISTS idx_indicadores_uc ON indicadores(uc);

-- avaliacoes é TEMPLATE de currículo, compartilhado por qualquer turma que chegue
-- naquele ponto do curso. Por isso NÃO tem ano nem turma, e NÃO tem mais prazo —
-- prazo/status de aplicação mudam por turma e foram pra avaliacoes_turma.
CREATE TABLE IF NOT EXISTS avaliacoes (
  slug        TEXT PRIMARY KEY,         -- 'av07' — nunca colide entre turmas: é conteúdo, não instância
  titulo      TEXT NOT NULL,
  tipo        TEXT,
  trimestre   TEXT NOT NULL,            -- 'T1' | 'T2' | 'T3'
  status      TEXT NOT NULL,            -- status do CONTEÚDO: em-planejamento | draft | published
  updated_at  INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS avaliacao_indicadores (
  avaliacao_slug   TEXT NOT NULL,
  indicador_codigo TEXT NOT NULL,
  PRIMARY KEY (avaliacao_slug, indicador_codigo),
  FOREIGN KEY (avaliacao_slug)   REFERENCES avaliacoes(slug),
  FOREIGN KEY (indicador_codigo) REFERENCES indicadores(codigo)
);

-- avaliacoes_turma é a INSTÂNCIA: o que muda quando a mesma avaliação é aplicada
-- por turmas diferentes (datas, status de aplicação). Populada pelo seed (broadcast
-- do prazo do meta.yaml pra toda turma status='ativa' — ver Ripple effects).
CREATE TABLE IF NOT EXISTS avaliacoes_turma (
  turma_id       TEXT NOT NULL,
  avaliacao_slug TEXT NOT NULL,
  prazo          TEXT,
  prazo_label    TEXT,
  status         TEXT NOT NULL,
  updated_at     INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (turma_id, avaliacao_slug),
  FOREIGN KEY (turma_id)       REFERENCES turmas(id),
  FOREIGN KEY (avaliacao_slug) REFERENCES avaliacoes(slug)
);

CREATE INDEX IF NOT EXISTS idx_av_turma_slug ON avaliacoes_turma(avaliacao_slug);

-- notas NÃO muda de PK. user_id já resolve a ambiguidade entre turmas: cada aluno
-- pertence a uma única turma, então duas turmas com "av01" nunca colidem aqui.
CREATE TABLE IF NOT EXISTS notas (
  user_id          TEXT NOT NULL,
  avaliacao_slug   TEXT NOT NULL,
  indicador_codigo TEXT NOT NULL,
  valor            TEXT NOT NULL CHECK (valor IN ('A','PA','NA')),
  updated_at       INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (user_id, avaliacao_slug, indicador_codigo),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_notas_avaliacao ON notas(avaliacao_slug);
CREATE INDEX IF NOT EXISTS idx_av_ind_indicador ON avaliacao_indicadores(indicador_codigo);
```

`trimestres` como CSV (não tabela de junção) porque é lista curta, fechada e só filtrada por `LIKE '%T2%'` — junção aqui seria cerimônia sem ganho. `ano_curso` saiu de `indicadores` pra `ucs` (D9): é uma propriedade da UC, não do indicador, e repeti-la em cada indicador era duplicação sem ganho. **Ausência de linha em `notas` = não avaliado**, distinto de `valor='NA'` (RF12).

### De onde vêm `ucs`, `indicadores.trimestres` e `turmas` (autoria em git, D1 é runtime — mesmo princípio de [[dec-seed-fonte-unica]])

- **`turmas`**: novo arquivo `contextos/turmas.md` (tabela simples `id | ano_ingresso | status`), autoria do professor. Hoje só precisa de uma linha (`2026A`). O seed faz upsert, nunca deleta.
- **`ucs` + `indicadores` (código, descrição, uc, conhecimentos, habilidades, ano_curso)**: `contextos/conteudo-base/ucs-elementos-da-competencia.md` — fonte oficial (Plano de Curso Senac), mais completa que `contextos/indicadores.md` (que segue existindo, mas só como tracker de cobertura real, fora do seed). Hoje só a seção do Ano 1 existe (9 UCs, `## UC0X` com `**Carga horária:**`, `**Indicadores**`, `**Conhecimentos**`, `**Habilidades**`); quando Ano 2/3 ganharem código oficial de UC, o parser passa a ler `ucs-elementos-da-competencia-ano2.md`/`-ano3.md` também — hoje eles não têm código de UC atribuído (gap conhecido, fora do vault), então ficam de fora do seed por enquanto.
- **`indicadores.trimestres`**: `contextos/conteudo-base/distribuicao-trimestral-ano1.md` — plano oficial por trimestre, não o tracker de cobertura (`contextos/indicadores.md`). Só existe para o Ano 1; indicadores de UCs sem distribuição oficial (Ano 2/3, quando entrarem) ficam com `trimestres = ''` até existir a fonte — o seed não inventa.

### Como um aluno vira ligado a uma turma (ripple da sprint 01, não desta)

`turma_id` em `users` é **nullable** porque o login automático (`POST /api/auth/student/google/callback`) não tem hoje nenhum sinal de qual turma o aluno é. Nesta sprint: se existir **exatamente uma** turma com `status='ativa'`, o upsert do login atribui essa turma automaticamente (é o caso de hoje — só existe `2026A`). Se houver mais de uma turma ativa, `turma_id` fica `NULL` e a atribuição manual pelo professor fica **fora de escopo** desta sprint (ver Riscos aceitos no spec.md) — vira necessidade real só quando a segunda turma entrar.

### ⚠️ Primeira quebra real da promessa "schema.sql sempre idempotente"

`users` já existe em produção (sprint 01 shipped) sem `turma_id`. `CREATE TABLE IF NOT EXISTS users (...)` em `schema.sql` **não** vai adicionar a coluna a uma tabela que já existe — isso é `ALTER TABLE users ADD COLUMN turma_id TEXT REFERENCES turmas(id)`, que não é idempotente (SQLite falha com "duplicate column name" se rodado de novo). Isso é diferente de tudo que a constituição §5 cobre até aqui (só falava de `CREATE TABLE IF NOT EXISTS`).

**Encaminhamento pro Implement, não resolvido aqui:** o `ALTER TABLE` roda **uma vez, manualmente**, fora do bloco idempotente de `schema.sql` (ex.: `wrangler d1 execute <db> --command "ALTER TABLE users ADD COLUMN turma_id TEXT REFERENCES turmas(id)"` — comando pronto pro professor rodar, igual a qualquer outro passo de produção). Depois disso, `schema.sql` passa a incluir a coluna só como comentário/documentação (a tabela já existe com ela) e o `CREATE INDEX IF NOT EXISTS idx_users_turma` continua idempotente normalmente. `@platform-schema-d1` decide o texto exato do comando durante o Implement; aqui só fica registrado que esse passo existe e por quê.

## Contratos de API

| Rota | Método | Auth | Retorno |
|---|---|---|---|
| `/api/avaliacoes` | GET | pública, JWT de aluno **opcional** | `[{slug, titulo, tipo, trimestre, prazoLabel, status, indicadores:[{codigo, uc, descricao}]}]` — `prazoLabel`/`status` resolvidos via `avaliacoes_turma` pela turma do JWT (`payload.sub` → `users.turma_id`); sem JWT ou `turma_id` nulo, cai no fallback abaixo |
| `/api/admin/turmas` | GET | JWT admin | `[{id, anoIngresso, status}]` — lista pro seletor de turma nas 3 telas de professor |
| `/api/admin/ucs` | GET | JWT admin | `[{codigo, nome, anoCurso, conhecimentos, habilidades}]` — referência estática (todas as UCs), buscada uma vez e usada localmente pra resolver o contexto de qualquer indicador (RF19), sem inflar o payload de painel/grade |
| `/api/admin/seed` | POST | JWT admin | upsert em lote de indicadores + avaliações + vínculos + **turmas + avaliacoes_turma**; **não toca `notas`** nem `users.turma_id` |
| `/api/admin/painel?trimestre=T2&turma=2026A` | GET | JWT admin | `[{codigo, uc, descricao, avaliacoes:[{slug,titulo}], totalAlunos, corrigidos}]` — todos do trimestre (por `ano_curso`, não por turma), `totalAlunos`/`corrigidos` filtrados pela turma |
| `/api/admin/grade/:slug?turma=2026A` | GET | JWT admin | `{avaliacao, avaliacaoTurma:{prazo,prazoLabel,status}, indicadores:[...], alunos:[{id, nome, email, entregou, notas:{[codigo]: 'A'\|'PA'\|'NA'}}]}` — `alunos` filtrado por `users.turma_id = turma` |
| `/api/admin/notas` | PUT | JWT admin | batch: `{notas:[{userId, avaliacaoSlug, indicadorCodigo, valor}]}` → upsert; `valor: null` apaga a linha (volta a "não avaliado"); sem mudança — `userId` já implica a turma |
| `/api/admin/boletim?trimestre=T2&turma=2026A` | GET | JWT admin | `{indicadores:[...], alunos:[{id, nome, email, consolidado:{[codigo]: 'A'\|'PA'\|'NA'}}]}` — `alunos` restrito à turma |

**Parâmetro `turma` é opcional com fallback, não obrigatório:** se omitido e existir **exatamente uma** turma `status='ativa'`, o worker usa essa (mantém a UX de hoje, onde só existe `2026A`, sem forçar o professor a escolher toda vez). Se omitido e houver mais de uma ativa, responde `400` pedindo `turma` explícito — nunca mistura alunos de turmas diferentes silenciosamente.

**Fallback de `/api/avaliacoes` sem turma resolvida:** visitante anônimo ou aluno sem `turma_id` ainda vê a lista (RF6 continua valendo — não é bloqueado por auth), mas `prazoLabel`/`status` vêm da turma `status='ativa'` mais recente por `ano_ingresso` (mesma regra de fallback acima) em vez de nulos — visualmente correto no caso comum de hoje (uma turma só), degrada de forma sensata quando isso deixar de ser verdade.

O CSV **não** é rota — o client gera a partir do boletim com `toCsvRow`. Uma rota a menos e o escape vira função pura testável.

## Frontend

**Aluno** — `AvaliacoesView.vue` passa a buscar `GET /api/avaliacoes` (era `/avaliacoes.json` estático), agrupa por trimestre e renderiza indicador + UC por avaliação. Ganha loading/erro/vazio (constituição §8). `AvaliacaoView.vue` segue lendo `content.md` estático.

**Professor** — 3 views novas sob `/admin`, todas ganham um seletor de turma:
- `AdminPainelView.vue` (`/admin/avaliacoes`) — seletor de trimestre **+ seletor de turma** (via `GET /api/admin/turmas`; escondido/fixo quando só existe uma), lista por indicador, destaque nos "sem avaliação". Cada indicador é expansível (RF19): busca `GET /api/admin/ucs` uma vez (cache local), resolve por `indicador.uc`, mostra conhecimentos/habilidades da UC.
- `AdminGradeView.vue` (`/admin/avaliacoes/:slug`) — a grade, agora recebendo `turma` (query param ou selecionada). Estado local sujo + botão salvar explícito (não autosave por célula: 90 PUTs em sequência é frágil e sem undo). Teclado: `A`/`P`/`N` marca e desce, setas navegam, `Backspace` limpa a célula. Cabeçalho de cada coluna-indicador expansível, mesmo mecanismo de `GET /api/admin/ucs` do painel.
- `AdminBoletimView.vue` (`/admin/boletim`) — matriz consolidada + botão de export CSV, também por turma.

Componente novo pequeno e reaproveitado nas 3 telas: `SeletorTurma.vue` (props: lista de turmas, v-model da turma selecionada; unstyled quando `length === 1`).

## Estratégia de teste (fast-check)
- `consolidarNota`: ordem-invariância, idempotência, `[] ⇒ null`, e que o resultado é sempre o máximo da ordem `A > PA > NA`.
- `parseIndicadorCodigo` ⇄ `formatIndicadorCodigo`: roundtrip; entrada malformada devolve `null` sem lançar.
- `toCsvRow`: qualquer campo com vírgula/aspas/newline sobrevive ao roundtrip sem mudar contagem de colunas.
- `parseUcsMd`: exemplo contra `ucs-elementos-da-competencia.md` real — 9 UCs, todas com `ano_curso = 1`, `conhecimentos`/`habilidades` não vazios.
- `parseIndicadoresMd` + `parseTrimestresMd`: exemplo contra `ucs-elementos-da-competencia.md` + `distribuicao-trimestral-ano1.md` reais — 55 indicadores, UC01.3 sai com `trimestres = 'T1,T2,T3'`, todo `indicador.uc` resolve numa `ucs.codigo` existente.
- `parseTurmasMd`: exemplo contra `contextos/turmas.md` — pelo menos a turma `2026A` com `status='ativa'`.
- Idempotência do seed: exemplo contra D1 local — rodar 2× e conferir que `notas` continua intacta (CA5), incluindo `turmas`/`avaliacoes_turma` no mesmo teste.

## Dependência
Depende de [[login-aluno]] e [[entregas]] (shipped) — a grade cruza `users` e `entregas`. Sem dependência aberta.
