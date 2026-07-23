---
type: decisao
status: shipped
title: Identidade sempre vem do sub do JWT
tags: [auth, seguranca]
updated: 2026-07-21
issue:
---

# Decisão: identidade vem do `sub` do JWT

## Contexto
Havia duas fontes de identidade concorrentes: um UUID anônimo em `localStorage['lms_user_id']` (client) e o `sub` do JWT de aluno (server). O worker já derivava `userId` de `payload.sub`, deixando o UUID órfão.

## Decisão
`userId` **sempre** vem de `payload.sub` do JWT, no server e no client. Nada de identidade enviada pelo body ou inventada no client. Sem login = sem identidade remota (progresso fica local).

## Consequência
`lms_user_id` é removido em [[login-aluno]]. Aluno anônimo não sincroniza. Simplifica auth e fecha um vetor de spoofing de `userId`.

## Grafo
Aplicada por [[login-aluno]], [[auth-professor]], [[entregas]].
