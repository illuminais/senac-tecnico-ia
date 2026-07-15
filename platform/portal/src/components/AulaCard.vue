<script setup lang="ts">
import type { AulaMeta } from '@/types/aulas'
import { useRouter } from 'vue-router'
import { ucFullLabel, ucShortLabel } from '@/composables/useUcLabels'

const props = defineProps<{ aula: AulaMeta; ucAtiva?: string | null }>()
const router = useRouter()

function ucLabel(uc: string) {
  return props.ucAtiva === uc ? ucFullLabel(uc) : ucShortLabel(uc)
}

function formatData(data: string) {
  if (!data) return ''
  const [, month, day] = data.split('-')
  const months = ['', 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
  return `${day}/${months[Number(month)] ?? month}`
}

function open() {
  router.push(`/aula/${props.aula.slug}`)
}
</script>

<template>
  <button
    class="group relative w-full text-left rounded-2xl border border-neural-600 bg-neural-900/10 p-6
           transition-all duration-200 hover:border-neural-accent hover:bg-neural-700
           active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-accent"
    @click="open"
  >
    <!-- Badge número -->
    <div class="flex items-start justify-between gap-3 mb-3">
      <div class="flex items-center justify-center gap-3">
      <span class="text-xs font-mono font-semibold text-neural-accent bg-neural-900 px-2 py-0.5 rounded-full border border-neural-accent/30">
        Aula {{ aula.numero }}
      </span>

      <span v-if="aula.tipo === 'reposicao-sabado'"
        class="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/30">
        Reposição
      </span></div>
      <p v-if="aula.data" class="text-xs text-gray-400 px-2 py-0.5">
      {{ formatData(aula.data) }}
    </p>
    </div>

    <!-- Título -->
    <h2 class="text-base font-semibold text-white leading-snug my-6 group-hover:text-neural-accent transition-colors">
      {{ aula.titulo || `Aula ${aula.numero}` }}
    </h2>

    <!-- UCs -->
    <div v-if="aula.ucs.length" class="flex flex-wrap gap-1.5">
      <span
        v-for="uc in aula.ucs"
        :key="uc"
        class="hover:bg-neural-accent hover:text-neural-900 text-xs px-3 py-1 rounded-full transition-colors"
        :class="props.ucAtiva === uc ? 'bg-neural-accent text-neural-900 font-semibold' : 'text-gray-300 bg-neural-600'"
      >
         {{ ucLabel(uc) }}
      </span>
    </div>

    <!-- Seta -->
    <div class="absolute right-4 top-1/2 -translate-y-1/2 text-neural-600 group-hover:text-neural-accent transition-colors">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </button>
</template>
