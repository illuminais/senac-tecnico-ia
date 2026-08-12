---
id: av06-t2
titulo: "Quem pode o quê — permissões de acesso e execução paralela"
tipo: PE
ucs: UC08, UC06
indicadores: "UC08: Ind.4 (ato 1) + Ind.3+5 (ato 2) · UC06: Ind.2+3"
data-alvo: "14/08/2026 (ato 1) · 27/08/2026 (ato 2, só UC08)"
aula-alvo: A47 (ato 1) · A50 (ato 2)
status: detalhada
---

# Av06-T2 — Quem pode o quê

> **Status:** ✅ Detalhada · elaborada em 11/08/2026
> **Modelo A+1** (dois atos), aprovado pelo professor em 11/08/2026 para reduzir o número de instrumentos sem perder cobertura de indicador.

**Tipo:** PE — avaliação escrita individual, em papel
**Datas:** 14/08/2026 (A47, os dois blocos) · 27/08/2026 (A50, ato 2 apenas de UC08)
**Formação:** Individual
**Indicadores:** UC08 Ind.4 (ato 1) · UC08 Ind.3+5 (ato 2) · UC06 Ind.2+3 (ato único, 14/08)

---

## Por que dois atos

UC08 tem 3 indicadores pendentes e 3 slots restantes. Como instrumentos separados seriam 3 avaliações; como um projeto em dois atos são **duas sessões de um instrumento só**, e 04/09 fica livre para recuperação. O ato 1 desenha o controle de acesso no papel, o ato 2 constrói no banco o que foi desenhado.

UC06 **não** pode ser dividido: o único outro slot no T2 é 04/09, depois do fechamento de notas, e o Ind.2 (pipeline para GPU) não tem continuação no T3. Por isso Ind.2 e Ind.3 saem juntos em 14/08.

---

## Contexto pedagógico

O professor relatou em 11/08 que a turma está bimodal em SQL depois de A44: uma parte foi longe, outra praticamente não entregou. A decisão foi **não** gastar a sexta reensinando query ("eles já sabem queries, só preciso introduzir algo extra se for algo que eles realmente não sabem"). SQL-DCL resolve os dois problemas: é o Tópico 10 do plano anual, nunca dado além da menção de passagem no mapa dos 4 Ds em A10, e zera a largada — ninguém chega com vantagem. A tarefa desafio dá teto para quem foi longe sem travar quem ficou para trás.

**Limitação técnica tratada como conteúdo:** SQLite (sqliteonline.com, ferramenta padrão da turma) não tem `GRANT`/`REVOKE` nem gestão de usuários, porque é banco de arquivo único sem servidor. A avaliação é de desenho e escrita de comando, não de execução — e o "por que não roda aqui" vira evidência de UC08 Ind.2 (escolher SGBD conforme a necessidade da aplicação).

---

## Cenário comum (o mesmo dos dois atos)

O abrigo de A44 virou uma ONG. Três tabelas:

| Tabela | Colunas | Sensibilidade |
|---|---|---|
| `animais` | nome_animal, especie, porte, idade_meses, dias_no_abrigo, adotado | baixa |
| `adotantes` | id, nome, cpf, telefone, endereco | **alta** |
| `adocoes` | id, id_animal, id_adotante, data_adocao | média |

Quatro perfis: **recepcionista** · **veterinária** · **coordenadora** · **estagiário de dados**.

---

## Ato 1 — 14/08 (A47) · Bloco UC08 · ~1h45

### Tarefa 1 — Matriz de permissões (núcleo do Ind.4)

Preencher a matriz perfil × tabela, marcando em cada célula os privilégios (`SELECT`, `INSERT`, `UPDATE`, `DELETE` ou nenhum), e **justificar 2 células em uma frase cada**.

### Tarefa 2 — Escrever o DCL

Escrever `CREATE USER` e `GRANT` para 2 dos 4 perfis, na sintaxe MySQL/PostgreSQL vista em aula.

### Tarefa 3 — Mudança de contexto

"O estagiário saiu do projeto de dados e virou voluntário no canil." Escrever o `REVOKE` correspondente e dizer o que ele ainda consegue fazer depois disso.

### Tarefa 4 — Desafio (teto para quem foi longe em A44)

A coordenadora quer que a veterinária veja o histórico de adoções **sem** enxergar o CPF do adotante. Como resolver sem dar `SELECT` na tabela inteira? Resposta esperada: criar uma `VIEW` com apenas as colunas permitidas e dar `GRANT SELECT` na view, não na tabela. Não fazer a tarefa 4 não impede o **A** no Ind.4.

---

## Ato 2 — 27/08 (A50) · Bloco UC08 · fecha Ind.3 e Ind.5

Executado no sqliteonline.com, a partir da matriz que o próprio aluno desenhou no ato 1 (a folha do ato 1 é devolvida para consulta):

- **Ind.3 (estrutura física):** `CREATE TABLE` das 3 tabelas com tipos corretos, `PRIMARY KEY` e as chaves estrangeiras de `adocoes`.
- **Ind.5 (consultas SQL):** escrever, para cada perfil, uma query que ele **teria** permissão de rodar segundo a própria matriz — e uma que ele não teria, explicando por quê.
- Aqui a query volta, mas com propósito novo: a permissão define o que a query pode tocar.

> Detalhar as tarefas do ato 2 na semana 13, junto do planejamento de A50.

---

## Parte UC06 — 14/08 (A47) · Bloco 2 · ~1h30

### Parte A — Observação real (Ind.3)

Com o Gerenciador de Tarefas aberto na própria máquina (ou a partir do print de plano B): quantos processos o navegador está usando · o que significa a coluna de threads · por que uma aba travada não derruba o navegador inteiro.

### Parte B — Classificar (Ind.3)

5 situações para classificar como **threads na mesma tarefa**, **processos separados** ou **melhor na GPU**, com uma frase de justificativa cada. As situações vêm de coisas já vistas no curso (baixar arquivos, tocar áudio enquanto rola a página, treinar modelo com lote de imagens, rodar dois programas diferentes, somar uma coluna gigante de dados).

### Parte C — Pipeline (Ind.2)

Dado o cenário de treinar um modelo com um lote (batch) de imagens: ordenar as etapas do pipeline (lote carregado na VRAM → milhares de threads da GPU processam em paralelo → resultado volta para a RAM) e responder por que a CPU sozinha demoraria mais, usando concorrência vs paralelismo.

---

## Critérios de Avaliação por Indicador

> Modelo Senac: **A** = Atendido · **PA** = Parcialmente Atendido · **NA** = Não Atendido. Sem pontuação numérica.

| UC | Ind. | Evidencia **A** | Evidencia **PA** | Evidencia **NA** |
|---|---|---|---|---|
| UC08 | 4 | Matriz coerente com o princípio do menor privilégio (estagiário sem acesso a `adotantes`), `GRANT` e `REVOKE` sintaticamente corretos, justificativas ligadas ao perfil | Matriz razoável mas com privilégio a mais em dado sensível, ou comandos com erro de sintaxe que não muda o sentido | Dá acesso total a todos, ou não escreve nenhum comando reconhecível |
| UC06 | 3 | Distingue processo de thread pela memória, lê o Gerenciador de Tarefas corretamente e acerta 4 ou 5 classificações da Parte B com justificativa | Distingue os conceitos mas erra 2 ou 3 classificações, ou justifica sem citar memória/paralelismo | Trata processo e thread como sinônimos |
| UC06 | 2 | Ordena o pipeline corretamente e explica o ganho da GPU pelo paralelismo real vs alternância | Ordena o pipeline mas explica o ganho só como "GPU é mais rápida" | Não ordena o pipeline |

---

## Materiais a preparar

**Bloco UC08 (14/08)**
- [ ] Esquema impresso das 3 tabelas com colunas visíveis
- [ ] Folha da avaliação: matriz em branco + tarefas 1 a 4 + espaço para os comandos
- [ ] Colinha de sintaxe DCL **fraca**: só `GRANT ___ ON ___ TO ___;` e `REVOKE ___ ON ___ FROM ___;`, sem nenhum exemplo com as tabelas reais do abrigo (mesmo padrão aprovado em A44)
- [ ] Opcional: instância MySQL (db-fiddle ou local) para o professor executar 2 comandos ao vivo — a aula funciona sem isso

**Bloco UC06 (14/08)**
- [ ] Confirmar que o Gerenciador de Tarefas abre nas máquinas do laboratório; se estiver bloqueado, print em alta resolução como plano B
- [ ] Folha da avaliação com Partes A, B e C
- [ ] Rubrica A/PA/NA por aluno, uma linha por indicador (UC08 Ind.4 · UC06 Ind.2 · UC06 Ind.3)

---

## Refs
↑ [ATIVIDADES_AVALIATIVAS](../ATIVIDADES_AVALIATIVAS.md)
→ [semana11](../semanas/semana11.md) · [contexto-banco-de-dados](../contexto-banco-de-dados.md) · [contexto-arquitetura-computadores-gpu](../contexto-arquitetura-computadores-gpu.md) · [indicadores-t2](../indicadores-t2.md)
