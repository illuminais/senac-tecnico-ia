---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 35 — Copa Analytics Dia 2"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 35"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-06-19"
unlockHour: 9
layout: cover
---

<!-- SLIDE 1 -->

# Aula 35
## Copa Analytics - Dia 2

**UC05 Python + UC09 Estatística**

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 2 -->

# BLOCO 1
## UC05 Python para IA
### Programando a resposta do seu time

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 35"
---

<!-- SLIDE 3 -->
<!-- objetivo: reativar o contexto da dinâmica do dia anterior e conectar a pergunta-guia ao trabalho de hoje -->

# Retomada: o que o seu time descobriu ontem?

**5 minutos - cada time responde em voz alta:**

- Qual era a pergunta-guia do seu time?
- O que as queries SQL mostraram sobre os dados de 2026?
- Qual seleção lidera segundo os dados que vocês encontraram?

> Hoje vocês vão usar Python para confirmar ou refutar essa resposta com números reais.

---
layout: center
card: true
bgPreset: animate
aulaNum: "Aula 35"
---

<!-- SLIDE 4 -->

# O dataset do dia

`copa2026_stats.csv` - 24 seleções, dados completos da fase de grupos 2026

> Carregar, explorar, analisar, responder.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 5 -->
<!-- objetivo: aluno instala o pandas antes de começar -->

# Antes de começar: instale o pandas

Abra o terminal do VS Code com **Ctrl + `** e rode:

```bash
py -m pip install pandas
```

Aguarde terminar. Quando aparecer `Successfully installed`, pode continuar.

> O pandas é a biblioteca mais usada para trabalhar com dados em Python.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 6 -->
<!-- objetivo: aluno consegue carregar e inspecionar um CSV com pandas usando read_csv e .head() -->

# Carregando o dataset com pandas

```python
import pandas as pd

df = pd.read_csv('copa2026_stats.csv')
print(df.head())           # primeiras 5 linhas
print(df.columns.tolist()) # nomes das colunas
```

**Colunas do dataset:**
`nome, grupo, jogos, vitorias, empates, derrotas,`
`gols_pro, gols_contra, saldo_gols, pontos, posse_media,`
`chutes, amarelos, vermelhos`

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 7 -->
<!-- objetivo: aluno usa .describe() para ter uma visão geral do dataset -->

# Explorando com .describe()

```python
df = pd.read_csv('copa2026_stats.csv')

print(df.describe())
```

O `.describe()` mostra um resumo estatístico de todas as colunas numéricas de uma vez.

> É o primeiro comando que qualquer analista de dados roda ao abrir um novo dataset.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 8 -->
<!-- objetivo: aluno entende o que cada linha do describe() significa -->

# O que cada linha do .describe() significa

- `count` - quantas linhas têm dados (sem valores ausentes)
- `mean` - média de cada coluna numérica
- `min` / `max` - menor e maior valor
- `std` - desvio padrão (vamos usar no Bloco 2)

> Rode agora e leia os números da coluna `pontos`. Qual seleção tem mais pontos em média?

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 9 -->
<!-- tarefa de casa: aula 35 UC05 -->

# Tarefa de Casa - UC05

> **Prazo: próxima aula (A36)**

**Desafio: explore o dataset com pandas**

Escreva um script que:

1. Carregue o `copa2026_stats.csv` com `pd.read_csv()`
2. Filtre as seleções do **Grupo A** com `df[df['grupo'] == 'A']`
3. Imprima nome, pontos e saldo de gols de cada seleção do grupo

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 10 -->

# Tarefa UC05 - dica de início

```python
import pandas as pd

df = pd.read_csv('copa2026_stats.csv')
grupo_a = df[df['grupo'] == 'A']
print(grupo_a[['nome', 'pontos', 'saldo_gols']])
```

**Salve como:** `SENAC-TecIA/Aula-35/tarefa_uc05.py`

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 11 -->

# BLOCO 2
## UC09 Estatística Aplicada
### Sala de Aula Reversa

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 12 -->
<!-- objetivo: explicar o formato sala de aula reversa para alunos que nunca viram esse modelo -->

# Como funciona hoje

Normalmente o professor explica e vocês praticam. **Hoje é diferente.**

Vocês vão **pesquisar, descobrir e trazer as respostas.** O professor não vai explicar os conceitos antes -- vai circular e ajudar quem travar.

**No final da aula:**
- Cada time apresenta o que entendeu sobre os 3 conceitos
- Usa esse entendimento para melhorar a hipótese da Copa Analytics

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 13 -->
<!-- objetivo: mostrar o mapa das 4 missões -->

# As 4 missões de hoje

<SlideTable>

| Missão | O que descobrir |
|---|---|
| 1 | O que é **média** e quando usar |
| 2 | O que é **mediana** e quando ela é mais justa que a média |
| 3 | O que é **desvio padrão** e o que ele diz sobre consistência |
| 4 | Como usar esses números para **validar ou recusar a hipótese** do time |

</SlideTable>

> Anotem tudo em palavras próprias. Copiar e colar não conta.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 14 -->
<!-- objetivo: guiar a pesquisa sobre média com perguntas concretas -->

# Missão 1: Média

**O que vocês precisam descobrir:**

- Como se calcula a média de uma lista de números?
- O que a média representa sobre um conjunto de dados?
- Quando a média pode dar uma ideia errada da realidade?

**Onde pesquisar:** Khan Academy PT -- busque "média aritmética" | YouTube: "Me Salva média"

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 15 -->
<!-- objetivo: teste de entendimento da missão 1 -->

# Missão 1: teste seu entendimento

Um atacante marcou esses gols nas últimas 5 temporadas:

`3, 2, 1, 4, 20`

- Qual é a média?
- Esse número representa bem o atacante? Por quê?

> Se você consegue responder isso com suas palavras, entendeu a missão.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 16 -->
<!-- objetivo: guiar a pesquisa sobre mediana -->

# Missão 2: Mediana

**O que vocês precisam descobrir:**

- Como se encontra a mediana de uma lista?
- Por que a mediana não é afetada por valores extremos?
- Em que situação você escolheria a mediana em vez da média?

**Onde pesquisar:** Khan Academy PT -- busque "mediana" | YouTube: "o que é mediana simples"

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 17 -->
<!-- objetivo: teste de entendimento da missão 2 -->

# Missão 2: teste seu entendimento

Salários mensais de 5 pessoas:

`R$ 1.500 | R$ 1.800 | R$ 2.000 | R$ 1.600 | R$ 50.000`

- Qual é a média? Qual é a mediana?
- Se você fosse descrever o salário típico desse grupo, qual usaria?

> Se os dois números são muito diferentes, existe um valor distorcendo a média.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 18 -->
<!-- objetivo: guiar a pesquisa sobre desvio padrão -->

# Missão 3: Desvio Padrão

**O que vocês precisam descobrir:**

- O que o desvio padrão mede (em palavras simples, sem fórmula)?
- O que significa desvio padrão alto? E baixo?
- Qual time é mais confiável: média alta com desvio alto, ou média menor com desvio baixo?

**Onde pesquisar:** YouTube: "desvio padrão para iniciantes" | Khan Academy PT: "desvio padrão"

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 19 -->
<!-- objetivo: teste de entendimento da missão 3 -->

# Missão 3: teste seu entendimento

**Time A** marcou: `5, 5, 5, 5, 5` gols nas últimas 5 copas

**Time B** marcou: `1, 2, 10, 8, 4` gols nas últimas 5 copas

- Qual tem desvio padrão maior? Por quê?
- Qual você escalaria para uma final importante?

> Desvio padrão alto significa: você não sabe o que esperar do time.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 20 -->
<!-- objetivo: ensinar o conceito de hipótese de forma concreta -->

# Missão 4: o que é uma hipótese?

Uma hipótese é uma **afirmação que pode ser verdadeira ou falsa.** Você a escreve antes de ver os dados, e os dados confirmam ou derrubam.

**Exemplo:**
> "A Argentina é a favorita porque tem o melhor ataque histórico."

Essa afirmação é a hipótese. Agora você precisa de números para provar ou derrubar ela.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 21 -->
<!-- objetivo: mostrar como os três conceitos validam ou derrubam uma hipótese -->

# Missão 4: como os dados validam a hipótese

Para validar o exemplo anterior, você precisaria mostrar:

- A **média** de gols da Argentina é maior que a dos concorrentes?
- Essa média é real ou tem uma Copa boa distorcendo? (use a **mediana**)
- O time repete bons resultados ou varia muito? (use o **desvio padrão**)

**Se os três apontam na mesma direção, a hipótese é sólida.**
Se um contradiz, você revisa ou limita a afirmação.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 22 -->
<!-- objetivo: centralizar fontes recomendadas -->

# Fontes recomendadas

**Khan Academy PT** -- khanacademy.org/pt
Busque: "medidas de tendência central"

**Brasil Escola** -- brasilescola.uol.com.br
Busque: "média aritmética" ou "desvio padrão"

> Não precisa assistir o vídeo completo. Pause quando achar a resposta e anote.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 23 -->
<!-- objetivo: deixar cristalino o que é esperado ao final da aula -->

# O que é esperado de vocês

**Ao final desta aula, cada time precisa ter:**

**1. Definições em palavras próprias** (não copiadas)
- Média, mediana e desvio padrão -- cada um em uma frase
- Um exemplo de cada que **não** seja de futebol

**2. Resposta para esta pergunta:**
> "Quando você usaria a mediana em vez da média? Cite um caso real."

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 24 -->
<!-- objetivo: hipótese revisada como entrega final -->

# O que é esperado (cont.)

**3. Hipótese revisada do time**

- A hipótese original ainda é válida?
- Qual métrica mais apoia a hipótese?
- Qual métrica coloca ela em dúvida?

<AdminOnly>

**O que observar:** se o time consegue explicar com exemplo próprio, entendeu. Se só repete a definição decorada, faça outra pergunta: "e se todos os valores fossem iguais, a média e a mediana seriam iguais?"

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 25 -->
<!-- objetivo: template para reescrever a hipótese com os três conceitos -->

# Melhore a hipótese do time

**Estrategista + Analista -- reescrevam a hipótese original:**

> "Nossa hipótese era que ___ porque ___."

> "A **média** de ___ confirma / não confirma isso porque ___."

> "A **mediana** mostra que ___, o que significa que ___."

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 26 -->

# Melhore a hipótese (cont.)

> "O **desvio padrão** indica que ___, então o time é / não é consistente."

> "Com isso, nossa hipótese **se mantém / precisa ser revisada** porque ___."

**Salve em:** `SENAC-TecIA/Aula-35/hipotese_revisada.txt`

<AdminOnly>

**O que avaliar:** o time consegue usar os três conceitos para qualificar a afirmação? Consegue dizer "nossa hipótese se mantém, mas com ressalva X"? Isso é pensamento analítico.

</AdminOnly>

---
layout: center
card: true
bgPreset: animate
pulse: true
pulseDuration: 6
aulaNum: "Aula 35"
---

<!-- SLIDE 27 -->

# Apresentação Final
## Copa Analytics - Pitch de 2 minutos

**Cada time tem exatamente 2 minutos para apresentar.**

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 28 -->
<!-- objetivo: estrutura do pitch de 2 minutos -->

# Estrutura do Pitch

**0:00 - 0:20 | A pergunta-guia**
> "Nossa pergunta era: ___"

**0:20 - 0:50 | Os dados de 2026**
> "Segundo o `copa2026_stats.csv`, encontramos que ___"

**0:50 - 1:20 | A hipótese revisada**
> "Antes achávamos que ___. Agora, com média ___ e desvio ___, sabemos que ___."

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 29 -->

# Estrutura do Pitch (cont.)

**1:20 - 1:50 | A resposta final**
> "Com base nos dados, nossa resposta é ___"

**1:50 - 2:00 | Um número para convencer**
> "O número que mais nos convence é ___"

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 30 -->
<!-- objetivo: checklist para o apresentador -->

# Checklist antes de apresentar

**Apresentador - confirme com o time:**

- [ ] A pergunta-guia está em uma frase clara
- [ ] Temos pelo menos 2 números dos dados de 2026
- [ ] Sabemos explicar média e mediana em palavras próprias
- [ ] A hipótese foi revisada com base nos conceitos pesquisados
- [ ] A resposta final cabe em uma frase direta

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 31 -->

# Checklist (cont.)

**Analista de Dados - confirme:**

- [ ] O código de carregamento do CSV roda sem erros
- [ ] Os prints mostram os números certos
- [ ] A hipótese revisada está salva em `hipotese_revisada.txt`

---
layout: end
bgPreset: palette
github: LeoZanini
aulaNum: "Aula 35"
---

<!-- SLIDE 32 -->

# Copa Analytics - Fim do Dia 2

**Vocês fizeram hoje:**

- Instalaram o pandas e carregaram um CSV real
- Exploraram dados com `.head()` e `.describe()`
- Pesquisaram média, mediana e desvio padrão por conta própria
- Revisaram a hipótese do time usando esses conceitos
- Apresentaram uma análise com dados reais

**Próxima aula:** calculamos média, mediana e desvio padrão com Python usando os dados da Copa
