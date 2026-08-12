---
schema: semana
semana: 11
aulas: [A46, A47]
periodo: 2026-08-13 / 2026-08-14
tipo: Rotação 1
---

# Semana 11 — 13–14/ago

## Fio condutor

**"Delegar com limite."** Na quinta o aluno delega um pedaço do trabalho para uma função (`def`/`return`) e aprende a ler, em inglês, o que a máquina responde quando a delegação dá errado (traceback). Na sexta a mesma ideia sobe dois níveis: o banco delega poderes a perfis de usuário (GRANT/REVOKE, cada um com o mínimo necessário) e o sistema operacional delega execução a processos e threads, com a GPU levando o paralelismo ao extremo. O `abrigo_adocao.csv` de A44 continua como pano de fundo dos quatro blocos, agora com as tabelas novas `adotantes` e `adocoes`.

> **Decisões do professor (11/08/2026):**
> 1. Bloco de Python volta para funções na prática — A43 cobriu `def`/`return` só na teoria, com exercícios fracos.
> 2. Nada de reforço de escrita de query na sexta: "eles já sabem queries, só preciso introduzir algo extra se for algo que eles realmente não sabem". O bloco de UC08 é conteúdo 100% novo (DCL), que também nivela — ninguém tem vantagem de largada.
> 3. Av06-T2 passa a ser instrumento de **dois atos** (14/08 + 27/08), no modelo A+1 pedido pelo professor.
> 4. Avaliação de Inglês ancorada nos erros reais gerados no bloco de Python da mesma manhã.

---

## A46 — 13/08 · Qui · Rotação 1

### Bloco 1 — UC05 Python para IA (3h): funções na prática, de verdade

**Objetivo:** refazer o que A43 deixou raso. Nenhum conceito novo — `def`/`return` já foram apresentados. O que muda é o formato: escrita à mão antes do PC, escalada N1→N4, e 1 conceito por bloco (regra inviolável da UC05).

- Retomada (~15min): anatomia de uma função em 4 linhas na lousa (`def nome(parametros):` · corpo indentado · `return` · chamada). Analogia: função é receita salva — escreve uma vez, usa quantas quiser.
- **Papel antes do PC** (padrão validado em A42/A44): cada função é escrita à mão no caderno antes de ser digitada. Visto no caderno = segunda dimensão de evidência e trava contra cópia da tela do colega.
- Escalada, todas sobre as colunas do abrigo (`nome_animal, especie, porte, idade_meses, dias_no_abrigo, adotado`):

  | N | Exercício | O que exercita |
  |---|---|---|
  | N1 | `def ficha(nome_animal)` → devolve `"Ficha de Rex"` | 1 parâmetro, 1 `return`, f-string |
  | N2 | `def idade_em_anos(idade_meses)` → devolve os anos | parâmetro numérico, cálculo no `return` |
  | N3 | `def classifica_espera(dias_no_abrigo)` → `"recente"` / `"longa"` | `if/else` dentro da função (condicional já consolidada) |
  | N4 | `def mais_tempo_esperando(lista_dias)` → maior valor da lista | `for` + lista já consolidados, agora encapsulados |

- **Coleta de erros (~20min finais, alimenta o bloco 2):** o professor entrega 4 trechos com erro plantado (falta de `:`, indentação errada, função chamada sem argumento, variável não definida). O aluno roda, **copia a mensagem de erro em inglês no caderno** e ainda não corrige. Esses tracebacks são o insumo da Av05-T2 logo em seguida.

**Metodologia:** lab-guiado (papel antes do PC + escalada N1→N4)
**Cobertura informal:** UC05 Ind.3 (depuração) começa a ganhar evidência aqui, sem avaliação formal nesta aula.

### Bloco 2 — UC02 Inglês Instrumental (3h): Av05-T2 — Error Report

**Objetivo:** fechar o Tópico 10 do plano anual (mensagens de erro em inglês) e avaliar Ind.1+2+3 em um único instrumento, usando os tracebacks que a própria turma produziu de manhã.

- Ensino (~50min):
  - Anatomia do traceback: `File "...", line N` → onde · tipo do erro → o quê · mensagem → por quê.
  - Vocabulário novo (nenhum termo dos Blocos 1/2 já consolidados): `line` · `expected` · `unexpected` · `missing` · `invalid` · `is not defined` · `takes ... arguments but ... was given` · `unsupported operand type`.
  - Estratégia de leitura (Ind.3): não traduzir palavra por palavra. Localizar em 3 passos — a linha, o tipo, a palavra-chave da mensagem. É scanning aplicado a texto técnico curto.
- **Av05-T2** (~2h, individual, papel, com consulta ao próprio caderno): detalhamento em [aval/av05-t2-error-report.md](../aval/av05-t2-error-report.md).

**Metodologia:** expositivo breve + avaliação individual

| # | UC | HA | Método | Tópicos | Ind. |
|---|---|---|---|---|---|
| 1 | UC05 Python para IA | 3h | lab-guiado (papel antes do PC + escalada N1→N4) | Funções na prática: `def`/`return` com 1 parâmetro · cálculo no return · `if/else` dentro da função · `for` sobre lista encapsulado — todas sobre as colunas do abrigo · coleta de 4 erros reais em inglês para o bloco seguinte | UC05-3 (informal) |
| 2 | UC02 Inglês Instrumental | 3h | expositivo breve + avaliação individual | Tópico 10 — mensagens de erro em inglês: anatomia do traceback · vocabulário de erro · estratégia de leitura em 3 passos · **Av05-T2 Error Report** | UC02-1, UC02-2, UC02-3 |

**Prep A46:**
- 4 trechos de código com erro plantado, impressos ou em arquivo: `SyntaxError` (falta `:`), `IndentationError`, `TypeError` (função chamada sem argumento), `NameError` (variável não definida) — testados antes da aula para conferir a mensagem exata que aparece.
- Folha de exercícios N1→N4 com espaço para escrita à mão (a mesma folha vira o visto no caderno).
- Prova impressa Av05-T2 (Partes A, B e C) + rubrica A/PA/NA por indicador.
- Texto técnico curto em inglês (~8 linhas) sobre um dos erros, para a Parte C — fonte real (documentação Python ou resposta de fórum), com a fonte citada no rodapé.

---

## A47 — 14/08 · Sex · Rotação 1

### Bloco 1 — UC08 Banco de Dados (3h): Av06-T2 ato 1 — quem pode ver o quê

**Objetivo:** ensinar SQL-DCL (Tópico 10 do plano anual, nunca dado além da menção no mapa dos 4 Ds em A10) e avaliar Ind.4 no mesmo bloco. Conteúdo novo por decisão do professor: a turma já sabe query, e DCL zera a largada de todo mundo — resposta direta à bimodalidade observada em A44 (uma parte foi longe, outra não entregou nada).

- Problema primeiro (~10min): o abrigo cresceu e agora tem `adotantes` (nome, CPF, telefone, endereço) e `adocoes` além de `animais`. O estagiário que atualiza o status de adoção precisa enxergar o CPF do adotante? Uma frase de amarração com o que já foi visto em UC07 sobre dado sensível, sem reabrir o tema.
- Ensino (~50min):
  - Usuário do banco ≠ pessoa · privilégio · **princípio do menor privilégio**.
  - Sintaxe (padrão MySQL/PostgreSQL, escrita e lida, não executada):
    ```sql
    CREATE USER 'estagiario'@'localhost' IDENTIFIED BY 'senha';
    GRANT SELECT ON abrigo.animais TO 'estagiario'@'localhost';
    GRANT SELECT, INSERT, UPDATE ON abrigo.animais TO 'veterinaria'@'localhost';
    REVOKE INSERT ON abrigo.animais FROM 'estagiario'@'localhost';
    GRANT ALL PRIVILEGES ON abrigo.* TO 'coordenadora'@'localhost';
    SHOW GRANTS FOR 'estagiario'@'localhost';
    ```
  - **Por que isso não roda no sqliteonline.com (~5min, e é conteúdo, não desculpa):** SQLite é banco de arquivo único, sem servidor e sem usuários — o controle de acesso fica no sistema operacional. Bancos servidor (MySQL, PostgreSQL) têm usuários próprios porque muita gente acessa o mesmo dado ao mesmo tempo. Isso é UC08 Ind.2 (escolha de SGBD conforme a necessidade) ganhando evidência de graça.
- **Av06-T2 parte UC08** (~1h45, individual, papel): detalhamento em [aval/av06-t2-acesso-e-threads.md](../aval/av06-t2-acesso-e-threads.md). Fecha Ind.4 e é o **ato 1** do instrumento de dois atos — o ato 2 (27/08, A50) constrói no banco a estrutura desenhada aqui e fecha Ind.3 e Ind.5.

**Metodologia:** expositivo breve + avaliação individual

### Bloco 2 — UC06 Arquitetura de Computadores e GPU (3h): Av06-T2 parte UC06 — processos, threads e pipeline

**Objetivo:** ensinar o Tópico 7 (processos e threads, nunca dado) e avaliar **Ind.3 e Ind.2 juntos**. Precisam sair juntos: o único outro slot de UC06 no T2 é 04/09, depois do fechamento de notas, e Ind.2 não tem continuação no T3.

- Ensino (~70min):
  - Processo = programa em execução, com memória própria. Thread = linha de execução dentro do processo, dividindo a mesma memória.
  - Âncora concreta (a analogia chef/batalhão está proibida por já ter sido usada): cada aba do navegador é um **processo** separado — por isso uma aba travar não derruba as outras; dentro de uma aba, várias **threads** (renderizar, tocar áudio, baixar imagem).
  - **Demonstração ao vivo:** abrir o Gerenciador de Tarefas do Windows, mostrar a lista de processos, a contagem de threads e o uso de CPU. Evidência real, verificável pelo aluno na própria máquina.
  - Estados de um processo: novo → pronto → executando → bloqueado → encerrado.
  - Concorrência vs paralelismo: alternar rápido em 1 núcleo vs executar de fato ao mesmo tempo em vários. Amarra com a Taxonomia de Flynn de A41 (SIMD/MIMD) sem reintroduzi-la.
  - **GIL do Python (~15min, ponte com UC05):** o Python deixa uma thread por vez executar bytecode — por isso, para acelerar de verdade, usa-se `multiprocessing` ou GPU. E aí entra o **pipeline de GPU (Ind.2)**: o lote (batch) sobe para a VRAM, milhares de threads processam em paralelo, o resultado volta para a RAM.
- **Av06-T2 parte UC06** (~1h30, individual, papel + observação no PC): detalhamento em [aval/av06-t2-acesso-e-threads.md](../aval/av06-t2-acesso-e-threads.md).

**Metodologia:** expositivo com demonstração ao vivo + avaliação individual

| # | UC | HA | Método | Tópicos | Ind. |
|---|---|---|---|---|---|
| 1 | UC08 Banco de Dados | 3h | expositivo breve + avaliação individual | Tópico 10 — SQL-DCL: `CREATE USER` · `GRANT` · `REVOKE` · `SHOW GRANTS` · princípio do menor privilégio · por que SQLite não tem DCL (escolha de SGBD) · **Av06-T2 ato 1** — matriz de permissões do abrigo | UC08-4 |
| 2 | UC06 Arquitetura de Computadores e GPU | 3h | expositivo com demonstração ao vivo + avaliação individual | Tópico 7 — processos e threads: memória própria vs compartilhada · estados do processo · concorrência vs paralelismo · GIL do Python · pipeline de GPU (batch → VRAM → threads → RAM) · **Av06-T2 parte UC06** | UC06-3, UC06-2 |

**Prep A47:**
- Esquema das 3 tabelas do abrigo (`animais`, `adotantes`, `adocoes`) impresso, com as colunas visíveis — é o insumo da matriz de permissões.
- Folha impressa da Av06-T2 parte UC08: matriz de permissões em branco + 3 tarefas + tarefa desafio (VIEW) + rubrica Ind.4.
- Colinha de sintaxe DCL **fraca**, no mesmo padrão aprovado em A44: só o esqueleto (`GRANT ___ ON ___ TO ___;`, `REVOKE ___ ON ___ FROM ___;`), sem nenhum exemplo com as tabelas reais do abrigo e sem comando pronto.
- Opcional: instância MySQL de demonstração (db-fiddle ou local) só para o professor executar 2 comandos ao vivo. Se não houver tempo de montar, a aula funciona 100% sem isso — está previsto no roteiro que a execução não é necessária.
- Confirmar que o Gerenciador de Tarefas está acessível nas máquinas do laboratório (se estiver bloqueado por política, ter um print de alta resolução como plano B).
- Folha impressa da Av06-T2 parte UC06 (Partes A, B e C) + rubrica Ind.2/Ind.3.

---

## Indicadores ativados

| UC | Indicadores | Instrumento |
|---|---|---|
| UC02 | Ind.1 (vocabulário técnico) · Ind.2 (interpreta instrução) · Ind.3 (estratégia de leitura) | Av05-T2 — Error Report |
| UC05 | Ind.3 (depuração) — evidência informal, sem nota | Coleta de erros no bloco 1 |
| UC08 | Ind.4 (permissão de acesso conforme perfil) | Av06-T2 ato 1 — matriz de permissões |
| UC06 | Ind.3 (processos e threads) · Ind.2 (pipeline para GPU) | Av06-T2 parte UC06 |

---

## Refs
↑ [roteiro-t2](../roteiro-t2.md)
→ [contexto-python-para-ia](../contexto-python-para-ia.md) · [contexto-ingles-instrumental](../contexto-ingles-instrumental.md) · [contexto-banco-de-dados](../contexto-banco-de-dados.md) · [contexto-arquitetura-computadores-gpu](../contexto-arquitetura-computadores-gpu.md)
→ [av05-t2-error-report](../aval/av05-t2-error-report.md) · [av06-t2-acesso-e-threads](../aval/av06-t2-acesso-e-threads.md)
→ [indicadores-t2](../indicadores-t2.md) · [ATIVIDADES_AVALIATIVAS](../ATIVIDADES_AVALIATIVAS.md)
→ [horario-rotacao-t2](horario-rotacao-t2.md) · [semana10](semana10.md) · [semana12](semana12.md)
