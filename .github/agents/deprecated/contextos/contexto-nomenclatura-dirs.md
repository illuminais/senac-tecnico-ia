# Convenção de Nomenclatura de Diretórios — Aulas

## Formato

```
A{NN}_UC{XX}+{XX}+{XX}_{DD}{MMM}
```

---

## Componentes

| Parte | Regra | Exemplos |
|---|---|---|
| `A{NN}` | Número sequencial, 2 dígitos obrigatório | `A01`, `A13`, `A99` |
| `UC{XX}+{XX}` | UCs separadas por `+`; placeholder `UCXX` se não planejado | `UC04+07`, `UC05`, `UCXX` |
| `{DD}{MMM}` | Dia 2 dígitos + mês 3 letras minúsculas pt-BR | `09abr`, `26fev`, `31dez` |

**Meses (pt-BR):** jan fev mar abr mai jun jul ago set out nov dez

**Exemplos reais:**
```
A01_UC04+07+01+02_26fev   ← 4 UCs
A05_UC05_12mar             ← 1 UC
A06_UC08+09_13mar          ← 2 UCs
A11_UCXX_09abr             ← placeholder (UCs não definidas)
A13_UCXX_11abr             ← sábado de reposição (ver meta.yaml abaixo)
```

---

## Slug de URL

Conversão automática para uso nas rotas do portal e builds:

| Caractere | Conversão |
|---|---|
| `_` | `-` |
| `+` | `-` |
| Letras | lowercase |

**Exemplos:**
```
A11_UC07+01+02_09abr  →  a11-uc07-01-02-09abr
A06_UC08+09_13mar     →  a06-uc08-09-13mar
A11_UCXX_09abr        →  a11-ucxx-09abr
A01_UC04+07+01+02_26fev → a01-uc04-07-01-02-26fev
```

Implementado em:
- `platform/scripts/build-all.mjs` — função `toSlug()`
- `scripts/renomear-aula.mjs` — usado para atualizar pkg name e scripts

---

## Status de Release

O campo `status` em `meta.yaml` controla visibilidade:

| Valor | Efeito |
|---|---|
| `em-planejamento` | Não aparece no portal — invisível para alunos |
| `draft` | Não aparece no portal — invisível para alunos |
| `published` | Aparece no portal e é incluída no `npm run build:platform` |

**Regra:** NUNCA mudar para `published` sem confirmação explícita do professor.

### Build por status

```bash
npm run build:aulas       # só published → platform/dist/<slug>/
npm run build:aulas:all   # TODAS (independe de status) — apenas dev local
npm run build:platform    # = build:aulas + build:portal (para deploy)
```

---

## Aulas de Sábado (Reposição)

Aulas de reposição de sábado seguem o mesmo formato, com `tipo: reposicao-sabado` no `meta.yaml`:

```yaml
tipo: reposicao-sabado
```

---

## Como Renomear uma Aula

```bash
node scripts/renomear-aula.mjs <nome-atual> <nome-novo>
```

**O script faz automaticamente:**
1. Renomeia o diretório
2. Atualiza `name` no `package.json` da aula
3. Atualiza os scripts `dev:<slug>`, `build:<slug>`, `export:<slug>` no `package.json` raiz
4. Tenta `gh repo rename` (graceful — não falha se não autenticado)

**Exemplo:**
```bash
node scripts/renomear-aula.mjs A11_UCXX_09abr A11_UC07+01+02_09abr
```

### Redirect pós-renomeação (aula published)

Se a aula estava published, o slug antigo quebra para alunos. Adicionar manualmente em `platform/dist/_redirects`:

```
/<slug-antigo>/* /<slug-novo>/:splat 301
```

Exemplo:
```
/a11-ucxx-09abr/* /a11-uc07-01-02-09abr/:splat 301
```

Após adicionar, fazer deploy para o redirect entrar em vigor.

---

## meta.yaml — Referência Rápida

```yaml
aula: "11"                          # número (string)
slug: ""                            # deixar vazio — gerado pelo build-all.mjs
title: "Título da Aula"
author: "Leonardo Zanini"
courseTitle: "Técnico em Inteligência Artificial"
disciplines:
  - "UC07 — Nome da UC"
date: "09/04/2026"                  # formato DD/MM/YYYY
status: em-planejamento             # em-planejamento | draft | published
deployUrl: ""                       # preencher após 1º deploy
slideCount: 0
agentsUsed: []
# tipo: reposicao-sabado            # só para aulas de sábado
```

---

## package.json da Aula

```json
{
  "name": "a11-ucxx-09abr",         ← slug (lowercase, _ → -, + → -)
  "private": true,
  ...
}
```

---

## Erros Comuns

| Erro | Causa | Solução |
|---|---|---|
| Aula não aparece no portal | `status` não é `published` | Confirmar com professor, editar meta.yaml |
| Slug com `+` na URL | Não converteu `+` → `-` | Verificar `toSlug()` no build-all.mjs |
| Aula aparece duas vezes | Dois dirs com mesmo slug após renomeação | Remover dir antigo, verificar platform/dist |
| workspace não encontrado | `name` no package.json não bate com o dir slug | Correr `renomear-aula.mjs` corretamente |
