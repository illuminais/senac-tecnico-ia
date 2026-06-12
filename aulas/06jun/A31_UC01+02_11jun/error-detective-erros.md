# Error Detective — Lendo Tracebacks Python em Inglês

**Nome:** _____________________________________ **Grupo:** _______

---

## O que é um Traceback?

Quando o Python encontra um erro, ele mostra uma mensagem em inglês chamada **Traceback**.
Ela diz: qual arquivo, qual linha e qual tipo de erro aconteceu.

```
Traceback (most recent call last):     ← "ocorreu no final desta sequência"
  File "arquivo.py", line 2, in ...    ← arquivo e linha do problema
    código que causou o erro           ← a linha exata
NomeDoErro: descrição do problema      ← tipo + explicação
```

**Sua tarefa em cada erro:**
1. Ache qual linha causou o problema
2. Leia o que o Python está dizendo (em inglês)
3. Corrija o código no espaço abaixo
4. Escreva com suas palavras o que causou o erro

---

## ERROR 1 — TypeError

**Código com erro:**
```python
nota = 9
print("Sua nota: " + nota)
```

**Traceback:**
```
Traceback (most recent call last):
  File "notas.py", line 2, in <module>
    print("Sua nota: " + nota)
TypeError: can only concatenate str (not "int") to str
```

**Dica:** `concatenate` = juntar strings · o Python diz que não dá pra juntar `str` com `int`

Qual linha causou o erro? ___________________________________________________

O que o Python está reclamando? ______________________________________________

Corrija o código:
```python
nota = 9
print("Sua nota: " + _______________)
```

Com suas palavras, o que é um **TypeError**?

___________________________________________________________________________

___________________________________________________________________________

---

## ERROR 2 — NameError

**Código com erro:**
```python
def calcular(a, b):
    total = a + b
    return resutado

print(calcular(3, 4))
```

**Traceback:**
```
Traceback (most recent call last):
  File "calcular.py", line 3, in calcular
    return resutado
NameError: name 'resutado' is not defined
```

**Dica:** `not defined` = não foi definido · olhe com atenção o nome da variável

Qual linha causou o erro? ___________________________________________________

O que o Python não reconhece? _______________________________________________

Corrija o código (há um erro de digitação):
```python
def calcular(a, b):
    total = a + b
    return ___________

print(calcular(3, 4))
```

Com suas palavras, o que é um **NameError**?

___________________________________________________________________________

___________________________________________________________________________

---

## ERROR 3 — SyntaxError

**Código com erro:**
```python
nota = 8
if nota >= 7
    print("aprovado")
```

**Traceback:**
```
  File "aprovado.py", line 2
    if nota >= 7
               ^
SyntaxError: expected ':'
```

**Dica:** o `^` aponta onde o Python esperava encontrar algo · `expected` = esperava

Qual linha causou o erro? ___________________________________________________

O que o Python esperava encontrar (`expected`)? ________________________________

Corrija o código:
```python
nota = 8
if nota >= 7___
    print("aprovado")
```

Com suas palavras, o que é um **SyntaxError**?

___________________________________________________________________________

___________________________________________________________________________

---

## ERROR 4 — IndentationError

**Código com erro:**
```python
def dobrar(numero):
return numero * 2

print(dobrar(5))
```

**Traceback:**
```
  File "dobrar.py", line 2
    return numero * 2
    ^
IndentationError: expected an indented block
after function definition on line 1
```

**Dica:** `indented block` = bloco com recuo (os espaços antes do código dentro da função)

Qual linha causou o erro? ___________________________________________________

O que o Python esperava depois do `def`? ______________________________________

Corrija o código (adicione o que falta):
```python
def dobrar(numero):
________return numero * 2

print(dobrar(5))
```

Com suas palavras, o que é um **IndentationError**?

___________________________________________________________________________

___________________________________________________________________________

---

## ERROR 5 — ValueError

**Código com erro:**
```python
numero = int("abc")
print(numero)
```

**Traceback:**
```
Traceback (most recent call last):
  File "converter.py", line 1, in <module>
    numero = int("abc")
ValueError: invalid literal for int() with base 10: 'abc'
```

**Dica:** `invalid literal` = valor inválido · o tipo está certo (`str`), mas o conteúdo não faz sentido como número

Qual linha causou o erro? ___________________________________________________

Por que `int("abc")` falha mas `int("9")` funciona? ____________________________

___________________________________________________________________________

Corrija o código para converter um número válido:
```python
numero = int(_________)
print(numero)
```

Com suas palavras, o que é um **ValueError**?

___________________________________________________________________________

___________________________________________________________________________

---

## Dicionário Pessoal — termos desta atividade

| TERMO | O QUE SIGNIFICA AQUI |
|---|---|
| TypeError | |
| NameError | |
| SyntaxError | |
| IndentationError | |
| ValueError | |
| Traceback | |
| defined | |
| expected | |
