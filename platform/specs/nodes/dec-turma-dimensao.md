---
type: decisao
status: planned
title: Turma é dimensão própria, separada de ano_curso
tags: [dados, turmas, arquitetura, avaliacoes, indicadores]
updated: 2026-07-28
issue:
---

# Decisão: turma como dimensão separada de ano_curso

## Contexto
Turmas coexistem sobrepostas — turma nova entra no Ano1 enquanto a anterior já está no Ano2/Ano3 — e cada UC pertence a exatamente um ano do curso (grade fixa, fato confirmado pelo professor). O modelo original de [[03-avaliacoes-por-indicador]] não tinha nenhuma dimensão de coorte: `slug='av01'` colidiria entre turmas, e `trimestre='T2'` também se repete a cada turma.

## Decisão
**Turma vira tabela própria** (`turmas`: id, ano_ingresso, status) e `users` ganha `turma_id`. `avaliacoes` continua template de currículo (slug/título/tipo/trimestre/status de conteúdo), compartilhado por qualquer turma que chegue naquele ponto — nunca ganha ano nem turma. `avaliacoes_turma` (PK `turma_id`+`avaliacao_slug`) guarda o que muda por turma: prazo, prazo_label, status de aplicação. `notas` não muda de PK — `user_id` já resolve a ambiguidade porque cada aluno pertence a uma única turma. `ano_curso` (grade fixa por UC, eixo diferente de turma) vive em `ucs`, não em `indicadores` — ver [[dec-uc-conhecimento]], decisão posterior que moveu essa coluna.

## Consequência
`avaliacoes.slug='av01'` nunca colide entre turmas porque é conteúdo, não instância. Endpoints de professor (`painel`, `grade`, `boletim`) passam a exigir turma explícita quando mais de uma está ativa. Custo aceito: atribuir aluno a uma turma quando várias coexistem fica manual, fora desta sprint — hoje, com uma turma só, o login já resolve sozinho. `users.turma_id` exige `ALTER TABLE` manual (primeira quebra da promessa de `schema.sql` sempre idempotente, porque `users` já está em produção).

## Grafo
Resolve a questão aberta de [[03-avaliacoes-por-indicador]] · rege [[indicadores]] e [[notas-senac]] · reaproveita o padrão de dono único de [[dec-seed-fonte-unica]].
