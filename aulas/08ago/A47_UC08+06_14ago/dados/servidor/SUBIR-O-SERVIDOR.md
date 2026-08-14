# Subir o servidor do abrigo — A47, 14/08/2026

## O caminho curto

```bash
cd dados/servidor
docker compose up -d
./verificar.sh
```

Pronto. O `verificar.sh` confere tudo e imprime, no fim, exatamente o que vai no quadro.

A primeira subida demora uns 30 segundos porque ele semeia os 16 bancos. As próximas são instantâneas.

## O que sobe

- Postgres 16, com `max_connections=200`
- **16 grupos**: contas `dupla01` a `dupla16`, senhas `abrigo01` a `abrigo16`
- **16 bancos**: `abrigo_d01` a `abrigo_d16`, cada um com seu grupo como dono
- As 3 tabelas em cada banco: `animais` (27 linhas), `adotantes` (8, com CPF) e `adocoes` (8)

São 16 para 14 grupos porque sobra folga se você precisar reagrupar na hora.

## Comandos que você vai querer

| O que | Comando |
|---|---|
| Subir | `docker compose up -d` |
| Ver se semeou | `docker compose logs -f` |
| Conferir tudo | `./verificar.sh` |
| Desligar guardando os dados | `docker compose down` |
| **Zerar e recomeçar** | `docker compose down -v && docker compose up -d` |
| Porta 5432 ocupada | `PGPORT=5433 docker compose up -d` |

> A carga inicial só roda com o volume vazio. Se você mexer no SQL depois de já ter subido,
> precisa do `down -v`, senão a mudança não entra.

---

## Como eles chegam no servidor

### Plano A: IP da sua máquina (é o preferido)

```bash
hostname -I    # o primeiro endereço é o que vai no quadro
```

No DBeaver deles: Host o seu IP, Port `5432`, Database `abrigo_dNN`, User `duplaNN`, Password `abrigoNN`.

Não depende de internet, não tem limite de conexão, e o endereço não muda no meio da aula.

### O teste que decide, e leva dois minutos

De **outra** máquina do laboratório, não da sua:

```bash
psql -h SEU_IP -U dupla01 -d abrigo_d01
```

Sem psql lá, no PowerShell: `Test-NetConnection SEU_IP -Port 5432`

Conectou, acabou, é plano A. Deu timeout, é isolamento de rede e vai para o plano B.

### Plano B: ngrok, só se a rede isolar

Prenda o Postgres no localhost e deixe o túnel expor:

```bash
PGBIND=127.0.0.1 docker compose up -d    # ou edite a porta no compose
ngrok tcp 5432
```

O ngrok devolve algo como `tcp://0.tcp.ngrok.io:14829`. No DBeaver: Host `0.tcp.ngrok.io`, Port `14829`.

Três ressalvas:

1. **O endereço muda a cada reinício do ngrok.** Se cair no meio da aula, os 14 grupos reconfiguram tudo. Suba antes e não mexa.
2. **Tem limite de conexões no plano grátis.** Teste hoje com **duas ou três máquinas ao mesmo tempo**, não com uma só, senão você não descobre o teto.
3. **Isso põe um Postgres na internet pública.** Para três horas com dado fake, tudo bem, mas troque as senhas por algo menos óbvio e derrube o túnel no fim.

### Plano C: rodar numa máquina do próprio laboratório

Se os dois falharem, suba o compose numa máquina de lá. Aí todo mundo está na mesma rede por definição.
Precisa de Docker instalado nela, que é o mesmo obstáculo de administrador do DBeaver.

---

## No quadro, para os alunos

```
Host:     ___________________
Porta:    5432
Database: abrigo_dNN
Usuario:  duplaNN
Senha:    abrigoNN

NN = numero do seu grupo, com dois digitos.
Grupo 3 usa abrigo_d03, dupla03, abrigo03.
```

## Antes de sair de casa

- [ ] `docker compose up -d` e `./verificar.sh` passando
- [ ] IP anotado, testado de outra máquina
- [ ] Suspensão automática da sua máquina **desligada** (se ela dormir, o banco cai no meio da aula)
- [ ] Driver do Postgres já baixado no DBeaver de pelo menos uma máquina do laboratório
- [ ] Python conferido nas máquinas (o bloco 2 depende dele)
