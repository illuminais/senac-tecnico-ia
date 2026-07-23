# Analyze: Login real do aluno

Cruzamento spec × plan × tasks. Parecer read-only antes do Implement.

## Cobertura (critério → onde é resolvido)
| CA | plan | task | ok |
|---|---|---|---|
| CA1 (deslogado não sincroniza/sem UUID) | remove getUserId, guard isLoggedIn | T3 | ✅ |
| CA2 (logado envia Bearer) | useSyncProgress já usa token | T3 | ✅ |
| CA3 (exp no passado ⇒ deslogado) | isTokenExpired central | T3, T4 | ✅ |
| CA4 (isAllowedStudentEmail) | extrai pra shared | T2, T4 | ✅ |
| CA5 (roundtrips b64url/JWT) | extrai pra shared | T2, T4 | ✅ |
| CA6 (grep lms_user_id vazio) | remove código morto | T3 | ✅ |

## Achados
- **Lacuna documentada, não bloqueante — RF4** ("preservar progresso anônimo ao logar"): `useProgress` não é consumido por nenhuma view hoje, então não há progresso a preservar. A garantia é trivialmente satisfeita agora e vira real quando o tracking for plugado. Nenhuma task necessária; registrado como dívida futura.
- **Risco a verificar em T2** — o Worker importar `../../shared/pure.ts` (fora de `worker/src`): o esbuild do wrangler segue imports relativos em qualquer lugar, deve funcionar, mas confirmar no bundle antes de marcar T2. Se falhar, fallback = `shared/` como raiz de resolução no `wrangler.toml`.
- **Ambiguidade resolvida** — alias `@shared`: o `vitest.config.ts` estende o `vite.config.ts`, então o alias é definido uma vez.

## Veredito
Consistente. Sem contradição. Liberado pro Implement (T1 primeiro).
