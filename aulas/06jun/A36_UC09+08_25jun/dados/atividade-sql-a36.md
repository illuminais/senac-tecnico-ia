# Atividade SQL — A36
**Grupo:** _________________________________  **Data:** 25/06/2026

Um integrante fica com a **colinha**, os outros preenchem esta folha.
Escreva a query no papel antes de digitar no PC.

---

## Parte 1 — Aquecimento (todos os grupos fazem)

**Pergunta:** Quais times participaram da Copa 2022 e chegaram pelo menos as oitavas?
Mostre o nome da selecao e a fase que chegou, ordenado pela fase.

Complete a query:

```sql
SELECT __________, __________
FROM historico
WHERE copa = __________
  AND fase_eliminada __________ ('oitavas', 'quartas', 'semi', 'final', 'vice', 'campeao')
ORDER BY fase_eliminada;
```

**Resultado esperado (quantas linhas?):** _______

---

## Parte 2 — Validando hipoteses (cada grupo escolhe 2)

### Hipotese A
> "Times que chutam mais chegam mais longe na Copa."

```sql
SELECT fase_eliminada,
       ROUND(__________(chutes), 1) AS media_chutes,
       COUNT(*) AS qtd_times
FROM analise_estatistica
WHERE jogos > 0
GROUP BY __________
ORDER BY media_chutes DESC;
```

Os dados confirmam a hipotese? _______________________________________________

Qual fase tem a maior media de chutes? ________________________________________

---

### Hipotese B
> "Marrocos em 2022 chutou menos que a media dos times que chegaram as semis."

Primeiro descubra a media de chutes das semis:
```sql
SELECT ROUND(AVG(chutes), 1) AS media_semi
FROM analise_estatistica
WHERE fase_eliminada __________ ('semi', 'final', 'vice', 'campeao')
  AND jogos > 0;
```
Media encontrada: _________

Agora busque os dados do Marrocos 2022:
```sql
SELECT selecao, copa, fase_eliminada, chutes, finalizacoes
FROM analise_estatistica
WHERE selecao = '__________' AND copa = __________;
```
Chutes do Marrocos: _________

A hipotese se confirma? _______ Por que isso e interessante? ____________________

_______________________________________________________________________________

---

### Hipotese C
> "A CONMEBOL e a confederacao com mais gols somados nas ultimas 3 Copas."

```sql
SELECT s.confederacao,
       SUM(h.gols_pro) AS total_gols
FROM historico h
INNER JOIN __________ s ON h.selecao = s.__________
WHERE h.jogos > 0
GROUP BY __________
ORDER BY total_gols __________;
```

Qual confederacao ganhou? _________________ Com quantos gols? _________

A CONMEBOL ficou em que lugar? _____

---

### Hipotese D
> "O Japao e mais consistente (desvio padrao menor) do que a Argentina em chutes por Copa."

Calcule a media e o total de chutes do Japao nas 3 Copas:
```sql
SELECT copa,
       chutes,
       jogos,
       ROUND(chutes * 1.0 / jogos, 1) AS chutes_por_jogo
FROM analise_estatistica
WHERE selecao = 'Japao' AND __________
ORDER BY copa;
```

| Copa | Chutes/jogo |
|------|-------------|
| 2014 | |
| 2018 | |
| 2022 | |

Agora repita para a Argentina. Os valores do Japao sao mais parecidos entre si (menor variacao)?

Japao: variou de _______ a _______  — variacao: _______
Argentina: variou de _______ a _______ — variacao: _______

Quem foi mais consistente? ____________________

---

## Parte 3 — Pergunta do grupo (livre)

Escreva abaixo a pergunta que o grupo trabalhou na apresentacao e tente respondela com SQL.

**Nossa pergunta era:** _________________________________________________________

**Tabela(s) que vamos usar:** ___________________________________________________

**Query escrita no papel:**

```sql




```

**Resultado:** _________________________________________________________________

**Os dados confirmam o que defendemos na apresentacao?** _________________________

_______________________________________________________________________________

---

**Assinaturas do grupo:**

Nome: _________________________________  Funcao: ______________

Nome: _________________________________  Funcao: ______________

Nome: _________________________________  Funcao: ______________
