---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 28"
author: Leonardo Zanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 28"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-05-28"
unlockHour: 13
---


<!-- SLIDE 1 -->

# Aula 28
## Mesa Redonda Shark Tank + Word ABNT

**UC07 - Transformação Digital** · Bloco 2 - Indicadores 5 e 6
**UC01 - Fundamentos de Computação** · Indicadores 2 e 3

> 28 de maio de 2026 · 6 HA

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
aulaNum: "Aula 28"
---

<!-- SLIDE 2 -->

# BLOCO 1
## UC07 - Transformação Digital
### Mesa Redonda de Avaliação Cruzada

Ind. 5 e 6 - Planejamento estratégico e custo-benefício

---
layout: brainstorm
bgPreset: palette
pulse: true
aulaNum: "Aula 28"
---

<!-- SLIDE 3 -->

# Revisita rápida: o que o outro grupo criou?

Antes de começar a avaliação cruzada, pense:

- Você sabe **o que o projeto do outro grupo resolve**?
- Consegue identificar qual **entrada** vai para a IA e qual **saída** a IA gera?
- Você lembra dos custos de operação deles? Lucro?

> Hoje você vai analisar o projeto de outro grupo - e eles vão analisar o seu.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 4 -->

<!-- objetivo: aluno compreende a lógica da avaliação por pares e assume postura crítica construtiva (Boud & Falchikov, 2007) -->

# Como funciona a Avaliação Cruzada

**Rotação:** cada grupo analisa o projeto do próximo

- Grupo A analisa o projeto do Grupo B
- Grupo B analisa o projeto do Grupo C
- Grupo C analisa o projeto do Grupo A
- (e assim por diante)

**Por que fazer isso?**
Olhar para o projeto dos colegas com olho crítico treina o mesmo raciocínio que um analista de IA usa ao revisar uma solução antes de ela ir para produção.

<MLToast title="DICA">
  Avaliação cruzada não é crítica pessoal - é análise técnica de um projeto.
</MLToast>

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 5 -->

<!-- objetivo: aluno sabe quais dimensões técnicas avaliar em um projeto de IA (UC07 Ind.5 - plano de implementação) -->

# O que você vai analisar (40 min)

Receba o projeto do outro grupo e responda:

1. **Problema** - qual situação do mundo real o projeto resolve?
2. **Solução de IA** - o que a IA faz nesse projeto?
3. **Arquitetura simplificada** - entrada → IA → saída (desenhe ou descreva)
4. **Custo vs. receita** - preencha a planilha de análise financeira. O negócio fecha?
5. **1 ponto forte** - o que está bem pensado?
6. **1 melhoria** - o que você mudaria?

> Registre as respostas em papel ou no computador para apresentar.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 6 -->

<!-- objetivo: aluno aplica o modelo entrada-IA-saída para descrever um sistema de IA (UC07 Ind.5) -->

# Arquitetura simplificada de um projeto de IA

O modelo básico para descrever qualquer solução de IA:

```
ENTRADA → PROCESSAMENTO (IA) → SAÍDA → AÇÃO
```

**Exemplo - projeto de monitoramento agrícola:**

```
Foto do campo (entrada)
       ↓
Modelo de visão computacional (IA)
       ↓
"Detectou praga em 30% das plantas" (saída)
       ↓
Alerta enviado ao agricultor por SMS (ação)
```

Ao analisar o projeto dos colegas, identifique cada etapa desse fluxo.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 7 -->

<!-- objetivo: aluno aplica análise de custo-benefício a um projeto de IA (UC07 Ind.6 - análise financeira básica) -->

# Planilha: custo × receita do projeto

Preencha para o projeto que você vai analisar:

<SlideTable fullWidth>

| Item | Pergunta-chave | Valor estimado |
|---|---|---|
| Custo de implantação | Quanto custa colocar a IA para funcionar? | R$ |
| Custo operacional | Quanto custa manter por mês? | R$/mês |
| Receita ou economia | Quanto o projeto gera ou economiza? | R$/mês |
| Retorno esperado | Em quanto tempo o investimento se paga? | meses |

</SlideTable>

---
layout: default
bgPreset: default
card: false
aulaNum: "Aula 28"
---

<!-- SLIDE 7a -->

<!-- objetivo: aluno aplica as perguntas de análise cruzada ao projeto dos colegas -->

# Planilha: custo × receita (cont.)

Com os números preenchidos, **na sua análise cruzada:**

- Os valores estimados fazem sentido para o projeto?
- O investimento se paga em um prazo razoável?

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 8 -->

<!-- objetivo: aluno conduz e apresenta análise técnica de um projeto de IA com clareza e objetividade -->

# Mesa Redonda (30 min)

**Formato de apresentação por grupo:**

1. **Grupo analista** apresenta a análise (3-4 min):
   - Problema identificado
   - Arquitetura entrada → IA → saída
   - Avaliação do custo-benefício
   - 1 ponto forte + 1 melhoria sugerida

2. **Grupo original** responde (2 min):
   - Concordam com a análise?
   - Alguma informação que o grupo analista não tinha?

> O professor facilita o tempo e faz perguntas adicionais.

---
layout: brainstorm
bgPreset: palette
pulse: true
aulaNum: "Aula 28"
---

<!-- SLIDE 9 -->

# Fechamento do Shark Tank

Reflexão coletiva após todas as apresentações:

- **O que você aprendeu olhando para o projeto dos colegas?**
- Algum grupo identificou um problema que o próprio grupo não viu no seu projeto?
- Se você fosse um investidor real, em qual projeto apostaria e por que?

<v-click>

> Isso é o que acontece em code review, reuniões de produto e auditorias de IA em empresas reais.

</v-click>

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 10 -->

<!-- objetivo: aluno consolida o aprendizado de UC07 Ind.5+6 refletindo sobre planejamento estratégico e viabilidade financeira -->

# O que a Avaliação Cruzada treina

**UC07 - Ind. 5 e 6 em ação:**

- **Ind. 5** - Plano de implementação
  - Você analisou se a solução do outro grupo resolve o objetivo do negócio

- **Ind. 6** - Análise de custo-benefício
  - Você questionou se os números fazem sentido para o projeto

---
layout: default
bgPreset: default
card: false
aulaNum: "Aula 28"
---

<!-- SLIDE 10a -->

<!-- objetivo: aluno conecta a avaliação cruzada com a prática profissional de consultoria em IA -->

# O que a Avaliação Cruzada treina (cont.)

**Na vida profissional:** antes de qualquer empresa implementar IA, ela contrata um consultor ou analista para fazer exatamente isso - olhar de fora e perguntar "esse investimento faz sentido?".

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
aulaNum: "Aula 28"
---

<!-- SLIDE 11 -->

# BLOCO 2
## UC01 - Fundamentos de Computação
### Word e ABNT na Prática

Ind. 2 e 3 - Criar, editar e formatar documentos profissionais

---
layout: brainstorm
bgPreset: palette
pulse: true
aulaNum: "Aula 28"
---

<!-- SLIDE 12 -->

# Você já entregou um trabalho acadêmico?

Pense em trabalhos que você fez na escola:

- Como você formatou? Qualquer fonte? Qualquer margem?
- O professor pediu "normas ABNT"? O que era isso?
- Qual foi a diferença entre um trabalho "apresentável" e um trabalho "profissional"?

> Hoje vamos escrever o relatório da visita técnica ao Parque Tecnológico de Pato Branco - e o formato vai ser ABNT, o padrão de documentos acadêmicos e profissionais do Brasil.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 13 -->

<!-- objetivo: aluno compreende o que é ABNT e por que documentos profissionais usam esse padrão (ABNT NBR 14724:2011) -->

# O que é ABNT?

**ABNT** - Associação Brasileira de Normas Técnicas

- Órgão oficial que define padrões técnicos no Brasil desde 1940
- A norma **NBR 14724** define como deve ser um trabalho acadêmico
- Usada em: TCCs, relatórios de estágio, relatórios técnicos, monografias

**Por que isso importa para quem trabalha com IA?**
Relatórios de projeto, documentação técnica e laudos de sistema de IA seguem esses mesmos padrões em empresas brasileiras.

<v-click>

**Hoje:** vamos configurar o Word seguindo ABNT para escrever o relatório da visita ao Parque Tecnológico.

</v-click>

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 14 -->

<!-- objetivo: aluno memoriza as configurações obrigatórias de margem, fonte e espaçamento ABNT -->

# Regras ABNT - Referência Rápida


<SlideTable fullWidth>

| Elemento | Regra ABNT |
|---|---|
| Margem superior | 3 cm |
| Margem esquerda | 3 cm |
| Margem inferior | 2 cm |
| Margem direita | 2 cm |
| Fonte | Arial ou Times New Roman |
| Tamanho | 12 (corpo do texto) |
| Espaçamento | 1,5 linhas |
| Recuo de parágrafos | 1,25 cm (primeira linha) |
| Alinhamento | Justificado |

</SlideTable>

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 15 -->

<!-- objetivo: aluno localiza os caminhos corretos no Word para cada configuração ABNT -->

# Caminhos no Word - Referência Rápida (1/2)


<SlideTable fullWidth>

| O que configurar | Caminho no Word |
|---|---|
| Margens (3/3/2/2) | Layout → Margens → Margens Personalizadas |
| Fonte (Arial 12) | Página Inicial → caixa de fonte + tamanho |
| Espaçamento 1,5 | Página Inicial → ícone Espaçamento entre Linhas |
| Recuo 1,25 cm | Parágrafo → Recuo especial → Primeira linha |

</SlideTable>

---
layout: default
bgPreset: default
card: false
aulaNum: "Aula 28"
---

<!-- SLIDE 15a -->

<!-- objetivo: aluno localiza os caminhos restantes no Word para configuração ABNT -->

# Caminhos no Word - Referência Rápida (2/2)

<SlideTable fullWidth>

| O que configurar | Caminho no Word |
|---|---|
| Alinhamento | Página Inicial → botão Justificar |
| Número de página | Inserir → Número de Página |
| Salvar como PDF | Arquivo → Salvar Como → PDF |

</SlideTable>

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 16 -->

<!-- objetivo: aluno executa a configuração de margens ABNT no Word com precisão -->

# Lab 1 - Configurar as Margens (todos juntos)

**Siga o professor ao vivo:**

1. Abra o Word - documento em branco
2. Clique em **Layout** na barra superior
3. Clique em **Margens**
4. Escolha **Margens Personalizadas...**

---
layout: default
bgPreset: default
card: false
aulaNum: "Aula 28"
---

<!-- SLIDE 16a -->

<!-- objetivo: aluno insere os valores corretos de margem ABNT e verifica o resultado visual -->

# Lab 1 - Configurar as Margens (cont.)

5. Configure:
   - Superior: **3 cm**
   - Esquerda: **3 cm**
   - Inferior: **2 cm**
   - Direita: **2 cm**
6. Clique em **OK**

> Verifique as réguas laterais - você vê a diferença entre esquerda (3 cm) e direita (2 cm)?

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 17 -->

<!-- objetivo: aluno configura fonte e espaçamento ABNT corretamente -->

# Lab 2 - Fonte, Espaçamento e Recuo

**Siga o professor ao vivo — Ctrl + A para selecionar tudo**

1. **Fonte:** Página Inicial → caixa de fonte → `Arial` → tamanho `12`
2. **Espaçamento:** Página Inicial → ícone Espaçamento → `1,5`

---
layout: default
bgPreset: default
card: false
aulaNum: "Aula 28"
---

<!-- SLIDE 17a -->

<!-- objetivo: aluno configura recuo e alinhamento ABNT corretamente -->

# Lab 2 - Fonte, Espaçamento e Recuo (cont.)

3. **Recuo de parágrafo:**
   - Clique com botão direito → Parágrafo
   - Em "Recuo especial" escolha **Primeira linha**
   - Valor: **1,25 cm**
4. **Alinhamento:** Página Inicial → botão **Justificar** (ou Ctrl + J)

> Pronto! O corpo do documento já está em ABNT. Agora vamos montar a capa.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 18 -->

<!-- objetivo: aluno compreende a estrutura de uma capa ABNT antes de executar -->

# Lab 3 - Estrutura da Capa

A capa de um relatório ABNT tem esta ordem (centralizada, sem recuo):

```
SENAC - Serviço Nacional de Aprendizagem Comercial
Técnico em Inteligência Artificial

[Nome completo do aluno]

RELATÓRIO DE VISITA TÉCNICA
Parque Tecnológico de Pato Branco

Pato Branco
2026
```

<v-click>

**Atenção:** todo texto da capa é **centralizado** - não justificado, sem recuo de parágrafo.

</v-click>

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 19 -->

<!-- objetivo: aluno executa a montagem da capa com os elementos corretos e formatação centralizada -->

# Lab 3 - Passo a Passo da Capa (todos juntos)

**Siga o professor ao vivo:**

1. Selecione tudo (Ctrl + A) e remova o recuo de parágrafo - clique em **Centralizar**
2. Digite o cabeçalho da instituição:
   - `SENAC - Serviço Nacional de Aprendizagem Comercial`
   - `Técnico em Inteligência Artificial`
3. Pule 3 linhas e digite seu **nome completo**

---
layout: default
bgPreset: default
card: false
aulaNum: "Aula 28"
---

<!-- SLIDE 19a -->

<!-- objetivo: aluno completa a capa com título do relatório, local, ano e quebra de página -->

# Lab 3 - Passo a Passo da Capa (cont.)

4. Pule 3 linhas e digite:
   - `RELATÓRIO DE VISITA TÉCNICA`
   - `Parque Tecnológico de Pato Branco`
5. Pule 3 linhas e digite:
   - `Pato Branco`
   - `2026`
6. Ao final da capa: **Ctrl + Enter** para iniciar nova página

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 20 -->

<!-- objetivo: aluno salva o documento no formato .docx editável -->

# Lab 4 - Salvar como .docx

**Siga o professor ao vivo:**

**Salvar como .docx (formato editável):**
1. Arquivo → Salvar Como
2. Escolha a pasta: `Documentos → relatorio-visita-tecnica`
3. Nome do arquivo: `relatorio_visita_pato_branco_seu_nome`
4. Formato: **Documento do Word (.docx)**
5. Clique Salvar

---
layout: default
bgPreset: default
card: false
aulaNum: "Aula 28"
---

<!-- SLIDE 20a -->

<!-- objetivo: aluno salva o documento no formato PDF para entrega -->

# Lab 4 - Salvar como PDF (cont.)

**Salvar como PDF (formato final):**
1. Arquivo → Salvar Como
2. Mesmo nome e pasta
3. Formato: **PDF**
4. Clique Salvar

> O .docx é para editar depois. O PDF é o que você entrega - ninguém consegue mexer no conteúdo.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 21 -->

<!-- objetivo: aluno verifica a qualidade da capa criada usando critérios objetivos de conferência -->

# Exercício - Sua Capa está Correta?

**Abra seu PDF e confira cada item:**

<SlideTable>

| Item | Conferir |
|---|---|
| Nome da instituição na primeira linha? | Sim / Não |
| Seu nome completo aparece? | Sim / Não |
| Título em letras maiúsculas? | Sim / Não |
| Cidade e ano no final? | Sim / Não |
| Texto centralizado (sem recuo)? | Sim / Não |
| Margem esquerda visualmente maior que a direita? | Sim / Não |

</SlideTable>

---
layout: default
bgPreset: default
card: false
aulaNum: "Aula 28"
---

<!-- SLIDE 21a -->

<!-- objetivo: gabarito do exercício de conferência da capa (visível apenas pelo professor) -->

# Exercício - Gabarito (cont.)

<AdminOnly>

**Gabarito de conferência:**
Todos os itens devem estar marcados como "Sim". Se algum estiver "Não", o aluno deve retornar ao passo correspondente dos labs. Margens: no PDF, a margem esquerda (3 cm) deve ser visivelmente maior que a direita (2 cm). O título em maiúsculas confirma o uso correto de RELATÓRIO DE VISITA TÉCNICA.

</AdminOnly>

---
layout: brainstorm
bgPreset: palette
pulse: true
aulaNum: "Aula 28"
---

<!-- SLIDE 22 -->

# Por que isso importa fora da escola?

Pense nas situações abaixo:

- Um engenheiro de IA entrega um relatório de auditoria de modelo para o cliente - sem padrão ABNT, parece amador
- Uma empresa pede documentação técnica do sistema que você desenvolveu - sem padrões, é difícil revisar e arquivar
- Você faz estágio e o supervisor pede "o relatório do projeto". Ele já espera que seja em ABNT.

**Formatação profissional transmite credibilidade.**
O conteúdo pode ser excelente, mas a apresentação visual também comunica competência.

---
layout: default
bgPreset: default
card: true
aulaNum: "Aula 28"
---

<!-- SLIDE 23 -->

# Tarefa de Casa - Aula 28

**Prazo:** próxima aula (02/06/2026)

Continue o relatório da visita técnica ao Parque Tecnológico. Após a capa (já feita em aula), escreva o **corpo do relatório** respondendo as perguntas abaixo em texto corrido (não em tópicos):

1. Quantas startups/empresas você conheceu? O que é uma startup em uma frase?
2. Em quais delas a IA estava presente? A solução delas **depende** de IA ou apenas usa IA como apoio?
3. Você conseguiria replicar em casa alguma dessas soluções? Por quê sim ou por quê não?
4. Qual startup ou empresa te chamou mais atenção e por quê?
5. **Conclusão:** o que você aprendeu com a visita + a dinâmica do Shark Tank juntos?

---
layout: default
bgPreset: default
card: false
aulaNum: "Aula 28"
---

<!-- SLIDE 23a -->

# Tarefa de Casa - Aula 28 (cont.)

**Formato obrigatório:** ABNT (as configurações do lab de hoje)

**Como entregar:** salvar o .docx e o PDF no seu Drive ou Email
O professor irá disponibilizar uma atualização na plataforma,
que será possível colocar o arquivo final, no futuro

> Use o checklist do Slide 21 para verificar antes de enviar.

---
layout: end
bgPreset: palette
github: LeoZanini
avatar: https://github.com/LeoZanini.png?size=256
aulaNum: "Aula 28"
---

<!-- SLIDE 24 -->

# Até a próxima!

**Aula 28 - Concluída**

**O que fizemos hoje:**
- Mesa Redonda: avaliação cruzada dos projetos Shark Tank (UC07)
- Lab Word ABNT: margens, fonte, espaçamento, capa e PDF (UC01)

> Traga o relatório com a capa + corpo iniciado (tarefa de hoje).
