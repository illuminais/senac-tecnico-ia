# Doc Hunter — Lendo Documentação Python em Inglês

**Nome:** _____________________________________ **Grupo:** _______

---

## O que é `help()` e o que é um method?

O Python tem documentação embutida. Quando você digita `help(str.split)` no terminal,
o Python mostra exatamente como aquela função funciona — em inglês.

**Method** = uma função que pertence a um tipo de dado. Você chama com ponto:
`"texto".split()` → o method `split` pertence ao tipo `str`
`dados.get("chave")` → o method `get` pertence ao tipo `dict`

**Como ler:** procure as palavras `Return`, `Parameters`, `If` — elas explicam o que entra e o que sai.

---

## Regras da atividade

1. Leia cada extrato sem usar tradutor
2. Use as dicas só se travar
3. Preencha o campo "Com suas palavras" com frases suas — não copie do texto
4. Anote os termos novos no Dicionário no final

---

## METHOD 1 — `str.split()`

```
split(self, /, sep=None, maxsplit=-1)
    Return a list of the words in the string,
    using sep as the delimiter string.

    sep
      The delimiter according to which the string
      should be split. None means split according
      to any whitespace.
    maxsplit
      Maximum number of splits to do.
      -1 means no limit.
```

**Dica:** pense em uma frase separada por espaços ou vírgulas. Esse method divide.

**Responda:**

O que entra como parâmetro? ________________________________________________

O que ele retorna (`Return`)? ________________________________________________

Com suas palavras, o que esse method faz?

___________________________________________________________________________

___________________________________________________________________________

---

## METHOD 2 — `str.strip()`

```
strip(self, chars=None, /)
    Return a copy of the string with leading
    and trailing whitespace removed.

    If chars is given and not None, remove
    characters in chars instead.
```

**Dica:** `leading` = início · `trailing` = fim · `whitespace` = espaço em branco

**Responda:**

O que ele remove por padrão (quando você não passa nada)? _____________________

O que acontece se você passar algo como `chars`? _______________________________

Com suas palavras, o que esse method faz?

___________________________________________________________________________

___________________________________________________________________________

---

## METHOD 3 — `str.replace()`

```
replace(self, old, new, count=-1, /)
    Return a copy with all occurrences of
    substring old replaced by new.

    count
      Maximum number of occurrences to replace.
      -1 means replace all.
```

**Dica:** `occurrences` = todas as vezes que aparece · `substring` = pedaço de string

**Responda:**

O que são os parâmetros `old` e `new`? _________________________________________

O que o parâmetro `count` controla? ___________________________________________

Com suas palavras, o que esse method faz?

___________________________________________________________________________

___________________________________________________________________________

---

## METHOD 4 — `dict.get()`

```
get(self, key, default=None, /)
    Return the value for key if key is in
    the dictionary, else default.
```

**Dica:** `else default` = se a chave não existir, retorna o valor padrão (None se você não definir)

**Responda:**

O que acontece se a chave (`key`) não existir no dicionário? ____________________

Por que isso é melhor que escrever `dict["chave"]` diretamente? _________________

Com suas palavras, o que esse method faz?

___________________________________________________________________________

___________________________________________________________________________

---

## METHOD 5 — `dict.keys()`

```
keys(...)
    D.keys() -> a set-like object providing
    a view on D's keys
```

**Dica:** `keys` = chaves do dicionário · `view` = uma visão em tempo real (muda junto com o dict)

**Responda:**

O que esse method devolve? __________________________________________________

Como você usaria isso com um `for`? __________________________________________

Com suas palavras, o que esse method faz?

___________________________________________________________________________

___________________________________________________________________________

---

## METHOD 6 — `dict.items()`

```
items(...)
    D.items() -> a set-like object providing
    a view on D's items
```

**Dica:** `items` = itens do dicionário, ou seja, os pares chave + valor juntos

**Responda:**

O que é um "item" de um dicionário? __________________________________________

Como você usaria isso com um `for` para acessar chave E valor ao mesmo tempo? ___

___________________________________________________________________________

Com suas palavras, o que esse method faz?

___________________________________________________________________________

___________________________________________________________________________

---

## Dicionário Pessoal — termos desta atividade

Anote os termos em inglês que você encontrou e não conhecia:

| TERMO | O QUE SIGNIFICA AQUI |
|---|---|
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |

**Meta:** mínimo 8 termos preenchidos até o fim da aula.
