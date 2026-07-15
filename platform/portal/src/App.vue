<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
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
    <Header />

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
