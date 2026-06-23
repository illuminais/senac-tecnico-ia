---
schema: contexto-uc
uc: UC05
disciplina: Python para IA
ha-total: 80
ha-dado: 27
ha-restante: 53
trimestre-atual: T2
---

# Contexto — UC05 Python para IA

## Plano Anual

| T | # | Tópico | HA | Status |
|---|---|---|---|---|
| T1 | 1 | vars · tipos · print · input · aritmética | 2 | ✅ A04 |
| T1 | 2 | f-string · type() · conversão de tipo | 2 | ✅ A05 |
| T1 | 3 | if/elif/else · operadores de comparação · lógicos | 4 | ✅ A08/A09 |
| T1 | 4 | for · while · break · continue | 2 | ✅ A1x |
| T1 | 5 | listas: criação · indexação · append · len · max · min | 2 | ✅ A1x |
| T1 | 6 | funções: def · return (intro) | 1 | ✅ A04 |
| T1 | 7 | módulos: import · random · math (intro leve) | 1 | ✅ A1x (parcial) |
| T2 | 8a | dict: chave:valor · .get · .items · .keys · .values · atualização | 2 | ⏳ A26 (parcial — dict mal absorvido) |
| T2 | 8b | tuple · set (∪ ∩ −) | 1 | ⬜ |
| T2 | 9 | funções avançadas: parâmetros default · escopo · docstrings | 2 | ⬜ |
| T2 | 10 | módulos aprofundados: random · math · os | 1 | ⬜ |
| T2 | 11 | arquivos: open() · read() · write() · CSV | 2 | ⬜ |
| T2 | 12 | try/except: exceções comuns · ZeroDivision · ValueError | 1 | ⬜ |
| T2 | 13 | NumPy: arrays · operações vetorizadas · reshape | 3 | ⬜ |
| T2 | 14 | pandas: read_csv · .head() · .describe() · filter · groupby | 4 | ⏳ A35 (parcial — read_csv, .head(), .describe() explorados em dinâmica mas não consolidados) |
| T3 | 15 | matplotlib: plot · histogram · scatter | 2 | ⬜ |
| T3 | 16 | sklearn: fit · predict · train_test_split | 3 | ⬜ |
| T3 | 17 | projeto final: dataset real end-to-end | 4 | ⬜ |

**Legenda:** ✅ concluído · ⏳ próxima aula · ⬜ pendente

---

## Estado Geral

| Trim. | HA Alocado | HA Dado | HA Restante |
|---|---|---|---|
| T1 | 26 | 24 | 0 (T1 encerrado, 2 HA de déficit absorvidos) |
| T2 | 27 | 3 | 24 |
| T3 | 13 | 0 | 13 |

---

## Última Aula
<!-- REPLACE a cada aula — não é append -->
A35 · 19/06 · pandas: read_csv, .head(), .describe() com dataset real (copa2026_stats.csv). Instalação, carregamento, exploração de CSV. Dinâmica Copa Analytics — não consolidado.

---

## Indicadores Curriculares

| Ind. | Descrição | T1 | T2 | T3 |
|---|---|---|---|---|
| 1 | Elabora código conforme funcionalidades e características do aplicativo, em Python | ✅ principal | — | — |
| 2 | Utiliza comandos de integração dos códigos construídos em Python, conforme estrutura projetada | 🔄 fraco | ✅ foco | — |
| 3 | Realiza a depuração, verificando e corrigindo erros na programação | — | ✅ foco | 🔄 continua |
| 4 | Utiliza bibliotecas de manipulação de dados para aplicações de IA | — | — | ✅ foco |

---

## Log de Execução
<!-- APPEND-ONLY — nunca editar linhas existentes -->

| Aula | Data | HA | Tópicos | Feedback |
|---|---|---|---|---|
| A35 | 19/06 | ~3 | pandas: read_csv · .head() · .describe() com dataset real (copa2026_stats.csv) | pandas não consolidado — dinâmica focou em exploração visual; sem tempo para aprofundar métodos pandas |
| A26 | 21/05 | ~3 | tipos compostos: apenas dict (chave:valor, .get, .items, .keys, .values, atualização); tuple e set não alcançados | aula muito difícil; exercício dado era complexo demais (exigia 4 conceitos simultâneos); dict mal absorvido; tuple/set ficaram para próxima |
| A02 | 27/02 | ~0,5 | Reconhecimento de ambiente: VS Code, GitHub, Jupyter, onde rodar Python | introdutório, ok |
| A04 | 06/03 | ~2 | vars, tipos, print, input, aritmética, if/elif/else (intro), def/return (intro) | ritmo lento, turma sem experiência prévia |
| A05 | 12/03 | ~2 | f-string, sep, end; type(), conversão: float(), int(), str(); float(input()) como padrão | turma absorveu ~20 slides em 3 HA — densidade real muito abaixo do planejado |
| A08 | 20/03 | ~2 | if/else, operadores lógicos and/or/not, tabela verdade | muita dificuldade, demorou muito para exercícios |
| A09 | 26/03 | ~4 | vocabulário técnico, operadores de comparação, elif em cadeias, comparação + and/or | turma com grande dificuldade de solidificação; ~2 exercícios concluídos |
| A10 | 27/03 | ~2 | Gincana Python em times: leitura de output, código | alunos engajaram bem; reforço de conceitos já vistos |

---

## Feedback de Campo

| Data | Observação | Ação tomada |
|---|---|---|
| 2026-06-19 | Turma não conseguiu fazer pandas — dinâmica de sala reversa sem consolidação real de métodos | A36 deve reexplicar read_csv, .head(), .describe() passo a passo, com exercício simples (sem filtros) |
| 2026-03-05 | Alunos sem nenhuma experiência prévia em programação | Introdução ao Python iniciada com ritmo bem lento |
| 2026-03-05 | Dinâmicas em dupla funcionam melhor do que exercícios individuais | Estrutura de pares adotada como padrão para exercícios de código |
| 2026-03-12 | Turma absorveu apenas ~20 slides em 3 HA | Densidade reduzida; planejar com 50% da densidade original |
| 2026-03-20 | Muita dificuldade em if/else e operadores lógicos | Reforçar lógica booleana no início de cada bloco Python |
| 2026-03-27 | Gincana rendeu bastante; dificuldade de alguns em programar sozinhos | Exercícios de escrita guiada; suporte individual para alunos com mais dificuldade |
| 2026-03-27 | Chamada de atenção entre A09 e A10 — engajamento voltou na gincana | Manter postura firme de cobrança; dinâmicas em time mobilizam quem trava sozinho |
| 2026-05-21 | Exercício com múltiplos conceitos simultâneos (dict + filter + função + ranking) travou a turma inteira | **REGRA NOVA:** nunca combinar mais de 1 conceito novo por exercício — ver regra abaixo |

---

## Regra Pedagógica Python — 1 Conceito por Bloco

> **Inviolável.** Turma de 14 anos sem experiência prévia. Cada bloco ensina UMA coisa.

**Estrutura obrigatória de cada conceito:**

1. **Analogia cotidiana** — algo do dia a dia de adolescente (cardápio do RU, playlist, grupo do WhatsApp, carrinho de compras, etc.)
2. **Sintaxe mínima** — 2 a 4 linhas de código, sem imports, sem funções, sem nada extra
3. **Exercício imediato** — 1 tarefa, 1 conceito, máximo 3 linhas de código esperado
4. Só depois de confirmar absorção → próximo conceito

**Exemplo correto (for):**

```
Analogia: "é como fazer a chamada — você passa por cada aluno da lista, um por um"
Código:
  nomes = ["Ana", "João", "Bia"]
  for nome in nomes:
      print(nome)
Exercício: crie uma lista com 3 comidas favoritas e imprima cada uma com for.
```

**Padrão "Panorama dos Vizinhos"** — obrigatório ao introduzir qualquer tipo de dado não-primário (list, dict, tuple, set, etc.):

1. Mostrar TODOS os tipos existentes naquela família com 1 exemplo simples cada (só para reconhecer que existem)
2. Anunciar qual vai ser o foco da aula
3. Aprofundar o foco: sintaxe completa → como acessar → como manipular → métodos úteis → exercícios
4. Ao terminar o foco, referenciar os vizinhos: "lembra que existe tuple e set também? veremos nas próximas aulas"

Exemplo para tipos compostos:
```
# Panorama — vocês vão conhecer todos esses, hoje foco em dict
lista   = [1, 2, 3]          # list — já vimos
dicio   = {"chave": "valor"} # dict — hoje
tupla   = (1, 2, 3)          # tuple — próxima aula
conjunto = {1, 2, 3}         # set   — depois
```

**O que NÃO fazer:**
- Exercício que mistura dict + filter + função + ranking = 4 conceitos = turma trava (aconteceu em A26)
- Avançar para o próximo conceito enquanto metade da turma ainda não entendeu o atual
- Exercícios com contexto técnico complexo antes de mostrar a sintaxe básica

**Ritmo real da turma:** planejar com 50% da densidade original. Se o plano diz "dict + tuple + set", executar só dict como padrão — a menos que o professor decida ou aprove explicitamente misturar mais de um conceito na mesma aula.

---

## Conexões com Outras Disciplinas

| Conceito | Disciplina | Observação |
|---|---|---|
| set Python ↔ conjuntos formais (∪ ∩ −) | UC03 Fundamentos Matemáticos | Espelhar notação formal em A26 |
| GPU para treino | UC06 Arquitetura de Computadores | Python usa PyTorch/TF que dependem de GPU |
| CSV como formato de dados | UC01 Fundamentos de Computação | Base para pandas e leitura de datasets |
| Estatística descritiva | UC09 Estatística Aplicada | pandas .describe() vai precisar desse embasamento |

## Refs
↑ [roteiro-t2](roteiro-t2.md)
→ [semana01](semanas/semana01.md)
→ [metodologias](../metodologias-ativas-senac.md)
