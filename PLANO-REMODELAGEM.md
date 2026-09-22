---
schema: plano-remodelagem
criado: 2026-09-17
status: rascunho v1, aguardando decisões do professor (seção 7)
vale-ate: fim do T3 (18/12/2026); depois arquivar em contextos/arquivados/
---

# Plano de remodelagem do repositório — set/2026

> Este arquivo é o documento de trabalho da remodelagem. Cada sessão que mexer na
> remodelagem lê a seção 6 (fases) e marca o que fez. Quando todas as fases fecharem,
> o arquivo vai para `contextos/arquivados/` e o que sobrou de regra vai para o
> `CLAUDE.md`.

## 0. O que motivou (nas palavras do professor, resumidas)

1. A escrita dos slides assume contexto e convenção que nem o autor do plano entende
   depois ("como foi o 408?"). Exercício precisa dizer o que fazer, ponto por ponto,
   com separação visual e textual explícita (EXERCÍCIO 01, a), b), c), uma ação por
   linha) NÂO é necessario todos exercicios terem a) B) C), mas se tiverem, todo subitem tem que estar explicito, e todos os exercícios explicitos no sumario.
2. Os formatos ficaram no `default` centralizado. O aluno tem o deck na própria
   máquina: dá para ter slide-guia no início (objetivo, como vai ser, sumário
   clicável dos exercícios), slides que rolam para baixo em avaliação e exercício
   longo, e cor de borda/título diferente para exercício e avaliação.
3. Todo slide que teve pesquisa ou informação externa e é relevante, mencionar a fonte pequena no rodapé do slide, não rodape do layout, de preferencia em um link, que eles mesmso possam acessar.
4. Cada UC ganha uma concentração de referências bibliográficas pesquisada e
   documentada; o épico da UC no trimestre é desenhado a partir delas, dos
   indicadores e da metodologia, com todos os encontros, cargas e avaliações
   definidos antes de qualquer slide.
5. O fluxo foi construído sobre agentes com contexto próprio e isso não rende. O
   contexto do repositório precisa ser mais rico, menos poluído, sem drift.

Regra que atravessa tudo (aprendida na A55): **ferramenta é meio, indicador é fim.**
Se o aluno vai travar, que trave no objeto da disciplina (SQL em Banco de Dados), não
na ferramenta incidental (Excel em Fundamentos de Computação).

---

## 1. Diagnóstico — o que está no repositório hoje (17/09/2026)

Cada item abaixo foi verificado no repositório nesta data; caminhos e números são os
reais.

### 1.1 A produção roda em subagentes cegos

- `.claude/agents/produtor-aula.md` roda com `model: sonnet`, entrevista o professor
  em dois rounds, grava `plano-aula.md` e delega um "Handoff Card" para
  `autor-slides`, que por sua vez delega para `revisor-aula`, `editor-slides` e
  `auditor-estrutura` (este último nem existe em `.claude/agents/`).
- A regra de budget do `produtor-aula` diz: "NUNCA leia `slides.md` de aulas
  anteriores". Era regra de custo da era Copilot. Efeito hoje: quem escreve o slide
  não sabe o que o aluno viu no encontro anterior, e escreve "como você viu".
- Em Claude Code, um subagente começa frio, não vê a conversa com o professor e
  devolve um resumo. Cada salto da cadeia perde informação. A cadeia atual tem
  quatro saltos entre a resposta do professor e o texto do slide.
- Conclusão: o "assume contexto" é consequência do desenho, não só de estilo. A
  skill `escrita-slides` (criada 15/09) corrige o estilo; não corrige o desenho.

### 1.2 Os arquivos de contexto têm o mesmo vício dos slides

- `CLAUDE.md`, seção "Contexto Atual do Curso": "alguns alunos chegaram nas 408
  linhas". Sessão nova lê isso, trata "408" como fato conhecido, e fala com o
  professor em taquigrafia. O mesmo vício aparece em `contextos/semanas/semana16.md`
  ("a rede v2", "os 5 elementos", "canários").
- O teste do leitor frio da `escrita-slides` vale para o contexto também: **a
  próxima sessão é um leitor frio.** Hoje nenhum arquivo de contexto é escrito
  assim.

### 1.3 O modelo de épicos tem uma semana e nenhuma ferramenta sabe dele

- Épicos entraram em 10/09 (`contextos/roteiro-t3.md`). O schema de planejamento
  (`contextos/_schemas.md`) só conhece `roteiro`, `semana`, `contexto-uc` e
  `ATIVIDADES_AVALIATIVAS`. Não existe arquivo de épico.
- `produtor-aula` lê `roteiro-t2.md` e `contextos/arquivados/contexto-calendario.md`;
  planeja "por UC do dia" (composição de várias UCs), conceito da rotação abandonada.
- `contextos/horarios/` (6 arquivos, jun–dez) e `contextos/semanas/` são artefatos da
  rotação. `panorama-primeiro-ano-ucs.md` está marcado "desatualizado, não usar".
- O roteiro-t3 está inconsistente em A58–A60: épico 2 (UC04) ficou com 10 HA e "fim a
  redefinir", épico 3 (UC03) aparece como "d2/3" em A59 sem d1. Os 5 HA de UC04 que
  estavam em A57 ainda não saíram de lugar nenhum.

### 1.4 Fonte da verdade falsa e leitura obrigatória cara

- `CLAUDE.md` diz que `.github/agents/` é "FONTE DA VERDADE". São 4.998 linhas de
  agentes do Copilot que não roda mais aqui.
- `.github/agents/referencia-tecnica.md` (24 KB) é "leia SEMPRE antes de gerar
  qualquer slide". Sobrepõe as skills `layouts-slidev` e `densidade-slides`.
- 27 agentes em `.claude/agents/` (4.885 linhas): 9 agentes UC + 9 skills UC +
  `gerador-uc` dizem a mesma coisa três vezes; as skills UC apontam para
  `.github/agents/contextos/contexto-*.md`, caminho que não existe.
- `AULAS-DADAS.md` tem 50 KB e A44 a A51 ainda não foram registradas. O passo
  pós-aula é pesado demais para acontecer sempre; quando não acontece, a próxima
  aula repete a anterior (aconteceu na A54 contra a A48).

### 1.5 Formato dos slides

- Uso de layouts no ano: `default` 1.281 · `center` 199 · `brainstorm` 140 · `cover`
  59 · `end` 49 · `big-img-text` 35 · `two-cols` 31 · `two-cols-text` 28 ·
  `code-output` 18 · `two-cols-code` 6 · `three-cols-img` 1. Quatorze layouts no
  tema, três em uso de fato.
- Nenhum slide do ano tem `tipo:`, `fonte:` ou equivalente no frontmatter. As tags
  pedagógicas (`[TEORIA]`, `[EXERCICIO]`) vivem em comentários HTML e só o lint lê.
  O tema não sabe que um slide é exercício, então não pode colori-lo nem listá-lo.
- `SlideFooter.vue` mostra curso, aula, autor, página e tema. Não tem fonte.
- Não existe layout com rolagem; `useOverflowGuard` trata qualquer transbordo como
  erro.
- Slidev 0.49.29. `useNav()` expõe `slides` (array de `SlideRoute` com
  `meta.slide.frontmatter`) e `go(n)`: dá para montar um sumário clicável filtrado
  por `tipo` sem plugin.

### 1.6 Bibliografia existe e é inerte

- `contextos/conteudo-base/bibliografia-ucs.md` tem a lista oficial do Plano de
  Curso (básica e complementar por UC, várias na Biblioteca Digital Senac). Nenhum
  agente, skill ou schema a consome. Nenhum épico ou aula cita capítulo.

---

## 2. Direção — o bloco que vai para o `CLAUDE.md`

Este é o "prompt" refinado. Vai substituir as seções "Como usar com Claude Code" e
"Regras Fundamentais" do `CLAUDE.md`. Texto pronto para colar:

```markdown
## Direção (desde set/2026)

O curso roda em **épicos**: cada UC ocupa um bloco contínuo do trimestre, com um
objetivo majoritário e um fio condutor, e fecha com avaliação isolada da UC, recuperação
e menção. UCs mais fundamentais vêm antes; multidisciplinaridade entra como pedaço de
conteúdo, nunca como avaliação compartilhada.

Todo épico nasce de três coisas, nesta ordem: **referências bibliográficas** pesquisadas
e documentadas para a UC (`contextos/referencias/uc{NN}.md`), **indicadores e
metodologia** do trimestre (`contextos/indicadores.md`, `conteudo-base/`), e a
**memória do que a turma já praticou** (`contextos/contexto-{uc}.md`). O épico
(`contextos/epicos/ep{NN}-uc{NN}.md`) define todos os encontros, cargas horárias e a
avaliação antes de qualquer slide. O encontro só detalha como cumprir o que o épico já
decidiu.

**Ferramenta é meio, indicador é fim.** Cada épico declara sua ferramenta-meio e seu
objeto-fim. Se o como-fazer da ferramenta ameaça dominar a aula, o dado chega pronto e o
aluno interpreta. A avaliação nunca é bloqueada pela ferramenta-meio.

**A escrita é para um leitor frio**: o aluno que faltou, que abriu o deck no meio, que
lê sozinho com o programa aberto ao lado. Isso vale para slides, enunciados e também
para os arquivos de contexto deste repositório, porque a próxima sessão do Claude é um
leitor frio. Nenhum arquivo usa nome, número ou sigla que ele mesmo não explique.
Exercício é `Exercício NN`, itens `a)`, `b)`, `c)`, uma ação verificável por linha,
"Confira" com o resultado observável. Todo slide de conceito e todo exercício com dado
externo traz a fonte no rodapé.

**Quem escreve é a sessão principal**, com as skills carregadas e os arquivos do épico
lidos por inteiro, inclusive o `slides.md` do encontro anterior do mesmo épico.
Subagentes servem para duas coisas: o **leitor-frio** (revisa o deck sem nenhum
contexto, simulando o aluno) e **pesquisa de referências** em segundo plano. Não existe
orquestrador, não existe handoff card, não existe agente que escreve slide.

Verificação é determinística antes de ser opinião: `lint-slides` (formato de exercício,
frontmatter, fonte, lista de alerta), `checar-repeticao`, `check-overflow`. Só depois o
leitor-frio, e só depois o professor.
```

---

## 3. Princípios de desenho (decisões que o plano assume)

| # | Princípio | Por que | O que muda na prática |
|---|---|---|---|
| P1 | Épico é a unidade de planejamento; encontro é a unidade de execução | O trimestre virou blocos por UC em 10/09 | Nasce `epico`, morre `semana` |
| P2 | Referências antes do épico, épico antes do encontro, encontro antes do slide | "O épico macro sempre tem que ser planejado e fundamentado antes" | Ninguém abre `slides.md` sem `epico-*.md` aprovado |
| P3 | Sessão principal escreve; subagente só lê frio ou pesquisa | Subagente começa sem contexto e devolve resumo; escrever precisa de contexto inteiro | Morrem produtor, autor, editor, gerador; nasce leitor-frio |
| P4 | Leitor frio para slide e para contexto | O "408" veio do CLAUDE.md, não do slide | ESTADO.md com schema e regra de escrita |
| P5 | Convenção que o tema não enxerga não existe | Tag em comentário HTML não colore slide nem entra em sumário | `tipo:` e `fonte:` no frontmatter, layouts que os leem |
| P6 | Lint pega o barato; leitor-frio pega o caro; professor decide | Token gasto em verificação humana do que uma regex pega é desperdício | Regras novas no lint antes de agente novo |
| P7 | Nada de retrofit em A01–A57 | 47 aulas dadas; o custo não volta como aprendizado | Novo modelo vale de A58 em diante |
| P8 | Pós-aula em 5 minutos ou não acontece | A44–A51 sem registro; A54 repetiu A48 | Checklist curto na sessão principal, não agente |
| P9 | Skill curta é lida; skill longa é folheada | `referencia-tecnica.md` de 24 KB "obrigatório" | Cada skill ≤ 250 linhas; o resto vira arquivo referenciado |
| P10 | Plataforma (LMS) fica fora deste plano | Já tem plano próprio fechado em 14/08 (desacoplamento) | 6 agentes e 5 skills `platform-*` não são tocados aqui |

---

## 4. Arquitetura-alvo

### 4.1 Camadas e artefatos

```
Fundação por UC      contextos/referencias/uc{NN}.md        pesquisada 1x por UC, revisada por trimestre
      ↓
Épico                contextos/epicos/ep{NN}-uc{NN}.md      1 por UC por trimestre; encontros, HA, avaliação
      ↓
Encontro             aulas/{mm}{mmm}/A{NN}_UC{NN}_{dd}{mmm}/plano-aula.md   tabela de minutos + lista de slides
      ↓
Deck                 .../slides.md                          escrito pela sessão principal
      ↓
Verificação          lint-slides → checar-repeticao → check-overflow → leitor-frio → professor
      ↓
Memória              contextos/contexto-{uc}.md (praticado) · contextos/ESTADO.md (volátil) · AULAS-DADAS.md (log)
```

Leitura mínima para planejar um encontro, no modelo novo: `CLAUDE.md` (curto),
`ESTADO.md`, o épico, as referências da UC, a memória da UC, o `slides.md` do encontro
anterior do mesmo épico. Seis arquivos, todos escritos para leitor frio.

### 4.2 Fundação por UC: `contextos/referencias/uc{NN}.md`

O que é: a concentração de referências da UC, com a decisão de uso documentada. Não é
a lista oficial copiada; é a lista oficial **mais** o que foi pesquisado, **com**
justificativa por item.

Schema:

```markdown
---
schema: referencias-uc
uc: UC04
nome: Fundamentos e Conceitos de IA
pesquisado-em: 2026-09-20
revisar-em: início do T1/2027
---

# Referências — UC04 Fundamentos e Conceitos de IA

## Perfil do leitor desta UC
(idade, o que assumir sobre uso de computador, idioma, o que a turma já praticou em
outras UCs que esta usa)

## Critérios de seleção usados
- alinhada aos verbos dos indicadores do trimestre (ver contextos/indicadores.md)
- nível compatível com o perfil acima
- pt-BR de preferência; inglês só quando não há equivalente ou quando a UC é Inglês
- acessível ao aluno (Biblioteca Digital Senac, domínio público, site aberto) ou só ao professor (marcar)
- traz exercício ou caso extraível, não só exposição
- data: o que é de antes de {ano} só entra se for fundamento que não envelhece

## Referências selecionadas

### R1 — AUTOR, Título. Editora, ano. [onde acessar]
- **Serve para:** Indicador 3 (verbo X), encontros 1 e 2
- **Capítulos/páginas:** cap. 2 (pp. 30-58), cap. 4
- **O que dá que as outras não dão:** ...
- **O que falta / cuidado:** ...
- **Exercício ou caso extraível:** ...

### R2 — ...

## Descartadas e por quê
- AUTOR, Título — motivo (nível alto demais / desatualizado / sem acesso / só repete R1)

## Mapa indicador → referência → encontro
| Indicador | Verbo | Referência | Encontro do épico |
|---|---|---|---|
```

Como se constrói (processo, não agente):
1. Ler `conteudo-base/bibliografia-ucs.md` (oficial) e `indicadores.md` da UC.
2. Pesquisa em segundo plano (aqui subagente vale: fan-out de busca por referência
   candidata, sem poluir a sessão principal). A skill `mattpocock-skills:research`
   já faz "investigar contra fontes primárias e gravar Markdown no repo".
3. Sessão principal e professor decidem juntos o que entra. Este é o momento
   "você me ajuda a questionar e achar o caminho": a sessão traz as candidatas com
   prós e contras, o professor escolhe, a justificativa fica escrita.
4. Arquivo gravado. O épico só começa depois.

Primeira UC a receber: UC04 (épico 2, abre 24/09). Depois, na ordem do roteiro.

### 4.3 Épico: `contextos/epicos/ep{NN}-uc{NN}.md`

Substitui `semanas/semana{NN}.md` como unidade de planejamento. Schema:

```markdown
---
schema: epico
epico: 2
uc: UC04
trimestre: T3
abre: A58 (2026-09-24)
fecha: A60 (2026-10-01)
ha-total: 10
indicadores: [3, 4]
avaliacao: Av02-T3
status: planejado | em curso | fechado
---

# Épico 2 — UC04 Fundamentos e Conceitos de IA

## Objetivo majoritário do trimestre para esta UC
(uma frase: o que o aluno sabe fazer no fim que não sabia no começo)

## Fio condutor
(o tema ou caso que atravessa os encontros; não precisa ser explícito para o aluno,
mas todo encontro tem que servir a ele)

## Ferramenta-meio e objeto-fim
- **Objeto-fim** (o que o indicador cobra): ...
- **Ferramenta-meio** (o que o aluno usa para chegar lá): ...
- **Regra de proteção:** se a ferramenta ameaçar dominar, o que chega pronto é: ...

## Referências deste épico
(R1, R3 de referencias/uc04.md; o que cada uma alimenta)

## Pedaços de outras UCs que este épico usa
| UC | Conceito | Foi praticado? (aula, exercício) | Se não foi: o que fazer |
|---|---|---|---|

## Encontros
| Aula | Data | HA | Indicador · verbo | O que o aluno produz | O que este encontro entrega para o próximo | Método | Status |
|---|---|---|---|---|---|---|---|
| A58 | 24/09 | 6 | Ind.3 · identificar | ... | ... | expositivo + lab | planejado |
| A59 | ... | | | | | | |

## Avaliação (isolada desta UC)
- **Instrumento:** ...
- **Quando:** encontro X, com recuperação em Y
- **Rubrica:** contextos/aval/av0N-t3-....md
- **O que a ferramenta-meio NÃO pode bloquear:** ...
- **Canários (detecção de IA/cópia):** ...

## Ordem de corte
(o que cai primeiro se o tempo não fechar; o que não pode cair)

## Registro de mudanças
- 2026-09-20: criado
```

Regra: o épico é aprovado pelo professor antes do primeiro `plano-aula.md`. Mudança
de calendário atualiza o épico primeiro, depois os encontros.

### 4.4 Encontro: `plano-aula.md` na pasta da aula

Continua existindo, mais curto, porque o épico já decidiu o quê. Fica:
- link para o épico e qual linha da tabela de encontros este é
- tabela de minutos (a mesma de `semana16.md`, que funciona)
- lista numerada de slides com `tipo`, título e, para cada exercício, o enunciado
  em rascunho (os itens a), b), c) já aqui, para o professor aprovar antes do slide)
- prep / antes de sair de casa

### 4.5 Produção: fluxo sem orquestrador

```
Professor: "planeja A58"
  Sessão principal lê os seis arquivos da 4.1 (inteiros)
  Carrega skills: planejar-encontro, escrita-slides, layouts-slidev, verbos-indicadores
  Escreve plano-aula.md; apresenta tabela de minutos + esboço dos exercícios
  🛑 professor aprova ou ajusta

Professor: "escreve A58"
  Sessão principal escreve slides.md, bloco a bloco (não UC a UC: o épico é uma UC só)
  Roda: node scripts/lint-slides.mjs · checar-repeticao.mjs · check-overflow.mjs
  Corrige o que o lint apontar
  Spawna leitor-frio (subagente sem contexto) sobre slides.md
  Corrige os buracos que o leitor-frio apontar
  🛑 professor revisa

Professor, depois da aula: "dei A58: ..." (5 linhas)
  Sessão principal carrega pos-aula, atualiza: contexto-uc (praticado), épico (status
  da linha), ESTADO.md, AULAS-DADAS.md; roda balanco-ha.mjs
  Sem agente.
```

Diferença de custo: ler o `slides.md` anterior inteiro custa mais tokens que um
handoff card. É o gasto que volta como qualidade: o texto novo sabe exatamente o que
o aluno viu e com que nome.

### 4.6 Verificação

**Lint (`scripts/lint-slides.mjs`), regras novas:**

| Regra | Severidade | O que pega |
|---|---|---|
| `tipo-obrigatorio` | error | slide sem `tipo:` no frontmatter (valores: `capa`, `guia`, `conceito`, `exercicio`, `avaliacao`, `fecho`) |
| `exercicio-titulo` | error | `tipo: exercicio` sem título `# Exercício NN` (dois dígitos) |
| `exercicio-itens` | error | itens `a)` `b)` `c)` que não começam linha própria; item sem verbo no imperativo na primeira palavra |
| `exercicio-confira` | warn | `tipo: exercicio` sem linha `**Confira:**` |
| `fonte-obrigatoria` | warn → error depois de 2 épicos | `tipo: conceito` ou exercício com dado externo sem `fonte:` |
| `lista-alerta` | warn | ocorrência de qualquer termo da lista de alerta da `escrita-slides` (`como vimos`, `lembra que`, `basta`, `vá no`, `a última linha`, ...) |
| `contexto-assumido` | error | `como vimos`, `como você viu`, `lembra que`, `como já sabe` |
| `layout-scroll-em-conceito` | error | `scroll: true` em slide que não é `exercicio` ou `avaliacao` |

As tags em comentário HTML (`<!-- [EXERCICIO] -->`) deixam de ser lidas: o lint passa
a ler `tipo:`. A regra `consecutive-teoria` passa a contar `tipo: conceito`.

**Leitor-frio (`.claude/agents/leitor-frio.md`)**, o único agente novo:

- Modelo: o mesmo da sessão principal (Opus), não Sonnet: o valor está em julgar.
- Ferramentas: só `Read`. Recebe **um** caminho: o `slides.md`. Proibido ler
  `contextos/`, `plano-aula.md`, épico. Recebe também o perfil do leitor (3 linhas).
- Tarefa: percorrer slide por slide como o aluno que faltou ao encontro anterior e
  abriu o deck agora, e devolver, por slide: (a) o que ele não consegue fazer e por
  quê (termo não definido, número sem endereço, caminho de interface incompleto,
  referência a algo que não está no deck); (b) o que ele entenderia errado; (c) uma
  reescrita sugerida de uma frase, no máximo.
- Saída: lista, sem prosa. A sessão principal corrige; o leitor-frio não edita.
- Quando rodar: depois do lint verde, antes do professor. Pode rodar de novo depois
  das correções, com custo baixo.

**Overflow (`check-overflow.mjs`)**: passa a ignorar slides com `scroll: true`.

**Repetição (`checar-repeticao.mjs`)**: continua igual; passa a ser chamado no fluxo
antes do leitor-frio.

### 4.7 Tema Slidev (`neural-slides-template/`)

Nada aqui muda o visual dos decks já publicados; layouts novos são aditivos.

| Peça | O que é | Detalhe técnico |
|---|---|---|
| `layout: exercicio` | `default` com borda e título na cor de destaque (âmbar dentro da paleta) e rótulo "Exercício · N min" lido de `tempo:` | envolve `default.vue`; classe `.slide-card.exercicio` com `border-color: var(--theme-accent-warm)` |
| `layout: avaliacao` | igual, rótulo "Avaliação", cor um tom mais forte | idem |
| `scroll: true` (frontmatter) | o `.slide-card` ganha `overflow-y: auto` e altura máxima; `useOverflowGuard` desliga nesse slide | só permitido em `exercicio` e `avaliacao` (lint) |
| `layout: guia` | slide de abertura: objetivo do dia, como o dia funciona, `<Sumario />` | conteúdo em markdown + componente |
| `<Sumario tipo="exercicio" />` | lista clicável dos slides com `tipo: exercicio` (título + tempo), navega com `useNav().go(no)` | `useNav().slides` → filtra `meta.slide.frontmatter.tipo` |
| `fonte:` (frontmatter) | rodapé ganha linha de 0.65 rem acima do footer com a fonte | `SlideFooter.vue` já lê `$frontmatter`; adicionar `fonte` |
| `tipo:` (frontmatter) | rótulo pequeno no canto do card ("Conceito", "Exercício 03") | mesmo mecanismo de `aulaNum` |

Regras de uso, para a skill `layouts-slidev`:
- Slide projetado é `conceito`, `guia` ou `fecho`; nunca `scroll: true` (o projetor
  só mostra o topo).
- `exercicio` e `avaliacao` são lidos na máquina do aluno; podem rolar.
- Exportar PDF corta slides com rolagem: o deck é para navegador, o PDF é
  subproduto.
- `guia` é o slide 2 de todo encontro (depois da capa) e pode ser repetido antes do
  bloco de avaliação.

### 4.8 Contexto sem drift

**`CLAUDE.md`**: só regra estável. Meta: ≤ 100 linhas. Conteúdo: a Direção (seção 2),
a estrutura de pastas em 15 linhas, os comandos, e "leia `contextos/ESTADO.md` para
saber onde o curso está". Sai a seção "Contexto Atual do Curso".

**`contextos/ESTADO.md`** (novo, volátil): o que hoje é a seção "Contexto Atual".
Schema fixo: trimestre e modelo · épico em curso (link) · último encontro dado (link
para a pasta) · próximo encontro (link) · pendências com dono e data · saldo de horas
(uma linha, gerada por `balanco-ha.mjs`). Regra de escrita: cada fato se sustenta
sozinho. Não "as 408 linhas"; sim "408 linhas (17 municípios × 12 meses × 2 anos), o
resultado esperado da limpeza do `dengue_pr_bruto.xlsx` no Exercício 05 da A55".
Atualizado pelo passo pós-aula.

**`contextos/contexto-{uc}.md`**: mantém o nome (o `balanco-ha.mjs` escreve nele).
A seção "Conceitos Consolidados (não reintroduzir no mesmo nível)" vira **"Praticado"**
com três colunas: conceito · onde foi praticado (aula e número do exercício) · em que
nível (verbo). Praticou é diferente de ouviu falar; o deck só pode cobrar o que está
nesta tabela.

**`contextos/_schemas.md`**: ganha os schemas de `referencias-uc`, `epico`, `ESTADO`;
o schema `semana` fica marcado como "T2, não usar".

**`AULAS-DADAS.md`**: continua como log append-only. Deixa de ser leitura obrigatória
(o "Praticado" da UC substitui). Débito a pagar: registrar A44 a A51.

**Pós-aula vira skill (`pos-aula`), não agente**: o professor dita 5 linhas na sessão
principal; a skill lista o que atualizar e em que ordem. Precisa de diálogo, então
subagente não serve.

### 4.9 Agentes e skills: o que fica

**Agentes (3):**
- `leitor-frio` (novo) — o revisor sem contexto.
- `revisor-aula` (reescrito, menor) — revisão de conteúdo contra épico, rubrica e
  "Praticado"; roda com contexto de propósito (o oposto do leitor-frio). Opcional por
  encontro; obrigatório em encontro de avaliação.
- `revisor-commit` — mantém, se ainda for usado no pré-commit.

**Skills de produção (6, todas ≤ 250 linhas):**
- `escrita-slides` — sai de `~/.claude/skills/` e entra no repositório; ganha seção
  "Perfil do leitor" por curso (este: adolescente, ~14–17, pode nunca ter usado
  planilha, lê no laboratório). Absorve `estilo-pedagogico`.
- `layouts-slidev` — absorve `densidade-slides`, `memoria-editor-tamanho.md` e o que
  ainda for verdade em `referencia-tecnica.md`; documenta os layouts novos da 4.7.
- `verbos-indicadores` — mantém como está.
- `planejar-epico` (nova) — o schema da 4.3 e, principalmente, **as perguntas que a
  sessão faz ao professor** antes de escrever o épico: qual é o objeto-fim; qual
  ferramenta pode virar obstáculo; o que de outras UCs este épico usa e se foi
  praticado; qual referência ancora cada encontro; o que cai primeiro. É a skill do
  "me ajuda a questionar".
- `planejar-encontro` (nova) — absorve `estrutura-aula`: sequência
  guia → ciclos (conceito → exercício) → avaliação ou fecho; substitui T→E→D→TC, que
  era regra para dia multi-UC.
- `pos-aula` (nova) — o checklist da 4.8.

**Skills que ficam sem mudança**: `grill-me`, `caveman`, `techleadsclub`,
`platform-*` (fora de escopo).

---

## 5. Inventário: morre, muda, nasce

### Morre (git rm; o histórico guarda)

| Caminho | Motivo |
|---|---|
| `.github/` inteiro (4.998 linhas) | Copilot não roda mais; "fonte da verdade" falsa |
| `.copilot-instructions.md` | idem |
| `.claude/agents/produtor-aula.md`, `autor-slides.md`, `autor-exercicios.md`, `editor-slides.md` | escrita passa para a sessão principal |
| `.claude/agents/gerador-uc.md`, `uc01-*.md` … `uc09-*.md` | conhecimento de UC vive em `contextos/` |
| `.claude/agents/planejador-mensal.md`, `planejador-curricular.md`, `planejador-avaliacoes.md` | substituídos por `planejar-epico` (skill) e pelo arquivo de épico |
| `.claude/agents/criar-nova-aula.md` | `scripts/criar-aula.mjs` já faz; agente só embrulha |
| `.claude/agents/atualizador-pos-aula.md` | vira skill `pos-aula` |
| `.claude/skills/uc01-*` … `uc09-*` | apontam para caminho morto; conteúdo vai para `referencias/` e `contexto-*` |
| `.claude/skills/estilo-pedagogico`, `densidade-slides`, `estrutura-aula`, `revisao-conteudo` | absorvidas (ver 4.9) |
| `contextos/horarios/` | planejamento mensal da rotação |
| `contextos/semanas/` | move para `contextos/arquivados/semanas-t2-t3/` (semana15 e 16 são registro do épico 1) |
| `contextos/panorama-primeiro-ano-ucs.md` | marcado "não usar" desde jun |
| `contextos/memoria-editor-tamanho.md` | absorvido por `layouts-slidev` |
| `AULAS-DESENVOLVIMENTO-PROG.md` | tracking por sprint da rotação; o status por encontro fica no épico |

### Muda

| Caminho | Mudança |
|---|---|
| `CLAUDE.md` | encolhe para regras + Direção; estado sai |
| `contextos/MAPA.md` | reescrito para a árvore nova |
| `contextos/_schemas.md` | schemas novos; `semana` deprecado |
| `contextos/contexto-*.md` | seção "Praticado" com aula e exercício |
| `contextos/roteiro-t3.md` | redistribuição dos 5 HA de UC04 (decisão do professor); coluna "Épico" com link |
| `scripts/lint-slides.mjs` | regras da 4.6; lê `tipo:` em vez de comentário |
| `scripts/check-overflow.mjs` | ignora `scroll: true` |
| `scripts/criar-aula.mjs` | gera `plano-aula.md` com o schema da 4.4 e `slides.md` com capa + guia |
| `scripts/balanco-ha.mjs` | também escreve a linha de saldo do `ESTADO.md` |
| `neural-slides-template/` | layouts e componentes da 4.7 |
| `.claude/agents/revisor-aula.md` | encolhe; recebe épico e rubrica; não edita |
| `.claude/skills/layouts-slidev`, `verbos-indicadores` | ver 4.9 |

### Nasce

| Caminho | O que é |
|---|---|
| `contextos/ESTADO.md` | estado volátil, leitor frio |
| `contextos/referencias/uc{NN}.md` | 9 arquivos, um por UC, na ordem dos épicos |
| `contextos/epicos/ep{NN}-uc{NN}.md` | 1 por épico |
| `.claude/agents/leitor-frio.md` | revisor sem contexto |
| `.claude/skills/escrita-slides/`, `planejar-epico/`, `planejar-encontro/`, `pos-aula/` | ver 4.9 |
| `neural-slides-template/layouts/exercicio.vue`, `avaliacao.vue`, `guia.vue` | ver 4.7 |
| `neural-slides-template/components/Sumario.vue` | ver 4.7 |

---

## 6. Fases

O curso não para. Cada fase tem o que precisa estar pronto **antes de qual aula**, e o
que pode esperar.

### Fase 0 — Épico 2 no papel · 18 a 23/09 · antes de A58 (24/09)

Sem mexer em tema, lint ou agentes. Só arquivos de planejamento e o CLAUDE.md.

- [ ] Decidir de onde saem os 5 HA de UC04 e reescrever `roteiro-t3.md` (A58 em
      diante) — decisão do professor, seção 7, item 1
- [ ] `contextos/_schemas.md`: adicionar schemas `referencias-uc`, `epico`, `ESTADO`
- [ ] `contextos/referencias/uc04.md`: pesquisa (subagente em segundo plano) +
      seleção com o professor (sessão principal)
- [ ] `contextos/epicos/ep02-uc04.md`: escrito com a skill `planejar-epico` ainda em
      rascunho (as perguntas da 4.9 feitas na conversa, sem arquivo de skill ainda)
- [ ] `CLAUDE.md`: colar a Direção (seção 2); trocar "FONTE DA VERDADE" por
      "`.github/` está morto, será removido na fase 2"; apontar para este plano
- [ ] `contextos/ESTADO.md` criado com o conteúdo da seção "Contexto Atual",
      reescrito para leitor frio; `CLAUDE.md` passa a apontar para ele
- [ ] A58: `plano-aula.md` e `slides.md` escritos pela sessão principal (fluxo da 4.5)
      com a `escrita-slides` de `~/.claude/skills/`; leitor-frio rodado como subagente
      ad hoc (prompt inline, sem arquivo `.md` ainda); formato de exercício já no
      padrão `Exercício NN` / a) b) c), mesmo sem layout novo
- [ ] Pós-aula de A57 (18/09) e A58 feito na sessão principal, à mão, medindo quanto
      tempo leva (meta: 5 min)

Pronto quando: A58 dada com deck escrito no fluxo novo; épico 2 aprovado; ninguém
precisou abrir `.github/`.

### Fase 1 — Tema e lint · 24/09 a 03/10 · durante épicos 2 e 3

- [ ] Tema: `layout: exercicio`, `avaliacao`, `guia`; `scroll: true`;
      `<Sumario />`; `fonte:` e `tipo:` no rodapé/card. Testar em `npm run theme:dev`
      e num deck real (a avaliação do épico 2 é o primeiro candidato a `scroll`)
- [ ] `lint-slides.mjs`: regras da 4.6; `check-overflow.mjs` ignora `scroll`
- [ ] `escrita-slides` entra no repositório com "Perfil do leitor"; `estilo-pedagogico`
      absorvida e removida
- [ ] `layouts-slidev` reescrita com os layouts novos; `densidade-slides` e
      `memoria-editor-tamanho.md` absorvidas
- [ ] `.claude/agents/leitor-frio.md` criado a partir do prompt que funcionou na fase 0
- [ ] `contextos/referencias/uc03.md` e `epicos/ep03-uc03.md` (UC03 abre logo depois
      de UC04; datas dependem da decisão do item 1 da seção 7)

Pronto quando: um deck do épico 3 usa `guia` + `exercicio` + `fonte` e passa no lint
novo com zero erro.

### Fase 2 — Limpeza de contexto · até 09/10 · fim do épico 4

- [ ] `git rm` de tudo da tabela "Morre" (seção 5), num commit só, com mensagem que
      aponta para este plano
- [ ] `CLAUDE.md` ≤ 100 linhas; `MAPA.md` reescrito
- [ ] `contexto-*.md`: seção "Praticado" nas 9 UCs (a partir de `AULAS-DADAS.md` e dos
      `slides.md`; aqui subagente vale: ler 47 decks e extrair exercícios praticados
      por UC é fan-out de leitura)
- [ ] Registrar A44 a A51 em `AULAS-DADAS.md` (débito)
- [ ] `criar-aula.mjs` gera `plano-aula.md` e `slides.md` já no schema novo
- [ ] `balanco-ha.mjs` escreve a linha de saldo do `ESTADO.md`
- [ ] Skills `planejar-epico`, `planejar-encontro`, `pos-aula` gravadas a partir do
      que foi feito à mão nas fases 0 e 1 (a skill documenta o que já funcionou, não
      o que se imagina)
- [ ] `revisor-aula.md` reescrito
- [ ] `referencias/uc09.md`, `epicos/ep04-uc09.md`

Pronto quando: sessão aberta do zero planeja um encontro lendo os seis arquivos da
4.1 e nada mais; nenhum arquivo do repositório afirma algo falso sobre o repositório.

### Fase 3 — Regime · 10/10 a 18/12 · épicos 5 a 9

Para cada épico, na ordem do roteiro (UC05 → UC08 → UC06 → UC02 → UC07):
- duas semanas antes de abrir: `referencias/uc{NN}.md`
- uma semana antes: `epicos/ep{NN}-uc{NN}.md` aprovado
- ao fechar: retro de três perguntas, gravada no "Registro de mudanças" do épico:
  (1) onde o aluno travou e se era objeto-fim ou ferramenta-meio; (2) que frase ou
  formato de slide gerou dúvida na sala; (3) o que disso vira regra de lint, de
  `escrita-slides` ou de `planejar-epico`

### Fase 4 — Depois do T3

- Este arquivo vai para `contextos/arquivados/`
- Plano de desacoplamento (14/08) segue como está; as decisões dele não são
  reabertas aqui
- Referências e épicos do T1/2027 começam nas férias, na mesma ordem
  "fundamentais primeiro"

---

## 7. Decisões que são do professor

Responder aqui (ou na conversa) destrava a fase 0. Recomendação marcada quando tenho
uma.

1. **Os 5 HA de UC04 perdidos em A57:** saem de qual épico? O `roteiro-t3` já absorveu
   déficit de 13 HA com cortes em UC05 (-3), UC08 (-5) e UC07 (-5). Opções: UC04 fica
   com 10 HA e o épico 2 dura A58 + 4 HA de A59; ou corta de UC07 de novo (já perdeu
   5). Sem recomendação: depende do que o Indicador 3/4 de UC04 exige.
2. **Perfil do leitor do técnico:** `estilo-pedagogico` diz "~14 anos"; a
   `escrita-slides` foi escrita para adulto (curso de Excel). Confirmar idade, e o
   que assumir sobre computador em casa e leitura autônoma. Vai para a seção "Perfil
   do leitor" da skill e de cada `referencias/uc{NN}.md`.
3. **Épico em arquivo próprio (`contextos/epicos/`) ou dentro do `contexto-{uc}.md`?**
   Recomendo arquivo próprio: o contexto da UC atravessa trimestres, o épico não.
4. **T→E→D→TC morre?** Recomendo sim: era regra para dia com 3 UCs. No épico a
   sequência é guia → ciclos conceito→exercício → avaliação/fecho, e a regra "no
   máximo 3 conceitos seguidos sem exercício" continua no lint.
5. **Cor de exercício e avaliação:** âmbar para exercício, laranja para avaliação,
   ambos dentro da paleta do tema (definir os dois hex ao implementar). Ou uma cor só?
6. **`.github/`:** `git rm` (recomendo; está no histórico) ou mover para
   `contextos/arquivados/`?
7. **Referências fora da lista oficial do Senac:** aceitar? Recomendo sim, com a
   oficial como base e cada extra justificado no arquivo.
8. **Plataforma (`platform/`, 6 agentes, 5 skills):** confirmar que fica fora deste
   plano.
9. **`revisor-commit` e o hook de pré-commit:** ainda usa? Se não, morre junto.

---

## 8. Riscos e o que não fazer

- **Fazer tudo antes de A58.** Não dá e não precisa: a fase 0 é papel e um deck.
- **Retrofit de A01–A57.** Não. O custo não volta.
- **Lint como `error` em tudo de uma vez.** `fonte` e `lista-alerta` começam como
  `warn`; sobem para `error` depois de dois épicos com o formato estável.
- **Slide com `scroll` no projetor.** O lint impede em `conceito`; a regra fica na
  skill; se acontecer, o professor vê só o topo.
- **Skill que cresce até virar `referencia-tecnica.md` de novo.** Teto de 250 linhas;
  o que passar vira arquivo referenciado e lido sob demanda.
- **Pós-aula pesado.** Se passar de 5 minutos, o passo é cortado, não o registro.
  A A44–A51 sem registro é o sintoma.
- **Épico escrito pela sessão sem as perguntas.** A skill `planejar-epico` existe
  para forçar o diálogo; um épico "gerado" sem o professor responder as perguntas
  da 4.9 é um `semana16.md` com outro nome.
- **Leitor-frio com contexto.** Se receber `contextos/` ou o plano, deixa de ser
  frio e volta a ser mais um revisor que sabe demais. Ferramenta `Read` e um
  caminho só.

---

## 9. Critérios de pronto da remodelagem (para fechar este arquivo)

- [ ] Uma sessão aberta do zero planeja e escreve um encontro lendo só os seis
      arquivos da 4.1
- [ ] Todo deck de A58 em diante passa no lint novo sem erro; todo exercício está
      no formato `Exercício NN` / a) b) c) / Confira
- [ ] Todo slide `conceito` de A58 em diante tem `fonte:`
- [ ] O leitor-frio devolve zero itens "não sei o que fazer" no último deck de cada
      épico
- [ ] `contextos/referencias/` tem os 9 arquivos; `contextos/epicos/` tem os 9 épicos
      do T3
- [ ] Nenhum arquivo do repositório descreve algo que não existe mais
      (`.github/`, rotação, `semana`, handoff card)
- [ ] `CLAUDE.md` ≤ 100 linhas; `ESTADO.md` atualizado depois de cada encontro
