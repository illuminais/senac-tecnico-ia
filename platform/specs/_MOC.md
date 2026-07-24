---
type: meta
title: Map of Content — Estado da Plataforma LMS
updated: 2026-07-24
---

# Estado da Plataforma LMS — índice do vault

Nó-raiz. Abra `platform/specs/` no Obsidian → *Graph View*. Schema: [[SCHEMA]] · Regras: [[constitution]].

> Este arquivo é **só índice de links** — o `status` de cada nó vive no próprio nó (verdade única). Dashboard de status é gerado por `validate-graph.mjs --dashboard`, não mantido à mão.

## Sprint ativa
- _(nenhuma — próxima a definir)_

## Features
[[login-aluno]] · [[entregas]] · [[calendario]] · [[auth-professor]]

## Rumos
[[rumo-experiencia-aluno]] · [[rumo-painel-professor]] · [[rumo-uploads-r2]]

## Decisões (ADR)
[[dec-identidade-jwt]] · [[dec-worker-sem-npm]] · [[dec-property-tests]] · [[dec-storage-entregas]]

## Log de sprints fechadas
- [[01-login-aluno-real]] — 2026-07-23 · identidade real do aluno via Google OAuth, JWT com `exp`, núcleo puro + property tests.
- [[02-entregas-avaliacao]] — 2026-07-24 · round-trip da entrega (`GET /api/entregas`, carregar/exibir/editar), validação de URL compartilhada worker↔client.
