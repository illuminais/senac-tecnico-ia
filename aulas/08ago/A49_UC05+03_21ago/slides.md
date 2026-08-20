---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 49"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 49"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-08-21"
unlockHour: 13
layout: cover
---

<!-- SLIDE 1: Capa -->

# Aula 49

## Fechando as funções, abrindo os padrões

Python para IA e Fundamentos Matemáticos

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 2: Divisor bloco 1 -->

# BLOCO 1: UC05 PYTHON PARA IA

## Fechamento da folha de funções

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 3: Como funciona o dia -->

<!-- objetivo: aluno entende que hoje fecha a atividade iniciada na aula 46, sem conteúdo novo -->

# A folha de vocês está de volta

Hoje **não tem conteúdo novo de Python**. Hoje a gente fecha a folha das 11 funções que vocês começaram na aula 46.

Como vai ser:

- Primeiro eu reexplico o `return`, que foi onde a maior parte tropeçou.
- Depois a gente corrige os exercícios 1 a 7 juntos, no quadro.
- Depois vocês digitam e **rodam** os exercícios 8 a 11 no computador.

Peguem a folha de consulta de funções. Ela é de vocês, pode usar o tempo todo.

---
layout: center
card: true
bgPreset: animate
---

<!-- SLIDE 4: Abertura do re-ensino -->

# A função fez a conta certa e mesmo assim não serviu pra nada

Isso aconteceu com muita gente na folha.

O motivo tem nome: **`return`**.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 5: Conceito, definição -->

<!-- objetivo: aluno distingue devolver um valor de mostrar um valor na tela -->

# `return`: o que é

**Definição:** `return` é o comando que faz a função **devolver** um valor pra quem chamou.

Devolver é diferente de mostrar. São duas coisas que parecem a mesma na tela e não são:

- `print` **mostra** na tela. O valor aparece e acaba ali.
- `return` **entrega** o valor de volta. Você pode guardar, somar, usar em outra função.

---
layout: code-output
bgPreset: default
outputLabel: "O que aparece na tela"
outputTone: neutral
---

<!-- SLIDE 6: Conceito, exemplo -->

# `return`: exemplo

```python
def dobro_a(n):
    print(n * 2)

def dobro_b(n):
    return n * 2

dobro_a(7)
dobro_b(7)
```

::output::

```
14
```

::note::

As duas funções fazem a mesma conta. Só o `dobro_a` mostrou. O `dobro_b` devolveu 14, mas ninguém guardou, então o valor se perdeu sem aparecer.

---
layout: code-output
bgPreset: default
outputLabel: "O que aparece na tela"
outputTone: error
---

<!-- SLIDE 7: Conceito, por que print quebra -->

# Por que o `print` quebra depois

```python
def dobro_a(n):
    print(n * 2)

resultado = dobro_a(7)
print(resultado + 1)
```

::output::

```
14
TypeError: unsupported operand type(s)
for +: 'NoneType' and 'int'
```

::note::

O 14 apareceu, mas `resultado` ficou valendo `None`, que quer dizer "nada". Função sem `return` **sempre devolve `None`**. E `None` não soma com número.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 8: Conceito, analogia e pra que serve -->

# `return`: a analogia

Você pede pra alguém calcular quanto deu a conta do lanche.

**Com `print`:** a pessoa grita o valor no meio da sala. Você ouviu, mas não tem nada na mão. Se quiser dividir por três, precisa pedir de novo.

**Com `return`:** a pessoa escreve o valor num papel e te entrega. Agora você divide, soma a gorjeta, passa pra outra pessoa.

**Pra que serve:** só dá pra usar uma função **dentro** de outra se ela devolver. É isso que vocês vão fazer no computador hoje.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 9: Fixação 1 -->

<!-- [EXERCICIO] -->
<!-- objetivo: aluno prevê o valor devolvido por uma função, incluindo o caso None -->

# Fixação: o que cada função devolve?

No caderno, escrevam o que **cada função devolve** quando chamada com o valor 10.

```python
def a(n):
    return n + 5

def b(n):
    print(n + 5)

def c(n):
    resultado = n + 5

def d(n):
    return
    print(n + 5)
```

<AdminOnly>

**Gabarito:** `a` devolve **15**. `b` devolve **None** (mostra 15 na tela, mas devolve nada). `c` devolve **None** (calcula, guarda numa variável e joga fora). `d` devolve **None** (o `return` vazio encerra a função ali, e o `print` nunca roda).

**Puxar com a turma:** três das quatro devolvem `None`, e só uma delas mostra alguma coisa na tela. Ver algo na tela não é prova de que a função funcionou.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
---

<!-- SLIDE 10: Transição para a correção -->

# Agora a folha

Peguem uma caneta de outra cor.

Tudo que você corrigir hoje, corrige **na sua folha, na cor diferente**, e escreve numa linha o que estava errado.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 11: Correção, exercícios 1 e 2 -->

<!-- [EXERCICIO] -->
<!-- objetivo: aluno corrige a própria folha e nomeia o erro cometido -->

# Correção: exercícios 1 e 2

**1.** `def saudacao(nome)` devolve `"Olá, Rex"` quando recebe `"Rex"`.
**2.** `def dobro(numero)` devolve o número vezes 2, e depois a linha que chama com 7 e guarda.

<AdminOnly>

```python
def saudacao(nome):
    return f"Olá, {nome}"

def dobro(numero):
    return numero * 2

resultado = dobro(7)
```

**Erros mais comuns:** esquecer os dois-pontos no fim do `def` (exercício 1) e usar `print` no lugar de `return` (exercício 2). No 2, muita gente escreveu `dobro(7)` sem o `resultado =`, e aí não guardou nada.

**Critério:** vale a lógica. Dois-pontos e recuo entram no feedback escrito, não derrubam a questão.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 12: Correção, exercícios 3 e 4 -->

<!-- [EXERCICIO] -->

# Correção: exercícios 3 e 4

**3.** A diferença entre `dobro_a` e `dobro_b`.
**4.** `def passou_do_prazo(dias_no_abrigo, limite)` devolve `True` se passou, `False` se não.

<AdminOnly>

```python
def passou_do_prazo(dias_no_abrigo, limite):
    return dias_no_abrigo > limite
```

**Erro mais comum no 4:** comparar com um número fixo, tipo `dias_no_abrigo > 30`, em vez de usar o segundo parâmetro. Aí a função só serve pra um limite só.

**Também aceito:** escrever com `if` e dois `return`. Funciona igual, só é mais longo. Mostre a versão curta no quadro depois de validar a longa.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 13: Correção, exercício 5 -->

<!-- [EXERCICIO] -->

# Correção: exercício 5, o guarda-chuva

`def levar_guarda_chuva(chance_de_chuva, vai_de_carro)`

Este é o coração da folha: dois parâmetros e ordem de `if` que importa.

<AdminOnly>

```python
def levar_guarda_chuva(chance_de_chuva, vai_de_carro):
    if chance_de_chuva >= 90:
        return True
    if vai_de_carro:
        return False
    if chance_de_chuva >= 60:
        return True
    return False
```

**Erro mais comum:** testar as condições fora de ordem. O caso de 90% tem que vir **antes** do `vai_de_carro`, senão quem vai de carro nunca leva guarda-chuva, mesmo com chuva quase certa.

**Como mostrar que está errado:** peça pra turma testar com `chance_de_chuva = 95` e `vai_de_carro = True`. A ordem errada devolve `False`.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 14: Correção, exercícios 6 e 7 -->

<!-- [EXERCICIO] -->

# Correção: exercícios 6 e 7

**6.** O que envolve `input`.
**7.** `def taxa_de_adocao(adotados, total)` devolve a porcentagem. Se `total` for zero, devolve zero.

<AdminOnly>

```python
def taxa_de_adocao(adotados, total):
    if total == 0:
        return 0
    return (adotados / total) * 100
```

**Erro mais comum no 6:** usar o que veio do `input` direto como número. `input` sempre entrega texto, precisa de `int()` ou `float()` em volta.

**Erro mais comum no 7:** dividir sem checar o zero, e aí o programa quebra com `ZeroDivisionError`. Essa checagem no começo da função tem nome no mercado: **cláusula de guarda**. Resolve o caso impossível antes de fazer a conta.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
---

<!-- SLIDE 15: Intervalo -->

# Respire

Depois: o computador. Vocês vão **rodar** o que escreveram à mão.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 16: No computador, o que fazer -->

<!-- [ATIV AVALIATIVA] -->
<!-- objetivo: aluno executa suas próprias funções e confirma o retorno na tela -->

# No computador: exercícios 8 a 11

Abram o arquivo `funcoes_abrigo.py`. Os enunciados estão lá em comentário.

**8.** `soma_dias(lista_de_dias)` devolve a soma de todos os números da lista.
**9.** `contar_grandes(portes)` devolve quantos textos da lista são `"grande"`.
**10.** `ficha(animal)` recebe `{"nome": "Rex", "porte": "grande"}` e devolve `"Rex, porte grande"`.
**11.** `contar_por_porte(animais, porte_procurado)` devolve quantos têm o porte procurado.

Digitem, rodem, e **confiram se a tela mostra o número certo**.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 17: O acumulador -->

<!-- objetivo: aluno entende por que a variável do acumulador nasce antes do for -->

# O acumulador: onde a variável nasce

Nos exercícios 8 e 9 vocês precisam de um acumulador: uma variável que vai somando.

```python
def soma_dias(lista_de_dias):
    total = 0
    for dia in lista_de_dias:
        total = total + dia
    return total
```

**A variável nasce ANTES do `for`.** Se `total = 0` estiver dentro do laço, ela volta a zero a cada volta e no fim sobra só o último número.

Foi o erro mais comum do exercício 8 na folha de vocês.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 18: Encadeamento, o conceito -->

<!-- objetivo: aluno usa o retorno de uma função como entrada de outra -->

# Encadear: a saída de uma vira a entrada da outra

Vocês têm `contar_grandes`, que devolve **um número**. E têm `taxa_de_adocao`, que **recebe** números.

Se uma devolve e a outra recebe, uma pode alimentar a outra:

```python
portes = ["grande", "pequeno", "grande", "medio", "grande"]

quantos_grandes = contar_grandes(portes)
porcentagem = taxa_de_adocao(quantos_grandes, len(portes))

print(porcentagem)
```

Isso só funciona porque as duas usam `return`. Com `print` no lugar, nada disso existiria.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 19: Encadeamento, a versão curta -->

<!-- [ATIV AVALIATIVA] -->

# Encadear: agora numa linha só

A mesma coisa, sem a variável no meio:

```python
porcentagem = taxa_de_adocao(contar_grandes(portes), len(portes))
```

O Python resolve **de dentro pra fora**: primeiro `contar_grandes(portes)` devolve 3, e só então `taxa_de_adocao(3, 5)` faz a conta.

**Sua vez:** rodem as duas versões e confiram que dão o mesmo resultado. Depois chamem o professor pra mostrar rodando.

<AdminOnly>

Com a lista do slide anterior: `contar_grandes` devolve **3**, `len(portes)` é **5**, e a taxa é **60.0**.

**Evidência do Indicador 2:** o aluno chamou a função, passou os argumentos certos, guardou o retorno e usou esse retorno em outra função. É isso que fecha o indicador.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 20: Critérios do bloco de Python -->

# Critérios de avaliação: Python para IA

<AdminOnly>

**Indicador 2, utiliza comandos de integração dos códigos construídos**
Atendido: chama a função com os argumentos certos, guarda o retorno em variável e usa esse retorno em outra função ou no `print`; o encadeamento roda e devolve o número certo. Parcialmente: chama e imprime direto sem guardar o retorno, ou trava no encadeamento, ou usa `print` no lugar de `return`. Não Atendido: não chama as funções, reescreve o código solto.

**Indicador 3, realiza a depuração, verificando e corrigindo erros**
Atendido: corrige a própria folha e **escreve o que estava errado** em pelo menos 3 exercícios, com a causa e não com "estava errado"; identifica ao menos um erro sozinho antes de aparecer no quadro. Parcialmente: corrige acompanhando o quadro, mas não sabe dizer por quê. Não Atendido: não corrige, ou copia sem marcar o próprio erro.

**Sem tarefa de casa neste bloco.** A tarefa era a folha, que está sendo fechada hoje.

</AdminOnly>

---
layout: cover
bgPreset: palette
---

<!-- SLIDE 21: Divisor bloco 2 -->

# BLOCO 2: UC03 FUNDAMENTOS MATEMÁTICOS

## Da série ao gráfico

---
layout: center
card: true
bgPreset: animate
---

<!-- SLIDE 22: Abertura -->

# 2, 4, 8, 16, ...

Você já sabe qual é o próximo.

O que você fez na cabeça pra saber tem nome, e é isso que a gente vai aprender a fazer com número de verdade.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 23: Conceito 1, definição -->

<!-- objetivo: aluno entende o que é uma sequência e o que significa achar o padrão dela -->

# Conceito 1: sequência numérica

**Definição:** sequência é uma lista de números em ordem, onde cada número tem uma posição.

Cada número da lista se chama **termo**. O 2 é o primeiro termo, o 4 é o segundo, e assim por diante.

**Achar o padrão** é descobrir a regra que leva de um termo para o próximo. Se você acha a regra, consegue continuar a lista sem que ninguém te dê o próximo número.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 24: Conceito 1, as duas perguntas -->

# Duas perguntas resolvem quase tudo

Diante de qualquer sequência, pergunte, de um termo para o seguinte:

**1. Quanto SOMOU?** É a **diferença**: termo de agora menos o anterior.

**2. Quanto MULTIPLICOU?** É a **razão**: termo de agora dividido pelo anterior.

Depois é só olhar qual das duas deu sempre o mesmo resultado:

- Somou sempre igual, a sequência é **aritmética**
- Multiplicou sempre igual, a sequência é **geométrica**
- Nenhuma das duas deu igual, é **nenhuma das duas**, e isso também é resposta

---
layout: two-cols-text
bgPreset: default
---

<!-- SLIDE 25: Conceito 1, exemplo -->

# Exemplo das duas

::left::

## Aritmética

`5, 8, 11, 14`

Diferenças:
8-5 = **3**
11-8 = **3**
14-11 = **3**

Somou sempre 3.
Regra: soma 3 ao anterior.
Próximo: **17**

::right::

## Geométrica

`3, 6, 12, 24`

Razões:
6÷3 = **2**
12÷6 = **2**
24÷12 = **2**

Multiplicou sempre 2.
Regra: dobra o anterior.
Próximo: **48**

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 26: Conceito 1, analogia e pra que serve -->

# Sequência: a analogia

**Aritmética é mesada.** Você recebe 50 reais todo mês. Seu dinheiro cresce sempre do mesmo tanto: 50, 100, 150, 200.

**Geométrica é boato.** Cada pessoa conta pra duas. Uma vira duas, duas viram quatro, quatro viram oito. Cresce cada vez mais rápido, mesmo que a regra seja a mesma.

**Pra que serve:** achar o padrão é o que permite **prever** o próximo valor. É o mesmo raciocínio que um programa usa pra estimar quanto uma loja vai vender no mês que vem.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 27: Fixação 1 -->

<!-- [EXERCICIO] -->
<!-- objetivo: aluno classifica sequências calculando diferença e razão, incluindo o caso nenhuma das duas -->

# Fixação: qual é qual?

No caderno, para cada sequência: calculem as **diferenças**, calculem as **razões**, e escrevam **aritmética**, **geométrica** ou **nenhuma das duas**.

**A)** 7, 10, 13, 16

**B)** 2, 6, 18, 54

**C)** 1, 2, 4, 7

<AdminOnly>

**A) Aritmética.** Diferenças 3, 3, 3. Razões 1,43 / 1,3 / 1,23, que não se repetem. Próximo: 19.

**B) Geométrica.** Razões 3, 3, 3. Diferenças 4, 12, 36, que não se repetem. Próximo: 162.

**C) Nenhuma das duas.** Diferenças 1, 2, 3. Razões 2 / 2 / 1,75. Nem uma nem outra deu constante.

**Puxar com a turma na C:** as diferenças formam elas mesmas um padrão (1, 2, 3), então o próximo termo seria 11. Existe padrão sem ser aritmética nem geométrica. Não force a turma a escolher entre as duas.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
---

<!-- SLIDE 28: Aplicação, folha das sequências -->

<!-- [ATIV AVALIATIVA] -->

# Mão na massa: a folha das sequências

Peguem a folha impressa. São **4 sequências**.

Para cada uma, na própria folha:

**1.** Calculem as diferenças. **2.** Calculem as razões.
**3.** Classifiquem, justificando **com os seus números**.
**4.** Escrevam a regra em palavras. **5.** Projetem o próximo termo, com a conta à mostra.

> A última não é nem aritmética nem geométrica. Isso é de propósito.

---
layout: center
card: true
bgPreset: animate
---

<!-- SLIDE 29: Abertura do conceito 2 -->

# Até agora os números vieram prontos

Número de verdade vem numa tabela, e quase nunca é redondo.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 30: Conceito 2, definição -->

<!-- objetivo: aluno entende o que é variação absoluta e como ela se lê numa tabela -->

# Conceito 2: ler uma série numa tabela

**Definição:** série é uma sequência de números que foram **medidos**, cada um ligado a um momento no tempo.

A diferença pra sequência da aula: aqui os números não saíram de uma regra, saíram da realidade.

**Variação absoluta** é a mesma diferença de antes, com outro nome: quanto mudou de uma medida pra seguinte.

<SlideTable>

| Ano | Valor | Variação absoluta |
|---|---|---|
| 2020 | 100 | |
| 2021 | 130 | +30 |
| 2022 | 145 | +15 |

</SlideTable>

A primeira linha fica vazia: não existe medida anterior pra comparar.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 31: Conceito 2, o que o gráfico mostra -->

# O que o gráfico mostra que a tabela esconde

A tabela e o gráfico têm exatamente os mesmos números. Mudam de forma, não de conteúdo.

O que só o gráfico deixa ver de relance:

- **Se está subindo ou descendo**, sem você ler número nenhum
- **Se está acelerando ou desacelerando**, pela inclinação da linha
- **Qual ponto foge do resto**, porque ele quebra o desenho da linha

Na tabela você precisa comparar de dois em dois. No gráfico você vê tudo de uma vez.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 32: Conceito 2, os quatro obrigatórios -->

# Quatro coisas que não são enfeite

Todo gráfico que você entrega precisa de:

**1. Título.** O que está sendo mostrado.
**2. Nome nos dois eixos.** O que é o de baixo, o que é o do lado.
**3. Unidade.** Habitantes? Reais? Minutos? Sem isso o número não quer dizer nada.
**4. Fonte.** Quem publicou esse dado, e quando.

> Um gráfico sem unidade e sem fonte não é gráfico, é desenho. Não dá pra conferir nem pra confiar.

Isso conversa direto com o que vocês viram ontem sobre julgar fonte.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 33: Fixação 2 -->

<!-- [EXERCICIO] -->
<!-- objetivo: aluno lê tendência e ponto fora da curva a partir de uma tabela pronta -->

# Fixação: leiam esta série

Vendas de uma loja, em unidades, por mês:

<SlideTable>

| Mês | Vendas | Variação |
|---|---|---|
| Março | 400 | |
| Abril | 460 | +60 |
| Maio | 520 | +60 |
| Junho | 310 | ? |
| Julho | 640 | ? |

</SlideTable>

No caderno: **1.** completem as duas variações que faltam. **2.** para onde a série vai no geral? **3.** qual mês foge do padrão?

<AdminOnly>

**1.** Junho: 310 - 520 = **-210**. Julho: 640 - 310 = **+330**.

**2.** No geral **sobe**: de 400 em março para 640 em julho.

**3.** **Junho** foge. É a única variação negativa, e é grande. Nos outros meses a loja cresce de 60 em 60.

**Puxar com a turma:** variação pode ser **negativa**, e o sinal de menos é informação, não erro de conta. E ponto fora da curva quase sempre tem explicação no mundo real: reforma, falta de estoque, feriado. O gráfico mostra que existe; descobrir por quê é outro trabalho.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 34: Aplicação, a série real -->

<!-- [ATIV AVALIATIVA] -->

# Mão na massa: a população de Pato Branco

Peguem a tabela impressa. São os censos do IBGE da cidade de vocês.

**1.** Completem a coluna de **variação absoluta**.

**2.** Calculem a **média das variações**: some todas e divida pela quantidade.

**3.** Respondam: essa série é aritmética, geométrica, ou nenhuma das duas? Justifiquem **com os seus números**.

> Atenção ao intervalo entre os censos. Nem todos são de 10 anos, e isso atrapalha a comparação. Escrevam isso se perceberem.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 35: Como desenhar o gráfico -->

# Desenhando o gráfico à mão

No papel quadriculado, nesta ordem:

**1.** Eixo de baixo: os anos dos censos, espaçados igual.
**2.** Eixo do lado: comece no zero e escolha de quanto em quanto sobe. Com números na casa dos milhares, use 10 mil por quadrado grande.
**3.** Marque um ponto para cada censo, na altura do valor.
**4.** Ligue os pontos com régua.
**5.** Escreva o **título** em cima, o **nome e a unidade** nos dois eixos, e a **fonte** no rodapé.

> A escala do passo 2 é a decisão mais importante. Se você começar muito alto, os pontos se amassam. Se subir de 1 em 1, não cabe na folha.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 36: As duas leituras e a projeção -->

<!-- [ATIV AVALIATIVA] -->

# As duas leituras

Embaixo do gráfico, escrevam duas frases:

**Leitura 1, a tendência.** Para onde a população vai no geral? Está acelerando ou desacelerando?

**Leitura 2, o ponto fora.** Qual censo foge mais do resto? Escrevam qual e arrisquem um motivo.

E depois:

**A projeção.** Se a série continuar assim, qual seria a população no próximo censo? **Mostrem a conta.**

<AdminOnly>

**Sobre o ponto fora:** o salto de 1970 para 1980 é o maior de todos, e tem explicação histórica real. Pato Branco perdeu território com a emancipação de distritos que viraram municípios (Mariópolis, Itapejara do Oeste, e depois Bom Sucesso do Sul em 1993). Ou seja, parte da variação não é gente nascendo ou chegando, é a fronteira do município mudando.

Isso é ouro pedagógico: **o número mudou sem a realidade mudar do jeito que parece**. Vale puxar mesmo que nenhum aluno chegue lá sozinho.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 37: Banco de perguntas para as entrevistas -->

# Entrevistas

<AdminOnly>

**Banco de perguntas incisivas.** Sortear 6 a 8 alunos, 2 perguntas de 60 segundos cada, a partir do momento em que a turma estiver na tabela.

1. Sem olhar a tabela: essa série soma sempre a mesma coisa ou multiplica sempre a mesma coisa? Como você sabe?
2. Aponte no seu gráfico o ponto que mais foge do padrão. Por que ele foge?
3. Se eu apagar o último valor da sua tabela, você consegue recuperá-lo? Faça a conta em voz alta.
4. Por que você escolheu essa escala no eixo do lado? O que aconteceria se subisse de 1 em 1?
5. De onde veio esse número? Quem publicou e quando?
6. Se a série continuar assim, qual o valor no próximo censo? Mostre a conta.
7. O que a variação negativa quer dizer, na prática, pra uma cidade?
8. Por que a primeira linha da coluna de variação fica vazia?

Marcar na lista da turma quem já foi sorteado.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 38: Critérios do bloco de Matemática -->

# Critérios de avaliação: Fundamentos Matemáticos

<AdminOnly>

**Indicador 4, reconhece padrões e sequências numéricas**
Atendido: calcula diferenças **e** razões entre termos consecutivos; classifica cada sequência **justificando com os próprios números**; escreve a regra de formação; projeta o próximo termo mostrando a conta; reconhece a que não é nem uma nem outra. Parcialmente: calcula diferenças ou razões e arrisca a classificação, mas não justifica com números, ou projeta sem mostrar a conta. Não Atendido: não calcula variação entre termos, classifica no chute.

**Indicador 5, interpreta e representa dados em tabelas e gráficos**
Atendido: coluna de variação completa e correta; gráfico à mão com título, nome e unidade nos dois eixos e **fonte citada**; 2 leituras corretas, uma de tendência e uma de ponto fora; média das variações calculada. Parcialmente: tabela e gráfico existem, mas sem rótulo, unidade ou fonte, ou a leitura só repete o valor sem interpretar. Não Atendido: não representa os dados, ou o gráfico não corresponde à tabela.

**Os dois indicadores morrem no T2 e hoje é o único slot restante da UC03 no trimestre. Toda a evidência sai em sala. Sem tarefa de casa.**

</AdminOnly>

---
layout: end
card: true
bgPreset: palette
github: LeoZanini
---

<!-- SLIDE 39: Encerramento -->

# Bom fim de semana

Hoje vocês fecharam as funções que tinham escrito à mão e viram elas rodando de verdade. E descobriram que dado do mundo real quase nunca é redondo, e que isso não é problema: é o que torna a leitura interessante.
