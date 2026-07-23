#!/usr/bin/env bash
# setup-hooks.sh — Instala o pre-commit hook no .git/hooks/
# Rodar uma vez após clonar o repositório: npm run setup:hooks

ROOT="$(git rev-parse --show-toplevel)"
HOOK="$ROOT/.git/hooks/pre-commit"

cat > "$HOOK" << 'EOF'
#!/usr/bin/env bash
ROOT="$(git rev-parse --show-toplevel)"
FAILED=0

# 1) Lint determinístico de slides.md staged
LINT="$ROOT/scripts/lint-slides.mjs"
STAGED_SLIDES=$(git diff --cached --name-only --diff-filter=ACM | grep 'slides\.md$')
if [ -n "$STAGED_SLIDES" ]; then
  echo "🔍 Lint de slides staged..."
  for file in $STAGED_SLIDES; do
    node "$LINT" "$file" || FAILED=1
  done
fi

# 2) Validação do grafo de estado quando platform/specs/ é tocado
STAGED_SPECS=$(git diff --cached --name-only --diff-filter=ACM | grep '^platform/specs/.*\.md$')
if [ -n "$STAGED_SPECS" ]; then
  echo "🔍 Validando grafo de estado (platform/specs/)..."
  node "$ROOT/platform/scripts/validate-graph.mjs" || FAILED=1
fi

if [ $FAILED -ne 0 ]; then
  echo ""
  echo "❌ Pre-commit falhou — corrigir os erros acima antes de commitar."
  echo "   Para pular (não recomendado): git commit --no-verify"
  exit 1
fi

exit 0
EOF

chmod +x "$HOOK"
echo "✅ Hook pre-commit instalado em $HOOK"
