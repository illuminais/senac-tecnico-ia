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

## A curva da ruptura e o caminho do dado

Transformação Digital e Fundamentos de IA

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 2 -->
<!-- objetivo: recolher as duas tarefas pendentes e situar o dia -->

# Duas entregas vencem hoje

Antes de começar, separem no caderno:

1. A tarefa da **aula 48**: quem precisa dizer sim para o plano sair do papel
2. A tarefa de **ontem**: um número real que cresceu rápido, com a fonte e a conta das dobras

> Nenhuma das duas é só entrega. As duas viram matéria-prima da aula de hoje, então deixem à
> mão.

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 3: Divisor bloco 1 -->

# BLOCO 1: TRANSFORMAÇÃO DIGITAL

## A curva que verga

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

A pergunta de hoje não é matemática, é de negócio:

> **Como uma tecnologia nova toma o lugar de uma que já estava lá? E dá pra ver isso chegando
> antes de acontecer?**

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

Não acreditem no slide. O Banco Central publica esses dados abertos, de graça:

**dadosabertos.bcb.gov.br/dataset/pix**

Em duplas, dez minutos:

1. Achem o número de transações de um ano da tabela
2. Anotem no Dossiê o **link exato** de onde tiraram
3. Bateu com o slide? Se não bateu, qual é a diferença?

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

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 8 -->
<!-- objetivo: aluno descobre que a taxa de crescimento esta caindo, nao constante -->

# Agora olhem a velocidade, não o tamanho

Quanto o Pix cresceu **em relação ao ano anterior**:

| Ano | Cresceu |
|---|---|
| 2022 | **229%** |
| 2023 | 43% |
| 2024 | 52% |
| 2025 | **26%** |

> Se fosse exponencial de verdade, dobrando todo ano, essa coluna seria sempre 100%. Não é.

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

> Ontem vocês viram a parte que explode. Hoje entra a parte que ninguém conta: **ela sempre
> verga**.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 10 -->
<!-- objetivo: aluno recebe a definicao de ruptura com definicao exemplo analogia e uso -->

# O que é uma ruptura

**Definição:** ruptura é quando uma tecnologia nova não deixa a antiga melhor, e sim **troca a
lógica** de como aquilo é feito.

**Exemplo:** o Pix não é um TED mais rápido. TED tem horário, tem custo, tem dia útil. O Pix
funciona às três da manhã de domingo, de graça, entre pessoas.

**Analogia:** a máquina de escrever elétrica melhorou a máquina de escrever. O computador não
melhorou: acabou com ela.

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
| 2 | O Pix passou a funcionar sem precisar de agência e conta corrente tradicional |
| 3 | O caixa do supermercado ficou 20% mais rápido |
| 4 | O cliente passou a pagar sozinho pelo celular, sem caixa |

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 12 -->
<!-- objetivo: aluno pesquisa em sala o que foi deslocado, sem decorar afirmacao do professor -->

# O que o Pix empurrou pra fora?

Quando uma ruptura acontece, **alguma coisa perde espaço**. Descubram qual, em duplas:

- O que aconteceu com o **boleto** depois de 2020?
- E com o **TED** e o **DOC**?
- E com o **dinheiro em espécie**?

Regra de sempre: **cada resposta precisa de um link de fonte**, anotado no Dossiê. Não vale
"eu acho" nem "meu tio falou".

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 13 -->
<!-- [ATIV AVALIATIVA] Av10-T2 ato 2, parte do indicador 4 -->

# Av10-T2: o seu número

Peguem o número que vocês trouxeram de casa. Individual, por escrito, no Dossiê:

1. Qual é o número, de onde saiu, e quantas vezes dobrou
2. Isso é **melhoria** ou **ruptura**? O que ele empurrou pra fora, se empurrou alguma coisa?
3. A velocidade dele ainda está subindo, ou já começou a vergar? Como você sabe?

> A questão 3 é a que separa. Todo mundo consegue dizer que cresceu. Poucos olham se ainda
> está acelerando.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 14 -->
<!-- objetivo: aluno sabe o criterio de avaliacao do indicador 4 -->

# Como este bloco é avaliado

| Nível | O que evidencia |
|---|---|
| **Atendido** | explica com as próprias palavras por que a curva verga, e classifica o próprio caso com justificativa |
| **Parcialmente Atendido** | descreve o crescimento, mas trata a curva como se subisse pra sempre |
| **Não Atendido** | repete o slide sem aplicar ao próprio número |

> Este bloco encerra o indicador de rupturas tecnológicas neste trimestre.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 15 -->
<!-- objetivo: aluno registra a pagina 3 do dossie -->

# Dossiê do Abrigo: página 3

Título: **A curva da ruptura**. O que tem que estar nela:

- A tabela do Pix, com o link do Banco Central
- A conta das dobras
- A coluna de velocidade e a frase que explica por que ela cai
- O seu número, classificado como melhoria ou ruptura

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 16: Divisor bloco 2 -->

# BLOCO 2: TRANSFORMAÇÃO DIGITAL

## O caminho do dado

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

Não é esquecimento acadêmico. É o retrato de como as organizações pensam: guardar parece
sempre seguro, e descartar parece perda.

> Só que dado guardado sem motivo não é patrimônio. É risco parado, esperando vazar.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 22 -->
<!-- objetivo: aluno mapeia o proprio banco de ontem nas sete etapas -->

# Fixação: o CPF do adotante, parte 1

Peguem a tabela `adotantes` que vocês criaram ontem. Sigam **uma coluna só**, o `cpf`, pelas
sete etapas. As quatro primeiras:

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

# Fixação: o CPF do adotante, parte 2

5. Pra que ele é usado, na prática?
6. Onde ele fica guardado?
7. **Quando ele deveria ser apagado?**

> A pergunta 7 é a única sem resposta pronta. Guardem o que vocês escreveram: ela volta daqui a
> pouco, valendo avaliação.

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

Isso não é teoria distante. Vocês já produziram os três níveis, sem saber:

- **Artefato:** a matriz de permissões da aula 47 e as tabelas de ontem
- **Valor declarado:** "o abrigo protege os dados de quem adota"
- **Pressuposto:** o que acontece de verdade quando alguém precisa de um dado rápido

<v-click>

> Se a política diz que protege o adotante, mas o estagiário tem acesso à tabela inteira, o
> artefato **desmente** o valor declarado. E o artefato é que vale.

</v-click>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 51"
---

<!-- SLIDE 25 -->
<!-- [ATIV AVALIATIVA] Av10-T2 ato 2, parte do indicador 7 -->

# Av10-T2: a decisão do abrigo

Individual, por escrito. Vocês são donos do banco do abrigo.

> **Por quanto tempo o abrigo deve guardar o CPF dos adotantes, e quem decide isso?**

A resposta precisa ter as três partes:

1. **Sua decisão**, com um prazo concreto
2. **A justificativa**, citando a etapa de descarte e o que acontece se ficar guardado
3. **Quem precisa aprovar** essa regra dentro do abrigo, pelo cargo

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 26 -->
<!-- objetivo: aluno sabe o criterio do indicador 7, que exige decisao justificada -->

# Como esta decisão é avaliada

| Nível | O que evidencia |
|---|---|
| **Atendido** | decide com prazo, justifica pelo ciclo de vida e diz quem aprova |
| **Parcialmente Atendido** | decide, mas justifica por opinião, sem citar critério |
| **Não Atendido** | não decide, ou só repete que "tem que proteger" |

> Não existe resposta certa de prazo. Existe resposta **defendida**. Quem escrever seis meses e
> justificar bem está acima de quem escrever cinco anos sem motivo.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 27 -->
<!-- objetivo: aluno registra a pagina 4 do dossie, fechando a semana -->

# Dossiê do Abrigo: página 4

Título: **O caminho do dado**. O que tem que estar nela:

- As sete etapas do ciclo de vida
- O trajeto do `cpf` pelas sete, respondido
- As três camadas da cultura, com o exemplo do abrigo em cada uma
- Sua decisão sobre o prazo, com justificativa e quem aprova

> Com esta página, o Dossiê fecha a semana com o dado inteiro: nasceu na quinta, cresceu, e
> hoje ganhou data pra morrer.

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 28: Divisor bloco 3 -->

# BLOCO 3: FUNDAMENTOS DE IA

## Segunda chance

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 51"
---

<!-- SLIDE 29 -->
<!-- objetivo: aluno entende quem refaz a avaliacao e quem faz outra coisa -->

# Quem refaz e quem não

Esta é a **segunda e última** janela de Fundamentos de IA neste trimestre. Não é prova nova, é
recuperação.

- **Quem ficou parcial ou não atendido** na avaliação da aula 45: refaz, com cenários novos
- **Quem já atendeu:** não refaz. Fecha o Dossiê e vira arguidor

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

<!-- SLIDE 30 -->
<!-- [ATIV AVALIATIVA] recuperacao UC04: cenarios novos do abrigo -->

# Recuperação: cenários novos

Mesma estrutura da aula 45, cenários diferentes. Para cada um: **qual tipo de aprendizado**, e
por quê.

1. O abrigo separa os animais em grupos parecidos, **sem dizer antes quais grupos existem**,
   pra entender que perfis costumam chegar
2. O sistema aprende a sugerir horários de visita testando opções e recebendo como retorno se a
   visita aconteceu ou não

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

<!-- SLIDE 31 -->
<!-- objetivo: aluno fecha a semana enxergando o arco completo do abrigo -->

# Fim da Aula 51

Em duas semanas o abrigo virou uma organização de verdade: tem banco, tem regra de quem acessa,
tem conta de quanto cresce e tem política de quando apagar.

<v-click>

E vocês têm um Dossiê que prova isso. Guardem: ele volta no próximo trimestre, e o que estiver
escrito lá vocês não vão precisar aprender de novo.

</v-click>
