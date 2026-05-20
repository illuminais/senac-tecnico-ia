---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 26 · Shark Tank Tech (cont.) + Python Tipos Compostos"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 26"
bgPreset: palette
layout: cover
aulaDate: "2026-05-21"
unlockHour: 13
---

# Aula 26
## Shark Tank Tech (cont.) + Python: Tipos Compostos

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno compreende a estrutura do dia e o que será cobrado em cada bloco (A26) -->

# Roteiro do dia — Manhã

<SlideTable fullWidth>

| Horário | Bloco | O que acontece |
|---------|-------|----------------|
| 07:20 – 07:30 | Abertura | Formação dos grupos — quem faltou forma grupo NOVO |
| 07:30 – 08:00 | Shark Tank: trabalho | Grupos A25: R2 Arquitetura · Grupos novos: R1 Problema + Cliente |
| 08:00 – 08:20 | Pitches R2 e R1 | Cada grupo apresenta 2 min |
| 08:20 – 08:50 | Shark Tank: trabalho | Grupos A25: R3 Negócio · Grupos novos: R2 Arquitetura |
| 08:50 – 09:05 | Pitches R3 e R2 | Cada grupo apresenta 2 min |

</SlideTable>

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno compreende a estrutura do dia e o que será cobrado em cada bloco (A26) — cont. -->

# Roteiro do dia — Tarde

<SlideTable fullWidth>

| Horário | Bloco | O que acontece |
|---------|-------|----------------|
| 09:05 – 09:20 | Recreio | |
| 09:20 – 11:50 | Python — Tipos Compostos | dict, tuple, set com exercícios em dupla |
| 11:50 – 12:05 | Encerramento | Debate + tarefa de casa |

</SlideTable>

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

# BLOCO 1
## Shark Tank Tech - Continuação

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno que faltou na A25 se integra rapidamente ao grupo e compreende o arquétipo (UC04 Ind. 2) -->

# Formação dos Grupos — antes de qualquer coisa

**Se você estava na A25 →** seu grupo é o mesmo. Sentem juntos e retomam o Canvas de Bolso.

**Se você faltou na A25 →** você forma um grupo NOVO agora.
- Professor distribui os arquétipos para os grupos novos (sorteio)
- Leiam o brief técnico do arquétipo de vocês (próximo slide)
- Escolham o setor: saúde, educação, indústria, varejo, agro...
- Vocês vão pelos passos da A25, em ritmo comprimido

> Quem faltou não entra em grupo existente — vai construir a startup do zero hoje.

---
layout: default
card: true
bgPreset: animate
---

<!-- objetivo: aluno consulta referencia rapida de arquetipo sem reler o brief completo da A25 (UC04 Ind. 2) -->

# Referencia Rapida de Arquétipos

<SlideTable fullWidth>

| Arquétipo | O que a IA faz | Infra | Pergunta tipica do Shark |
|-----------|----------------|-------|--------------------------|
| **Geração de Código** | Completa e revisa código em tempo real | API nuvem ou GPU 8GB+ local | "Por que não usar só o ChatGPT direto?" |
| **Agente de Suporte** | Sugere resposta ao atendente humano (RAG) | Cloud moderada, sem GPU obrigatória | "Se o humano aprova tudo, onde economiza tempo?" |
| **Fábrica de LLM Local** | LLM open source no servidor do cliente, dados não saem | GPU 16-40 GB (RTX 4080 / A100) | "Por que pagar R$ 30k se o modelo é gratuito?" |
| **Geração de Arte** | Cria imagens e vídeos por prompt (Stable Diffusion) | GPU 8-16 GB, pode ser cloud | "O cliente realmente precisa de arte nova todo dia?" |

</SlideTable>

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- Grupos novos: R1 Problema + Cliente — mesmos passos da A25 -->

# Rodada 1 — Problema + Cliente
## (apenas grupos novos)

**O que vocês precisam definir nos próximos 10 minutos:**

- Qual problema real vocês querem resolver?
- Quem sofre com esse problema hoje?
- Por que esse problema ainda não foi resolvido de forma boa?

**No pitch de 2 minutos vocês respondem:**
1. "O problema é..."
2. "Quem tem esse problema é..."
3. "Hoje elas resolvem assim (e é ruim porque)..."

> Sejam específicos. "Empresas têm muitos dados" não é um problema. "Clínicas perdem 3 horas por dia respondendo WhatsApp" é um problema.

---
layout: center
card: true
bgPreset: animate
pulse: true
pulseDuration: 4
---

# 10 minutos

### Grupos novos: definam o problema e o cliente
### Grupos da A25: comecem a R2 Arquitetura

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

# Pitch — Rodada 1
## (grupos novos apresentam)

**Cada grupo tem 2 minutos**

**O que o Shark avalia:**
- O problema é real e específico?
- Dá para imaginar uma pessoa real com esse problema?
- O grupo sabe quem é o cliente?

**Perguntas que o Shark pode fazer:**
- "Conhecem alguém que tem esse problema hoje?"
- "Como esse cliente resolve isso hoje?"
- "Qual o custo desse problema para quem sofre com ele?"

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

# Rodada 2 - Arquitetura da Solução

**O que vocês precisam desenhar nos próximos 15 minutos:**

No papel ou no quadro - o sistema completo:

```
[ O que entra ] → [ O que a IA faz ] → [ O que sai ] → [ Quem usa ]
```

Respondam também:
- O modelo roda na nuvem ou no servidor do cliente?
- Precisa de GPU? Quanto de VRAM?
- Se a internet cair, a solução para de funcionar?
- Quanto custa a infraestrutura por mês?

> Usem a tabela de referencia de arquétipos acima como consulta rápida.

---
layout: center
card: true
bgPreset: animate
pulse: true
pulseDuration: 4
---

# 15 minutos

### Desenhem a arquitetura completa

*Papel, quadro, qualquer coisa - tem que estar visível na hora do pitch*

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

# Pitch - Rodada 2 · Arquitetura

**Cada grupo tem 3 minutos - mostrem o desenho**

**Perguntas técnicas do Shark:**
- "Precisa de GPU? Quanto de VRAM?"
- "O modelo roda na nuvem ou no servidor do cliente?"
- "Se a internet cair, a solução para de funcionar?"
- "Quanto custa esse servidor por mês?"
- "Por que não usar só a API do ChatGPT direto?"

> Grupo que não sabe responder volta a trabalhar antes do pitch.

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

# Rodada 3 - Modelo de Negócio

**O que vocês precisam definir nos próximos 10 minutos:**

- Quanto custa o produto para o cliente? (por mês, por uso ou por projeto)
- Por que esse preço faz sentido? Compare com o custo do problema
- Como vocês ganham dinheiro e ainda cobrem os custos de infraestrutura?
- Qual o primeiro cliente que vocês conseguiriam fechar?

**A matemática básica:**

```
Receita por cliente  -  Custo de infra por cliente  =  Margem
```

> Se a margem for negativa, o modelo de negócio está errado. Refaçam.

---
layout: center
card: true
bgPreset: animate
pulse: true
pulseDuration: 4
---

# 10 minutos

### Definam preço, custo e margem

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

# Pitch - Rodada 3 · Negócio

**Cada grupo tem 2 minutos**

**Perguntas do Shark:**
- "Quanto custa a infra por mês para vocês?"
- "Se o cliente paga R$ X/mês, qual é a margem de vocês?"
- "Por que o cliente não faz isso internamente com um dev próprio?"
- "Qual o primeiro cliente que vocês conseguiriam fechar essa semana?"

---
layout: default
card: true
bgPreset: default
---

<!-- objetivo: aluno reflete sobre o que as rodadas revelaram - conecta UC04 Ind. 2 e Ind. 3 -->

# O que as Rodadas 2 e 3 revelaram

- A arquitetura da sua solução **depende do tipo de modelo** que você usa
- Modelos supervisionados (Geração de Código, Suporte): precisam de dados rotulados para treinar
- Modelos generativos (LLM, Stable Diffusion): treinados em escala, você usa pronto
- **O custo de infra muda tudo:** GPU cara = produto caro = precisa de cliente grande

> Isso é exatamente o que UC04 estuda: como diferentes algoritmos funcionam e onde cada um faz sentido.

---
layout: center
card: true
bgPreset: palette
---

# Recreio - 15 minutos

*Depois do recreio: Python - Tipos Compostos*

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

# BLOCO 2
## UC05 Python — Dicionários

---
layout: default
card: true
bgPreset: default
---

# O que é um dicionário?

Em Python, um `dict` guarda pares de **chave: valor** — como uma ficha de cadastro.

```python
startup = {
    'nome':  'AgroBot',
    'setor': 'agro',
    'preco': 1500
}

print(startup['nome'])    # AgroBot
print(startup['preco'])   # 1500
```

- A chave é o "nome do campo" — única dentro do dict
- O valor pode ser qualquer coisa: string, número, outro dict

---
layout: default
card: true
bgPreset: default
---

<!-- EXERCICIO 01 — N1: leitura de output, sem W3 -->

# Exercício 01 — Nível 1 (em dupla)

**Sem rodar: o que esse código imprime?**

```python
modelo = {
    'nome':     'ResNet',
    'acuracia': 0.94,
    'tipo':     'CV'
}

modelo['versao'] = 2
del modelo['tipo']

print(modelo['nome'])
print(modelo['versao'])
print(len(modelo))
```

<AdminOnly>

**Gabarito:**
```
ResNet
2
2
```
`'tipo'` foi deletado antes dos prints. `len` = 2 chaves restantes.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

# Iterar um dicionário — .items()

Para percorrer chave e valor juntos, use `.items()`.

```python
startup = {'nome': 'AgroBot', 'setor': 'agro', 'preco': 1500}

for chave, valor in startup.items():
    print(f'{chave}: {valor}')

# nome: AgroBot
# setor: agro
# preco: 1500
```

> Referência: **w3schools.com/python/python_dictionaries_methods.asp**

---
layout: default
card: true
bgPreset: default
---

<!-- EXERCICIO 02 — N2: usar .items() pesquisando no W3 -->

# Exercício 02 — Nível 2 (em dupla)

```python
startups = {
    'AgroBot':     1500,
    'CodeX':       800,
    'LocalAI':     5000,
    'PixelStudio': 600,
}
```

**Output esperado:** imprima cada linha no formato `"AgroBot fatura R$ 1500/mes"`.

Pesquise em **w3schools.com/python/python_dictionaries_methods.asp** qual método retorna chave e valor ao mesmo tempo.

<AdminOnly>

**Gabarito:**
```python
for nome, preco in startups.items():
    print(f'{nome} fatura R$ {preco}/mes')
```

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

# Acesso seguro — .get()

`d['chave']` trava com `KeyError` se a chave não existe.
`.get()` retorna um padrão em vez de travar.

```python
modelo = {'nome': 'BERT', 'acuracia': 0.91}

print(modelo['autor'])              # KeyError — para o programa
print(modelo.get('autor', 'N/A'))  # N/A — continua rodando
print(modelo.get('acuracia', 0))   # 0.91 — chave existe
```

> Referência: **w3schools.com/python/ref_dictionary_get.asp**

---
layout: default
card: true
bgPreset: default
---

<!-- EXERCICIO 03 — N2: usar .get() para acesso seguro -->

# Exercício 03 — Nível 2 (em dupla)

**Input:**
```python
relatorio = {'modelo': 'GPT-4', 'versao': 3}
```

**Output esperado:**
```
Modelo: GPT-4
Versao: 3
Autor: desconhecido
Dataset: nao informado
```

Sem usar `if 'chave' in relatorio:` — pesquise como fazer isso em uma linha só.

<AdminOnly>

**Gabarito:**
```python
print('Modelo:', relatorio.get('modelo', 'desconhecido'))
print('Versao:', relatorio.get('versao', 'desconhecido'))
print('Autor:', relatorio.get('autor', 'desconhecido'))
print('Dataset:', relatorio.get('dataset', 'nao informado'))
```

</AdminOnly>

---
layout: default
card: true
bgPreset: default
---

# Adicionar, atualizar, remover

```python
startup = {'nome': 'AgroBot', 'preco': 1500}

startup['fundador'] = 'Carla'   # adiciona nova chave
startup['preco']    = 2000      # atualiza existente
del startup['preco']            # remove

# .update() preenche vários campos de uma vez
startup.update({'setor': 'agro', 'ativo': True})
```

> Referência: **w3schools.com/python/ref_dictionary_update.asp**

---
layout: default
card: true
bgPreset: default
---

<!-- EXERCICIO 04 — N3: manipulação completa -->

# Exercício 04 — Nível 3 (em dupla)

```python
startups = {
    'AgroBot': {'tipo': 'Suporte', 'preco': 1500, 'ativo': True},
    'CodeX':   {'tipo': 'Codigo',  'preco': 800,  'ativo': False},
    'LocalAI': {'tipo': 'LLM',     'preco': 5000, 'ativo': True},
}
```

**Output esperado:**
- imprima só as startups onde `ativo == True`, no formato `"- AgroBot (R$ 1500)"`
- ao final: `"Total ativo: R$ 6500"`

<AdminOnly>

**Gabarito:**
```python
total = 0
print('Startups ativas:')
for nome, dados in startups.items():
    if dados['ativo']:
        print(f'- {nome} (R$ {dados["preco"]})')
        total += dados['preco']
print(f'Total ativo: R$ {total}')
```

</AdminOnly>

layout: end
bgPreset: palette
github: LeoZanini
---

# Boa aula!

*Próxima aula: funções avançadas e primeiro contato com pandas*
