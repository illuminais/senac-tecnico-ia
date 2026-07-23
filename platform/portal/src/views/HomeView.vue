<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { AulaMeta } from '@/types/aulas'
import AulaCard from '@/components/AulaCard.vue'
import { useCalendarStats, formatDataCurta } from '@/composables/useCalendarStats'
import { ucFullLabel } from '@/composables/useUcLabels'

const PAGE_SIZE = 9

const aulas = ref<AulaMeta[]>([])
const loading = ref(true)
const error = ref('')
const ucAtiva = ref<string | null>(null)
const searchTerm = ref('')
const page = ref(1)

// Stats bar — fetch independente do /aulas.json acima, nunca bloqueia a grid.
const { loading: statsLoading, error: statsError, dadas, proximaAula } = useCalendarStats()
const aulasDadas = computed(() => dadas.value.length)
const proximaAulaUcs = computed(() => proximaAula.value?.blocos.map(b => b.uc).join(' + ') ?? '')

const ucsDisponiveis = computed(() => {
  const set = new Set<string>()
  aulas.value.forEach(a => a.ucs.forEach(uc => set.add(uc)))
  return [...set].sort((a, b) => Number(a) - Number(b))
})

const aulasPorUc = computed(() =>
  ucAtiva.value ? aulas.value.filter(a => a.ucs.includes(ucAtiva.value!)) : aulas.value
)

function matchesTermo(aula: AulaMeta, termo: string) {
  if (aula.titulo?.toLowerCase().includes(termo)) return true
  if (aula.numero?.toLowerCase().includes(termo)) return true
  return aula.ucs.some(uc => ucFullLabel(uc).toLowerCase().includes(termo))
}

const aulasFiltradas = computed(() => {
  const termo = searchTerm.value.trim().toLowerCase()
  if (!termo) return aulasPorUc.value
  return aulasPorUc.value.filter(a => matchesTermo(a, termo))
})

const totalFiltrado = computed(() => aulasFiltradas.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(totalFiltrado.value / PAGE_SIZE)))
const aulasPaginadas = computed(() =>
  aulasFiltradas.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE)
)

const tituloContexto = computed(() => {
  const uc = ucAtiva.value
  const termo = searchTerm.value.trim()
  if (uc && termo) return `${ucFullLabel(uc)} · resultados para "${termo}"`
  if (uc) return ucFullLabel(uc)
  if (termo) return `Resultados para "${termo}"`
  return ''
})

watch([searchTerm, ucAtiva], () => {
  page.value = 1
})

onMounted(async () => {
  try {
    const res = await fetch('/aulas.json')
    if (!res.ok) throw new Error('aulas.json nao encontrado')
    aulas.value = await res.json()
  } catch (e) {
    error.value = 'Nao foi possivel carregar as aulas.'
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex flex-col gap-6">

      <!-- Busca -->
      <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104 4a7.5 7.5 0 0012.65 12.65z" />
        </svg>
        <input
          v-model="searchTerm"
          type="search"
          autocomplete="off"
          aria-label="Buscar aulas"
          placeholder="Buscar por título, número ou UC..."
          class="w-full bg-neural-900 border border-neural-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neural-accent"
        />
      </div>

      <!-- Pills de filtro por UC -->
      <div v-if="!loading && ucsDisponiveis.length" class="flex flex-wrap justify-center gap-2">
        <button
          @click="ucAtiva = null"
          :class="ucAtiva === null ? 'bg-neural-accent text-neural-900 font-semibold' : 'bg-neural-800 text-gray-400 hover:text-white hover:bg-neural-700'"
          class="px-3 py-1 rounded-full text-xs transition"
        >Todas</button>
        <button
          v-for="uc in ucsDisponiveis" :key="uc"
          @click="ucAtiva = ucAtiva === uc ? null : uc"
          :class="ucAtiva === uc ? 'bg-neural-accent text-neural-900 font-semibold' : 'bg-neural-800 text-gray-400 hover:text-white hover:bg-neural-700'"
          class="px-3 py-1 rounded-full text-xs transition"
        >UC{{ uc.padStart(2, '0') }}</button>
      </div>

      <div v-if="loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="n in 6" :key="n" class="h-36 rounded-2xl bg-neural-800 animate-pulse" />
      </div>

      <div v-else-if="error" class="text-center py-16">
        <p class="text-red-400">{{ error }}</p>
      </div>

      <div v-else-if="!aulas.length" class="text-center py-16">
        <p class="text-gray-500">Nenhuma aula disponivel ainda.</p>
      </div>

      <template v-else>
        <!-- Linha de contexto do filtro + stats -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
          <p class="text-sm text-gray-400">
            <template v-if="tituloContexto"><span class="text-white font-medium">{{ tituloContexto }}</span> · </template>{{ totalFiltrado }} aula{{ totalFiltrado === 1 ? '' : 's' }}
          </p>

          <div v-if="statsLoading" class="h-4 w-64 rounded bg-neural-800 animate-pulse sm:ml-auto" />
          <p v-else-if="statsError" class="text-xs text-gray-600 sm:text-right">Estatísticas indisponíveis.</p>
          <p v-else class="text-sm text-gray-400 sm:text-right">
            <span class="text-white font-semibold">{{ aulasDadas }}</span> aulas dadas ·
            <template v-if="proximaAula">
              Próxima aula: <span class="text-white font-semibold">{{ formatDataCurta(proximaAula.data) }}</span><template v-if="proximaAulaUcs"> — {{ proximaAulaUcs }}</template>
            </template>
            <template v-else>Próxima aula: nenhuma aula planejada</template>
            · Final do 2º trimestre: <span class="text-white font-semibold">14/09</span>
          </p>
        </div>

        <div v-if="!totalFiltrado" class="text-center py-16">
          <p class="text-gray-500">
            Nenhuma aula encontrada para "{{ searchTerm.trim() }}"<template v-if="ucAtiva"> em UC{{ ucAtiva.padStart(2, '0') }}</template>.
          </p>
        </div>

        <template v-else>
          <main class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AulaCard v-for="aula in aulasPaginadas" :key="aula.slug" :aula="aula" :ucAtiva="ucAtiva" @select-uc="ucAtiva = $event" />
          </main>

          <div v-if="totalPages > 1" class="flex items-center justify-center gap-4 mt-2">
            <button class="text-sm text-gray-400 hover:text-white transition disabled:opacity-50 disabled:hover:text-gray-400" :disabled="page === 1" @click="page--">Anterior</button>
            <span class="text-xs font-mono text-gray-500">Página {{ page }} de {{ totalPages }}</span>
            <button class="text-sm text-gray-400 hover:text-white transition disabled:opacity-50 disabled:hover:text-gray-400" :disabled="page === totalPages" @click="page++">Próximo</button>
          </div>
        </template>
      </template>

    </div>
  </div>
</template>
