---
theme: ../../../neural-slides-template
colorSchema: dark
title: "Técnico em IA — Aula 39"
author: Leonardo Zanini
github: LeoZanini
courseTitle: Técnico em Inteligência Artificial
aulaNum: "Aula 39"
footerLogo: /assets/senac-logo.png
bgPreset: palette
aulaDate: "2026-07-03"
layout: cover
---

<!-- SLIDE 1 -->
<!-- objetivo: aluno se situa no fio condutor do dia antes de qualquer conteúdo -->

# Aula 39
## Como os algoritmos de IA realmente pensam

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 2 -->
<!-- objetivo: aluno entende a estrutura da atividade do bloco antes de começar, sem spoiler da implementação futura -->

# Bloco 1
## 3 algoritmos, 10 grupos, 1 desafio

Hoje seu grupo vai pesquisar como um algoritmo de IA decide as coisas, e explicar isso pra turma toda, no quadro.

---
layout: brainstorm
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 3 -->
<!-- debate: aula 39 -->

# Debate: Como um computador decide?

**Discussão coletiva: 3 minutos**

- Vocês acham que um computador consegue "decidir" sozinho, sem ninguém dizendo a resposta certa?
- De quantos jeitos diferentes vocês imaginam que um algoritmo pode decidir alguma coisa?
- Pensem em um exemplo do dia a dia de vocês onde um app parece "escolher" algo por conta própria.

> **Conexão futura:** hoje vocês vão descobrir 3 formas bem diferentes que os algoritmos de IA usam para decidir.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 4 -->
<!-- objetivo: aluno reconhece o KNN (K-Nearest Neighbors) como algoritmo supervisionado que classifica por semelhança (Cover e Hart, 1967) -->

# KNN: os vizinhos mais parecidos decidem

- Pense num vizinho novo no bairro: você imagina como ele é observando as pessoas mais parecidas com ele que você já conhece
- KNN (K-Nearest Neighbors, os K vizinhos mais próximos) faz isso com dados: compara um item novo com os itens já conhecidos mais parecidos
- Os "vizinhos" mais próximos votam qual é a resposta certa para o item novo
- Exemplo: um filme novo (duração e nota) é comparado com os títulos do catálogo mais parecidos com ele, e esses vizinhos indicam o gênero
- Descrito formalmente em 1967 por Cover e Hart, é um dos algoritmos de classificação mais antigos que ainda se usa
- Tipo: aprendizado supervisionado (usa exemplos com resposta certa para aprender)

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 5 -->
<!-- objetivo: aluno reconhece a Árvore de Decisão como algoritmo supervisionado baseado em perguntas sucessivas (Quinlan, 1986) -->

# Árvore de Decisão: um fluxograma de perguntas

- Funciona como aqueles testes de "qual personagem você é": cada resposta leva a uma pergunta seguinte
- O algoritmo faz perguntas de sim ou não sobre os dados, uma de cada vez, até chegar numa resposta final
- Cada pergunta divide os dados em grupos menores e mais parecidos entre si
- Exemplo: "duração maior que 120 minutos? Sim. Nota maior que 7? Sim." Então o gênero é Ação

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 6 -->
<!-- objetivo: aluno reconhece a origem histórica e a classificação formal da Árvore de Decisão como algoritmo supervisionado -->

# Árvore de Decisão: um fluxograma de perguntas (cont.)

- Formalizada por Ross Quinlan em 1986, no algoritmo ID3, é a base de várias técnicas usadas até hoje
- Tipo: aprendizado supervisionado, usado tanto para classificar quanto para prever números

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 7 -->
<!-- objetivo: aluno reconhece o K-Means como algoritmo não supervisionado que agrupa dados por semelhança sem rótulos (MacQueen, 1967) -->

# K-Means: agrupar sem saber os rótulos antes

- Imagine separar uma pilha de roupas por cor sem ninguém te dizer qual é qual: você agrupa pelo que parece igual
- K-Means faz isso com números: junta itens parecidos em K grupos, sem saber de antemão o rótulo de nenhum deles
- O algoritmo repete o agrupamento várias vezes até os grupos ficarem estáveis
- Exemplo: juntar títulos do catálogo por duração e nota, sem informar o gênero, e ver se os grupos batem com Ação, Comédia e Terror
- O nome K-Means foi definido por James MacQueen em 1967
- Tipo: aprendizado não supervisionado (não usa respostas prontas, só encontra padrões nos dados)

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 8 -->
<!-- objetivo: aluno compreende o conceito de viés (bias) em algoritmos antes de responder a pergunta de ética na dinâmica -->

# O que é viés em um algoritmo

- Viés (bias, em inglês: tendência torta que um algoritmo aprende sem querer) acontece quando o algoritmo só viu um tipo de exemplo
- Se um algoritmo só treina com filmes de ação longos e bem avaliados, ele pode "achar" que todo filme bom precisa ser longo
- O problema não é só técnico: um algoritmo com viés pode tratar grupos de pessoas de forma injusta, sem ninguém ter programado isso de propósito
- Toda pesquisa de hoje vai responder a uma pergunta: que viés esse algoritmo pode ter?

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 9 -->
<!-- objetivo: aluno entende as regras da dinâmica de pesquisa e apresentação antes de começar -->

# Hora de pesquisar: seu grupo, seu algoritmo

- Pesquisem para que serve e como funciona o algoritmo do grupo, e respondam: que viés esse algoritmo pode ter?
- Apresentação no quadro, giz ou marcador, sem slide
- 60 minutos de pesquisa, depois 6 minutos de apresentação por grupo

<SlideTable compact>

| Algoritmo | Grupos | Alunos |
|---|---|---|
| KNN | 4 grupos | 11 |
| Árvore de Decisão | 3 grupos | 9 |
| K-Means | 3 grupos | 9 |

</SlideTable>

<AdminOnly>

**Referência para o professor:** KNN pode copiar o viés da maioria dos vizinhos em dataset desbalanceado; Árvore de Decisão pode aprender regra injusta se o topo refletir um recorte enviesado; K-Means pode agrupar errado se a variável escolhida carregar viés.

</AdminOnly>

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 10 -->
<!-- objetivo: apoio visual para o tempo de pesquisa em grupo, sem conteúdo expositivo novo -->

# Pesquisa em grupo
## 60 minutos no relógio

Decidam quem fala o quê. Preparem a apresentação para o quadro.

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 11 -->
<!-- objetivo: apoio visual para a rodada de apresentações no quadro, sem conteúdo expositivo novo -->

# Apresentações no quadro
## 6 minutos por grupo

10 grupos, na ordem que o professor chamar. Fala + resposta da pergunta de viés.

---
layout: center
bgPreset: default
---

<!-- SLIDE 12 -->
<!-- objetivo: manter o suspense antes do reveal, tela intencionalmente em branco -->

---
layout: center
bgPreset: default
---

<!-- SLIDE 13 -->
<!-- objetivo: manter o suspense antes do reveal, tela intencionalmente em branco -->

---
layout: center
bgPreset: default
---

<!-- SLIDE 14 -->
<!-- objetivo: manter o suspense antes do reveal, tela intencionalmente em branco -->

---
layout: center
card: true
bgPreset: palette
pulse: true
---

<!-- SLIDE 15 -->
<!-- objetivo: gerar a virada dramática que motiva a implementação em Python no próximo bloco -->

# SURPRESA
## Vocês vão implementar isso de verdade

Em Python. Agora.

---
layout: center
card: true
bgPreset: animate
---

<!-- SLIDE 16 -->
<!-- objetivo: aluno sai do bloco sabendo o que vem a seguir, sem detalhes do dataset ainda -->

# Daqui a pouco
## Dataset novo, biblioteca de verdade, desafio no escuro

Depois do intervalo vocês vão usar o scikit-learn (biblioteca de Python para machine learning) para fazer o algoritmo que pesquisaram funcionar de verdade.

Bom intervalo!

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 17 -->
<!-- objetivo: aluno retoma o clima do reveal e entende que agora começa a fase prática do dia -->

# Bloco 2
## Hora de fazer funcionar de verdade

Vocês já sabem: agora é a vez de pegar o algoritmo que seu grupo pesquisou e fazer ele rodar em Python de verdade.

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 18 -->
<!-- objetivo: aluno entende a estrutura do dataset CatálogoStream (duração, nota, gênero) que vai usar na implementação -->

# O dataset de hoje: CatálogoStream

- Tema Netflix/streaming: cada título do catálogo tem duração em minutos, nota de 0 a 10 e um gênero
- Duração e nota são os dados de entrada do algoritmo, gênero é o que ele vai tentar prever ou agrupar

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 19 -->
<!-- objetivo: aluno tem acesso ao dataset CatálogoStream em formato pronto para copiar e colar no próprio editor -->

# O dataset de hoje: CatálogoStream (cont.)

- Copiem essas listas Python e colem direto no editor de vocês, sem precisar de pandas

```python
titulos = [
    "Fuga Sem Volta", "Operação Blackout", "Última Fronteira",
    "Trovão de Aço", "Zona de Impacto", "Código Vermelho",
    "Rir Até Cair", "Casamento Trapalhão", "Família Bagunça",
    "Vizinho Barulhento", "Plano Furado", "Fim de Semana Caótico",
    "Casa do Silêncio", "Sombra na Parede", "O Que Espreita",
    "Corredor Escuro", "Sussurro Final", "Porão Sem Luz",
]
duracoes = [132, 145, 128, 138, 150, 142, 92, 88, 97, 90, 95, 99, 84, 90, 87, 80, 93, 78]
notas = [8.1, 7.8, 8.4, 7.6, 8.9, 8.3, 7.2, 6.8, 7.5, 6.9, 7.7, 7.4, 6.1, 5.8, 6.4, 5.3, 6.0, 5.5]
generos = ["Ação"] * 6 + ["Comédia"] * 6 + ["Terror"] * 6
```

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 20 -->
<!-- objetivo: aluno instala e reconhece o scikit-learn como biblioteca profissional de machine learning em Python -->

# Instalando o scikit-learn

- scikit-learn é uma biblioteca de Python com os algoritmos de IA mais usados já prontos, sem precisar programar cada um do zero
- É a primeira vez que a turma usa essa biblioteca
- Todo mundo roda o mesmo comando agora, ao mesmo tempo

```bash
pip install scikit-learn
```

- Se der erro na instalação, levantem a mão: o professor já tem um plano B pronto

---
layout: default
card: true
bgPreset: default
---

<!-- SLIDE 21 -->
<!-- objetivo: aluno reconhece o padrão fit/predict comum às bibliotecas de machine learning em Python, antes de aplicá-lo ao próprio algoritmo -->

# O padrão que toda biblioteca de IA usa

- Quase toda biblioteca de machine learning em Python segue os mesmos dois passos
- `modelo.fit(X, y)`: o modelo aprende com os dados que vocês têm (treina)
- `modelo.predict(X_novo)`: o modelo usa o que aprendeu para responder sobre dados novos
- X são as colunas de entrada (aqui: duração e nota), y é o que se quer prever ou agrupar (aqui: gênero)
- O nome do algoritmo muda a cada biblioteca, mas o padrão fit/predict é sempre esse

<AdminOnly>

**Referência para o professor (não mostrar como colinha pronta):**
```python
from sklearn.neighbors import KNeighborsClassifier
# ou: from sklearn.tree import DecisionTreeClassifier
# ou: from sklearn.cluster import KMeans

modelo = KNeighborsClassifier()
modelo.fit(X, y)
modelo.predict(X_novo)
```

</AdminOnly>

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 22 -->
<!-- objetivo: aluno assume a autonomia da implementação, aplicando o padrão fit/predict ao próprio algoritmo sem scaffolding específico -->

# Se virem: hora do desafio

- Cada grupo já sabe seu algoritmo (KNN, Árvore de Decisão ou K-Means): agora é aplicar o padrão fit/predict a ele
- Sem colinha pronta: usem o que pesquisaram, a documentação e a lógica do fit/predict
- Travar faz parte do processo: tentar de novo, ajustar, pedir ajuda ao professor, tudo isso é trabalho real de quem programa IA

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 23 -->
<!-- objetivo: apoio visual para o tempo de implementação em grupo, sem conteúdo expositivo novo -->

# Implementação
## 70 a 75 minutos no relógio

Mão na massa. Chamem o professor se travarem de verdade.

---
layout: default
card: true
bgPreset: palette
---

<!-- SLIDE 24 -->
<!-- objetivo: aluno entende como vai funcionar a rodada final de mostra dos grupos -->

# Hora de mostrar pra turma

- Cada grupo mostra a tela: funcionou, quase funcionou ou travou, tudo bem
- 2 minutos por grupo, sem gabarito único no projetor
- O que importa é mostrar o caminho percorrido, não só o resultado final

---
layout: center
card: true
bgPreset: palette
pulse: true
pulseDuration: 8
---

<!-- SLIDE 25 -->
<!-- objetivo: apoio visual para a rodada de mostra dos grupos, sem conteúdo expositivo novo -->

# Mostra dos grupos
## 2 minutos por grupo

Cerca de 10 grupos, na ordem que o professor chamar.

---
layout: end
bgPreset: palette
---

<!-- SLIDE 26 -->
<!-- objetivo: aluno reconhece o percurso completo do dia (pesquisa, apresentação, surpresa, implementação com biblioteca real) e associa isso ao papel de um técnico em IA -->

# Fim da Aula 39

<ul class="mt-4 space-y-3 text-left text-lg">
  <li v-click>Pesquisaram como um algoritmo decide, sem saber que iam programar</li>
  <li v-click>Apresentaram pra turma toda, no quadro</li>
  <li v-click>Foram surpreendidos: hoje era pra implementar de verdade</li>
  <li v-click>Instalaram uma biblioteca profissional e fizeram o próprio algoritmo funcionar</li>
</ul>

<p v-click class="text-green-400 font-bold text-xl mt-6">Isso é o que um técnico em IA faz: aprende a teoria e coloca pra rodar.</p>
