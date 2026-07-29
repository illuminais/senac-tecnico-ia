<script setup lang="ts">
// Painel de cobertura (RF9, T8): todos os indicadores do mapa curricular de
// um trimestre + turma, inclusive os sem nenhuma avaliação vinculada (CA2,
// razão de ser desta tela). `GET /api/admin/ucs` é buscado uma única vez ao
// montar (não por indicador) e resolvido localmente na expansão (RF19/CA10).
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminAuth, WORKER } from '@/composables/useAdminAuth'
import SeletorTurma from '@/components/SeletorTurma.vue'
import IndicadorPainelRow from '@/components/IndicadorPainelRow.vue'
import type { TurmaApi, UcApi, PainelIndicador } from '@/types/admin-painel'

const router = useRouter()
const { token } = useAdminAuth()

const TRIMESTRES = ['T1', 'T2', 'T3'] as const
const trimestre = ref<(typeof TRIMESTRES)[number]>('T2')

const turmas = ref<TurmaApi[]>([])
const turmaId = ref<string | null>(null)
const turmasLoading = ref(true)
const turmasError = ref('')

const ucsByCodigo = ref(new Map<string, UcApi>())

const indicadores = ref<PainelIndicador[]>([])
const loading = ref(true)
const error = ref('')

// Agrupa por UC (RF9) preservando ordem alfabética de código.
const porUc = computed(() => {
  const grupos = new Map<string, PainelIndicador[]>()
  for (const ind of indicadores.value) {
    const lista = grupos.get(ind.uc) ?? []
    lista.push(ind)
    grupos.set(ind.uc, lista)
  }
  return [...grupos.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([uc, itens]) => ({ uc, nome: ucsByCodigo.value.get(uc)?.nome ?? uc, itens }))
})

async function loadTurmasEUcs() {
  turmasLoading.value = true
  turmasError.value = ''
  try {
    const headers = { Authorization: `Bearer ${token.value}` }
    const [turmasRes, ucsRes] = await Promise.all([
      fetch(`${WORKER}/api/admin/turmas`, { headers }),
      fetch(`${WORKER}/api/admin/ucs`, { headers }),
    ])
    if (!turmasRes.ok || !ucsRes.ok) throw new Error('falha ao carregar turmas/ucs')
    turmas.value = await turmasRes.json()
    const ucs: UcApi[] = await ucsRes.json()
    ucsByCodigo.value = new Map(ucs.map(u => [u.codigo, u]))
  } catch {
    turmasError.value = 'Não foi possível carregar turmas/UCs agora. Tente novamente mais tarde.'
  } finally {
    turmasLoading.value = false
  }
}

async function loadPainel() {
  if (!turmaId.value) return
  loading.value = true
  error.value = ''
  try {
    const params = new URLSearchParams({ trimestre: trimestre.value, turma: turmaId.value })
    const res = await fetch(`${WORKER}/api/admin/painel?${params}`, {
      headers: { Authorization: `Bearer ${token.value}` },
    })
    if (!res.ok) throw new Error(`status ${res.status}`)
    indicadores.value = await res.json()
  } catch {
    error.value = 'Não foi possível carregar o painel agora. Tente novamente mais tarde.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (token.value) loadTurmasEUcs()
})

watch([trimestre, turmaId], () => {
  if (token.value && turmaId.value) loadPainel()
})
</script>

<template>
  <div class="min-h-dvh px-4 py-8 sm:px-6">
    <header class="max-w-4xl mx-auto mb-8 flex items-center justify-between">
      <div>
        <p class="text-neural-accent text-sm font-mono mb-1">Senac · Admin</p>
        <h1 class="text-2xl font-bold text-white">Painel de Avaliações</h1>
      </div>
      <button @click="router.push('/admin')" class="text-sm text-gray-400 hover:text-white transition">← Admin</button>
    </header>

    <div v-if="!token" class="max-w-sm mx-auto text-center text-sm text-gray-400">
      Faça <RouterLink to="/admin" class="text-neural-accent hover:underline">login</RouterLink> primeiro.
    </div>

    <div v-else class="max-w-4xl mx-auto flex flex-col gap-6">
      <div v-if="turmasLoading" class="flex flex-col gap-3">
        <div v-for="n in 3" :key="n" class="h-10 rounded-lg bg-neural-800 animate-pulse" />
      </div>

      <p v-else-if="turmasError" class="text-red-400 text-center py-16">{{ turmasError }}</p>

      <p v-else-if="!turmas.length" class="text-gray-500 text-center py-16">
        Nenhuma turma cadastrada ainda.
      </p>

      <template v-else>
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex gap-1.5">
            <button
              v-for="t in TRIMESTRES"
              :key="t"
              @click="trimestre = t"
              :class="trimestre === t ? 'bg-neural-accent text-neural-900 font-semibold' : 'bg-neural-600 text-gray-200 hover:text-white'"
              class="text-xs px-3 py-1.5 rounded-full transition"
            >
              {{ t }}
            </button>
          </div>
          <SeletorTurma v-model="turmaId" :turmas="turmas" />
        </div>

        <div v-if="loading" class="flex flex-col gap-3">
          <div v-for="n in 5" :key="n" class="h-24 rounded-2xl bg-neural-800 animate-pulse" />
        </div>

        <p v-else-if="error" class="text-red-400 text-center py-16">{{ error }}</p>

        <p v-else-if="!indicadores.length" class="text-gray-500 text-center py-16">
          Nenhum indicador cadastrado para este trimestre.
        </p>

        <template v-else>
          <section v-for="grupo in porUc" :key="grupo.uc" class="flex flex-col gap-3">
            <h2 class="text-white font-semibold">
              <span class="font-mono text-neural-accent">{{ grupo.uc }}</span> — {{ grupo.nome }}
            </h2>
            <div class="flex flex-col gap-2">
              <IndicadorPainelRow
                v-for="ind in grupo.itens"
                :key="ind.codigo"
                :indicador="ind"
                :ucs-by-codigo="ucsByCodigo"
              />
            </div>
          </section>
        </template>
      </template>
    </div>
  </div>
</template>
