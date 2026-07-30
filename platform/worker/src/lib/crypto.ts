/**
 * Senha (PBKDF2-HMAC-SHA256 via Web Crypto — sem deps externas)
 * Formato armazenado: pbkdf2$<iteracoes>$<saltHex>$<hashHex>
 * Compatível byte-a-byte com platform/scripts/create-admin.mjs (Node crypto.pbkdf2Sync)
 *
 * Movido de platform/worker/src/index.ts (spec 04-worker-arquitetura-modular, T2).
 */

import { toHex, fromHex } from '../../../shared/pure'

// Comparação em tempo constante p/ prevenir timing attacks
export async function safeEqual(a: string, b: string): Promise<boolean> {
  const ka = await crypto.subtle.importKey('raw', new TextEncoder().encode(a), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const kb = await crypto.subtle.importKey('raw', new TextEncoder().encode(b), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sentinel = new Uint8Array(32)
  const [sa, sb] = await Promise.all([
    crypto.subtle.sign('HMAC', ka, sentinel),
    crypto.subtle.sign('HMAC', kb, sentinel),
  ])
  const ua = new Uint8Array(sa), ub = new Uint8Array(sb)
  let diff = 0
  for (let i = 0; i < ua.length; i++) diff |= ua[i] ^ ub[i]
  return diff === 0
}

const PBKDF2_ITERATIONS = 100_000

export async function pbkdf2(password: string, salt: Uint8Array, iterations: number): Promise<string> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    key,
    256,
  )
  return toHex(bits)
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const hash = await pbkdf2(password, salt, PBKDF2_ITERATIONS)
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toHex(salt)}$${hash}`
}

export async function verifyPassword(password: string, stored: string | null): Promise<boolean> {
  if (!stored) return false
  const parts = stored.split('$')
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false
  const iterations = parseInt(parts[1], 10)
  const salt = fromHex(parts[2])
  const expected = parts[3]
  const actual = await pbkdf2(password, salt, iterations)
  return safeEqual(actual, expected)
}

export async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
  return toHex(digest)
}

export function randomToken(): string {
  return toHex(crypto.getRandomValues(new Uint8Array(32)))
}
