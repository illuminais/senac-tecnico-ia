---
type: feature
status: shipped
title: Login real do aluno (Google OAuth)
tags: [auth, aluno, oauth]
updated: 2026-07-24
sprint: "[[01-login-aluno-real]]"
part_of: "[[rumo-experiencia-aluno]]"
depends_on: ["[[mod-use-student-auth]]"]
issue:
---

# Login real do aluno

Aluno entra com conta Google (domínio da escola) e passa a ter identidade real — fim do UUID anônimo.

## Escopo
Finalizar + verificar + testar o fluxo Google do aluno (já existe no worker e nas views). Remover o `lms_user_id` órfão de `useProgress`. Checar `exp` do JWT. Preservar progresso anônimo ao logar.

## Critérios
Ver [[01-login-aluno-real]] (spec.md) — CA1..CA6.

## Grafo
Depende de [[mod-use-student-auth]] · aponta pra [[rumo-experiencia-aluno]] · respeita [[dec-identidade-jwt]] e [[dec-property-tests]].
