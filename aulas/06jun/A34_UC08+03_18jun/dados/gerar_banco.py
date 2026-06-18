import sqlite3, csv, pathlib

dados = pathlib.Path(__file__).parent
conn = sqlite3.connect(dados / 'copa2026.db')

for csv_file in sorted(dados.glob('*.csv')):
    tabela = csv_file.stem
    with open(csv_file) as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    cols = reader.fieldnames
    conn.execute(f'DROP TABLE IF EXISTS {tabela}')
    conn.execute(f'CREATE TABLE {tabela} ({", ".join(cols)})')
    placeholders = ', '.join(['?'] * len(cols))
    conn.executemany(
        f'INSERT INTO {tabela} VALUES ({placeholders})',
        [[r[c] for c in cols] for r in rows]
    )
    print(f'{tabela}: {len(rows)} linhas')

conn.commit()
conn.close()
