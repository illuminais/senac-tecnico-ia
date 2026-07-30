// Lint da plataforma LMS (platform/) — worker, portal e scripts.
// Escopo deliberadamente restrito a platform/: o resto do monorepo é
// conteúdo Slidev (aulas/, slidev-theme-neural/), fora do domínio de
// código de aplicação que este lint cobre.
//
// Não faz checagem de tipos (isso é `tsc --noEmit`/`vue-tsc --noEmit`,
// rodado separadamente — ver `npm run typecheck:worker` e
// `npm run build --workspace=portal`). Este config é só as regras de
// padrão de código (variável não usada, import morto, etc.).

import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'platform/.wrangler/**',
      'platform/portal/src/components/ui/**', // se algum dia vier um gerador de UI kit, não lintar saída gerada
    ],
  },

  // Worker (TS puro, sem framework) + shared + scripts
  {
    files: ['platform/worker/src/**/*.ts', 'platform/shared/**/*.ts', 'platform/scripts/**/*.mjs'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: { sourceType: 'module' },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off', // scripts de CLI e o Worker usam console pra diagnóstico
    },
  },

  // Portal Vue + TS
  {
    files: ['platform/portal/src/**/*.{ts,vue}'],
    // 'flat/essential' (não 'flat/recommended'): pega erro real (v-for sem
    // :key, atributo duplicado, etc.), sem impor formatação de markup
    // (quebra de linha por atributo, ordem de atributo) que o projeto nunca
    // seguiu e que não é o que "linting" deveria significar aqui.
    extends: [js.configs.recommended, ...tseslint.configs.recommended, ...pluginVue.configs['flat/essential']],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
        ecmaFeatures: { jsx: false },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'vue/multi-word-component-names': 'off', // views nomeadas por rota (ex. AvaliacaoView), não é o padrão que essa regra cobre
      'vue/require-default-prop': 'off',
    },
  },

  // Testes (vitest) — mesmas regras do portal, sem cobrir com o mesmo rigor de "no-unused-vars" em mocks
  {
    files: ['platform/portal/src/__tests__/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
)
