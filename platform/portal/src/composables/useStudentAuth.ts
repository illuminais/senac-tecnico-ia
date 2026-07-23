import { ref, computed } from 'vue'
import { decodeJwtPayload, isTokenExpired } from '@shared/pure'

const TOKEN_KEY = 'lms_student_jwt'
const TOKEN_MAX_AGE = 2592000 // 30 dias — mesmo TTL do JWT de aluno

// Cookie helpers (SameSite=Strict + Secure previne CSRF; sem HttpOnly pois o JS precisa ler para o header Bearer)
function getCookie(name: string): string {
  const match = document.cookie.split('; ').find(r => r.startsWith(name + '='))
  return match ? decodeURIComponent(match.split('=')[1]) : ''
}

function setCookie(name: string, value: string, maxAge: number) {
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; SameSite=Strict; Path=/${secure}`
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; SameSite=Strict; Path=/`
}

interface StudentJwtPayload {
  sub: string
  email: string | null
  name: string | null
  picture: string | null
  role: string
  exp: number
}

const token = ref(getCookie(TOKEN_KEY))

export function useStudentAuth() {
  function setToken(value: string) {
    token.value = value
    setCookie(TOKEN_KEY, value, TOKEN_MAX_AGE)
  }

  function logout() {
    token.value = ''
    deleteCookie(TOKEN_KEY)
  }

  // Decodifica uma vez só — `user` e `isLoggedIn` derivam do mesmo payload,
  // sem decodificar o token duas vezes.
  const payload = computed(() => (token.value ? decodeJwtPayload(token.value) : null))

  // Token expirado nunca deve expor dados de aluno "morto" na UI.
  const user = computed(() =>
    payload.value && !isTokenExpired(payload.value) ? (payload.value as StudentJwtPayload) : null
  )

  const isLoggedIn = computed(() => !!token.value && !isTokenExpired(payload.value))

  return { token, setToken, logout, user, isLoggedIn }
}
