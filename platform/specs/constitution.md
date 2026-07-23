---
type: meta
title: Constituição da Plataforma LMS
updated: 2026-07-21
---

# Constituição da Plataforma LMS — Técnico em IA Senac

Princípios **não-negociáveis** que toda spec, plan, task e implementação desta plataforma respeita. Complementa (não substitui) a skill `platform-contexto`, que descreve o que existe; aqui está o que é inegociável. Regenerada raramente.

## I. Fronteiras de produção (o professor é o único com credenciais)
1. **Nunca** rodar `wrangler deploy` / `wrangler pages deploy`, `wrangler secret put`, `git push` ou mudar `status: published` sem aprovação explícita do professor. O trabalho de um agente termina em "aqui está o comando pronto pra você rodar".
2. Toda credencial real (Cloudflare, Resend, Google OAuth) é só do professor. Specs assumem os secrets já configurados; nunca inventam contas.

## II. Restrições de arquitetura
3. O Worker (`platform/worker/`) **não tem `package.json`** e nunca terá dependência npm adicionada sem aprovação. Bundling é transpile-only (esbuild via wrangler) — escreva tipos corretos mesmo sem enforcement.
4. `platform/portal/vite.config.ts` mantém `emptyOutDir: false` — **nunca remover** (preserva os builds Slidev).
5. Sem migrations: `schema.sql` é um único arquivo idempotente (`CREATE TABLE IF NOT EXISTS`). Mudança de schema = editar e reaplicar.
6. Auth é sem libs externas: JWT HS256 via Web Crypto, PBKDF2 pra senha, OAuth Google. `userId` sempre vem de `payload.sub` do JWT, **nunca** do body do request.

## III. Convenções de código
7. Tudo que toca `platform/portal/src/` é componentizado por padrão — `App.vue` e views grandes orquestram, não acumulam `<template>` inline. (skill `platform-vue-conventions`)
8. Estados de loading / erro / vazio são obrigatórios em qualquer tela que busca dados. (skill `platform-ui-ux`)
9. Tipos TS do portal espelham o schema D1 / payloads da API em `src/types/`.

## IV. Qualidade e testes (esta constituição adiciona)
10. **Toda lógica pura com invariante ganha property test** (fast-check): roundtrips, idempotência, limites/clamp, conservação, ordem-invariância. Testes de exemplo cobrem o resto; verificação manual cobre o que depende de credencial de produção.
11. `platform/portal/` é o workspace de teste (vitest + fast-check). Funções puras do Worker que precisam de teste são **extraídas para um módulo compartilhado** importável pelo teste — sem dar `package.json` ao Worker.
12. Nenhuma feature é "pronta" sem passar por `@platform-qa` (build + `vue-tsc` + revisão de convenções) e sem os testes da feature verdes.

## V. Processo (Spec-Driven Development)
13. Fluxo obrigatório para sprint/feature: **Specify → Plan → Tasks → Analyze → Implement**, com **checkpoint de validação humana** entre cada fase. Não se implementa sem `tasks.md` aprovado.
14. A spec é o artefato durável; o código é regenerável a partir dela. Artefatos vivem em `platform/specs/<NN>-<slug>/`.
15. O **Leovio orquestra o Implement** delegando task por task na ordem schema → API → Vue → UI/UX → QA. Um agente especialista nunca edita specs nem skills; isso é do Leovio.

## VI. Estado vivo (grafo)
16. `platform/specs/` é um **vault Obsidian** (schema em `SCHEMA.md`). Guarda **só o que o código não conta**: decisões (por quê), rumos (pra onde), features em obra (status). **Não é espelho do código** — "o que existe" é da skill `platform-contexto` (fronteira de verdade única por pergunta, ver SCHEMA). Só o **Leovio escreve nós**, em cada transição de fase/task.
17. **Orçamento de contexto**: o Leovio lê por turno só `_MOC` + a sprint ativa + os ≤4 nós que ela linka; especialistas leem zero grafo; uma invocação = uma fase. Consistência é **mecânica** (validador na fase Analyze + pre-commit), não disciplina; `status` vive só no nó (nunca duplicado no `_MOC`). Nós `idea`/`planned` sem `issue:` = backlog pra issues em massa.
