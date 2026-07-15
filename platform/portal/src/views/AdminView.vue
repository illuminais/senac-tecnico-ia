<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { useRouter } from 'vue-router'
import { useAdminAuth, WORKER } from '@/composables/useAdminAuth'
import { googleLoginUrl } from '@/composables/useGoogleAuth'

const router = useRouter()
const { token, setToken, logout } = useAdminAuth()

const username = ref('')
const password = ref('')
const loginError = ref('')
const loggingIn = ref(false)

const message = ref('')
const saving = ref(false)
const saveStatus = ref<'idle' | 'ok' | 'error'>('idle')
const preview = ref(false)

onMounted(async () => {
  if (token.value) await loadMessage()
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
    await loadMessage()
  } catch {
    loginError.value = 'Erro de conexao com o servidor.'
  } finally {
    loggingIn.value = false
  }
}

function loginWithGoogle() {
  location.href = googleLoginUrl('/admin/google-callback')
}

async function loadMessage() {
  const res = await fetch(`${WORKER}/api/message`)
  if (res.ok) {
    const data = await res.json()
    message.value = data.message ?? ''
  }
}

async function save() {
  saving.value = true
  saveStatus.value = 'idle'
  try {
    const res = await fetch(`${WORKER}/api/message`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token.value}` },
      body: JSON.stringify({ message: message.value }),
    })
    saveStatus.value = res.ok ? 'ok' : 'error'
    if (!res.ok && res.status === 401) logout()
  } catch {
    saveStatus.value = 'error'
  } finally {
    saving.value = false
    setTimeout(() => { saveStatus.value = 'idle' }, 3000)
  }
}
</script>

<template>
  <div class="min-h-dvh px-4 py-8 sm:px-6">
    <header class="max-w-2xl mx-auto mb-8 flex items-center justify-between">
      <div>
        <p class="text-neural-accent text-sm font-mono mb-1">Senac · Admin</p>
        <h1 class="text-2xl font-bold text-white">Painel do Professor</h1>
      </div>
      <div class="flex gap-3">
        <button v-if="token" @click="logout" class="text-sm text-gray-400 hover:text-white transition">Sair</button>
        <button @click="router.push('/')" class="text-sm text-gray-400 hover:text-white transition">← Portal</button>
      </div>
    </header>

    <!-- Login -->
    <div v-if="!token" class="max-w-sm mx-auto">
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

    <!-- Editor -->
    <div v-else class="max-w-2xl mx-auto flex flex-col gap-4">
      <RouterLink to="/admin/calendario" class="text-sm text-neural-accent hover:underline self-start">
        → Importar calendário (Orion)
      </RouterLink>

      <div class="bg-neural-800 rounded-2xl p-6 border border-neural-700">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-white font-semibold">Mensagem para os alunos</h2>
          <button
            @click="preview = !preview"
            class="text-xs text-neural-accent border border-neural-accent/40 rounded px-2 py-1 hover:bg-neural-accent/10 transition"
          >
            {{ preview ? 'Editar' : 'Preview' }}
          </button>
        </div>

        <div
          v-if="preview"
          class="min-h-[180px] prose prose-invert prose-sm max-w-none text-gray-200 border border-neural-700 rounded-lg p-4 bg-neural-900"
          v-html="marked.parse(message || '*Nenhuma mensagem ainda.*')"
        />
        <textarea
          v-else
          v-model="message"
          rows="8"
          placeholder="Escreva aqui em Markdown... Ex: **Boa aula hoje!** Lembre de trazer o notebook."
          class="w-full bg-neural-900 border border-neural-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neural-accent resize-y font-mono text-sm"
        />

        <p class="text-xs text-gray-500 mt-2">Suporta Markdown. Deixe vazio para ocultar o banner.</p>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="save"
          :disabled="saving"
          class="bg-neural-accent text-neural-900 font-semibold rounded-lg px-6 py-2 hover:opacity-90 disabled:opacity-50 transition"
        >
          {{ saving ? 'Salvando...' : 'Publicar mensagem' }}
        </button>
        <span v-if="saveStatus === 'ok'" class="text-green-400 text-sm">Salvo!</span>
        <span v-if="saveStatus === 'error'" class="text-red-400 text-sm">Erro ao salvar.</span>
      </div>
    </div>
  </div>
</template>