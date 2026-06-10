# Referência Técnica — Neural Slides (Senac Técnico em IA)

Fonte única de verdade para layouts, componentes, frontmatter, tags pedagógicas e convenções de escrita. Lida por `@autor-slides`, `@editor-slides` e qualquer agente que precise escrever ou modificar `slides.md`.

**Última atualização:** 2026-03-11

---

## Índice

1. Frontmatter Reference
2. Layout Selection Guide
3. Component Reference
4. UC Structure — 2 Blocks × 3 Classes
5. Pedagogical Methodology
6. Course Map
7. Pre-publish Checklist
8. Syntax Quick Reference
9. Per-Subject Context File Format
10. Slide Tags — Sistema Canônico de 6 Tags
11. Writing Conventions
12. Senac & Course Context

---

## 1. Frontmatter Reference

### 1.1 Global Frontmatter (deck header)

Appears **once** at the top of `slides.md`, inside the opening `---` block.

```yaml
---
theme: ./                          # REQUIRED — do not change
colorSchema: dark                  # REQUIRED — do not change
title: "Técnico em IA — Aula 03"  # browser tab/window title
author: Leonardo Zanini            # → footer right
github: LeoZanini                  # → slide end (profile card) — avatar gerado automaticamente
courseTitle: Técnico em Inteligência Artificial  # → footer center
aulaNum: "Aula 03"                 # → footer left (e.g. "Aula 03" or "Aulas 03 e 04")
footerLogo: /assets/senac-logo.png # footer logo (default: senac-logo.png)
bgPreset: palette                  # default background for all slides
---
```

### 1.2 Per-slide Frontmatter

Each slide starts with `---` and can have its own properties.

#### Universal properties (work on any layout)

| Property | Type | Default | Description |
|---|---|---|---|
| `layout` | `string` | `"default"` | Layout name to use |
| `bgPreset` | `"default" \| "animate" \| "palette"` | varies by layout | Neural background preset |
| `card` | `boolean` | `false` | Wraps content in a glassmorphism card |
| `pulse` | `boolean` | `false` | Enables pulse animation on background |
| `pulseDuration` | `number` | `6` | Pulse duration in seconds |
| `aulaNum` | `string` | — | Overrides global `aulaNum` for this slide |
| `class` | `string` | — | Extra CSS class on the slide root |

#### bgPreset descriptions

| Preset | Effect | When to use |
|---|---|---|
| `default` | Static, subtle neural network | Text-heavy or code slides |
| `animate` | Neural network pulsing in green | Concept definitions, impact statements |
| `palette` | Colorful pulsing nodes | Covers, closings, brainstorming slides |

#### `center` layout properties

| Property | Type | Default |
|---|---|---|
| `wide` | `boolean` | `false` — left-aligned, larger font, for longer text blocks |

#### `end` layout properties

| Property | Type | Description |
|---|---|---|
| `github` | `string` | GitHub handle (e.g. `LeoZanini`) — generates link automatically |
| `avatar` | `string` | Photo URL (e.g. `https://github.com/LeoZanini.png?size=256`) |
| `profileUrl` | `string` | Full URL (overrides `github`) |

#### `social` layout properties

| Property | Type | Default | Description |
|---|---|---|---|
| `platform` | `string` | — | `"Instagram"`, `"TikTok"`, `"YouTube"`, `"Spotify"`, `"ChatGPT"`, `"Python"` |
| `icon` | `string` | — | Path to a custom icon |
| `iconSize` | `string` | `"64px"` | Icon size |
| `pulse` | `boolean` | `true` | Pulse the icon |
| `pulseDuration` | `number` | `6` | Pulse duration in seconds |

#### `two-cols-img-and-text` layout properties

| Property | Type | Default |
|---|---|---|
| `imgBorder` | `string` | `"border-sky-400"` — Tailwind border class for image column |
| `textBorder` | `string` | `"border-green-400"` — Tailwind border class for text column |

#### `three-cols-img` layout properties

| Property | Type | Description |
|---|---|---|
| `caption` | `string` | Caption text shown below the three columns |

---

## 2. Layout Selection Guide

### When to use each layout

| Layout | Use when... | Energy |
|---|---|---|
| **cover** | Lesson cover slide, block opening | High |
| **default** | Any content slide: list, code, paragraph | Neutral |
| **center** | Impact phrase, single question, single definition | High |
| **center + wide** | Long running text (quote, context paragraph) | Medium |
| **end** | Lesson closing | High |
| **social** | Introducing a social platform or AI tool | High |
| **brainstorm** | Open question for the class, warm-up activation | High |
| **big-img-text** | Illustrative image + textual explanation side by side | Medium |
| **two-cols-text** | Comparing two concepts / before vs after | Medium |
| **two-cols-img** | Comparing two images (e.g. model outputs) | Medium |
| **two-cols-img-and-text** | Image + feature list | Medium |
| **three-cols-img** | Three-step process or visual pipeline | Medium |

### Recommended bgPreset by slide type

| Slide type | Recommended bgPreset |
|---|---|
| Cover / Block opening | `palette` |
| Technical content (dense text) | `default` |
| Definition, impact statement | `animate` |
| Activity / brainstorming | `palette` |
| Tables or code | `default` |
| Closing | `palette` or `animate` |

---

## 3. Component Reference

### `AdminOnly` — Gabarito protegido por horário ⚠️ OBRIGATÓRIO para respostas

**Toda resposta de exercício deve ficar dentro deste componente.** Nunca use `<v-click>` puro para gabaritos — ele expõe a resposta ao projetar os slides para a turma.

O conteúdo fica oculto até `unlockHour` da `aulaDate` (definidos no frontmatter global) **ou** para o professor com cookie `lms_admin_jwt` válido.

```markdown
<AdminOnly>

**Gabarito:**
```python
while hp > 0:
    dano = randint(0, 10)
    hp -= dano
```

</AdminOnly>
```

Frontmatter global que controla o unlock (adicionar no cabeçalho do `slides.md`):
```yaml
aulaDate:   "2026-04-17"   # data da aula no formato YYYY-MM-DD
unlockHour: 13             # hora de liberação em horário local (padrão 13 se omitido)
```

Para unlock por slide específico (opcional), use a prop `unlock`:
```markdown
<AdminOnly unlock="2026-04-17T15:00">
  Gabarito liberado às 15h independente do frontmatter.
</AdminOnly>
```

### `MLToast` — Pop-up notification

Appears in the bottom-right corner when revealed with `v-click`. Content must be in pt-BR.

```markdown
<MLToast title="ATENÇÃO">
  Este é um aviso importante que aparece com um clique.
</MLToast>
```

### `SlideTable` — Styled table

Wraps a markdown table to apply the theme's glassmorphism style. Table headers and data must be in pt-BR.

```markdown
<SlideTable>

| Coluna A | Coluna B | Coluna C |
|---------|---------|---------|
| Valor 1 | Valor 2 | Valor 3 |

</SlideTable>
```

Props: `compact` (boolean) — reduces padding; `fullWidth` (boolean) — table fills full width.

### `SocialLogosClick` — Icons revealed on click

```markdown
<SocialLogosClick :icons="[
  { src: '/icons/instagram.svg', alt: 'Instagram' },
  { src: '/icons/yt.svg', alt: 'YouTube' },
  { src: '/icons/chatgpt.svg', alt: 'ChatGPT' }
]" size="80px" />
```

Available icons in `public/icons/`: `chatgpt.svg`, `instagram.svg`, `python.svg`, `spotify.svg`, `tiktok.svg`, `yt.svg`.

### `PixelZoom` — Pixel-by-pixel zoom

For computer vision slides showing how an image is represented numerically.

```markdown
<PixelZoom
  src="/assets/lola-samples/1.jpeg"
  :pixels="[15, 20, 18, 30, 25, 10, 8, 22, 17]"
  :cols="3"
  :rows="3"
  :zoom="300"
  origin="50% 50%"
/>
```

### `ZoomImage` — Dramatic zoom animation

For revealing image details with a cinematic zoom effect.

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

## 4. UC Structure — 2 Blocks × 3 Classes

Each Curricular Unit (UC) is organized into **2 thematic blocks**, each containing **3 classes**. All slide content must be written in **pt-BR**.

```
UC
├── Bloco 1  ─── Aulas 01, 02, 03
│   ├── Aula 01 — Fundamentos + Referencial Teórico
│   ├── Aula 02 — Aprofundamento + Exercícios Práticos
│   └── Aula 03 — Consolidação + Brainstorming + Atividade para Casa
│
└── Bloco 2  ─── Aulas 04, 05, 06
    ├── Aula 04 — Novo Subtema + Referencial Teórico
    ├── Aula 05 — Aplicações + Exercícios Práticos
    └── Aula 06 — Síntese + Brainstorming + Atividade para Casa
```

### Internal structure of each class

Every class must contain these slide sections in order:

| # | Section | Slide count | Recommended layout | Goal |
|---|---|---|---|---|
| 1 | **Opening / Hook** | 1–3 | `brainstorm` or `center` | Activate prior knowledge; connect to daily life |
| 2 | **Theory** | 4–10 | `default`, `big-img-text`, `two-cols-*` | Present theory anchored in an academic or technical source |
| 3 | **Practical Exercises** | 2–6 | `default` + `card: true` | Apply the concept — individually or in pairs |
| 4 | **Brainstorming / Debate** | 1–2 | `brainstorm` | Collective reflection, consolidation, real-world connection |
| 5 | **Closing** | 1 | `end` or `center` | Next class preview + motivation |

### Theory slide rules

- Each theory slide must have an HTML comment: `<!-- objetivo: aluno compreende X (Autor, Ano) -->`
- Cite authors, researchers, or institutions as content anchors.
- Preferred order: **intuition → concrete example → formal definition**.

### Brainstorming / Debate rules

- Use `layout: brainstorm` with `pulse: true`.
- The central question must be **open-ended** — no single correct answer.
- Include a future connection: how this debate relates to the next class or UC.

### Block separator slide

```markdown
---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

# BLOCO 1
## Fundamentos — Aulas 01 a 03
```

---

## 5. Pedagogical Methodology

### Course principles

1. **Concreto antes do abstrato** — começar com algo que o aluno já usa (TikTok, Face ID, Spotify) antes da definição técnica.
2. **Participação ativa** — ao menos uma atividade de resposta por bloco de slides.
3. **Progresso visível** — mostrar onde estamos no mapa do curso a cada abertura de bloco.
4. **Identidade de criador** — reforçar em cada aula que os alunos serão criadores de IA, não apenas usuários.
5. **Energia variada** — alternar slides de alta energia (brainstorm, impacto) com conteúdo denso.
6. **Referências autorais** — a teoria deve estar ancorada em um autor, instituição ou fonte citável.

### Regras pedagógicas canônicas (aluno ~14 anos, experiência zero)

1. Primeiro exemplo do cotidiano, depois IA — nunca abrir conceito novo com tokens/modelos diretamente.
2. N0 obrigatório: o primeiro exercício de cada sequência é sempre de LEITURA ("o que esse código imprime?").
3. Abstração gradual: concreto → semi-abstrato → abstrato. Nunca o contrário.
4. Repetição estratégica: reintroduzir vocabulário das últimas 2 aulas antes de avançar.
5. Par e grupo: exercícios N3+ podem ser em dupla; N4 sempre em dupla ou trio.
6. Contexto AI/dados: todo exemplo de código deve usar nomes de variáveis relacionados a IA (tokens, modelo, dataset, accuracy).
7. Starter code obrigatório: todo exercício de código inclui a assinatura da função — o aluno nunca começa de um arquivo em branco.

### Full block template (3 classes — ~6 hours)

```
[BLOCK DIVIDER]          → layout: center, pulse: true — "BLOCO N — Título"

CLASS N (1st of block)
  [OPENING]              → brainstorm: "O que você já sabe sobre X?"
  [THEORY 1]             → 4-6 slides, foundational theory with sources
  [THEORY 2]             → 3-4 slides, deeper exploration
  [EXERCISE 01-02]       → level 1-2: recognition and guided execution
  [BRAINSTORM]           → short debate, connection to daily life

CLASS N+1 (2nd of block)
  [ORAL REVIEW]          → 2 slides: recap of previous class without notes
  [ADVANCED THEORY]      → 4-6 slides, more complex concepts
  [EXERCISE 03-05]       → level 2-3: guided and independent application
  [BRAINSTORM]           → debate with real data or case studies

CLASS N+2 (3rd of block — consolidation)
  [REVIEW]               → recap of the full block themes
  [EXERCISE 06-08]       → level 3-5: analysis, synthesis, creation
  [FINAL BRAINSTORM]     → reflection: "o que vai usar profissionalmente?"
  [CLOSING ACTIVITY]     → integrative project or block deliverable
  [CLOSING SLIDE]        → layout: end, next block preview
```

---

## 6. Course Map

### Year 1 — Total: 400h

| UC | Hours | Term 1 | Term 2 | Term 3 |
|---|---|---|---|---|
| Fundamentos e Conceitos de IA | 34h | ●●● | — | — |
| Python para IA | 67h | ●●● | ●● | — |
| Arquitetura de Computadores e GPU | 33h | ●● | ● | — |
| Transformação Digital | 67h | — | ●●● | ●● |
| Banco de Dados | 67h | — | ●●● | ●● |
| Estatística Aplicada à IA | 33h | — | — | ●●● |
| Fundamentos de Computação | 34h | ●● | ● | — |
| Inglês Instrumental | 33h | ● | ●● | ● |
| Matemática para Computação | 33h | — | — | ●●● |

### `aulaNum` numbering convention

```yaml
aulaNum: "Aula 05"         # aula simples
aulaNum: "Aulas 07 e 08"   # aula dupla (4–5 horas)
```

---

## 7. Pre-publish Checklist

### Global Frontmatter
- [ ] `theme: ./` present
- [ ] `colorSchema: dark` present
- [ ] `title` filled with lesson name
- [ ] `author` filled with teacher name
- [ ] `courseTitle: Técnico em Inteligência Artificial`
- [ ] `aulaNum` correct (e.g. `"Aula 03"`)

### Pedagogical Structure (per class)
- [ ] Opening slide com hook ou brainstorm (pt-BR)
- [ ] Theory section com `<!-- objetivo: ... -->` e fontes citadas
- [ ] Exercícios numerados com nível de dificuldade (1–5)
- [ ] Exercícios com caminho de salvamento especificado
- [ ] Slide de brainstorming/debate (`layout: brainstorm`, `pulse: true`)
- [ ] Slide de tarefa de casa (`## Atividade para Casa — Aula NN`)
- [ ] Slide de encerramento (`layout: end` ou `layout: center`)

### Content
- [ ] Nenhum placeholder (Lorem Ipsum, "TODO", conteúdo filler)
- [ ] Todo texto visível em **pt-BR**
- [ ] Imagens locais em `public/assets/` referenciadas como `/assets/...`
- [ ] Ícones usados existem em `public/icons/`

### Technical
- [ ] `npm run dev` starts without errors
- [ ] All slides render correctly

---

## 8. Syntax Quick Reference

### Slide separator

```markdown
---
```

> ⚠️ **GHOST SLIDE — ERRO CRÍTICO:** Em Slidev, qualquer texto entre dois `---` (incluindo comentários HTML) cria um slide vazio extra. **NUNCA coloque `<!-- ... -->` entre separadores `---`.** Comentários devem ficar DENTRO do slide — ou seja, após a linha `---` que fecha o frontmatter do slide.

**✅ CORRETO — comentário DENTRO do slide:**
```markdown
---
layout: default
bgPreset: default
---

<!-- objetivo: aluno compreende X -->

# Título do Slide
conteúdo...
```

**❌ ERRADO — comentário ENTRE separadores (cria ghost slide):**
```markdown
---
<!-- SLIDE N — Título -->   ← PROIBIDO: cria slide vazio
---
layout: default
---
```

### Click animations (`v-click`)

```html
<p v-click>Aparece no 1º clique</p>
<ul>
  <li v-click>Item no 2º clique</li>
  <li v-click>Item no 3º clique</li>
</ul>
```

### Highlight specific code lines

````markdown
```python {1-2|3|4}
x = 10        # destaque 1: linhas 1-2
y = 20
z = x + y     # destaque 2: linha 3
print(z)      # destaque 3: linha 4
```
````

### Local image

```markdown
<img src="/assets/minha-imagem.jpg" class="w-full rounded-xl" />
```

### `::right::` slot (layouts `two-cols-*` and `big-img-text`)

```markdown
---
layout: big-img-text
---

<img src="https://..." class="w-full h-full object-cover rounded-xl" />

::right::

# Título do lado direito

Conteúdo textual do lado direito.
```

### Keyboard shortcuts (presenter)

| Key | Action |
|---|---|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `F` | Full screen |
| `O` | Slide overview |
| `P` | Presenter mode |
| `D` | Toggle dark/light mode |

---

## 9. Per-Subject Context File Format

Context files live in `.github/agents/contexto-[slug-da-disciplina].md`. They are the living memory of what has been taught. **Every agent that generates or edits slide content must read the relevant context file first and update it after.**

### File format

```markdown
# Contexto da Disciplina: [Nome da UC]

**Carga Horária Total:** Xh
**Estrutura:** 2 blocos × 3 aulas
**Última atualização:** YYYY-MM-DD

---

## Aulas Ministradas

| Aula | Bloco | Tópicos Principais | Status |
|---|---|---|---|
| Aula 01 | Bloco 1 | tópico A, tópico B | ✅ Ministrada |
| Aula 02 | Bloco 1 | tópico C | ✅ Ministrada |
| Aula 03 | Bloco 1 | — | 🔄 Em construção |
| Aula 04 | Bloco 2 | — | ⏳ Pendente |

---

## Conceitos Introduzidos

| Conceito | Aula | Nível de Profundidade |
|---|---|---|
| Conceito A | Aula 01 | Introdutório |
| Conceito B | Aula 01 | Intermediário |

---

## Tópicos Pendentes

- [ ] Tópico X
- [ ] Tópico Y

---

## Recomendações para o Próximo Encontro

> O agente preenche esta seção com base no log acima.

---

## Conexões com Outras Disciplinas

| Conceito | Disciplina Relacionada | Observação |
|---|---|---|
| GPU e paralelismo | UC06 | Introduzir na Aula 04 |
```

### Rules

- Never introduce a concept at the same depth it was previously introduced — deepen or apply it.
- If editing two UCs in the same session, update both context files independently.
- `Última atualização` must always reflect the date of the last agent session that modified the file.

---

## 10. Slide Tags — Sistema Canônico de 6 Tags

Tags aparecem em `estrutura-aula.md`, **nunca** nos slides diretamente.

| Tag | Quando usar |
|---|---|
| `[TEORIA]` | Slide expositivo: teoria, definição, histórico, comparação, divisor de bloco |
| `[DEBATE]` | Pergunta aberta sem resposta única; brainstorm coletivo ou reflexão guiada |
| `[EXERCICIO]` | Atividade com produto ou resposta esperada: individual, dupla ou grupo |
| `[DINAMICA]` | Atividade interativa: roleplay, jogo, simulação, dinâmica de grupo |
| `[ATIV AVALIATIVA]` | Atividade com critério formal de avaliação (Kahoot, entrega de arquivo, quiz, prova) |

**Regras:**
- Um slide que debate E tem entregável é `[DEBATE]` se a pergunta aberta é o foco, ou `[EXERCICIO]` se um produto concreto é esperado.
- Slides divisores de bloco (Parte N, AULA NN) são `[TEORIA]`.
- Toda aula completa deve ter ao menos: um `[DEBATE]` e um `[EXERCICIO]` ou `[DINAMICA]`.

---

## 11. Writing Conventions

Enforced by all agents that write or modify slides:

- **Em-dash proibido (`—`)** em títulos, bullets ou corpo de slide. Substituir por:
  - Hífen (`-`) em listas e comparações
  - Dois-pontos (`:`) em enumerações e cabeçalhos
  - Vírgula no fluxo de prosa natural
- **Todo texto visível nos slides é pt-BR** sem exceção.
- Nomes de arquivo e caminhos de código (`snake_case`) permanecem em inglês (convenção de programação).
- **Máx. 2 slides `[TEORIA]` consecutivos** sem um `[EXERCICIO]`, `[DEBATE]` ou `[DINAMICA]` entre eles.

---

## 12. Senac & Course Context

### About Senac

**Senac** (Serviço Nacional de Aprendizagem Comercial) is Brazil's national institution for vocational and professional education in commerce and services, founded in 1946. It operates across all Brazilian states, offering technical courses, graduate programs, and professional qualification programs.

Senac is renowned for its **competency-based pedagogical model**, which structures all curricula around the integration of **knowledge, skills, and attitudes — CHA (Conhecimentos, Habilidades, Atitudes)**. The goal is not content transfer alone, but the development of professional competencies applicable in real contexts.

### The Técnico em Inteligência Artificial Program

The **Técnico em Inteligência Artificial** is a 1-year technical course designed to train students as junior AI practitioners capable of building, deploying, and critically interpreting AI solutions in real business and social contexts.

- **Target audience:** Young adults and career-changers with basic computing literacy
- **Duration:** ~400 hours (Year 1), distributed across 9 Curricular Units (UCs)
- **Outcome:** Graduates able to work with Python, ML pipelines, data, computer vision, NLP, and AI ethics in production environments

### Senac's Core Teaching Methodologies

These methodologies directly shape how every lesson must be structured and what kind of content this agent generates:

#### 1. Competency-Based Education (Educação por Competências)
Each lesson contributes to one or more **competencies** defined for the UC. Content must be framed in terms of what the student will *be able to do*, not just what they will *know*. Every theory block must connect to a tangible professional action.

#### 2. Learning Situation (Situação de Aprendizagem)
The primary learning trigger is a **contextualized problem or scenario** drawn from professional practice. Lessons start with a realistic situation — a company, a dataset, a real tool, a social phenomenon — before introducing theory. This is why every opening slide must ground students in a relatable, concrete context.

#### 3. Active Learning / Student as Protagonist
The student builds knowledge through **doing**. The teacher is a **mediator**, not a transmitter. Slides must include activities, debates, and challenges — not just lecture content. Brainstorming and exercises are not optional extras; they are the core of learning.

#### 4. Progressive Contextualization
Content difficulty escalates across the 6 classes of each UC. Early classes (Aula 01–02) build intuition and foundational vocabulary. Middle classes (Aula 03–04) introduce formal concepts with hands-on application. Late classes (Aula 05–06) demand synthesis, creation, and interdisciplinary connections.

#### 5. Formative Assessment (Avaliação Formativa)
Assessment is **continuous and embedded** in every lesson — not just a final test. Exercises, brainstorming answers, classwork, and homework all serve as formative signals. Content must allow the teacher to assess comprehension in real time during the class.

#### 6. Interdisciplinarity
UCs do not exist in isolation. Python is taught alongside AI Fundamentals. Computer Architecture connects to GPUs in the ML pipeline. When a concept from another UC is touched, reference it explicitly on the slide so students understand the bigger picture.

### Implications for Content Generation

When generating or editing slides, always verify:

- Does the slide **develop a competency** or just transfer information?
- Is the opening **grounded in a real professional or social scenario**?
- Is there at least one **active participation moment** in the class section?
- Does the difficulty **escalate appropriately** for where we are in the UC?
- Are there **cross-UC connections** worth surfacing explicitly?
