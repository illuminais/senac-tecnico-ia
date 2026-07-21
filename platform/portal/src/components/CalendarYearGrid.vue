<script setup lang="ts">
import { computed } from 'vue'
import type { CalendarDay } from '@/types/calendar'
import { bucketizeByMonth, type CalendarMarker } from '@/composables/useCalendarGrid'
import CalendarMonthGrid from '@/components/CalendarMonthGrid.vue'

const props = withDefaults(defineProps<{
  days: CalendarDay[]
  year?: number
}>(), {
  year: 2026,
})

const emit = defineEmits<{ 'select-day': [day: CalendarDay] }>()

const markers: CalendarMarker[] = [
  { date: '2026-02-26', label: 'IN', title: 'Início do curso · 26/02/2026' },
  { date: '2026-05-14', label: 'T1', title: 'Fim do Trimestre 1 · 14/05/2026' },
  { date: '2026-09-04', label: 'T2', title: 'Fim do Trimestre 2 · 04/09/2026' },
  { date: '2026-12-18', label: 'T3', title: 'Fim do Trimestre 3 · Encerramento do curso · 18/12/2026' },
]

const today = new Date().toISOString().slice(0, 10)

const monthBuckets = computed(() => bucketizeByMonth(props.days))

function onSelectDay(day: CalendarDay) {
  emit('select-day', day)
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <CalendarMonthGrid
      v-for="month in 12"
      :key="month"
      :month-index="month"
      :year="year"
      :days="monthBuckets[month - 1]"
      :markers="markers"
      :today="today"
      @select-day="onSelectDay"
    />
  </div>
</template>
