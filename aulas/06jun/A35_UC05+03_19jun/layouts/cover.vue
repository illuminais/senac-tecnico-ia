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
  }>(),
  {
    bgPreset: "default",
  },
);

const bgOpacity = computed(() =>
  props.bgPreset === "palette" || props.bgPreset === "animate" ? 0.35 : 1,
);
</script>

<template>
  <div
    class="slidev-layout cover relative flex flex-col items-center justify-center text-center h-full"
  >
    <SlideBackground
      v-bind="attrs"
      :preset="props.bgPreset"
      :x="250"
      :y="250"
      :zoom="1"
      nodeColor="#121212"
      nodeStrokeColor="#37fa10"
      :nodeStrokeWidth="0.2"
      :backgroundOpacity="bgOpacity"
    />
    <div class="content-wrapper">
      <div class="cover-text-block">
        <slot />
      </div>
    </div>
    <SlideFooter />
  </div>
</template>

<style scoped>
.cover {
  position: relative;
  overflow: hidden;
  padding-bottom: 2rem;
  isolation: isolate;

  /* Variação (mais forte) do gradiente do título só na capa */
  --slidev-title-gradient: linear-gradient(
    45deg,
    var(--slidev-title-secondary) 0%,
    var(--slidev-title-primary) 60%,
    var(--slidev-title-secondary) 100%
  );
}

.content-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
}

/* Bloco absoluto que contém título + subtítulo juntos */
.cover-text-block {
  position: absolute;
  top: 64%;
  left: 36%;
  width: 70%;
  max-width: 800px;
  z-index: 30;
  text-align: center;
}

/* Título principal com gradiente */
.cover-text-block :deep(h1) {
  background: var(--slidev-title-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  padding: 0;
}

/* Subtítulo h2 — flui naturalmente abaixo do h1 */
.cover-text-block :deep(h2) {
  font-size: 1.05rem;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1.4;
  margin: 0.6rem 0 0 0;
  padding: 0;
}

/* Oculta parágrafos (autor estava aqui antes, agora está no footer) */
.cover-text-block :deep(p) {
  display: none;
}
</style>
