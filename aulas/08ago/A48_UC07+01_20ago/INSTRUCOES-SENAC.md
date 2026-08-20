# Instruções de Uso — Neural Slides para Senac

Guia completo para criar aulas do **Técnico em Inteligência Artificial** usando o tema Neural do Slidev.

---

## Índice

1. [Início Rápido](#1-início-rápido)
2. [Estrutura do Repositório](#2-estrutura-do-repositório)
3. [Referência Completa de Frontmatter](#3-referência-completa-de-frontmatter)
4. [Guia de Seleção de Layout](#4-guia-de-seleção-de-layout)
5. [Referência de Componentes](#5-referência-de-componentes)
6. [Metodologia de Aula — Estrutura em Blocos](#6-metodologia-de-aula--estrutura-em-blocos)
7. [Mapa do Curso — UCs por Ano e Trimestre](#7-mapa-do-curso--ucs-por-ano-e-trimestre)
8. [Checklist Pré-publicação](#8-checklist-pré-publicação)
9. [Tags de Slide e Método de Pré-geração](#9-tags-de-slide-e-método-de-pré-geração)

---

## 1. Início Rápido

### Fluxo para uma nova aula

```bash
# 1. Clone este repositório com o nome da aula
git clone <url-deste-repo> aula-NN-nome-do-topico
cd aula-NN-nome-do-topico

# 2. Instale as dependências
npm install

# 3. Edite slides.md com o conteúdo da aula
# (Veja a seção 3 para frontmatter, seção 4 para layouts)

# 4. Inicie o servidor de desenvolvimento
npm run dev

# 5. Exporte para PDF quando estiver pronto
npm run export

# 6. Ou exporte para PowerPoint
npm run export:pptx
```

### Visualizar os layouts disponíveis

```bash
npm run dev:demo
```

Abre o arquivo `slides-demo.md` com um exemplo de cada layout — útil para decidir qual usar antes de criar a aula.

---

## 2. Estrutura do Repositório

```
slidev-theme-neural-template/
│
├── slides.md              ← EDITE ESTE ARQUIVO para criar sua aula
├── slides-demo.md         ← Demo de todos os layouts (não alterar)
├── INSTRUCOES-SENAC.md    ← Este arquivo
├── README.md              ← Visão geral do tema
│
├── package.json           ← Dependências e scripts npm
├── index.ts               ← Configuração do tema (não alterar)
├── tailwind.config.js     ← Configuração Tailwind (não alterar)
├── postcss.config.js      ← Configuração PostCSS (não alterar)
│
├── layouts/               ← 12 layouts disponíveis (não alterar)
│   ├── cover.vue
│   ├── default.vue
│   ├── center.vue
│   ├── end.vue
│   ├── social.vue
│   ├── brainstorm.vue
│   ├── big-img-text.vue
│   ├── two-cols.vue       ← alias de two-cols-text
│   ├── two-cols-text.vue
│   ├── two-cols-img.vue
│   ├── two-cols-img-and-text.vue
│   └── three-cols-img.vue
│
├── components/            ← Componentes reutilizáveis (não alterar)
│   ├── SlideBackground.vue
│   ├── SlideFooter.vue
│   ├── TitleBg.vue
│   ├── MLToast.vue
│   ├── SlideTable.vue
│   ├── SocialLogosClick.vue
│   ├── PixelZoom.vue
│   ├── ZoomImage.vue
│   └── BrazilFlagIcon.vue
│
├── public/
│   ├── assets/
│   │   ├── title-background-complete-nodes.svg  ← SVG da rede neural (core do tema)
│   │   ├── senac-logo.png
│   │   └── features/    ← imagens de features para slides de visão computacional
│   └── icons/           ← ícones de redes sociais (Instagram, TikTok, YouTube, etc.)
│
└── styles/               ← CSS global do tema (não alterar)
    ├── layout.css
    ├── code.css
    └── index.ts
```

> **Regra de ouro:** só altere `slides.md`. Todo o resto é o tema e não deve ser modificado na pasta da aula. Se precisar mudar o tema, faça no repositório `slidev-theme-neural` original.

---

## 3. Referência Completa de Frontmatter

### 3.1 Frontmatter Global (cabeçalho do deck)

Aparece **uma vez** no topo de `slides.md`, dentro do bloco `---` inicial.

```yaml
---
theme: ./                          # OBRIGATÓRIO — não alterar
colorSchema: dark                  # OBRIGATÓRIO — não alterar
title: "Técnico em IA — Aula 03"  # Título da aba/janela do browser
author: Leonardo Zanini            # → rodapé direito
courseTitle: Técnico em Inteligência Artificial  # → rodapé centro
aulaNum: "Aula 03"                 # → rodapé centro  (ex: "Aula 03 e 04")
footerLogo: /assets/senac-logo.png # logo do rodapé (padrão: senac-logo.png)
bgPreset: palette                  # fundo padrão de todos os slides
---
```

### 3.2 Frontmatter por Slide

Cada slide começa com `---` e pode ter suas próprias propriedades.

#### Propriedades universais (funcionam em qualquer layout)

| Propriedade | Tipo | Padrão | Descrição |
|---|---|---|---|
| `layout` | `string` | `"default"` | Nome do layout a usar |
| `bgPreset` | `"default" \| "animate" \| "palette"` | varia por layout | Preset do fundo neural |
| `card` | `boolean` | `false` | Envolve conteúdo em glassmorphism |
| `aulaNum` | `string` | — | Sobrescreve `aulaNum` global neste slide |
| `class` | `string` | — | Classe CSS extra no root do slide |

#### Descrição dos bgPresets

| Preset | Efeito | Quando usar |
|---|---|---|
| `default` | Rede neural estática e sutil | Slides com muito texto/código |
| `animate` | Rede neural pulsando em verde | Slides de conceito, impacto |
| `palette` | Nós coloridos pulsando | Capas, encerramento, brainstorm |

#### Propriedades do layout `center`

| Propriedade | Tipo | Padrão |
|---|---|---|
| `wide` | `boolean` | `false` — alinha à esquerda, fonte maior, para textos longos |

#### Propriedades do layout `end`

| Propriedade | Tipo | Descrição |
|---|---|---|
| `github` | `string` | Handle do GitHub (ex: `LeoZanini`) — gera link automático |
| `avatar` | `string` | URL da foto (ex: `https://github.com/LeoZanini.png?size=256`) |
| `profileUrl` | `string` | URL completa (substitui `github`) |

#### Propriedades do layout `social`

| Propriedade | Tipo | Padrão | Descrição |
|---|---|---|---|
| `platform` | `string` | — | `"Instagram"`, `"TikTok"`, `"YouTube"`, `"Spotify"`, `"ChatGPT"`, `"Python"` |
| `icon` | `string` | — | Caminho para ícone customizado |
| `iconSize` | `string` | `"64px"` | Tamanho do ícone |
| `pulse` | `boolean` | `true` | Pulsar o ícone |
| `pulseDuration` | `number` | `6` | Duração do pulso (segundos) |

#### Propriedades do layout `two-cols-img-and-text`

| Propriedade | Tipo | Padrão |
|---|---|---|
| `imgBorder` | `string` | `"border-sky-400"` — classe Tailwind da borda da imagem |
| `textBorder` | `string` | `"border-green-400"` — classe Tailwind da borda do texto |

#### Propriedades do layout `three-cols-img`

| Propriedade | Tipo | Descrição |
|---|---|---|
| `caption` | `string` | Texto de legenda abaixo das três colunas |

---

## 4. Guia de Seleção de Layout

### Quando usar cada layout

| Layout | Use quando... | Energia |
|---|---|---|
| **cover** | Capa da aula, abertura de bloco temático | Alta |
| **default** | Qualquer slide de conteúdo: lista, código, parágrafo | Neutra |
| **center** | Frase de impacto, pergunta, definição única | Alta |
| **center + wide** | Texto corrido longo (citação, contextualização) | Média |
| **end** | Encerramento da aula | Alta |
| **social** | Apresentar ferramenta/plataforma de redes sociais | Alta |
| **brainstorm** | Pergunta aberta para a turma, ativação inicial | Alta |
| **big-img-text** | Imagem ilustrativa + explicação textual | Média |
| **two-cols-text** | Comparar dois conceitos / antes vs depois | Média |
| **two-cols-img** | Comparar duas imagens (ex: resultado de modelos) | Média |
| **two-cols-img-and-text** | Imagem + lista de características | Média |
| **three-cols-img** | Três etapas de um processo ou pipeline | Média |

### Padrão de bgPreset recomendado por tipo de slide

| Tipo de slide | bgPreset recomendado |
|---|---|
| Capa / Abertura | `palette` |
| Conteúdo técnico (texto denso) | `default` |
| Definição, frase de impacto | `animate` |
| Atividade / brainstorm | `palette` |
| Slides com tabelas ou código | `default` |
| Encerramento | `palette` ou `animate` |

---

## 5. Referência de Componentes

### `MLToast` — Notificação pop-up

Aparece no canto inferior direito quando revelado com `v-click`.

```markdown
<MLToast title="ATENÇÃO">
  Este é um aviso importante que aparece com um clique.
</MLToast>
```

### `SlideTable` — Tabela estilizada

Envolve uma tabela markdown para aplicar o estilo glassmorphism do tema.

```markdown
<SlideTable>

| Coluna A | Coluna B | Coluna C |
|---------|---------|---------|
| Valor 1 | Valor 2 | Valor 3 |

</SlideTable>
```

Propriedades: `compact` (boolean) — reduz padding; `fullWidth` (boolean) — tabela ocupa 100%.

### `SocialLogosClick` — Ícones revelados por clique

```markdown
<SocialLogosClick :icons="[
  { src: '/icons/instagram.svg', alt: 'Instagram' },
  { src: '/icons/yt.svg', alt: 'YouTube' },
  { src: '/icons/chatgpt.svg', alt: 'ChatGPT' }
]" size="80px" />
```

### `PixelZoom` — Zoom pixel-a-pixel

Para slides de visão computacional que mostram como uma imagem é representada numericamente.

```markdown
<PixelZoom
  src="/assets/lola-1.jpg"
  :pixels="[15, 20, 18, 30, 25, 10, 8, 22, 17]"
  :cols="3"
  :rows="3"
  :zoom="300"
  origin="50% 50%"
/>
```

### `ZoomImage` — Animação de zoom

Para revelar detalhes de uma imagem de forma dramática.

```markdown
<ZoomImage
  src="/assets/minha-imagem.jpg"
  :zoomFrom="1"
  :zoomTo="400"
  :duration="8"
  origin="30% 45%"
/>
```

---

## 6. Metodologia de Aula — Estrutura em Blocos

O curso Técnico em IA usa uma estrutura de **blocos pedagógicos** para organizar cada aula. Cada bloco tem um objetivo, duração estimada, nível de energia e layout recomendado.

### Template de aula (formato completo: 4–5 horas)

| # | Bloco | Duração | Objetivo pedagógico | Energia | Layout recomendado |
|---|---|---|---|---|---|
| 1 | **Gancho** | 15–20 min | Conectar com a realidade do aluno; "você já usa isso" | Alta | `brainstorm` ou `center` |
| 2 | **Conceito Central** | 20–30 min | Construir o conceito do tema da aula (intuitivo → formal) | Média-Alta | `default` ou `center` |
| 3 | **Contextualização** | 20–30 min | História, evolução, aplicações reais | Média | `default`, `big-img-text` |
| 4 | **No dia a dia** | 15–20 min | Conexão com vida pessoal dos alunos | Alta | `brainstorm`, `social` |
| ☕ | **Intervalo 1** | 10 min | — | — | — |
| 5 | **Identidade** | 15–20 min | Transição: consumidor → criador de IA | Alta | `center`, `brainstorm` |
| 6 | **Conteúdo Técnico** | 40–60 min | Fundamentos técnicos da UC | Média | `default`, `two-cols-*`, `three-cols-img` |
| ☕ | **Intervalo 2** | 10 min | — | — | — |
| 7 | **Aplicação prática** | 20–30 min | Atividade, exercício, demo ao vivo | Média-Alta | `big-img-text`, `default + card` |
| 8 | **Jornada / Próximos passos** | 10–15 min | Conectar com o restante do curso | Média | `default`, `cover` |
| 9 | **Reflexão** | 15–20 min | Ancorar aprendizados, mentalidade | Média | `center + wide` |
| 10 | **Encerramento** | 10–15 min | Fechamento emocional, motivação | Alta | `end` |

### Template de aula (formato curto: 1–2 horas)

| # | Bloco | Duração | Objetivo |
|---|---|---|---|
| 1 | **Gancho** | 5–10 min | Motivar e conectar |
| 2 | **Conceito** | 20–30 min | Ensinar o conteúdo principal |
| 3 | **Prática / Exemplo** | 20–30 min | Demonstração / exercício |
| 4 | **Fixação** | 10–15 min | Resumo + perguntas |
| 5 | **Encerramento** | 5 min | Próxima aula |

### Princípios pedagógicos do curso

1. **Concreto antes do abstrato** — comece com algo que o aluno já conhece (TikTok, Spotify, Face ID) antes de introduzir a definição técnica.
2. **Participação ativa** — pelo menos uma atividade por bloco (pedir para listar, votar, responder em voz alta).
3. **Progresso visível** — mostre onde estamos no curso e o que está por vir.
4. **Identidade de criador** — a cada aula, reforce que eles serão criadores de IA, não apenas usuários.
5. **Energia variada** — alterne blocos de alta energia com blocos de conteúdo mais denso.

---

## 7. Mapa do Curso — UCs por Ano e Trimestre

### 1º Ano — Total: 400h

> ⚠️ **Todas as UCs são ofertadas de forma concomitante, sem pré-requisitos entre si.** A intensidade (●) é orientativa para planejamento de carga — todas as UCs são avaliáveis em qualquer trimestre.

| UC | Carga Horária | 1º Trim | 2º Trim | 3º Trim |
|---|---|---|---|---|
| Fundamentos e Conceitos de IA | 34h | ●●● | ●● | ● |
| Python para IA | 67h | ●●● | ●●● | ●● |
| Arquitetura de Computadores e GPU | 33h | ●●● | ●● | ● |
| Transformação Digital | 67h | ●● | ●●● | ●●● |
| Banco de Dados | 67h | ●● | ●●● | ●●● |
| Estatística Aplicada à IA | 33h | ●● | ●●● | ●●● |
| Fundamentos de Computação | 34h | ●●● | ●● | ● |
| Inglês Instrumental | 33h | ●● | ●●● | ●● |
| Matemática para Computação | 33h | ●● | ●●● | ●●● |

### Como usar este mapa para planejar

1. **Identifique a UC** que você está ministrando neste encontro.
2. **Consulte o plano de curso** (`context/senac-files/plano-curso-tecnico-em-ia-clean.md`) para a lista completa de competências da UC.
3. **Verifique o trimestre atual** para saber quais tópicos devem ser abordados (`context/senac-files/qc-1ano-tec-ia-por-trimestre.md`).
4. **Preencha o frontmatter** com o `courseTitle` e `aulaNum` corretos.
5. **Monte os blocos** seguindo o template da seção 6.

### Numeração recomendada de aulas

Use o padrão `Aula NN` ou `Aulas NN e MM` no campo `aulaNum`:

```yaml
aulaNum: "Aula 05"         # aula simples
aulaNum: "Aulas 07 e 08"   # aula dupla (4–5 horas)
```

---

## 8. Checklist Pré-publicação

Antes de usar os slides em aula, verifique:

### Frontmatter Global
- [ ] `theme: ./` presente
- [ ] `colorSchema: dark` presente
- [ ] `title` preenchido com nome da aula
- [ ] `author` preenchido com seu nome
- [ ] `courseTitle` correto (`Técnico em Inteligência Artificial`)
- [ ] `aulaNum` correto (ex: `"Aula 03"`)

### Conteúdo
- [ ] Slide de capa (`layout: cover`) com `h1` e `h2` preenchidos
- [ ] Slide de encerramento (`layout: end`) com próximos passos
- [ ] Não há slides com conteúdo de placeholder (Lorem Ipsum, etc.)
- [ ] Todas as imagens locais estão na pasta `public/` do projeto de aula
- [ ] Links externos funcionando

### Técnico
- [ ] `npm run dev` sobe sem erros no terminal
- [ ] Todos os slides renderizam corretamente (sem erros de layout)
- [ ] Testou o `npm run export` e o PDF está correto

### Acessibilidade
- [ ] Imagens têm texto alternativo (`![descrição](url)`)
- [ ] Contraste de texto legível em sala (projetor clareia cores)
- [ ] Nenhum slide usa em-dash (`—`) — substituir por hífen, dois pontos ou vírgula conforme contexto

---

## 9. Tags de Slide e Método de Pré-geração

### 9.1 Tags obrigatórias por slide

Todo slide deve receber uma tag no `estrutura-aula.md` que classifica o tipo de atividade pedagógica. Use sempre uma das tags abaixo:

| Tag | Quando usar |
|---|---|
| `[TEORIA]` | Slide expositivo de conteúdo teórico, definição, história ou comparação |
| `[DEBATE]` | Pergunta aberta sem resposta única; brainstorming coletivo ou reflexão guiada |
| `[EXERCICIO]` | Atividade com produto ou resposta esperada: individual, em dupla ou em grupo |
| `[DINAMICA]` | Atividade interativa, roleplay, jogo, simulação presencial ou dinâmica de grupo |
| `[ATIV AVALIATIVA]` | Atividade com critério de avaliação formal (Kahoot, entrega de arquivo, prova) |
| `[TAREFA DE CASA]` | Atividade para ser realizada fora da aula até o próximo encontro |

**Regras de aplicação:**
- Aparecem no `estrutura-aula.md`, não nos slides em si
- Um slide de debate que inclui exercício é `[DEBATE]` se a pergunta é o foco, ou `[EXERCICIO]` se há entrega
- Slides de divisão de blocos (Parte 4, AULA 01, etc.) recebem `[TEORIA]` por padrão
- Cada aula completa deve conter pelo menos: 1 `[DEBATE]`, 1 `[EXERCICIO]` ou `[DINAMICA]`, e 1 `[TAREFA DE CASA]`

### 9.2 Método de pré-geração — geração do `estrutura-aula.md`

**Antes de criar ou modificar qualquer slide em `slides.md`, o agente DEVE:**

#### Passo 1 — Ler o contexto existente

1. Abrir e ler o `slides.md` completo para mapear o conteúdo atual
2. Ler o arquivo de contexto da UC em `.github/agents/contexto-[slug].md`, se existir
3. Identificar qual seção da aula está sendo requisitada e seu ponto na progressão pedagógica

#### Passo 2 — Gerar o `estrutura-aula.md`

Criar ou atualizar o arquivo `estrutura-aula.md` na raiz da pasta da aula com o seguinte formato:

```markdown
# Estrutura da Aula — Mapeamento Completo
**Arquivo:** `slides.md` | **Última revisão:** YYYY-MM-DD
**Total estimado de slides Slidev:** ~NNN

> Pré-documento de geração. Aprovado antes de alterar `slides.md`.

---

## Legenda de Tags
[tabela de tags conforme seção 9.1]

---

## SECAO N — Nome da Seção
**Slides: ~XX a ~YY** | Tópico principal: descrição breve

| Slide(s) | Título | Tag | Resumo |
|---|---|---|---|
| N | Título do Slide | `[TAG]` | Resumo em 10 a 20 palavras |
```

**Regras do `estrutura-aula.md`:**
- Pares de slides (1/2 e 2/2) podem ser agrupados em uma entrada só
- Numeração é baseada no Slidev (cada bloco frontmatter + conteúdo = 1 slide)
- Deve incluir uma seção "Observacoes e Pendências" ao final com problemas identificados
- Deve incluir resumo quantitativo por tag ao final
- **Nunca modificar `slides.md` antes de o usuário aprovar este documento**

#### Passo 3 — Aguardar aprovação

Apresentar o `estrutura-aula.md` ao usuário e aguardar confirmação explícita antes de:
- Criar novos slides
- Deletar ou reorganizar slides existentes
- Fazer revisão sistemática de conteúdo

#### Passo 4 — Executar as modificações conforme estrutura aprovada

Após aprovação, realizar as mudanças no `slides.md` seguindo as seções, tags e order definidas no `estrutura-aula.md`.

#### Passo 5 — Atualizar o arquivo de contexto da UC

Após as modificações, atualizar o arquivo `.github/agents/contexto-[slug].md` conforme a seção 10 das instruções do agente (Per-Subject Progress Tracking).

### 9.3 Convenções de escrita nos slides

Ao gerar ou revisar o conteúdo de slides, respeite sempre:

- **Nunca usar em-dash (`—`)** em títulos, bullets ou textos dos slides. Substitua por:
  - hífen (`-`) em listas e comparações
  - dois pontos (`:`) em enumerações e títulos
  - vírgula em fluxos de texto natural
- **Nunca usar travessão tipográfico** em contextos que ficam fora do padrão visual do tema
- **Todos os textos dos slides em português (Brasil)** — sem exceção
- Nomes de arquivos e caminhos (`snake_case`) permanecem em inglês

---

## Dicas Rápidas

**Separadores de slide:** use `---` sozinho em uma linha para separar slides.

**Animações por clique:** adicione `v-click` em qualquer elemento HTML:
```html
<p v-click>Este parágrafo aparece no primeiro clique</p>
<ul>
  <li v-click>Este item aparece no segundo clique</li>
  <li v-click>Este no terceiro</li>
</ul>
```

**Destacar linhas de código:**
````markdown
```python {1-2|3|4}
# Linha 1 e 2 destacadas primeiro
x = 10
y = 20
z = x + y   # depois essa
print(z)    # depois essa
```
````

**Imagem com source local:** coloque a imagem em `public/assets/` e referencie como `/assets/minha-imagem.jpg`.

**Apresentação em tela cheia:** pressione `F` no browser durante a apresentação.

**Atalhos durante apresentação:**
- `→` ou `Space` — próximo slide
- `←` — slide anterior
- `D` — modo escuro/claro
- `O` — visão geral de slides
- `P` — modo apresentador (notas + timer)
