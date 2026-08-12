# Materiais — A46, 13/08/2026

UC02 Inglês Instrumental + UC05 Python para IA

> ⚠️ **Ordem do dia invertida** (decisão de 12/08): os impressos só ficam prontos na manhã do dia,
> então o dia abre com Inglês, cuja primeira parte é toda projetada, sem papel. Python fica depois do intervalo.

## Ordem do dia

| Quando | O quê | Precisa de papel? |
|---|---|---|
| 0 a 50min | **Inglês — ensino projetado.** Método dos 3 passos no quadro, os 7 códigos rodados ao vivo no projetor | **Não** |
| 50min a 1h50 | **Av05-T2** — prova individual | Sim (prova) |
| 1h50 a 2h20 | **Correção conjunta** — gabarito projetado, turma corrige junto, cada um escreve o que errou e por quê | Sim (mesma folha) |
| intervalo | | |
| depois | **Python — funções no papel.** Documentação, exercícios à mão, você libera um a um pelo quadro | Sim (2 folhas) |

Se a dinâmica comer tempo, o que encolhe é a correção conjunta, não a prova.

## Arquivos

| Arquivo | Cópias |
|---|---|
| `av05-t2-para-imprimir.html` | 1 por aluno |
| `av05-t2-gabarito.html` | só projetar (também vira slide AdminOnly) |
| `python-funcoes-documentacao.html` | 1 por aluno — folha de consulta, fica com ele |
| `python-funcoes-exercicios.html` | 1 por aluno — é a entrega, com nota e prazo no topo |

**Não existe folha de gabarito de Python.** Correção no quadro, no fim do bloco.

## Bloco de Inglês

Os 7 códigos são projetados e rodados ao vivo durante o ensino. A prova **não depende** de nada anotado antes —
funciona mesmo para quem chegou atrasado.

Fica no quadro a aula inteira:

```
COMO LER UMA MENSAGEM DE ERRO
1. ONDE?    File "arquivo.py", line N
2. O QUÊ?   o nome do tipo, antes dos dois-pontos
3. POR QUÊ? a mensagem, depois dos dois-pontos

Traceback (most recent call last)  →  leia de baixo para cima
```

**Não escrever no quadro:** tradução de nenhuma palavra em inglês. É exatamente o que a prova mede.

**Antes de imprimir:** rodar os 7 códigos na máquina do laboratório e conferir se as mensagens batem. O texto é
estável do Python 3.10 em diante, mas o desenho das setas (`^`, `~~~^^^`) muda entre versões.

## Bloco de Python

Sem PC. Código escrito à mão, com a folha de consulta ao lado.

**Ritmo:** você projeta um exercício por vez e libera. Quem terminar avança sozinho pela folha.
O que não der tempo vira entrega para a data marcada no topo da folha — e é por isso que **nota, feedback e prazo
aparecem no cabeçalho desde o primeiro minuto**, antes de eles descobrirem que o resto vai para casa.

**Critério, avisado antes de começar:** vale a lógica. Dois-pontos esquecido e recuo torto entram no feedback
escrito, não derrubam a questão.

**Onde eles vão apanhar, na ordem:**

| Ex. | Tropeço esperado |
|---|---|
| 1 | esquecer o `:` no fim do `def` |
| 2 | usar `print` no lugar de `return` |
| 4 | comparar com número fixo em vez de usar o segundo parâmetro |
| 5 | testar as condições na ordem errada (o caso de 90 tem que vir antes do de 60) |
| 6 | não converter o `input` para número |
| 7 | dividir sem checar o zero |
| 8 | zerar o acumulador dentro do `for` em vez de antes |
| 9, 11 | esquecer o contador, ou comparar com `=` no lugar de `==` |

O exercício 5 é o coração do bloco: dois parâmetros, `and`, e ordem de `if/elif` que importa.
O exercício 7 é o mesmo problema do código C7 da prova de inglês, agora do outro lado — lá ele lia o erro,
aqui ele precisa evitá-lo.

## Registro na plataforma

`avaliacoes/av09/` — meta e descrição do formato, **sem nenhuma questão**. Publicar as questões anularia o motivo
de a prova ser em papel.
