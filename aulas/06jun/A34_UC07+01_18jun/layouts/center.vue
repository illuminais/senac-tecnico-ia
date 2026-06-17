<script setup lang="ts">
import { computed, useAttrs } from "vue";
import SlideBackground from "../components/SlideBackground.vue";
import SlideFooter from "../components/SlideFooter.vue";

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const props = withDefaults(
  defineProps<{
    wide?: boolean;
    bgPreset?: "default" | "animate" | "palette";
  }>(),
  {
    wide: false,
    bgPreset: "default",
  },
);

const bgOpacity = computed(() =>
  props.bgPreset === "palette" || props.bgPreset === "animate" ? 0.3 : 0.1,
);
</script>

<template>
  <div
    class="slidev-layout center flex items-center justify-center text-center h-full px-14 py-10"
  >
    <SlideBackground
      v-bind="attrs"
      :preset="props.bgPreset"
      :x="180"
      :y="100"
      :zoom="3.2"
      :backgroundOpacity="bgOpacity"
    />
    <div class="content-wrapper">
      <div class="slide-card">
        <div v-if="props.wide" class="wide-content">
          <slot />
        </div>
        <slot v-else />
      </div>
    </div>
    <SlideFooter />
  </div>
</template>

<style scoped>
.center {
  position: relative;
  padding-bottom: 2rem;
}

.content-wrapper {
  position: relative;
  z-index: 10;
}

/* Título principal */
.content-wrapper :deep(h1) {
  line-height: 1.3;
}

/* Subtítulos */
.content-wrapper :deep(h2) {
  font-size: 1.875rem;
  font-weight: 600;
  margin-top: 8px;
  margin-bottom: 8px;
  color: var(--slidev-theme-text-muted);
}

/* Parágrafos */
.content-wrapper :deep(p) {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--theme-text);
}

/* Modo wide: alinha à esquerda e texto maior */
.wide-content {
  max-width: 56rem;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  font-size: 1.375rem;
  line-height: 1.7;
}

.wide-content :deep(p) {
  font-size: inherit;
  line-height: 1.7;
  color: var(--theme-text);
}

.wide-content :deep(p + p) {
  margin-top: 1.25rem;
}

.wide-content :deep(ul),
.wide-content :deep(ol) {
  margin-top: 1rem;
  margin-left: 1.75rem;
}

.wide-content :deep(li) {
  font-size: inherit;
  margin-top: 0.5rem;
  color: var(--theme-text);
}

/* Listas */
.content-wrapper :deep(ul),
.content-wrapper :deep(ol) {
  margin-top: 12px;
}

.content-wrapper :deep(li) {
  font-size: 1.125rem;
  margin-top: 12px;
  color: var(--theme-text);
}

/* Strong/Bold */
.content-wrapper :deep(strong) {
  font-weight: 700;
  color: var(--theme-text-strong);
}

/* ── Conteúdo corporal sempre alinhado à esquerda ────────────────────
   O bloco é centralizado pelo flex do layout, mas listas, parágrafos,
   tabelas e blockquotes devem ser lidos da esquerda para a direita.
   Somente h1 e h2 permanecem centrados. */
.content-wrapper :deep(ul),
.content-wrapper :deep(ol),
.content-wrapper :deep(li),
.content-wrapper :deep(p),
.content-wrapper :deep(table),
.content-wrapper :deep(blockquote),
.content-wrapper :deep(blockquote p),
.content-wrapper :deep(em) {
  text-align: left;
}
</style>
