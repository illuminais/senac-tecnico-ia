<script setup lang="ts">
// Reaproveitado por AdminPainelView (T8) e, nas próximas tasks, AdminGradeView
// e AdminBoletimView (T9/T10) — mesma interface nas três telas.
//
// Interface: props `turmas: TurmaApi[]` + `modelValue: string | null`
// (v-model do id da turma selecionada); emite `update:modelValue`.
//
// Comportamento (plan.md — "unstyled quando length === 1"): com 0 ou 1 turma
// não há controle interativo — só um rótulo discreto (ou nada, se a lista
// ainda não chegou). Com 1 turma, seleciona automaticamente (emite o id dela)
// pra quem consome não precisar tratar esse caso especial. Com 2+, mostra um
// <select> estilizado e não seleciona nada sozinho — o usuário escolhe.
import { watch } from 'vue'
import type { TurmaApi } from '@/types/admin-painel'

const props = defineProps<{
  turmas: TurmaApi[]
  modelValue: string | null
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>()

watch(
  () => props.turmas,
  turmas => {
    if (turmas.length === 1 && props.modelValue !== turmas[0].id) {
      emit('update:modelValue', turmas[0].id)
    }
  },
  { immediate: true },
)

function onChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value || null)
}
</script>

<template>
  <p v-if="turmas.length <= 1" class="text-sm text-gray-400">
    Turma: <span class="text-gray-200 font-mono">{{ turmas[0]?.id ?? '—' }}</span>
  </p>

  <select
    v-else
    :value="modelValue ?? ''"
    @change="onChange"
    class="bg-neural-900 border border-neural-700 rounded-lg px-3 py-1.5 text-sm text-white
           focus:outline-none focus:border-neural-accent"
  >
    <option value="" disabled>Selecione a turma</option>
    <option v-for="t in turmas" :key="t.id" :value="t.id">
      {{ t.id }}{{ t.status === 'concluida' ? ' (concluída)' : '' }}
    </option>
  </select>
</template>
