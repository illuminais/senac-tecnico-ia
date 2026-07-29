<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { useRoute } from 'vue-router'
import EntregaForm from '@/components/EntregaForm.vue'
import { useStudentAuth } from '@/composables/useStudentAuth'
import { WORKER } from '@/composables/useAdminAuth'
import type { AvaliacaoApi } from '@/types/avaliacoes'

const route = useRoute()
const { token } = useStudentAuth()
const slug = route.params.id as string

const content = ref('')
const loading = ref(true)
const notFound = ref(false)
const avaliacao = ref<AvaliacaoApi | null>(null)
const aba = ref<'enunciado' | 'entrega'>('enunciado')

onMounted(async () => {
  try {
    const [contentRes, avaliacoesRes] = await Promise.all([
      fetch(`/avaliacoes/${slug}/content.md`),
      fetch(`${WORKER}/api/avaliacoes`, {
        headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
      }),
    ])
    if (!contentRes.ok) { notFound.value = true; return }
    content.value = await contentRes.text()

    if (avaliacoesRes.ok) {
      const lista: AvaliacaoApi[] = await avaliacoesRes.json()
      avaliacao.value = lista.find(av => av.slug === slug) ?? null
    }
  } catch {
    notFound.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-dvh px-4 py-8 sm:px-6">
    <div class="max-w-3xl mx-auto flex flex-col gap-6">
      <div v-if="loading" class="space-y-4">
        <div class="h-8 w-2/3 bg-neural-800 rounded animate-pulse" />
        <div class="h-4 w-full bg-neural-800 rounded animate-pulse" />
        <div class="h-4 w-5/6 bg-neural-800 rounded animate-pulse" />
      </div>

      <div v-else-if="notFound" class="text-center py-16">
        <p class="text-gray-500">Avaliação não encontrada.</p>
      </div>

      <template v-else>
        <div class="flex gap-2">
          <button
            @click="aba = 'enunciado'"
            :class="aba === 'enunciado' ? 'bg-neural-accent text-neural-900 font-semibold' : 'bg-neural-800 text-gray-400 hover:text-white hover:bg-neural-700'"
            class="px-3 py-1 rounded-full text-xs transition"
          >Enunciado</button>
          <button
            @click="aba = 'entrega'"
            :class="aba === 'entrega' ? 'bg-neural-accent text-neural-900 font-semibold' : 'bg-neural-800 text-gray-400 hover:text-white hover:bg-neural-700'"
            class="px-3 py-1 rounded-full text-xs transition"
          >Entrega</button>
        </div>

        <article v-if="aba === 'enunciado'" class="md-content" v-html="marked.parse(content)" />

        <div v-else class="flex flex-col gap-4">
          <EntregaForm
            :avaliacao-id="slug"
            :prazo="avaliacao?.prazo ?? null"
            :prazo-label="avaliacao?.prazoLabel ?? null"
            :tem-nota="avaliacao?.indicadores.some(ind => ind.notaValor !== null) ?? false"
          />

          <div
            v-if="avaliacao?.indicadores.some(ind => ind.notaValor)"
            class="rounded-2xl border border-neural-600 bg-neural-900/10 p-6 flex flex-col gap-3"
          >
            <h2 class="text-white font-semibold">Sua correção</h2>
            <div
              v-for="ind in avaliacao!.indicadores.filter(i => i.notaValor)"
              :key="ind.codigo"
              class="flex flex-col gap-1 border-t border-neural-700 pt-3 first:border-t-0 first:pt-0"
            >
              <div class="flex items-center gap-2">
                <span class="font-mono text-xs text-neural-accent">{{ ind.codigo }}</span>
                <span
                  class="text-xs px-2 py-0.5 rounded-full border font-semibold"
                  :class="{
                    'border-green-400/40 text-green-400': ind.notaValor === 'A',
                    'border-yellow-400/40 text-yellow-400': ind.notaValor === 'PA',
                    'border-red-400/40 text-red-400': ind.notaValor === 'NA',
                  }"
                >{{ ind.notaValor }}</span>
              </div>
              <p class="text-gray-400 text-xs">{{ ind.descricao }}</p>
              <p v-if="ind.comentario" class="text-gray-300 text-sm mt-1">{{ ind.comentario }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.md-content { color: #e2e8f0; line-height: 1.7; }
.md-content :deep(h1) { font-size: 1.5rem; font-weight: 700; color: #fff; margin: 0 0 1rem; }
.md-content :deep(h2) { font-size: 1.15rem; font-weight: 600; color: #fff; margin: 2rem 0 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid #252538; }
.md-content :deep(h3) { font-size: 1rem; font-weight: 600; color: #cbd5e1; margin: 1.5rem 0 0.5rem; }
.md-content :deep(p) { margin: 0.75rem 0; }
.md-content :deep(strong) { color: #fff; }
.md-content :deep(em) { color: #94a3b8; }
.md-content :deep(ul), .md-content :deep(ol) { padding-left: 1.5rem; margin: 0.75rem 0; }
.md-content :deep(li) { margin: 0.35rem 0; }
.md-content :deep(code) { background: #1a1a28; color: #22c55e; padding: 0.1em 0.4em; border-radius: 4px; font-size: 0.875em; }
.md-content :deep(blockquote) { border-left: 3px solid #22c55e; padding: 0.5rem 1rem; margin: 1rem 0; color: #94a3b8; background: #111118; border-radius: 0 6px 6px 0; }
.md-content :deep(hr) { border: none; border-top: 1px solid #252538; margin: 1.5rem 0; }
.md-content :deep(table) { width: 100%; border-collapse: collapse; font-size: 0.9rem; margin: 1rem 0; }
.md-content :deep(th) { text-align: left; padding: 0.5rem 0.75rem; background: #1a1a28; color: #22c55e; border-bottom: 1px solid #252538; }
.md-content :deep(td) { padding: 0.5rem 0.75rem; border-bottom: 1px solid #1a1a28; }
.md-content :deep(tr:last-child td) { border-bottom: none; }
</style>
