# Analyze: Entregas de avaliação

Cruzamento spec × plan × tasks. Parecer read-only antes do Implement.

## Cobertura (critério → onde é resolvido)
| CA | plan | task | ok |
|---|---|---|---|
| CA1 (reabrir mostra link enviado) | GET + prefill | T2, T3 | ✅ |
| CA2 (sem entrega ⇒ form vazio) | estados da view | T3 | ✅ |
| CA3 (editar não duplica) | upsert idempotente já existe | T3, T5 | ✅ |
| CA4 (bloqueia URL sem esquema/js:) | isValidEntregaUrl no client | T1, T3 | ✅ |
| CA5 (client = worker por construção) | mesma função shared | T1, T2, T4 | ✅ |

## Achados
- **Dependência dura** — precisa da sprint 01 shipped (JWT de aluno com `exp` blindado). Sequenciamento correto nas tasks. Não iniciar 02 antes de 01-T5 verde.
- **Fora do harness de unidade** — idempotência do upsert (invariante da spec) é teste de exemplo contra D1 local, não property test puro. Registrado em T5; verificação depende de D1 local (você).
- **Consistência do contrato** — mapa keyed por `avaliacaoSlug` idêntico em spec (RF1), plan (contrato) e tasks (T2). Sem divergência.
- **Segurança** — GET retorna só `WHERE user_id = payload.sub`; nunca outros alunos. Explícito em plan e task T2.

## Veredito
Consistente. Sem contradição. Liberado pro Implement após 01 shipped.
