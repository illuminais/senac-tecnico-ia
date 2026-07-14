---
name: platform-schema-d1
description: Convenções do schema Cloudflare D1 da plataforma LMS — naming, upsert, índices, sincronização com types TS. Use ao criar ou alterar tabelas em platform/worker/schema.sql.
---

# Skill: Schema D1 — Plataforma LMS

`platform/worker/schema.sql` é **um único arquivo idempotente**, não há pasta `migrations/`. Toda mudança de schema é uma edição direta nesse arquivo, reaplicada com:

```bash
wrangler d1 execute lms-progress --local --file=worker/schema.sql   # dev local
wrangler d1 execute lms-progress --remote --file=worker/schema.sql  # produção
```

---

## Convenções

- `CREATE TABLE IF NOT EXISTS` sempre — nunca `DROP TABLE` neste arquivo (destrutivo e o arquivo é reaplicado em produção).
- Nomes de tabela e coluna em `snake_case`, em português quando o domínio é do curso (`progresso`, `respostas`) e em inglês quando é infraestrutura genérica (`admin_users`, `password_reset_tokens`).
- `id TEXT PRIMARY KEY` — chave natural estável quando existir (`'A42'`, `'professor_message'`), senão UUID gerado na aplicação (nunca `AUTOINCREMENT`/`INTEGER PRIMARY KEY` — D1 é distribuído, IDs sequenciais client-side evitam coordenação).
- Timestamp: `INTEGER NOT NULL DEFAULT (unixepoch())`, sempre nomeado `created_at`/`updated_at`.
- Chave estrangeira "soft": declare `FOREIGN KEY (x) REFERENCES tabela(y)` para documentação/clareza, mas **SQLite/D1 não garante integridade referencial por padrão** (precisa `PRAGMA foreign_keys = ON`, que este projeto não ativa) — a aplicação é responsável por não deixar órfãos.
- Índice: `CREATE INDEX IF NOT EXISTS idx_<tabela>_<coluna> ON <tabela> (<coluna>)` para toda coluna usada em `WHERE`/`ORDER BY` fora da PK.
- Upsert: `INSERT ... ON CONFLICT (<pk>) DO UPDATE SET col = excluded.col, updated_at = excluded.updated_at` — é o padrão em todo o projeto (nunca `INSERT OR REPLACE`, que apaga e recria a linha inteira perdendo colunas não enviadas).
- Dado semente (seed) vai no fim do arquivo com `INSERT OR IGNORE` (ex.: `site_config.professor_message` vazio) — só para linhas que precisam existir desde o primeiro deploy.

## Ao adicionar/alterar uma tabela

1. Edite `schema.sql` (nunca esqueça `IF NOT EXISTS` e os índices)
2. Espelhe o shape em `platform/portal/src/types/<dominio>.ts` (interface TS) — o portal nunca deve `any` um payload que vem de uma tabela conhecida
3. Se o Worker expõe a tabela via API, documente o endpoint na skill `platform-contexto`
4. Rode `sqlite3 :memory: < platform/worker/schema.sql` localmente para validar sintaxe antes de aplicar contra D1 (pega erro de SQL sem precisar de `wrangler`/rede)

## Relação com os outros agentes

- `@platform-api-worker` consome as tabelas que você desenha — combine nomes de coluna com o que os handlers vão fazer `bind()`.
- `@platform-componentes-vue` consome as interfaces de `types/` — mudança de schema sem atualizar o type TS correspondente é o erro mais comum de dessincronia neste projeto.
