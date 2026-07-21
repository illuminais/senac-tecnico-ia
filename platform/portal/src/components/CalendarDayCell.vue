<script setup lang="ts">
import { computed } from 'vue'
import type { CalendarDay } from '@/types/calendar'

const props = defineProps<{
  dayNumber: number | null
  calendarDay: CalendarDay | null
  marker?: { label: string; title: string }
  isToday: boolean
}>()

const emit = defineEmits<{ select: [] }>()

/** Rótulo curto de `tipo` pra recesso/feriado, mesmo texto/cor usado na
 *  linha-exceção (`exceptionLabel` em CalendarMonthGrid) e na observação
 *  do modal (`text-yellow-400/80`) — só que abreviado pra caber na célula. */
const tipoLabel = computed(() => {
  const tipo = props.calendarDay?.tipo
  if (tipo === 'recesso') return 'R'
  if (tipo === 'feriado') return 'F'
  return null
})

const tipoTitle = computed(() => {
  if (!props.calendarDay) return undefined
  if (props.calendarDay.tipo === 'recesso') return props.calendarDay.observacao ?? 'Recesso'
  if (props.calendarDay.tipo === 'feriado') return props.calendarDay.observacao ?? 'Feriado'
  return undefined
})

const stateClass = computed(() => {
  if (!props.calendarDay) return ''
  if (props.calendarDay.tipo === 'recesso' || props.calendarDay.tipo === 'feriado') {
    return 'border border-dashed border-yellow-400/40 bg-neural-800 text-yellow-400/70 hover:border-yellow-400 hover:text-yellow-300'
  }
  return props.calendarDay.status === 'dada'
    ? 'border border-neural-600 bg-neural-800 text-gray-200 hover:border-neural-accent hover:bg-neural-700 hover:text-white'
    : 'border border-dashed border-neural-700 bg-transparent text-gray-400 hover:border-neural-accent hover:text-white'
})

function onSelect() {
  emit('select')
}
</script>

<template>
  <!-- Espaço em branco: coluna não existe naquela semana -->
  <div v-if="dayNumber === null" class="aspect-square" />

  <!-- Dia real sem aula correspondente -->
  <span
    v-else-if="!calendarDay"
    class="relative aspect-square flex items-center justify-center rounded-lg text-[11px] font-mono text-gray-500"
    :class="isToday ? 'ring-2 ring-white ring-offset-1 ring-offset-neural-900' : ''"
    :title="marker?.title"
  >
    {{ dayNumber }}
    <span
      v-if="marker"
      class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-neural-accent text-neural-900
             text-[8px] font-mono font-bold flex items-center justify-center"
    >
      {{ marker.label }}
    </span>
  </span>

  <!-- Dia com aula (dada ou planejada) -->
  <button
    v-else
    class="relative aspect-square flex items-center justify-center rounded-lg text-[11px] font-mono
           cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-accent"
    :class="[stateClass, isToday ? 'ring-2 ring-white ring-offset-1 ring-offset-neural-900' : '']"
    :title="marker?.title ?? tipoTitle"
    @click="onSelect"
  >
    {{ dayNumber }}
    <span
      v-if="marker"
      class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-neural-accent text-neural-900
             text-[8px] font-mono font-bold flex items-center justify-center"
    >
      {{ marker.label }}
    </span>
    <span
      v-if="tipoLabel"
      class="absolute -bottom-1.5 -left-1.5 w-4 h-4 rounded-full bg-yellow-400/90 text-neural-900
             text-[8px] font-mono font-bold flex items-center justify-center"
      :title="tipoTitle"
    >
      {{ tipoLabel }}
    </span>
  </button>
</template>
