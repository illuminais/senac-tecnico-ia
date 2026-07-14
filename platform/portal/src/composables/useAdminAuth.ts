import { ref } from 'vue'

export const WORKER = 'https://lms-senac-tecnico-ia.leo-zn-97.workers.dev'

const TOKEN_KEY = 'lms_admin_jwt'
const TOKEN_MAX_AGE = 86400 // 24h — mesmo TTL do JWT

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

const token = ref(getCookie(TOKEN_KEY))

export function useAdminAuth() {
  function setToken(value: string) {
    token.value = value
    setCookie(TOKEN_KEY, value, TOKEN_MAX_AGE)
  }

  function logout() {
    token.value = ''
    deleteCookie(TOKEN_KEY)
  }

  return { token, setToken, logout }
}
