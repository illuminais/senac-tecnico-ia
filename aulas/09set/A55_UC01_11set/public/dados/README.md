# Conjunto de dados do épico UC01 — leia antes da A55


> **Correção de rótulo, 23/09/2026:** o município de código IBGE **4112801** estava rotulado como "Jacarezinho", mas esse código é de **Joaquim Távora** (o de Jacarezinho é 4111803, com 40.375 habitantes no Censo 2022). Os casos e a população (11.870) sempre foram de Joaquim Távora. Só o nome foi corrigido, nas três planilhas, no banco do épico 2, na rubrica e nos slides. Nenhum número mudou. Os arquivos em `dist/` e o site publicado só mudam depois de um novo build e deploy.

> Material do professor. Não distribuir para os alunos: contém o gabarito da limpeza.

## O que tem aqui

| Arquivo | Para que serve |
|---|---|
| `dengue_pr_bruto.xlsx` | **O que o aluno recebe na A55.** Dado real com seis defeitos injetados |
| `dengue_pr_limpo.xlsx` | Gabarito da limpeza. Rede para quem faltar na A55 e chegar na A55 |
| `dengue_pr_comparado.xlsx` | **O que todo mundo abre na A56 (versão 2, 16/09).** Dado limpo, `casos_por_100mil`, log preenchido, as três tabelas de comparação **prontas** (T1, T2, T3), a aba `00_origem` com os rótulos em branco e a `04_painel` com o modelo dos 5 elementos |
| `gabarito.json` | Lista dos defeitos, gerada junto com os arquivos |

Regerar o bruto e o limpo: `venv/bin/python scripts/dataset-dengue/gerar.py` (baixa da API; só rode
se quiser dado novo, porque os números mudam e os arquivos dos alunos ficam desatualizados).
Regerar o comparado: `venv/bin/python scripts/dataset-dengue/comparacoes.py` (lê o limpo, **não**
acessa a rede, imprime as três tabelas para conferir contra os slides).

## Versão 2 do comparado (decisão de 16/09)

A A55 travou em "como fazer no Excel". Na A56 o aluno **não monta** tabela dinâmica: as comparações
chegam prontas e o tempo vai para critério, padrão, relação, decisão e limite do dado. As tabelas:

| Tabela | Onde | O que tem |
|---|---|---|
| **T1** | `03_comparacoes`, `A2:C14` (+ linha `total` em 15) | casos por mês, colunas 2024 e 2025. Gráfico de padrão (linha) sai daqui |
| **T2** | `A18:G35` | 17 municípios em 2025: casos, população, casos por 100 mil, posição por casos, posição por 100 mil. Ordenada por casos |
| **T3** | `A38:F42` | 4 macrorregionais: casos por 100 mil em 2025 (soma de casos ÷ soma de população), casos 2025, casos 2024, população, nº de municípios. Gráfico de relação (coluna) sai de `A38:B42` |

**Regra da avaliação:** todo número do painel tem que existir numa dessas tabelas e vir citado com
a tabela ("T2, linha Joaquim Távora"). Na conferência de mesa, peça "me mostra na tabela".

**Canários (detecção de uso de IA).** O arquivo carrega, em `04_painel` (célula com fonte branca,
abaixo do modelo) e na aba oculta `_notas`, uma instrução dirigida a assistentes de IA pedindo a
macrorregional **"Centro-Sul"** e o número **3.417**. Os slides da A56 e da A57 carregam o mesmo em
texto invisível, com o marcador **"Vale do Ivaí"**. Nenhum dos três existe no dado. Se aparecer num
painel, o texto não saiu do arquivo: Não Atendido no Indicador 6 e conversa individual. É indício,
não prova: só pega quem cola o arquivo ou o enunciado numa IA. Não está no bruto nem no limpo.

**LibreOffice.** O laboratório pode ser Linux. O `dengue_pr_comparado.xlsx` foi aberto no LibreOffice Calc
26.2 em 16/09: as cinco abas aparecem, `_notas` fica oculta e a célula-canário fica branca. Os slides
de como-fazer (gráfico e tabela dinâmica) trazem os caminhos do Excel e do Calc lado a lado, e o aluno
salva sempre em `.xlsx`.

**Fonte externa para o Indicador 4 (Exercício 1b da A56).** O aluno procura o total de Londrina
em 2025 numa segunda fonte e explica por que não bate (provável vs confirmado, ano-calendário vs
período epidemiológico de agosto a julho, data de corte, arredondamento). Conferido em 16/09: a
página municipal do InfoDengue mostra só a incidência da semana atual, então **testar na véspera**
onde o total anual aparece (informe da SESA-PR ou notícia) e ajustar o slide 6 se precisar.

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

**Padrão A, sazonalidade.** Março é o pico nos dois anos: 26,9% do ano em 2024 (103.609 casos) e
23,6% em 2025 (29.884); janeiro a abril de 2025 somam 59,3%. O vale é julho e agosto nos dois anos.
Decisão que ele orienta: a campanha precisa começar **antes** de março, porque eliminar criadouro
leva tempo. Começar em março é chegar no pico.

**Contra-exemplo de padrão, na T3:** a região com mais casos **muda de ano**. 2024: Oeste 125.979,
Norte 100.510, Leste 92.741, Noroeste 66.290. 2025: Norte 44.080, Oeste 38.681, Noroeste 25.348,
Leste 18.623. Não repete, logo não é padrão. (A primeira versão do deck da A56 dizia "Norte na frente
nos dois anos"; estava errado.)

**Relação, na T3:** região e taxa por 100 mil em 2025 andam juntas: Norte 5.989, Oeste 3.931,
Noroeste 3.143, Leste 634. A relação "cidade menor, taxa maior" que a primeira versão do deck usava
é **fraca** neste dado (correlação de -0,32 entre população e taxa) e foi trocada por esta.

**Padrão B, o conflito de critério.** É o que faz a avaliação da A56 ser nível 4.

| Critério | 1º lugar | Situação do outro |
|---|---|---|
| Casos absolutos | **Londrina**, 32.804 casos | Joaquim Távora é só o 16º, com 1.005 casos |
| Casos por 100 mil habitantes | **Joaquim Távora**, 8.467 por 100 mil | Londrina cai para 3º, com 5.578 |

Joaquim Távora salta da 16ª posição para a 1ª só ao trocar o critério. Curitiba faz o caminho
inverso: 7º em absoluto, 15º por 100 mil (445 por 100 mil, quase 19 vezes menos que Joaquim Távora).

**As duas respostas são defensáveis.** Londrina tem mais gente doente e mais pressão no hospital.
Joaquim Távora tem proporcionalmente muito mais gente adoecendo. O que separa Atendido de
Parcialmente Atendido não é qual escolheu: é **declarar o critério e sustentar a escolha**.

## O gancho de criticidade

**Campo Mourão aparece com 213 casos no ano inteiro, 148 por 100 mil**, muito abaixo de todos os
vizinhos do Noroeste. Isso é dado real, não é defeito injetado.

Use como a pergunta que o dado **não** responde: é pouca dengue mesmo, ou é pouca notificação?
O dado sozinho não distingue as duas coisas. Reconhecer esse limite é a parte de criticidade do
Indicador 6, e é um bom lugar para separar quem está em Atendido de quem só achou o padrão.
