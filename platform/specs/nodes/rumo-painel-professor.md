---
type: rumo
status: planned
title: Rumo — Painel do Professor
tags: [professor]
updated: 2026-07-21
issue:
---

# Rumo: Painel do Professor

## Visão
O professor enxerga a turma num painel único: quem progrediu em qual aula, quais entregas chegaram (e os links), o calendário de HA por UC. Hoje existem as peças cruas (auth, calendário, entregas no banco) mas não a visão consolidada.

## Features que apontam pra cá
- [[auth-professor]] (shipped) — a porta.
- [[calendario]] (shipped) — primeira superfície de dados da turma.
- _futuro:_ ver entregas da turma por avaliação, ver progresso agregado.

## Grafo
Puxado por [[auth-professor]] e [[calendario]]; vai consumir os dados que [[entregas]] grava.
