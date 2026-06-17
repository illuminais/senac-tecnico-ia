<script setup lang="ts">
import { computed, useAttrs } from "vue";
import SlideBackground from "../components/SlideBackground.vue";
import SlideFooter from "../components/SlideFooter.vue";

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

type SocialBrand =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "spotify"
  | "chatgpt"
  | "python";

function toBrand(platform?: string): SocialBrand | undefined {
  const value = (platform || "").trim().toLowerCase();
  if (value === "instagram") return "instagram";
  if (value === "tiktok" || value === "tik tok") return "tiktok";
  if (value === "youtube" || value === "you tube") return "youtube";
  if (value === "spotify") return "spotify";
  if (value === "chatgpt" || value === "chat gpt" || value === "chat-gpt")
    return "chatgpt";
  if (value === "python") return "python";
  return undefined;
}

type BrandTheme = { accent: string; gradient: string; accent2?: string };

const BRAND: Record<SocialBrand, BrandTheme> = {
  instagram: {
    accent: "#dd2a7b",
    gradient:
      "linear-gradient(90deg, #f58529 0%, #dd2a7b 35%, #8134af 70%, #515bd4 100%)",
  },
  tiktok: {
    accent: "#25f4ee",
    gradient: "linear-gradient(90deg, #25f4ee 0%, #ffffff 35%, #fe2c55 100%)",
  },
  youtube: {
    accent: "#ff0000",
    gradient: "linear-gradient(90deg, #ff0000 0%, #ff4d4d 100%)",
  },
  spotify: {
    accent: "#1db954",
    gradient: "linear-gradient(90deg, #1db954 0%, #1ed760 100%)",
  },
  chatgpt: {
    // OpenAI/ChatGPT-style teal/green that still reads well on the theme.
    accent: "#10a37f",
    gradient: "linear-gradient(90deg, #10a37f 0%, #3ee6c2 55%, #a7f3d0 100%)",
  },
  python: {
    // Python brand colors (approx.)
    accent: "#3776ab",
    accent2: "#ffd43b",
    gradient: "linear-gradient(90deg, #3776ab 0%, #4b8ac6 55%, #ffd43b 100%)",
  },
};

const props = withDefaults(
  defineProps<{
    platform?: string;
    icon?: string;
    iconSize?: string;
    maxWidth?: string;
    brand?: SocialBrand;
    bgPreset?: "default" | "animate" | "palette";

    // Background animation overrides (can be set per-slide in frontmatter)
    pulse?: boolean;
    pulseDuration?: number;
    pulseScale?: number;
    backgroundOpacity?: number;
  }>(),
  {
    platform: "",
    icon: "",
    iconSize: "64px",
    maxWidth: "72rem",
    brand: undefined,
    bgPreset: "animate",
    pulse: true,
    pulseDuration: 6,
    pulseScale: 1.2,
  },
);

const resolvedBrand = computed<SocialBrand | undefined>(
  () => props.brand ?? toBrand(props.platform),
);

const bgNodeColor = computed(() => {
  const brand = resolvedBrand.value;
  if (!brand) return "#9900ff";
  return BRAND[brand].accent;
});
const bgOpacity = computed(() => {
  if (typeof props.backgroundOpacity === "number")
    return props.backgroundOpacity;
  return props.bgPreset === "palette" || props.bgPreset === "animate"
    ? 0.25
    : 0.1;
});
const brandVars = computed(() => {
  const brand = resolvedBrand.value;
  if (!brand) return {};
  return {
    "--social-accent": BRAND[brand].accent,
    "--social-accent-2": BRAND[brand].accent2 ?? BRAND[brand].accent,
    "--social-title-gradient": BRAND[brand].gradient,
    "--social-card-border": `color-mix(in srgb, ${BRAND[brand].accent} 55%, rgba(255,255,255,0.35))`,
    "--social-card-bg": "rgba(0, 0, 0, 0.12)",
  } as Record<string, string>;
});
</script>

<template>
  <div
    class="slidev-layout social flex items-center justify-center text-center h-full"
  >
    <SlideBackground
      v-bind="attrs"
      :preset="props.bgPreset"
      :x="180"
      :y="100"
      :zoom="3.2"
      nodeStrokeColor="#ffffff"
      :nodeStrokeWidth="0.1"
      :nodeColor="bgNodeColor"
      :backgroundOpacity="bgOpacity"
      :pulse="props.pulse"
      :pulseDuration="props.pulseDuration"
      :pulseScale="props.pulseScale"
    />

    <div
      class="content-wrapper"
      :style="{ maxWidth: props.maxWidth, ...brandVars }"
    >
      <div
        class="card p-12 rounded-xl border backdrop-blur-xl justify-center flex flex-col items-center"
      >
        <div class="social-header">
          <img
            v-if="props.icon"
            :src="props.icon"
            class="social-icon"
            :style="{ width: props.iconSize, height: props.iconSize }"
            draggable="false"
          />
          <h1 class="social-title">{{ props.platform }}</h1>
        </div>

        <div class="social-content">
          <slot />
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
</template>

<style scoped>
.social {
  position: relative;
  /* reserva espaço pro footer fixo sem deslocar lateralmente */
  padding-bottom: 64px;
}

.content-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  z-index: 10;
  width: 100%;

  --social-accent: var(--slidev-title-primary);
  --social-accent-2: var(--slidev-theme-secondary);
  --social-title-gradient: var(--slidev-title-gradient);
  --social-card-border: rgba(255, 255, 255, 0.22);
  --social-card-bg: rgba(0, 0, 0, 0.12);
}

.card {
  border-color: var(--social-card-border) !important;
  background: var(--social-card-bg) !important;
  box-shadow:
    0 18px 48px rgba(0, 0, 0, 0.45),
    0 0 0 1px color-mix(in srgb, var(--social-accent) 22%, transparent);
}

.social-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 12px;
}

.social-icon {
  display: block;
  flex: 0 0 auto;
  filter: drop-shadow(
      0 0 14px color-mix(in srgb, var(--social-accent) 65%, transparent)
    )
    drop-shadow(
      0 0 10px color-mix(in srgb, var(--social-accent-2) 55%, transparent)
    );
}

.social-title {
  margin: 0;
  padding: 0;
  line-height: 1.2;
  background: var(--social-title-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.social-content :deep(ul) {
  @apply text-left text-white/90 list-disc list-inside space-y-2;
}

.social-content :deep(li)::marker {
  color: color-mix(in srgb, var(--social-accent) 75%, white);
}

.social-content :deep(strong) {
  @apply text-white text-xl;
}
</style>
