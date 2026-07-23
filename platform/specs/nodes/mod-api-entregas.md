---
type: modulo
status: planned
title: API /api/entregas (Worker)
tags: [worker, entregas, api]
updated: 2026-07-21
sprint: "[[02-entregas-avaliacao]]"
issue:
---

# `/api/entregas`

Upsert de entrega (JWT aluno). Path: `platform/worker/src/index.ts` → `handleCreateEntrega`; tabela em `schema.sql`. Comportamento e contrato: ver `platform-contexto`.

## Grafo
Sustenta [[entregas]] · valida via [[dec-worker-sem-npm]] · alvo de [[dec-property-tests]].
