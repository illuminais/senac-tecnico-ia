# Conjunto de dados do épico UC01 — leia antes da A54

> Material do professor. Não distribuir para os alunos: contém o gabarito da limpeza.

## O que tem aqui

| Arquivo | Para que serve |
|---|---|
| `dengue_pr_bruto.xlsx` | **O que o aluno recebe na A54.** Dado real com seis defeitos injetados |
| `dengue_pr_limpo.xlsx` | Gabarito da limpeza. Rede para quem faltar na A54 e chegar na A55 |
| `dengue_pr_comparado.xlsx` | Rede para quem faltar na A55 e chegar na A56: dado limpo, coluna `casos_por_100mil` pronta, log preenchido e o esqueleto da aba `03_comparacoes` em branco |
| `gabarito.json` | Lista dos defeitos, gerada junto com os arquivos |

Regerar: `python scripts/dataset-dengue/gerar.py` (precisa de `openpyxl`). A semente é fixa,
então os arquivos saem idênticos toda vez.

## Os números são reais

Fonte: **InfoDengue**, projeto da Fiocruz com a FGV, em `info.dengue.mat.br`.
Casos prováveis de dengue, 17 municípios do Paraná, agregados por mês, 2024 e 2025.
Municípios escolhidos para cobrir as quatro macrorregionais de saúde do Paraná
(Leste, Oeste, Norte, Noroeste). Acesso em 09/09/2026.

**Nada foi inventado.** Só os defeitos foram injetados. Se precisar defender a origem de
qualquer número, ele veio direto da API do InfoDengue.

## Os seis defeitos injetados

| # | Defeito | Como aparece | O que ele quebra |
|---|---|---|---|
| 1 | Célula mesclada | título ocupando A1 até H2, cabeçalho só na linha 3 | filtro, tabela dinâmica, "formatar como tabela" |
| 2 | Número como texto | 73 células da coluna `casos` gravadas como texto | soma e ordenação (some do total, ordena errado) |
| 3 | Data em três formatos | `data_referencia` com data real (253), texto `dd/mm/aaaa` (107) e texto `mmm/aaaa` (62) | ordenação cronológica e agrupamento por mês |
| 4 | Categoria em quatro grafias | `macrorregional` como `Norte`, `norte`, `NORTE` e `Norte ` com espaço no fim | agrupar por região, CONT.SE, tabela dinâmica (vira 16 regiões em vez de 4) |
| 5 | Linha duplicada | 14 duplicatas exatas, cada uma logo abaixo da original | infla a soma |
| 6 | Total no meio dos dados | 17 linhas `TOTAL <município>` entre os dados | dobra a contagem ao somar a coluna inteira |

**Resultado esperado da limpeza: 408 linhas** (17 municípios × 12 meses × 2 anos).
Se o aluno chegar em 439, não tirou os totais nem as duplicatas. Se chegar em 391, apagou demais.

## Os dois padrões que o épico precisa

Confirmados no dado limpo antes de a aula ser escrita.

**Padrão A, sazonalidade.** Em 2025, março concentra 23,6% dos casos do ano, e janeiro a abril
somam 59,3%. Decisão que ele orienta: a campanha precisa começar **antes** de março, porque
eliminar criadouro leva tempo. Começar em março é chegar no pico.

**Padrão B, o conflito de critério.** É o que faz a avaliação da A56 ser nível 4.

| Critério | 1º lugar | Situação do outro |
|---|---|---|
| Casos absolutos | **Londrina**, 32.804 casos | Jacarezinho é só o 16º, com 1.005 casos |
| Casos por 100 mil habitantes | **Jacarezinho**, 8.467 por 100 mil | Londrina cai para 3º, com 5.578 |

Jacarezinho salta da 16ª posição para a 1ª só ao trocar o critério. Curitiba faz o caminho
inverso: 7º em absoluto, 15º por 100 mil (445 por 100 mil, quase 19 vezes menos que Jacarezinho).

**As duas respostas são defensáveis.** Londrina tem mais gente doente e mais pressão no hospital.
Jacarezinho tem proporcionalmente muito mais gente adoecendo. O que separa Atendido de
Parcialmente Atendido não é qual escolheu: é **declarar o critério e sustentar a escolha**.

## O gancho de criticidade

**Campo Mourão aparece com 213 casos no ano inteiro, 148 por 100 mil**, muito abaixo de todos os
vizinhos do Noroeste. Isso é dado real, não é defeito injetado.

Use como a pergunta que o dado **não** responde: é pouca dengue mesmo, ou é pouca notificação?
O dado sozinho não distingue as duas coisas. Reconhecer esse limite é a parte de criticidade do
Indicador 6, e é um bom lugar para separar quem está em Atendido de quem só achou o padrão.
