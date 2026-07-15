const STATE_KEY = 'lms_google_oauth_state'

/** `redirectPath` é o path (ex: `/admin/google-callback` ou `/entrar/google-callback`) que recebe o `code` do Google. */
export function googleRedirectUri(redirectPath: string): string {
  return `${location.origin}${redirectPath}`
}

/** Monta a URL de consentimento do Google e guarda um `state` aleatório para validar no callback (CSRF). */
export function googleLoginUrl(redirectPath: string): string {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined
  if (!clientId) throw new Error('VITE_GOOGLE_CLIENT_ID não configurado (ver platform/portal/.env.example)')

  const state = crypto.randomUUID()
  sessionStorage.setItem(STATE_KEY, state)

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: googleRedirectUri(redirectPath),
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
