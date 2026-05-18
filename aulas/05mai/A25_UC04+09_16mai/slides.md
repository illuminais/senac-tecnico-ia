---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 25 · Shark Tank Tech"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 25"
bgPreset: palette
layout: cover
---

<!-- SLIDE 1 — Capa -->

# Aula 25
## Shark Tank Tech + Relatório da Visita

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 2 — Como funciona o dia -->

# Como funciona o dia

<SlideTable fullWidth>

| Bloco | Duração | O que acontece |
|-------|---------|----------------|
| Abertura | 20 min | Grupos, arquétipos, briefs técnicos |
| Rodada 1 — Problema | 25 min | Pitch: quem sofre com o problema e por quê |
| Rodada 2 — Arquitetura | 35 min | Desenhar o sistema completo de IA |
| Rodada 3 — Negócio | 30 min | Como cobra, de quem, por que funciona |
| Recreio | 15 min | |
| Rodada 4 — Pitch Final | 50 min | 4 min corridos + perguntas do Shark |
| Encerramento Shark Tank | 15 min | Veredicto e aprendizados |
| Relatório da Visita | 60 min | Word + ABNT, individual, entrega por e-mail |

</SlideTable>

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 3 — Formação dos grupos -->

# Formação dos Grupos

- **6 grupos de 4 a 5 pessoas** — professor distribui
- Cada grupo recebe **1 arquétipo de IA** (sorteio)
- O arquétipo define o modelo tecnológico da startup de vocês
- Vocês escolhem o **setor**: saúde, educação, indústria, varejo, agro... qualquer um

> O briefing técnico do arquétipo de vocês está nos próximos slides. Leiam com atenção antes de começar.

---
layout: default
card: true
bgPreset: animate
---

<!-- SLIDE 4 — Os 3 arquétipos -->

# Os 3 Arquétipos de IA que Vimos no Parque

<SlideTable fullWidth>

| Arquétipo | O que a IA faz | O que viram na visita |
|-----------|---------------|----------------------|
| **Geração de código** | Escreve e completa código enquanto o dev trabalha | Startups usando assistentes para acelerar desenvolvimento interno |
| **Agente de suporte** | Sugere resposta ao atendente humano, que aprova antes de enviar | Agentes que ajudam o time, não o cliente direto |
| **Fábrica de LLM local** | Modelo open source no servidor da empresa, dados não saem | Empresa com LLM próprio vendendo integrações sob medida |
| **Geração e curadoria de arte** | IA cria imagens, vídeos ou trilhas sob demanda a partir de prompts | Uso de modelos como Stable Diffusion para criação de conteúdo visual |

</SlideTable>

> Cada grupo cria uma startup usando UM desses modelos em qualquer setor.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 5 — Brief: Geração de Código -->

# Brief Técnico — Geração de Código

**O que a IA faz:** escreve, completa e revisa código enquanto o desenvolvedor trabalha

**Modelos que existem:**
- GitHub Copilot (Microsoft/OpenAI) — pago, API na nuvem
- Code Llama (Meta) — open source, pode rodar local

**Infraestrutura necessária:**
- Via API na nuvem: sem GPU própria, paga por uso
- Rodando local: precisa de GPU com pelo menos 8 GB de VRAM

---
layout: default
card: true
bgPreset: default
pulse: false
---

<!-- SLIDE 5b — Brief: Geração de Código (cont.) -->

# Brief Técnico — Geração de Código (cont.)

**Como integra:** plugin no VS Code, extensão no navegador, ou API REST

**Modelo de negócio típico:** assinatura por desenvolvedor (R$ 20 a 100/mês) ou licença corporativa

> **Pergunta que você vai receber:** "Por que o cliente não usa só o ChatGPT direto para gerar código?"

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 6 — Brief: Agente de Suporte -->

# Brief Técnico — Agente de Suporte (Backend)

**O que a IA faz:** processa a mensagem do cliente, busca a resposta certa e sugere ao atendente humano aprovar

**Arquitetura RAG — como funciona por dentro:**

- Mensagem do cliente chega ao sistema
- Banco vetorial busca documentos relevantes (manuais, FAQs, histórico)
- LLM gera uma sugestão de resposta com base nesses documentos
- Atendente humano aprova ou edita
- Cliente recebe a resposta final

---
layout: default
card: true
bgPreset: default
pulse: false
---

<!-- SLIDE 6b — Brief: Agente de Suporte (cont.) -->

# Brief Técnico — Agente de Suporte (cont.)

**Infraestrutura:** moderada. Pode ser cloud pago, sem GPU obrigatória se usar API externa

**Modelo de negócio típico:** por conversa processada (R$ 0,50 a 5,00) ou mensalidade por empresa

> **Pergunta que você vai receber:** "Se o humano ainda aprova tudo, onde a IA economiza tempo?"

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 7 — Brief: Fábrica de LLM Local -->

# Brief Técnico — Fábrica de LLM Local

**O que fazem:** instalam e configuram um modelo de linguagem open source no servidor do cliente. Nenhum dado sai da empresa.

**Modelos open source disponíveis:**
- Llama 3.1 (Meta) — gratuito para usar, muito capaz
- Mistral — gratuito, eficiente em hardware menor
- Gemma (Google) — gratuito, bom para tarefas menores

---
layout: default
card: true
bgPreset: default
pulse: false
---

<!-- SLIDE 7b — Brief: Fábrica de LLM Local (cont.) -->

# Brief Técnico — Fábrica de LLM Local (cont.)

**Hardware: VRAM é o que define tudo**

<SlideTable>

| Tamanho do modelo | VRAM mínima | GPU equivalente |
|-------------------|-------------|-----------------|
| 7 bilhões de parâmetros | 8 GB | RTX 3080 / 4060 |
| 13 bilhões | 16 GB | RTX 4080 |
| 70 bilhões | 40 GB+ | A100 (servidor dedicado) |

</SlideTable>

**Modelo de negócio:** projeto de setup (R$ 10k a 50k) + contrato mensal de manutenção

> **Pergunta que você vai receber:** "Por que o cliente pagaria R$ 30k se o modelo é gratuito?"

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 8 — Canvas de bolso -->

# Canvas de Bolso — preencham ao longo das rodadas

```
NOME DA STARTUP: ________________________________
ARQUÉTIPO:  [ ] Geração de Código
            [ ] Agente de Suporte
            [ ] Fábrica de LLM Local

PROBLEMA (1 frase): ______________________________

CLIENTE (quem paga?): ___________________________
```

---
layout: default
card: true
bgPreset: palette
pulse: false
---

<!-- SLIDE 8b — Canvas de bolso (cont.) -->

# Canvas de Bolso (cont.)

```
SOLUÇÃO IA (o que a IA faz exatamente?): __________

ARQUITETURA  entrada → IA → saída → usuário: ______

INFRAESTRUTURA  GPU? cloud? local? custo/mês: ______

MODELO DE NEGÓCIO  quanto cobra e de quem: ________
```

> Isso vira o roteiro do pitch final de vocês. Não percam.

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 9 — Rodada 1 — instruções -->

# Rodada 1 — Problema + Cliente

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

<!-- SLIDE 10 — Timer R1 -->

# 10 minutos

### Definam o problema e o cliente

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 11 — Pitch R1 -->

# Pitch — Rodada 1

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

<!-- SLIDE 12 — Rodada 2 — instruções -->

# Rodada 2 — Arquitetura da Solução

**O que vocês precisam desenhar nos próximos 15 minutos:**

No papel ou no quadro — o sistema completo de IA de vocês:

```
[ O que entra ] → [ O que a IA faz ] → [ O que sai ] → [ Quem usa ]
```

Também definam:
- O modelo roda na nuvem ou no servidor do cliente?
- Precisa de GPU? Quanto de VRAM?
- Se a internet cair, a solução morre?
- Quanto custa a infraestrutura por mês?

> Usem o brief técnico do arquétipo de vocês como referência.

---
layout: center
card: true
bgPreset: animate
pulse: true
pulseDuration: 4
---

<!-- SLIDE 13 — Timer R2 -->

# 15 minutos

### Desenhem a arquitetura completa

*Papel, quadro, qualquer coisa — tem que estar visível na hora do pitch*

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 14 — Pitch R2 -->

# Pitch — Rodada 2 · Arquitetura

**Cada grupo tem 3 minutos — mostrem o desenho**

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

<!-- SLIDE 15 — Rodada 3 — instruções -->

# Rodada 3 — Modelo de Negócio

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

<!-- SLIDE 16 — Timer R3 -->

# 10 minutos

### Definam preço, custo e margem

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 17 — Pitch R3 -->

# Pitch — Rodada 3 · Negócio

**Cada grupo tem 2 minutos**

**Perguntas do Shark:**
- "Quanto custa a infra por mês para vocês?"
- "Se o cliente paga R$ X/mês, qual é a margem de vocês?"
- "Por que o cliente não faz isso internamente com um dev próprio?"
- "Qual o primeiro cliente que vocês conseguiriam fechar essa semana?"

---
layout: center
card: true
bgPreset: palette
---

<!-- SLIDE 18 — Recreio -->

# Recreio — 15 minutos

*Voltem com o pitch final na cabeça*

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 19 — Rodada 4 — instruções -->

# Rodada 4 — Pitch Final

**10 minutos de ensaio antes de subir**

O pitch final tem **4 minutos** e cobre tudo:

<v-click>

1. O problema e o cliente (30 seg)
2. A solução e como a IA funciona por dentro (1 min)
3. A arquitetura: entrada, IA, saída, usuário (1 min)
4. O modelo de negócio: preço, custo, margem (1 min)
5. Por que vocês vão conseguir clientes (30 seg)

</v-click>

<v-click>

**Depois do pitch o Shark faz 2 perguntas técnicas. Sem rascunho, sem celular.**

</v-click>

---
layout: center
card: true
bgPreset: animate
pulse: true
pulseDuration: 4
---

<!-- SLIDE 20 — Timer R4 ensaio -->

# 10 minutos de ensaio

### Depois disso, pitch final sem parar

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 21 — Pitch Final -->

# Pitch Final — 4 minutos por grupo

**O Shark avalia:**
- O problema é real e específico?
- A arquitetura técnica faz sentido?
- O modelo de negócio é viável com os custos reais?
- O grupo entende o que a IA realmente faz, não é magia?

**Perguntas que podem cair:**
- "Por que o cliente não usa só o ChatGPT direto?"
- "Quanto de VRAM precisa e quanto custa essa GPU?"
- "Se vocês perdessem o maior cliente, conseguiriam sobreviver?"
- "O dado do cliente fica onde: na nuvem de vocês ou no servidor deles?"

---
layout: center
card: true
bgPreset: animate
pulse: true
pulseDuration: 6
---

<!-- SLIDE 22 — Veredicto -->

# Veredicto do Shark

> "Investimento aprovado, condicional ou recusado — e por quê."

*Professor anuncia o veredicto de cada grupo com justificativa técnica*

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 23 — Encerramento Shark Tank -->

# O que vocês acabaram de fazer

- Identificaram um problema real com cliente real
- Desenharam uma arquitetura de solução de IA do zero
- Calcularam custo de infraestrutura, preço e margem
- Defenderam escolhas técnicas sem script

> Isso é o que times de produto fazem antes de escrever qualquer linha de código.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 24 — Divisor: Relatório -->

# Relatório da Visita Técnica

**Individual · Word · Formato ABNT · Entrega por e-mail até o fim da aula**

Agora vocês vão documentar o que viveram ontem no Parque Tecnológico de Pato Branco.

Roteiro na próxima tela.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 25 — Roteiro do Relatório -->

# Roteiro do Relatório — siga essa ordem (seções 1 a 4)

**1. Introdução** — O que era a visita, quando foi, onde foi, quem participou.

**2. Ecossistema de Inovação de Pato Branco** — O que a SMCTI apresentou. Quantas empresas, como funciona o ecossistema.

**3. ITECPB — Incubadora** — Como funciona, critérios de entrada, o que oferecem além do espaço físico.

**4. Tour pelos espaços** — O que vocês viram, como é a infraestrutura, o que chamou atenção.

---
layout: default
card: true
bgPreset: default
pulse: false
---

<!-- SLIDE 25b — Roteiro do Relatório (cont.) -->

# Roteiro do Relatório (cont.) — seções 5 a 7

**5. Bitz** — O que a empresa faz, qual problema resolve, como usa tecnologia.

**6. Conversa com Raziel** — O que ele está construindo, quais foram os maiores aprendizados compartilhados.

**7. Reflexão final** — O que você aprendeu na visita e como conecta com o que estamos estudando no curso.

> Mínimo de 1 parágrafo por seção. Máximo de 2 páginas no total.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 26 — Formato ABNT -->

# Formatação ABNT — lembrete

- **Margens:** 3 cm (superior e esquerda) · 2 cm (inferior e direita)
- **Fonte:** Calibri ou Arial · tamanho 12
- **Espaçamento:** 1,5 entre linhas
- **Título:** centralizado, negrito, tamanho 14
- **Subtítulos:** alinhado à esquerda, negrito, tamanho 12
- **Parágrafo:** recuo de 1,25 cm na primeira linha

**Entrega:**
- Exportar como PDF antes de enviar
- E-mail: `leonardo.niclote@docente.pr.senac.br`
- Assunto: `Relatorio Visita Tecnica - [Seu Nome]`
- Prazo: até o final da aula de hoje

---
layout: end
bgPreset: palette
github: LeoZanini
---

<!-- SLIDE 27 — Encerramento -->

# Boa aula!

*Shark Tank até o recreio · Relatório depois