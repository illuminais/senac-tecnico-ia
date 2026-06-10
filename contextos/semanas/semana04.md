---
schema: semana
semana: "04"
aulas: [A31, A32, A33]
periodo: 2026-06-11 / 2026-06-13
reposicao: A33
reposicao-data: 2026-06-13
---

# Semana 04 — 11–13/jun

## Fio condutor
*Código no papel e inglês na voz.* Semana de consolidação ativa: Python vira atividade física (papel + colega como compilador humano), Inglês vira produção oral e colaborativa com entregas parciais diárias. Word fecha a pendência do T1 e libera espaço para o sprint.

---

## A31 — 11/06 · Qui · Sem 1 (override: UC01+UC02)

| # | UC | HA | Método | Tópicos | Ind. |
|---|---|---|---|---|---|
| 1 | UC01 Fund. Computação | 3 | `lab-guiado` | **Relatório da Visita Técnica em ABNT:** configurar Word (margens 3/2 cm, Times New Roman 12, espaçamento 1,5, número de página). Escrever as 3 seções: Introdução (data, local, duração, quem participou) · Desenvolvimento (o que viram, quem estava lá) · Conclusão (o que aprenderam, o que mais gostaram). **Entrega:** relatório impresso + template `.dotx` salvo em Documentos. | UC01-Ind.2 · UC01-Ind.3 |
| 2 | UC02 Inglês | 3 | `leitura técnica` (metodologia inversa) | **Day 1 — Developers Read Docs:** alunos recebem extrato real do `help()` impresso (4 extratos: list.append, str.split, dict.get, list.sort). Lêem sem tradutor, destacam termos desconhecidos, adivinam pelo contexto. Error Detective: 4 grupos, 4 erros reais (TypeError/NameError/SyntaxError/IndentationError) → identificar e corrigir. **Entrega: Dicionário Pessoal** — mínimo 8 termos com contexto real (onde vi + o que significa aqui). Este dicionário cresce o T2 inteiro. | UC02-Ind.1 · UC02-Ind.2 |

**Prep A31:**
- Relatório da visita técnica: template Word ABNT semi-configurado (aluno finaliza config + escreve as 3 seções)
- 4 extratos `help()` impressos (um por grupo): `help(list.append)`, `help(str.split)`, `help(dict.get)`, `help(list.sort)`
- 4 erros Python impressos com o código que causou cada um (um por grupo)
- Folha do Dicionário Pessoal (colunas: TERMO | ONDE VI | O QUE SIGNIFICA AQUI)

---

## A32 — 12/06 · Sex · Sem 1 (override: UC02+UC05)

| # | UC | HA | Método | Tópicos | Ind. |
|---|---|---|---|---|---|
| 1 | UC02 Inglês | 3 | `escrita técnica` (Comment Engineer + Passa o Código) | **Abertura — "Quem sou eu? v2" (5 min):** revisão rápida dos cartões do dia anterior — aluno explica em 1 frase o que o colega é. **Comment Engineer (20 min):** aluno escreve função Python no papel E os comentários em inglês: `# This function [verb] [what]` / `# Input: [type] — [description]` / `# Returns: [type] — [description]`. **"Passa o Código" (15 min):** aluno A escreve função → passa pro B que escreve só os comentários EN sem ver o nome das variáveis → passa pro C que lê só os comentários e tenta reescrever o código → comparam código de C com o de A. Se parecidos: comunicação ok. Dicionário: verbos (define, returns, checks, calculates, appends, gets). | UC02-Ind.2 · UC02-Ind.3 |
| 2 | UC05 Python | 3 | `papel` + peer review + "Cria o Bug" | **Python no papel — Parte 1 (25 min):** cada aluno escreve 4 trechos: (1) for com lista, (2) função com parâmetro + return, (3) tuple imutável, (4) set com ∪ e ∩. **"Cria o Bug, Passa o Bug" (10 min):** cada aluno reescreve um dos 4 trechos com um bug intencional → passa pro colega da direita → colega: (1) identifica o erro, (2) fala o nome em inglês (TypeError / NameError / SyntaxError), (3) corrige. Quem criou o bug mais difícil ganha o round. **Peer review final (5 min):** RODA ✓ / ERRO ✗ + motivo. | UC05-Ind.1 · UC05-Ind.2 |

**Prep A32:**
- Folhas "código no papel" com cabeçalho (nome, data) e espaço para comentários EN abaixo de cada trecho
- Template de comentário EN impresso: `# This function... / # Input:... / # Returns:...`
- Folha de avaliação do colega (RODA ✓ / ERRO ✗ + "o que você entendeu dos comentários?")

---

## A33 — 13/06 · Sab · Reposição (UC02+UC05)

| # | UC | HA | Método | Tópicos | Ind. |
|---|---|---|---|---|---|
| 1 | UC02 Inglês | 3 | `escrita técnica` (Mini README) | **Day 3 — Mini README:** grupos produzem 1 página de README para o código que escreveram nos 2 dias anteriores. Template com 4 seções: `## What it does` / `## How to use` / `## Example` / `## Author`. Preenchem em inglês. Apresentam oralmente: "This function defines... it takes... it returns...". **Entrega final:** README impresso + Dicionário Pessoal com no mínimo 15 termos acumulados (Day 1 + Day 2 + Day 3). | UC02-Ind.3 · UC02-Ind.4 |
| 2 | UC05 Python | 3 | `papel` → `compilação real` | **Python no papel — Parte 2:** escreve no papel: (1) dict com `.get` · `.items` · `.keys`, (2) função que recebe dict e retorna valor calculado. Peer review igual à sexta. Últimos 30min: digitam o código do COLEGA no VS Code/Colab lendo SÓ os comentários EN — confirmam se roda. | UC05-Ind.2 · UC05-Ind.3 |

**Prep A33:**
- Folhas Parte 2 (dict + função) com espaço para comentários EN
- Template README impresso (4 seções com lacunas)
- Pelo menos 1 computador por dupla disponível nos últimos 30min

---

## Entregas de Inglês — progressão

| Dia | Entrega | Formato | Meta |
|---|---|---|---|
| Thu (A31) | Dicionário Pessoal — Day 1 | Folha manuscrita individual (TERMO \| ONDE VI \| O QUE SIGNIFICA AQUI) | 8 termos |
| Fri (A32) | Dicionário Pessoal — Day 2 | Mesma folha, verbos do Comment Engineer adicionados | 13 termos acumulados |
| Sat (A33) | Mini README impresso + Dicionário final | README 1 pág. (4 seções EN) + dicionário completo | 15 termos acumulados |

## Indicadores UC02 cobertos

| Tópico | Bloco | Abordado em |
|---|---|---|
| Python keywords (variable · function · loop · list · dict · string · int · return · import · library) | Bloco 4 (T1 ⬜→✅) | Day 1 + Day 2 |
| Error messages (SyntaxError · TypeError · NameError) | Bloco 5 (T1 ⬜→✅) | Day 2 (peer review) |
| Leitura de README GitHub | T2 #8 (⬜→✅) | Day 1 (snippet EN) |
| Interpretação de docstring | T2 #9 (⬜→✅) | Day 2 (Comment Engineer + Passa o Código) |
| Escrita técnica básica | T2 #13 (⬜→✅) | Day 3 (Mini README + apresentação oral) |

---

## Refs
↑ [roteiro-t2](../roteiro-t2.md)
→ [contexto-ingles](../contexto-ingles-instrumental.md) · [contexto-python](../contexto-python-para-ia.md) · [contexto-computacao](../contexto-fundamentos-de-computacao.md)
→ [semana03](semana03.md) · [semana05](semana05.md)
