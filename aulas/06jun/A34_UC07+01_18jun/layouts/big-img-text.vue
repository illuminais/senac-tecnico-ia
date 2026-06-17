<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  ref,
  useAttrs,
  type StyleValue,
} from "vue";
import SlideBackground from "../components/SlideBackground.vue";
import SlideFooter from "../components/SlideFooter.vue";

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const rootClass = computed(() => attrs.class as any);
const rootStyle = computed<StyleValue | undefined>(
  () => attrs.style as StyleValue | undefined,
);

const bgAttrs = computed(() => {
  const {
    class: _class,
    style: _style,
    ...rest
  } = attrs as Record<string, any>;
  return rest;
});

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

/** Refs for DOM manipulation */
const headerRef = ref<HTMLElement | null>(null);
const rightRef = ref<HTMLElement | null>(null);

/**
 * Extract the first <h1> from the ::right:: slot and move it into the
 * full-width header area at the top of the slide.
 */
const extractTitle = () => {
  if (!headerRef.value || !rightRef.value) return;
  const h1 = rightRef.value.querySelector("h1");
  if (h1) headerRef.value.appendChild(h1);
};

onMounted(async () => {
  await nextTick();
  extractTitle();
});
</script>

<template>
  <div
    class="slidev-layout big-img-text relative h-full px-14 py-10 pb-10 flex flex-col"
    :class="rootClass"
    :style="rootStyle"
  >
    <SlideBackground
      v-bind="bgAttrs"
      :preset="props.bgPreset"
      :x="250"
      :y="250"
      :zoom="2.2"
      nodeColor="#121212"
      nodeStrokeColor="#37fa10"
      :backgroundOpacity="bgOpacity"
    />

    <!-- ① Full-width title header — h1 is moved here from the right slot -->
    <!-- ② Content area: image floats left, all text flows around it (and below) -->
    <div
      class="slide-card relative z-10 flex-1 min-h-0 flex flex-col bg-black/25"
    >
      <div ref="headerRef" class="title-header mb-4" />

      <div class="flex-1 min-h-0 overflow-y-auto content-flow">
        <!-- Image: floated left, fixed proportions, highlighted border -->
        <div class="img-float">
          <slot />
        </div>

        <!-- All remaining ::right:: content (after h1 extraction) flows here -->
        <div ref="rightRef" class="text-body">
          <slot name="right" />
        </div>

        <!-- Clear float so the parent expands correctly -->
        <div class="clear-both" />
      </div>
    </div>

    <SlideFooter />
  </div>
</template>

<style scoped>
/* ── Title header ─────────────────────────────────────────────────── */
.title-header :deep(h1) {
  @apply text-4xl font-bold leading-tight text-white m-0 p-0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding-bottom: 0.5rem;
}

/* ── Floating image container ─────────────────────────────────────── */
.img-float {
  float: left;
  width: 30%;
  aspect-ratio: 4 / 3;
  margin-right: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #38bdf8;
  box-shadow: 0 0 18px rgba(14, 165, 233, 0.3);
  background: rgba(15, 23, 42, 0.5);
  flex-shrink: 0;
}

/* Ensure the img tag from markdown fills its float container */
.img-float :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}

/* ── Text body (flows to right of image, then below it) ───────────── */
.text-body :deep(h1) {
  /* h1 is extracted to the header — hide any duplicate if extraction failed */
  @apply text-3xl font-bold mb-3 text-white leading-tight;
}

.text-body :deep(h2) {
  @apply text-xl font-semibold mt-3 mb-1;
  color: var(--slidev-theme-text-muted);
}

.text-body :deep(h3) {
  @apply text-lg font-semibold mt-2 mb-1 text-slate-300;
}

.text-body :deep(p) {
  @apply text-base text-white/90 mb-2 leading-relaxed;
}

.text-body :deep(ul),
.text-body :deep(ol) {
  @apply list-disc list-inside text-white/90 mb-2;
}

.text-body :deep(li) {
  @apply text-base py-0.5;
}

.text-body :deep(strong) {
  @apply text-white font-bold;
}

.text-body :deep(blockquote) {
  @apply border-l-4 border-green-400 pl-4 italic text-slate-300 my-3 text-sm;
}

.text-body :deep(table) {
  @apply w-full text-sm text-left border-collapse mt-2 mb-3;
}

.text-body :deep(th) {
  @apply border border-slate-600 px-3 py-1.5 bg-slate-800 text-slate-200 font-semibold;
}

.text-body :deep(td) {
  @apply border border-slate-700 px-3 py-1.5 text-white/85;
}
</style>
