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
