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
    /** Rótulo do painel de saída. Ex: "A mensagem que apareceu", "Resultado". */
    outputLabel?: string;
    /** Tom do painel de saída: erro (vermelho) ou neutro (cinza). */
    outputTone?: "error" | "neutral";
  }>(),
  {
    bgPreset: "default",
    outputLabel: "Saída",
    outputTone: "error",
  },
);

const bgOpacity = computed(() =>
  props.bgPreset === "palette" || props.bgPreset === "animate" ? 0.3 : 0.15,
);
</script>

<template>
  <div class="slidev-layout code-output px-14 py-10 h-full">
    <SlideBackground
      v-bind="attrs"
      :preset="props.bgPreset"
      :x="350"
      :y="150"
      :zoom="4"
      nodeColor="#121212"
      nodeStrokeColor="#37fa10"
      :nodeStrokeWidth="0.1"
      :backgroundOpacity="bgOpacity"
    />

    <div class="co-wrapper">
      <div class="slide-card co-card">
        <!-- Topo: título + código, com destaque -->
        <div class="co-code">
          <slot />
        </div>

        <!-- Base: saída, mensagem de erro ou resultado -->
        <div class="co-output" :class="`tone-${props.outputTone}`">
          <div class="co-output-label">{{ props.outputLabel }}</div>
          <slot name="output" />
        </div>

        <!-- Rodapé opcional: gabarito, nota, AdminOnly -->
        <div class="co-note">
          <slot name="note" />
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
</template>

<style scoped>
.code-output {
  position: relative;
  padding-bottom: 2rem;
}

.co-wrapper {
  position: relative;
  z-index: 10;
  height: 100%;
}

.co-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

/* ---------------------------------------------------------------
   Regiões isoladas de propósito: cada uma declara o próprio tamanho
   de fonte em vez de herdar do card. Foi a herança do pai que
   desalinhou os layouts two-cols.
   --------------------------------------------------------------- */

.co-code {
  /* Nao estica: a saida cola logo abaixo do codigo em vez de ficar um vao.
     Encolhe antes da saida se faltar espaco, e o overflow do card evita
     que uma regiao suba por cima da outra.
     Cabe em torno de 7 linhas de codigo e 8 de saida. Passou disso,
     divida em dois slides (regra da skill densidade-slides: nunca cortar). */
  flex: 0 1 auto;
  min-height: 0;
  overflow: hidden;
}

.co-code :deep(h1) {
  margin: 0 0 1rem;
}

.co-code :deep(p) {
  font-size: 1.05rem;
  line-height: 1.5;
  color: var(--theme-text);
  margin: 0 0 0.75rem;
}

.co-code :deep(strong) {
  font-weight: 700;
  color: var(--theme-text-strong);
}

/* O código do topo é o protagonista: maior que o corpo do slide */
.co-code :deep(.slidev-code),
.co-code :deep(pre) {
  font-size: 1.05rem !important;
  line-height: 1.45 !important;
  margin: 0.25rem 0 0.5rem;
}

/* ---------------- Painel de saída ---------------- */

.co-output {
  /* Nunca encolhe: a mensagem e o ponto do slide */
  flex: 0 0 auto;
  min-height: 0;
  margin-top: 0.5rem;
  padding: 0.6rem 0.9rem 0.35rem;
  border-radius: 0.5rem;
  border-left: 3px solid;
  background: rgba(255, 255, 255, 0.04);
}

.co-output.tone-error {
  border-left-color: #f87171;
}

.co-output.tone-neutral {
  border-left-color: #94a3b8;
}

.co-output-label {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--slidev-theme-text-muted);
  margin-bottom: 0.3rem;
}

/* Saída em fonte menor que o código: hierarquia visual clara */
.co-output :deep(.slidev-code),
.co-output :deep(pre) {
  font-size: 0.9rem !important;
  line-height: 1.35 !important;
  margin: 0;
  background: transparent !important;
}

.co-output :deep(p) {
  font-size: 0.95rem;
  color: var(--theme-text);
  margin: 0.25rem 0;
}

/* ---------------- Nota / gabarito ---------------- */

.co-note {
  flex-shrink: 0;
  margin-top: 0.6rem;
}

.co-note :deep(p) {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--theme-text);
  margin: 0.25rem 0;
}

.co-note :deep(.slidev-code),
.co-note :deep(pre) {
  font-size: 0.95rem !important;
  margin: 0.25rem 0;
}
</style>
