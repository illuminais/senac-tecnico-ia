---
schema: semana
semana: 18
aulas: [A60, A61]
periodo: 2026-10-01 / 2026-10-02
---

# Semana 18 — 01–02/out

## Fio condutor
Épico 2 (Banco de Dados), dias 2 e 3 do "Plantão da Vigilância". **Replanejado em 30/09, um indicador por dia.**
A A60 faz os blocos 2 a 6 que a A59 não fez (causa: atividade extraclasse no começo da aula, não o ritmo da
turma). A A61 avalia o Indicador 5 no meio do dia, antes do intervalo, e depois ensina o Indicador 4 com o robô
de IA. O aquecimento **não** volta à taxa por 100 mil (martelada na A56 e na A59): aplica conceitos novos
(comparar números, contar × somar, conferir com outra consulta, comparar 2024 com 2025) e exige resposta com
número do banco, nunca opinião. `HAVING` sai do épico; `JOIN` fica como trilha. A prova de sexta só cobra o que
a A60 praticou. Servidor: contas `aluno01` a `aluno40` (a chamada vai até 40, com buracos), folga 41 e 42.

## A60 — 01/10 · Qui · Épico 2 dia 2 de 5 · Indicador 5 · verbos PERGUNTAR e CONFERIR · **6 HA (300 min)**

| min | Bloco | Método | O que o aluno faz | Slides | Ind. |
|---|---|---|---|---|---|
| 0-10 | abertura | sem PC | ficha de volta; 3 perguntas de memória no verso; o chamado dos 5 números continua | 4-6 | |
| 10-60 | SQL humano | dinâmica | 7 rodadas com os 34 cartões: `SELECT *`, `WHERE`, `AND`, erro silencioso (Norte e Noroeste), `OR`/`IN`, `GROUP BY` nos cantos, `SUM`, `ORDER BY`; ordem de execução no quadro | 9-21 | UC08-5 |
| 60-110 | conectar + P1 | lab | DBeaver com `alunoNN`; `count(*)` confere a previsão (408); P1: Londrina mar/2025 = 6.614 (o cartão) | 22-33 | UC08-5 |
| 110-160 | somar + P2 | lab | prever 1, 12 ou 408 linhas; `SUM` com `WHERE`; P2: Londrina 2025 = 32.804 (T2); erro silencioso no banco (`[NULL]`) e o conserto com `IN` (69.428) | 34-41 | UC08-5 |
| 160-210 | agrupar + P3 | lab | cartão das 4 etapas; P3: macrorregionais 2025 (T3); coluna fora do `GROUP BY` (o Postgres avisa) | 42-48 | UC08-5 |
| 210-285 | ordenar + P4, P5 | lab | `ORDER BY`, `LIMIT`; P4: 5 municípios com mais casos (T2); P5: março, 29.884 (T1); desafio | 49-55 | UC08-5 |
| 285-300 | fecho | sem PC | ficha completa e recolhida; chamado de 02/10 ("a dengue em Maringá mudou de 2024 para 2025?", resposta com números do banco); avaliação no meio do dia | 56-58 | |

**Relógio:** min 60 SQL humano terminado · min 110 todos conectados com a P1 · min 210 P3 feita · min 285 fechamento.
**Ordem de corte:** 1º desafio · 2º rodada 7 no quadro · 3º "Preveja 1, 12 ou 408" oral · 4º P5 vai para a A61 · 5º P4 também.
**Não pode cair:** conexão, `count(*)`, P1 a P3 com conferência (base da prova de sexta).

**Prep / antes de sair de casa:**
- **Contas 33 a 42 no servidor**, sem zerar ninguém (comando no `SUBIR-O-SERVIDOR.md`); `./verificar.sh` tem que dizer "42 bancos"
- Cartões do SQL humano ✅ prontos · ficha p1 · tiras de Parsons · cartão das 4 etapas (etapa 4 = `HAVING`, desafio) · T1, T2 e T3 impressas, uma folha por mesa · 4 cantos da sala marcados
- Num PC do laboratório: conectar com `aluno41` e testar um backup pelo DBeaver (5 min, para a A62)

## A61 — 02/10 · Sex · Épico 2 dia 3 de 5 · Indicador 5 (avaliação) e 4 (ensino) · **6 HA (300 min)**

| min | Bloco | Método | O que o aluno faz | Slides | Ind. |
|---|---|---|---|---|---|
| 0-10 | abertura | sem PC | ficha p2; 3 perguntas de memória: o que o `WHERE` faz, o que o `GROUP BY` faz com 408 linhas, a ordem de execução | 1-5 | |
| 10-70 | aquecimento | lab | "a dengue em Maringá mudou de 2024 para 2025?", resposta só com número do banco. Conceitos novos: comparar números no `WHERE` (`>`, `<=`...), `count(*)` × `SUM` (5 meses × 15.253 casos), conferir com outra consulta (5 + 7 = 12; 15.253 + 3.601 = 18.854 = T2), e os dois anos numa consulta só com `GROUP BY ano` (6 × 5 meses; 36.146 × 15.253 casos). Se a A60 não fechou, P4 e P5 aqui | 6-16y | UC08-5 |
| 70-170 | **Av02-T3 parte 1** | avaliacao | "o chamado de sexta", 5 itens: Ponta Grossa 2025; macrorregionais 2024 ordenadas; mês de 2024 com mais casos; 3 municípios com menos casos em 2025; "Centro-Sul" (não existe). Cada item termina numa resposta para a secretária, com o número | 17-22z | UC08-5 |
| intervalo | | | | | |
| 170-185 | portaria | dinâmica | crachás: `GRANT` carimba, `REVOKE` risca, porteiro barra quem não tem carimbo | 23-25 | UC08-4 |
| 185-290 | o robô | lab | conta não é pessoa, dono pode tudo, menor privilégio, OWASP LLM06, Replit 18/07/2025; fixação no caderno (o que o robô precisa e o que não); `CREATE ROLE robo_ia_NN`, 2ª conexão, `permission denied`; VIEW de totais (34 linhas) + `GRANT SELECT`; robô lê a VIEW, não lê a tabela, não apaga Londrina; `REVOKE` e `GRANT` de novo; verso da ficha | 26-41 | UC08-4 |
| 290-300 | fecho | sem PC | o robô fica ligado para quinta; o incidente continua surpresa; tarefa: as permissões de um app no celular | 42-46 | |

**Ordem de corte:** 1º a trilha do 2º perfil (conta só do Norte) · 2º a portaria vira 5 min no quadro · 3º o `REVOKE` fica só no quadro.
**Não pode cair:** os 100 min da prova; o robô com `permission denied` provado (é o que a A62 cobra).

**Prep / antes de sair de casa:**
- Rubrica [av02-t3-plantao](../aval/av02-t3-plantao.md) impressa por aluno · ficha p2 · folha da prova · tiras da prova · colinha fraca de DCL · crachás
- `node scripts/checar-sql.mjs` no plano e nos slides da A61 (conta de folga 42, com ROLLBACK)
- Quem faltou na A60 faz a prova do mesmo jeito; a A63 é a segunda data

## Refs
↑ [roteiro-t3](../roteiro-t3.md) · [ep02-uc08](../epicos/ep02-uc08.md) · [semana16](semana16.md) · [semana19](semana19.md)
→ [contexto-banco-de-dados](../contexto-banco-de-dados.md) · [av02-t3-plantao](../aval/av02-t3-plantao.md) · [pesquisa-uc08-t3](../pesquisa-uc08-t3.md)
→ aulas: `aulas/10out/A60_UC08_01out/plano-aula.md` · `aulas/10out/A61_UC08_02out/plano-aula.md`
