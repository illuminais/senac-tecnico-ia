<script setup lang="ts">
// Célula da grade (T9): mostra o valor atual (A/PA/NA/vazio) e o estado
// "sujo" (alterado sem salvar, RF11). Não decide nada sozinha — clique e
// teclado são só eventos nativos do <button> raiz, tratados pela view
// (AdminGradeView + useGradeKeyboard) via fallthrough de atributos do Vue
// (não declaramos `emits`, então @click/@keydown do pai caem direto no
// elemento raiz). `focus()` é exposto pra navegação por teclado poder mover
// o foco programaticamente.
import { ref } from 'vue'
import type { NotaCelula } from '@/types/admin-grade'

defineProps<{
  valor: NotaCelula
  dirty: boolean
}>()

const buttonRef = ref<HTMLButtonElement | null>(null)

defineExpose({
  focus: () => buttonRef.value?.focus(),
})

const labelMap: Record<Exclude<NotaCelula, null>, string> = { A: 'A', PA: 'PA', NA: 'NA' }
const colorMap: Record<Exclude<NotaCelula, null>, string> = {
  A: 'bg-neural-accent/20 text-neural-accent border-neural-accent/50',
  PA: 'bg-yellow-400/20 text-yellow-400 border-yellow-400/50',
  NA: 'bg-red-400/20 text-red-400 border-red-400/50',
}
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    class="w-12 h-10 rounded-lg border text-xs font-mono font-semibold transition
           flex items-center justify-center
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-accent"
    :class="[
      valor ? colorMap[valor] : 'bg-neural-900 text-gray-600 border-neural-700 hover:border-neural-600',
      dirty ? 'ring-2 ring-yellow-400/80' : '',
    ]"
    :title="dirty ? 'Alteração não salva' : undefined"
  >
    {{ valor ? labelMap[valor] : '·' }}
  </button>
</template>
