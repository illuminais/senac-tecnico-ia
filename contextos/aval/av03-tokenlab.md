---
id: av03
titulo: TokenLab — Calculadora de Custo de IA
tipo: AS
ucs: UC05, UC03, UC04
indicadores: "UC05: Ind.1 · UC03: Ind.1+2+3 · UC04: Ind.1"
data-alvo: "23/04/2026"
aula-alvo: A15
status: detalhada
nota-pedagogica: "Sem funções obrigatórias — complexidade via múltiplos cálculos, lógica de recomendação e saída formatada. def/return como Fase Bônus."
---

# Av.03 — TokenLab: Calculadora de Custo de IA 🧮

**Tipo:** AS — Atividade em Sala  
**Data de aplicação:** A15 · 23/04/2026 (Quinta-feira)  
**Duração:** Dia inteiro — ~5h de atividade efetiva  
**Formação:** Dupla  
**Entrega:** `git push` ao final da aula — arquivo `av03_tokenlab.py` na pasta `SENAC-TecIA/Av03/`  
**UCs cobertas:** UC05, UC03, UC04  
**Indicadores:** UC05 Ind.1 · UC03 Ind.1+2+3 · UC04 Ind.1

---

## ⚠️ Nota pedagógica (professor)

Esta avaliação foi desenhada **sem exigir `def`/funções** como pré-requisito.  
A turma demonstrou dificuldade em consolidar funções (A04–A13). Cobrar `def` obrigatório transformaria a avaliação em aula, perdendo o caráter avaliativo.

**Como a complexidade foi mantida:**
- Múltiplos cálculos paralelos (3 modelos × 3 volumes = 9 combinações)
- Lógica de recomendação com `if/elif/else` encadeado
- Verificação de context window (condição extra)
- Saída formatada em seções com separadores visuais

**Funções aparecem na Fase Bônus** — semeia a próxima aula organicamente. Alunos que chegam lá já chegam com intuição sobre o problema que `def` resolve.

---

## Contexto para o aluno — Leia antes de começar

Toda vez que você digita uma mensagem no ChatGPT, o Google Gemini ou qualquer IA de texto, a empresa que criou essa IA **cobra por tokens** — não por palavras, não por caracteres, mas por unidades menores chamadas **tokens**.

Um token é, em média, **4 caracteres** de texto em português. Então:
- `"olá"` → ~1 token
- `"transformação digital"` → ~5 tokens
- `"Escreva um texto sobre machine learning"` → ~9 tokens

Empresas que usam IA em larga escala (atendimento ao cliente, geração de relatórios, análise de dados) precisam calcular quanto vão gastar. Uma chamada de 50 tokens é barata — mas multiplicada por 10.000 chamadas por dia, o custo explode.

Você vai construir o **TokenLab**: um programa que lê um prompt de texto, estima quantos tokens ele tem, e calcula o custo em 3 modelos de IA diferentes, para diferentes volumes de uso.

---

## Enunciado (vai para o aluno)

### 🧮 TokenLab — Calculadora de Custo de IA

Você e sua dupla vão construir um programa que funciona como calculadora de custo para uso de IA em uma empresa.

O programa precisa:

1. Ler o texto de um prompt digitado pelo usuário
2. Calcular quantos tokens esse prompt tem
3. Mostrar o custo desse prompt nos 3 modelos abaixo
4. Mostrar o custo para 1, 100 e 1.000 chamadas em cada modelo
5. Recomendar o modelo mais barato
6. Verificar se o prompt cabe no context window de cada modelo

---

### Modelos e preços (use exatamente esses valores)

| Modelo | Preço por 1.000 tokens (R$) | Context window (tokens) |
|---|---|---|
| GPT-4 | R$ 0,30 | 8.000 tokens |
| GPT-3.5 | R$ 0,03 | 4.000 tokens |
| Gemini Flash | R$ 0,01 | 32.000 tokens |

> **Como calcular o preço por token:**  
> Se o preço é R$ 0,30 por 1.000 tokens, então 1 token custa R$ 0,30 ÷ 1.000 = R$ 0,00030.  
> Para `n` tokens: `custo = n * 0.30 / 1000`

---

### Como contar tokens

Use esta regra simplificada:

```
tokens = len(texto) // 4
```

> `len()` conta os caracteres do texto. `//` é divisão inteira. Se o texto tem 37 caracteres → 37 // 4 = 9 tokens.

Se `tokens` for 0 (texto muito curto), use pelo menos 1:

```python
if tokens == 0:
    tokens = 1
```

---

### Como classificar o tamanho do prompt

| Classificação | Critério |
|---|---|
| `"curto"` | tokens <= 20 |
| `"médio"` | tokens <= 100 |
| `"longo"` | tokens > 100 |

---

### Como verificar o context window

Para cada modelo, verifique se `tokens` é menor ou igual ao context window. Se for maior, o prompt **não cabe** e precisa ser reduzido.

---

### O que o programa deve imprimir

O formato de saída precisa ser **exatamente** como abaixo. Adapte os valores conforme o prompt digitado:

```
============================================
       TOKENLAB — Calculadora de Custo IA
============================================

Texto analisado : Escreva um texto sobre transformação digital
Caracteres      : 48
Tokens estimados: 12
Tamanho         : curto

--------------------------------------------
 CUSTO POR MODELO (1 chamada)
--------------------------------------------
  GPT-4        : R$ 0.004
  GPT-3.5      : R$ 0.0004
  Gemini Flash : R$ 0.0001

--------------------------------------------
 CUSTO PARA 100 CHAMADAS
--------------------------------------------
  GPT-4        : R$ 0.36
  GPT-3.5      : R$ 0.036
  Gemini Flash : R$ 0.012

--------------------------------------------
 CONTEXT WINDOW
--------------------------------------------
  GPT-4        : ✅ cabe    (12 / 8000 tokens)
  GPT-3.5      : ✅ cabe    (12 / 4000 tokens)
  Gemini Flash : ✅ cabe    (12 / 32000 tokens)

--------------------------------------------
 RECOMENDAÇÃO
--------------------------------------------
  Modelo mais barato: Gemini Flash
============================================
```

---

### O que deve ser entregue

- [ ] Arquivo `av03_tokenlab.py` na pasta `SENAC-TecIA/Av03/`
- [ ] Nomes da dupla em comentário no topo do arquivo
- [ ] `git push` feito até o final da aula
- [ ] O programa roda sem erros com qualquer texto digitado

---

### Fase Bônus — se sobrar tempo 🚀

Se a dupla terminar as 4 fases, transforme os cálculos de custo em **uma função**:

```python
def calcular_custo(tokens, preco_por_mil):
    return tokens * preco_por_mil / 1000
```

Use essa função em vez de repetir a fórmula 9 vezes. O programa deve funcionar exatamente igual — apenas mais organizado.

> Entregue como `av03_tokenlab_bonus.py` na mesma pasta.

---

## Mini Dicas 💡

**Dica 1 — Como ler o texto completo (com espaços):**
```python
texto = input("Digite o prompt: ")
```
`input()` já lê espaços normalmente.

**Dica 2 — len() conta caracteres:**
```python
texto = "olá mundo"
print(len(texto))   # imprime: 9
```

**Dica 3 — Divisão inteira com `//`:**
```python
print(37 // 4)   # imprime: 9 (sem casas decimais)
print(37 / 4)    # imprime: 9.25
```

**Dica 4 — Formatar número com casas decimais variáveis:**
```python
valor = 0.00036
print(f"R$ {valor:.4f}")   # R$ 0.0004
print(f"R$ {valor:.6f}")   # R$ 0.000360
```
Para este exercício, use `:4f` ou deixe sem formatação — não há um número fixo de casas obrigatório.

**Dica 5 — Verificar qual é o menor entre 3 valores:**
```python
if custo_gpt4 <= custo_gpt35 and custo_gpt4 <= custo_gemini:
    print("Mais barato: GPT-4")
elif custo_gpt35 <= custo_gemini:
    print("Mais barato: GPT-3.5")
else:
    print("Mais barato: Gemini Flash")
```

**Dica 6 — Imprimir "cabe" ou "não cabe":**
```python
if tokens <= 8000:
    print(f"  GPT-4        : ✅ cabe    ({tokens} / 8000 tokens)")
else:
    print(f"  GPT-4        : ❌ não cabe ({tokens} / 8000 tokens)")
```

---

## Glossário TokenLab

| Termo | O que é | Aplicação |
|---|---|---|
| `token` | Unidade de texto que a IA processa (~4 caracteres) | ChatGPT cobra por token, não por mensagem |
| `context window` | Limite máximo de tokens que o modelo consegue processar de uma vez | GPT-3.5 esquece tudo que passou dos 4.000 tokens |
| `prompt` | O texto que você envia para a IA | Quanto maior o prompt, mais caro |
| `model` | Versão da IA (GPT-4, GPT-3.5, Gemini...) | Modelos mais caros geralmente são mais capazes |
| `API` | Interface de programação — como um código Python chama a IA externamente | Empresas pagam pela API, não pelo chat |
| `len()` | função Python que conta caracteres de uma string | `len("oi")` → 2 |
| `//` | Divisão inteira (descarta os decimais) | 37 // 4 → 9 |
| `input()` | Lê texto digitado pelo usuário | `texto = input("Digite: ")` |

---

## Critérios de Avaliação por Indicador

| UC | Indicador | O que evidencia **A** | O que evidencia **PA** | O que evidencia **NA** |
|---|---|---|---|---|
| UC05 | Ind.1 — Elabora código conforme funcionalidades | Programa roda com qualquer texto; todas as fases implementadas; git push no caminho correto; saída legível e organizada | Fases 1–3 funcionando; fase 4 (recomendação) incompleta ou com bug; git push feito | Programa não roda; ou só imprime algo sem cálculo real; ou não entregue |
| UC03 | Ind.1 — Aritmética em computação | `tokens = len(texto) // 4` correto; `custo = tokens * preco / 1000` correto para os 3 modelos | Fórmula correta em pelo menos 1 modelo; ou tokens calculados errado mas custo coerente com o valor que usou | Sem cálculo numérico; ou valores fixos sem usar as variáveis do prompt |
| UC03 | Ind.2 — Lógica matemática | `if/elif/else` para classificação de tamanho E para recomendação do modelo mais barato, com condições compostas (`and`) onde necessário | Tem condicionais mas falta `and` na comparação de mínimo, ou classificação de tamanho errada | Sem estrutura condicional; ou condições que nunca seriam verdadeiras |
| UC03 | Ind.3 — Conjuntos, funções e matrizes | Tabela de 9 valores (3 modelos × 3 volumes) impressa com alinhamento — demonstra organizar informação em estrutura matricial; custo = f(tokens) implementado como relação matemática explícita | Tabela parcial (1–2 colunas); ou alinhamento inconsistente mas valores corretos | Sem tabela comparativa; cálculo feito só para 1 modelo ou 1 volume |
| UC04 | Ind.1 — Identifica fundamentos de IA | Verifica context window com os limites corretos (8k / 4k / 32k) e imprime status ✅/❌; responde corretamente o que é um token no comentário do código | Verificação de context window presente mas com limites errados; ou sem comentário sobre tokens | Sem verificação de context window; código sem qualquer contexto de IA |

---

## Casos de teste (para o professor)

| Texto digitado | Chars | Tokens | Tamanho | Custo GPT-4 (1x) | Recomendação |
|---|---|---|---|---|---|
| `"Olá"` | 3 | 0→1 (mínimo) | curto | R$ 0.00030 | Gemini Flash |
| `"Escreva um texto sobre transformação digital"` | 44 | 11 | curto | R$ 0.0033 | Gemini Flash |
| `"Resuma o relatório anual de resultados financeiros da empresa, identificando as 3 principais tendências do mercado e propondo ações estratégicas para o próximo trimestre"` | 173 | 43 | médio | R$ 0.0129 | Gemini Flash |
| Texto com 160+ chars | 160+ | 40+ | médio | — | Gemini Flash (sempre, pelos preços dados) |

> **Nota:** Com os preços dados, **Gemini Flash será sempre o mais barato** — isso é correto e proposital. O aluno que percebe isso e menciona no código ganha evidência extra de UC04 Ind.1.

> **Context window:** para GPT-3.5 estourar (4.000 tokens), o texto precisaria ter ~16.000 caracteres. Improvável via input(). Use como case teórico se quiser desafiar alunos avançados: "o que acontece se tokens = 5000?"

---

## Orientações para o Professor

**Antes da aula:**
- Abrir o enunciado projetado logo no início; ler a seção "Contexto" junto com a turma (~10 min)
- Confirmar que todos têm o repositório `SENAC-TecIA` e conseguem fazer `git push`

**Dinâmica da aula (sugestão de ritmo):**
| Horário | Fase | Foco |
|---|---|---|
| 0:00 – 0:20 | Leitura + contexto | Ler junto, explicar token, perguntar "quem já percebeu que ChatGPT cobra por mensagem?" |
| 0:20 – 1:00 | Fase 1 + 2 | `len()`, `//`, custo de 1 chamada para 3 modelos |
| 1:00 – 2:00 | Fase 3 | custo × 100 e × 1.000; classificação de tamanho |
| 2:00 – 3:30 | Fase 4 | recomendação (lógica `and`); context window |
| 3:30 – 4:30 | Ajustes, saída formatada, git push |  |
| 4:30 – 5:00 | Bônus (def) | Quem terminar |

**Blocos mais travados esperados:**
1. `len(texto) // 4` — confusão entre `/` e `//` → mostrar no projetor a diferença de output
2. Lógica triple-`and` para o mínimo (`custo_a <= custo_b and custo_a <= custo_c`) → analogia: "para ser o mais barato, precisa ser menor que os DOIS outros ao mesmo tempo"
3. Formatação do output com alinhamento — não precisa ser perfeito, aceitar como PA se os valores estiverem corretos

**Sobre UC03 Ind.3 (conjuntos, funções, matrizes):**
A tabela 3×3 (9 células) é a evidência central. Se o aluno imprime os 9 valores corretos organizados em 3 blocos por volume, já demonstra organização de informação em estrutura matricial. Não exigir `set()` ou `numpy`.

**Sobre funções (Fase Bônus):**
- Não ensinar `def` como pré-requisito — deixar emergir organicamente
- Se um aluno perguntar "tem como repetir menos?", mostrar `def` na hora como resposta à dor que ele está sentindo
- Isso planta a semente para a próxima aula de Python

**Link de entrega:**
`[preencher após criar no Classroom]`

---

## Gabarito de referência (saída esperada para o texto "Olá IA, preciso de ajuda")

```
============================================
       TOKENLAB — Calculadora de Custo IA
============================================

Texto analisado : Olá IA, preciso de ajuda
Caracteres      : 25
Tokens estimados: 6
Tamanho         : curto

--------------------------------------------
 CUSTO POR MODELO (1 chamada)
--------------------------------------------
  GPT-4        : R$ 0.0018
  GPT-3.5      : R$ 0.00018
  Gemini Flash : R$ 6e-05

--------------------------------------------
 CUSTO PARA 100 CHAMADAS
--------------------------------------------
  GPT-4        : R$ 0.18
  GPT-3.5      : R$ 0.018
  Gemini Flash : R$ 0.006

--------------------------------------------
 CONTEXT WINDOW
--------------------------------------------
  GPT-4        : ✅ cabe    (6 / 8000 tokens)
  GPT-3.5      : ✅ cabe    (6 / 4000 tokens)
  Gemini Flash : ✅ cabe    (6 / 32000 tokens)

--------------------------------------------
 RECOMENDAÇÃO
--------------------------------------------
  Modelo mais barato: Gemini Flash
============================================
```

> ⚠️ A formatação dos decimais vai variar dependendo de como o aluno usou f-strings. Aceite qualquer representação numérica correta (0.0018 / 1.8e-3 / etc.) — o valor precisa estar certo, não o formato.

---

## 📌 Nota de produção — A18 (slide de apoio)

> Instrução para o @produtor-aula ao gerar os slides da A18: incluir um slide de **starter code** no início da aula, para os alunos que ainda não terminaram a Av.03 copiarem como ponto de partida da estrutura de `print`.

**Conteúdo do slide (inserir como slide de código, layout `default` ou `two-cols`):**

```python
# av03_tokenlab.py
# Dupla: _____________ e _____________

texto = input("Digite o prompt: ")
caracteres = len(texto)
tokens = caracteres // 4
if tokens == 0:
    tokens = 1

print("============================================")
print("       TOKENLAB — Calculadora de Custo IA")
print("============================================")
print()
print(f"Texto analisado : {texto}")
print(f"Caracteres      : {caracteres}")
print(f"Tokens estimados: {tokens}")

# --- Fase 1: classifique o tamanho ---
# tamanho = ???

# --- Fase 2: custo para 1 chamada ---
# custo_gpt4   = ???
# custo_gpt35  = ???
# custo_gemini = ???

print("--------------------------------------------")
print(" CUSTO POR MODELO (1 chamada)")
print("--------------------------------------------")
# print(f"  GPT-4        : R$ {custo_gpt4}")
# ...
```

**Contexto do slide:** "Copie esse esqueleto e preencha os `???`. A estrutura do `print` já está pronta — o trabalho de vocês é calcular os valores."

---

## Anti-IA — Estratégias de Integridade Avaliativa

> Esta seção é exclusiva para o professor. Não vai para o aluno.

### Por que bloquear internet não resolve

Código gerado por IA para este exercício vai usar `def`, `dict`, `min()`, list comprehensions e f-strings avançadas — recursos que a turma ainda não aprendeu. O código vai aparecer "estranho" e a dupla não vai conseguir explicar o que escreveu. A incoerência entre o código e o conhecimento demonstrado é evidência suficiente — sem precisar de nenhum bloqueio técnico.

---

### Estratégia 1 — Cartão de referência impresso (distribuir no início)

Imprima um cartão por dupla. Com ele em mãos, alunos que sabem o conteúdo não precisam de internet para nada — e você remove a justificativa de "estava pesquisando sintaxe".

```
╔══════════════════════════════════════════════════════╗
║         TOKENLAB — Cartão de Referência Python       ║
╠══════════════════════════════════════════════════════╣
║  len("texto")            → conta caracteres          ║
║  37 // 4                 → divisão inteira = 9       ║
║  37 / 4                  → divisão real = 9.25       ║
║  int(x) / float(x)       → converte tipo             ║
║  texto = input("msg: ")  → lê do teclado             ║
║  print(f"R$ {v:.4f}")   → formata decimal            ║
║                                                      ║
║  if a <= b and a <= c:   → menor entre 3 valores     ║
║  if tokens <= 20:        → classifica tamanho        ║
║  if tokens <= limite:    → verifica se cabe          ║
╚══════════════════════════════════════════════════════╝

  Preços da SUA dupla: (professor preenche à mão)
  GPT-4:        R$ ______ por 1.000 tokens
  GPT-3.5:      R$ ______ por 1.000 tokens
  Gemini Flash: R$ ______ por 1.000 tokens
```

---

### Estratégia 2 — Preços diferentes por dupla (anti-cópia entre pares)

Dê a cada dupla uma tabela de preços ligeiramente diferente. Código copiado entre duplas ou colado de IA com preços genéricos vai gerar outputs errados — o erro se prova sozinho.

| Dupla | GPT-4 (R$/1k tok) | GPT-3.5 (R$/1k tok) | Gemini Flash (R$/1k tok) | Context Window |
|---|---|---|---|---|
| A | 0,30 | 0,03 | 0,01 | 8k / 4k / 32k |
| B | 0,40 | 0,04 | 0,02 | 8k / 4k / 32k |
| C | 0,25 | 0,025 | 0,008 | 8k / 4k / 32k |
| D | 0,35 | 0,035 | 0,015 | 8k / 4k / 32k |
| E | 0,50 | 0,05 | 0,02 | 8k / 4k / 32k |
| F | 0,20 | 0,02 | 0,005 | 8k / 4k / 32k |

Escreva os preços da dupla à mão no campo do cartão antes de distribuir.

---

### Estratégia 3 — Pseudocódigo no papel (primeiros 15 min)

Antes de abrir o VS Code, cada dupla escreve num papel (pode ser no verso do cartão):

> *"Escreva em português o que o programa vai fazer, passo a passo. Sem código — só a lógica."*

Exemplo esperado:
```
1. Ler o texto com input()
2. Contar caracteres com len()
3. Dividir por 4 para ter tokens
4. Calcular custo: tokens × preco / 1000
5. Repetir para GPT-4, GPT-3.5, Gemini Flash
6. Comparar os 3 para achar o mais barato
7. Verificar se tokens cabe no context window de cada
```

**Por que funciona:** quem copiou do ChatGPT não consegue explicar o pseudocódigo com os próprios termos. O papel fica com você — é evidência de UC03 Ind.2 **antes** do código rodar.

---

### Estratégia 4 — 1 pergunta oral por dupla (durante a aula)

Circule pela sala e faça **uma** pergunta simples por dupla. Leva menos de 1 minuto:

- *"Esse `// 4` aqui — por que vocês usaram `//` e não `/`?"*
- *"Se eu digitar um texto de 200 caracteres, quantos tokens dá? Me faz o cálculo de cabeça."*
- *"Por que tem `and` nessa linha de recomendação?"*
- *"O que acontece se eu digitar só uma letra?"*

Quem fez entende e responde em 5 segundos. Quem copiou trava. Essa ronda é suficiente para refinar A/PA/NA sem burocracia.
