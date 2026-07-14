<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminAuth, WORKER } from '@/composables/useAdminAuth'
import type { CalendarDay } from '@/types/calendar'

const router = useRouter()
const { token } = useAdminAuth()

const days = ref<CalendarDay[]>([])
const loading = ref(true)
const raw = ref('')
const importing = ref(false)
const importStatus = ref<'idle' | 'ok' | 'error'>('idle')
const importError = ref('')

const PLACEHOLDER = `{
  "days": [
    {
      "id": "A42",
      "numero": "A42",
      "data": "2026-07-30",
      "tipo": "aula",
      "status": "dada",
      "observacao": null,
      "blocos": [
        { "uc": "UC07", "disciplina": "Transformação Digital", "conteudo": "...", "ha": 3 },
        { "uc": "UC01", "disciplina": "Fund. Computação", "conteudo": "...", "ha": 3 }
      ]
    }
  ]
}`

async function loadCalendar() {
  loading.value = true
  try {
    const res = await fetch(`${WORKER}/api/calendar`)
    if (res.ok) {
      const data = await res.json()
      days.value = data.days ?? []
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (token.value) loadCalendar()
})

async function importar() {
  importStatus.value = 'idle'
  importError.value = ''

  let payload: unknown
  try {
    payload = JSON.parse(raw.value)
  } catch {
    importStatus.value = 'error'
    importError.value = 'JSON inválido — confira vírgulas e chaves.'
    return
  }

  importing.value = true
  try {
    const res = await fetch(`${WORKER}/api/calendar/import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.value}` },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) {
      importStatus.value = 'error'
      importError.value = data.error ?? 'Falha ao importar.'
      return
    }
    importStatus.value = 'ok'
    raw.value = ''
    await loadCalendar()
  } catch {
    importStatus.value = 'error'
    importError.value = 'Erro de conexão com o servidor.'
  } finally {
    importing.value = false
  }
}
</script>

<template>
  <div class="min-h-dvh px-4 py-8 sm:px-6">
    <header class="max-w-2xl mx-auto mb-8 flex items-center justify-between">
      <div>
        <p class="text-neural-accent text-sm font-mono mb-1">Senac · Admin</p>
        <h1 class="text-2xl font-bold text-white">Importar calendário</h1>
      </div>
      <button @click="router.push('/admin')" class="text-sm text-gray-400 hover:text-white transition">← Admin</button>
    </header>

    <div v-if="!token" class="max-w-sm mx-auto text-center text-sm text-gray-400">
      Faça <RouterLink to="/admin" class="text-neural-accent hover:underline">login</RouterLink> primeiro.
    </div>

    <div v-else class="max-w-2xl mx-auto flex flex-col gap-4">
      <div class="bg-neural-800 rounded-2xl p-6 border border-neural-700">
        <h2 class="text-white font-semibold mb-2">Colar dados (Orion / manual)</h2>
        <p class="text-xs text-gray-500 mb-3">
          Cole um JSON no formato abaixo. Cada dia é upsert por <code>id</code> — reenviar o mesmo <code>id</code> substitui os blocos daquele dia.
        </p>
        <textarea
          v-model="raw"
          rows="14"
          :placeholder="PLACEHOLDER"
          class="w-full bg-neural-900 border border-neural-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neural-accent resize-y font-mono text-xs"
        />
        <p v-if="importStatus === 'error'" class="text-red-400 text-sm mt-2">{{ importError }}</p>
        <p v-if="importStatus === 'ok'" class="text-green-400 text-sm mt-2">Importado com sucesso.</p>
        <button
          @click="importar"
          :disabled="importing || !raw.trim()"
          class="mt-3 bg-neural-accent text-neural-900 font-semibold rounded-lg px-6 py-2 hover:opacity-90 disabled:opacity-50 transition"
        >
          {{ importing ? 'Importando...' : 'Importar' }}
        </button>
      </div>

      <div class="bg-neural-800 rounded-2xl p-6 border border-neural-700">
        <h2 class="text-white font-semibold mb-3">Calendário atual ({{ days.length }} dias)</h2>
        <div v-if="loading" class="text-sm text-gray-500">Carregando...</div>
        <div v-else-if="!days.length" class="text-sm text-gray-500">Nada importado ainda.</div>
        <div v-else class="flex flex-col gap-1 max-h-96 overflow-y-auto">
          <div v-for="day in days" :key="day.id" class="text-xs text-gray-400 flex items-center gap-2 py-1 border-b border-neural-700/50">
            <span class="font-mono text-gray-300">{{ day.numero ?? day.id }}</span>
            <span>{{ day.data }}</span>
            <span class="px-1.5 py-0.5 rounded bg-neural-900" :class="day.status === 'dada' ? 'text-neural-accent' : 'text-gray-500'">
              {{ day.status }}
            </span>
            <span>{{ day.blocos.map(b => b.uc).join(' + ') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
