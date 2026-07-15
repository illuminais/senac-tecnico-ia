<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { useRoute, useRouter } from 'vue-router'
import { useStudentAuth } from '@/composables/useStudentAuth'
import { WORKER } from '@/composables/useAdminAuth'

const route = useRoute()
const router = useRouter()
const content = ref('')
const loading = ref(true)
const notFound = ref(false)

const { token } = useStudentAuth()
const link = ref('')
const sending = ref(false)
const sendStatus = ref<'idle' | 'ok' | 'error'>('idle')
const sendError = ref('')

onMounted(async () => {
  const id = route.params.id as string
  try {
    const res = await fetch(`/avaliacoes/${id}/content.md`)
    if (!res.ok) { notFound.value = true; return }
    content.value = await res.text()
  } catch {
    notFound.value = true
  } finally {
    loading.value = false
  }
})

async function enviarEntrega() {
  sending.value = true
  sendStatus.value = 'idle'
  sendError.value = ''
  try {
    const res = await fetch(`${WORKER}/api/entregas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ avaliacaoId: route.params.id, link: link.value }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      sendError.value = data.error === 'link inválido' ? 'Link inválido — cole uma URL completa.' : 'Não foi possível enviar sua resposta.'
      sendStatus.value = 'error'
      return
    }
    sendStatus.value = 'ok'
  } catch {
    sendError.value = 'Erro de conexão com o servidor.'
    sendStatus.value = 'error'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div class="min-h-dvh px-4 py-8 sm:px-6">
    <div class="max-w-3xl mx-auto">
      <button
        @click="router.push('/avaliacoes')"
        class="text-sm text-gray-400 hover:text-white transition mb-6 flex items-center gap-1"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Avaliações
      </button>

      <div v-if="loading" class="space-y-4">
        <div class="h-8 w-2/3 bg-neural-800 rounded animate-pulse" />
        <div class="h-4 w-full bg-neural-800 rounded animate-pulse" />
        <div class="h-4 w-5/6 bg-neural-800 rounded animate-pulse" />
      </div>

      <div v-else-if="notFound" class="text-center py-16">
        <p class="text-gray-500">Avaliação não encontrada.</p>
      </div>

      <article v-else class="md-content" v-html="marked.parse(content)" />

      <div v-if="!loading && !notFound" class="mt-8 rounded-2xl border border-neural-600 bg-neural-900/10 p-6">
        <h2 class="text-white font-semibold mb-3">Enviar resposta</h2>

        <template v-if="token">
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
              {{ sending ? 'Enviando...' : 'Enviar' }}
            </button>
          </form>
        </template>

        <template v-else>
          <p class="text-gray-400 text-sm">
            Entre com sua conta para enviar sua resposta.
            <RouterLink to="/entrar" class="text-neural-accent hover:underline">Entrar</RouterLink>
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.md-content { color: #e2e8f0; line-height: 1.7; }
.md-content :deep(h1) { font-size: 1.5rem; font-weight: 700; color: #fff; margin: 0 0 1rem; }
.md-content :deep(h2) { font-size: 1.15rem; font-weight: 600; color: #fff; margin: 2rem 0 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid #252538; }
.md-content :deep(h3) { font-size: 1rem; font-weight: 600; color: #cbd5e1; margin: 1.5rem 0 0.5rem; }
.md-content :deep(p) { margin: 0.75rem 0; }
.md-content :deep(strong) { color: #fff; }
.md-content :deep(em) { color: #94a3b8; }
.md-content :deep(ul), .md-content :deep(ol) { padding-left: 1.5rem; margin: 0.75rem 0; }
.md-content :deep(li) { margin: 0.35rem 0; }
.md-content :deep(code) { background: #1a1a28; color: #22c55e; padding: 0.1em 0.4em; border-radius: 4px; font-size: 0.875em; }
.md-content :deep(blockquote) { border-left: 3px solid #22c55e; padding: 0.5rem 1rem; margin: 1rem 0; color: #94a3b8; background: #111118; border-radius: 0 6px 6px 0; }
.md-content :deep(hr) { border: none; border-top: 1px solid #252538; margin: 1.5rem 0; }
.md-content :deep(table) { width: 100%; border-collapse: collapse; font-size: 0.9rem; margin: 1rem 0; }
.md-content :deep(th) { text-align: left; padding: 0.5rem 0.75rem; background: #1a1a28; color: #22c55e; border-bottom: 1px solid #252538; }
.md-content :deep(td) { padding: 0.5rem 0.75rem; border-bottom: 1px solid #1a1a28; }
.md-content :deep(tr:last-child td) { border-bottom: none; }
</style>