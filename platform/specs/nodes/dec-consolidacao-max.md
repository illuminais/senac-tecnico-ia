---
type: decisao
status: planned
title: Boletim consolida por max(A > PA > NA)
tags: [notas, pedagogico, avaliacoes]
updated: 2026-07-24
issue:
---

# Decisão: como consolidar o indicador no boletim

## Contexto
A nota é gravada no grão (aluno × avaliação × indicador), mas o boletim precisa de **um** veredito por (aluno × indicador). Quando duas avaliações do mesmo trimestre cobrem o mesmo indicador, o aluno pode ter PA numa e A na outra. Alternativas: a melhor, a mais recente, ou um veredito manual sobrescrevível.

## Decisão
**`max(A > PA > NA)`, calculado na consulta.** Sem tabela nem coluna de consolidação. Descartada "a mais recente" (pune quem demonstrou domínio cedo e foi mal depois); descartado veredito manual (+1 tabela, +1 tela e dois números na mesma tela que podem divergir).

## Consequência
Coerente com o modelo Senac — o indicador foi atendido em algum momento, logo está atendido — e premia recuperação. Função pura `consolidarNota`, com property test de ordem-invariância e idempotência. Se um dia o fechamento exigir sobrescrever à mão, vira tabela nova sem migrar nada do que existe.

## Grafo
Rege [[notas-senac]] · verificada conforme [[dec-property-tests]].
