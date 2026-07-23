# Tasks: Login real do aluno

Ordem: infra → shared/API → Vue → test → QA. Especialista entre colchetes. Leovio delega uma por vez; marca `[x]` só com QA-verde + checkpoint.

- [x] **T1 [infra]** vitest + fast-check no portal: devDeps, `vitest.config.ts`, alias `@shared → platform/shared` no `vite.config.ts` **e** no vitest, script `"test": "vitest run"`. — @platform-componentes-vue — checkpoint: `npm run test` roda (0 testes ok) e `npm run build` não quebra.
- [x] **T2 [shared+api]** criar `platform/shared/pure.ts` (zero deps) com `isAllowedStudentEmail(email, domains)`, `b64url`/`decodeB64url`, `toHex`/`fromHex`, `decodeJwtPayload`, `isTokenExpired`; refatorar `worker/src/index.ts` pra importar desses (comportamento idêntico). — @platform-api-worker — depende de: T1 — checkpoint: bundle wrangler ok, nenhuma mudança de resposta observável.
- [x] **T3 [vue]** `useProgress`: remover `getUserId`/`USER_ID_KEY`. `useStudentAuth`: usar `decodeJwtPayload`/`isTokenExpired` de `@shared`, expor `isLoggedIn`, `user=null` se expirado. `useSyncProgress`: guard por `isLoggedIn`. `AppSidebar`: reagir a `isLoggedIn`. — @platform-componentes-vue — depende de: T2 — checkpoint: `grep lms_user_id src` vazio; token expirado ⇒ UI mostra "Entrar".
- [x] **T4 [test]** property tests (fast-check): `decodeJwtPayload` (roundtrip + malformado⇒null), `isTokenExpired` (monotônico), `isAllowedStudentEmail` (sufixo de domínio, case-insensitive, vazio⇒false), `b64url`/`hex` (roundtrip). — @platform-componentes-vue — depende de: T2 — critério: verde com ≥1000 casos por propriedade.
- [x] **T5 [qa]** `npm run build` (vue-tsc) + `npm run test` + revisão de convenções. — @platform-qa — depende de: T3, T4.
- [ ] **T6 [manual · professor]** login E2E real de um aluno `@aluno.pr.senac.br` (depende de secret Google — só o professor). Fora do CI. — checkpoint humano.
