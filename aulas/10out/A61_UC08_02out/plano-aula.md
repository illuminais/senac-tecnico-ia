# Plano da A61: Plantão da Vigilância, dia 3 (a prova das consultas e o robô)

> **Épico 2, Banco de Dados (UC08)** · sexta 02/10/2026 · 6 HA · desenho em `contextos/epicos/ep02-uc08.md` · semana em `contextos/semanas/semana18.md`
> **Indicador 5 (avaliação):** cria e manipula consultas SQL de forma adequada para resolução de problemas
> **Indicador 4 (ensino):** gerencia a permissão de acesso ao banco de dados, de acordo com o perfil do usuário e as políticas de acesso
> **Status:** plano escrito em 30/09, no replanejamento "um indicador por dia". Rubrica e gabarito da prova em `contextos/aval/av02-t3-plantao.md`.
>
> Todo bloco ```sql deste arquivo roda de verdade no banco. Para conferir (servidor de pé, com a conta de folga 42):
> `node scripts/checar-sql.mjs aulas/10out/A61_UC08_02out/plano-aula.md`. O texto NN vira 42.

## Objetivo do dia

Duas metades. Na primeira, o aluno mostra sozinho o Indicador 5: recebe um chamado novo e **cria** as consultas que respondem a ele, prevendo antes e conferindo depois (numa tabela impressa ou com outra consulta). Toda resposta à secretária vem com o número do banco e a consulta que o gerou: opinião não conta como resposta. Na segunda, começa o Indicador 4: o aluno cria uma conta para um robô de IA, dá a ela só a permissão de que o robô precisa e **prova o limite** provocando um `permission denied`.

**Por que nessa ordem:** a prova vem logo depois de um aquecimento curto, enquanto a A60 está fresca, e antes do intervalo. Se algo atrasar, quem cede é o robô, que volta na A62 de qualquer jeito.

**Conceitos novos do dia:** comparar números no `WHERE` (`>`, `<`, `>=`, `<=`, `<>`); contar linhas (`count(*)`) não é somar valores (`SUM`); conferir com outra consulta (as partes somam o todo); conta, dono, menor privilégio, VIEW, `CREATE ROLE`, `GRANT`, `REVOKE`. Cada um é usado junto com o que a A60 ensinou.

**O que não é objetivo hoje:** a taxa por 100 mil (já trabalhada na A56 e na A59), `HAVING`, `JOIN` (fica como trilha), subconsulta, backup (A62).

## Chamados do dia

1. **Aquecimento:** "A dengue em Maringá mudou de 2024 para 2025?" Resposta com os números do banco.
2. **A prova (o chamado de sexta):** cinco perguntas da secretária, resolvidas sozinho (tabela na seção da prova).
3. **O robô:** "O painel automático da secretaria é um robô de IA, e ele vai ler o seu banco. O que ele pode ver?"

## Blocos (1 bloco ≈ 1 HA; minutos de aula, sem contar o intervalo)

| min | Bloco | Onde |
|---|---|---|
| 0-10 | abertura | sem PC |
| 10-70 | aquecimento: a dengue em Maringá mudou? | papel → PC → par |
| 70-170 | **Av02-T3 parte 1 (Indicador 5)** | PC, individual |
| intervalo | | |
| 170-185 | portaria | sem PC, de pé |
| 185-290 | o robô (Indicador 4) | quadro → caderno → PC |
| 290-300 | fecho | sem PC |

### Abertura: de volta ao plantão (sem PC, 10 min)

- A ficha do plantão volta com a **página 2**. A página 1 (recolhida na A60) volta junto, para consulta.
- **Três perguntas de memória**, no alto da página 2, sem olhar os slides de 01/10:
  1. O que o `WHERE` faz com as linhas da tabela? (deixa só as linhas em que a condição é verdadeira; corta linhas, não colunas)
  2. O que acontece com as 408 linhas num `GROUP BY macrorregional`? (viram 4 linhas, uma por macrorregional)
  3. Em que ordem o banco executa `FROM`, `WHERE`, `GROUP BY`, `SELECT` e `ORDER BY`? (nessa ordem)
- Quem faltou na A60 recebe as duas páginas e faz a prova do mesmo jeito; a A63 é a segunda data.

### Aquecimento: a dengue em Maringá mudou? (60 min)

**O chamado:** "A dengue em Maringá mudou de 2024 para 2025?" **Regra do chamado: a resposta só vale com o número do banco e a consulta que o gerou.** Opinião não entra (em Fundamentos de Computação a turma respondia "Curitiba, porque é a capital" ou "Pato Branco, porque minha vó mora lá", sem dado).

A taxa por 100 mil **não** volta aqui: foi muito trabalhada na A56 e na A59. O aquecimento aplica três conceitos novos e junta cada um com o que a A60 ensinou.

**Pensar (papel, 5 min).** Previsão na ficha: "em quantos meses de 2025 Maringá passou de 1.000 casos? E em 2024?"

**Conceito 1 (novo): comparar números no `WHERE`.** Até aqui o `WHERE` só procurou valor igual (`mes = 3`, `municipio = 'Londrina'`). Com números, ele também compara: `>` (maior que), `<` (menor que), `>=` (maior ou igual), `<=` (menor ou igual), `<>` (diferente). Passam as linhas em que a comparação é verdadeira.

**Passo 1 (PC):** os meses de Maringá acima de 1.000 casos em 2025.

```sql
SELECT mes, casos
FROM casos_dengue
WHERE municipio = 'Maringá' AND ano = 2025 AND casos > 1000
ORDER BY mes;
```
<!-- sql: espera
2|1750
3|5090
4|4179
5|3215
6|1019
-->

Junho passa por pouco (1.019). Com `casos > 1100`, ele sairia: o limite escolhido muda a resposta, e a resposta tem que dizer qual limite usou.

**Conceito 2 (novo): contar linhas não é somar valores.** Com o mesmo `WHERE`, `count(*)` conta as linhas que passaram (aqui, meses) e `SUM(casos)` soma a coluna `casos` dessas linhas (aqui, casos). "Em quantos meses?" pede `count(*)`; "quantos casos?" pede `SUM`. Trocar um pelo outro dá uma consulta que roda e não responde à pergunta: é o erro que mais tira A na prova.

**Passo 2 (prever qual dá 5 e qual dá 15.253, depois rodar):**

```sql
SELECT count(*)
FROM casos_dengue
WHERE municipio = 'Maringá' AND ano = 2025 AND casos > 1000;
```
<!-- sql: espera
5
-->

```sql
SELECT SUM(casos)
FROM casos_dengue
WHERE municipio = 'Maringá' AND ano = 2025 AND casos > 1000;
```
<!-- sql: espera
15253
-->

**Conceito 3 (novo): conferir com outra consulta.** Quando o número não está em nenhuma tabela impressa, a conferência é uma segunda consulta que tem de concordar com a primeira. A regra é que as partes somam o todo: os meses acima de 1.000 mais os meses até 1.000 dão 12, e os casos das duas partes dão o total do ano.

**Passo 3:** a outra parte, com `<=`.

```sql
SELECT count(*), SUM(casos)
FROM casos_dengue
WHERE municipio = 'Maringá' AND ano = 2025 AND casos <= 1000;
```
<!-- sql: espera
7|3601
-->

5 + 7 = 12 meses. 15.253 + 3.601 = 18.854, que é a linha de Maringá na T2. As duas conferências fecham.

**Conceito 4 (juntar o de hoje com o da A60): comparar os anos numa consulta só.** O `GROUP BY ano` da A60 separa as linhas por ano; o `WHERE casos > 1000` de hoje filtra antes (o banco executa `FROM`, depois `WHERE`, depois `GROUP BY`).

**Passo 4:**

```sql
SELECT ano, count(*) AS meses_acima, SUM(casos) AS casos_nesses_meses
FROM casos_dengue
WHERE municipio = 'Maringá' AND casos > 1000
GROUP BY ano
ORDER BY ano;
```
<!-- sql: espera
2024|6|36146
2025|5|15253
-->

**Resposta para a secretária**, na ficha, com os números: "A temporada de 2025 durou quase o mesmo que a de 2024 (5 meses acima de 1.000 casos, contra 6), mas teve menos da metade dos casos nesses meses (15.253, contra 36.146)." Só com o `count(*)` a resposta seria "quase igual"; só com o `SUM`, "caiu muito". As duas juntas descrevem o que mudou.

**Conferir em par (5 min):** cada um lê a sua resposta para o colega, e o colega aponta de qual consulta saiu cada número.

**Se a A60 não chegou às perguntas 4 e 5:** este bloco vira elas (slides 49 a 53 da A60), e o chamado de Maringá vai para a trilha.

### Av02-T3 parte 1: o chamado de sexta (100 min, individual)

**Regras** (no slide e na folha): individual, no próprio banco; pode consultar a ficha, o cartão das 4 etapas e as tabelas T1, T2 e T3 impressas; os slides do dia ficam fora da tela. Cada item pede: **previsão** antes de rodar, a consulta, o número do banco, onde conferiu (tabela impressa ou outra consulta), se bateu, e a **resposta para a secretária** numa frase, com o número. Resposta sem número do banco não conta. As tiras de Parsons ficam com o professor; quem pedir recebe, marca na folha, e aquele item fica em PA.

| Item | Pergunta da secretária | Gabarito | Onde conferir |
|---|---|---|---|
| 1 | Quantos casos Ponta Grossa teve em 2025? | 6.643 | T2 |
| 2 | Quantos casos cada macrorregional teve em 2024, da maior para a menor? | Oeste 125.979 · Norte 100.510 · Leste 92.741 · Noroeste 66.290 | T3, `casos_2024` |
| 3 | Em que mês de 2024 houve mais casos, e quantos? | março, 103.609 | T1, 2024 |
| 4 | Quais os 3 municípios com menos casos em 2025? | Campo Mourão 213 · Joaquim Távora 1.005 · São José dos Pinhais 1.049 | T2, fim da tabela |
| 5 | Quantos casos a macrorregional Centro-Sul teve em 2025? | não existe no banco: a consulta volta vazia | a própria consulta |

Gabarito, item por item (só no `<AdminOnly>` do slide, liberado depois das 13h):

```sql
SELECT SUM(casos)
FROM casos_dengue
WHERE municipio = 'Ponta Grossa' AND ano = 2025;
```
<!-- sql: espera
6643
-->

```sql
SELECT macrorregional, SUM(casos) AS total_2024
FROM casos_dengue
WHERE ano = 2024
GROUP BY macrorregional
ORDER BY total_2024 DESC;
```
<!-- sql: espera
Oeste|125979
Norte|100510
Leste|92741
Noroeste|66290
-->

```sql
SELECT mes, SUM(casos) AS total
FROM casos_dengue
WHERE ano = 2024
GROUP BY mes
ORDER BY total DESC
LIMIT 1;
```
<!-- sql: espera
3|103609
-->

```sql
SELECT municipio, SUM(casos) AS total_2025
FROM casos_dengue
WHERE ano = 2025
GROUP BY municipio
ORDER BY total_2025
LIMIT 3;
```
<!-- sql: espera
Campo Mourão|213
Joaquim Távora|1005
São José dos Pinhais|1049
-->

Item 5: a soma de nenhuma linha. A consulta volta uma célula vazia (`[NULL]` no DBeaver), sem mensagem de erro:

```sql
SELECT SUM(casos)
FROM casos_dengue
WHERE macrorregional = 'Centro-Sul' AND ano = 2025;
```
<!-- sql: espera

-->

E o jeito de provar que Centro-Sul não existe: listar as macrorregionais do banco.

```sql
SELECT macrorregional
FROM casos_dengue
GROUP BY macrorregional
ORDER BY macrorregional;
```
<!-- sql: espera
Leste
Noroeste
Norte
Oeste
-->

**Erro provável que separa A de PA:** o item 1 sem o filtro de ano soma 2024 e 2025 juntos. Quem conferiu na T2 pega.

**Se a A60 não chegou ao `ORDER BY` e ao `LIMIT`:** os itens 2, 3 e 4 continuam, mas a ordem pode ser lida no resultado do `GROUP BY`; `ORDER BY` e `LIMIT` não são exigidos.

### Intervalo

### Portaria (sem PC, 15 min)

Crachás de papel em branco para 5 voluntários; o professor é o porteiro de três "salas": a tabela `casos_dengue`, a tabela `municipios` e o painel. Cada crachá é uma **conta**; cada carimbo é uma **permissão**.

| Rodada | O que acontece | O que fica no quadro |
|---|---|---|
| 1 | crachá sem carimbo tenta entrar na sala `casos_dengue`: barrado | conta sem permissão não lê nada |
| 2 | o porteiro carimba "pode ler o painel" | `GRANT SELECT ON painel TO conta` |
| 3 | com esse carimbo, tenta entrar na sala `casos_dengue`: barrado | a permissão vale para uma sala só |
| 4 | tenta apagar alguma coisa no painel: barrado | ler (`SELECT`) não é apagar (`DELETE`) |
| 5 | o porteiro risca o carimbo; o crachá volta a ser barrado no painel | `REVOKE SELECT ON painel FROM conta` |

### O robô: Indicador 4 (105 min)

**Teoria esmiuçada, um slide por conceito** (definição · exemplo no banco do aluno · analogia · para que serve):
1. **Conta** (role, em inglês): não é uma pessoa. É uma identidade no banco, com nome, senha e uma lista de permissões. Uma pessoa ou um programa usa a conta. O `alunoNN` é uma conta.
2. **Dono**: quem cria a tabela é o dono e pode tudo nela: ler, mudar e apagar. O `alunoNN` é dono das tabelas do `dengue_NN`. O slide mostra só o antes e depois (408 e 384 linhas, sem as 24 de Londrina), sem rodar ao vivo e sem o comando completo na tela, para ninguém apagar Londrina do próprio banco antes da A62.
3. **Princípio do menor privilégio**: cada conta recebe só o que precisa para o trabalho dela, e nada mais.
4. **OWASP LLM06:2025 (agência excessiva)**, texto original e tradução: *"an LLM agent that uses a product database in order to make purchase recommendations to a customer might only need read access to a 'products' table; it should not have access to other tables, nor the ability to insert, update or delete records."* Um agente de IA que usa um banco para recomendar produtos só precisa ler uma tabela; não deve ter acesso a outras tabelas nem poder inserir, alterar ou apagar registros.
5. **Replit, 18/07/2025**: um agente de IA apagou o banco de produção de um cliente durante um período em que ninguém devia mexer em nada (o *code freeze*), mesmo com ordem explícita de não mexer. O problema não foi o agente "querer" apagar: foi ele **poder** apagar. Fonte: AIID 1152 e Fast Company (em `contextos/pesquisa-uc08-t3.md`).
6. **VIEW**: uma consulta guardada com um nome. Quem lê a VIEW vê só o que a consulta devolve. É a consulta de totais por município e ano da A60, agora com nome.

**Fixação no caderno (5 min):** "O painel do robô mostra o total de casos por município e ano. Marque o que o robô precisa: (a) ler a tabela `casos_dengue` inteira; (b) ler só os totais; (c) apagar linhas; (d) criar tabelas." Resposta: só (b).

**No PC, como dono (`alunoNN`):**

```sql
CREATE ROLE robo_ia_NN LOGIN PASSWORD 'roboNN';
```

Segunda conexão no DBeaver, com a conta do robô: os mesmos passos da conexão da A60 (Menu **Database** → **New Database Connection** → **PostgreSQL** → aba **Main**), mesmo Host, Port e Database `dengue_NN`, mas Username `robo_ia_NN` e Password `roboNN`. **Testar com a conta de dono não testa nada:** o dono nunca é barrado.

**Preveja:** "o robô consegue ler a tabela?" Depois, na conexão do robô:

```sql
SELECT * FROM casos_dengue LIMIT 3;
```
<!-- sql: pular -->

Volta `ERROR: permission denied for table casos_dengue` (conferido no bloco de teste 2, abaixo). O robô nasceu sem permissão nenhuma.

Na conexão do dono, a VIEW (34 linhas: 17 municípios × 2 anos) e a permissão só nela:

```sql
CREATE VIEW painel_totais AS
SELECT municipio, ano, SUM(casos) AS total
FROM casos_dengue
GROUP BY municipio, ano;
```

```sql
GRANT SELECT ON painel_totais TO robo_ia_NN;
```
<!-- sql: pular -->

Na conexão do robô, três provas, cada uma com previsão antes:

```sql
SELECT count(*) FROM painel_totais;
```
<!-- sql: pular -->

```sql
SELECT * FROM casos_dengue LIMIT 3;
```
<!-- sql: pular -->

```sql
DELETE FROM casos_dengue WHERE ano = 2023;
```
<!-- sql: pular -->

A terceira prova tenta apagar as linhas de 2023, que não existem: se o aluno rodar por engano na conexão do dono, apaga 0 linhas e nada se perde. Na conexão do robô, o `permission denied` sai igual, porque o banco barra o `DELETE` antes de procurar as linhas.

34 na primeira; `permission denied` na segunda e na terceira (blocos de teste 1 a 3). Depois, na conexão do dono, tirar e devolver a permissão, provando no meio que o robô foi barrado (bloco de teste 4):

```sql
REVOKE SELECT ON painel_totais FROM robo_ia_NN;
```
<!-- sql: pular -->

```sql
GRANT SELECT ON painel_totais TO robo_ia_NN;
```
<!-- sql: pular -->

O robô precisa ficar funcionando: na A62 ele é o suspeito do incidente.

**Verso da ficha (10 min):** uma tabela "o robô pode / não pode", com o erro copiado da tela e uma frase de porquê (o perfil do robô: só mostra totais; a política: menor privilégio).

**Trilha de quem já sabia DCL (A47 e A50):** um segundo perfil, uma conta que só vê a macrorregional Norte (72 linhas: 3 municípios × 24 meses):

```sql
CREATE VIEW painel_norte AS
SELECT municipio, ano, mes, casos
FROM casos_dengue
WHERE macrorregional = 'Norte';
CREATE ROLE norte_NN LOGIN PASSWORD 'norteNN';
GRANT SELECT ON painel_norte TO norte_NN;
SELECT count(*) FROM painel_norte;
```
<!-- sql: espera
72
-->

### Fecho (sem PC, 10 min)

"Na quinta, o robô trabalha sozinho, e vocês aprendem a guardar uma cópia do banco." O incidente da A62 continua surpresa. A ficha é recolhida.

## Blocos de teste (não vão para os slides)

O `SET ROLE` faz, dentro do teste, o papel da conexão do robô; o `GRANT robo_ia_NN TO alunoNN` só existe para o teste poder usar o `SET ROLE`. Tudo roda dentro de ROLLBACK e nada fica no banco.

Teste 1: o robô lê a VIEW.

```sql
CREATE ROLE robo_ia_NN LOGIN PASSWORD 'roboNN';
CREATE VIEW painel_totais AS SELECT municipio, ano, SUM(casos) AS total FROM casos_dengue GROUP BY municipio, ano;
GRANT SELECT ON painel_totais TO robo_ia_NN;
GRANT robo_ia_NN TO alunoNN;
SET ROLE robo_ia_NN;
SELECT count(*) FROM painel_totais;
```
<!-- sql: espera
34
-->

Teste 2: o robô não lê a tabela.

```sql
CREATE ROLE robo_ia_NN LOGIN PASSWORD 'roboNN';
GRANT robo_ia_NN TO alunoNN;
SET ROLE robo_ia_NN;
SELECT * FROM casos_dengue LIMIT 3;
```
<!-- sql: erro "permission denied for table casos_dengue" -->

Teste 3: o robô não apaga.

```sql
CREATE ROLE robo_ia_NN LOGIN PASSWORD 'roboNN';
GRANT robo_ia_NN TO alunoNN;
SET ROLE robo_ia_NN;
DELETE FROM casos_dengue WHERE ano = 2023;
```
<!-- sql: erro "permission denied for table casos_dengue" -->

Teste 4: depois do `REVOKE`, o robô é barrado na VIEW.

```sql
CREATE ROLE robo_ia_NN LOGIN PASSWORD 'roboNN';
CREATE VIEW painel_totais AS SELECT municipio, ano, SUM(casos) AS total FROM casos_dengue GROUP BY municipio, ano;
GRANT SELECT ON painel_totais TO robo_ia_NN;
REVOKE SELECT ON painel_totais FROM robo_ia_NN;
GRANT robo_ia_NN TO alunoNN;
SET ROLE robo_ia_NN;
SELECT count(*) FROM painel_totais;
```
<!-- sql: erro "permission denied for view painel_totais" -->

Teste 5: o dono pode tudo, inclusive apagar Londrina (é o que o incidente da A62 simula).

```sql
DELETE FROM casos_dengue WHERE municipio = 'Londrina';
SELECT count(*) FROM casos_dengue;
```
<!-- sql: espera
384
-->

## Trilhas

- **Quem termina o aquecimento ou a prova antes:** Foz do Iguaçu, que teve um mês acima de 1.000 casos fora do começo do ano (novembro de 2025, 1.151); ou o `JOIN`, abaixo; ou o desafio de 2024 contra 2025 da A60.
- **O `JOIN`, como trilha:** a população mora só na tabela `municipios`. O `JOIN` casa cada linha da `casos_dengue` com a linha da `municipios` que tem o mesmo código IBGE, e põe município, população e total numa consulta só:

```sql
SELECT c.municipio, m.populacao, SUM(c.casos) AS total_2025
FROM casos_dengue c
JOIN municipios m ON m.codigo_ibge = c.codigo_ibge
WHERE c.ano = 2025
GROUP BY c.municipio, m.populacao
ORDER BY total_2025 DESC
LIMIT 3;
```
<!-- sql: espera
Londrina|588125|32804
Maringá|454146|18854
Cascavel|350644|12372
-->

  Sem o `ON`, o banco casa cada linha de uma tabela com todas as da outra: 408 × 17 = 6.936 linhas, sem aviso nenhum.

```sql
SELECT count(*)
FROM casos_dengue c
JOIN municipios m ON m.codigo_ibge = c.codigo_ibge;
```
<!-- sql: espera
408
-->

```sql
SELECT count(*)
FROM casos_dengue, municipios;
```
<!-- sql: espera
6936
-->

- **Quem termina o robô antes:** o segundo perfil (conta só do Norte), ou o `HAVING` como etapa 4 do cartão.
- **Quem trava:** tiras de Parsons (na prova, marcam o item como PA). Banco quebrado: `./resetar.sh NN`, sem depuração.

## Materiais (produzidos em 30/09, em `public/materiais/`)

`ficha-plantao-p2.html` (frente e verso) · `avaliacao-chamado-de-sexta.html` (frente e verso) · `tiras-parsons-avaliacao.html` (itens 1 a 4, 4 folhas, ficam com o professor) · `colinha-permissoes.html` (4 por folha) · `crachas-portaria.html` (6 crachás + 3 placas). Impressão conferida em PDF A4 em 30/09.

### O que cada um contém

| Material | Formato | Observação |
|---|---|---|
| `slides.md` | Slidev | Um slide por conceito novo; `unlockHour: 13` como na A60 (gabarito da prova só depois das 13h). Rodar `checar-sql.mjs` e `checar-repeticao.mjs` antes de publicar |
| Ficha do plantão, página 2 | HTML para imprimir | Frente: 3 perguntas de memória e o aquecimento de Maringá (previsão dos dois anos, as consultas, os números, as duas conferências 5 + 7 = 12 e 15.253 + 3.601 = 18.854, e a resposta para a secretária com os números). Verso: a tabela "o robô pode / não pode" |
| Folha da prova, "o chamado de sexta" | HTML para imprimir | 5 itens, cada um com previsão, consulta, número, onde conferiu (tabela ou outra consulta), bateu, e a resposta para a secretária com o número; campo "usei tiras" |
| Tiras de Parsons da prova | HTML para imprimir | Itens 1 a 4; ficam com o professor |
| Colinha fraca de DCL | HTML para imprimir | Só o formato: `CREATE ROLE ___ LOGIN PASSWORD '___';` · `GRANT ___ ON ___ TO ___;` · `REVOKE ___ ON ___ FROM ___;` |
| Crachás da portaria | HTML para imprimir | 5 crachás em branco, com espaço para carimbo |
| Rubrica por aluno | impressão de `contextos/aval/av02-t3-plantao.md` | Uma linha por indicador |

## Pendências antes da aula

1. ✅ Contas 33 a 42 criadas no servidor em 30/09 (`verificar.sh`: 42 bancos, tudo certo).
2. ✅ `checar-sql.mjs` em 30/09: 29 blocos do plano e 16 dos slides conferem com o banco, inclusive os testes do robô (34 linhas na VIEW; `permission denied` na tabela, no `DELETE` e na VIEW depois do `REVOKE`; 384 linhas depois do `DELETE` do dono). Nenhuma conta de teste sobrou no servidor.
3. Imprimir a ficha p2, a folha da prova, as tiras, a colinha e os crachás.
4. Cuidado com o canário da Av01-T3: Pato Branco tem 3.419 casos em 2025, a 2 do canário 3.417. Nenhum item da prova usa Pato Branco.
