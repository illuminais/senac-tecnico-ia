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

> Duplas que não conectaram levantam a mão. Cada dupla que conseguiu adota a dupla ao lado que travou.

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

Fechem o caderno na página da fixação. Cada dupla diz **em voz alta** a alavanca de um
requisito, e a turma concorda ou discorda antes de eu confirmar.

<AdminOnly>

| # | Alavanca | Por quê |
|---|---|---|
| R1 | `NOT NULL` | campo obrigatório |
| R2 | `PRIMARY KEY` | identidade da linha |
| R3 | `CHECK (idade_meses >= 0)` | regra de valor |
| R4 | `REFERENCES adotantes(id)` | não aponta pro vazio |
| R5 | `UNIQUE (id_animal)` em `adocoes` | não repete o animal |
| R6 | `UNIQUE` | não repete o CPF |
| R7 | `BOOLEAN` | só dois valores possíveis |

</AdminOnly>

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
<!-- objetivo: aluno relembra a sintaxe de DCL da aula 47 antes de aplicar em cima das tabelas de hoje -->

# Lembrando a sintaxe da aula 47

Na aula 47 vocês usaram três comandos novos. Antes de usar de novo, vamos relembrar o que cada
um faz, sem depender de lembrar nome de conta nenhuma.

| Comando | O que ele faz |
|---|---|
| `CREATE ROLE nome LOGIN PASSWORD 'senha'` | cria uma conta nova, que consegue logar sozinha |
| `GRANT privilégio ON tabela TO nome` | dá uma permissão específica pra essa conta |
| `REVOKE privilégio ON tabela FROM nome` | tira uma permissão específica dessa conta |

> Ninguém nasce sabendo essa sintaxe de cor. Ela fica no quadro até o fim do bloco.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "O que o banco responde"
outputTone: neutral
aulaNum: "Aula 50"
---

<!-- SLIDE 25 -->
<!-- objetivo: aluno segue receita mastigada para criar uma conta de teste nas proprias tabelas de hoje -->

# Passo a passo: criando a conta de teste

Três linhas, na ordem, com `NN` = número da sua dupla:

```sql
CREATE ROLE testeNN LOGIN PASSWORD 'testeNN';
GRANT USAGE ON SCHEMA meu_abrigo TO testeNN;
GRANT SELECT ON meu_abrigo.animais TO testeNN;
```

::output::

```text
CREATE ROLE
GRANT
GRANT
```

::note::

<AdminOnly>

O `GRANT USAGE ON SCHEMA` é o passo que quase todo mundo esquece. Sem ele, a query permitida
também dá erro de permissão, só que erro no schema, não na tabela. Confira essa mensagem no
Postgres do laboratório antes da aula.

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 26 -->
<!-- objetivo: aluno sabe exatamente quais cliques dar no dbeaver para testar como a conta nova -->

# Passo a passo: testando como a conta nova

No DBeaver, sem sair da conexão da dupla:

1. Botão direito em cima da conexão atual → **Create New Connection**
2. Mesmo host e mesmo banco (`abrigo_dNN`), mas usuário e senha são `testeNN`
3. **Test Connection** → se aparecer verde, **Finish**
4. Abra um editor SQL **nessa conexão nova**, não na antiga

> Escrevam `meu_abrigo.nome_da_tabela` nas queries, com o nome do schema na frente. Essa conexão
> nova não conhece o atalho que a conta da dupla já tinha configurado.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 27 -->
<!-- objetivo: aluno retoma o fio da aula 47, ligando permissao a query -->

# Fechando: a permissão manda na query

Na aula 47 vocês desenharam quem pode o quê. Agora as duas coisas se encontram.

Cada dupla escreve **duas queries** e roda as duas, conectada como a **conta de teste** que
acabou de criar:

1. Uma que `testeNN` **tem** permissão de rodar (em `animais`)
2. Uma que ela **não tem** (em `adotantes` ou `adocoes`, onde ela não recebeu nenhum `GRANT`)

Copiem no caderno o resultado da primeira e o erro da segunda.

> A pergunta não é "essa query está certa". É "essa query tem direito de existir nesta conta". A
> conta da dupla é dona de tudo, dono nunca é barrado. É por isso que o teste tem que ser feito
> com a conta nova.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 28 -->
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

<!-- SLIDE 29 -->
<!-- objetivo: aluno sabe o que separa atendido de parcialmente atendido no exercicio de permissao -->

# Como a permissão é avaliada

| Nível | O que evidencia |
|---|---|
| **Atendido** | as duas queries rodam como esperado (uma passa, uma dá erro) **e** o caderno explica por quê cada uma tem ou não permissão |
| **Parcialmente Atendido** | as queries rodam, mas sem explicação, ou a dupla confunde erro de permissão com erro de digitação |
| **Não Atendido** | não criou a conta de teste, ou não rodou nenhuma query com ela |

> "Deu erro" sozinho não vale nada. O erro **certo**, no lugar certo, é a prova.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 30 -->
<!-- objetivo: aluno registra a pagina 1 do dossie -->

# Dossiê do Abrigo: página 1

Título da página: **O banco do abrigo**. O que tem que estar nela:

- As três tabelas, como vocês escreveram no caderno
- O número do requisito ao lado de cada linha
- As três mensagens de erro, copiadas da tela
- Uma frase: qual alavanca vocês mais erraram, e por quê
- A conta de teste que vocês criaram, com o `CREATE ROLE` e os `GRANT`
- O resultado da query permitida e o erro da query negada


---
layout: cover
bgPreset: palette
---

<!-- SLIDE 31: Divisor bloco 2 -->

# ESTATÍSTICA APLICADA

## O que cresce rápido demais

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 32 -->
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

<v-click>

**Por que um multiplica e o outro soma:** o post ativa gente nova a cada compartilhada, e essa
gente nova compartilha de novo. É um efeito em cadeia. O cartaz não: é sempre a mesma equipe
colando os mesmos cinquenta cartazes, todo santo dia, não importa quantas pessoas já viram os de
ontem.

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 33 -->
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

<!-- SLIDE 34 -->
<!-- objetivo: aluno preenche a tabela a mao e enxerga as duas curvas lado a lado -->

# Fixação no caderno: as duas colunas

Copiem e completem. À esquerda o post, que **multiplica por 2** a cada dia. À direita os
cartazes, que **somam 50** a cada dia.

| dia | post: multiplica por 2 | cartaz: soma 50 |
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

<!-- SLIDE 35 -->
<!-- objetivo: aluno confere a tabela e percebe a ultrapassagem -->

# Conferindo, e a pergunta que importa

Antes de eu mostrar qualquer número: cada dupla canta o valor que achou para o **dia 10**, nas
duas colunas. Depois a pergunta que interessa:

> **Em que dia o post ultrapassa os cartazes?**

<AdminOnly>

| dia | post: multiplica por 2 | cartaz: soma 50 |
|---|---|---|
| 4 | 16 | 201 |
| 6 | 64 | 301 |
| 8 | 256 | 401 |
| 10 | **1024** | 501 |

**Resposta da pergunta:** entre o dia 8 e o dia 9. No dia 8 o cartaz ainda ganha (401 contra
256); no dia 9 o post já passou (512 contra 451).

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 36 -->
<!-- objetivo: aluno formaliza a tabela que acabou de calcular usando notacao de potencia -->

# A notação: potência de base 2

Vocês acabaram de calcular tudo isso na mão. Agora vamos escrever com o nome certo das coisas.

Em `2ⁿ`, o **2** é a **base** (o número que se repete na multiplicação) e o **n** é o
**expoente** (quantas vezes ele entra). O resultado se chama **potência**.

| expoente (n) | a multiplicação | potência | valor |
|---|---|---|---|
| 0 | nenhum fator | `2⁰` | 1 |
| 1 | 2 | `2¹` | 2 |
| 3 | 2 × 2 × 2 | `2³` | 8 |
| 10 | 2 × 2 × … × 2 (dez fatores) | `2¹⁰` | 1024 |

> **quantidade = 2ⁿ**. Aumentar o expoente em 1 é multiplicar o valor por 2 — é por isso que na
> prática dá pra ir dobrando.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 37 -->
<!-- objetivo: aluno pratica a notacao de potencia isolada da historia do abrigo, para solidificar a regra -->

# Fixação no caderno: pratique o expoente

Sem calculadora. Escrevam a multiplicação por extenso e só depois o valor.

| Potência | A multiplicação por extenso | Valor |
|---|---|---|
| `2³` | | |
| `2⁵` | | |
| `2⁷` | | |
| `2⁹` | | |

> Dica: cada expoente a mais é **uma multiplicação por 2** em cima do anterior. Achou `2⁵`?
> Então `2⁶` é só multiplicar aquele resultado por 2.

<AdminOnly>

Gabarito: `2³` = 2×2×2 = **8** · `2⁵` = **32** · `2⁷` = **128** · `2⁹` = **512**.
Erro comum: multiplicar a base pelo expoente (`2×3=6` em vez de `2³=8`). Se aparecer, voltar ao
"a multiplicação por extenso" antes de seguir.

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 38 -->
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

<!-- SLIDE 39 -->
<!-- objetivo: aluno enxerga visualmente a virada entre as duas curvas, nao so na tabela -->

# Vendo a virada

<div style="display:flex; justify-content:center;">
<svg viewBox="0 0 500 300" width="440" style="background:transparent">
  <line x1="40" y1="260" x2="460" y2="260" stroke="#94a3b8" stroke-width="1.5" />
  <line x1="40" y1="260" x2="40" y2="20" stroke="#94a3b8" stroke-width="1.5" />
  <polyline points="40,260 124,259 208,256 292,245 376,200 460,20" fill="none" stroke="#67e8f9" stroke-width="3" />
  <polyline points="40,260 124,236 208,213 292,189 376,166 460,143" fill="none" stroke="#fbbf24" stroke-width="3" />
  <line x1="418" y1="20" x2="418" y2="260" stroke="#f87171" stroke-width="1" stroke-dasharray="4,4" />
  <text x="424" y="35" fill="#f87171" font-size="14">vira aqui</text>
  <text x="36" y="278" fill="#cbd5e1" font-size="13">0</text>
  <text x="118" y="278" fill="#cbd5e1" font-size="13">2</text>
  <text x="202" y="278" fill="#cbd5e1" font-size="13">4</text>
  <text x="286" y="278" fill="#cbd5e1" font-size="13">6</text>
  <text x="370" y="278" fill="#cbd5e1" font-size="13">8</text>
  <text x="450" y="278" fill="#cbd5e1" font-size="13">10 (dias)</text>
  <circle cx="376" cy="200" r="4" fill="#67e8f9" />
  <circle cx="460" cy="20" r="4" fill="#67e8f9" />
  <rect x="70" y="30" width="12" height="12" fill="#67e8f9" />
  <text x="86" y="40" fill="#e2e8f0" font-size="14">post (dobrando)</text>
  <rect x="240" y="30" width="12" height="12" fill="#fbbf24" />
  <text x="256" y="40" fill="#e2e8f0" font-size="14">cartaz (+50/dia)</text>
</svg>
</div>

O cartaz sai na frente e fica confortável até o dia 8. Depois disso a curva do post dobra de
altura a cada dois dias e passa por cima.

> É essa forma de "reta que vira gancho" que separa o que cresce somando do que cresce
> multiplicando.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 40 -->
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

<!-- SLIDE 41 -->
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
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 42 -->
<!-- objetivo: aluno registra as duas formulas de forma explicita, para ter como consultar na prova -->

# Fórmulas para guardar

Copiem os dois quadros no Dossiê. São as duas faces da mesma moeda.

| Pergunta | Fórmula |
|---|---|
| Depois de `n` dobras, quanto vira? | **quantidade = 2ⁿ** |
| Pra chegar em uma quantidade, quantas dobras precisou? | **n = log₂(quantidade)** |

> Não precisa decorar pra usar a tabela. Mas se souberem a fórmula, funciona pra qualquer número,
> não só pros que já estão na tabela.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 43 -->
<!-- objetivo: aluno pratica plugar direto na formula, sem depender de preencher tabela linha a linha -->

# Fixação no caderno: usando a fórmula direto

Resolvam plugando na fórmula, sem preencher tabela linha por linha.

1. `quantidade = 2ⁿ`, com `n = 7`. Quanto é a quantidade?
2. `quantidade = 2ⁿ` deu **32**. Quanto vale `n`, ou seja, `log₂(32)`?
3. Um post dobrou **9 vezes**. Quantas pessoas ele alcançou?

> Mesma conta de sempre. A diferença é que agora vocês escrevem ela numa linha só.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 44 -->
<!-- objetivo: aluno ve visualmente por que log e a ferramenta certa para dado exponencial -->

# Por que o log "endireita" a curva

Mesmos dias, mesmos dados. Só que agora o eixo vertical não é a quantidade, é **quantas dobras
ela representa** (`log₂`).

<div style="display:flex; justify-content:center;">
<svg viewBox="0 0 500 300" width="440" style="background:transparent">
  <line x1="40" y1="260" x2="460" y2="260" stroke="#94a3b8" stroke-width="1.5" />
  <line x1="40" y1="260" x2="40" y2="20" stroke="#94a3b8" stroke-width="1.5" />
  <polyline points="40,260 124,212 208,164 292,116 376,68 460,20" fill="none" stroke="#67e8f9" stroke-width="3" />
  <polyline points="40,260 124,100 208,76 292,62 376,52 460,45" fill="none" stroke="#fbbf24" stroke-width="3" />
  <text x="36" y="278" fill="#cbd5e1" font-size="13">0</text>
  <text x="118" y="278" fill="#cbd5e1" font-size="13">2</text>
  <text x="202" y="278" fill="#cbd5e1" font-size="13">4</text>
  <text x="286" y="278" fill="#cbd5e1" font-size="13">6</text>
  <text x="370" y="278" fill="#cbd5e1" font-size="13">8</text>
  <text x="450" y="278" fill="#cbd5e1" font-size="13">10 (dias)</text>
  <rect x="70" y="30" width="12" height="12" fill="#67e8f9" />
  <text x="86" y="40" fill="#e2e8f0" font-size="14">post: virou reta</text>
  <rect x="260" y="30" width="12" height="12" fill="#fbbf24" />
  <text x="276" y="40" fill="#e2e8f0" font-size="14">cartaz: virou curva</text>
</svg>
</div>

O post, que era a curva disparando, **virou uma linha reta**. Isso não é coincidência: contar
dobras é exatamente o que o log faz. Já o cartaz, que crescia numa reta certinha, agora aparece
torto: o log só "endireita" quem cresce multiplicando.

> É por isso que log aparece em terremoto, som e crescimento de dados: sempre que a grandeza real
> multiplica, o log devolve ela pra uma escala que dá pra desenhar numa régua.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 45 -->
<!-- objetivo: aluno entende para que log serve fora da sala -->

# Pra que serve contar dobras

Quando os números ficam grandes demais para comparar, a gente para de contar o número e passa
a contar **quantas vezes ele dobrou**. Isso é ordem de grandeza.

- **Terremoto:** a escala Richter é logarítmica. Um terremoto de 7 não é um pouco pior que um
  de 6, é dez vezes mais forte
- **Som:** decibéis funcionam igual
- **Dados:** quando alguém diz que um sistema "cresceu duas ordens de grandeza", está contando
  dobras, não unidades

> Exemplo real: o terremoto do Chile de 1960 teve magnitude 9,5, o maior já registrado. Um
> terremoto de magnitude 6,5 solta **mil vezes menos energia**: são três degraus de dez vezes
> cada, um atrás do outro. A escala parece pequena porque é logarítmica, não porque a diferença é
> pequena.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 46 -->
<!-- objetivo: aluno ve um problema modelo resolvido passo a passo antes da avaliacao -->

# Exemplo resolvido: passo a passo

**Pergunta:** o post do abrigo dobrou 6 vezes. Quantas pessoas ele alcançou?

<v-click>

**Passo 1.** Identificar a fórmula certa: já sei quantas dobras (`n`), quero a quantidade. Uso
`quantidade = 2ⁿ`.

</v-click>

<v-click>

**Passo 2.** Substituir: `quantidade = 2⁶`.

</v-click>

<v-click>

**Passo 3.** Calcular contando dobra por dobra: 1 → 2 → 4 → 8 → 16 → 32 → **64**.

</v-click>

<v-click>

**Resposta:** 64 pessoas. É a mesma linha que já apareceu na tabela lá atrás, só que chegando
nela pela fórmula em vez de pela tabela.

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 50"
---

<!-- SLIDE 47 -->
<!-- [ATIV AVALIATIVA] Av09-T2: instrucoes -->

# Av09-T2: avaliação de Estatística Aplicada

**Individual, no caderno, cerca de uma hora.** O Dossiê pode ficar aberto.

Cinco questões. Todas se resolvem dobrando ou desdobrando números, à mão. **Não precisa de
calculadora e não precisa de fórmula decorada.** Quem preferir usar a fórmula (`2ⁿ` ou `log₂`)
direto pode usar à vontade: tabela e fórmula valem igual.

O que vale é mostrar a conta. Resposta certa sem conta não conta.

> Esta avaliação encerra as funções exponenciais e logarítmicas neste trimestre.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 48 -->
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

<!-- SLIDE 49 -->
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

<!-- SLIDE 50 -->
<!-- objetivo: aluno registra a pagina 2 do dossie -->

# Dossiê do Abrigo: página 2

Título: **O que cresce rápido**. O que tem que estar nela:

- A tabela das duas colunas, completa
- O dia em que o post ultrapassa os cartazes
- Uma frase explicando a diferença entre somar sempre igual e multiplicar sempre igual
- As duas fórmulas, do jeito que ficaram no quadro (`quantidade = 2ⁿ` e `n = log₂(quantidade)`)
- A conta das dobras do Pix

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 50"
---

<!-- SLIDE 51 -->
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

<!-- SLIDE 52 -->
<!-- objetivo: aluno fecha o dia enxergando o gancho para a sexta -->

# Fim da Aula 50

Hoje o dado do abrigo **nasceu**: vocês construíram a estrutura que guarda ele, e cada decisão
tinha um motivo escrito.

E aprenderam a medir o que cresce rápido demais.

<v-click>

**Amanhã:** essa mesma curva volta, com outro objeto. Vocês vão descobrir que ela não sobe pra
sempre, e que o ponto onde ela verga tem nome.

</v-click>
