<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProfessorMessageBanner from '@/components/ProfessorMessageBanner.vue'
import { useSidebar } from '@/composables/useSidebar'

const route = useRoute()
const { collapsed: sidebarCollapsed } = useSidebar()

const isAulaPage = computed(() => route.name === 'aula' || route.path.startsWith('/aula/'))
const sidebarMarginClass = computed(() => (sidebarCollapsed.value ? 'sm:mr-16' : 'sm:mr-56'))
</script>

<template>
  <header
    v-if="!isAulaPage"
    class="sticky top-0 z-20 flex justify-center px-4 pt-6 sm:px-6 sm:pt-6 transition-[margin]"
    :class="sidebarMarginClass"
  >
    <div class="flex flex-wrap items-center justify-center gap-4 max-w-xl w-full bg-neural-900/80 backdrop-blur-sm border border-neural-700 rounded-xl px-6 py-3">
      <div>
        <p class="text-neural-accent text-xs font-mono mb-0.5">SENAC - Técnico em IA</p>
        <h1 class="text-xl sm:text-2xl font-bold text-white">Portal do Aluno</h1>
      </div>
      <ProfessorMessageBanner />
    </div>
  </header>
</template>
