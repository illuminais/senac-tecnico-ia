---
type: decisao
status: shipped
title: Entregas guardam link no D1 (R2 adiado)
tags: [entregas, storage, arquitetura, cloudflare]
updated: 2026-07-21
issue:
---

# Decisão: storage das tarefas entregues

## Contexto
Onde guardar as entregas: D1 (banco), R2 (object storage) ou link externo. Volume ~30 alunos × ~6 avaliações → custo ~$0 nas três. Limite duro: linha D1 = **2 MB** (BLOB incluso); R2 tem egress zero e 10 GB grátis.

## Decisão
Guardar **só o link (URL) no D1**, como já está. **Descartado** blob no D1 (teto de 2 MB por linha barra PDFs/notebooks e polui o banco relacional). **R2 adiado** — não pelo custo, mas pela complexidade do fluxo de upload, que não se justifica agora.

## Consequência
Sprint 02 fecha o round-trip sem infra nova. Risco aceito: link externo quebrado/permissão errada. A evolução (uploads reais) está registrada em [[rumo-uploads-r2]].

## Grafo
Rege [[entregas]] · aponta a evolução pra [[rumo-uploads-r2]].
