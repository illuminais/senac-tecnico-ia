/**
 * JWT (HS256 via Web Crypto — sem deps externas)
 * Movido de platform/worker/src/index.ts (spec 04-worker-arquitetura-modular, T2).
 */

import { b64url, decodeB64url } from '../../../shared/pure'

export async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

export async function signJwt(payload: Record<string, unknown>, secret: string): Promise<string> {
  const header = b64url(new TextEncoder().encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })))
  const body   = b64url(new TextEncoder().encode(JSON.stringify(payload)))
  const key    = await importKey(secret)
  const sig    = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${header}.${body}`))
  return `${header}.${body}.${b64url(sig)}`
}

export async function verifyJwt(token: string, secret: string): Promise<Record<string, unknown> | null> {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  // Todo o corpo (não só o parse do payload) precisa estar dentro do
  // try/catch: `decodeB64url` usa `atob()`, que lança `InvalidCharacterError`
  // (não devolve null) quando a parte do token não é base64url válido — um
  // token malformado (não só "assinatura errada") derrubava isso pra fora da
  // função como exceção não tratada em vez de retornar null como o contrato
  // desta função promete. Isso importa especialmente para rotas públicas com
  // JWT opcional (ex.: GET /api/avaliacoes) — nunca podem quebrar por causa
  // de um Authorization header malformado vindo do client.
  try {
    const key = await importKey(secret)
    const valid = await crypto.subtle.verify(
      'HMAC', key,
      decodeB64url(parts[2]),
      new TextEncoder().encode(`${parts[0]}.${parts[1]}`),
    )
    if (!valid) return null
    const payload = JSON.parse(new TextDecoder().decode(decodeB64url(parts[1])))
    if (payload.exp && Date.now() / 1000 > payload.exp) return null
    return payload
  } catch { return null }
}
