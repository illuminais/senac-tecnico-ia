# Plan: Entregas de avaliação (round-trip completo)

## Camadas afetadas
- [ ] Schema D1 — **nenhuma mudança** (`entregas` já existe, PK `user_id`+`avaliacao_slug`)
- [x] API Worker — **1 rota nova** (`GET /api/entregas`) + refactor da validação de URL
- [x] Componentes Vue — `AvaliacaoView` carrega/exibe/edita a entrega
- [x] Shared — `isValidEntregaUrl` (mesma função no worker e no client)

## Schema
Sem alteração. `entregas.updated_at` (epoch) alimenta o "Enviado em".

## Contratos de API
**Novo** — `GET /api/entregas` (JWT aluno; `userId` de `payload.sub`):
```
→ 200 { [avaliacaoSlug]: { link: string, updatedAt: number } }   // só do caller
→ 401 se sem/JWT inválido
```
`handleGetEntregas`: `SELECT avaliacao_slug, link, updated_at FROM entregas WHERE user_id = ?` → reduz pra mapa. Rota no dispatch (`GET` + `/api/entregas`), ao lado do POST existente. CORS já permite GET.

**Refactor** — `handleCreateEntrega`: trocar a validação inline (`new URL` + protocolo) por `isValidEntregaUrl` de `platform/shared/pure.ts`, a **mesma** que o client usa (CA5: aceitam exatamente o mesmo conjunto).

## Frontend
- `AvaliacaoView.vue`: no `onMounted`, se `isLoggedIn`, `GET /api/entregas` → guarda o mapa. Se existe entrega para `route.params.id`: pré-preenche `link`, mostra "Enviado em `<data>`", botão vira "Atualizar". Senão: form vazio, botão "Enviar".
  - Estados: carregando-entrega · sem-entrega · com-entrega · enviando · ok · erro · deslogado (já existe o convite a `/entrar`).
  - Antes do POST: validar com `isValidEntregaUrl` (feedback imediato); worker continua sendo a fonte de verdade.
  - No sucesso do POST: atualizar `updatedAt` local pra "agora" (sem refetch).

## Estratégia de teste (fast-check)
- `isValidEntregaUrl(s)` (property, portal): `true` ⇔ parseia como URL com protocolo `http`/`https`; rejeita `javascript:`, `data:`, sem-esquema. **Mesma função** que o worker → consistência garantida por construção.
- Formatação de data (`updatedAt` epoch → texto): estável, sem off-by-one de fuso no dia exibido.
- Idempotência do upsert: teste de **exemplo/integração** (não é pura) — enviar 2× o mesmo par ⇒ 1 linha, último link vence. (Nota: roda contra D1 local, fora do harness de unidade.)

## Dependência
Depende de [[login-aluno]] shipped (precisa do JWT de aluno com `exp` blindado). Sequenciar sprint 01 antes.
