---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 41"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 41"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-07-10"
unlockHour: 13
layout: cover
---

<!-- SLIDE 1 -->
<!-- objetivo: aluno se situa no fio condutor do dia antes de qualquer conteúdo -->

# Aula 41
## O Roubo da Coroa continua: HAVING e o paralelismo da GPU

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 2 -->
<!-- objetivo: aluno entende a estrutura do bloco antes de começar -->

# Bloco 1
## Banco de Dados: HAVING fecha a investigação

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 3 -->
<!-- objetivo: aluno conecta o groupby de ontem com o problema que HAVING resolve hoje -->

# Ontem vocês agruparam no Python. E no SQL?
## O mesmo `gabarito_suspeitos.csv`, agora no banco de dados

- Ontem: `df.groupby('tool').size()` encontrou o item que mais se repete entre os 29 suspeitos
- Hoje o mesmo arquivo sobe pro SQLite. Como reproduzir esse agrupamento em SQL?
- E se você quisesse filtrar o RESULTADO do agrupamento (não as linhas originais), como isso funcionaria?

> Guarde essa dúvida: é exatamente o problema que `HAVING` resolve.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 4 -->
<!-- objetivo: aluno reconhece a tabela e a regra de sala antes de escrever qualquer query -->

# O mesmo caso, agora no SQLite

- `gabarito_suspeitos.csv` sobe para o sqliteonline.com como a tabela `suspeitos`
- Colunas: `suspect_id, alibi_location, motive, tool, has_witness`
- É a mesma investigação de ontem - só muda a ferramenta

> **Regra de sala:** antes de digitar qualquer query, escreva ela no papel primeiro.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 5 -->
<!-- objetivo: aluno reproduz em SQL o que já fez em Python, consolidando GROUP BY -->

# Exercício: reproduza o agrupamento em SQL

**No papel primeiro, depois digite no SQLite.**

Complete a lacuna para contar quantos suspeitos existem por `tool` (o mesmo resultado do `groupby` de ontem):

```sql
SELECT tool, COUNT(*)
FROM suspeitos
GROUP BY ___;
```

<AdminOnly>

**Gabarito:**
```sql
SELECT tool, COUNT(*)
FROM suspeitos
GROUP BY tool;
```

</AdminOnly>

---
layout: two-cols-text
card: true
bgPreset: default
---

<!-- SLIDE 6 -->
<!-- objetivo: aluno confirma que SQL e Python chegam ao mesmo resultado -->

# O resultado bate com o Python?

## Contagem por item

<SlideTable compact>

| tool | COUNT(*) |
|---|---|
| master_key | 5 |
| rope_ladder | 4 |
| lockpick_kit | 4 |
| smoke_bomb | 4 |
| grappling_hook | 4 |
| duffel_bag | 4 |
| silk_gloves | 4 |

</SlideTable>

::right::

## O que os números mostram

- `master_key` aparece em **5 das 29 linhas** - o grupo mais numeroso, exatamente como no `groupby` de ontem
- Todos os outros itens aparecem em 4 linhas cada

---
layout: two-cols-text
card: true
bgPreset: default
---

<!-- SLIDE 7 -->
<!-- objetivo: aluno entende HAVING como filtro que age depois do agrupamento, diferente de WHERE (Codd, 1970 - modelo relacional; ANSI SQL) -->

# Conceito novo: `HAVING`

## WHERE x HAVING

- `WHERE` filtra **linhas**, antes de agrupar
- `HAVING` filtra **grupos**, depois que o `GROUP BY` já juntou as linhas
- Se você quer manter só os grupos que aparecem muitas vezes, `WHERE` não serve - ele nem enxerga o resultado agrupado

::right::

## Sintaxe

```sql
SELECT tool, COUNT(*) AS qtd
FROM suspeitos
GROUP BY tool
HAVING COUNT(*) >= 5;
```

> `HAVING` sempre vem depois do `GROUP BY` na query - ele filtra o que o agrupamento já produziu.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 8 -->
<!-- objetivo: aluno pratica a sintaxe mínima de HAVING completando uma lacuna -->

# Exercício N1: complete a query com `HAVING`

**No papel primeiro.** Isole só o grupo com 5 suspeitos ou mais:

```sql
SELECT tool, COUNT(*) AS qtd
FROM suspeitos
GROUP BY tool
HAVING COUNT(*) ___;
```

<AdminOnly>

**Gabarito:**
```sql
SELECT tool, COUNT(*) AS qtd
FROM suspeitos
GROUP BY tool
HAVING COUNT(*) >= 5;
```

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 9 -->
<!-- objetivo: aluno vê o HAVING isolando exatamente um grupo, reforçando o conceito com um resultado nítido -->

# O resultado aponta um item só

<SlideTable compact>

| tool | qtd |
|---|---|
| master_key | 5 |

</SlideTable>

- De 7 grupos, só `master_key` sobreviveu ao filtro `HAVING COUNT(*) >= 5`
- Todos os outros itens (4 cada) ficaram de fora - é exatamente isso que `HAVING` faz: filtra o que o agrupamento já contou

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 10 -->
<!-- objetivo: aluno escreve, sem lacunas, uma query combinando WHERE e HAVING -->

# Exercício N2: estreite ainda mais a investigação

**No papel primeiro.** Combine `WHERE` com `GROUP BY` e `HAVING`:

> "De todos os suspeitos **sem testemunha** (`has_witness = False`), qual item aparece pelo menos 4 vezes?"

```sql
-- Escreva a query completa:
-- WHERE ...
-- GROUP BY ...
-- HAVING ...
```

<AdminOnly>

**Gabarito:**
```sql
SELECT tool, COUNT(*) AS qtd
FROM suspeitos
WHERE has_witness = False
GROUP BY tool
HAVING COUNT(*) >= 4;
```

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 11 -->
<!-- objetivo: aluno fecha a investigação SQL do dia com um resultado nítido -->

# A investigação se fecha

<SlideTable compact>

| tool | qtd |
|---|---|
| master_key | 4 |

</SlideTable>

- Dos 5 suspeitos com `master_key`, **4 não têm testemunha**
- `WHERE` cortou as linhas com testemunha antes de agrupar; `HAVING` manteve só o grupo com 4 ou mais
- `master_key` continua sendo a pista mais forte - agora também sem álibi confirmado

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 12 -->
<!-- objetivo: aluno reflete sobre a diferença estrutural entre WHERE e HAVING antes de fechar o bloco -->

# Debate: por que `WHERE` não bastava?

**Discussão coletiva: 5 minutos**

- Por que existe um comando separado (`HAVING`) só para filtrar depois de agrupar?
- Dá pra usar `HAVING` sem `GROUP BY`? Por quê?
- O que mais vocês investigariam nesse banco se pudessem juntar `suspeitos` com uma segunda tabela?

> **Conexão futura:** quando entrar uma tabela de evidências separada, `JOIN` + `HAVING` juntos resolvem perguntas bem mais complexas.

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 13 -->
<!-- objetivo: aluno entende a estrutura do bloco antes de começar -->

# Bloco 2
## GPU: SIMD e CUDA cores

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 14 -->
<!-- objetivo: aluno ativa a memória do groupby de ontem como ponte para o conceito de SIMD -->

# Lembra do `groupby` de ontem?
## Ele processou os 29 suspeitos de um jeito bem específico

- No Python, `df.groupby('tool').size()` deu o resultado pra TODOS os 29 suspeitos de uma vez, sem `for`, sem percorrer um por um
- Como você imagina que isso é diferente, por dentro, de um loop que soma um suspeito de cada vez?
- Isso tem tudo a ver com o motivo de existir uma peça de hardware chamada GPU

> Guarde essa ideia: hoje ela vira um princípio com nome técnico.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 15 -->
<!-- objetivo: aluno entende que groupby é uma operação vetorizada, ponte para SIMD (NVIDIA CUDA docs) -->

# `groupby` é uma operação vetorizada

- O pandas roda `groupby` em cima do NumPy, por baixo dos panos
- **Vetorizado** = a MESMA operação (contar, somar) é aplicada em TODOS os elementos de uma vez, não um de cada vez
- Diferente de um `for` tradicional, que processa o suspeito 1, depois o 2, depois o 3...
- Esse princípio de "uma instrução, muitos dados ao mesmo tempo" tem nome na arquitetura de computadores

---
layout: two-cols-text
card: true
bgPreset: default
---

<!-- SLIDE 16 -->
<!-- objetivo: aluno compara CPU (SISD) e GPU (SIMD) como dois jeitos de executar instruções (arquitetura Von Neumann vs. paralela) -->

# CPU é SISD. GPU é SIMD

## CPU (SISD)

- **S**ingle **I**nstruction, **S**ingle **D**ata
- Uma instrução processa **um dado por vez**
- Poucos núcleos, mas cada um muito poderoso
- Ótima para tarefas sequenciais e decisões complexas

::right::

## GPU (SIMD)

- **S**ingle **I**nstruction, **M**ultiple **D**ata
- Uma instrução aplicada a **muitos dados ao mesmo tempo**
- Centenas ou milhares de núcleos mais simples
- Ótima para repetir a mesma operação em muitos itens

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 17 -->
<!-- objetivo: aluno classifica cenários concretos como SISD ou SIMD, consolidando a leitura antes da teoria de CUDA cores -->

# Exercício: SISD ou SIMD?

Classifique cada cenário:

**A)** Um professor confere a prova de um aluno de cada vez, do primeiro ao último da fila.

**B)** O `groupby` conta, ao mesmo tempo, quantos suspeitos existem em cada `tool` - para os 29 suspeitos juntos.

<AdminOnly>

**Gabarito:** A é SISD (um dado por vez, em sequência). B é SIMD (a mesma operação de contagem, aplicada a todos os dados de uma vez).

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 18 -->
<!-- objetivo: aluno entende CUDA cores como a peça de hardware que executa SIMD na prática (NVIDIA, arquitetura CUDA) -->

# CUDA cores: centenas de "trabalhadores" na mesma tarefa

- **CUDA** já apareceu na Aula 03 como a plataforma de computação paralela da NVIDIA - hoje aprofundamos
- Uma GPU tem **centenas ou milhares de núcleos CUDA**
- Cada núcleo sozinho é bem mais simples que um núcleo de CPU
- Mas juntos, todos os núcleos executam a **mesma instrução em muitos dados ao mesmo tempo** - o SIMD na prática

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 19 -->
<!-- objetivo: aluno conecta SIMD/CUDA cores a uma aplicação real de IA (reconhecimento facial forense) -->

# Por que reconhecimento facial usa GPU

- Reconhecimento facial forense compara **uma foto contra milhares** de fotos em um banco de dados
- Uma CPU (SISD) faria essa comparação **em fila**: uma foto de cada vez
- Uma GPU com centenas de núcleos CUDA (SIMD) compara com **muitas fotos em paralelo**, ao mesmo tempo
- É o mesmo princípio do `groupby`: uma operação, aplicada a todos os dados de uma vez - só que em hardware feito pra isso

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 20 -->
<!-- objetivo: aluno generaliza o conceito de SIMD para além do exemplo forense, fechando o bloco -->

# Debate: SIMD no dia a dia

**Discussão coletiva: 5 minutos**

- Que outras tarefas envolvem repetir a mesma operação em muitos itens ao mesmo tempo?
- Por que um aplicativo de fotos consegue aplicar um filtro numa galeria inteira quase instantaneamente?
- Se a GPU é tão melhor pra isso, por que os computadores ainda têm CPU?

> **Conexão futura:** guardem VRAM e tensor cores - são as próximas peças desse quebra-cabeça, numa aula futura.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 21 -->
<!-- objetivo: aluno consolida HAVING e SIMD fora da sala, com tarefas curtas e específicas -->

# Tarefa de Casa: Aula 41

> **Prazo: início da próxima aula**

**Parte 1 - Banco de Dados:** no papel, escreva uma query com `WHERE`, `GROUP BY` e `HAVING` sobre a tabela `suspeitos`, respondendo: "Qual `motive` aparece pelo menos 4 vezes entre os suspeitos **com** testemunha (`has_witness = True`)?" Depois teste no sqliteonline.com.

**Parte 2 - GPU:** escreva 3 exemplos do cotidiano (fora de Python) que sejam exemplos de SIMD, explicando em 1 frase cada por que a mesma operação se aplica a muitos dados ao mesmo tempo.

---
layout: end
github: LeoZanini
---

<!-- SLIDE 22 -->
<!-- objetivo: fechar a aula reforçando o fio condutor e o gancho para a próxima etapa -->

# Fim da Aula 41
## HAVING isolou o suspeito. SIMD explicou por que a GPU resolve isso rápido.

Próxima aula: JOIN com uma tabela de evidências + VRAM e tensor cores
