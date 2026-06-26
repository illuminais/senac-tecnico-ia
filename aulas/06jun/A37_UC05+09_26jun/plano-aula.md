# Plano de Aula — A37 — 26/06/2026 (Sexta)

## Composição do Dia

| Bloco | UC | Disciplina | HA estimado | Horario |
|---|---|---|---|---|
| 1 | UC05 | Python para IA | ~3h | Manha |
| 2 | UC09 | Estatistica Aplicada | ~3h | Tarde |

**Fio condutor:** "Do dado cru ao dado que convence." Fechamento da semana Copa Analytics: criacao de planilha propria, carregamento com pandas, sistema de consulta que imprime media, mediana e desvio padrao no terminal.

---

## Decisoes Pedagogicas

- **Pandas no braco:** cada grupo cria sua planilha no Excel com dados da Copa, salva como CSV, carrega com pandas. Sem setup complexo de ambiente.
- **Matematica no braco:** desvio padrao calculado passo a passo com os numeros do Japao 2022 (12, 8, 6, 8) antes de qualquer codigo.
- **Exercicio obrigatorio:** media, mediana e desvio padrao — calculo no papel com gabarito numerico, depois confirmado em Python.
- **Estilo leve:** um conceito por vez. Se algum grupo travar no CSV, o professor usa um CSV pronto (copa_analise.csv da aula anterior) como fallback.
- **Contexto continuado:** dados que os alunos ja viram e calcularam em A36 (hoje).

---

## Pre-requisitos e Alertas

| Pre-requisito | Status | Acao |
|---|---|---|
| pandas read_csv, .head(), .describe() | Parcial (A35) | Revisar rapidamente antes de avancar — nao consolidado |
| Mean / median como conceito | OK (A35 pesquisa autonoma) | Retomar com 1 slide, sem aprofundar |
| Desvio padrao manual | Feito hoje (A36) | Conectar com o que fizeram no papel: "agora em Python" |
| Instalacao pandas (pip install) | Nao verificado | Fazer ao vivo no inicio do bloco 1 |

> Aviso: se a turma nao tiver Python instalado localmente, usar o Google Colab como fallback.
> O professor deve testar `import pandas as pd` antes da aula para verificar o ambiente.

---

## BLOCO 1 — UC05 Python para IA (~3h)

**Topico:** Pandas do zero — criar planilha, CSV, carregar e explorar com pandas

**Objetivo:** Alunos carregam seus proprios dados com pandas e calculam media e mediana de uma coluna numerica.

### Lista de Slides — Bloco 1

| # | Tag | Titulo | Resumo |
|---|---|---|---|
| 2 | [TEORIA] | Divisor Bloco 1 — UC05 Pandas do Zero | Slide center de abertura do bloco |
| 3 | [DEBATE] | O que e pandas? Por que ele existe? | Pergunta inicial: como manipular dados sem abrir Excel? |
| 4 | [TEORIA] | Pandas: Excel no Python — mas automatico | Analogia: planilha + automacao. Sem banco de dados. |
| 5 | [TEORIA] | Instalacao: pip install pandas | Live coding ao vivo com a turma — verificar juntos |
| 6 | [TEORIA] | Criar a planilha no Excel — dados da Copa | Cada grupo cria com as colunas: selecao, copa, chutes, gols_pro, fase_eliminada |
| 7 | [TEORIA] | Salvar como CSV — passo a passo | Arquivo > Salvar como > CSV separado por virgulas |
| 8 | [EXERCICIO] | EX01: Criar a planilha com as 5 colunas | Cada grupo cria e salva seu CSV antes de continuar |
| 9 | [TEORIA] | import pandas as pd | O que significa importar — analogia "abrir a caixa de ferramentas" |
| 10 | [TEORIA] | pd.read_csv("arquivo.csv") | Carregar o CSV — o pandas le o arquivo linha por linha |
| 11 | [TEORIA] | df.head() | Ver as primeiras 5 linhas — checar se carregou certo |
| 12 | [TEORIA] | df.describe() | Resumo automatico de todas as colunas numericas de uma vez |
| 13 | [EXERCICIO] | EX02: Carregar o CSV e rodar describe() | O que voce ve na saida? Identificar media e std na tabela |
| 14 | [TEORIA] | df["chutes"] — acessar uma coluna | Sintaxe de colchetes: como selecionar so uma coluna |
| 15 | [TEORIA] | .mean() e .median() — calcular media e mediana | Um metodo por slide, exemplo simples |
| 16 | [EXERCICIO] | EX03: Imprima a media de chutes de todos os times | Gabarito via AdminOnly |
| 17 | [DINAMICA] | Granulado: filtrar por fase e calcular | df[df["fase_eliminada"] == "semi"]["chutes"].mean() — quem chega? |
| 18 | [TAREFA DE CASA] | Tarefa: trazer CSV da planilha para a proxima aula | Salvo com nome correto, colunas definidas |

---

## BLOCO 2 — UC09 Estatistica Aplicada (~3h)

**Topico:** Desvio padrao formalizado + sistema de consulta com pandas

**Objetivo:** Formalizar o desvio padrao em Python e construir um sistema simples de consulta que imprime estatisticas no terminal.

### Lista de Slides — Bloco 2

| # | Tag | Titulo | Resumo |
|---|---|---|---|
| 19 | [TEORIA] | Divisor Bloco 2 — UC09 Desvio Padrao em Python | Slide center de abertura do bloco |
| 20 | [TEORIA] | A formula do desvio padrao | sqrt(sum((x - media)^2) / n) — mostrar, nao decorar |
| 21 | [TEORIA] | Calculando no braco — Japao 2022: 12, 8, 6, 8 | Passo a passo: media, diferencas, quadrados, media dos quadrados, raiz |
| 22 | [EXERCICIO] | EX04: Media, mediana e desvio padrao no papel | Numeros do Japao 2022 — gabarito com todos os passos via AdminOnly |
| 23 | [TEORIA] | df["chutes"].std() — Python confirma o papel | Codigo de 3 linhas: carregar CSV, calcular std, imprimir |
| 24 | [TEORIA] | Desvio padrao baixo = consistencia | Japao (std ~2.18) vs Marrocos 2022 (std mais baixo) — qual foi mais regular? |
| 25 | [DEBATE] | O que o desvio padrao diz sobre o estilo de jogo? | Pergunta aberta: devo preferir um time com std baixo ou alto? |
| 26 | [TEORIA] | O sistema de consulta — visao geral | Mostrar o codigo completo antes de digitar linha por linha |
| 27 | [TEORIA] | input() — receber a fase do usuario | Primeira linha: `fase = input("Ver stats de qual fase?")` |
| 28 | [TEORIA] | Filtro + calculo + print | `filtro = df[df["fase_eliminada"] == fase]` e depois mean/median/std |
| 29 | [EXERCICIO] | EX05: Digitar o sistema do zero — linha por linha | Cada aluno digita junto com o professor; gabarito completo via AdminOnly |
| 30 | [DINAMICA] | Granulado: adicionar segunda consulta | Pedir selecao especifica por nome — quem terminar primeiro |
| 31 | [TEORIA] | Fechamento da semana Copa Analytics | O que fizemos: BD, SQL, pandas, estatistica — de ponta a ponta |
| 32 | [TEORIA] | Slide final | Layout end — ate a proxima! |

---

## Status de Geracao

| Bloco | UC | Status | Slides |
|---|---|---|---|
| Bloco 1 | UC05 | gerado | slides 2-17 (16 slides) |
| Bloco 2 | UC09 | gerado | slides 18-32 (15 slides) |

**Total: 32 slides (1 capa + 16 UC05 + 15 UC09)**
