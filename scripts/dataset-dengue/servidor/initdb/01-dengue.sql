-- ---------------------------------------------------------------------------
-- Banco de dengue do épico 2 (Banco de Dados, A59 a A63)
-- GERADO por scripts/dataset-dengue/banco.py. Não edite à mão: rode o script.
--
-- Cada aluno entra com usuario alunoNN e senha dengueNN, no banco dengue_NN
-- (NN = número da chamada). O aluno é DONO do próprio banco e tem CREATEROLE e
-- CREATEDB: consegue criar contas, dar GRANT e REVOKE (Indicador 4) e restaurar
-- backup num banco novo (Indicador 6). Sem SUPERUSER: não mexe no banco dos outros.
-- ---------------------------------------------------------------------------

-- ---------- 1. Contas dos alunos ----------
CREATE ROLE aluno01 LOGIN PASSWORD 'dengue01' CREATEROLE CREATEDB;
CREATE ROLE aluno02 LOGIN PASSWORD 'dengue02' CREATEROLE CREATEDB;
CREATE ROLE aluno03 LOGIN PASSWORD 'dengue03' CREATEROLE CREATEDB;
CREATE ROLE aluno04 LOGIN PASSWORD 'dengue04' CREATEROLE CREATEDB;
CREATE ROLE aluno05 LOGIN PASSWORD 'dengue05' CREATEROLE CREATEDB;
CREATE ROLE aluno06 LOGIN PASSWORD 'dengue06' CREATEROLE CREATEDB;
CREATE ROLE aluno07 LOGIN PASSWORD 'dengue07' CREATEROLE CREATEDB;
CREATE ROLE aluno08 LOGIN PASSWORD 'dengue08' CREATEROLE CREATEDB;
CREATE ROLE aluno09 LOGIN PASSWORD 'dengue09' CREATEROLE CREATEDB;
CREATE ROLE aluno10 LOGIN PASSWORD 'dengue10' CREATEROLE CREATEDB;
CREATE ROLE aluno11 LOGIN PASSWORD 'dengue11' CREATEROLE CREATEDB;
CREATE ROLE aluno12 LOGIN PASSWORD 'dengue12' CREATEROLE CREATEDB;
CREATE ROLE aluno13 LOGIN PASSWORD 'dengue13' CREATEROLE CREATEDB;
CREATE ROLE aluno14 LOGIN PASSWORD 'dengue14' CREATEROLE CREATEDB;
CREATE ROLE aluno15 LOGIN PASSWORD 'dengue15' CREATEROLE CREATEDB;
CREATE ROLE aluno16 LOGIN PASSWORD 'dengue16' CREATEROLE CREATEDB;
CREATE ROLE aluno17 LOGIN PASSWORD 'dengue17' CREATEROLE CREATEDB;
CREATE ROLE aluno18 LOGIN PASSWORD 'dengue18' CREATEROLE CREATEDB;
CREATE ROLE aluno19 LOGIN PASSWORD 'dengue19' CREATEROLE CREATEDB;
CREATE ROLE aluno20 LOGIN PASSWORD 'dengue20' CREATEROLE CREATEDB;
CREATE ROLE aluno21 LOGIN PASSWORD 'dengue21' CREATEROLE CREATEDB;
CREATE ROLE aluno22 LOGIN PASSWORD 'dengue22' CREATEROLE CREATEDB;
CREATE ROLE aluno23 LOGIN PASSWORD 'dengue23' CREATEROLE CREATEDB;
CREATE ROLE aluno24 LOGIN PASSWORD 'dengue24' CREATEROLE CREATEDB;
CREATE ROLE aluno25 LOGIN PASSWORD 'dengue25' CREATEROLE CREATEDB;
CREATE ROLE aluno26 LOGIN PASSWORD 'dengue26' CREATEROLE CREATEDB;
CREATE ROLE aluno27 LOGIN PASSWORD 'dengue27' CREATEROLE CREATEDB;
CREATE ROLE aluno28 LOGIN PASSWORD 'dengue28' CREATEROLE CREATEDB;
CREATE ROLE aluno29 LOGIN PASSWORD 'dengue29' CREATEROLE CREATEDB;
CREATE ROLE aluno30 LOGIN PASSWORD 'dengue30' CREATEROLE CREATEDB;
CREATE ROLE aluno31 LOGIN PASSWORD 'dengue31' CREATEROLE CREATEDB;
CREATE ROLE aluno32 LOGIN PASSWORD 'dengue32' CREATEROLE CREATEDB;

-- ---------- 2. Banco modelo ----------
CREATE DATABASE dengue_modelo;
\connect dengue_modelo

CREATE TABLE municipios (
    codigo_ibge     INTEGER PRIMARY KEY,
    municipio       TEXT    NOT NULL UNIQUE,
    macrorregional  TEXT    NOT NULL CHECK (macrorregional IN ('Leste', 'Noroeste', 'Norte', 'Oeste')),
    populacao       INTEGER NOT NULL CHECK (populacao > 0)
);

CREATE TABLE casos_dengue (
    codigo_ibge      INTEGER NOT NULL REFERENCES municipios (codigo_ibge),
    municipio        TEXT    NOT NULL,
    macrorregional   TEXT    NOT NULL,
    ano              INTEGER NOT NULL,
    mes              INTEGER NOT NULL CHECK (mes BETWEEN 1 AND 12),
    data_referencia  DATE    NOT NULL,
    casos            INTEGER NOT NULL CHECK (casos >= 0),
    PRIMARY KEY (codigo_ibge, ano, mes)
);

INSERT INTO municipios (codigo_ibge, municipio, macrorregional, populacao) VALUES
 (4101408, 'Apucarana', 'Norte', 135969),
 (4104204, 'Campo Mourão', 'Noroeste', 144165),
 (4104808, 'Cascavel', 'Oeste', 350644),
 (4106902, 'Curitiba', 'Leste', 1871789),
 (4108304, 'Foz do Iguaçu', 'Oeste', 286323),
 (4108403, 'Francisco Beltrão', 'Oeste', 96622),
 (4109401, 'Guarapuava', 'Leste', 190342),
 (4112801, 'Joaquim Távora', 'Norte', 11870),
 (4113700, 'Londrina', 'Norte', 588125),
 (4115200, 'Maringá', 'Noroeste', 454146),
 (4118204, 'Paranaguá', 'Leste', 157043),
 (4118402, 'Paranavaí', 'Noroeste', 90969),
 (4118501, 'Pato Branco', 'Oeste', 94239),
 (4119905, 'Ponta Grossa', 'Leste', 391654),
 (4125506, 'São José dos Pinhais', 'Leste', 327746),
 (4127700, 'Toledo', 'Oeste', 156123),
 (4128104, 'Umuarama', 'Noroeste', 117148);

INSERT INTO casos_dengue (codigo_ibge, municipio, macrorregional, ano, mes, data_referencia, casos) VALUES
 (4101408, 'Apucarana', 'Norte', 2024, 1, '2024-01-01', 5603),
 (4101408, 'Apucarana', 'Norte', 2024, 2, '2024-02-01', 5003),
 (4101408, 'Apucarana', 'Norte', 2024, 3, '2024-03-01', 4287),
 (4101408, 'Apucarana', 'Norte', 2024, 4, '2024-04-01', 2057),
 (4101408, 'Apucarana', 'Norte', 2024, 5, '2024-05-01', 946),
 (4101408, 'Apucarana', 'Norte', 2024, 6, '2024-06-01', 323),
 (4101408, 'Apucarana', 'Norte', 2024, 7, '2024-07-01', 171),
 (4101408, 'Apucarana', 'Norte', 2024, 8, '2024-08-01', 169),
 (4101408, 'Apucarana', 'Norte', 2024, 9, '2024-09-01', 298),
 (4101408, 'Apucarana', 'Norte', 2024, 10, '2024-10-01', 234),
 (4101408, 'Apucarana', 'Norte', 2024, 11, '2024-11-01', 284),
 (4101408, 'Apucarana', 'Norte', 2024, 12, '2024-12-01', 380),
 (4101408, 'Apucarana', 'Norte', 2025, 1, '2025-01-01', 470),
 (4101408, 'Apucarana', 'Norte', 2025, 2, '2025-02-01', 1096),
 (4101408, 'Apucarana', 'Norte', 2025, 3, '2025-03-01', 3851),
 (4101408, 'Apucarana', 'Norte', 2025, 4, '2025-04-01', 2552),
 (4101408, 'Apucarana', 'Norte', 2025, 5, '2025-05-01', 1179),
 (4101408, 'Apucarana', 'Norte', 2025, 6, '2025-06-01', 242),
 (4101408, 'Apucarana', 'Norte', 2025, 7, '2025-07-01', 54),
 (4101408, 'Apucarana', 'Norte', 2025, 8, '2025-08-01', 113),
 (4101408, 'Apucarana', 'Norte', 2025, 9, '2025-09-01', 260),
 (4101408, 'Apucarana', 'Norte', 2025, 10, '2025-10-01', 161),
 (4101408, 'Apucarana', 'Norte', 2025, 11, '2025-11-01', 179),
 (4101408, 'Apucarana', 'Norte', 2025, 12, '2025-12-01', 114),
 (4104204, 'Campo Mourão', 'Noroeste', 2024, 1, '2024-01-01', 33),
 (4104204, 'Campo Mourão', 'Noroeste', 2024, 2, '2024-02-01', 142),
 (4104204, 'Campo Mourão', 'Noroeste', 2024, 3, '2024-03-01', 198),
 (4104204, 'Campo Mourão', 'Noroeste', 2024, 4, '2024-04-01', 113),
 (4104204, 'Campo Mourão', 'Noroeste', 2024, 5, '2024-05-01', 81),
 (4104204, 'Campo Mourão', 'Noroeste', 2024, 6, '2024-06-01', 44),
 (4104204, 'Campo Mourão', 'Noroeste', 2024, 7, '2024-07-01', 11),
 (4104204, 'Campo Mourão', 'Noroeste', 2024, 8, '2024-08-01', 11),
 (4104204, 'Campo Mourão', 'Noroeste', 2024, 9, '2024-09-01', 12),
 (4104204, 'Campo Mourão', 'Noroeste', 2024, 10, '2024-10-01', 0),
 (4104204, 'Campo Mourão', 'Noroeste', 2024, 11, '2024-11-01', 11),
 (4104204, 'Campo Mourão', 'Noroeste', 2024, 12, '2024-12-01', 18),
 (4104204, 'Campo Mourão', 'Noroeste', 2025, 1, '2025-01-01', 26),
 (4104204, 'Campo Mourão', 'Noroeste', 2025, 2, '2025-02-01', 70),
 (4104204, 'Campo Mourão', 'Noroeste', 2025, 3, '2025-03-01', 63),
 (4104204, 'Campo Mourão', 'Noroeste', 2025, 4, '2025-04-01', 24),
 (4104204, 'Campo Mourão', 'Noroeste', 2025, 5, '2025-05-01', 12),
 (4104204, 'Campo Mourão', 'Noroeste', 2025, 6, '2025-06-01', 4),
 (4104204, 'Campo Mourão', 'Noroeste', 2025, 7, '2025-07-01', 2),
 (4104204, 'Campo Mourão', 'Noroeste', 2025, 8, '2025-08-01', 1),
 (4104204, 'Campo Mourão', 'Noroeste', 2025, 9, '2025-09-01', 2),
 (4104204, 'Campo Mourão', 'Noroeste', 2025, 10, '2025-10-01', 0),
 (4104204, 'Campo Mourão', 'Noroeste', 2025, 11, '2025-11-01', 6),
 (4104204, 'Campo Mourão', 'Noroeste', 2025, 12, '2025-12-01', 3),
 (4104808, 'Cascavel', 'Oeste', 2024, 1, '2024-01-01', 2029),
 (4104808, 'Cascavel', 'Oeste', 2024, 2, '2024-02-01', 7944),
 (4104808, 'Cascavel', 'Oeste', 2024, 3, '2024-03-01', 16873),
 (4104808, 'Cascavel', 'Oeste', 2024, 4, '2024-04-01', 7551),
 (4104808, 'Cascavel', 'Oeste', 2024, 5, '2024-05-01', 4336),
 (4104808, 'Cascavel', 'Oeste', 2024, 6, '2024-06-01', 1649),
 (4104808, 'Cascavel', 'Oeste', 2024, 7, '2024-07-01', 349),
 (4104808, 'Cascavel', 'Oeste', 2024, 8, '2024-08-01', 374),
 (4104808, 'Cascavel', 'Oeste', 2024, 9, '2024-09-01', 749),
 (4104808, 'Cascavel', 'Oeste', 2024, 10, '2024-10-01', 572),
 (4104808, 'Cascavel', 'Oeste', 2024, 11, '2024-11-01', 574),
 (4104808, 'Cascavel', 'Oeste', 2024, 12, '2024-12-01', 1117),
 (4104808, 'Cascavel', 'Oeste', 2025, 1, '2025-01-01', 1173),
 (4104808, 'Cascavel', 'Oeste', 2025, 2, '2025-02-01', 1852),
 (4104808, 'Cascavel', 'Oeste', 2025, 3, '2025-03-01', 3421),
 (4104808, 'Cascavel', 'Oeste', 2025, 4, '2025-04-01', 2011),
 (4104808, 'Cascavel', 'Oeste', 2025, 5, '2025-05-01', 1379),
 (4104808, 'Cascavel', 'Oeste', 2025, 6, '2025-06-01', 430),
 (4104808, 'Cascavel', 'Oeste', 2025, 7, '2025-07-01', 180),
 (4104808, 'Cascavel', 'Oeste', 2025, 8, '2025-08-01', 223),
 (4104808, 'Cascavel', 'Oeste', 2025, 9, '2025-09-01', 310),
 (4104808, 'Cascavel', 'Oeste', 2025, 10, '2025-10-01', 344),
 (4104808, 'Cascavel', 'Oeste', 2025, 11, '2025-11-01', 655),
 (4104808, 'Cascavel', 'Oeste', 2025, 12, '2025-12-01', 394),
 (4106902, 'Curitiba', 'Leste', 2024, 1, '2024-01-01', 1503),
 (4106902, 'Curitiba', 'Leste', 2024, 2, '2024-02-01', 5860),
 (4106902, 'Curitiba', 'Leste', 2024, 3, '2024-03-01', 12247),
 (4106902, 'Curitiba', 'Leste', 2024, 4, '2024-04-01', 11070),
 (4106902, 'Curitiba', 'Leste', 2024, 5, '2024-05-01', 9578),
 (4106902, 'Curitiba', 'Leste', 2024, 6, '2024-06-01', 3830),
 (4106902, 'Curitiba', 'Leste', 2024, 7, '2024-07-01', 1027),
 (4106902, 'Curitiba', 'Leste', 2024, 8, '2024-08-01', 742),
 (4106902, 'Curitiba', 'Leste', 2024, 9, '2024-09-01', 778),
 (4106902, 'Curitiba', 'Leste', 2024, 10, '2024-10-01', 528),
 (4106902, 'Curitiba', 'Leste', 2024, 11, '2024-11-01', 440),
 (4106902, 'Curitiba', 'Leste', 2024, 12, '2024-12-01', 710),
 (4106902, 'Curitiba', 'Leste', 2025, 1, '2025-01-01', 935),
 (4106902, 'Curitiba', 'Leste', 2025, 2, '2025-02-01', 1696),
 (4106902, 'Curitiba', 'Leste', 2025, 3, '2025-03-01', 2070),
 (4106902, 'Curitiba', 'Leste', 2025, 4, '2025-04-01', 1239),
 (4106902, 'Curitiba', 'Leste', 2025, 5, '2025-05-01', 831),
 (4106902, 'Curitiba', 'Leste', 2025, 6, '2025-06-01', 270),
 (4106902, 'Curitiba', 'Leste', 2025, 7, '2025-07-01', 128),
 (4106902, 'Curitiba', 'Leste', 2025, 8, '2025-08-01', 161),
 (4106902, 'Curitiba', 'Leste', 2025, 9, '2025-09-01', 192),
 (4106902, 'Curitiba', 'Leste', 2025, 10, '2025-10-01', 193),
 (4106902, 'Curitiba', 'Leste', 2025, 11, '2025-11-01', 301),
 (4106902, 'Curitiba', 'Leste', 2025, 12, '2025-12-01', 321),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2024, 1, '2024-01-01', 1475),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2024, 2, '2024-02-01', 3003),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2024, 3, '2024-03-01', 5700),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2024, 4, '2024-04-01', 6619),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2024, 5, '2024-05-01', 4765),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2024, 6, '2024-06-01', 1908),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2024, 7, '2024-07-01', 611),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2024, 8, '2024-08-01', 711),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2024, 9, '2024-09-01', 1054),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2024, 10, '2024-10-01', 980),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2024, 11, '2024-11-01', 1039),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2024, 12, '2024-12-01', 957),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2025, 1, '2025-01-01', 885),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2025, 2, '2025-02-01', 1006),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2025, 3, '2025-03-01', 1278),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2025, 4, '2025-04-01', 1350),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2025, 5, '2025-05-01', 1189),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2025, 6, '2025-06-01', 564),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2025, 7, '2025-07-01', 456),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2025, 8, '2025-08-01', 692),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2025, 9, '2025-09-01', 800),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2025, 10, '2025-10-01', 837),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2025, 11, '2025-11-01', 1151),
 (4108304, 'Foz do Iguaçu', 'Oeste', 2025, 12, '2025-12-01', 520),
 (4108403, 'Francisco Beltrão', 'Oeste', 2024, 1, '2024-01-01', 435),
 (4108403, 'Francisco Beltrão', 'Oeste', 2024, 2, '2024-02-01', 2647),
 (4108403, 'Francisco Beltrão', 'Oeste', 2024, 3, '2024-03-01', 8963),
 (4108403, 'Francisco Beltrão', 'Oeste', 2024, 4, '2024-04-01', 7566),
 (4108403, 'Francisco Beltrão', 'Oeste', 2024, 5, '2024-05-01', 3193),
 (4108403, 'Francisco Beltrão', 'Oeste', 2024, 6, '2024-06-01', 599),
 (4108403, 'Francisco Beltrão', 'Oeste', 2024, 7, '2024-07-01', 78),
 (4108403, 'Francisco Beltrão', 'Oeste', 2024, 8, '2024-08-01', 51),
 (4108403, 'Francisco Beltrão', 'Oeste', 2024, 9, '2024-09-01', 67),
 (4108403, 'Francisco Beltrão', 'Oeste', 2024, 10, '2024-10-01', 96),
 (4108403, 'Francisco Beltrão', 'Oeste', 2024, 11, '2024-11-01', 63),
 (4108403, 'Francisco Beltrão', 'Oeste', 2024, 12, '2024-12-01', 64),
 (4108403, 'Francisco Beltrão', 'Oeste', 2025, 1, '2025-01-01', 107),
 (4108403, 'Francisco Beltrão', 'Oeste', 2025, 2, '2025-02-01', 234),
 (4108403, 'Francisco Beltrão', 'Oeste', 2025, 3, '2025-03-01', 772),
 (4108403, 'Francisco Beltrão', 'Oeste', 2025, 4, '2025-04-01', 871),
 (4108403, 'Francisco Beltrão', 'Oeste', 2025, 5, '2025-05-01', 782),
 (4108403, 'Francisco Beltrão', 'Oeste', 2025, 6, '2025-06-01', 178),
 (4108403, 'Francisco Beltrão', 'Oeste', 2025, 7, '2025-07-01', 70),
 (4108403, 'Francisco Beltrão', 'Oeste', 2025, 8, '2025-08-01', 64),
 (4108403, 'Francisco Beltrão', 'Oeste', 2025, 9, '2025-09-01', 61),
 (4108403, 'Francisco Beltrão', 'Oeste', 2025, 10, '2025-10-01', 96),
 (4108403, 'Francisco Beltrão', 'Oeste', 2025, 11, '2025-11-01', 201),
 (4108403, 'Francisco Beltrão', 'Oeste', 2025, 12, '2025-12-01', 119),
 (4109401, 'Guarapuava', 'Leste', 2024, 1, '2024-01-01', 80),
 (4109401, 'Guarapuava', 'Leste', 2024, 2, '2024-02-01', 420),
 (4109401, 'Guarapuava', 'Leste', 2024, 3, '2024-03-01', 1101),
 (4109401, 'Guarapuava', 'Leste', 2024, 4, '2024-04-01', 1601),
 (4109401, 'Guarapuava', 'Leste', 2024, 5, '2024-05-01', 1497),
 (4109401, 'Guarapuava', 'Leste', 2024, 6, '2024-06-01', 520),
 (4109401, 'Guarapuava', 'Leste', 2024, 7, '2024-07-01', 63),
 (4109401, 'Guarapuava', 'Leste', 2024, 8, '2024-08-01', 28),
 (4109401, 'Guarapuava', 'Leste', 2024, 9, '2024-09-01', 90),
 (4109401, 'Guarapuava', 'Leste', 2024, 10, '2024-10-01', 66),
 (4109401, 'Guarapuava', 'Leste', 2024, 11, '2024-11-01', 107),
 (4109401, 'Guarapuava', 'Leste', 2024, 12, '2024-12-01', 131),
 (4109401, 'Guarapuava', 'Leste', 2025, 1, '2025-01-01', 108),
 (4109401, 'Guarapuava', 'Leste', 2025, 2, '2025-02-01', 185),
 (4109401, 'Guarapuava', 'Leste', 2025, 3, '2025-03-01', 312),
 (4109401, 'Guarapuava', 'Leste', 2025, 4, '2025-04-01', 176),
 (4109401, 'Guarapuava', 'Leste', 2025, 5, '2025-05-01', 99),
 (4109401, 'Guarapuava', 'Leste', 2025, 6, '2025-06-01', 15),
 (4109401, 'Guarapuava', 'Leste', 2025, 7, '2025-07-01', 12),
 (4109401, 'Guarapuava', 'Leste', 2025, 8, '2025-08-01', 30),
 (4109401, 'Guarapuava', 'Leste', 2025, 9, '2025-09-01', 35),
 (4109401, 'Guarapuava', 'Leste', 2025, 10, '2025-10-01', 26),
 (4109401, 'Guarapuava', 'Leste', 2025, 11, '2025-11-01', 41),
 (4109401, 'Guarapuava', 'Leste', 2025, 12, '2025-12-01', 43),
 (4112801, 'Joaquim Távora', 'Norte', 2024, 1, '2024-01-01', 16),
 (4112801, 'Joaquim Távora', 'Norte', 2024, 2, '2024-02-01', 143),
 (4112801, 'Joaquim Távora', 'Norte', 2024, 3, '2024-03-01', 314),
 (4112801, 'Joaquim Távora', 'Norte', 2024, 4, '2024-04-01', 316),
 (4112801, 'Joaquim Távora', 'Norte', 2024, 5, '2024-05-01', 273),
 (4112801, 'Joaquim Távora', 'Norte', 2024, 6, '2024-06-01', 244),
 (4112801, 'Joaquim Távora', 'Norte', 2024, 7, '2024-07-01', 36),
 (4112801, 'Joaquim Távora', 'Norte', 2024, 8, '2024-08-01', 25),
 (4112801, 'Joaquim Távora', 'Norte', 2024, 9, '2024-09-01', 13),
 (4112801, 'Joaquim Távora', 'Norte', 2024, 10, '2024-10-01', 5),
 (4112801, 'Joaquim Távora', 'Norte', 2024, 11, '2024-11-01', 13),
 (4112801, 'Joaquim Távora', 'Norte', 2024, 12, '2024-12-01', 16),
 (4112801, 'Joaquim Távora', 'Norte', 2025, 1, '2025-01-01', 25),
 (4112801, 'Joaquim Távora', 'Norte', 2025, 2, '2025-02-01', 88),
 (4112801, 'Joaquim Távora', 'Norte', 2025, 3, '2025-03-01', 476),
 (4112801, 'Joaquim Távora', 'Norte', 2025, 4, '2025-04-01', 270),
 (4112801, 'Joaquim Távora', 'Norte', 2025, 5, '2025-05-01', 119),
 (4112801, 'Joaquim Távora', 'Norte', 2025, 6, '2025-06-01', 15),
 (4112801, 'Joaquim Távora', 'Norte', 2025, 7, '2025-07-01', 4),
 (4112801, 'Joaquim Távora', 'Norte', 2025, 8, '2025-08-01', 1),
 (4112801, 'Joaquim Távora', 'Norte', 2025, 9, '2025-09-01', 2),
 (4112801, 'Joaquim Távora', 'Norte', 2025, 10, '2025-10-01', 3),
 (4112801, 'Joaquim Távora', 'Norte', 2025, 11, '2025-11-01', 0),
 (4112801, 'Joaquim Távora', 'Norte', 2025, 12, '2025-12-01', 2),
 (4113700, 'Londrina', 'Norte', 2024, 1, '2024-01-01', 5997),
 (4113700, 'Londrina', 'Norte', 2024, 2, '2024-02-01', 10835),
 (4113700, 'Londrina', 'Norte', 2024, 3, '2024-03-01', 20108),
 (4113700, 'Londrina', 'Norte', 2024, 4, '2024-04-01', 16576),
 (4113700, 'Londrina', 'Norte', 2024, 5, '2024-05-01', 12155),
 (4113700, 'Londrina', 'Norte', 2024, 6, '2024-06-01', 4739),
 (4113700, 'Londrina', 'Norte', 2024, 7, '2024-07-01', 1427),
 (4113700, 'Londrina', 'Norte', 2024, 8, '2024-08-01', 1274),
 (4113700, 'Londrina', 'Norte', 2024, 9, '2024-09-01', 1752),
 (4113700, 'Londrina', 'Norte', 2024, 10, '2024-10-01', 1309),
 (4113700, 'Londrina', 'Norte', 2024, 11, '2024-11-01', 1427),
 (4113700, 'Londrina', 'Norte', 2024, 12, '2024-12-01', 1742),
 (4113700, 'Londrina', 'Norte', 2025, 1, '2025-01-01', 2100),
 (4113700, 'Londrina', 'Norte', 2025, 2, '2025-02-01', 3186),
 (4113700, 'Londrina', 'Norte', 2025, 3, '2025-03-01', 6614),
 (4113700, 'Londrina', 'Norte', 2025, 4, '2025-04-01', 5482),
 (4113700, 'Londrina', 'Norte', 2025, 5, '2025-05-01', 4078),
 (4113700, 'Londrina', 'Norte', 2025, 6, '2025-06-01', 1782),
 (4113700, 'Londrina', 'Norte', 2025, 7, '2025-07-01', 929),
 (4113700, 'Londrina', 'Norte', 2025, 8, '2025-08-01', 1597),
 (4113700, 'Londrina', 'Norte', 2025, 9, '2025-09-01', 1849),
 (4113700, 'Londrina', 'Norte', 2025, 10, '2025-10-01', 1766),
 (4113700, 'Londrina', 'Norte', 2025, 11, '2025-11-01', 2048),
 (4113700, 'Londrina', 'Norte', 2025, 12, '2025-12-01', 1373),
 (4115200, 'Maringá', 'Noroeste', 2024, 1, '2024-01-01', 3027),
 (4115200, 'Maringá', 'Noroeste', 2024, 2, '2024-02-01', 6750),
 (4115200, 'Maringá', 'Noroeste', 2024, 3, '2024-03-01', 11648),
 (4115200, 'Maringá', 'Noroeste', 2024, 4, '2024-04-01', 8490),
 (4115200, 'Maringá', 'Noroeste', 2024, 5, '2024-05-01', 4329),
 (4115200, 'Maringá', 'Noroeste', 2024, 6, '2024-06-01', 1902),
 (4115200, 'Maringá', 'Noroeste', 2024, 7, '2024-07-01', 574),
 (4115200, 'Maringá', 'Noroeste', 2024, 8, '2024-08-01', 456),
 (4115200, 'Maringá', 'Noroeste', 2024, 9, '2024-09-01', 597),
 (4115200, 'Maringá', 'Noroeste', 2024, 10, '2024-10-01', 428),
 (4115200, 'Maringá', 'Noroeste', 2024, 11, '2024-11-01', 392),
 (4115200, 'Maringá', 'Noroeste', 2024, 12, '2024-12-01', 465),
 (4115200, 'Maringá', 'Noroeste', 2025, 1, '2025-01-01', 865),
 (4115200, 'Maringá', 'Noroeste', 2025, 2, '2025-02-01', 1750),
 (4115200, 'Maringá', 'Noroeste', 2025, 3, '2025-03-01', 5090),
 (4115200, 'Maringá', 'Noroeste', 2025, 4, '2025-04-01', 4179),
 (4115200, 'Maringá', 'Noroeste', 2025, 5, '2025-05-01', 3215),
 (4115200, 'Maringá', 'Noroeste', 2025, 6, '2025-06-01', 1019),
 (4115200, 'Maringá', 'Noroeste', 2025, 7, '2025-07-01', 279),
 (4115200, 'Maringá', 'Noroeste', 2025, 8, '2025-08-01', 320),
 (4115200, 'Maringá', 'Noroeste', 2025, 9, '2025-09-01', 469),
 (4115200, 'Maringá', 'Noroeste', 2025, 10, '2025-10-01', 600),
 (4115200, 'Maringá', 'Noroeste', 2025, 11, '2025-11-01', 660),
 (4115200, 'Maringá', 'Noroeste', 2025, 12, '2025-12-01', 408),
 (4118204, 'Paranaguá', 'Leste', 2024, 1, '2024-01-01', 225),
 (4118204, 'Paranaguá', 'Leste', 2024, 2, '2024-02-01', 771),
 (4118204, 'Paranaguá', 'Leste', 2024, 3, '2024-03-01', 1129),
 (4118204, 'Paranaguá', 'Leste', 2024, 4, '2024-04-01', 828),
 (4118204, 'Paranaguá', 'Leste', 2024, 5, '2024-05-01', 640),
 (4118204, 'Paranaguá', 'Leste', 2024, 6, '2024-06-01', 431),
 (4118204, 'Paranaguá', 'Leste', 2024, 7, '2024-07-01', 143),
 (4118204, 'Paranaguá', 'Leste', 2024, 8, '2024-08-01', 114),
 (4118204, 'Paranaguá', 'Leste', 2024, 9, '2024-09-01', 105),
 (4118204, 'Paranaguá', 'Leste', 2024, 10, '2024-10-01', 110),
 (4118204, 'Paranaguá', 'Leste', 2024, 11, '2024-11-01', 102),
 (4118204, 'Paranaguá', 'Leste', 2024, 12, '2024-12-01', 87),
 (4118204, 'Paranaguá', 'Leste', 2025, 1, '2025-01-01', 74),
 (4118204, 'Paranaguá', 'Leste', 2025, 2, '2025-02-01', 155),
 (4118204, 'Paranaguá', 'Leste', 2025, 3, '2025-03-01', 321),
 (4118204, 'Paranaguá', 'Leste', 2025, 4, '2025-04-01', 187),
 (4118204, 'Paranaguá', 'Leste', 2025, 5, '2025-05-01', 232),
 (4118204, 'Paranaguá', 'Leste', 2025, 6, '2025-06-01', 98),
 (4118204, 'Paranaguá', 'Leste', 2025, 7, '2025-07-01', 61),
 (4118204, 'Paranaguá', 'Leste', 2025, 8, '2025-08-01', 68),
 (4118204, 'Paranaguá', 'Leste', 2025, 9, '2025-09-01', 70),
 (4118204, 'Paranaguá', 'Leste', 2025, 10, '2025-10-01', 86),
 (4118204, 'Paranaguá', 'Leste', 2025, 11, '2025-11-01', 102),
 (4118204, 'Paranaguá', 'Leste', 2025, 12, '2025-12-01', 58),
 (4118402, 'Paranavaí', 'Noroeste', 2024, 1, '2024-01-01', 2250),
 (4118402, 'Paranavaí', 'Noroeste', 2024, 2, '2024-02-01', 2605),
 (4118402, 'Paranavaí', 'Noroeste', 2024, 3, '2024-03-01', 1880),
 (4118402, 'Paranavaí', 'Noroeste', 2024, 4, '2024-04-01', 806),
 (4118402, 'Paranavaí', 'Noroeste', 2024, 5, '2024-05-01', 447),
 (4118402, 'Paranavaí', 'Noroeste', 2024, 6, '2024-06-01', 280),
 (4118402, 'Paranavaí', 'Noroeste', 2024, 7, '2024-07-01', 57),
 (4118402, 'Paranavaí', 'Noroeste', 2024, 8, '2024-08-01', 76),
 (4118402, 'Paranavaí', 'Noroeste', 2024, 9, '2024-09-01', 108),
 (4118402, 'Paranavaí', 'Noroeste', 2024, 10, '2024-10-01', 51),
 (4118402, 'Paranavaí', 'Noroeste', 2024, 11, '2024-11-01', 118),
 (4118402, 'Paranavaí', 'Noroeste', 2024, 12, '2024-12-01', 138),
 (4118402, 'Paranavaí', 'Noroeste', 2025, 1, '2025-01-01', 220),
 (4118402, 'Paranavaí', 'Noroeste', 2025, 2, '2025-02-01', 519),
 (4118402, 'Paranavaí', 'Noroeste', 2025, 3, '2025-03-01', 881),
 (4118402, 'Paranavaí', 'Noroeste', 2025, 4, '2025-04-01', 550),
 (4118402, 'Paranavaí', 'Noroeste', 2025, 5, '2025-05-01', 451),
 (4118402, 'Paranavaí', 'Noroeste', 2025, 6, '2025-06-01', 128),
 (4118402, 'Paranavaí', 'Noroeste', 2025, 7, '2025-07-01', 62),
 (4118402, 'Paranavaí', 'Noroeste', 2025, 8, '2025-08-01', 72),
 (4118402, 'Paranavaí', 'Noroeste', 2025, 9, '2025-09-01', 120),
 (4118402, 'Paranavaí', 'Noroeste', 2025, 10, '2025-10-01', 120),
 (4118402, 'Paranavaí', 'Noroeste', 2025, 11, '2025-11-01', 168),
 (4118402, 'Paranavaí', 'Noroeste', 2025, 12, '2025-12-01', 102),
 (4118501, 'Pato Branco', 'Oeste', 2024, 1, '2024-01-01', 170),
 (4118501, 'Pato Branco', 'Oeste', 2024, 2, '2024-02-01', 780),
 (4118501, 'Pato Branco', 'Oeste', 2024, 3, '2024-03-01', 2771),
 (4118501, 'Pato Branco', 'Oeste', 2024, 4, '2024-04-01', 3071),
 (4118501, 'Pato Branco', 'Oeste', 2024, 5, '2024-05-01', 2457),
 (4118501, 'Pato Branco', 'Oeste', 2024, 6, '2024-06-01', 636),
 (4118501, 'Pato Branco', 'Oeste', 2024, 7, '2024-07-01', 106),
 (4118501, 'Pato Branco', 'Oeste', 2024, 8, '2024-08-01', 72),
 (4118501, 'Pato Branco', 'Oeste', 2024, 9, '2024-09-01', 112),
 (4118501, 'Pato Branco', 'Oeste', 2024, 10, '2024-10-01', 128),
 (4118501, 'Pato Branco', 'Oeste', 2024, 11, '2024-11-01', 105),
 (4118501, 'Pato Branco', 'Oeste', 2024, 12, '2024-12-01', 134),
 (4118501, 'Pato Branco', 'Oeste', 2025, 1, '2025-01-01', 155),
 (4118501, 'Pato Branco', 'Oeste', 2025, 2, '2025-02-01', 355),
 (4118501, 'Pato Branco', 'Oeste', 2025, 3, '2025-03-01', 1004),
 (4118501, 'Pato Branco', 'Oeste', 2025, 4, '2025-04-01', 730),
 (4118501, 'Pato Branco', 'Oeste', 2025, 5, '2025-05-01', 433),
 (4118501, 'Pato Branco', 'Oeste', 2025, 6, '2025-06-01', 87),
 (4118501, 'Pato Branco', 'Oeste', 2025, 7, '2025-07-01', 49),
 (4118501, 'Pato Branco', 'Oeste', 2025, 8, '2025-08-01', 63),
 (4118501, 'Pato Branco', 'Oeste', 2025, 9, '2025-09-01', 80),
 (4118501, 'Pato Branco', 'Oeste', 2025, 10, '2025-10-01', 93),
 (4118501, 'Pato Branco', 'Oeste', 2025, 11, '2025-11-01', 216),
 (4118501, 'Pato Branco', 'Oeste', 2025, 12, '2025-12-01', 154),
 (4119905, 'Ponta Grossa', 'Leste', 2024, 1, '2024-01-01', 137),
 (4119905, 'Ponta Grossa', 'Leste', 2024, 2, '2024-02-01', 979),
 (4119905, 'Ponta Grossa', 'Leste', 2024, 3, '2024-03-01', 6717),
 (4119905, 'Ponta Grossa', 'Leste', 2024, 4, '2024-04-01', 9845),
 (4119905, 'Ponta Grossa', 'Leste', 2024, 5, '2024-05-01', 9217),
 (4119905, 'Ponta Grossa', 'Leste', 2024, 6, '2024-06-01', 3052),
 (4119905, 'Ponta Grossa', 'Leste', 2024, 7, '2024-07-01', 340),
 (4119905, 'Ponta Grossa', 'Leste', 2024, 8, '2024-08-01', 172),
 (4119905, 'Ponta Grossa', 'Leste', 2024, 9, '2024-09-01', 182),
 (4119905, 'Ponta Grossa', 'Leste', 2024, 10, '2024-10-01', 180),
 (4119905, 'Ponta Grossa', 'Leste', 2024, 11, '2024-11-01', 258),
 (4119905, 'Ponta Grossa', 'Leste', 2024, 12, '2024-12-01', 374),
 (4119905, 'Ponta Grossa', 'Leste', 2025, 1, '2025-01-01', 481),
 (4119905, 'Ponta Grossa', 'Leste', 2025, 2, '2025-02-01', 711),
 (4119905, 'Ponta Grossa', 'Leste', 2025, 3, '2025-03-01', 1153),
 (4119905, 'Ponta Grossa', 'Leste', 2025, 4, '2025-04-01', 1146),
 (4119905, 'Ponta Grossa', 'Leste', 2025, 5, '2025-05-01', 1124),
 (4119905, 'Ponta Grossa', 'Leste', 2025, 6, '2025-06-01', 403),
 (4119905, 'Ponta Grossa', 'Leste', 2025, 7, '2025-07-01', 134),
 (4119905, 'Ponta Grossa', 'Leste', 2025, 8, '2025-08-01', 219),
 (4119905, 'Ponta Grossa', 'Leste', 2025, 9, '2025-09-01', 214),
 (4119905, 'Ponta Grossa', 'Leste', 2025, 10, '2025-10-01', 270),
 (4119905, 'Ponta Grossa', 'Leste', 2025, 11, '2025-11-01', 424),
 (4119905, 'Ponta Grossa', 'Leste', 2025, 12, '2025-12-01', 364),
 (4125506, 'São José dos Pinhais', 'Leste', 2024, 1, '2024-01-01', 198),
 (4125506, 'São José dos Pinhais', 'Leste', 2024, 2, '2024-02-01', 455),
 (4125506, 'São José dos Pinhais', 'Leste', 2024, 3, '2024-03-01', 655),
 (4125506, 'São José dos Pinhais', 'Leste', 2024, 4, '2024-04-01', 510),
 (4125506, 'São José dos Pinhais', 'Leste', 2024, 5, '2024-05-01', 367),
 (4125506, 'São José dos Pinhais', 'Leste', 2024, 6, '2024-06-01', 150),
 (4125506, 'São José dos Pinhais', 'Leste', 2024, 7, '2024-07-01', 41),
 (4125506, 'São José dos Pinhais', 'Leste', 2024, 8, '2024-08-01', 24),
 (4125506, 'São José dos Pinhais', 'Leste', 2024, 9, '2024-09-01', 37),
 (4125506, 'São José dos Pinhais', 'Leste', 2024, 10, '2024-10-01', 33),
 (4125506, 'São José dos Pinhais', 'Leste', 2024, 11, '2024-11-01', 44),
 (4125506, 'São José dos Pinhais', 'Leste', 2024, 12, '2024-12-01', 72),
 (4125506, 'São José dos Pinhais', 'Leste', 2025, 1, '2025-01-01', 74),
 (4125506, 'São José dos Pinhais', 'Leste', 2025, 2, '2025-02-01', 168),
 (4125506, 'São José dos Pinhais', 'Leste', 2025, 3, '2025-03-01', 215),
 (4125506, 'São José dos Pinhais', 'Leste', 2025, 4, '2025-04-01', 186),
 (4125506, 'São José dos Pinhais', 'Leste', 2025, 5, '2025-05-01', 135),
 (4125506, 'São José dos Pinhais', 'Leste', 2025, 6, '2025-06-01', 66),
 (4125506, 'São José dos Pinhais', 'Leste', 2025, 7, '2025-07-01', 20),
 (4125506, 'São José dos Pinhais', 'Leste', 2025, 8, '2025-08-01', 25),
 (4125506, 'São José dos Pinhais', 'Leste', 2025, 9, '2025-09-01', 26),
 (4125506, 'São José dos Pinhais', 'Leste', 2025, 10, '2025-10-01', 28),
 (4125506, 'São José dos Pinhais', 'Leste', 2025, 11, '2025-11-01', 52),
 (4125506, 'São José dos Pinhais', 'Leste', 2025, 12, '2025-12-01', 54),
 (4127700, 'Toledo', 'Oeste', 2024, 1, '2024-01-01', 1332),
 (4127700, 'Toledo', 'Oeste', 2024, 2, '2024-02-01', 2852),
 (4127700, 'Toledo', 'Oeste', 2024, 3, '2024-03-01', 3806),
 (4127700, 'Toledo', 'Oeste', 2024, 4, '2024-04-01', 4659),
 (4127700, 'Toledo', 'Oeste', 2024, 5, '2024-05-01', 2549),
 (4127700, 'Toledo', 'Oeste', 2024, 6, '2024-06-01', 1039),
 (4127700, 'Toledo', 'Oeste', 2024, 7, '2024-07-01', 199),
 (4127700, 'Toledo', 'Oeste', 2024, 8, '2024-08-01', 369),
 (4127700, 'Toledo', 'Oeste', 2024, 9, '2024-09-01', 623),
 (4127700, 'Toledo', 'Oeste', 2024, 10, '2024-10-01', 358),
 (4127700, 'Toledo', 'Oeste', 2024, 11, '2024-11-01', 431),
 (4127700, 'Toledo', 'Oeste', 2024, 12, '2024-12-01', 459),
 (4127700, 'Toledo', 'Oeste', 2025, 1, '2025-01-01', 421),
 (4127700, 'Toledo', 'Oeste', 2025, 2, '2025-02-01', 762),
 (4127700, 'Toledo', 'Oeste', 2025, 3, '2025-03-01', 1844),
 (4127700, 'Toledo', 'Oeste', 2025, 4, '2025-04-01', 1436),
 (4127700, 'Toledo', 'Oeste', 2025, 5, '2025-05-01', 1136),
 (4127700, 'Toledo', 'Oeste', 2025, 6, '2025-06-01', 337),
 (4127700, 'Toledo', 'Oeste', 2025, 7, '2025-07-01', 138),
 (4127700, 'Toledo', 'Oeste', 2025, 8, '2025-08-01', 181),
 (4127700, 'Toledo', 'Oeste', 2025, 9, '2025-09-01', 339),
 (4127700, 'Toledo', 'Oeste', 2025, 10, '2025-10-01', 503),
 (4127700, 'Toledo', 'Oeste', 2025, 11, '2025-11-01', 965),
 (4127700, 'Toledo', 'Oeste', 2025, 12, '2025-12-01', 545),
 (4128104, 'Umuarama', 'Noroeste', 2024, 1, '2024-01-01', 544),
 (4128104, 'Umuarama', 'Noroeste', 2024, 2, '2024-02-01', 1922),
 (4128104, 'Umuarama', 'Noroeste', 2024, 3, '2024-03-01', 5212),
 (4128104, 'Umuarama', 'Noroeste', 2024, 4, '2024-04-01', 5407),
 (4128104, 'Umuarama', 'Noroeste', 2024, 5, '2024-05-01', 3287),
 (4128104, 'Umuarama', 'Noroeste', 2024, 6, '2024-06-01', 626),
 (4128104, 'Umuarama', 'Noroeste', 2024, 7, '2024-07-01', 157),
 (4128104, 'Umuarama', 'Noroeste', 2024, 8, '2024-08-01', 101),
 (4128104, 'Umuarama', 'Noroeste', 2024, 9, '2024-09-01', 151),
 (4128104, 'Umuarama', 'Noroeste', 2024, 10, '2024-10-01', 90),
 (4128104, 'Umuarama', 'Noroeste', 2024, 11, '2024-11-01', 115),
 (4128104, 'Umuarama', 'Noroeste', 2024, 12, '2024-12-01', 130),
 (4128104, 'Umuarama', 'Noroeste', 2025, 1, '2025-01-01', 196),
 (4128104, 'Umuarama', 'Noroeste', 2025, 2, '2025-02-01', 254),
 (4128104, 'Umuarama', 'Noroeste', 2025, 3, '2025-03-01', 519),
 (4128104, 'Umuarama', 'Noroeste', 2025, 4, '2025-04-01', 443),
 (4128104, 'Umuarama', 'Noroeste', 2025, 5, '2025-05-01', 577),
 (4128104, 'Umuarama', 'Noroeste', 2025, 6, '2025-06-01', 278),
 (4128104, 'Umuarama', 'Noroeste', 2025, 7, '2025-07-01', 88),
 (4128104, 'Umuarama', 'Noroeste', 2025, 8, '2025-08-01', 91),
 (4128104, 'Umuarama', 'Noroeste', 2025, 9, '2025-09-01', 91),
 (4128104, 'Umuarama', 'Noroeste', 2025, 10, '2025-10-01', 76),
 (4128104, 'Umuarama', 'Noroeste', 2025, 11, '2025-11-01', 178),
 (4128104, 'Umuarama', 'Noroeste', 2025, 12, '2025-12-01', 97);

\connect postgres

-- ---------- 3. Um banco por aluno, copiado do modelo ----------
CREATE DATABASE dengue_01 TEMPLATE dengue_modelo OWNER aluno01;
CREATE DATABASE dengue_02 TEMPLATE dengue_modelo OWNER aluno02;
CREATE DATABASE dengue_03 TEMPLATE dengue_modelo OWNER aluno03;
CREATE DATABASE dengue_04 TEMPLATE dengue_modelo OWNER aluno04;
CREATE DATABASE dengue_05 TEMPLATE dengue_modelo OWNER aluno05;
CREATE DATABASE dengue_06 TEMPLATE dengue_modelo OWNER aluno06;
CREATE DATABASE dengue_07 TEMPLATE dengue_modelo OWNER aluno07;
CREATE DATABASE dengue_08 TEMPLATE dengue_modelo OWNER aluno08;
CREATE DATABASE dengue_09 TEMPLATE dengue_modelo OWNER aluno09;
CREATE DATABASE dengue_10 TEMPLATE dengue_modelo OWNER aluno10;
CREATE DATABASE dengue_11 TEMPLATE dengue_modelo OWNER aluno11;
CREATE DATABASE dengue_12 TEMPLATE dengue_modelo OWNER aluno12;
CREATE DATABASE dengue_13 TEMPLATE dengue_modelo OWNER aluno13;
CREATE DATABASE dengue_14 TEMPLATE dengue_modelo OWNER aluno14;
CREATE DATABASE dengue_15 TEMPLATE dengue_modelo OWNER aluno15;
CREATE DATABASE dengue_16 TEMPLATE dengue_modelo OWNER aluno16;
CREATE DATABASE dengue_17 TEMPLATE dengue_modelo OWNER aluno17;
CREATE DATABASE dengue_18 TEMPLATE dengue_modelo OWNER aluno18;
CREATE DATABASE dengue_19 TEMPLATE dengue_modelo OWNER aluno19;
CREATE DATABASE dengue_20 TEMPLATE dengue_modelo OWNER aluno20;
CREATE DATABASE dengue_21 TEMPLATE dengue_modelo OWNER aluno21;
CREATE DATABASE dengue_22 TEMPLATE dengue_modelo OWNER aluno22;
CREATE DATABASE dengue_23 TEMPLATE dengue_modelo OWNER aluno23;
CREATE DATABASE dengue_24 TEMPLATE dengue_modelo OWNER aluno24;
CREATE DATABASE dengue_25 TEMPLATE dengue_modelo OWNER aluno25;
CREATE DATABASE dengue_26 TEMPLATE dengue_modelo OWNER aluno26;
CREATE DATABASE dengue_27 TEMPLATE dengue_modelo OWNER aluno27;
CREATE DATABASE dengue_28 TEMPLATE dengue_modelo OWNER aluno28;
CREATE DATABASE dengue_29 TEMPLATE dengue_modelo OWNER aluno29;
CREATE DATABASE dengue_30 TEMPLATE dengue_modelo OWNER aluno30;
CREATE DATABASE dengue_31 TEMPLATE dengue_modelo OWNER aluno31;
CREATE DATABASE dengue_32 TEMPLATE dengue_modelo OWNER aluno32;

-- ---------- 4. Cada aluno vira dono das tabelas do próprio banco ----------
-- Sem isso as tabelas continuam do superusuário e o aluno não consegue dar GRANT.
-- (o resetar.sh repete este passo para um aluno só)
\connect dengue_01
ALTER TABLE municipios OWNER TO aluno01; ALTER TABLE casos_dengue OWNER TO aluno01;
\connect dengue_02
ALTER TABLE municipios OWNER TO aluno02; ALTER TABLE casos_dengue OWNER TO aluno02;
\connect dengue_03
ALTER TABLE municipios OWNER TO aluno03; ALTER TABLE casos_dengue OWNER TO aluno03;
\connect dengue_04
ALTER TABLE municipios OWNER TO aluno04; ALTER TABLE casos_dengue OWNER TO aluno04;
\connect dengue_05
ALTER TABLE municipios OWNER TO aluno05; ALTER TABLE casos_dengue OWNER TO aluno05;
\connect dengue_06
ALTER TABLE municipios OWNER TO aluno06; ALTER TABLE casos_dengue OWNER TO aluno06;
\connect dengue_07
ALTER TABLE municipios OWNER TO aluno07; ALTER TABLE casos_dengue OWNER TO aluno07;
\connect dengue_08
ALTER TABLE municipios OWNER TO aluno08; ALTER TABLE casos_dengue OWNER TO aluno08;
\connect dengue_09
ALTER TABLE municipios OWNER TO aluno09; ALTER TABLE casos_dengue OWNER TO aluno09;
\connect dengue_10
ALTER TABLE municipios OWNER TO aluno10; ALTER TABLE casos_dengue OWNER TO aluno10;
\connect dengue_11
ALTER TABLE municipios OWNER TO aluno11; ALTER TABLE casos_dengue OWNER TO aluno11;
\connect dengue_12
ALTER TABLE municipios OWNER TO aluno12; ALTER TABLE casos_dengue OWNER TO aluno12;
\connect dengue_13
ALTER TABLE municipios OWNER TO aluno13; ALTER TABLE casos_dengue OWNER TO aluno13;
\connect dengue_14
ALTER TABLE municipios OWNER TO aluno14; ALTER TABLE casos_dengue OWNER TO aluno14;
\connect dengue_15
ALTER TABLE municipios OWNER TO aluno15; ALTER TABLE casos_dengue OWNER TO aluno15;
\connect dengue_16
ALTER TABLE municipios OWNER TO aluno16; ALTER TABLE casos_dengue OWNER TO aluno16;
\connect dengue_17
ALTER TABLE municipios OWNER TO aluno17; ALTER TABLE casos_dengue OWNER TO aluno17;
\connect dengue_18
ALTER TABLE municipios OWNER TO aluno18; ALTER TABLE casos_dengue OWNER TO aluno18;
\connect dengue_19
ALTER TABLE municipios OWNER TO aluno19; ALTER TABLE casos_dengue OWNER TO aluno19;
\connect dengue_20
ALTER TABLE municipios OWNER TO aluno20; ALTER TABLE casos_dengue OWNER TO aluno20;
\connect dengue_21
ALTER TABLE municipios OWNER TO aluno21; ALTER TABLE casos_dengue OWNER TO aluno21;
\connect dengue_22
ALTER TABLE municipios OWNER TO aluno22; ALTER TABLE casos_dengue OWNER TO aluno22;
\connect dengue_23
ALTER TABLE municipios OWNER TO aluno23; ALTER TABLE casos_dengue OWNER TO aluno23;
\connect dengue_24
ALTER TABLE municipios OWNER TO aluno24; ALTER TABLE casos_dengue OWNER TO aluno24;
\connect dengue_25
ALTER TABLE municipios OWNER TO aluno25; ALTER TABLE casos_dengue OWNER TO aluno25;
\connect dengue_26
ALTER TABLE municipios OWNER TO aluno26; ALTER TABLE casos_dengue OWNER TO aluno26;
\connect dengue_27
ALTER TABLE municipios OWNER TO aluno27; ALTER TABLE casos_dengue OWNER TO aluno27;
\connect dengue_28
ALTER TABLE municipios OWNER TO aluno28; ALTER TABLE casos_dengue OWNER TO aluno28;
\connect dengue_29
ALTER TABLE municipios OWNER TO aluno29; ALTER TABLE casos_dengue OWNER TO aluno29;
\connect dengue_30
ALTER TABLE municipios OWNER TO aluno30; ALTER TABLE casos_dengue OWNER TO aluno30;
\connect dengue_31
ALTER TABLE municipios OWNER TO aluno31; ALTER TABLE casos_dengue OWNER TO aluno31;
\connect dengue_32
ALTER TABLE municipios OWNER TO aluno32; ALTER TABLE casos_dengue OWNER TO aluno32;

\connect postgres
\echo '--- carga concluida: 32 alunos, 32 bancos dengue_NN ---'
