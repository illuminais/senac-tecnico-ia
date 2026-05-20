---
schema: contexto-uc
uc: UC08
disciplina: Banco de Dados
ha-total: 80
ha-dado: 21
ha-restante: 59
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
| T2 | 7 | FK (chave estrangeira) · INNER JOIN | 2 | ⏳ A27 |
| T2 | 8 | Mini-projeto: BD notas com SQLite | 2 | ⬜ |
| T2 | 9 | Python + SQLite: sqlite3 · cursor.execute() · fetchall() | 2 | ⬜ |
| T2 | 10 | SQL-DCL: USER · GRANT · REVOKE · perfis de acesso | 2 | ⬜ |
| T2 | 11 | SQL-DQL avançado: GROUP BY · HAVING · subqueries | 3 | ⬜ |
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
| T2 | 27 | 0 | 27 |
| T3 | 27 | 0 | 27 |

---

## Última Aula
<!-- REPLACE a cada aula — não é append -->
A25 · 16/05 · sem BD (Shark Tank Tech + Relatório de Visita Técnica)

---

## Indicadores Curriculares

| Ind. | Descrição | Status T1 | Status T2 |
|---|---|---|---|
| 1 | Propõe alteração no acesso aos dados de acordo com os relacionamentos físicos | Pendente | — |
| 2 | Seleciona o SGBD de acordo com as necessidades da aplicação | Pendente | — |
| 3 | Cria a estrutura física de BD de acordo com requisitos e modelagem | Pendente | — |
| 4 | Gerencia permissão de acesso ao BD conforme perfil do usuário | — | Pendente |
| 5 | Cria e manipula consultas SQL para resolução de problemas | — | Pendente |
| 6 | Cria e manipula armazenamento e backup de BD | — | — |

---

## Log de Execução
<!-- APPEND-ONLY — nunca editar linhas existentes -->

| Aula | Data | HA | Tópicos | Feedback |
|---|---|---|---|---|
| A06 | 13/03 | 6 | Dados no cotidiano · tabela · SGBD · Excel vs BD · SELECT/FROM/WHERE/ORDER BY · operadores · COUNT/SUM/MAX/MIN/AVG | 6h registradas no sistema (bloco duplo); hook "iFood" gerou engajamento alto |
| A08 | 20/03 | 2 | Tipos SQL (INTEGER/VARCHAR/FLOAT/BOOLEAN) · DDL vs DML · CREATE TABLE · INSERT INTO · PK e NOT NULL (intro rápida) | constraints vistas por cima, sem aprofundamento |
| A10 | 27/03 | 3 | 4 Ds (DDL/DML/DQL/DCL) · ALTER TABLE · constraints completas (PK/NOT NULL/UNIQUE/DEFAULT) · UPDATE · DELETE · TRUNCATE vs DROP · LIMIT/DISTINCT/AS | DCL apresentado no mapa, aprofundar T2 |
| A?? | 10/04 | 2 | tópicos não registrados no contexto — ver AULAS-DADAS.md | — |
| A?? | 17/04 | 2 | tópicos não registrados no contexto — ver AULAS-DADAS.md | — |
| A?? | 24/04 | 3 | tópicos não registrados no contexto — ver AULAS-DADAS.md | — |
| A?? | 08/05 | 3 | tópicos não registrados no contexto — ver AULAS-DADAS.md | — |

---

## Feedback de Campo

| Data | Observação | Ação tomada |
|---|---|---|
| 2026-03-12 | Decidido usar Excel como andaime antes de qualquer SQL | Diretriz permanente da disciplina |
| 2026-03-20 | Constraints PK e NOT NULL vistas por cima — sem aprofundamento | Reforçar constraints antes de avançar para FK |
| 2026-03-27 | Turma relembrou bem via revisão; ritmo lento mas progresso | Próximo passo: FK + JOIN |

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
