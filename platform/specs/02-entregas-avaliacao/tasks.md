# Tasks: Entregas de avaliação

Ordem: shared → API → Vue → test → QA. Depende da sprint 01 shipped (JWT de aluno com `exp`). Leovio delega uma por vez.

- [x] **T1 [shared]** adicionar `isValidEntregaUrl(s)` a `platform/shared/pure.ts` (`true` ⇔ URL com protocolo `http`/`https`). — @platform-api-worker — checkpoint: importável por worker e portal.
- [x] **T2 [api]** `handleGetEntregas` + rota `GET /api/entregas` (JWT aluno) → `{ [avaliacaoSlug]: {link, updatedAt} }` só do caller; refatorar `handleCreateEntrega` pra validar com `isValidEntregaUrl`. — @platform-api-worker — depende de: T1 — checkpoint: GET autenticado devolve o mapa; sem JWT ⇒ 401.
- [x] **T3 [vue]** `AvaliacaoView`: no mount (se `isLoggedIn`) `GET /api/entregas` → mapa; se existe a do `:id`, pré-preenche + "Enviado em `<data>`" + botão "Atualizar"; estados carregando/vazio/existe/enviando/ok/erro/deslogado; validar com `isValidEntregaUrl` antes do POST; no sucesso atualiza `updatedAt` local. — @platform-componentes-vue — depende de: T2 — checkpoint: reabrir avaliação mostra o link já enviado.
- [x] **T4 [test]** property test `isValidEntregaUrl` (aceita/rejeita = worker, por ser a mesma função) + formatação de data estável (sem off-by-one de fuso). — @platform-componentes-vue — depende de: T1.
- [x] **T5 [qa]** `npm run build` + `npm run test` + revisão. Idempotência do upsert: teste de exemplo contra D1 local (fora do harness de unidade). — @platform-qa — depende de: T3, T4.
