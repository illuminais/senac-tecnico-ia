<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useAttrs } from "vue";
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
  props.bgPreset === "palette" || props.bgPreset === "animate" ? 0.3 : 0.2,
);

const headerRef = ref<HTMLElement | null>(null);
const leftRef = ref<HTMLElement | null>(null);

const moveHeader = () => {
  if (!headerRef.value || !leftRef.value) return;

  const left = leftRef.value;

  const title = left.querySelector("h1");
  if (title) headerRef.value.appendChild(title);
};

onMounted(async () => {
  await nextTick();
  moveHeader();
});
</script>

<template>
  <div
    class="slidev-layout two-cols-code h-full flex justify-center items-center relative p-8"
  >
    <SlideBackground
      v-bind="attrs"
      :preset="props.bgPreset"
      :x="400"
      :y="400"
      :zoom="2"
      nodeColor="#121212"
      nodeStrokeColor="#37fa10"
      :backgroundOpacity="bgOpacity"
    />

    <div
      class="slide-card relative z-10 h-full flex flex-col"
    >
      <div ref="headerRef" class="two-cols-code-header"></div>

      <div class="two-cols-code-grid">
        <div ref="leftRef" class="col-left content-wrapper">
          <slot />
        </div>

        <div class="col-right content-wrapper">
          <slot name="right" />
        </div>
      </div>

      <div class="two-cols-code-footer">
        <slot name="footer" />
      </div>
    </div>

    <SlideFooter />
  </div>
</template>

<style scoped>
.two-cols-code {
  position: relative;
  padding-bottom: 2rem;
}

.two-cols-code-header {
  position: relative;
  z-index: 10;
  margin-bottom: 1.25rem;
}

.two-cols-code-grid {
  position: relative;
  z-index: 10;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 2rem;
}

.content-wrapper {
  min-width: 0;
}

.two-cols-code-footer {
  flex-shrink: 0;
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.85rem;
  color: #94a3b8;
  font-style: italic;
}

.two-cols-code-header :deep(h1) {
  margin: 0 0 0.5rem;
}

.two-cols-code-header :deep(p),
.two-cols-code-header :deep(h2) {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  color: var(--slidev-theme-text-muted);
}

.two-cols-code-header :deep(strong) {
  font-weight: 800;
  color: var(--theme-text-strong);
}

.content-wrapper :deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 8px;
  margin-bottom: 8px;
  color: var(--slidev-theme-text-muted);
}

.content-wrapper :deep(p) {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--theme-text);
}

.content-wrapper :deep(ul),
.content-wrapper :deep(ol) {
  margin-top: 8px;
}

.content-wrapper :deep(li) {
  font-size: 1rem;
  margin-top: 8px;
  color: var(--theme-text);
}
</style>
