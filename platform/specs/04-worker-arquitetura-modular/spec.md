# Spec: Arquitetura modular do Worker

## Contexto / problema

`platform/worker/src/index.ts` tem 1561 linhas: 24 handlers de rota, ~20 helpers genéricos (JWT, hash de senha, CORS, envio de e-mail, resolução de contexto de turma) e todos os tipos (Env + payloads) declarados no topo do mesmo arquivo. Isso já custou uma sessão inteira de discussão só pra decidir como publicar UMA avaliação nova (`av07`), porque o único endpoint disponível (`/api/admin/seed`) resolve qualquer tabela do currículo pelo formato do payload, e não havia como saber isso sem ler o arquivo inteiro.

O problema não é só do código — é de **instrução**. `.claude/agents/platform-api-worker.md`, `.claude/skills/platform-api-worker/SKILL.md` e `.claude/skills/platform-contexto/SKILL.md` mandavam explicitamente manter tudo num arquivo só. Qualquer agente que lesse essas instruções recriaria o mesmo monólito. Além disso, `.github/agents/` — que o `CLAUDE.md` chama de fonte da verdade — só tinha 1 dos 6 arquivos de plataforma, desatualizado (sem JWT/OAuth/admin panel).

Esta spec cobre as duas frentes: reorganizar o Worker por entidade (sem mudar nenhum comportamento de API) e corrigir as instruções que causaram o monólito, pra que o problema não volte.

## Usuários e cenários

- Como **agente futuro** (Claude ou Copilot) recebendo a tarefa "adiciona rota X", quero encontrar/criar um arquivo pequeno e óbvio pra aquela entidade, sem precisar ler 1500+ linhas de contexto misto primeiro.
- Como **professor**, quero publicar uma avaliação nova sem rodar o resync completo do currículo nem discutir de novo se isso exige um endpoint dedicado.
- Como **`@platform-qa`**, quero um checklist objetivo pra sinalizar quando uma mudança está inchando um arquivo de rota ou criando um endpoint genérico de novo.

## Requisitos funcionais

- RF1: `platform/worker/src/index.ts` DEVE conter só o dispatcher (roteamento path→handler), sem lógica de negócio nem declaração de helper.
- RF2: Cada entidade do domínio (auth, entregas, mensagem do site, calendário, seed, avaliações, turmas, ucs, painel, notas, boletim, grade, sync) DEVE ter seu próprio arquivo em `platform/worker/src/routes/`.
- RF3: Helpers genéricos (JWT, hash/crypto, resposta HTTP/CORS, e-mail, auth, contexto de turma) DEVEM viver em `platform/worker/src/lib/`, um arquivo por responsabilidade.
- RF4: Todos os tipos (`Env` + payloads) DEVEM viver em `platform/worker/src/types.ts`.
- RF5: Nenhuma URL, método HTTP, formato de payload ou resposta DEVE mudar para nenhuma das 24 rotas existentes — este é um refactor puro, não uma feature.
- RF6: DEVE existir `platform/scripts/publish-avaliacao.mjs <slug>` que publica uma única avaliação (payload parcial em `/api/admin/seed`) sem depender do resync completo de `seed-indicadores.mjs`.
- RF7: `platform/specs/constitution.md` DEVE documentar as regras de organização acima como não-negociáveis (feito nesta sessão, ver commit da constitution).
- RF8: `.claude/agents/platform-api-worker.md`, `.claude/skills/platform-api-worker/SKILL.md` e `.claude/skills/platform-contexto/SKILL.md` NÃO DEVEM mais instruir "um único arquivo" — devem descrever a estrutura modular.
- RF9: `.claude/agents/platform-agent.md` (Leovio) e `.claude/agents/platform-qa.md` DEVEM ganhar um item de checklist que verifica a saúde estrutural do Worker antes de aprovar uma mudança.
- RF10: `.github/agents/` DEVE ter os 6 arquivos de plataforma (`platform-agent`, `platform-api-worker`, `platform-schema-d1`, `platform-componentes-vue`, `platform-ui-ux`, `platform-qa`), sincronizados com o conteúdo atualizado dos `.claude/agents/` equivalentes.

## Critérios de aceite (verificáveis)

- [ ] CA1: dado o Worker depois do refactor, quando rodo type-check (`tsc --noEmit` ou equivalente), então não há erro novo.
- [ ] CA2: dado um smoke test manual de login, `GET /api/avaliacoes`, `POST /api/admin/seed` (payload parcial) e `PUT /api/admin/notas`, quando comparo a resposta antes/depois do refactor, então é idêntica.
- [ ] CA3: dado qualquer arquivo novo em `routes/` ou `lib/`, quando conto as linhas, então nenhum passa de ~200 (sinal de que a divisão por entidade não ficou fina o suficiente).
- [ ] CA4: dado `platform/scripts/publish-avaliacao.mjs av07`, quando rodo em modo dry-run (sem `--post`), então o payload gerado contém só `avaliacoes: [av07]` e `avaliacaoIndicadores` do av07 — nada de `ucs`/`indicadores`/`turmas`.
- [ ] CA5: dado o texto atual de `platform-api-worker.md`/SKILL/`platform-contexto`, quando leio depois desta spec, então nenhum trecho instrui "um arquivo só" — todos descrevem `routes/`+`lib/`.
- [ ] CA6: dado `.github/agents/`, quando comparo com `.claude/agents/`, então os 6 arquivos de plataforma existem nos dois lados com conteúdo equivalente.

## Fora de escopo

- Qualquer mudança de schema D1.
- Qualquer feature nova (a única exceção é o script `publish-avaliacao.mjs`, que é puramente uma consequência mecânica da regra "sem endpoint genérico" pra escrita de uma entidade específica, não uma feature de produto).
- Trocar o modelo de auth (continua JWT HS256 + PBKDF2, sem libs externas — constituição §6, inalterada).
- Framework de rotas (Hono/itty-router) — constituição §3 continua vetando dependência npm no Worker.
- Migrar `/api/admin/seed` pra um formato diferente — ele continua como está, só ganha arquivo próprio e uma nota de exceção documentada.

## Invariantes (candidatos a property test)

Não há lógica nova nesta spec além do que já existe (é reorganização de arquivo, não de comportamento) — os property tests já existentes de `platform/shared/pure.ts` continuam cobrindo o que sempre cobriram. Nenhum invariante novo é introduzido.
