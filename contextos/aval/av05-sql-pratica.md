---
id: av05
titulo: SQL+Python — Banco na Prática (SQLite, sem def)
tipo: AS
ucs: UC08, UC05, UC03
indicadores: "UC08: Ind.2+3 · UC05: Ind.1+2 · UC03: Ind.3"
data-alvo: "07/05/2026"
aula-alvo: A20
status: detalhada
---

# Av.05 — SQL+Python: Banco na Prática

> **Status:** ✅ Detalhada

**Tipo:** AS — Atividade em Sala  
**Data:** 07/05/2026 (Quinta-feira, A20 — UC05 3HA)  
**Formação:** Dupla  
**UCs cobertas:** UC08, UC05, UC03  
**Indicadores:** UC08 Ind.2+3 · UC05 Ind.1+2 · UC03 Ind.3  
**Plataforma de entrega:** GitHub (git push em sala) + link ao professor  
**Slot disponível:** Sem1-Qui — UC05 (3HA)

---

## Contexto pedagógico

Alunos conhecem: CREATE TABLE, INSERT, SELECT, UPDATE, ALTER — tudo visto em A06/A08/A10/A18. Python: variáveis, tipos, for, if/elif — **sem `def`/`return`** (funções não foram ensinadas). Pandas visto em 02/05 (sábado de reposição).

Esta avaliação integra SQL + Python em um único script: criar duas tabelas no SQLite, inserir dados, mostrar no terminal, alterar um registro, mostrar de novo, e usar Pandas para estatísticas simples.

Substitui a Av.05 original de Python N2 (DataList com def) — simplificada porque alunos não dominam funções ainda.

---

## Critérios de Avaliação por Indicador

| UC | Indicador | O que evidencia **A** | O que evidencia **PA** | O que evidencia **NA** |
|---|---|---|---|---|
| UC08 | Ind.2 | Usa SQLite com comentário justificando a escolha (SGBD embutido, sem instalação) | Usa SQLite sem justificativa | Não conecta ao SQLite |
| UC08 | Ind.3 | `CREATE TABLE` correto com tipos (`TEXT`, `INTEGER`, `REAL`) e `PRIMARY KEY` para as duas tabelas | Uma tabela correta ou tipos errados | Sem `CREATE TABLE` funcional |
| UC05 | Ind.1 | Script Python funcional com `for` + `if/elif` corretos | Parcialmente funcional (executa mas com erro lógico) | Sem nenhuma estrutura de controle |
| UC05 | Ind.2 | `sqlite3` e `pandas` usados corretamente (conexão + `read_sql_query` + DataFrame) | Um dos dois funcional | Sem sqlite3 e sem Pandas |
| UC03 | Ind.3 | `.mean()`, `.max()`, `.min()` aplicados sobre coluna numérica com valores corretos | Cálculo presente mas valor incorreto | Sem nenhum cálculo estatístico |

---

## Orientações para o Professor

- Ter starter code com esqueleto das 4 fases (conexão, INSERT+SELECT, UPDATE+SELECT, Pandas)
- Fase 4: deixar `.mean()` / `.max()` / `.min()` e `pd.read_sql_query()` visíveis na lousa — andaime, não cola
- UC08 Ind.2: exigir comentário no topo explicando por que SQLite (sem instalação, arquivo local)
- Se algum aluno perguntar sobre `def`: dizer que não é necessário aqui — o script funciona sem

Enunciado completo: [avaliacoes/av05/content.md](../../../../avaliacoes/av05/content.md)
