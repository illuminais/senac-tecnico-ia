---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 44"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 44"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-08-06"
layout: cover
---

<!-- SLIDE 1 -->

# Aula 44
## Abrigo de Adoção: SQL em Trilhas + Estatística Aplicada

> Banco de Dados (UC08) e Estatística Aplicada (UC09): a mesma tabela, dois instrumentos de avaliação separados.

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
aulaNum: "Aula 44"
---

<!-- SLIDE 2 -->

<!-- objetivo: aluno reconhece que hoje a tabela abrigo vai ser usada para tomar decisões reais, não só para praticar sintaxe (indicador T2-Ind.5) -->

# BLOCO 1
## Banco de Dados: o abrigo de adoção

Hoje a turma vira um pequeno sistema de decisão. Cada consulta SQL que vocês escreverem vai ajudar a decidir quem sai do abrigo primeiro.

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 44"
---

<!-- SLIDE 3 -->

<!-- debate: aula 44 -->

# Debate: Quem o abrigo deveria priorizar?

**Escolham um lado, 5 minutos**

**O abrigo só consegue encaminhar poucos animais por semana para adoção. Quem deveria sair primeiro?**

- Time A defende os filhotes: `idade_meses` baixa, porque filhotes se adaptam mais rápido e têm maior taxa de adoção. Ex: Rex, cão, grande, 3 meses, 10 dias no abrigo
- Time B defende quem espera há mais tempo: `dias_no_abrigo` alto, porque é mais urgente e mais justo. Ex: Mel, gata, pequeno, 48 meses, 210 dias no abrigo
- Cada grupo escolhe 2 a 3 animais reais da tabela `abrigo` para justificar o lado escolhido, não vale opinião solta

> **Conexão futura:** `idade_meses` e `dias_no_abrigo` são exatamente as colunas que vocês vão usar em `WHERE` e `ORDER BY` daqui a pouco.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 4 -->

<!-- objetivo: aluno identifica cada coluna da tabela abrigo e o tipo de informação que ela guarda, antes de escrever qualquer SELECT -->

# Conheça o abrigo

Todo animal que chega no abrigo vira uma linha na tabela `abrigo`. Cada coluna guarda um pedaço da história dele.

- `nome_animal`: o nome que a equipe do abrigo deu ao bicho
- `especie`: cão ou gato
- `porte`: pequeno, médio ou grande

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 5 -->

<!-- objetivo: aluno completa o mapeamento das colunas do abrigo, agora as numéricas e a de status, e dimensiona o tamanho real da base -->

# Conheça o abrigo: mais colunas

Continuando o mapeamento da tabela `abrigo`:

- `idade_meses`: idade em meses, facilita comparar filhote com adulto
- `dias_no_abrigo`: há quantos dias ele está esperando um lar
- `adotado`: 'sim' se já foi adotado, 'não' se ainda está esperando

<v-click>

A tabela real tem cerca de 27 animais, um para cada pessoa da turma. Ela já está carregada no sqliteonline.com.

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 6 -->

<!-- objetivo: aluno faz uma autoverificação rápida de memorização das colunas do abrigo, quebrando a sequência de teoria antes de ver os exemplos reais -->

# Checkpoint rápido: levante a mão

**30 segundos, sem escrever nada**

Levante a mão quem consegue dizer de cabeça, sem olhar pra trás, pelo menos 4 das 6 colunas da tabela `abrigo`.

- Quem levantou a mão: confere mentalmente contra as 6 colunas enquanto o professor lista de novo
- Quem não levantou: essa é a deixa pra revisar antes de ver os exemplos reais na tabela

> **Próximo passo:** ver esses nomes de coluna aplicados em animais de verdade.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 7 -->

<!-- objetivo: aluno visualiza exemplos reais de linhas da tabela abrigo antes de escrever consultas -->

# Conheça o abrigo (cont.)

Alguns animais da tabela `abrigo`:

<SlideTable compact fullWidth>

| nome_animal | especie | porte | idade_meses | dias_no_abrigo | adotado |
|---|---|---|---|---|---|
| Rex | cão | grande | 3 | 10 | não |
| Mel | gata | pequeno | 48 | 210 | não |
| Nina | gata | médio | 6 | 22 | sim |
| Thor | cão | grande | 60 | 5 | não |
| Luna | gata | pequeno | 2 | 8 | não |
| Bento | cão | médio | 84 | 180 | sim |
| Fred | cão | pequeno | 12 | 45 | não |
| Amora | gata | grande | 36 | 130 | não |

</SlideTable>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 8 -->

<!-- objetivo: aluno relaciona os dados concretos da tabela (Rex vs. Mel) com o dilema apresentado no debate inicial -->

# Conheça o abrigo: o dilema nos dados

Repare: Rex é filhote (3 meses), mas está há pouco tempo esperando. Mel é bem mais velha e está esperando há muito mais tempo. É exatamente o dilema do debate.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 9 -->

<!-- objetivo: aluno se autoavalia sobre SQL básico para se posicionar na trilha correta antes da prática -->

# Diagnóstico rápido (no papel, ~10min)

Responda no caderno, sem consultar nada. Não é prova, é só para saber onde te colocar.

1. Você lembra a ordem de `SELECT`, `FROM` e `WHERE` sem olhar em lugar nenhum?
2. Você já escreveu sozinho um `GROUP BY`, sem copiar de algum lugar?
3. Você sabe explicar com suas palavras o que `COUNT(*)` faz?

> Guarde suas respostas. Elas vão apontar se você vai para a Trilha A ou a Trilha B no próximo slide.

<AdminOnly>

**Critério de corte (uso do professor, não é resposta certa/errada para o aluno ver):**
- 3 respostas "sim" com confiança: Trilha B (subquery)
- 2 ou mais respostas "não", ou insegurança nas 3: Trilha A (revisão)
- Casos de dúvida: cruzar com o desempenho observado em A36/A41 antes de decidir

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 10 -->

<!-- objetivo: aluno entende a divisão em trilhas e a regra de registrar a query no papel antes de digitar -->

# Duas trilhas, uma tabela

A turma toda usa a mesma tabela `abrigo`, mas em dois ritmos diferentes.

- **Trilha A** (revisão): reforça `SELECT`, `WHERE`, `ORDER BY` e `GROUP BY`
- **Trilha B** (novo): usa tudo isso e aprende subquery, uma consulta dentro da consulta

<v-click>

**Regra obrigatória nas duas trilhas: papel antes do PC.**

Escreva a query à mão no caderno antes de digitar no sqliteonline.com. Isso é o seu "visto": mostra que você pensou a consulta, não só copiou uma tela.

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 11 -->

<!-- objetivo: aluno recorda o esqueleto de sintaxe SQL sem receber uma query pronta -->

# Colinha de sintaxe SQL

Esta colinha só destrava a estrutura. Ela não te dá a resposta, você preenche cada espaço.

```sql
SELECT ___
FROM ___
WHERE ___
ORDER BY ___;
```

```sql
SELECT ___, COUNT(*)
FROM ___
GROUP BY ___;
```

<v-click>

**Lembrete de subquery:** uma consulta pode virar filtro de outra. A forma geral é `(SELECT ...)` dentro do `WHERE`.

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 12 -->

# Trilha A: Query 1

**No papel primeiro.** Depois digite no sqliteonline.com.

Liste os animais de porte grande que ainda não foram adotados, do que espera há mais tempo para o que espera há menos tempo.

- Quais colunas você precisa mostrar?
- Qual condição vai no `WHERE`?
- Qual coluna organiza o `ORDER BY`, e em qual direção?

<AdminOnly>

**Gabarito:**
```sql
SELECT nome_animal, dias_no_abrigo
FROM abrigo
WHERE porte = 'grande' AND adotado = 'não'
ORDER BY dias_no_abrigo DESC;
```

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 13 -->

# Trilha A: Query 2

**No papel primeiro.** Depois digite no sqliteonline.com.

Conte quantos animais de cada espécie já foram adotados.

- Qual condição garante que só entrem os que já foram adotados?
- Qual coluna você agrupa para separar cão de gato?

<AdminOnly>

**Gabarito:**
```sql
SELECT especie, COUNT(*)
FROM abrigo
WHERE adotado = 'sim'
GROUP BY especie;
```

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 14 -->

<!-- objetivo: aluno compreende subquery, consulta dentro de outra consulta, como forma de comparar uma linha com um valor calculado -->

# Trilha B: o que é uma subquery?

Uma subquery (consulta dentro da consulta) resolve um problema em duas etapas, dentro do mesmo comando.

Imagine uma tabela `turma` com `nome_aluno` e `nota`. Você quer os alunos que tiraram nota acima da média da turma. Mas qual é a média? Isso também é uma consulta.

```sql
SELECT nome_aluno, nota
FROM turma
WHERE nota > (SELECT AVG(nota) FROM turma);
```

<v-click>

O banco de dados calcula primeiro o que está dentro dos parênteses, a média, depois usa esse resultado para filtrar a consulta de fora.

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 15 -->

# Trilha B: subquery "acima da média"

**No papel primeiro.** Depois digite no sqliteonline.com.

Liste os animais que estão no abrigo por mais tempo do que a média geral de todos os animais.

- Qual subquery calcula a média de `dias_no_abrigo`?
- Como essa subquery entra no `WHERE` da consulta principal?

<AdminOnly>

**Gabarito:**
```sql
SELECT nome_animal, dias_no_abrigo
FROM abrigo
WHERE dias_no_abrigo > (SELECT AVG(dias_no_abrigo) FROM abrigo);
```

</AdminOnly>

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 44"
---

<!-- SLIDE 16 -->

<!-- objetivo: aluno compara os dois caminhos (revisão guiada vs. subquery) chegando ao mesmo resultado final -->

# Os dois caminhos se encontram

Agora a turma toda vê, ao vivo, o resultado da query "acima da média" da Trilha B rodando na tela.

**A trilha B chegou aqui sozinha. A trilha A viu o caminho.**

- Quem fez a Trilha B: compare seu resultado com o que aparece na tela
- Quem fez a Trilha A: veja como o `WHERE` que vocês já dominam ganhou um novo tipo de condição, calculada por dentro
- Os dois grupos usaram a mesma tabela `abrigo` para responder à mesma pergunta: quem está esperando mais tempo do que a média

> **Conexão futura:** a tabela `abrigo` volta no próximo bloco, agora para contar probabilidades, não para escrever SQL.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 17 -->

<!-- tarefa de casa: aula 44 -->

# Tarefa de Casa: Aula 44

> **Prazo: início da próxima aula com Banco de Dados**

Escreva à mão no caderno, sem usar o computador, o mesmo tipo de consulta que você fez hoje, mas com outro critério.

- **Se você fez a Trilha A:** troque `porte` por `especie`, ou troque `dias_no_abrigo` por `idade_meses` na condição do `WHERE`/`ORDER BY`
- **Se você fez a Trilha B:** escreva a subquery "acima da média", mas usando `idade_meses` no lugar de `dias_no_abrigo`

Traga a query pronta no caderno, com o "visto" de que foi escrita à mão antes do PC.

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
aulaNum: "Aula 44"
---

<!-- SLIDE 18 -->

<!-- objetivo: aluno reconhece que a mesma tabela abrigo agora vira matéria-prima para classificar variáveis e calcular probabilidades, não mais para escrever SQL (indicadores T2-Ind.5 e T2-Ind.6) -->

# BLOCO 2
## Estatística Aplicada: contar para decidir

A tabela `abrigo` volta, mas com outra pergunta: qual é a chance de cada animal ser adotado? Hoje vocês vão aprender a classificar dados e calcular probabilidades reais.

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 44"
---

<!-- SLIDE 19 -->

<!-- debate: aula 44 -->

<!-- objetivo: aluno pratica comparacao de intervalos (maior menos menor) usando dados reais da tabela abrigo, escolhendo lado com evidencia real sem contradicao logica -->

# Debate: qual espécie tem tempo de espera mais imprevisível?

**Escolham um lado, 5 minutos**

**Olhando a tabela `abrigo` do Bloco 1: o tempo de espera dos cães varia mais, ou o das gatas?**

- Time A defende as gatas: aponta Luna, gata, pequeno, 2 meses, esperou só 8 dias, contra Mel, gata, pequeno, 48 meses, esperou 210 dias. Uma diferença de 202 dias entre as duas gatas.
- Time B defende os cães: aponta Thor, cão, grande, 60 meses, esperou só 5 dias, contra Bento, cão, médio, 84 meses, esperou 180 dias. Uma diferença de 175 dias entre os dois cães.

---
layout: brainstorm
card: true
bgPreset: palette
pulse: false
aulaNum: "Aula 44"
---

<!-- SLIDE 20 -->

<!-- debate: aula 44 -->

<!-- objetivo: aluno formaliza a regra de calculo (maior menos menor dentro da propria especie) e justifica o lado escolhido com os dois animais concretos usados na comparacao -->

# Debate: qual espécie tem tempo de espera mais imprevisível? (cont.)

- Antes de argumentar, cada time calcula a diferença entre o maior e o menor tempo de espera dentro da própria espécie que está defendendo
- Cada grupo justifica com os dois animais reais que usou pra calcular a diferença, não vale opinião solta

> **Conexão futura:** hoje a gente não vai calcular essa variação formalmente, mas essa mesma tabela vira contas de probabilidade daqui a pouco: quantos cães existem no total, e quantos deles já foram adotados.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 21 -->

<!-- objetivo: aluno distingue variável qualitativa de quantitativa a partir de um exemplo do cotidiano, antes de aplicar a definição ao dataset abrigo -->

# Variável qualitativa ou quantitativa?

Uma variável (uma coluna que pode assumir valores diferentes para cada linha de uma tabela) pode ser de dois tipos.

- **Qualitativa:** descreve uma característica, uma categoria. Ex: cor dos olhos, time que você torce, gênero musical favorito
- **Quantitativa:** é um número que representa uma quantidade, e dá para fazer conta com ele. Ex: sua altura em centímetros, quantos gols o time fez no campeonato

<v-click>

Regra prática: se faz sentido calcular uma média com aquele valor, é quantitativa. Se não faz (qual é a "média" de cor de olho?), é qualitativa.

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 22 -->

<!-- objetivo: aluno distingue quantitativa discreta de quantitativa contínua usando exemplos fora do abrigo, antes de perceber que nenhuma coluna do abrigo é contínua -->

# Discreta ou contínua?

Toda variável quantitativa também se divide em dois tipos.

- **Discreta:** só assume valores contáveis, normalmente números inteiros. Ex: número de gols de um time, quantidade de mensagens que você recebeu hoje
- **Contínua:** pode assumir qualquer valor dentro de um intervalo, incluindo frações. Ex: sua altura em centímetros, o tempo de reação num jogo, medido em milissegundos

<v-click>

No abrigo, `idade_meses` e `dias_no_abrigo` são discretas: contam meses e dias inteiros, sem fração. Repare que nenhuma coluna do abrigo é contínua, mas altura e tempo de reação são exemplos do seu dia a dia que são.

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 23 -->

<!-- objetivo: aluno aplica de imediato a distinção discreta/contínua a um exemplo novo, quebrando a sequência de teoria -->

# Checkpoint rápido: levante a mão

**30 segundos, sem escrever nada**

Levante a mão quem acha que a nota de uma prova, de 0 a 10 com casas decimais tipo 7,5, é uma variável contínua.

- Quem levantou a mão: pensa em quantos valores diferentes uma nota pode assumir entre 0 e 10
- Quem não levantou: pensa em quantas casas decimais uma nota pode ter na prática

> **Resposta rápida:** depende de quantas casas decimais o sistema aceita. Na prática, a maioria das notas escolares é tratada como contínua, porque em teoria pode assumir infinitos valores dentro do intervalo.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 24 -->

<!-- objetivo: aluno classifica cada coluna do dataset abrigo como qualitativa (nominal/ordinal/binária) ou quantitativa discreta, aplicando a definição do slide anterior -->

# Classificando o abrigo

Agora aplique a ideia às colunas da tabela `abrigo`:

- `especie`: qualitativa nominal, cão ou gato são categorias sem ordem entre si
- `adotado`: qualitativa binária, só existem duas opções, sim ou não
- `idade_meses` e `dias_no_abrigo`: quantitativas discretas, são contagens inteiras, dá para calcular média

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 25 -->

<!-- objetivo: aluno testa um palpite rápido sobre a natureza de porte, quebrando a sequência de teoria antes da explicação da resposta -->

# Checkpoint rápido: levante a mão

**30 segundos, sem escrever nada**

Levante a mão quem acha que `porte` (pequeno, médio, grande) é uma variável quantitativa, só porque dá pra colocar em ordem.

- Quem levantou a mão: guarde esse palpite, o próximo slide explica se ele está certo
- Quem não levantou: você já desconfia do motivo, vamos confirmar juntos

> **Próximo passo:** por que `porte` não é quantitativa, mesmo tendo ordem.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 26 -->

<!-- objetivo: aluno entende por que porte é qualitativa ordinal e não quantitativa, apesar de ter uma ordem entre as categorias -->

# Classificando o abrigo (cont.)

<v-click>

E o `porte`? Pequeno, médio e grande dão para ordenar. Então por que `porte` NÃO é quantitativa?

</v-click>

<v-click>

`porte` é **qualitativa ordinal**: tem ordem, mas não tem uma distância numérica consistente entre as categorias. A diferença entre pequeno e médio não é necessariamente igual à diferença entre médio e grande.

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 27 -->

# Checagem rápida: qualitativa ou quantitativa?

Classifique cada variável abaixo. Anote sua resposta no caderno antes de conferir o gabarito.

1. `porte` do abrigo (pequeno, médio, grande)
2. `nome_animal` do abrigo
3. Número de seguidores de um perfil no Instagram
4. Gênero musical favorito (funk, rock, sertanejo...)

<AdminOnly>

**Gabarito:**
1. `porte`: qualitativa ordinal (tem ordem, sem distância numérica fixa entre as categorias)
2. `nome_animal`: qualitativa nominal (cada nome é só um rótulo, sem ordem)
3. Seguidores no Instagram: quantitativa discreta (é uma contagem inteira, dá para calcular média)
4. Gênero musical: qualitativa nominal (categorias sem ordem entre os gêneros)

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 28 -->

<!-- objetivo: aluno aplica a definição de probabilidade simples, interseção e probabilidade condicional usando a tabela abrigo como espaço amostral (indicador T2-Ind.5) -->

# Probabilidade básica

O espaço amostral (o conjunto de tudo que pode acontecer) é a própria tabela `abrigo`: cada animal é um resultado possível.

- **P(A)** = casos favoráveis / total de casos. Ex: P(cão) = quantidade de cães / total de animais
- **P(A ∩ B)** = casos que atendem as duas condições ao mesmo tempo / total. Ex: P(cão ∩ adotado) = quantos cães já foram adotados / total de animais

<v-click>

**Bônus, probabilidade condicional:** P(adotado | porte grande) pergunta: dentro dos animais de porte grande, qual fração já foi adotada? Primeiro filtra por porte grande, depois calcula a proporção só ali dentro.

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 29 -->

# Exemplo resolvido: P(cão) e P(cão ∩ adotado)

Vamos calcular juntos, usando a tabela de 8 animais do Bloco 1: Rex, Mel, Nina, Thor, Luna, Bento, Fred, Amora.

<v-click>

**Passo 1, contar os cães.** Rex, Thor, Bento e Fred são cães: 4 cães em 8 animais no total.

P(cão) = 4 / 8 = 0,5

</v-click>

<v-click>

**Passo 2, contar os cães que já foram adotados.** Entre os 4 cães, só Bento tem `adotado = sim`.

P(cão ∩ adotado) = 1 / 8 = 0,125

</v-click>

<v-click>

Repare: o total usado embaixo da fração é sempre 8, o espaço amostral inteiro, mesmo quando calculamos a interseção.

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 30 -->

<!-- objetivo: aluno demonstra domínio dos indicadores T2-Ind.5 e T2-Ind.6, classificando variáveis e calculando probabilidades na tabela completa do abrigo -->

# Av03-T2: Mini-projeto de Estatística (Ato 1)

**Avaliação individual, aproximadamente 2 horas.** Não depende das consultas SQL do Bloco 1, é um instrumento separado.

Você vai receber a tabela completa do abrigo, impressa. Resolva no papel:

1. Classifique cada uma das 6 variáveis da tabela (qualitativa nominal/ordinal/binária ou quantitativa discreta/contínua)
2. Calcule P(A), P(A ∩ B) e a condicional bônus P(adotado | porte grande), mostrando o cálculo completo

<v-click>

Justifique cada resposta por escrito. Não vale só o resultado, o professor precisa ver como você pensou.

</v-click>

> Este é o Ato 1 do mini-projeto. O Ato 2 acontece em outra aula, com outro recorte da mesma turma de conteúdo.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 44"
---

<!-- SLIDE 31 -->

<!-- tarefa de casa: aula 44 -->

# Tarefa de Casa: Aula 44 (Estatística)

> **Prazo: início da próxima aula com Estatística Aplicada**

Escolha 2 variáveis novas do seu dia a dia, que não sejam do abrigo. Para cada uma:

- Classifique como qualitativa (nominal, ordinal ou binária) ou quantitativa (discreta ou contínua)
- Justifique por escrito por que ela se encaixa naquela categoria

Exemplos de onde procurar uma variável: um app que você usa, um jogo, um esporte, uma rede social.

---
layout: end
card: true
bgPreset: animate
aulaNum: "Aula 44"
---

<!-- SLIDE 32 -->

<!-- objetivo: aluno encerra o dia enxergando SQL e estatística como duas ferramentas de um mesmo raciocínio (dado vira decisão), com prévia da próxima aula -->

# Fim da Aula 44

Hoje vocês usaram a mesma tabela de duas formas diferentes: com SQL e com estatística. Duas ferramentas, um jeito só de pensar, dado vira decisão.

<v-click>

**Próxima aula (A45):** cases brasileiros de Inteligência Artificial (Nubank, iFood, Embrapa) e a prova Av04-T2, que vai usar o próprio `adotado` do abrigo como exemplo de aprendizado supervisionado, a IA aprendendo a prever quem será adotado.

</v-click>
