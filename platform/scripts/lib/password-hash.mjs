/**
 * Hash de senha compartilhado entre os scripts CLI de admin
 * (create-admin.mjs, reset-admin-password.mjs) e o Worker
 * (platform/worker/src/index.ts, hashPassword/verifyPassword).
 *
 * PBKDF2-HMAC-SHA256, 100.000 iterações, formato:
 *   pbkdf2$<iteracoes>$<saltHex>$<hashHex>
 *
 * Precisa continuar byte-a-byte compatível com o Worker (que usa Web Crypto,
 * não Node crypto) — os dois produzem o mesmo hash para o mesmo
 * password+salt+iterations, confirmado manualmente. Se mudar algo aqui,
 * mude também no Worker.
 */

import crypto from 'crypto'

export const PBKDF2_ITERATIONS = 100_000

export function hashPassword(password) {
  const salt = crypto.randomBytes(16)
  const hash = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 32, 'sha256')
  return `pbkdf2$${PBKDF2_ITERATIONS}$${salt.toString('hex')}$${hash.toString('hex')}`
}
