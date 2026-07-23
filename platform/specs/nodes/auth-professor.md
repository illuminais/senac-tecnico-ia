---
type: feature
status: shipped
title: Login do professor
tags: [auth, professor]
updated: 2026-07-21
part_of: "[[rumo-painel-professor]]"
issue:
---

# Login do professor

Professor entra por usuário/senha (PBKDF2) ou Google OAuth login-only (nunca cria conta). Acesso a `/admin`.

## Escopo
Shipped e em produção — funciona. Fluxo de reset de senha via Resend + rate limit. É o espelho maduro que o [[login-aluno]] segue.

## Grafo
Aponta pra [[rumo-painel-professor]] · segue [[dec-identidade-jwt]].
