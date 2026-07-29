<script setup lang="ts">
// Grade de lançamento de nota (T9, RF10/RF11/RF12). Linhas = alunos da turma
// resolvida, colunas = indicadores da avaliação. Estado local sujo + botão
// salvar explícito (plan.md: "90 PUTs em sequência é frágil e sem undo") —
// um único PUT em lote manda só o diff contra o snapshot que veio do servidor.
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminAuth, WORKER } from '@/composables/useAdminAuth'
import { useGradeKeyboard } from '@/composables/useGradeKeyboard'
import SeletorTurma from '@/components/SeletorTurma.vue'
import IndicadorColunaHeader from '@/components/IndicadorColunaHeader.vue'
import NotaCell from '@/components/NotaCell.vue'
import type { TurmaApi, UcApi } from '@/types/admin-painel'
import type { GradeApi, NotaCelula, NotaUpdate } from '@/types/admin-grade'

const route = useRoute()
const router = useRouter()
const { token } = useAdminAuth()

const slug = route.params.slug as string

const turmas = ref<TurmaApi[]>([])
const turmaId = ref<string | null>((route.query.turma as string) || null)
const turmasLoading = ref(true)
const turmasError = ref('')

const ucsByCodigo = ref(new Map<string, UcApi>())

const gradeData = ref<GradeApi | null>(null)
const loading = ref(false)
const error = ref('')

// Snapshot original (o que veio do servidor) vs. estado local editável.
// Ambos no mesmo shape: userId -> indicadorCodigo -> valor (null = não avaliado).
const notasOriginal = ref<Record<string, Record<string, NotaCelula>>>({})
const notasLocal = reactive<Record<string, Record<string, NotaCelula>>>({})

const salvando = ref(false)
const saveStatus = ref<'idle' | 'ok' | 'error'>('idle')

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

function buildNotasState(data: GradeApi) {
  const original: Record<string, Record<string, NotaCelula>> = {}
  for (const aluno of data.alunos) {
    const row: Record<string, NotaCelula> = {}
    for (const ind of data.indicadores) {
      row[ind.codigo] = (aluno.notas[ind.codigo] as NotaCelula) ?? null
    }
    original[aluno.id] = row
  }
  notasOriginal.value = original

  for (const key of Object.keys(notasLocal)) delete notasLocal[key]
  for (const [userId, row] of Object.entries(original)) notasLocal[userId] = { ...row }
}

async function loadGrade() {
  if (!turmaId.value) return
  loading.value = true
  error.value = ''
  saveStatus.value = 'idle'
  try {
    const params = new URLSearchParams({ turma: turmaId.value })
    const res = await fetch(`${WORKER}/api/admin/grade/${slug}?${params}`, {
      headers: { Authorization: `Bearer ${token.value}` },
    })
    if (res.status === 404) { error.value = 'Avaliação não encontrada.'; gradeData.value = null; return }
    if (!res.ok) throw new Error(`status ${res.status}`)
    const data: GradeApi = await res.json()
    gradeData.value = data
    buildNotasState(data)
  } catch {
    error.value = 'Não foi possível carregar a grade agora. Tente novamente mais tarde.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (token.value) loadTurmasEUcs()
})

watch(turmaId, () => {
  if (token.value && turmaId.value) loadGrade()
})

function valorAtual(userId: string, codigo: string): NotaCelula {
  return notasLocal[userId]?.[codigo] ?? null
}

function isDirty(userId: string, codigo: string): boolean {
  const original = notasOriginal.value[userId]?.[codigo] ?? null
  return valorAtual(userId, codigo) !== original
}

function setValorPorIndices(row: number, col: number, valor: NotaCelula) {
  const aluno = gradeData.value?.alunos[row]
  const indicador = gradeData.value?.indicadores[col]
  if (!aluno || !indicador) return
  if (!notasLocal[aluno.id]) notasLocal[aluno.id] = {}
  notasLocal[aluno.id][indicador.codigo] = valor
}

// "Marcar coluna toda" (RF11): aplica um valor a TODOS os alunos daquele
// indicador. Toca só aquela coluna — nenhuma outra célula de nenhum aluno é
// alterada, então uma coluna sem nota lançada continua vazia (CA4).
function marcarColuna(codigo: string, valor: NotaCelula) {
  if (!gradeData.value) return
  for (const aluno of gradeData.value.alunos) {
    if (!notasLocal[aluno.id]) notasLocal[aluno.id] = {}
    notasLocal[aluno.id][codigo] = valor
  }
}

const pendingChanges = computed<NotaUpdate[]>(() => {
  const data = gradeData.value
  if (!data) return []
  const changes: NotaUpdate[] = []
  for (const aluno of data.alunos) {
    for (const ind of data.indicadores) {
      const atual = valorAtual(aluno.id, ind.codigo)
      const original = notasOriginal.value[aluno.id]?.[ind.codigo] ?? null
      if (atual !== original) {
        changes.push({ userId: aluno.id, avaliacaoSlug: data.avaliacao.slug, indicadorCodigo: ind.codigo, valor: atual })
      }
    }
  }
  return changes
})

async function salvar() {
  if (!pendingChanges.value.length) return
  salvando.value = true
  saveStatus.value = 'idle'
  try {
    const res = await fetch(`${WORKER}/api/admin/notas`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.value}` },
      body: JSON.stringify({ notas: pendingChanges.value }),
    })
    if (!res.ok) throw new Error(`status ${res.status}`)
    // Sincroniza o snapshot original com o que acabou de ser salvo — o diff
    // volta a zero até a próxima edição.
    const synced: Record<string, Record<string, NotaCelula>> = {}
    for (const [userId, row] of Object.entries(notasLocal)) synced[userId] = { ...row }
    notasOriginal.value = synced
    saveStatus.value = 'ok'
  } catch {
    saveStatus.value = 'error'
  } finally {
    salvando.value = false
    setTimeout(() => { saveStatus.value = 'idle' }, 3000)
  }
}

// Navegação por teclado (RF11) — cellRefs[row][col] guarda a instância de
// NotaCell (expõe .focus()) pra mover o foco programaticamente.
const cellRefs = ref<({ focus: () => void } | null)[][]>([])

function setCellRef(row: number, col: number, el: unknown) {
  if (!cellRefs.value[row]) cellRefs.value[row] = []
  cellRefs.value[row][col] = el as { focus: () => void } | null
}

function focusCell(row: number, col: number) {
  cellRefs.value[row]?.[col]?.focus()
}

const { handleKeydown } = useGradeKeyboard({
  numRows: () => gradeData.value?.alunos.length ?? 0,
  numCols: () => gradeData.value?.indicadores.length ?? 0,
  focusCell,
  onSetValue: setValorPorIndices,
})
</script>

<template>
  <div class="min-h-dvh px-4 py-8 sm:px-6">
    <header class="max-w-6xl mx-auto mb-8 flex items-center justify-between gap-4">
      <div>
        <p class="text-neural-accent text-sm font-mono mb-1">Senac · Admin</p>
        <h1 class="text-2xl font-bold text-white">{{ gradeData?.avaliacao.titulo ?? slug }}</h1>
      </div>
      <button @click="router.push('/admin/avaliacoes')" class="text-sm text-gray-400 hover:text-white transition shrink-0">
        ← Painel
      </button>
    </header>

    <div v-if="!token" class="max-w-sm mx-auto text-center text-sm text-gray-400">
      Faça <RouterLink to="/admin" class="text-neural-accent hover:underline">login</RouterLink> primeiro.
    </div>

    <div v-else class="max-w-6xl mx-auto flex flex-col gap-6">
      <div v-if="turmasLoading" class="flex flex-col gap-3">
        <div v-for="n in 3" :key="n" class="h-10 rounded-lg bg-neural-800 animate-pulse" />
      </div>

      <p v-else-if="turmasError" class="text-red-400 text-center py-16">{{ turmasError }}</p>

      <p v-else-if="!turmas.length" class="text-gray-500 text-center py-16">
        Nenhuma turma cadastrada ainda.
      </p>

      <template v-else>
        <SeletorTurma v-model="turmaId" :turmas="turmas" />

        <div v-if="loading" class="flex flex-col gap-3">
          <div v-for="n in 6" :key="n" class="h-12 rounded-lg bg-neural-800 animate-pulse" />
        </div>

        <p v-else-if="error" class="text-red-400 text-center py-16">{{ error }}</p>

        <p v-else-if="!gradeData" class="text-gray-500 text-center py-16">
          Selecione uma turma para ver a grade.
        </p>

        <p v-else-if="!gradeData.alunos.length" class="text-gray-500 text-center py-16">
          Nenhum aluno cadastrado nesta turma ainda.
        </p>

        <template v-else>
          <p v-if="!gradeData.avaliacaoTurma" class="text-yellow-400 text-sm">
            Esta turma ainda não tem prazo/status definido para esta avaliação.
          </p>

          <div class="flex items-center gap-3">
            <button
              @click="salvar"
              :disabled="!pendingChanges.length || salvando"
              class="bg-neural-accent text-neural-900 font-semibold rounded-lg px-6 py-2 hover:opacity-90 disabled:opacity-50 transition"
            >
              {{ salvando ? 'Salvando...' : `Salvar${pendingChanges.length ? ` (${pendingChanges.length} alteração${pendingChanges.length > 1 ? 'ões' : ''} pendente${pendingChanges.length > 1 ? 's' : ''})` : ''}` }}
            </button>
            <span v-if="saveStatus === 'ok'" class="text-green-400 text-sm">Salvo!</span>
            <span v-if="saveStatus === 'error'" class="text-red-400 text-sm">Erro ao salvar.</span>
          </div>

          <div class="overflow-auto rounded-2xl border border-neural-700 max-h-[70vh]">
            <table class="border-collapse">
              <thead>
                <tr>
                  <th class="sticky top-0 left-0 z-30 bg-neural-800 text-left text-xs text-gray-400 font-semibold px-4 py-3 min-w-[200px]">
                    Aluno
                  </th>
                  <th
                    v-for="ind in gradeData.indicadores"
                    :key="ind.codigo"
                    class="sticky top-0 z-20 bg-neural-800 px-2 py-3 align-top"
                  >
                    <IndicadorColunaHeader
                      :indicador="ind"
                      :uc="ucsByCodigo.get(ind.uc)"
                      @marcar-coluna="valor => marcarColuna(ind.codigo, valor)"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(aluno, rowIndex) in gradeData.alunos" :key="aluno.id" class="border-t border-neural-700">
                  <td class="sticky left-0 z-10 bg-neural-900 px-4 py-2 text-sm text-gray-200">
                    <div class="flex items-center gap-2">
                      <span>{{ aluno.nome ?? aluno.email ?? aluno.id }}</span>
                      <span
                        class="text-xs shrink-0"
                        :class="aluno.entregou ? 'text-green-400' : 'text-gray-600'"
                        :title="aluno.entregou ? 'Entregou' : 'Não entregou'"
                      >
                        {{ aluno.entregou ? '✓ entregou' : '— sem entrega' }}
                      </span>
                    </div>
                  </td>
                  <td
                    v-for="(ind, colIndex) in gradeData.indicadores"
                    :key="ind.codigo"
                    class="px-2 py-2 text-center"
                  >
                    <NotaCell
                      :ref="el => setCellRef(rowIndex, colIndex, el)"
                      :valor="valorAtual(aluno.id, ind.codigo)"
                      :dirty="isDirty(aluno.id, ind.codigo)"
                      @click="focusCell(rowIndex, colIndex)"
                      @keydown="handleKeydown($event, rowIndex, colIndex)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="text-xs text-gray-500">
            Clique numa célula e digite <span class="font-mono">A</span>/<span class="font-mono">P</span>/<span class="font-mono">N</span>
            para lançar a nota (desce pro próximo aluno automaticamente); setas navegam; Backspace/Delete limpa.
          </p>
        </template>
      </template>
    </div>
  </div>
</template>
