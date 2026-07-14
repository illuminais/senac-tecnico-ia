<script setup lang="ts">
import { ref } from 'vue'
import { WORKER } from '@/composables/useAdminAuth'

const email = ref('')
const sending = ref(false)
const sent = ref(false)

async function submit() {
  sending.value = true
  try {
    await fetch(`${WORKER}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        resetUrlBase: `${location.origin}/admin/reset-senha`,
      }),
    })
  } finally {
    sending.value = false
    sent.value = true // sempre mostra a mesma mensagem, exista ou não a conta
  }
}
</script>

<template>
  <div class="max-w-sm mx-auto px-4 py-16">
    <h1 class="text-xl font-bold text-white mb-1">Esqueci minha senha</h1>
    <p class="text-sm text-gray-400 mb-6">Informe o email da sua conta de admin.</p>

    <div v-if="sent" class="bg-neural-800 rounded-2xl p-6 border border-neural-700 text-sm text-gray-300">
      Se esse email tiver uma conta, enviamos um link de redefinição. Ele expira em 1 hora.
    </div>

    <form v-else @submit.prevent="submit" class="flex flex-col gap-3">
      <input
        v-model="email"
        type="email"
        required
        placeholder="seu@email.com"
        autocomplete="email"
        class="bg-neural-900 border border-neural-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neural-accent"
      />
      <button
        type="submit"
        :disabled="sending"
        class="bg-neural-accent text-neural-900 font-semibold rounded-lg px-4 py-2 hover:opacity-90 disabled:opacity-50 transition"
      >
        {{ sending ? 'Enviando...' : 'Enviar link de redefinição' }}
      </button>
      <RouterLink to="/admin" class="text-xs text-gray-400 hover:text-white text-center transition">← Voltar</RouterLink>
    </form>
  </div>
</template>
