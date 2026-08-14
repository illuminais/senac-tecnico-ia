-- ---------------------------------------------------------------------------
-- Setup do banco do abrigo para a A47 (14/08/2026)
-- Roda UMA vez, como superusuario, antes da aula:
--
--     psql -h SEU_HOST -U postgres -f setup-postgres-abrigo.sql
--
-- Cria: 1 banco modelo com schema e dados, 16 contas de grupo,
--       e 1 banco por grupo (copia do modelo, com a dupla como dona).
--
-- Cada dupla entra com usuario duplaNN e senha abrigoNN.
-- Como a dupla e DONA do proprio banco e tem CREATEROLE, ela consegue
-- criar contas e rodar GRANT e REVOKE de verdade.
-- ---------------------------------------------------------------------------

-- ---------- 1. Contas das duplas ----------
-- CREATEROLE deixa a dupla criar as contas do exercicio.
-- Sem SUPERUSER: elas nao conseguem mexer no banco das outras.

CREATE ROLE dupla01 LOGIN PASSWORD 'abrigo01' CREATEROLE;
CREATE ROLE dupla02 LOGIN PASSWORD 'abrigo02' CREATEROLE;
CREATE ROLE dupla03 LOGIN PASSWORD 'abrigo03' CREATEROLE;
CREATE ROLE dupla04 LOGIN PASSWORD 'abrigo04' CREATEROLE;
CREATE ROLE dupla05 LOGIN PASSWORD 'abrigo05' CREATEROLE;
CREATE ROLE dupla06 LOGIN PASSWORD 'abrigo06' CREATEROLE;
CREATE ROLE dupla07 LOGIN PASSWORD 'abrigo07' CREATEROLE;
CREATE ROLE dupla08 LOGIN PASSWORD 'abrigo08' CREATEROLE;
CREATE ROLE dupla09 LOGIN PASSWORD 'abrigo09' CREATEROLE;
CREATE ROLE dupla10 LOGIN PASSWORD 'abrigo10' CREATEROLE;
CREATE ROLE dupla11 LOGIN PASSWORD 'abrigo11' CREATEROLE;
CREATE ROLE dupla12 LOGIN PASSWORD 'abrigo12' CREATEROLE;
CREATE ROLE dupla13 LOGIN PASSWORD 'abrigo13' CREATEROLE;
CREATE ROLE dupla14 LOGIN PASSWORD 'abrigo14' CREATEROLE;
CREATE ROLE dupla15 LOGIN PASSWORD 'abrigo15' CREATEROLE;
CREATE ROLE dupla16 LOGIN PASSWORD 'abrigo16' CREATEROLE;

-- ---------- 2. Banco modelo ----------

CREATE DATABASE abrigo_modelo;

\connect abrigo_modelo

CREATE TABLE animais (
    id            INTEGER PRIMARY KEY,
    nome_animal   TEXT    NOT NULL,
    especie       TEXT    NOT NULL,
    porte         TEXT    NOT NULL,
    idade_meses   INTEGER NOT NULL,
    dias_no_abrigo INTEGER NOT NULL,
    adotado       TEXT    NOT NULL
);

CREATE TABLE adotantes (
    id        INTEGER PRIMARY KEY,
    nome      TEXT NOT NULL,
    cpf       TEXT NOT NULL,
    telefone  TEXT NOT NULL,
    endereco  TEXT NOT NULL
);

CREATE TABLE adocoes (
    id          INTEGER PRIMARY KEY,
    id_animal   INTEGER NOT NULL REFERENCES animais(id),
    id_adotante INTEGER NOT NULL REFERENCES adotantes(id),
    data_adocao DATE    NOT NULL
);

INSERT INTO animais VALUES
 (1,'Rex','cao','grande',3,10,'nao'),
 (2,'Mel','gata','pequeno',48,210,'nao'),
 (3,'Nina','gata','medio',6,22,'sim'),
 (4,'Thor','cao','grande',60,5,'nao'),
 (5,'Luna','gata','pequeno',2,8,'nao'),
 (6,'Bento','cao','medio',84,180,'sim'),
 (7,'Fred','cao','pequeno',12,45,'nao'),
 (8,'Amora','gata','grande',36,130,'nao'),
 (9,'Duke','cao','grande',18,60,'nao'),
 (10,'Mia','gata','pequeno',4,15,'sim'),
 (11,'Zeus','cao','medio',30,95,'nao'),
 (12,'Lola','gata','grande',54,250,'nao'),
 (13,'Simba','cao','pequeno',8,33,'sim'),
 (14,'Bela','gata','medio',42,70,'nao'),
 (15,'Max','cao','grande',72,300,'nao'),
 (16,'Chica','gata','pequeno',5,12,'sim'),
 (17,'Toby','cao','medio',20,55,'nao'),
 (18,'Sol','gata','grande',60,190,'nao'),
 (19,'Pingo','cao','pequeno',3,9,'sim'),
 (20,'Nala','gata','medio',15,40,'nao'),
 (21,'Bidu','cao','grande',96,320,'nao'),
 (22,'Frida','gata','pequeno',7,18,'nao'),
 (23,'Bob','cao','medio',48,110,'sim'),
 (24,'Estrela','gata','grande',30,85,'nao'),
 (25,'Salsicha','cao','pequeno',10,25,'nao'),
 (26,'Mimosa','gata','medio',66,275,'nao'),
 (27,'Trovao','cao','grande',24,65,'sim');

INSERT INTO adotantes VALUES
 (1,'Ana Souza',      '111.222.333-44','(51) 99101-0001','Rua das Flores, 120'),
 (2,'Bruno Lima',     '222.333.444-55','(51) 99102-0002','Av. Brasil, 3400'),
 (3,'Carla Mendes',   '333.444.555-66','(51) 99103-0003','Rua Sao Pedro, 45'),
 (4,'Diego Alves',    '444.555.666-77','(51) 99104-0004','Travessa Azul, 9'),
 (5,'Elisa Ramos',    '555.666.777-88','(51) 99105-0005','Rua do Porto, 780'),
 (6,'Felipe Castro',  '666.777.888-99','(51) 99106-0006','Av. Central, 51'),
 (7,'Gabi Nunes',     '777.888.999-00','(51) 99107-0007','Rua Verde, 233'),
 (8,'Heitor Rocha',   '888.999.000-11','(51) 99108-0008','Rua das Acacias, 17');

INSERT INTO adocoes VALUES
 (1, 3,1,'2026-03-14'),
 (2, 6,2,'2026-04-02'),
 (3,10,3,'2026-04-28'),
 (4,13,4,'2026-05-19'),
 (5,16,5,'2026-06-07'),
 (6,19,6,'2026-06-23'),
 (7,23,7,'2026-07-11'),
 (8,27,8,'2026-07-30');

\connect postgres

-- ---------- 3. Um banco por dupla, copiado do modelo ----------

CREATE DATABASE abrigo_d01 TEMPLATE abrigo_modelo OWNER dupla01;
CREATE DATABASE abrigo_d02 TEMPLATE abrigo_modelo OWNER dupla02;
CREATE DATABASE abrigo_d03 TEMPLATE abrigo_modelo OWNER dupla03;
CREATE DATABASE abrigo_d04 TEMPLATE abrigo_modelo OWNER dupla04;
CREATE DATABASE abrigo_d05 TEMPLATE abrigo_modelo OWNER dupla05;
CREATE DATABASE abrigo_d06 TEMPLATE abrigo_modelo OWNER dupla06;
CREATE DATABASE abrigo_d07 TEMPLATE abrigo_modelo OWNER dupla07;
CREATE DATABASE abrigo_d08 TEMPLATE abrigo_modelo OWNER dupla08;
CREATE DATABASE abrigo_d09 TEMPLATE abrigo_modelo OWNER dupla09;
CREATE DATABASE abrigo_d10 TEMPLATE abrigo_modelo OWNER dupla10;
CREATE DATABASE abrigo_d11 TEMPLATE abrigo_modelo OWNER dupla11;
CREATE DATABASE abrigo_d12 TEMPLATE abrigo_modelo OWNER dupla12;
CREATE DATABASE abrigo_d13 TEMPLATE abrigo_modelo OWNER dupla13;
CREATE DATABASE abrigo_d14 TEMPLATE abrigo_modelo OWNER dupla14;
CREATE DATABASE abrigo_d15 TEMPLATE abrigo_modelo OWNER dupla15;
CREATE DATABASE abrigo_d16 TEMPLATE abrigo_modelo OWNER dupla16;

-- ---------- 4. Cada dupla vira dona das tabelas do proprio banco ----------
-- Sem isso as tabelas continuam pertencendo ao superusuario e a dupla
-- nao consegue dar GRANT nelas.

\connect abrigo_d01
ALTER TABLE animais OWNER TO dupla01; ALTER TABLE adotantes OWNER TO dupla01; ALTER TABLE adocoes OWNER TO dupla01;
\connect abrigo_d02
ALTER TABLE animais OWNER TO dupla02; ALTER TABLE adotantes OWNER TO dupla02; ALTER TABLE adocoes OWNER TO dupla02;
\connect abrigo_d03
ALTER TABLE animais OWNER TO dupla03; ALTER TABLE adotantes OWNER TO dupla03; ALTER TABLE adocoes OWNER TO dupla03;
\connect abrigo_d04
ALTER TABLE animais OWNER TO dupla04; ALTER TABLE adotantes OWNER TO dupla04; ALTER TABLE adocoes OWNER TO dupla04;
\connect abrigo_d05
ALTER TABLE animais OWNER TO dupla05; ALTER TABLE adotantes OWNER TO dupla05; ALTER TABLE adocoes OWNER TO dupla05;
\connect abrigo_d06
ALTER TABLE animais OWNER TO dupla06; ALTER TABLE adotantes OWNER TO dupla06; ALTER TABLE adocoes OWNER TO dupla06;
\connect abrigo_d07
ALTER TABLE animais OWNER TO dupla07; ALTER TABLE adotantes OWNER TO dupla07; ALTER TABLE adocoes OWNER TO dupla07;
\connect abrigo_d08
ALTER TABLE animais OWNER TO dupla08; ALTER TABLE adotantes OWNER TO dupla08; ALTER TABLE adocoes OWNER TO dupla08;
\connect abrigo_d09
ALTER TABLE animais OWNER TO dupla09; ALTER TABLE adotantes OWNER TO dupla09; ALTER TABLE adocoes OWNER TO dupla09;
\connect abrigo_d10
ALTER TABLE animais OWNER TO dupla10; ALTER TABLE adotantes OWNER TO dupla10; ALTER TABLE adocoes OWNER TO dupla10;
\connect abrigo_d11
ALTER TABLE animais OWNER TO dupla11; ALTER TABLE adotantes OWNER TO dupla11; ALTER TABLE adocoes OWNER TO dupla11;
\connect abrigo_d12
ALTER TABLE animais OWNER TO dupla12; ALTER TABLE adotantes OWNER TO dupla12; ALTER TABLE adocoes OWNER TO dupla12;
\connect abrigo_d13
ALTER TABLE animais OWNER TO dupla13; ALTER TABLE adotantes OWNER TO dupla13; ALTER TABLE adocoes OWNER TO dupla13;
\connect abrigo_d14
ALTER TABLE animais OWNER TO dupla14; ALTER TABLE adotantes OWNER TO dupla14; ALTER TABLE adocoes OWNER TO dupla14;
\connect abrigo_d15
ALTER TABLE animais OWNER TO dupla15; ALTER TABLE adotantes OWNER TO dupla15; ALTER TABLE adocoes OWNER TO dupla15;
\connect abrigo_d16
ALTER TABLE animais OWNER TO dupla16; ALTER TABLE adotantes OWNER TO dupla16; ALTER TABLE adocoes OWNER TO dupla16;

\connect postgres
\echo '--- setup concluido: 16 grupos, 16 bancos ---'
