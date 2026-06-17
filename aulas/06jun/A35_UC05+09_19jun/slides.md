---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 35 — Copa Analytics Dia 2"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 35"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-06-19"
unlockHour: 9
layout: cover
---

<!-- SLIDE 1 -->

# Aula 35
## Copa Analytics - Dia 2

**UC05 Python + UC09 Estatistica**

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 2 -->

# BLOCO 1
## UC05 Python para IA
### Programando a resposta do seu time

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 35"
---

<!-- SLIDE 3 -->
<!-- objetivo: reativar o contexto da dinâmica do dia anterior e conectar a pergunta-guia ao trabalho de hoje -->

# Retomada: o que o seu time descobriu ontem?

**5 minutos - cada time responde em voz alta:**

- Qual era a pergunta-guia do seu time?
- O que as queries SQL mostraram sobre os dados de 2026?
- Qual seleção lidera segundo os dados que voces encontraram?

> Hoje voces vao escrever o codigo Python que confirma ou refuta essa resposta com numeros reais.

---
layout: center
card: true
bgPreset: animate
aulaNum: "Aula 35"
---

<!-- SLIDE 4 -->
<!-- objetivo: apresentar o dataset copa2026_stats.csv como ponto de entrada real para o bloco de Python -->

# O dataset do dia

`copa2026_stats.csv` - 24 selecoes, dados completos da fase de grupos 2026

> Carregar, explorar, analisar, responder.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 5 -->
<!-- objetivo: aluno consegue carregar e inspecionar um CSV com pandas usando read_csv, .head() e .describe() -->

# Carregando o dataset com pandas

<!-- professor: pandas ja foi visto na A26 como introducao; este e o primeiro uso formal no T2 -->

**Passo 1: importar e carregar**

```python {1-2|3|4|5}
import pandas as pd

df = pd.read_csv('copa2026_stats.csv')
print(df.head())          # primeiras 5 linhas
print(df.columns.tolist()) # nomes das colunas
```

**Colunas do dataset:**
`nome, grupo, jogos, vitorias, empates, derrotas,`
`gols_pro, gols_contra, saldo_gols, pontos, posse_media,`
`chutes, amarelos, vermelhos`

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 6 -->
<!-- objetivo: aluno usa .describe() para ter uma visao geral estatistica do dataset -->

# Explorando com .describe()

```python {1|2|3}
df = pd.read_csv('copa2026_stats.csv')

print(df.describe())  # media, min, max de todas as colunas numericas
```

**O que o `.describe()` mostra:**

- `count` - quantas linhas tem dados (sem missing values)
- `mean` - media de cada coluna numerica
- `min` / `max` - menor e maior valor
- `std` - desvio padrao (vamos usar isso no Bloco 2)

> `describe()` e o "relatorio rapido" do seu dataset. Qualquer analista de dados usa isso primeiro.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 7 -->
<!-- objetivo: aluno entende quando usar dict para representar dados estruturados de uma selecao -->

# Dict: representando uma selecao

Um `dict` (dicionario) guarda pares **chave: valor**. Perfeito para representar os atributos de uma selecao.

```python {1-7|8|9}
brasil = {
    'pontos': 1,
    'gols_pro': 1,
    'saldo_gols': 0,
    'posse_media': 62,
    'amarelos': 1
}

print(brasil['pontos'])     # 1
print(brasil['posse_media']) # 62
```

**Analogia:** um `dict` e como a ficha de um jogador num videogame - cada atributo tem um nome e um valor.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 8 -->
<!-- objetivo: aluno entende a diferenca entre dict, set e tuple e quando cada um faz sentido no contexto de dados -->

# Tres estruturas, tres propositos

<SlideTable>

| Estrutura | Caracteristica | Uso na Copa Analytics |
|---|---|---|
| `dict` | chave: valor, mutavel | ficha de cada selecao |
| `set` | sem repeticao, sem ordem | filtrar selecoes por criterio |
| `tuple` | imutavel, ordenado | lacrar o resultado final |

</SlideTable>

> **Regra pratica:** use `dict` para descrever, `set` para filtrar, `tuple` para lacrar.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 9 -->
<!-- objetivo: aluno usa set comprehension para filtrar selecoes que atendem a um criterio numerico -->

# Set: filtrando selecoes com saldo positivo

```python {1-6|7-8|9}
stats = {
    'Argentina': {'saldo_gols': 3},
    'Brasil':    {'saldo_gols': 0},
    'EUA':       {'saldo_gols': 3},
    'Haiti':     {'saldo_gols': -1}
}

saldo_positivo = {s for s in stats if stats[s]['saldo_gols'] > 0}
# {'Argentina', 'EUA'}  -- ordem pode variar (set nao tem ordem)
```

**Por que `set` e nao `list`?**

- A ordem nao importa aqui - queremos apenas saber **quem** passou
- `set` garante que cada selecao aparece **uma unica vez**

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 10 -->
<!-- objetivo: aluno entende o conceito de imutabilidade do tuple e quando isso e util para lacrar resultados -->

# Tuple: lacrando o resultado

Depois de calcular, voce nao quer que ninguem (nem o codigo) altere o resultado. Use `tuple`.

```python {1-2|3-4|5-6}
melhor = ('EUA', 3)  # (nome da selecao, saldo de gols)

print(melhor[0])  # 'EUA'
print(melhor[1])  # 3

melhor[0] = 'Brasil'  # TypeError: tuple nao permite alteracao!
```

**Analogia:** um tuple e como um placar lacrado num envelope - depois de fechar, nao da para mudar.

> Em sistemas reais, tuples protegem resultados finais de analises de serem sobrescritos por acidente.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 11 -->
<!-- objetivo: aluno escreve uma funcao que integra dict e tuple para responder a pergunta-guia do time -->

# Funcao que responde a pergunta-guia

```python {1-4|5-8|9-10}
def melhor_selecao(stats, criterio):
    """Retorna (nome, valor) da selecao com maior valor no criterio."""
    melhor_nome = max(stats, key=lambda s: stats[s][criterio])
    melhor_valor = stats[melhor_nome][criterio]
    return (melhor_nome, melhor_valor)  # tuple imutavel

# Testando:
resultado = melhor_selecao(stats, 'pontos')
print(resultado)  # ex: ('Argentina', 7)
```

**Starter code para o time:** a assinatura da funcao esta pronta - voces completam o corpo.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 12 -->
<!-- objetivo: aluno pratica a leitura de codigo com dict e set (nivel N0 - reconhecimento) -->

# Exercicio 1 - Nivel 1: O que esse codigo imprime?

<!-- professor: exercicio de leitura (N0 obrigatorio) antes de pedir escrita -->

```python
selecoes = {
    'Franca':   {'pontos': 7, 'grupo': 'A'},
    'Mexico':   {'pontos': 4, 'grupo': 'B'},
    'Japao':    {'pontos': 7, 'grupo': 'A'},
    'Equador':  {'pontos': 1, 'grupo': 'B'}
}

lider_grupo_a = {s for s in selecoes
                 if selecoes[s]['grupo'] == 'A'
                 and selecoes[s]['pontos'] >= 7}

print(lider_grupo_a)
print(type(lider_grupo_a))
```

**Salve como:** `SENAC-TecIA/Aula-35/ex01_leitura.py`

<AdminOnly>

**Gabarito:**

```
{'Franca', 'Japao'}
<class 'set'>
```

O set contem as duas selecoes do grupo A com 7 pontos ou mais. A ordem pode variar porque set nao tem ordem garantida.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 13 -->
<!-- objetivo: aluno escreve um dict com os dados da selecao do time e usa uma chave para consultar -->

# Exercicio 2 - Nivel 2: Monte a ficha da sua selecao

<!-- professor: exercicio de escrita guiada - aluno usa o dataset como referencia -->

**Usando os dados do `copa2026_stats.csv`, monte o dict da sua selecao-alvo:**

```python
# Starter code - substitua os valores pelos dados reais do CSV
minha_selecao = {
    'nome': '___',
    'pontos': ___,
    'gols_pro': ___,
    'saldo_gols': ___,
    'posse_media': ___
}

# Imprima o pontos e o saldo
print(f"Pontos: {minha_selecao['pontos']}")
print(f"Saldo: {minha_selecao['saldo_gols']}")
```

**Salve como:** `SENAC-TecIA/Aula-35/ex02_ficha_selecao.py`

<AdminOnly>

**Gabarito (exemplo com Brasil - valores do CSV):**

```python
minha_selecao = {
    'nome': 'Brasil',
    'pontos': 1,
    'gols_pro': 1,
    'saldo_gols': 0,
    'posse_media': 62
}

print(f"Pontos: {minha_selecao['pontos']}")   # Pontos: 1
print(f"Saldo: {minha_selecao['saldo_gols']}") # Saldo: 0
```

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 14 -->
<!-- objetivo: aluno escreve a funcao melhor_selecao e testa com assert (peer review entre times) -->

# Exercicio 3 - Nivel 3: Funcao do time + Peer Review

**Parte A - Analista de Dados escreve a funcao:**

```python
# Starter code
stats_mini = {
    'Argentina': {'pontos': 7, 'saldo_gols': 5},
    'EUA':       {'pontos': 6, 'saldo_gols': 3},
    'Brasil':    {'pontos': 1, 'saldo_gols': 0}
}

def melhor_selecao(stats, criterio):
    # Complete aqui
    pass

resultado = melhor_selecao(stats_mini, 'pontos')
print(resultado)  # deve ser ('Argentina', 7)
```

**Parte B - Time vizinho testa com:**
```python
assert melhor_selecao(stats_mini, 'pontos') == ('Argentina', 7)
assert melhor_selecao(stats_mini, 'saldo_gols') == ('Argentina', 5)
print("Passou nos testes!")
```

**Salve como:** `SENAC-TecIA/Aula-35/ex03_funcao_time.py`

<AdminOnly>

**Gabarito:**

```python
def melhor_selecao(stats, criterio):
    melhor_nome = max(stats, key=lambda s: stats[s][criterio])
    melhor_valor = stats[melhor_nome][criterio]
    return (melhor_nome, melhor_valor)
```

O `max()` com `key=lambda` percorre o dict e retorna a chave com maior valor no criterio escolhido. O retorno e um tuple imutavel.

</AdminOnly>

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 35"
---

<!-- SLIDE 15 -->

# Debate: dict, set ou tuple?

**Discussao coletiva: 5 minutos**

- Se voce fosse guardar o historico de todas as copas de uma selecao, qual estrutura usaria? Por que?
- Por que `set` nao serve para guardar resultados ordenados (1o lugar, 2o lugar)?
- Quando e perigoso usar uma `list` onde deveria ser um `tuple`?

> **Conexao com o Bloco 2:** agora que voces sabem representar os dados, vamos calcular estatisticas reais sobre o historico de 3 Copas.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 16 -->
<!-- tarefa de casa: aula 35 UC05 -->

# Tarefa de Casa - UC05

> **Prazo: proxima aula (A36)**

**Desafio: expanda a funcao do time**

Abra `SENAC-TecIA/Aula-35/ex03_funcao_time.py` e adicione:

1. Uma funcao `pior_selecao(stats, criterio)` que retorna a selecao com o MENOR valor no criterio
2. Teste com `assert pior_selecao(stats_mini, 'pontos') == ('Brasil', 1)`
3. Crie um `set` com todas as selecoes que tem saldo negativo no seu `stats_mini`

**Salve o arquivo atualizado em:** `SENAC-TecIA/Aula-35/tarefa_uc05.py`

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 17 -->

# BLOCO 2
## UC09 Estatistica Aplicada
### Historico de 3 Copas - media, mediana e a resposta final

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 35"
---

<!-- SLIDE 18 -->
<!-- objetivo: ativar o conceito de media e mediana com analogia concreta antes de introduzir pandas -->

# Pergunta de ativacao

**Antes de abrir o codigo, pense:**

Uma selecao marcou esses gols nas ultimas 3 Copas:

**Copa 2014: 1 gol | Copa 2018: 6 gols | Copa 2022: 5 gols**

- Qual e a media de gols?
- Se a Copa 2014 foi um desastre (o time tomou 7), a media ainda representa bem o time?
- O que seria mais justo usar para comparar com outros times?

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 19 -->
<!-- objetivo: aluno carrega copa2026_historico.csv e entende a estrutura das 72 linhas (24 selecoes x 3 copas) -->

# Carregando o historico de 3 Copas

```python {1-3|4-6|7}
import pandas as pd

historico = pd.read_csv('copa2026_historico.csv')
print(historico.head(6))   # primeiras linhas

print(historico.shape)     # (72, 7) - 72 linhas, 7 colunas
print(historico.columns.tolist())
```

**Colunas:** `selecao, copa, fase_eliminada, jogos, gols_pro, gols_contra, amarelos`

**72 linhas =** 24 selecoes x 3 Copas (2014, 2018, 2022)

> Selecoes que nao participaram de uma Copa aparecem com `NaN` (dados ausentes).

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 20 -->
<!-- objetivo: aluno filtra o DataFrame por selecao e calcula media, mediana e desvio padrao com pandas -->

# Media, mediana e desvio padrao com pandas

```python {1-3|4-6|7-9}
brasil_hist = historico[historico['selecao'] == 'Brasil']

# Media: soma dividida pela quantidade
print(brasil_hist['gols_pro'].mean())    # media de gols por Copa

# Mediana: valor do meio quando ordenado
print(brasil_hist['gols_pro'].median())  # mediana de gols por Copa

# Desvio padrao: o quanto os valores variam em relacao a media
print(brasil_hist['gols_pro'].std())     # desvio padrao
```

**Por que tres calculos?** Cada um conta uma historia diferente sobre o mesmo dado.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 21 -->
<!-- objetivo: aluno entende por que a mediana e mais robusta que a media quando ha outliers (Mineirazo) -->

# Media vs Mediana: o caso do Mineirazo

**Brasil nas ultimas 3 Copas (gols marcados por Copa):**

<SlideTable>

| Copa | Gols marcados | Observacao |
|---|---|---|
| 2014 | 11 | Mineirazo: tomou 7 na semi, saiu na 3o lugar |
| 2018 | 8 | Saiu nas quartas contra Belgica |
| 2022 | 8 | Saiu nas quartas contra Croacia |

</SlideTable>

- **Media:** (11 + 8 + 8) / 3 = **9,0 gols**
- **Mediana:** ordena [8, 8, 11], pega o meio = **8,0 gols**

> O Mineirazo nao foi um desastre em gols marcados - foi em gols tomados. Mas o conceito e o mesmo: **um valor extremo puxa a media para longe da realidade tipica**.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 22 -->
<!-- objetivo: aluno entende o conceito de outlier e como ele afeta a media usando um exemplo mais dramatico -->

# Quando a media mente

**Exemplo dramatico: gols sofridos pelo Brasil em 2014**

```python
gols_sofridos = [2, 3, 1, 7, 0]
# 2 (Mexico), 3 (Camerun), 1 (Chile), 7 (Alemanha), 0 (Holanda)

import statistics
print(statistics.mean(gols_sofridos))    # 2.6 - parece normal
print(statistics.median(gols_sofridos))  # 2.0 - mais representativo
```

**O 7 do Mineirazo e um outlier** (valor fora do padrao). Ele puxa a media para cima e da uma impressao errada de que o Brasil sempre toma muitos gols.

> **Regra para analistas:** sempre compare media e mediana. Se forem muito diferentes, existe um outlier no dataset.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 23 -->
<!-- objetivo: aluno usa desvio padrao para medir consistencia de uma selecao ao longo das Copas -->

# Desvio padrao: quem e mais consistente?

**Desvio padrao (std):** o quanto os valores se afastam da media. Quanto menor, mais consistente o time.

<SlideTable>

| Selecao | Media gols/Copa | Desvio Padrao | Leitura |
|---|---|---|---|
| Argentina | 9,3 | 2,1 | Consistente e forte |
| Marrocos | 5,0 | 3,6 | Crescendo muito |
| Coreia do Sul | 4,0 | 1,0 | Consistente, volume baixo |
| Brasil | 9,0 | 1,7 | Consistente, volume alto |

</SlideTable>

> **Insight para o time:** um time com media alta E desvio padrao baixo e o candidato mais confiavel ao titulo.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 24 -->
<!-- objetivo: aluno identifica padroes de ascensao e queda usando dados historicos de fase_eliminada -->

# Padroes historicos: ascensao e queda

<SlideTable>

| Selecao | 2014 | 2018 | 2022 | Tendencia |
|---|---|---|---|---|
| Argentina | Vice | Oitavas | Campea | Subida forte |
| Marrocos | n/a | Grupo | Semifinal | Ascensao rapida |
| Coreia do Sul | Grupo | Grupo | Oitavas | Crescimento lento |
| Brasil | Semifinal | Quartas | Quartas | Estagnacao |

</SlideTable>

**Como calcular isso com pandas:**

```python
arg = historico[historico['selecao'] == 'Argentina']
print(arg[['copa', 'fase_eliminada', 'gols_pro']])
```

> Esses padroes sao a base para a justificativa final do time.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 25 -->
<!-- objetivo: aluno pratica leitura de codigo pandas com filtro e calculo de media (nivel N0) -->

# Exercicio 4 - Nivel 1: O que esse codigo produz?

```python
import pandas as pd

historico = pd.read_csv('copa2026_historico.csv')

argentina = historico[historico['selecao'] == 'Argentina']

print(argentina['gols_pro'].mean())
print(argentina['gols_pro'].median())
print(len(argentina))
```

**Sabendo que Argentina marcou: 2014: 8 gols, 2018: 10 gols, 2022: 11 gols**

- O que cada linha imprime?
- A media e maior ou menor que a mediana? Por que?

**Salve como:** `SENAC-TecIA/Aula-35/ex04_leitura_pandas.py`

<AdminOnly>

**Gabarito:**

```
9.666666666666666   # (8 + 10 + 11) / 3
10.0                # valor do meio quando ordenado: [8, 10, 11]
3                   # 3 linhas (uma por Copa)
```

A media (9,67) e menor que a mediana (10,0) porque a Copa 2014 com 8 gols puxa a media levemente para baixo. A diferenca e pequena, o que indica que nao ha outlier drastico.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 26 -->
<!-- objetivo: aluno calcula media, mediana e std para a selecao do time e interpreta os resultados -->

# Exercicio 5 - Nivel 2: Analise a sua selecao

**Usando o `copa2026_historico.csv`, complete o codigo:**

```python
import pandas as pd

historico = pd.read_csv('copa2026_historico.csv')

# Substitua 'Brasil' pela selecao do seu time
minha = historico[historico['selecao'] == 'Brasil']

media  = minha['gols_pro'].mean()
median = minha['gols_pro'].median()
std    = minha['gols_pro'].std()

print(f"Media:   {media:.2f}")
print(f"Mediana: {median:.2f}")
print(f"Desvio:  {std:.2f}")

# Complete: a media e maior ou menor que a mediana?
# O que isso indica sobre o historico da selecao?
```

**Salve como:** `SENAC-TecIA/Aula-35/ex05_analise_selecao.py`

<AdminOnly>

**Gabarito (exemplo com Brasil):**

```
Media:   9.00
Mediana: 8.00
Desvio:  1.73
```

A media (9,0) e maior que a mediana (8,0) porque a Copa 2014 teve mais gols marcados (11). O desvio de 1,73 e baixo - o Brasil e consistente na quantidade de gols marcados por Copa.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 27 -->
<!-- objetivo: aluno integra dados de 2026 e historicos para atualizar a justificativa da pergunta-guia do time -->

# Exercicio 6 - Nivel 3: Atualize a justificativa do time

**Estrategista + Analista juntos:**

```python
# Combine os dois datasets para a sua selecao
atual = df[df['nome'] == 'NOME_DA_SELECAO']         # copa2026_stats.csv
hist  = historico[historico['selecao'] == 'NOME']   # copa2026_historico.csv

# Calcule:
print("Pontos 2026:", atual['pontos'].values[0])
print("Media gols historico:", hist['gols_pro'].mean())
print("Tendencia fase:", hist['fase_eliminada'].tolist())
```

**Responda em 3 linhas (para o pitch de 20 min):**

1. Qual a resposta da pergunta-guia segundo os dados de 2026?
2. O historico confirma ou contradiz essa resposta?
3. Qual o argumento mais forte que os dados dao ao time?

**Salve como:** `SENAC-TecIA/Aula-35/ex06_justificativa_final.py`

<AdminOnly>

**Gabarito (estrutura esperada - valores variam por time):**

O exercicio nao tem resposta unica. Avaliar se o aluno:
- Usou dados de 2026 (pontos, saldo, posse) como evidencia primaria
- Cruzou com historico (media gols, fase_eliminada das 3 copas)
- Formulou uma resposta clara e justificada com numeros

</AdminOnly>

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 35"
---

<!-- SLIDE 28 -->

# Debate: media, mediana ou padrao?

**Discussao coletiva: 5 minutos**

- Se voce fosse contratar um atacante para a selecao, qual metrica usaria: media de gols, mediana ou desvio padrao? Por que?
- Um time com media alta mas desvio padrao alto e confiavel? Qual o risco?
- Por que um analista de dados sempre calcula os tres antes de tomar uma decisao?

> **Conexao futura:** nas proximas aulas, vamos usar essas mesmas metricas para avaliar modelos de machine learning - nao selecoes, mas algoritmos.

---
layout: center
card: true
bgPreset: animate
pulse: true
pulseDuration: 6
aulaNum: "Aula 35"
---

<!-- SLIDE 29 -->

# Apresentacao Final
## Copa Analytics - Pitch de 2 minutos

**Cada time tem exatamente 2 minutos para apresentar.**

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 30 -->
<!-- objetivo: orientar os alunos sobre a estrutura do pitch de 2 minutos com dados -->

# Estrutura do Pitch - 2 minutos

**Cada time apresenta seguindo esta estrutura:**

**0:00 - 0:20 | A pergunta-guia**
> "Nossa pergunta era: ___"

**0:20 - 0:50 | Os dados de 2026**
> "Segundo o `copa2026_stats.csv`, encontramos que ___"

**0:50 - 1:20 | O historico confirma**
> "No historico das ultimas 3 Copas, a media de ___ e ___. A mediana e ___."

**1:20 - 1:50 | A resposta final**
> "Com base nos dados, nossa resposta e ___"

**1:50 - 2:00 | Um numero para convencer**
> "O numero que mais nos convence e ___"

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 31 -->
<!-- objetivo: guia de preparacao para o apresentador do time nos ultimos minutos antes do pitch -->

# Checklist antes de apresentar

**Apresentador - confirme com o time:**

- [ ] A pergunta-guia esta em uma frase clara
- [ ] Temos pelo menos 2 numeros dos dados de 2026
- [ ] Temos media ou mediana do historico calculada com pandas
- [ ] Sabemos dizer por que escolhemos media OU mediana para esse caso
- [ ] A resposta final cabe em uma frase direta

**Analista de Dados - confirme:**

- [ ] O codigo roda sem erros no Colab
- [ ] Os prints mostram os numeros certos
- [ ] A funcao `melhor_selecao()` passa no `assert` do time vizinho

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 35"
---

<!-- SLIDE 32 -->
<!-- tarefa de casa: aula 35 UC09 -->

# Tarefa de Casa - UC09

> **Prazo: proxima aula (A36)**

**Analise de consistencia: qual selecao e mais confiavel?**

Usando `copa2026_historico.csv`, escreva um script que:

1. Calcule a **media** e o **desvio padrao** de `gols_pro` para **5 selecoes** da Copa 2026
2. Imprima uma tabela mostrando: nome, media, desvio padrao
3. Responda em comentario no codigo: qual das 5 e mais consistente e por que?

**Salve como:** `SENAC-TecIA/Aula-35/tarefa_uc09.py`

> Dica: use `historico[historico['selecao'].isin(['Brasil', 'Argentina', ...])]` para filtrar varias selecoes de uma vez.

---
layout: end
bgPreset: palette
github: LeoZanini
aulaNum: "Aula 35"
---

<!-- SLIDE 33 -->

# Copa Analytics - Fim do Dia 2

**Voces fizeram hoje:**

- Carregaram um CSV real com pandas
- Representaram dados com `dict`, `set` e `tuple`
- Calcularam `mean()`, `median()` e `std()` com pandas
- Entenderam por que a mediana e mais robusta que a media
- Apresentaram uma analise com dados reais

**Proxima aula:** UC05 - funcoes avancadas e listas por compreensao | UC09 - visualizacao com matplotlib
