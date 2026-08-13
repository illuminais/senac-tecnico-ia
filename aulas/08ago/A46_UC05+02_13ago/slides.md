---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 46"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 46"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-08-13"
unlockHour: 13
layout: cover
---

<!-- SLIDE 1 -->
<!-- objetivo: abrir a aula deixando claro que o dia tem dois blocos e uma prova -->

# Aula 46

## Ler o erro, escrever a função

Inglês Instrumental e Python para IA

---
layout: center
card: true
bgPreset: palette
aulaNum: "Aula 46"
---

<!-- SLIDE 2 -->
<!-- objetivo: divisor de bloco -->

# Bloco 1

## Inglês Instrumental

Hoje a gente aprende a ler o que a máquina responde quando o código quebra.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 3 -->
<!-- objetivo: aluno entende por que as mensagens de erro estao em ingles e por que isso e conteudo de UC02 -->

# Por que tudo quebra em inglês

O Python foi escrito em inglês, e as mensagens de erro nunca foram traduzidas. Isso não é um detalhe: é assim em toda linguagem de programação, em toda biblioteca, em toda documentação.

Quem lê a mensagem resolve sozinho. Quem não lê fica travado esperando alguém ajudar.

> A boa notícia: as mensagens usam sempre as **mesmas poucas palavras**. Hoje você vai aprender essas palavras, e elas servem para o resto do curso.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 4 -->
<!-- objetivo: aluno distingue erro de sintaxe de erro de execucao pelo formato da mensagem na tela -->

# Duas famílias de erro

Existem dois momentos em que um programa pode quebrar, e eles aparecem **diferentes** na tela.

| Família | Quando quebra | Como aparece |
|---|---|---|
| Erro de sintaxe | antes de rodar, o Python nem começou | direto o `File` e o tipo, **sem** `Traceback` |
| Erro de execução | no meio da execução, já rodou um pedaço | começa com `Traceback (most recent call last)` |

Repare nisso nos sete códigos a seguir: os dois primeiros são de uma família, os cinco últimos são da outra.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 5 -->
<!-- objetivo: aluno memoriza o metodo de 3 passos para ler qualquer mensagem de erro -->

# Como ler uma mensagem de erro

Toda mensagem responde três perguntas, sempre na mesma ordem.

| Passo | Pergunta | Onde olhar |
|---|---|---|
| 1 | **Onde?** | `File "arquivo.py", line N` |
| 2 | **O quê?** | o nome do tipo, antes dos dois-pontos |
| 3 | **Por quê?** | a mensagem, depois dos dois-pontos |

Este quadro fica na lousa a aula inteira. Use nos sete códigos a seguir.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 6 -->
<!-- objetivo: aluno entende que traceback se le de baixo para cima -->

# A palavra que muda tudo

```text
Traceback (most recent call last):
  File "programa.py", line 8, in <module>
  File "programa.py", line 5, in minha_funcao
ZeroDivisionError: division by zero
```

`most recent call last` significa: a chamada mais recente aparece **por último**.

Ou seja: quando aparece `Traceback`, você lê **de baixo para cima**. A última linha é a que diz o que aconteceu.

---
layout: code-output
card: true
bgPreset: default
outputLabel: "A mensagem que apareceu"
outputTone: error
aulaNum: "Aula 46"
---

<!-- SLIDE 7 -->
<!-- objetivo: aluno aplica os 3 passos no primeiro erro, o mais literal de todos -->

# C1

```python
def ficha(nome_animal)
    return f"Ficha de {nome_animal}"

print(ficha("Rex"))
```

Aplique os 3 passos: onde, o quê, por quê.

::output::

```text
  File "c1.py", line 1
    def ficha(nome_animal)
                          ^
SyntaxError: expected ':'
```

::note::

<AdminOnly>

Linha 1. `SyntaxError`. `expected` quer dizer "era esperado, estava faltando": falta o dois-pontos no fim da linha do `def`.

</AdminOnly>

---
layout: code-output
card: true
bgPreset: default
outputLabel: "A mensagem que apareceu"
outputTone: error
aulaNum: "Aula 46"
---

<!-- SLIDE 8 -->
<!-- objetivo: aluno percebe que a linha detectada e a linha do conserto podem ser diferentes -->

# C2

```python
def idade_em_anos(idade_meses):
return idade_meses / 12

print(idade_em_anos(30))
```

Este é o código do debate. Duas linhas são citadas.

::output::

```text
  File "c2.py", line 2
    return idade_meses / 12
    ^^^^^^
IndentationError: expected an indented
block after function definition on line 1
```

::note::

<AdminOnly>

Detectado na linha 2, mas o bloco pertence ao `def` da linha 1. `indented` significa recuado, e não identificado.

</AdminOnly>

---
layout: code-output
card: true
bgPreset: default
outputLabel: "A mensagem que apareceu"
outputTone: error
aulaNum: "Aula 46"
---

<!-- SLIDE 9 -->
<!-- objetivo: aluno diferencia parametro de argumento lendo a mensagem -->

# C3

```python
def classifica_espera(dias_no_abrigo):
    if dias_no_abrigo > 60:
        return "longa"
    return "recente"

print(classifica_espera())
```

::output::

```text
TypeError: classifica_espera() missing
1 required positional argument:
'dias_no_abrigo'
```

::note::

<AdminOnly>

`missing` é faltando, `required` é obrigatório, `argument` é o valor que entra na função. Falta passar o valor nos parênteses da linha 6.

</AdminOnly>

---
layout: code-output
card: true
bgPreset: default
outputLabel: "A mensagem que apareceu"
outputTone: error
aulaNum: "Aula 46"
---

<!-- SLIDE 10 -->
<!-- objetivo: aluno entende que o nome citado nunca foi criado -->

# C4

```python
def ficha(nome_animal):
    return f"Ficha de {nome_animal}"

print(ficha(nome_do_animal))
```

::output::

```text
NameError: name 'nome_do_animal'
is not defined
```

::note::

<AdminOnly>

`is not defined` significa que esse nome nunca foi criado, e não que ele "não é definitivo". Ou vira texto entre aspas, ou uma variável que já exista.

</AdminOnly>

---
layout: code-output
card: true
bgPreset: default
outputLabel: "A mensagem que apareceu"
outputTone: error
aulaNum: "Aula 46"
---

<!-- SLIDE 11 -->
<!-- objetivo: aluno associa input com texto e entende concatenate -->

# C5

```python
idade_meses = input("Idade em meses: ")
total = idade_meses + 12
print(total)
```

::output::

```text
TypeError: can only concatenate str
(not "int") to str
```

::note::

<AdminOnly>

`concatenate` é emendar textos. O `input` devolve texto, então o `+` tentou emendar texto com número. Falta converter com `int()`.

</AdminOnly>

---
layout: code-output
card: true
bgPreset: default
outputLabel: "A mensagem que apareceu"
outputTone: error
aulaNum: "Aula 46"
---

<!-- SLIDE 12 -->
<!-- objetivo: aluno le out of range como posicao inexistente -->

# C6

```python
dias = [10, 210, 22, 5]
print(dias[4])
```

Quantos itens tem a lista? Quais posições existem?

::output::

```text
IndexError: list index out of range
```

::note::

<AdminOnly>

`out of range` é fora do intervalo que existe. A lista tem 4 itens, então as posições válidas são 0, 1, 2 e 3.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 13 -->
<!-- objetivo: aluno le o codigo inteiro e antecipa qual das duas chamadas vai quebrar -->

# C7

```python
def media_dias(lista):
    soma = 0
    for d in lista:
        soma = soma + d
    return soma / len(lista)

print(media_dias([10, 210, 22]))
print(media_dias([]))
```

Duas chamadas da mesma função. **Uma funciona e a outra quebra.** Qual das duas quebra, e por quê?

---
layout: code-output
card: true
bgPreset: default
outputLabel: "A mensagem que apareceu"
outputTone: error
aulaNum: "Aula 46"
---

<!-- SLIDE 14 -->
<!-- objetivo: aluno le um traceback de dois niveis aplicando a regra de baixo para cima -->

# C7: o que apareceu na tela

```python
print(media_dias([10, 210, 22]))
print(media_dias([]))
```

::output::

```text
80.66666666666667
Traceback (most recent call last):
  File "c7.py", line 8, in <module>
    print(media_dias([]))
  File "c7.py", line 5, in media_dias
    return soma / len(lista)
ZeroDivisionError: division by zero
```

::note::

<AdminOnly>

Quebrou na linha 5, chamado pela linha 8. A linha 7 funcionou: a diferença é a lista vazia, que faz `len` valer zero.

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 46"
---

<!-- SLIDE 15 -->
<!-- [ATIV AVALIATIVA] objetivo: aluno entende o formato e as regras da prova antes de comecar -->

# Avaliação de hoje: Error Report

> **Individual, em papel, sem computador e sem celular.**

- **Parte 1:** o que a palavra em inglês está dizendo
- **Parte 2A:** o que a mensagem manda fazer, com o código à vista
- **Parte 2B:** só a mensagem, sem o código
- **Parte 3:** descreva o erro com suas palavras
- **Parte 4:** um texto técnico curto em inglês

Cerca de 1 hora. Os sete códigos ficam impressos junto com a prova.

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 46"
---

<!-- SLIDE 16 -->
<!-- [ATIV AVALIATIVA] objetivo: aluno entende que a correcao faz parte da avaliacao -->

# A prova tem duas fases

**Fase 1, agora:** você responde sozinho. Vale o que você consegue ler hoje.

**Fase 2, depois:** a gente corrige junto, e você escreve na última folha o que errou e por quê, com caneta de outra cor.

> A prova só está entregue depois da Fase 2.

**Parcialmente Atendido pode virar Atendido** se a sua correção mostrar que você entendeu o que errou, com as suas palavras. Não vale copiar o gabarito.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 17 -->
<!-- [ATIV AVALIATIVA] objetivo: correcao conjunta da Parte 1 -->

# Correção: Parte 1

Vocabulário dentro da mensagem real.

<AdminOnly>

**1.1** c, era esperado, estava faltando
**1.2** a, um bloco recuado para dentro
**1.3** d, obrigatório, sem ele não roda
**1.4** a, o valor que se passa para a função
**1.5** b, não foi criado em lugar nenhum
**1.6** c, juntar, emendar um no outro
**1.7** d, a posição pedida não existe na lista
**1.8** c, a mais recente vem por último

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 18 -->
<!-- [ATIV AVALIATIVA] objetivo: correcao conjunta das Partes 2A e 2B -->

# Correção: Partes 2A e 2B

<AdminOnly>

**2.1** d, recuar a linha 2 para dentro da função
**2.2** a, passar um valor nos parênteses da linha 6
**2.3** b, converter a resposta do `input()` para número
**2.4** a, pedir uma posição que exista dentro da lista
**2.5** c, instalar ou importar a biblioteca que falta
**2.6** b, o arquivo não está onde o programa foi procurar
**2.7** d, o texto `'doze'` não pode virar número
**2.8** a, listas não têm nenhum comando com esse nome

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 19 -->
<!-- [ATIV AVALIATIVA] objetivo: correcao das tres armadilhas que mais derrubam -->

# As três que mais derrubam

<AdminOnly>

**2.3, aspas no `12`:** o programa **roda sem erro nenhum** e imprime `1212`. Erro que não dá erro é o mais perigoso de todos.

**2.2, criar a variável:** criar uma variável com o nome do parâmetro não resolve. O parâmetro só existe dentro da função.

**2.1, o `on line 1`:** a mensagem cita a linha 1 só para dizer de quem é o bloco. O conserto é na linha 2.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 20 -->
<!-- [ATIV AVALIATIVA] objetivo: correcao conjunta das Partes 3 e 4 -->

# Correção: Partes 3 e 4

<AdminOnly>

**3.1** Detectado na linha 2, mas o bloco pertence ao `def` da linha 1.
**3.2** Quebrou na linha 5, chamado pela linha 8, divisão por zero, porque a lista estava vazia.
**4.1** b, o lugar onde o erro foi detectado, nem sempre o do conserto.
**4.2** c, o que aconteceu e qual é o tipo da exceção.
**4.3** "Note that this is not always the place that needs to be fixed."
**4.4** `where to look` e `what happened`.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
aulaNum: "Aula 46"
---

<!-- SLIDE 21 -->
<!-- objetivo: divisor de bloco -->

# Bloco 2

## Python para IA

Agora vocês escrevem. No papel, à mão, com a folha de consulta do lado.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 22 -->
<!-- objetivo: aluno reconhece as pecas de uma funcao -->

# O que é uma função

Um pedaço de código com nome, que você escreve uma vez e usa quantas vezes quiser.

```python
def nome_da_funcao(parametro):
    ...corpo, sempre recuado...
    return resultado
```

Depois, para usar:

`resultado = nome_da_funcao(valor)`

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 23 -->
<!-- objetivo: aluno separa parametro de argumento, que e exatamente o erro do codigo C3 -->

# Parâmetro e argumento não são a mesma coisa

```python
def dobro(numero):      # numero e o PARAMETRO
    return numero * 2   # so existe aqui dentro

dobro(7)                # 7 e o ARGUMENTO
```

**Parâmetro** é o que está entre parênteses **na hora de definir**. Ele cria um pedacinho de memória que só existe dentro da função. Fora dela, esse nome não vale nada.

**Argumento** é o valor de verdade que você coloca entre parênteses **na hora de chamar**.

> Foi exatamente isso que quebrou no código C3.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 24 -->
<!-- objetivo: aluno escreve as duas primeiras funcoes a mao -->

# Exercícios 1 e 2

**1.** Escreva `def saudacao(nome)` que devolva `"Olá, Rex"` quando receber `"Rex"`.

**2.** Escreva `def dobro(numero)` que devolva o número vezes 2. Depois escreva a linha que chama a função com o valor 7 e guarda o resultado.

<AdminOnly>

```python
def saudacao(nome):
    return f"Olá, {nome}"

def dobro(numero):
    return numero * 2

resultado = dobro(7)
```

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 25 -->
<!-- objetivo: aluno entende que print nao devolve valor e por isso nao pode ser guardado -->

# `return` não é `print`

```python
def dobro_a(n):
    return n * 2        # devolve o valor

def dobro_b(n):
    print(n * 2)        # so mostra na tela

x = dobro_a(5)          # x vale 10
y = dobro_b(5)          # y nao recebeu nada
print(y + 1)            # quebra aqui
```

`return` devolve para quem chamou, e o valor pode ser guardado e reusado. `print` só mostra e some.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 26 -->
<!-- objetivo: aluno compara dois parametros entre si, sem numero fixo -->

# Exercício 4

Escreva `def passou_do_prazo(dias_no_abrigo, limite)` que devolva `True` quando `dias_no_abrigo` for maior que `limite`, e `False` quando não for.

> Atenção: o número de comparação **não é fixo**. Ele chega junto, como segundo parâmetro.

<AdminOnly>

```python
def passou_do_prazo(dias_no_abrigo, limite):
    if dias_no_abrigo > limite:
        return True
    return False
```

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
aulaNum: "Aula 46"
---

<!-- SLIDE 27 -->
<!-- objetivo: aluno monta uma decisao com and e descobre que a ordem do if importa -->

# Exercício 5: o guarda-chuva

`def levar_guarda_chuva(chance_de_chuva, vai_de_carro)`

- `True` se a chance for 90 ou mais, carro ou não
- `True` se a chance for 60 ou mais **e** a pessoa **não** for de carro
- `False` em qualquer outro caso

> A ordem dos testes importa. Pense em qual caso precisa ser checado primeiro.

<AdminOnly>

```python
def levar_guarda_chuva(chance_de_chuva, vai_de_carro):
    if chance_de_chuva >= 90:
        return True
    elif chance_de_chuva >= 60 and vai_de_carro == "não":
        return True
    return False
```

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 28 -->
<!-- objetivo: aluno converte a entrada do usuario, o erro do codigo C5 -->

# Exercício 6

Embaixo da função do exercício 5, escreva as linhas que perguntam a chance de chuva, perguntam se a pessoa vai de carro, chamam a função e mostram a resposta.

> Cuidado com o tipo do que vem do `input`. Lembra do código C5?

<AdminOnly>

```python
chance = int(input("Chance de chuva: "))
carro = input("Vai de carro? sim ou não: ")
print(levar_guarda_chuva(chance, carro))
```

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 29 -->
<!-- objetivo: aluno protege a divisao por zero, o erro do codigo C7 -->

# Exercício 7

Escreva `def taxa_de_adocao(adotados, total)` que devolva a porcentagem de adotados. Se `total` for zero, a função devolve zero em vez de tentar a conta.

> Este é o erro do código C7, agora do outro lado: lá você leu a mensagem, aqui você evita ela.

<AdminOnly>

```python
def taxa_de_adocao(adotados, total):
    if total == 0:
        return 0
    return adotados / total * 100
```

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 30 -->
<!-- objetivo: aluno percorre uma lista com for e acumulador -->

# Exercícios 8 e 9

**8.** `def soma_dias(lista_de_dias)` devolve a soma de todos os números da lista.

**9.** `def contar_grandes(portes)` devolve quantos textos da lista são `"grande"`.

> O acumulador nasce **antes** do `for`, nunca dentro dele.

<AdminOnly>

```python
def soma_dias(lista_de_dias):
    soma = 0
    for d in lista_de_dias:
        soma = soma + d
    return soma

def contar_grandes(portes):
    conta = 0
    for p in portes:
        if p == "grande":
            conta = conta + 1
    return conta
```

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 31 -->
<!-- objetivo: aluno acessa dicionario dentro de funcao -->

# Exercícios 10 e 11

**10.** `def ficha(animal)` recebe `{"nome": "Rex", "porte": "grande"}` e devolve `"Rex, porte grande"`.

**11.** `def contar_por_porte(animais, porte_procurado)` recebe uma lista de dicionários e devolve quantos têm o porte procurado.

<AdminOnly>

```python
def ficha(animal):
    return f"{animal['nome']}, porte {animal['porte']}"

def contar_por_porte(animais, porte_procurado):
    conta = 0
    for a in animais:
        if a["porte"] == porte_procurado:
            conta = conta + 1
    return conta
```

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 46"
---

<!-- SLIDE 32 -->
<!-- tarefa de casa: aula 46 -->

# Tarefa de Casa: Aula 46

> **Prazo: a data que está no topo da sua folha de exercícios.**

Termine, **à mão, na própria folha**, todos os exercícios que não deram tempo em sala.

A folha volta para mim com o conceito e o feedback escrito. Traga também a folha de consulta de funções: ela é sua, pode usar em casa.

Quem terminou tudo em sala: refaça o exercício 5 trocando a regra dos 60 por 70, e veja o que muda.

---
layout: end
card: true
bgPreset: palette
aulaNum: "Aula 46"
---

<!-- SLIDE 33 -->

# Até a próxima

Sexta: banco de dados e quem pode ver o quê.
