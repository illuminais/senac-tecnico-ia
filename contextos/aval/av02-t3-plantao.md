---
id: av02-t3
titulo: "Plantão da Vigilância: consultas, permissões e backup"
tipo: AS
ucs: UC08
indicadores: "UC08: Ind.4 + Ind.5 + Ind.6"
data-alvo: "02/10/2026 (parte 1, Ind.5) · 08/10/2026 (parte 2, Ind.4 e Ind.6) · 09/10/2026 (plantão final, todos)"
aula-alvo: A61 (parte 1) · A62 (parte 2) · A63 (plantão final)
status: detalhada
---

# Av02-T3 — Plantão da Vigilância

> **Status:** ✅ Detalhada · elaborada em 30/09/2026, no replanejamento "um indicador por dia".
> Desenho do épico em [ep02-uc08](../epicos/ep02-uc08.md). Gabaritos conferidos em 30/09 contra o
> `dengue_pr_limpo.xlsx` (a mesma fonte do banco) e contra as tabelas T2 e T3 impressas.

**Tipo:** AS — atividade em situação, no próprio banco (`dengue_NN`), no computador, durante a aula
**Datas:**
- **Parte 1, Indicador 5:** A61 (02/10), no meio do dia, 100 min, logo depois do aquecimento e antes do intervalo.
- **Parte 2, Indicadores 4 e 6:** A62 (08/10), 100 min depois do intervalo. O incidente é a prova.
- **Plantão final:** A63 (09/10), para todos. Por dentro, recuperação e 2ª chamada; quem já tem A não perde (decisão de 30/09).

**Formação:** individual, cada um no próprio banco. Pode consultar: a ficha do plantão, o cartão das 4 etapas, a
colinha fraca de comandos (só o formato, como na A47: `GRANT ___ ON ___ TO ___;`) e as tabelas T1, T2 e T3
impressas. Os slides do dia ficam fora da tela.
**Indicadores:** UC08 Ind.4, Ind.5 e Ind.6

---

## Os três indicadores, pelo verbo (skill `verbos-indicadores`)

| Ind. | Texto | Verbo | A (teto) | PA (piso) | Cláusula de contexto |
|---|---|---|---|---|---|
| 5 | Cria e manipula consultas SQL de forma adequada para resolução de problemas | composto: cria (5) e manipula (3) | cria a consulta sozinho | manipula uma consulta pronta ou montada com tiras | a consulta resolve o problema declarado, e o resultado é conferido |
| 4 | Gerencia a permissão de acesso ao banco de dados, de acordo com o perfil do usuário e as políticas de acesso | gerencia (4) | decide a permissão mínima para um perfil e justifica | concede, mas com permissão a mais ou sem justificativa | de acordo com o perfil e a política de menor privilégio |
| 6 | Cria e manipula armazenamento e backup de banco de dados | composto: cria (5) e manipula (3) | faz o próprio backup e recupera o banco, provando | recupera a partir do backup de outra pessoa | armazenamento: a exportação em CSV conta como evidência extra |

**Fora do escopo, por causa do teto:** `JOIN` escrito pelo aluno, `HAVING`, subconsulta, `pg_dumpall`, backup
agendado. Nenhum deles aparece na prova.

---

## Parte 1 — o chamado de sexta (A61, Indicador 5)

Folha própria, 5 itens. Cada item pede: a **previsão** (quantas linhas, qual número) escrita antes de rodar; a
consulta; o número do banco; onde conferiu (T1, T2, T3 ou outra consulta, como no aquecimento de Maringá) e se
bateu; e a **resposta para a secretária**, numa frase, com o número. Resposta sem número do banco não conta: em
Fundamentos de Computação a turma respondia por opinião ("Curitiba, porque é a capital"), e aqui a regra é o dado.

| Item | Pergunta da secretária | O que exige | Gabarito | Onde conferir |
|---|---|---|---|---|
| 1 | Quantos casos Ponta Grossa teve em 2025? | `WHERE` + `SUM` | 6.643 | T2, linha Ponta Grossa |
| 2 | Quantos casos cada macrorregional teve em 2024, da maior para a menor? | `GROUP BY` + `ORDER BY ... DESC` | Oeste 125.979 · Norte 100.510 · Leste 92.741 · Noroeste 66.290 | T3, coluna `casos_2024` |
| 3 | Em que mês de 2024 houve mais casos, e quantos? | `GROUP BY mes` + `ORDER BY` + `LIMIT` | março, 103.609 | T1, coluna 2024 |
| 4 | Quais os 3 municípios com menos casos em 2025? | `GROUP BY` + ordem crescente + `LIMIT 3` | Campo Mourão 213 · Joaquim Távora 1.005 · São José dos Pinhais 1.049 | T2, fim da tabela |
| 5 | Quantos casos a macrorregional Centro-Sul teve em 2025? | ler um resultado vazio | a consulta volta vazia (`[NULL]`): Centro-Sul não existe no banco; as macrorregionais são Leste, Noroeste, Norte e Oeste | a própria consulta, e um `GROUP BY macrorregional` que mostra as 4 |

Os itens 1 a 3 repetem a estrutura das perguntas 2, 3 e 5 da A60 com outros valores. O 4 pede transferência
(ordem crescente, que a A60 mostra no slide do `ORDER BY`). O 5 pede desconfiança do resultado.

**Se a A60 não chegar ao `ORDER BY` e ao `LIMIT`:** os itens 2, 3 e 4 continuam, mas a ordem pode ser lida no
resultado do `GROUP BY`, e `ORDER BY` e `LIMIT` não são exigidos. A prova só cobra o que a A60 praticou.

### Rubrica, Indicador 5

| Menção | Evidência |
|---|---|
| **A** | Cria sozinho as consultas dos itens 1 a 4, e todas respondem exatamente ao que foi perguntado (ano, município, ordem), com previsão, conferência e resposta para a secretária com o número. No item 5, diz que a macrorregional não existe, sem número inventado. Consulta errada que o próprio aluno pegou na conferência e consertou conta a favor: é para isso que a conferência existe |
| **PA** | Pelo menos um item com consulta própria que responde ao problema, mas: consulta que roda e não responde exatamente (sem o filtro do ano, coluna errada, ordem invertida) sem o aluno perceber; ou resposta sem previsão ou sem conferência; ou item montado com as tiras de Parsons (manipula, não cria: piso do verbo composto) |
| **NA** | Nenhuma consulta que rode e responda a um item, ou números copiados das tabelas T1 a T3 sem consulta, ou respostas por opinião, sem número do banco |

**Cláusula de contexto:** "para resolução de problemas". Consulta que roda e não responde à pergunta da
secretária é PA. A fronteira mais provável: o `SUM` de Ponta Grossa sem o filtro de ano, que soma 2024 e 2025
juntos. Como todo item se confere numa tabela impressa, quem conferiu pega o erro.

---

## Parte 2 — o chamado de quinta (A62, Indicadores 4 e 6)

O incidente é a prova. Antes do intervalo, cada aluno fez o backup do próprio banco. No intervalo, o professor
roda o `incidente.sh`, que apaga as 24 linhas de Londrina (12 meses × 2 anos) de todos os bancos. Depois do
intervalo chega o chamado: "A secretária ligou: o painel está sem Londrina."

| Passo | O que o aluno faz | Evidência | Ind. |
|---|---|---|---|
| 1 | descobre o que aconteceu, com consultas | `count(*)` dá 384; Londrina 2025 volta vazia | 5 (não avaliado aqui) |
| 2 | investiga se foi o robô | como `robo_ia_NN`, o `DELETE` leva `permission denied` (erro copiado na ficha p3) | 4 |
| 3 | restaura o próprio backup num banco novo, `dengue_NN_rec` | 408 linhas e Londrina 2025 = 32.804 no `dengue_NN_rec`, contra 384 e vazio no `dengue_NN` | 6 |
| 4 | cria a conta da regional Oeste, que só vê a própria macrorregional | VIEW com `WHERE macrorregional = 'Oeste'`; conta com `SELECT` só nela; `permission denied` na tabela; uma frase de justificativa pelo perfil | 4 |
| extra | exporta em CSV a VIEW de totais por município e ano | o arquivo `.csv` salvo | 6 (não bloqueia o A) |

O robô **não some** no restore: no mesmo servidor, a conta dele continua existindo e o backup do banco traz os
`GRANT`s de volta. O fato de o `pg_dump` de um banco não levar as contas é teoria do fechamento da A62, não item
de prova.

### Rubrica, Indicador 4

| Menção | Evidência |
|---|---|
| **A** | A conta da regional Oeste tem só `SELECT` numa VIEW que mostra só o Oeste; o limite está provado com um `permission denied` copiado da tela; a justificativa liga a permissão ao perfil ("a regional só precisa ver os casos do Oeste"). E o robô foi inocentado com o `permission denied` no `DELETE` |
| **PA** | Conta criada, mas com permissão a mais do que o perfil precisa (`SELECT` na tabela inteira, `INSERT`, `DELETE`), ou sem a prova do limite, ou sem justificativa |
| **NA** | Permissão total (`ALL`), ou nenhum comando de permissão que rode |

**Cláusula de contexto:** "de acordo com o perfil do usuário e as políticas de acesso". Conta que funciona, mas vê
mais do que o perfil precisa, é PA.

### Rubrica, Indicador 6

| Menção | Evidência |
|---|---|
| **A** | Backup feito pelo próprio aluno antes do incidente (ficha p3: hora, nome e tamanho do arquivo), restaurado num banco novo, e a volta provada com os dois números (408 linhas; Londrina 2025 = 32.804) comparados com o banco quebrado |
| **PA** | Restaurou a partir do backup reserva do professor (não fez o próprio), ou restaurou sem provar com números |
| **NA** | Não recuperou o banco |

---

## Plantão final (A63, todos)

Um chamado novo que junta as três partes, cada uma numa folha. Para quem já tem A num indicador, a parte
correspondente **só confirma**: o A não cai (decisão de 30/09). Para quem está PA ou NA, ou faltou à A61 ou à A62,
a parte vale como recuperação e 2ª chamada. **Não se anuncia como recuperação:** para a turma é a prova do plantão,
e todo mundo faz.

| Parte | Indicador | O que muda em relação às partes 1 e 2 |
|---|---|---|
| 1, consulta | 5 | 3 perguntas + 1 de desconfiança (um município que não está no banco). **4 versões** da folha, escolhidas pelo número da chamada (mudam a macrorregional e o município), para alunos lado a lado não terem as mesmas respostas. Números conferidos com `checar-sql.mjs` antes da impressão |
| 2, permissão | 4 | perfil novo, diferente do robô e da regional Oeste (ex.: assessoria de imprensa, que só lê o total do estado por mês) |
| 3, backup | 6 | o estrago é provocado pelo próprio aluno, com o comando da folha (ex.: apagar os casos de março), para cada um andar no seu ritmo |

A rubrica de cada parte é a mesma das partes 1 e 2. A menção sai na conferência de mesa, no fim da A63.

---

## Regras que valem para as três datas

- **Tiras de Parsons:** ficam na mesa de quem pedir. Quem usa marca na folha, e aquele item fica em PA (montar
  com as tiras é manipular; o A pede criar).
- **Canário:** o item 5 da parte 1 ("Centro-Sul"). Número inventado ali indica resposta de IA ou resultado que não
  foi lido. Conduta: conversa individual antes de lançar a menção, sem anunciar para a turma. É indício, não prova.
- **Quem faltou:** faz a parte que perdeu no plantão final (A63), como 2ª chamada.
- **Ficha do plantão:** é evidência de processo (previsões, consultas, conferências) e não substitui o que está no
  banco. Na conferência de mesa, o professor pede "me mostra no banco".
- **Se a rede ou o DBeaver caírem:** a parte do Indicador 5 pode ser feita no papel (prever e corrigir consultas
  impressas).

## Conferência de mesa

Rubrica impressa por aluno, uma linha por indicador. Teste mais rápido por indicador: **5**, "me mostra a consulta
do item 2 e onde conferiu"; **4**, "entra como a conta do Oeste e tenta ler a tabela"; **6**, "`count(*)` no banco
restaurado". Opcional: `scripts/dataset-dengue/servidor/conferir-evidencias.sh` (a criar), que lista por aluno as
contas criadas, as permissões e os bancos restaurados.

## Material

- Servidor: `scripts/dataset-dengue/servidor/` (leia o `SUBIR-O-SERVIDOR.md`). Contas `aluno01` a `aluno40` (a
  chamada vai até 40, com buracos), folga 41 e 42.
- Tabelas T1, T2 e T3: aba `03_comparacoes` do `dengue_pr_comparado.xlsx`, em `aulas/09set/A55_UC01_11set/public/dados/`.

## Refs
↑ [ATIVIDADES_AVALIATIVAS](../ATIVIDADES_AVALIATIVAS.md) · [ep02-uc08](../epicos/ep02-uc08.md) · [semana18](../semanas/semana18.md) · [semana19](../semanas/semana19.md)
→ [contexto-banco-de-dados](../contexto-banco-de-dados.md) · [pesquisa-uc08-t3](../pesquisa-uc08-t3.md) · modelo: [av01-t3-painel-decisao](av01-t3-painel-decisao.md)
