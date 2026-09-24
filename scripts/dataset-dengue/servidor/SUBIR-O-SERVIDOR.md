# Subir o servidor de dengue: épico 2, Banco de Dados (A59 a A63)

Mesmo esquema da A47 (`aulas/08ago/A47_UC08+06_14ago/dados/servidor/`): Postgres 16 em Docker na sua máquina, e os alunos entram pelo DBeaver via TCP. O que muda é o dado: o `dengue_pr_limpo.xlsx` que a turma limpou em Fundamentos de Computação.

## O caminho curto

```bash
cd scripts/dataset-dengue/servidor
docker stop abrigo          # o abrigo da A47 ocupa a 5432 (os dados dele ficam guardados)
docker compose up -d
./verificar.sh
```

O `verificar.sh` roda tudo dentro do container e espera a carga terminar (na primeira subida leva até 1 minuto). Ele confere os números contra a planilha e testa, como se fosse um aluno, os três indicadores: consulta, criar conta com `GRANT` numa VIEW, e backup com restore. No fim imprime o que vai no quadro. Os testes que criam e apagam coisas usam a conta de folga `aluno32` e limpam tudo depois, então dá para rodar com a turma já conectada.

Para manter os dois servidores de pé ao mesmo tempo: `PGPORT=5433 docker compose up -d` e `PGPORT=5433 ./verificar.sh`. Aí a porta no quadro é 5433.

## O que sobe

- Postgres 16, `max_connections=200`
- **Um banco por aluno, não por dupla** (decisão de 23/09). No banco compartilhado da A47, um mexia e o outro ficava travado sem saber por quê, e a aula virava sessão de depuração.
- **32 contas**: `aluno01` a `aluno32`, senhas `dengue01` a `dengue32`. **NN é o número da chamada**: são 30 alunos, e 31 e 32 ficam de folga (o `verificar.sh` usa a 32). As contas têm `CREATEROLE` e `CREATEDB`, sem superusuário.
- **32 bancos** `dengue_01` a `dengue_32`. Cada aluno é dono do seu. Consegue ver os nomes das tabelas dos outros, mas leva `permission denied` se tentar ler ou alterar.
- Duas tabelas em cada banco:

| Tabela | Linhas | Colunas | Para quê |
|---|---|---|---|
| `casos_dengue` | 408 | `codigo_ibge`, `municipio`, `macrorregional`, `ano`, `mes`, `data_referencia`, `casos` | A59: `WHERE`, `GROUP BY` e `ORDER BY` numa tabela só, sem JOIN |
| `municipios` | 17 | `codigo_ibge` (PK), `municipio`, `macrorregional`, `populacao` | A60: a população só existe aqui, então casos por 100 mil exige `JOIN` |

A `casos_dengue` repete `municipio` e `macrorregional` de propósito, igual à planilha, para a primeira aula não depender de JOIN. Se quiser uma tabela normalizada, é só mudar o `banco.py`.

**Números de conferência** (em `esperado.env`, os mesmos do `dengue_pr_comparado.xlsx`): 2024 = 385.520 casos · 2025 = 126.732 · Londrina 2025 = 32.804.

## Comandos que você vai querer

| O que | Comando |
|---|---|
| Subir | `docker compose up -d` |
| Conferir tudo | `./verificar.sh` |
| **Aluno enrolado: devolver só o banco dele ao início** | `./resetar.sh 07` (vários: `./resetar.sh 07 12 15`) |
| Desligar guardando o que os alunos fizeram | `docker compose down` |
| **Zerar a turma inteira** (apaga o trabalho de todos) | `docker compose down -v && docker compose up -d` |
| Mudou o dado ou o esquema | `venv/bin/python scripts/dataset-dengue/banco.py` (na raiz do repo), depois zerar |
| Abrir um psql como administrador | `docker exec -it dengue psql -U postgres` |

> O `name: dengue` no compose é obrigatório. Sem ele, este projeto e o do abrigo (as duas pastas se chamam `servidor`) viram o mesmo projeto para o Compose, e um `down` derruba o outro.

## Como eles chegam no servidor

O plano A é o IP da sua máquina, e o `verificar.sh` já imprime ele. O teste que decide é conectar **de outra máquina do laboratório**: `Test-NetConnection SEU_IP -Port 5432` no PowerShell. Deu timeout, é isolamento de rede: plano B com `PGBIND=127.0.0.1 docker compose up -d` + `ngrok tcp 5432`. Os detalhes e as ressalvas do ngrok estão no `SUBIR-O-SERVIDOR.md` da A47.

## ⚠️ Antes da A61 (backup, Indicador 6)

No servidor, o ciclo `pg_dump` → banco novo → `pg_restore` feito pelo próprio aluno funciona (o `verificar.sh` testa). No **DBeaver do aluno**, o backup chama o `pg_dump` **da máquina do aluno**:

- se ele for **anterior ao 16**, o backup é recusado (o `pg_dump` não faz backup de um servidor mais novo que ele);
- se for mais novo (17 ou 18), funciona, mas o restore mostra um erro de `transaction_timeout` que assusta. Os dados voltam mesmo assim.

**Conferir num PC do laboratório:** DBeaver → clique direito no banco → Tools → Backup → ver qual "Local client" ele usa.

E o `pg_dump` de um banco **não leva as contas**. Se o aluno criou a `robo_ia`, fez o backup e restaurou em outro servidor, o `GRANT` falha com `role "robo_ia" does not exist`. Isso é conteúdo, não bug (ver `contextos/pesquisa-uc08-t3.md`).

## Aluno enrolado: `resetar.sh`

Em vez de depurar o banco de um aluno no meio da aula, rode `./resetar.sh NN`. Para aquele aluno só:
- derruba as conexões dele;
- apaga os bancos que ele criou, inclusive o do restore do backup;
- apaga as contas que ele criou no Indicador 4;
- recria o `dengue_NN` igual ao do primeiro dia.

A senha dele não muda e ninguém mais é afetado. Testado em 23/09: o aluno apagou linhas, criou VIEW, conta e banco extra, e tudo voltou com as 408 linhas.

## Cuidado com nome de conta

As contas (`CREATE ROLE`) valem **no servidor inteiro**, não num banco só. Se dois alunos criarem `robo_ia`, o segundo dá erro de conta já existente. Peça o número da chamada no nome: `robo_ia_07`.

## No quadro, para os alunos

```
Host:     ___________________
Porta:    5432
Database: dengue_NN
Usuário:  alunoNN
Senha:    dengueNN

NN = seu número da chamada, com dois dígitos.
O número 3 usa dengue_03, aluno03, dengue03.
```

## Antes de sair de casa

- [ ] `docker stop abrigo`, `docker compose up -d` e `./verificar.sh` passando
- [ ] IP testado de outra máquina
- [ ] Lista da chamada com os números, para quem não souber o seu
- [ ] Suspensão automática da sua máquina **desligada** (se ela dormir, o banco cai no meio da aula)
