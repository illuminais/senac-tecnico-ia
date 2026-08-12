---
id: av05-t2
slug-plataforma: av09
titulo: "Error Report — lendo o que a máquina responde"
tipo: PE
ucs: UC02
indicadores: "UC02: Ind.1+2+3"
data-alvo: "13/08/2026"
aula-alvo: A46
status: pronta-para-imprimir
---

# Av05-T2 — Error Report

> **Instrumento pronto.** Os itens vivem no HTML de impressão, não neste arquivo:
> `aulas/08ago/A46_UC05+02_13ago/dados/av05-t2-para-imprimir.html` (prova)
> `aulas/08ago/A46_UC05+02_13ago/dados/av05-t2-gabarito.html` (gabarito comentado, Fase 2)
> `aulas/08ago/A46_UC05+02_13ago/dados/materiais-av05-t2.md` (metodologia, quadro, impressão)

**Tipo:** PE — prova escrita individual · **em papel, sem computador e sem celular**
**Data:** 13/08/2026 (A46, bloco 2) · **Duração:** ~1h a 1h15 (Fase 1) + ~30min (Fase 2)
**Indicadores:** UC02 Ind.1 (vocabulário) · Ind.2 (interpreta instrução) · Ind.3 (estratégia de leitura)
**Plataforma:** `avaliacoes/av09/` — meta + descrição do formato, **sem as questões**

---

## Decisões de desenho (professor, 11/08/2026)

1. **Papel, não plataforma.** Prova de leitura de código no computador vira cópia e cola no ChatGPT e não mede nada.
2. **Muito código para ler.** Sete programas com erro, cada um com a mensagem real que aparece na tela.
3. **Assinalar + descrever.** Múltipla escolha para vocabulário e para "o que fazer"; questão discursiva para os dois erros mais difíceis.
4. **Distratores que enganam de verdade.** Falsos cognatos (`indented` ≠ identificado, `argument` ≠ discussão) e consertos plausíveis que não resolvem.
5. **Ajuda no quadro é permitida** — o método de leitura em 3 passos e um esqueleto de `def`. Nunca tradução de palavra.
6. **Duas fases.** Fase 1 é o choque; Fase 2 é o aluno corrigir a própria prova, escrever o que errou e por quê, e levar para o visto.
7. **Mistura de código já visto e código de hoje.** C1 a C4 são funções (conteúdo do bloco da manhã); C5 é `input()` sem conversão (A05); C6 é lista (T1); C7 combina função com lista vazia.

---

## Mapa de cobertura

| Parte | Itens | Indicador | O que evidencia |
|---|---|---|---|
| 1 — vocabulário em contexto | 8 múltipla escolha | Ind.1 | Reconhece o termo técnico em inglês dentro da mensagem real |
| 2A — o que a mensagem manda fazer (com o código) | 6 múltipla escolha | Ind.2 + UC05 Ind.3 | Converte a instrução em ação concreta · também vale como evidência informal de depuração |
| 2B — só a mensagem, sem o código | 4 múltipla escolha | Ind.2 | **Isola o inglês:** sem o código à vista, só a leitura da mensagem resolve |
| 3 — descreva o erro | 2 discursivas (5 sub-itens) | Ind.2 | Explica com as próprias palavras, sem alternativa para chutar |
| 4 — texto técnico em inglês | 4 itens (2 MC, 1 cópia, 1 busca) | Ind.3 | Skimming, scanning e inferência em texto autêntico |

**Fonte da Parte 4:** The Python Tutorial, seções 8.1 e 8.2 — docs.python.org/3/tutorial/errors.html

---

## Os 7 códigos

| # | Erro | Origem do conteúdo |
|---|---|---|
| C1 | `SyntaxError: expected ':'` | funções — bloco da manhã |
| C2 | `IndentationError: expected an indented block after function definition on line 1` | funções — bloco da manhã |
| C3 | `TypeError: ... missing 1 required positional argument` | funções — bloco da manhã |
| C4 | `NameError: name '...' is not defined` | funções — bloco da manhã |
| C5 | `TypeError: can only concatenate str (not "int") to str` | `input()` e conversão de tipo — A05 |
| C6 | `IndexError: list index out of range` | listas — T1 |
| C7 | `ZeroDivisionError: division by zero`, traceback de **dois níveis** | função + lista vazia |

> ⚠️ **Regerar na máquina do laboratório antes de imprimir.** O texto é estável do Python 3.10 em diante, mas o desenho das setas (`^`, `~~~^^^`) muda entre versões. Saídas conferidas em 11/08/2026.

---

## Conceito Senac

| Ind. | A | PA | NA |
|---|---|---|---|
| 1 | 7 ou 8 acertos na Parte 1 | 4 a 6 | 3 ou menos |
| 2 | 8 a 10 acertos nas Partes 2A+2B **e** pelo menos uma questão da Parte 3 correta | 5 a 7 acertos; ou 8+ sem nenhuma da Parte 3 | 4 ou menos |
| 3 | Acerta 4.1, 4.2 e 4.3 | 2 dos três, ou os três tendo traduzido o texto inteiro | Não localiza a informação |

> **Sinal de alerta na correção:** aluno que vai bem na 2A e mal na 2B está lendo o código, não o inglês. Registrar na observação — não muda o conceito, mas muda o que precisa ser retomado.

**Fase 2:** um **PA** vira **A** se a folha de correção mostrar entendimento com as palavras do aluno. Um **NA** não sobe por autocorreção.

---

## Refs
↑ [ATIVIDADES_AVALIATIVAS](../ATIVIDADES_AVALIATIVAS.md)
→ [semana11](../semanas/semana11.md) · [contexto-ingles-instrumental](../contexto-ingles-instrumental.md) · [indicadores-t2](../indicadores-t2.md)
