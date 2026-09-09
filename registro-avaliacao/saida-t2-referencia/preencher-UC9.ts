/* ============================================================================
 * GERADO AUTOMATICAMENTE — não edite este arquivo à mão.
 * Fonte:  gerar.py + frases.json
 * Aba:    UC9  (UC03 na planilha do instrutor — Fundamentos Matemáticos para Computação e IA)
 * Gerado: 2026-09-04
 *
 * Cole no Excel Online (Automatizar > Novo Script) e execute.
 * Não escreve nada se algum nome de aluno não bater com a planilha.
 * ========================================================================== */

const ABA_REGISTRO = "UC9 - Registro de Avaliação 2º";
const ABA_FB_IND = "UC9 - Feedback de Indicador";
const ABA_FB_PROC = "UC9 - Feedback de Processo";

const PROC_PA = "Demonstrou domínio parcial dos critérios. Foi ofertada recuperação, não realizada pelo(a) estudante.";
const PROC_NA = "Não atingiu aproveitamento suficiente. Foi ofertada recuperação, não realizada pelo(a) estudante.";
const DATA_REGISTRO = "04/09/2026";

/** indicador -> menção -> frase */
const FRASES: Record<string, Record<string, string>> = {
    "4": {
        "A": "Reconhece padrões e sequências numéricas para apoiar a construção de algoritmos básicos.",
        "PA": "Reconhece parcialmente padrões e sequências numéricas para apoiar a construção de algoritmos básicos.",
        "NA": "Não reconhece adequadamente padrões e sequências numéricas para apoiar a construção de algoritmos básicos.",
        "NAV": "Não houve evidências suficientes para avaliação deste indicador."
    },
    "5": {
        "A": "Interpreta e representa dados em tabelas e gráficos, aplicando conceitos estatísticos iniciais.",
        "PA": "Interpreta e representa parcialmente dados em tabelas e gráficos, aplicando conceitos estatísticos iniciais.",
        "NA": "Não interpreta e não representa adequadamente dados em tabelas e gráficos, aplicando conceitos estatísticos iniciais.",
        "NAV": "Não houve evidências suficientes para avaliação deste indicador."
    },
    "6": {
        "A": "Resolve situações-problema utilizando estratégias matemáticas aplicadas à computação e Inteligência Artificial.",
        "PA": "Resolve parcialmente situações-problema utilizando estratégias matemáticas aplicadas à computação e Inteligência Artificial.",
        "NA": "Não resolve adequadamente situações-problema utilizando estratégias matemáticas aplicadas à computação e Inteligência Artificial.",
        "NAV": "Não houve evidências suficientes para avaliação deste indicador."
    }
};

/** nome do aluno (grafia da planilha) -> indicador -> menção */
const MENCOES: Record<string, Record<string, string>> = {
    "AGATHA SEIBEL SOUZA": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "ANA CLARA PIRES LOPES": {
        "4": "PA",
        "5": "PA",
        "6": "PA"
    },
    "ANA JULIA FONTANA BROL": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "ANDERSON NUNES MARQUEZ": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "ANTONELLA  SOPHIA MATA VASQUEZ": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "ARTHUR HAACKE": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "BIANCA PEREIRA GOMES": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "EDSON MACIEL FALCÃO": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "GABRIEL ANTUNES CARDOSO": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "GABRIELLA JAIANY DE OLIVEIRA ALBRECH": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "GRAZIELY SIQUEIRA RODRIGUES": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "GUSTAVO CORREIA FERREIRA": {
        "4": "PA",
        "5": "PA",
        "6": "PA"
    },
    "IGOR RAVANELI": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "ISABELLA TROJAN ELIAS": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "JOÃO LUCAS CADENA": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "JOÃO VITOR GODOY VIEIRA": {
        "4": "PA",
        "5": "PA",
        "6": "PA"
    },
    "JULIA GABRIELA GLOVACKI RODRIGUES": {
        "4": "PA",
        "5": "PA",
        "6": "PA"
    },
    "JULLYA EDUARDA ALBANI DA SILVA": {
        "4": "NAV",
        "5": "NAV",
        "6": "NAV"
    },
    "KALIEL PAGNONCELI": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "LIVIA HOFMANN DE MELLO COSTA": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "LUCAS DE JESUS MIRANDA": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "LUDMYLA DUARTE PORFIRIO SILVA": {
        "4": "NA",
        "5": "NA",
        "6": "NA"
    },
    "MARIANYELI ALEXANDRA ESPINOZA BALZA": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "PEDRO RICARDO DALMAGRO GHIGGI": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "PEDRO SILVA MATHIASS FEDERIGHI": {
        "4": "PA",
        "5": "PA",
        "6": "PA"
    },
    "RAUL CEZAR SOUZA BOFF": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "SAMUEL PRESTES DE OLIVEIRA": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "STHEFANY MARTINS DE JESUS": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "VALENTINA FAGUNDES CALDART": {
        "4": "A",
        "5": "A",
        "6": "A"
    },
    "VITÓRIA HENNIH BESSA": {
        "4": "A",
        "5": "A",
        "6": "A"
    }
};

/** alunos que nunca recebem linha no Feedback de Processo (evasão) */
const SEM_PROCESSO: string[] = ["JULLYA EDUARDA ALBANI DA SILVA"];

// ---------------------------------------------------------------------------

type Escrita = { aba: string; linha: number; coluna: number; valor: string; onde: string; texto?: boolean };

/** MENCOES indexado por nome normalizado, para tolerar espaço duplo e acento */
function porChave(): Record<string, Record<string, string>> {
    const m: Record<string, Record<string, string>> = {};
    for (const nome of Object.keys(MENCOES)) m[chave(nome)] = MENCOES[nome];
    return m;
}

function main(workbook: ExcelScript.Workbook) {
    const shReg = acharAba(workbook, ABA_REGISTRO);
    const shInd = acharAba(workbook, ABA_FB_IND);
    const shProc = acharAba(workbook, ABA_FB_PROC);

    const gReg = grade(shReg);
    const gInd = grade(shInd);
    const gProc = grade(shProc);

    const porNome = porChave();
    const escritas: Escrita[] = [];
    const erros: string[] = [];

    // ---- 1. Registro de Avaliação 2º: menção em P e F ----------------------
    let nReg = 0;
    for (const bloco of blocosDeAlunos(gReg)) {
        const slots = slotsIndicador(gReg, bloco.cabecalho - 1);
        for (const linha of bloco.linhas) {
            const nome = String(gReg[linha][0]).trim();
            const m = porNome[chave(nome)];
            if (!m) { erros.push(`${ABA_REGISTRO} linha ${linha + 1}: aluno "${nome}" não está nos dados`); continue; }
            for (const s of slots) {
                const men = m[s.n];
                if (!men) continue; // indicador ainda não lançado no CSV
                escritas.push({ aba: ABA_REGISTRO, linha, coluna: s.p, valor: men, onde: `Ind${s.n} P` });
                escritas.push({ aba: ABA_REGISTRO, linha, coluna: s.f, valor: men, onde: `Ind${s.n} F` });
                nReg += 2;
            }
        }
    }

    // ---- 2. Feedback de Indicadores: frase flexionada ----------------------
    let nInd = 0;
    for (const bloco of blocosDeAlunos(gInd)) {
        const slots = slotsIndicador(gInd, bloco.cabecalho);
        for (const linha of bloco.linhas) {
            const nome = String(gInd[linha][0]).trim();
            const m = porNome[chave(nome)];
            if (!m) { erros.push(`${ABA_FB_IND} linha ${linha + 1}: aluno "${nome}" não está nos dados`); continue; }
            for (const s of slots) {
                const men = m[s.n];
                if (!men) continue;
                const frase = FRASES[s.n] ? FRASES[s.n][men] : "";
                if (!frase) { erros.push(`sem frase para Indicador ${s.n} / menção ${men}`); continue; }
                escritas.push({ aba: ABA_FB_IND, linha, coluna: s.p, valor: frase, onde: `Ind${s.n}` });
                nInd++;
            }
        }
    }

    // ---- 3. Feedback de Processo: uma linha por aluno abaixo de A ----------
    const semProc: string[] = SEM_PROCESSO.map(n => chave(n));
    const pendentes: { nome: string; texto: string }[] = [];
    for (const nome of Object.keys(MENCOES)) {
        if (semProc.indexOf(chave(nome)) >= 0) continue;
        const vals: string[] = [];
        const m = porNome[chave(nome)];
        for (const k of Object.keys(m)) vals.push(m[k]);
        if (vals.indexOf("NA") >= 0) pendentes.push({ nome, texto: PROC_NA });
        else if (vals.indexOf("PA") >= 0) pendentes.push({ nome, texto: PROC_PA });
    }

    const slotsProc = linhasNome(gProc);
    // reaproveita a região do T2 se este script já rodou; senão começa uma
    // linha depois do último nome preenchido (o T1)
    let inicio = -1;
    for (let i = 0; i < slotsProc.length; i++) {
        const t = String(gProc[slotsProc[i]][13]).trim();
        if (t === PROC_PA || t === PROC_NA) { inicio = i; break; }
    }
    const reaproveitando = inicio >= 0;
    if (!reaproveitando) {
        let ultimo = -1;
        for (let i = 0; i < slotsProc.length; i++) {
            if (String(gProc[slotsProc[i]][2]).trim()) ultimo = i;
        }
        inicio = ultimo + 2; // pula uma linha entre o T1 e o T2
    }

    if (inicio + pendentes.length > slotsProc.length) {
        erros.push(`${ABA_FB_PROC}: faltam linhas — precisa de ${pendentes.length} a partir do slot ${inicio + 1}, só há ${slotsProc.length}`);
    } else {
        // limpa o que este script escreveu antes (se a lista encolheu)
        if (reaproveitando) {
            for (let i = inicio; i < slotsProc.length; i++) {
                const t = String(gProc[slotsProc[i]][13]).trim();
                if (t !== PROC_PA && t !== PROC_NA) break;
                escritas.push({ aba: ABA_FB_PROC, linha: slotsProc[i], coluna: 2, valor: "", onde: "limpeza" });
                escritas.push({ aba: ABA_FB_PROC, linha: slotsProc[i], coluna: 13, valor: "", onde: "limpeza" });
                escritas.push({ aba: ABA_FB_PROC, linha: slotsProc[i], coluna: 27, valor: "", onde: "limpeza" });
            }
        }
        for (let i = 0; i < pendentes.length; i++) {
            const linha = slotsProc[inicio + i];
            escritas.push({ aba: ABA_FB_PROC, linha, coluna: 2, valor: pendentes[i].nome, onde: "nome" });
            escritas.push({ aba: ABA_FB_PROC, linha, coluna: 13, valor: pendentes[i].texto, onde: "feedback" });
            escritas.push({ aba: ABA_FB_PROC, linha, coluna: 27, valor: DATA_REGISTRO, onde: "data", texto: true });
        }
    }

    // ---- trava: nada é gravado se houve qualquer erro ----------------------
    if (erros.length) {
        console.log(`ABORTADO — nada foi gravado. ${erros.length} problema(s):`);
        for (const e of erros) console.log(`  - ${e}`);
        return;
    }

    const abas: Record<string, ExcelScript.Worksheet> = {};
    abas[ABA_REGISTRO] = shReg;
    abas[ABA_FB_IND] = shInd;
    abas[ABA_FB_PROC] = shProc;
    for (const e of escritas) {
        const cel = abas[e.aba].getRangeByIndexes(e.linha, e.coluna, 1, 1);
        if (e.texto) cel.setNumberFormat("@");
        cel.setValue(e.valor);
    }

    console.log(`OK — ${escritas.length} células gravadas.`);
    console.log(`  ${ABA_REGISTRO}: ${nReg} células (menções P/F)`);
    console.log(`  ${ABA_FB_IND}: ${nInd} células (frases)`);
    console.log(`  ${ABA_FB_PROC}: ${pendentes.length} linhas (data ${DATA_REGISTRO}) a partir da linha ${slotsProc[inicio] + 1}` +
        (reaproveitando ? " (região do T2 reaproveitada)" : " (nova região)"));
}

// ---------------------------------------------------------------------------
// leitura da planilha
// ---------------------------------------------------------------------------

/** lê uma janela generosa da aba de uma vez só; as abas vão no máximo à linha 147 / coluna AP */
function grade(ws: ExcelScript.Worksheet): string[][] {
    const vals = ws.getRangeByIndexes(0, 0, 200, 50).getValues();
    const out: string[][] = [];
    for (const linha of vals) out.push(linha.map(v => v === null || v === undefined ? "" : String(v)));
    return out;
}

/** resolve a aba tolerando espaços parasitas no nome */
function acharAba(workbook: ExcelScript.Workbook, nome: string): ExcelScript.Worksheet {
    const exata = workbook.getWorksheet(nome);
    if (exata) return exata;
    const alvo = chave(nome);
    for (const ws of workbook.getWorksheets()) {
        if (chave(ws.getName()) === alvo) return ws;
    }
    throw new Error(`Aba não encontrada: "${nome}"`);
}

const MARCADORES = ["*", "Registro", "Formulário", "O feedback", "Deve-se", "Menção", "Não houve", "Nome do(a) Estudante"];

function ehMarcador(v: string): boolean {
    const s = v.trim();
    for (const m of MARCADORES) if (s.indexOf(m) === 0) return true;
    return false;
}

/** blocos de alunos: cabeçalho "Nome do(a) Estudante" + as linhas de nome abaixo dele */
function blocosDeAlunos(g: string[][]): { cabecalho: number; linhas: number[] }[] {
    const blocos: { cabecalho: number; linhas: number[] }[] = [];
    for (let r = 0; r < g.length; r++) {
        if (g[r][0].trim() !== "Nome do(a) Estudante") continue;
        const linhas: number[] = [];
        for (let i = r + 1; i < g.length; i++) {
            const v = g[i][0].trim();
            if (!v) { if (linhas.length) break; else continue; } // pula a sublinha "Feedback"
            if (ehMarcador(v)) break;
            linhas.push(i);
        }
        if (linhas.length) blocos.push({ cabecalho: r, linhas });
    }
    return blocos;
}

/** colunas dos indicadores na linha dada: P na própria coluna do rótulo, F duas à direita */
function slotsIndicador(g: string[][], linhaRotulo: number): { n: string; p: number; f: number }[] {
    const out: { n: string; p: number; f: number }[] = [];
    if (linhaRotulo < 0 || linhaRotulo >= g.length) return out;
    for (let c = 0; c < g[linhaRotulo].length; c++) {
        const v = g[linhaRotulo][c].trim();
        if (v.indexOf("Indicador") !== 0) continue;
        const n = v.replace(/[^0-9]/g, "");
        if (n) out.push({ n, p: c, f: c + 2 });
    }
    return out;
}

/** linhas de slot do Feedback de Processo (coluna A == "Nome:") */
function linhasNome(g: string[][]): number[] {
    const out: number[] = [];
    for (let r = 0; r < g.length; r++) if (g[r][0].trim() === "Nome:") out.push(r);
    return out;
}

/** normaliza para comparação: sem acento, sem espaço duplo, maiúsculo */
function chave(s: string): string {
    return String(s || "")
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .toUpperCase();
}
