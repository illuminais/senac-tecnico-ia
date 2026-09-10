---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 56"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 56"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-09-17"
unlockHour: 13
layout: cover
---

<!-- SLIDE 1: Capa -->

# Aula 56
## Da comparação à decisão

**UC01 Fundamentos de Computação** · Épico 1, dia 3 de 4

**Hoje os verbos são COMPARAR e DECIDIR**

17 de setembro de 2026

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
| 10/09 | conferir | um julgamento defendido sobre uma notícia | feito |
| 11/09 | organizar | um dado que dá para usar | feito |
| **17/09** | **comparar e decidir** | **o painel e a recomendação** | **você está aqui** |
| 18/09 | refazer | o que ficou em aberto | |

</SlideTable>

**Você já produziu:** `01_dados` limpa e `02_limpeza` registrada, na sexta passada.

**Hoje você cria duas:** a `03_comparacoes` de manhã e a `04_painel` na segunda metade. A `04_painel` vale a menção do épico.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 3: Como funciona hoje -->

<!-- objetivo: aluno entende o formato da avaliação e que ela usa o próprio trabalho acumulado -->

# A avaliação é hoje, e é este arquivo

Não tem prova separada. Não tem conteúdo para decorar.

A primeira metade da aula é conteúdo novo: **critério**, **tabela dinâmica**, **padrão** e **relação**. A segunda metade é a avaliação, e ela usa o arquivo que você vem construindo desde a sexta.

**O que é avaliado:** os três indicadores do épico, de uma vez.

- De onde veio o dado e você sabe dizer (Indicador 4)
- O arquivo está organizado e o que você fez está registrado (Indicador 5)
- Você achou um padrão e transformou ele numa decisão defendida (Indicador 6)

Quem faltou na sexta ou não terminou: o arquivo de partida já vem pronto para todo mundo hoje, ver o próximo slide.

---
layout: center
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 4: Divisor comparar -->

# PRIMEIRO
## Comparar exige uma régua declarada
---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 5: Arquivo de partida -->

<!-- objetivo: aluno começa o dia com todos no mesmo ponto, sem perder HA em conserto -->

# Todo mundo começa do mesmo ponto

Abra o `dengue_pr_comparado.xlsx` e salve como **`painel_dengue_pr.xlsx`**.

Ele já vem com o dado limpo, a coluna **`casos_por_100mil`** calculada e a aba `03_comparacoes` em branco, esperando você.

<SlideTable compact>

| Por que já vem pronto | O que isso muda para você |
|---|---|
| são seis dias desde a limpeza | ninguém perde a aula consertando arquivo |
| a conta da taxa você já viu na sexta | hoje você **usa** a taxa, não recalcula |
| a avaliação é hoje | o tempo vai para o painel, que é o que vale |

</SlideTable>

**Guarde o seu arquivo da sexta.** Ele é a evidência do Indicador 5 e vai ser conferido junto.
---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 6: Confere a tarefa -->

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

<!-- SLIDE 7: A pergunta que parece fácil -->

# "Qual município teve mais dengue?"

Parece a pergunta mais simples do mundo.

Ela tem **duas respostas certas e diferentes**, e é isso que a aula de hoje resolve.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 8: Conceito critério -->

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

<!-- SLIDE 9: Duas réguas -->

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

<!-- SLIDE 10: Por que bruto engana -->

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

<!-- SLIDE 11: A conta -->

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

<!-- SLIDE 12: Exercício 1 -->

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

<!-- SLIDE 13: A virada -->

# Nenhuma das duas réguas é a certa

A régua certa é a que responde **a pergunta que você está fazendo**.

Por isso o critério vem antes da conta, e não depois.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 14: Conceito tabela dinâmica -->

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

<!-- SLIDE 15: Os campos -->

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

<!-- SLIDE 16: A armadilha da soma -->

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

<!-- SLIDE 17: Exercício 4 -->

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
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 18: O que o dado mede -->

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

<!-- SLIDE 19: O caso Campo Mourão -->

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

<!-- SLIDE 20: Conceito padrão -->

<!-- objetivo: aluno define padrão e distingue padrão de acaso -->

# Conceito 7: padrão

**Definição:** padrão é algo que **se repete de forma previsível**.

**Analogia:** o ônibus que passa lotado toda segunda de manhã. Não é sorte, é padrão. E por ser padrão, você pode sair mais cedo na segunda.

**O que não é padrão:** um pico isolado. Se março de 2025 tem muito caso e março de 2024 não tem, isso é acontecimento, não padrão. **Padrão precisa se repetir.**

**Como você testa:** olhe o mesmo recorte em mais de um período. É por isso que o arquivo tem 2024 **e** 2025, e não só um ano.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 21: Para que serve padrão -->

<!-- objetivo: aluno entende que o valor do padrão está em permitir agir antes -->

# Para que serve achar um padrão

Padrão serve para **agir antes**.

Se você só sabe que março teve muita dengue, você aprende história. Se você sabe que **todo** março tem muita dengue, você consegue chegar em fevereiro preparado.

**A conta que interessa:** o pico é em março. A campanha leva dois meses para fazer efeito, porque precisa eliminar o criadouro **antes** de o mosquito nascer.

Março menos dois meses dá **janeiro**. E como janeiro é férias e a mobilização é lenta, na prática se começa em dezembro.

> Uma campanha lançada em março chega junto com a doença. O dado não serviu para nada.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 22: Exercício 1 -->

# Exercício 1: o padrão se confirma?

Na aba `03_comparacoes`, monte uma tabela dinâmica com `mes` nas Linhas, `ano` nas Colunas e soma de `casos` nos Valores. Agora você vê 2024 e 2025 lado a lado.

**1.** O mês de pico é o mesmo nos dois anos?
**2.** Os meses de menor movimento são os mesmos nos dois anos?
**3.** Isso é padrão ou foi coincidência? Justifique com o que você viu.
**4.** Se existisse só o ano de 2025 no arquivo, você conseguiria responder a 3? Por quê?

<AdminOnly>

**Gabarito:**
1. Os dois anos concentram no primeiro quadrimestre, com pico entre março e abril.
2. Sim, o vale é no meio do ano, entre junho e agosto.
3. **É padrão**, porque se repete em dois anos independentes e tem explicação física: o mosquito depende de calor e chuva, que são sazonais no Paraná.
4. **Não.** Com um ano só, você não tem como distinguir padrão de acontecimento. Dois pontos já permitem desconfiar; mais anos deixariam mais seguro.

A 4 é o coração do exercício. Insista nela: é a diferença entre "eu vi" e "eu posso confiar no que vi".

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 23: Conceito relação -->

<!-- objetivo: aluno define relação e entende que ela liga dois atributos -->

# Conceito 8: relação

**Definição:** relação é quando **duas coisas variam juntas**. Uma sobe, a outra sobe. Ou uma sobe e a outra desce.

**Analogia:** quanto mais tempo você estuda, maior a nota. Nem sempre, nem exatamente, mas em geral as duas andam juntas.

**A diferença para padrão:** padrão olha **uma** coisa ao longo do tempo. Relação olha **duas** coisas ao mesmo tempo.

**No nosso dado:** a região Norte tem taxa alta e o Leste tem taxa baixa. Existe relação entre região e dengue? E entre tamanho da cidade e taxa?

---
layout: two-cols-text
card: true
bgPreset: default
---

<!-- SLIDE 24: Padrão x relação -->

<!-- objetivo: aluno separa os dois conceitos com exemplos do próprio dado -->

# Padrão

Uma coisa, ao longo do tempo.

"Todo ano, os casos disparam em março."

Serve para **antecipar**: você sabe quando vai acontecer de novo.

Se enxerga bem num gráfico de **linha**.

::right::

# Relação

Duas coisas, ao mesmo tempo.

"Quanto menor a cidade, maior a taxa por 100 mil."

Serve para **escolher onde agir**: você sabe onde procurar.

Se enxerga bem num gráfico de **dispersão**.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 25: O aviso -->

<!-- objetivo: aluno entende que relação não prova causa, aplicando ao próprio dado -->

# Relação não é causa

Duas coisas andarem juntas **não** quer dizer que uma causa a outra.

O Norte tem mais dengue que o Leste. A causa é ser Norte? Não. A causa é o clima: mais quente e mais úmido, o mosquito vive melhor. "Norte" é só o rótulo do lugar onde o clima é assim.

**Por que isso importa para a sua decisão:** se você acha que a causa é a região, você manda dinheiro para o Norte inteiro. Se você entende que a causa é o clima, você procura os lugares com aquele clima, estejam onde estiverem.

> Achar a relação é seu trabalho de hoje. Provar a causa exigiria outro dado, e a gente não tem.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 26: Exercício 2 -->

# Exercício 2: padrão ou relação?

Para cada frase, escreva **PADRÃO**, **RELAÇÃO** ou **NENHUM DOS DOIS**, e justifique em uma linha.

**1.** Os casos de dengue sobem no começo do ano e caem no meio.
**2.** Cidades menores tendem a ter taxa por 100 mil mais alta.
**3.** Londrina teve 32.804 casos em 2025.
**4.** A macrorregional Norte tem mais casos que a Leste nos dois anos.
**5.** Março de 2025 foi o pior mês do período.

<AdminOnly>

**Gabarito:**
1. **PADRÃO.** Uma coisa (casos) ao longo do tempo, repetindo nos dois anos.
2. **RELAÇÃO.** Duas coisas (tamanho e taxa) variando juntas.
3. **NENHUM.** É um fato isolado. Não se repete nem liga duas coisas. É dado, não é achado.
4. Aceite os dois com justificativa: é **RELAÇÃO** entre região e casos, e vira **PADRÃO** por se repetir nos dois anos.
5. **NENHUM.** Um pico isolado. Vira padrão só quando você mostra que março se repete.

**O que separa A de PA aqui:** a 3 e a 5 são as armadilhas. Quem chama fato isolado de padrão ainda não separou os conceitos.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 27: Divisor gráfico -->

# O GRÁFICO
## Ele não é enfeite do relatório

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 28: Cada gráfico responde uma coisa -->

<!-- objetivo: aluno escolhe o tipo de gráfico a partir da pergunta, não do gosto -->

# Cada tipo responde um tipo de pergunta

<SlideTable compact>

| Tipo | Responde | No nosso dado |
|---|---|---|
| **Linha** | como isso mudou ao longo do tempo? | casos por mês |
| **Barra** | qual é maior entre estas categorias? | casos por município |
| **Dispersão** | estas duas coisas andam juntas? | população contra taxa |

</SlideTable>

**A regra:** escolha o gráfico **depois** de escrever a pergunta, nunca antes. Quem escolhe o gráfico primeiro está decorando a tela, não respondendo nada.

**O que quase nunca serve:** pizza. Ela só funciona para mostrar pedaços de um todo, com poucas fatias. Com 17 municípios vira um mosaico ilegível.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 29: O gráfico errado esconde -->

<!-- objetivo: aluno vê que a escolha errada de gráfico apaga a resposta -->

# O gráfico errado esconde a resposta

Ponha os 17 municípios num gráfico de **linha**, no eixo de baixo.

O que você vê: 17 pontos ligados por uma linha que sobe e desce sem sentido nenhum.

**Por que não funciona:** a linha existe para mostrar continuidade. Entre março e abril existe continuidade, o tempo passa. Entre Londrina e Maringá não existe continuidade nenhuma: são categorias, e a ordem delas é arbitrária.

A mesma informação em **barra** responde na hora.

> Sinal de que o gráfico está errado: você precisa explicar o gráfico. Gráfico certo se explica sozinho.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 30: Gráfico legível -->

<!-- objetivo: aluno aplica as três regras que tornam um gráfico compreensível sozinho -->

# Três regras para o gráfico se explicar sozinho

**1. O título é uma frase, não um rótulo.** "Casos" não diz nada. "Casos de dengue por mês no Paraná, 2025" diz.

**2. Todo eixo tem unidade.** É casos? É casos por 100 mil? Sem unidade, o número não significa nada e ninguém consegue conferir.

**3. Um gráfico, uma ideia.** Se você precisa de duas frases para dizer o que ele mostra, ele está tentando mostrar duas coisas. Faça dois.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 31: Exercício 3 -->

# Exercício 3: qual gráfico

Para cada pergunta, diga o tipo de gráfico, o que vai no eixo de baixo e o que vai no de lado.

**1.** Em que mês a dengue dispara?
**2.** Qual macrorregional tem mais casos?
**3.** Cidade menor tem taxa maior?
**4.** A curva de 2025 é parecida com a de 2024?

<AdminOnly>

**Gabarito:**
1. **Linha.** Baixo: mês. Lado: casos.
2. **Barra.** Baixo: macrorregional. Lado: casos.
3. **Dispersão.** Baixo: população. Lado: casos por 100 mil. Um ponto por município.
4. **Linha com duas linhas**, uma por ano. Baixo: mês. Lado: casos. É a única das quatro que precisa de duas séries no mesmo gráfico, e ainda assim é uma ideia só: comparar o formato das curvas.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 32: Divisor decisão -->

# AGORA O PROBLEMA DE VERDADE
## As duas réguas discordam

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 33: O conflito -->

<!-- objetivo: aluno enxerga que o dado sustenta duas decisões diferentes e opostas -->

# Você tem reforço para mandar para uma cidade só

Olhe os dois rankings de 2025 que você mesmo montou.

<SlideTable compact>

| | Por casos absolutos | Por casos por 100 mil |
|---|---|---|
| 1º | **Londrina**, 32.804 casos | **Jacarezinho**, 8.467 por 100 mil |
| posição do outro | Jacarezinho é o 16º | Londrina é o 3º |

</SlideTable>

Jacarezinho é o **décimo sexto** em número de casos e o **primeiro** em gravidade proporcional.

Curitiba faz o caminho contrário: 7ª em casos, 15ª em taxa.

**Para onde vai o reforço?**

---
layout: two-cols-text
card: true
bgPreset: default
---

<!-- SLIDE 34: Os dois lados -->

<!-- objetivo: aluno reconhece que as duas escolhas têm sustentação e nenhuma é obviamente certa -->

# Quem defende Londrina

São **32.804 pessoas** doentes de verdade, contra 1.005 em Jacarezinho.

O hospital de Londrina está com fila agora. O de Jacarezinho, não.

Reforço serve para atender gente. Tem mais gente lá.

::right::

# Quem defende Jacarezinho

**8.467 de cada 100 mil** habitantes adoeceram. Em Curitiba foram 445.

Proporcionalmente, é a cidade onde a doença mais se espalhou.

Londrina é grande e tem estrutura própria. Jacarezinho é pequena e provavelmente não dá conta sozinha.

---
layout: center
card: true
bgPreset: animate
---

<!-- SLIDE 35: A regra -->

# As duas estão certas

O que **não** está certo é escolher sem dizer por quê.

Você vai ser avaliado pela **defesa**, não pela cidade que escolheu.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 36: O que faz uma recomendação valer -->

<!-- objetivo: aluno conhece a estrutura exata da recomendação que vai escrever na avaliação -->

# Uma recomendação tem quatro partes

Faltando qualquer uma, ela não se sustenta.

**1. A decisão.** O que fazer, onde e quando. Frase curta e direta.

**2. O critério.** Qual régua você usou, e por que ela é a certa **para esta decisão**.

**3. O número.** O dado que sustenta, com unidade. Tirado do seu arquivo.

**4. O que você está abrindo mão.** Escolher uma cidade é não escolher a outra. Diga o que se perde.

A parte 4 é a que quase todo mundo pula, e é a que mostra que você entendeu que era uma escolha.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 37: Exercício 4 -->

# Exercício 4: julguem as três recomendações

Para cada uma, diga quais das quatro partes estão presentes e quais faltam.

**A.** "Mandar o reforço para Londrina, porque teve mais casos."

**B.** "Mandar o reforço para Jacarezinho em janeiro. Critério: casos por 100 mil, porque reforço serve para conter espalhamento, e Jacarezinho teve 8.467 por 100 mil contra 5.578 de Londrina. Londrina fica sem reforço extra, mas tem hospital de referência próprio."

**C.** "Acho que deveria mandar para as duas, porque as duas estão ruins."

<AdminOnly>

**Gabarito:**
- **A.** Tem decisão e um resto de número. **Falta o critério declarado** ("mais casos" é vago: mais casos por que régua?), falta o número com unidade e falta o que se abre mão. Isso é Parcialmente Atendido.
- **B.** Tem as quatro. Decisão com prazo, critério ligado à natureza da decisão, dois números com unidade para comparar, e o custo assumido. Isso é Atendido.
- **C.** Não tem nenhuma. Não decidiu, não usou régua, não citou número e não abriu mão de nada. Isso é Não Atendido, e é o mais comum: parece prudente e é só fuga.

**Puxar com a turma:** a C é a resposta que mais aparece na vida real. Não decidir também é uma decisão, e é a única que ninguém consegue defender.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 38: Divisor avaliação -->

# AVALIAÇÃO DO ÉPICO
## Av01-T3: o painel de decisão

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 39: O que entregar -->

<!-- objetivo: aluno sabe exatamente o que precisa existir na aba 04_painel -->

# O que vai na aba `04_painel`

Cinco elementos, tudo numa aba só, que caiba numa tela sem rolar.

**1. A pergunta**, escrita no topo, com o recorte (lugar e período).

**2. Um gráfico de padrão.** O que se repete no tempo. Título em frase e eixo com unidade.

**3. Um gráfico de relação.** Duas coisas que andam juntas. Mesmas regras.

**4. A recomendação**, com as quatro partes do slide 21.

**5. Uma pergunta que este dado não responde**, e qual dado faltaria.

O elemento 5 vem direto do que você escreveu ontem. Ele não é enfeite: é o que mostra que você sabe até onde o seu próprio trabalho vale.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 40: Como você é avaliado -->

<!-- objetivo: aluno conhece os critérios antes de produzir, não depois -->

# Como você é avaliado

Três indicadores, num instrumento só, porque é um trabalho só desde terça.

**Indicador 4:** você sabe dizer de onde veio o dado, sem procurar.

**Indicador 5:** o arquivo está organizado, as abas fazem sentido, e a limpeza que você fez está registrada e dá para conferir.

**Indicador 6:** você achou um padrão e uma relação de verdade, escolheu um critério, decidiu, e assumiu o que estava abrindo mão.

> Não existe nota. As menções são **Atendido**, **Parcialmente Atendido** e **Não Atendido**, por indicador.

<AdminOnly>

**Rubrica Av01-T3**

**Indicador 4, acessa e utiliza navegadores com critérios de confiabilidade**
- **A:** aba de origem completa, e ele distingue a data do dado da data de acesso quando perguntado.
- **PA:** aba existe mas incompleta, ou confunde as duas datas.
- **NA:** não sabe dizer de onde veio o arquivo.

**Indicador 5, organiza e armazena com autonomia e criticidade**
- **A:** quatro abas nomeadas, 408 linhas, `02_limpeza` com uma linha por conserto, coluna de taxa correta em todas as linhas.
- **PA:** dados limpos mas sem registro do que foi feito, ou contagem de linhas errada, ou limpeza incompleta.
- **NA:** arquivo ainda com defeitos, ou trabalhou num arquivo novo em vez do acumulado.

**Indicador 6, organiza e analisa identificando padrões e relações que orientem decisões**
- **A:** padrão sustentado nos dois anos, relação identificada, os dois gráficos corretos para as perguntas, e recomendação com as **quatro** partes, incluindo o que abre mão.
- **PA:** achou o padrão e montou gráfico, mas a recomendação não declara critério, ou não cita número, ou não assume o custo. **Achar o padrão e não concluir nada é PA**, é a fronteira mais comum.
- **NA:** sem padrão, ou gráfico que não responde à pergunta, ou nenhuma decisão tomada.

**Fronteira que mais vai aparecer:** aluno com painel bonito, gráfico certo e recomendação sem critério declarado. Isso é PA no Indicador 6, por mais caprichado que esteja.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 41: Os passos -->

<!-- objetivo: aluno executa a avaliação sem depender de instrução verbal -->

# Na avaliação: seis passos

**1.** Abra o `painel_dengue_pr.xlsx`. Crie a aba `04_painel`.

**2.** Escreva a pergunta no topo, com lugar e período.

**3.** Monte o gráfico de padrão. Confira o título e a unidade do eixo.

**4.** Monte o gráfico de relação. Mesma conferência.

**5.** Escreva a recomendação com as quatro partes. Use o slide 21 como checklist.

**6.** Escreva a pergunta que o dado não responde e o que faltaria.

> É individual. Consultar o próprio arquivo, o caderno e os slides é permitido e esperado. Copiar o painel do colega, não: os critérios de vocês vão ser diferentes, e isso aparece.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 42: Checklist -->

<!-- objetivo: aluno confere a própria entrega antes de encerrar -->

# Checklist de entrega

- [ ] Aba `04_painel` criada, cabendo numa tela
- [ ] Pergunta escrita com lugar e período
- [ ] Gráfico de padrão, com título em frase e eixo com unidade
- [ ] Gráfico de relação, com as mesmas regras
- [ ] Recomendação com **as quatro** partes
- [ ] A parte 4 escrita de verdade: o que você está abrindo mão
- [ ] Pergunta que o dado não responde, com o dado que faltaria
- [ ] Arquivo salvo com as quatro abas

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 43: Amanhã -->

<!-- objetivo: aluno sabe o que acontece no último dia do épico -->

# Amanhã: dia 4 de 4, e a disciplina fecha

Amanhã é o último dia de Fundamentos de Computação neste trimestre.

**Quem ficou com alguma parte em aberto refaz só aquela parte.** Não é prova nova, não é do zero: é a camada específica que faltou.

Depois de amanhã a menção está lançada e a disciplina não volta. Começa a próxima.

Vale a pena olhar hoje à noite o seu checklist e ver o que ficou faltando.

---
layout: end
card: true
bgPreset: palette
github: LeoZanini
avatar: https://github.com/LeoZanini.png?size=256
---

<!-- SLIDE 44: Encerramento -->

# Até amanhã

Terça você organizou. Quarta você comparou. Hoje você decidiu e assinou embaixo.

Isso é o que separa quem mexe em planilha de quem trabalha com dado.
