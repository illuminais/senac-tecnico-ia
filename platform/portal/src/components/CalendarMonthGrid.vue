<script setup lang="ts">
import { computed } from 'vue'
import type { CalendarDay } from '@/types/calendar'
import {
  nomeMes, buildGridRows, findDay, findMarker,
  type CalendarMarker,
} from '@/composables/useCalendarGrid'
import CalendarDayCell from '@/components/CalendarDayCell.vue'

const props = defineProps<{
  monthIndex: number // 1-12
  year: number
  days: CalendarDay[] // só os dias deste mês
  markers: CalendarMarker[]
  today: string
}>()

const emit = defineEmits<{ 'select-day': [day: CalendarDay] }>()

const nome = computed(() => nomeMes(props.monthIndex))
const rows = computed(() => buildGridRows(props.year, props.monthIndex, props.days))

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function dateOf(day: number) {
  return `${props.year}-${pad(props.monthIndex)}-${pad(day)}`
}

function dayFor(day: number | null): CalendarDay | null {
  if (day === null) return null
  return findDay(props.days, day)
}

function markerFor(day: number | null) {
  if (day === null) return undefined
  return findMarker(props.markers, dateOf(day))
}

function isToday(day: number | null) {
  return day !== null && dateOf(day) === props.today
}

function nomeDiaSemanaCurto(day: number) {
  const wd = new Date(props.year, props.monthIndex - 1, day).getDay()
  const nomes = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
  return nomes[wd]
}

function select(day: CalendarDay | null) {
  if (day) emit('select-day', day)
}

/** Rótulo da linha-exceção (dia fora de Qui/Sex/Sáb). Prioriza o tipo do dia;
 *  uma aula marcada como 'aula' num dia fora do padrão é, por definição do
 *  curso, uma reposição, mesmo que o registro não tenha sido migrado para
 *  `tipo: 'reposicao'`. */
function exceptionLabel(day: CalendarDay | null): string {
  if (!day) return 'exceção'
  if (day.tipo === 'recesso') return day.observacao ?? 'recesso'
  if (day.tipo === 'reposicao') return 'reposição'
  if (day.tipo === 'feriado') return day.observacao ?? 'feriado'
  return day.observacao ?? 'reposição'
}
</script>

<template>
  <div class="rounded-2xl border border-neural-600 bg-neural-900/10 p-4">
    <h3 class="text-sm font-mono uppercase tracking-widest text-gray-300 mb-3">{{ nome }}</h3>

    <div class="grid grid-cols-3 gap-1 text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-2 text-center">
      <span>Qui</span><span>Sex</span><span>Sáb</span>
    </div>

    <div class="flex flex-col gap-1">
      <template v-for="(gridRow, idx) in rows" :key="idx">
        <div v-if="gridRow.kind === 'week'" class="grid grid-cols-3 gap-1">
          <CalendarDayCell
            :day-number="gridRow.row.thu"
            :calendar-day="dayFor(gridRow.row.thu)"
            :marker="markerFor(gridRow.row.thu)"
            :is-today="isToday(gridRow.row.thu)"
            @select="select(dayFor(gridRow.row.thu))"
          />
          <CalendarDayCell
            :day-number="gridRow.row.fri"
            :calendar-day="dayFor(gridRow.row.fri)"
            :marker="markerFor(gridRow.row.fri)"
            :is-today="isToday(gridRow.row.fri)"
            @select="select(dayFor(gridRow.row.fri))"
          />
          <CalendarDayCell
            :day-number="gridRow.row.sat"
            :calendar-day="dayFor(gridRow.row.sat)"
            :marker="markerFor(gridRow.row.sat)"
            :is-today="isToday(gridRow.row.sat)"
            @select="select(dayFor(gridRow.row.sat))"
          />
        </div>

        <button
          v-else
          class="w-full flex items-center gap-2 rounded-lg border border-dashed border-yellow-400/40
                 bg-neural-800 px-2 py-1.5 text-[11px] font-mono text-yellow-400/90 cursor-pointer
                 transition hover:border-yellow-400 hover:bg-neural-700 hover:text-yellow-300
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-accent"
          :class="isToday(gridRow.day) ? 'ring-2 ring-white ring-offset-1 ring-offset-neural-900' : ''"
          :title="markerFor(gridRow.day)?.title"
          @click="select(dayFor(gridRow.day))"
        >
          {{ pad(gridRow.day) }}/{{ nome.slice(0, 3).toLowerCase() }}
          <span class="text-yellow-400/60">({{ nomeDiaSemanaCurto(gridRow.day) }})</span>
          · {{ exceptionLabel(dayFor(gridRow.day)) }}
        </button>
      </template>
    </div>
  </div>
</template>
