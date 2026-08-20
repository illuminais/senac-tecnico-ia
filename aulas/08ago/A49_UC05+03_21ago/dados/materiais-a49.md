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

## Fontes da série de Pato Branco

**Conferido direto no IBGE em 20/08/2026.** Os valores da tabela impressa são os oficiais:

| Censo | Habitantes | Origem |
|---|---|---|
| 1970 | 33.808 | IBGE, tabela 200 |
| 1980 | 45.938 | IBGE, tabela 200 |
| 1991 | 55.675 | IBGE, tabela 200 |
| 2000 | 62.234 | IBGE, tabela 200 |
| 2010 | 72.370 | IBGE, tabela 200 |
| 2022 | 91.836 | IBGE, tabela 4709 (Censo 2022) |

Duas correções em relação à primeira versão desta folha, ambas vindas de fonte não oficial e já descartadas:

- **1970 estava como 23.597.** O valor oficial é **33.808**. A diferença de 10 mil habitantes vinha de reportagem e distorcia toda a primeira variação.
- **2022 aparecia como 96.606 numa fonte.** O censo oficial é **91.836**. Os 96.606 são estimativa populacional, que é outra coisa.

Isso vale como exemplo em sala, se der tempo: duas fontes jornalísticas erraram um número que está publicado de graça no site do órgão que produziu o dado.

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

**Gabarito da série de Pato Branco.** As variações absolutas são:

| Período | Variação | Anos | Por ano |
|---|---|---|---|
| 1970 a 1980 | +12.130 | 10 | 1.213 |
| 1980 a 1991 | +9.737 | 11 | 885 |
| 1991 a 2000 | +6.559 | 9 | 729 |
| 2000 a 2010 | +10.136 | 10 | 1.014 |
| 2010 a 2022 | +19.466 | 12 | 1.622 |

**Média das variações: 11.605,6.**

**Classificação: nenhuma das duas.** As diferenças vão de 6.559 a 19.466, então não é aritmética. As razões são 1,36 / 1,21 / 1,12 / 1,16 / 1,27, então não é geométrica. Aceitar "quase aritmética" como Parcialmente Atendido se o aluno justificar com os números.

**Leitura de tendência esperada:** sobe sempre, mas **desacelerou até 2000 e voltou a acelerar depois**. A coluna "por ano" é o que deixa isso óbvio, e é ela que separa o Atendido do Parcialmente.

**Ponto que foge:** o período de 2010 a 2022, que é o maior salto. Duas explicações valem, e as duas são boas:

1. **O intervalo é de 12 anos, não 10.** O censo de 2020 foi adiado. Comparar +19.466 com +10.136 sem notar isso é erro de leitura, e é exatamente o que a coluna "por ano" corrige.
2. O período mais lento, de 1991 a 2000, coincide com a emancipação de **Bom Sucesso do Sul em 1993**, que tirou território e gente do município. Parte da desaceleração não é gente deixando de chegar, é a fronteira mudando.

O segundo ponto é ouro e vale puxar mesmo que ninguém chegue lá: **o número mudou sem a realidade ter mudado do jeito que parece.** É o mesmo raciocínio de fonte confiável da aula de quinta.

**Os dois indicadores morrem no T2 e hoje é o único slot restante da UC03 no trimestre.** Toda a evidência sai em sala. Sem tarefa de casa em nenhum dos dois blocos.
