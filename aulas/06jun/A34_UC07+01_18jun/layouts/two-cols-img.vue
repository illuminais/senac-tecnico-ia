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
  // Passa tudo para o background (ex: pulse/pulseDuration/etc), menos class/style
  // porque esses precisam ficar no container do slide (ex: class: slide-grayscale).
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
    class="slidev-layout relative pb-8 h-full px-14 py-10"
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
      class="two-cols-img-header relative z-10 mb-4 text-center"
    >
      <div ref="subtitleRef" class="subtitle relative z-10">
        <slot name="subtitle" />
      </div>
    </div>

    <div class="relative z-10 h-[calc(100%-8rem)] grid grid-cols-2 gap-6">
      <div
        class="border-2 border-sky-400 rounded-[14px] bg-slate-900/35 shadow-sky-200 shadow-md overflow-hidden"
      >
        <div
          ref="leftRef"
          class="w-full h-full flex items-center justify-center min-w-0"
        >
          <slot />
        </div>
      </div>

      <div
        class="border-2 border-green-400 rounded-[14px] bg-slate-900/35 shadow-green-200 shadow-md overflow-hidden"
      >
        <div class="w-full h-full flex items-center justify-center min-w-0">
          <slot name="right" />
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
</template>

<style scoped>
/* O conteúdo vem do Markdown (gerado pelo Slidev), então precisamos de :deep.
   Usamos Tailwind via @apply para continuar no "modo Tailwind". */
.two-cols-img-header :deep(h1) {
  @apply leading-tight m-0;
}

.subtitle :deep(h2) {
  @apply leading-tight m-0;
}

:deep(p) {
  @apply m-0;
}

:deep(img) {
  @apply max-w-full max-h-full h-auto w-auto object-contain rounded-[10px];
}
</style>
