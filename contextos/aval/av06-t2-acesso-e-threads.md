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

> ⚠️ **Redesenhado em 26/08/2026.** Duas premissas do desenho original caíram:
> 1. O ato 1 (A47) foi trocado por atividade de pesquisa com **Postgres real no DBeaver**, não gerou a folha impressa da matriz, e saiu **parcial** (parte da turma não chegou a executar).
> 2. **27/08 não tem impressão** — nada pode depender de folha devolvida.
>
> Detalhamento completo em [semana13](../semanas/semana13.md).

**Ambiente: Postgres + DBeaver**, não sqliteonline. Continuidade direta da A47 (`abrigo_dNN` / `duplaNN`). Cada dupla trabalha em schema próprio (`CREATE SCHEMA meu_abrigo` + `SET search_path`), preservando as tabelas da A47 como gabarito de comparação.

**Abre com ~20min de nivelamento**, já que a A47 saiu parcial: reconexão de todos, com as duplas que conseguiram adotando as que travaram.

- **Ind.3 (estrutura física, verbo `Cria`, nível 5, morre no T2):** o conceito novo não é sintaxe, é **rastreabilidade**. Cinco alavancas (`tipo`, `NOT NULL`, `PRIMARY KEY`/`UNIQUE`, `REFERENCES`, `CHECK`), cada uma respondendo a um requisito numerado. Fixação com 7 requisitos projetados, sendo R5 ("um animal só pode ser adotado uma vez") a pegadinha — quase todos respondem FK, e FK não resolve unicidade. Depois `CREATE TABLE` das 3 tabelas, escrito no caderno antes de digitar.
- **Teste de violação obrigatório:** 3 `INSERT` que violam R3, R4 e R5, com a mensagem de erro exata copiada da tela. Sem o erro, constraint é fé.
- **Ind.5 (consultas SQL, teto nível 3, continua no T3):** cada dupla escreve uma query que a conta `duplaNN` **tem** permissão de rodar e uma que **não tem**, executa as duas e copia o erro. A permissão define o que a query pode tocar.

**Rubrica Ind.3:** **A** = as três tabelas rodam **e** cada cláusula é rastreável a um requisito numerado. **PA** = tabelas corretas sem rastreabilidade (aplicação da cláusula de contexto do indicador). **NA** = tabelas não rodam.

**Prep:** rodar todo o SQL do gabarito no Postgres do laboratório antes da aula, inclusive os 3 `INSERT` de violação — a mensagem de erro varia com versão e idioma do servidor, e ela é o insumo do exercício.

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
