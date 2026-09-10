---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 55"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 55"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-09-11"
unlockHour: 13
layout: cover
---

<!-- SLIDE 1: Capa -->

# Aula 55
## Comparar exige critério

**UC01 Fundamentos de Computação** · Épico 1, dia 2 de 4

**Hoje o verbo é COMPARAR**

11 de setembro de 2026

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 2: Onde estamos (slide fixo dos 4 dias) -->

# Onde estamos

<SlideTable compact>

| Dia | Verbo | O que você produz | |
|---|---|---|---|
| 10/09 | organizar | um dado que dá para usar | feito |
| **11/09** | **comparar** | **as comparações que o dado permite** | **você está aqui** |
| 17/09 | analisar e decidir | o painel e a recomendação | |
| 18/09 | refazer | o que ficou em aberto | |

</SlideTable>

**Ontem você produziu:** as abas `01_dados` e `02_limpeza`, com 408 linhas limpas.

**Hoje você cria:** a aba `03_comparacoes`, no mesmo arquivo.

Abra o `painel_dengue_pr.xlsx` agora. Sem ele você não acompanha a aula.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 3: Confere a tarefa -->

<!-- objetivo: aluno confronta o próprio palpite com o dado, criando tensão para o conceito de critério -->

# Antes de tudo: seu palpite de ontem

A tarefa 4 pedia para você escrever, sem olhar a planilha, qual município teve mais dengue no Paraná em 2025.

Pegue o caderno. Leia o que você escreveu.

Agora ordene a coluna `casos` do maior para o menor, filtrando só o ano de 2025.

**Quem acertou?**

> Guarde essa folha. No fim da aula ela vai fazer sentido de um jeito diferente.

---
layout: center
card: true
bgPreset: animate
---

<!-- SLIDE 4: A pergunta que parece fácil -->

# "Qual município teve mais dengue?"

Parece a pergunta mais simples do mundo.

Ela tem **duas respostas certas e diferentes**, e é isso que a aula de hoje resolve.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 5: Conceito critério -->

<!-- objetivo: aluno define critério e entende que comparar sem critério não é comparar -->

# Conceito 5: critério

**Definição:** critério é **a régua** que você escolheu para decidir qual opção ganha.

**Analogia:** dois alunos, um tirou 8 numa prova e o outro tirou 7 em três provas. Quem é melhor? Depende da régua: a maior nota, ou a média, ou quem melhorou mais. Nenhuma régua é a verdadeira. Mas **sem declarar a régua, a discussão não termina nunca**.

**No nosso dado:** "mais dengue" pode ser mais casos no total, ou mais casos para o tamanho da cidade. São réguas diferentes.

**Para que serve:** sem critério declarado, qualquer resposta parece boa e ninguém consegue discordar de forma útil.

---
layout: two-cols-text
card: true
bgPreset: default
---

<!-- SLIDE 6: Duas réguas -->

<!-- objetivo: aluno vê que a mesma pergunta muda de resposta conforme a régua -->

# Régua 1: casos absolutos

Quantas pessoas adoeceram, ponto.

**Responde bem:** quantos leitos vão precisar? Quantos remédios comprar? Onde vai ter fila no hospital?

**Engana quando:** cidade grande sempre ganha, mesmo com pouca dengue proporcionalmente.

::right::

# Régua 2: casos por 100 mil

Quantos adoeceram **a cada 100 mil habitantes**.

**Responde bem:** onde o problema é mais grave? Onde a doença está mais espalhada na população?

**Engana quando:** cidade pequena com poucos casos pode disparar, porque o divisor é pequeno.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 7: Por que bruto engana -->

<!-- objetivo: aluno entende com exemplo do próprio cotidiano por que número absoluto engana -->

# Por que o número bruto engana

Duas turmas tiveram falta hoje.

- Turma A: **10 faltas**, de 300 alunos
- Turma B: **8 faltas**, de 20 alunos

Qual turma tem problema de frequência?

No número bruto, a A ganha: 10 é mais que 8. Na proporção, a B tem 40% da turma faltando e a A tem 3%.

**A pergunta "quantos?" e a pergunta "quão grave?" não são a mesma pergunta.** Cada uma tem a sua régua.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 8: A conta -->

<!-- objetivo: aluno sabe montar a fórmula de taxa por 100 mil e entende cada pedaço dela -->

# Como se calcula "por 100 mil"

```text
casos ÷ população × 100000
```

**Por que dividir:** dividir casos por população dá quantos casos existem **por habitante**. Um número minúsculo, tipo 0,05.

**Por que multiplicar por 100 mil:** para virar um número que dá para ler e comparar. 0,05 vira 5.000 casos por 100 mil habitantes.

**Por que 100 mil e não 1.000:** é o padrão que a saúde pública usa no mundo inteiro. Como todo mundo usa o mesmo, dá para comparar Paraná com qualquer outro lugar.

> Essa conta se chama **taxa**. É a mesma ideia de velocidade: não interessa só a distância, interessa a distância dividida pelo tempo.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 9: Exercício 1 -->

# Exercício 1: faça a conta na mão

Três municípios, ano de 2025, dados da sua planilha. Calcule a taxa por 100 mil de cada um, no caderno, com calculadora.

<SlideTable compact>

| Município | Casos em 2025 | População |
|---|---|---|
| Londrina | 32.804 | 588.101 |
| Jacarezinho | 1.005 | 11.870 |
| Curitiba | 8.337 | 1.871.789 |

</SlideTable>

Depois responda: **qual dos três é o pior caso?** E a resposta muda dependendo da régua?

<AdminOnly>

**Gabarito:**
- Londrina: 32.804 ÷ 588.101 × 100000 = **5.578** por 100 mil
- Jacarezinho: 1.005 ÷ 11.870 × 100000 = **8.467** por 100 mil
- Curitiba: 8.337 ÷ 1.871.789 × 100000 = **445** por 100 mil

**Muda tudo.** Em casos absolutos a ordem é Londrina, Curitiba, Jacarezinho. Por 100 mil a ordem é Jacarezinho, Londrina, Curitiba.

Jacarezinho tem **19 vezes** a taxa de Curitiba, e tem oito vezes menos casos que ela. Deixe esse número no ar: é o coração da avaliação de quarta.

</AdminOnly>

---
layout: center
card: true
bgPreset: animate
---

<!-- SLIDE 10: A virada -->

# Nenhuma das duas réguas é a certa

A régua certa é a que responde **a pergunta que você está fazendo**.

Por isso o critério vem antes da conta, e não depois.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 11: Exercício 2 -->

# Exercício 2: qual régua para qual decisão

Para cada decisão, diga qual critério serve melhor e escreva **uma linha** de justificativa.

**1.** Quantas doses de soro mandar para cada cidade.
**2.** Em que cidade fazer a campanha de rua mais forte.
**3.** Onde abrir um posto de atendimento novo.
**4.** Qual prefeito deveria ser cobrado por não ter agido.

<AdminOnly>

**Gabarito:**
1. **Absoluto.** Soro é por pessoa doente. 32 mil doentes precisam de mais soro que 1 mil, ponto.
2. **Por 100 mil.** Campanha de rua muda comportamento da população. Onde a proporção é alta, tem mais gente a convencer por metro quadrado.
3. **Absoluto**, com ressalva. Posto atende volume. Mas se a cidade é minúscula, o posto pode ser inviável mesmo com taxa alta. Aceite quem levantar isso.
4. **Por 100 mil.** Cobrar gestão é comparar desempenho, e comparar desempenho exige tirar o tamanho da conta.

**O que avaliar:** não é acertar a régua, é a justificativa ligar a régua à decisão. Quem escreve "porque é melhor" não atendeu.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 12: Divisor ferramentas -->

# AS FERRAMENTAS
## Comparar 408 linhas na mão não dá

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 13: Ordenar -->

<!-- objetivo: aluno ordena corretamente e evita o erro de ordenar coluna solta -->

# Ferramenta 1: ordenar

Coloca as linhas da maior para a menor, ou o contrário.

**O erro que destrói a planilha:** selecionar **só uma coluna** e mandar ordenar. O Excel reordena aquela coluna e deixa as outras paradas. Aí o número de Londrina aparece na linha de Curitiba, e nada mais faz sentido.

**Como fazer certo:** clique em uma célula qualquer de dentro da tabela e ordene por aí, sem selecionar coluna. O Excel entende a tabela inteira e leva a linha junto.

> Se ele perguntar "expandir a seleção?", a resposta é sim, sempre.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 14: Filtrar -->

<!-- objetivo: aluno usa filtro para recortar o dado sem apagar nada -->

# Ferramenta 2: filtrar

Esconde temporariamente as linhas que não interessam.

**A diferença que importa:** filtrar **não apaga**. Ele só esconde. Tirou o filtro, tudo volta.

**Onde isso salva você:** ontem, para achar as linhas de TOTAL, o caminho era filtrar. Hoje, para ver só 2025, o caminho também é filtrar.

**A pegadinha:** com filtro ligado, a função SOMA continua somando as linhas escondidas. Se você quer somar só o que está aparecendo, o nome da função é `SUBTOTAL`.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 15: Formatação condicional -->

<!-- objetivo: aluno usa cor para enxergar padrão antes de calcular qualquer coisa -->

# Ferramenta 3: formatação condicional

Pinta as células conforme o valor. Verde para baixo, vermelho para alto.

**Para que serve de verdade:** enxergar padrão **antes** de calcular. Com 408 números na tela você não vê nada. Com 408 números coloridos, o olho acha sozinho onde estão os picos.

**Onde aplicar hoje:** na coluna `casos`, com escala de cores. Depois role a planilha devagar e repare em que meses o vermelho aparece.

> Isso não é enfeite. É a forma mais rápida de levantar hipótese, e hipótese é o passo 2 do método de ontem.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 16: CONT.SE e SOMASE -->

<!-- objetivo: aluno usa contagem e soma condicionais para responder perguntas específicas -->

# Ferramentas 4 e 5: CONT.SE e SOMASE

As duas fazem a mesma pergunta: "só as linhas que atendem tal condição".

```text
=CONT.SE(B:B; "Norte")
=SOMASE(B:B; "Norte"; G:G)
```

**CONT.SE** conta **quantas linhas** atendem. A de cima devolve quantas linhas são da região Norte.

**SOMASE** soma **uma outra coluna**, mas só nas linhas que atendem. A de baixo devolve quantos casos a região Norte teve.

**A diferença:** uma conta linhas, a outra soma valores. Confundir as duas é o erro mais comum, e o resultado sai absurdo o bastante para você perceber.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 17: Exercício 3 -->

# Exercício 3: responda com fórmula

Na aba `03_comparacoes`, responda usando CONT.SE ou SOMASE. Escreva a fórmula que você usou ao lado de cada resposta.

**1.** Quantas linhas do arquivo são da macrorregional Oeste?
**2.** Quantos casos a macrorregional Norte teve ao todo, nos dois anos?
**3.** Quantos casos Maringá teve ao todo?
**4.** Qual das quatro regiões teve mais casos somando 2024 e 2025?

<AdminOnly>

**Gabarito:**
1. `=CONT.SE(B:B;"Oeste")` → 120 linhas (5 municípios × 12 meses × 2 anos)
2. `=SOMASE(B:B;"Norte";G:G)`
3. `=SOMASE(A:A;"Maringá";G:G)`
4. Quatro SOMASE, uma por região, e compara. **Norte** vence.

**Se der zero em alguma:** a limpeza de ontem falhou na coluna `macrorregional`. É o defeito 4 voltando. Mande conferir se sobraram exatamente quatro valores diferentes.

Esse é o momento em que quem limpou mal descobre que limpou mal. É de propósito.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 18: Conceito tabela dinâmica -->

<!-- objetivo: aluno entende o que uma tabela dinâmica faz antes de tentar montar uma -->

# Conceito 6: tabela dinâmica

**Definição:** é uma ferramenta que **agrupa suas linhas por uma coluna e resume outra coluna**, sozinha.

**Analogia:** imagine separar 408 fichas de papel em quatro pilhas, uma por região, e depois somar cada pilha. A tabela dinâmica faz as duas coisas de uma vez, e refaz na hora se você mudar de ideia sobre as pilhas.

**Por que ela existe:** o Exercício 3 exigiu quatro fórmulas para comparar quatro regiões. Com vinte municípios seriam vinte fórmulas. A tabela dinâmica faz todas de uma vez.

**Onde ela quebra:** se o cabeçalho não estiver na primeira linha, ou se a mesma categoria tiver grafias diferentes. Exatamente os defeitos 1 e 4 de ontem.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 19: Os campos -->

<!-- objetivo: aluno sabe onde arrastar cada coluna ao montar a tabela dinâmica -->

# A tabela dinâmica tem três lugares

Você arrasta o nome de uma coluna para um dos três:

<SlideTable compact>

| Lugar | O que ele faz | Exemplo |
|---|---|---|
| **Linhas** | vira uma pilha por valor diferente | `macrorregional` vira 4 linhas |
| **Colunas** | quebra cada pilha em subpilhas | `ano` vira 2 colunas |
| **Valores** | o que é calculado dentro da pilha | `casos`, somado |

</SlideTable>

Com esses três você monta "casos por região, comparando 2024 e 2025" arrastando três nomes. Sem uma fórmula.

**Confira sempre:** em Valores, o padrão às vezes vem como Contagem em vez de Soma. Contagem devolve 102 quando você queria 60 mil. Se o número vier pequeno demais, é isso.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 20: A armadilha da soma -->

<!-- objetivo: aluno reconhece que nem toda coluna faz sentido somar -->

# A armadilha: nem tudo se soma

Ponha `populacao` em Valores e a tabela dinâmica vai somar a população.

Somar população de Londrina doze vezes, uma para cada mês, dá sete milhões de habitantes em Londrina.

**A regra:** casos você soma, porque cada mês tem casos novos. População você **não** soma, porque é a mesma gente todo mês.

> A ferramenta faz o que você mandar. Ela não sabe o que os números significam. Quem sabe é você, e é por isso que você não pode terceirizar a conta para ela.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 21: Exercício 4 -->

# Exercício 4: monte três

Na aba `03_comparacoes`, monte três tabelas dinâmicas. Escreva embaixo de cada uma **o que ela mostra**, em uma frase.

**1.** Casos por macrorregional, comparando 2024 e 2025.
**2.** Casos por mês, só do ano de 2025, somando o Paraná inteiro.
**3.** Casos por município, só de 2025, ordenado do maior para o menor.

<AdminOnly>

**Gabarito, o que deve aparecer:**
1. Linhas `macrorregional`, Colunas `ano`, Valores soma de `casos`. Norte na frente nos dois anos.
2. Linhas `mes`, filtro de `ano` em 2025, Valores soma de `casos`. **Março dispara**, com quase um quarto do ano.
3. Linhas `municipio`, filtro de `ano` em 2025, Valores soma de `casos`. Londrina em primeiro com 32.804.

A número 2 é a que abre a aula de quarta. Se sobrar tempo, peça para eles olharem bem para ela.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 22: Divisor criticidade -->

# A PARTE QUE QUASE NINGUÉM FAZ
## O que este dado NÃO responde

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 23: O que o dado mede -->

<!-- objetivo: aluno distingue o que o dado mede do que ele quer saber -->

# O dado nunca mede o que você quer saber

Você quer saber **quantas pessoas tiveram dengue**.

O dado mede **quantos casos foram notificados** ao sistema de saúde.

Não é a mesma coisa. Para um caso virar dado, a pessoa precisa ter procurado atendimento, e alguém precisa ter registrado.

**Quem fica de fora:** quem teve sintoma leve e ficou em casa. Quem não tem posto perto. Quem foi atendido e o registro não subiu.

> Isso não invalida o dado. Só define **até onde** ele responde. Confundir "o que foi medido" com "o que aconteceu" é o erro mais caro da análise de dados.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 24: O caso Campo Mourão -->

<!-- objetivo: aluno pratica criticidade num caso real e ambíguo do próprio dado -->

# Olhe para Campo Mourão

Filtre Campo Mourão, ano de 2025, e veja o total. Depois calcule a taxa por 100 mil.

O número é **muito** mais baixo que o dos vizinhos do Noroeste. Maringá, Umuarama e Paranavaí estão todos em outro patamar.

**Duas explicações possíveis, e as duas cabem no dado:**

**A.** Campo Mourão realmente teve pouca dengue. Talvez a campanha de lá funcione bem.

**B.** Campo Mourão notificou pouco. A dengue aconteceu e não virou registro.

**Qual das duas é?** Este dado não distingue. Nenhuma conta que você fizer aqui resolve isso.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 25: Exercício 5 -->

# Exercício 5: responde ou não responde

Para cada pergunta, escreva **RESPONDE** ou **NÃO RESPONDE**, e por quê. Nas que não responde, escreva **que dado faltaria**.

**1.** Qual região teve mais casos notificados em 2025?
**2.** Em qual município a dengue é mais grave em relação ao tamanho da cidade?
**3.** A campanha de 2025 foi melhor que a de 2024?
**4.** Quantas pessoas morreram de dengue no Paraná?
**5.** Por que o Norte tem mais dengue que o Leste?

<AdminOnly>

**Gabarito:**
1. **Responde.** É soma direta. Norte.
2. **Responde**, com a ressalva do slide anterior: é a taxa de notificação, não a de doença.
3. **Não responde.** O dado mostra que os números caíram ou subiram, mas não diz por quê. Chuva, temperatura e sorotipo circulante mudam tudo. Faltaria dado de clima e de o que a campanha fez.
4. **Não responde.** Não existe coluna de óbito. Faltaria dado de mortalidade.
5. **Não responde.** O dado descreve, não explica. Faltaria temperatura, umidade, saneamento, cobertura de agente de saúde.

**O padrão:** o dado responde "o quê", "quanto" e "onde". Ele quase nunca responde "por quê". Confundir os dois é o erro que a gente está treinando a não cometer.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 26: Divisor laboratório -->

# LABORATÓRIO
## Monte a aba 03_comparacoes

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 27: O formato da aba -->

<!-- objetivo: aluno sabe exatamente o que a aba dele precisa conter -->

# O que vai na aba `03_comparacoes`

Quatro blocos, nesta ordem, um embaixo do outro:

**1. A coluna nova.** Volte na aba `01_dados` e crie a coluna `casos_por_100mil`, com a fórmula do slide 8, para todas as 408 linhas.

**2. As três tabelas dinâmicas** do Exercício 4, cada uma com a frase do que ela mostra.

**3. Três comparações que o dado sustenta.** Cada uma escrita assim: pergunta, critério usado, resposta, número.

**4. Duas perguntas que o dado não responde.** Cada uma com o dado que faltaria.

O bloco 4 vale tanto quanto o 3. Ele é a diferença entre saber usar planilha e saber pensar com dado.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 28: Os passos -->

<!-- objetivo: aluno executa o laboratório sem depender de instrução verbal -->

# No laboratório: seis passos

**1.** Abra o `painel_dengue_pr.xlsx` de ontem. Não comece arquivo novo.

**2.** Na aba `01_dados`, crie a coluna `casos_por_100mil`. Escreva a fórmula uma vez e arraste.

**3.** Crie a aba `03_comparacoes`.

**4.** Monte as três tabelas dinâmicas do Exercício 4 lá dentro.

**5.** Escreva as três comparações. Cada uma **precisa** dizer qual critério você usou.

**6.** Escreva as duas perguntas que o dado não responde, com o que faltaria.

> Comparação sem critério declarado não conta. Vai voltar para refazer.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 29: Checklist -->

<!-- objetivo: aluno sabe o que precisa mostrar para receber o visto -->

# Checklist para o visto

O visto de hoje conta para o Indicador 6.

- [ ] Exercícios 1 a 5 feitos no caderno
- [ ] Coluna `casos_por_100mil` preenchida nas 408 linhas
- [ ] Aba `03_comparacoes` criada
- [ ] Três tabelas dinâmicas montadas, cada uma com a frase do que mostra
- [ ] Três comparações escritas, **cada uma com o critério declarado**
- [ ] Duas perguntas que o dado não responde, com o dado que faltaria

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 30: Tarefa de casa -->

<!-- tarefa de casa: aula 55 -->

# Tarefa de Casa: Aula 55

> **Prazo: quinta 17/09, início da aula.** Vale no caderno.

**1.** Olhe a tabela dinâmica de casos por mês em 2025. Escreva **em que mês** os casos disparam e **em que mês** eles são mais baixos.

**2.** Uma campanha contra dengue leva **cerca de dois meses** para fazer efeito, porque precisa eliminar criadouro antes de o mosquito nascer. Sabendo disso e olhando a sua resposta da 1, **em que mês a campanha deveria começar?** Justifique.

**3.** Volte no seu palpite da tarefa de ontem, sobre qual município teve mais dengue. Agora você tem duas réguas. Sua resposta muda dependendo da régua? Escreva as duas respostas.

**4.** Se você fosse o secretário de saúde e só pudesse escolher **uma** cidade para mandar reforço, qual escolheria e por quê? Uma linha.

> A 4 é o começo da avaliação de quinta. Pense com calma.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 31: Amanhã -->

<!-- objetivo: aluno entende a dependência entre os dias e o peso da próxima aula -->

# Quinta: dia 3 de 4

O verbo muda de **comparar** para **analisar e decidir**.

Você vai transformar essas comparações em duas coisas: um **padrão** e uma **relação**. E depois vai ter que **escolher** e defender uma recomendação.

**A avaliação do épico é na quinta**, dentro da aula, e ela usa exatamente o arquivo que você está construindo. Não tem prova separada, não tem conteúdo novo para decorar.

Faltou hoje? Existe uma cópia com a aba `03_comparacoes` pronta para você copiar e entrar junto. Peça no início da aula.

---
layout: end
card: true
bgPreset: palette
github: LeoZanini
avatar: https://github.com/LeoZanini.png?size=256
---

<!-- SLIDE 32: Encerramento -->

# Até quinta

Hoje você descobriu que "qual é o maior?" é uma pergunta mal feita enquanto ninguém disser a régua.

Quinta você escolhe a régua e assume a escolha.
