import { ref, onMounted, onBeforeUnmount, type Ref } from "vue";
import { useOverflowStore } from "./useOverflowStore";

/**
 * Detecta quando o conteúdo de um slide ultrapassa a altura do `.slidev-layout`.
 *
 * @param anchorRef - qualquer elemento dentro do `.slidev-layout` a monitorar.
 *                    Normalmente o próprio footer ou content-wrapper.
 * @param slideNum  - número do slide atual (ex: currentPage do useNav). Quando
 *                    informado, o overflow é registrado no useOverflowStore global
 *                    e emitido via console.warn — visível ao navegar por todos os
 *                    slides no `npm run dev`.
 */
export function useOverflowGuard(
  anchorRef: Ref<HTMLElement | null>,
  slideNum?: Ref<number> | number,
) {
  const isOverflowing = ref(false);

  // Cast para any para evitar o erro "Property 'env' does not exist on type 'ImportMeta'"
  if (!(import.meta as any).env?.DEV) return { isOverflowing };

  const store = useOverflowStore();
  let observer: ResizeObserver | null = null;

  const getSlideNum = () =>
    typeof slideNum === "number" ? slideNum : slideNum?.value;

  const check = () => {
    const el = anchorRef.value;
    if (!el) return;
    const slide = el.closest(".slidev-layout") as HTMLElement | null;
    if (!slide) return;

    const overflowing = slide.scrollHeight > slide.clientHeight;
    isOverflowing.value = overflowing;

    const n = getSlideNum();
    if (n !== undefined) {
      if (overflowing) {
        store.report(n);
        console.warn(`[OverflowGuard] Slide ${n} está estourando a altura do layout!`);
      } else {
        store.clear(n);
      }
    }
  };

  onMounted(() => {
    const el = anchorRef.value;
    if (!el) return;
    const slide = el.closest(".slidev-layout") as HTMLElement | null;
    if (!slide) return;

    observer = new ResizeObserver(check);
    observer.observe(slide);
    // também observa mudanças internas (v-click, conteúdo dinâmico)
    observer.observe(el);
    check();
  });

  // Não limpar do store ao desmontar — queremos que persista na navegação
  onBeforeUnmount(() => observer?.disconnect());

  return { isOverflowing };
}
