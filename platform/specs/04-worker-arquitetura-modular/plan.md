# Plan: Arquitetura modular do Worker

## Camadas afetadas
- [x] API Worker — reorganização completa de `platform/worker/src/`
- [x] Scripts — novo `platform/scripts/publish-avaliacao.mjs`
- [x] Specs/constitution — regras já adicionadas (ver `constitution.md` itens 7-9)
- [x] Agentes/skills (`.claude/` e `.github/`) — instruções corrigidas
- [ ] Schema D1 — nenhuma mudança
- [ ] Componentes Vue — nenhuma mudança

## Estrutura de arquivos alvo

```
platform/worker/src/
  index.ts            — dispatcher puro (roteamento), ~100-150 linhas
  types.ts            — Env + todos os payload interfaces (hoje linhas 28-114 de index.ts)
  lib/
    jwt.ts            — importKey, signJwt, verifyJwt (hoje 120-161)
    crypto.ts         — safeEqual, pbkdf2, hashPassword, verifyPassword, sha256Hex, randomToken (hoje 164-220)
    http.ts           — corsHeaders, jsonResponse (hoje 1547-1560)
    email.ts          — sendEmail, sendPasswordResetEmail (hoje 226-237, 494-514)
    auth.ts           — requireAuth, requireAdmin, adminJwt, isAllowedOrigin, isForgotPasswordAllowed (hoje 369-437)
    turma-context.ts  — resolveTurmaParam, ANO_CURSO_ATUAL (hoje 1174-1200)
  routes/
    auth.ts           — handleLogin, handleForgotPassword, handleResetPassword, handleGoogleCallback, handleStudentGoogleCallback (hoje 376-650)
    entregas.ts       — handleCreateEntrega, handleGetEntregas, handleAdminEntregasHistorico (hoje 716-795, 1402-1414)
    message.ts        — handleGetMessage, handlePutMessage (hoje 652-680)
    calendar.ts       — handleGetCalendar, handleImportCalendar, handleGetResumoHa (hoje 797-876)
    seed.ts           — handleAdminSeed (hoje 895-1000) — exceção documentada na constitution §9
    avaliacoes.ts     — handleGetAvaliacoes, handleAvaliacoesNovidade, handleMarcarAvaliacoesVistas, resolveAvaliacoesTurmaId (hoje 1009-1160)
    turmas.ts         — handleGetTurmas (hoje 1202-1216)
    ucs.ts            — handleGetUcs (hoje 1222-1238)
    painel.ts         — handleAdminPainel (hoje 1246-1314)
    notas.ts          — handleAdminNotasUpdate (hoje 1434-1474)
    boletim.ts        — handleAdminBoletim (hoje 1481-1541)
    grade.ts          — handleAdminGrade (hoje 1320-1396)
    sync.ts           — handleSync (hoje 682-714)
```

`platform/shared/pure.ts` não muda — continua sendo o módulo de funções puras compartilhadas com o portal (nada de `crypto.subtle` migra pra lá, conforme comentário já existente no arquivo).

## Contratos de API

Inalterados — mesma URL, método, payload de entrada, formato de resposta para as 24 rotas. Este plan não introduz nem remove nenhum endpoint.

## Decisões de arquitetura e trade-offs

- **Sem framework de rotas.** `index.ts` continua um `if`/`switch` simples sobre `url.pathname` + `request.method` — só que importando de `routes/*.ts` em vez de conter o corpo do handler. Constituição §3 (sem dependência npm no Worker) não muda.
- **Granularidade "por entidade", não "por handler".** `message.ts` agrupa GET+PUT da mesma entidade; `avaliacoes.ts` agrupa os 3 handlers que giram em torno da mesma tabela. Divisão handler-a-handler seria excesso de arquivos pra pouco ganho de legibilidade (viola "monólito modular", constituição preâmbulo).
- **`resolveTurmaParam`/`ANO_CURSO_ATUAL` viram `lib/turma-context.ts`**, não duplicados em painel/grade/boletim nem forçados a viver artificialmente em um dos três arquivos que os usam.
- **`resolveAvaliacoesTurmaId` fica local em `routes/avaliacoes.ts`** — só é usado pelos handlers desse mesmo arquivo, não precisa de módulo próprio.
- **`/api/admin/seed` mantido como está, funcionalmente.** Já é atômico por seção (cada campo do payload é opcional); o problema nunca foi o endpoint em si, foi (a) estar misturado com o resto do arquivo e (b) não haver uma forma óbvia de publicar 1 avaliação sem tocar as outras — resolvido pelo novo script (RF6), não por reescrever o endpoint.
- **Tipos migram para `types.ts` sem mudar forma.** `AdminUserRow` e `NotaUpdatePayload` (hoje declarados no meio do arquivo, perto do primeiro uso) também migram, mesmo sendo usados só por um handler — consistência com RF4 vale mais que a economia de não migrar 2 tipos pequenos.

## Estratégia de teste

- Type-check do Worker (`npx tsc --noEmit` a partir de `platform/worker/`, usando o `tsconfig` já existente — ou o comando equivalente que o projeto já usa pra isso, se não houver script dedicado, criar um mínimo).
- Smoke test manual local (`wrangler dev` ou equivalente): login, `GET /api/avaliacoes`, `POST /api/admin/seed` com payload parcial de teste, `PUT /api/admin/notas` — confirmar resposta idêntica à de antes do refactor.
- Sem testes automatizados novos (RF5 é sobre preservar comportamento, não adicionar cobertura — os property tests de `shared/pure.ts` já existentes continuam sendo a suíte relevante e não são tocados).
