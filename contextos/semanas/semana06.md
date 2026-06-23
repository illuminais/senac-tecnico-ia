---
schema: semana
semana: "06"
aulas: [A36, A37]
periodo: 2026-06-25 / 2026-06-26
tipo: Sem 3
override: true
override-motivo: "A36: UC09 bloco 1 para fechar apresentacoes de media/mediana nao concluidas em A35. UC08 bloco 2 com GROUP BY + JOIN usando os CSVs da Copa. A37: UC05 (pandas do zero) + UC09 (desvio padrao formalizado) substituindo rotacao original UC07+UC04 — conteudo continuado da dinamica Copa Analytics."
---

# Semana 06 — 25–26/jun

## Fio condutor
**"Do dado crú ao dado que convence."** Os dois dias fecham o ciclo Copa Analytics: quinta (A36) prova que os dados contradizem o achismo dos grupos usando media, mediana e SQL; sexta (A37) os alunos criam do zero uma base de dados real, carregam com pandas e escrevem um sistema que consulta e imprime estatisticas no terminal.

---

## A36 — 25/06 · Qui · UC09 + UC08

### Bloco 1 — UC09 (3h): Fechar o modulo de estatistica descritiva

**Objetivo:** provar que os dados confirmam ou contradizem as hipoteses que os grupos defenderam na A35 sem usar calculo.

**Estrutura:**

**Parte 1 — Retomada rapida (~15min)**
- 3 slides max: definicao de media, mediana e desvio padrao
- Formula do desvio padrao no slide — assustar mas ir passo a passo depois
- Ancora: "voces pesquisaram isso. Agora os dados reais confirmam o que encontraram?"

**Parte 2 — Meta-analise ao vivo (~35min)**
- Professor abre `copa_analise_estatistica.csv` na tela
- Calcula ao vivo: media de chutes dos times que chegaram a semi/final vs eliminados no grupo
  - Resultado esperado: Campea/Semi ~76-85 chutes | Grupo ~25-32 chutes
- Virada: Marrocos 2022 chegou as semis com 61 chutes (menos que Argentina 76) — desvio padrao baixo = consistencia
- Tabela no slide com os numeros reais:
  - Argentina 2022: campea, 76 chutes, 38 finalizacoes
  - Marrocos 2022: semi, 61 chutes, 17 finalizacoes
  - Japao 2022: oitavas, 34 chutes, 13 finalizacoes
  - Marrocos 2018: grupo, 27 chutes, 9 finalizacoes
- Pergunta para a turma: "O grupo que defendeu Marrocos — os dados apoiam ou contradizem?"

**Parte 3 — Atividade individual + entrevistas em paralelo (~70min)**
- Professor chama um aluno por vez (2 min cada, ~60 min para 30 alunos)
- Os outros resolvem a atividade no papel:

```
Chutes por jogo do Japao em 2022:
Jogo 1 (vs Alemanha): 12
Jogo 2 (vs Costa Rica): 8
Jogo 3 (vs Espanha): 6
Jogo 4 (vs Croacia): 8

1. Calcule a media
2. Calcule a mediana
3. Calcule o desvio padrao (passo a passo)
4. O que o desvio padrao diz sobre o Japao?
```

Granulado (quem terminar antes):
```
5. Compare com Marrocos 2022:
   Chutes por jogo: 9, 8, 10, 7, 9, 8, 10
   Calcule os 3 indicadores. Qual time foi mais consistente?
```

Entrevista individual (AdminOnly) — 3 perguntas:
1. "O que e mediana e por que ela e diferente de media?"
2. "[mostra 4 numeros] Qual e a mediana desses numeros?"
3. "Um time tem desvio padrao alto de gols. O que isso me diz?"

**Parte 4 — Fechamento e transicao (~10min)**
- O que os dados provaram: times que foram mais longe chutaram mais — mas Marrocos quebra a regra simples
- Desvio padrao baixo = consistencia = tambem importa
- Transicao: "Na sexta: voces criam a propria base de dados e calculam tudo isso em Python"

---

### Bloco 2 — UC08 (3h): GROUP BY e JOIN com os dados da Copa

**Objetivo:** mostrar que SQL produz exatamente os numeros que eles calcularam na mao no bloco UC09. SQL como ferramenta de validacao, nao como conceito abstrato.

**Ambiente:** sqliteonline.com — professor sobe o `copa2026.db` antes da aula.
Banco pronto em: `dados/copa2026.db` (gerado por `dados/criar_banco.py`)
Referencia SQL completa: `contextos/sql-sqlite-referencia.md`

**Parte 1 — Retomada rapida (~20min)**
- Ninguem quase usou SQL em A34 — retomar com calma antes de avancar
- Revisao: SELECT, FROM, WHERE, ORDER BY — estrutura basica comentada linha por linha
- Exercicio de aquecimento (todos): "Liste os times do grupo C por ranking"
  ```sql
  SELECT nome, grupo, ranking_fifa
  FROM selecoes
  WHERE grupo = 'C'
  ORDER BY ranking_fifa ASC;
  ```

**Parte 2 — GROUP BY (~50min)**
- Problema: "A media de chutes confirma que times que chutam mais chegam mais longe?"
- GROUP BY explicado como "separar em pilhas, calcular em cada pilha"
- Live-coding linha por linha:
  ```sql
  SELECT fase_eliminada,
         ROUND(AVG(chutes), 1) AS media_chutes,
         COUNT(*) AS qtd_times
  FROM analise_estatistica
  WHERE jogos > 0
  GROUP BY fase_eliminada
  ORDER BY media_chutes DESC;
  ```
- O resultado confirma na tela o que calcularam na mao no bloco UC09
- Funcoes: AVG, COUNT, SUM, ROUND — cada uma com exemplo curto

**Parte 3 — INNER JOIN (~50min)**
- Problema: "Quero ver a confederacao de cada time que chegou as semis em 2022"
- JOIN explicado como "juntar duas planilhas pelo campo em comum"
- Live-coding:
  ```sql
  SELECT s.nome, s.confederacao, h.fase_eliminada
  FROM selecoes s
  INNER JOIN historico h ON s.nome = h.selecao
  WHERE h.copa = 2022
    AND h.fase_eliminada IN ('semi', 'final', 'vice', 'campeao')
  ORDER BY h.fase_eliminada;
  ```

**Parte 4 — Atividade em grupos (~40min)**
- Material impresso: `colinha-sql.md` (1 por grupo) + `atividade-sql-a36.md` (1 por aluno)
- Regra: query escrita NO PAPEL antes de digitar no PC
- Atividade em 3 partes: aquecimento (todos) + hipoteses (2 de 4) + pergunta livre do proprio grupo

**Prep A36 (UC08):**
- Subir `dados/copa2026.db` no sqliteonline.com antes da aula
- Imprimir `dados/colinha-sql.md` — 1 por grupo (10 copias)
- Imprimir `dados/atividade-sql-a36.md` — 1 por aluno (30 copias)
- Testar as 4 queries da atividade no banco antes da aula

---

## A37 — 26/06 · Sex · UC05 + UC09

> Override de rotacao: substitui UC07+UC04 previstos. Conteudo: pandas do zero + formalizacao do desvio padrao em Python — continuidade direta da dinamica Copa Analytics.

### Bloco 1 — UC05 (3h): Pandas do zero

**Objetivo:** alunos criam uma planilha no Excel, salvam como CSV, carregam com pandas e exploram os dados.

**Parte 1 (~30min): O que e pandas e por que existe**
- Pandas nao e banco de dados — e uma biblioteca Python para trabalhar com tabelas
- Analogia: Excel no Python — mas voce pode automatizar tudo
- Instalacao: `pip install pandas` — professor faz ao vivo, alunos fazem junto

**Parte 2 (~40min): Criar a planilha ao vivo**
- Cada grupo cria sua propria planilha no Excel com os dados da Copa que usaram no trabalho
- Colunas minimas: selecao, copa, chutes, gols_pro, fase_eliminada
- Salvar como CSV: `arquivo > salvar como > CSV (separado por virgulas)`
- Grupos de ate 3 alunos — cada grupo tem seu proprio arquivo

**Parte 3 (~60min): Pandas passo a passo — linha por linha**
- `import pandas as pd` — o que significa importar uma biblioteca
- `df = pd.read_csv("arquivo.csv")` — carregar o CSV
- `df.head()` — ver as primeiras linhas
- `df.describe()` — ver media, minimo, maximo de todas as colunas de uma vez
- `df["chutes"]` — acessar uma coluna
- `df["chutes"].mean()` — calcular a media
- `df["chutes"].median()` — calcular a mediana
- Exercicio: "imprima a media de chutes dos times que chegaram as semis"
- Granulado: filtrar por fase antes de calcular: `df[df["fase_eliminada"] == "semi"]["chutes"].mean()`

**Cada passo no slide + gabarito com v-click.**

---

### Bloco 2 — UC09 (3h): Desvio padrao formalizado + sistema de consulta

**Objetivo:** formalizar o desvio padrao em Python e construir um sistema simples de consulta que imprime estatisticas no terminal.

**Parte 1 (~40min): Desvio padrao — formula com codigo**
- Formula no slide: sqrt(sum((x - media)^2) / n)
- Passo a passo: calcular com os numeros do Japao 2022 (12, 8, 6, 8)
  - media = 8.5
  - diferencas: (12-8.5)=3.5, (8-8.5)=-0.5, (6-8.5)=-2.5, (8-8.5)=-0.5
  - quadrados: 12.25, 0.25, 6.25, 0.25
  - media dos quadrados: 19/4 = 4.75
  - raiz: ~2.18
- Depois: `df["chutes"].std()` confirma o calculo
- "O Japao tem desvio padrao de 2.18 chutes por jogo. Isso e consistente ou irregular?"
- Comparar com Marrocos: desvio padrao baixo = time consistente

**Parte 2 (~70min): Sistema de consulta — digitar do zero**
- Alunos digitam o codigo linha por linha com guia no slide
- Sistema minimo:

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

- Cada linha explicada antes de digitar
- Quem termina: adicionar segunda consulta (qual selecao especifica)
- Granulado: adicionar comparacao automatica entre duas fases

**Parte 3 (~10min): Fechamento**
- "O que voces fizeram essa semana: criaram uma base de dados, consultaram com SQL e com Python, provaram hipoteses com numeros"
- Proxima aula: continuar pandas com dados reais mais complexos

---

## Indicadores ativados

| UC | Indicadores | Topico |
|---|---|---|
| UC09 | Ind.5 (medidas de tendencia central) · Ind.6 (variaveis quantitativas) · Ind.7 (dados discretos/continuos) | media, mediana, desvio padrao — calculo manual e com Python |
| UC08 | Ind.3 (estrutura fisica BD) · Ind.5 (consultas SQL) | GROUP BY, INNER JOIN |
| UC05 | Ind.4 (bibliotecas Python) · Ind.5 (manipulacao de dados) | pandas: read_csv, head, describe, mean, median, std, filtro |

---

## Refs
- [roteiro-t2](../roteiro-t2.md)
- [contexto-estatistica-aplicada](../contexto-estatistica-aplicada.md)
- [contexto-banco-de-dados](../contexto-banco-de-dados.md)
- [contexto-python-para-ia](../contexto-python-para-ia.md)
- [semana05](semana05.md)
