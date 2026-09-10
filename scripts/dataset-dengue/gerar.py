#!/usr/bin/env python3
"""
gerar.py — Monta o conjunto de dados do épico UC01 (A54 a A57).

Baixa dados REAIS de dengue do InfoDengue (Fiocruz e FGV), agrega por mês e
injeta seis defeitos de propósito. O aluno limpa esses defeitos na A54.

  Fonte:  https://info.dengue.mat.br/api/alertcity
  Saída:  aulas/09set/A54_UC01_10set/public/dados/dengue_pr_bruto.xlsx   (entrada da A54)
          aulas/09set/A54_UC01_10set/public/dados/dengue_pr_limpo.xlsx   (rede p/ quem faltou)

Uso:  ./venv/bin/python scripts/dataset-dengue/gerar.py [--cache DIR]

Os números NÃO são inventados. Só os defeitos são. O gabarito de quais defeitos
foram injetados fica no README.md gerado ao lado dos arquivos.
"""
import csv, io, json, random, sys, urllib.request
from collections import defaultdict
from datetime import date
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill

RAIZ = Path(__file__).resolve().parents[2]
SAIDA = RAIZ / "aulas/09set/A54_UC01_10set/public/dados"
API = ("https://info.dengue.mat.br/api/alertcity"
       "?geocode={cod}&disease=dengue&format=csv&ew_start=1&ew_end=53&ey_start=2024&ey_end=2025")
ANOS = (2024, 2025)
SEED = 20260910  # fixo: o arquivo tem que sair igual toda vez

# Macrorregionais de saúde do Paraná (SESA-PR)
MUNICIPIOS = [
    ("4106902", "Curitiba",             "Leste"),
    ("4125506", "São José dos Pinhais", "Leste"),
    ("4119905", "Ponta Grossa",         "Leste"),
    ("4109401", "Guarapuava",           "Leste"),
    ("4118204", "Paranaguá",            "Leste"),
    ("4104808", "Cascavel",             "Oeste"),
    ("4108304", "Foz do Iguaçu",        "Oeste"),
    ("4127700", "Toledo",               "Oeste"),
    ("4108403", "Francisco Beltrão",    "Oeste"),
    ("4118501", "Pato Branco",          "Oeste"),
    ("4113700", "Londrina",             "Norte"),
    ("4101408", "Apucarana",            "Norte"),
    ("4112801", "Jacarezinho",          "Norte"),
    ("4115200", "Maringá",              "Noroeste"),
    ("4128104", "Umuarama",             "Noroeste"),
    ("4104204", "Campo Mourão",         "Noroeste"),
    ("4118402", "Paranavaí",            "Noroeste"),
]
MES_ABREV = ["jan", "fev", "mar", "abr", "mai", "jun",
             "jul", "ago", "set", "out", "nov", "dez"]
COLUNAS = ["municipio", "macrorregional", "codigo_ibge", "ano", "mes",
           "data_referencia", "casos", "populacao"]


def baixar(cache: Path | None):
    """Uma linha por municipio/ano/mes, somando as semanas epidemiologicas."""
    agregado, populacao = defaultdict(int), {}
    for cod, nome, regiao in MUNICIPIOS:
        bruto = None
        if cache and (cache / f"{cod}.csv").exists():
            bruto = (cache / f"{cod}.csv").read_text(encoding="utf-8")
        else:
            with urllib.request.urlopen(API.format(cod=cod), timeout=90) as resposta:
                bruto = resposta.read().decode("utf-8")
        linhas = list(csv.DictReader(io.StringIO(bruto)))
        if len(linhas) < 50:
            sys.exit(f"ERRO: {nome} ({cod}) devolveu {len(linhas)} linhas. Abortando: "
                     f"nao inventar dado. Rode de novo ou confira a API.")
        for reg in linhas:
            ano, mes = int(reg["data_iniSE"][:4]), int(reg["data_iniSE"][5:7])
            if ano not in ANOS:
                continue
            agregado[(nome, regiao, cod, ano, mes)] += int(float(reg["casos"]))
            populacao[(nome, ano)] = int(float(reg["pop"]))
        print(f"  {nome:22} {regiao:9} ok", file=sys.stderr)

    limpo = []
    for (nome, regiao, cod, ano, mes), casos in agregado.items():
        limpo.append({
            "municipio": nome, "macrorregional": regiao, "codigo_ibge": int(cod),
            "ano": ano, "mes": mes, "data_referencia": date(ano, mes, 1),
            "casos": casos, "populacao": populacao[(nome, ano)],
        })
    limpo.sort(key=lambda r: (r["municipio"], r["ano"], r["mes"]))
    return limpo


def sujar(limpo, rnd):
    """Os seis defeitos. Devolve as linhas sujas e o gabarito do que foi feito."""
    linhas = [dict(r) for r in limpo]
    gabarito = defaultdict(list)

    # DEFEITO 4 — categoria escrita de quatro jeitos (quebra agrupar e CONT.SE)
    variantes = {"Norte": ["Norte", "norte", "NORTE", "Norte "],
                 "Oeste": ["Oeste", "oeste", "OESTE", "Oeste "],
                 "Leste": ["Leste", "leste", "LESTE", "Leste "],
                 "Noroeste": ["Noroeste", "noroeste", "NOROESTE", "Noroeste "]}
    for linha in linhas:
        linha["macrorregional"] = rnd.choice(variantes[linha["macrorregional"]])
    gabarito["4_categoria"].append("macrorregional em 4 grafias: Norte, norte, NORTE e 'Norte ' com espaco no fim")

    # DEFEITO 3 — data em tres formatos (quebra ordenacao cronologica)
    for linha in linhas:
        d, sorte = linha["data_referencia"], rnd.random()
        if sorte < 0.25:
            linha["data_referencia"] = f"{d.day:02d}/{d.month:02d}/{d.year}"
        elif sorte < 0.40:
            linha["data_referencia"] = f"{MES_ABREV[d.month - 1]}/{d.year}"
    gabarito["3_data"].append("data_referencia em 3 formatos: data real, texto dd/mm/aaaa e texto mmm/aaaa")

    # DEFEITO 2 — numero guardado como texto (quebra soma e ordenacao)
    alvos = rnd.sample(range(len(linhas)), k=int(len(linhas) * 0.18))
    for i in alvos:
        linhas[i]["casos"] = str(linhas[i]["casos"])
    gabarito["2_texto"].append(f"{len(alvos)} valores da coluna casos gravados como texto")

    # DEFEITO 5 — linha duplicada exata (infla a soma)
    dups = rnd.sample(range(len(linhas)), k=14)
    for i in sorted(dups, reverse=True):
        linhas.insert(i + 1, dict(linhas[i]))
    gabarito["5_duplicata"].append("14 linhas duplicadas exatas, sempre logo abaixo da original")

    # DEFEITO 6 — total no meio dos dados (dobra a contagem se somar a coluna)
    com_totais, atual, acumulado = [], None, 0
    for linha in linhas:
        if atual is not None and linha["municipio"] != atual:
            com_totais.append({"municipio": f"TOTAL {atual}", "macrorregional": "", "codigo_ibge": "",
                               "ano": "", "mes": "", "data_referencia": "", "casos": acumulado, "populacao": ""})
            acumulado = 0
        atual = linha["municipio"]
        acumulado += int(linha["casos"])
        com_totais.append(linha)
    com_totais.append({"municipio": f"TOTAL {atual}", "macrorregional": "", "codigo_ibge": "",
                       "ano": "", "mes": "", "data_referencia": "", "casos": acumulado, "populacao": ""})
    gabarito["6_total"].append(f"{len(MUNICIPIOS)} linhas 'TOTAL <municipio>' no meio dos dados")

    return com_totais, gabarito


def escrever(caminho, linhas, sujo, gabarito=None):
    """DEFEITO 1 (so no arquivo sujo): titulo mesclado antes do cabecalho."""
    wb = Workbook()
    ws = wb.active
    ws.title = "01_dados"
    inicio = 1
    if sujo:
        ws.merge_cells(start_row=1, start_column=1, end_row=2, end_column=len(COLUNAS))
        titulo = ws.cell(row=1, column=1)
        titulo.value = ("Casos prováveis de dengue por município e mês - Paraná - 2024 e 2025\n"
                        "Fonte: InfoDengue (Fiocruz e FGV) - info.dengue.mat.br - acesso em 09/09/2026")
        titulo.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        titulo.font = Font(bold=True)
        ws.row_dimensions[1].height = 22
        ws.row_dimensions[2].height = 22
        inicio = 3
        gabarito["1_mesclada"].append("titulo mesclado de A1 ate H2: o cabecalho nao esta na linha 1")

    ws.append([]) if False else None
    for i, nome in enumerate(COLUNAS, start=1):
        c = ws.cell(row=inicio, column=i, value=nome)
        c.font = Font(bold=True)
        c.fill = PatternFill("solid", fgColor="DDDDDD")
    for j, linha in enumerate(linhas, start=inicio + 1):
        for i, nome in enumerate(COLUNAS, start=1):
            ws.cell(row=j, column=i, value=linha[nome])
    larguras = [22, 16, 14, 8, 7, 18, 10, 12]
    for i, w in enumerate(larguras, start=1):
        ws.column_dimensions[ws.cell(row=inicio, column=i).column_letter].width = w
    if not sujo:
        ws.freeze_panes = ws.cell(row=inicio + 1, column=1)
        ws.auto_filter.ref = f"A{inicio}:H{inicio + len(linhas)}"
    caminho.parent.mkdir(parents=True, exist_ok=True)
    wb.save(caminho)
    return len(linhas)


def rede_a56(caminho, limpo):
    """Rede para quem faltar na A55: dado limpo, coluna de taxa pronta, log preenchido
    e o esqueleto da aba 03_comparacoes. As comparacoes em si o aluno ainda escreve."""
    wb = Workbook()

    ws = wb.active
    ws.title = "01_dados"
    # data_referencia sai: e o conserto do defeito 3 ensinado na A54 (ano e mes ja tem a informacao)
    base = [c for c in COLUNAS if c != "data_referencia"]
    cols = base + ["casos_por_100mil"]
    for i, nome in enumerate(cols, start=1):
        c = ws.cell(row=1, column=i, value=nome)
        c.font = Font(bold=True)
        c.fill = PatternFill("solid", fgColor="DDDDDD")
    for j, linha in enumerate(limpo, start=2):
        for i, nome in enumerate(base, start=1):
            ws.cell(row=j, column=i, value=linha[nome])
        ws.cell(row=j, column=len(cols),
                value=round(100000 * linha["casos"] / linha["populacao"], 2))
    ws.freeze_panes = "A2"
    ws.auto_filter.ref = f"A1:H{len(limpo) + 1}"

    log = wb.create_sheet("02_limpeza")
    log.append(["Defeito", "O que eu fiz", "Linhas afetadas"])
    for c in log[1]:
        c.font = Font(bold=True)
    for linha in [["celula mesclada", "excluí as linhas 1 e 2 do titulo", 2],
                  ["numero como texto", "converti a coluna casos para numero", 73],
                  ["data em tres formatos", "excluí a coluna data_referencia (ano e mes ja tem)", 0],
                  ["categoria em quatro grafias", "padronizei macrorregional para 4 valores", "varias"],
                  ["linha duplicada", "removi duplicatas por municipio, ano e mes", 14],
                  ["total no meio", "excluí as linhas TOTAL <municipio>", len(MUNICIPIOS)],
                  ["", "linhas esperadas: 17 municipios x 12 meses x 2 anos", len(limpo)]]:
        log.append(linha)
    log.column_dimensions["A"].width = 30
    log.column_dimensions["B"].width = 52
    log.column_dimensions["C"].width = 16

    cmp_ = wb.create_sheet("03_comparacoes")
    for texto in ["1. TABELAS DINAMICAS (monte aqui as tres do Exercicio 4)", "", "",
                  "2. TRES COMPARACOES QUE O DADO SUSTENTA", "",
                  "pergunta | criterio usado | resposta | numero", "", "", "",
                  "3. DUAS PERGUNTAS QUE O DADO NAO RESPONDE", "",
                  "pergunta | qual dado faltaria", "", ""]:
        cmp_.append([texto])
    for linha in (1, 4, 10):
        cmp_.cell(row=linha, column=1).font = Font(bold=True)
    cmp_.column_dimensions["A"].width = 70

    wb.save(caminho)


def main():
    cache = None
    if "--cache" in sys.argv:
        cache = Path(sys.argv[sys.argv.index("--cache") + 1])
    print("Baixando InfoDengue...", file=sys.stderr)
    limpo = baixar(cache)
    rnd = random.Random(SEED)
    sujo, gabarito = sujar(limpo, rnd)

    n_sujo = escrever(SAIDA / "dengue_pr_bruto.xlsx", sujo, True, gabarito)
    n_limpo = escrever(SAIDA / "dengue_pr_limpo.xlsx", limpo, False)
    rede_a56(SAIDA / "dengue_pr_comparado.xlsx", limpo)

    (SAIDA / "gabarito.json").write_text(
        json.dumps({"seed": SEED, "linhas_limpas": n_limpo, "linhas_sujas": n_sujo,
                    "defeitos": {k: v for k, v in sorted(gabarito.items())}},
                   ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\ndengue_pr_bruto.xlsx  {n_sujo} linhas (com defeitos)")
    print(f"dengue_pr_limpo.xlsx  {n_limpo} linhas (gabarito da A54)")
    print(f"dengue_pr_comparado.xlsx  rede para quem faltar na A55")


if __name__ == "__main__":
    main()
