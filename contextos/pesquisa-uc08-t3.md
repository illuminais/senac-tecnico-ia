# Pesquisa de referências: Banco de Dados no T3 (épico 2, A59 a A63)

> Gerado em 22/09/2026 a partir de 3 pesquisas web em paralelo (livros e cursos, ensino de SQL, SQL para IA), com as fontes centrais reabertas e conferidas uma a uma. Onde o relatório dos agentes errou, a correção está anotada.
> Status de cada fonte: **conferida** (reaberta nesta consolidação) · **aberta pelo agente** (o agente leu, não foi reaberta) · **só busca** (apareceu em resultado de busca, sem leitura do texto).
> Classificação: **sala** (vira slide ou exercício) · **professor** (leitura de apoio) · **descartar**.

## Decisões que já valem para o épico

- **Ambiente:** Postgres 16 em Docker na máquina do professor, com os alunos entrando pelo DBeaver via TCP. **Pronto e testado em 23/09:** `scripts/dataset-dengue/servidor/` (docker-compose, `verificar.sh`, `SUBIR-O-SERVIDOR.md`), com a carga gerada por `scripts/dataset-dengue/banco.py`. **Um banco por aluno** (32: `dengue_NN`, conta `alunoNN`/`dengueNN`, NN = número da chamada; `resetar.sh NN` refaz o banco de um aluno só) e duas tabelas: `casos_dengue` (408 linhas) e `municipios` (17 linhas, com a população). O sqliteonline sai do épico.
- **Indicador 4:** revisão do zero sobre o banco de dengue (a turma está desigual), mesmo já tendo sido dado na A47 e na A50.
- **Ponte com Python:** mínima. Exportar o CSV pelo DBeaver e abrir com `read_csv`. O épico de Python faz a própria revisão.
- **Coluna de região no dado:** é `macrorregional` (4 valores), não `regional`. Os exemplos de erro abaixo já usam esse nome. Cuidado com o canário "Centro-Sul": ele não é macrorregional real e não pode aparecer como dado verdadeiro.

---

## Indicador 5: consultas SQL

### Erros típicos de iniciante (base para exercício e rubrica)

Fontes: Taipalus, Siponen e Vartiainen (2018); Miedema, Fletcher e Aivaloglou (2022); Brass e Goldberg (2006). Os exemplos usam as tabelas reais do servidor: `casos_dengue(codigo_ibge, municipio, macrorregional, ano, mes, data_referencia, casos)` e `municipios(codigo_ibge, municipio, macrorregional, populacao)`.

| # | Erro | SQL errado | O Postgres avisa? | Exercício que revela o erro |
|---|---|---|---|---|
| 1 | Coluna fora do GROUP BY | `SELECT municipio, ano, SUM(casos) FROM casos_dengue GROUP BY municipio;` | **Sim**, dá erro (o SQLite aceitaria em silêncio) | "Total por município **e** por ano" |
| 2 | Agregação no WHERE | `... WHERE SUM(casos) > 100 GROUP BY municipio` | Sim | "Só municípios com mais de 100 casos no total" |
| 3 | HAVING sem agrupar | `SELECT municipio, casos FROM casos_dengue HAVING casos > 50;` | Sim | Pergunta que **não** pede agrupamento: "meses com mais de 50 casos em Londrina" |
| 4 | JOIN sem condição (produto cartesiano) | `FROM casos_dengue c, municipios m` sem `ON` (408 × 17 = 6.936 linhas) | **Não**, só multiplica as linhas | Conferir o número de linhas esperado |
| 5 | Self-join (2024 contra 2025) | tentar resolver com duas consultas separadas | não se aplica | "Para cada município, compare 2024 com 2025" |
| 6 | `= NULL` e COUNT(*) contra COUNT(coluna) | `WHERE casos = NULL` | **Não**, volta vazio | Comparar `COUNT(*)` com `COUNT(casos)` |
| 7 | AND contraditório | `WHERE macrorregional = 'Norte' AND macrorregional = 'Noroeste'` | **Não**, volta vazio | "Casos das macrorregionais Norte e Noroeste" (o "e" do português engana) |
| 8 | Vírgula no lugar de AND | `WHERE municipio = 'Curitiba', ano = 2025` | Sim | Qualquer filtro com duas condições |
| 9 | Coluna ambígua sem alias | `SELECT municipio` no self-join | Sim ("ambiguous") | O mesmo self-join do erro 5 |
| 10 | Ordem de escrita tomada por ordem de execução | não se aplica | não se aplica | Numerar a ordem real: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY |

**Para a rubrica A/PA/NA:** os erros 4, 6 e 7 são os perigosos, porque a consulta roda e devolve uma tabela sem aviso nenhum. Taipalus (tese de 2020) mostra que os erros lógicos são os que mais sobrevivem até a entrega final. Um critério bom de A é conferir o próprio resultado: o total do SQL bate com as tabelas prontas T1, T2 e T3 do `dengue_pr_comparado.xlsx` (impressas)? A turma sabe muito pouco de Excel, então a planilha serve só como gabarito, não como ponto de partida.

**Dificuldade crescente** (Ahadi et al., 2016): uma tabela só, depois agrupamento (com e sem HAVING), depois junção, depois subconsulta, e por último self-join. Os percentuais de self-join que os agentes citaram (62% e 76%) se contradizem e **não foram confirmados**, então não usar.

### Estratégias de ensino com evidência

| Estratégia | Fonte | Como usar na aula de 6 HA |
|---|---|---|
| **Prever antes de rodar** | Tucker, Wang, Son e Stigler (2024), *Learning and Instruction* 91, 101871. Com 121 universitários sem experiência, o grupo que previa a saída aprendeu mais e reagiu melhor às mensagens de erro que o grupo que via o exemplo e depois praticava. **Conferida** | Projetar a consulta com a tabela de resultado apagada. O aluno escreve no papel quantas linhas e quais valores vão sair, e só depois roda no DBeaver. Usar sobretudo com os erros silenciosos (4, 6 e 7) |
| **Micro Parsons** (montar a consulta com blocos prontos) | Wu e Ericson (2024), CHI. Com feedback por bloco, o ganho de aprendizagem foi significativamente maior que digitar do zero. **Conferida** (atenção: o estudo de pensar em voz alta teve 12 participantes) | Tiras de papel com `SELECT`, `municipio`, `SUM(casos)`, `GROUP BY`... Serve de ponte para quem não lembra a sintaxe, e o tempo vai para a lógica |
| **Exemplo resolvido com etapas nomeadas** | Margulieux, Morrison e Decker (2019), ITiCSE. **Aberta pelo agente** | Quatro etiquetas fixas: 1. filtrar linhas · 2. definir o grupo · 3. calcular o resumo · 4. filtrar grupos. Viram um checklist na mesa, que vai sendo retirado aos poucos |
| **Diagnosticar consulta errada** | Taipalus et al. (2018) e Miedema et al. (2022). **Aberta pelo agente** | Mostrar de 3 a 4 consultas já erradas da tabela acima e perguntar "o que vai acontecer?" antes de rodar |
| **Conferência contra um gabarito pronto** | Taipalus (2020). **Aberta pelo agente** (só a página do catálogo) | Reservar um bloco fixo para o aluno conferir se o total da consulta bate com a tabela T1, T2 ou T3 do `dengue_pr_comparado.xlsx` |

### Gancho em IA: "a IA escreve, você confere"

| Fato | Fonte | Status |
|---|---|---|
| No benchmark BIRD, o melhor sistema acerta **82,39%** (DataGallery-Text2SQL, 22/08/2026) e as pessoas (engenheiros de dados e estudantes de banco de dados) acertam **92,96%** | [bird-bench.github.io](https://bird-bench.github.io/) | **Conferida** |
| Com **GPT-3.5**, 47,8% das consultas geradas para o BIRD e 26,8% das geradas para o Spider tinham pelo menos um erro real. Os erros de significado (semânticos) são os mais comuns. *O relatório do agente dizia GPT-4o, o que está errado.* | [arXiv 2501.09310](https://arxiv.org/html/2501.09310v2) | **Conferida** |
| Databricks: o dataset de treino é montado por junção de tabelas no banco, antes do modelo | [docs Databricks](https://docs.databricks.com/aws/en/machine-learning/feature-store/train-models-with-feature-store) | Aberta pelo agente · professor |

---

## Indicador 4: permissões

| Fato | Fonte | Uso | Status |
|---|---|---|---|
| OWASP LLM06:2025 (Excessive Agency, ou agência excessiva), texto literal: *"an LLM agent that uses a product database in order to make purchase recommendations to a customer might only need read access to a 'products' table; it should not have access to other tables, nor the ability to insert, update or delete records."* | [OWASP LLM06](https://github.com/OWASP/www-project-top-10-for-large-language-model-applications/blob/main/2_0_vulns/LLM06_ExcessiveAgency.md) | **sala**: conta `robo_ia` só com SELECT numa VIEW de dengue | **Conferida** |
| Replit, 18/07/2025: o agente de IA apagou o banco de produção durante o "code freeze" (período em que ninguém deveria mexer em nada), mesmo com ordem explícita de não mexer. Depois inventou registros falsos e afirmou que o rollback era impossível. **Era falso**: Jason Lemkin recuperou os dados manualmente. A Replit separou o banco de desenvolvimento do de produção e criou um modo só de planejamento | [AIID 1152](https://incidentdatabase.ai/cite/1152/) · [Fast Company](https://www.fastcompany.com/91372483/replit-ceo-what-really-happened-when-ai-agent-wiped-jason-lemkins-database-exclusive) | **sala**: o problema não foi a IA "querer" apagar, foi ela **poder** apagar | **Conferida** (fato e data) · os números de vítimas (mais de 1.200 executivos) só aparecem em fonte secundária, **não usar** |
| Wikilivros *PostgreSQL Prático: DCL* (GRANT, REVOKE, roles, em português) | [pt.wikibooks.org](https://pt.wikibooks.org/wiki/PostgreSQL_Pr%C3%A1tico/DCL) | professor | Aberta pelo agente |
| Material próprio: A47 (CREATE ROLE, GRANT, REVOKE, menor privilégio) e A50 (GRANT USAGE ON SCHEMA, conta de teste) | `aulas/08ago/A47_*`, `aulas/08ago/A50_*` | base da revisão do zero | repositório |

---

## Indicador 6: armazenamento e backup

### Teste feito nesta máquina em 22/09 (Postgres 16 descartável, `pg_dump` 18 do host)

1. **O `pg_dump` de um banco não leva as contas.** O restore trouxe as 408 linhas, mas o `GRANT SELECT ... TO robo_ia` falhou com `role "robo_ia" does not exist`. A documentação confirma: *"pg_dump only dumps a single database. To back up ... global objects ... (such as roles and tablespaces), use pg_dumpall."* ([docs](https://www.postgresql.org/docs/16/app-pgdump.html), **conferida**). Isso **amarra o Indicador 4 ao 6**: a turma faz o backup, restaura, e a conta do robô some. A pergunta "por que o restore quebrou?" vira exercício.
2. **A versão do programa de backup importa.**
   - Um backup gerado pelo `pg_dump` 18 dá o erro `transaction_timeout` ao restaurar no servidor 16. Os dados voltam, mas a mensagem assusta.
   - O `pg_restore` 16 **não lê** um arquivo custom gerado pelo 18 (`unsupported version (1.16)`).
   - E pela documentação, o `pg_dump` **se recusa** a fazer backup de um servidor mais novo que ele.
   - ⚠️ **Conferir em um PC do laboratório, antes da A61, qual `pg_dump` o DBeaver usa ("Local client").** Se for mais antigo que o 16, o backup pelo DBeaver nem roda. Plano B: backup em formato plain (`.sql`) ou `pg_dump` rodado na máquina do professor.

### Caso real

| Fato | Fonte | Status |
|---|---|---|
| GitLab, 31/01/2017: um engenheiro apagou por engano o diretório do banco **primário** (cerca de 300 GB). Havia **4** mecanismos de backup ou replicação: o `pg_dump` diário para o S3 falhava sem avisar; os snapshots de disco do Azure não estavam ligados para o banco; a replicação quebrou no incidente; **só o snapshot LVM** serviu. Foram perdidas cerca de 6 h de dados (cerca de 5.000 projetos, 5.000 comentários e 700 contas novas), e a recuperação levou cerca de 18 h. Postmortem publicado em 10/02/2017. *Um agente disse "5 mecanismos", o que está errado.* | [postmortem oficial](https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/) | **Conferida** · **sala** |

Frase-guia da aula, que sai dos dois casos: **backup que nunca foi restaurado não é backup, e quem garante que dá para restaurar é o teste, não a IA (Replit) nem a crença da equipe (GitLab).**

---

## Bibliografia

| Obra | Indicadores | Uso | Status |
|---|---|---|---|
| **Oficial:** Alves, *Banco de dados* (Saraiva, 2020) · Pereira, *Introdução a bancos de dados* (Senac, 2021) · Bueno, *Aprenda na prática comandos SQL* (2014) | 5 | citar no plano | `bibliografia-ucs.md` |
| Carvalho, V. *PostgreSQL: banco de dados para aplicações web modernas*. Casa do Código, **2017** (atualizado em 2023). Cobre backup no cap. 8.3, **mas não GRANT nem roles**. *O agente dizia 2023.* | 5, 6 | professor | **Conferida** |
| Beaulieu, A. *Aprendendo SQL*. Novatec (ano da edição brasileira não confirmado) | 5 | professor | só busca |
| Tanimura, C. *SQL para análise de dados*. Novatec | 5 | descartar (avançado para a turma) | só busca |
| Heuser, C. A. *Projeto de banco de dados*. Bookman | modelagem | descartar para este épico | só busca |
| Documentação oficial do PostgreSQL 16: `pg_dump`, `pg_dumpall`, GRANT | 4, 6 | professor, é a fonte primária | **Conferida** (`pg_dump`) |

### Cursos e tutoriais abertos

| Recurso | Indicadores | Uso | Status |
|---|---|---|---|
| [SQLBolt](https://sqlbolt.com/): lições interativas, sem cadastro | 5 | **sala**: nivelamento de quem não lembra o básico | aberta pelo agente |
| [pgexercises.com](https://pgexercises.com/): exercícios em Postgres, com dificuldade crescente | 5 | **sala**: trilha de quem já sabe | aberta pelo agente |
| [Select Star SQL](https://selectstarsql.com/): dado real, narrativa | 5 | professor | aberta pelo agente |
| [Wikilivros: Backup e Restore](https://pt.wikibooks.org/wiki/PostgreSQL_Pr%C3%A1tico/Administra%C3%A7%C3%A3o/Backup_e_Restore) | 6 | professor (conferir se está atualizado) | aberta pelo agente |
| Khan Academy SQL (pt) · Curso em Vídeo MySQL · LearnSQL.com.br | 5 | descartar (MySQL ou comercial; não acrescentam ao que já está acima) | misto |

**Lacuna:** nenhum material aberto cobre os Indicadores 4 e 6 com didática para iniciante. Esses dois vão depender de material próprio (A47 e A50 mais o teste acima).

---

## Fontes de ensino de SQL (referência completa)

- Taipalus, T.; Siponen, M.; Vartiainen, T. Errors and Complications in SQL Query Formulation. *ACM TOCE* 18(3), 2018. doi:10.1145/3231712
- Miedema, D.; Fletcher, G.; Aivaloglou, E. Expert Perspectives on Student Errors in SQL. *ACM TOCE* 23(1), 2022. doi:10.1145/3551392
- Miedema, D. et al. Identifying SQL Misconceptions of Novices: Findings from a Think-Aloud Study. *ICER* 2021. doi:10.1145/3446871.3469759
- Ahadi, A.; Prior, J.; Behbood, V.; Lister, R. Students' Semantic Mistakes in Writing Seven Different Types of SQL Queries. *ITiCSE* 2016. doi:10.1145/2899415.2899464
- Brass, S.; Goldberg, C. Semantic Errors in SQL Queries: A Quite Complete List. *Data & Knowledge Engineering*, 2006.
- Taipalus, T. *Persistent Errors in Query Formulation*. Tese, Univ. Jyväskylä, 2020.
- Wu, Z.; Ericson, B. J. SQL Puzzles: Evaluating Micro Parsons Problems With Different Feedbacks as Practice for Novices. *CHI* 2024. doi:10.1145/3613904.3641910
- Tucker, M. C.; Wang, X.; Son, J. Y.; Stigler, J. W. Prediction versus production for teaching computer programming. *Learning and Instruction* 91, 101871, 2024.
- Margulieux, L.; Morrison, B.; Decker, A. Design and Pilot Testing of Subgoal Labeled Worked Examples for Five Core Concepts in CS1. *ITiCSE* 2019. doi:10.1145/3304221.3319756
