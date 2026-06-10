# Error Detective — Erros Python para Imprimir

**Para o professor — como rodar:**
1. Imprima e recorte em 4 partes. Cada grupo recebe UM erro diferente.
2. Fale: *"Isso é o que o Python mostra quando algo dá errado. Está em inglês, do jeito que aparece no terminal. Leia, descubra qual linha causou o erro e corrija o código no papel."*
3. Circule e pergunte: *"O que o Python está reclamando?" / "Qual linha tem o problema?" / "O que você mudaria?"*
4. Ao final: cada grupo mostra o erro pra turma, fala o nome em inglês e explica o que estava errado.

---

## ✂️ — RECORTE AQUI — ✂️

---

### GRUPO 1 — TypeError

**Código com erro:**
```python
nota = 9
print("Sua nota: " + nota)
```

**O que o Python mostrou:**
```
Traceback (most recent call last):
  File "notas.py", line 2, in <module>
    print("Sua nota: " + nota)
TypeError: can only concatenate str (not "int") to str
```

**Perguntas para responder no papel:**
1. Em qual linha o erro aconteceu? O que está nessa linha?
2. O Python diz *"can only concatenate str (not "int") to str"* — o que ele está reclamando?
3. Como você corrigiria esse código? (dica: `str(nota)`)

**Correção no papel:**
```python
nota = 9
print("Sua nota: " + _________)
```

**Dicionário Pessoal:**

| TERMO | ONDE VI | O QUE SIGNIFICA AQUI |
|---|---|---|
| TypeError | mensagem de erro | |
| concatenate | TypeError: can only... | |
| str / int | mensagem de erro | |

---

## ✂️ — RECORTE AQUI — ✂️

---

### GRUPO 2 — NameError

**Código com erro:**
```python
def calcular(a, b):
    total = a + b
    return resutado

print(calcular(3, 4))
```

**O que o Python mostrou:**
```
Traceback (most recent call last):
  File "calcular.py", line 3, in calcular
    return resutado
NameError: name 'resutado' is not defined
```

**Perguntas para responder no papel:**
1. Em qual linha o erro aconteceu? O que está escrito lá?
2. O Python diz *"name 'resutado' is not defined"* — o que ele não reconhece?
3. Você consegue achar o erro de digitação? Como corrigir?

**Correção no papel:**
```python
def calcular(a, b):
    total = a + b
    return _______

print(calcular(3, 4))
```

**Dicionário Pessoal:**

| TERMO | ONDE VI | O QUE SIGNIFICA AQUI |
|---|---|---|
| NameError | mensagem de erro | |
| defined | NameError: ... is not defined | |
| Traceback | início da mensagem | |

---

## ✂️ — RECORTE AQUI — ✂️

---

### GRUPO 3 — SyntaxError

**Código com erro:**
```python
nota = 8
if nota >= 7
    print("aprovado")
```

**O que o Python mostrou:**
```
  File "aprovado.py", line 2
    if nota >= 7
               ^
SyntaxError: expected ':'
```

**Perguntas para responder no papel:**
1. O `^` aponta para onde o problema está. O que falta naquela posição?
2. O Python diz *"expected ':'"* — o que ele esperava encontrar?
3. Corrija o código adicionando o que falta.

**Correção no papel:**
```python
nota = 8
if nota >= 7___
    print("aprovado")
```

**Dicionário Pessoal:**

| TERMO | ONDE VI | O QUE SIGNIFICA AQUI |
|---|---|---|
| SyntaxError | mensagem de erro | |
| expected | SyntaxError: expected ':' | |
| File / line | início da mensagem | |

---

## ✂️ — RECORTE AQUI — ✂️

---

### GRUPO 4 — IndentationError

**Código com erro:**
```python
def dobrar(numero):
return numero * 2

print(dobrar(5))
```

**O que o Python mostrou:**
```
  File "dobrar.py", line 2
    return numero * 2
    ^
IndentationError: expected an indented block
after function definition on line 1
```

**Perguntas para responder no papel:**
1. O Python aponta para a linha do `return`. O que está errado nela visualmente?
2. *"expected an indented block"* — o que é um "indented block"? (dica: olha os outros exemplos de função que você já escreveu)
3. Corrija o código adicionando o que falta.

**Correção no papel:**
```python
def dobrar(numero):
______return numero * 2

print(dobrar(5))
```

**Dicionário Pessoal:**

| TERMO | ONDE VI | O QUE SIGNIFICA AQUI |
|---|---|---|
| IndentationError | mensagem de erro | |
| indented block | IndentationError: expected... | |
| definition | ...after function definition | |
