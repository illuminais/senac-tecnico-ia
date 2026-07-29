<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { AvaliacaoApi } from '@/types/avaliacoes'
import IndicadorChip from '@/components/IndicadorChip.vue'

const props = defineProps<{ avaliacao: AvaliacaoApi }>()
const router = useRouter()

// `status` aqui é o de aplicação (avaliacoes_turma.status), pode vir null
// quando nenhuma turma foi resolvida — tratado igual a "não disponível".
const disponivel = computed(() => props.avaliacao.status === 'published')
const concluida = computed(() => props.avaliacao.status === 'concluida')
// concluída também abre o card — o aluno deve poder ver o que já entregou.
const acessivel = computed(() => disponivel.value || concluida.value)

function handleClick() {
  if (acessivel.value) router.push(`/avaliacao/${props.avaliacao.slug}`)
}
</script>

<template>
  <div
    @click="handleClick"
    :class="[
      'rounded-2xl border p-5 transition',
      disponivel
        ? 'bg-neural-800 border-neural-700 hover:border-neural-accent/50 cursor-pointer'
        : concluida
          ? 'bg-neural-800 border-neural-700 hover:border-green-400/50 cursor-pointer'
          : 'bg-neural-800/40 border-neural-700/40 cursor-default opacity-60',
    ]"
  >
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-4 min-w-0">
        <span class="text-neural-accent font-mono text-sm font-bold uppercase shrink-0">{{ avaliacao.slug }}</span>
        <div class="min-w-0">
          <p class="text-white font-medium text-sm truncate">{{ avaliacao.titulo }}</p>
          <p v-if="disponivel" class="text-gray-400 text-xs mt-0.5">
            <template v-if="avaliacao.prazoLabel">Entrega: {{ avaliacao.prazoLabel }}</template>
            <span v-if="avaliacao.tipo" class="ml-2 text-neural-accent font-mono">{{ avaliacao.tipo }}</span>
          </p>
          <p v-else-if="concluida" class="text-gray-400 text-xs mt-0.5">
            <span v-if="avaliacao.tipo" class="text-green-400 font-mono">{{ avaliacao.tipo }}</span>
          </p>
          <p v-else class="text-gray-500 text-xs mt-0.5">Em breve</p>
        </div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span
          v-if="concluida"
          class="text-xs px-2 py-0.5 rounded-full border border-green-400/40 text-green-400"
        >Concluída</span>
        <span
          v-else-if="disponivel"
          class="text-xs px-2 py-0.5 rounded-full border border-neural-accent/40 text-neural-accent"
        >Disponível</span>
        <span
          v-else
          class="text-xs px-2 py-0.5 rounded-full border border-gray-600 text-gray-500"
        >Não liberada</span>
        <svg v-if="acessivel" class="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </div>

    <div v-if="avaliacao.indicadores.length" class="mt-3 flex flex-wrap gap-2">
      <IndicadorChip v-for="ind in avaliacao.indicadores" :key="ind.codigo" :indicador="ind" />
    </div>
  </div>
</template>
