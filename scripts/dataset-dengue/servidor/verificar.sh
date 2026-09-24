#!/usr/bin/env bash
# Confere o servidor de dengue. Rode depois do `docker compose up -d`.
# Tudo roda DENTRO do container (docker exec): não depende do psql nem do
# pg_dump da sua máquina, que podem ser de outra versão.
set -u
cd "$(dirname "$0")"
source ./esperado.env
PORTA="${PGPORT:-5432}"
falhas=0

# como o aluno NN, pela rede (-h localhost), igual ao DBeaver dele
# Os testes que criam e apagam coisas usam o aluno 32, uma das contas de folga.
sql() { local n=$1 db=$2; shift 2
  docker exec -i -e PGPASSWORD="dengue$n" dengue psql -h localhost -U "aluno$n" -d "$db" -v ON_ERROR_STOP=1 -tA "$@"; }
adm() { docker exec -i dengue psql -U postgres -tA "$@"; }
ok()    { echo "ok  $1"; }
falha() { echo "FALHOU: $1"; falhas=1; }

echo ""
echo "Conferindo o servidor de dengue (container 'dengue', porta $PORTA)"
echo "-----------------------------------------------------------------"

# 1. servidor no ar e carga terminada
# Na primeira subida o Postgres carrega tudo sem aceitar TCP e depois reinicia.
# Espera até ele responder PELA REDE, que é como o DBeaver chega.
for i in $(seq 1 90); do
  docker exec dengue pg_isready -h localhost -U postgres >/dev/null 2>&1 &&
    [ "$(adm -c "SELECT count(*) FROM pg_database WHERE datname ~ '^dengue_[0-9]+$'" 2>/dev/null)" = "$ALUNOS" ] && break
  [ "$i" = 1 ] && echo "... esperando a carga terminar (na primeira vez leva até 1 minuto)"
  sleep 2
done
if ! docker exec dengue pg_isready -h localhost -U postgres >/dev/null 2>&1; then
  echo "FALHOU: o container não respondeu. Veja: docker compose logs"; exit 1
fi
ok "servidor no ar ($(adm -c 'show server_version' | cut -d' ' -f1))"

n=$(adm -c "SELECT count(*) FROM pg_database WHERE datname ~ '^dengue_[0-9]+$'")
[ "$n" = "$ALUNOS" ] && ok "$ALUNOS bancos dengue_NN criados" || falha "achei $n bancos, esperava $ALUNOS (a carga ainda está rodando? docker compose logs -f)"

# 2. Indicador 5: os números batem com a planilha
[ "$(sql 01 dengue_01 -c 'SELECT count(*) FROM casos_dengue')" = "$LINHAS" ] && ok "$LINHAS linhas em casos_dengue (aluno 01)" || falha "casos_dengue não tem $LINHAS linhas"
[ "$(sql 01 dengue_01 -c 'SELECT count(*) FROM municipios')" = "$MUNICIPIOS" ] && ok "$MUNICIPIOS municípios" || falha "municipios não tem $MUNICIPIOS linhas"
t=$(sql 01 dengue_01 -c "SELECT string_agg(total::text, ',' ORDER BY ano) FROM (SELECT ano, SUM(casos) total FROM casos_dengue GROUP BY ano) x")
[ "$t" = "$TOTAL_2024,$TOTAL_2025" ] && ok "GROUP BY ano: 2024=$TOTAL_2024, 2025=$TOTAL_2025" || falha "totais por ano deram $t"
l=$(sql 01 dengue_01 -c "SELECT SUM(casos) FROM casos_dengue WHERE municipio='Londrina' AND ano=2025")
[ "$l" = "$LONDRINA_2025" ] && ok "WHERE Londrina 2025 = $LONDRINA_2025" || falha "Londrina 2025 deu $l"
j=$(sql 01 dengue_01 -c "SELECT count(*) FROM casos_dengue c JOIN municipios m USING (codigo_ibge)")
[ "$j" = "$LINHAS" ] && ok "JOIN com municipios casa as $LINHAS linhas" || falha "JOIN devolveu $j linhas"

# 3. Indicador 4: o aluno cria conta, dá SELECT numa VIEW e a conta é barrada na tabela
sql 32 dengue_32 -q >/dev/null 2>&1 <<SQL
DROP VIEW IF EXISTS smoke_resumo;
DROP ROLE IF EXISTS smoke_32;
CREATE VIEW smoke_resumo AS SELECT municipio, ano, SUM(casos) AS total FROM casos_dengue GROUP BY municipio, ano;
CREATE ROLE smoke_32 LOGIN PASSWORD 'smoke';
GRANT SELECT ON smoke_resumo TO smoke_32;
SQL
v=$(docker exec -e PGPASSWORD=smoke dengue psql -h localhost -U smoke_32 -d dengue_32 -tAc "SELECT count(*) FROM smoke_resumo" 2>/dev/null)
neg=$(docker exec -e PGPASSWORD=smoke dengue psql -h localhost -U smoke_32 -d dengue_32 -c "SELECT * FROM casos_dengue" 2>&1 | grep -c "permission denied")
[ "$v" = "34" ] && ok "conta criada pelo aluno lê a VIEW (34 linhas)" || falha "conta nova não leu a VIEW (veio '$v')"
[ "$neg" = "1" ] && ok "conta nova é BARRADA na tabela casos_dengue" || falha "conta nova não foi barrada na tabela"

# 4. Indicador 6: o aluno faz backup do próprio banco e restaura num banco novo
docker exec -e PGPASSWORD=dengue32 dengue sh -c '
  pg_dump -h localhost -U aluno32 -d dengue_32 -Fc -f /tmp/smoke.dump &&
  dropdb   -h localhost -U aluno32 --if-exists smoke_restaurado &&
  createdb -h localhost -U aluno32 smoke_restaurado &&
  pg_restore -h localhost -U aluno32 -d smoke_restaurado /tmp/smoke.dump' >/dev/null 2>&1
r=$(sql 32 smoke_restaurado -c "SELECT count(*) FROM casos_dengue" 2>/dev/null)
[ "$r" = "$LINHAS" ] && ok "backup e restore pelo próprio aluno: $LINHAS linhas de volta" || falha "restore do aluno 32 veio com '$r' linhas"

# limpeza: nada de smoke sobra para a aula
docker exec -e PGPASSWORD=dengue32 dengue dropdb -h localhost -U aluno32 --if-exists smoke_restaurado >/dev/null 2>&1
docker exec dengue rm -f /tmp/smoke.dump
sql 32 dengue_32 -q -c "REVOKE ALL ON smoke_resumo FROM smoke_32; DROP VIEW smoke_resumo; DROP ROLE smoke_32;" >/dev/null 2>&1
sobra=$(adm -c "SELECT count(*) FROM pg_roles WHERE rolname LIKE 'smoke%'")
[ "$sobra" = "0" ] && ok "teste limpo, banco do aluno 32 como novo" || falha "sobrou conta smoke no servidor"

echo "-----------------------------------------------------------------"
if [ "$falhas" = "0" ]; then
  ip=$(ip -4 route get 1.1.1.1 2>/dev/null | awk '{for(i=1;i<NF;i++) if($i=="src") print $(i+1)}')
  [ -z "$ip" ] && ip=$(hostname -I 2>/dev/null | awk '{print $1}')
  echo "TUDO CERTO. Escreva no quadro:"
  echo ""
  echo "   Host:     ${ip:-SEU_IP}"
  echo "   Porta:    $PORTA"
  echo "   Database: dengue_NN      (NN = seu número da chamada, dois dígitos)"
  echo "   Usuário:  alunoNN"
  echo "   Senha:    dengueNN"
  echo ""
else
  echo "Teve falha acima. Não comece a aula sem resolver."
  exit 1
fi
