# Neural Slides — Template de Aula Senac

Template para criar aulas do **Técnico em Inteligência Artificial** usando o [Slidev](https://sli.dev) com o tema Neural.

## Pré-requisitos

- Node.js 18+ — [nodejs.org](https://nodejs.org)
- npm 9+

## Início Rápido

```bash
git clone https://github.com/senac-tec-ia/neural-slides-template aula-NN-nome-do-topico
cd aula-NN-nome-do-topico
npm install
npm run dev
```

Acesse `http://localhost:3030` para ver os slides.

## Comandos

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com `slides.md` |
| `npm run dev:demo` | Abre o demo de todos os layouts (`slides-demo.md`) |
| `npm run build` | Gera o site estático em `dist/` |
| `npm run export` | Exporta para PDF (`aula-export.pdf`) |
| `npm run export:pptx` | Exporta para PowerPoint (`aula-export.pptx`) |

## Layouts Disponíveis

| Layout | Descrição |
|---|---|
| `cover` | Capa com rede neural centrada |
| `default` | Conteúdo padrão (lista, texto, código) |
| `center` | Conteúdo centralizado na tela |
| `end` | Encerramento com card de perfil |
| `social` | Slide de plataforma social (Instagram, YouTube, etc.) |
| `brainstorm` | Pergunta aberta para a turma |
| `big-img-text` | Imagem à esquerda + texto à direita |
| `two-cols-text` | Duas colunas de texto |
| `two-cols-img` | Duas imagens lado a lado |
| `two-cols-img-and-text` | Imagem + lista de características |
| `three-cols-img` | Três imagens ou etapas |

Execute `npm run dev:demo` para ver um exemplo de cada layout em funcionamento.

## Como usar

1. Edite **apenas** `slides.md`
2. Preencha o frontmatter global (title, author, courseTitle, aulaNum)
3. Adicione slides separados por `---`
4. Use os layouts e componentes conforme necessário

Veja [INSTRUCOES-SENAC.md](INSTRUCOES-SENAC.md) para o guia completo, incluindo:
- Referência de todos os parâmetros de frontmatter
- Metodologia de aula em blocos
- Mapa de UCs por trimestre
- Checklist pré-publicação

## Tema

Este template usa o tema **slidev-theme-neural** — uma rede neural animada em SVG como plano de fundo, tipografia IBM Plex Sans, paleta escura e componentes especializados para aulas de Machine Learning.

O tema possui três presets de fundo:
- `default` — rede estática e sutil
- `animate` — rede pulsando em verde neon
- `palette` — rede pulsando com nós coloridos

## Estrutura de Arquivos da Aula

```
slides.md           ← Conteúdo da aula (único arquivo para editar)
public/
  assets/           ← Coloque imagens da aula aqui
```
