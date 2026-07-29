<script setup lang="ts">
// Grade de lançamento de nota (T9, RF10/RF11/RF12 + sprint 04). Dois modos:
// "Lista" (default, sprint 04) — uma linha por aluno com status de entrega +
// nota resumida; clicar abre o painel de detalhe (link entregue, histórico,
// nota+comentário por indicador). "Planilha" (T9 original) — grid aluno x
// indicador com atalhos de teclado, útil pra marcar A em massa; PA/NA aqui
// ainda exige abrir o aluno na Lista pra completar o comentário obrigatório
// (o worker rejeita silenciosamente PA/NA sem comentário — ver `rejeitadas`).
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminAuth, WORKER } from '@/composables/useAdminAuth'
import { useGradeKeyboard } from '@/composables/useGradeKeyboard'
import { formatEntregaDate, prazoEncerrado } from '@/utils/formatDate'
import SeletorTurma from '@/components/SeletorTurma.vue'
import IndicadorColunaHeader from '@/components/IndicadorColunaHeader.vue'
import NotaCell from '@/components/NotaCell.vue'
import type { TurmaApi, UcApi } from '@/types/admin-painel'
import type { GradeApi, NotaCelula, NotaUpdate, EntregaHistoricoItem } from '@/types/admin-grade'

const route = useRoute()
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

const modo = ref<'lista' | 'planilha'>('lista')

// Snapshot original (o que veio do servidor) vs. estado local editável.
// userId -> indicadorCodigo -> valor/comentario (null = não avaliado/vazio).
const notasOriginal = ref<Record<string, Record<string, NotaCelula>>>({})
const notasLocal = reactive<Record<string, Record<string, NotaCelula>>>({})
const comentariosOriginal = ref<Record<string, Record<string, string | null>>>({})
const comentariosLocal = reactive<Record<string, Record<string, string | null>>>({})

const salvando = ref(false)
const saveStatus = ref<'idle' | 'ok' | 'aviso' | 'error'>('idle')
const saveMessage = ref('')

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
  const originalComentarios: Record<string, Record<string, string | null>> = {}
  for (const aluno of data.alunos) {
    const row: Record<string, NotaCelula> = {}
    const comentRow: Record<string, string | null> = {}
    for (const ind of data.indicadores) {
      row[ind.codigo] = (aluno.notas[ind.codigo] as NotaCelula) ?? null
      comentRow[ind.codigo] = aluno.comentarios[ind.codigo] ?? null
    }
    original[aluno.id] = row
    originalComentarios[aluno.id] = comentRow
  }
  notasOriginal.value = original
  comentariosOriginal.value = originalComentarios

  for (const key of Object.keys(notasLocal)) delete notasLocal[key]
  for (const [userId, row] of Object.entries(original)) notasLocal[userId] = { ...row }

  for (const key of Object.keys(comentariosLocal)) delete comentariosLocal[key]
  for (const [userId, row] of Object.entries(originalComentarios)) comentariosLocal[userId] = { ...row }
}

async function loadGrade() {
  if (!turmaId.value) return
  loading.value = true
  error.value = ''
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

// `immediate: true` — sprint 04 passou a linkar aqui com `?turma=` já
// preenchido (abas de avaliação do AdminPainelView), então `turmaId` pode
// vir com valor certo desde o mount, sem o `SeletorTurma` precisar emitir
// uma mudança pra disparar o load (turma única com o mesmo id não emite).
watch(turmaId, () => {
  if (token.value && turmaId.value) loadGrade()
}, { immediate: true })

function valorAtual(userId: string, codigo: string): NotaCelula {
  return notasLocal[userId]?.[codigo] ?? null
}

function comentarioAtual(userId: string, codigo: string): string {
  return comentariosLocal[userId]?.[codigo] ?? ''
}

function isDirty(userId: string, codigo: string): boolean {
  const originalValor = notasOriginal.value[userId]?.[codigo] ?? null
  const originalComentario = comentariosOriginal.value[userId]?.[codigo] ?? null
  return valorAtual(userId, codigo) !== originalValor || comentarioAtual(userId, codigo) !== (originalComentario ?? '')
}

// Comentário obrigatório (RF do sprint 04) quando o valor não é 'A' — mesma
// regra validada no worker; aqui só pra dar feedback visual antes de salvar.
function precisaComentario(userId: string, codigo: string): boolean {
  const valor = valorAtual(userId, codigo)
  return valor !== null && valor !== 'A' && !comentarioAtual(userId, codigo).trim()
}

function setValorPorIndices(row: number, col: number, valor: NotaCelula) {
  const aluno = gradeData.value?.alunos[row]
  const indicador = gradeData.value?.indicadores[col]
  if (!aluno || !indicador) return
  if (!notasLocal[aluno.id]) notasLocal[aluno.id] = {}
  notasLocal[aluno.id][indicador.codigo] = valor
}

function setValor(userId: string, codigo: string, valor: NotaCelula) {
  if (!notasLocal[userId]) notasLocal[userId] = {}
  notasLocal[userId][codigo] = valor
}

function setComentario(userId: string, codigo: string, comentario: string) {
  if (!comentariosLocal[userId]) comentariosLocal[userId] = {}
  comentariosLocal[userId][codigo] = comentario
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
      if (!isDirty(aluno.id, ind.codigo)) continue
      const atual = valorAtual(aluno.id, ind.codigo)
      changes.push({
        userId: aluno.id,
        avaliacaoSlug: data.avaliacao.slug,
        indicadorCodigo: ind.codigo,
        valor: atual,
        comentario: atual ? comentarioAtual(aluno.id, ind.codigo) : null,
      })
    }
  }
  return changes
})

async function salvar() {
  if (!pendingChanges.value.length) return
  salvando.value = true
  saveStatus.value = 'idle'
  saveMessage.value = ''
  try {
    const res = await fetch(`${WORKER}/api/admin/notas`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.value}` },
      body: JSON.stringify({ notas: pendingChanges.value }),
    })
    if (!res.ok) throw new Error(`status ${res.status}`)
    const data = await res.json() as { aplicadas: number; rejeitadas: number }
    // Recarrega da fonte de verdade em vez de sincronizar manualmente — assim
    // notas rejeitadas (PA/NA sem comentário) continuam aparecendo como
    // "não salvas" (dirty), nunca fingindo sucesso.
    await loadGrade()
    if (data.rejeitadas > 0) {
      saveStatus.value = 'aviso'
      saveMessage.value = `${data.rejeitadas} nota${data.rejeitadas > 1 ? 's' : ''} PA/NA sem comentário não foi${data.rejeitadas > 1 ? 'ram' : ''} salva${data.rejeitadas > 1 ? 's' : ''} — escreva o comentário antes de salvar de novo.`
    } else {
      saveStatus.value = 'ok'
    }
  } catch {
    saveStatus.value = 'error'
    saveMessage.value = 'Erro ao salvar.'
  } finally {
    salvando.value = false
    setTimeout(() => { saveStatus.value = 'idle'; saveMessage.value = '' }, 5000)
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

// --- Modo Lista (sprint 04) ---------------------------------------------

const selectedUserId = ref<string | null>(null)
const alunoSelecionado = computed(() => gradeData.value?.alunos.find(a => a.id === selectedUserId.value) ?? null)

const historicoAberto = ref(false)
const historicoLoading = ref(false)
const historicoItens = ref<EntregaHistoricoItem[]>([])

function abrirDetalhe(userId: string) {
  selectedUserId.value = userId
  historicoAberto.value = false
  historicoItens.value = []
}

function fecharDetalhe() {
  selectedUserId.value = null
}

async function toggleHistorico() {
  if (historicoAberto.value) { historicoAberto.value = false; return }
  historicoAberto.value = true
  if (!selectedUserId.value || historicoItens.value.length) return
  historicoLoading.value = true
  try {
    const res = await fetch(`${WORKER}/api/admin/entregas-historico/${slug}/${selectedUserId.value}`, {
      headers: { Authorization: `Bearer ${token.value}` },
    })
    if (res.ok) historicoItens.value = await res.json()
  } finally {
    historicoLoading.value = false
  }
}

const ORDEM_GRAVIDADE = { NA: 2, PA: 1, A: 0 } as const

function notaResumida(userId: string): NotaCelula {
  if (!gradeData.value) return null
  const valores = gradeData.value.indicadores
    .map(ind => valorAtual(userId, ind.codigo))
    .filter((v): v is Exclude<NotaCelula, null> => v !== null)
  if (!valores.length) return null
  return valores.reduce((pior, atual) => (ORDEM_GRAVIDADE[atual] > ORDEM_GRAVIDADE[pior] ? atual : pior))
}

type StatusEntrega = 'entregue' | 'prazo-encerrado' | 'nao-entregue'

function statusEntrega(entregou: boolean): StatusEntrega {
  if (entregou) return 'entregue'
  if (prazoEncerrado(gradeData.value?.avaliacaoTurma?.prazo ?? null)) return 'prazo-encerrado'
  return 'nao-entregue'
}
</script>

<template>
  <div class="min-h-dvh px-4 py-8 sm:px-6">
    <header class="max-w-6xl mx-auto mb-8 flex items-center justify-between gap-4">
      <div>
        <p class="text-neural-accent text-sm font-mono mb-1">Senac · Admin</p>
        <h1 class="text-2xl font-bold text-white">{{ gradeData?.avaliacao.titulo ?? slug }}</h1>
      </div>
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
        <div class="flex flex-wrap items-center gap-4 justify-between">
          <SeletorTurma v-model="turmaId" :turmas="turmas" />
          <div class="flex gap-1.5">
            <button
              @click="modo = 'lista'"
              :class="modo === 'lista' ? 'bg-neural-accent text-neural-900 font-semibold' : 'bg-neural-600 text-gray-200 hover:text-white'"
              class="text-xs px-3 py-1.5 rounded-full transition"
            >Lista</button>
            <button
              @click="modo = 'planilha'"
              :class="modo === 'planilha' ? 'bg-neural-accent text-neural-900 font-semibold' : 'bg-neural-600 text-gray-200 hover:text-white'"
              class="text-xs px-3 py-1.5 rounded-full transition"
            >Planilha</button>
          </div>
        </div>

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
            <span v-if="saveStatus === 'aviso'" class="text-yellow-400 text-sm">{{ saveMessage }}</span>
            <span v-if="saveStatus === 'error'" class="text-red-400 text-sm">{{ saveMessage }}</span>
          </div>

          <!-- Modo Lista (sprint 04, default) -->
          <div v-if="modo === 'lista'" class="rounded-2xl border border-neural-700 overflow-hidden">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-neural-800">
                  <th class="text-left text-xs text-gray-400 font-semibold px-4 py-3">Aluno</th>
                  <th class="text-left text-xs text-gray-400 font-semibold px-4 py-3">Entrega</th>
                  <th class="text-left text-xs text-gray-400 font-semibold px-4 py-3">Nota</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="aluno in gradeData.alunos"
                  :key="aluno.id"
                  @click="abrirDetalhe(aluno.id)"
                  class="border-t border-neural-700 hover:bg-neural-800/60 cursor-pointer transition"
                >
                  <td class="px-4 py-3 text-sm text-gray-200">{{ aluno.nome ?? aluno.email ?? aluno.id }}</td>
                  <td class="px-4 py-3 text-xs">
                    <span
                      class="px-2 py-0.5 rounded-full border font-semibold"
                      :class="{
                        'border-green-400/40 text-green-400': statusEntrega(aluno.entregou) === 'entregue',
                        'border-yellow-400/40 text-yellow-400': statusEntrega(aluno.entregou) === 'prazo-encerrado',
                        'border-gray-600 text-gray-500': statusEntrega(aluno.entregou) === 'nao-entregue',
                      }"
                    >{{
                      statusEntrega(aluno.entregou) === 'entregue' ? 'Entregue'
                      : statusEntrega(aluno.entregou) === 'prazo-encerrado' ? 'Prazo encerrado'
                      : 'Não entregue'
                    }}</span>
                  </td>
                  <td class="px-4 py-3 text-xs font-mono font-semibold">
                    <span
                      v-if="notaResumida(aluno.id)"
                      :class="{
                        'text-green-400': notaResumida(aluno.id) === 'A',
                        'text-yellow-400': notaResumida(aluno.id) === 'PA',
                        'text-red-400': notaResumida(aluno.id) === 'NA',
                      }"
                    >{{ notaResumida(aluno.id) }}</span>
                    <span v-else class="text-gray-600">—</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Modo Planilha (T9 original) -->
          <template v-else>
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
                      class="px-2 py-2 text-center relative"
                    >
                      <NotaCell
                        :ref="el => setCellRef(rowIndex, colIndex, el)"
                        :valor="valorAtual(aluno.id, ind.codigo)"
                        :dirty="isDirty(aluno.id, ind.codigo)"
                        @click="focusCell(rowIndex, colIndex)"
                        @keydown="handleKeydown($event, rowIndex, colIndex)"
                      />
                      <span
                        v-if="precisaComentario(aluno.id, ind.codigo)"
                        title="PA/NA precisa de comentário — abra o aluno no modo Lista"
                        class="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-400"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p class="text-xs text-gray-500">
              Clique numa célula e digite <span class="font-mono">A</span>/<span class="font-mono">P</span>/<span class="font-mono">N</span>
              para lançar a nota (desce pro próximo aluno automaticamente); setas navegam; Backspace/Delete limpa.
              Notas PA/NA <span class="text-red-400">●</span> precisam de comentário — abra o aluno no modo Lista.
            </p>
          </template>
        </template>
      </template>
    </div>

    <!-- Painel de detalhe do aluno (sprint 04) -->
    <div
      v-if="alunoSelecionado && gradeData"
      class="fixed inset-0 z-40 flex items-start sm:items-center justify-center bg-black/70 p-4 overflow-y-auto"
      @click.self="fecharDetalhe"
    >
      <div class="bg-neural-900 border border-neural-700 rounded-2xl max-w-2xl w-full my-8 flex flex-col gap-4 p-6">
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-white font-semibold text-lg">{{ alunoSelecionado.nome ?? alunoSelecionado.email }}</h2>
          <button @click="fecharDetalhe" class="text-gray-400 hover:text-white transition text-sm">Fechar</button>
        </div>

        <div class="rounded-xl border border-neural-700 bg-neural-800/60 p-4 flex flex-col gap-2">
          <p v-if="alunoSelecionado.entregaLink" class="text-sm break-all">
            <a :href="alunoSelecionado.entregaLink" target="_blank" rel="noopener" class="text-neural-accent hover:underline">
              {{ alunoSelecionado.entregaLink }}
            </a>
          </p>
          <p v-else class="text-gray-500 text-sm">Sem entrega.</p>
          <p v-if="alunoSelecionado.entregaEm" class="text-xs text-gray-500">
            Enviado em {{ formatEntregaDate(alunoSelecionado.entregaEm) }}
          </p>

          <button @click="toggleHistorico" class="text-xs text-neural-accent hover:underline self-start">
            {{ historicoAberto ? '▲ ocultar histórico' : '▼ ver histórico de envios' }}
          </button>
          <div v-if="historicoAberto" class="flex flex-col gap-1 border-t border-neural-700 pt-2 mt-1">
            <p v-if="historicoLoading" class="text-xs text-gray-500">Carregando...</p>
            <p v-else-if="!historicoItens.length" class="text-xs text-gray-500">Sem histórico registrado.</p>
            <p v-for="(item, i) in historicoItens" :key="i" class="text-xs text-gray-400 break-all">
              {{ formatEntregaDate(item.enviadoAt) }} — {{ item.link }}
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div
            v-for="ind in gradeData.indicadores"
            :key="ind.codigo"
            class="rounded-xl border border-neural-700 p-3 flex flex-col gap-2"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="font-mono text-xs text-neural-accent">{{ ind.codigo }}</span>
              <div class="flex gap-1.5">
                <button
                  v-for="v in (['A', 'PA', 'NA'] as const)"
                  :key="v"
                  @click="setValor(alunoSelecionado.id, ind.codigo, valorAtual(alunoSelecionado.id, ind.codigo) === v ? null : v)"
                  class="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg border transition"
                  :class="valorAtual(alunoSelecionado.id, ind.codigo) === v
                    ? (v === 'A' ? 'bg-neural-accent/20 text-neural-accent border-neural-accent/50' : v === 'PA' ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/50' : 'bg-red-400/20 text-red-400 border-red-400/50')
                    : 'bg-neural-900 text-gray-600 border-neural-700 hover:border-neural-600'"
                >{{ v }}</button>
              </div>
            </div>
            <p class="text-xs text-gray-500">{{ ind.descricao }}</p>
            <textarea
              v-if="valorAtual(alunoSelecionado.id, ind.codigo) && valorAtual(alunoSelecionado.id, ind.codigo) !== 'A'"
              :value="comentarioAtual(alunoSelecionado.id, ind.codigo)"
              @input="setComentario(alunoSelecionado.id, ind.codigo, ($event.target as HTMLTextAreaElement).value)"
              rows="2"
              placeholder="Por que não foi A? (obrigatório)"
              class="w-full bg-neural-900 border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none resize-y"
              :class="precisaComentario(alunoSelecionado.id, ind.codigo) ? 'border-red-400/60' : 'border-neural-700 focus:border-neural-accent'"
            />
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            @click="salvar"
            :disabled="!pendingChanges.length || salvando"
            class="bg-neural-accent text-neural-900 font-semibold rounded-lg px-6 py-2 hover:opacity-90 disabled:opacity-50 transition"
          >
            {{ salvando ? 'Salvando...' : 'Salvar' }}
          </button>
          <span v-if="saveStatus === 'ok'" class="text-green-400 text-sm">Salvo!</span>
          <span v-if="saveStatus === 'aviso'" class="text-yellow-400 text-sm">{{ saveMessage }}</span>
          <span v-if="saveStatus === 'error'" class="text-red-400 text-sm">{{ saveMessage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
