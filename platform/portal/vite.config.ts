import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, '../dist')

export default defineConfig({
  plugins: [
    vue(),
    {
      // Em dev, serve .json e .md de platform/dist/ (gerados pelo build-all)
      name: 'serve-dist-static',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const urlPath = req.url?.split('?')[0] ?? '/'
          if (!urlPath.endsWith('.json') && !urlPath.endsWith('.md')) return next()
          const filePath = path.join(DIST, urlPath)
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', urlPath.endsWith('.json') ? 'application/json' : 'text/markdown; charset=utf-8')
            res.end(fs.readFileSync(filePath))
            return
          }
          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },
  build: {
    // Output vai para platform/dist/ (um nível acima de platform/portal/)
    outDir: path.resolve(__dirname, '../dist'),
    emptyOutDir: false, // Não apagar as aulas já buildadas!
  },
})
