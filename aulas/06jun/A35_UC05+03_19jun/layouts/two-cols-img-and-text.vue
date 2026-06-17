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
    imgBorder?: string;
    textBorder?: string;
  }>(),
  {
    bgPreset: "default",
    imgBorder: "border-sky-400",
    textBorder: "border-green-400",
  },
);

const bgOpacity = computed(() =>
  props.bgPreset === "palette" || props.bgPreset === "animate" ? 0.3 : 0.2,
);

const headerRef = ref<HTMLElement | null>(null);
const leftRef = ref<HTMLElement | null>(null);
const subtitleRef = ref<HTMLElement | null>(null);

const moveTitleOnly = () => {
  if (!headerRef.value || !leftRef.value) return;

  const left = leftRef.value;
  const title = left.querySelector("h1");
  if (!title) return;

  // Keep subtitle below the title
  if (subtitleRef.value) {
    headerRef.value.insertBefore(title, subtitleRef.value);
  } else {
    headerRef.value.appendChild(title);
  }
};

onMounted(async () => {
  await nextTick();
  moveTitleOnly();
});
</script>

<template>
  <div
    class="slidev-layout two-cols-img-and-text relative pb-8 h-full px-14 py-10"
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

    <div
      ref="headerRef"
      class="two-cols-img-and-text-header relative z-10 text-center mb-4 flex flex-col items-center justify-center"
    >
      <div ref="subtitleRef" class="subtitle mt-6">
        <slot name="subtitle" />
      </div>
    </div>

    <div
      class="relative z-10 h-[calc(100%-8rem)] grid grid-cols-2 gap-6 items-stretch border rounded-[14px] bg-black/20 backdrop-blur-md shadow-md overflow-hidden"
    >
      <!-- Left: image (centered) -->
      <div
        class="border-2 rounded-[14px] overflow-hidden"
        :class="props.imgBorder"
      >
        <div
          ref="leftRef"
          class="w-full h-full flex items-center justify-center min-w-0"
        >
          <slot />
        </div>
      </div>

      <!-- Right: text (aligned) -->
      <div class="shadow-md overflow-hidden" :class="props.textBorder">
        <div class="w-full h-full min-w-0 p-8 text-left">
          <slot name="right" />
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
</template>

<style scoped>
.two-cols-img-and-text-header :deep(h1) {
  @apply leading-tight m-0 text-4xl;
}

.subtitle :deep(h2) {
  @apply leading-tight m-0;
}

:deep(p) {
  @apply m-0;
}

/* Left image styling */
.two-cols-img-and-text :deep(img) {
  @apply max-w-full max-h-full h-auto w-auto object-contain rounded-[10px];
}

/* Right text defaults */
.two-cols-img-and-text :deep(h2) {
  @apply text-xl font-semibold mt-0 mb-2;
  color: var(--slidev-theme-text-muted);
}

.two-cols-img-and-text :deep(ul) {
  @apply list-disc list-inside space-y-0 text-white/90 pb-2;
}

.two-cols-img-and-text :deep(li) {
  @apply text-xl py-2;
}

.two-cols-img-and-text :deep(strong) {
  @apply text-white;
}
</style>
