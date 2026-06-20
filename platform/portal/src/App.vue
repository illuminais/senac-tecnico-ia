<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { marked } from 'marked'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const WORKER = 'https://lms-senac-tecnico-ia.leo-zn-97.workers.dev'
const route = useRoute()
const professorMessage = ref('')
const { user, isLoggedIn, loginWithGoogle, logout } = useAuth()

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
  <div class="min-h-dvh bg-neural-900">
    <header
      v-if="!isAulaPage"
      class="sticky top-0 z-20 bg-neural-900/95 backdrop-blur-sm border-b border-neural-700 px-4 pt-5 pb-0 sm:px-6"
    >
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-start mb-2">
        <div>
          <p class="text-neural-accent text-xs font-mono mb-0.5">Técnico em IA - SENAC</p>
          <h1 class="text-xl sm:text-2xl font-bold text-white mb-3">Portal do Aluno</h1>
        </div>

        <!-- Auth -->
        <div class="flex items-center gap-2 pt-1 shrink-0">
          <template v-if="isLoggedIn">
            <span class="text-xs text-gray-400 hidden sm:block truncate max-w-[140px]">{{ user!.name }}</span>
            <button
              @click="logout"
              class="text-xs px-3 py-1.5 rounded-lg bg-neural-800 text-gray-400 hover:text-white hover:bg-neural-700 transition"
            >Sair</button>
          </template>
          <button
            v-else
            @click="loginWithGoogle"
            class="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-neural-800 text-gray-300 hover:text-white hover:bg-neural-700 transition"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Entrar
          </button>
        </div>
        </div><!-- /flex top row -->

        <div
          v-if="professorMessage"
          class="mb-3 rounded-xl border border-neural-accent/30 bg-neural-800/60 px-4 py-3"
        >
          <p class="text-neural-accent text-xs font-mono uppercase tracking-widest mb-1">Mensagem do professor</p>
          <div class="text-sm text-gray-200 leading-relaxed" v-html="marked.parse(professorMessage)" />
        </div>

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
        </nav>
      </div>
    </header>

    <div :class="isAulaPage ? '' : 'px-4 py-6 sm:px-6'">
      <RouterView />
    </div>
  </div>
</template>
