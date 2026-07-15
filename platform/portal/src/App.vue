<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { marked } from 'marked'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useStudentAuth } from '@/composables/useStudentAuth'

const WORKER = 'https://lms-senac-tecnico-ia.dev-leozanini.workers.dev'
const route = useRoute()
const professorMessage = ref('')
const { token: studentToken, user: studentUser, logout: studentLogout } = useStudentAuth()

const isAulaPage = computed(() => route.name === 'aula' || route.path.startsWith('/aula/'))

onMounted(async () => {
  try {
    const res = await fetch(`${WORKER}/api/message`)
    if (res.ok) {
      const data = await res.json()
      professorMessage.value = data.message ?? ''
    }
  } catch {}
})
</script>

<template>
  <div class="min-h-dvh bg-black">
    <header
      v-if="!isAulaPage"
      class="sticky top-0 z-20 bg-neural-900/95 backdrop-blur-sm border-b border-neural-700 px-4 pt-5 pb-0 sm:px-6"
    >
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-center sm:justify-between items-center mb-2">
        <div>
        <p class="text-neural-accent text-xs font-mono mb-0.5">Técnico em IA - SENAC</p>
        <h1 class="text-xl sm:text-2xl font-bold text-white mb-3">Portal do Aluno</h1></div><div
          v-if="professorMessage"
          class="mb-3 rounded-xl border border-neural-accent/30 bg-neural-800/60 px-4 py-3"
        >
          <p class="text-neural-accent text-xs font-mono uppercase tracking-widest mb-1">Mensagem do professor</p>
          <div class="text-sm text-gray-200 leading-relaxed" v-html="marked.parse(professorMessage)" />
        </div>
      </div>

        <div class="flex items-center justify-between">
          <nav class="flex gap-1">
            <RouterLink
              to="/"
              class="px-4 py-2 text-sm font-medium transition border-b-2"
              :class="route.path === '/' ? 'text-white border-neural-accent' : 'text-gray-400 hover:text-white border-transparent'"
            >Aulas</RouterLink>
            <RouterLink
              to="/avaliacoes"
              class="px-4 py-2 text-sm font-medium transition border-b-2"
              :class="route.path === '/avaliacoes' ? 'text-white border-neural-accent' : 'text-gray-400 hover:text-white border-transparent'"
            >Avaliações</RouterLink>
            <RouterLink
              to="/calendario"
              class="px-4 py-2 text-sm font-medium transition border-b-2"
              :class="route.path === '/calendario' ? 'text-white border-neural-accent' : 'text-gray-400 hover:text-white border-transparent'"
            >Calendário</RouterLink>
          </nav>

          <div class="flex items-center gap-2 pr-1">
            <template v-if="studentToken">
              <span class="hidden sm:inline text-xs text-gray-400 truncate max-w-[10rem]">
                {{ studentUser?.name ?? studentUser?.email ?? 'Aluno' }}
              </span>
              <button @click="studentLogout" class="text-xs text-gray-400 hover:text-white transition">Sair</button>
            </template>
            <RouterLink
              v-else
              to="/entrar"
              class="text-xs text-gray-400 hover:text-white transition"
            >Entrar</RouterLink>
          </div>
        </div>
      </div>
    </header>

    <div class="relative" :class="isAulaPage ? '' : 'px-4 py-6 sm:px-6'">
      <div
        class="fixed inset-0 bg-left bg-repeat-y pointer-events-none w-[23%]"
        style="
          background-image: url('/u9263854985_an_infinite_artificial_intelligence_neural_networ_ac553fdb-db8e-41ed-8dc5-d293f29f1ff6_0.png');
          -webkit-mask-image: linear-gradient(to right, black 0%, black 20%, transparent 100%);
          mask-image: linear-gradient(to right, black 0%, black 20%, transparent 100%);
        "
      />
          <div
        class="absolute inset-0  bg-right bg-repeat-y pointer-events-none w-[23%]"
        style="
          background-image: url('/u9263854985_an_infinite_artificial_intelligence_neural_networ_ac553fdb-db8e-41ed-8dc5-d293f29f1ff6_0.png');
          -webkit-mask-image: linear-gradient(to right, black 0%, black 10%, transparent 100%);
          mask-image: linear-gradient(to right, black 0%, black 10%, transparent 100%);
        "
      />
      <RouterView />
    </div>
  </div>
</template>
