# Spec: Avaliações por trimestre e indicador + lançamento de nota A/PA/NA

## Contexto / problema

A página de avaliações hoje é uma lista plana de 6 cartões, sem trimestre e sem indicador. Pior: **o dado nem chega no front**. O `parseYaml` do `build-all.mjs` é um parser de linha que não entende lista YAML, então `ucs` cai para `[]` em todas as avaliações — a disciplina nunca foi exibida. E `av04`, `av05` e `av06` têm dois documentos YAML colados no mesmo arquivo, com o último vencendo: aparecem como "Avaliação 04/05/06" em vez do título real, e `status: em-planejamento` vira `published`.

Do lado do professor não existe nada: o acompanhamento de quais indicadores foram avaliados é um markdown mantido à mão (`contextos/indicadores-t2.md`), e não há onde lançar o veredito Senac (**A** atendido · **PA** parcialmente atendido · **NA** não atendido).

Esta spec faz três coisas: sanear o pipeline de metadados, mover a verdade de runtime para o D1, e construir as duas visões — a do aluno (estrutura) e a do professor (cobertura + lançamento de nota).

## Usuários e cenários

- Como **aluno**, quero ver as avaliações agrupadas por trimestre e, dentro de cada uma, quais indicadores e UCs ela cobre, para entender o que está sendo avaliado.
- Como **professor**, quero ver todos os indicadores de um trimestre e quais têm ou não avaliação, para descobrir o buraco de cobertura antes do trimestre fechar.
- Como **professor**, quero abrir uma avaliação e lançar A/PA/NA de todos os alunos em todos os indicadores dela numa tela só, sem 90 cliques.
- Como **professor**, quero exportar o boletim consolidado do trimestre em CSV para fechar nota.

## Decisões que fundam esta spec

| # | Decisão | Por quê |
|---|---|---|
| D1 | **D1 é a verdade em runtime**, semeado a partir de `contextos/indicadores.md` e dos `meta.yaml` | Indicadores são conhecimento invariável do curso; markdown/YAML solto é frágil (esta spec existe por causa disso) |
| D2 | **O seed é o dono do vínculo** avaliação↔indicador; o painel só lê | Zero conflito de dois donos, histórico versionado em git, re-semear é sempre seguro |
| D3 | Nota no grão **(aluno × avaliação × indicador)** | Fiel ao Senac: quem é "atendido" é o indicador. Permite atender UC01.2 e não atender UC02.1 na mesma entrega |
| D4 | Consolidação do boletim = **`max(A > PA > NA)`**, calculada, sem tabela | O indicador foi atendido em algum momento ⇒ está atendido. Premia recuperação |
| D5 | Trimestre é **campo explícito** no `meta.yaml` | `av02` está com `prazo: TBD` — derivar da data não resolve |
| D6 | Lista de alunos = tabela **`users`**, filtrada por `turma_id` (só quem logou **e** pertence à turma) | Escopo enxuto. Consequência aceita, ver Riscos |
| D7 | Aluno **não vê nota** | Fora do escopo desta sprint; modelo já fica pronto pra ligar depois sem migração |
| D8 | **Turma é dimensão própria**, separada de `ano_curso`: `turmas`+`users.turma_id` resolvem qual coorte; `avaliacoes` continua template global (sem ano/turma), `avaliacoes_turma` guarda o que muda por turma (prazo/status de aplicação) | Turmas coexistem sobrepostas — ver [[dec-turma-dimensao]] |
| D9 | **UC vira tabela própria** (`ucs`): nome, `ano_curso`, conhecimentos, habilidades. `indicadores.uc` referencia `ucs.codigo`; conhecimento/habilidade não tem vínculo 1:1 com indicador na fonte oficial, só com a UC inteira | Evita inventar mapeamento indicador↔conhecimento que a fonte não tem, e tira a duplicação de `ano_curso` repetido em cada linha de indicador |

## Requisitos funcionais

### Saneamento (degrau zero)
- RF1: `parseYaml` DEVE entender lista YAML nas duas formas (`[A, B]` inline e `- A` multilinha). Hoje ambas caem para `[]`.
- RF2: `av04`, `av05` e `av06` DEVEM ter um único documento YAML, com o título e o `status` reais.
- RF3: Todo `meta.yaml` DEVE ganhar `trimestre: T1|T2|T3` e `indicadores: [UCxx.N, ...]`.

### Dados
- RF4: O catálogo das 9 UCs (nome, ano_curso, conhecimentos, habilidades) e dos 55 indicadores (código, descrição) DEVE ser semeado de `contextos/conteudo-base/ucs-elementos-da-competencia.md` — fonte oficial, mais completa e mais precisa que o tracker de cobertura.
- RF4b: A distribuição por trimestre de cada indicador DEVE ser semeada de `contextos/conteudo-base/distribuicao-trimestral-ano1.md` (plano oficial Senac), não do tracker de cobertura real (`contextos/indicadores.md`) — este último mede o que **já foi dado**, não o que **deveria** ser avaliado naquele trimestre, e usá-lo faria o painel (RF9) só apontar buraco depois que já é tarde.
- RF5: O seed DEVE ser idempotente (upsert) e NUNCA tocar a tabela `notas`.

### Aluno
- RF6: `GET /api/avaliacoes` (público) DEVE servir do D1 a lista com trimestre, UCs e indicadores já resolvidos (código + descrição), com prazo/status resolvidos pela turma do aluno logado (JWT opcional) quando houver sessão — ver D8 e degrade sensato descrito no plan.md quando não houver.
- RF7: A página do aluno DEVE agrupar por trimestre e, dentro de cada avaliação, listar indicador + UC. NÃO exibe nota.
- RF8: O enunciado (`content.md`) permanece estático no git — só a metadata migra pro D1.

### Professor
- RF9: O painel de um trimestre e turma DEVE listar **todos** os indicadores do mapa curricular daquele **ano do curso** (`ano_curso`, grade fixa por UC), inclusive os **sem avaliação nenhuma**, sinalizados. Essa é a razão de ser da tela.
- RF10: Clicar leva à grade da avaliação **para uma turma**: linhas = alunos de `users` filtrados por `turma_id`, colunas = indicadores daquela avaliação, célula = A/PA/NA.
- RF11: A grade DEVE aceitar teclado (`A`/`P`/`N` + setas) e ter "marcar coluna toda" por indicador.
- RF12: Célula vazia significa **não avaliado** e é distinta de NA. Marcar em lote não pode apagar essa distinção.
- RF13: O boletim de uma turma DEVE mostrar aluno × indicador do trimestre com o veredito consolidado por `max`, e exportar CSV nesse mesmo formato.
- RF14: Um script DEVE regravar `contextos/indicadores-t2.md` a partir do D1, rodado à mão, com o diff revisável no git.

### Turma (D8)
- RF15: Cada turma DEVE ter um registro em `turmas` (`id`, `ano_ingresso`, `status`) semeado de `contextos/turmas.md`; `users` referencia sua turma via `turma_id` (nullable — ver Riscos).
- RF16: `avaliacoes` continua template de currículo (slug/título/tipo/trimestre/status de **conteúdo**) compartilhado por qualquer turma; prazo/status de **aplicação** DEVEM viver só em `avaliacoes_turma` (`turma_id`+`avaliacao_slug`), nunca em `avaliacoes`.
- RF17: Todo endpoint de professor que lista alunos ou notas (painel, grade, boletim) DEVE aceitar um parâmetro de turma explícito, com fallback só quando existir exatamente uma turma ativa (ver plan.md) — nunca mistura alunos de turmas diferentes.
- RF18: Cada UC DEVE mapear para exatamente um `ano_curso` (1, 2 ou 3) — grade fixa do curso, capturada em `ucs.ano_curso` (tabela própria, não mais coluna repetida em `indicadores`).

### Conhecimentos e habilidades (D9)
- RF19: O painel e a grade do professor (`AdminPainelView`, `AdminGradeView`) DEVEM permitir consultar, por indicador exibido, os conhecimentos e habilidades da UC a que ele pertence — trabalhar um indicador exige tocar nesses elementos, mesmo sem mapeamento 1:1 explícito na fonte oficial (indicador↔conhecimento não é rastreado, UC↔conhecimento sim). Exibição sob demanda (expandir/tooltip), não em lista aberta por padrão, pra não poluir a grade.

## Critérios de aceite (verificáveis)

- [ ] CA1: dado `ucs: [UC01, UC02]` inline ou multilinha no `meta.yaml`, quando o build roda, então `avaliacoes.json` traz as duas UCs (hoje traz `[]`).
- [ ] CA2: dado o painel do T2, quando um indicador do mapa curricular não tem nenhuma avaliação, então ele aparece na lista marcado como "sem avaliação".
- [ ] CA3: dado um aluno com PA em `av07/UC05.2` e A em `av09/UC05.2`, quando abro o boletim do T2, então UC05.2 mostra **A**.
- [ ] CA4: dado que marquei "todos A" numa coluna, quando um aluno não foi avaliado em outra coluna, então a outra continua vazia — nunca vira NA implícito.
- [ ] CA5: dado que rodei o seed duas vezes seguidas, quando comparo o banco, então indicadores/avaliações/vínculos são idênticos e **nenhuma nota foi perdida**.
- [ ] CA6: dado um aluno logado, quando abre `/avaliacoes`, então vê trimestre → avaliação → indicador + UC, e **nenhum** A/PA/NA em lugar nenhum da tela.
- [ ] CA7: dado um nome de aluno com vírgula ou aspas, quando exporto o CSV, então o campo sai escapado e as colunas não desalinham.
- [ ] CA8: dado duas turmas ativas simultaneamente (`2026A` em ano2, `2027A` em ano1), quando abro a grade de `av01` filtrando por `2027A`, então só vejo alunos com `users.turma_id = '2027A'` — nunca misturados com `2026A`, mesmo que ambas tenham vínculo com `av01` em `avaliacoes_turma`.
- [ ] CA9: dado um aluno logado da turma `2026A`, quando consulto `GET /api/avaliacoes`, então `prazoLabel`/`status` vêm de `avaliacoes_turma` da linha `(turma_id='2026A', avaliacao_slug=...)` — não de outra turma nem de um valor fixo em `avaliacoes`.
- [ ] CA10: dado o indicador `UC05.2` na grade do professor, quando expando seu contexto, então vejo os conhecimentos e habilidades de `UC05` (não uma lista vazia nem um erro) — mesmo sem vínculo indicador↔conhecimento explícito na fonte.

## Fora de escopo

- Aluno enxergar a própria nota (D7) — modelo pronto, tela não.
- Roster nominal da turma; a lista sai de `users` (D6).
- Log de auditoria das notas — só valor atual + `updated_at`.
- Editar vínculo avaliação↔indicador pela UI (D2 — é seed).
- Agentes de criação de **aula** (fora da plataforma LMS) puxarem conhecimento/habilidade do D1 — eles já leem direto de `contextos/conteudo-base/`, não precisam da API. RF19 é só o lado **admin da plataforma**.
- Atribuir aluno a uma turma via UI quando **mais de uma** turma estiver ativa simultaneamente — nesta sprint, o upsert de login atribui automaticamente à única turma `status='ativa'`; com duas ou mais, `turma_id` fica `NULL` e a atribuição manual é próxima sprint (ver Riscos).
- Prazo/status de aplicação divergente por turma — o seed faz *broadcast* do mesmo prazo do `meta.yaml` pra toda turma ativa (D8); ajustar o prazo de uma turma individual sem mexer nas outras exigiria uma tela ou rota de edição, que não existe ainda.

## Invariantes (candidatos a property test)

- `consolidarNota(vs)`: devolve o máximo em `A > PA > NA`; ordem-invariante; `[]` ⇒ `null`; idempotente (`consolidar([x,x]) === x`).
- `parseIndicadorCodigo('UC05.2')` ⇄ `formatIndicadorCodigo({uc:'UC05',numero:2})` — roundtrip; rejeita malformado sem lançar.
- `toCsvRow(campos)`: qualquer campo com vírgula, aspas ou quebra de linha sobrevive ao roundtrip parse→serialize sem mudar a contagem de colunas.
- Seed idempotente: aplicar N vezes ⇒ mesmo estado de `ucs`/`indicadores`/`avaliacoes`/`avaliacao_indicadores`/`turmas`/`avaliacoes_turma`, e `notas` intacta.
- `parseUcsMd`: cada UC mapeia para **exatamente um** `ano_curso` (nunca dois, nunca nenhum) — grade fixa, D9; toda UC sai com `conhecimentos`/`habilidades` não vazios.
- `parseIndicadoresMd`: todo `indicador.uc` resolve pra uma linha existente em `ucs` (sem indicador órfão).

## Riscos aceitos

- **D6 (só `users`)**: `av04`, `av05` e `av06` são presenciais e não têm entrega digital; nelas a grade mostra só quem já logou, que pode ser menos que a turma real. Atenuante: a sprint 02 tornou o login o caminho da entrega, então `users` tende a convergir pra turma. Se o buraco doer, um roster nominal é a próxima sprint.
- **D8 (atribuição de turma automática só funciona com uma turma ativa)**: o login do aluno atribui `turma_id` automaticamente só quando existe exatamente uma turma `status='ativa'`. No dia em que a segunda turma entrar (esperado só daqui a ~1 ano), esse atalho para de funcionar e a atribuição manual vira necessidade real — aceito porque resolver isso agora seria construir uma tela sem nenhum usuário hoje.
- **D8 (prazo por turma é broadcast, não individual)**: o seed aplica o mesmo prazo/status de aplicação (`avaliacoes_turma`) a todas as turmas ativas a partir do `meta.yaml`. Se o professor precisar de um prazo diferente pra uma turma específica, hoje só dá pra editar direto no D1 à mão — não existe rota/tela pra isso.
