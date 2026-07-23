# Spec: Entregas de avaliação (round-trip completo na UI)

## Contexto / problema
O aluno precisa enviar o **link da sua resposta** de uma avaliação (Drive, GitHub, etc.). O Worker já tem `POST /api/entregas` (upsert por `user_id`+`avaliacao_slug`, valida http(s)) e a `AvaliacaoView` já tem um formulário que faz o POST. **Mas o round-trip é cego**: não existe `GET` da entrega atual, então o aluno nunca vê se já enviou, qual link enviou, ou quando — e ao reabrir a avaliação o formulário aparece vazio como se nada tivesse sido enviado. Do ponto de vista do aluno, "não está feito". Esta spec fecha o round-trip: **carregar, exibir estado, e editar** a entrega.

## Usuários e cenários
- Como **aluno logado**, quero ver se já enviei minha resposta desta avaliação (e qual link, quando), para não reenviar por engano.
- Como **aluno logado**, quero **editar** o link que enviei antes do prazo.
- Como **aluno deslogado**, quero ser convidado a entrar para poder enviar.

## Requisitos funcionais
- RF1: O sistema DEVE expor as entregas do **aluno logado** via `GET /api/entregas` (JWT de aluno; `userId` de `payload.sub`), retornando um **mapa indexado por `avaliacaoId`**: `{ [avaliacaoId]: { link, updatedAt } }`. Retorna **só as do próprio caller** — nunca as de outros alunos (indexar por alunoId aqui seria vazamento). O painel agregado por aluno (`{ [alunoId]: ... }`) é endpoint separado do professor, fora desta spec.
- RF2: A `AvaliacaoView` DEVE, ao montar (se logado), carregar a entrega atual e, se existir, pré-preencher o link e mostrar estado "Enviado em <data>".
- RF3: Enviar com uma entrega já existente DEVE **atualizar** (upsert idempotente) — comportamento de "editar", não duplicar.
- RF4: O link DEVE ser validado como `http(s)` no client (feedback imediato) além da validação já existente no Worker (fonte de verdade).
- RF5: Estados obrigatórios: carregando entrega, sem entrega (form vazio), entrega existente (form preenchido + "editar"), enviando, sucesso, erro, deslogado (convite a entrar).

## Comportamento esperado
- Aluno logado abre `/avaliacao/:id`: além do conteúdo markdown, a seção "Enviar resposta" carrega `GET /api/entregas/:id`.
  - Sem entrega (404/vazio): form vazio, botão "Enviar".
  - Com entrega: link pré-preenchido, texto "Enviado em <data formatada>", botão "Atualizar".
- Submeter: valida URL no client → POST → sucesso mostra "Resposta enviada!" e atualiza o "Enviado em" para agora.
- Erro do Worker `link inválido` / `link precisa ser http(s)` → mensagem específica; erro de rede → "Erro de conexão".
- Deslogado: mensagem + link `/entrar` (já existe).

## Critérios de aceite (verificáveis)
- [ ] CA1: dado um aluno que já enviou o link L, quando reabre a avaliação, então o form mostra L pré-preenchido e "Enviado em ...".
- [ ] CA2: dado um aluno sem entrega, quando abre a avaliação, então o form aparece vazio, sem erro, com botão "Enviar".
- [ ] CA3: dado um aluno que edita o link e reenvia, quando o POST volta ok, então o "Enviado em" atualiza e não há entrega duplicada (mesma PK).
- [ ] CA4: dado um link sem esquema (`exemplo.com`) ou `javascript:`, quando o aluno tenta enviar, então o client bloqueia antes do POST com mensagem clara.
- [ ] CA5: a validação de URL do client é uma função pura testável — aceita exatamente o mesmo conjunto que o Worker (`http:`/`https:`), rejeitando o resto (property test).

## Fora de escopo
- Painel do professor pra ver/baixar as entregas da turma (feature futura).
- Prazo/deadline enforcement server-side.
- Anexo de arquivo (só link).

## Invariantes (candidatos a property test)
- `isValidEntregaUrl(s)`: `true` ⇔ `s` parseia como URL com protocolo em `{http, https}`. Consistente com o Worker byte a byte (mesmas entradas aceitas/rejeitadas).
- Idempotência do upsert: enviar o mesmo `(user, avaliacao, link)` N vezes ⇒ uma linha, `link` final = último enviado.
- Round-trip de exibição: para qualquer `updated_at` (epoch), a data formatada é estável e reversível ao mesmo dia (sem off-by-one de fuso no formato exibido).
