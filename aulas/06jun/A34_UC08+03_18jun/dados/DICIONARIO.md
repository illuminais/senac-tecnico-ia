# Dicionário de Dados — Copa Analytics 2026

Dados reais da Copa do Mundo 2026 (Rodada 1 da fase de grupos — até 15/06/2026).
Fonte: FIFA.com · Wikipedia · CBS Sports · Sky Sports

---

## copa2026_selecoes.csv

| Coluna | Tipo | Descrição |
|---|---|---|
| id | inteiro | Identificador único da seleção |
| nome | texto | Nome da seleção em português |
| grupo | texto | Grupo da fase de grupos (A, B, C, D, I, J) |
| confederacao | texto | Confederação continental (CONMEBOL, UEFA, CAF, AFC, CONCACAF) |
| ranking_fifa | inteiro | Ranking FIFA no momento da Copa |

**24 seleções** de 6 grupos.

---

## copa2026_partidas.csv

| Coluna | Tipo | Descrição |
|---|---|---|
| id | inteiro | Identificador único da partida |
| grupo | texto | Grupo da partida |
| time_casa | texto | Seleção mandante |
| time_fora | texto | Seleção visitante |
| gols_casa | inteiro | Gols do mandante |
| gols_fora | inteiro | Gols do visitante |
| data | data (ISO) | Data da partida (YYYY-MM-DD) |
| cidade | texto | Cidade-sede |
| estadio | texto | Nome do estádio |
| rodada | inteiro | Rodada da fase de grupos (1, 2 ou 3) |

**12 partidas** — todas da Rodada 1.

---

## copa2026_stats.csv

| Coluna | Tipo | Descrição |
|---|---|---|
| nome | texto | Nome da seleção |
| grupo | texto | Grupo |
| jogos | inteiro | Partidas disputadas |
| vitorias | inteiro | Vitórias |
| empates | inteiro | Empates |
| derrotas | inteiro | Derrotas |
| gols_pro | inteiro | Gols marcados |
| gols_contra | inteiro | Gols sofridos |
| saldo_gols | inteiro | Saldo de gols (pro - contra) |
| pontos | inteiro | Pontos acumulados |
| posse_media | inteiro | Posse de bola média (%) |
| chutes | inteiro | Total de chutes ao gol |
| amarelos | inteiro | Cartões amarelos |
| vermelhos | inteiro | Cartões vermelhos |

**24 linhas** — uma por seleção.

---

## Perguntas que os times podem responder

1. Qual seleção tem o melhor custo-benefício em gols por chute?
2. Quais seleções têm posse alta MAS poucos gols? (eficiência vs. domínio)
3. Qual grupo tem mais cartões amarelos no total?
4. Se você fosse patrocinador, qual seleção escolheria — e por quê?
5. Qual cidade-sede recebeu mais gols na rodada 1?
6. Quais seleções têm saldo positivo E menos de 2 amarelos?
