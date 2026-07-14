---
name: platform-api-worker
description: Convenções do Cloudflare Worker da plataforma LMS — roteamento, auth JWT/PBKDF2, padrões de query D1, segurança. Use ao criar ou editar qualquer rota em platform/worker/src/index.ts.
---

# Skill: Convenções da API — Cloudflare Worker

`platform/worker/src/index.ts` é **um único arquivo**, sem framework de roteamento, sem dependências externas (só Web Crypto e `fetch`). Mantenha assim — não introduza Hono/itty-router/etc. sem necessidade concreta (o Worker hoje tem ~15 rotas; não justifica um framework).

---

## Roteamento

Padrão: cadeia de `if (request.method === X && url.pathname === Y) return handleZzz(...)` dentro de `fetch()`. Cada rota tem um handler nomeado `handleXxx` declarado depois do router. Ao adicionar uma rota:

1. Adicione a linha no `export default { async fetch(...) }`
2. Escreva `handleNomeDaRota(request, env)` retornando sempre `Response` via `jsonResponse(...)`
3. Atualize o comentário de rotas no topo do arquivo (a lista `POST /api/...` logo abaixo do `/**`)
4. Atualize a tabela de endpoints na skill `platform-contexto`

## Auth

- **JWT**: HS256 via Web Crypto, implementado à mão (`signJwt`/`verifyJwt`). Não trocar por lib externa — o Worker não tem `package.json`, adicionar dependência quebraria o bundling simples via `wrangler deploy worker/src/index.ts`.
- **Toda rota admin-only** chama `requireAdmin(request, env)` no topo do handler e retorna 401 se `null` ou `role !== 'admin'`. Nunca duplique a extração manual do header `Authorization` — use o helper.
- **Senha**: PBKDF2-HMAC-SHA256, 100.000 iterações, formato armazenado `pbkdf2$<iteracoes>$<saltHex>$<hashHex>` (funções `hashPassword`/`verifyPassword`). Esse formato é lido tanto pelo Worker quanto por `platform/scripts/create-admin.mjs` (Node `crypto.pbkdf2Sync`) — **os dois precisam gerar bytes idênticos**; se mudar iterações/hash/tamanho de um lado, mude nos dois.
- **Comparação de segredos**: sempre `safeEqual()` (tempo constante via HMAC), nunca `===` direto em senha/token.
- **Tokens de reset/convite**: nunca armazenar o token em claro no banco — gerar aleatório (`randomToken()`), guardar só o `sha256Hex()` dele, comparar hash com hash.
- **OAuth (Google)**: login-only — o callback **nunca cria conta nova**, só autentica um email que já existe em `admin_users`. Se for adicionar outro provedor OAuth, mantenha essa regra: o vínculo de identidade externa nunca deve, sozinho, conceder acesso admin a alguém não cadastrado antes.
- **Links de email**: se o Worker monta uma URL a partir de um campo enviado pelo client (ex.: `resetUrlBase`), valide a origem contra um allowlist (`ALLOWED_ORIGINS`) antes de usar — evita o endpoint virar um relay de phishing.

## D1 — padrões de query

```ts
// leitura de uma linha
const row = await env.DB.prepare(`SELECT ... FROM tabela WHERE x = ?`).bind(x).first<TipoRow>()

// leitura de várias
const rows = await env.DB.prepare(`SELECT ... FROM tabela`).all<TipoRow>()
// rows.results ?? [] — sempre trate results como possivelmente undefined

// upsert idiomático deste projeto
await env.DB.prepare(`
  INSERT INTO tabela (id, col, updated_at)
  VALUES (?, ?, unixepoch())
  ON CONFLICT (id) DO UPDATE SET col = excluded.col, updated_at = excluded.updated_at
`).bind(id, col).run()

// múltiplas statements atômicas
await env.DB.batch([stmt1, stmt2, ...])  // executa em ordem, transação implícita
```

- Timestamps são sempre `INTEGER` via `unixepoch()` (SQL), nunca `Date.now()` calculado em JS e passado como bind — deixa o banco ser a fonte da verdade do relógio.
- IDs: `TEXT PRIMARY KEY`. Prefira chave natural quando existir uma óbvia e estável (ex.: `'A42'` para uma aula, `${dia}-${uc}` para um bloco) em vez de UUID — mais legível em debug (`wrangler d1 execute --command "SELECT * FROM ..."`). Use UUID (`crypto.randomUUID()`) só quando não há chave natural.
- `env.DB.batch([...])` roda as statements **na ordem do array** — se um DELETE precisa acontecer antes de um INSERT relacionado, monte o array nessa ordem.

## Respostas e erros

- Sempre retornar via `jsonResponse(data, status)` — nunca `new Response(...)` cru fora dela (perde CORS headers).
- `try { body = await request.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }` — todo handler que lê body faz isso primeiro.
- Status codes usados neste projeto: `400` (payload malformado/faltando campo), `401` (não autenticado / credenciais erradas), `403` (autenticado mas não autorizado — ex. email não cadastrado), `422` (campo com tipo/valor inválido, ex. senha curta demais).
- Nunca vazar se um email/username existe via mensagem de erro diferenciada (`forgot-password` sempre responde `{ok:true}` independente de a conta existir).

## `Env` interface

Todo novo secret/var precisa de uma linha na interface `Env` do topo do arquivo, com comentário dizendo se é `wrangler secret put` (nunca commitado) ou `[vars]` do `wrangler.toml` (público, pode commitar). Mantenha essa interface como a lista canônica — não deixe um `env.ALGO_NOVO` sem entrada lá.
