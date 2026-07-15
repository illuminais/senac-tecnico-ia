<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { AvaliacaoMeta } from '@/types/avaliacoes'

const router = useRouter()
const avaliacoes = ref<AvaliacaoMeta[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('/avaliacoes.json')
    if (res.ok) avaliacoes.value = await res.json()
  } finally {
    loading.value = false
  }
})

function handleClick(av: AvaliacaoMeta) {
  if (av.status === 'published') router.push(`/avaliacao/${av.id}`)
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
      <div v-if="loading" class="flex flex-col gap-3">
        <div v-for="n in 6" :key="n" class="h-20 rounded-2xl bg-neural-800 animate-pulse" />
      </div>

      <div v-else class="flex flex-col gap-3">
        <div
          v-for="av in avaliacoes"
          :key="av.id"
          @click="handleClick(av)"
          :class="[
            'flex items-center justify-between rounded-2xl border p-5 transition',
            av.status === 'published'
              ? 'bg-neural-800 border-neural-700 hover:border-neural-accent/50 cursor-pointer'
              : 'bg-neural-800/40 border-neural-700/40 cursor-default opacity-60',
          ]"
        >
          <div class="flex items-center gap-4">
            <span class="text-neural-accent font-mono text-sm font-bold uppercase">{{ av.id }}</span>
            <div>
              <p class="text-white font-medium text-sm">{{ av.titulo }}</p>
              <p v-if="av.status === 'published'" class="text-gray-400 text-xs mt-0.5">
                Entrega: {{ av.prazoLabel }}
                <span class="ml-2 text-neural-accent font-mono">{{ av.tipo }}</span>
              </p>
              <p v-else class="text-gray-500 text-xs mt-0.5">Em breve</p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span
              v-if="av.status !== 'published'"
              class="text-xs px-2 py-0.5 rounded-full border border-gray-600 text-gray-500"
            >Não liberada</span>
            <span
              v-else
              class="text-xs px-2 py-0.5 rounded-full border border-neural-accent/40 text-neural-accent"
            >Disponível</span>
            <svg v-if="av.status === 'published'" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
  </div>
</template>