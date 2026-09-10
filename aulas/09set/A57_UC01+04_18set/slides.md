---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 57"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 57"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-09-18"
unlockHour: 13
layout: cover
---

<!-- SLIDE 1: Capa -->

# Aula 57
## Fechamento de Fundamentos de Computação

**Bloco 1:** UC01 Fundamentos de Computação · Épico 1, dia 4 de 4 · recuperação e fechamento
**Bloco 2:** UC04 Fundamentos e Conceitos de IA · Épico 2, dia 1

18 de setembro de 2026

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 2: Divisor bloco 1 -->

# BLOCO 1: FUNDAMENTOS DE COMPUTAÇÃO
## Último dia. Depois de hoje, encerra.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 3: Onde estamos (slide fixo dos 4 dias) -->

# Onde estamos

<SlideTable compact>

| Dia | Verbo | O que você produz | |
|---|---|---|---|
| 10/09 | organizar | um dado que dá para usar | feito |
| 11/09 | comparar | as comparações que o dado permite | feito |
| 17/09 | analisar e decidir | o painel e a recomendação | feito |
| **18/09** | **refazer** | **o que ficou em aberto** | **você está aqui** |

</SlideTable>

Quatro dias, um arquivo, quatro abas. O `painel_dengue_pr.xlsx` está inteiro.

**Hoje ele fecha.**

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno entende que a recuperação é por camada, não do zero -->

<!-- SLIDE 4: Como funciona a recuperação -->

# Como funciona hoje

Você vai receber o seu retorno por **indicador**, não uma nota só.

Quem ficou **Atendido nos três** vai para o desafio do último slide deste bloco. Não é obrigatório, e não muda a menção.

Quem ficou **Parcialmente Atendido ou Não Atendido em algum**, refaz **só aquele pedaço**. Não é prova nova e não é do zero: é a camada específica que faltou.

> Este é o único dia. Depois de hoje a menção é lançada e Fundamentos de Computação não volta neste ano.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 5: As três trilhas -->

<!-- objetivo: aluno localiza rapidamente o que precisa refazer -->

# Ache a sua trilha

<SlideTable compact>

| Se o retorno diz | Sua trilha | Onde você mexe |
|---|---|---|
| Indicador 4 em aberto | **A** | aba de origem do dado |
| Indicador 5 em aberto | **B** | abas `01_dados` e `02_limpeza` |
| Indicador 6 em aberto | **C** | aba `04_painel` |
| Tudo Atendido | **desafio** | último slide do bloco |

</SlideTable>

Mais de uma trilha em aberto? Comece pela **B**. As outras dependem do arquivo estar certo.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 6: Trilha A -->

<!-- objetivo: aluno completa o registro de origem do dado -->

# Trilha A: de onde veio o dado

O que faltou: a origem não está registrada, está incompleta, ou você confundiu a data do dado com a data em que baixou.

**O que fazer:**

**1.** Na aba de origem, confira os três campos: quem produziu, a que período se refere, e o endereço.

**2.** Escreva **duas datas separadas**: a data do dado (2024 e 2025) e a data de acesso (09/09/2026).

**3.** Escreva uma linha respondendo: se alguém quisesse conferir os seus números amanhã, o que dessa aba essa pessoa usaria?

Leva dez minutos. Depois vá ajudar quem está na trilha B.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 7: Trilha B -->

<!-- objetivo: aluno corrige a limpeza e o registro dela -->

# Trilha B: o arquivo e o registro da limpeza

O que faltou: sobrou defeito, a contagem de linhas não bate, ou você limpou e não registrou o que fez.

**O que fazer, nesta ordem:**

**1.** Conte as linhas da aba `01_dados`. Tem que dar o número que você calculou no dia 10: municípios vezes meses vezes anos.

**2.** Confira a coluna `casos`: nenhuma célula pode estar encostada na esquerda.

**3.** Confira a coluna `macrorregional`: tem que ter **exatamente quatro** valores diferentes.

**4.** Na aba `02_limpeza`, escreva **uma linha por conserto**: qual defeito, o que você fez, quantas linhas mudaram.

O passo 4 é o que mais falta. Limpar sem registrar não conta, porque ninguém consegue conferir.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 8: Trilha C -->

<!-- objetivo: aluno reescreve a recomendação com as quatro partes -->

# Trilha C: a recomendação

O que faltou quase sempre é a mesma coisa: você achou o padrão e **não concluiu nada com ele**, ou concluiu sem dizer com que régua.

**Reescreva a recomendação com as quatro partes. Todas.**

**1. A decisão.** O que fazer, onde, quando.
**2. O critério.** Qual régua, e por que ela serve **para esta decisão**.
**3. O número.** Do seu arquivo, com unidade.
**4. O que você abre mão.** Escolher uma cidade é não escolher a outra.

> A parte 2 e a parte 4 são as que faltam em nove de cada dez. Se você só tem tempo para melhorar duas coisas, melhore essas.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 9: Consolidação -->

<!-- objetivo: aluno reencontra as cinco palavras e verifica que consegue usá-las sozinho -->

# As cinco palavras, quatro dias depois

Sem olhar o caderno, escreva o que cada uma quer dizer e **de onde ela apareceu no seu trabalho**.

<SlideTable compact>

| Palavra | Onde ela apareceu no seu arquivo |
|---|---|
| **registro** | |
| **atributo** | |
| **critério** | |
| **padrão** | |
| **relação** | |

</SlideTable>

<AdminOnly>

**Respostas esperadas:** registro é a linha (município, mês, ano) e definiu quantas linhas o arquivo devia ter. Atributo é a coluna. Critério é a régua (absoluto contra por 100 mil) e apareceu na aba `03_comparacoes` e na recomendação. Padrão é a sazonalidade de março. Relação é tamanho da cidade contra taxa, ou região contra casos.

**Vale como diagnóstico final:** quem consegue amarrar as cinco ao próprio arquivo consolidou. Quem só repete a definição decorou.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 10: Desafio -->

<!-- objetivo: aluno que já atendeu tem para onde ir, sem ficar ocioso -->

# Desafio, para quem fechou os três

Não muda a sua menção. É para quem quer ir além.

**1.** Volte no caso de **Campo Mourão**: número muito mais baixo que o dos vizinhos. Monte um gráfico que ajude alguém a decidir se aquilo é pouca dengue ou pouca notificação. Se você concluir que **nenhum** gráfico deste arquivo resolve, escreva por quê. Essa também é uma resposta boa.

**2.** Você recomendou uma cidade. Escreva agora a **melhor defesa possível da escolha contrária**, com as quatro partes.

> Conseguir defender bem o lado que você não escolheu é o sinal mais forte de que você entendeu o problema, e não só a sua resposta.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 11: Fecha o épico -->

<!-- objetivo: aluno percebe o encerramento e o que carrega para as próximas disciplinas -->

# Fundamentos de Computação encerra aqui

Em quatro dias você pegou um arquivo que não respondia nada e entregou uma decisão defendida.

**O que fica, e vai ser cobrado nas outras disciplinas:**

- Um dado só serve depois de organizado, e organizar tem regra
- Comparar sem declarar a régua não é comparar
- Padrão serve para agir antes, não para explicar o passado
- Toda análise tem um limite, e saber dizer qual é vale tanto quanto a resposta

A próxima disciplina começa agora, no bloco 2.

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 12: Divisor bloco 2 -->

# BLOCO 2: FUNDAMENTOS E CONCEITOS DE IA
## Épico 2 começa

<!-- ============================================================
     PENDENTE: bloco UC04, 5 HA, dia 1 do épico 2.
     Indicadores T3 de UC04: 3 (supervisionado, não supervisionado
     e por reforço) e 4 (ética e impactos sociais).
     Épico 2 tem 10 HA no total e encerra em A58 (24/09).
     Gerar quando o épico 2 for planejado, com o mesmo cuidado
     anti-repetição: conferir contra A39, A45 e A51 antes.
     ============================================================ -->

---
layout: end
card: true
bgPreset: palette
github: LeoZanini
avatar: https://github.com/LeoZanini.png?size=256
---

<!-- SLIDE 13: Encerramento -->

# Até a próxima

Uma disciplina fechada. Oito pela frente.
