import { ref, computed } from 'vue'

const WORKER = 'https://lms-senac-tecnico-ia.leo-zn-97.workers.dev'
const TOKEN_KEY = 'lms_student_jwt'

export interface AuthUser {
  sub: string
  email: string
  name: string
  role: 'student' | 'admin'
  exp: number
}

function parseToken(token: string): AuthUser | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
    if (payload.exp && Date.now() / 1000 > payload.exp) return null
    return payload as AuthUser
  } catch {
    return null
  }
}

// Estado reativo compartilhado entre todos os componentes (module-level)
const _token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
const _user = ref<AuthUser | null>(_token.value ? parseToken(_token.value) : null)

// Limpa token expirado na inicialização
if (_token.value && !_user.value) {
  localStorage.removeItem(TOKEN_KEY)
  _token.value = null
}

export function useAuth() {
  const user      = computed(() => _user.value)
  const isLoggedIn = computed(() => _user.value !== null)

  /** Headers prontos para usar em fetch() */
  const authHeaders = computed<Record<string, string>>(() =>
    _token.value ? { Authorization: `Bearer ${_token.value}` } : {}
  )

  function setToken(token: string): boolean {
    const parsed = parseToken(token)
    if (!parsed) return false
    _token.value = token
    _user.value  = parsed
    localStorage.setItem(TOKEN_KEY, token)
    return true
  }

  function logout() {
    _token.value = null
    _user.value  = null
    localStorage.removeItem(TOKEN_KEY)
  }

  function loginWithGoogle() {
    window.location.href = `${WORKER}/api/auth/google`
  }

  return { user, isLoggedIn, authHeaders, setToken, logout, loginWithGoogle }
}
