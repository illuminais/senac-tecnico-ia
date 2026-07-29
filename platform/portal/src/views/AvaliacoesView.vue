<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { WORKER } from '@/composables/useAdminAuth'
import { useStudentAuth } from '@/composables/useStudentAuth'
import type { AvaliacaoApi } from '@/types/avaliacoes'
import AvaliacaoCard from '@/components/AvaliacaoCard.vue'
import { TRIMESTRES, trimestreAtual } from '@/utils/trimestres'

const { token } = useStudentAuth()

const avaliacoes = ref<AvaliacaoApi[]>([])
const loading = ref(true)
const error = ref('')
const abaAtiva = ref(trimestreAtual())

const TRIMESTRE_LABELS: Record<string, string> = {
  T1: 'Trimestre 1',
  T2: 'Trimestre 2',
  T3: 'Trimestre 3',
}

// Sempre as 3 abas (mesmo sem avaliação cadastrada ainda, ex: T3), na ordem
// fixa T1 → T2 → T3 — não depende do que a API devolveu.
const porTrimestre = computed(() =>
  TRIMESTRES.map(t => ({
    trimestre: t.id,
    itens: avaliacoes.value.filter(av => av.trimestre === t.id),
  }))
)

const grupoAtivo = computed(() => porTrimestre.value.find(g => g.trimestre === abaAtiva.value)?.itens ?? [])

onMounted(async () => {
  try {
    // JWT de aluno é opcional (a rota funciona sem) — só manda o header
    // quando existe sessão, pra resolver prazo/status pela turma do aluno.
    const headers: Record<string, string> = {}
    if (token.value) headers.Authorization = `Bearer ${token.value}`

    const res = await fetch(`${WORKER}/api/avaliacoes`, { headers })
    if (!res.ok) throw new Error(`status ${res.status}`)
    avaliacoes.value = await res.json()

    // Marca como vistas (sprint 04) — some o badge da sidebar na próxima vez
    // que ela perguntar. Silencioso: se falhar, o badge só continua aceso.
    if (token.value && avaliacoes.value.length) {
      fetch(`${WORKER}/api/avaliacoes/marcar-vistas`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ slugs: avaliacoes.value.map(av => av.slug) }),
      }).catch(() => {})
    }
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

    <template v-else>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="t in porTrimestre" :key="t.trimestre"
          @click="abaAtiva = t.trimestre"
          :class="abaAtiva === t.trimestre ? 'bg-neural-accent text-neural-900 font-semibold' : 'bg-neural-800 text-gray-400 hover:text-white hover:bg-neural-700'"
          class="px-3 py-1 rounded-full text-xs transition"
        >{{ TRIMESTRE_LABELS[t.trimestre] ?? t.trimestre }}</button>
      </div>

      <section class="flex flex-col gap-3">
        <p v-if="!grupoAtivo.length" class="text-gray-500 text-center py-16">
          Nenhuma avaliação cadastrada ainda.
        </p>
        <div v-else class="flex flex-col gap-3">
          <AvaliacaoCard v-for="av in grupoAtivo" :key="av.slug" :avaliacao="av" />
        </div>
      </section>
    </template>
  </div>
</template>
