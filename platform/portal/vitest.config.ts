import { defineConfig } from 'vitest/config'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Config dedicada para testes (Vitest). Reaproveita os mesmos aliases do
// vite.config.ts (mantidos em sincronia manualmente), sem herdar o plugin
// de dev server que serve .json/.md de platform/dist/.
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },
  test: {
    environment: 'node',
  },
})
