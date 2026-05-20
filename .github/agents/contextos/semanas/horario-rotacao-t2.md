---
schema: horario-rotacao
trimestre: T2
inicio: 2026-05-21
fim: 2026-09-04
ha-disponivel-t2: 156
ha-disponivel-t3: 174
ha-total-t2t3: 330
ha-necessario-t2t3: 356
gap: -26
---

# Horário — Rotação T2

> Estrutura: qui+sex manhã · 6 HA/dia · 12 HA/semana normal · **26 dias de aula no T2**
> Gap de -26 HA: UC04 libera slots (~9 HA), restante absorvível via integração entre UCs

---

## Ciclo 3 semanas (fixo)

| | Quinta (3h + 3h) | Sexta (3h + 3h) |
|---|---|---|
| **Sem 1** | UC05 · UC02 | UC08 · UC06 |
| **Sem 2** | UC07 · UC01 | UC05 · UC03 |
| **Sem 3** | UC08 · UC09 | UC07 · UC04 |

**Regra de substituição:** quando UC04 encerrar conteúdo T2 (~sessão 3), redirecionar Sem3-Sex para UC08 ou UC09.

---

## Projeção de HA por UC no T2

| UC | Slots/ciclo | Sessões T2 | HA T2 | Meta T2 | Status |
|---|---|---|---|---|---|
| UC05 Python | 2× | 9 | 27 | 27 | ✓ |
| UC07 Trans. Digital | 2× | 8 | 24 | 24 | ✓ |
| UC08 BD | 2× | 8+1* | 27 | 27 | ✓ (*via subst. UC04) |
| UC02 Inglês | 1× | 5 | 15 | 14 | ✓ |
| UC06 GPU | 1× | 5 | 15 | 14 | ✓ |
| UC01 Fund. Comp. | 1× | 5 | 15 | 15 | ✓ |
| UC03 Matemática | 1× | 5 | 15 | 15 | ✓ |
| UC09 Estatística | 1× | 4+1* | 15 | 12 | ✓ (*via subst. UC04) |
| UC04 IA | 1× | 3 | 9 | 9 | ✓ (encerra cedo → libera slots) |

---

## Calendário T2 — Semana a semana

| Sem | Tipo | Quinta | Sexta | Obs |
|---|---|---|---|---|
| 01 | Sem 1 | 21/05 — UC05+UC02 | 22/05 — UC08+UC06 | |
| 02 | Sem 2 | 28/05 — UC07+UC01 | 29/05 — UC05+UC03 | |
| 03 | Sem 3 | ~~04/06~~ ← Corpus Christi | ~~05/06~~ ← recesso | **sem aula** |
| 04 | Sem 1 | 11/06 — UC05+UC02 | 12/06 — UC08+UC06 | |
| 05 | Sem 2 | 18/06 — UC07+UC01 | 19/06 — UC05+UC03 | |
| 06 | Sem 3 | 25/06 — UC08+UC09 | 26/06 — UC07+UC04 | |
| 07 | Sem 1 | 02/07 — UC05+UC02 | 03/07 — UC08+UC06 | |
| 08 | Sem 2 | 09/07 — UC07+UC01 | 10/07 — UC05+UC03 | |
| — | RECESSO | 13/07 – 25/07 | | recesso de julho |
| 09 | Sem 3 | 30/07 — UC08+UC09 | 31/07 — UC07+UC04 | |
| 10 | Sem 1 | 06/08 — UC05+UC02 | 07/08 — UC08+UC06 | |
| 11 | Sem 2 | 13/08 — UC07+UC01 | 14/08 — UC05+UC03 | |
| 12 | Sem 3 | 20/08 — UC08+UC09 | 21/08 — UC07+UC04* | *UC04 encerra → UC08 ou UC09 |
| 13 | Sem 1 | 27/08 — UC05+UC02 | 28/08 — UC08+UC06 | |
| 14 | Sem 2 | 03/09 — UC07+UC01 | 04/09 — UC05+UC03 | último dia T2 |

---

## Capacidade T2 × T3

| | Dias | HA | Notas |
|---|---|---|---|
| T2 | 26 | 156 | -6h Corpus (04/06) · -6h recesso 05/06 · -24h recesso jul |
| T3 | 29 | 174 | -6h Nov/20 (Zumbi — sexta) |
| **Total** | **55** | **330** | vs 356 necessário → gap **-26 HA** |

---

## Refs
↑ [roteiro-t2](../roteiro-t2.md)
→ [relatorio-horas-t1](../relatorio-horas-t1.md)
→ [metodologias](../../metodologias-ativas-senac.md)
