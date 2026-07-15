import { ref, computed, onMounted } from 'vue'
import type { CalendarDay } from '@/types/calendar'

const WORKER = 'https://lms-senac-tecnico-ia.dev-leozanini.workers.dev'

/**
 * Fetch + derivações de `GET /api/calendar` usadas por CalendarioView e HomeView.
 * Cada chamada de `useCalendarStats()` faz seu próprio fetch (loading/error locais),
 * de propósito — uma tela nunca deve travar por causa da outra.
 */
export function useCalendarStats() {
  const days = ref<CalendarDay[]>([])
  const loading = ref(true)
  const error = ref('')

  // EXATAMENTE o mesmo filtro usado historicamente pela tela de calendário,
  // pra não haver dois números diferentes de "aulas dadas" no portal.
  const dadas = computed(() => days.value.filter(d => d.status === 'dada' && d.tipo !== 'recesso'))
  const planejadas = computed(() => days.value.filter(d => d.status === 'planejada'))
  const recessos = computed(() => days.value.filter(d => d.tipo === 'recesso'))

  const totalHA = computed(() =>
    dadas.value.reduce((sum, d) => sum + d.blocos.reduce((s, b) => s + (b.ha ?? 0), 0), 0)
  )

  const proximaAula = computed<CalendarDay | null>(() => {
    if (!planejadas.value.length) return null
    return [...planejadas.value].sort((a, b) => a.data.localeCompare(b.data))[0]
  })

  onMounted(async () => {
    try {
      const res = await fetch(`${WORKER}/api/calendar`)
      if (!res.ok) throw new Error('Falha ao carregar calendário')
      const data = await res.json()
      days.value = data.days ?? []
    } catch (e) {
      error.value = 'Não foi possível carregar o calendário.'
      console.error(e)
    } finally {
      loading.value = false
    }
  })

  return { days, loading, error, dadas, planejadas, recessos, totalHA, proximaAula }
}

/** Formata 'YYYY-MM-DD' como 'DD/mmm', ex. "09/jul". */
export function formatDataCurta(data: string) {
  if (!data) return ''
  const [, month, day] = data.split('-')
  const months = ['', 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
  return `${day}/${months[Number(month)] ?? month}`
}
