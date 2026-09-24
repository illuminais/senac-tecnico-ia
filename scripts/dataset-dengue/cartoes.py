#!/usr/bin/env python3
"""
cartoes.py: gera os 34 cartões do SQL humano da A59 (épico 2, Banco de Dados).

Cada cartão é UMA LINHA REAL da tabela casos_dengue: os 17 municípios em março e
abril de 2025. Os números saem do banco de pé (container `dengue`), não da
planilha, para o cartão bater com o que o aluno vê no DBeaver depois.

Saída: aulas/09set/A59_UC08_25set/public/materiais/cartoes-sql-humano.html
       4 cartões por folha A4, 9 folhas. Imprimir e recortar.

Ordem de impressão: por município, março e depois abril. Assim os 4 alunos que
ficam com dois cartões recebem março e abril do MESMO município, e na rodada do
GROUP BY os dois cartões vão para o mesmo canto.

Uso (servidor de pé: cd scripts/dataset-dengue/servidor && docker compose up -d):
      python3 scripts/dataset-dengue/cartoes.py
"""
import html
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
SAIDA = RAIZ / "aulas/09set/A59_UC08_25set/public/materiais/cartoes-sql-humano.html"

CONSULTA = """
SELECT codigo_ibge, municipio, macrorregional, ano, mes, data_referencia, casos
FROM casos_dengue
WHERE ano = 2025 AND mes IN (3, 4)
ORDER BY municipio, mes;
"""
COLUNAS = ["codigo_ibge", "municipio", "macrorregional", "ano", "mes", "data_referencia", "casos"]
MESES = {3: "março", 4: "abril"}


def ler_linhas():
    # mesma conta de folga que o checar-sql.mjs usa: o banco dela está sempre como no primeiro dia
    r = subprocess.run(
        ["docker", "exec", "-i", "-e", "PGPASSWORD=dengue32", "dengue", "psql", "-h", "localhost",
         "-U", "aluno32", "-d", "dengue_32", "-X", "-q", "-tA", "-F", "|", "-c", CONSULTA],
        capture_output=True, text=True)
    if r.returncode:
        sys.exit(f"ERRO: o servidor de dengue não respondeu.\n{r.stderr}")
    linhas = [dict(zip(COLUNAS, l.split("|"))) for l in r.stdout.strip().split("\n")]
    if len(linhas) != 34:
        sys.exit(f"ERRO: esperava 34 linhas (17 municípios × março e abril de 2025), vieram {len(linhas)}")
    return linhas


def cartao(n, l):
    e = {k: html.escape(v) for k, v in l.items()}
    mes = int(l["mes"])
    celulas_cab = "".join(f"<th>{c}</th>" for c in COLUNAS)
    celulas = "".join(f"<td>{e[c]}</td>" for c in COLUNAS)
    return f"""
  <section class="cartao">
    <header><span>SQL humano · uma linha da tabela <code>casos_dengue</code></span><span>cartão {n} de 34</span></header>
    <p class="rotulo">municipio</p>
    <p class="municipio">{e['municipio']}</p>
    <div class="campos">
      <div><p class="rotulo">macrorregional</p><p class="grande caixa">{e['macrorregional']}</p></div>
      <div><p class="rotulo">ano</p><p class="grande">{e['ano']}</p></div>
      <div><p class="rotulo">mes</p><p class="grande">{mes} <small>({MESES[mes]})</small></p></div>
    </div>
    <p class="rotulo">casos</p>
    <p class="casos">{e['casos']}</p>
    <div class="vazio"></div>
    <p class="rotulo">a linha inteira, como está no banco</p>
    <table><tr>{celulas_cab}</tr><tr>{celulas}</tr></table>
  </section>"""


CSS = """
@page { size: A4; margin: 8mm; }
* { box-sizing: border-box; }
body { margin: 0; font-family: "IBM Plex Sans", system-ui, sans-serif; color: #111; }
.folha { width: 194mm; height: 281mm; display: grid; grid-template-columns: 1fr 1fr;
         grid-template-rows: 1fr 1fr; gap: 0; page-break-after: always; break-after: page; }
.folha:last-child { page-break-after: auto; break-after: auto; }
.cartao { border: 1px dashed #888; padding: 6mm 6mm 5mm; display: flex; flex-direction: column; }
header { display: flex; justify-content: space-between; font-size: 8pt; color: #555;
         border-bottom: 1px solid #ccc; padding-bottom: 1.5mm; margin-bottom: 3mm; }
code, table { font-family: "IBM Plex Mono", ui-monospace, monospace; }
.rotulo { margin: 0; font-size: 8pt; color: #555; font-family: "IBM Plex Mono", ui-monospace, monospace; }
.municipio { margin: 0 0 3mm; font-size: 24pt; font-weight: 800; line-height: 1.1; }
.campos { display: grid; grid-template-columns: 1.4fr 1fr 1.2fr; gap: 3mm; margin-bottom: 3mm; }
.grande { margin: 0; font-size: 17pt; font-weight: 700; }
.grande small { font-size: 10pt; font-weight: 400; }
.caixa { border: 2px solid #111; border-radius: 2mm; padding: 0.5mm 2mm; display: inline-block; }
.casos { margin: 0; font-size: 34pt; font-weight: 800; font-family: "IBM Plex Mono", ui-monospace, monospace; }
.vazio { flex: 1; min-height: 10mm; }
table { border-collapse: collapse; width: 100%; font-size: 6.5pt; margin-top: 1mm; }
th, td { border: 1px solid #999; padding: 0.8mm 1mm; text-align: left; }
th { background: #eee; font-weight: 600; }
@media screen { body { background: #ddd; } .folha { background: #fff; margin: 8mm auto; } }
"""


def main():
    linhas = ler_linhas()
    folhas = []
    for i in range(0, len(linhas), 4):
        grupo = "".join(cartao(i + k + 1, l) for k, l in enumerate(linhas[i:i + 4]))
        folhas.append(f'<div class="folha">{grupo}\n</div>')
    doc = f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>A59: cartões do SQL humano (34)</title>
<!-- Gerado por scripts/dataset-dengue/cartoes.py a partir do banco. Não editar à mão. -->
<style>{CSS}</style>
</head>
<body>
{chr(10).join(folhas)}
</body>
</html>
"""
    SAIDA.parent.mkdir(parents=True, exist_ok=True)
    SAIDA.write_text(doc, encoding="utf-8")
    print(f"{len(linhas)} cartões em {len(folhas)} folhas: {SAIDA.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
