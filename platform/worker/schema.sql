-- D1 Schema — LMS Senac Técnico em IA
-- Rode com: wrangler d1 execute lms-progress --file=worker/schema.sql

CREATE TABLE IF NOT EXISTS users (
  id         TEXT PRIMARY KEY,       -- Google OAuth sub (estável)
  nome       TEXT,
  email      TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

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

CREATE TABLE IF NOT EXISTS entregas (
  user_id        TEXT    NOT NULL,
  avaliacao_slug TEXT    NOT NULL,
  link           TEXT    NOT NULL,
  updated_at     INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (user_id, avaliacao_slug)
);

CREATE INDEX IF NOT EXISTS idx_progress_user   ON progress  (user_id);
CREATE INDEX IF NOT EXISTS idx_respostas_aula  ON respostas (aula_slug);
CREATE INDEX IF NOT EXISTS idx_entregas_av     ON entregas  (avaliacao_slug);

CREATE TABLE IF NOT EXISTS site_config (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL DEFAULT '',
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Mensagem inicial (vazia)
INSERT OR IGNORE INTO site_config (key, value) VALUES ('professor_message', '');
