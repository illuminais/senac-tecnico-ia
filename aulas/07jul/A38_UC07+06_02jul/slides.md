---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 38"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 38"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-07-02"
unlockHour: 10
layout: cover
---

<!-- SLIDE 1 — Capa -->

# Aula 38
## Arquitetura e Transformação Digital

*02 de julho de 2026*

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

# UC06: Arquitetura de Computadores e GPU
## Von Neumann, Harvard e o gargalo que a IA precisou superar

*2 HA - Pesquisa em duplas + entrega no papel*

---
layout: center
bgPreset: animate
card: true
---

<!-- objetivo: aluno conecta o conhecimento físico dos componentes (A30 - desmontagem) com o modelo lógico que define como CPU, memória e dados se comunicam; motivando Von Neumann como porta de entrada para entender por que a GPU existe (Patterson & Hennessy, Computer Organization and Design, 2017) -->

# Você desmontou o computador.
## Agora vai entender como ele pensa.

Na A30, você viu os componentes por fora.

Hoje: como eles **conversam por dentro**?

Esse modelo tem nome. E foi inventado em 1945.

---
layout: default
bgPreset: palette
---

<!-- objetivo: aluno sabe o que pesquisar para construir entendimento próprio de Von Neumann e Harvard antes de responder por escrito, desenvolvendo autonomia em busca técnica -->

# Atividade: Von Neumann vs Harvard

## Etapa 1 - Pesquisa (~20 min)

**Abra o pc em dupla e pesquise os 4 tópicos abaixo:**

1. O que é o modelo de Von Neumann, quais são os seus componentes e como eles se comunicam entre si
2. O que é o modelo Harvard e qual é a diferença principal em relação a Von Neumann
3. O que é o "gargalo de Von Neumann" e por que ele existe
4. Onde cada modelo é usado na prática hoje

> Dica: pesquise em português e em inglês. Tente "Von Neumann architecture" no Google.

---
layout: default
bgPreset: palette
---

<!-- objetivo: aluno aplica o que pesquisou respondendo por escrito sem consulta, demonstrando compreensão e não apenas cópia; professor avalia entendimento em tempo real -->

# Atividade: Von Neumann vs Harvard

## Etapa 2 - Feche o celular. Responda no papel.

**Resposta individual - entrega até 9h35:**

1. Desenhe o modelo de Von Neumann com os 4 componentes
2. Qual é a diferença principal entre Von Neumann e Harvard? Use suas próprias palavras, sem copiar
3. Encontre o erro: *"No modelo de Von Neumann, a CPU tem dois barramentos separados: um busca instruções e outro lê dados, por isso consegue fazer as duas coisas ao mesmo tempo."* - O que está errado?
4. Seu celular usa Von Neumann ou Harvard? Como você chegou nessa conclusão?
5. Por que a GPU que roda IA não usa Von Neumann puro? O que mudou?

---
layout: center
card: true
bgPreset: animate
pulse: true
pulseDuration: 4
---

# ENTREGA: 9h35

Responda no papel.

*Após 9h35 não são aceitas entregas.*

---
layout: default
bgPreset: default
---

<!-- objetivo: professor conduz correção coletiva consolidando Von Neumann, Harvard, gargalo e conexão com GPU/IA; gabarito protegido até após a entrega (unlockHour: 10) -->

# Discussão Coletiva

## Corrigindo as respostas

<AdminOnly>

**1. Modelo de Von Neumann - os 4 componentes:**

- CPU (Unidade Lógica e Aritmética + Unidade de Controle)
- Memória (armazena dados E instruções no mesmo espaço)
- Dispositivos de Entrada (teclado, mouse, sensores)
- Dispositivos de Saída (monitor, impressora, atuadores)
- Todos conectados por **um barramento único e compartilhado**

**2. Diferença Von Neumann vs Harvard:**

Von Neumann: dados e instruções viajam pelo **mesmo barramento** e ficam na **mesma memória**.
Harvard: barramentos **separados** para dados e instruções - a CPU pode buscar os dois ao mesmo tempo, sem fila de espera.

**3. O erro na definição (pegadinha):**

O erro está em "dois barramentos separados" - isso descreve a arquitetura **Harvard**, não Von Neumann.
Von Neumann tem **um barramento único** que serve para tudo.
É exatamente por causa desse barramento único que existe o gargalo: a CPU fica esperando para buscar instrução ou dado, mas não consegue fazer os dois simultaneamente.

**4. Celular: Von Neumann ou Harvard?**

Resposta esperada: **Harvard modificada** (Modified Harvard Architecture).
Processadores ARM (iPhone, Android) têm caches separados para instruções (L1i) e dados (L1d), mas a memória principal é compartilhada.
É um híbrido intencional: velocidade de Harvard nos caches + praticidade de Von Neumann na memória RAM.

**5. Por que a GPU não usa Von Neumann puro?**

O gargalo de Von Neumann inviabiliza o paralelismo massivo: um barramento único não aguenta milhares de operações simultâneas.
A GPU usa VRAM com alta largura de banda (GDDR6X, HBM2e) e centenas de controladores de memória em paralelo.
Não existe "fila única" para acessar dados: os CUDA cores acessam memória de forma distribuída.
**Resumo:** Von Neumann é um cano de água. A GPU é uma rede de irrigação com mil mangueiras ao mesmo tempo.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- objetivo: aluno conecta Von Neumann/Harvard com a necessidade da GPU para IA, criando ponte de significado para o World Café (UC07) que virá a seguir -->

# Von Neumann explica tudo.

O barramento único foi a maior limitação da era do PC.

A GPU nasceu para **contornar** esse gargalo.

O modelo de IA que roda no seu celular existe porque alguém projetou uma arquitetura diferente.

**A seguir: World Café - Transformação Digital**

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- objetivo: divisor de bloco UC07, apresenta a metodologia World Café e prepara a turma para a atividade -->

# Transformação Digital
## World Cafe: IA, ética e decisão

*4 mesas - 3 rodadas de 12 minutos*

---
layout: default
bgPreset: palette
---

<!-- objetivo: aluno entende as regras antes de começar, sem precisar de explicação verbal do professor -->

# World Cafe: como funciona

**4 mesas - 3 rodadas de 12 minutos cada**

- Cada grupo chega na mesa, lê a pergunta e começa a discussão
- Cada um escreve seu argumento no **cartão individual** e cola na ficha da mesa
- O **secretário não sai da mesa** em nenhuma rodada
- A cada troca, o secretário apresenta o histórico para o grupo novo em **2 minutos**
- Grupos não secretários: rodam no sentido horário

**Ao final das 3 rodadas: plenária**

Cada secretário apresenta a posição final da mesa para a turma.

---
layout: default
card: true
bgPreset: animate
---

<!-- objetivo: slide fica projetado enquanto o grupo está na mesa 1, a pergunta é o único estímulo necessário -->

# Mesa 1 - Pré-crime e IA

<br>

> **Se uma IA pode prever com 80% de precisão que alguém vai cometer um crime nos próximos 6 meses, o Estado deveria agir antes que o crime aconteça?**

<br>

*Escreva seu argumento no cartão. Cole na ficha da mesa.*

---
layout: default
card: true
bgPreset: animate
---

<!-- objetivo: slide fica projetado enquanto o grupo está na mesa 2, a pergunta é o único estímulo necessário -->

# Mesa 2 - Vida, erro e responsabilidade

<br>

> **Uma IA diagnostica câncer com 94% de acerto. O médico humano acerta 78%. Se a IA erra e o paciente morre, quem é responsável? E se fosse o médico, mudaria sua resposta?**

<br>

*Escreva seu argumento no cartão. Cole na ficha da mesa.*

---
layout: default
card: true
bgPreset: animate
---

<!-- objetivo: slide fica projetado enquanto o grupo está na mesa 3, a pergunta é o único estímulo necessário -->

# Mesa 3 - Privacidade ou segurança

<br>

> **Câmeras com reconhecimento facial em toda Pato Branco reduziriam o crime em 60%. Em troca, você seria monitorado 24h em qualquer espaço público. Você aceita? E se sua família dissesse não, você aceitaria por eles?**

<br>

*Escreva seu argumento no cartão. Cole na ficha da mesa.*

---
layout: default
card: true
bgPreset: animate
---

<!-- objetivo: slide fica projetado enquanto o grupo está na mesa 4, a pergunta é o único estímulo necessário -->

# Mesa 4 - Criatividade, morte e direito

<br>

> **Uma IA treinou com toda a obra de um artista que morreu. Criou uma música nova no estilo dele. A família quer os direitos. A empresa que treinou a IA quer os direitos. O artista morto tem algum direito? Quem tem razão?**

<br>

*Escreva seu argumento no cartão. Cole na ficha da mesa.*

---
layout: center
bgPreset: animate
pulse: true
pulseDuration: 3
---

<!-- objetivo: slide fica projetado durante os 12 minutos de rodada, o pulso visual reforça que o tempo está correndo -->

# RODADA EM ANDAMENTO

*Escreva seu argumento no cartão.*

*Cole na ficha da mesa.*

## 12 minutos

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 5
---

<!-- objetivo: sinal visual de troca de mesa, secretário sabe o que fazer ao ver este slide sem instrução verbal -->

# TROCA DE MESA

**Secretário:** apresente o histórico em 2 minutos para o novo grupo

Grupos não secretários: rotacionar no sentido horário

---
layout: center
card: true
bgPreset: palette
---

<!-- objetivo: marcar início da plenária e orientar a ordem de apresentação dos secretários -->

# PLENÁRIA

**Cada secretário apresenta:**

posição final da mesa + uma frase para a turma

Mesa 1 - Mesa 2 - Mesa 3 - Mesa 4

---
layout: default
bgPreset: animate
---

<!-- objetivo: conectar os temas debatidos com o uso real de IA em empresas hoje, encerrando UC07 com reflexão crítica sobre transformação digital -->

# Fechamento: do debate para o mercado

O que vocês debateram hoje já é realidade em empresas.

- **Mesa 1 - Pré-crime:** PredPol e COMPAS orientam patrulhamento nos EUA; regulação varia por país
- **Mesa 2 - Diagnóstico:** HC-SP usa IA em triagem de imagens com validação médica obrigatória
- **Mesa 3 - Reconhecimento facial:** câmeras com IA já operam em Curitiba e SP; lei no Congresso em discussão
- **Mesa 4 - Direitos autorais:** Getty Images processou Stability AI por treinamento sem licença; sem lei definitiva ainda

Transformação Digital não é só tecnologia. É decidir **quem** a tecnologia serve, **como** e com quais **limites**.
