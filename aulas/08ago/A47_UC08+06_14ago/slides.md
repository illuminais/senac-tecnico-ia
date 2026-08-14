---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 47"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 47"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-08-14"
unlockHour: 13
layout: cover
---

<!-- SLIDE 1 -->
<!-- objetivo: abrir a aula deixando claro que hoje se trabalha, nao se faz prova -->

# Aula 47

## Quem pode o quê, e quem executa o quê

Hoje não tem prova. Hoje vocês trabalham, e depois explicam o que fizeram.

---
layout: center
card: true
bgPreset: palette
aulaNum: "Aula 47"
---

<!-- SLIDE 2 -->
<!-- objetivo: divisor de bloco -->

# Bloco 1

## Banco de Dados

Até hoje vocês aprenderam a **pegar** dados. Agora vão decidir **quem pode pegar**, num banco de verdade.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 47"
---

<!-- SLIDE 3 -->
<!-- objetivo: aluno conecta no Postgres pelo DBeaver com as credenciais da dupla -->

# Primeiro: conectar

Cada grupo tem **o próprio banco** e a **própria conta**. Ninguém mexe no banco de ninguém.

| Campo | O que preencher |
|---|---|
| Host | o endereço no quadro |
| Database | `abrigo_dNN` |
| Username | `duplaNN` |
| Password | `abrigoNN` |

`NN` é o número do seu grupo, com dois dígitos. Grupo 3 usa `abrigo_d03`, `dupla03`, `abrigo03`.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 47"
---

<!-- SLIDE 4 -->
<!-- objetivo: aluno reconhece as tres tabelas e percebe que uma delas e diferente -->

# O banco do abrigo

| Tabela | O que guarda |
|---|---|
| `animais` | nome, espécie, porte, dias no abrigo, se foi adotado |
| `adotantes` | nome, **CPF**, **telefone**, **endereço** |
| `adocoes` | qual animal, qual adotante, quando |

Uma dessas três é diferente das outras. Qual, e por quê?

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 47"
---

<!-- SLIDE 5 -->
<!-- objetivo: aluno entende que usuario do banco e uma conta, nao uma pessoa -->

# Usuário do banco não é gente

No banco, **usuário é uma conta**, com nome e senha, e com uma lista do que ela pode fazer.

- Uma pessoa pode ter várias contas, uma para cada função
- Um sistema também tem conta, e ninguém está sentado nele
- A conta não é dada por confiança, e sim desenhada pela tarefa

> Perguntar "em quem eu confio" leva a erro. A pergunta certa é: **"o que essa função precisa fazer?"**

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 47"
---

<!-- SLIDE 6 -->
<!-- objetivo: aluno formula o principio do menor privilegio e entende que permissao nao existe por padrao -->

# Princípio do menor privilégio

> Cada conta recebe **só o que precisa** para o próprio trabalho. Nada além.

Não é desconfiança, é reduzir o tamanho do estrago:

- Senha vazada de uma conta que só lê é um problema pequeno
- Senha vazada de uma conta que apaga tudo é um problema grande

E o detalhe que muda tudo: **permissão não existe por padrão.** Se ninguém escrever o comando, a conta não tem acesso nenhum.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "O que o banco responde"
outputTone: neutral
aulaNum: "Aula 47"
---

<!-- SLIDE 7 -->
<!-- objetivo: aluno ve o GRANT rodando de verdade e sabe ler a confirmacao -->

# Criar conta e dar acesso

```sql
CREATE ROLE estagiario_demo LOGIN PASSWORD 'senha123';

GRANT SELECT ON animais TO estagiario_demo;
```

::output::

```text
CREATE ROLE
GRANT
```

::note::

<AdminOnly>

Rodar ao vivo. Duas palavras secas na saída: é assim que o Postgres diz que deu certo.

</AdminOnly>

---
layout: code-output
card: true
bgPreset: palette
outputLabel: "Agora entrando com a conta nova"
outputTone: error
aulaNum: "Aula 47"
---

<!-- SLIDE 8 -->
<!-- objetivo: aluno ve a permissao funcionando na pratica, com a negativa real na tela -->

# O momento que importa

```sql
SELECT nome_animal FROM animais;

SELECT * FROM adotantes;
```

::output::

```text
 nome_animal
-------------
 Rex
 Mel
(2 rows)

ERROR:  permission denied for table adotantes
```

::note::

<AdminOnly>

Essa linha de erro é a prova de que a permissão existe. É exatamente ela que a ficha vai pedir para copiar da tela.

</AdminOnly>

---
layout: code-output
card: true
bgPreset: default
outputLabel: "O que muda depois disso"
outputTone: neutral
aulaNum: "Aula 47"
---

<!-- SLIDE 9 -->
<!-- objetivo: aluno diferencia revogar privilegio de apagar a conta -->

# Tirar acesso

```sql
REVOKE SELECT ON animais FROM estagiario_demo;
```

::output::

```text
a conta continua existindo e continua trabalhando,
mas perdeu o SELECT em animais.

DROP ROLE seria outra coisa: apagaria a conta inteira.
```

::note::

<AdminOnly>

Confundir `REVOKE` com `DROP ROLE` é o erro clássico. Um tira uma permissão, o outro demite a conta.

E se alguém quiser apagar uma conta que já tem `GRANT`, o banco recusa. Primeiro `REVOKE ALL ON tabela FROM conta;`, só depois `DROP ROLE conta;`.

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 47"
---

<!-- SLIDE 10 -->
<!-- objetivo: aluno entende por que precisa de uma segunda conexao e evita a confusao do dono -->

# Antes de testar: a segunda conexão

A conta do seu grupo é **dona** das tabelas. Dono nunca é barrado. Se você testar com `duplaNN`, **tudo passa**, e parece que o `GRANT` não fez nada.

Para ver a permissão funcionando, conecte com a **conta que vocês criaram**:

1. No DBeaver, Nova Conexão, PostgreSQL
2. Mesmo host, mesma porta, mesmo banco `abrigo_dNN`
3. Usuário e senha: **os da conta nova**, não os do grupo

> Regra do dia: testou com a conta do grupo, não testou nada.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 47"
---

<!-- SLIDE 11 -->
<!-- objetivo: aluno entende a tarefa da ficha e as regras da entrega -->

# A ficha do abrigo

Cada grupo recebe **um pedido**, e o grupo ao lado recebe outro. Cole a ficha no caderno e responda **à mão, no caderno**.

1. Que tabelas o pedido toca? Qual é o **mínimo** necessário?
2. Escreva os comandos. Use o número da sua dupla no nome da conta
3. **Rode no DBeaver.** Depois conecte com a conta nova
4. Teste uma coisa que **deve funcionar** e uma que **deve ser negada**
5. **Copie da tela**, palavra por palavra, a mensagem de erro

> Pesquisar na internet é liberado, inclusive IA. O que ninguém pesquisa é o erro que apareceu **na sua tela**.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 47"
---

<!-- SLIDE 12 -->
<!-- objetivo: aluno entende como funciona a rodada de validacao cruzada -->

# Depois: rodada de defesa

Duas duplas se juntam. Cada uma explica à outra o próprio pedido e a própria solução.

Quem ouve precisa:

- **assinar a ficha** de quem falou
- **escrever a pergunta que fez**

> Assinatura sem pergunta escrita não vale.

E no fim eu sorteio cinco ou seis pessoas para duas perguntas rápidas. Ninguém sabe quem vai ser.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 47"
---

<!-- SLIDE 13 -->
<!-- objetivo: fechamento do bloco, comparando os dois bancos -->

# Fechando o bloco

Por que isso não funcionaria no sqliteonline?

| | SQLite | Postgres |
|---|---|---|
| O que é | um arquivo só | um servidor rodando |
| Quem acessa | um programa por vez | muita gente ao mesmo tempo |
| Contas de usuário | não tem | tem, com permissões |
| Quem controla o acesso | o sistema operacional | o próprio banco |

Escolher o banco certo é parte do trabalho. Para um app de celular, SQLite basta. Para o abrigo com quatro funcionários, não.

---
layout: center
card: true
bgPreset: palette
aulaNum: "Aula 47"
---

<!-- SLIDE 14 -->
<!-- objetivo: divisor de bloco -->

# Bloco 2

## Arquitetura de Computadores e GPU

Permissão é sobre quem **pode**. Agora é sobre quem **executa**.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 47"
---

<!-- SLIDE 15 -->
<!-- objetivo: aluno mede antes de ouvir a explicacao, para a teoria cair em terreno preparado -->

# Antes de eu explicar: meçam

Abram o `medir_threads.py` e rodem.

Ele faz **a mesma conta pesada** de três jeitos e cronometra cada um:

1. uma tarefa de cada vez
2. usando **threads**
3. usando **processos**

Anotem os três tempos na ficha M1. Depois mudem o número em `TAREFAS` e rodem de novo.

> Os tempos da sua máquina não são iguais aos de ninguém. É esse o ponto.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "Exemplo de saída, numa máquina de 4 núcleos"
outputTone: neutral
aulaNum: "Aula 47"
---

<!-- SLIDE 16 -->
<!-- objetivo: aluno compara os tres tempos e percebe sozinho que threads nao aceleram -->

# O que apareceu aqui

```python
TAMANHO = 8_000_000
TAREFAS = 4
```

::output::

```text
1 - uma de cada vez                2.81 segundos
2 - com THREADS                    2.70 segundos
3 - com PROCESSOS                  1.58 segundos
```

::note::

<AdminOnly>

Só mostrar depois que a turma tiver os próprios números. A pergunta a fazer: por que a linha 2 quase não mudou?

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 47"
---

<!-- SLIDE 17 -->
<!-- objetivo: aluno nomeia o que acabou de medir -->

# O que vocês acabaram de medir

**Processo** é um programa em execução, com a **memória dele**, separada de todos os outros.

**Thread** é uma linha de execução **dentro** de um processo. Várias threads dividem a mesma memória.

| | Processo | Thread |
|---|---|---|
| Memória | própria, isolada | compartilhada |
| Se quebrar | não derruba os outros | derruba o processo inteiro |
| Custo para criar | alto | baixo |

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 47"
---

<!-- SLIDE 18 -->
<!-- objetivo: aluno entende o GIL como explicacao do numero que ele mesmo mediu -->

# Por que as threads não ajudaram

Dentro de um processo Python, **só uma thread por vez** executa código Python. Esse cadeado se chama **GIL**.

Foi por isso que a linha 2 quase não mudou: as quatro threads existem, mas ficam se revezando no mesmo cadeado.

- Para usar vários núcleos de verdade: `multiprocessing`, que cria **processos**
- Threads ainda valem quando a tarefa fica **esperando** algo, como internet ou disco
- Para a mesma conta em muitos dados: **GPU**

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 47"
---

<!-- SLIDE 19 -->
<!-- objetivo: aluno separa revezar de acontecer junto -->

# Concorrência e paralelismo

Parecem sinônimos e não são.

**Concorrência** é revezar. Um núcleo alterna tão rápido que parece simultâneo, mas não é. Foi o que as threads fizeram.

**Paralelismo** é acontecer junto de verdade, em núcleos diferentes. Foi o que os processos fizeram.

> Lembram da Taxonomia de Flynn? SIMD é exatamente isso levado ao extremo: a mesma instrução, em muitos dados, ao mesmo tempo.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 47"
---

<!-- SLIDE 20 -->
<!-- objetivo: aluno ordena o caminho do lote ate a GPU e volta -->

# O caminho do lote até a GPU

Treinar um modelo é repetir a mesma conta em milhares de dados. É o extremo do que vocês mediram.

1. O programa separa as imagens em um **lote**
2. O lote é copiado da **RAM** para a **VRAM**, a memória da GPU
3. **Milhares de núcleos** fazem a mesma conta, cada um num pedaço
4. O resultado volta da VRAM para a RAM

Seu PC tem 4 núcleos e ganhou o que vocês mediram. Uma GPU tem milhares.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 47"
---

<!-- SLIDE 21 -->
<!-- objetivo: aluno entende as fichas M1 e M2 e a segunda rodada de defesa -->

# Fichas M1 e M2

**M1:** os tempos que vocês mediram, e o porquê deles.

**M2:** o Gerenciador de Tarefas da sua máquina. Quantos processos, quantas threads, e o que muda quando você fecha uma aba.

Mesma regra do bloco 1:

- resposta **à mão, no caderno**
- outra dupla ouve, **assina e escreve a pergunta**
- sorteio oral no fim

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 47"
---

<!-- SLIDE 22 -->
<!-- objetivo: correcao das perguntas centrais das fichas -->

# Fechamento

<AdminOnly>

**Por que threads não aceleraram:** o GIL. Uma por vez executa código Python.

**Por que o navegador usa vários processos:** isolamento. Uma aba travada não derruba as outras.

**Por que threads são sempre mais que processos:** cada processo contém uma ou mais threads. Thread vive dentro de processo, nunca fora.

**Por que GPU para 5 mil imagens:** é a mesma conta repetida em dados independentes, que é exatamente o caso de milhares de núcleos simples.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 47"
---

<!-- SLIDE 23 -->
<!-- tarefa de casa: aula 47 -->

# Tarefa de Casa: Aula 47

> **Prazo: início da próxima aula.**

No computador ou no celular de casa, abra o gerenciador de tarefas e anote no caderno:

1. Quantos processos o navegador está usando
2. Um programa qualquer, e quantas threads ele tem
3. Uma frase explicando por que aquele programa precisa de mais de uma thread

Compare com os números que você anotou aqui. **São iguais? Por que não?**

---
layout: end
card: true
bgPreset: palette
aulaNum: "Aula 47"
---

<!-- SLIDE 24 -->

# Até a próxima

Dia 27 vocês constroem o banco do zero, e as permissões de hoje voltam.
