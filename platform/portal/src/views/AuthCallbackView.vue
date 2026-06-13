<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { setToken } = useAuth()
const errorMsg = ref('')

const ERROR_MESSAGES: Record<string, string> = {
  invalid_domain:        'Use seu email @escola.pr.gov.br para entrar.',
  invalid_state:         'Sessão expirada. Tente novamente.',
  token_exchange_failed: 'Falha na autenticação com o Google. Tente novamente.',
  missing_user_info:     'Não foi possível obter seus dados. Tente novamente.',
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const token  = params.get('token')
  const error  = params.get('error')

  if (error) {
    errorMsg.value = ERROR_MESSAGES[error] ?? 'Erro ao fazer login. Tente novamente.'
    return
  }

  if (!token || !setToken(token)) {
    errorMsg.value = 'Token inválido. Tente novamente.'
    return
  }

  router.replace('/')
})
</script>

<template>
  <div class="min-h-dvh bg-neural-900 flex items-center justify-center px-4">
    <div v-if="errorMsg" class="text-center max-w-sm">
      <div class="text-3xl mb-4">⚠️</div>
      <p class="text-red-400 mb-6">{{ errorMsg }}</p>
      <a href="/" class="text-neural-accent text-sm hover:underline">Voltar ao início</a>
    </div>
    <div v-else class="text-center">
      <div class="w-8 h-8 border-2 border-neural-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p class="text-gray-400 text-sm">Entrando...</p>
    </div>
  </div>
</template>
