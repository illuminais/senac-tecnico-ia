---
type: feature
status: shipped
title: Calendário de aulas
tags: [calendario, professor, aluno]
updated: 2026-07-21
part_of: "[[rumo-painel-professor]]"
issue:
---

# Calendário de aulas

Timeline de aulas dadas/planejadas, grid por mês/ano, resumo de HA por UC.

## Escopo
Shipped no commit `feat:add calendar` (0c978a1): `CalendarioView`, `CalendarMonthGrid`/`CalendarYearGrid`/`CalendarDayCell`/`CalendarDayModal`, composable `useCalendarGrid`, endpoints `/api/calendar*`.

## Critérios
Entregue. Invariantes de grid/HA ainda **não têm property test** — candidatos abertos (ver [[dec-property-tests]]).

## Grafo
Aponta pra [[rumo-painel-professor]] · lógica pura `useCalendarGrid`/`resumo-ha` é alvo de [[dec-property-tests]].
