<script setup lang="ts">
import { computed } from "vue";
import TitleBg from "./TitleBg.vue";

type BackgroundPreset = "default" | "animate" | "palette";

const DEFAULT_PALETTE = [
  "#00ff1a",
  "#ff1500",
  "#ffe100",
  "#0d25ff",
  "#0dfff7",
  "#ff0dd7",
];

const props = withDefaults(
  defineProps<{
    preset?: BackgroundPreset;

    x?: number;
    y?: number;
    zoom?: number;

    // Pass-through (default preset)
    nodeColor?: string;
    nodeColorMode?: "uniform" | "palette";
    nodeStrokeColor?: string;
    nodeStrokeWidth?: number;
    backgroundOpacity?: number;

    // Palette preset overrides (can be customized)
    nodePalette?: string[];
    pulse?: boolean;
    pulseDuration?: number;
    pulseScale?: number;
  }>(),
  {
    preset: "default",
  },
);

const titleBgProps = computed(() => {
  if (props.preset === "default") {
    return {
      x: props.x,
      y: props.y,
      zoom: props.zoom,
      nodeColor: props.nodeColor,
      nodeColorMode: props.nodeColorMode,
      nodeStrokeColor: props.nodeStrokeColor,
      nodeStrokeWidth: props.nodeStrokeWidth,
      backgroundOpacity: props.backgroundOpacity,
      nodePalette: props.nodePalette,
      pulse: props.pulse,
      pulseDuration: props.pulseDuration,
      pulseScale: props.pulseScale,
    };
  }

  if (props.preset === "animate") {
    return {
      x: props.x,
      y: props.y,
      zoom: props.zoom,

      nodeColor: props.nodeColor,
      nodeColorMode: props.nodeColorMode ?? ("uniform" as const),
      nodeStrokeColor: props.nodeStrokeColor,
      nodeStrokeWidth: props.nodeStrokeWidth,

      backgroundOpacity: props.backgroundOpacity ?? 0.25,

      // pulse “normal” (uniform) — pode sobrescrever no frontmatter
      pulse: props.pulse ?? true,
      pulseDuration: props.pulseDuration ?? 4,
      pulseScale: props.pulseScale ?? 1.3,
    };
  }

  return {
    x: props.x,
    y: props.y,
    zoom: props.zoom,

    // preset "brainstorm": fill escuro + strokes coloridos + pulse
    nodeColor: props.nodeColor ?? "#000000",
    nodeColorMode: "palette" as const,
    nodePalette:
      props.nodePalette && props.nodePalette.length
        ? props.nodePalette
        : DEFAULT_PALETTE,

    pulse: props.pulse ?? true,
    pulseDuration: props.pulseDuration ?? 4,
    pulseScale: props.pulseScale ?? 1.3,

    backgroundOpacity: props.backgroundOpacity ?? 0.3,
    nodeStrokeWidth: props.nodeStrokeWidth ?? 0.3,
  };
});
</script>

<template>
  <TitleBg v-bind="titleBgProps" />
</template>
