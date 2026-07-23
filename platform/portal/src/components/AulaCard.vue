<script setup lang="ts">
import type { AulaMeta } from '@/types/aulas'
import { ucFullLabel } from '@/composables/useUcLabels'

defineProps<{ aula: AulaMeta; ucAtiva?: string | null }>()
const emit = defineEmits<{ (e: 'select-uc', uc: string): void }>()

function formatData(data: string) {
  if (!data) return ''
  const [, month, day] = data.split('-')
  const months = ['', 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
  return `${day}/${months[Number(month)] ?? month}`
}
</script>

<template>
  <!-- Card com distribuição fixa: topo (~20%) = badge+data · meio (fixo) =
       título truncado em 2 linhas · base = UCs (carrossel horizontal no hover).
       Padrão stretched-link: o RouterLink cobre o card inteiro (abre a aula);
       o conteúdo é pointer-events-none pra deixar o clique passar pra ele, e só
       os pills de UC reativam o clique (que filtra, sem abrir a aula). -->
  <article
    class="group relative flex flex-col h-52 rounded-2xl border border-neural-600 bg-neural-900/10
           overflow-hidden transition-colors duration-200 hover:border-neural-accent"
  >
    <RouterLink
      :to="`/aula/${aula.slug}`"
      class="absolute inset-0 z-0 rounded-2xl transition-colors group-hover:bg-neural-700/40
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-accent focus-visible:ring-inset"
      :aria-label="`Abrir ${aula.titulo || 'Aula ' + aula.numero}`"
    />

    <!-- TOPO ~20%: badge da aula + data -->
    <div class="relative z-10 pointer-events-none flex h-[20%] items-center justify-between gap-2 px-5 pt-1">
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono font-semibold text-neural-accent bg-neural-900 px-2 py-0.5 rounded-full border border-neural-accent/30 whitespace-nowrap">
          Aula {{ aula.numero }}
        </span>
        <span
          v-if="aula.tipo === 'reposicao-sabado'"
          class="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/30 whitespace-nowrap"
        >
          Reposição
        </span>
      </div>
      <span v-if="aula.data" class="text-xs font-mono text-gray-400 whitespace-nowrap">{{ formatData(aula.data) }}</span>
    </div>

    <!-- MEIO (altura fixa): título, sempre 2 linhas no máximo -->
    <div class="relative z-10 pointer-events-none justify-between flex flex-1 min-h-0 items-center px-5">
      <h2 class="text-base font-semibold text-white leading-snug line-clamp-2 group-hover:text-neural-accent transition-colors">
        {{ aula.titulo || `Aula ${aula.numero}` }}
      </h2>
<!--    <img class="object-fit rounded-full" src="/arrowright.png" /> --> 
    </div>

    <!-- BASE: UCs. Fechado mostra ~2 e desbota à direita indicando mais; no
         hover vira scroll horizontal (carrossel) sem quebrar o clique. -->
    <div v-if="aula.ucs.length" class="relative z-10 flex h-[24%] items-end px-5 pb-4">
      <div
        class="uc-strip flex w-full items-center gap-1.5 overflow-x-hidden scroll-smooth
               [mask-image:linear-gradient(to_right,black_82%,transparent)]
               group-hover:overflow-x-auto group-hover:[mask-image:none]"
      >
        <button
          v-for="uc in aula.ucs"
          :key="uc"
          type="button"
          @click.stop.prevent="emit('select-uc', uc)"
          class="pointer-events-auto shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs
                 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-accent"
          :class="ucAtiva === uc
            ? 'bg-neural-accent text-neural-900 border-neural-accent font-semibold'
            : 'bg-neural-800 text-gray-300 border-neural-700 hover:border-neural-accent hover:text-white'"
        >
          {{ ucFullLabel(uc) }}
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* Esconde a barra de rolagem do carrossel de UCs (sem mudar a altura no hover). */
.uc-strip {
  scrollbar-width: none;
}
.uc-strip::-webkit-scrollbar {
  display: none;
}
</style>
