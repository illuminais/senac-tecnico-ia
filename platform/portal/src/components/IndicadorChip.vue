<script setup lang="ts">
import { ref } from 'vue'
import type { IndicadorRef } from '@/types/avaliacoes'

defineProps<{ indicador: IndicadorRef }>()

// Mobile-first: sem hover confiável, então a descrição expande/recolhe no
// toque/clique em vez de depender de `title`/tooltip (`.stop` evita que o
// clique borbulhe pro card e dispare a navegação de AvaliacaoCard).
const expanded = ref(false)
</script>

<template>
  <button
    type="button"
    @click.stop="expanded = !expanded"
    class="text-left rounded-lg border border-neural-600 bg-neural-800/60 px-2.5 py-1 text-xs
           text-gray-300 hover:border-neural-accent hover:text-white transition max-w-full
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-accent"
    :aria-expanded="expanded"
  >
    <span class="font-mono font-semibold text-neural-accent">{{ indicador.codigo }}</span>
    <span class="text-gray-500 ml-1">{{ indicador.uc }}</span>
    <p v-if="expanded" class="mt-1 font-sans font-normal text-gray-400 whitespace-normal">
      {{ indicador.descricao }}
    </p>
  </button>
</template>
