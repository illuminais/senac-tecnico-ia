<script setup lang="ts">
// Cabeçalho de coluna da grade (T9): código do indicador + "marcar coluna
// toda" (RF11) + conhecimentos/habilidades da UC sob demanda (RF19/CA10).
// Mesmo padrão de `IndicadorPainelRow.vue` (T8) — busca de `GET /api/admin/ucs`
// já feita uma única vez pela view, aqui só resolve localmente por `indicador.uc`.
import { ref } from 'vue'
import type { UcApi } from '@/types/admin-painel'
import type { GradeIndicador, NotaValor } from '@/types/admin-grade'

defineProps<{
  indicador: GradeIndicador
  uc: UcApi | undefined
}>()

const emit = defineEmits<{ 'marcar-coluna': [valor: NotaValor] }>()

const expanded = ref(false)
</script>

<template>
  <div class="relative flex flex-col items-center gap-1.5 w-14">
    <button
      type="button"
      @click="expanded = !expanded"
      :aria-expanded="expanded"
      :title="indicador.descricao"
      class="text-xs font-mono text-neural-accent font-semibold hover:underline
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-accent rounded"
    >
      {{ indicador.codigo }}
    </button>

    <div class="flex gap-0.5">
      <button
        type="button"
        @click="emit('marcar-coluna', 'A')"
        title="Marcar coluna toda com A"
        class="text-[10px] leading-none px-1.5 py-1 rounded bg-neural-accent/20 text-neural-accent hover:bg-neural-accent/30 transition"
      >A</button>
      <button
        type="button"
        @click="emit('marcar-coluna', 'PA')"
        title="Marcar coluna toda com PA"
        class="text-[10px] leading-none px-1.5 py-1 rounded bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30 transition"
      >P</button>
      <button
        type="button"
        @click="emit('marcar-coluna', 'NA')"
        title="Marcar coluna toda com NA"
        class="text-[10px] leading-none px-1.5 py-1 rounded bg-red-400/20 text-red-400 hover:bg-red-400/30 transition"
      >N</button>
    </div>

    <div
      v-if="expanded"
      class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 z-20 rounded-xl border
             border-neural-700 bg-neural-900 p-3 text-xs text-gray-300 shadow-xl text-left normal-case font-sans"
    >
      <p class="text-gray-200 font-semibold mb-2">{{ indicador.codigo }} — {{ indicador.descricao }}</p>
      <template v-if="uc">
        <div class="mb-2">
          <p class="text-gray-300 font-semibold mb-1">Conhecimentos ({{ uc.codigo }})</p>
          <p class="whitespace-pre-line">{{ uc.conhecimentos }}</p>
        </div>
        <div>
          <p class="text-gray-300 font-semibold mb-1">Habilidades</p>
          <p class="whitespace-pre-line">{{ uc.habilidades }}</p>
        </div>
      </template>
      <p v-else class="text-gray-500">Detalhes da UC não disponíveis.</p>
    </div>
  </div>
</template>
