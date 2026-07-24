<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { isValidEntregaUrl } from '@shared/pure'
import { useStudentAuth } from '@/composables/useStudentAuth'
import { WORKER } from '@/composables/useAdminAuth'
import { formatEntregaDate } from '@/utils/formatDate'
import type { EntregasMap } from '@/types/entregas'

const props = defineProps<{ avaliacaoId: string }>()

const { token, isLoggedIn } = useStudentAuth()

const loadingEntrega = ref(true)
const link = ref('')
const updatedAt = ref<number | null>(null)
const sending = ref(false)
const sendStatus = ref<'idle' | 'ok' | 'error'>('idle')
const sendError = ref('')
let sendStatusTimeout: ReturnType<typeof setTimeout> | undefined

const jaTemEntrega = computed(() => updatedAt.value !== null)
const enviadoEmLabel = computed(() => (updatedAt.value !== null ? formatEntregaDate(updatedAt.value) : ''))

onMounted(async () => {
  if (!isLoggedIn.value) {
    loadingEntrega.value = false
    return
  }
  try {
    const res = await fetch(`${WORKER}/api/entregas`, {
      headers: { Authorization: `Bearer ${token.value}` },
    })
    if (res.ok) {
      const data: EntregasMap = await res.json()
      const entrega = data[props.avaliacaoId]
      if (entrega) {
        link.value = entrega.link
        updatedAt.value = entrega.updatedAt
      }
    }
  } catch {
    // silencioso — form abre vazio, aluno ainda consegue enviar do zero
  } finally {
    loadingEntrega.value = false
  }
})

onUnmounted(() => {
  if (sendStatusTimeout) clearTimeout(sendStatusTimeout)
})

async function enviarEntrega() {
  if (sendStatusTimeout) clearTimeout(sendStatusTimeout)
  sendStatus.value = 'idle'
  sendError.value = ''

  if (!isValidEntregaUrl(link.value)) {
    sendError.value = 'Link inválido — cole uma URL completa.'
    sendStatus.value = 'error'
    return
  }

  sending.value = true
  try {
    const res = await fetch(`${WORKER}/api/entregas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ avaliacaoId: props.avaliacaoId, link: link.value }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      sendError.value = data.error === 'link inválido' ? 'Link inválido — cole uma URL completa.' : 'Não foi possível enviar sua resposta.'
      sendStatus.value = 'error'
      return
    }
    updatedAt.value = Math.floor(Date.now() / 1000)
    sendStatus.value = 'ok'
    sendStatusTimeout = setTimeout(() => { sendStatus.value = 'idle' }, 3000)
  } catch {
    sendError.value = 'Erro de conexão com o servidor.'
    sendStatus.value = 'error'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div class="mt-8 rounded-2xl border border-neural-600 bg-neural-900/10 p-6">
    <h2 class="text-white font-semibold mb-3">Enviar resposta</h2>

    <template v-if="!isLoggedIn">
      <p class="text-gray-400 text-sm">
        Entre com sua conta para enviar sua resposta.
        <RouterLink to="/entrar" class="text-neural-accent hover:underline">Entrar</RouterLink>
      </p>
    </template>

    <template v-else-if="loadingEntrega">
      <div class="space-y-3">
        <div class="h-10 w-full bg-neural-800 rounded-lg animate-pulse" />
        <div class="h-9 w-24 bg-neural-800 rounded-lg animate-pulse" />
      </div>
    </template>

    <template v-else>
      <p v-if="jaTemEntrega" class="text-gray-400 text-sm mb-3">Enviado em {{ enviadoEmLabel }}</p>
      <form @submit.prevent="enviarEntrega" class="flex flex-col gap-3">
        <input
          v-model="link"
          type="url"
          required
          placeholder="Cole aqui o link da sua resposta (Drive, GitHub, etc.)"
          class="bg-neural-900 border border-neural-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neural-accent"
        />
        <p v-if="sendStatus === 'error'" class="text-red-400 text-sm">{{ sendError }}</p>
        <p v-if="sendStatus === 'ok'" class="text-green-400 text-sm">Resposta enviada!</p>
        <button
          type="submit"
          :disabled="sending"
          class="self-start bg-neural-accent text-neural-900 font-semibold rounded-lg px-4 py-2 hover:opacity-90 disabled:opacity-50 transition"
        >
          {{ sending ? 'Enviando...' : jaTemEntrega ? 'Atualizar' : 'Enviar' }}
        </button>
      </form>
    </template>
  </div>
</template>
