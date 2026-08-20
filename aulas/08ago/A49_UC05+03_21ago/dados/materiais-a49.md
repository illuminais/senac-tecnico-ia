# Materiais — A49, 21/08/2026

UC05 Python para IA + UC03 Fundamentos Matemáticos

> **7:20 às 12:00, 280 minutos de relógio.** Bloco 1 até o intervalo, bloco 2 depois.
> Neste dia **há impressão**.

## Ordem do dia

| Quando | O quê | Precisa de papel? |
|---|---|---|
| 7:20 a 7:30 | Devolver as folhas da A46, explicar o dia | as folhas recolhidas |
| 7:30 a 8:00 | Re-ensino do `return`, projetado | Não |
| 8:00 a 8:10 | Fixação: o que cada função devolve | Não, é no caderno |
| 8:10 a 8:50 | Correção conjunta dos exercícios 1 a 7, no quadro | a folha da A46 |
| 8:50 a 9:00 | Respiro | |
| 9:00 a 9:40 | Computador: exercícios 8 a 11, digitar e rodar | Não |
| 9:40 a 10:00 | Intervalo | |
| 10:00 a 10:45 | Sequências: ensino e fixação | Não, é no caderno |
| 10:45 a 11:10 | Folha das 4 sequências | **Sim** |
| 11:10 a 11:35 | Tabela e gráfico: ensino e fixação | Não, é no caderno |
| 11:35 a 12:00 | Tabela de Pato Branco e gráfico à mão | **Sim** |

Entrevistas individuais correm em paralelo a partir das 11:35.

## Arquivos

| Arquivo | Cópias |
|---|---|
| `sequencias-exercicios.html` | 1 por aluno (29) |
| `serie-pato-branco.html` | 1 por aluno (29) — **2 páginas**, a segunda é o quadriculado |
| `funcoes_abrigo.py` | nas máquinas, na mesma pasta em todos os computadores |

As folhas da A46 (`python-funcoes-exercicios.html`) já estão preenchidas e recolhidas. Devolver no início.

## ⚠️ Conferir antes de imprimir

**Os valores dos censos de 2000 e de 2022 precisam ser confirmados no IBGE Cidades.**

Duas fontes divergem no censo de 2022: uma dá **91.836** e outra dá **96.606**. O valor de **2000 (62.234)** foi inferido a partir de uma reportagem, não lido direto do IBGE. Os demais (1970, 1980, 1991, 2010) batem entre as fontes.

A tabela impressa traz 62.234 e 91.836. Se o IBGE der outro número, corrigir no HTML antes de imprimir, porque a fonte está citada no rodapé da folha.

## Bloco de Python

**Hoje não tem conceito novo.** É o fechamento da Av12-T2, que começou na A46. O aluno recebe a própria folha de volta.

**Critério já anunciado à turma na A46, manter:** vale a lógica. Dois-pontos esquecido e recuo torto entram no feedback escrito, não derrubam a questão.

**Correção em cor diferente.** O aluno corrige a própria folha com outra caneta e escreve numa linha o que estava errado. É isso que vira evidência do Indicador 3, depuração: a marca do próprio erro, com a causa nomeada.

**Onde eles vão apanhar, na ordem** (do `materiais-a46.md`):

| Ex. | Tropeço esperado |
|---|---|
| 1 | esquecer o `:` no fim do `def` |
| 2 | usar `print` no lugar de `return`, ou chamar sem guardar o retorno |
| 4 | comparar com número fixo em vez de usar o segundo parâmetro |
| 5 | testar as condições na ordem errada (o caso de 90 vem antes do de 60) |
| 6 | não converter o `input` para número |
| 7 | dividir sem checar o zero |
| 8 | zerar o acumulador dentro do `for` em vez de antes |
| 9, 11 | esquecer o contador, ou comparar com `=` no lugar de `==` |

**O arquivo `funcoes_abrigo.py`** já traz as funções 1 a 7 prontas (foram corrigidas no quadro, não são segredo) e deixa 8 a 11 com `pass` para o aluno escrever. A Parte 3 tem os testes com o resultado esperado em comentário, e a Parte 4 tem o encadeamento nas duas versões.

**A evidência do Indicador 2** sai da Parte 4: o aluno guarda o retorno de `contar_grandes` numa variável e usa esse retorno dentro de `taxa_de_adocao`. Com a lista do arquivo, o resultado é **60.0**.

## Bloco de Matemática

**Cada indicador tem seu material.** Indicador 4 sai inteiro da folha das 4 sequências. Indicador 5 sai inteiro da tabela de Pato Branco mais o gráfico. Se um atrasar, o outro não cai junto.

**Sem Excel e sem pesquisa na internet.** O gráfico é à mão, no quadriculado. A série vem impressa.

**Gabarito da folha das sequências:**

| # | Sequência | Resposta | Próximo |
|---|---|---|---|
| 1 | 12, 19, 26, 33, 40 | aritmética, diferença +7 | 47 |
| 2 | 4, 12, 36, 108, 324 | geométrica, razão 3 | 972 |
| 3 | 200, 175, 150, 125, 100 | aritmética, diferença **-25** | 75 |
| 4 | 3, 4, 6, 9, 13 | **nenhuma das duas** | 18 |

A sequência 3 é a que ensina que **diferença pode ser negativa**. A 4 é a que ensina que existe padrão sem ser aritmética nem geométrica: as diferenças (1, 2, 3, 4) formam elas mesmas uma sequência.

**Sobre a série de Pato Branco:** as variações são +22.340, +9.738, +6.559, +10.136, +19.466. Ou seja, **não é aritmética nem geométrica**, e isso é o conteúdo. O salto de 1970 para 1980 é o maior de todos e tem explicação histórica real: o município perdeu território com a emancipação de distritos que viraram cidades (Mariópolis, Itapejara do Oeste, e Bom Sucesso do Sul em 1993). Parte da variação não é gente chegando, é a fronteira do município mudando.

Vale puxar isso mesmo que ninguém chegue lá sozinho: **o número mudou sem a realidade ter mudado do jeito que parece.** É o mesmo raciocínio de fonte confiável que eles viram na quinta.

**Os dois indicadores morrem no T2 e hoje é o único slot restante da UC03 no trimestre.** Toda a evidência sai em sala. Sem tarefa de casa em nenhum dos dois blocos.
