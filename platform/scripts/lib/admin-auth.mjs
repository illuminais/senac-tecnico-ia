/**
 * Login automático de admin pra scripts locais (seed-*.mjs).
 *
 * Lê ADMIN_USERNAME/ADMIN_PASSWORD do ambiente (carregado via
 * `node --env-file=platform/scripts/.env`, nunca hardcoded), troca por um
 * JWT em POST /api/auth/login e devolve pronto pra usar em Authorization.
 *
 * Não lança se as credenciais não estiverem no ambiente — devolve `null`,
 * pra quem chama decidir cair no fallback de `--token` explícito.
 */
export async function getAdminToken(workerUrl) {
  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD
  if (!username || !password) return null

  const res = await fetch(`${workerUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`Login de admin falhou: ${JSON.stringify(data)}`)
  return data.token
}
