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
    bgPreset?: "default" | "animate" | "palette";
    /** Texto da legenda abaixo do grid (opcional) */
    caption?: string;
  }>(),
  {
    bgPreset: "default",
    caption: "",
  },
);

const bgOpacity = computed(() =>
  props.bgPreset === "palette" || props.bgPreset === "animate" ? 0.3 : 0.1,
);
</script>

<template>
  <div
    class="slidev-layout three-cols-img relative flex flex-col items-center justify-center text-center h-full px-14 py-10"
  >
    <SlideBackground
      v-bind="attrs"
      :preset="props.bgPreset"
      :x="200"
      :y="150"
      :zoom="2.5"
      :backgroundOpacity="bgOpacity"
    />

    <div
      class="content-wrapper relative z-10 w-full slide-card"
    >
      <!-- Título / slot padrão (h1 será elevado ao topo) -->
      <div class="header-block mb-4">
        <slot name="header" />
      </div>

      <!-- Grid de 3 colunas -->
      <div class="three-cols-grid">
        <!-- Coluna esquerda -->
        <div class="col-slot">
          <slot />
        </div>

        <!-- Coluna central -->
        <div class="col-slot">
          <slot name="center" />
        </div>

        <!-- Coluna direita -->
        <div class="col-slot">
          <slot name="right" />
        </div>
      </div>

      <!-- Caption opcional -->
      <p v-if="props.caption" class="caption mt-5 opacity-90">
        {{ props.caption }}
      </p>
    </div>

    <SlideFooter />
  </div>
</template>

<style scoped>
.three-cols-img {
  position: relative;
  padding-bottom: 2rem;
}

.three-cols-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  align-items: center;
}

/* Cada coluna — empilha label + imagem verticalmente */
.col-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

/* Texto de label acima da imagem */
.col-slot :deep(p) {
  font-size: 0.85rem;
  opacity: 0.8;
  margin: 0;
}

/* Imagens dentro de cada coluna */
.col-slot :deep(img) {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* SVGs mantêm aspect-ratio (object-contain) */
.col-slot :deep(img[src$=".svg"]) {
  object-fit: contain;
}

.header-block :deep(h1) {
  margin-bottom: 0.5rem;
}

.header-block :deep(p) {
  font-size: 1.1rem;
  opacity: 0.85;
}

.caption {
  font-size: 1rem;
  color: var(--theme-text);
}
</style>
