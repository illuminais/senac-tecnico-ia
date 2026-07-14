---
schema: contexto-uc
uc: UC08
disciplina: Banco de Dados
ha-total: 80
ha-dado: 26
ha-restante: 54
trimestre-atual: T2
---

# Contexto — UC08 Banco de Dados

## Plano Anual

| T | # | Tópico | HA | Status |
|---|---|---|---|---|
| T1 | 1 | Dados sem estrutura → BD como solução · anatomia de tabela · SGBD | 1 | ✅ A06 |
| T1 | 2 | SQL básico: SELECT · FROM · WHERE · ORDER BY · operadores · agregação | 2 | ✅ A06 |
| T1 | 3 | Tipos SQL: INTEGER · VARCHAR · FLOAT · BOOLEAN · DDL vs DML | 1 | ✅ A08 |
| T1 | 4 | CREATE TABLE · INSERT INTO · PK (intro) | 1 | ✅ A08 |
| T1 | 5 | 4 Ds (DDL/DML/DQL/DCL) · ALTER TABLE · constraints (PK/NOT NULL/UNIQUE/DEFAULT) | 2 | ✅ A10 |
| T1 | 6 | UPDATE · DELETE · TRUNCATE vs DROP · SELECT++ (LIMIT/DISTINCT/AS) | 1 | ✅ A10 |
| T2 | 7 | FK (chave estrangeira) · INNER JOIN | 2 | ✅ A36 (INNER JOIN) · ⏳ A37 (FK) |
| T2 | 8 | Mini-projeto: BD notas com SQLite | 2 | ⬜ |
| T2 | 9 | Python + SQLite: sqlite3 · cursor.execute() · fetchall() | 2 | ⬜ |
| T2 | 10 | SQL-DCL: USER · GRANT · REVOKE · perfis de acesso | 2 | ⬜ |
| T2 | 11 | SQL-DQL avançado: GROUP BY · HAVING · subqueries | 3 | ✅ A36 (GROUP BY + funções agregação) · ✅ A41 (HAVING) · ⏳ subqueries |
| T2 | 12 | Transações: BEGIN · COMMIT · ROLLBACK | 1 | ⬜ |
| T2 | 13 | Normalização: 1NF · 2NF · 3NF | 3 | ⬜ |
| T2 | 14 | Views e índices: CREATE VIEW · CREATE INDEX | 2 | ⬜ |
| T3 | 15 | Backup: DUMP · restauração · tipos de backup | 2 | ⬜ |
| T3 | 16 | Armazenamento: importação/exportação de dados | 2 | ⬜ |
| T3 | 17 | Projeto final: BD completo para aplicação de IA | 6 | ⬜ |

**Legenda:** ✅ concluído · ⏳ próxima aula · ⬜ pendente

---

## Estratégia Pedagógica Central — Excel como Andaime

**Decisão permanente do professor (12/03/2026):** nunca abrir SQL direto. Sequência: Excel que os alunos conhecem → problema real com Excel caótico → BD como solução → SQL como linguagem do BD.

| Conceito BD | Analogia Excel |
|---|---|
| Tabela | Planilha (aba) |
| Chave primária | Sem equivalente direto — ID único que nunca repete |
| Chave estrangeira | =Aba!A2 (referência entre abas) → ponteiro formal |
| SELECT | Filtro / PROCV — mas padronizado e sem mouse |

---

## Estado Geral

| Trim. | HA Alocado | HA Dado | HA Restante |
|---|---|---|---|
| T1 | 26 | 21 | 0 (T1 encerrado, 5 HA de déficit absorvidos) |
| T2 | 27 | 5 | 22 |
| T3 | 27 | 0 | 27 |

---

## Última Aula
<!-- REPLACE a cada aula — não é append -->
A41 · 10/07 · WHERE (reforço) · GROUP BY · HAVING (novo) · atividade de transcrição guiada de queries-resposta

---

## Indicadores Curriculares

| Ind. | Descrição | T1 | T2 | T3 |
|---|---|---|---|---|
| 1 | Propõe alteração no acesso aos dados de acordo com os relacionamentos físicos e estrutura | ✅ principal | — | — |
| 2 | Seleciona o SGBD de acordo com as necessidades da aplicação | ✅ principal | — | — |
| 3 | Cria a estrutura física de BD de acordo com os requisitos da aplicação e modelagem | 🔄 fraco | ✅ foco | — |
| 4 | Gerencia permissão de acesso ao BD conforme perfil do usuário e políticas de acesso | — | ✅ foco | 🔄 continua |
| 5 | Cria e manipula consultas SQL de forma adequada para resolução de problemas | — | ✅ foco | 🔄 continua |
| 6 | Cria e manipula armazenamento e backup de banco de dados | — | — | ✅ foco |

---

## Log de Execução
<!-- APPEND-ONLY — nunca editar linhas existentes -->

| Aula | Data | HA | Tópicos | Feedback |
|---|---|---|---|---|
| A41 | 10/07 | ~2 | SQL: WHERE (reforço), GROUP BY, HAVING (novo) · atividade: transcrição das queries-resposta do exercício (cópia guiada para fixação) — Diário Orion: Cria e manipula consultas SQL de forma adequada para resolução de problemas. Instruções da linguagem SQL-DQL: select. | Bem proveitoso — engajamento positivo |
| A?? | 18/06 | ~3 | 1 Indicador: Propõe alteração no acesso aos dados, de acordo com os relacionamentos físicos e estrutura. 2 Indicador: Seleciona o Sistema de Gerenciamento de Banco de Dados (SGBD), de acordo com as necessidades da aplicação. - Níveis de restrição de integridade dos dados: tabela, atributos e relacionamento. - Instruções da linguagem SQL-DDL: create, alter, drop e truncate. - Instruções da linguagem SQL-DCL: user, grant e revoke. - Instruções da linguagem SQL-DQL: select. | OrionWeb, não confirmado — só p/ contagem de HA |
| A?? | 12/06 | ~3 | 1 Indicador: Propõe alteração no acesso aos dados, de acordo com os relacionamentos físicos e estrutura. 2 Indicador: Seleciona o Sistema de Gerenciamento de Banco de Dados (SGBD), de acordo com as necessidades da aplicação. - Sistema de Gerenciamento de Banco de Dados - SGBD: conceito, estruturainfraestrutura (requisitos de software e hardware). - Banco de dados: características, arquitetura (relacional e não relacional). - Modelos de banco de dados: definição e seus tipos - conceitual, lógico e físico. - Análise de requisitos funcionais e não funcionais do banco de dados. - Dados e domínios: tipos, conceito e aplicabilidade. | OrionWeb, não confirmado — só p/ contagem de HA |
| A06 | 13/03 | 6 | Dados no cotidiano · tabela · SGBD · Excel vs BD · SELECT/FROM/WHERE/ORDER BY · operadores · COUNT/SUM/MAX/MIN/AVG | 6h registradas no sistema (bloco duplo); hook "iFood" gerou engajamento alto |
| A08 | 20/03 | 2 | Tipos SQL (INTEGER/VARCHAR/FLOAT/BOOLEAN) · DDL vs DML · CREATE TABLE · INSERT INTO · PK e NOT NULL (intro rápida) | constraints vistas por cima, sem aprofundamento |
| A10 | 27/03 | 3 | 4 Ds (DDL/DML/DQL/DCL) · ALTER TABLE · constraints completas (PK/NOT NULL/UNIQUE/DEFAULT) · UPDATE · DELETE · TRUNCATE vs DROP · LIMIT/DISTINCT/AS | DCL apresentado no mapa, aprofundar T2 |
| A12 | 10/04 | 2 | - Instruções da linguagem SQL-DDL: create, alter, drop e truncate. - Instruções da linguagem SQL-DQL: select. Regras de normalização de banco de dados; performance de consultas: índices, views, join | (enriquecido via diário OrionWeb) |
| A15 | 17/04 | 2 | - Instruções da linguagem SQL-DDL: create, alter, drop e truncate. - Instruções da linguagem SQL-DCL: user, grant e revoke. - Instruções da linguagem SQL-DQL: select. - Sistema de Gerenciamento de Banco de Dados - SGBD: conceito, estruturainfraestrutura (requisitos de software e hardware). - Banco de dados: características, arquitetura (relacional e não relacional). - Modelos de banco de dados: definição e seus tipos - conceitual, lógico e físico. - Análise de requisitos funcionais e não funcionais do banco de dados. - Dados e domínios: tipos, conceito e aplicabilidade. - Níveis de restrição de integridade dos dados: tabela, atributos e relacionamento. | (enriquecido via diário OrionWeb) |
| A18 | 24/04 | 3 | - Sistema de Gerenciamento de Banco de Dados - SGBD: conceito, estruturainfraestrutura (requisitos de software e hardware). - Banco de dados: características, arquitetura (relacional e não relacional). | (enriquecido via diário OrionWeb) |
| A21 | 08/05 | 3 | - Instruções da linguagem SQL-DDL: create, alter, drop e truncate. - Instruções da linguagem SQL-DCL: user, grant e revoke. - Instruções da linguagem SQL-DQL: select. — Observações: av06 | (enriquecido via diário OrionWeb) |
| A36 | 25/06 | ~3 | Revisão SELECT/WHERE/ORDER BY · GROUP BY (separar em pilhas, agregar) · funções de agregação (AVG, COUNT, SUM, MAX, MIN, ROUND) · INNER JOIN (live coding, alias) · atividade em grupos (5 hipóteses da Copa) | Turma com dificuldade em escrever SQL manualmente sem modelo pronto |

---

## Feedback de Campo

| Data | Observação | Ação tomada |
|---|---|---|
| 2026-03-12 | Decidido usar Excel como andaime antes de qualquer SQL | Diretriz permanente da disciplina |
| 2026-03-20 | Constraints PK e NOT NULL vistas por cima — sem aprofundamento | Reforçar constraints antes de avançar para FK |
| 2026-03-27 | Turma relembrou bem via revisão; ritmo lento mas progresso | Próximo passo: FK + JOIN |
| 2026-06-25 | Turma com dificuldade em escrever SQL manualmente — reconhecem estrutura mas hesitam sem modelo pronto | Reforçar: sempre começar escrevendo no papel antes de digitar · praticar variações de queries com mudanças mínimas · criar templates reutilizáveis |
| 2026-07-10 | Estratégia de cópia guiada (transcrever as queries-resposta do exercício) funcionou bem como resposta à dificuldade relatada em A36 | Manter cópia guiada como passo intermediário antes de pedir SQL do zero |

---

## Conexões com Outras Disciplinas

| Conceito | Disciplina | Observação |
|---|---|---|
| tipos de dados (str/int/float) | UC05 Python | Mapear Python types ↔ SQL types na introdução |
| CSV como formato | UC01 Fundamentos | Base para importação e pandas |
| LGPD e acesso a dados | UC07 Transformação Digital | Conectar ao falar em DCL (GRANT/REVOKE) |
| sqlite3 em Python | UC05 Python | python + BD integrado — mostrar junto com pandas |

## Refs
↑ [roteiro-t2](roteiro-t2.md)
→ [semana01](semanas/semana01.md)
→ [metodologias](../metodologias-ativas-senac.md)
