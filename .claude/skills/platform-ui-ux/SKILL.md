---
name: platform-ui-ux
description: Sistema visual e padrões de UX do portal da plataforma LMS — tema neural, estados de loading/erro/vazio, componentes de formulário, acessibilidade básica. Use ao desenhar ou revisar qualquer tela.
---

# Skill: UI/UX — Portal da Plataforma LMS

O portal é **dark-only** (sem toggle de tema), mobile-first (375px), tema "neural" definido em `platform/portal/tailwind.config.js`.

---

## Paleta

| Token | Uso |
|---|---|
| `neural-900` | fundo da página |
| `neural-800` | fundo de card |
| `neural-700` | borda de card, divisores |
| `neural-600` | borda de elemento secundário (badge, pílula não-ativa) |
| `neural-accent` (`#22c55e`) | ação primária, estado ativo, foco |
| `white` / `gray-200` | texto principal |
| `gray-400` / `gray-500` | texto secundário/placeholder |
| `red-400` | erro |
| `green-400` | sucesso |
| `yellow-400` | aviso/atenção (ex. badge "Reposição") |

Fontes: `font-sans` (Inter) para texto, `font-mono` (JetBrains Mono) para código, badges numéricos, labels técnicas.

## Padrões de componente

**Card:**
```html
<div class="rounded-2xl border border-neural-600 bg-neural-900/10 p-6">
```
ou (mais opaco, usado em telas admin) `bg-neural-800 border-neural-700`.

**Input/textarea:**
```html
<input class="bg-neural-900 border border-neural-700 rounded-lg px-4 py-2 text-white
              placeholder-gray-500 focus:outline-none focus:border-neural-accent" />
```

**Botão primário:**
```html
<button class="bg-neural-accent text-neural-900 font-semibold rounded-lg px-4 py-2
               hover:opacity-90 disabled:opacity-50 transition">
```

**Botão secundário/texto:**
```html
<button class="text-sm text-gray-400 hover:text-white transition">
```

**Badge/pílula:**
```html
<span class="text-xs px-2 py-0.5 rounded-full bg-neural-600 text-gray-200">
<!-- ativa: bg-neural-accent text-neural-900 font-semibold -->
```

## Estados obrigatórios em toda tela que busca dados

Toda view que faz `fetch` precisa tratar explicitamente os três estados — nunca deixar a tela "em branco" enquanto carrega ou se o fetch falhar:

1. **Loading** — skeleton com `animate-pulse` (blocos `bg-neural-800 rounded-2xl`), nunca spinner genérico nem texto "Carregando..." sozinho se der pra mostrar a forma do conteúdo.
2. **Erro** — `<p class="text-red-400">` com mensagem curta e acionável (não expor erro técnico bruto ao aluno/professor).
3. **Vazio** — `<p class="text-gray-500">` centralizado, mensagem específica ao contexto (ex. "Nenhuma aula disponível ainda", não um genérico "Sem dados").

## Formulários (login, reset de senha, import)

- `autocomplete` correto sempre: `username`, `current-password`, `new-password`, `email`.
- Erro de validação: `<p class="text-red-400 text-sm">` logo abaixo do campo/form, nunca `alert()`/`confirm()` do browser (bloqueiam a extensão de automação e são uma UX ruim).
- Botão de submit: `:disabled` durante o request + label muda pra indicar progresso (`"Entrando..."`, `"Salvando..."`) — nunca permitir duplo submit.
- Sucesso: feedback inline (`text-green-400`, ex. "Salvo!") que some sozinho depois de alguns segundos para ações repetíveis (salvar mensagem), ou navegação/redirect para ações de uma vez (reset de senha concluído).

## Acessibilidade básica (nível pragmático, não WCAG completo)

- `focus-visible:ring-2 focus-visible:ring-neural-accent` em elementos clicáveis customizados (a maioria dos cards usa `<button>` nativo, que já ganha isso).
- `placeholder` não substitui `label` em formulários mais complexos que login — se o campo não é óbvio pelo contexto, considere um `<label>` visível.
- Nunca usar só cor pra indicar estado (ex. badge "dada" vs "planejada" no calendário já usa cor **e** texto).

## Fora de escopo deste projeto (não sugerir sem pedido explícito)

- Modo claro / toggle de tema
- Internacionalização (é sempre pt-BR)
- Animações complexas além de `transition`/`animate-pulse` do Tailwind
- Design system separado (Storybook, tokens em JSON) — a paleta do `tailwind.config.js` já é a fonte da verdade
