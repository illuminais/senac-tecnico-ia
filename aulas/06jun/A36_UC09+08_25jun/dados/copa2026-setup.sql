-- Copa do Mundo 2026 — Banco de Dados para Aula
-- Cole este arquivo no sqliteonline.com e clique em Run
-- =====================================================

-- Tabela: selecoes
DROP TABLE IF EXISTS selecoes;
CREATE TABLE selecoes (
    id           INTEGER PRIMARY KEY,
    nome         TEXT NOT NULL,
    grupo        TEXT,
    confederacao TEXT,
    ranking_fifa INTEGER
);

INSERT INTO selecoes VALUES
(1,  'Brasil',            'C', 'CONMEBOL',  5),
(2,  'Marrocos',          'C', 'CAF',       14),
(3,  'Escocia',           'C', 'UEFA',      39),
(4,  'Haiti',             'C', 'CONCACAF',  83),
(5,  'Mexico',            'A', 'CONCACAF',  17),
(6,  'Africa do Sul',     'A', 'CAF',       59),
(7,  'Coreia do Sul',     'A', 'AFC',       23),
(8,  'Tchequia',          'A', 'UEFA',      37),
(9,  'Canada',            'B', 'CONCACAF',  48),
(10, 'Bosnia-Herzegovina','B', 'UEFA',      58),
(11, 'Catar',             'B', 'AFC',       38),
(12, 'Suica',             'B', 'UEFA',      19),
(13, 'EUA',               'D', 'CONCACAF',  13),
(14, 'Australia',         'D', 'AFC',       25),
(15, 'Paraguai',          'D', 'CONMEBOL',  62),
(16, 'Turquia',           'D', 'UEFA',      29),
(17, 'Franca',            'I', 'UEFA',       2),
(18, 'Senegal',           'I', 'CAF',       21),
(19, 'Noruega',           'I', 'UEFA',      31),
(20, 'Iraque',            'I', 'AFC',       67),
(21, 'Argentina',         'J', 'CONMEBOL',   1),
(22, 'Argelia',           'J', 'CAF',       42),
(23, 'Austria',           'J', 'UEFA',      26),
(24, 'Jordania',          'J', 'AFC',       87),
(25, 'Japao',             'K', 'AFC',       17);

-- Tabela: partidas
DROP TABLE IF EXISTS partidas;
CREATE TABLE partidas (
    id        INTEGER PRIMARY KEY,
    grupo     TEXT,
    time_casa TEXT,
    time_fora TEXT,
    gols_casa INTEGER,
    gols_fora INTEGER,
    data      TEXT,
    cidade    TEXT,
    estadio   TEXT,
    rodada    INTEGER
);

INSERT INTO partidas VALUES
(1,  'A', 'Mexico',       'Africa do Sul',     2, 0, '2026-06-11', 'Cidade do Mexico', 'Estadio Azteca',          1),
(2,  'A', 'Coreia do Sul','Tchequia',           2, 1, '2026-06-11', 'Dallas',           'AT&T Stadium',            1),
(3,  'B', 'Canada',       'Bosnia-Herzegovina', 1, 1, '2026-06-13', 'Toronto',          'BMO Field',               1),
(4,  'B', 'Catar',        'Suica',              1, 1, '2026-06-12', 'Vancouver',        'BC Place',                1),
(5,  'C', 'Haiti',        'Escocia',            0, 1, '2026-06-13', 'Atlanta',          'Mercedes-Benz Stadium',   1),
(6,  'C', 'Brasil',       'Marrocos',           1, 1, '2026-06-13', 'Philadelphia',     'Lincoln Financial Field',  1),
(7,  'D', 'Australia',    'Turquia',            2, 0, '2026-06-12', 'Kansas City',      'Arrowhead Stadium',       1),
(8,  'D', 'EUA',          'Paraguai',           4, 1, '2026-06-12', 'Los Angeles',      'SoFi Stadium',            1),
(9,  'I', 'Franca',       'Senegal',            3, 1, '2026-06-14', 'Miami',            'Hard Rock Stadium',       1),
(10, 'I', 'Noruega',      'Iraque',             4, 1, '2026-06-14', 'Seattle',          'Lumen Field',             1),
(11, 'J', 'Argentina',    'Argelia',            3, 0, '2026-06-15', 'Nova York',        'MetLife Stadium',         1),
(12, 'J', 'Austria',      'Jordania',           3, 1, '2026-06-15', 'Houston',          'NRG Stadium',             1);

-- Tabela: stats (classificacao do grupo)
DROP TABLE IF EXISTS stats;
CREATE TABLE stats (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    nome         TEXT,
    grupo        TEXT,
    jogos        INTEGER,
    vitorias     INTEGER,
    empates      INTEGER,
    derrotas     INTEGER,
    gols_pro     INTEGER,
    gols_contra  INTEGER,
    saldo_gols   INTEGER,
    pontos       INTEGER,
    posse_media  INTEGER,
    chutes       INTEGER,
    amarelos     INTEGER,
    vermelhos    INTEGER
);

INSERT INTO stats (nome, grupo, jogos, vitorias, empates, derrotas, gols_pro, gols_contra, saldo_gols, pontos, posse_media, chutes, amarelos, vermelhos) VALUES
('Brasil',            'C', 1, 0, 1, 0, 1, 1,  0, 1, 62, 14, 1, 0),
('Marrocos',          'C', 1, 0, 1, 0, 1, 1,  0, 1, 38,  8, 2, 0),
('Escocia',           'C', 1, 1, 0, 0, 1, 0,  1, 3, 44,  9, 1, 0),
('Haiti',             'C', 1, 0, 0, 1, 0, 1, -1, 0, 56,  7, 3, 0),
('Mexico',            'A', 1, 1, 0, 0, 2, 0,  2, 3, 58, 16, 0, 0),
('Africa do Sul',     'A', 1, 0, 0, 1, 0, 2, -2, 0, 42,  6, 2, 0),
('Coreia do Sul',     'A', 1, 1, 0, 0, 2, 1,  1, 3, 52, 13, 1, 0),
('Tchequia',          'A', 1, 0, 0, 1, 1, 2, -1, 0, 48, 10, 2, 0),
('Canada',            'B', 1, 0, 1, 0, 1, 1,  0, 1, 55, 11, 1, 0),
('Bosnia-Herzegovina','B', 1, 0, 1, 0, 1, 1,  0, 1, 45,  8, 2, 0),
('Catar',             'B', 1, 0, 1, 0, 1, 1,  0, 1, 41,  7, 1, 0),
('Suica',             'B', 1, 0, 1, 0, 1, 1,  0, 1, 59, 13, 0, 0),
('EUA',               'D', 1, 1, 0, 0, 4, 1,  3, 3, 63, 19, 0, 0),
('Australia',         'D', 1, 1, 0, 0, 2, 0,  2, 3, 47, 12, 1, 0),
('Paraguai',          'D', 1, 0, 0, 1, 1, 4, -3, 0, 37,  8, 3, 0),
('Turquia',           'D', 1, 0, 0, 1, 0, 2, -2, 0, 53, 11, 2, 0),
('Franca',            'I', 1, 1, 0, 0, 3, 1,  2, 3, 67, 18, 0, 0),
('Noruega',           'I', 1, 1, 0, 0, 4, 1,  3, 3, 49, 17, 1, 0),
('Senegal',           'I', 1, 0, 0, 1, 1, 3, -2, 0, 33,  9, 2, 0),
('Iraque',            'I', 1, 0, 0, 1, 1, 4, -3, 0, 51,  8, 3, 0),
('Argentina',         'J', 1, 1, 0, 0, 3, 0,  3, 3, 61, 16, 0, 0),
('Austria',           'J', 1, 1, 0, 0, 3, 1,  2, 3, 54, 14, 1, 0),
('Argelia',           'J', 1, 0, 0, 1, 0, 3, -3, 0, 39,  7, 2, 0),
('Jordania',          'J', 1, 0, 0, 1, 1, 3, -2, 0, 46,  8, 3, 0),
('Japao',             'K', 1, 1, 0, 0, 2, 0,  2, 3, 38,  9, 1, 0);

-- Tabela: historico (copas anteriores)
DROP TABLE IF EXISTS historico;
CREATE TABLE historico (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    selecao        TEXT,
    copa           INTEGER,
    fase_eliminada TEXT,
    jogos          INTEGER,
    gols_pro       INTEGER,
    gols_contra    INTEGER,
    amarelos       INTEGER
);

INSERT INTO historico (selecao, copa, fase_eliminada, jogos, gols_pro, gols_contra, amarelos) VALUES
('Brasil',            2014, 'semi',           7, 11, 14, 11),
('Brasil',            2018, 'quartas',         5,  8,  3,  6),
('Brasil',            2022, 'quartas',         5,  8,  3,  5),
('Marrocos',          2014, 'nao_classificou', 0,  0,  0,  0),
('Marrocos',          2018, 'grupo',           3,  2,  4,  4),
('Marrocos',          2022, 'semi',            6,  6,  5,  9),
('Escocia',           2014, 'nao_classificou', 0,  0,  0,  0),
('Escocia',           2018, 'nao_classificou', 0,  0,  0,  0),
('Escocia',           2022, 'nao_classificou', 0,  0,  0,  0),
('Haiti',             2014, 'nao_classificou', 0,  0,  0,  0),
('Haiti',             2018, 'nao_classificou', 0,  0,  0,  0),
('Haiti',             2022, 'nao_classificou', 0,  0,  0,  0),
('Mexico',            2014, 'oitavas',         4,  5,  4,  7),
('Mexico',            2018, 'oitavas',         4,  3,  6,  8),
('Mexico',            2022, 'grupo',           3,  2,  3,  4),
('Africa do Sul',     2014, 'nao_classificou', 0,  0,  0,  0),
('Africa do Sul',     2018, 'nao_classificou', 0,  0,  0,  0),
('Africa do Sul',     2022, 'nao_classificou', 0,  0,  0,  0),
('Coreia do Sul',     2014, 'grupo',           3,  2,  4,  5),
('Coreia do Sul',     2018, 'grupo',           3,  3,  3,  4),
('Coreia do Sul',     2022, 'oitavas',         4,  5,  6,  6),
('Tchequia',          2014, 'nao_classificou', 0,  0,  0,  0),
('Tchequia',          2018, 'nao_classificou', 0,  0,  0,  0),
('Tchequia',          2022, 'nao_classificou', 0,  0,  0,  0),
('Canada',            2014, 'nao_classificou', 0,  0,  0,  0),
('Canada',            2018, 'nao_classificou', 0,  0,  0,  0),
('Canada',            2022, 'grupo',           3,  2,  4,  5),
('Bosnia-Herzegovina',2014, 'grupo',           3,  4,  4,  3),
('Bosnia-Herzegovina',2018, 'nao_classificou', 0,  0,  0,  0),
('Bosnia-Herzegovina',2022, 'nao_classificou', 0,  0,  0,  0),
('Catar',             2014, 'nao_classificou', 0,  0,  0,  0),
('Catar',             2018, 'nao_classificou', 0,  0,  0,  0),
('Catar',             2022, 'grupo',           3,  1,  7,  3),
('Suica',             2014, 'oitavas',         4,  7,  6,  7),
('Suica',             2018, 'oitavas',         4,  6,  3,  6),
('Suica',             2022, 'oitavas',         4,  5,  9,  6),
('EUA',               2014, 'oitavas',         4,  5,  6,  6),
('EUA',               2018, 'nao_classificou', 0,  0,  0,  0),
('EUA',               2022, 'oitavas',         4,  3,  4,  5),
('Australia',         2014, 'grupo',           3,  3,  6,  5),
('Australia',         2018, 'grupo',           3,  2,  5,  3),
('Australia',         2022, 'oitavas',         4,  7,  6,  5),
('Paraguai',          2014, 'nao_classificou', 0,  0,  0,  0),
('Paraguai',          2018, 'nao_classificou', 0,  0,  0,  0),
('Paraguai',          2022, 'nao_classificou', 0,  0,  0,  0),
('Turquia',           2014, 'nao_classificou', 0,  0,  0,  0),
('Turquia',           2018, 'nao_classificou', 0,  0,  0,  0),
('Turquia',           2022, 'nao_classificou', 0,  0,  0,  0),
('Franca',            2014, 'quartas',         5, 10,  3,  8),
('Franca',            2018, 'campeao',         7, 12,  6,  9),
('Franca',            2022, 'vice',            7, 16,  8,  7),
('Senegal',           2014, 'nao_classificou', 0,  0,  0,  0),
('Senegal',           2018, 'grupo',           3,  4,  4,  6),
('Senegal',           2022, 'oitavas',         4,  4,  3,  7),
('Noruega',           2014, 'nao_classificou', 0,  0,  0,  0),
('Noruega',           2018, 'nao_classificou', 0,  0,  0,  0),
('Noruega',           2022, 'nao_classificou', 0,  0,  0,  0),
('Iraque',            2014, 'nao_classificou', 0,  0,  0,  0),
('Iraque',            2018, 'nao_classificou', 0,  0,  0,  0),
('Iraque',            2022, 'nao_classificou', 0,  0,  0,  0),
('Argentina',         2014, 'vice',            7,  8,  4,  9),
('Argentina',         2018, 'oitavas',         4,  6,  9,  6),
('Argentina',         2022, 'campeao',         7, 15,  8,  7),
('Argelia',           2014, 'oitavas',         4,  7,  6,  7),
('Argelia',           2018, 'nao_classificou', 0,  0,  0,  0),
('Argelia',           2022, 'nao_classificou', 0,  0,  0,  0),
('Austria',           2014, 'nao_classificou', 0,  0,  0,  0),
('Austria',           2018, 'nao_classificou', 0,  0,  0,  0),
('Austria',           2022, 'nao_classificou', 0,  0,  0,  0),
('Jordania',          2014, 'nao_classificou', 0,  0,  0,  0),
('Jordania',          2018, 'nao_classificou', 0,  0,  0,  0),
('Jordania',          2022, 'nao_classificou', 0,  0,  0,  0),
('Japao',             2014, 'grupo',           3,  2,  6,  6),
('Japao',             2018, 'oitavas',         4,  6,  7,  4),
('Japao',             2022, 'oitavas',         4,  5,  4,  5);

-- Tabela: analise_estatistica (dados historicos com metricas de performance)
DROP TABLE IF EXISTS analise_estatistica;
CREATE TABLE analise_estatistica (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    selecao        TEXT,
    copa           INTEGER,
    fase_eliminada TEXT,
    jogos          INTEGER,
    gols_pro       INTEGER,
    gols_contra    INTEGER,
    chutes         INTEGER,
    finalizacoes   INTEGER,
    faltas         INTEGER,
    posse_media    INTEGER,
    amarelos       INTEGER
);

INSERT INTO analise_estatistica (selecao, copa, fase_eliminada, jogos, gols_pro, gols_contra, chutes, finalizacoes, faltas, posse_media, amarelos) VALUES
('Brasil',            2014, 'semi',           7, 11, 14, 90, 38, 77, 58, 11),
('Brasil',            2018, 'quartas',         5,  8,  3, 68, 28, 60, 57,  6),
('Brasil',            2022, 'quartas',         5,  8,  3, 70, 30, 58, 58,  5),
('Marrocos',          2014, 'nao_classificou', 0,  0,  0,  0,  0,  0,  0,  0),
('Marrocos',          2018, 'grupo',           3,  2,  4, 27,  9, 54, 37,  4),
('Marrocos',          2022, 'semi',            7,  6,  5, 61, 17, 98, 37,  9),
('Mexico',            2014, 'oitavas',         4,  5,  4, 52, 20, 60, 52,  7),
('Mexico',            2018, 'oitavas',         4,  3,  6, 48, 18, 58, 50,  8),
('Mexico',            2022, 'grupo',           3,  2,  3, 32, 12, 40, 49,  4),
('Coreia do Sul',     2014, 'grupo',           3,  2,  4, 30, 10, 35, 47,  5),
('Coreia do Sul',     2018, 'grupo',           3,  3,  3, 31, 11, 38, 48,  4),
('Coreia do Sul',     2022, 'oitavas',         4,  5,  6, 42, 16, 46, 48,  6),
('Canada',            2014, 'nao_classificou', 0,  0,  0,  0,  0,  0,  0,  0),
('Canada',            2018, 'nao_classificou', 0,  0,  0,  0,  0,  0,  0,  0),
('Canada',            2022, 'grupo',           3,  2,  4, 28, 10, 38, 50,  5),
('Suica',             2014, 'oitavas',         4,  7,  6, 48, 19, 52, 52,  7),
('Suica',             2018, 'oitavas',         4,  6,  3, 50, 20, 54, 52,  6),
('Suica',             2022, 'oitavas',         4,  5,  9, 46, 18, 52, 52,  6),
('EUA',               2014, 'oitavas',         4,  5,  6, 44, 18, 56, 50,  6),
('EUA',               2018, 'nao_classificou', 0,  0,  0,  0,  0,  0,  0,  0),
('EUA',               2022, 'oitavas',         4,  3,  4, 40, 15, 50, 52,  5),
('Australia',         2014, 'grupo',           3,  3,  6, 28,  9, 38, 46,  5),
('Australia',         2018, 'grupo',           3,  2,  5, 26,  8, 36, 45,  3),
('Australia',         2022, 'oitavas',         4,  7,  6, 42, 17, 48, 49,  5),
('Franca',            2014, 'quartas',         5, 10,  3, 70, 28, 70, 55,  8),
('Franca',            2018, 'campeao',         7, 12,  6, 90, 38, 81, 55,  9),
('Franca',            2022, 'vice',            7, 16,  8, 92, 40, 84, 56,  7),
('Senegal',           2018, 'grupo',           3,  4,  4, 32, 12, 42, 48,  6),
('Senegal',           2022, 'oitavas',         4,  4,  3, 38, 15, 48, 47,  7),
('Argentina',         2014, 'vice',            7,  8,  4, 85, 32, 70, 55,  9),
('Argentina',         2018, 'oitavas',         4,  6,  9, 47, 18, 56, 48,  6),
('Argentina',         2022, 'campeao',         7, 15,  8, 76, 38, 91, 53,  7),
('Argelia',           2014, 'oitavas',         4,  7,  6, 45, 18, 55, 49,  7),
('Bosnia-Herzegovina',2014, 'grupo',           3,  4,  4, 34, 13, 38, 50,  3),
('Catar',             2022, 'grupo',           3,  1,  7, 24,  7, 36, 43,  3),
('Japao',             2014, 'grupo',           3,  2,  6, 28,  9, 35, 50,  6),
('Japao',             2018, 'oitavas',         4,  6,  7, 42, 14, 26, 46,  4),
('Japao',             2022, 'oitavas',         4,  5,  4, 34, 13, 28, 37,  5);

-- =====================================================
-- Verificacao rapida — rode depois do setup:
-- SELECT COUNT(*) FROM selecoes;        -- deve retornar 25
-- SELECT COUNT(*) FROM partidas;        -- deve retornar 12
-- SELECT COUNT(*) FROM stats;           -- deve retornar 25
-- SELECT COUNT(*) FROM historico;       -- deve retornar 75
-- SELECT COUNT(*) FROM analise_estatistica; -- deve retornar 38
