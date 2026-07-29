---
type: feature
status: planned
title: Lançamento de nota A/PA/NA
tags: [professor, notas, avaliacoes]
updated: 2026-07-28
sprint: "[[03-avaliacoes-por-indicador]]"
part_of: "[[rumo-painel-professor]]"
depends_on: ["[[indicadores]]", "[[login-aluno]]"]
issue:
---

# Lançamento de nota A/PA/NA

Professor lança o veredito Senac por (aluno × avaliação × indicador) e exporta o boletim do trimestre.

## Escopo
Grade aluno × indicador **de uma turma** com teclado e marcação de coluna inteira (evita ~90 cliques por avaliação). Ausência de linha = **não avaliado**, distinto de NA. Boletim consolida por `max` e exporta CSV, também por turma. Aluno não vê nota nesta sprint.

## Critérios
Ver [[03-avaliacoes-por-indicador]] (spec.md) — CA3, CA4, CA7, CA8.

## Grafo
Entregue por [[03-avaliacoes-por-indicador]] · consolidação regida por [[dec-consolidacao-max]] · escopo de turma regido por [[dec-turma-dimensao]] · consome [[indicadores]] e [[entregas]] · respeita [[dec-property-tests]] · aponta pra [[rumo-painel-professor]].
