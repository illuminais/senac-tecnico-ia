---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 59"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 59"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-09-25"
unlockHour: 13
layout: cover
---

<!-- SLIDE 1: Capa -->

# Aula 59
## Plantão da Vigilância, dia 1: consultas

**Banco de Dados (UC08)** · Épico 2, dia 1 de 5

**Indicador 5:** cria e manipula consultas SQL de forma adequada para resolução de problemas

25 de setembro de 2026 · 6 horas-aula

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 2: Onde estamos -->

<!-- objetivo: aluno sabe o que cada um dos 5 dias do épico pede e quando é avaliado -->

# Onde estamos

<SlideTable compact>

| Dia | O que você faz no seu banco | Avaliação | |
|---|---|---|---|
| **25/09** | **abertura: o dado e a primeira previsão** | | **você está aqui** |
| 01/10 | consultas: perguntar e conferir | | |
| 02/10 | consultas que juntam duas tabelas | **Indicador 5**, nas 2 últimas horas-aula | |
| 08/10 | decidir quem pode ver o quê, guardar uma cópia do banco e recuperar | **Indicadores 4 e 6**, nas 2 últimas horas-aula | |
| 09/10 | plantão final: um chamado novo, com tudo do épico | **prova do plantão**, para todos | |

</SlideTable>

O banco é o mesmo nos 5 dias: o `dengue_NN`, um por aluno, no computador do professor.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 3: Como usar este material -->

<!-- objetivo: aluno conhece as convenções do deck antes de precisar delas -->

# Como usar este material

- `Texto nesta letra` é o que você digita no DBeaver, letra por letra, com os mesmos acentos.
- **Preveja:** escreva na ficha o que você espera ver (quantas linhas, qual número) **antes** de rodar.
- **Confira:** diz onde está o número oficial. As tabelas T1, T2 e T3 estão impressas na sua mesa.
- **Antes e depois:** nos slides de comando, a caixa de baixo mostra a tabela antes do comando e o que o banco devolve. Tabela grande aparece em parte, e o título diz quantas linhas ela tem.
- **NN** é o seu número da chamada, com dois dígitos. O número 3 usa `03`.
- O DBeaver mostra número sem ponto de milhar: `6614` é 6.614.

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 4: Divisor bloco 1 -->

# BLOCO 1: ABERTURA DO PLANTÃO

## Sem computador: monitor desligado

<!--
Professor: bloco curto, uns 30 minutos. Os 20 minutos que sobram vão para o SQL humano (bloco 2),
que é o que mais corre risco de estourar. Entregar a ficha (página 1) logo no começo.
-->

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 5: Você é o analista de plantão -->

<!-- objetivo: aluno entende o cenário do dia, o banco individual e o período coberto pelos dados -->

# Você é o analista de plantão

Você trabalha na vigilância de dengue do Paraná. O banco `dengue_NN` guarda os casos de 17 municípios, mês a mês, em 2024 e 2025. Ele é só seu.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 5x: Você é o analista de plantão (cont.) -->

<!-- objetivo: aluno conhece as 5 perguntas do chamado e como cada número vira registro na ficha -->

# Você é o analista de plantão (cont.)

**O chamado de hoje.** A secretária de saúde quer 5 números até o fim do plantão:

1. Quantos casos Londrina teve em março de 2025?
2. Quantos casos Londrina teve em 2025 inteiro?
3. Quantos casos cada macrorregional (as 4 regiões de saúde: Leste, Noroeste, Norte e Oeste) teve em 2025?
4. Quais os 5 municípios com mais casos em 2025?
5. Em que mês de 2025 houve mais casos?

Cada número vai para a ficha junto com a consulta que o gerou e com o lugar onde você o conferiu.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 6: A ficha do plantão -->

<!-- objetivo: aluno sabe preencher a página 1 da ficha e para que ela serve -->

# A ficha do plantão

Você recebe uma folha: a **página 1 da ficha do plantão**. Escreva no alto o seu nome e o seu número da chamada (é o NN do seu login).

Para cada uma das 5 perguntas, a ficha tem cinco campos: **minha previsão**, **a consulta que escrevi**, **o número do banco**, **onde conferi** e **bateu?**.

A previsão vem primeiro, com o monitor desligado. Se ela não bater com o banco, não apague: escreva ao lado o que o banco devolveu e por que você acha que foi diferente.

No fim do dia a ficha fica com o professor e volta para você em 01/10, quando você responde as 5 perguntas no computador. Na avaliação de 02/10, ela mostra como você chegou em cada número.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 7: Uma linha da tabela casos_dengue -->

<!-- objetivo: aluno lê uma linha da tabela em português e identifica as colunas de identificação -->

# Uma linha da tabela `casos_dengue`

Em voz alta: *"Em janeiro de 2024, Apucarana, da macrorregional Norte, teve 5.603 casos prováveis de dengue."*

<SlideTable compact>

| Coluna | Nesta linha | O que guarda |
|---|---|---|
| `codigo_ibge` | 4101408 | o número oficial do município no IBGE |
| `municipio` | Apucarana | o nome do município, com acento |
| `macrorregional` | Norte | a região de saúde: Leste, Noroeste, Norte ou Oeste |
| `ano` | 2024 | 2024 ou 2025 |

</SlideTable>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 7x: Uma linha da tabela casos_dengue (cont.) -->

<!-- objetivo: aluno completa a leitura das colunas da tabela casos_dengue e conhece a fonte do dado -->

# Uma linha da tabela `casos_dengue` (cont.)

<SlideTable compact>

| Coluna | Nesta linha | O que guarda |
|---|---|---|
| `mes` | 1 | o mês em número: 1 é janeiro, 3 é março, 12 é dezembro |
| `data_referencia` | 2024-01-01 | o primeiro dia daquele mês, no formato ano-mês-dia |
| `casos` | 5603 | casos prováveis: notificações de dengue que nenhum exame descartou |

</SlideTable>

Fonte: InfoDengue (Fiocruz e FGV), o dado que a turma limpou em Fundamentos de Computação.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 8: Preveja, quantas linhas -->

<!-- objetivo: aluno faz a primeira previsão do dia, conferida no bloco 3 com count(*) -->

# Preveja na ficha: quantas linhas tem a tabela?

Cada linha da `casos_dengue` é **um município em um mês de um ano**, como a linha de Apucarana em janeiro de 2024.

- São 17 municípios.
- Cada município tem 12 meses.
- Os meses vêm de 2 anos: 2024 e 2025.

Escreva na ficha, no campo **linhas da tabela**, quantas linhas você acha que a `casos_dengue` tem, e a conta que fez.

A conferência é em 01/10, já no computador, com o banco contando as linhas.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 9: Próximo plantão -->

<!-- objetivo: aluno sai sabendo que em 01/10 responde as 5 perguntas no banco, começando pelo SQL humano -->

# Próximo plantão: 01/10

O chamado continua o mesmo: os 5 números da secretária.

- **Primeiro, sem computador:** o SQL humano. Cada um recebe um cartão com uma linha da tabela, e a turma vira o banco.
- **Depois, no computador:** a conexão com o seu `dengue_NN` no DBeaver, e o `count(*)` que confere a sua previsão de linhas.
- **Até o fim do dia:** as 5 perguntas respondidas e conferidas na ficha.

A ficha fica com o professor e volta para você em 01/10.

---
layout: end
bgPreset: palette
---

<!-- SLIDE 10: Fim -->

# Até 01/10

## Fim do plantão de hoje
