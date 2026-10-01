---
schema: semana
semana: 19
aulas: [A62, A63]
periodo: 2026-10-08 / 2026-10-09
---

# Semana 19 — 08–09/out

## Fio condutor
Fecha o épico 2. A A62 ensina o Indicador 6 (backup e restauração) e avalia o 4 e o 6 dentro de um incidente de
verdade: no intervalo, os casos de Londrina somem de todos os bancos, e o chamado da prova é descobrir, recuperar
e provar. O robô da A61 é o suspeito que o aluno inocenta (`permission denied` no `DELETE`): a permissão impede o
robô, e só o backup salva do erro do dono. No nosso servidor o robô **não some** no restore (a conta continua
existindo e o backup traz os `GRANT`s); o fato de o `pg_dump` de um banco não levar contas fica como teoria.
A A63 é o plantão final, prova para todos; por dentro vale como recuperação e 2ª chamada, e quem já tem A não
perde (decisão de 30/09). A palavra recuperação não aparece para a turma.

## A62 — 08/10 · Qui · Épico 2 dia 4 de 5 · Indicador 6 (ensino) + 4 e 6 (avaliação) · **6 HA (300 min)**

| min | Bloco | Método | O que o aluno faz | Slides | Ind. |
|---|---|---|---|---|---|
| 0-10 | abertura | sem PC | 3 perguntas de memória: o que o robô pode, o que acontece quando ele lê a tabela, que comando dá e que comando tira | a produzir | |
| 10-55 | a foto do quadro | dinâmica + expositivo | 5 números da A60 no quadro, foto, apagar, reconstruir; "e se a foto fosse de ontem?"; backup, restore, cópia fora do lugar, backup testado; GitLab 31/01/2017 (4 mecanismos, 1 funcionou); fixação no caderno | | UC08-6 |
| 55-100 | backup | lab | backup do `dengue_NN` pelo DBeaver; conferir o arquivo (existe, tem tamanho); ficha p3 com hora, nome e tamanho; o robô ainda lê a VIEW | | UC08-6 |
| intervalo | **incidente** | | professor roda o `incidente.sh`: as 24 linhas de Londrina somem de todos os bancos (408 vira 384) | | |
| 100-200 | **Av02-T3 parte 2** | avaliacao | "o painel está sem Londrina": descobrir com consultas (384; Londrina 2025 vazia); o robô tenta o `DELETE` e leva `permission denied`; restaurar em `dengue_NN_rec` e provar (408 e 32.804); conta da regional Oeste com VIEW e prova do limite | | UC08-4·6 |
| 200-225 | armazenamento | lab | exportar em CSV, pelo DBeaver, a VIEW de totais por município e ano: é o arquivo do épico de Python | | UC08-6 |
| 225-240 | fecho | expositivo | o que a permissão impediu e o que só o backup salvou; `pg_dump` de um banco não leva contas (documentação do Postgres); plantão final amanhã, para todos | | |
| 240-300 | folga | | quem não terminou a prova termina (é o primeiro backup nos PCs do laboratório) | | |

**Ordem de corte:** 1º o CSV vira tarefa da A64 · 2º a foto do quadro vira só a pergunta "e se a foto fosse de ontem?".
**Não pode cair:** o backup antes do incidente e os 100 min da prova.

**Prep / antes de sair de casa:**
- `incidente.sh` criado e testado nas contas 41 e 42, desfeito com `resetar.sh 41 42`
- Resultado do teste de backup no laboratório (conta 41): DBeaver atualizado se reclamou de versão; rótulos dos menus conferidos nos slides
- Backup reserva de cada banco, gerado na máquina do professor, para quem não conseguir o próprio (vale PA no Indicador 6)
- Colinha fraca de comandos (`GRANT ___ ON ___ TO ___;`) · ficha p3 · folha do chamado de quinta · rubrica por aluno

## A63 — 09/10 · Sex · Épico 2 fecha · plantão final (Indicadores 4, 5 e 6) · **6 HA (300 min)**

| min | Bloco | Método | O que o aluno faz | Slides | Ind. |
|---|---|---|---|---|---|
| 0-15 | abertura | | como o plantão funciona: 3 partes independentes, uma folha cada; colinha fraca; T1 a T3 na mesa; quem usa tiras marca, e o item fica em PA | a produzir | |
| 15-85 | parte 1, consulta | avaliacao | 3 perguntas + 1 de desconfiança (município fora do banco); 4 versões da folha pelo número da chamada | | UC08-5 |
| 85-145 | parte 2, permissão | avaliacao | perfil novo (ex.: assessoria de imprensa, só o total do estado por mês): decidir, VIEW, conta, permissão mínima, provar o limite, justificar pelo perfil | | UC08-4 |
| intervalo | | | | | |
| 145-215 | parte 3, backup | avaliacao | backup, estrago que está na folha (ex.: apagar março), confirmar o estrago, restaurar, provar com 2 números | | UC08-6 |
| 215-265 | conferência na mesa | avaliacao | professor confere as evidências e lança a menção por indicador | | UC08-4·5·6 |
| 265-300 | fecho | | ficha do plantão (4 páginas) entregue | | |

**Regras:** quem já tem A num indicador não perde; para quem está PA ou NA, ou faltou à A61 ou à A62, a parte vale como recuperação e 2ª chamada. Ninguém ouve "recuperação".
**Prep:** planilha de menções parciais da A61 e da A62 · bancos zerados depois de registrar as evidências da A62 (recomendação) · 4 versões da parte 1 conferidas com `checar-sql.mjs` · rubrica impressa.
**Se a A63 cair:** a prova vai para o começo do épico de Python; a menção atrasa, a avaliação não é cancelada.

## Refs
↑ [roteiro-t3](../roteiro-t3.md) · [ep02-uc08](../epicos/ep02-uc08.md) · [semana18](semana18.md)
→ [contexto-banco-de-dados](../contexto-banco-de-dados.md) · [av02-t3-plantao](../aval/av02-t3-plantao.md) · [pesquisa-uc08-t3](../pesquisa-uc08-t3.md)
→ servidor: `scripts/dataset-dengue/servidor/SUBIR-O-SERVIDOR.md`
