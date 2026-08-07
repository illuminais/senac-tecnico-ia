---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 45"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 45"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-08-07"
layout: cover
---

<!-- SLIDE 1 -->

# Aula 45
## Transformação Digital: o Case Nubank

> Como um banco brasileiro de verdade decide com dados: o mecanismo, o ciclo de vida da informação e a segurança por trás da decisão

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 2 -->

# BLOCO 1
## Transformação Digital: o Case Nubank

Um mergulho profundo em como o Nubank usa inteligência artificial pra decidir com dados: o mecanismo, o ciclo de vida do dado e a segurança por trás da decisão

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 3 -->
<!-- debate: aula 45 - setup -->

# Debate: tabela fixa ou ler o histórico como um texto?

Imagina que você trabalha num banco e precisa decidir se aumenta o limite de crédito de um cliente, usando o histórico de gastos dele no último ano inteiro.

- Time A: defende usar uma tabela fixa de atributos (renda, idade, número de compras). Rápido de calcular e fácil de auditar.
- Time B: defende ler o histórico de gastos inteiro como uma sequência conectada, igual um texto, onde cada compra ajuda a entender as outras.

**Turma dividida ao meio (29 alunos): metade no Time A, metade no Time B.** Dentro de cada metade, grupos de 4 a 5 pessoas: 1 argumenta em voz alta, 1 cronometra o tempo, o resto ajuda a montar o argumento.

**3 min:** cada grupo escreve o argumento mais forte do seu time no papel: por que essa forma de decidir é melhor ou pior pro banco e pro cliente.

---
layout: brainstorm
card: true
bgPreset: palette
pulse: false
---

<!-- SLIDE 4 -->
<!-- debate: aula 45 - confronto e fechamento -->

# Debate: tabela fixa ou ler o histórico como um texto? (cont.)

- **2 min:** Time A apresenta o argumento
- **2 min:** Time B apresenta o argumento
- **1 min:** réplica livre (qualquer um dos dois lados)
- **1 min:** professor sintetiza e conecta com o case

> Conexão futura: um banco brasileiro real, que processa o histórico de mais de 100 milhões de clientes (fonte: blog de engenharia do Nubank), fez exatamente essa escolha. Vocês vão descobrir qual e por quê.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 5 -->

<!-- objetivo: aluno entende a estrutura de investigação por ângulos usada pra aprofundar no case Nubank -->

# Como vamos investigar o case Nubank hoje

Hoje é só 1 case, mas em profundidade: o Nubank, banco brasileiro real. Grupos pequenos vão investigar 4 ângulos diferentes do mesmo case:

- **Mecanismo:** como o modelo transforma histórico de gastos em decisão
- **Ciclo de vida do dado:** o caminho do dado dentro da empresa
- **Segurança e governança:** como o dado é protegido
- **Cultura organizacional:** como a IA muda o trabalho de quem decide

Cada ângulo segue os mesmos 3 passos (pesquisa → entendimento → conclusão) e responde 2 perguntas fixas: que dado sensível está envolvido e como a LGPD deveria proteger esse dado, e como seria decidir isso sem IA.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 6 -->

<!-- objetivo: aluno entende o problema de crédito que o Nubank resolveu e a ideia central por trás do nuFormer -->

# Case Nubank: o problema do crédito

Decidir se aumenta o limite de crédito de alguém é decidir sob incerteza: o banco precisa prever um comportamento futuro usando dados do passado.

O jeito tradicional usa uma tabela de score: poucos atributos fixos (renda, idade, tempo de conta), sem capturar padrões sazonais ou de comportamento.

O Nubank criou o **nuFormer**: um modelo que usa a mesma arquitetura dos modelos de linguagem (tipo o ChatGPT, que prevê a próxima palavra numa frase), aplicada ao histórico de gastos de mais de 100 milhões de clientes (fonte: blog de engenharia do Nubank).

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 7 -->
<!-- checkpoint: aula 45 -->

# Exercício rápido: o que vira "token" numa compra?

Pensem numa compra que vocês fizeram essa semana (um lanche, um aplicativo, uma passagem de ônibus).

**Levantem a mão:** quais informações dessa compra vocês contariam pro nuFormer entender o "significado" dela?

<AdminOnly>

**Gabarito:** segundo o paper oficial do Nubank (arXiv 2507.23267), cada transação vira 5 tokens fixos (sinal da transação, faixa de valor, mês, dia, dia da semana) mais tokens de texto da descrição via BPE (Byte Pair Encoding, técnica de tokenização de texto). Isso dá uma média de cerca de 14 tokens por transação.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 8 -->

<!-- objetivo: aluno compreende como o histórico de gastos de um cliente é transformado em sequência de tokens pelo nuFormer -->

# Case Nubank: um ano de gastos vira uma sequência

Cada transação (compra, pagamento, transferência) vira 5 tokens fixos (sinal, faixa de valor, mês, dia, dia da semana) mais tokens de texto da descrição, numa média de ~14 tokens por transação.

Um ano inteiro de gastos de um cliente vira uma sequência longa e conectada: cada transação ajuda o modelo a interpretar as outras, o mesmo efeito de contexto que existe numa frase.

> Fonte: paper Nubank, "Your Spending Needs Attention", arXiv 2507.23267, seção 3.1.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 9 -->

<!-- objetivo: aluno dimensiona a escala real de treinamento do nuFormer e entende o impacto documentado do modelo -->

# Case Nubank: a escala e o resultado real

<SlideTable compact>

| nuFormer (dados reais, com fonte) | Valor |
|---|---|
| Linhas de treino / teste | 203 milhões / 2 milhões |
| Transações no total | ordem de 100 bilhões |
| Ganho de performance (recomendação/retenção) | +1,20% a +1,25% de AUC relativo |
| Redução de churn documentada | 4,4% |

</SlideTable>

O paper descreve esse ganho como "2 a 3 vezes a melhoria anual típica pra modelos maduros do setor financeiro": pouco em porcentagem, enorme em impacto real. **Atenção:** esses números de resultado são do uso em recomendação e retenção de clientes, não especificamente do cenário de crédito.

> Fontes: paper Nubank (arXiv 2507.23267) e case study técnico, ZenML LLMOps Database.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 10 -->
<!-- checkpoint: aula 45 -->

# Exercício rápido: recapitulando o case Nubank

Em uma frase, expliquem pro colega ao lado: por que o nuFormer trata o histórico financeiro como se fosse um texto?

<AdminOnly>

**Gabarito:** porque cada transação, assim como cada palavra numa frase, só faz sentido completo quando lida em conjunto com as transações vizinhas. O nuFormer usa isso pra prever o próximo gasto do cliente, do mesmo jeito que um modelo de linguagem prevê a próxima palavra.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 11 -->

<!-- objetivo: aluno reconhece o ciclo de vida do dado dentro do Nubank e como a IA muda o trabalho de quem decide -->

# O dado tem um caminho dentro do Nubank

O histórico de transações passa por um ciclo: **coleta** (a transação é registrada), **processamento** (o nuFormer analisa a sequência), **uso** (a decisão de crédito ou produto é tomada) e **descarte** (o dado é retido, anonimizado ou eliminado conforme a política do banco).

Essa mudança também muda o trabalho de quem decide: o analista de crédito que antes decidia sozinho olhando uma ficha agora revisa e valida decisões que o modelo já sugeriu.

> A IA não substitui só a decisão: ela muda o papel da pessoa dentro do processo, de quem decide sozinha pra quem revisa, ajusta ou confia no que o modelo já calculou.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 12 -->

<!-- objetivo: aluno reconhece as práticas de segurança e governança que protegem o dado financeiro processado pelo nuFormer -->

# Segurança e governança: como o Nubank protege esse dado

Documentação técnica do Nubank descreve práticas de **model governance** (governança de modelo): ferramentas específicas de validação e monitoramento da qualidade dos dados de sequência antes de virarem decisão.

Duas proteções citadas: contra **vazamento de dado** (*data leakage*, quando informação que não deveria estar disponível "vaza" pro treino) e contra **viés temporal** (o modelo aprender um padrão que só valia no passado e aplicar errado no presente).

> Fonte: case study técnico, ZenML LLMOps Database.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 13 -->
<!-- checkpoint: aula 45 -->

# Exercício: investiguem a fonte original

Abram no celular ou notebook o blog de engenharia do Nubank: **building.nubank.com/how-nubank-uses-transformers-to-model-financial-habits-at-scale**

Em duplas, encontrem 1 fato concreto que ainda não apareceu nos slides (ou confirmem um que já apareceu) e anotem na ficha: o fato, e em qual parte do texto vocês encontraram.

**5 min.** Essa é uma fonte primária real, publicada pela própria empresa, não é um resumo de terceiros.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 14 -->
<!-- checkpoint: aula 45 -->

# Exercício: ficha de investigação em grupo

Formem grupos. Cada grupo recebe 1 ângulo (mecanismo, ciclo de vida do dado, segurança e governança, ou cultura organizacional) e preenche a ficha usando as próprias palavras e o fato que pesquisaram na fonte real:

- **Pesquisa:** o que o Nubank faz nesse ângulo, com que dado e com que tecnologia
- **Entendimento:** por que isso funciona melhor que o jeito tradicional
- **Conclusão:** qual dado sensível está envolvido e como a LGPD deveria proteger esse dado
- **E sem IA?** como o banco resolveria o mesmo problema sem inteligência artificial

**Tempo: 15 minutos.** Preparem-se pra compartilhar com o resto da turma.

<AdminOnly>

**Rubrica de avaliação (por item: Pesquisa, Entendimento, Conclusão, "E sem IA?"):**

- Atendido: item específico do ângulo (não genérico), com lógica própria e conectado corretamente ao dado sensível/LGPD quando aplicável
- Parcialmente Atendido: item correto mas genérico, incompleto, ou copiado do slide sem elaboração própria
- Não Atendido: item ausente, incorreto ou sem relação com o ângulo analisado

</AdminOnly>

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 15 -->
<!-- dinamica: aula 45 -->

# Rodízio de compartilhamento entre grupos

Cada grupo tem 2 minutos pra compartilhar o que descobriu sobre seu ângulo do case Nubank, usando a ficha que acabaram de preencher.

- Um representante do grupo fala, o resto do grupo pode complementar
- A turma ouve os 4 ângulos (mecanismo, ciclo de vida do dado, segurança e governança, cultura organizacional) na ordem que quiserem
- Depois de cada apresentação, qualquer aluno pode fazer 1 pergunta pro grupo

> Fiquem atentos: o que vocês ouvirem sobre segurança e dado sensível vai ser a base do debate de fechamento.

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 16 -->
<!-- debate: aula 45 - setup -->

# Debate: guardar mais dado ou descartar mais rápido?

O nuFormer fica mais preciso quanto mais histórico de transações ele enxerga. Mas guardar mais dado por mais tempo também aumenta o risco de vazamento.

- Time A: defende manter o histórico completo guardado por mais tempo, porque o modelo fica mais preciso com mais contexto.
- Time B: defende anonimizar ou descartar o dado mais rápido, mesmo perdendo um pouco de precisão, porque reduz o risco de vazamento e respeita mais a privacidade do cliente.

**Turma dividida ao meio (29 alunos): metade no Time A, metade no Time B.** Dentro de cada metade, grupos de 4 a 5 pessoas: 1 argumenta em voz alta, 1 cronometra, o resto ajuda a montar o argumento.

**3 min:** cada grupo escreve o argumento mais forte do seu time, ligado a algo concreto que aprenderam sobre o ciclo de vida do dado ou a segurança do Nubank.

---
layout: brainstorm
card: true
bgPreset: palette
pulse: false
---

<!-- SLIDE 17 -->
<!-- debate: aula 45 - confronto e fechamento -->

# Debate: guardar mais dado ou descartar mais rápido? (cont.)

- **2 min:** Time A apresenta o argumento
- **2 min:** Time B apresenta o argumento
- **1 min:** réplica livre (qualquer um dos dois lados)
- **1 min:** professor sintetiza

> Conexão futura: essa mesma tensão entre precisão e privacidade vai voltar em Banco de Dados quando vocês estudarem permissão de acesso.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 18 -->
<!-- tarefa de casa: aula 45 -->

# Tarefa de Casa: Aula 45 (UC07)

> **Prazo: início da próxima aula de Transformação Digital**

Pesquisem 1 case brasileiro de inteligência artificial diferente do Nubank.

Apliquem a mesma estrutura da aula:

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 19 -->
<!-- tarefa de casa: aula 45 (cont.) -->

# Tarefa de Casa: Aula 45 (UC07) (cont.)

- **Pesquisa:** o que a empresa fez, com que dado e com que tecnologia
- **Entendimento:** por que essa solução funciona
- **Conclusão:** qual dado sensível está envolvido e como a LGPD deveria proteger esse dado

Salvem em um documento de texto ou apresentação simples, com o nome do case no título do arquivo.

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 20 -->

# BLOCO 2
## Fundamentos e Conceitos de IA

> Vocês viram hoje de manhã como o Nubank decide com dados, do mecanismo até a segurança. Agora vamos entender os algoritmos por trás dessas decisões, usando o abrigo como exemplo.

Revisão rápida de KNN, Árvore de Decisão e K-Means, um assunto novo (aprendizado por reforço) e a Av04-T2: a avaliação que encerra estes indicadores no trimestre

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 21 -->

<!-- objetivo: aluno relembra rapidamente KNN, Árvore de Decisão e K-Means sem reensino, como ponte pro conteúdo novo -->

# Vocês já sabem isso: lembrança rápida

Já viram KNN, Árvore de Decisão e K-Means na Aula 39, e já praticaram com eles. Sem reexplicar do zero:

<SlideTable compact>

| Algoritmo | Em 1 linha | Tipo |
|---|---|---|
| KNN | compara com os vizinhos mais parecidos | Supervisionado |
| Árvore de Decisão | fluxograma de perguntas até decidir | Supervisionado |
| K-Means | agrupa parecidos, sem usar rótulo | Não supervisionado |

</SlideTable>

Hoje o assunto novo é o 3º tipo de aprendizado: por reforço.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 22 -->

<!-- objetivo: aluno entende o conceito central e o vocabulário do aprendizado por reforço a partir de um exemplo concreto -->

# Novo: aprendizado por reforço (reinforcement learning)

Pensem num cachorro aprendendo a sentar: tenta, erra ou acerta, ganha petisco quando acerta, e repete mais o que dá petisco. Aprendizado por reforço funciona assim: testar ações e receber recompensa (ou punição) direto do ambiente.

<SlideTable compact>

| Conceito | No exemplo do cachorro |
|---|---|
| Agent (agente) | o cachorro |
| Environment (ambiente) | a sala, o quintal, o dono |
| Action (ação) | sentar, latir, dar a pata |
| Reward (recompensa) | petisco quando acerta, nada quando erra |

</SlideTable>

> Diferente do supervisionado (usa rótulo) e do não supervisionado (agrupa sem rótulo). Hoje é só a semente do assunto: não cai na prova, aprofunda em T3.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 23 -->
<!-- checkpoint: aula 45 -->

# Exercício: pesquisem um exemplo real de aprendizado por reforço

Em duplas, no celular ou notebook: pesquisem 1 exemplo real de aprendizado por reforço (um jogo, tipo xadrez, Go ou Atari; um robô; ou um carro autônomo).

Anotem na ficha: o exemplo, a fonte (link ou site onde encontraram), e quem é o agente, o ambiente e a recompensa nesse caso real.

**8 min.**

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 24 -->

<!-- objetivo: aluno reconhece as colunas reais do abrigo_adocao.csv que serão usadas para aplicar os conceitos de IA -->

# Ponte conceitual: o abrigo como exemplo

Vocês já usaram o `abrigo_adocao.csv` em Banco de Dados e em Estatística. As mesmas colunas servem pra IA:

<SlideTable compact>

| nome_animal | especie | porte | idade_meses | dias_no_abrigo | adotado |
|---|---|---|---|---|---|
| Rex | cão | grande | 3 | 10 | não |
| Nina | gata | médio | 6 | 22 | sim |
| Mel | gata | pequeno | 48 | 210 | não |

</SlideTable>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 25 -->

<!-- objetivo: aluno aplica os conceitos de aprendizado supervisionado e não supervisionado usando as colunas reais do abrigo_adocao.csv -->

# Ponte conceitual: o abrigo como exemplo (cont.)

- **`adotado` é o rótulo conhecido:** treinar um modelo pra prever quem vai ser adotado a seguir, usando os casos já resolvidos, é aprendizado supervisionado (o que KNN e Árvore de Decisão fazem).
- **Sem olhar pra `adotado`:** agrupar os animais por `porte`, `idade_meses` e `dias_no_abrigo`, só pra achar padrões de perfil parecido, é aprendizado não supervisionado (o que K-Means faz).

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 26 -->
<!-- checkpoint: aula 45 -->

# Checkpoint: qual dos 3 tipos é esse?

Rapidinho, em voz alta: usar `adotado` pra prever quem vai ser adotado é qual tipo de aprendizado? E agrupar por `porte`/`idade_meses`/`dias_no_abrigo` sem olhar `adotado`?

<AdminOnly>

**Gabarito:** usar `adotado` pra prever = supervisionado. Agrupar sem olhar `adotado` = não supervisionado.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 27 -->

<!-- objetivo: aluno organiza mentalmente os 3 tipos de aprendizado de máquina com um exemplo prático de cada -->

# Recapitulando os 3 tipos de aprendizado

<SlideTable compact>

| Tipo de aprendizado | Algoritmo(s) já vistos | Exemplo no abrigo |
|---|---|---|
| Supervisionado | KNN, Árvore de Decisão | Prever `adotado` usando os casos que já têm esse rótulo |
| Não supervisionado | K-Means | Agrupar por `porte`, `idade_meses`, `dias_no_abrigo`, sem olhar `adotado` |
| Reforço | sem algoritmo específico ainda | O exemplo real que vocês pesquisaram agora há pouco |

</SlideTable>

Esses 3 tipos são a base de tudo que vocês vão construir em Machine Learning daqui pra frente.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 28 -->
<!-- [ATIV AVALIATIVA] Av04-T2: instruções -->

# Av04-T2: avaliação de Fundamentos e Conceitos de IA

**Prova individual, em papel, aproximadamente 2 horas.**

Vocês vão analisar cenários novos do abrigo, diferentes dos exemplos vistos em aula, e:

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 29 -->
<!-- [ATIV AVALIATIVA] Av04-T2: instruções (cont.) -->

# Av04-T2: avaliação de Fundamentos e Conceitos de IA (cont.)

- Classificar qual algoritmo (KNN, Árvore de Decisão ou K-Means) se encaixa melhor em cada cenário
- Classificar o tipo de aprendizado (supervisionado, não supervisionado ou por reforço)
- Justificar a resposta com base no que o cenário descreve

> Esta é a primeira e única aplicação nova da Av04-T2. Ela encerra os Indicadores 2 e 3 de Fundamentos e Conceitos de IA neste trimestre.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 30 -->
<!-- [ATIV AVALIATIVA] Av04-T2: questões 1 e 2 -->

# Av04-T2: questões 1 e 2

**Questão 1.** Um novo animal chega ao abrigo. Pra prever se ele vai ser adotado, você compara ele com os 5 animais mais parecidos (mesma espécie, porte parecido, idade parecida) que já passaram pelo abrigo, e olha o que aconteceu com a maioria deles.

**Questão 2.** Você quer montar um fluxograma de perguntas (é cão ou gato? tem mais de 24 meses? ficou mais de 100 dias no abrigo?) que decide, passo a passo, se um animal provavelmente vai ser adotado, baseado no histórico de animais anteriores.

Pra cada questão, identifiquem: algoritmo, tipo de aprendizado e justificativa.

<AdminOnly>

**Gabarito:**

- Questão 1: KNN. Supervisionado, porque usa o rótulo `adotado` dos animais parecidos pra decidir.
- Questão 2: Árvore de Decisão. Supervisionado, porque as perguntas do fluxograma são construídas a partir de casos com `adotado` já conhecido.

**Rubrica:**

- Questão 1: Atendido, identifica KNN e aprendizado supervisionado e justifica com base na comparação de vizinhos parecidos; Parcialmente Atendido, identifica corretamente só o algoritmo ou só o tipo de aprendizado, ou não justifica; Não Atendido, não identifica corretamente nem o algoritmo nem o tipo de aprendizado.
- Questão 2: Atendido, identifica Árvore de Decisão e aprendizado supervisionado e justifica com base no fluxograma construído a partir de casos conhecidos; Parcialmente Atendido, identifica corretamente só o algoritmo ou só o tipo de aprendizado, ou não justifica; Não Atendido, não identifica corretamente nem o algoritmo nem o tipo de aprendizado.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 31 -->
<!-- [ATIV AVALIATIVA] Av04-T2: questões 3 e 4 -->

# Av04-T2: questões 3 e 4

**Questão 3.** Uma pesquisadora quer agrupar os animais do abrigo por perfil (`porte`, `idade_meses`, `dias_no_abrigo`), sem olhar a coluna `adotado`, só pra entender se existem grupos parecidos de animais no abrigo.

**Questão 4.** Um robô cuidador anda pelo abrigo testando formas diferentes de interagir com os animais (dar ração, brincar, limpar o espaço). Toda vez que um animal fica mais calmo ou saudável depois da interação, o robô recebe uma recompensa, e vai ajustando seu comportamento com o tempo.

Na questão 3, identifiquem algoritmo e tipo de aprendizado. Na questão 4, identifiquem só o tipo de aprendizado.

<AdminOnly>

**Gabarito:**

- Questão 3: K-Means. Não supervisionado, porque agrupa sem usar o rótulo `adotado`.
- Questão 4: Aprendizado por reforço, porque o robô aprende por tentativa e erro, recebendo recompensa a partir da interação com o ambiente (não é cobrado algoritmo específico nesta questão).

**Rubrica:**

- Questão 3: Atendido, identifica K-Means e aprendizado não supervisionado e justifica com base no agrupamento sem rótulo; Parcialmente Atendido, identifica corretamente só o algoritmo ou só o tipo de aprendizado, ou não justifica; Não Atendido, não identifica corretamente nem o algoritmo nem o tipo de aprendizado.
- Questão 4: Atendido, identifica corretamente aprendizado por reforço e justifica com base na tentativa e erro com recompensa; Parcialmente Atendido, identifica o tipo mas não justifica (ou vice-versa); Não Atendido, não identifica o tipo corretamente.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 32 -->
<!-- tarefa de casa: aula 45 -->

# Tarefa de Casa: Aula 45 (UC04)

> **Prazo: início da próxima aula de Fundamentos e Conceitos de IA**

Vocês já pesquisaram 1 exemplo real de aprendizado por reforço em sala. Agora pesquisem um **segundo** exemplo, diferente do que já encontraram.

Anotem: o exemplo, a fonte, e quem é o agente, o ambiente e a recompensa.

Isso vai preparar o próximo assunto do curso: aprendizado por reforço aplicado de verdade, em T3.

---
layout: end
github: LeoZanini
avatar: https://github.com/LeoZanini.png?size=256
bgPreset: animate
---

<!-- SLIDE 33 -->

# Fim da Aula 45!

## O que vem por aí

Aula 46: Inglês Instrumental (UC02), com a Av05-T2, uma checagem leve dos indicadores que vocês já vêm trabalhando o trimestre inteiro.

*Dúvidas? Chama no grupo da turma.*
