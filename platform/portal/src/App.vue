<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import ProfessorMessageBanner from '@/components/ProfessorMessageBanner.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import NeuralBackground from '@/components/NeuralBackground.vue'
import { useSidebar } from '@/composables/useSidebar'

const route = useRoute()
const { collapsed: sidebarCollapsed } = useSidebar()

const isAulaPage = computed(() => route.name === 'aula' || route.path.startsWith('/aula/'))
const sidebarMarginClass = computed(() => (sidebarCollapsed.value ? 'sm:mr-16' : 'sm:mr-56'))
</script>

<template>
  <div class="min-h-dvh bg-black">
    <header
      v-if="!isAulaPage"
      class="sticky top-0 z-20 bg-neural-900/95 backdrop-blur-sm border-b border-neural-700 px-4 pt-5 pb-4 sm:px-6 sm:pb-5 transition-[margin]"
      :class="sidebarMarginClass"
    >
      <div class="max-w-4xl mx-auto">
        <p class="text-neural-accent text-xs font-mono mb-0.5">Técnico em IA - SENAC</p>
        <h1 class="text-xl sm:text-2xl font-bold text-white">Portal do Aluno</h1>
        <ProfessorMessageBanner />
      </div>
    </header>

    <AppSidebar v-if="!isAulaPage" />

    <div
      class="relative transition-[margin]"
      :class="isAulaPage ? '' : ['px-4 pt-6 pb-24 sm:px-6 sm:pt-6 sm:pb-6', sidebarMarginClass]"
    >
      <NeuralBackground />
      <RouterView />
    </div>
  </div>
</template>
