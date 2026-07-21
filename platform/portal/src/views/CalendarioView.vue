<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { CalendarDay, ResumoHaUc } from '@/types/calendar'
import { useCalendarStats } from '@/composables/useCalendarStats'
import { calendarUcLabels } from '@/composables/useCalendarGrid'
import CalendarYearGrid from '@/components/CalendarYearGrid.vue'
import CalendarDayModal from '@/components/CalendarDayModal.vue'

const WORKER = 'https://lms-senac-tecnico-ia.dev-leozanini.workers.dev'

const { days, loading, error, dadas, planejadas, recessos, totalHA } = useCalendarStats()

const resumoHa = ref<ResumoHaUc[]>([])
const resumoHaLoading = ref(true)
const resumoHaError = ref('')

const ucLabels = calendarUcLabels

const selectedDay = ref<CalendarDay | null>(null)

function onSelectDay(day: CalendarDay) {
  selectedDay.value = day
}

onMounted(async () => {
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
  <div class="max-w-6xl mx-auto">
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="n in 12" :key="n" class="h-48 rounded-2xl bg-neural-800 animate-pulse" />
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

      <div class="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-gray-500 font-mono">
        <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded border border-neural-600 bg-neural-800"></span> dada</span>
        <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded border border-dashed border-neural-700"></span> planejada</span>
        <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-neural-accent"></span> marco (passe o mouse)</span>
        <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded ring-2 ring-white"></span> hoje</span>
        <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded border border-dashed border-yellow-400/40"></span> reposição fora de Qui/Sex/Sáb</span>
      </div>

      <CalendarYearGrid :days="days" :year="2026" @select-day="onSelectDay" />

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
    </div>

    <CalendarDayModal v-if="selectedDay" :day="selectedDay" @close="selectedDay = null" />
  </div>
</template>
