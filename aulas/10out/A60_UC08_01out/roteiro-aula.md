# Roteiro da A60 · quinta 01/10 · Plantão da Vigilância, dia 2 (consultas)

> Para o professor. 6 HA = 300 min de aula, intervalo à parte. **Página** = o número no rodapé da apresentação (77 no total).
> Objetivo do dia: o aluno responde às 5 perguntas da secretária escrevendo consultas (`SELECT`, `WHERE`, `SUM`, `GROUP BY`, `ORDER BY`, `LIMIT`), **prevê** antes de rodar e **confere** o número numa tabela impressa. É a base da avaliação de sexta: o que hoje não for praticado, sexta não cobra.

## Antes da turma entrar

- [ ] Servidor de pé: `cd scripts/dataset-dengue/servidor && docker compose up -d && ./verificar.sh`. Tem que dizer **42 bancos** e "TUDO CERTO".
- [ ] **Host no quadro com o IP que o `verificar.sh` imprimir na escola** (o IP muda de rede; em casa deu 192.168.18.11). Porta `5432`, Database `dengue_NN`, Usuário `alunoNN`, Senha `dengueNN`.
- [ ] Testar de um PC do laboratório (PowerShell): `Test-NetConnection SEU_IP -Port 5432`. Suspensão do notebook desligada.
- [ ] **Se a rede do laboratório isolar (timeout): túnel ngrok.** Antes de abrir, senha forte para o superusuário (nenhum script usa essa senha pela rede): `docker exec dengue psql -U postgres -c "ALTER ROLE postgres PASSWORD '$(openssl rand -hex 16)'"`. Depois, num terminal separado: `ngrok tcp 5432`. No quadro, o Host e o Port da linha *Forwarding* (ex.: `tcp://0.tcp.sa.ngrok.io:14829` vira Host `0.tcp.sa.ngrok.io`, Port `14829`). O endereço muda se o ngrok reiniciar: suba antes e não mexa. Teste com 2 ou 3 PCs ao mesmo tempo (conta de folga `aluno41`). No fim da aula, `Ctrl+C` no ngrok.
- [ ] Na mesa do professor: as fichas p1 (recolhidas na A59), os 34 cartões do SQL humano, as tiras de Parsons (perguntas 1 a 5), os cartões das 4 etapas, a lista da chamada com os números.
- [ ] Uma folha com T1, T2 e T3 por mesa. Quatro folhas para os cantos da sala: **Leste, Noroeste, Norte, Oeste**.
- [ ] Se der tempo (para a A62): num PC, conectar com `aluno41` / `dengue41` no `dengue_41` e testar o backup do DBeaver (botão direito no banco, ferramenta de backup). Anotar se reclamou de versão.

## O relógio

| Minuto | Bloco | Páginas | Tem que estar feito |
|---|---|---|---|
| 0-10 | 1 · Abertura, sem PC | 4-6 | ficha na mesa, previsão 408 escrita |
| 10-60 | 2 · SQL humano, de pé | 7-30 | ordem de execução no quadro |
| 60-110 | 3 · Conectar e pergunta 1 | 31-46 | todos conectados, `count(*)` = 408, P1 na ficha |
| 110-160 | 4 · Somar e pergunta 2 | 47-56 | P2 na ficha |
| intervalo | | | |
| 160-210 | 5 · Agrupar e pergunta 3 | 57-64 | P3 na ficha |
| 210-285 | 6 · Ordenar, cortar, perguntas 4 e 5 | 65-72 | P4 e P5 na ficha |
| 285-300 | Fechamento, sem PC | 73-77 | fichas recolhidas |

**Se atrasar, corte nesta ordem:** 1º o desafio (pág. 72) · 2º a rodada 7 do SQL humano vira quadro · 3º o "Preveja: 1, 12 ou 408?" (pág. 48) vira pergunta oral · 4º a pergunta 5 vai para sexta · 5º a pergunta 4 também. **Não pode cair:** conexão, `count(*)` e as perguntas 1, 2 e 3 com conferência.

---

## Bloco 1 · Abertura (0-10 min · pág. 4-6 · sem PC)

**Objetivo:** o aluno recupera de memória o dado e a previsão de 25/09 antes de encostar no banco.

**Como:**
1. Monitores desligados. Devolva a **ficha p1** a cada aluno. Quem faltou em 25/09 recebe uma ficha nova e copia de um colega a previsão de linhas, com a conta.
2. **Pág. 5:** três perguntas de memória, respondidas no verso da ficha, sem olhar slides (3 min). O clique revela as respostas: uma linha é um município, num mês, de um ano, com a macrorregional e os casos (Apucarana, Norte, jan/2024, 5.603) · 17 × 12 × 2 = **408** · Leste, Noroeste, Norte, Oeste.
3. **Pág. 6:** o chamado continua. Leia as 5 perguntas da secretária. Cada número vai para a ficha com a consulta que o gerou e onde foi conferido.

---

## Bloco 2 · SQL humano (10-60 min · pág. 7-30 · de pé, sem PC)

**Objetivo:** cada aluno **é uma linha da tabela**. Com o corpo, a turma vê o que `WHERE`, `AND`, `OR`/`IN`, `GROUP BY`, `SUM` e `ORDER BY` fazem com as linhas, antes de digitar qualquer coisa. Não é trabalho em grupo: cada um age sozinho, pelo próprio cartão.

**Como preparar (2 min):**
- Cole as quatro folhas nos cantos: Leste, Noroeste, Norte, Oeste.
- Entregue **um cartão por aluno**. São 34 cartões: os 17 municípios em março e em abril de 2025, cada cartão é uma linha real do banco. Com menos alunos que cartões, quem sobrar segura **dois cartões do mesmo município** (março numa mão, abril na outra), e você segura o resto.
- **Pág. 8 a 10:** uma consulta é uma pergunta que o banco entende e sempre devolve uma tabela. **A regra:** a cada rodada vem um comando, e você **age só se o seu cartão cumpre o comando**.

**As 7 rodadas** (você fala o comando; o slide seguinte, o "(cont.)", mostra o antes e depois):

| Rodada | Pág. | Você diz | O que acontece | O que fica no quadro |
|---|---|---|---|---|
| 1 | 11-12 | "Cada um lê o seu cartão em voz alta." | todos leem | `SELECT * FROM cartoes`: todas as linhas voltam |
| 2 | 13-14 | "De pé, só os cartões de março." | **17** de pé | `WHERE mes = 3` corta linhas, não colunas |
| 3 | 15-16 | "De pé, só março **e** Oeste." | **5** de pé | `AND`: as duas condições na mesma linha |
| 4 | 17-18 | "De pé, quem é Norte **e** Noroeste." | **ninguém** levanta | erro silencioso: nenhuma linha é das duas; o banco devolve vazio e não avisa |
| 4b | 19-20 | "Agora, Norte **ou** Noroeste." | **14** de pé (7 municípios × 2 meses) | `OR` e `IN` |
| 5 | 21-22 | "Só março. Cada um vai para o canto da sua macrorregional." | 4 grupos: Leste 5, Noroeste 4, Norte 3, Oeste 5 | `GROUP BY`: 17 linhas viram 4 pilhas |
| 6 | 23-24 | "Cada canto soma os casos." (calculadora do celular) | Leste **4.071** · Noroeste **6.553** · Norte **10.941** · Oeste **8.319** | `SUM`: uma linha por pilha |
| 7 | 25-26 | "Os cantos formam uma fila, o maior na frente." | Norte, Oeste, Noroeste, Leste | `ORDER BY ... DESC` |

**Fechando o bloco (pág. 27-30):** a mesma consulta no banco (ganha `ano = 2025`, porque o banco tem os dois anos, e o `AS total`) e **a ordem em que o banco executa**: `FROM` (pegar os cartões) → `WHERE` (quem fica de pé) → `GROUP BY` (ir para o canto) → `SUM` (somar no canto) → `ORDER BY` (a fila). Deixe isso escrito no quadro o dia todo.

**Recolha os cartões.** O de Londrina em março é a conferência da pergunta 1.

**Se estourar o minuto 60:** rodadas 6 e 7 no quadro, sem mover a turma. **Sala pequena:** cartões na mesa, grupos de 5, e cada rodada vira "separem os cartões".

---

## Bloco 3 · Conectar e a pergunta 1 (60-110 min · pág. 31-46 · PC)

**Objetivo:** todos conectados no **próprio** banco, com a previsão das 408 linhas conferida e a primeira consulta escrita e conferida.

**Como:**
1. **Pág. 32-33:** cada um tem o seu banco e a sua conta. NN é o número da chamada com dois dígitos (o 3 usa `03`).
2. **Pág. 34-35:** conexão no DBeaver: **Database** → **New Database Connection** → **PostgreSQL** → **Next** → aba **Main** com os dados do quadro → **Test Connection ...** (se pedir, **Download** do driver) → **Finish**. Erro de senha: conferir o NN nos três campos. *Connection refused* ou *timed out*: é a rede, não a digitação.
3. **Pág. 36-38:** a árvore (`dengue_NN` → Databases → `dengue_NN` → Schemas → public → Tables) e o editor (botão direito na conexão → **SQL Editor** → **New SQL script**, ou `Ctrl+]`). `Ctrl+Enter` roda a consulta onde está o cursor.
4. **Pág. 39:** `SELECT count(*) FROM casos_dengue;` → **408**. Confere com a previsão da ficha.
5. **Pág. 40-42:** escolher colunas no `SELECT`; texto entre aspas simples e número sem aspas; o exemplo resolvido com três condições (Apucarana, janeiro de 2024: 5.603).
6. **Pág. 43:** como conferir em par: os dois monitores desligados, um fala e o outro escuta (o número, a previsão, a tabela onde conferiu). Se não bateu, ligam e comparam as consultas parte por parte.
7. **Pág. 44 · Pergunta 1 (15 min):** Londrina, março de 2025 → **6.614**. Confere com o cartão (está com você). Gabarito na pág. 45. **Erro provável:** sem `ano = 2025` voltam 2 linhas (20.108 em 2024 e 6.614 em 2025).
8. **Pág. 46:** quem termina antes vai para o pgexercises.com ou para o desafio; quem trava pede as **tiras da pergunta 1**.

**Quem não conectar em 5 minutos:** senta ao lado de um colega conectado e acompanha. Banco estranho: `./resetar.sh NN` na sua máquina (refaz só o banco dele, em segundos). Não depure na hora.

---

## Bloco 4 · Somar, pergunta 2 e o erro que não avisa (110-160 min · pág. 47-56)

**Objetivo:** usar o `SUM` com `WHERE` e reconhecer um resultado vazio como erro, mesmo sem mensagem.

**Como:**
1. **Pág. 48 · Preveja:** a consulta com `SUM` de Maringá em 2025 devolve 1, 12 ou 408 linhas? Resposta: **1** (18.854). O `WHERE` deixa 12 linhas e o `SUM` junta numa só, como os cantos do SQL humano.
2. **Pág. 49:** o mecanismo, conferido na T2 (Maringá, 18.854).
3. **Pág. 50 · Pergunta 2 (15 min):** Londrina em 2025 inteiro → **32.804** (T2). Gabarito na pág. 51.
4. **Pág. 52-53 · Preveja:** "Norte **e** Noroeste" com `SUM` devolve **1 linha com a célula vazia** (`[NULL]`): a soma de nenhuma linha. É a rodada 4 do SQL humano, agora no banco, e o banco não mostra erro.
5. **Pág. 54:** o conserto com `IN` → **69.428** (T3: 44.080 + 25.348).
6. **Pág. 55-56:** o mesmo erro silencioso acontece com a IA. No benchmark BIRD, a melhor IA acerta 82% das consultas e as pessoas 93%. Por isso a conferência existe.

---

## Bloco 5 · Agrupar e pergunta 3 (160-210 min · pág. 57-64)

**Objetivo:** escrever uma consulta com `GROUP BY` planejando antes com as 4 etapas, e entender o erro que o Postgres avisa.

**Como:**
1. **Distribua o cartão das 4 etapas** (um por aluno). Ele fica na mesa o épico inteiro e vale como consulta na avaliação de sexta: no fim, recolha junto com a ficha, para não sumir. A etapa 4 é o `HAVING`, só como desafio.
2. **Pág. 58:** `GROUP BY ano`: as 408 linhas viram 2 (385.520 em 2024 e 126.732 em 2025, linha `total` da T1).
3. **Pág. 59-60:** as 4 etapas: filtrar linhas (`WHERE`), definir o grupo (`GROUP BY`), calcular o resumo (`SUM`), filtrar grupos (vazia).
4. **Pág. 61 · Pergunta 3 (20 min):** casos de cada macrorregional em 2025 → Norte **44.080** · Oeste **38.681** · Noroeste **25.348** · Leste **18.623** (T3). **Erro provável:** deixar o `mes = 3` do SQL humano e voltarem os números dos cantos (Norte 10.941...).
5. **Pág. 62-63 · Preveja: roda?** Uma coluna no `SELECT` que não está no `GROUP BY` faz o Postgres **avisar** com erro ("must appear in the GROUP BY clause"), ao contrário do erro silencioso.
6. **Pág. 64:** o conserto: agrupar por duas colunas (`municipio, ano`) → 34 linhas.

**Se o minuto 210 chegar sem a P3:** as perguntas 4 e 5 vão para o aquecimento de sexta, e a avaliação não exige `ORDER BY` nem `LIMIT` (a ordem pode ser lida no resultado do `GROUP BY`).

---

## Bloco 6 · Ordenar, cortar, perguntas 4 e 5 (210-285 min · pág. 65-72)

**Objetivo:** ordenar e cortar o resultado para responder "quais os maiores" e "qual o maior".

**Como:**
1. **Pág. 66:** `ORDER BY` (o Noroeste em 2025, do maior para o menor). `DESC` é decrescente; `ASC`, crescente, é o padrão quando não se escreve nada.
2. **Pág. 67:** `LIMIT` (os 3 meses de 2024 com mais casos: março, abril e maio, na T1).
3. **Pág. 68 · Pergunta 4 (15 min):** os 5 municípios com mais casos em 2025 → Londrina 32.804, Maringá 18.854, Cascavel 12.372, Foz do Iguaçu 10.728, Apucarana 10.271 (T2, linhas 1 a 5). **Erros prováveis:** sem `DESC` voltam os 5 menores (começando por Campo Mourão, 213); sem `ano = 2025`, Curitiba aparece em 3º, porque somou os dois anos.
4. **Pág. 70 · Pergunta 5 (15 min):** o mês de 2025 com mais casos → **março, 29.884** (T1). **Erro provável:** sem o ano volta março também, mas com 133.493. O mês bate e o número não: só a conferência pega.
5. **Pág. 72 · Desafio (quem terminou):** qual município perdeu mais casos de 2024 para 2025? Londrina: 79.341 → 32.804, **46.537 a menos**.

---

## Fechamento (285-300 min · pág. 73-77 · sem PC)

1. **Pág. 73-74:** os comandos de hoje, como tabela de consulta.
2. **Pág. 75:** cada um confere a própria ficha (nome, NN, previsões, as 5 consultas, onde conferiu). **Recolha as fichas e os cartões das 4 etapas.** Sexta eles voltam, e a ficha ganha a página 2.
3. **Pág. 76:** o próximo plantão. O chamado de sexta é "a dengue em Maringá mudou de 2024 para 2025?", com resposta só com números do banco. A **avaliação do Indicador 5 é no meio do dia de sexta**, e depois dela vem o Indicador 4 (o robô de IA).
4. Servidor: para desligar guardando o trabalho dos alunos, `docker compose down` (**sem** o `-v`).

## Depois da aula

- Anote **até onde a turma chegou** (qual pergunta, qual página). Isso decide se o aquecimento de sexta começa pelas perguntas 4 e 5, e o que a avaliação cobra.
- Fichas e cartões das 4 etapas guardados para sexta.
