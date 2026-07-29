<script setup lang="ts">
// Editor da mensagem do banner pro aluno — extraído de AdminView.vue (sprint
// 04), que agora só cuida do login. Rota própria (/admin/mensagem) porque
// virou um ícone verde na sidebar do admin.
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { useAdminAuth, WORKER } from '@/composables/useAdminAuth'

const { token, logout } = useAdminAuth()

const message = ref('')
const loading = ref(true)
const saving = ref(false)
const saveStatus = ref<'idle' | 'ok' | 'error'>('idle')
const preview = ref(false)

onMounted(async () => {
  if (token.value) await loadMessage()
  loading.value = false
})

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
    <header class="max-w-2xl mx-auto mb-8">
      <p class="text-neural-accent text-sm font-mono mb-1">Senac · Admin</p>
      <h1 class="text-2xl font-bold text-white">Mensagem para os alunos</h1>
    </header>

    <div v-if="!token" class="max-w-sm mx-auto text-center text-sm text-gray-400">
      Faça <RouterLink to="/admin" class="text-neural-accent hover:underline">login</RouterLink> primeiro.
    </div>

    <div v-else-if="loading" class="max-w-2xl mx-auto h-40 rounded-2xl bg-neural-800 animate-pulse" />

    <div v-else class="max-w-2xl mx-auto flex flex-col gap-4">
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
