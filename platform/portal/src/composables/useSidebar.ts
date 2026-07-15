import { ref, watch } from 'vue'

const STORAGE_KEY = 'lms_sidebar_collapsed'

function readInitial(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

// singleton reativo — todo import de useSidebar() compartilha o mesmo estado de collapse
const collapsed = ref(readInitial())

watch(collapsed, value => {
  try {
    localStorage.setItem(STORAGE_KEY, value ? '1' : '0')
  } catch {
    // localStorage indisponível (ex. modo privado) — ignora, estado só não persiste
  }
})

export function useSidebar() {
  function toggle() {
    collapsed.value = !collapsed.value
  }

  return { collapsed, toggle }
}
