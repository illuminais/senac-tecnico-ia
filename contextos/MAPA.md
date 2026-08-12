# Mapa de Contextos — Curso Técnico em IA Senac

> Índice navegável de todos os arquivos em `contextos/`.
> Tool-agnostic: usado por Claude Code, Copilot e pelo professor.
> Atualizar quando novos arquivos forem criados.

---

## Âncoras (ler sempre primeiro)

| Arquivo | O que é | Quando ler |
|---|---|---|
| `../CLAUDE.md` | Instruções do workspace + contexto atual do curso | Todo início de conversa |
| `_schemas.md` | Schemas obrigatórios de todos os arquivos de planejamento | Antes de criar ou editar qualquer arquivo de contexto |

---

## Planejamento de Horários

| Arquivo | O que é | Quando ler |
|---|---|---|
| `roteiro-t2.md` | Visão geral do T2: semanas, UCs, métodos, datas | Planejar uma aula do T2 |
| `semanas/horario-rotacao-t2.md` | Ciclo Sem1/Sem2/Sem3 com HA por UC e calendário semana a semana | Verificar qual UC toca em qual dia |
| `semanas/semana01.md` | Plano operacional detalhado da semana 01 | Produzir ou revisar aulas da semana específica |
| `semanas/semana02.md` | Plano operacional detalhado da semana 02 | Produzir ou revisar aulas da semana específica |
| `semanas/semana03.md` … | Plano operacional das semanas seguintes (gerado por @planejador-mensal) | Produzir ou revisar aulas da semana específica |
| `horarios/06-junho.md` | Aulas A31–A37 · 42 HA | Planejar ou revisar junho |
| `horarios/07-julho.md` | Aulas A38–A43 · 36 HA | Planejar ou revisar julho |
| `horarios/08-agosto.md` | Aulas A44–A51 · 48 HA | Planejar ou revisar agosto |
| `horarios/09-setembro.md` | Aulas A52–A59 · 48 HA (inclui virada T2→T3) | Planejar ou revisar setembro |
| `horarios/10-outubro.md` | Aulas A60–A69 · 60 HA | Planejar ou revisar outubro |
| `horarios/11-novembro.md` | Aulas A70–A76 · 42 HA (feriado 20/11) | Planejar ou revisar novembro |
| `horarios/12-dezembro.md` | Aulas A77–A82 · 36 HA + balanço anual | Planejar ou revisar dezembro |

---

## Memória Viva por UC

> Cada arquivo: frontmatter `ha-dado/ha-restante` · Plano Anual · Log · Última Aula · Feedback de Campo

| Arquivo | UC | HA total |
|---|---|---|
| `contexto-fundamentos-de-computacao.md` | UC01 | 41 |
| `contexto-ingles-instrumental.md` | UC02 | 40 |
| `contexto-fundamentos-matematicos.md` | UC03 | 40 |
| `contexto-fundamentos-e-conceitos-de-ia.md` | UC04 | 40 |
| `contexto-python-para-ia.md` | UC05 | 80 |
| `contexto-arquitetura-computadores-gpu.md` | UC06 | 40 |
| `contexto-transformacao-digital.md` | UC07 | 80 |
| `contexto-banco-de-dados.md` | UC08 | 80 |
| `contexto-estatistica-aplicada.md` | UC09 | 40 |

Ler quando: gerar slides de uma UC · atualizar pós-aula · verificar o que já foi coberto.

---

## Avaliações

| Arquivo | O que é | Quando ler |
|---|---|---|
| `ATIVIDADES_AVALIATIVAS.md` | Plano T1 (av01–av06) + plano T2 (Av01-T2 a Av12-T2) + conta de fechamento de indicadores | Verificar avaliações pendentes, planejar nova av, ou saber quantos indicadores ainda faltam fechar |
| `aval/av01-glossario-ia.md` | AV01 — Glossário IA em inglês (concluída) | Referência de estrutura |
| `aval/av02-pq-gpu-td.md` | AV02 — Por que GPU? + Transformação Digital | Detalhes da av |
| `aval/av03-tokenlab.md` | AV03 — TriaBot TokenLab (aplicada 23/04) | Referência pós-aplicação |
| `aval/av04-python-n2.md` | AV04 — Python N2 | Detalhes da av |
| `aval/av05-sql-pratica.md` | AV05 — SQL prática | Detalhes da av |
| `aval/av06-mini-projeto.md` | AV06 — Mini-projeto final (T1) | Detalhes da av |
| `aval/av05-t2-error-report.md` | **Av05-T2** — Error Report: decodificar traceback em inglês (13/08, UC02) | Detalhes da av |
| `aval/av06-t2-acesso-e-threads.md` | **Av06-T2** — Quem pode o quê: permissões de acesso (UC08) + processos/threads e pipeline de GPU (UC06) · dois atos, 14/08 e 27/08 | Detalhes da av |

---

## Balanço de Horas

| Arquivo | O que é | Quando ler |
|---|---|---|
| `panorama-primeiro-ano-ucs.md` | HA dado vs. meta por UC — snapshot consolidado | Verificar saldo global de horas |
| `relatorio-horas-t1.md` | Dados oficiais Senac do T1 (plano 156 HA, real 114 HA) | Entender déficit do T1 |

---

## Indicadores e Competências

| Arquivo | O que é | Quando ler |
|---|---|---|
| `conteudo-base/plano-curso-geral.md` | Plano de Curso oficial: justificativa, objetivos, perfil profissional, organização curricular (3 anos), sistema de avaliação (menções A/PA/NA, D/ND, AP/RP) | Contexto geral do curso, avaliações, modelagem da plataforma |
| `indicadores.md` | Mapa anual de indicadores do Ano 1 por UC (T1·T2·T3) — cobertura real | Alinhar conteúdo com indicadores curriculares |
| `conteudo-base/distribuicao-trimestral-ano1.md` | Plano oficial Senac: indicadores + HA por trimestre, Ano 1 (Ano 2/3 não têm este detalhamento) | Conferir o que o Senac prevê vs. o que foi de fato dado |
| `indicadores-t2.md` | Indicadores focados no T2 (Ano 1) | Planejar avaliações e slides do T2 |
| `conteudo-base/ucs-elementos-da-competencia.md` | Elementos de competência oficiais das 9 UCs do Ano 1 (indicadores, conhecimentos, habilidades, atitudes) | Referência curricular profunda — Ano 1 |
| `conteudo-base/ucs-elementos-da-competencia-ano2.md` | Elementos de competência oficiais das 7 UCs do Ano 2 | Referência curricular profunda — Ano 2 |
| `conteudo-base/ucs-elementos-da-competencia-ano3.md` | Elementos de competência oficiais das 7 UCs do Ano 3 (incl. Projeto Integrador) | Referência curricular profunda — Ano 3 |
| `conteudo-base/bibliografia-ucs.md` | Bibliografia básica e complementar por UC (3 anos) | Montar referências de aula ou material de apoio |
| `conteudo-base/metodologias-ativas-senac.md` | Resumo das metodologias ativas Senac (transversal) | Escolher método para uma aula |
| `conteudo-base/metodologias-ativas-senac-completo.md` | Versão completa com exemplos e detalhes | Aprofundar uma metodologia específica |
| `conteudo-base/metodologias-ucs-1-ano.md` | Metodologia recomendada por UC no Ano 1 | Planejar sequência pedagógica — Ano 1 |
| `conteudo-base/metodologias-ucs-2-ano.md` | Metodologia recomendada por UC no Ano 2 | Planejar sequência pedagógica — Ano 2 |
| `conteudo-base/metodologias-ucs-3-ano.md` | Metodologia recomendada por UC no Ano 3 | Planejar sequência pedagógica — Ano 3 |

---

## Arquivados

| Arquivo | O que é |
|---|---|
| `arquivados/contexto-calendario.md` | Calendário anterior — substituído por `horarios/` |
| `arquivados/roadmap-t1.md` | Roadmap do T1 — trimestre encerrado |

---

## Misc

| Arquivo | O que é |
|---|---|
| `memoria-editor-tamanho.md` | Memória do agente editor-slides sobre limites de tamanho por layout |
