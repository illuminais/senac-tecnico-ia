import { reactive, computed } from "vue";

/**
 * Singleton reativo que acumula os números dos slides que estouraram a altura.
 * Persiste em memória enquanto a aba do browser estiver aberta, sobrevivendo à
 * navegação entre slides (os componentes desmontam, mas o módulo não é re-importado).
 *
 * Usado pelo useOverflowGuard para reportar overflows e pelo GlobalBottom para exibi-los.
 */
const _overflowing = reactive(new Set<number>());

export function useOverflowStore() {
  const report = (slide: number) => _overflowing.add(slide);
  const clear = (slide: number) => _overflowing.delete(slide);

  // Computed é reativo a mutações em Sets reativos do Vue 3
  const list = computed(() => [..._overflowing].sort((a, b) => a - b));
  const hasAny = computed(() => _overflowing.size > 0);

  return { report, clear, list, hasAny };
}
