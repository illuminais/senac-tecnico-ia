/** Mapas de rótulo de UC compartilhados entre AulaCard, HomeView e outras views
 *  que precisam exibir o nome de uma UC a partir do código curto ('1'..'9')
 *  usado em `AulaMeta.ucs`. */
export const ucLabels: Record<string, string> = {
  '1': 'UC01 Computação', '2': 'UC02 Inglês', '3': 'UC03 Matemática',
  '4': 'UC04 Conceitos IA', '5': 'UC05 Python', '6': 'UC06 GPU e CPU',
  '7': 'UC07 Trans. Digital', '8': 'UC08 Banco de Dados', '9': 'UC09 Estatística',
}

export const minimizedUcLabels: Record<string, string> = {
  '1': 'UC01', '2': 'UC02', '3': 'UC03',
  '4': 'UC04', '5': 'UC05', '6': 'UC06',
  '7': 'UC07', '8': 'UC08', '9': 'UC09',
}

/** Nome completo da UC, ex. "UC05 Python" */
export function ucFullLabel(uc: string): string {
  return ucLabels[uc] ?? `UC${uc.padStart(2, '0')}`
}

/** Rótulo curto da UC, ex. "UC05" */
export function ucShortLabel(uc: string): string {
  return minimizedUcLabels[uc] ?? `UC${uc.padStart(2, '0')}`
}
