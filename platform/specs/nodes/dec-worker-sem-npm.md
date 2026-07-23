---
type: decisao
status: shipped
title: Worker sem package.json — puros extraídos pra testar
tags: [worker, testes, arquitetura]
updated: 2026-07-21
issue:
---

# Decisão: Worker sem `package.json`; funções puras extraídas

## Contexto
O Worker (`platform/worker/`) não é workspace npm — bundle transpile-only via wrangler, sem `tsc`/vitest. Mas queremos property-testar suas funções puras (`isAllowedStudentEmail`, `b64url`/`hex` roundtrip, sign/verify JWT).

## Decisão
Não dar `package.json` ao Worker (constituição §3). Em vez disso, extrair as funções puras testáveis pra um módulo compartilhado (ex.: `platform/worker/src/pure.ts` sem deps de runtime Cloudflare) importado tanto pelo Worker quanto pelos testes vitest do portal.

## Consequência
Property tests do Worker rodam no harness do portal. O Worker continua sem deps. Refatoração de imports pontual.

## Grafo
Habilita [[dec-property-tests]] para o Worker. Afeta [[mod-api-entregas]] e o módulo de auth.
