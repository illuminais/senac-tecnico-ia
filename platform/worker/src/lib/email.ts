/**
 * Email (Resend — https://resend.com/docs/api-reference/emails/send-email)
 * Movido de platform/worker/src/index.ts (spec 04-worker-arquitetura-modular, T3).
 */

import type { Env, AdminUserRow } from '../types'
import { randomToken, sha256Hex } from './crypto'

export async function sendEmail(env: Env, to: string, subject: string, html: string): Promise<boolean> {
  if (!env.RESEND_API_KEY) return false
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: env.RESEND_FROM || 'onboarding@resend.dev', to: [to], subject, html }),
  })
  return res.ok
}

// Disparada via ctx.waitUntil a partir de handleForgotPassword — nunca deve ser
// awaited ali, senão volta a vazar timing entre os branches do forgot-password.
// Só cuida do que depende de rede externa (Resend); o registro da tentativa em
// password_reset_attempts já aconteceu no caminho síncrono, antes da resposta.
export async function sendPasswordResetEmail(
  env: Env,
  admin: AdminUserRow,
  resetUrlBase: string,
): Promise<void> {
  const rawToken = randomToken()
  const tokenHash = await sha256Hex(rawToken)
  const expiresAt = Math.floor(Date.now() / 1000) + 3600 // 1h

  await env.DB.prepare(`
    INSERT INTO password_reset_tokens (token_hash, admin_user_id, expires_at)
    VALUES (?, ?, ?)
  `).bind(tokenHash, admin.id, expiresAt).run()

  const link = `${resetUrlBase}?token=${rawToken}`
  await sendEmail(env, admin.email, 'Redefinir senha — Portal Técnico em IA', `
    <p>Foi solicitada a redefinição da sua senha do painel do professor.</p>
    <p><a href="${link}">Clique aqui para criar uma nova senha</a> (expira em 1 hora).</p>
    <p>Se você não pediu isso, ignore este email.</p>
  `)
}
