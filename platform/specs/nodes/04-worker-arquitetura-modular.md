---
type: sprint
status: implementing
title: Sprint 04 — Arquitetura modular do Worker
tags: [worker, arquitetura, agentes]
updated: 2026-07-29
issue:
---

# Sprint 04 — Arquitetura modular do Worker

Hub da sprint. Docs SDD (efêmeros, fora do grafo): [spec](../04-worker-arquitetura-modular/spec.md) · [plan](../04-worker-arquitetura-modular/plan.md) · [tasks](../04-worker-arquitetura-modular/tasks.md) · [analyze](../04-worker-arquitetura-modular/analyze.md).

Motivada por `worker/src/index.ts` ter virado um monólito de 1561 linhas com endpoint genérico (`/api/admin/seed`) e instruções de agente que mandavam mantê-lo assim. Refactor puro (zero mudança de comportamento de API) + correção das instruções que causaram o problema.

## Grafo
Afeta [[dec-worker-sem-npm]] (continua válido — sem npm, só reorganização de arquivo). Ver regras novas em [[constitution]] itens 7-9.
