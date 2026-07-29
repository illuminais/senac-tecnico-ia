<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProfessorMessageBanner from '@/components/ProfessorMessageBanner.vue'
import { useSidebar } from '@/composables/useSidebar'

const route = useRoute()
const router = useRouter()
const { collapsed: sidebarCollapsed } = useSidebar()

const isAulaPage = computed(() => route.name === 'aula' || route.path.startsWith('/aula/'))
const sidebarMarginClass = computed(() => (sidebarCollapsed.value ? 'sm:mr-16' : 'sm:mr-56'))
// Aula tem seu próprio botão de voltar (dentro do slide); toda outra rota que
// não seja a home ganha este, padronizado — nenhuma view mais precisa
// hand-rolar o próprio "← Voltar" com destino/ícone diferente.
const showBack = computed(() => !isAulaPage.value && route.path !== '/')
</script>

<template>
  <header
    v-if="!isAulaPage"
    class="sticky top-0 z-20 flex flex-col items-center gap-3 px-4 pt-6 sm:px-6 sm:pt-6 transition-[margin]"
    :class="sidebarMarginClass"
  >
    <button
      v-if="showBack"
      @click="router.push('/')"
      class="self-start text-sm text-gray-400 hover:text-white transition flex items-center gap-1 max-w-xl w-full"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      Voltar
    </button>

    <div class="flex flex-wrap items-center justify-center gap-4 max-w-xl w-full bg-neural-900/80 backdrop-blur-sm border border-neural-700 rounded-xl px-6 py-3">
      <div>
        <p class="text-neural-accent text-xs font-mono mb-0.5">SENAC - Técnico em IA</p>
        <h1 class="text-xl sm:text-2xl font-bold text-white">Portal do Aluno</h1>
      </div>
      <ProfessorMessageBanner />
    </div>
  </header>
</template>
