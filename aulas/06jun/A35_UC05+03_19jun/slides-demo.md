---
# ─────────────────────────────────────────────────────────
#  DEMO DE LAYOUTS — um exemplo por layout disponível
#  Execute com: npm run dev:demo
# ─────────────────────────────────────────────────────────
theme: ./
title: "Demo de Layouts — Neural Theme"
colorSchema: dark
author: Leonardo Zanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Layout Demo"
bgPreset: palette
---

# 1 — Layout: cover (bgPreset: default)

## Subtítulo da Aula — Contexto e objetivos gerais do encontro

---
layout: cover
bgPreset: animate
---

# 2 — Layout: cover (bgPreset: animate)

## A rede neural pulsa uniformemente em verde neste modo

---
layout: cover
bgPreset: palette
---

# 3 — Layout: cover (bgPreset: palette)

## Nós coloridos com paleta vibrante — ótimo para capas de módulos distintos

---
layout: default
---

# 4 — Layout: default

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

- **Tópico A** — Descrição breve do primeiro item da lista
- **Tópico B** — Consectetur adipiscing elit sed do eiusmod tempor
- **Tópico C** — Ut labore et dolore magna aliqua incididunt
- **Tópico D** — Quis nostrud exercitation ullamco laboris nisi

> Dica: use o layout `default` para qualquer slide com título + lista de tópicos ou código.

---
layout: default
card: true
bgPreset: animate
---

# 5 — Layout: default (card: true)

O modo `card: true` envolve o conteúdo num painel com **glassmorphism**.

- Ideal para slides com poucos itens e destaque visual
- O fundo animado fica mais visível ao redor do card
- Combina bem com `bgPreset: animate` ou `bgPreset: palette`

```python
# Exemplo de código dentro do card
modelo = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])
```

---
layout: center
---

# 6 — Layout: center

**Conteúdo centralizado na tela**

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Use este layout para frases de impacto, perguntas abertas, ou qualquer slide onde o foco é uma única ideia central.

---
layout: center
wide: true
card: true
bgPreset: animate
---

# 7 — Layout: center (wide + card)

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.

Use com `wide: true` para textos mais longos que precisam de boa legibilidade.

---
layout: end
github: LeoZanini
avatar: https://github.com/LeoZanini.png?size=256
bgPreset: animate
---

# 8 — Layout: end

## Até a próxima aula!

Use este layout para encerrar a aula. As props `github` e `avatar` exibem o card de perfil automaticamente.

---
layout: social
platform: Instagram
bgPreset: animate
---

# 9 — Layout: social (Instagram)

- Acesse o perfil **@usuario** para materiais extras
- Stories com resumos de cada aula
- Reels com demonstrações práticas
- Link na bio com todos os recursos do curso

---
layout: social
platform: YouTube
bgPreset: animate
---

# 10 — Layout: social (YouTube)

- Canal com videoaulas complementares
- Playlists organizadas por módulo
- Lives aos sábados para dúvidas ao vivo
- Notificações ativas para não perder novidades

---
layout: brainstorm
bgPreset: palette
---

# 11 — Layout: brainstorm

**O que você já fez hoje que usou Inteligência Artificial?**

- Abriu o celular com reconhecimento facial
- Viu recomendações no YouTube ou TikTok
- Usou corretor automático no WhatsApp
- Procurou algo no Google com sugestão automática

---
layout: big-img-text
---

![Imagem exemplo](https://picsum.photos/seed/neural1/600/450)

::right::

# 12 — Layout: big-img-text

Lorem ipsum dolor sit amet, **consectetur adipiscing elit**. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

- Item A — Ut enim ad minim veniam
- Item B — Quis nostrud exercitation ullamco
- Item C — Laboris nisi ut aliquip ex ea commodo

> A imagem fica à esquerda (30% da largura) e o texto flui à direita. O `h1` do `::right::` é extraído automaticamente para o topo.

---
layout: big-img-text
card: true
bgPreset: animate
---

![Imagem exemplo](https://picsum.photos/seed/neural2/600/450)

::right::

# 13 — Layout: big-img-text (card: true)

Com `card: true`, o conteúdo de texto ganha um painel translúcido.

- Use para destacar informações importantes
- O fundo animado fica visível ao redor
- Combina bem com imagens de alta qualidade

---
layout: two-cols-text
---

# 14 — Layout: two-cols-text

**Coluna Esquerda**

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

- Item 1 — Ut enim ad minim veniam quis nostrud
- Item 2 — Exercitation ullamco laboris nisi ut aliquip
- Item 3 — Commodo consequat duis aute irure dolor

::right::

**Coluna Direita**

Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

- Item A — Excepteur sint occaecat cupidatat non
- Item B — Proident sunt in culpa qui officia deserunt
- Item C — Mollit anim id est laborum consectetur

---
layout: two-cols
bgPreset: animate
---

# 15 — Layout: two-cols (alias de two-cols-text)

**`two-cols` e `two-cols-text` são equivalentes.**

Lado esquerdo com texto mais longo para demonstrar como o layout divide o espaço igualmente entre as duas colunas com um separador visual.

::right::

**Lado direito com conteúdo diferente.**

Sed do eiusmod tempor incididunt ut labore.

```python
x = [1, 2, 3, 4, 5]
media = sum(x) / len(x)
print(f"Média: {media}")
```

---
layout: two-cols-img
---

# 16 — Layout: two-cols-img

![Imagem esquerda — borda azul](https://picsum.photos/seed/left1/640/480)

::right::

![Imagem direita — borda verde](https://picsum.photos/seed/right1/640/480)

::subtitle::

Legenda opcional abaixo das imagens — esquerda vs direita, antes vs depois, etc.

---
layout: two-cols-img-and-text
imgBorder: border-sky-400
textBorder: border-green-400
---

# 17 — Layout: two-cols-img-and-text

![Imagem principal](https://picsum.photos/seed/imgtext1/640/480)

::right::

## Título da Seção Direita

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

- **Detalhe A** — Sed do eiusmod tempor incididunt
- **Detalhe B** — Ut labore et dolore magna aliqua
- **Detalhe C** — Enim ad minim veniam quis nostrud
- **Detalhe D** — Exercitation ullamco laboris nisi

::subtitle::

Imagem à esquerda com bordas personalizáveis via `imgBorder` e `textBorder`.

---
layout: three-cols-img
caption: "Exemplo de três imagens lado a lado com legenda inferior"
bgPreset: palette
---

::header::

# 18 — Layout: three-cols-img

**Comparação / Galeria / Etapas**

---

Coluna 1 — Entrada

![](https://picsum.photos/seed/col1/400/300)

::center::

Coluna 2 — Processamento

![](https://picsum.photos/seed/col2/400/300)

::right::

Coluna 3 — Saída

![](https://picsum.photos/seed/col3/400/300)

---
layout: three-cols-img
card: true
bgPreset: animate
---

::header::

# 19 — Layout: three-cols-img (card: true)

**Três etapas de um pipeline de Machine Learning**

---

Coleta de Dados

![](https://picsum.photos/seed/pipe1/400/300)

::center::

Treinamento do Modelo

![](https://picsum.photos/seed/pipe2/400/300)

::right::

Inferência em Produção

![](https://picsum.photos/seed/pipe3/400/300)

---
layout: default
bgPreset: palette
---

# 20 — Componentes Disponíveis

Além dos layouts, o tema oferece componentes reutilizáveis:

<MLToast title="NOVIDADE">
  Este é o componente **MLToast** — aparece no canto inferior direito com `v-click`.
</MLToast>

- `MLToast` — toast de notificação animado (bottom-right)
- `SlideTable` — tabela centralizada com estilo do tema
- `SocialLogosClick` — linha de ícones sociais revelados por clique
- `PixelZoom` — zoom pixel-by-pixel com overlay de valores
- `ZoomImage` — imagem com zoom animado e controles play/pause

---
layout: default
bgPreset: animate
---

# 21 — SlideTable: Exemplo de Tabela

<SlideTable>

| Algoritmo         | Tipo          | Aplicação             | Precisão |
|-------------------|---------------|-----------------------|----------|
| Regressão Linear  | Supervisionado | Previsão de preços    | ★★★☆☆   |
| Random Forest     | Supervisionado | Classificação         | ★★★★☆   |
| K-Means           | Não supervisionado | Agrupamento      | ★★★☆☆   |
| Redes Neurais     | Supervisionado | Visão computacional   | ★★★★★   |

</SlideTable>

Use `<SlideTable>` para envolver tabelas markdown e aplicar o estilo glassmorphism do tema.

---
layout: end
bgPreset: palette
---

# Fim do Demo

## Abra `INSTRUCOES-SENAC.md` para o guia completo de planejamento de aulas
