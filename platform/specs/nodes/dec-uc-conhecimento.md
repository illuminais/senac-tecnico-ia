---
type: decisao
status: planned
title: UC vira tabela própria; conhecimentos/habilidades amarrados na UC, não no indicador
tags: [dados, ucs, indicadores, arquitetura, avaliacoes]
updated: 2026-07-28
issue:
---

# Decisão: UC como tabela própria, conhecimentos/habilidades por UC

## Contexto
Conhecimentos/habilidades precisam ser trabalhados junto de cada indicador na prática, mas a fonte oficial (Plano de Curso Senac) só amarra isso na UC inteira, não indicador a indicador. `ano_curso` também vivia duplicado em cada linha de `indicadores`, sendo propriedade da UC.

## Decisão
**UC vira tabela própria** (`ucs`: codigo, nome, ano_curso, conhecimentos, habilidades — texto livre). `indicadores.uc` vira FK pra `ucs.codigo`; `ano_curso` sai de `indicadores`. Seed lê `ucs-elementos-da-competencia.md` (fonte oficial) em vez de inventar vínculo indicador↔conhecimento que a fonte não tem. No admin, cada indicador exibido é expansível e busca contexto via `GET /api/admin/ucs` (rota de referência pequena, resolvida uma vez no client).

## Consequência
Tira a duplicação de `ano_curso` e traz conhecimento/habilidade pro admin sem fabricar granularidade que não existe — o professor vê os conhecimentos da UC inteira, não filtrados por indicador específico.

## Grafo
Estende [[03-avaliacoes-por-indicador]] · move `ano_curso` de [[indicadores]] pra `ucs` · complementa [[dec-turma-dimensao]] · reaproveita [[dec-seed-fonte-unica]].
