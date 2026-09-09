#!/usr/bin/env bash
# Executa o .ts gerado num mock do ExcelScript, sobre os dados reais das abas.
# Uso:  ./testar.sh UC2 [-T3]
# Requer: bun (para tsc e para rodar o TypeScript)
set -euo pipefail
TAB="${1:?uso: ./testar.sh UC2 [-T3]}"
SUF="${2:-}"
BASE="$(cd "$(dirname "$0")" && pwd)"
TS="$BASE/saida/preencher-${TAB}${SUF}.ts"
[ -f "$TS" ] || { echo "não existe: $TS  (rode gerar.py antes)"; exit 1; }
TMP="$BASE/.teste"; mkdir -p "$TMP"

TRI=2; [ "$SUF" = "-T3" ] && TRI=3

"$BASE/venv/bin/python" - "$TAB" "$TRI" "$TMP" <<'PY'
import json, sys, openpyxl, gerar
tab, tri, tmp = sys.argv[1], int(sys.argv[2]), sys.argv[3]
wb = openpyxl.load_workbook(gerar.XLSX_PATH, data_only=True)
g = {}
for nome in gerar.abas_da_uc(wb, tab, tri):
    ws = wb[nome]
    g[nome] = [[("" if ws.cell(row=r, column=c).value is None else str(ws.cell(row=r, column=c).value))
                for c in range(1, 51)] for r in range(1, 201)]
json.dump(g, open(f"{tmp}/grades.json", "w"), ensure_ascii=False)
PY

cat > "$TMP/excelscript.d.ts" <<'DTS'
// Stub MÍNIMO, escrito à mão — não é o tipo oficial da Microsoft.
// Valida a lógica interna do script, NÃO a assinatura real das APIs.
declare namespace ExcelScript {
  interface Range {
    getValues(): (string|number|boolean|null)[][];
    setValue(v: string|number|boolean): void;
    setNumberFormat(f: string): void;
  }
  interface Worksheet { getName(): string; getRangeByIndexes(r:number,c:number,rc:number,cc:number): Range; }
  interface Workbook { getWorksheet(n: string): Worksheet; getWorksheets(): Worksheet[]; }
}
declare const console: { log(...a: unknown[]): void };
DTS

cat > "$TMP/harness.ts" <<'HARNESS'
const G: Record<string, string[][]> = JSON.parse(require("fs").readFileSync(__dirname + "/grades.json", "utf-8"));
const W: { aba: string; cel: string; valor: string }[] = [];
const FMT: Record<string, string> = {};
const letra = (c: number): string => { let s = "", n = c + 1;
    while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = ((n - 1) / 26) | 0; } return s; };
function mk(nome: string) { const g = G[nome];
    return { getName: () => nome, getRangeByIndexes(r: number, c: number, rc: number, cc: number) {
        return { getValues: () => { const o: string[][] = []; for (let i = r; i < r + rc; i++) o.push((g[i] || []).slice(c, c + cc)); return o; },
                 setNumberFormat: (f: string) => { FMT[`${nome}!${letra(c)}${r + 1}`] = f; },
                 setValue: (v: string) => { g[r][c] = v; W.push({ aba: nome, cel: `${letra(c)}${r + 1}`, valor: v }); } }; } }; }
const S: Record<string, ReturnType<typeof mk>> = {};
for (const n of Object.keys(G)) S[n] = mk(n);
const WB = { getWorksheet: (n: string) => S[n], getWorksheets: () => Object.keys(S).map(n => S[n]) };
const resumo: string[] = [];
for (const p of [1, 2]) {
    W.length = 0;
    console.log(`\n===== PASSADA ${p} =====`);
    (main as unknown as (wb: unknown) => void)(WB);
    const kp = Object.keys(G).filter(k => k.indexOf("Processo") >= 0)[0];
    const gp = G[kp];
    const linhas: string[] = [];
    for (let r = 0; r < 160; r++) if (gp[r][13]) linhas.push(`r${r + 1}`);
    resumo.push(`passada ${p}: ${W.length} escritas | processo ocupa ${linhas.length} linhas`);
}
const fmts = Object.keys(FMT);
console.log(`\n--- datas: ${fmts.length} células, todas com formato "@"? ${fmts.every(k => FMT[k] === "@")} ---`);
for (const r of resumo) console.log("  " + r);
console.log(resumo[0].split("|")[1] === resumo[1].split("|")[1]
    ? "  IDEMPOTENTE: as duas passadas terminam no mesmo estado"
    : "  >>> ATENÇÃO: as passadas divergem, o Feedback de Processo pode estar duplicando");
HARNESS

# tsconfig próprio: sem isso o tsc puxa os @types do monorepo e quebra
cat > "$TMP/tsconfig.json" <<'TSC'
{
  "compilerOptions": {
    "noEmit": true, "target": "es2018", "lib": ["es2018"],
    "strict": true, "noUnusedLocals": true,
    "types": [], "typeRoots": []
  },
  "files": ["excelscript.d.ts", "script.ts"]
}
TSC

cp "$TS" "$TMP/script.ts"
cd "$TMP"
bun x tsc --project tsconfig.json
cat script.ts harness.ts > run.ts
bun run.ts
