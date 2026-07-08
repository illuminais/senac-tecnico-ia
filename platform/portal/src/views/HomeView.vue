<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { AulaMeta } from '@/types/aulas'
import AulaCard from '@/components/AulaCard.vue'

const aulas = ref<AulaMeta[]>([])
const loading = ref(true)
const error = ref('')
const ucAtiva = ref<string | null>(null)

const ucsDisponiveis = computed(() => {
  const set = new Set<string>()
  aulas.value.forEach(a => a.ucs.forEach(uc => set.add(uc)))
  return [...set].sort((a, b) => Number(a) - Number(b))
})

const aulasFiltradas = computed(() =>
  ucAtiva.value ? aulas.value.filter(a => a.ucs.includes(ucAtiva.value!)) : aulas.value
)

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
    
    <div v-if="!loading && ucsDisponiveis.length" class="mb-4 flex flex-wrap gap-2">
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

    <main v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AulaCard v-for="aula in aulasFiltradas" :key="aula.slug" :aula="aula" :ucAtiva="ucAtiva" />
    </main>
  </div>
</template>