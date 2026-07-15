-- D1 Schema — LMS Senac Técnico em IA
-- Rode com: wrangler d1 execute lms-progress --file=worker/schema.sql

CREATE TABLE IF NOT EXISTS users (
  id         TEXT PRIMARY KEY,       -- claim "sub" da conta Google do aluno (login OAuth)
  nome       TEXT,
  email      TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users (email);

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
