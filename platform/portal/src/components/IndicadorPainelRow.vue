<script setup lang="ts">
// Linha de um indicador no painel (T8). Expansível sob demanda (RF19/CA10):
// mostra conhecimentos/habilidades da UC, resolvidos localmente a partir do
// mapa já buscado uma vez pela view (`GET /api/admin/ucs`), sem request por
// indicador. "Sem avaliação" (CA2) é o destaque visual mais forte da linha —
// é a razão de ser desta tela.
import { ref, computed } from 'vue'
import type { PainelIndicador, UcApi } from '@/types/admin-painel'

const props = defineProps<{
  indicador: PainelIndicador
  ucsByCodigo: Map<string, UcApi>
}>()

const expanded = ref(false)
const uc = computed(() => props.ucsByCodigo.get(props.indicador.uc))
const semAvaliacao = computed(() => props.indicador.avaliacoes.length === 0)
</script>

<template>
  <div
    class="rounded-xl border bg-neural-800/60 overflow-hidden transition"
    :class="semAvaliacao ? 'border-red-400/40' : 'border-neural-700'"
  >
    <button
      type="button"
      @click="expanded = !expanded"
      class="w-full text-left p-4 flex flex-col gap-2 hover:bg-neural-800 transition
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-accent"
      :aria-expanded="expanded"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-mono text-neural-accent font-semibold text-sm">{{ indicador.codigo }}</span>
          <span
            v-if="semAvaliacao"
            class="text-xs px-2 py-0.5 rounded-full bg-red-400/20 text-red-400 font-semibold"
          >
            ⚠ Sem avaliação
          </span>
          <span v-else class="text-xs font-mono text-gray-500">
            {{ indicador.corrigidos }}/{{ indicador.totalAlunos }} corrigidos
          </span>
        </div>
        <span class="text-gray-500 text-xs shrink-0">{{ expanded ? '▲ recolher' : '▼ detalhes' }}</span>
      </div>

      <p class="text-sm text-gray-300 line-clamp-2">{{ indicador.descricao }}</p>

      <div v-if="indicador.avaliacoes.length" class="flex flex-wrap gap-1.5">
        <span
          v-for="av in indicador.avaliacoes"
          :key="av.slug"
          class="text-xs px-2 py-0.5 rounded-full bg-neural-600 text-gray-200"
        >
          {{ av.titulo }}
        </span>
      </div>
    </button>

    <div
      v-if="expanded"
      class="border-t border-neural-700 px-4 py-3 bg-neural-900/40 text-xs text-gray-400 flex flex-col gap-3"
    >
      <template v-if="uc">
        <div>
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
