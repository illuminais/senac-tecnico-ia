---
name: verbos-indicadores
description: Escala de 5 níveis para o verbo inicial do indicador, regra do verbo composto, regra da cláusula de contexto e regra de orçamento. Use SEMPRE antes de desenhar uma avaliação, dimensionar um bloco de aula ou decidir o que cortar.
---
# Skill: Verbos de Indicador — profundidade por verbo

Use esta skill antes de desenhar qualquer avaliação ou dimensionar qualquer bloco de aula.
Ela responde a uma pergunta só: **quão fundo esse indicador precisa ser trabalhado?**

---

## Por que esta skill existe

Descoberta do professor em 26/08/2026: o repositório tratava todos os indicadores como se
exigissem a mesma profundidade. Não exigem. O **verbo inicial** diz o nível de desempenho que
conta como evidência, e portanto quanto tempo de aula o indicador merece.

**O Senac não publica tabela de verbos.** Os documentos oficiais definem só a estrutura e
delegam a calibragem ao docente:

- **DocTec2 §3.2** — indicadores "caracterizam-se pela associação aos elementos de competência,
  por serem **observáveis** nas diversas situações de aprendizagem". E o alerta duro: "se um
  único indicador não for atendido pelo aluno no fim de uma Unidade Curricular, a competência
  não foi desenvolvida".
- **DocTec5 §2.1** — indicador = **ação + contexto**: "apresentam uma ação e descrevem o
  contexto ou condição nos quais se desenvolve a ação". E: "o docente deverá definir, em termos
  de desempenho, o que significa ter atendido".

A escala abaixo é nossa, calibrada nos verbos que aparecem **de fato** nos indicadores deste
curso. Não é uma lista genérica de Bloom.

---

## A escala de 5 níveis

| Nível | Verbos reais do curso | Evidência de **Atendido** | Custo de ensino |
|---|---|---|---|
| **1 Reconhecer** | Reconhece, Identifica | aponta o certo entre opções, no contexto dado | apresentação + exemplos + checagem rápida. Não produz nada |
| **2 Compreender** | Compreende, Interpreta, Estuda, Considera | explica com as próprias palavras e lê corretamente um caso novo | definição esmiuçada + analogia. Evidência é explicação escrita |
| **3 Aplicar** | Aplica, Utiliza, Realiza, Classifica, Organiza, Acessa, Manipula | executa o procedimento numa situação nova, sem modelo à vista | exercício de fixação + aplicação em caso novo |
| **4 Analisar / Avaliar** | Analisa, Avalia, Resolve, Gerencia | decide entre alternativas e justifica pelo critério | caso com ambiguidade real + defesa da escolha |
| **5 Criar** | Cria, Propõe, Representa, Seleciona | produz um artefato novo que atende requisitos declarados | tempo de produção + requisitos explícitos + revisão |

> Verbo que não estiver na tabela: encaixe pelo desempenho que ele exige, não pela palavra.
> Na dúvida entre dois níveis, escolha o **maior** e depois corte pelo orçamento.

---

## Regra 1 — verbo composto

Metade dos indicadores deste curso tem **dois verbos**. Quando isso acontece:

> **O maior verbo governa o teto da evidência. O menor é o piso do Parcialmente Atendido.**

Ou seja: quem só faz o verbo menor está em PA, não em NA. Quem faz o maior está em A.

### Compostos reais do T2 (consulta direta)

| Indicador | Composto | Piso (PA) | Teto (A) |
|---|---|---|---|
| UC09-3 / UC09-4 | Compreende **e aplica** funções logarítmicas / exponenciais | 2 | **3 Aplicar** |
| UC08-5 | Cria **e manipula** consultas SQL | 3 | **5 / 3 na prática** |
| UC06-2 | Reconhece **e aplica** conceitos de Pipeline para GPU | 1 | **3 Aplicar** |
| UC03-5 | Interpreta **e representa** dados em tabelas e gráficos | 2 | **5 Criar** |
| UC07-5 | Analisa objetivos estratégicos **e cria** plano de implementação | 4 | **5 Criar** |
| UC07-7 | Estuda o ciclo de vida da informação **e avalia** a cultura organizacional | 2 | **4 Avaliar** |
| UC01-4 | Acessa **e utiliza** navegadores com segurança | 3 | **3 Aplicar** |
| UC01-5 | Organiza **e armazena** informações digitais | 3 | **3 Aplicar** |
| UC04-3 | Compreende **e utiliza** resultados supervisionados e não supervisionados | 2 | **3 Aplicar** |

**Erro clássico que esta regra evita:** mirar sempre no verbo maior e transformar
"Compreende e aplica logaritmos" numa unidade inteira de logaritmos, quando o teto é só
*aplicar*. Propriedades, identidades e mudança de base ficam **fora** do escopo.

---

## Regra 2 — a cláusula de contexto separa A de PA

Direto do DocTec5: "quanto mais o aluno realiza a ação descrita, **relacionando-a ao
contexto**, mais o docente pode dizer se ele atendeu ou não ao indicador".

O exemplo oficial: o aluno que seleciona os produtos químicos certos mas **ignora o estado dos
fios da cliente** está em PA, não em NA nem em A. A ação saiu; a cláusula de contexto não.

> **Ao escrever a rubrica, o A quase nunca é "fez a ação". É "fez a ação satisfazendo a
> cláusula de contexto".**

Traduzindo para indicadores deste curso:

| Indicador | Ação | Cláusula de contexto | O que é PA |
|---|---|---|---|
| UC08-3 Cria a estrutura física de BD **de acordo com os requisitos da aplicação e modelagem** | criar tabelas | de acordo com os requisitos | tabelas corretas, sem rastreabilidade a requisito |
| UC08-5 Cria e manipula consultas SQL **para resolução de problemas** | escrever query | resolvendo um problema declarado | query correta que não responde ao problema |
| UC07-6 Realiza análise de custo-benefício **para garantir alinhamento financeiro** | fazer a conta | alinhada ao objetivo financeiro | conta feita, sem conclusão comparativa |

---

## Regra 3 — orçamento de tempo

Níveis 4 e 5 custam **bloco inteiro**. Níveis 1 e 2 **não merecem bloco próprio** e devem
viajar de carona em outro conteúdo.

Quando o tempo não fecha, corte nesta ordem, de trás para frente:

| Prioridade | Situação | O que fazer |
|---|---|---|
| 1 (nunca corta) | **morre no trimestre + nível alto** | maior fatia de tempo, execução real |
| 2 | **morre no trimestre + nível baixo** | fecha rápido e bem, libera tempo para o 1 |
| 3 | **continua no próximo trimestre + nível alto** | aceita entregar aparado, o T3 recolhe |
| 4 (corta primeiro) | **continua + nível baixo** | corta sem dó |

Cruze sempre com a coluna `Trim.` de `contextos/indicadores-t2.md` e com a seção "Indicadores
que morrem no T2" de `contextos/ATIVIDADES_AVALIATIVAS.md`.

---

## Como usar, na prática

Antes de desenhar um bloco ou uma avaliação, responda quatro perguntas:

1. **Qual o verbo?** Se houver dois, qual é o maior? → define o teto da evidência
2. **Qual a cláusula de contexto?** → define a fronteira A / PA na rubrica
3. **Morre neste trimestre ou continua?** → define a prioridade de orçamento
4. **O que fica FORA de escopo por causa do teto?** → escreva explicitamente, é isso que
   impede a aula de inchar

E ao escrever a rubrica, nunca use ponto ou nota numérica: o modelo Senac é
**Atendido / Parcialmente Atendido / Não Atendido**.

---

## Refs

- `contextos/indicadores-t2.md` — lista viva com coluna de trimestre
- `contextos/ATIVIDADES_AVALIATIVAS.md` — indicadores que morrem no T2, conta de fechamento
- [DocTec2 Competência](https://espacodocente.senac.br/wp-content/uploads/2024/03/DocTec2_Competencias_2022.pdf)
- [DocTec5 Avaliação da Aprendizagem](https://espacodocente.senac.br/wp-content/uploads/2024/04/DocTec5_AvaliacaoApren_2022.pdf)
