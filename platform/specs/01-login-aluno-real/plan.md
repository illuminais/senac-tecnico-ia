# Plan: Login real do aluno (Google OAuth) testável

## Camadas afetadas
- [ ] Schema D1 — **nenhuma mudança** (`users`/`progress` já existem)
- [x] API Worker — só **refactor** (extrair puros pra módulo compartilhado), sem rota nova
- [x] Componentes Vue — limpeza de identidade + checagem de `exp`
- [x] Infra de teste — vitest + fast-check (primeira sprint a introduzir)

## Schema
Sem alteração. `users.id` = `sub` do Google já é a identidade canônica.

## Contratos de API
Nenhuma rota nova. O fluxo `/api/auth/student/google/callback` já está maduro (verificado no worker). Refactor sem mudança de comportamento: extrair `isAllowedStudentEmail`, `b64url`/`decodeB64url`, `toHex`/`fromHex` para `platform/shared/pure.ts` (zero deps de runtime Cloudflare), importado pelo Worker.

## Frontend
- `useProgress.ts`: **remover** `getUserId()` + `USER_ID_KEY` (código morto, zero callers). Progresso local segue keyed por `aulaId`, sem identidade.
- `useStudentAuth.ts`: adicionar helper puro `isTokenExpired(payload)`; `user` computed retorna `null` se expirado; expor `isLoggedIn = !!token && !expired`. `decodeJwtPayload` movido pra `shared/pure.ts`.
- `useSyncProgress.ts`: trocar o guard `if (!token.value)` por `isLoggedIn` — não mandar sync com token morto.
- `AppSidebar.vue`: já exibe user/logout; garantir que reage a `isLoggedIn` (token expirado → mostra "Entrar").

## Módulo compartilhado (decisão do Plan — confirmar)
`platform/shared/pure.ts` — lógica pura sem deps, **fonte única** importada por: Worker (`index.ts`), client do portal, e testes vitest. Resolve o "consistente byte a byte" do worker e client. Wiring: alias `@shared` no `vite.config.ts` + `vitest.config.ts`; Worker importa por path relativo. (Alternativa descartada: portal importar de `worker/src` — acopla camadas.)

## Estratégia de teste (fast-check)
Property tests (portal, vitest):
- `decodeJwtPayload`: roundtrip (encode→decode = payload) + token malformado ⇒ `null` (nunca lança).
- `isTokenExpired`: monotônico em `exp`; `exp` no passado ⇒ expirado.
- `isAllowedStudentEmail(email, domains)`: `true` sse algum domínio é sufixo `@dominio` (case-insensitive); lista vazia ⇒ `false`.
- `b64url`/`decodeB64url` e `toHex`/`fromHex`: roundtrip pra qualquer `Uint8Array`.

Verificação **manual** (depende de secret Google — só o professor): login E2E real de um aluno `@aluno.pr.senac.br`. Documentado como checkpoint manual, fora do CI.

## Nota de realidade
`useProgress` hoje **não é importado por nenhuma view** — o tracking de progresso ainda não está plugado. Logo RF4 ("preservar progresso anônimo ao logar") é garantia futura, não há dado a migrar agora. O valor real desta sprint: matar o UUID órfão, blindar `exp`, extrair os puros e deixar o login testável.
