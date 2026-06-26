---
theme: ../../slidev-theme-neural
colorSchema: dark
title: "Técnico em IA - Aula 37"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 37"
aulaDate: "2026-06-26"
unlockHour: 13
bgPreset: cover
---

<!-- SLIDE 1 - Capa -->

# Aula 37
## Copa Analytics Dia 2 - Pandas e Desvio Padrao

*26 de junho de 2026*

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- objetivo: aluno identifica o que sera trabalhado no Bloco 1: criacao de planilha, CSV, carregamento com pandas e exploracao de dados -->

# UC05 - Python

## Pandas do Zero

Manha: criar planilha, salvar como CSV, carregar e explorar os dados

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

# Voces ja usaram Excel para organizar dados.

**O que acontece quando a planilha tem 10.000 linhas e voce precisa calcular a media so dos times que chegaram as semis?**

- Quanto tempo levaria no Excel, fazendo manualmente, linha por linha?
- Tem como automatizar isso sem ficar copiando e colando?
- Se precisasse repetir esse calculo toda semana com dados novos, como faria?

<p v-click class="text-green-400 font-bold text-xl mt-4">pandas faz isso em 1 linha de codigo.</p>

---
layout: two-cols-text
card: true
bgPreset: animate
---

<!-- objetivo: aluno entende que pandas e uma biblioteca Python para manipulacao de tabelas de dados (McKinney, 2008) -->

# Pandas: Excel no Python - mas automatico

**O que e pandas?** Uma biblioteca Python criada por Wes McKinney (2008) para trabalhar com tabelas de dados.

**Para que serve:**
- Ler arquivos: CSV, Excel, JSON
- Filtrar e calcular colunas inteiras de uma vez
- Gerar estatisticas automaticamente

::right::

**Quando usar vs Excel:**
- Excel: dados pequenos, grafico rapido, uso manual
- pandas: dados grandes, calculo repetido, automacao, IA

<v-click>

> pandas **nao e** banco de dados, nao e SQL, nao e uma linguagem nova. E uma biblioteca que roda dentro do Python.

</v-click>

---
layout: default
card: true
bgPreset: palette
pulse: true
---

# Instalacao ao Vivo - Passo 1: Instalar

**Abram o terminal (CMD / PowerShell) e digitem:**

```bash
pip install pandas
```

Se aparecer erro de permissao, tente a versao alternativa.

<p v-click class="text-yellow-400">Erro de permissao? Tente: <code>pip install pandas --user</code></p>

---
layout: default
card: true
bgPreset: palette
pulse: false
---

# Instalacao ao Vivo - Passo 2: Testar (cont.)

**Criem `teste_pandas.py` no VS Code e rodem:**

```python
import pandas as pd
print("pandas instalado!")
```

Se o print aparecer no terminal, esta instalado. **Levantem a mao quando funcionar.**

<p v-click class="text-sky-400">PC sem Python? Use <strong>colab.research.google.com</strong> e continue la</p>

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno cria uma tabela estruturada com 5 colunas padronizadas no Excel usando dados da Copa -->

# Criar a Planilha no Excel - Dados da Copa

Cada grupo cria sua propria planilha com os times do trabalho de A36.

**5 colunas obrigatorias:**

<SlideTable>

| selecao | copa | chutes | gols_pro | fase_eliminada |
|---|---|---|---|---|
| Argentina | 2022 | 76 | 15 | campeao |
| Franca | 2022 | 64 | 16 | vice |
| Marrocos | 2022 | 38 | 6 | semi |

</SlideTable>

**Regras:**
- Minimo 4 linhas de dados (4 times diferentes)
- Fase eliminada: usar sempre o mesmo padrao - ex: `grupo`, `oitavas`, `quartas`, `semi`, `campeao`
- Sem espacos no cabecalho: use underline - `gols_pro`, nao `gols pro`

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno salva a planilha do Excel no formato CSV com nome padronizado -->

# Salvar como CSV - Passo a Passo

**No Excel, siga estes passos:**

1. Clique em **Arquivo** no canto superior esquerdo
2. Clique em **Salvar Como**
3. Escolha a pasta onde esta o projeto - ex: `SENAC-TecIA/Aula-37/`
4. Em **Tipo**, mude para: **CSV (separado por virgulas)**
5. Clique em **Salvar**
6. Se o Excel perguntar sobre o formato: clique em **Sim**

---
layout: default
card: true
bgPreset: default
pulse: false
---

# Salvar como CSV - Nome do Arquivo (cont.)

**Nome sugerido para o arquivo:**

```
copa_meu_grupo.csv
```

CSV e um arquivo de texto simples: virgulas separam colunas, quebras de linha separam linhas.

---
layout: default
card: true
bgPreset: default
---

# EX01 - Crie a Planilha do Seu Grupo

**Tarefa:** Cada grupo abre o Excel agora e cria a planilha com os dados da Copa usados em A36.

**O que precisa ter:**
- 5 colunas: `selecao`, `copa`, `chutes`, `gols_pro`, `fase_eliminada`
- Minimo 4 times (4 linhas de dados)
- Salvo como `copa_meu_grupo.csv` na pasta do projeto

**Tempo estimado:** 15 minutos

Se travar: use o arquivo `copa_analise.csv` da aula anterior como substituto.

<AdminOnly>

**Gabarito - exemplo de CSV correto:**

```
selecao,copa,chutes,gols_pro,fase_eliminada
Argentina,2022,76,15,campeao
Franca,2022,64,16,vice
Marrocos,2022,38,6,semi
Croacia,2022,45,8,semi
```

Virgulas como separador, sem espacos extras, sem linhas em branco. O Excel gera isso automaticamente ao salvar como "CSV (separado por virgulas)".

</AdminOnly>

---
layout: default
card: true
bgPreset: animate
---

<!-- objetivo: aluno entende o que significa importar uma biblioteca Python e a convencao do alias pd -->

# import pandas as pd

Antes de usar qualquer ferramenta do pandas, precisamos dizer ao Python que queremos usa-las:

```python
import pandas as pd
```

**O que cada parte significa:**
- `import` - "carregue esta biblioteca para este arquivo"
- `pandas` - o nome da biblioteca
- `as pd` - apelido (alias) - convencao universal em Python

**Analogia:** e como clicar no icone do Excel para abrir o programa. Voce faz isso uma vez, no comeco do arquivo.

`pd` e o apelido que toda a comunidade Python usa. Funciona com qualquer nome, mas `pd` e o padrao que todos esperam.

---
layout: default
card: true
bgPreset: palette
pulse: true
---

# Carreguem o CSV de Voces - pd.read_csv()

**Todos juntos: criem `explorar_copa.py` e digitem linha por linha:**

```python
import pandas as pd

df = pd.read_csv("copa_meu_grupo.csv")

print(df)
```

**O que cada linha faz:**
- Linha 1: abre a caixa de ferramentas (pandas)
- Linha 3: le o arquivo e guarda na variavel `df` - dataframe - e como a planilha se chama no Python
- Linha 5: mostra a tabela inteira no terminal

**Apareceu a tabela? Levantem a mao.** O arquivo CSV precisa estar na mesma pasta do script.

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno verifica os dados carregados com df.head() -->

# Explorar os Dados: head()

**Ver as primeiras linhas - checar se carregou certo:**

```python
print(df.head())     # 5 primeiras linhas (padrao)
print(df.head(3))    # apenas 3 linhas
```

`df.head()` mostra 5 linhas por padrao. Use `df.head(N)` para ver exatamente N linhas.

---
layout: default
card: true
bgPreset: default
pulse: false
---

<!-- objetivo: aluno obtem estatisticas automaticas com df.describe() -->

# Explorar os Dados: describe() (cont.)

**Ver um resumo de todas as colunas numericas:**

```python
print(df.describe())
```

`df.describe()` calcula automaticamente: total, media, desvio padrao, minimo, maximo e quartis.

A linha **`mean`** na saida ja e a media - sem precisar calcular nada.

---
layout: default
card: true
bgPreset: default
---

# EX02 - Carregar o CSV e Rodar describe()

**Tarefa:** Adicione ao arquivo `explorar_copa.py` as linhas abaixo e rode o programa.

```python
print(df.head())
print(df.describe())
```

**Identifique na saida:**
- Qual e a media de chutes? (linha `mean`, coluna `chutes`)
- Qual e o maximo de chutes? (linha `max`)
- Qual e o desvio padrao de `gols_pro`? (linha `std`)

**Tempo estimado:** 10 minutos

<AdminOnly>

**Gabarito - codigo completo:**

```python
import pandas as pd

df = pd.read_csv("copa_meu_grupo.csv")
print(df.head())
print(df.describe())
```

Saida esperada de describe() - linha `mean` e a media:
- chutes: media em torno de 55.75 (varia por planilha)
- gols_pro: media em torno de 11.25 (varia por planilha)

A linha `std` e o desvio padrao - veremos no Bloco 2 o que esse numero significa.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno seleciona uma coluna especifica do dataframe usando a sintaxe de colchetes -->

# df["chutes"] - Acessar uma Coluna

Ate agora vimos a tabela inteira. E se quisermos so uma coluna?

```python
print(df["chutes"])
```

**O que aparece:** todos os valores da coluna `chutes`, um por linha.

**Analogia:** e como clicar no cabecalho de uma coluna no Excel para selecionar so ela - mas em codigo.

---
layout: default
card: true
bgPreset: default
pulse: false
---

# Acessar Qualquer Coluna (cont.)

Para acessar qualquer coluna, use o nome exato do cabecalho:

```python
print(df["gols_pro"])
print(df["fase_eliminada"])
```

O nome precisa ser **identico** ao do cabecalho do CSV. Maiusculas e minusculas importam.

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno calcula a media de uma coluna numerica com o metodo .mean() -->

# .mean() - Calcular a Media

**Media de chutes:**

```python
media = df["chutes"].mean()
print(media)
```

- `.mean()` - soma todos os valores e divide pelo numero de linhas

---
layout: default
card: true
bgPreset: default
pulse: false
---

<!-- objetivo: aluno calcula a mediana de uma coluna numerica com o metodo .median() -->

# .median() - Calcular a Mediana (cont.)

**Mediana de chutes:**

```python
mediana = df["chutes"].median()
print(mediana)
```

Sao os mesmos valores que voces calcularam no papel em A36 - agora o Python faz em 1 linha.

- `.median()` - o valor do meio quando os dados estao em ordem crescente

---
layout: default
card: true
bgPreset: default
---

# EX03 - Media e Mediana com f-string

**Tarefa:** Calcule e imprima a media e a mediana de chutes do seu grupo, usando f-string.

```python
# Starter code
import pandas as pd

df = pd.read_csv("copa_meu_grupo.csv")

media   = ___
mediana = ___

print(f"Media: {media:.1f} chutes")
print(f"Mediana: {mediana:.1f} chutes")
```

**Tempo estimado:** 10 minutos

<AdminOnly>

**Gabarito:**

```python
import pandas as pd

df = pd.read_csv("copa_meu_grupo.csv")

media   = df["chutes"].mean()
mediana = df["chutes"].median()

print(f"Media: {media:.1f} chutes")
print(f"Mediana: {mediana:.1f} chutes")
```

Saida esperada (exemplo com os dados da Copa 2022):

```
Media: 55.8 chutes
Mediana: 54.5 chutes
```

`:.1f` formata o numero com 1 casa decimal.

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
---

# Granulado - Filtrar por Fase e Calcular

Quem terminou o EX03, tente esse desafio extra:

**Calcule a media de chutes so dos times que chegaram as semis.**

<v-click>

```python
semis = df[df["fase_eliminada"] == "semi"]
print(semis["chutes"].mean())
```

</v-click>

**Pergunta:** O resultado e diferente da media geral? Por que isso acontece?

O filtro `df[df["fase_eliminada"] == "semi"]` cria uma nova tabela so com os times de semifinal. Dai voce calcula a media so desse grupo.

---
layout: default
card: true
bgPreset: default
---

# Tarefa de Casa - Aula 37

**Prazo:** inicio da proxima aula

**Tarefa:**

1. Finalize a planilha do seu grupo no Excel com pelo menos 4 times e as 5 colunas obrigatorias
2. Salve como CSV com o nome: `copa_grupo_N.csv` (N = numero do seu grupo)
3. Coloque o arquivo na pasta `SENAC-TecIA/Aula-37/`

**Bonus:** adicione mais 2 times a planilha antes de salvar.

---
layout: default
card: true
bgPreset: default
pulse: false
---

# Tarefa de Casa - Estrutura do CSV (cont.)

**Estrutura esperada do CSV:**

```
selecao,copa,chutes,gols_pro,fase_eliminada
[time1],[ano],[n],[n],[fase]
[time2],[ano],[n],[n],[fase]
```

Na proxima aula vamos usar esse CSV para calcular o desvio padrao e construir um sistema de consulta em Python.

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- objetivo: aluno sabe o que sera trabalhado no Bloco 2: formalizar o desvio padrao em Python e construir sistema de consulta com pandas -->

# UC09 - Estatistica

## Desvio Padrao em Python

Tarde: formalizar o calculo, confirmar com pandas, construir sistema de consulta

---
layout: default
card: true
bgPreset: animate
---

<!-- objetivo: aluno conhece a formula do desvio padrao antes de calcular (Wackerly et al., 2008) -->

# A Formula do Desvio Padrao

**DP = raiz( soma( (xi - media)^2 ) / n )**

Em palavras: quao longe cada valor esta da media, em media.

---
layout: default
card: true
bgPreset: animate
pulse: false
---

# A Formula do Desvio Padrao - Passo a Passo (cont.)

**Passo a passo:**

1. Calcule a media de todos os valores
2. Subtraia a media de cada valor (diferencas)
3. Eleve cada diferenca ao quadrado
4. Some todos os quadrados
5. Divida pelo numero de valores (n)
6. Tire a raiz quadrada do resultado

<p v-click class="text-yellow-400 mt-4">Nao precisa memorizar. O Python calcula por voce - mas e importante saber o que significa.</p>

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno acompanha o calculo manual do desvio padrao passo a passo com valores reais da Copa 2022 -->

# Calculando no Braco - Japao 2022

Valores de chutes por jogo: **12, 8, 6, 8**

<SlideTable>

| Passo | Calculo | Resultado |
|---|---|---|
| Valores | 12, 8, 6, 8 | - |
| Media | (12+8+6+8) / 4 | 8.5 |
| Diferencas | 12-8.5, 8-8.5, 6-8.5, 8-8.5 | 3.5, -0.5, -2.5, -0.5 |
| Quadrados | 3.5^2, 0.5^2, 2.5^2, 0.5^2 | 12.25, 0.25, 6.25, 0.25 |
| Soma dos quadrados | 12.25+0.25+6.25+0.25 | 19.0 |
| Variancia | 19.0 / 4 | 4.75 |
| Desvio Padrao | raiz(4.75) | aprox. 2.18 |

</SlideTable>

**O Japao variou em media 2.18 chutes por jogo - time regular.**

---
layout: default
card: true
bgPreset: default
---

# EX04 - Media, Mediana e Desvio Padrao no Papel

**Enunciado:** Com os dados do Japao 2022 (12, 8, 6, 8 chutes por jogo), calcule NO PAPEL:

1. Media
2. Mediana
3. Desvio padrao (passo a passo, como na tabela acima)

**Tempo estimado:** 15 minutos

<AdminOnly>

**Gabarito:**

**1. Media:**
- soma = 12 + 8 + 6 + 8 = 34
- media = 34 / 4 = **8.5**

**2. Mediana:**
- Ordenar: 6, 8, 8, 12
- 4 valores - pegar os dois do meio: 8 e 8
- mediana = (8 + 8) / 2 = **8.0**

**3. Desvio Padrao (passo a passo):**
- Diferencas: 12-8.5=3.5 | 8-8.5=-0.5 | 6-8.5=-2.5 | 8-8.5=-0.5
- Quadrados: 3.5^2=12.25 | (-0.5)^2=0.25 | (-2.5)^2=6.25 | (-0.5)^2=0.25
- Soma dos quadrados: 12.25+0.25+6.25+0.25 = 19.0
- Variancia: 19.0 / 4 = 4.75
- DP = raiz(4.75) = **aprox. 2.18**

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno verifica que o Python calcula o mesmo desvio padrao calculado no papel usando df.std() (McKinney, pandas documentation) -->

# df["chutes"].std() - Python Confirma o Papel

```python
import pandas as pd

df = pd.read_csv("copa_analise.csv")
print(df["chutes"].std())
# Saida: aprox. 2.18
```

**O metodo `.std()` calcula o desvio padrao automaticamente.**

> Observacao: `.std()` usa n-1 no denominador (correcao de Bessel) por padrao - o resultado pode ser levemente diferente do calculo manual com n. Para usar n exato, passe `ddof=0`: `df["chutes"].std(ddof=0)`.

<p v-click class="text-green-400 font-bold mt-4">O papel e o Python concordam. Matematica funciona.</p>

---
layout: default
card: true
bgPreset: animate
---

<!-- objetivo: aluno interpreta o significado pratico do desvio padrao em termos de consistencia de desempenho -->

# Desvio Padrao Baixo = Consistencia

Dois times, dois estilos:

<SlideTable>

| Time | DP de Chutes | O que significa |
|---|---|---|
| Japao 2022 | aprox. 2.18 | time regular, previsivel, jogo controlado |
| Time hipotetico | aprox. 8.0 | time irregular, dias bons e ruins, imprevisivel |

</SlideTable>

**Quanto menor o DP, mais consistente o time.**

<p v-click class="text-sky-400 font-bold mt-4">Voce prefere contratar um time com DP baixo ou alto para uma final?</p>

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

# O que o desvio padrao diz sobre o estilo de jogo?

**O Japao chegou as quartas de final de 2022 com desvio padrao de chutes de 2.18 - um dos mais baixos do torneio. O que isso diz sobre o estilo de jogo deles?**

1. Um time com DP alto e mais facil ou mais dificil de analisar pelo adversario?
2. Marrocos 2022 tambem tinha DP baixo e foi ate as semis. Coincidencia?
3. O seu time favorito tem DP alto ou baixo? O que isso significa para ele?

**Conexao com a proxima aula:** vamos calcular o DP de todos os times e comparar graficamente com matplotlib.

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno ve o codigo completo do sistema de consulta antes de digitar linha por linha -->

# O Sistema de Consulta - Visao Geral

Antes de digitar, vejam o que vamos construir:

```python
import pandas as pd

df = pd.read_csv("copa_analise.csv")

fase = input("Ver stats de qual fase? (grupo/oitavas/semi/campeao): ")
filtro = df[df["fase_eliminada"] == fase]

print(f"\nTimes na fase: {fase}")
print(f"Media de chutes: {filtro['chutes'].mean():.1f}")
print(f"Mediana de chutes: {filtro['chutes'].median():.1f}")
print(f"Desvio padrao: {filtro['chutes'].std():.1f}")
print(filtro[["selecao", "chutes", "gols_pro"]])
```

**Vamos digitar isso linha por linha. Nao copiem - digitem.**

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno usa input() para receber dados do usuario e criar interatividade no programa -->

# input() - Receber Dado do Usuario

A primeira linha logica do sistema:

```python
fase = input("Ver stats de qual fase? (grupo/oitavas/semi/campeao): ")
```

**Como funciona:**
- O programa pausa e espera o usuario digitar algo
- O usuario digita um texto e pressiona Enter
- O valor digitado fica guardado na variavel `fase`

**Importante:** `input()` sempre retorna texto (string), mesmo que o usuario digite um numero.

O usuario digita `semi` e agora `fase` vale `"semi"`.

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno filtra um dataframe por valor de coluna usando comparacao direta com o valor digitado pelo usuario -->

# Filtro: So os Times da Fase Escolhida

```python {2}
fase = input("Ver stats de qual fase? (grupo/oitavas/semi/campeao): ")
filtro = df[df["fase_eliminada"] == fase]
```

**A linha destacada significa:**
- `df["fase_eliminada"] == fase` - verifica linha por linha: essa fase bate com o que o usuario digitou?
- `df[ ... ]` - pega so as linhas onde a resposta for True (verdadeiro)

**Analogia:** e como um filtro do Excel - mas em uma linha de codigo.

Se o usuario digitou `"semi"`, `filtro` vai ter so os times eliminados na semifinal.

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno usa mean(), median() e std() sobre um dataframe filtrado e formata a saida com f-string -->

# Calcular e Imprimir as Estatisticas

```python {2-4}
print(f"\nTimes na fase: {fase}")
print(f"Media de chutes: {filtro['chutes'].mean():.1f}")
print(f"Mediana de chutes: {filtro['chutes'].median():.1f}")
print(f"Desvio padrao: {filtro['chutes'].std():.1f}")
print(filtro[["selecao", "chutes", "gols_pro"]])
```

**Destaques:**
- `:.1f` formata com 1 casa decimal - ex: `76.3`, nao `76.333333`
- `.mean()`, `.median()`, `.std()` calculam sobre o `filtro` - so os times da fase escolhida
- A ultima linha mostra uma tabela com as colunas `selecao`, `chutes` e `gols_pro`

---
layout: default
card: true
bgPreset: default
---

# EX05 - Digitar o Sistema do Zero

**Tarefa:** Criem um novo arquivo `consulta_copa.py` e digitem o sistema completo, linha por linha junto com o professor.

Depois, testem com:
- fase `semi` - o que aparece?
- fase `grupo` - os numeros mudam? Por que?

**Tempo estimado:** 25 minutos

<AdminOnly>

**Gabarito - codigo completo:**

```python
import pandas as pd

df = pd.read_csv("copa_analise.csv")

fase = input("Ver stats de qual fase? (grupo/oitavas/semi/campeao): ")
filtro = df[df["fase_eliminada"] == fase]

print(f"\nTimes na fase: {fase}")
print(f"Media de chutes: {filtro['chutes'].mean():.1f}")
print(f"Mediana de chutes: {filtro['chutes'].median():.1f}")
print(f"Desvio padrao: {filtro['chutes'].std():.1f}")
print(filtro[["selecao", "chutes", "gols_pro"]])
```

**Saida esperada para fase `semi`:**

```
Times na fase: semi

Media de chutes: 76.3
Mediana de chutes: 74.0
Desvio padrao: 12.1
         selecao  chutes  gols_pro
2       Argentina      76        15
5        Marrocos      61        14
```

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
---

# Granulado: Quem Terminar Primeiro

**Adicione ao seu sistema uma segunda consulta:** o usuario digita o nome de uma selecao e o programa mostra as estatisticas so daquele time.

<v-click>

```python
selecao = input("Ver stats de qual selecao? ")
time = df[df["selecao"] == selecao]
print(time[["selecao", "copa", "chutes", "gols_pro", "fase_eliminada"]])
```

</v-click>

**Dica:** o nome da selecao precisa ser identico ao que esta no CSV. Se o CSV tem `"Argentina"`, o usuario digita exatamente `"Argentina"`.

---
layout: center
card: true
bgPreset: animate
wide: true
---

<!-- objetivo: aluno consolida o que produziu na semana Copa Analytics em A36 e A37 e reconhece a progressao do curso -->

# O que Voces Fizeram Essa Semana

<ul class="mt-4 space-y-3 text-left text-lg">
  <li v-click>Criaram uma base de dados real com dados da Copa 2022 e 2026</li>
  <li v-click>Consultaram com SQL usando GROUP BY e JOIN</li>
  <li v-click>Carregaram com pandas e exploraram com head() e describe()</li>
  <li v-click>Calcularam media, mediana e desvio padrao - no papel e em Python</li>
  <li v-click>Construiram um sistema de consulta interativo</li>
</ul>

<p v-click class="text-green-400 font-bold text-xl mt-6">Isso e o que tecnicos em IA fazem no dia a dia.</p>

---
layout: end
bgPreset: palette
github: LeoZanini
---

**Proxima aula:** Conceitos de ia e transformação digital
