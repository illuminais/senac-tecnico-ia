<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { WORKER } from '@/composables/useAdminAuth'
import { useStudentAuth } from '@/composables/useStudentAuth'
import type { AvaliacaoApi } from '@/types/avaliacoes'
import AvaliacaoCard from '@/components/AvaliacaoCard.vue'

const { token } = useStudentAuth()

const avaliacoes = ref<AvaliacaoApi[]>([])
const loading = ref(true)
const error = ref('')

const TRIMESTRE_LABELS: Record<string, string> = {
  T1: 'Trimestre 1',
  T2: 'Trimestre 2',
  T3: 'Trimestre 3',
}

// Agrupa por trimestre (RF7) preservando a ordem T1 → T2 → T3 mesmo se a API
// não vier ordenada (hoje vem, mas não vale confiar nisso no client).
const porTrimestre = computed(() => {
  const grupos = new Map<string, AvaliacaoApi[]>()
  for (const av of avaliacoes.value) {
    const lista = grupos.get(av.trimestre) ?? []
    lista.push(av)
    grupos.set(av.trimestre, lista)
  }
  return [...grupos.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([trimestre, itens]) => ({ trimestre, itens }))
})

onMounted(async () => {
  try {
    // JWT de aluno é opcional (a rota funciona sem) — só manda o header
    // quando existe sessão, pra resolver prazo/status pela turma do aluno.
    const headers: Record<string, string> = {}
    if (token.value) headers.Authorization = `Bearer ${token.value}`

    const res = await fetch(`${WORKER}/api/avaliacoes`, { headers })
    if (!res.ok) throw new Error(`status ${res.status}`)
    avaliacoes.value = await res.json()
  } catch {
    error.value = 'Não foi possível carregar as avaliações agora. Tente novamente mais tarde.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto flex flex-col gap-8">
    <div v-if="loading" class="flex flex-col gap-3">
      <div v-for="n in 6" :key="n" class="h-20 rounded-2xl bg-neural-800 animate-pulse" />
    </div>

    <p v-else-if="error" class="text-red-400 text-center py-16">{{ error }}</p>

    <p v-else-if="!avaliacoes.length" class="text-gray-500 text-center py-16">
      Nenhuma avaliação cadastrada ainda.
    </p>

    <template v-else>
      <section v-for="grupo in porTrimestre" :key="grupo.trimestre" class="flex flex-col gap-3">
        <h2 class="text-white font-semibold text-lg">
          {{ TRIMESTRE_LABELS[grupo.trimestre] ?? grupo.trimestre }}
        </h2>
        <div class="flex flex-col gap-3">
          <AvaliacaoCard v-for="av in grupo.itens" :key="av.slug" :avaliacao="av" />
        </div>
      </section>
    </template>
  </div>
</template>
