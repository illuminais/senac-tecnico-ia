---
name: platform-vue-conventions
description: Convenções Vue 3 do portal da plataforma LMS — quando extrair componente vs composable, estilo de código, roteamento, estado compartilhado. Use ao criar ou editar qualquer arquivo em platform/portal/src/.
---

# Skill: Convenções Vue — Portal da Plataforma LMS

Convenções observadas e a seguir em `platform/portal/src/`. O objetivo é manter o portal pequeno, sem dependências desnecessárias (sem Pinia, sem UI kit, sem CSS-in-JS) e consistente entre views.

---

## Estrutura de pastas — o que vai onde

| Pasta | Quando usar |
|---|---|
| `views/` | Uma página inteira, mapeada 1:1 numa rota do `main.ts`. Pode orquestrar vários componentes, mas a lógica de "página" (fetch inicial, guard de auth) mora aqui. |
| `components/` | Pedaço de UI reutilizado por 2+ views, ou complexo o bastante (>~60 linhas de template) para não poluir a view. Recebe dados via `defineProps`, nunca faz fetch próprio a menos que seja um componente de dados autocontido. |
| `composables/` | Lógica reativa/estado compartilhado entre views (`useXxx.ts`). Ver seção "Composables" abaixo. |
| `types/` | Interfaces TS que espelham o schema D1 ou o payload de um endpoint. Um arquivo por domínio (`aulas.ts`, `avaliacoes.ts`, `calendar.ts`). Nunca declare o mesmo shape duas vezes em views diferentes — importe do `types/`. |

## Quando extrair componente vs composable

- **Componente**: quando o que se repete é **template/markup** (ex.: `AulaCard.vue` usado em `HomeView.vue`).
- **Composable**: quando o que se repete é **estado ou lógica** sem markup (ex.: `useAdminAuth` — cookie de JWT usado por `AdminView`, `AdminCalendarioView`, `GoogleCallbackView`).
- Se as duas views/components que compartilham lógica só existem uma vez cada (sem uma terceira ocorrência à vista), **não extraia ainda** — três repetições reais é o gatilho, não hipóteses de reuso futuro.

## Composables — padrão de estado compartilhado

Quando o estado precisa ser o mesmo em várias instâncias de componente (ex.: "estou logado?" refletido simultaneamente em `App.vue` e `AdminView.vue`), declare o `ref` **fora** da função exportada (nível de módulo), não dentro:

```ts
// singleton reativo — todo import de useAdminAuth() compartilha o mesmo `token`
const token = ref(getCookie(TOKEN_KEY))

export function useAdminAuth() {
  function setToken(value: string) { token.value = value; setCookie(...) }
  function logout() { token.value = ''; deleteCookie(...) }
  return { token, setToken, logout }
}
```

Se o estado é local por instância (ex.: `useProgress(aulaId)` — progresso de uma aula específica), o `ref` fica **dentro** da função, parametrizado pelos argumentos.

## Estilo de componente

```vue
<script setup lang="ts">
// imports
// props/emits tipados: defineProps<{ aula: AulaMeta; ucAtiva?: string | null }>()
// refs/computed
// funções
</script>

<template>
  <!-- Tailwind utility classes inline. Sem <style> a menos que seja algo
       que Tailwind não expressa bem (raro neste projeto). -->
</template>
```

- Sempre `<script setup lang="ts">` — nunca Options API, nunca `<script>` sem `setup`.
- Tipar props/emits com `defineProps<T>()` / `defineEmits<T>()` (genéricos), não com o formato de objeto runtime.
- Fetch de dados: `fetch()` direto para a URL do Worker (constante `WORKER`, hoje hardcoded em cada view — se precisar em 3+ lugares, mova para um composable/constante compartilhada em vez de repetir o literal).
- Erros de fetch: sempre `try/catch` com uma `ref<string>` de erro exibida na UI — nunca deixe uma Promise rejeitada sem tratamento visível ao usuário.

## Roteamento

- Rotas declaradas em `main.ts`, array `routes: [...]` — sem lazy-loading/code-splitting hoje (portal é pequeno; se crescer muito, considerar `component: () => import(...)`, mas não antecipe isso sem necessidade real).
- `RouterLink`/`RouterView` são componentes globais (registrados automaticamente por `app.use(router)`) — não precisa importar em cada SFC.
- Rotas admin (`/admin/*`) não têm guard de rota real — cada view checa `token.value` do `useAdminAuth()` e mostra tela de login/redirecionamento inline. Isso é intencional (app pequeno, sem necessidade de `router.beforeEach` ainda).

## O que **não** introduzir sem necessidade concreta

- Pinia/Vuex — o app é pequeno o bastante para composables com `ref` de módulo resolverem estado compartilhado.
- UI kit (Vuetify, PrimeVue, etc.) — tudo é Tailwind + classes utilitárias manuais seguindo o tema neural.
- CSS Modules / styled-components — só `style.css` global (tema/fontes) + Tailwind.
- Testes automatizados de componente — o projeto hoje não tem suíte de testes; validar via `npm run build` (type-check) e uso manual (`npm run dev`).
