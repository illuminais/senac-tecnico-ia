---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 51"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 51"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-08-28"
layout: cover
---

<!-- SLIDE 1: Capa -->

# Aula 51

## A curva da ruptura, o caminho do dado e o erro do modelo

Transformação Digital · Fundamentos e Conceitos de IA

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 3: Divisor bloco 1, parte 1 -->

# BLOCO 1: TRANSFORMAÇÃO DIGITAL

## Parte 1: A curva que verga

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 4 -->
<!-- objetivo: aluno reconhece que a matematica de ontem volta com outro objeto -->

# A tabela de ontem volta

Ontem vocês contaram dobras de um post de adoção. Hoje a mesma conta, num objeto bem maior.

<v-click>

Hoje a pergunta é de negócio:

> **Como uma tecnologia nova toma o lugar de uma que já estava lá? E dá pra ver isso chegando antes de acontecer?**

</v-click>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 5 -->
<!-- objetivo: aluno ve o dado real do Pix, que e o caso central do bloco -->

# O Pix, em números do Banco Central

| Ano | Transações no ano |
|---|---|
| 2021 | 8,9 bilhões |
| 2022 | 29,2 bilhões |
| 2023 | 41,9 bilhões |
| 2024 | 63,8 bilhões |
| 2025 | cerca de 80 bilhões |

<AdminOnly>

Fonte: Banco Central, Relatório de Gestão do Pix, segunda edição, cobrindo 2023 a 2025. O
número de 2021 sai do crescimento de 228,9% reportado para 2022.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 6 -->
<!-- objetivo: aluno confere o dado na fonte primaria, em sala -->

# Confiram vocês mesmos

O Banco Central publica esses dados abertos, de graça:

**dadosabertos.bcb.gov.br/dataset/pix**

Em duplas, cinco minutos:

1. Achem o número de transações de um ano da tabela
2. Comparem com o número do slide. Bateu?
3. Se não bateu, qual é a diferença, e o que explica ela?

> A fonte é quem decide se o número vale. Peguem o hábito de conferir antes de usar.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 7 -->
<!-- objetivo: aluno aplica a conta de dobras de ontem no dado real -->

# Quantas vezes o Pix dobrou?

Essa vocês já sabem fazer. Foi a questão 5 de ontem.

De 8,9 bilhões em 2021 para 80 bilhões em 2025:

<v-click>

`8,9` → `17,8` → `35,6` → `71,2` → `142,4`

Três dobras chegam em 71,2, que ainda é menos que 80. A quarta passa longe.

**Resposta: pouco mais de três dobras, em quatro anos.**

</v-click>

<AdminOnly>

Dois minutos, só relembrar. A prova cobra a coluna de crescimento em porcentagem, do slide
seguinte, e não a conta de dobras.

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 8 -->
<!-- objetivo: aluno descobre que a taxa de crescimento esta caindo, nao constante -->

# Agora olhem a velocidade do crescimento

Quanto o Pix cresceu **em relação ao ano anterior**:

| Ano | Cresceu |
|---|---|
| 2022 | **229%** |
| 2023 | 43% |
| 2024 | 52% |
| 2025 | **26%** |

> Num crescimento exponencial puro, que dobra todo ano, esta coluna marcaria 100% em todos os
> anos. Reparem no que ela faz de 2022 para 2025.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 8b -->
<!-- objetivo: aluno ve o desenho da vergada, total subindo e velocidade caindo -->

# O mesmo Pix, desenhado de dois jeitos

<div class="flex justify-center"><svg viewBox="0 0 760 250" class="w-full max-w-2xl"><text x="40" y="18" fill="currentColor" font-size="14" opacity=".75">Total de transações (bilhões)</text><path d="M40 220 H340 M40 30 V220" stroke="currentColor" opacity=".3" fill="none"/><polyline points="40,200 112,154 184,126 256,76 328,40" fill="none" stroke="#22d3ee" stroke-width="3"/><circle cx="40" cy="200" r="4" fill="#22d3ee"/><circle cx="112" cy="154" r="4" fill="#22d3ee"/><circle cx="184" cy="126" r="4" fill="#22d3ee"/><circle cx="256" cy="76" r="4" fill="#22d3ee"/><circle cx="328" cy="40" r="4" fill="#22d3ee"/><g fill="currentColor" font-size="12" opacity=".7" text-anchor="middle"><text x="40" y="238">2021</text><text x="112" y="238">2022</text><text x="184" y="238">2023</text><text x="256" y="238">2024</text><text x="328" y="238">2025</text></g><text x="400" y="18" fill="currentColor" font-size="14" opacity=".75">Crescimento sobre o ano anterior</text><path d="M400 220 H730 M400 30 V220" stroke="currentColor" opacity=".3" fill="none"/><rect x="418" y="40" width="48" height="180" fill="#fb7185"/><rect x="498" y="186" width="48" height="34" fill="#fb7185"/><rect x="578" y="179" width="48" height="41" fill="#fb7185"/><rect x="658" y="200" width="48" height="20" fill="#fb7185"/><g fill="currentColor" font-size="13" font-weight="600" text-anchor="middle"><text x="442" y="32">229%</text><text x="522" y="178">43%</text><text x="602" y="171">52%</text><text x="682" y="192">26%</text></g><g fill="currentColor" font-size="12" opacity=".7" text-anchor="middle"><text x="442" y="238">2022</text><text x="522" y="238">2023</text><text x="602" y="238">2024</text><text x="682" y="238">2025</text></g></svg></div>

À esquerda o total, que continua subindo. À direita a velocidade, que despenca.

> No site do Banco Central tem os gráficos oficiais do Pix. Abram e comparem com este.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 9 -->
<!-- objetivo: aluno entende a curva em S, que e o conceito central e honesto do bloco -->

# A curva em S

O número total continua subindo. Mas a **velocidade** está caindo: 229%, depois 43%, 52%, e
agora 26%.

Isso tem nome e formato. Toda tecnologia que se espalha faz o mesmo desenho:

- **Começo lento:** poucos usam, quase ninguém repara
- **Explosão:** cada usuário traz outro, e o número dispara
- **Vergada:** quem ia usar já usa. Sobra pouca gente nova pra converter

> Ontem vocês viram a parte que explode. Hoje vocês veem a parte seguinte: **toda curva desse tipo verga**.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 10 -->
<!-- objetivo: aluno recebe a definicao de ruptura com definicao exemplo analogia e uso -->

# O que é uma ruptura

**Definição:** uma tecnologia nova entra de dois jeitos. Na **melhoria**, ela deixa a
tecnologia antiga mais rápida ou mais barata. Na **ruptura**, ela **troca a lógica**: passa a
fazer a mesma coisa de um jeito completamente diferente.

**Exemplo:** o TED tem horário, tem custo e depende de dia útil. O Pix funciona às três da
manhã de domingo, de graça, direto entre duas pessoas. A regra do jogo mudou.

**Analogia:** a máquina de escrever elétrica foi uma melhoria, porque escrevia igual, só que
mais rápido. O computador foi uma ruptura, porque acabou com a ideia de uma folha por vez.

**Pra que serve saber isso:** quem confunde ruptura com melhoria investe no lado errado.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 11 -->
<!-- objetivo: aluno pratica separar melhoria de ruptura antes de aplicar no proprio caso -->

# Fixação no caderno: melhoria ou ruptura?

Para cada uma, escreva **M** de melhoria ou **R** de ruptura, e uma frase dizendo por quê.

| # | Situação |
|---|---|
| 1 | O banco aumentou o limite diário do TED |
| 2 | O cliente passou a pagar sozinho pelo celular, sem caixa |

<AdminOnly>

Cinco minutos, dois casos. Gabarito: 1 = melhoria, o TED continua sendo TED. 2 = ruptura, o
caixa sai da operação. Reserva, se sobrar tempo: "o Pix passou a funcionar sem agência e conta
corrente tradicional" (R) e "o caixa do supermercado ficou 20% mais rápido" (M).

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 12 -->
<!-- objetivo: aluno pesquisa em sala o que foi deslocado, sem decorar afirmacao do professor -->

# O que o Pix empurrou pra fora?

Quando uma ruptura acontece, **alguma coisa perde espaço**. Quatro minutos, respondendo em voz alta:

- O que aconteceu com o **boleto** depois de 2020?
- E com o **TED** e o **DOC**?
- E com o **dinheiro em espécie**?

> Sempre que responderem, digam de onde veio a informação. Não vale "eu acho" nem "meu tio
> falou".

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 17 -->
<!-- objetivo: aluno reconhece que este bloco fecha uma promessa feita em aulas anteriores -->

# Uma conversa que ficou aberta

Na aula 45, no case do Nubank, a turma se dividiu numa pergunta e ninguém fechou:

> **Guardar mais dado, ou descartar mais rápido?**

Naquele dia eu disse que isso voltaria quando vocês estudassem permissão de acesso. Voltou na
aula 47, quando vocês decidiram quem podia ver o CPF do adotante.

**Hoje a gente fecha.** E agora com uma diferença: o banco é de vocês. Vocês construíram ele
ontem.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 18 -->
<!-- objetivo: aluno entende que informacao tem ciclo, nao so armazenamento -->

# Informação tem ciclo de vida

**Definição:** todo dado dentro de uma organização passa por etapas, do momento em que alguém
percebe que precisa dele até o momento em que ele é jogado fora.

**Analogia:** é a ficha de papel do abrigo. Alguém decide que precisa cadastrar adotantes,
preenche, organiza na gaveta, usa pra decidir uma adoção, guarda, e um dia rasga.

**Pra que serve:** quase todo vazamento de dado acontece numa etapa que ninguém achou que era
uma etapa. Geralmente a última.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 19 -->
<!-- objetivo: aluno recebe as quatro primeiras etapas do modelo de Beal -->

# As sete etapas: da necessidade à entrega

| Etapa | O que acontece |
|---|---|
| **Identificação** | alguém percebe que precisa daquela informação |
| **Obtenção** | a informação é criada, recebida ou capturada |
| **Tratamento** | ela é organizada, formatada, classificada |
| **Distribuição** | ela chega a quem vai usar, dentro ou fora |

<AdminOnly>

Modelo de Beal, 2012, referência brasileira em gestão da informação. As definições literais
estão nas notas do plano de aula.

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 20 -->
<!-- objetivo: aluno recebe as tres ultimas etapas, com o descarte em destaque -->

# As sete etapas: do uso ao descarte

| Etapa | O que acontece |
|---|---|
| **Uso** | a informação vira decisão e gera conhecimento novo |
| **Armazenamento** | ela é guardada, mantendo integridade e disponibilidade |
| **Descarte** | ela é eliminada quando fica obsoleta ou perde utilidade |

> Guardar e descartar são **etapas diferentes**. Quase toda organização tem a sexta bem
> resolvida e a sétima nem escrita.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 21 -->
<!-- objetivo: aluno entende por que o descarte e o ponto cego, com argumento historico -->

# Por que o descarte é o ponto cego

Existem vários modelos de ciclo da informação, de autores diferentes. Quase todos listam as
mesmas seis primeiras etapas.

**O descarte aparece em um só.** Nos outros, simplesmente não existe.

Isso retrata como as organizações pensam: guardar parece sempre seguro, e descartar parece
perda.

> Dado guardado sem motivo é risco parado, esperando vazar.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 22 -->
<!-- objetivo: aluno mapeia o proprio banco de ontem nas sete etapas -->

# No quadro: o CPF do adotante, parte 1

Vamos seguir juntos, no quadro, **uma coluna só** da tabela `adotantes` que vocês criaram
ontem: o `cpf`. Copiem no caderno enquanto a gente preenche. As quatro primeiras etapas:

1. Por que o abrigo decidiu que precisava do CPF?
2. Em que momento ele é capturado, e por quem?
3. Ele é tratado de alguma forma antes de ser guardado?
4. Quem recebe esse dado, dentro do abrigo?

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 22b -->
<!-- objetivo: aluno fecha o trajeto do dado e chega na pergunta do descarte -->

# No quadro: o CPF do adotante, parte 2

5. Pra que ele é usado, na prática?
6. Onde ele fica guardado?
7. **Quando ele deveria ser apagado?**

> A pergunta 7 é a única sem resposta pronta. Guardem o que a gente escreveu: vocês vão refazer
> esse trajeto sozinhos daqui a pouco, valendo avaliação.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 23 -->
<!-- objetivo: aluno recebe o conceito de cultura organizacional em tres niveis -->

# Cultura organizacional tem três camadas

**Definição:** cultura organizacional é o conjunto do que uma organização mostra, do que ela
diz acreditar, e do que ela acredita de verdade. Nem sempre as três coisas combinam.

| Camada | O que é |
|---|---|
| **Artefatos** | o visível: o que está escrito, o sistema, as regras |
| **Valores declarados** | o que a organização **diz** que acredita |
| **Pressupostos** | o que ela acredita de verdade, e faz sem pensar |

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 24 -->
<!-- objetivo: aluno entende a tese central: permissao e cultura escrita em codigo -->

# A permissão de vocês é a cultura do abrigo

Vocês já produziram as três camadas nas últimas aulas, sem saber:

- **Artefato:** a matriz de permissões da aula 47 e as tabelas de ontem
- **Valor declarado:** "o abrigo protege os dados de quem adota"
- **Pressuposto:** o que acontece de verdade quando alguém precisa de um dado rápido

<v-click>

> Se a política diz que protege o adotante e o estagiário tem acesso à tabela inteira, o
> artefato **desmente** o valor declarado. Quem olha de fora acredita no artefato.

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 25 -->
<!-- objetivo: aluno fecha a pagina do caderno antes da prova, porque e a unica consulta -->

# Antes da prova: fechem a página do caderno

Título da página: **A curva e o caminho do dado**. Confiram se está tudo lá:

- A coluna de velocidade do Pix, e a frase que explica por que ela cai
- As três fases da curva em S
- A diferença entre melhoria e ruptura
- As sete etapas do ciclo de vida da informação
- O trajeto do `cpf` pelas sete etapas, feito no quadro
- As três camadas da cultura, com o exemplo do abrigo em cada uma

> Esta página é a **única coisa** que vocês podem consultar na prova. Caprichem nela agora.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 26 -->
<!-- [ATIV AVALIATIVA] Av10-T2 ato 2, instrumento integrado, indicadores 4 e 7 -->

# Av10-T2: a proposta que chegou no abrigo

Individual, no papel, com o seu nome. **Sem celular.** Consulta liberada só ao seu caderno.

Uma empresa ofereceu um aplicativo de adoção ao abrigo. A pessoa responde um questionário no
celular (moradia, rotina, se já tem animais) e manda uma selfie com o documento, para o app
confirmar quem ela é. Com as respostas, o app sugere os animais que combinam com ela e marca a
visita sozinho. Hoje o abrigo faz isso na ficha de papel e no banco que vocês criaram na aula 50.

| Ano | 2022 | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|---|
| **Adoções no ano** | 40 | 120 | 180 | 288 | 360 |

> São seis partes. Respondam na ordem, deixando todas as contas à vista.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 26a -->
<!-- [ATIV AVALIATIVA] parte 1, indicador 4 -->

# Parte 1: a conta

Calcule quanto o abrigo cresceu em cada ano **em relação ao ano anterior**. Copie a tabela no
papel e preencha a linha de baixo.

> **Regra:** divida o ano pelo ano anterior, tire 1 do resultado, multiplique por 100.
>
> **Exemplo já resolvido, 2023:** 120 ÷ 40 = **3**. O abrigo ficou 3 vezes maior. Tirando o
> tamanho que ele já tinha, sobrou um crescimento de 2 vezes, ou seja, **200%**.

| Ano | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|
| **Cresceu** | 200% | ? | ? | ? |

Deixe a divisão escrita embaixo de cada coluna. A conta vale tanto quanto o resultado.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 26b -->
<!-- [ATIV AVALIATIVA] parte 2, indicador 4 -->

# Parte 2: o diagnóstico

Olhe a coluna que **você** acabou de calcular e responda:

**a)** Em qual fase da curva em S o abrigo está hoje: **começo lento**, **explosão** ou
**vergada**?

**b)** Cite **dois números da sua coluna** que sustentam essa resposta.

**c)** De 2024 para 2025 o crescimento subiu, de 50% para 60%. Esse ano que subiu muda a sua
resposta da letra **a**? Escreva se muda ou não, e por quê.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 26c -->
<!-- [ATIV AVALIATIVA] parte 3, indicador 4 -->

# Parte 3: a proposta

**a)** Para o abrigo, o aplicativo é uma **melhoria** ou uma **ruptura**? Escreva qual dos dois.

**b)** Explique o que ele tira do lugar: diga o que sai de cena e quem, dentro do abrigo, deixa
de fazer aquilo.

**c)** Agora vire do avesso. **O que precisaria ser verdade** para ele ser o outro? Escreva a
condição que faltou.

<AdminOnly>

Se o relógio apertar, a letra c sai. As letras a e b já cobrem o indicador 4 aqui.

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 26d -->
<!-- [ATIV AVALIATIVA] parte 4, indicador 7 -->

# Parte 4: o caminho do dado

Para funcionar, o aplicativo passa a guardar quatro coisas de cada pessoa:

**foto do rosto** · **CPF**, o mesmo da tabela `adotantes` de vocês · **endereço** ·
**conversas do chat**

Escolha **uma só** e escreva o nome dela no papel. Depois siga essa informação pelas **sete
etapas** do ciclo de vida, uma linha em cada etapa, dizendo o que acontece com ela ali.

> As sete etapas estão na sua página do caderno. Escreva as sete, mesmo que alguma fique curta.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 26e -->
<!-- [ATIV AVALIATIVA] parte 5, indicador 7 -->

# Parte 5: a decisão

O abrigo precisa de uma regra escrita sobre a informação que você escolheu na Parte 4.

| | O que escrever |
|---|---|
| **a)** | O **prazo**, com número e unidade, como "2 anos depois da adoção" |
| **b)** | Por que esse prazo, citando a etapa de **descarte** e o que pode acontecer se a informação ficar guardada para sempre |
| **c)** | O **cargo** da pessoa do abrigo que precisa aprovar essa regra |
| **d)** | Quando essa regra virar código no sistema, em qual das **três camadas da cultura** ela entra? Escreva qual, e por quê |

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 26f -->
<!-- [ATIV AVALIATIVA] parte 6, indicadores 4 e 7 juntos -->

# Parte 6: a defesa

Um colega do abrigo escreveu isto no grupo:

> *"O abrigo deve guardar tudo para sempre. Dado nunca é demais, e um dia pode ser útil."*

Responda a ele em um parágrafo. A sua resposta precisa usar, obrigatoriamente, duas peças:

- **uma das sete etapas** do ciclo de vida, dita pelo nome;
- **um número da coluna** que você calculou na Parte 1.

> Você pode concordar ou discordar. O que conta é a sua resposta sustentar o que diz com essas
> duas peças.

<AdminOnly>

Válvula de escape do bloco: se o tempo acabar, esta parte sai inteira. O indicador 4 está
coberto nas Partes 1 a 3 e o indicador 7 nas Partes 4 e 5.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 26g -->
<!-- objetivo: aluno sabe o criterio do instrumento integrado -->

# Como este instrumento é avaliado

| Nível | O que evidencia |
|---|---|
| **Atendido** | coluna calculada certa, com as divisões à vista; fase da curva sustentada por dois números próprios; app classificado dizendo o que sai de cena; as sete etapas escritas; prazo com motivo ligado ao descarte e cargo nomeado; defesa usando a etapa e o número |
| **Parcialmente Atendido** | responde tudo, mas justifica pelo tamanho do número em vez da velocidade, ou decide o prazo por opinião sem citar a etapa de descarte |
| **Não Atendido** | copia as definições do caderno sem aplicar ao abrigo, ou não decide o prazo |

> Prazos diferentes podem receber Atendido. O que decide é a justificativa.

<AdminOnly>

Gabarito. **Parte 1:** 2024 = 180÷120 = 1,5 → 50% · 2025 = 288÷180 = 1,6 → 60% · 2026 = 360÷288 = 1,25 → 25%.
**Parte 2:** vergada, sustentada por 200% caindo a 25%. A subida de 2025 é um repique dentro da
tendência de queda, igual ao 43%→52% do Pix.
**Parte 3:** ruptura, a triagem deixa de ser feita por uma pessoa e vira cruzamento automático;
saem a ficha de papel e a triagem manual do voluntário. Seria melhoria se o app apenas
digitalizasse a mesma ficha e mantivesse a decisão com a pessoa.
Este instrumento encerra os indicadores 4 e 7 de Transformação Digital no trimestre.

</AdminOnly>

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 28: Divisor bloco 2 -->

# BLOCO 2: FUNDAMENTOS E CONCEITOS DE IA

## Quando a IA erra

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 29 -->
<!-- objetivo: aluno reconhece o problema de medir erro de um modelo, ancorado na A45 -->

# O abrigo quer prever quem vai ser adotado

O app da prova prometia sugerir os animais que combinam com cada pessoa. Vamos ver o que
acontece quando um sistema desses erra.

Na aula 45 vocês viram **KNN** e **Árvore de Decisão**, que classificam, e **K-Means**, que
agrupa. O abrigo colocou um dos dois primeiros para trabalhar: todo começo de mês ele olha os
animais e responde, para cada um:

> **Este animal vai ser adotado neste mês?**

<v-click>

O modelo responde **sim** ou **não**. E às vezes ele erra.

A pergunta de hoje: **como a gente mede o quanto ele erra?**

</v-click>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 30 -->
<!-- objetivo: aluno recebe a matriz de confusao em linguagem direta -->

# Toda resposta cai numa de quatro caixas

O modelo respondeu alguma coisa. Depois o mês passou e a gente descobriu o que aconteceu de
verdade. Cruzando as duas coisas, sobram quatro casos:

| | O animal **foi** adotado | O animal **não foi** adotado |
|---|---|---|
| **Modelo disse "vai"** | acertou o sim | disse sim e era não |
| **Modelo disse "não vai"** | disse não e era sim | acertou o não |

> As duas caixas da diagonal são os acertos. As outras duas são os dois jeitos diferentes de
> errar, e eles não custam a mesma coisa.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 31 -->
<!-- objetivo: aluno recebe a definicao de acuracia com o caso numerico do abrigo -->

# Acurácia: quantos ele acertou no total

**Definição:** acurácia é a fatia das respostas que o modelo acertou.

> **acurácia = acertos ÷ total de animais**

O abrigo tem **100 animais** neste mês. Desses, **10 foram adotados** de verdade e 90 não foram.

O **Modelo Atento** respondeu assim:

| | Foi adotado | Não foi adotado |
|---|---|---|
| **Disse "vai"** | 8 | 8 |
| **Disse "não vai"** | 2 | 82 |

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 32 -->
<!-- objetivo: aluno calcula acuracia com a mao antes de receber o resultado -->

# Fixação: calculem a acurácia

No caderno, usando a tabela do Modelo Atento:

1. Quantos animais o modelo **acertou**? Some as duas caixas da diagonal.
2. Divida esse número por 100.
3. Escreva o resultado em porcentagem.

<v-click>

**8 + 82 = 90 acertos.** 90 ÷ 100 = **90% de acurácia**.

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 33 -->
<!-- objetivo: aluno descobre o paradoxo da acuracia em base desbalanceada -->

# Agora o Modelo Preguiçoso

Este segundo modelo é o mais simples possível. Ele responde **"não vai ser adotado"** para todos
os 100 animais, sem olhar nenhum deles.

| | Foi adotado | Não foi adotado |
|---|---|---|
| **Disse "vai"** | 0 | 0 |
| **Disse "não vai"** | 10 | 90 |

<v-click>

Acertos: **0 + 90 = 90**. Acurácia: **90%**.

**Os dois modelos têm exatamente a mesma acurácia.**

</v-click>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 34 -->
<!-- [DEBATE] objetivo: turma verbaliza por que a acuracia sozinha engana -->

# Cinco minutos de discussão

Os dois modelos têm 90% de acurácia.

> **O abrigo pode usar o Modelo Preguiçoso? O que ele entrega para quem trabalha lá?**

Discutam em duplas e tragam uma frase para o quadro.

<AdminOnly>

Gabarito do debate: o Preguiçoso nunca aponta ninguém, então não gera nenhuma ação. A acurácia alta dele
vem de acertar a maioria fácil, os 90 que não seriam adotados de qualquer jeito. É o paradoxo da
acurácia em base desbalanceada. Puxar daqui direto para o recall.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 35 -->
<!-- objetivo: aluno recebe recall como a medida que separa os dois modelos -->

# Recall: dos que aconteceram, quantos ele achou

**Definição:** recall olha só para os animais que **foram adotados de verdade**, e pergunta
quantos deles o modelo apontou.

> **recall = acertou o sim ÷ total que realmente aconteceu**

| Modelo | Dos 10 adotados, achou | Recall |
|---|---|---|
| **Atento** | 8 | 8 ÷ 10 = **80%** |
| **Preguiçoso** | 0 | 0 ÷ 10 = **0%** |

Aqui os dois se separam. A acurácia dizia que eram iguais.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 36 -->
<!-- objetivo: aluno recebe precisao e entende o alarme falso -->

# Precisão: dos que ele apontou, quantos estavam certos

**Definição:** precisão olha só para os animais que o **modelo apontou** e pergunta quantos deles
ele acertou.

> **precisão = acertou o sim ÷ total que o modelo apontou**

O Modelo Atento apontou 16 animais: 8 foram adotados, 8 não foram.

> **precisão = 8 ÷ 16 = 50%**

De cada dois animais que ele aponta, um é alarme falso.

<AdminOnly>

Gabarito: o Preguiçoso não aponta ninguém, então a precisão dele é 0÷0, indefinida. Citar só se algum
aluno perguntar, sem entrar em convenção de biblioteca.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 37 -->
<!-- objetivo: aluno calcula as tres medidas sozinho num modelo novo -->

# Fixação: um terceiro modelo

O **Modelo Afobado** aponta 40 animais. Desses, 9 foram mesmo adotados. Ele deixou 1 animal
adotado passar sem apontar.

| | Foi adotado | Não foi adotado |
|---|---|---|
| **Disse "vai"** | 9 | 31 |
| **Disse "não vai"** | 1 | 59 |

No caderno, calcule as três medidas e deixe as contas escritas:

**1.** acurácia · **2.** recall · **3.** precisão

<AdminOnly>

Gabarito: acurácia = (9+59)÷100 = **68%** · Recall = 9÷10 = **90%** · Precisão = 9÷40 = **22,5%**.
O Afobado tem o melhor recall dos três, a pior precisão e a pior acurácia. É a ponte para o
slide seguinte: qual medida importa depende do que custa mais caro.

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 38 -->
<!-- objetivo: aluno liga cada medida ao custo do erro correspondente -->

# Qual das três importa depende do estrago

Os dois jeitos de errar custam coisas diferentes:

| Erro | O que acontece no abrigo |
|---|---|
| **Disse sim e era não** | alguém foi checar um animal à toa. Custou tempo |
| **Disse não e era sim** | ninguém olhou para aquele animal. Ele ficou para trás |

<v-click>

- Quando **deixar passar** é o erro caro, olhe o **recall**.
- Quando **alarme falso** é o erro caro, olhe a **precisão**.
- Quando os dois custam parecido e os grupos têm tamanhos parecidos, a **acurácia** já serve.

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 39 -->
<!-- objetivo: aluno escolhe a medida em tres situacoes novas, justificando pelo custo -->

# Fixação: escolham a medida

Para cada sistema do abrigo, escreva no caderno **qual das três medidas** você olharia primeiro,
e **uma frase** dizendo qual erro sairia mais caro ali.

| # | O sistema |
|---|---|
| 1 | Aponta animais que podem estar doentes e precisam de veterinário hoje |
| 2 | Manda mensagem ao adotante avisando que o animal favorito dele ficou disponível |
| 3 | Separa as fotos que chegam em "cachorro" e "gato" para publicar no site |

<AdminOnly>

Gabarito: 1 = recall, deixar um animal doente passar é o erro caro. 2 = precisão, mensagem errada queima a
confiança e vira spam. 3 = acurácia serve, os dois erros custam parecido e os grupos têm tamanho
parecido.

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 40 -->
<!-- objetivo: aluno registra a pagina de IA no caderno e recebe o gancho do F1 -->

# Anotem no caderno: a página de IA

Título: **Quando a IA erra**. O que tem que estar nela:

- A tabela das quatro caixas, com o nome de cada uma
- As três medidas, cada uma com a conta escrita por extenso
- Os números dos três modelos: Atento, Preguiçoso e Afobado
- A regra de quando olhar recall e quando olhar precisão

> Existe uma quarta medida, o **F1**, que junta precisão e recall num número só. Ela entra no
> próximo trimestre.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 41 -->
<!-- objetivo: aluno entende quem refaz a avaliacao e quem faz outra coisa -->

# Quem refaz e quem não

Esta é a **segunda e última** janela de Fundamentos e Conceitos de IA neste trimestre. Ela
serve para recuperação.

- **Quem ficou parcial ou não atendido** na avaliação da aula 45: refaz, com cenários novos
- **Quem já atendeu** na aula 45: fecha o caderno e vira arguidor

<v-click>

Arguidor tem tarefa de verdade: ler a decisão de dois colegas sobre o CPF e escrever **uma
pergunta difícil** para cada um.

</v-click>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 42 -->
<!-- [ATIV AVALIATIVA] recuperacao UC04: cenarios novos do abrigo -->

# Recuperação: dois cenários novos

Os três tipos de aprendizado que vocês estudaram na aula 45:
**supervisionado** · **não supervisionado** · **por reforço**

Para cada cenário, escreva qual dos três é, e uma frase dizendo o que no cenário levou você a
essa resposta.

**Cenário 1.** O abrigo entrega ao sistema a lista de todos os animais e pede que ele separe os
animais em grupos parecidos entre si. Ninguém disse antes quantos grupos existem, nem quais são.

**Cenário 2.** O sistema sugere um horário de visita, espera para ver se a visita aconteceu, e
usa esse resultado para escolher horários melhores na próxima vez.

<AdminOnly>

Gabarito: 1 é não supervisionado, não há rótulo definido antes. 2 é por reforço, há tentativa
e retorno. Nenhum dos dois apareceu na aula 45.

</AdminOnly>

---
layout: end
card: true
bgPreset: animate
aulaNum: "Aula 51"
---

<!-- SLIDE 43 -->
<!-- objetivo: aluno fecha a semana enxergando o arco completo do abrigo -->

# Fim da Aula 51

Em duas semanas o abrigo virou uma organização de verdade: tem banco, tem regra de quem acessa,
tem conta de quanto cresce, tem política de quando apagar, e sabe medir o erro de um sistema
antes de confiar nele.

<v-click>

E vocês têm um caderno que prova isso. Guardem: ele volta no próximo trimestre, e o que
estiver escrito lá vocês não vão precisar aprender de novo.

</v-click>
