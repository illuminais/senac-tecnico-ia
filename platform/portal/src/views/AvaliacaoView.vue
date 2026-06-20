<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const WORKER = 'https://lms-senac-tecnico-ia.leo-zn-97.workers.dev'

const route  = useRoute()
const router = useRouter()
const { isLoggedIn, authHeaders, loginWithGoogle } = useAuth()

const content  = ref('')
const loading  = ref(true)
const notFound = ref(false)

// Entrega
const entregaLink    = ref('')
const entregaStatus  = ref<'idle' | 'sending' | 'ok' | 'error'>('idle')
const entregaError   = ref('')

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

async function submitEntrega() {
  entregaError.value  = ''
  entregaStatus.value = 'sending'
  try {
    const res = await fetch(`${WORKER}/api/entregas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders.value },
      body: JSON.stringify({ avaliacaoId: route.params.id, link: entregaLink.value }),
    })
    if (!res.ok) {
      const data = await res.json() as { error?: string }
      entregaError.value  = data.error ?? 'Erro ao enviar.'
      entregaStatus.value = 'error'
      return
    }
    entregaStatus.value = 'ok'
  } catch {
    entregaError.value  = 'Sem conexão. Tente novamente.'
    entregaStatus.value = 'error'
  }
}
</script>

<template>
  <div class="min-h-dvh bg-neural-900 px-4 py-8 sm:px-6">
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

      <!-- Entrega -->
      <div v-if="!loading && !notFound" class="mt-10 pt-8 border-t border-neural-700">
        <h2 class="text-white font-semibold mb-4">Enviar resposta</h2>

        <!-- Logado: formulário de entrega -->
        <template v-if="isLoggedIn">
          <div v-if="entregaStatus === 'ok'" class="flex items-center gap-2 text-green-400 text-sm">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Entrega registrada com sucesso.
          </div>
          <div v-else class="flex flex-col sm:flex-row gap-3">
            <input
              v-model="entregaLink"
              type="url"
              placeholder="Cole o link da sua entrega (Google Drive, GitHub...)"
              class="flex-1 bg-neural-800 border border-neural-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neural-accent"
              :disabled="entregaStatus === 'sending'"
            />
            <button
              @click="submitEntrega"
              :disabled="!entregaLink || entregaStatus === 'sending'"
              class="px-5 py-2.5 rounded-lg bg-neural-accent text-neural-900 text-sm font-semibold hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              {{ entregaStatus === 'sending' ? 'Enviando...' : 'Enviar' }}
            </button>
          </div>
          <p v-if="entregaError" class="text-red-400 text-xs mt-2">{{ entregaError }}</p>
        </template>

        <!-- Não logado: prompt de login -->
        <div v-else class="flex items-center gap-4 p-4 rounded-xl bg-neural-800/60 border border-neural-700">
          <p class="text-sm text-gray-400 flex-1">Faça login com sua conta <span class="text-white">@escola.pr.gov.br</span> para enviar sua resposta.</p>
          <button
            @click="loginWithGoogle"
            class="flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg bg-neural-accent text-neural-900 font-semibold hover:opacity-90 transition shrink-0"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Entrar com Google
          </button>
        </div>
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