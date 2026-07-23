import { describe, expect, it } from 'vitest'

// Smoke test trivial só para provar que o pipeline de testes (Vitest) roda.
// Os testes de verdade (property-based, auth puro) entram em outra task,
// quando platform/shared/pure.ts existir e o alias @shared for usado de verdade.
describe('smoke', () => {
  it('roda o pipeline de testes', () => {
    expect(1 + 1).toBe(2)
  })
})
