/** Formata um epoch em segundos (ex. `updatedAt` de uma entrega, que vem de
 *  `unixepoch()` do SQLite) como data+hora local pt-BR, ex. "24/07/2026 às 14:30".
 *
 *  `new Date(epochSeconds * 1000)` já resolve para o fuso local do browser —
 *  nunca faça aritmética manual de fuso em cima do epoch (fonte comum de
 *  off-by-one perto da virada do dia). */
export function formatEntregaDate(epochSeconds: number): string {
  const date = new Date(epochSeconds * 1000)
  const data = date.toLocaleDateString('pt-BR')
  const hora = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  return `${data} às ${hora}`
}

/** `prazo` como gravado no meta.yaml/D1 (`avaliacoes_turma.prazo`), formato
 *  'DD/MM/YYYY' — compara com hoje (sprint 04, estado "prazo encerrado" do
 *  formulário de entrega). `null`/formato inesperado nunca é tratado como
 *  encerrado (evita travar o form por um dado mal formatado). */
export function prazoEncerrado(prazo: string | null): boolean {
  if (!prazo) return false
  const [dia, mes, ano] = prazo.split('/').map(Number)
  if (!dia || !mes || !ano) return false
  const fimDoDia = new Date(ano, mes - 1, dia, 23, 59, 59)
  return Date.now() > fimDoDia.getTime()
}
