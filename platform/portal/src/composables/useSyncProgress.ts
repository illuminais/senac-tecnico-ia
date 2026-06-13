import { onMounted, onUnmounted } from 'vue'
import { useAuth } from './useAuth'

const SYNC_INTERVAL_MS = 30_000
const API_URL = 'https://lms-senac-tecnico-ia.leo-zn-97.workers.dev/api/sync'

/** Envia o estado completo de progresso de uma aula para o Worker (idempotente).
 *  Silencioso se o aluno não estiver logado — localStorage permanece a fonte de verdade. */
async function syncPayload(
  payload: { aulaId: string; progresso: number; respostas: Record<string, string> },
  authHeaders: Record<string, string>,
) {
  if (!authHeaders.Authorization) return  // não logado, não sincroniza
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders },
      body: JSON.stringify({
        aulaId:    payload.aulaId,
        progresso: payload.progresso,
        respostas: payload.respostas,
      }),
      keepalive: true,  // garante envio mesmo em beforeunload
    })
  } catch {
    // Silencioso — localStorage é a fonte de verdade
  }
}

/**
 * Composable de sync em batch.
 * - Sync periódico a cada 30s
 * - Sync no beforeunload
 * - Exposição de `syncNow()` para chamar em eventos pontuais (completar exercício, etc.)
 */
export function useSyncProgress(getPayload: () => {
  aulaId: string
  progresso: number
  respostas: Record<string, string>
}) {
  const { authHeaders } = useAuth()
  let interval: ReturnType<typeof setInterval>

  async function syncNow() {
    await syncPayload(getPayload(), authHeaders.value)
  }

  function onBeforeUnload() {
    syncPayload(getPayload(), authHeaders.value)  // fire and forget com keepalive
  }

  onMounted(() => {
    interval = setInterval(syncNow, SYNC_INTERVAL_MS)
    window.addEventListener('beforeunload', onBeforeUnload)
  })

  onUnmounted(() => {
    clearInterval(interval)
    window.removeEventListener('beforeunload', onBeforeUnload)
  })

  return { syncNow }
}
