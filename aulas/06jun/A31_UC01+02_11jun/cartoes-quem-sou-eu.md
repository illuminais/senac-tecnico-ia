# Quem sou eu? Python Edition — Cartões para Imprimir

**Instrução:** Imprima, recorte na grade. Cole 1 cartão nas costas de cada aluno sem ele ver.
Alunos fazem perguntas de **sim ou não** até descobrir quem são.

**Distribuição sugerida:** Dê os cartões ●●● (erros) para alunos mais confiantes, ou avise a turma que esses têm dicas visíveis para ajudar quem tem dificuldade.

---

## Folha 1 — Tipos de dado e palavras-chave (fáceis)

| | | |
|---|---|---|
| **list** <br><br> ●○○ <br><br> • Sou um tipo de dado <br> • Guardo vários itens em ordem <br> • Apareço entre `[ ]` | **string** <br><br> ●○○ <br><br> • Sou um tipo de dado <br> • Represento texto <br> • Apareço entre aspas `" "` ou `' '` | **int** *(integer)* <br><br> ●○○ <br><br> • Sou um tipo de dado <br> • Sou número inteiro, sem vírgula <br> • Ex: `idade = 20` |
| **float** <br><br> ●○○ <br><br> • Sou um tipo de dado <br> • Sou número com vírgula decimal <br> • Ex: `nota = 8.5` | **True / False** <br><br> ●○○ <br><br> • Sou um tipo de dado <br> • Só tenho dois valores possíveis <br> • Começo com letra maiúscula em Python | **variable** *(variável)* <br><br> ●○○ <br><br> • Não sou um tipo, sou um conceito <br> • Guardo um valor com um nome <br> • Em `x = 10`, o `x` é o que represento |
| **print()** <br><br> ●○○ <br><br> • Sou uma função embutida do Python <br> • Mostro algo na tela <br> • Ex: `print('olá')` | **for** <br><br> ●○○ <br><br> • Sou uma palavra-chave <br> • Repito um bloco para cada item <br> • Ex: `for fruta in frutas:` | **def** <br><br> ●○○ <br><br> • Sou uma palavra-chave <br> • Inicio toda declaração de função <br> • Ex: `def calcular(x):` |
| **return** <br><br> ●○○ <br><br> • Sou uma palavra-chave <br> • Faço a função devolver um valor <br> • Apareço dentro de funções | **if** <br><br> ●○○ <br><br> • Sou uma palavra-chave <br> • Executo um bloco só se condição for verdadeira <br> • Ex: `if nota >= 7:` | **import** <br><br> ●○○ <br><br> • Sou uma palavra-chave <br> • Trago uma biblioteca para o código <br> • Ex: `import math` |

---

## Folha 2 — Funções, conceitos e estruturas (médios)

| | | |
|---|---|---|
| **function** *(função)* <br><br> ●●○ <br><br> • Sou um bloco de código com nome <br> • Posso ser chamado várias vezes <br> • Em Python começo com `def` | **method** *(método)* <br><br> ●●○ <br><br> • Sou como função, mas pertenço a um tipo de dado <br> • Sou chamado com ponto: `objeto.eu()` <br> • Ex: `lista.append()` | **parameter** *(parâmetro)* <br><br> ●●○ <br><br> • Estou entre parênteses de uma função <br> • Sou o que a função espera receber <br> • Em `def dobrar(x)`, o `x` é o que represento |
| **library** *(biblioteca)* <br><br> ●●○ <br><br> • Sou um pacote de funções prontas <br> • Preciso de `import` para ser acessado <br> • Ex: `import math`, `import random` | **loop** <br><br> ●●○ <br><br> • Sou uma estrutura, não uma palavra-chave <br> • Repito um bloco de código <br> • Em Python apareço com `for` ou `while` | **boolean** <br><br> ●●○ <br><br> • Sou um tipo de dado <br> • Meus únicos valores são `True` ou `False` <br> • Vem de lógica matemática |
| **index** *(índice)* <br><br> ●●○ <br><br> • Não sou um tipo de dado <br> • Sou a posição de um item numa lista <br> • Começo em 0. Ex: `lista[0]` | **comment** *(comentário)* <br><br> ●●○ <br><br> • O Python me ignora completamente <br> • Começo com `#` <br> • Sirvo para explicar o código a humanos | **tuple** <br><br> ●●○ <br><br> • Sou um tipo de dado parecido com lista <br> • Uso parênteses: `(1, 2, 3)` <br> • Não posso ser modificado depois de criado |
| **set** <br><br> ●●○ <br><br> • Sou um tipo de dado <br> • Não tenho ordem nem itens repetidos <br> • Uso `{1, 2, 3}`. Operações: `\|` e `&` | **append()** <br><br> ●●○ <br><br> • Sou um method de list <br> • Adiciono um item ao final da lista <br> • Ex: `frutas.append('uva')` | **len()** <br><br> ●●○ <br><br> • Sou uma função embutida <br> • Digo quantos itens há numa lista ou string <br> • Ex: `len([1, 2, 3])` → `3` |
| **range()** <br><br> ●●○ <br><br> • Sou uma função usada com `for` <br> • Gero uma sequência de números <br> • Ex: `for i in range(5):` → 0, 1, 2, 3, 4 | **dictionary** *(dict)* <br><br> ●●○ <br><br> • Sou um tipo de dado com chave e valor <br> • Apareço entre `{ }` com `:` <br> • Ex: `{"nome": "Ana", "idade": 20}` | **None** <br><br> ●●○ <br><br> • Sou um valor especial do Python <br> • Represento "ausência de valor" <br> • Uma função sem `return` me devolve |

---

## Folha 3 — Erros e exceções (difíceis — com dicas detalhadas)

> **Para o professor:** Esses cartões são mais difíceis. Peça para os colegas lerem as dicas em voz alta se o aluno travar, ou use como pista progressiva (dica 1 → 2 → 3).

| | | |
|---|---|---|
| **TypeError** <br><br> ●●● <br><br> **Sou um tipo de erro.** <br><br> Dica 1: Apareço quando tipos incompatíveis são usados juntos <br> Dica 2: `"nota: " + 9` me causa — string + int não pode <br> Dica 3: Meu nome diz que o problema é com o ***tipo*** de dado | **NameError** <br><br> ●●● <br><br> **Sou um tipo de erro.** <br><br> Dica 1: Apareço quando o código usa um nome não definido <br> Dica 2: Se você escreve `resutado` em vez de `resultado`, apareço <br> Dica 3: Meu nome diz que o problema é com um ***nome*** desconhecido | **SyntaxError** <br><br> ●●● <br><br> **Sou um tipo de erro.** <br><br> Dica 1: Apareço antes do código rodar — o Python nem tenta executar <br> Dica 2: Esquecer `:` no `for` ou `def` me causa <br> Dica 3: Meu nome diz que o problema é com a ***gramática*** do código |
| **IndentationError** <br><br> ●●● <br><br> **Sou um tipo de erro.** <br><br> Dica 1: Apareço quando os espaços/tabs estão errados <br> Dica 2: Um `return` fora do bloco da função me causa <br> Dica 3: Meu nome diz que o problema é com a ***indentação*** (recuo) | **ValueError** <br><br> ●●● <br><br> **Sou um tipo de erro.** <br><br> Dica 1: O tipo de dado está certo, mas o valor não faz sentido <br> Dica 2: `int("abc")` me causa — str é tipo certo, mas "abc" não vira número <br> Dica 3: Meu nome diz que o problema é com o ***valor*** passado | **KeyError** <br><br> ●●● <br><br> **Sou um tipo de erro em dicionários.** <br><br> Dica 1: Apareço quando você acessa uma chave que não existe no dict <br> Dica 2: `dados["email"]` quando `"email"` não foi definido me causa <br> Dica 3: Meu nome diz que o problema é com uma ***chave*** inexistente |

---

## Cartões extras (opcional — turmas maiores)

| | | |
|---|---|---|
| **parameter** *(cópia)* <br><br> ●●○ <br><br> • Estou entre parênteses de uma função <br> • Sou o que a função espera receber <br> • Em `def dobrar(x)`, o `x` é o que represento | **method** *(cópia)* <br><br> ●●○ <br><br> • Sou como função, mas pertenço a um tipo de dado <br> • Sou chamado com ponto: `objeto.eu()` <br> • Ex: `lista.append()` | **TypeError** *(cópia)* <br><br> ●●● <br><br> **Sou um tipo de erro.** <br><br> Dica 1: Apareço quando tipos incompatíveis são usados juntos <br> Dica 2: `"nota: " + 9` me causa — string + int não pode <br> Dica 3: Meu nome diz que o problema é com o ***tipo*** de dado |
