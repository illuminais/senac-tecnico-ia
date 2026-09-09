# Lançamento de menções no Formulário de Registro de Avaliação

Automatiza o preenchimento do arquivo oficial do Senac
(`Inteligencia Artificial_2026_ 1º_Ano.xlsx`, 45 abas, editado no Excel Online)
a partir da planilha pessoal de indicadores do instrutor.

Usado no **2º trimestre de 2026**. Feito para ser reusado no 3º.

## O problema

Cada UC exige três escritas diferentes derivadas da **mesma** menção (A/PA/NA/NAV):

1. `Registro de Avaliação Nº` — a menção em duas células por indicador (P e F, valores iguais)
2. `Feedback de Indicador(es)` — a descrição do indicador com o verbo flexionado pela menção
3. `Feedback de Processo` — uma linha por aluno que ficou abaixo de A

São 9 UCs × 3 abas. Manualmente dá algumas centenas de células por trimestre.

O Office Script rodando no Excel Online **não lê arquivo local**. Por isso existe um gerador:
ele lê o CSV aqui e emite um `.ts` com as menções já embutidas, pronto para colar no editor.

## Uso

```bash
python3 -m venv venv && ./venv/bin/pip install -r requirements.txt

# 1. rascunho das frases (só adiciona o que falta; edições à mão são preservadas)
./venv/bin/python gerar.py frases --trimestre 3

# 2. revise frases.json à mão — ver "Flexão das frases" abaixo

# 3. confira o que seria escrito, sem escrever nada
./venv/bin/python gerar.py UC2 --trimestre 3 --dry-run

# 4. gere o script
./venv/bin/python gerar.py UC2 --trimestre 3

# 5. (opcional) execute o .ts de verdade num mock sobre os dados reais da planilha
./testar.sh UC2
```

Depois é colar `saida/preencher-UC2*.ts` no Excel Online (Automatizar › Novo Script) e executar.

Caminhos dos arquivos-fonte via variáveis de ambiente `T2_CSV` e `T2_XLSX`; os padrões
apontam para `~/Downloads/`. O `.xlsx` é só leitura — serve para descobrir a geometria das
abas e os textos dos indicadores. **Exporte uma cópia atualizada do Excel Online antes de
começar um trimestre novo.**

## A numeração das abas NÃO é a das UCs

Essa é a pegadinha central. Verificado pelo campo `CC/UC` de cada aba:

| Aba no Excel | CC/UC | UC na planilha do instrutor |
|---|---|---|
| UC1 | Fundamentos e conceitos de IA | UC04 |
| UC2 | Desenvolvimento de linguagem Python | UC05 |
| UC3 | Arquitetura de Computadores e GPU | UC06 |
| UC4 | Transformação Digital | UC07 |
| UC5 | Desenvolvimento de Banco de Dados | UC08 |
| UC6 | Estatística Aplicada e Lógica Matemática | UC09 |
| UC7 | Fundamentos de Computação | UC01 |
| UC8 | Inglês Instrumental | UC02 |
| UC9 | Fundamentos Matemáticos | UC03 |

O número do indicador, esse bate direto: coluna `5.2` do CSV → aba UC2, `Indicador 2`.

A tabela está em `TAB2UC` no `gerar.py`. **Confira se ela continua válida** ao mudar de ano
ou de turma — é a única coisa que, se estiver errada, escreve nota certa na UC errada.

## Geometria das abas

`Registro de Avaliação 2º` e `3º` têm geometria idêntica e uniforme nas 9 abas:

- Blocos de alunos: linhas **23–27, 31–42, 48–60** (5 + 12 + 13 = 30)
- Nome na coluna **A**
- Slot *i* (0-based): **P = coluna 8 + 3i**, **F = coluna 10 + 3i** → H/J, K/M, N/P, Q/S, T/V

`Feedback de Indicador(es)` e `Feedback de Processo` têm geometria **diferente e variável por
aba** — o `.ts` descobre os blocos em tempo de execução procurando os cabeçalhos
`Nome do(a) Estudante` e `Nome:`. Nunca assume linha fixa.

Os blocos do Registro estão hardcoded em `montar()` só para conferir a lista de alunos contra
o CSV; o `.ts` gerado não usa esses números.

## Regras

### Menção → texto do indicador

| Menção | Texto |
|---|---|
| **A** | descrição do indicador, literal |
| **PA** | `parcialmente` após o grupo verbal |
| **NA** | `Não ` + verbos negados + `adequadamente` após o grupo verbal |
| **NAV** | `Não houve evidências suficientes para avaliação deste indicador.` |

```
A    Compreende e aplica funções matemáticas logarítmicas.
PA   Compreende e aplica parcialmente funções matemáticas logarítmicas.
NA   Não compreende e não aplica adequadamente funções matemáticas logarítmicas.
```

### Feedback de Processo

- Recebe linha **se e somente se** o aluno tem ao menos um indicador com **PA ou NA**
- **NAV nunca gera linha** e **nunca impede** linha causada por PA/NA em outro indicador
- Quem ficou A em tudo: nenhuma linha, nenhuma célula tocada
- Texto: **NA** se qualquer indicador for NA; senão **PA** (constantes `PROC_PA` / `PROC_NA`)
- Escreve nome em **C**, feedback em **N**, data em **AB**
- Começa **uma linha em branco depois** do último nome já preenchido na aba

### Aluno evadido

`EVADIDA` no `gerar.py` recebe `NAV` em tudo, ignorando o CSV, e nunca gera linha de processo.
No T2 era a JULLYA. **Reveja essa constante a cada trimestre.**

## Flexão das frases

`frases.json` guarda as 4 variantes de cada `<aba>/<indicador>`. O rascunho é gerado por
heurística: identifica o grupo verbal inicial pela lista `VERBOS` e insere `parcialmente` /
`Não ... adequadamente`.

**Sempre revise antes de usar.** A heurística erra em dois casos:

- **Verbo fora da lista `VERBOS`** — o grupo verbal é cortado no meio. A entrada sai marcada
  com `??` e o gerador se recusa a gerar o `.ts` até você corrigir. Adicione o verbo à lista
  e apague a entrada do JSON para regerar.
- **Verbos separados pelo objeto** (`Analisa objetivos ... e cria um plano`) — só o primeiro
  é flexionado. Não é detectado automaticamente; corrija à mão.

No T2 precisaram de correção manual: `UC9/5`, `UC5/5`, `UC4/5`, `UC4/7`.
Para o T3, `UC4/8` e `UC4/10` provavelmente também precisam — são verbos separados por objeto.

O gerador nunca sobrescreve entrada existente, então suas correções sobrevivem a `gerar.py frases`.

## Travas

O `.ts` **valida tudo antes de escrever qualquer célula** e aborta sem gravar nada se:

- algum nome da planilha não estiver nos dados (informa a linha exata)
- faltar frase para alguma combinação indicador/menção

O gerador aborta se:

- o CSV tiver menção fora de `A/PA/NA/NAV` (já pegou um `q` digitado por engano)
- a lista de alunos do CSV divergir da aba de Registro
- faltar entrada em `frases.json`, ou ela ainda estiver marcada com `??`

**Idempotência:** Registro e Feedback de Indicadores escrevem sempre nas mesmas células.
Feedback de Processo acrescenta linhas, então o script procura as linhas que já contêm um dos
textos padrão, limpa e reescreve nessa região em vez de duplicar. Rodar duas vezes é seguro —
e é isso que permite lançar parcialmente e completar depois.

## Divergências de nome

O casamento é por nome normalizado (sem acento, sem espaço duplo, maiúsculo). Duas grafias
divergiam entre CSV e planilha no T2 e estão na tabela `ALIAS`:

| CSV | Planilha |
|---|---|
| `VITÓRIA HENNIG BESSA` | `VITÓRIA HENNIH BESSA` |

A grafia da **planilha** é a canônica — é ela que vai para o Feedback de Processo, incluindo
espaços duplos como em `ANTONELLA  SOPHIA MATA VASQUEZ`.

## Restrições do Office Scripts

Aprendidas na marra, todas já respeitadas no `modelo.ts`:

- **Só arrow function em callback de array.** `arr.map(minhaFuncao)` é erro; use `arr.map(x => minhaFuncao(x))`.
- **`setNumberFormat` recebe `string`, não `string[][]`.** O par é singular/plural, igual
  `setValue`/`setValues`. Para intervalo é `setNumberFormats([[...]])`.
- **Data precisa ser escrita como texto.** `setValue("04/09/2026")` numa célula comum faz o
  Excel converter para data de verdade e reexibir no formato da conta (`mm/dd/yyyy`), virando
  `09/04/2026`. Por isso o script chama `setNumberFormat("@")` **antes** do `setValue`.

## Sobre o `testar.sh`

Exporta as abas reais para grades, monta um mock do `ExcelScript` e executa o `main()` do `.ts`
gerado duas vezes, conferindo idempotência. Roda `tsc --strict` antes.

**Limite honesto:** o stub de tipos do `ExcelScript` é escrito à mão em `excelscript.d.ts`,
não é o oficial da Microsoft. O type-check valida a lógica interna, não a assinatura das APIs —
foi exatamente assim que o `setNumberFormat` errado passou. Ao usar um método novo da API,
confirme no editor do Excel Online antes de replicar para as outras UCs.

## Referência

`saida-t2-referencia/` guarda os `.ts` gerados no 2º trimestre de 2026, como exemplo do
formato de saída. Não sirvam para rodar de novo — os dados estão congelados.
