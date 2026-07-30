# Analyze: Arquitetura modular do Worker

Cruzamento spec × plan × tasks. Parecer read-only antes do Implement.

## Cobertura (critério → onde é resolvido)

| CA | plan | task | ok |
|---|---|---|---|
| CA1 (type-check sem erro novo) | mesma forma de tipos, só relocados | T1-T12, T17 | ✅ |
| CA2 (comportamento idêntico) | mesma URL/método/payload/resposta, RF5 | T6-T12, T17 | ✅ |
| CA3 (nenhum arquivo > ~200 linhas) | granularidade por entidade | T6-T11, T17 | ✅ |
| CA4 (publish-avaliacao.mjs payload mínimo) | payload parcial no mesmo endpoint | T13 | ✅ |
| CA5 (instruções sem "arquivo único") | reescrita das 3 fontes identificadas | T14 | ✅ |
| CA6 (.github/agents sincronizado) | 6 arquivos espelhados | T16 | ✅ |

## Achados

- 🟡 **Refactor mecânico grande, risco de erro de transcrição.** 24 handlers + ~20 helpers relocados manualmente entre ~15 arquivos novos é superfície ampla para erro de copy-paste (import esquecido, função duplicada). Mitigação: T17 (type-check + smoke test) é obrigatório antes de considerar a spec fechada, não opcional.
- 🔵 **`/api/admin/seed` não muda de forma, só de endereço.** A exceção documentada na constitution (§9) evita que um agente futuro tente "consertar" o endpoint achando que é o problema — o problema já estava resolvido (payload atômico por seção); só faltava um arquivo próprio e um script de conveniência (T13).
- 🔵 **`.github/agents/` historicamente não era mantido.** T16 fecha a lacuna agora, mas não há mecanismo automático que impeça o "fonte da verdade" de voltar a divergir do `.claude/agents/` no futuro — fica como risco aceito, fora do escopo desta spec (seria uma spec própria de tooling/CI).

## Veredito

Consistente. Sem bloqueio — plan e tasks cobrem todos os critérios de aceite do spec.md. Pronto para Implement.
