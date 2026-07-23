# Spec: Login real do aluno (Google OAuth) testável

## Contexto / problema
O login do **professor** funciona (usuário/senha + Google OAuth login-only). O login do **aluno** via Google já está quase todo implementado — Worker (`/api/auth/student/google/callback`), views (`EntrarView`, `StudentGoogleCallbackView`), composables (`useStudentAuth`, `useGoogleAuth`) — mas **nunca foi verificado ponta a ponta** e tem uma inconsistência de identidade: `useProgress.ts` ainda cria um UUID anônimo em `localStorage['lms_user_id']` (`getUserId()`) que **não é mais usado por nada** — o sync remoto (`useSyncProgress`) já manda o JWT e o Worker deriva o `userId` de `payload.sub`. Resultado: existe uma "identidade fantasma" que confunde e impede tratar corretamente o estado logado vs. anônimo. O objetivo desta sprint é **fechar, verificar e deixar testável** o login do aluno, eliminando o UUID órfão.

## Usuários e cenários
- Como **aluno** com email do domínio da escola, quero entrar com minha conta Google para que meu progresso e minhas entregas fiquem atrelados a mim de verdade (e sincronizem entre dispositivos).
- Como **aluno anônimo** (sem login), quero continuar navegando as aulas e ter progresso salvo localmente, sem que um "usuário fantasma" seja inventado.
- Como **aluno logado**, quero ver que estou logado (nome/avatar) e conseguir sair.

## Requisitos funcionais
- RF1: O sistema DEVE permitir login de aluno via Google OAuth apenas para emails cujo domínio esteja em `STUDENT_EMAIL_DOMAINS` (regra já no Worker); email de domínio não autorizado recebe mensagem clara e não cria conta.
- RF2: A identidade do aluno logado DEVE vir exclusivamente do JWT (`payload.sub`), tanto no client (exibição) quanto no server (persistência). O UUID `lms_user_id` DEVE ser removido.
- RF3: Sem login, o progresso DEVE continuar funcionando **localmente** (localStorage), sem sync remoto e sem inventar um `user_id`.
- RF4: Ao logar, o estado local existente (progresso anônimo em localStorage) DEVE ser preservado e passar a sincronizar sob a identidade real (sem perder o que o aluno já fez deslogado).
- RF5: O header/menu DEVE refletir o estado de auth (logado: nome/avatar + Sair; deslogado: Entrar).
- RF6: A lógica pura de auth do client (decode de payload JWT, checagem de expiração) e do Worker (`isAllowedStudentEmail`, roundtrip `b64url`/`decodeB64url`, sign/verify JWT) DEVE ser testável isoladamente.

## Comportamento esperado
- Fluxo feliz: `/entrar` → "Entrar com Google" → consent Google → `/entrar/google-callback?code&state` → troca `code` por JWT no Worker → `setToken` (cookie `lms_student_jwt`, SameSite=Strict, 30d) → redireciona `/`.
- `state` inválido/expirado ou `code` ausente → mensagem "Login inválido ou expirado" + link voltar.
- Email não autorizado → Worker responde 403 → view mostra "use sua conta @aluno.pr.senac.br ou da escola".
- Token expirado (exp < agora): tratado como **deslogado** — não envia sync, mostra "Entrar". (hoje `useStudentAuth.user` decodifica mas não checa `exp`.)
- Logout: apaga cookie, volta pra estado anônimo; progresso local permanece.

## Critérios de aceite (verificáveis)
- [ ] CA1: dado um aluno deslogado, quando abre uma aula e progride, então o progresso é salvo em localStorage e **nenhuma** chamada a `/api/sync` é feita e **nenhum** `lms_user_id` é criado.
- [ ] CA2: dado um JWT de aluno válido em cookie, quando o portal carrega, então header mostra nome/avatar e `syncNow()` envia `Authorization: Bearer <jwt>`.
- [ ] CA3: dado um JWT com `exp` no passado, quando `useStudentAuth.user` é lido, então retorna estado deslogado (não sincroniza).
- [ ] CA4: dado email `x@dominio-nao-autorizado.com`, quando `isAllowedStudentEmail` roda, então retorna `false`; para qualquer email `nome@<dominio-permitido>` retorna `true` (property test sobre a lista de domínios).
- [ ] CA5: para qualquer buffer de bytes, `decodeB64url(b64url(buf))` reproduz o buffer original (roundtrip); para qualquer payload, `verifyJwt(signJwt(payload))` recupera o payload (property test).
- [ ] CA6: `grep lms_user_id platform/portal/src` não retorna nada (UUID órfão removido).

## Fora de escopo
- Login por senha para aluno (só Google).
- Painel de progresso do aluno (é outra spec futura).
- Configurar secrets do Google OAuth em produção (só o professor faz; assume-se já feito para o teste manual E2E).
- Refresh token / renovação silenciosa de JWT.

## Invariantes (candidatos a property test)
- `isAllowedStudentEmail(email, domains)`: `true` sse e só se algum domínio permitido é sufixo `@dominio` do email (case-insensitive); lista vazia ⇒ sempre `false`.
- `decodeB64url ∘ b64url = identidade` (roundtrip) para qualquer `ArrayBuffer`.
- `verifyJwt ∘ signJwt = payload` para qualquer payload serializável, com o mesmo secret; secret diferente ⇒ `null`.
- Decode de payload JWT no client é o inverso do encode; token malformado ⇒ `null` (nunca lança).
- Checagem de expiração é monotônica: se `exp1 < exp2` e `exp1` está expirado num instante `t`, `exp2` não está "menos expirado".
