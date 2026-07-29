-- D1 Schema — LMS Senac Técnico em IA
-- Rode com: wrangler d1 execute lms-progress --file=worker/schema.sql
--
-- ATENÇÃO produção (users já existe sem turma_id): rode o ALTER TABLE
-- documentado abaixo (perto de `users`, linha ~15) ANTES de aplicar este
-- arquivo, senão `CREATE INDEX idx_users_turma` falha com
-- "no such column: turma_id" e NENHUMA tabela nova deste arquivo é criada
-- (schema.sql inteiro aborta na primeira falha — turmas, ucs, indicadores,
-- avaliacoes, avaliacao_indicadores, avaliacoes_turma e notas incluídos).

-- NOTA (sprint 03, avaliações por indicador): `users` já existe em produção
-- desde a sprint 01 (login de aluno), então `CREATE TABLE IF NOT EXISTS` abaixo
-- NÃO adiciona a coluna `turma_id` a essa tabela em produção — SQLite/D1 não
-- adiciona coluna a tabela já existente via CREATE TABLE. A coluna precisa ser
-- adicionada uma vez, manualmente, com ALTER TABLE, FORA deste arquivo
-- idempotente (rodar de novo dá erro "duplicate column name" — esperado):
--
--   ALTER TABLE users ADD COLUMN turma_id TEXT REFERENCES turmas(id);
--
-- Deploy do zero (D1 novo, sem `users` ainda) já cria a tabela com a coluna
-- direto no CREATE TABLE abaixo, sem precisar do ALTER TABLE.
CREATE TABLE IF NOT EXISTS users (
  id         TEXT PRIMARY KEY,       -- claim "sub" da conta Google do aluno (login OAuth)
  nome       TEXT,
  email      TEXT,
  turma_id   TEXT,                   -- turmas.id; nullable — ver contextos/turmas.md e plan.md (fallback de atribuição automática)
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (turma_id) REFERENCES turmas(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_turma ON users (turma_id);

CREATE TABLE IF NOT EXISTS progress (
  user_id    TEXT    NOT NULL,
  aula_slug  TEXT    NOT NULL,
  progresso  REAL    NOT NULL DEFAULT 0,  -- 0.0 a 1.0
  updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (user_id, aula_slug)
);

CREATE TABLE IF NOT EXISTS respostas (
  user_id    TEXT    NOT NULL,
  aula_slug  TEXT    NOT NULL,
  questao_id TEXT    NOT NULL,
  resposta   TEXT    NOT NULL,
  updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (user_id, aula_slug, questao_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user   ON progress (user_id);
CREATE INDEX IF NOT EXISTS idx_respostas_aula  ON respostas (aula_slug);

CREATE TABLE IF NOT EXISTS site_config (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL DEFAULT '',
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Mensagem inicial (vazia)
INSERT OR IGNORE INTO site_config (key, value) VALUES ('professor_message', '');

-- ---------------------------------------------------------------------------
-- Admin: login com senha (hash) e/ou Google OAuth + reset de senha por email
-- Substitui os secrets estaticos ADMIN_USERNAME/ADMIN_PASSWORD.
-- Bootstrap inicial: platform/scripts/create-admin.mjs
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS admin_users (
  id            TEXT PRIMARY KEY,
  username      TEXT NOT NULL UNIQUE,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT,              -- formato: pbkdf2$<iteracoes>$<saltHex>$<hashHex>; NULL se só Google
  google_sub    TEXT UNIQUE,       -- claim "sub" do Google, preenchido no primeiro login OAuth
  created_at    INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  token_hash    TEXT PRIMARY KEY,  -- SHA-256 hex do token; o token em claro só existe no link do email
  admin_user_id TEXT NOT NULL,
  expires_at    INTEGER NOT NULL,
  used          INTEGER NOT NULL DEFAULT 0,
  created_at    INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (admin_user_id) REFERENCES admin_users(id)
);

CREATE INDEX IF NOT EXISTS idx_reset_tokens_user ON password_reset_tokens (admin_user_id);

-- Log de envios de email de reset de senha, para rate limiting em
-- POST /api/auth/forgot-password. Cada linha e uma tentativa de envio; nunca
-- e atualizada depois de criada (so leitura por email, mais recente primeiro).
CREATE TABLE IF NOT EXISTS password_reset_attempts (
  id         TEXT PRIMARY KEY,  -- UUID gerado na aplicacao
  email      TEXT NOT NULL,
  sent_at    INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_password_reset_attempts_email ON password_reset_attempts (email, sent_at);

-- ---------------------------------------------------------------------------
-- Calendário condensado: dias de aula (alimentados por AULAS-DADAS.md +
-- rotação planejada + import manual de dados do OrionWeb) e os blocos por UC
-- dentro de cada dia. Renderizado em /calendario (público) e importado via
-- /admin/calendario.
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS calendar_days (
  id         TEXT PRIMARY KEY,      -- numero da aula ('A42') ou id sintetico p/ feriado/recesso
  numero     TEXT,                  -- 'A42' — NULL em feriado/recesso sem numero de aula
  data       TEXT NOT NULL,         -- 'YYYY-MM-DD'
  tipo       TEXT NOT NULL DEFAULT 'aula', -- aula | reposicao | feriado | recesso
  status     TEXT NOT NULL DEFAULT 'planejada', -- planejada | dada
  observacao TEXT,
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_calendar_days_data ON calendar_days (data);

CREATE TABLE IF NOT EXISTS calendar_blocos (
  id              TEXT PRIMARY KEY,  -- `${calendar_day_id}-${uc}`
  calendar_day_id TEXT NOT NULL,
  uc              TEXT NOT NULL,     -- 'UC05'
  disciplina      TEXT,
  conteudo        TEXT,
  ha              REAL,
  ordem           INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (calendar_day_id) REFERENCES calendar_days(id)
);

CREATE INDEX IF NOT EXISTS idx_calendar_blocos_day ON calendar_blocos (calendar_day_id);

-- ---------------------------------------------------------------------------
-- Entregas: link enviado pelo aluno como resposta de uma avaliacao. Um aluno
-- so tem uma entrega ativa por avaliacao — reenviar substitui (upsert na PK).
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS entregas (
  user_id        TEXT    NOT NULL,  -- referencia users.id (sub da conta Google)
  avaliacao_slug TEXT    NOT NULL,
  link           TEXT    NOT NULL,
  updated_at     INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (user_id, avaliacao_slug),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_entregas_avaliacao ON entregas (avaliacao_slug);

-- ---------------------------------------------------------------------------
-- Avaliações por trimestre e indicador (sprint 03): turmas, mapa curricular
-- (ucs/indicadores), avaliações como template de currículo + instância por
-- turma (avaliacoes_turma), e o lançamento de nota Senac (A/PA/NA) por
-- aluno x avaliação x indicador. D1 é a verdade em runtime, semeada a partir
-- de contextos/turmas.md + contextos/conteudo-base/ucs-elementos-da-competencia.md
-- + distribuicao-trimestral-ano1.md + os meta.yaml de cada avaliação (seed
-- upsert-only, nunca deleta — ver nota em `notas` abaixo).
-- ---------------------------------------------------------------------------

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

CREATE INDEX IF NOT EXISTS idx_indicadores_uc ON indicadores (uc);

-- avaliacoes é TEMPLATE de currículo, compartilhado por qualquer turma que chegue
-- naquele ponto do curso. Por isso NÃO tem ano nem turma, e NÃO tem prazo —
-- prazo/status de aplicação mudam por turma e ficam em avaliacoes_turma (D8).
CREATE TABLE IF NOT EXISTS avaliacoes (
  slug        TEXT PRIMARY KEY,         -- 'av07' — nunca colide entre turmas: é conteúdo, não instância
  titulo      TEXT NOT NULL,
  tipo        TEXT,
  trimestre   TEXT NOT NULL,            -- 'T1' | 'T2' | 'T3'
  status      TEXT NOT NULL,            -- status do CONTEÚDO: em-planejamento | draft | published | concluida
  updated_at  INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS avaliacao_indicadores (
  avaliacao_slug   TEXT NOT NULL,
  indicador_codigo TEXT NOT NULL,
  PRIMARY KEY (avaliacao_slug, indicador_codigo),
  FOREIGN KEY (avaliacao_slug)   REFERENCES avaliacoes(slug),
  FOREIGN KEY (indicador_codigo) REFERENCES indicadores(codigo)
);

CREATE INDEX IF NOT EXISTS idx_av_ind_indicador ON avaliacao_indicadores (indicador_codigo);

-- avaliacoes_turma é a INSTÂNCIA: o que muda quando a mesma avaliação é aplicada
-- por turmas diferentes (datas, status de aplicação). Populada pelo seed (broadcast
-- do prazo do meta.yaml pra toda turma status='ativa' — ver plan.md, Ripple effects).
CREATE TABLE IF NOT EXISTS avaliacoes_turma (
  turma_id       TEXT NOT NULL,
  avaliacao_slug TEXT NOT NULL,
  prazo          TEXT,
  prazo_label    TEXT,
  status         TEXT NOT NULL,          -- espelha avaliacoes.status (broadcast do seed): em-planejamento | draft | published | concluida
  updated_at     INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (turma_id, avaliacao_slug),
  FOREIGN KEY (turma_id)       REFERENCES turmas(id),
  FOREIGN KEY (avaliacao_slug) REFERENCES avaliacoes(slug)
);

CREATE INDEX IF NOT EXISTS idx_av_turma_slug ON avaliacoes_turma (avaliacao_slug);

-- notas guarda o veredito Senac (A atendido, PA parcialmente atendido, NA não
-- atendido) por aluno x avaliação x indicador. Ausência de linha = "não
-- avaliado", distinto de valor='NA' (RF12) — nunca inserir uma linha só pra
-- marcar "ainda não olhei".
--
-- A FK abaixo é só pra users(id) — de propósito NÃO referencia avaliacoes(slug)
-- nem indicadores(codigo). "Seed nunca deleta" é invariante load-bearing deste
-- projeto (dec-seed-fonte-unica): o seed é upsert-only e nunca remove avaliação
-- ou indicador, então essa FK nunca teria o que proteger na prática. O preço
-- aceito: se um dia o seed passar a deletar, sobram notas órfãs em silêncio
-- (achado 🟡 do analyze.md desta sprint) — aceito conscientemente, mantendo o
-- seed sempre upsert-only.
CREATE TABLE IF NOT EXISTS notas (
  user_id          TEXT NOT NULL,
  avaliacao_slug   TEXT NOT NULL,
  indicador_codigo TEXT NOT NULL,
  valor            TEXT NOT NULL CHECK (valor IN ('A','PA','NA')),
  updated_at       INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (user_id, avaliacao_slug, indicador_codigo),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_notas_avaliacao ON notas (avaliacao_slug);
