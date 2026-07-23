---
type: rumo
status: idea
title: Rumo — Uploads reais (R2)
tags: [entregas, storage, r2]
updated: 2026-07-21
issue:
---

# Rumo: Uploads reais no R2

## Visão
A plataforma passa a ser **dona dos arquivos** entregues: aluno sobe o arquivo de verdade (não só um link), bytes no **R2** + metadados no **D1** (`r2_key`, `filename`, `size`, `content_type`, `updated_at`), download **proxied por JWT** no Worker (aluno baixa o seu, professor baixa todos). Egress zero, ~grátis no volume da turma. Mata o problema de link do Drive quebrado/sem permissão.

## Grafo
Evolui de [[entregas]] · decidido adiar em [[dec-storage-entregas]] · alimenta [[rumo-painel-professor]] (professor baixa as entregas).
