<script setup lang="ts">
import { useAttrs } from "vue";
import SlideBackground from "../components/SlideBackground.vue";
import SlideFooter from "../components/SlideFooter.vue";

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const props = withDefaults(
  defineProps<{
    bgPreset?: "default" | "animate" | "palette";

    // Background base config (can be overridden per-slide)
    pulse?: boolean;
    pulseDuration?: number;
    pulseScale?: number;
    backgroundOpacity?: number;
    nodeStrokeWidth?: number;
  }>(),
  {
    bgPreset: "palette",
    pulse: true,
    pulseDuration: 8,
    pulseScale: 1.3,
    backgroundOpacity: 0.45,
    nodeStrokeWidth: 0.3,
  },
);
</script>

<template>
  <div
    class="slidev-layout brainstorm relative pb-12 flex flex-col items-center justify-center text-center h-full px-14 py-10"
  >
    <SlideBackground
      v-bind="attrs"
      :preset="props.bgPreset"
      :zoom="2.5"
      :backgroundOpacity="props.backgroundOpacity"
      :nodeStrokeWidth="props.nodeStrokeWidth"
      :pulse="props.pulse"
      :pulseDuration="props.pulseDuration"
      :pulseScale="props.pulseScale"
    />
    <div class="relative z-10 w-full">
      <div class="slide-card">
        <slot />
      </div>
    </div>
    <SlideFooter />
  </div>
</template>

<style scoped>
.slidev-layout.brainstorm :deep(h1 + p) {
  @apply mt-0 mb-6;
}

.slidev-layout.brainstorm :deep(h1 + p > strong:only-child) {
  @apply text-2xl font-extrabold text-white;
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.slidev-layout.brainstorm :deep(ul) {
  @apply text-left text-3xl text-white/90 list-disc list-inside space-y-3;
}

.slidev-layout.brainstorm :deep(li)::marker {
  color: rgb(255 255 255 / 0.55);
}
</style>
