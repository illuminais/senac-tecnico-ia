---
type: meta
title: Constituição da Plataforma LMS
updated: 2026-07-29
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
7. **Um arquivo, uma responsabilidade — vale para o Worker inteiro.** `platform/worker/src/index.ts` é só o dispatcher (roteamento path→handler), sem lógica de negócio. Cada entidade do domínio (avaliações, notas, turmas, entregas, calendário, mensagens, seed, sync...) tem seu próprio arquivo em `platform/worker/src/routes/`; nenhum arquivo de rota mistura entidades diferentes. "Sem framework de rotas" (item 3 não muda) não significa "um arquivo só" — significa que o dispatcher em `index.ts` continua sendo um `if`/`switch` simples, só que enxuto.
8. Funções utilitárias reutilizáveis (JWT, hash de senha, CORS, resposta JSON, envio de e-mail, resolução de contexto de turma) vivem em `platform/worker/src/lib/`, nunca declaradas inline no arquivo que as usa. Um novo agente deve conseguir editar uma responsabilidade lendo o menor número possível de arquivos e linhas.
9. **Proibido endpoint genérico** que decide comportamento pelo formato do payload (uma tabela ou operação por parâmetro) — cada endpoint representa uma responsabilidade específica. Única exceção sancionada: `/api/admin/seed`, resync em lote do currículo (ucs/indicadores/avaliações/vínculos/turmas), que já é atômico por seção (cada campo do payload é opcional e só mexe no que foi enviado) e serve a um propósito genuinamente de lote, não de CRUD de uma entidade. Publicar uma única avaliação nova usa `platform/scripts/publish-avaliacao.mjs` (payload parcial no mesmo endpoint), nunca uma rota nova nem uma flag especial no script de resync completo (`seed-indicadores.mjs`, que continua sendo só a ferramenta de resync total do currículo).

## III. Convenções de código
10. Tudo que toca `platform/portal/src/` é componentizado por padrão — `App.vue` e views grandes orquestram, não acumulam `<template>` inline. (skill `platform-vue-conventions`)
11. Estados de loading / erro / vazio são obrigatórios em qualquer tela que busca dados. (skill `platform-ui-ux`)
12. Tipos TS do portal espelham o schema D1 / payloads da API em `src/types/`. No Worker, os mesmos tipos (Env + payloads) vivem em `platform/worker/src/types.ts`, nunca espalhados no topo de um arquivo de rota.

## IV. Qualidade e testes (esta constituição adiciona)
13. **Toda lógica pura com invariante ganha property test** (fast-check): roundtrips, idempotência, limites/clamp, conservação, ordem-invariância. Testes de exemplo cobrem o resto; verificação manual cobre o que depende de credencial de produção.
14. `platform/portal/` é o workspace de teste (vitest + fast-check). Funções puras do Worker que precisam de teste são **extraídas para um módulo compartilhado** importável pelo teste — sem dar `package.json` ao Worker.
15. Nenhuma feature é "pronta" sem passar por `@platform-qa` (build + `vue-tsc` + revisão de convenções, incluindo os itens 7-9 acima) e sem os testes da feature verdes.

## V. Processo (Spec-Driven Development)
16. Fluxo obrigatório para sprint/feature: **Specify → Plan → Tasks → Analyze → Implement**, com **checkpoint de validação humana** entre cada fase. Não se implementa sem `tasks.md` aprovado.
17. A spec é o artefato durável; o código é regenerável a partir dela. Artefatos vivem em `platform/specs/<NN>-<slug>/`.
18. O **Leovio orquestra o Implement** delegando task por task na ordem schema → API → Vue → UI/UX → QA. Um agente especialista nunca edita specs nem skills; isso é do Leovio.

## VI. Estado vivo (grafo)
19. `platform/specs/` é um **vault Obsidian** (schema em `SCHEMA.md`). Guarda **só o que o código não conta**: decisões (por quê), rumos (pra onde), features em obra (status). **Não é espelho do código** — "o que existe" é da skill `platform-contexto` (fronteira de verdade única por pergunta, ver SCHEMA). Só o **Leovio escreve nós**, em cada transição de fase/task.
20. **Orçamento de contexto**: o Leovio lê por turno só `_MOC` + a sprint ativa + os ≤4 nós que ela linka; especialistas leem zero grafo; uma invocação = uma fase. Consistência é **mecânica** (validador na fase Analyze + pre-commit), não disciplina; `status` vive só no nó (nunca duplicado no `_MOC`). Nós `idea`/`planned` sem `issue:` = backlog pra issues em massa.
