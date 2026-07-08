---
schema: horario-rotacao
trimestre: T2
inicio: 2026-05-21
fim: 2026-09-04
ha-disponivel-t2: 162
ha-disponivel-t3: 174
ha-total-t2t3: 336
ha-necessario-t2t3: 356
gap: -20
---

# Horário — Rotação T2

> Estrutura: qui+sex manhã · 6 HA/dia · 12 HA/semana normal · **26 dias de aula no T2**
> Gap de -26 HA: UC04 libera slots (~9 HA), restante absorvível via integração entre UCs

---

## Ciclo 3 rotações (fixo)

> **Nomenclatura:** "Rotação 1/2/3" é a posição no ciclo fixo de 3 (este bloco). Não confundir com o número de `semanaXX.md` em `contextos/semanas/` — esse é sequencial e cronológico (semana01, semana02, …), nunca se repete, e pode divergir da rotação quando há override.

| | Quinta (3h + 3h) | Sexta (3h + 3h) |
|---|---|---|
| **Rotação 1** | UC05 Python · UC02 Inglês | UC08 Banco de Dados · UC06 Arquitetura de Computadores e GPU |
| **Rotação 2** | UC07 Transformação Digital · UC01 Fund. Computação | UC05 Python · UC03 Fund. Matemáticos |
| **Rotação 3** | UC08 Banco de Dados · UC09 Estatística Aplicada | UC07 Transformação Digital · UC04 Fund. e Conceitos de IA |

**Regra de substituição:** quando UC04 encerrar conteúdo T2 (~sessão 3), redirecionar Rotação 3-Sex para UC08 ou UC09.

---

## Estado da Rotação (posição real)

> Atualizar sempre que uma aula acontecer — é este bloco que diz qual Rotação vem a seguir, não a tabela "Calendário T2" abaixo (que assume adesão estrita e fica desatualizada quando há override).

- **Última rotação seguida com fidelidade:** Rotação 3-Qui via A36 (25/06 — UC08+UC09).
- **A37–A39 foram overrides ad hoc** (não seguiram nenhuma rotação do ciclo): A37 = UC05+UC09, A38 = UC07+UC06, A39 = UC04+UC05.
- **Decisão do professor (08/07):** retomar o ciclo a partir da **Rotação 1** em A40/A41, em vez de seguir "Sem 2" como a tabela "Calendário T2" previa para essas datas.
- **Rotação em curso:** Rotação 1 → **A40** (09/07, Qui) = UC05 Python + UC02 Inglês · **A41** (10/07, Sex) = UC08 Banco de Dados + UC06 Arquitetura de Computadores e GPU.
- **Próxima rotação a aplicar (depois de A40/A41):** Rotação 2.

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

## Calendário T2 — Semana a semana (rotação PLANEJADA)

> Esta tabela é o plano original de adesão estrita ao ciclo. Quando há override (ver histórico em `semanaXX.md` e no bloco "Estado da Rotação" acima), a rotação real diverge da coluna "Rotação" aqui — o bloco acima é a fonte da verdade para "o que vem a seguir".

| Sem | Rotação | Quinta | Sexta | Obs |
|---|---|---|---|---|
| 01 | Rotação 1 | 21/05 — UC05+UC02 | 22/05 — UC08+UC06 | |
| 02 | Rotação 2 | 28/05 — UC07+UC01 | 29/05 — UC05+UC03 | +30/05 Sab — Reposição (A30, UC a definir) |
| 03 | Rotação 3 | ~~04/06~~ ← Corpus Christi | ~~05/06~~ ← recesso | **sem aula** |
| 04 | Rotação 1 | 11/06 — UC05+UC02 | 12/06 — UC08+UC06 | |
| 05 | Rotação 2 | 18/06 — UC07+UC01 | 19/06 — UC05+UC03 | |
| 06 | Rotação 3 | 25/06 — UC08+UC09 | 26/06 — UC07+UC04 | |
| 07 | Rotação 1 | 02/07 — UC05+UC02 | 03/07 — UC08+UC06 | override real: ver `semana07.md` (A38=UC07+UC06, A39=UC04+UC05) |
| 08 | ~~Rotação 2~~ → **Rotação 1** | 09/07 — UC05+UC02 | 10/07 — UC08+UC06 | override decidido 08/07: retomar em Rotação 1 (ver "Estado da Rotação") |
| — | RECESSO | 13/07 – 25/07 | | recesso de julho |
| 09 | Rotação 2 | 30/07 — UC07+UC01 | 31/07 — UC05+UC03 | deslocamento permanente a partir daqui (decisão 08/07) |
| 10 | Rotação 3 | 06/08 — UC08+UC09 | 07/08 — UC07+UC04* | *1ª ocasião de avaliar encerramento de UC04 |
| 11 | Rotação 1 | 13/08 — UC05+UC02 | 14/08 — UC08+UC06 | |
| 12 | Rotação 2 | 20/08 — UC07+UC01 | 21/08 — UC05+UC03 | |
| 13 | Rotação 3 | 27/08 — UC08+UC09 | 28/08 — UC07+UC04* | *2ª ocasião — reavaliar se UC04 já encerrou |
| 14 | Rotação 1 | 03/09 — UC05+UC02 | 04/09 — UC08+UC06 | último dia T2 |

**T3 continua o mesmo ciclo sem reiniciar** (T2 termina em Rotação 1 → T3 começa em Rotação 2):

| Sem T3 | Rotação | Quinta | Sexta | Obs |
|---|---|---|---|---|
| 1 | Rotação 2 | 10/09 — UC07+UC01 | 11/09 — UC05+UC03 | |
| 2 | Rotação 3 | 17/09 — UC08+UC09 | 18/09 — UC07+UC04* | *3ª ocasião — provável substituição por UC08/UC09 |
| 3 | Rotação 1 | 24/09 — UC05+UC02 | 25/09 — UC08+UC06 | |

---

## Capacidade T2 × T3

| | Dias | HA | Notas |
|---|---|---|---|
| T2 | 27 | 162 | -6h Corpus (04/06) · -6h recesso 05/06 · -24h recesso jul · +6h reposição 30/05 |
| T3 | 29 | 174 | -6h Nov/20 (Zumbi — sexta) |
| **Total** | **56** | **336** | vs 356 necessário → gap **-20 HA** |

---

## Refs
↑ [roteiro-t2](../roteiro-t2.md)
→ [relatorio-horas-t1](../relatorio-horas-t1.md)
→ [metodologias](../conteudo-base/metodologias-ativas-senac.md)
