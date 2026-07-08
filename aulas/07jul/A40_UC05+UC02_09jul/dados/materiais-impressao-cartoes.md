# Roteiro — O Roubo da Coroa (A40)

> **Tema:** a Coroa Real foi roubada do Museu, num golpe estilo Lupin — elegante, sem violência, cheio de disfarces e ferramentas de ladrão. Cada um dos 29 alunos é um suspeito diferente sendo investigado.
>
> **Cartões para imprimir:** `cartoes-para-imprimir.html` (abrir no navegador e imprimir — layout já pronto pra cortar, sem desperdício de papel).
>
> **Gabarito completo (o CSV real que vai pro pandas/SQL):** `gabarito_suspeitos.csv` — colunas `suspect_id, alibi_location, motive, tool, has_witness` (booleano real: `True`/`False`, não string). O professor já tem pronto, não depende de nenhuma transcrição em sala. Se alguém faltar, o professor mesmo cobre a linha da pessoa.

---

## Mecânica (redesenhada — no máximo 2-3 conversas por aluno)

Cada aluno recebe **exatamente 2 cartões**, impressos em `cartoes-para-imprimir.html`:

1. **1 Case File** (seu suspeito único, com os 4 dados já definidos + espaço pra inventar o próprio codinome de ladrão)
2. **1 Schema Card** (1 de só 4 regras possíveis: `alibi_location`, `motive`, `tool`, `has_witness`) — ninguém tem as 4, mas todo mundo já começa com 1 garantida

Como só existem 4 regras no total, e cada aluno já sabe 1 delas, **cada aluno precisa de no máximo 3 conversas** pra completar as 4 (normalmente 2-3, já que cada conversa costuma revelar mais de uma regra nova de uma vez, se os dois compararem tudo que já sabem).

**Isso resolve o problema de escala:** ninguém precisa falar com a turma inteira, só com um punhado de colegas — depois disso, o gabarito do professor garante que o dado final está sempre certo e completo, independente de quem faltou ou de quem trocou errado.

---

## Roteiro (Bloco UC02, ~60-70min dentro das 3h)

1. **(5 min) Contextualizar em inglês, curto e direto:** "A crown was stolen from the Museum. Each of you is a suspect. You know 1 rule about how our case file works — find 2 or 3 classmates and learn the other 3."
2. **(2 min)** Distribuir os 2 cartões por aluno (1 Case File + 1 Schema Card, embaralhados).
3. **(10-15 min) Circulação:** cada aluno busca 2-3 colegas, compara os Schema Cards que já tem, copia as regras novas no caderno. Meta: todo mundo com as 4 regras (`column` + `datatype` + `format`) anotadas.
4. **(5 min)** Cada aluno escolhe e escreve seu **codinome de ladrão** no próprio Case File — parte livre, sem gabarito, só diversão e identidade.
5. **(15-20 min)** Cada aluno reescreve a própria linha de suspeito no formato correto (aplicando as 4 regras de schema) e cola no caderno. Exemplo esperado (Suspeito #1): `1,security_room,revenge,master_key,False`
6. **(10 min) Fechamento:** 4-5 alunos leem a própria linha em voz alta (podem usar o codinome pra se apresentar: "I'm [codinome], suspect number 1..."); professor confere com o gabarito na tela.
7. Resto do bloco: consolidar os termos técnicos (`column`, `datatype`, `string`, `boolean`, `format`, `lowercase`) formalmente + ponte pro Bloco 4 (`import`, `library`) explicando por que vamos "importar" o pandas à tarde em vez de processar as 29 fichas na mão.

**Nota:** o dataset que efetivamente carrega no pandas à tarde e no SQL de sexta é sempre `gabarito_suspeitos.csv` — a atividade acima é prática de leitura/formatação em inglês técnico, não a fonte real do dado (exceto o codinome, que é só flavor, não entra na análise).
