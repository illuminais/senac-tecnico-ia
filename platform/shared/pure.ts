/**
 * Lógica pura compartilhada entre o Worker (Cloudflare, bundlado via esbuild
 * do wrangler, sem package.json) e o portal (Vite/Vitest). Regra de ouro
 * deste arquivo: ZERO dependências — nem de runtime Cloudflare (D1,
 * ExecutionContext, etc.), nem de pacotes npm. Só TypeScript + APIs Web
 * padrão (atob/btoa, TextEncoder/TextDecoder) disponíveis nos dois lados.
 *
 * Não importe nada daqui que dependa de `crypto.subtle` (Web Crypto) — isso
 * existe no Worker e em runtimes Node modernos/browser, mas mantenha esse
 * limite explícito: qualquer coisa que precise assinar/verificar (JWT de
 * verdade, PBKDF2) continua em `worker/src/index.ts`. Este módulo só faz
 * codificação/decodificação e checagens síncronas puras.
 */

// ---------------------------------------------------------------------------
// Base64url
// ---------------------------------------------------------------------------

export function b64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodeB64url(str: string): Uint8Array {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/')
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0))
}

// ---------------------------------------------------------------------------
// Hex
// ---------------------------------------------------------------------------

export function toHex(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf)
  return [...bytes].map(b => b.toString(16).padStart(2, '0')).join('')
}

export function fromHex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
  return bytes
}

// ---------------------------------------------------------------------------
// Domínio de email de aluno
// ---------------------------------------------------------------------------

// Assinatura escolhida: recebe `domains: string[]` já parseado (sem CSV, sem
// Env) — quem chama (o Worker) faz o split/trim/lowercase/filter do CSV
// (`STUDENT_EMAIL_DOMAINS`) antes de passar pra cá. Fica mais simples de
// testar (não precisa simular Env) e a função pura não decide como o
// domínio é configurado, só recebe a lista final.
//
// Comparação de sufixo exata (nunca includes()) — evita bypass tipo
// "fake@aluno.pr.senac.br.evil.com". Se `domains` estiver vazia (erro de
// config), NINGUÉM deve conseguir logar — lista vazia nunca é tratada como
// "permite tudo".
export function isAllowedStudentEmail(email: string, domains: string[]): boolean {
  if (domains.length === 0) return false
  const lower = email.toLowerCase()
  return domains.some(domain => lower.endsWith('@' + domain.toLowerCase()))
}

// ---------------------------------------------------------------------------
// JWT — leitura sem verificação de assinatura
// ---------------------------------------------------------------------------

// Decodifica o payload de um JWT SEM verificar a assinatura — uso client-side
// (exibir dados do usuário sem round-trip ao server) e testes. Nunca lança:
// qualquer formato inesperado (partes faltando, base64url inválido, JSON
// inválido) resulta em `null`. Para autenticação de verdade, o Worker sempre
// usa `verifyJwt` (que checa a assinatura via Web Crypto).
export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const json = new TextDecoder().decode(decodeB64url(parts[1]))
    const payload = JSON.parse(json)
    if (payload === null || typeof payload !== 'object') return null
    return payload as Record<string, unknown>
  } catch {
    return null
  }
}

// Consistente com a checagem em `verifyJwt` do Worker: `exp` é epoch em
// segundos, expirado quando `Date.now() / 1000 > exp`. `payload` nulo ou sem
// `exp` também conta como expirado (nunca confiar em token sem validade).
export function isTokenExpired(payload: { exp?: number } | null): boolean {
  if (!payload) return true
  if (!payload.exp) return true
  return Date.now() / 1000 > payload.exp
}
