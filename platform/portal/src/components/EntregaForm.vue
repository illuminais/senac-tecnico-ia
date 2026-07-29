<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { isValidEntregaUrl } from '@shared/pure'
import { useStudentAuth } from '@/composables/useStudentAuth'
import { WORKER } from '@/composables/useAdminAuth'
import { formatEntregaDate, prazoEncerrado } from '@/utils/formatDate'
import type { EntregasMap } from '@/types/entregas'

const props = defineProps<{
  avaliacaoId: string
  prazo: string | null
  prazoLabel: string | null
  // (sprint 04) já existe nota lançada, segundo GET /api/avaliacoes — cobre o
  // caso raro de o professor corrigir sem nunca ter existido uma entrega
  // (GET /api/entregas só devolve `corrigida` pra quem TEM linha em `entregas`).
  temNota?: boolean
}>()

const { token, isLoggedIn } = useStudentAuth()

const loadingEntrega = ref(true)
const link = ref('')
const updatedAt = ref<number | null>(null)
const corrigidaServidor = ref(false)
const corrigida = computed(() => corrigidaServidor.value || !!props.temNota)
const sending = ref(false)
const sendStatus = ref<'idle' | 'ok' | 'error'>('idle')
const sendError = ref('')
let sendStatusTimeout: ReturnType<typeof setTimeout> | undefined

const jaTemEntrega = computed(() => updatedAt.value !== null)
const enviadoEmLabel = computed(() => (updatedAt.value !== null ? formatEntregaDate(updatedAt.value) : ''))
const prazoEsgotado = computed(() => prazoEncerrado(props.prazo))

// Estado de exibição (sprint 04): enviando (mid-flight) > enviada > corrigida
// (travada) > prazo encerrado (nunca entregou) > não entregue.
const estado = computed<'enviando' | 'enviada' | 'corrigida' | 'prazo-encerrado' | 'nao-entregue'>(() => {
  if (sending.value) return 'enviando'
  if (corrigida.value) return 'corrigida'
  if (jaTemEntrega.value) return 'enviada'
  if (prazoEsgotado.value) return 'prazo-encerrado'
  return 'nao-entregue'
})

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
        corrigidaServidor.value = entrega.corrigida
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
      if (res.status === 403) {
        corrigidaServidor.value = true
        sendError.value = data.error ?? 'Entrega já corrigida — peça ao professor pra reabrir.'
      } else {
        sendError.value = data.error === 'link inválido' ? 'Link inválido — cole uma URL completa.' : 'Não foi possível enviar sua resposta.'
      }
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
  <div class="rounded-2xl border border-neural-600 bg-neural-900/10 p-6">
    <div class="flex items-center justify-between gap-3 mb-3">
      <h2 class="text-white font-semibold">Enviar resposta</h2>
      <span
        class="text-xs px-2 py-0.5 rounded-full border font-semibold shrink-0"
        :class="{
          'border-neural-accent/40 text-neural-accent': estado === 'enviando',
          'border-green-400/40 text-green-400': estado === 'enviada' || estado === 'corrigida',
          'border-yellow-400/40 text-yellow-400': estado === 'prazo-encerrado',
          'border-gray-600 text-gray-500': estado === 'nao-entregue',
        }"
      >{{
        estado === 'enviando' ? 'Enviando...'
        : estado === 'enviada' ? 'Enviada'
        : estado === 'corrigida' ? 'Corrigida'
        : estado === 'prazo-encerrado' ? 'Prazo encerrado'
        : 'Não entregue'
      }}</span>
    </div>

    <p v-if="prazoLabel" class="text-gray-400 text-xs mb-3">Prazo: {{ prazoLabel }}</p>

    <!-- Instruções fixas de formato — texto, não validação de host (código em
         GitHub também é aceito, só o Drive precisa de permissão de leitura). -->
    <div class="text-xs text-gray-400 bg-neural-900 border border-neural-700 rounded-lg p-3 mb-4 flex flex-col gap-1">
      <p>Cole um link acessível pelo professor:</p>
      <p>• <strong class="text-gray-300">Google Drive</strong>: confira se a permissão está em "qualquer pessoa com o link pode visualizar" antes de enviar.</p>
      <p>• <strong class="text-gray-300">Código</strong>: link do GitHub (repositório ou arquivo), não precisa ser Drive.</p>
      <p>• Nunca envie só uma foto solta sem link — o professor precisa conseguir abrir sem pedir permissão de novo.</p>
    </div>

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

    <template v-else-if="corrigida">
      <p class="text-gray-400 text-sm">
        Esta entrega já foi corrigida e está travada — o link não pode mais ser trocado.
        Fale com o professor se precisar reenviar.
      </p>
      <p class="text-gray-500 text-xs mt-2 break-all">Link entregue: {{ link }}</p>
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
