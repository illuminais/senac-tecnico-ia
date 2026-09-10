---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 54"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 54"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-09-10"
unlockHour: 13
layout: cover
---

<!-- SLIDE 1: Capa -->

# Aula 54
## O dado que ninguém consegue usar

**UC01 Fundamentos de Computação** · Épico 1, dia 1 de 4

**Hoje o verbo é ORGANIZAR**

10 de setembro de 2026

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
| **10/09** | **organizar** | **um dado que dá para usar** | **você está aqui** |
| 11/09 | comparar | as comparações que o dado permite | |
| 17/09 | analisar e decidir | o painel e a recomendação | |
| 18/09 | refazer | o que ficou em aberto | |

</SlideTable>

Quatro dias, **um arquivo só**. Ele ganha uma aba por dia e no fim vira a resposta.

Depois de 18/09 esta disciplina encerra e não volta.

---
layout: center
card: true
bgPreset: animate
---

<!-- SLIDE 3: A pergunta -->

# A pergunta dos quatro dias

## "Em que mês e em que região o Paraná deveria concentrar a campanha contra a dengue?"

Quem responde isso decide onde vai gente, dinheiro e propaganda.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 4: O arquivo -->

<!-- objetivo: aluno percebe que o obstáculo não é a pergunta, é o estado do dado -->

# Você já tem o dado

Abra o arquivo `dengue_pr_bruto.xlsx`.

Ele tem casos de dengue de **17 municípios do Paraná**, mês a mês, em 2024 e 2025. É dado real, do InfoDengue, que é um projeto da Fiocruz com a FGV.

A resposta da pergunta está aí dentro.

**Agora tente responder.** Qual município teve mais casos em 2025?

---
layout: center
card: true
bgPreset: animate
---

<!-- SLIDE 5: O problema -->

# Não dá.

E não é porque você não sabe Excel.

É porque **este arquivo não está em condição de ser usado**, e ninguém nunca te mostrou como deixar um arquivo em condição de ser usado.

Isso é a aula de hoje.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 6: Glossário do épico -->

<!-- objetivo: aluno registra as cinco palavras que vai usar nos quatro dias para nomear o que está fazendo -->

# As cinco palavras dos quatro dias

Copie no caderno. São as **únicas** palavras novas do épico inteiro. Nos quatro dias você vai usar estas cinco e nenhuma outra.

<SlideTable compact>

| Palavra | O que quer dizer | Entra em |
|---|---|---|
| **registro** | uma ocorrência do mundo real, virada linha | hoje |
| **atributo** | uma característica do registro, virada coluna | hoje |
| **critério** | a régua que decide qual opção ganha | amanhã |
| **padrão** | algo que se repete de forma previsível | 17/09 |
| **relação** | duas coisas que variam juntas | 17/09 |

</SlideTable>

Se você não consegue nomear o que está fazendo, você não consegue repetir depois.

---
layout: center
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 7: Divisor bloco A -->

# PRIMEIRO
## De onde veio este arquivo?

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 8: Proveniência dentro do arquivo -->

<!-- objetivo: aluno registra a origem do dado dentro do próprio arquivo, não em papel solto -->

# Isso vocês já sabem fazer

Vocês já julgaram fonte, já preencheram ficha, já separaram confiável de duvidosa. Hoje não tem teoria nova sobre isso.

Muda **onde** o registro fica. Ficha em papel se perde. A origem tem que morar **dentro do arquivo**, colada no dado.

Três campos, numa aba só, e acabou:

<SlideTable compact>

| Campo | O que escrever |
|---|---|
| Quem produziu | o nome da instituição |
| A que período se refere | não é a data em que você baixou |
| Endereço | o link completo |

</SlideTable>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 9: Exercício 1 -->

# Exercício 1: a origem deste arquivo

Está tudo escrito no topo da planilha. Abra, leia, e responda no caderno.

**1.** Quem produziu o dado?
**2.** A que período ele se refere?
**3.** Qual o endereço da fonte?
**4.** O arquivo foi acessado em 09/09/2026. O dado é de 2024 e 2025. **Por que essas duas datas são diferentes, e qual delas importa para a nossa pergunta?**

<AdminOnly>

**Gabarito:**
1. InfoDengue, projeto da Fiocruz com a FGV
2. Casos prováveis de dengue, 2024 e 2025, por mês
3. `info.dengue.mat.br`
4. Uma é quando o professor baixou, a outra é o período que o dado mede. Para decidir a campanha importa a **do dado**: o que aconteceu em 2024 e 2025. A data do acesso serve só para saber se existe versão mais nova.

A 4 é a que separa quem entendeu de quem copiou. Insista nela.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 10: Divisor bloco B -->

# AGORA O ASSUNTO NOVO
## O que é uma tabela que dá para usar

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 11: Conceito registro -->

<!-- objetivo: aluno define registro e reconhece um registro numa tabela -->

# Conceito 1: registro

**Definição:** registro é **uma ocorrência do mundo real** transformada em uma linha.

**Analogia:** a lista de chamada. Cada aluno é um registro. Uma linha por aluno, sempre.

**No nosso arquivo:** um registro é "os casos de dengue de **um** município, em **um** mês, de **um** ano". Londrina em março de 2025 é um registro. Londrina em abril de 2025 é outro.

**Para que serve saber isso:** se você não sabe qual é o seu registro, você não sabe quantas linhas a tabela deveria ter. E se você não sabe isso, não tem como saber se limpou certo.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 12: Conceito atributo -->

<!-- objetivo: aluno define atributo e distingue atributo de registro -->

# Conceito 2: atributo

**Definição:** atributo é **uma característica** do registro, transformada em uma coluna.

**Analogia:** ainda na chamada. Nome, matrícula e presença são atributos do aluno. Cada um na sua coluna.

**No nosso arquivo:** município, macrorregional, ano, mês, casos e população são atributos. Seis características do mesmo registro.

**A confusão comum:** achar que "março" é um atributo. Não é. `mes` é o atributo. `março` é o **valor** que o atributo tem naquele registro.

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 13: A regra de ouro -->

<!-- objetivo: aluno memoriza a regra que define uma tabela analisável -->

# A regra de ouro da tabela

Uma tabela dá para usar quando as três valem ao mesmo tempo:

**1.** Um registro por linha
**2.** Um atributo por coluna
**3.** Um tipo de dado por coluna

Quebre qualquer uma das três e o Excel para de funcionar. Não é frescura de organização: é o que faz soma, filtro e gráfico existirem.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 14: Exercício 2 -->

# Exercício 2: qual delas dá para usar?

Três formas de guardar o mesmo dado. No caderno, diga qual respeita a regra de ouro e **qual das três regras** as outras quebram.

**A.** Uma coluna `municipio` e doze colunas: `jan`, `fev`, `mar`, ... `dez`

**B.** Uma coluna `municipio`, uma coluna `mes`, uma coluna `casos`

**C.** Uma coluna `municipio` e uma coluna `dados`, com "março: 8300, abril: 5200" escrito dentro

<AdminOnly>

**Gabarito:**
- **B é a correta.** Um registro por linha (município + mês), um atributo por coluna, um tipo por coluna.
- **A quebra a regra 2.** `jan` não é um atributo, é um valor do atributo `mes`. Com essa forma, para somar o ano você precisa mexer em doze colunas, e se aparecer 2026 você tem que criar coluna nova.
- **C quebra a regra 3 e a 2.** A coluna `dados` tem texto e número misturados. O Excel não soma, não filtra e não ordena nada ali dentro.

**Puxar com a turma:** a forma A é a que quase todo mundo faz sozinho, porque é a que fica bonita na tela. Bonita de ler e boa de calcular são coisas diferentes.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 15: Conceito tipo -->

<!-- objetivo: aluno entende que a planilha trata número, texto e data de formas diferentes -->

# Conceito 3: tipo de dado

**Definição:** tipo é **o que a planilha acha que aquilo é**. Número, texto ou data.

**Analogia:** o número da sua casa e o seu telefone são os dois feitos de algarismos. Ninguém soma os dois. A planilha precisa saber qual é qual, e ela não adivinha.

**O problema:** `1005` pode estar guardado como número (e soma) ou como texto (e não soma). Na tela os dois parecem iguais.

**Por que isso arruína tudo:** uma coluna com número e texto misturados soma **só uma parte**, e não avisa. O resultado sai errado com cara de certo.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 16: Como enxergar o tipo -->

<!-- objetivo: aluno identifica visualmente o tipo de uma célula sem clicar nela -->

# Como enxergar o tipo sem clicar

O Excel te conta o tempo todo, pelo **alinhamento**:

<SlideTable compact>

| O que você vê | O que é |
|---|---|
| encostado na **direita** | número ou data. Ele calcula |
| encostado na **esquerda** | texto. Ele não calcula |
| triangulinho verde no canto | ele desconfia que virou texto sem querer |

</SlideTable>

Isso vale mesmo se você não mexer em nada. Uma coluna de números com algumas células à esquerda tem defeito, e você vê isso de longe.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 17: Exercício 3 -->

# Exercício 3: leia o alinhamento

Abra o arquivo e vá até a coluna `casos`. Não clique em nada ainda. Só olhe.

**1.** Todas as células estão alinhadas do mesmo lado?
**2.** Aponte **três linhas** onde o valor está do lado errado.
**3.** Se você somar essa coluna inteira agora, o resultado vai vir maior, menor ou igual ao verdadeiro? Por quê?

<AdminOnly>

**Gabarito:**
1. Não. A maioria está à direita, e um punhado está à esquerda.
2. Varia por aluno. O que interessa é ele achar sozinho, olhando.
3. **Menor.** As células de texto são ignoradas pela soma. Some 73 valores que existem na tela e não entram na conta.

**O ponto pedagógico:** o Excel não dá erro. Ele devolve um número menor, com cara de resposta certa. Erro que aparece é fácil; o perigoso é esse.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 18: Divisor bloco C -->

# ANTES DE CONSERTAR
## Como se descobre o que está quebrado

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 19: O método -->

<!-- objetivo: aluno aprende o procedimento de diagnóstico que vai aplicar no laboratório -->

# Conceito 4: diagnosticar antes de consertar

Quatro passos, sempre nesta ordem. É o mesmo método de quem conserta qualquer coisa.

**1. Diagnosticar.** Qual é o sintoma? Descreva sem chutar a causa.
**2. Levantar hipótese.** O que poderia causar esse sintoma? Escreva mais de uma.
**3. Testar.** Faça um teste que elimine uma hipótese de cada vez.
**4. Validar.** Depois de consertar, prove que consertou.

**O erro que todo mundo comete:** pular do passo 1 direto para o conserto, sem hipótese e sem teste. Aí conserta a coisa errada e o problema volta.

---
layout: code-output
outputLabel: "O que o Excel devolveu"
outputTone: error
---

<!-- SLIDE 20: O teste que revela -->

<!-- objetivo: aluno vê o sintoma concreto que vai investigar -->

# O teste que revela tudo

```text
=SOMA(G4:G442)
```

::output::

```text
um número. Mas é o número certo?
```

::note::

<AdminOnly>

A soma da coluna inteira vem **inflada**, apesar de o defeito do texto tirar valores. Motivo: as 17 linhas de TOTAL e as 14 duplicatas somam muito mais do que os 73 valores em texto tiram.

Deixe eles descobrirem o sentido do erro sozinhos no Exercício 4. Não entregue.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 21: Exercício 4 -->

# Exercício 4: levante as hipóteses

Você somou a coluna `casos` inteira. O número não bate com a realidade.

No caderno, **antes de olhar a planilha de novo**, escreva:

**1.** Três hipóteses diferentes para a soma estar errada.
**2.** Para cada hipótese, **um teste** que provaria se ela é verdade.
**3.** A soma pode estar errada para **mais** e para **menos** ao mesmo tempo? Explique.

<AdminOnly>

**Gabarito (hipóteses esperadas):**
- Tem linha repetida, então algo é contado duas vezes. **Teste:** ordenar por município e mês e procurar linhas iguais coladas.
- Tem linha de total no meio dos dados, e o total entra na soma. **Teste:** filtrar a coluna município e procurar valores que não são nome de cidade.
- Tem número guardado como texto que ficou de fora. **Teste:** contar quantas células a função CONT.NÚM enxerga e comparar com o número de linhas.

**3. Sim, e é o que acontece aqui.** Os totais e as duplicatas empurram para cima, o texto puxa para baixo. Por isso não adianta olhar só se o número é grande ou pequeno: os erros se escondem um atrás do outro.

Este é o exercício mais importante do dia.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 22: Divisor bloco D -->

# OS SEIS DEFEITOS
## Cada um quebra uma coisa específica

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 23: Defeito 1 -->

<!-- objetivo: aluno identifica célula mesclada e sabe por que ela impede filtro e tabela dinâmica -->

# Defeito 1: célula mesclada

**O que é:** duas ou mais células viradas uma só, para caber um título bonito no topo.

**Como aparece aqui:** o título ocupa da célula A1 até a H2. Por causa dele, o cabeçalho das colunas **não está na linha 1**, está na linha 3.

**O que quebra:** filtro e tabela dinâmica. As duas ferramentas procuram o nome das colunas na primeira linha. Achando um título mesclado, elas desistem ou tratam o título como nome de coluna.

**Como consertar:** selecione as linhas 1 e 2 inteiras e exclua. O título não some do mundo: ele vai para a aba de origem, junto com os três campos do Exercício 1.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 24: Defeito 2 -->

<!-- objetivo: aluno converte texto em número e valida a conversão -->

# Defeito 2: número guardado como texto

**O que é:** um número que a planilha está tratando como palavra.

**Como aparece aqui:** parte da coluna `casos`, encostada na esquerda, com triangulinho verde.

**O que quebra:** soma, média e ordenação. Ordenar texto coloca `1005` antes de `213`, porque compara letra por letra: o `1` vem antes do `2`.

**Como consertar:** selecione a coluna, clique no aviso do triangulinho e escolha converter em número. Ou use Dados, Texto para Colunas, e conclua sem mudar nada, o que força a releitura de tudo.

**Como validar:** depois de converter, nenhuma célula pode continuar à esquerda.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 25: Defeito 3 -->

<!-- objetivo: aluno reconhece mistura de formatos de data e escolhe uma saída -->

# Defeito 3: data em três formatos

**O que é:** a mesma informação escrita de jeitos diferentes na mesma coluna.

**Como aparece aqui:** a coluna `data_referencia` tem data de verdade, tem texto no formato `01/03/2025` e tem texto no formato `mar/2025`.

**O que quebra:** ordenação cronológica e agrupamento por mês. Como parte é texto, ordenar coloca `abr` antes de `jan`, em ordem alfabética.

**Como consertar:** você **não precisa** dessa coluna. As colunas `ano` e `mes` já têm a mesma informação, em número, sem defeito. Apague `data_referencia`.

> Reconhecer que uma coluna é redundante e apagar é decisão de quem entendeu o dado. Consertar por consertar é trabalho à toa.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 26: Defeito 4 -->

<!-- objetivo: aluno percebe que grafia inconsistente multiplica categorias -->

# Defeito 4: a mesma categoria escrita de quatro jeitos

**O que é:** `Norte`, `norte`, `NORTE` e `Norte ` com espaço no fim. Para você é a mesma região. Para o Excel são **quatro regiões diferentes**.

**Como aparece aqui:** as quatro macrorregionais viram dezesseis.

**O que quebra:** agrupar por região, CONT.SE e tabela dinâmica. Amanhã você vai comparar regiões. Com dezesseis regiões, a comparação não existe.

**Como consertar:** use Localizar e Substituir na coluna, uma grafia de cada vez, até sobrarem quatro. O espaço no fim é o mais traiçoeiro, porque é invisível.

**Como validar:** monte uma lista dos valores diferentes da coluna. Tem que dar exatamente quatro.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 27: Defeito 5 -->

<!-- objetivo: aluno remove duplicatas com critério, sabendo o que define uma repetição -->

# Defeito 5: linha duplicada

**O que é:** o mesmo registro aparecendo duas vezes.

**Como aparece aqui:** linhas repetidas exatas, cada uma logo abaixo da original.

**O que quebra:** qualquer soma. O município repetido fica com casos a mais e sobe no ranking sem merecer.

**Como consertar:** Dados, Remover Duplicatas. Mas atenção ao que você marca: duas linhas com o mesmo município **não** são duplicata, porque o mesmo município aparece em doze meses. O que define a repetição aqui é município **mais** ano **mais** mês, os três juntos.

> Marcar coluna demais não apaga nada. Marcar coluna de menos apaga dado bom. Pense no seu registro antes de clicar.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 28: Defeito 6 -->

<!-- objetivo: aluno localiza e remove linhas de agregação misturadas aos dados -->

# Defeito 6: total no meio dos dados

**O que é:** linhas de resumo salvas junto com os dados, como `TOTAL Londrina`.

**Como aparece aqui:** uma linha dessas no fim de cada município.

**O que quebra:** a soma, e é o pior dos seis, porque conta tudo **duas vezes**: uma nas linhas do município e outra na linha de total.

**Como consertar:** filtre a coluna `municipio` e procure os valores que não são nome de cidade. Selecione e exclua as linhas.

**Por que isso é tão comum:** quem montou a planilha queria ler o total na tela. Total é resultado, não é dado. Resultado se calcula na hora, não se guarda junto com o que o gerou.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 29: Exercício 5 -->

# Exercício 5: quem quebra o quê

No caderno, ligue cada defeito à operação que ele estraga. Um defeito pode estragar mais de uma.

**Defeitos:** célula mesclada · número como texto · data em três formatos · categoria em quatro grafias · linha duplicada · total no meio

**Operações:** somar a coluna · ordenar do maior para o menor · filtrar por região · agrupar por mês · criar tabela dinâmica

<AdminOnly>

**Gabarito:**

| Defeito | Estraga |
|---|---|
| célula mesclada | filtrar, tabela dinâmica |
| número como texto | somar, ordenar |
| data em três formatos | ordenar, agrupar por mês |
| categoria em quatro grafias | filtrar, agrupar, tabela dinâmica |
| linha duplicada | somar |
| total no meio | somar, ordenar |

**Puxar:** somar aparece em quatro dos seis. Por isso a soma é o melhor teste de diagnóstico: é o que mais dá errado, então é o que mais denuncia.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 30: Divisor laboratório -->

# LABORATÓRIO
## Agora você conserta

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 31: O log de limpeza -->

<!-- objetivo: aluno entende por que registrar a limpeza e com que formato -->

# A aba que ninguém pensa em fazer

Você vai consertar seis coisas. Daqui a uma semana você não vai lembrar de nenhuma.

Pior: quem receber seu arquivo não tem como saber se aquele número sempre foi assim ou se você mexeu.

Por isso existe a aba **`02_limpeza`**. Uma linha por conserto:

<SlideTable compact>

| Defeito | O que eu fiz | Linhas afetadas |
|---|---|---|
| total no meio | excluí as linhas TOTAL | 17 |
| linha duplicada | removi duplicatas por município, ano e mês | 14 |

</SlideTable>

Sem essa aba, no dia 17 você não consegue defender nenhum número seu.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 32: Quantas linhas deveria ter -->

<!-- objetivo: aluno calcula sozinho o critério de validação da própria limpeza -->

# Como saber se você limpou certo

Você não precisa perguntar para ninguém. **Você consegue calcular quantas linhas o arquivo deveria ter.**

Volte na definição de registro: um município, em um mês, de um ano.

- Quantos municípios tem no arquivo?
- Quantos meses tem um ano?
- Quantos anos o arquivo cobre?

Multiplique os três. Esse é o número de linhas que a tabela limpa **tem** que ter.

<AdminOnly>

17 municípios × 12 meses × 2 anos = **408 linhas** de dado, mais a linha de cabeçalho.

Antes de limpar são 439. Se ele chegar em 439, não tirou totais nem duplicatas. Se passar de 408 para baixo, apagou dado bom.

Não entregue o 408. Fazer eles calcularem é a parte "validação de resultados" do indicador, e é articulação direta com Matemática.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 33: Os passos -->

<!-- objetivo: aluno executa a limpeza sem depender de instrução verbal -->

# No laboratório: sete passos

**1.** Abra `dengue_pr_bruto.xlsx` e salve como **`painel_dengue_pr.xlsx`**. O original fica intacto.

**2.** Renomeie a primeira aba para `01_dados`.

**3.** Crie a aba `02_limpeza` com as três colunas do slide anterior.

**4.** Calcule quantas linhas a tabela limpa deve ter. Escreva esse número na aba `02_limpeza`.

**5.** Conserte os seis defeitos. **Um de cada vez**, registrando cada um na aba `02_limpeza` antes de passar para o próximo.

**6.** Confira o número de linhas contra o que você calculou no passo 4.

**7.** Some a coluna `casos` de novo e compare com a soma de antes.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 34: Regras do laboratório -->

<!-- objetivo: aluno trabalha de forma que o próprio trabalho seja verificável depois -->

# Duas regras

**Um defeito de cada vez, registrando antes de seguir.** Consertar seis coisas de uma vez e depois descobrir que quebrou alguma é o jeito mais rápido de perder a aula inteira.

**Não digite número na mão.** Se você corrigir um valor digitando por cima, ninguém nunca mais vai saber que aquilo foi você. Conserto é operação, não digitação.

> Travou? Chame. Mas antes tenha uma hipótese escrita: "acho que é isto porque aquilo". Chamar com hipótese é diferente de chamar sem.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 35: Checklist -->

<!-- objetivo: aluno sabe exatamente o que precisa mostrar para receber o visto -->

# Checklist para o visto

Chame quando os sete estiverem prontos. O visto de hoje conta para o Indicador 5.

- [ ] Exercícios 1 a 5 feitos no caderno
- [ ] Arquivo salvo como `painel_dengue_pr.xlsx`
- [ ] Aba `01_dados` sem os seis defeitos
- [ ] Aba `02_limpeza` com uma linha por conserto e o número de linhas esperado
- [ ] Contagem de linhas batendo com o que você calculou
- [ ] A coluna `casos` soma inteira, sem célula à esquerda
- [ ] A coluna `macrorregional` tem exatamente quatro valores diferentes

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 36: Tarefa de casa (1 de 2) -->

<!-- tarefa de casa: aula 54 -->

# Tarefa de Casa: Aula 54

> **Prazo: início da aula de amanhã, 11/09.** Vale no caderno.

**1.** Escreva com suas palavras o que é **registro** e o que é **atributo**, dando um exemplo que **não** seja dengue e não seja chamada de aula.

**2.** Dos seis defeitos, qual foi o mais difícil de achar no seu arquivo? Escreva por que ele foi difícil.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 37: Tarefa de casa (2 de 2) -->

# Tarefa de Casa: Aula 54 (cont.)

**3.** A coluna `populacao` está lá e você não usou ela hoje. Escreva uma pergunta sobre dengue que **só** dá para responder tendo a população junto com os casos.

**4.** Amanhã você vai comparar municípios. Escreva agora, sem abrir a planilha, qual município você **acha** que teve mais dengue no Paraná em 2025, e por quê.

> A 4 não tem certo nem errado hoje. Ela vai ser conferida amanhã contra o dado, e é para ser guardada.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 38: Amanhã -->

<!-- objetivo: aluno entende a dependência entre os dias e o que precisa trazer -->

# Amanhã: dia 2 de 4

Amanhã o verbo muda de **organizar** para **comparar**.

Você abre o **mesmo arquivo**, o `painel_dengue_pr.xlsx` que você acabou de fazer, e cria a aba `03_comparacoes` em cima dele.

**Amanhã começa com o seu arquivo de hoje na tela.** Quem não terminar hoje, termina no começo da aula, e perde o começo da aula.

Faltou hoje? Existe uma cópia já limpa para você copiar e entrar junto. Peça no início da aula.

---
layout: end
card: true
bgPreset: palette
github: LeoZanini
avatar: https://github.com/LeoZanini.png?size=256
---

<!-- SLIDE 39: Encerramento -->

# Até amanhã

Hoje você pegou um arquivo que não respondia nada e deixou ele pronto para responder.

Isso tem nome de profissão.
