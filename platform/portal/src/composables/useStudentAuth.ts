import { ref, computed } from 'vue'

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

/** Decode raso do payload do JWT (sem validar assinatura — só para exibição no client). */
function decodeJwtPayload(token: string): StudentJwtPayload | null {
  try {
    const segment = token.split('.')[1]
    const base64 = segment.replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    )
    return JSON.parse(json)
  } catch {
    return null
  }
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

  const user = computed(() => (token.value ? decodeJwtPayload(token.value) : null))

  return { token, setToken, logout, user }
}
