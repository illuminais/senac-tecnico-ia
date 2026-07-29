---
type: decisao
status: planned
title: Git semeia, D1 serve, painel só lê
tags: [dados, seed, arquitetura, indicadores]
updated: 2026-07-24
issue:
---

# Decisão: quem é dono do dado curricular

## Contexto
Indicadores e o vínculo avaliação↔indicador são conhecimento invariável do curso. Podiam viver em YAML/markdown (como hoje), no D1, ou nos dois. Manter nos dois cria dois donos: o dia em que o painel edita um vínculo e alguém re-roda o seed, um dos lados perde. O `parseYaml` quebrado (todas as avaliações com `ucs: []`) é a prova de que markdown solto sem validação é frágil.

## Decisão
**Markdown/YAML é autoria, D1 é a verdade em runtime, o seed é o único dono do vínculo.** O painel do professor só lê. Mudar indicador de avaliação = editar `meta.yaml` e re-semear. Mesmo padrão já usado por `seed-calendar.mjs`.

## Consequência
Re-semear é sempre seguro: o upsert nunca toca `notas`. Histórico versionado em git, sem tela de CRUD no escopo. Custo aceito: ajustar um vínculo exige editar YAML e rodar script, não é clique. `dump-indicadores.mjs` fecha o ciclo de volta, regravando o markdown de cobertura a partir do D1.

## Grafo
Rege [[indicadores]] · reaproveita o padrão de [[calendario]] · habilita [[notas-senac]].
