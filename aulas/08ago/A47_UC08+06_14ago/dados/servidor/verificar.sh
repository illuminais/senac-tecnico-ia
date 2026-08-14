#!/usr/bin/env bash
# Confere se o servidor subiu certo. Rode depois do `docker compose up -d`.
set -u
PORTA="${PGPORT:-5432}"
HOST="${PGHOST:-localhost}"
falhas=0

echo ""
echo "Conferindo o servidor do abrigo em $HOST:$PORTA"
echo "---------------------------------------------"

# 1. o servidor responde?
if ! PGPASSWORD="${POSTGRES_PASSWORD:-senac2026}" psql -h "$HOST" -p "$PORTA" -U postgres -tAc "select 1" >/dev/null 2>&1; then
  echo "FALHOU: o servidor nao respondeu. Veja: docker compose logs"
  exit 1
fi
echo "ok  servidor no ar"

# 2. os 16 bancos existem?
n=$(PGPASSWORD="${POSTGRES_PASSWORD:-senac2026}" psql -h "$HOST" -p "$PORTA" -U postgres -tAc \
    "SELECT count(*) FROM pg_database WHERE datname LIKE 'abrigo_d%'")
if [ "$n" = "16" ]; then echo "ok  16 bancos de grupo criados"; else echo "FALHOU: achei $n bancos, esperava 16"; falhas=1; fi

# 3. os dados vieram junto?
a=$(PGPASSWORD=abrigo01 psql -h "$HOST" -p "$PORTA" -U dupla01 -d abrigo_d01 -tAc "SELECT count(*) FROM animais" 2>/dev/null)
if [ "$a" = "27" ]; then echo "ok  27 animais no banco do grupo 01"; else echo "FALHOU: grupo 01 tem '$a' animais, esperava 27"; falhas=1; fi

# 4. o ciclo que a aula inteira depende: criar conta, dar acesso, e ser barrado
PGPASSWORD=abrigo16 psql -q -h "$HOST" -p "$PORTA" -U dupla16 -d abrigo_d16 >/dev/null 2>&1 <<SQL
DROP ROLE IF EXISTS smoke_d16;
CREATE ROLE smoke_d16 LOGIN PASSWORD 'smoke';
GRANT SELECT ON animais TO smoke_d16;
SQL
ok1=$(PGPASSWORD=smoke psql -h "$HOST" -p "$PORTA" -U smoke_d16 -d abrigo_d16 -tAc "SELECT count(*) FROM animais" 2>/dev/null)
neg=$(PGPASSWORD=smoke psql -h "$HOST" -p "$PORTA" -U smoke_d16 -d abrigo_d16 -c "SELECT * FROM adotantes" 2>&1 | grep -c "permission denied")
PGPASSWORD=abrigo16 psql -q -h "$HOST" -p "$PORTA" -U dupla16 -d abrigo_d16 -c "REVOKE ALL ON animais FROM smoke_d16; DROP ROLE smoke_d16;" >/dev/null 2>&1

if [ "$ok1" = "27" ]; then echo "ok  conta criada por um grupo consegue ler o que recebeu"; else echo "FALHOU: a conta nova nao leu animais"; falhas=1; fi
if [ "$neg" = "1" ]; then echo "ok  conta nova e BARRADA na tabela com CPF"; else echo "FALHOU: a conta nova nao foi barrada em adotantes"; falhas=1; fi

echo "---------------------------------------------"
if [ "$falhas" = "0" ]; then
  echo "TUDO CERTO. Escreva no quadro:"
  echo ""
  ip=$(hostname -I 2>/dev/null | awk '{print $1}')
  echo "   Host:     ${ip:-SEU_IP}"
  echo "   Porta:    $PORTA"
  echo "   Database: abrigo_dNN     (NN = numero do grupo, dois digitos)"
  echo "   Usuario:  duplaNN"
  echo "   Senha:    abrigoNN"
  echo ""
else
  echo "Teve falha acima. Nao comece a aula sem resolver."
  exit 1
fi
