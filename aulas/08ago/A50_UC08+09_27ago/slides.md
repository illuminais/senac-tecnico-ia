---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 50"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 50"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-08-27"
layout: cover
---

<!-- SLIDE 1: Capa -->

# Aula 50

## O banco do abrigo, e o que cresce rápido demais

Banco de Dados e Estatística Aplicada

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 2 -->
<!-- objetivo: aluno entende que hoje o caderno vira material permanente e consultável -->

# Antes de tudo: o Dossiê do Abrigo

Abram uma seção nova no caderno com esse título. A partir de hoje, **cada aula do abrigo
acrescenta uma página**.

- Hoje entram duas páginas: *o banco* e *o que cresce rápido*
- Amanhã entram mais duas
- O Dossiê pode ser consultado **durante as avaliações**

> Quem não escreve, não consulta. É o único material que vocês vão poder abrir na prova.

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 3: Divisor bloco 1 -->

# BLOCO 1: BANCO DE DADOS

## Do requisito ao banco que roda

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 4 -->
<!-- objetivo: toda a turma reconecta no Postgres, inclusive quem nao conseguiu na aula 47 -->

# Primeiro: todo mundo conectado

Mesmo banco da aula passada. Quem não conseguiu entrar na aula 47, entra agora.

| Campo | O que preencher |
|---|---|
| Host | o endereço no quadro |
| Database | `abrigo_dNN` |
| Username | `duplaNN` |
| Password | `abrigoNN` |

> Duplas que já conectaram levantam a mão. Cada uma adota a dupla ao lado que travou.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "O que o banco responde"
outputTone: neutral
aulaNum: "Aula 50"
---

<!-- SLIDE 5 -->
<!-- objetivo: aluno cria seu proprio espaco de trabalho sem destruir o banco da aula 47 -->

# Seu próprio canto do banco

```sql
CREATE SCHEMA meu_abrigo;

SET search_path TO meu_abrigo;
```

::output::

```text
CREATE SCHEMA
SET
```

::note::

<AdminOnly>

As tabelas da aula 47 continuam lá, intactas. No fim do bloco a turma compara o que construiu
com o que já estava pronto.

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 6 -->
<!-- objetivo: aluno entende que o conteudo novo nao e sintaxe, e rastreabilidade -->

# Hoje não é sobre sintaxe

Vocês já sabem escrever `CREATE TABLE`. Isso não é novidade desde março.

O que é novo é a pergunta que vem antes:

> **Por que essa coluna é assim, e não de outro jeito?**

Toda linha de um `CREATE TABLE` existe porque **alguém escreveu uma regra do negócio** que
obrigou aquilo. Se você não sabe qual regra é, aquela linha é chute.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 7 -->
<!-- objetivo: aluno recebe o mapa das cinco alavancas antes de ver uma por uma -->

# Cinco alavancas, cinco perguntas

Só existem cinco jeitos de o banco te obrigar a fazer a coisa certa:

| Alavanca | A pergunta que ela responde |
|---|---|
| **tipo** | que valores fazem sentido aqui? |
| **NOT NULL** | esse dado é obrigatório? |
| **PRIMARY KEY / UNIQUE** | isso pode se repetir? |
| **REFERENCES** | pode apontar pra algo que não existe? |
| **CHECK** | que valores são proibidos? |

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 8 -->
<!-- objetivo: aluno entende tipo como dominio, nao como detalhe tecnico -->

# Alavanca 1: o tipo

**Definição:** o tipo diz **quais valores podem existir** naquela coluna. É uma cerca.

**Exemplo:** `adotado BOOLEAN` só aceita verdadeiro ou falso. Não aceita "talvez", nem
"sim mas com reserva", nem a data em que foi adotado.

**Analogia:** é o campo da ficha de papel do abrigo. Um campo desenhado com dois quadradinhos
não deixa você escrever um parágrafo.

**Pra que serve:** impede lixo de entrar. O erro aparece na hora de gravar, não seis meses
depois quando alguém for contar quantos animais foram adotados.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 9 -->
<!-- objetivo: aluno distingue campo vazio de campo obrigatorio -->

# Alavanca 2: NOT NULL

**Definição:** `NOT NULL` diz que aquela coluna **não pode ficar em branco**. Nunca.

**Exemplo:** `nome_animal TEXT NOT NULL`. Um animal sem nome não pode ser cadastrado, porque
depois ninguém acha ele.

**Analogia:** é o campo da ficha com asterisco do lado. A recepcionista não consegue arquivar
a ficha enquanto não preencher.

**Pra que serve:** garante que a informação essencial existe. Sem isso o banco aceita fichas
pela metade e o problema só aparece na hora de usar.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 10 -->
<!-- objetivo: aluno entende unicidade e separa identidade de nao repeticao -->

# Alavanca 3: PRIMARY KEY e UNIQUE

**Definição:** as duas garantem que **um valor não se repete** na coluna. A diferença é o
papel: `PRIMARY KEY` é a identidade da linha, `UNIQUE` é só a promessa de não repetir.

**Exemplo:** `id_animal` é `PRIMARY KEY`, porque identifica o animal. Já o `cpf` do adotante é
`UNIQUE`: não identifica a linha, mas não pode aparecer duas vezes.

**Analogia:** o número da ficha contra o CPF escrito dentro dela.

**Pra que serve:** impede o cadastro duplicado, que é o erro mais caro de banco de dados.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 11 -->
<!-- objetivo: aluno entende integridade referencial como proibicao de apontar para o vazio -->

# Alavanca 4: REFERENCES

**Definição:** `REFERENCES` liga uma coluna a outra tabela e **proíbe apontar pra algo que não
existe**.

**Exemplo:** em `adocoes`, a coluna `id_adotante` referencia `adotantes`. Não dá pra registrar
uma adoção feita pelo adotante número 47 se o adotante 47 nunca foi cadastrado.

**Analogia:** escrever na ficha de adoção "ver ficha 47" quando a gaveta não tem ficha 47.
O papel deixa. O banco não.

**Pra que serve:** mantém as tabelas coerentes entre si.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 12 -->
<!-- objetivo: aluno entende CHECK como regra de valor escrita por quem conhece o negocio -->

# Alavanca 5: CHECK

**Definição:** `CHECK` escreve uma **regra de valor** que o banco testa toda vez que alguém
grava.

**Exemplo:** `CHECK (idade_meses >= 0)`. Idade negativa não existe no mundo, então também não
pode existir na tabela.

**Analogia:** o funcionário experiente que olha a ficha e diz "isso aqui está errado" antes de
arquivar.

**Pra que serve:** guarda regras que o tipo sozinho não pega. `INTEGER` aceita menos vinte,
o negócio do abrigo não.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 13 -->
<!-- objetivo: aluno faz o exercicio de fixacao ligando requisito a alavanca, primeira metade -->

# Fixação no caderno: requisitos 1 a 4

Copiem a tabela e escrevam, na coluna da direita, **qual alavanca** resolve cada requisito.

| # | O abrigo decidiu que... | Alavanca |
|---|---|---|
| R1 | todo animal tem que ter nome e espécie | |
| R2 | dois animais não podem ter o mesmo número de ficha | |
| R3 | a idade em meses nunca é negativa | |
| R4 | não existe adoção de adotante não cadastrado | |

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 14 -->
<!-- objetivo: aluno faz a segunda metade da fixacao, incluindo a pegadinha do R5 -->

# Fixação no caderno: requisitos 5 a 7

| # | O abrigo decidiu que... | Alavanca |
|---|---|---|
| R5 | **um animal só pode ser adotado uma vez** | |
| R6 | o CPF do adotante não se repete | |
| R7 | `adotado` só aceita sim ou não | |

> R5 é a difícil. Pensem bem antes de responder: em qual tabela essa regra mora?

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 15 -->
<!-- objetivo: aluno confere a fixacao e entende por que FK nao resolve o R5 -->

# Conferindo a fixação

<v-click>

| # | Alavanca | Por quê |
|---|---|---|
| R1 | `NOT NULL` | campo obrigatório |
| R2 | `PRIMARY KEY` | identidade da linha |
| R3 | `CHECK (idade_meses >= 0)` | regra de valor |
| R4 | `REFERENCES adotantes(id)` | não aponta pro vazio |
| R5 | `UNIQUE (id_animal)` em `adocoes` | não repete o animal |
| R6 | `UNIQUE` | não repete o CPF |
| R7 | `BOOLEAN` | só dois valores possíveis |

</v-click>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 16 -->
<!-- objetivo: aluno entende por que a chave estrangeira nao resolve o R5 -->

# Por que a FK não resolve o R5

Quase todo mundo responde `REFERENCES` no R5. É a resposta errada, e vale entender por quê.

A chave estrangeira garante que o animal **existe**. Ela não garante que ele aparece **uma vez
só**.

Sem `UNIQUE`, o banco aceita numa boa duas adoções do mesmo cachorro, para duas famílias
diferentes, no mesmo dia.

> Cada alavanca resolve uma pergunta. Existir e não repetir são perguntas diferentes.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 17 -->
<!-- objetivo: aluno entende a regra de escrever no caderno antes de digitar -->

# Agora vocês constroem

Três tabelas, no schema `meu_abrigo` de vocês. A regra de sempre:

1. **Escreve no caderno primeiro**, à mão, a tabela inteira
2. Só depois digita no DBeaver
3. Cada linha que vocês escreverem tem que ter um **número de requisito** do lado

> O terceiro passo é o que vale. Uma tabela que roda mas não sabe explicar por que está assim
> não conta como pronta hoje.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 18 -->
<!-- objetivo: aluno tem o gabarito da primeira tabela para conferir depois de tentar -->

# Tabela 1: animais

```sql
CREATE TABLE animais (
  id_animal      SERIAL  PRIMARY KEY,
  nome_animal    TEXT    NOT NULL,
  especie        TEXT    NOT NULL,
  porte          TEXT,
  idade_meses    INTEGER CHECK (idade_meses >= 0),
  dias_no_abrigo INTEGER CHECK (dias_no_abrigo >= 0),
  adotado        BOOLEAN NOT NULL DEFAULT FALSE
);
```

<AdminOnly>

Só projetar depois que as duplas tentarem. `SERIAL` gera o número sozinho. `porte` ficou sem
`NOT NULL` de propósito: nenhum requisito exigiu, e o que nenhum requisito pede não entra.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 19 -->
<!-- objetivo: aluno ve a tabela com dado sensivel e o UNIQUE do cpf -->

# Tabela 2: adotantes

```sql
CREATE TABLE adotantes (
  id       SERIAL   PRIMARY KEY,
  nome     TEXT     NOT NULL,
  cpf      CHAR(11) NOT NULL UNIQUE,
  telefone TEXT,
  endereco TEXT
);
```

<AdminOnly>

Esta é a tabela sensível, a mesma que na aula 47 ninguém queria dar acesso ao estagiário.
Amanhã ela volta, no ciclo de vida da informação.

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 20 -->
<!-- objetivo: aluno ve as duas FKs e o UNIQUE convivendo na mesma coluna -->

# Tabela 3: adocoes

```sql
CREATE TABLE adocoes (
  id          SERIAL  PRIMARY KEY,
  id_animal   INTEGER NOT NULL UNIQUE REFERENCES animais(id_animal),
  id_adotante INTEGER NOT NULL REFERENCES adotantes(id),
  data_adocao DATE    NOT NULL DEFAULT CURRENT_DATE
);
```

<AdminOnly>

Reparem em `id_animal`: tem `UNIQUE` e `REFERENCES` na mesma linha. Duas alavancas, duas
regras diferentes, R5 e R4.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 21 -->
<!-- objetivo: aluno entende que constraint so vira real quando ele ve o erro -->

# Agora tentem quebrar

Uma regra que ninguém testou é fé, não é regra. Cada dupla tenta os três `INSERT` abaixo:

1. Um animal com `idade_meses` igual a menos dez
2. Uma adoção com `id_adotante` igual a 999, que não existe
3. **Duas adoções do mesmo animal**

Para cada um: **copiem no caderno a mensagem de erro exata**, palavra por palavra.

> Pesquisar na internet é liberado. O que ninguém pesquisa é o erro que apareceu na sua tela.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "O que o banco responde"
outputTone: error
aulaNum: "Aula 50"
---

<!-- SLIDE 22 -->
<!-- objetivo: aluno reconhece a mensagem do CHECK antes de tentar -->

# O erro que o CHECK produz

```sql
INSERT INTO animais (nome_animal, especie, idade_meses)
VALUES ('Teste', 'cão', -10);
```

::output::

```text
ERRO: novo registro da relação "animais" viola
restrição de verificação "animais_idade_meses_check"
```

::note::

<AdminOnly>

Conferir a mensagem exata no Postgres do laboratório antes da aula. Ela muda com a versão e
com o idioma do servidor.

</AdminOnly>

---
layout: code-output
card: true
bgPreset: palette
outputLabel: "O que o banco responde"
outputTone: error
aulaNum: "Aula 50"
---

<!-- SLIDE 23 -->
<!-- objetivo: aluno ve o UNIQUE barrando a segunda adocao do mesmo animal -->

# O erro que fecha o R5

```sql
INSERT INTO adocoes (id_animal, id_adotante) VALUES (1, 1);
INSERT INTO adocoes (id_animal, id_adotante) VALUES (1, 2);
```

::output::

```text
ERRO: duplicar valor da chave viola a restrição
de unicidade "adocoes_id_animal_key"
```

::note::

<AdminOnly>

O primeiro passa, o segundo não. É esse contraste que prova o R5. Sem o `UNIQUE`, os dois
passariam e o cachorro teria duas famílias.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 24 -->
<!-- objetivo: aluno retoma o fio da aula 47, ligando permissao a query -->

# Fechando: a permissão manda na query

Na aula 47 vocês desenharam quem pode o quê. Agora as duas coisas se encontram.

Cada dupla escreve **duas queries** e roda as duas:

1. Uma que a conta `duplaNN` **tem** permissão de rodar
2. Uma que ela **não tem**

Copiem no caderno o resultado da primeira e o erro da segunda.

> A pergunta não é "essa query está certa". É "essa query tem direito de existir nesta conta".

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 25 -->
<!-- objetivo: aluno sabe exatamente o que separa atendido de parcialmente atendido -->

# Como este bloco é avaliado

| Nível | O que evidencia |
|---|---|
| **Atendido** | as três tabelas rodam **e** cada cláusula tem o número do requisito do lado |
| **Parcialmente Atendido** | as tabelas rodam, mas sem ligação com os requisitos |
| **Não Atendido** | as tabelas não rodam, ou não há tabela reconhecível |

> Reparem: tabela certa sem saber explicar por quê **não** é Atendido. O porquê faz parte do
> trabalho.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 26 -->
<!-- objetivo: aluno registra a pagina 1 do dossie -->

# Dossiê do Abrigo: página 1

Título da página: **O banco do abrigo**. O que tem que estar nela:

- As três tabelas, como vocês escreveram no caderno
- O número do requisito ao lado de cada linha
- As três mensagens de erro, copiadas da tela
- Uma frase: qual alavanca vocês mais erraram, e por quê

> Essa página pode ser consultada amanhã e nas próximas avaliações de Banco de Dados.

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 27: Divisor bloco 2 -->

# BLOCO 2: ESTATÍSTICA APLICADA

## O que cresce rápido demais

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 28 -->
<!-- objetivo: aluno entra no bloco por uma situacao concreta do abrigo -->

# O post do abrigo

O abrigo publica a foto de um cachorro para adoção. Uma pessoa compartilha. No dia seguinte,
cada pessoa que viu compartilha com mais uma.

E isso se repete, todo dia.

<v-click>

A pergunta do abrigo é simples e prática:

> **Em quantos dias esse post chega a mil pessoas? E se em vez disso a gente colasse cinquenta
> cartazes por dia na cidade, qual dos dois alcança mais gente?**

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 29 -->
<!-- objetivo: aluno recebe a definicao de exponencial contrastada com o que ja sabe -->

# Função exponencial

**Definição:** é a função em que a variável fica **no expoente**. A cada passo igual, o valor
**multiplica pelo mesmo número**, em vez de somar a mesma quantidade.

Vocês já conhecem a que soma. É a linear, que viram no primeiro trimestre:

- **Linear:** soma sempre a mesma coisa. `50, 100, 150, 200`
- **Exponencial:** multiplica sempre pela mesma coisa. `1, 2, 4, 8`

> A diferença não é "uma cresce mais". É **como** cada uma cresce.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 30 -->
<!-- objetivo: aluno preenche a tabela a mao e enxerga as duas curvas lado a lado -->

# Fixação no caderno: as duas colunas

Copiem e completem. À esquerda o post dobrando, à direita os cinquenta cartazes por dia.

| n (dias) | dobrando | somando 50 |
|---|---|---|
| 0 | 1 | 1 |
| 2 | 4 | 101 |
| 4 | | |
| 6 | | |
| 8 | | |
| 10 | | |

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 31 -->
<!-- objetivo: aluno confere a tabela e percebe a ultrapassagem -->

# Conferindo, e a pergunta que importa

<v-click>

| n | dobrando | somando 50 |
|---|---|---|
| 4 | 16 | 201 |
| 6 | 64 | 301 |
| 8 | 256 | 401 |
| 10 | **1024** | 501 |

</v-click>

<v-click>

**Em que dia o post ultrapassa os cartazes?** Entre o dia 8 e o dia 9.

</v-click>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 32 -->
<!-- objetivo: aluno entende que exponencial comeca perdendo, que e a intuicao central -->

# O exponencial começa perdendo

Olhem de novo a tabela. No dia 4, o cartaz está ganhando de lavada: 201 contra 16.

No dia 10, o post já está com o dobro do cartaz. E ele não para.

**A intuição que precisa ficar:** crescimento exponencial parece fraco no começo. Quem olha só
os primeiros dias conclui que não funciona, e desiste bem antes da hora em que ele dispara.

> **Analogia:** dobre uma folha de papel 42 vezes e ela chega na Lua. As primeiras dobras não
> parecem nada.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 33 -->
<!-- objetivo: aluno recebe log como a pergunta inversa, nao como formula nova -->

# Logaritmo: a pergunta ao contrário

Até agora vocês perguntaram: *"depois de 10 dias dobrando, quanto vira?"* Resposta: 1024.

O logaritmo é a **mesma tabela lida de trás pra frente**:

- **Exponencial pergunta:** quanto vira depois de n dobras?
- **Logaritmo pergunta:** **quantas dobras** até virar isso?

**Definição:** `log₂(x)` responde "quantas vezes preciso dobrar pra chegar em x".

> `2¹⁰ = 1024` é o mesmo fato que `log₂(1024) = 10`. Duas formas de escrever a mesma linha da
> tabela.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 34 -->
<!-- objetivo: aluno pratica ler a tabela ao contrario antes da avaliacao -->

# Fixação no caderno: lendo ao contrário

Sem fórmula e sem calculadora. Usem a tabela que vocês acabaram de preencher.

| Pergunta | Resposta |
|---|---|
| `log₂(16)` é quanto? | |
| `log₂(256)` é quanto? | |
| O post chegou a 64 pessoas. Quantos dias? | |
| Chegou a 1024. Quantos dias? | |

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 35 -->
<!-- objetivo: aluno entende para que log serve fora da sala -->

# Pra que serve contar dobras

Quando os números ficam grandes demais para comparar, a gente para de contar o número e passa
a contar **quantas vezes ele dobrou**. Isso é ordem de grandeza.

- **Terremoto:** a escala Richter é logarítmica. Um terremoto de 7 não é um pouco pior que um
  de 6, é dez vezes mais forte
- **Som:** decibéis funcionam igual
- **Dados:** quando alguém diz que um sistema "cresceu duas ordens de grandeza", está contando
  dobras, não unidades

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 36 -->
<!-- [ATIV AVALIATIVA] Av09-T2: instrucoes -->

# Av09-T2: avaliação de Estatística Aplicada

**Individual, no caderno, cerca de uma hora.** O Dossiê pode ficar aberto.

Cinco questões. Todas se resolvem dobrando ou desdobrando números, à mão. **Não precisa de
calculadora e não precisa de fórmula decorada.**

O que vale é mostrar a conta. Resposta certa sem conta não conta.

> Esta avaliação encerra as funções exponenciais e logarítmicas neste trimestre.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 37 -->
<!-- [ATIV AVALIATIVA] Av09-T2: questoes 1 a 3 -->

# Av09-T2: questões 1 a 3

**Questão 1.** Complete a tabela do post dobrando, do dia 0 ao dia 8.

**Questão 2.** No dia 12, quantas pessoas o post alcançou?

**Questão 3.** Se em vez de dobrar o abrigo colasse 50 cartazes por dia, quantas pessoas no dia
12? Qual dos dois alcança mais, e **por que isso acontece**?

<AdminOnly>

Gabarito: Q1: 1, 2, 4, 8, 16, 32, 64, 128, 256. Q2: 4096. Q3: 601 cartazes. O post ganha,
porque multiplica em vez de somar. A justificativa é o que separa Atendido de Parcialmente.

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 38 -->
<!-- [ATIV AVALIATIVA] Av09-T2: questoes 4 e 5 com dado real -->

# Av09-T2: questões 4 e 5

**Questão 4.** O post chegou a 4096 pessoas. Quantos dias dobrando?

**Questão 5.** O Pix saiu de **8,9 bilhões** de transações em 2021 para **cerca de 80 bilhões**
em 2025, segundo o Banco Central. **Quantas vezes o Pix dobrou nesses quatro anos?** Mostre a
conta.

<AdminOnly>

Q4: 12 dias. Q5: dobrando a partir de 8,9: 17,8 · 35,6 · 71,2 · 142,4. Três dobras chegam em
71,2, que é menos que 80. Quatro passam de 80. Resposta: pouco mais de três dobras.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 39 -->
<!-- objetivo: aluno registra a pagina 2 do dossie -->

# Dossiê do Abrigo: página 2

Título: **O que cresce rápido**. O que tem que estar nela:

- A tabela das duas colunas, completa
- O dia em que o post ultrapassa os cartazes
- Uma frase explicando a diferença entre somar sempre igual e multiplicar sempre igual
- A conta das dobras do Pix

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 40 -->
<!-- tarefa de casa: aula 50 -->

# Tarefa de Casa: Aula 50

> **Prazo: amanhã, na aula de Transformação Digital**

Procure **um número real** que tenha crescido rápido, em qualquer assunto que te interesse.
Anote no Dossiê:

1. O número no começo e o número hoje, com o **link da fonte**
2. Quantas vezes ele dobrou, com a conta

> Não vale número inventado nem número sem fonte. Amanhã alguns vão ao quadro.

---
layout: end
card: true
bgPreset: animate
aulaNum: "Aula 50"
---

<!-- SLIDE 41 -->
<!-- objetivo: aluno fecha o dia enxergando o gancho para a sexta -->

# Fim da Aula 50

Hoje o dado do abrigo **nasceu**: vocês construíram a estrutura que guarda ele, e cada decisão
tinha um motivo escrito.

E aprenderam a medir o que cresce rápido demais.

<v-click>

**Amanhã:** essa mesma curva volta, com outro objeto. Vocês vão descobrir que ela não sobe pra
sempre, e que o ponto onde ela verga tem nome.

</v-click>
