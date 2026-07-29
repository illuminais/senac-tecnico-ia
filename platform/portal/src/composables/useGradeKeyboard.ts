// Navegação por teclado da grade (RF11, T9). Lógica pura de dispatch —
// sem estado próprio (o valor de cada célula e o foco DOM moram na view,
// `AdminGradeView.vue`); isolado aqui porque a combinação "marca e desce" +
// setas + limpar já é lógica demais pra ficar inline no template.
//
// `A`/`P`/`N` (maiúsculo ou minúsculo) marcam o valor e movem o foco pra
// célula de baixo (próximo aluno, mesma coluna). Setas navegam sem alterar
// valor. `Backspace`/`Delete` limpa a célula (não move o foco).
import type { NotaCelula } from '@/types/admin-grade'

export interface UseGradeKeyboardOptions {
  numRows: () => number
  numCols: () => number
  focusCell: (row: number, col: number) => void
  onSetValue: (row: number, col: number, valor: NotaCelula) => void
}

export function useGradeKeyboard(options: UseGradeKeyboardOptions) {
  function marcarEDescer(event: KeyboardEvent, row: number, col: number, valor: NotaCelula) {
    event.preventDefault()
    options.onSetValue(row, col, valor)
    options.focusCell(Math.min(row + 1, options.numRows() - 1), col)
  }

  function handleKeydown(event: KeyboardEvent, row: number, col: number) {
    switch (event.key) {
      case 'a': case 'A':
        marcarEDescer(event, row, col, 'A')
        break
      case 'p': case 'P':
        marcarEDescer(event, row, col, 'PA')
        break
      case 'n': case 'N':
        marcarEDescer(event, row, col, 'NA')
        break
      case 'Backspace': case 'Delete':
        event.preventDefault()
        options.onSetValue(row, col, null)
        break
      case 'ArrowDown':
        event.preventDefault()
        options.focusCell(Math.min(row + 1, options.numRows() - 1), col)
        break
      case 'ArrowUp':
        event.preventDefault()
        options.focusCell(Math.max(row - 1, 0), col)
        break
      case 'ArrowLeft':
        event.preventDefault()
        options.focusCell(row, Math.max(col - 1, 0))
        break
      case 'ArrowRight':
        event.preventDefault()
        options.focusCell(row, Math.min(col + 1, options.numCols() - 1))
        break
    }
  }

  return { handleKeydown }
}
