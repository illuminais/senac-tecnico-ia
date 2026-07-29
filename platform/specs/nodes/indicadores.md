---
type: feature
status: planned
title: Indicadores curriculares
tags: [avaliacoes, indicadores, curriculo]
updated: 2026-07-28
sprint: "[[03-avaliacoes-por-indicador]]"
part_of: "[[rumo-experiencia-aluno]]"
depends_on: []
issue:
---

# Indicadores curriculares

Os 55 indicadores das 9 UCs viram dado consultável, e cada avaliação declara quais cobre.

## Escopo
Catálogo semeado de `contextos/conteudo-base/ucs-elementos-da-competencia.md` (indicadores + UCs) e `distribuicao-trimestral-ano1.md` (trimestres) para o D1, preservando em quais trimestres cada indicador é trabalhado (um indicador pertence a vários). `ano_curso` (1/2/3, grade fixa) e os conhecimentos/habilidades vivem na UC (tabela `ucs`, não em `indicadores` — ver [[dec-uc-conhecimento]]), consultáveis pelo professor no admin. Aluno vê indicador + UC dentro da avaliação; professor vê a cobertura do trimestre por ano do curso, incluindo os indicadores **sem avaliação nenhuma** — que é o valor da tela.

## Critérios
Ver [[03-avaliacoes-por-indicador]] (spec.md) — CA1, CA2, CA5, CA6, CA8, CA10.

## Grafo
Entregue por [[03-avaliacoes-por-indicador]] · propriedade do dado regida por [[dec-seed-fonte-unica]] · `ano_curso` e conhecimentos/habilidades decididos por [[dec-uc-conhecimento]] · turma decidida por [[dec-turma-dimensao]] · consumida por [[notas-senac]] · aponta pra [[rumo-painel-professor]].
