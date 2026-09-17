---
schema: semana
semana: 16
aulas: [A56, A57]
periodo: 2026-09-17 / 2026-09-18
---

# Semana 16 — 17–18/set

## Fio condutor
Fecha o épico 1. **Replanejado em 16/09:** por ajuste de calendário, **A56 e A57 têm 3 HA cada**
(as outras 6 HA somem e são lançadas como dadas no OrionWeb). UC04 não abre mais na sexta; o épico 2
começa em A58 (24/09). Segunda mudança, vinda do diagnóstico da A55 ("a aula travou em como fazer no
Excel"): **as comparações chegam prontas** no `dengue_pr_comparado.xlsx` v2 (tabelas T1, T2, T3) e o
aluno não monta tabela dinâmica. O tempo vai para critério, padrão, relação, decisão e limite do dado.
O painel (Av01-T3) se divide: elementos 1, 2 e 5 na quinta, 3 e 4 na sexta; menção lançada na mesa
na sexta. Todo número do painel tem que existir numa tabela do arquivo e vir citado com ela.

## A56 — 17/09 · Qui · Épico 1 dia 3 de 4 · verbos COMPARAR e DECIDIR · **3 HA (150 min)**

| min | UC | Bloco | Método | O que o aluno faz | Slides | Ind. |
|---|---|---|---|---|---|---|
| 0-8 | UC01 | abertura | expositivo | abre a rede v2, salva como `painel_dengue_pr.xlsx` (formato .xlsx, também no Calc); as 5 abas; regra "número com tabela ao lado" | 1-5 | |
| 8-25 | UC01 | origem + atestar | lab | preenche `00_origem` (5 campos) e confere o total de Londrina 2025 numa segunda fonte, explicando a diferença | 6-8 | UC01-4 |
| 25-43 | UC01 | critério | expositivo | T2 tem duas respostas para "mais dengue"; conceito; duas réguas; Ex.2 qual régua para qual decisão | 9-13 | UC01-6 |
| 43-61 | UC01 | padrão | expositivo | conceito; T1 março nos dois anos = padrão; T3 região líder muda = não é; Ex.3 escrito | 14-17 | UC01-6 |
| 61-74 | UC01 | relação | expositivo | conceito; T3 região x taxa (Norte 5.989, Leste 634); relação não é causa | 18-20 | UC01-6 |
| 74-84 | UC01 | limite do dado | pbl | notificação vs doença; Campo Mourão; Ex.4 pergunta que o dado não responde | 21-23 | UC01-6 |
| 84-92 | UC01 | gráfico | expositivo | tipo por pergunta; 3 regras; o único como-fazer do dia, com os caminhos do Excel e do LibreOffice Calc | 24-27 | UC01-6 |
| 92-105 | UC01 | decisão | pbl | Londrina 1º/3º vs Jacarezinho 16º/1º; os dois lados; as quatro partes; Ex.5 julgue A, B, C | 28-32 | UC01-6 |
| 105-148 | UC01 | **Av01-T3 parte 1** | avaliacao | elementos 1, 2 e 5 do painel; extra: tabela dinâmica conferida contra T1 | 33-38 | UC01-4·5·6 |
| 148-150 | UC01 | fecho | | tarefa: recomendação com 4 partes no caderno | 39-40 | |

**Ordem de corte:** 1º Ex.5 "julgue A, B, C" (vai para a abertura da sexta, slides 4-5) · 2º "para que
serve padrão" vira uma frase · 3º o atestar cai de 17 para 10 min (só Londrina, fonte já no projetor).
**Não pode cair:** origem + atestar (é o Indicador 4 inteiro), decisão (28-32), os 43 min de painel.

**Prep / antes de sair de casa:**
- Rodar `venv/bin/python scripts/dataset-dengue/comparacoes.py` e levar o `dengue_pr_comparado.xlsx` em pendrive. Abrir no Excel do laboratório: a célula-canário em `04_painel` não pode aparecer e a aba `_notas` fica oculta
- **Testar a fonte externa do Exercício 1b:** a página municipal do InfoDengue só mostra a semana atual (conferido em 16/09). Achar onde o total anual de Londrina aparece (informe da SESA-PR em `dengue.pr.gov.br` ou notícia da Folha de Londrina / G1 PR) e, se for o caso, trocar a busca do slide 7 pelo caminho exato
- **Descobrir se o laboratório é Windows/Excel ou Linux/LibreOffice Calc.** Os slides de como-fazer trazem os dois caminhos lado a lado (A56: 26-27 e 37-38; A57: 6-7). Conferir os rótulos na versão instalada: Excel **Inserir → Gráficos**, **Design do Gráfico → Adicionar Elemento Gráfico → Títulos dos Eixos**; Calc **Inserir → Gráfico...** (Assistente, passo "Elementos do gráfico" para título e eixo Y), **Inserir → Tabela dinâmica...**. O xlsx v2 foi aberto no LibreOffice 26.2 em 16/09: aba `_notas` fica oculta e a célula-canário fica branca
- No Calc, o aluno precisa salvar em `.xlsx` (**Arquivo → Salvar como...**, tipo Excel 2007-365, "Usar o formato Excel 2007-365!"). Está no slide 4 da A56 e no 3 da A57
- Abrir um arquivo de 11/09 de quem terminou e ver se a "aba a mais" é a de origem; se for, o slide 6 já prevê copiar
- Ler a rubrica em [av01-t3-painel-decisao](../aval/av01-t3-painel-decisao.md): Indicador 4 agora inclui a conferência externa; Indicador 6 exige número existente na tabela citada

## A57 — 18/09 · Sex · Épico 1 dia 4 de 4 · verbo REFAZER · **3 HA (150 min)** · fecha a disciplina

| min | UC | Bloco | Método | O que o aluno faz | Slides | Ind. |
|---|---|---|---|---|---|---|
| 0-10 | UC01 | abertura | expositivo | abre o painel de ontem; como funciona hoje; quem faltou faz os 5 elementos | 1-3 | |
| 10-20 | UC01 | aquecimento | pbl | as quatro partes; julgue A, B, C; teste a própria recomendação do caderno | 4-5 | UC01-6 |
| 20-95 | UC01 | **Av01-T3 parte 2** | avaliacao | elemento 3 (gráfico de coluna da T3, Excel ou Calc), 4 (recomendação com 4 partes), 5 (limite); checklist | 6-12 | UC01-6 |
| 95-135 | UC01 | conferência e trilhas | avaliacao | professor confere na mesa por indicador ("me mostra na tabela"), lança a menção; trilhas A/B/C na hora; desafio para quem fechou | 13-18 | UC01-4·5·6 |
| 135-150 | UC01 | fecho | | as cinco palavras no arquivo; o que fica | 19-21 | |

**Ordem de corte:** 1º aquecimento · 2º as cinco palavras vira pergunta oral. **Não pode cair:** os 75
min de painel + os 40 min de conferência (é o que lança a menção).

**Prep / antes de sair de casa:**
- **Imprimir a rubrica por aluno** (uma folha: 5 elementos + 3 indicadores, A/PA/NA) para marcar na mesa. 40 min para a turma inteira dá menos de 2 min por aluno: começar a conferir quem termina cedo ainda dentro dos 75 min
- Levar a rede v2 para quem faltou na quinta
- Canários: procurar "Centro-Sul", "Vale do Ivaí" e "3.417" nos painéis. Conduta: NA no Indicador 6 e conversa individual, sem anunciar para a turma
- Depois da aula: rodar `atualizador-pos-aula` com A56 e A57 (3 HA reais cada, 6 lançadas), fechar as menções, e planejar o épico 2 (UC04, abre em A58 com 6 HA; os 5 HA perdidos precisam sair do roteiro-t3)

## Refs
↑ [roteiro-t3](../roteiro-t3.md) · [semana15](semana15.md)
→ [contexto-fundamentos-de-computacao](../contexto-fundamentos-de-computacao.md) · [av01-t3-painel-decisao](../aval/av01-t3-painel-decisao.md)
→ dados: `aulas/09set/A55_UC01_11set/public/dados/README.md` (gabarito, tabelas, canários)
