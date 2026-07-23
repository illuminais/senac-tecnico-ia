<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import NeuralBackground from '@/components/NeuralBackground.vue'

const route = useRoute()

const isAulaPage = computed(() => route.name === 'aula' || route.path.startsWith('/aula/'))
</script>

<template>
  <div class="min-h-dvh bg-black isolate relative">
    <NeuralBackground />
    <Header />
    <AppSidebar v-if="!isAulaPage" />

    <div
      class="relative"
      :class="isAulaPage ? '' : 'px-4 pt-6 pb-24 sm:px-6 sm:pt-6 sm:pb-6'"
    >
      <div :class="isAulaPage ? '' : 'relative mx-auto w-full max-w-4xl bg-black/40 rounded-md'">
        <RouterView />
      </div>
    </div>
  </div>
</template>
