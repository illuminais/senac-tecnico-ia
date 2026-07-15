<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStudentAuth } from '@/composables/useStudentAuth'
import { WORKER } from '@/composables/useAdminAuth'
import { consumeGoogleState, googleRedirectUri } from '@/composables/useGoogleAuth'

const route = useRoute()
const router = useRouter()
const { setToken } = useStudentAuth()
const error = ref('')

onMounted(async () => {
  const code = route.query.code as string | undefined
  const state = (route.query.state as string | undefined) ?? null

  if (!code || !consumeGoogleState(state)) {
    error.value = 'Login com Google inválido ou expirado. Tente novamente.'
    return
  }

  try {
    const res = await fetch(`${WORKER}/api/auth/student/google/callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, redirectUri: googleRedirectUri('/entrar/google-callback') }),
    })
    const data = await res.json()
    if (!res.ok) {
      error.value = res.status === 403
        ? 'Esse email não é autorizado — use sua conta @aluno.pr.senac.br ou da escola.'
        : 'Falha ao entrar com Google.'
      return
    }
    setToken(data.token)
    router.replace('/')
  } catch {
    error.value = 'Erro de conexão com o servidor.'
  }
})
</script>

<template>
  <div class="max-w-sm mx-auto px-4 py-16 text-center">
    <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
    <p v-else class="text-gray-400 text-sm">Entrando com Google...</p>
    <RouterLink to="/entrar" class="text-neural-accent text-sm hover:underline mt-4 inline-block">← Voltar</RouterLink>
  </div>
</template>
