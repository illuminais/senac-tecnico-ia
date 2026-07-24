---
type: feature
status: shipped
title: Entregas de avaliação
tags: [aluno, avaliacoes, entregas]
updated: 2026-07-24
sprint: "[[02-entregas-avaliacao]]"
part_of: "[[rumo-experiencia-aluno]]"
depends_on: ["[[mod-api-entregas]]", "[[login-aluno]]"]
issue:
---

# Entregas de avaliação

Aluno envia (e edita) o link da resposta de uma avaliação e vê o estado "já enviei".

## Escopo
Fechar o round-trip: hoje só existe o POST. Falta um `GET` da entrega atual → carregar, exibir "Enviado em X", pré-preencher, editar. Validação de URL http(s) no client espelhando o worker.

## Critérios
Ver [[02-entregas-avaliacao]] (spec.md) — CA1..CA5.

## Grafo
Depende de [[mod-api-entregas]] e de [[login-aluno]] (precisa de JWT de aluno) · aponta pra [[rumo-experiencia-aluno]] · storage decidido em [[dec-storage-entregas]] · respeita [[dec-property-tests]].
