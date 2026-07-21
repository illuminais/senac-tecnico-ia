<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { CalendarDay } from '@/types/calendar'
import { formatDataCurta } from '@/composables/useCalendarStats'
import { calendarUcLabels } from '@/composables/useCalendarGrid'

defineProps<{ day: CalendarDay }>()
const emit = defineEmits<{ close: [] }>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition
      appear
      enter-active-class="transition-opacity duration-150"
      leave-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neural-900/80 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <div
          class="w-full max-w-md rounded-2xl border border-neural-600 bg-neural-800 p-6 shadow-xl
                 max-h-[85vh] overflow-y-auto relative"
          role="dialog"
          aria-modal="true"
        >
          <button
            class="absolute top-4 right-4 text-gray-400 hover:text-white transition
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-accent rounded"
            aria-label="Fechar"
            @click="emit('close')"
          >
            &times;
          </button>

          <div class="flex items-center justify-between gap-3 mb-3 pr-8">
            <span class="text-xs font-mono font-semibold text-neural-accent bg-neural-900 px-2 py-0.5 rounded-full border border-neural-accent/30">
              Aula {{ day.numero ?? day.id }}
            </span>
            <span class="text-xs text-gray-400">{{ formatDataCurta(day.data) }}</span>
          </div>

          <div class="flex flex-col gap-2">
            <div v-for="bloco in day.blocos" :key="bloco.uc" class="text-sm">
              <span class="text-xs px-2 py-0.5 rounded-full bg-neural-600 text-gray-200 mr-2">
                {{ calendarUcLabels[bloco.uc] ?? bloco.uc }}
              </span>
              <span v-if="bloco.ha" class="text-xs text-gray-500">~{{ bloco.ha }}HA</span>
              <p v-if="bloco.conteudo" class="text-gray-400 mt-1">{{ bloco.conteudo }}</p>
            </div>
            <p v-if="day.observacao" class="text-xs text-yellow-400/80">{{ day.observacao }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
