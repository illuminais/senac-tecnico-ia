---
name: platform-contexto
description: O que é a plataforma LMS (arquitetura, stack, usuários, estado atual) e o que é o projeto Técnico em IA Senac. Use antes de qualquer trabalho em platform/ para entender o sistema completo.
---

# Skill: Contexto da Plataforma LMS — Técnico em IA Senac

Carregue esta skill antes de qualquer tarefa em `platform/`. Ela é a base compartilhada por todos os agentes da plataforma (`Leovio` e seus especialistas).

---

## O projeto

Monorepo Slidev para o **Curso Técnico em Inteligência Artificial do SENAC**: apresentações de aula (`aulas/`) empacotadas numa **plataforma LMS** com portal para os ~30 alunos da turma e um painel para o professor (Leonardo Zanini), com deploy na Cloudflare.

A plataforma (`platform/`) é o produto de software real do repositório — o resto do monorepo é conteúdo pedagógico (Slidev). Trabalhar em `platform/` é trabalho de engenharia de produto, não de conteúdo de aula.

---

## Arquitetura

```
platform/
├── scripts/
│   ├── build-all.mjs        ← builda aulas Slidev published + gera aulas.json/avaliacoes.json
│   ├── create-admin.mjs     ← gera/aplica o admin_users inicial (hash PBKDF2)
│   ├── seed-calendar.mjs    ← popula calendar_days/calendar_blocos a partir de AULAS-DADAS.md
│   └── setup-cloudflare.sh  ← setup interativo de D1 + deploy do Worker
├── portal/                  ← frontend (workspace npm "portal")
│   ├── src/
│   │   ├── App.vue          ← shell: header, nav, banner de mensagem do professor
│   │   ├── main.ts          ← bootstrap Vue + rotas
│   │   ├── views/           ← uma página por rota
│   │   ├── components/      ← peças reutilizáveis entre views
│   │   ├── composables/     ← estado/lógica reativa compartilhada (useXxx)
│   │   └── types/           ← interfaces TS espelhando o schema D1 / payloads da API
│   └── vite.config.ts       ← `emptyOutDir: false` — NUNCA remover (preserva builds Slidev)
├── worker/
│   ├── src/index.ts         ← Cloudflare Worker: toda a API em um arquivo só
│   └── schema.sql           ← schema D1 completo, idempotente (sem migrations)
├── dist/                    ← output do build: portal + cada aula em subpasta
└── wrangler.toml            ← binding D1, vars públicas, comentário dos secrets exigidos
```

### Stack

| Camada | Tecnologia |
|---|---|
| Portal | Vite + Vue 3 (`<script setup lang="ts">`) + vue-router 4 + Tailwind CSS |
| API | Cloudflare Workers — um único arquivo, sem framework, sem dependências externas |
| Banco | Cloudflare D1 (SQLite distribuído), um `schema.sql` idempotente aplicado via `wrangler d1 execute` |
| Deploy | Cloudflare Pages (`platform/dist/`, CI só builda/deploya o Pages — o Worker é deploy manual via `wrangler deploy`) |
| Auth | JWT HS256 via Web Crypto (sem libs) + PBKDF2 para senha + OAuth Google (login-only, nunca cria conta) |
| Email | Resend (link de reset de senha) |

### Usuários

- **Admin (professor)** — login por usuário/senha (`admin_users`, hash PBKDF2) ou Google OAuth (só loga email já cadastrado). Acesso a `/admin` (mensagem do dia) e `/admin/calendario` (import do calendário).
- **Aluno** — sem login. Identificado por um UUID v4 gerado no client e persistido em `localStorage['lms_user_id']` (`useProgress.ts`). Progresso e respostas sincronizam via `POST /api/sync`. A tabela `users` no D1 existe para isso mas hoje não tem endpoint próprio de cadastro.

### Rotas do portal

| Rota | View | Auth |
|---|---|---|
| `/` | `HomeView.vue` — grid de aulas | pública |
| `/aula/:slug` | `AulaView.vue` — iframe fullscreen | pública |
| `/avaliacoes`, `/avaliacao/:id` | lista e detalhe de avaliações | pública |
| `/calendario` | `CalendarioView.vue` — timeline de aulas dadas/planejadas | pública |
| `/admin` | `AdminView.vue` — login + mensagem do professor | JWT |
| `/admin/calendario` | `AdminCalendarioView.vue` — import de dados do calendário | JWT |
| `/admin/esqueci-senha`, `/admin/reset-senha` | fluxo de reset de senha | pública (token no link) |
| `/admin/google-callback` | troca `code` OAuth por JWT | pública (fluxo OAuth) |

### Endpoints do Worker (`platform/worker/src/index.ts`)

| Rota | Método | Auth | Função |
|---|---|---|---|
| `/api/sync` | POST | pública | grava progresso/respostas do aluno |
| `/api/auth/login` | POST | pública | login usuário/senha → JWT |
| `/api/auth/forgot-password` | POST | pública | gera token, envia email via Resend; rate limit por email (`password_reset_attempts`) — máx. 3 envios/hora com backoff progressivo (1min, 2min, depois 1h) |
| `/api/auth/reset-password` | POST | pública (token) | troca senha |
| `/api/auth/google/callback` | POST | pública (code OAuth) | troca `code` por JWT, só para email já em `admin_users` |
| `/api/message` | GET/PUT | GET pública, PUT JWT | mensagem do professor pro banner |
| `/api/calendar` | GET | pública | calendário condensado |
| `/api/calendar/import` | POST | JWT | upsert em lote de `calendar_days`/`calendar_blocos` |
| `/api/calendar/resumo-ha` | GET | pública | soma `calendar_blocos.ha` por UC, bucketizado em T1/T2/T3 (cutoffs 2026-05-14 e 2026-09-04) considerando só dias com `status = 'dada'` |

---

## Regras absolutas (nunca sem confirmação explícita do professor)

- Mudar `status: published` em qualquer `meta.yaml` de aula
- Rodar `wrangler pages deploy` / `wrangler deploy` (produção)
- `git push` ou qualquer operação que afete o remoto
- Deletar arquivos que não sejam temporários/gerados
- `platform/portal/vite.config.ts` com `emptyOutDir: false` — **nunca remover**

## Constraints técnicas conhecidas

- O Worker (`platform/worker/`) **não tem `package.json`/`tsconfig.json` própria** — não é workspace npm, não passa por `vue-tsc`/`tsc`. O bundling é feito pelo `wrangler` (esbuild, transpile-only, sem checagem de tipos). Escreva os tipos corretamente mesmo assim (legibilidade > enforcement), mas não assuma que um erro de tipo vai quebrar o build do Worker.
- O portal (`platform/portal/`) **é** workspace npm e o `npm run build` roda `vue-tsc --noEmit && vite build` — erros de tipo aqui quebram o build de verdade.
- Não há sistema de migrations para D1 — `schema.sql` é um único arquivo idempotente (`CREATE TABLE IF NOT EXISTS`). Mudança de schema = editar esse arquivo e reaplicar.
- CI (`.github/workflows/deploy-platform.yml`) só faz deploy do **Cloudflare Pages** (portal + aulas). O Worker é deploy manual (`wrangler deploy`) — não existe automação pra isso ainda.
