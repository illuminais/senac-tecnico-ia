# Analyze: Avaliações por trimestre e indicador

Cruzamento spec × plan × tasks. Parecer read-only antes do Implement.

> Revisão 2026-07-28 (turma): a "questão aberta" original (seção abaixo) foi **resolvida** pelo professor. Plan/spec/tasks já refletem o modelo de turma — ver [[dec-turma-dimensao]]. Esta revisão não muda os achados 🔴/🟡/🔵 de baixo, que continuam válidos; ela troca só o veredito final e adiciona CA8/CA9 à cobertura.
>
> Revisão 2026-07-28 (D9 — conhecimentos/habilidades): UC virou tabela própria (`ucs`). Fonte do seed trocou de `contextos/indicadores.md` pra `contextos/conteudo-base/ucs-elementos-da-competencia.md` + `distribuicao-trimestral-ano1.md` — mais completa e mais precisa (plano oficial, não tracker de cobertura). O achado 🟡 abaixo sobre trimestre do indicador × trimestre da avaliação **continua valendo** — a fonte melhorou, mas o risco estrutural (meta.yaml declarar um indicador fora do trimestre oficial dele) não desaparece. Adiciona CA10.

## Cobertura (critério → onde é resolvido)

| CA | plan | task | ok |
|---|---|---|---|
| CA1 (parseYaml entende lista) | build/dados | T1 | ✅ |
| CA2 (indicador sem avaliação aparece) | `GET /api/admin/painel` lista do mapa curricular (por `ano_curso`) | T6, T8 | ✅ |
| CA3 (PA + A ⇒ A no boletim) | `consolidarNota` = max | T2, T6, T12 | ✅ |
| CA4 (lote não cria NA implícito) | ausência de linha = não avaliado | T9 | ✅ |
| CA5 (seed 2× preserva notas) | upsert que não toca `notas`, agora incluindo `turmas`/`avaliacoes_turma` | T5, T13 | ⚠ ver achados |
| CA6 (aluno não vê nota) | nenhuma rota de nota exposta ao aluno | T7 | ✅ |
| CA7 (CSV escapa vírgula) | `toCsvRow` puro | T2, T10, T12 | ✅ |
| CA8 (turmas não se misturam na grade) | `users.turma_id` filtra a grade/boletim; `turma` explícito ou fallback só com 1 ativa | T3, T6, T9 | ✅ |
| CA9 (prazo do aluno vem da turma certa) | `GET /api/avaliacoes` resolve `avaliacoes_turma` por `payload.sub` → `turma_id` | T5 | ✅ |
| CA10 (conhecimentos/habilidades da UC no admin) | `GET /api/admin/ucs` + resolução local por `indicador.uc` | T6, T8, T9 | ✅ |

## Achados

- 🔴 **Tamanho.** 13 tasks contra 5 da sprint 02. O pedido original era "não precisa ser muito profundo" e o escopo cresceu depois (CSV, batch, boletim, writeback). Há uma linha de corte natural em **T1–T9**: entrega o saneamento, as duas telas centrais e o lançamento de nota — que é o valor real. T10 (boletim/CSV) e T11 (writeback) são fechamento de trimestre e só doem em novembro. Recomendo tratar como duas fases dentro da sprint, não cortar do escopo.

- 🟡 **Trimestre do indicador × trimestre da avaliação podem discordar.** O painel lista indicadores pelo mapa curricular (`trimestres LIKE '%T2%'`), mas o vínculo vem do `meta.yaml`. Se uma avaliação de T2 declarar um indicador que o mapa marca só como T1, ele não aparece no painel do T2 — some da tela onde você esperaria lançar a nota (aparece no painel do T1, com a avaliação do T2 pendurada, o que é confuso). **Mitigação:** o seed (T4) deve **avisar** nesse cruzamento em vez de aceitar calado. Não bloqueia, mas precisa de log.

- 🟡 **"Seed nunca deleta" é invariante load-bearing.** `notas` tem FK só pra `users(id)`, não pra `avaliacoes(slug)` nem `indicadores(codigo)` — de propósito, senão re-semear brigaria com nota já lançada. O preço é que, se um dia o seed passar a remover uma avaliação, sobram notas órfãs em silêncio. Registrar como comentário no `schema.sql` e manter o seed upsert-only.

- 🟡 **CA5 fora do harness de unidade.** Idempotência do seed e integridade de `notas` só se verificam contra D1 local, como já aconteceu na sprint 02. Está em T13 e depende de você rodar. Não marcar como feito sem rodar.

- 🔵 **`dump-indicadores.mjs` escreve fora de `platform/`** (em `contextos/`). É o único script da plataforma que toca conteúdo pedagógico. Aceitável porque é manual e o diff passa pelo git, mas não pode virar automático nem entrar em hook.

- 🔵 **Duas interfaces `Entrega`** (`types/entregas.ts` camelCase da API, `types/users.ts` snake_case do D1) vão colidir na grade, que cruza aluno + entrega. Renomear a do D1 pra `EntregaRow` durante T9.

- 🟡 **`ALTER TABLE users ADD COLUMN turma_id` é a primeira quebra real de "schema.sql sempre idempotente"** (constituição §5). `users` já existe em produção desde a sprint 01; `CREATE TABLE IF NOT EXISTS` não adiciona coluna a tabela existente. T3 precisa entregar esse `ALTER TABLE` como comando manual documentado (não dentro do arquivo idempotente), e T13 precisa confirmar que nenhum agente o rodou sozinho — é ação de produção, cabe só ao professor (constituição §I.1). Ver plan.md, seção "primeira quebra da promessa".

## Questão resolvida — turma como dimensão separada de ano_curso

**Decisão do professor (não mais aberta):** turmas coexistem sobrepostas (turma nova entra no Ano1 enquanto a anterior já está no Ano2/Ano3), e cada UC pertence a exatamente um ano do curso (grade fixa). O modelo final:

- `turmas` (tabela nova) + `users.turma_id` resolvem **qual coorte** — não `ano` civil, não `slug` com ano embutido.
- `avaliacoes` continua **template de currículo** (slug/título/tipo/trimestre/status de conteúdo), compartilhado por qualquer turma que chegue naquele ponto. `av01` nunca colide entre turmas porque não carrega turma — é conteúdo, não instância.
- `avaliacoes_turma` (tabela nova, PK `turma_id`+`avaliacao_slug`) guarda o que **muda** por turma: prazo, prazo_label, status de aplicação.
- `notas` **não muda de PK**. `user_id` já resolve a ambiguidade: cada aluno pertence a uma única turma, então duas turmas com "av01" nunca colidem em `notas`.
- `ano_curso` é grade fixa por UC (D9: virou coluna de `ucs`, não mais de `indicadores` — ver revisão D9 no topo deste arquivo), capturada de `contextos/conteudo-base/ucs-elementos-da-competencia.md`, separada de `turmas` — são dois eixos diferentes (ano do **currículo** vs. coorte de **alunos**).

Isso descarta a recomendação anterior deste documento (slug com ano embutido, `2026-av01`) — o professor preferiu turma como dimensão de primeira classe a uma convenção de nomenclatura, porque turmas sobrepostas (não um "ano civil novo" por turma) não davam pra resolver só com slug. Detalhe completo, incluindo o ripple em cada endpoint (`/api/avaliacoes`, `painel`, `grade`, `boletim`) e a origem dos dados (`contextos/turmas.md`, `ucs-elementos-da-competencia.md`), está no plan.md revisado.

**Atualização (D9):** a camada de conhecimentos/habilidades que o professor mencionou revisar **entrou nesta sprint**, mas na forma mais simples que a fonte oficial sustenta: texto por UC (tabela `ucs`), sem vínculo 1:1 com indicador. A hierarquia completa competência → habilidade → indicador com `parent` explícito que este documento cogitava **não foi construída** — a fonte oficial (Plano de Curso) não tem esse vínculo granular, só UC↔conhecimento/habilidade. Se essa hierarquia mais fina vier a ser necessária, é sprint futura.

## Veredito

Consistente. Nenhuma contradição entre spec, plan e tasks depois da revisão. Dividida em duas fases nas tasks: **fase 1** (T1–T9, T12, T13) entrega estrutura, turma e lançamento de nota; **fase 2** (T10, T11, T14, T15) entrega o fechamento de trimestre.

**Não bloqueia mais o Implement.** A questão do segundo ano está resolvida (seção acima); o modelo de turma está em plan/spec/tasks, com CA8/CA9 cobrindo a dimensão nova.

**Condições de liberação (inalteradas + 1 nova):** o seed precisa avisar do descasamento de trimestre (achado 2); T13 não fecha sem D1 local (achado 4); T13 precisa confirmar que o `ALTER TABLE` de T3 foi rodado pelo professor, não por um agente (achado novo acima).
