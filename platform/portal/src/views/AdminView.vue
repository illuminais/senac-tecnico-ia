<script setup lang="ts">
// Só o login (sprint 04) — depois de logado, a navegação vira os ícones
// verdes da sidebar (Avaliações/Calendário/Mensagem), não links aqui dentro.
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminAuth, WORKER } from '@/composables/useAdminAuth'
import { googleLoginUrl } from '@/composables/useGoogleAuth'

const router = useRouter()
const { token, setToken, logout } = useAdminAuth()

const username = ref('')
const password = ref('')
const loginError = ref('')
const loggingIn = ref(false)

onMounted(() => {
  if (token.value) router.push('/admin/avaliacoes')
})

async function login() {
  loginError.value = ''
  loggingIn.value = true
  try {
    const res = await fetch(`${WORKER}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value }),
    })
    if (!res.ok) { loginError.value = 'Usuario ou senha incorretos.'; return }
    const data = await res.json()
    setToken(data.token)
    router.push('/admin/avaliacoes')
  } catch {
    loginError.value = 'Erro de conexao com o servidor.'
  } finally {
    loggingIn.value = false
  }
}

function loginWithGoogle() {
  location.href = googleLoginUrl('/admin/google-callback')
}
</script>

<template>
  <div class="min-h-dvh px-4 py-8 sm:px-6">
    <header class="max-w-2xl mx-auto mb-8 flex items-center justify-between">
      <div>
        <p class="text-neural-accent text-sm font-mono mb-1">Senac · Admin</p>
        <h1 class="text-2xl font-bold text-white">Painel do Professor</h1>
      </div>
      <button v-if="token" @click="logout" class="text-sm text-gray-400 hover:text-white transition">Sair</button>
    </header>

    <div class="max-w-sm mx-auto">
      <div class="bg-neural-800 rounded-2xl p-6 border border-neural-700">
        <h2 class="text-white font-semibold mb-4">Entrar</h2>
        <form @submit.prevent="login" class="flex flex-col gap-3">
          <input
            v-model="username"
            type="text"
            placeholder="Usuário"
            autocomplete="username"
            class="bg-neural-900 border border-neural-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neural-accent"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Senha"
            autocomplete="current-password"
            class="bg-neural-900 border border-neural-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neural-accent"
          />
          <p v-if="loginError" class="text-red-400 text-sm">{{ loginError }}</p>
          <button
            type="submit"
            :disabled="loggingIn"
            class="bg-neural-accent text-neural-900 font-semibold rounded-lg px-4 py-2 hover:opacity-90 disabled:opacity-50 transition"
          >
            {{ loggingIn ? 'Entrando...' : 'Entrar' }}
          </button>
          <RouterLink to="/admin/esqueci-senha" class="text-xs text-gray-400 hover:text-white text-center transition">
            Esqueci minha senha
          </RouterLink>
        </form>

        <div class="flex items-center gap-3 my-4">
          <div class="h-px bg-neural-700 flex-1" />
          <span class="text-xs text-gray-500">ou</span>
          <div class="h-px bg-neural-700 flex-1" />
        </div>

        <button
          @click="loginWithGoogle"
          class="w-full flex items-center justify-center gap-2 bg-white text-neural-900 font-medium rounded-lg px-4 py-2 hover:opacity-90 transition"
        >
          Entrar com Google
        </button>
      </div>
    </div>
  </div>
</template>
