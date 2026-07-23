---
type: decisao
status: shipped
title: Lógica pura com invariante ganha property test (fast-check)
tags: [testes, qualidade]
updated: 2026-07-21
issue:
---

# Decisão: property tests para lógica pura

## Contexto
A plataforma tem lógica pura rica em invariantes (grid de calendário, bucketização de HA, clamp de progresso, roundtrips de encode, validação de URL, match de domínio de email). Testes de exemplo cobrem pouco do espaço de entrada.

## Decisão
Toda função pura com invariante ganha **property test** com [fast-check](https://fast-check.dev): roundtrip, idempotência, limites/clamp, conservação, ordem-invariância. Infra: vitest + fast-check no workspace `platform/portal/` (constituição §10-11).

## Consequência
Primeira sprint que introduz a infra: [[login-aluno]] + [[entregas]]. Alvos abertos herdados: `useCalendarGrid`, `resumo-ha` de [[calendario]].

## Grafo
Depende de [[dec-worker-sem-npm]] pra alcançar puros do Worker. Aplicada por [[login-aluno]] e [[entregas]].
