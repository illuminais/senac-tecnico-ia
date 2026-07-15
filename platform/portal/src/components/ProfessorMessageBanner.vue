<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

const WORKER = 'https://lms-senac-tecnico-ia.dev-leozanini.workers.dev'
const professorMessage = ref('')

onMounted(async () => {
  try {
    const res = await fetch(`${WORKER}/api/message`)
    if (res.ok) {
      const data = await res.json()
      professorMessage.value = data.message ?? ''
    }
  } catch {}
})
</script>

<template>
  <div
    v-if="professorMessage"
    class="mt-3 rounded-xl max-w-xl border border-neural-accent/30 bg-neural-800/60 px-4 py-3"
  >
    <p class="text-neural-accent text-xs font-mono uppercase tracking-widest mb-1">Mensagem do professor</p>
    <div class="text-sm text-gray-200 leading-relaxed" v-html="marked.parse(professorMessage)" />
  </div>
</template>
