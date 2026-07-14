<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { CalendarDay, ResumoHaUc } from '@/types/calendar'

const WORKER = 'https://lms-senac-tecnico-ia.leo-zn-97.workers.dev'

const days = ref<CalendarDay[]>([])
const loading = ref(true)
const error = ref('')

const resumoHa = ref<ResumoHaUc[]>([])
const resumoHaLoading = ref(true)
const resumoHaError = ref('')

const ucLabels: Record<string, string> = {
  UC01: 'UC01 Computação', UC02: 'UC02 Inglês', UC03: 'UC03 Matemática',
  UC04: 'UC04 Conceitos IA', UC05: 'UC05 Python', UC06: 'UC06 GPU e CPU',
  UC07: 'UC07 Trans. Digital', UC08: 'UC08 Banco de Dados', UC09: 'UC09 Estatística',
}

const dadas = computed(() => days.value.filter(d => d.status === 'dada' && d.tipo !== 'recesso'))
const planejadas = computed(() => days.value.filter(d => d.status === 'planejada'))
const recessos = computed(() => days.value.filter(d => d.tipo === 'recesso'))

const totalHA = computed(() =>
  dadas.value.reduce((sum, d) => sum + d.blocos.reduce((s, b) => s + (b.ha ?? 0), 0), 0)
)

function formatData(data: string) {
  const [, month, day] = data.split('-')
  const months = ['', 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
  return `${day}/${months[Number(month)] ?? month}`
}

onMounted(async () => {
  try {
    const res = await fetch(`${WORKER}/api/calendar`)
    if (!res.ok) throw new Error('Falha ao carregar calendário')
    const data = await res.json()
    days.value = data.days ?? []
  } catch (e) {
    error.value = 'Não foi possível carregar o calendário.'
    console.error(e)
  } finally {
    loading.value = false
  }

  try {
    const res = await fetch(`${WORKER}/api/calendar/resumo-ha`)
    if (!res.ok) throw new Error('Falha ao carregar resumo de HA')
    const data = await res.json()
    resumoHa.value = data.ucs ?? []
  } catch (e) {
    resumoHaError.value = 'Não foi possível carregar o resumo de HA por UC.'
    console.error(e)
  } finally {
    resumoHaLoading.value = false
  }
})
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <div v-if="loading" class="grid gap-4">
      <div v-for="n in 4" :key="n" class="h-24 rounded-2xl bg-neural-800 animate-pulse" />
    </div>

    <div v-else-if="error" class="text-center py-16">
      <p class="text-red-400">{{ error }}</p>
    </div>

    <div v-else-if="!days.length" class="text-center py-16">
      <p class="text-gray-500">Calendário ainda não foi publicado.</p>
    </div>

    <div v-else class="flex flex-col gap-8">
      <div class="text-sm text-gray-400">
        <span class="text-white font-semibold">{{ dadas.length }}</span> aulas dadas ·
        <span class="text-white font-semibold">{{ totalHA }}</span> HA acumuladas ·
        <span class="text-white font-semibold">{{ planejadas.length }}</span> aulas planejadas pela frente
      </div>

      <section>
        <h2 class="text-xs font-mono uppercase tracking-widest text-neural-accent mb-3">Já dadas</h2>
        <div class="flex flex-col gap-3">
          <div
            v-for="day in dadas" :key="day.id"
            class="rounded-2xl border border-neural-600 bg-neural-900/10 p-5"
          >
            <div class="flex items-center justify-between gap-3 mb-3">
              <span class="text-xs font-mono font-semibold text-neural-accent bg-neural-900 px-2 py-0.5 rounded-full border border-neural-accent/30">
                Aula {{ day.numero ?? day.id }}
              </span>
              <span class="text-xs text-gray-400">{{ formatData(day.data) }}</span>
            </div>
            <div class="flex flex-col gap-2">
              <div v-for="bloco in day.blocos" :key="bloco.uc" class="text-sm">
                <span class="text-xs px-2 py-0.5 rounded-full bg-neural-600 text-gray-200 mr-2">
                  {{ ucLabels[bloco.uc] ?? bloco.uc }}
                </span>
                <span v-if="bloco.ha" class="text-xs text-gray-500">~{{ bloco.ha }}HA</span>
                <p v-if="bloco.conteudo" class="text-gray-400 mt-1">{{ bloco.conteudo }}</p>
              </div>
              <p v-if="day.observacao" class="text-xs text-yellow-400/80">{{ day.observacao }}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">HA por UC / trimestre</h2>

        <div v-if="resumoHaLoading" class="grid gap-2">
          <div v-for="n in 3" :key="n" class="h-8 rounded-lg bg-neural-800 animate-pulse" />
        </div>

        <p v-else-if="resumoHaError" class="text-red-400 text-sm">{{ resumoHaError }}</p>

        <p v-else-if="!resumoHa.length" class="text-gray-500 text-sm">Nenhuma HA registrada ainda.</p>

        <div v-else class="rounded-2xl border border-neural-600 bg-neural-900/10 overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-xs font-mono uppercase tracking-widest text-gray-500 border-b border-neural-700">
                <th class="px-4 py-2 font-normal">UC</th>
                <th class="px-4 py-2 font-normal text-right">T1</th>
                <th class="px-4 py-2 font-normal text-right">T2</th>
                <th class="px-4 py-2 font-normal text-right">T3</th>
                <th class="px-4 py-2 font-normal text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in resumoHa" :key="row.uc" class="border-b border-neural-700 last:border-b-0">
                <td class="px-4 py-2 text-gray-200">{{ ucLabels[row.uc] ?? row.uc }}</td>
                <td class="px-4 py-2 text-right text-gray-400">{{ row.t1 }}</td>
                <td class="px-4 py-2 text-right text-gray-400">{{ row.t2 }}</td>
                <td class="px-4 py-2 text-right text-gray-400">{{ row.t3 }}</td>
                <td class="px-4 py-2 text-right text-white font-semibold">{{ row.t1 + row.t2 + row.t3 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section v-if="recessos.length">
        <div v-for="r in recessos" :key="r.id" class="rounded-xl border border-dashed border-neural-600 px-4 py-3 text-sm text-gray-500">
          {{ r.observacao ?? 'Recesso' }}
        </div>
      </section>

      <section v-if="planejadas.length">
        <h2 class="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">Pela frente</h2>
        <div class="flex flex-col gap-2">
          <div
            v-for="day in planejadas" :key="day.id"
            class="rounded-xl border border-neural-700 px-4 py-3 flex items-center justify-between gap-3"
          >
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-mono text-gray-500">{{ day.numero ?? day.id }}</span>
              <span v-for="bloco in day.blocos" :key="bloco.uc" class="text-xs px-2 py-0.5 rounded-full bg-neural-800 text-gray-400">
                {{ ucLabels[bloco.uc] ?? bloco.uc }}
              </span>
              <span v-if="day.observacao" class="text-xs text-yellow-400/80">{{ day.observacao }}</span>
            </div>
            <span class="text-xs text-gray-500">{{ formatData(day.data) }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
