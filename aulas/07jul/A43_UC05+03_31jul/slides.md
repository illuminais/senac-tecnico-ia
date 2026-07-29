---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA: Aula 43"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 43"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-07-31"
layout: cover
---

<!-- SLIDE 1 - Capa -->

# Aula 43
## Python para IA + Fundamentos Matemáticos para Computação e IA

*Criando suas próprias funções e aplicando estratégias matemáticas em situações-problema*

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
aulaNum: "Aula 43"
---

<!-- SLIDE 2 -->
<!-- objetivo: aluno reconhece o bloco temático do dia e conecta com o uso ja feito de funcoes prontas -->

# BLOCO 1
## Python para IA: Criando Suas Próprias Funções

Hoje você vai aprender a criar as próprias "receitas" de código: as **funções**.

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 43"
---

<!-- SLIDE 3 -->
<!-- debate: aula 43 -->

# Tem uma receita por trás disso

Quando você pede pro **Spotify** tocar uma playlist, ou pro celular **calcular o troco** de uma compra, alguma coisa por trás faz o trabalho, passo a passo, do mesmo jeito, toda vez que você pede.

**Debate rápido: o que vocês acham que tem dentro dessa "receita"?**

- O que ela recebe de você pra começar a funcionar?
- O que ela devolve pra você no final?
- Por que ela funciona igual toda vez que é chamada?

> Essa "receita reutilizável" é exatamente o que vamos programar hoje: uma **função**.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 4 -->
<!-- objetivo: aluno compreende funcao como bloco de codigo reutilizavel, por analogia com uma receita do dia a dia -->

# Uma função é uma receita reutilizável

Pensa numa receita de **lanche**: pão, presunto, queijo, na chapa. Você não reescreve o passo a passo toda vez que quer comer o mesmo lanche. Você só segue a receita de novo.

Em Python é a mesma ideia:

- Você **escreve a receita uma vez** (a função)
- Depois, só **chama a receita pelo nome**, quantas vezes quiser
- Cada vez que chama, o computador repete os mesmos passos

```python
fazer_lanche()   # chama a receita
fazer_lanche()   # chama de novo, sem reescrever nada
```

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 5 -->
<!-- objetivo: aluno compreende funcao como bloco de codigo reutilizavel, por analogia com uma receita do dia a dia -->

# Uma função é uma receita reutilizável (cont.)

Segundo a **documentação oficial do Python** (Python Software Foundation), uma função é "um bloco de código organizado e reutilizável, usado para realizar uma única ação relacionada".

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 6 -->
<!-- objetivo: aluno identifica a sintaxe de def, parametro e return na criacao de uma funcao simples -->

# A sintaxe de uma função em Python

Toda função tem 3 partes: o nome, o que ela recebe (o parâmetro) e o que ela devolve (`return`).

```python
def calcular_troco(valor_pago):
    troco = valor_pago - 7
    return troco

print(calcular_troco(10))
```

<v-click>

- `def` : palavra que "define uma função" (cria a receita)
- `calcular_troco` : o nome que você escolhe pra chamar essa função depois
- `valor_pago` : o **parâmetro**, o ingrediente que você entrega pra função usar
- `return` : o que a função **devolve** pra você quando termina de rodar

</v-click>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 7 -->

# Exercício N1: só de olhar, o que aparece?

Leia o código com calma. Não escreva nada, só responda: **o que aparece na tela quando essa função roda?**

```python
def dobrar(numero):
    resultado = numero * 2
    return resultado

print(dobrar(5))
```

<v-click>

**O que vai aparecer no console?**

</v-click>

<AdminOnly>

**Gabarito:** aparece `10`. A função recebe `numero = 5`, calcula `5 * 2 = 10` e devolve esse valor com `return`, que é impresso pelo `print`.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 8 -->

# Exercício N2: crie sua própria função

Complete a função abaixo. Ela recebe quantas figurinhas você **já tem** de um álbum de 5 figurinhas raras, e deve devolver quantas **ainda faltam**.

```python
def figurinhas_faltando(tenho):
    # complete aqui: quantas faltam pra chegar em 5?
    ...

print(figurinhas_faltando(3))
```

**Dica:** um álbum completo tem 5 figurinhas raras. Se você já tem 3, quantas faltam?

<AdminOnly>

**Gabarito:**
```python
def figurinhas_faltando(tenho):
    faltam = 5 - tenho
    return faltam

print(figurinhas_faltando(3))   # 2
```

</AdminOnly>

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 43"
---

<!-- SLIDE 9 -->
<!-- dinamica: aula 43 -->

# Quiz relâmpago: quem sabe função?

**Regra do jogo:** cada pergunta vale 1 ponto. Quem responder certo primeiro, em voz alta, marca ponto pro seu time.

<v-click>

1. Qual palavra usamos pra criar uma função em Python?
2. O que a função recebe entre parênteses?
3. O que a palavra `return` faz?
4. Dá pra chamar a mesma função mais de uma vez, sem reescrever o código?
5. Se eu criar `def somar(a, b):`, quantos parâmetros essa função tem?

</v-click>

> Time com mais pontos no final ganha aplausos (ou um bônus combinado com o professor).

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 10 -->
<!-- objetivo: aluno reconhece a diferenca entre variavel local e global -->
<!-- extensao: conteudo de prioridade MENOR que def/return, cortavel se faltar tempo (decisao do professor) -->

# Extensão: onde cada variável "mora"

Uma variável criada **dentro** de uma função é como um **quarto próprio**: só existe ali dentro, ninguém de fora enxerga.

Uma variável criada **fora** de qualquer função é como a **sala compartilhada** da casa: todo mundo enxerga e pode usar.

```python
mensagem = "oi, turma!"     # sala compartilhada (global)

def cumprimentar():
    saudacao = "bom dia!"   # quarto proprio (local)
    print(saudacao)

cumprimentar()
print(mensagem)
```

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 11 -->
<!-- objetivo: aluno reconhece a diferenca entre variavel local e global -->
<!-- extensao: conteudo de prioridade MENOR que def/return, cortavel se faltar tempo (decisao do professor) -->

# Extensão: onde cada variável "mora" (cont.)

`saudacao` só existe dentro de `cumprimentar()`. Fora da função, essa variável "não mora mais ali".

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 12 -->
<!-- extensao: exercicio condicional ao slide 9 ter sido dado em aula (escopo local vs global) -->

# Exercício N3: por que dá erro?

Leia o código abaixo com atenção. Ele dá **erro** na última linha. Por quê?

```python
def calcular_media(nota1, nota2):
    media = (nota1 + nota2) / 2
    return media

calcular_media(8, 6)
print(media)
```

<AdminOnly>

**Gabarito:** `media` é uma variável **local**, criada dentro da função `calcular_media`. Ela só existe enquanto a função está rodando, como um quarto próprio. Fora da função, essa "sala" não existe mais, por isso o Python não reconhece `media` e mostra um erro (`NameError`).

</AdminOnly>

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 43"
---

<!-- SLIDE 13 -->
<!-- debate: aula 43 -->

# Fechamento: você já usava funções sem saber

Lembra do `.mean()` e do `.describe()` que vocês já usaram com pandas? Aquilo também é função, só que já vem pronta, escrita por outra pessoa.

**Pra pensar:**

- O que muda entre criar sua própria função e usar uma função pronta?
- Que outra "receita" do seu dia a dia vocês transformariam em função?

> Próximo passo: continuar usando `def` pra criar suas próprias ferramentas em Python.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 14 -->
<!-- tarefa de casa: aula 43 -->

# Tarefa de Casa: Aula 43

> **Prazo: início da próxima aula**

Crie **2 funções em Python**, cada uma com **pelo menos 1 parâmetro** e um `return`. Use exemplos do seu dia a dia (troco, figurinha, playlist, nota, o que quiser).

**Onde salvar:** `SENAC-TecIA/Aula-43/funcoes.py`

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 15 -->
<!-- tarefa de casa: aula 43 -->

# Tarefa de Casa: Aula 43 (cont.)

```python
# funcoes.py
# Tecnico em IA - Aula 43

def funcao_1(parametro):
    # sua logica aqui
    return resultado

def funcao_2(parametro):
    # sua logica aqui
    return resultado

# chame as duas funcoes aqui embaixo pra testar
```

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 16 -->
<!-- tarefa de casa: aula 43 -->

# Tarefa de Casa: Aula 43 (cont.)

<AdminOnly>

**Exemplo de gabarito (referência para correção, cada aluno terá uma função diferente):**

```python
def calcular_desconto(preco):
    desconto = preco * 0.1
    return desconto

def minutos_em_segundos(minutos):
    segundos = minutos * 60
    return segundos

print(calcular_desconto(50))        # 5.0
print(minutos_em_segundos(3))       # 180
```

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
aulaNum: "Aula 43"
---

<!-- SLIDE 17 -->
<!-- objetivo: aluno reconhece o bloco tematico do dia e entende que vai aplicar, numa avaliacao formal, conhecimento de matematica ja consolidado -->

# BLOCO 2
## Fundamentos Matemáticos para Computação e IA: Avaliação Av02-T2

Hoje você vai mostrar, numa situação-problema real de dados e IA, tudo que já aprendeu de aritmética, álgebra e conjuntos.

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
aulaNum: "Aula 43"
---

<!-- SLIDE 18 -->
<!-- debate: aula 43 -->

# Matemática que você já faz sem perceber

**Debate rápido:**

- Que tipo de conta (soma, subtração, multiplicação, divisão) você já faz no dia a dia sem pensar "isso é matemática"?
- Quando você divide o preço de um lanche entre os amigos, ou calcula quanto falta pra bateria carregar, você tá usando o quê?

> Hoje a gente organiza esse tipo de raciocínio e aplica numa situação de dados e IA.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 19 -->
<!-- objetivo: aluno reativa a memoria de aritmetica computacional e algebra ja consolidadas em aulas anteriores -->

# Recapitulando: aritmética e álgebra

Vocês já usam isso desde as primeiras aulas. Só relembrando rápido:

- **PEMDAS:** a ordem das operações é potência, multiplicação/divisão, depois adição/subtração. Exemplo: `2 + 3 ** 2` primeiro calcula `3 ** 2 = 9`, depois soma: `2 + 9 = 11`
- **Expressão algébrica:** uma "receita" com uma variável dentro, tipo `2*x + 5`. Se `x` for o número de tokens de uma mensagem, essa expressão pode representar o custo de processar ela

Nada novo aqui, é só reativar o que já sabe.

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 20 -->
<!-- objetivo: aluno reativa a memoria de uniao e intersecao de conjuntos ja consolidadas em aula anterior -->

# Recapitulando: conjuntos, união e interseção

- **União (∪):** todo mundo que está em pelo menos um dos dois grupos
- **Interseção (∩):** só quem está nos dois grupos ao mesmo tempo
- Exemplo: A = quem usa Instagram, B = quem usa TikTok. A ∩ B são os que usam os dois apps

<svg viewBox="0 0 200 100" class="w-full max-w-sm mx-auto mt-2"><circle cx="80" cy="50" r="42" fill="#38bdf8" fill-opacity="0.35" stroke="#38bdf8" stroke-width="2" /><circle cx="120" cy="50" r="42" fill="#a78bfa" fill-opacity="0.35" stroke="#a78bfa" stroke-width="2" /><text x="55" y="54" fill="white" font-size="14">A</text><text x="135" y="54" fill="white" font-size="14">B</text><text x="90" y="54" fill="white" font-size="11">A∩B</text></svg>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 21 -->
<!-- objetivo: aluno compreende as regras formais da avaliacao Av02-T2 antes de comecar a resolucao -->

# Instruções da Avaliação: Av02-T2

**Indicador avaliado:** resolve situações-problema utilizando estratégias matemáticas aplicadas à computação e IA.

- **Individual:** cada aluno resolve sozinho, sem consulta a colegas
- **Mesmo problema para todos:** não existe variação de números por pessoa
- **Justificativa escrita obrigatória:** não basta o resultado, você precisa explicar como chegou nele
- **Apresentação oral obrigatória:** depois de entregar, você vai explicar sua justificativa em voz alta pro professor
- **Entrega:** pela plataforma do curso (LMS), onde o enunciado completo está publicado

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 22 -->
<!-- objetivo: aluno aplica aritmetica, algebra e conjuntos combinados numa situacao-problema de dados/IA (indicador de sintese) -->

# Av02-T2 : Situação-problema

**Contexto:** um app de música usa IA para recomendar playlists automáticas. O time de dados registrou quantos alunos de uma turma de 50 curtiram cada playlist gerada.

<SlideTable compact>

| Playlist | Alunos que curtiram |
|---|---|
| Pop Radar (conjunto A) | 32 |
| Batida Trap (conjunto B) | 24 |
| Curtiram as duas (A ∩ B) | 14 |

</SlideTable>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 23 -->
<!-- objetivo: aluno aplica aritmetica, algebra e conjuntos combinados numa situacao-problema de dados/IA (indicador de sintese) -->

# Av02-T2 : Situação-problema (cont.)

**Resolva com justificativa escrita:**

a) Quantos alunos curtiram pelo menos uma das duas playlists (A ∪ B)?
b) O modelo usa a fórmula `t = 0,5x + 3` pra estimar o tempo (em segundos) de atualizar as recomendações, onde `x` é a resposta do item a). Calcule `t`.
c) O servidor processa no máximo 40 segundos por rodada. O modelo atualiza essas recomendações numa única rodada? Justifique.

<AdminOnly>

**Gabarito:**

a) `|A ∪ B| = |A| + |B| - |A ∩ B| = 32 + 24 - 14 = 42` alunos.

b) `t = 0,5 * 42 + 3 = 21 + 3 = 24` segundos.

c) Sim. Como `24 <= 40`, o modelo consegue atualizar as recomendações desses 42 alunos numa única rodada, com folga de 16 segundos.

</AdminOnly>

---
layout: default
card: true
bgPreset: default
aulaNum: "Aula 43"
---

<!-- SLIDE 24 -->
<!-- objetivo: aluno demonstra oralmente que compreende a propria justificativa escrita, reforcando autoria e raciocinio -->

# Apresentações Orais Individuais

Depois de entregar sua resolução, chega a parte de falar sobre ela.

- Você será chamado(a) individualmente pra explicar, em voz alta, como chegou na sua resposta
- O professor pode fazer 1 ou 2 perguntas rápidas sobre o seu raciocínio
- Não precisa decorar nada: o objetivo é mostrar que você entendeu de verdade o que escreveu

> Quem não conseguir explicar o próprio raciocínio na hora, é sinal de que a resposta não veio de um pensamento próprio.

---
layout: end
bgPreset: palette
pulse: true
aulaNum: "Aula 43"
---

<!-- SLIDE 25 -->
<!-- objetivo: aluno reconhece o fechamento do indicador avaliado e o que vem a seguir em Fundamentos Matematicos no T2 -->

# Fim da Aula 43

<ul class="mt-4 space-y-3 text-left text-lg">
  <li v-click>A Av02-T2 fecha o indicador "resolve situações-problema utilizando estratégias matemáticas aplicadas à computação e IA"</li>
  <li v-click>Vocês combinaram aritmética, álgebra e conjuntos numa situação real de dados e IA</li>
  <li v-click>Fundamentos Matemáticos continua no T2 com probabilidade e estatística descritiva aplicadas a dados de IA</li>
</ul>
