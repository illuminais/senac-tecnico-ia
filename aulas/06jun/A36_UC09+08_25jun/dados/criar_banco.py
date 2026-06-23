"""
Cria o arquivo copa2026.db a partir dos CSVs da pasta dados/.
Rodar uma vez: python criar_banco.py
"""
import sqlite3
import csv
import os

DB = os.path.join(os.path.dirname(__file__), "copa2026.db")
DADOS = os.path.dirname(__file__)


def csv_rows(filename):
    path = os.path.join(DADOS, filename)
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        return list(reader), reader.fieldnames


def criar_banco():
    if os.path.exists(DB):
        os.remove(DB)

    con = sqlite3.connect(DB)
    cur = con.cursor()

    # selecoes
    cur.execute("""
        CREATE TABLE selecoes (
            id          INTEGER PRIMARY KEY,
            nome        TEXT NOT NULL,
            grupo       TEXT,
            confederacao TEXT,
            ranking_fifa INTEGER
        )
    """)
    rows, _ = csv_rows("copa2026_selecoes.csv")
    cur.executemany(
        "INSERT INTO selecoes VALUES (:id, :nome, :grupo, :confederacao, :ranking_fifa)",
        rows,
    )

    # historico
    cur.execute("""
        CREATE TABLE historico (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            selecao         TEXT,
            copa            INTEGER,
            fase_eliminada  TEXT,
            jogos           INTEGER,
            gols_pro        INTEGER,
            gols_contra     INTEGER,
            amarelos        INTEGER
        )
    """)
    rows, _ = csv_rows("copa2026_historico.csv")
    cur.executemany(
        """INSERT INTO historico
           (selecao, copa, fase_eliminada, jogos, gols_pro, gols_contra, amarelos)
           VALUES (:selecao, :copa, :fase_eliminada, :jogos, :gols_pro, :gols_contra, :amarelos)""",
        rows,
    )

    # partidas
    cur.execute("""
        CREATE TABLE partidas (
            id          INTEGER PRIMARY KEY,
            grupo       TEXT,
            time_casa   TEXT,
            time_fora   TEXT,
            gols_casa   INTEGER,
            gols_fora   INTEGER,
            data        TEXT,
            cidade      TEXT,
            estadio     TEXT,
            rodada      INTEGER
        )
    """)
    rows, _ = csv_rows("copa2026_partidas.csv")
    cur.executemany(
        """INSERT INTO partidas VALUES
           (:id, :grupo, :time_casa, :time_fora, :gols_casa, :gols_fora,
            :data, :cidade, :estadio, :rodada)""",
        rows,
    )

    # stats (copa 2026 - rodada 1)
    cur.execute("""
        CREATE TABLE stats (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            nome        TEXT,
            grupo       TEXT,
            jogos       INTEGER,
            vitorias    INTEGER,
            empates     INTEGER,
            derrotas    INTEGER,
            gols_pro    INTEGER,
            gols_contra INTEGER,
            saldo_gols  INTEGER,
            pontos      INTEGER,
            posse_media INTEGER,
            chutes      INTEGER,
            amarelos    INTEGER,
            vermelhos   INTEGER
        )
    """)
    rows, _ = csv_rows("copa2026_stats.csv")
    cur.executemany(
        """INSERT INTO stats
           (nome, grupo, jogos, vitorias, empates, derrotas, gols_pro, gols_contra,
            saldo_gols, pontos, posse_media, chutes, amarelos, vermelhos)
           VALUES (:nome, :grupo, :jogos, :vitorias, :empates, :derrotas, :gols_pro,
                   :gols_contra, :saldo_gols, :pontos, :posse_media, :chutes,
                   :amarelos, :vermelhos)""",
        rows,
    )

    # analise_estatistica (dataset enriquecido com chutes/faltas/posse - 2014/2018/2022)
    cur.execute("""
        CREATE TABLE analise_estatistica (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            selecao         TEXT,
            copa            INTEGER,
            fase_eliminada  TEXT,
            jogos           INTEGER,
            gols_pro        INTEGER,
            gols_contra     INTEGER,
            chutes          INTEGER,
            finalizacoes    INTEGER,
            faltas          INTEGER,
            posse_media     INTEGER,
            amarelos        INTEGER
        )
    """)
    rows, _ = csv_rows("copa_analise_estatistica.csv")
    cur.executemany(
        """INSERT INTO analise_estatistica
           (selecao, copa, fase_eliminada, jogos, gols_pro, gols_contra,
            chutes, finalizacoes, faltas, posse_media, amarelos)
           VALUES (:selecao, :copa, :fase_eliminada, :jogos, :gols_pro, :gols_contra,
                   :chutes, :finalizacoes, :faltas, :posse_media, :amarelos)""",
        rows,
    )

    con.commit()
    con.close()

    print(f"Banco criado: {DB}")
    print("Tabelas: selecoes | historico | partidas | stats | analise_estatistica")


if __name__ == "__main__":
    criar_banco()
