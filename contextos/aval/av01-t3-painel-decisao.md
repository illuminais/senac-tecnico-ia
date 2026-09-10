---
id: av01-t3
titulo: "Painel de decisão — dengue no Paraná"
tipo: AS
ucs: UC01
indicadores: "UC01: Ind.4 + Ind.5 + Ind.6"
data-alvo: "17/09/2026 (aplicação) · 18/09/2026 (recuperação)"
aula-alvo: A56 (aplicação) · A57 (recuperação)
status: detalhada
---

# Av01-T3 — Painel de decisão

> **Status:** ✅ Detalhada · elaborada em 09/09/2026
> Primeira avaliação do T3 e do modelo de épicos. Instrumento único cobrindo os três
> indicadores porque o trabalho é contínuo desde 10/09.

**Tipo:** AS — atividade em situação, produzida no computador durante a aula
**Datas:** 17/09/2026 (A56, últimos 3 HA) · recuperação em 18/09/2026 (A57, 1 HA)
**Formação:** Individual, consulta livre ao próprio arquivo, caderno e slides
**Indicadores:** UC01 Ind.4, Ind.5 e Ind.6

---

## Por que um instrumento só para três indicadores

O épico inteiro é um projeto contínuo: o aluno recebe um arquivo sujo na A54 e entrega uma
decisão defendida na A56, sempre no mesmo `painel_dengue_pr.xlsx`. Separar em três instrumentos
exigiria três produtos artificiais e consumiria HA que a UC não tem (19 HA no total).

O arquivo entregue já contém a evidência dos três: a aba de origem evidencia o Ind.4, as abas
`01_dados` e `02_limpeza` evidenciam o Ind.5, e a aba `04_painel` evidencia o Ind.6.

## O que o aluno entrega

Aba `04_painel`, cabendo numa tela sem rolar, com cinco elementos:

1. A pergunta, com lugar e período
2. Um gráfico de **padrão** (o que se repete no tempo)
3. Um gráfico de **relação** (duas coisas que variam juntas)
4. A recomendação, com as quatro partes
5. Uma pergunta que o dado **não** responde, e qual dado faltaria

### As quatro partes da recomendação

| Parte | O que é |
|---|---|
| 1. Decisão | o que fazer, onde, quando |
| 2. Critério | qual régua, e por que ela serve para **esta** decisão |
| 3. Número | o dado que sustenta, com unidade, tirado do próprio arquivo |
| 4. Renúncia | o que se está abrindo mão ao escolher assim |

---

## O caso ambíguo, que é o que torna a avaliação nível 4

O dado sustenta **duas decisões opostas e igualmente defensáveis**:

| Critério | 1º lugar | O outro |
|---|---|---|
| Casos absolutos | Londrina, 32.804 casos | Jacarezinho é o 16º, com 1.005 |
| Casos por 100 mil | Jacarezinho, 8.467 por 100 mil | Londrina cai para 3º, com 5.578 |

Jacarezinho salta da 16ª para a 1ª posição só ao trocar o critério.

**A avaliação não é sobre qual cidade o aluno escolheu.** É sobre declarar o critério e sustentar
a escolha. Sem ambiguidade real a evidência não passaria de nível 3 (Aplicar), e o Ind.6, cujo
verbo maior é *analisa*, exige nível 4 (Analisar e avaliar). Ver skill `verbos-indicadores`.

---

## Rubrica

> Menções **Atendido**, **Parcialmente Atendido** e **Não Atendido**. Sem ponto e sem nota.

### Ind.4 — acessa e utiliza navegadores com critérios de confiabilidade

| Menção | Evidência |
|---|---|
| **A** | Aba de origem completa (quem produziu, período, endereço) e distingue a data do dado da data de acesso quando perguntado |
| **PA** | Aba existe mas incompleta, ou confunde as duas datas |
| **NA** | Não sabe dizer de onde veio o arquivo |

### Ind.5 — organiza e armazena com autonomia e criticidade

| Menção | Evidência |
|---|---|
| **A** | Quatro abas nomeadas, 408 linhas, `02_limpeza` com uma linha por conserto, coluna de taxa correta em todas as linhas |
| **PA** | Dados limpos mas sem registro do que foi feito, ou contagem de linhas errada, ou limpeza incompleta |
| **NA** | Arquivo ainda com defeitos, ou trabalhou num arquivo novo em vez do acumulado |

### Ind.6 — organiza e analisa identificando padrões e relações que orientem decisões

| Menção | Evidência |
|---|---|
| **A** | Padrão sustentado nos dois anos, relação identificada, os dois gráficos corretos para as perguntas, e recomendação com **as quatro** partes, incluindo a renúncia |
| **PA** | Achou o padrão e montou gráfico, mas a recomendação não declara critério, ou não cita número, ou não assume o custo |
| **NA** | Sem padrão, ou gráfico que não responde à pergunta, ou nenhuma decisão tomada |

**Cláusula de contexto (DocTec5):** o indicador diz "identificando padrões e relações **que
orientem a tomada de decisões**". Achar o padrão e não concluir nada é **PA**, não A. Essa é a
fronteira que mais vai aparecer: painel caprichado, gráfico certo, recomendação sem critério.

---

## Recuperação, 18/09 (A57)

Por camada, não do zero. Três trilhas, e o aluno refaz só a que ficou em aberto:

| Trilha | Indicador | O que refaz |
|---|---|---|
| A | 4 | completa a aba de origem e separa as duas datas |
| B | 5 | conserta o que sobrou e preenche o log de limpeza |
| C | 6 | reescreve a recomendação com as quatro partes |

Com mais de uma trilha em aberto, começa pela B: as outras dependem do arquivo estar certo.

**Pré-requisito operacional:** o retorno por indicador precisa estar pronto **antes** da A57.
Sem isso, 1 HA não é suficiente e a recuperação não acontece.

**Teto para quem já atendeu os três:** defender a escolha contrária com as quatro partes, e
decidir se algum gráfico do arquivo resolve o caso de Campo Mourão (número muito abaixo dos
vizinhos: pouca dengue ou pouca notificação?). Não altera a menção.

---

## Material

`aulas/09set/A54_UC01_10set/public/dados/` — dados reais do InfoDengue (Fiocruz e FGV) com seis
defeitos injetados de propósito, mais o `README.md` com o gabarito da limpeza e os arquivos de
rede para quem faltar. Regerar com `python scripts/dataset-dengue/gerar.py`.

## Refs
↑ [ATIVIDADES_AVALIATIVAS](../ATIVIDADES_AVALIATIVAS.md) · [semana16](../semanas/semana16.md)
→ [contexto-fundamentos-de-computacao](../contexto-fundamentos-de-computacao.md)
