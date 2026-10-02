# Exercícios — Aula [N]: [Título]

> **Para o agente (@slidev-senac):** Cada exercício começa com um bloco `---` de
> frontmatter YAML seguido do enunciado em Markdown.
> Os testes do frontmatter são usados pela plataforma para correção automática (Pyodide).
> O bloco de código starter é obrigatório em exercícios do tipo `python`.

---

## Schema de Frontmatter por Exercício

```yaml
id: EX-00-01            # identificador único: EX-{aula}-{seq}
aula: 0                 # número da aula
uc: "UC00"              # UC desta disciplina (ex: UC02, UC03)
tipo: python            # python | texto | multipla-escolha
nivel: 1                # 1=compreensão | 2=ap.guiada | 3=ap.independente | 4=desafio
titulo: "..."           # título curto exibido na plataforma
pontuacao: 10           # pontuação máxima do exercício
dupla: false            # true = exercício em dupla, false = individual
testes:                 # casos de teste para correção automática
  - input: ""
    expected: ""
```

---
<!-- Insira os exercícios abaixo seguindo o schema acima. Mínimo 3, máximo 8. -->
<!-- Níveis devem escalar: 1 → 2 → 3 → 4. Nunca pular níveis. -->
<!-- Todo exercício python precisa de código starter com assinatura da função pronta. -->
