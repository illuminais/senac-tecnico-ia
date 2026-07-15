<script setup lang="ts">
import { useStudentAuth } from '@/composables/useStudentAuth'
import { googleLoginUrl } from '@/composables/useGoogleAuth'

const { token, user, logout } = useStudentAuth()

function loginWithGoogle() {
  location.href = googleLoginUrl('/entrar/google-callback')
}
</script>

<template>
  <div class="min-h-dvh px-4 py-16 sm:px-6">
    <div class="max-w-sm mx-auto">
      <div class="bg-neural-800 rounded-2xl p-6 border border-neural-700 text-center">
        <p class="text-neural-accent text-sm font-mono mb-1">Senac · Aluno</p>
        <h1 class="text-xl font-bold text-white mb-4">Entrar</h1>

        <template v-if="token">
          <p class="text-gray-300 text-sm mb-4">
            Você já está logado como <span class="text-white font-medium">{{ user?.name ?? user?.email ?? 'aluno' }}</span>.
          </p>
          <button
            @click="logout"
            class="text-sm text-gray-400 hover:text-white transition"
          >Sair</button>
        </template>

        <template v-else>
          <p class="text-gray-400 text-sm mb-6">
            Restrito a email <span class="text-gray-200">@aluno.pr.senac.br</span> ou da escola.
            Entre com sua conta Google para acompanhar seu progresso e enviar respostas de avaliações.
          </p>
          <button
            @click="loginWithGoogle"
            class="w-full flex items-center justify-center gap-2 bg-white text-neural-900 font-medium rounded-lg px-4 py-2 hover:opacity-90 transition"
          >
            Entrar com Google
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
