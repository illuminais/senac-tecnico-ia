---
type: modulo
status: shipped
title: platform/shared/pure.ts (lógica pura compartilhada)
tags: [testes, arquitetura, shared]
updated: 2026-07-23
issue:
---

# `platform/shared/pure.ts`

Fonte única de lógica pura sem deps, importada por Worker, client do portal e testes vitest. Path: `platform/shared/pure.ts`. Conteúdo hoje: `isAllowedStudentEmail`, `b64url`/`decodeB64url`, `toHex`/`fromHex`, `decodeJwtPayload`, `isTokenExpired`. `isValidEntregaUrl` entra na sprint 02 (T1, ainda não implementada).

## Grafo
Habilita [[login-aluno]] e [[entregas]] · concretiza [[dec-worker-sem-npm]] e [[dec-property-tests]].
