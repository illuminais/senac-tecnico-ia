#!/usr/bin/env bash
# Devolve UM aluno ao estado inicial, sem mexer em ninguém mais.
#
#   ./resetar.sh 07          reseta o aluno 07
#   ./resetar.sh 07 12 15    reseta vários
#
# Para cada aluno: derruba as conexões dele, apaga os bancos que ele criou
# (inclusive o de restore do backup), apaga as contas que ele criou no
# Indicador 4 e recria o dengue_NN a partir do modelo. A senha dele não muda.
set -u
[ $# -ge 1 ] || { echo "uso: ./resetar.sh NN [NN ...]"; exit 1; }
adm() { docker exec -i dengue psql -U postgres -v ON_ERROR_STOP=1 -qtA "$@"; }

for arg in "$@"; do
  nn=$(printf '%02d' "$((10#$arg))")
  aluno="aluno$nn"
  if [ "$(adm -c "SELECT count(*) FROM pg_roles WHERE rolname='$aluno'")" != "1" ]; then
    echo "FALHOU: não existe a conta $aluno"; continue
  fi

  # contas que o aluno criou (no Postgres 16 quem cria ganha ADMIN sobre a conta)
  criadas=$(adm -c "SELECT r.rolname FROM pg_auth_members m
                    JOIN pg_roles r ON r.oid = m.roleid
                    JOIN pg_roles a ON a.oid = m.member
                    WHERE a.rolname = '$aluno' AND m.admin_option")
  # bancos do aluno: o dengue_NN e qualquer outro que ele tenha criado
  bancos=$(adm -c "SELECT datname FROM pg_database d JOIN pg_roles r ON r.oid = d.datdba
                   WHERE r.rolname = '$aluno'")

  adm -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity
          WHERE usename = '$aluno' OR usename IN (SELECT r.rolname FROM pg_auth_members m
            JOIN pg_roles r ON r.oid = m.roleid JOIN pg_roles a ON a.oid = m.member
            WHERE a.rolname = '$aluno' AND m.admin_option)
          OR datname IN (SELECT datname FROM pg_database d JOIN pg_roles r ON r.oid = d.datdba
            WHERE r.rolname = '$aluno')" >/dev/null

  for b in $bancos; do adm -c "DROP DATABASE \"$b\"" || { echo "FALHOU: não apaguei $b"; continue 2; }; done
  for c in $criadas; do adm -c "DROP OWNED BY \"$c\"; DROP ROLE \"$c\"" 2>/dev/null || echo "aviso: não apaguei a conta $c"; done

  adm -c "CREATE DATABASE dengue_$nn TEMPLATE dengue_modelo OWNER $aluno" &&
  adm -d "dengue_$nn" -c "ALTER TABLE municipios OWNER TO $aluno; ALTER TABLE casos_dengue OWNER TO $aluno;" &&
  echo "ok  $aluno de volta ao início (apaguei bancos: ${bancos//$'\n'/, }${criadas:+ · contas: ${criadas//$'\n'/, }})"
done
