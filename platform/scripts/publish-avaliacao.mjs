#!/usr/bin/env node
/**
 * publish-avaliacao.mjs <slug>
 *
 * Publica UMA avaliação sem depender do resync completo do currículo
 * (RF6, spec 04-worker-arquitetura-modular). Lê só
 * `avaliacoes/<slug>/meta.yaml` (mesmo parser de seed-indicadores.mjs,
 * reaproveitado — não duplicado) e monta o payload mínimo aceito por
 * POST /api/admin/seed: `{ avaliacoes: [...], avaliacaoIndicadores: [...] }`
 * daquele slug só. Nada de `ucs`/`indicadores`/`turmas` — o endpoint já
 * trata cada campo do payload como opcional (CA4).
 *
 * Uso:
 *   node platform/scripts/publish-avaliacao.mjs av07                     # dry-run, imprime o payload
 *   node platform/scripts/publish-avaliacao.mjs av07 --post <WORKER_URL> --token <JWT admin>
 *
 *   # ou, sem colar token: preencha platform/scripts/.env (copie de .env.example)
 *   # com ADMIN_USERNAME/ADMIN_PASSWORD e rode com --env-file:
 *   node --env-file=platform/scripts/.env platform/scripts/publish-avaliacao.mjs av07 --post <WORKER_URL>
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getAdminToken } from './lib/admin-auth.mjs'
import { parseMetaYaml, parseIndicadorCodigo, formatIndicadorCodigo } from './seed-indicadores.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const AVALIACOES_DIR = path.join(ROOT, 'avaliacoes')

function buildPublishPayload(slug) {
  const metaPath = path.join(AVALIACOES_DIR, slug, 'meta.yaml')
  if (!fs.existsSync(metaPath)) {
    throw new Error(`Não encontrado: ${metaPath}`)
  }
  const meta = parseMetaYaml(fs.readFileSync(metaPath, 'utf8'))
  const metaSlug = meta.id ?? slug

  const avaliacoes = [{
    slug: metaSlug,
    titulo: meta.titulo,
    tipo: meta.tipo ?? null,
    trimestre: meta.trimestre,
    status: meta.status,
  }]

  const avaliacaoIndicadores = []
  const indicadoresMeta = Array.isArray(meta.indicadores) ? meta.indicadores : []
  for (const codigoRaw of indicadoresMeta) {
    const parsed = parseIndicadorCodigo(codigoRaw)
    if (!parsed) {
      console.warn(`⚠️  ${metaSlug}: indicador '${codigoRaw}' não bate com o formato UCxx.N — ignorado`)
      continue
    }
    avaliacaoIndicadores.push({ avaliacaoSlug: metaSlug, indicadorCodigo: formatIndicadorCodigo(parsed) })
  }

  return { avaliacoes, avaliacaoIndicadores }
}

async function main() {
  const args = process.argv.slice(2)

  // Posicional: primeiro argumento que não é `--post`/`--token` nem o valor
  // logo depois de um desses dois (mesmo padrão de CLI de seed-indicadores.mjs,
  // só que este script tem um argumento posicional a mais: o slug).
  let slug = null
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--post' || args[i] === '--token') { i++; continue }
    slug = args[i]
    break
  }

  if (!slug) {
    console.error('Uso: node platform/scripts/publish-avaliacao.mjs <slug> [--post <WORKER_URL>] [--token <JWT admin>]')
    process.exit(1)
  }

  const payload = buildPublishPayload(slug)

  const postIdx = args.indexOf('--post')
  const tokenIdx = args.indexOf('--token')

  if (postIdx === -1) {
    console.log(JSON.stringify(payload, null, 2))
    return
  }

  const workerUrl = args[postIdx + 1]
  if (!workerUrl) {
    console.error('Uso: node platform/scripts/publish-avaliacao.mjs <slug> --post <WORKER_URL> [--token <JWT admin>]')
    process.exit(1)
  }

  let token = tokenIdx !== -1 ? args[tokenIdx + 1] : null
  if (!token) {
    try {
      token = await getAdminToken(workerUrl)
    } catch (err) {
      console.error(err.message)
      process.exit(1)
    }
  }
  if (!token) {
    console.error(
      'Sem token. Passe --token <JWT admin>, ou preencha ADMIN_USERNAME/ADMIN_PASSWORD em platform/scripts/.env ' +
        '(copie de .env.example) e rode com: node --env-file=platform/scripts/.env platform/scripts/publish-avaliacao.mjs <slug> --post <WORKER_URL>'
    )
    process.exit(1)
  }

  try {
    const res = await fetch(`${workerUrl}/api/admin/seed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(JSON.stringify(data))
    console.log('Avaliação publicada:', JSON.stringify(data))
  } catch (err) {
    console.error('Falha ao publicar avaliação:', err.message)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main()

export { buildPublishPayload }
