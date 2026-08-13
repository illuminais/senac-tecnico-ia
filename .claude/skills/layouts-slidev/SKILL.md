---
name: layouts-slidev
description: Layouts disponíveis, frontmatter de slide, componentes Vue (AdminOnly, MLToast, SlideTable, v-click) e convenções visuais. Use ao escrever qualquer slide.
---
---
name: layouts-slidev
---
# Skill: Layouts Slidev — Técnico em IA

Use esta skill ao escrever ou editar qualquer slide do curso.

---

## Tabela de decisão de layout

| Layout | Usar quando... |
|---|---|
| `cover` | Capa da aula, abertura de bloco temático |
| `default` | Qualquer slide de conteúdo: lista, código, parágrafo |
| `code-output` | Código em cima e a saída dele embaixo: erro, traceback, resultado no terminal |
| `center` | Frase de impacto, pergunta única, definição curta |
| `center` + `wide: true` | Texto corrido longo: citação, contextualização |
| `brainstorm` | Pergunta aberta para a turma, ativação inicial, debate |
| `big-img-text` | Imagem ilustrativa + explicação textual |
| `two-cols-text` | Comparar dois conceitos, antes vs depois |
| `two-cols-img` | Comparar duas imagens |
| `two-cols-img-and-text` | Imagem + lista de características |
| `three-cols-img` | Três etapas de processo ou pipeline |
| `end` | Encerramento da aula (sempre o último slide) |
| `social` | Apresentar ferramenta ou plataforma externa |

---

## bgPreset por tipo de slide

| Tipo de slide | bgPreset |
|---|---|
| Capa / Abertura de bloco | `palette` |
| Teoria (texto denso) | `default` |
| Definição, frase de impacto | `animate` |
| Debate / Brainstorm | `palette` |
| Dinâmica | `palette` |
| Encerramento | `palette` ou `animate` |

---

## Frontmatter global (obrigatório em todo slides.md)

```yaml
---
theme: ./
colorSchema: dark
title: "Técnico em IA — Aula NN"
author: Leonardo Zanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula NN"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "YYYY-MM-DD"
unlockHour: 13
---
```

---

## Frontmatter de slide (por bloco)

```yaml
---
layout: default
card: true
bgPreset: default
aulaNum: "Aula NN"
---
```

---

## Componentes disponíveis

### `AdminOnly` — Gabarito protegido (OBRIGATÓRIO para respostas)

```markdown
<AdminOnly>

**Gabarito:**
```python
# solução aqui
```

</AdminOnly>
```

Só aparece após `unlockHour` da `aulaDate` ou para professor logado. **Nunca coloque gabaritos em `<v-click>`** — v-click é visível ao projetar.

### Layout `code-output` — código em cima, saída embaixo

Para slides que mostram um trecho de código **e** o que ele devolveu (mensagem de erro, traceback, resultado).
Substitui o uso de `two-cols-text` para esse caso: o código fica maior e a saída fica embaixo, num painel próprio.

```markdown
---
layout: code-output
outputLabel: "A mensagem que apareceu"
outputTone: error
---

# C1

```python
def ficha(nome_animal)
    return f"Ficha de {nome_animal}"
```

::output::

```text
SyntaxError: expected ':'
```

::note::

<AdminOnly>

Falta o dois-pontos no fim da linha do `def`.

</AdminOnly>
```

| Prop | Valores | Padrão |
|---|---|---|
| `outputLabel` | qualquer texto, vira o rótulo do painel | `"Saída"` |
| `outputTone` | `error` (borda vermelha) ou `neutral` (borda cinza) | `error` |

Slots: conteúdo principal (título e código), `::output::` (a saída) e `::note::` (gabarito, opcional).

Cada região declara o próprio tamanho de fonte, sem herdar do card. Isso é intencional: foi a herança do pai
que desalinhou os layouts `two-cols`.

### `MLToast` — Aviso com clique

```markdown
<MLToast title="ATENÇÃO">
  Texto do aviso — aparece no clique.
</MLToast>
```

### `SlideTable` — Tabela com glassmorphism

```markdown
<SlideTable>

| Coluna A | Coluna B |
|---------|---------|
| Dado 1  | Dado 2  |

</SlideTable>
```

Props: `compact` (boolean), `fullWidth` (boolean)

### `SocialLogosClick` — Logos clicáveis

```markdown
<SocialLogosClick :icons="[
  { src: '/icons/python.svg', alt: 'Python' }
]" size="80px" />
```

Ícones: `chatgpt.svg`, `instagram.svg`, `python.svg`, `spotify.svg`, `tiktok.svg`, `yt.svg`

### `v-click` — Revelar por clique

```html
<p v-click>Aparece no 1º clique</p>
<li v-click>Item no clique seguinte</li>
```

### Highlight de código com destaque progressivo

````markdown
```python {1-2|3|4}
x = tokens[0]   # destaque 1
y = tokens[1]   # destaque 2
z = x + y       # destaque 3
```
````

### Coluna direita em layouts de duas colunas

```markdown
---
layout: big-img-text
---

<img src="/assets/imagem.jpg" class="w-full rounded-xl" />

::right::

# Título

Conteúdo textual.
```

---

## Comentários obrigatórios nos slides

Cada slide de teoria deve ter um comentário HTML indicando o objetivo pedagógico. O comentário fica **dentro do corpo do slide**, na primeira linha após o frontmatter — **nunca entre dois `---`**:

```markdown
---
layout: default
card: true
bgPreset: default
aulaNum: "Aula NN"
---

<!-- objetivo: aluno consegue identificar a diferença entre supervised e unsupervised learning -->

# Supervised vs Unsupervised Learning
```

---

## Regras de numeração de slides

Cada slide deve ter um comentário de identificação numérica:

```markdown
<!-- SLIDE 4 -->
```

Este comentário fica na primeira linha do corpo, antes do título. Facilita localização cirúrgica via grep.
