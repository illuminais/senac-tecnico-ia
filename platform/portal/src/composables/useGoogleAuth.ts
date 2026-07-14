const STATE_KEY = 'lms_google_oauth_state'

export function googleRedirectUri(): string {
  return `${location.origin}/admin/google-callback`
}

/** Monta a URL de consentimento do Google e guarda um `state` aleatório para validar no callback (CSRF). */
export function googleLoginUrl(): string {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined
  if (!clientId) throw new Error('VITE_GOOGLE_CLIENT_ID não configurado (ver platform/portal/.env.example)')

  const state = crypto.randomUUID()
  sessionStorage.setItem(STATE_KEY, state)

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: googleRedirectUri(),
    response_type: 'code',
    scope: 'openid email profile',
    prompt: 'select_account',
    state,
  })
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}

/** Consome e valida o `state` retornado pelo Google. Só pode ser chamado uma vez por login. */
export function consumeGoogleState(returnedState: string | null): boolean {
  const saved = sessionStorage.getItem(STATE_KEY)
  sessionStorage.removeItem(STATE_KEY)
  return !!saved && !!returnedState && saved === returnedState
}
