<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { WORKER } from '@/composables/useAdminAuth'

const route = useRoute()
const router = useRouter()
const token = route.query.token as string | undefined

const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const saving = ref(false)
const done = ref(false)

async function submit() {
  error.value = ''
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'As senhas não coincidem.'
    return
  }
  if (!token) {
    error.value = 'Link inválido — falta o token.'
    return
  }

  saving.value = true
  try {
    const res = await fetch(`${WORKER}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword: newPassword.value }),
    })
    const data = await res.json()
    if (!res.ok) {
      error.value = data.error ?? 'Não foi possível redefinir a senha.'
      return
    }
    done.value = true
    setTimeout(() => router.push('/admin'), 2000)
  } catch {
    error.value = 'Erro de conexão com o servidor.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-sm mx-auto px-4 py-16">
    <h1 class="text-xl font-bold text-white mb-1">Nova senha</h1>

    <div v-if="!token" class="text-red-400 text-sm mt-4">Link inválido — falta o token de redefinição.</div>

    <div v-else-if="done" class="bg-neural-800 rounded-2xl p-6 border border-neural-700 text-sm text-gray-300">
      Senha redefinida! Redirecionando para o login...
    </div>

    <form v-else @submit.prevent="submit" class="flex flex-col gap-3 mt-6">
      <input
        v-model="newPassword"
        type="password"
        required
        minlength="8"
        placeholder="Nova senha (mín. 8 caracteres)"
        autocomplete="new-password"
        class="bg-neural-900 border border-neural-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neural-accent"
      />
      <input
        v-model="confirmPassword"
        type="password"
        required
        placeholder="Confirmar nova senha"
        autocomplete="new-password"
        class="bg-neural-900 border border-neural-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neural-accent"
      />
      <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
      <button
        type="submit"
        :disabled="saving"
        class="bg-neural-accent text-neural-900 font-semibold rounded-lg px-4 py-2 hover:opacity-90 disabled:opacity-50 transition"
      >
        {{ saving ? 'Salvando...' : 'Redefinir senha' }}
      </button>
    </form>
  </div>
</template>
