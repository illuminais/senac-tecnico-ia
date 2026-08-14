# Materiais — A47, 14/08/2026

UC08 Banco de Dados + UC06 Arquitetura de Computadores e GPU

> **Não é dia de prova.** Decisão de 13/08: foram duas provas na quinta, e a sexta vira
> pesquisa, implementação e defesa oral. O instrumento muda de PE (prova escrita) para
> **AS (atividade de sala)**, e a evidência do indicador sai da ficha, do caderno e da defesa.

---

## ANTES DA AULA (você, hoje)

### 1. Subir o Postgres e rodar o setup

```
cd dados/servidor && docker compose up -d && ./verificar.sh
```

Passo a passo completo, com os planos de rede e o teste de conectividade, em
[servidor/SUBIR-O-SERVIDOR.md](servidor/SUBIR-O-SERVIDOR.md).

O script cria:
- **16 contas de grupo** (`dupla01` a `dupla16`, senha `abrigo01` a `abrigo16`), com `CREATEROLE`
- **1 banco por grupo** (`abrigo_d01` a `abrigo_d16`), copiado de um modelo, cada um com o grupo como dono
- As 3 tabelas com dados: `animais` (27 linhas), `adotantes` (8, com CPF) e `adocoes` (8)

**Já foi testado ponta a ponta** num Postgres 16 real. Confirmado que funciona:
a dupla cria conta, dá `GRANT`, a conta nova lê o que pode, e é **negada** no que não pode.


### 2. Imprimir

| Arquivo | Quantas |
|---|---|
| `fichas-abrigo-para-colar.html` | 8 fichas diferentes, 2 por página A4. Uma por dupla, repetindo as fichas quando faltar |
| `fichas-medicao-para-colar.html` | fichas M1 e M2, uma folha por dupla |

São **meia folha cada**, com linha de corte, para recortar e colar no caderno.

### 3. Copiar para as máquinas

`medir_threads.py` precisa estar acessível nos PCs (pendrive, rede ou Drive).

---

## Ordem do dia

| Quando | O quê |
|---|---|
| 0 a 25min | **Teste do DBeaver.** Instalar ou verificar. Timebox duro |
| 25 a 60min | Ensino de DCL, com `GRANT` rodando ao vivo no projetor |
| 60min a 2h15 | **Duplas trabalham na ficha do abrigo**, no DBeaver e no caderno |
| 2h15 a 2h45 | **Rodada de validação cruzada** entre duplas |
| intervalo | |
| 0 a 20min | Rodar `medir_threads.py` e anotar os tempos |
| 20 a 45min | Ensino: GIL, processos e threads, pipeline de GPU (depois de eles verem os números) |
| 45min a 1h50 | Fichas M1 e M2, no caderno |
| 1h50 a 2h20 | Rodada de validação cruzada |
| final | Sorteio oral seu, 5 ou 6 alunos |

**Se o DBeaver bater na trave:** sqliteonline.com. Mas atenção, o `GRANT` **não roda** lá, e aí
a ficha muda de sentido: em vez de executar, a dupla escreve os comandos e explica por que a
ferramenta não aceita. Isso ainda evidencia UC08 Ind.2 (escolha de SGBD), só perde a parte prática.

**Dica para laboratório travado:** o DBeaver tem distribuição em **zip, sem instalador**, que roda
sem direito de administrador.

---

## As três camadas de validação

Foi o que substituiu a prova. Nenhuma sozinha resolve.

1. **Visto no caderno** — a resposta é escrita à mão, a partir de uma ficha colada. Não dá para
   imprimir tela nem colar print.
2. **Validação cruzada** — outra dupla ouve a explicação, **assina a ficha e escreve a pergunta que fez**.
   Assinatura sem pergunta escrita não vale. São 7 pares de duplas em paralelo, cerca de 15 minutos.
3. **Sorteio oral seu** — 5 ou 6 alunos, duas perguntas de 60 segundos cada. Escolha os que pareceram
   copiados e os que pareceram muito bons. Ninguém sabe se vai ser sorteado.

## O que impede a cópia do ChatGPT

Cada dupla tem **um pedido diferente** e **um banco diferente**. E as respostas que valem dependem
da máquina e da execução deles:

- a **mensagem de erro exata** que apareceu na tela, copiada palavra por palavra
- os **três tempos** que o script mediu naquele PC
- a **contagem de threads** do Gerenciador de Tarefas daquela máquina

Nada disso o ChatGPT tem como saber. Ele pode explicar o conceito, e tudo bem: a pesquisa é liberada.
O que ele não faz é a execução.

---

## Bloco 1: o que rodar ao vivo

Conecte como uma dupla qualquer e faça na frente deles, sem pressa:

```sql
CREATE ROLE estagiario_demo LOGIN PASSWORD 'senha123';
GRANT SELECT ON animais TO estagiario_demo;
```

Depois **abra uma segunda conexão no DBeaver com a conta nova** e mostre:

```sql
SELECT nome_animal FROM animais;   -- funciona
SELECT * FROM adotantes;           -- ERROR: permission denied for table adotantes
```

**A mensagem de erro é o momento da aula.** É ela que prova que a permissão existe de verdade,
e é ela que a ficha vai pedir que eles copiem.

Mensagens confirmadas em Postgres 16:

```
ERROR:  permission denied for table adotantes
ERROR:  permission denied for table animais
```

## Bloco 2: a inversão

**Eles medem primeiro, você explica depois.** Rode o script antes de falar em GIL.

Resultado real, medido numa máquina de 4 núcleos com `TAMANHO = 8_000_000` e `TAREFAS = 4`:

```
1 - uma de cada vez                2.81 segundos
2 - com THREADS                    2.70 segundos
3 - com PROCESSOS                  1.58 segundos
```

Os números mudam de máquina para máquina, e é isso que interessa. O que **não** muda é o padrão:
**threads quase não ajudam, processos ajudam.** Quando a turma inteira tiver esse resultado na
frente, aí sim entra a explicação do GIL, e ela cai em terreno preparado.

---

## Onde cada indicador é evidenciado

| Indicador | Onde |
|---|---|
| **UC08 Ind.4** permissão de acesso | Ficha do abrigo: os comandos rodados, a conta criada e o erro capturado |
| **UC08 Ind.2** escolha de SGBD | A comparação Postgres contra SQLite, e por que DCL exige servidor |
| **UC06 Ind.3** processos e threads | Ficha M1 (tempos medidos) e M2 (Gerenciador de Tarefas) |
| **UC06 Ind.2** pipeline para GPU | Última pergunta da M1: por que a GPU resolveria melhor |

Rubrica A/PA/NA: **A** exige comandos que rodaram, a mensagem de erro copiada da tela e a defesa
na rodada cruzada. **PA** é a ficha completa mas sem a execução, ou sem conseguir explicar na rodada.
**NA** é ficha vazia ou copiada sem execução nenhuma.

---

## Ato 2, em 27/08

A ficha do abrigo é o **ato 1**. Em 27/08 (A50) a dupla constrói a estrutura do zero no Postgres
(`CREATE TABLE` com PK e FK) e escreve as queries que cada perfil teria permissão de rodar.
Fecha UC08 Ind.3 e Ind.5. **Recolha as fichas ou garanta que ficaram coladas no caderno.**

---

## CHECKLIST DE VÉSPERA (achados do QA, ordenados por risco)

Cada item abaixo derruba a aula se não for resolvido antes.

### 1. O Postgres aceita conexão de outra máquina?

> Com o `docker compose` da pasta `servidor/` isso já vem resolvido. O que sobra é o teste de rede abaixo.

Instalação normal de Postgres escuta **só em localhost** e recusa conexão remota. Se o servidor for a sua
máquina, precisa de:

- `postgresql.conf`: `listen_addresses = '*'`
- `pg_hba.conf`: uma linha `host all all 192.168.0.0/24 scram-sha-256` (troque pela faixa do laboratório)
- firewall liberando a porta 5432
- reiniciar o serviço

**Rodar em Docker evita os dois primeiros passos**, porque a imagem oficial já vem configurada para aceitar
conexão externa. É o caminho mais seguro para amanhã:

```
docker run -d --name abrigo -e POSTGRES_PASSWORD=SUA_SENHA -p 5432:5432 postgres:16
```

### 2. Postgres gerenciado (Neon, Supabase, Railway) provavelmente NÃO serve

Esses serviços não dão superusuário, e o script precisa criar contas com `CREATEROLE`. Se o plano era nuvem,
teste **hoje** com uma dupla só, ou vá de Docker local.

### 3. O DBeaver baixa o driver do Postgres pela internet na primeira conexão

Se o laboratório bloquear o repositório Maven, **todas as máquinas falham ao mesmo tempo**. É a coisa mais
provável de consumir os 25 minutos de timebox.

Faça hoje: conecte em uma máquina, deixe baixar, e copie a pasta de drivers para as outras (ou para um pendrive).
No Windows ela fica em `%APPDATA%\DBeaverData\drivers`.

### 4. Python está instalado nas máquinas?

O bloco 2 inteiro depende disso, e é ele que fecha **UC06 Ind.2 e Ind.3**, que morrem neste trimestre.
Se não houver Python, o bloco 2 perde a medição e sobra só o Gerenciador de Tarefas.

### 5. Suba o limite de conexões

O padrão é 100. Quatorze duplas, com duas contas cada, e o DBeaver abrindo mais de uma conexão por
configuração, chega perto de 60. Cabe, mas sem folga. No Docker: acrescente `-c max_connections=200` ao comando.

---

## ARMADILHAS CONFIRMADAS EM TESTE

Rodei cada uma num Postgres 16 real. As três vão acontecer amanhã.

### A conta da dupla é dona das tabelas e NUNCA é barrada

Se o aluno testar a permissão usando `duplaNN`, **tudo vai funcionar** e ele vai concluir que o `GRANT` e o
`REVOKE` não fizeram nada. É a confusão número um do dia.

Já está avisado em destaque na ficha, mas **fale isso em voz alta antes de soltar a turma.**

### `DROP ROLE` falha se a conta já recebeu algum GRANT

```
ERROR:  role "estagiario_d03" cannot be dropped because some objects depend on it
DETAIL:  privileges for table animais
```

Vai acontecer com quem errar e quiser começar do zero. O caminho é `REVOKE ALL ON tabela FROM conta;`
e só depois `DROP ROLE conta;`. Já está no rodapé da ficha.

### Nomes de conta são do servidor inteiro, não do banco

Duas duplas não podem criar `estagiario_d03`. Se alguém digitar o número errado:

```
ERROR:  role "estagiario_d03" already exists
```

Recuperável, e é uma boa deixa para explicar que a conta pertence ao servidor, não ao banco.

---

## PAREAMENTO DA RODADA CRUZADA

Não deixe duas duplas com a **mesma ficha** conversarem entre si, senão a rodada perde o sentido.
Com 14 duplas e 8 fichas, distribua assim e pareie por coluna:

| Par | Dupla com ficha | conversa com |
|---|---|---|
| 1 | A (estagiário) | E (voluntário) |
| 2 | B (veterinária) | F (financeiro) |
| 3 | C (recepcionista) | G (site) |
| 4 | D (auditor) | H (coordenadora) |
| 5 | A (repetida) | F (repetida) |
| 6 | B (repetida) | G (repetida) |
| 7 | C (repetida) | H (repetida) |

---

## DIFICULDADE NÃO É UNIFORME

**As fichas D (auditor) e F (financeiro) exigem VIEW.** As outras seis se resolvem só com `GRANT`.
Numa turma bimodal isso é um degrau grande.

Duas saídas, escolha uma:
- entregue D e F para as duplas mais fortes, de propósito;
- ou aceite, nessas duas, a resposta escrita explicando que só `GRANT` não resolve, sem exigir a VIEW rodando.

**Não deixe no sorteio cego.** Uma dupla fraca com a ficha F vai travar e não entregar nada.

## SE O DBEAVER NÃO ROLAR PARA ALGUÉM

Quem cair no sqliteonline **não consegue capturar a mensagem de erro**, que é justamente a evidência central
da ficha. Para não penalizar por problema de máquina, aceite como evidência equivalente:

- os comandos escritos corretamente, **e**
- a explicação por escrito de por que a ferramenta recusou, **e**
- a defesa na rodada cruzada

Isso ainda dá **A** em UC08 Ind.4. O que não dá A é ficha sem execução e sem explicação.

## ONDE O TEMPO VAI ESTOURAR

O bloco 1 soma 2h45 num bloco de 3h. Se o DBeaver atrasar, **o que encolhe é a rodada cruzada, nunca a ficha**.
Se precisar cortar, faça a rodada com metade das duplas e complete no início de 27/08.
