<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import titleBgUrl from "../public/assets/title-background-complete-nodes.svg?url";

const props = withDefaults(
  defineProps<{
    x?: number;
    y?: number;
    zoom?: number;
    /** Cor global (fill) dos nós (elipses/círculos) */
    nodeColor?: string;
    /** Paleta de cores para distribuir entre os nós (quando nodeColorMode = 'palette') */
    nodePalette?: string[];
    /** Como colorir os nós: 'uniform' (via CSS vars) ou 'palette' (por nó) */
    nodeColorMode?: "uniform" | "palette";
    /** Cor global (stroke) dos nós. Default: mesma do fill */
    nodeStrokeColor?: string;
    /** Largura do stroke dos nós */
    nodeStrokeWidth?: number;
    /** Animação de pulso nos nós */
    pulse?: boolean;
    /** Duração do pulso (segundos) */
    pulseDuration?: number;
    /** Escala máxima do pulso (ex: 1.08) */
    pulseScale?: number;
    backgroundOpacity?: number;
  }>(),
  {
    zoom: 1,
    nodeColor: "#ffffff",
    nodeColorMode: "uniform",
    nodeStrokeWidth: 0.1,
    backgroundOpacity: 0.3,
    pulse: false,
    pulseDuration: 2.6,
    pulseScale: 1.08,
  },
);

const svgContainerRef = ref<HTMLDivElement | null>(null);
const svgElementRef = ref<SVGSVGElement | null>(null);

const imageStyle = computed(() => {
  const offsetX = ((props.x || 250) / 500) * 100;
  const offsetY = ((props.y || 250) / 500) * 100;

  return {
    transform: `scale(${props.zoom})`,
    transformOrigin: `${offsetX}% ${offsetY}%`,
  };
});

const containerStyle = computed(() => {
  const fill = props.nodeColor;
  const stroke = props.nodeStrokeColor ?? props.nodeColor;
  const strokeWidth = props.nodeStrokeWidth;

  return {
    "--bg-opacity": props.backgroundOpacity,
    "--node-fill": fill,
    "--node-stroke": stroke,
    "--node-stroke-width": strokeWidth,
    "--pulse-duration": `${props.pulseDuration}s`,
    "--pulse-scale": String(props.pulseScale),
  };
});

const pickPaletteColor = (
  palette: string[],
  cx: number,
  cy: number,
  idx: number,
) => {
  if (!palette.length) return props.nodeColor;
  const ax = Number.isFinite(cx) ? Math.round(cx * 10) : 0;
  const ay = Number.isFinite(cy) ? Math.round(cy * 10) : 0;
  // hash determinístico (espalha bem as cores no canvas)
  const hash = (ax * 73856093) ^ (ay * 19349663) ^ (idx * 83492791);
  const slot = Math.abs(hash) % palette.length;
  return palette[slot];
};

const ensureSvgUsesCssVars = () => {
  if (!svgElementRef.value) return;

  const styleEl = svgElementRef.value.querySelector(
    "defs > style#style1",
  ) as HTMLStyleElement | null;

  // O SVG já tem um style1 (você preparou isso). Aqui a gente só troca o conteúdo
  // para referenciar variáveis CSS vindas do container (reativo por slide).
  const cssText = `
/* Estilização global para nós (controlada por variáveis CSS do componente) */
ellipse, circle {
  fill: var(--node-fill, #ffffff);
  stroke: var(--node-stroke, #00ff00);
  stroke-width: var(--node-stroke-width, 0.1);
}
`;

  if (styleEl) {
    if (styleEl.textContent !== cssText) styleEl.textContent = cssText;
    return;
  }

  // Fallback: se o SVG não tiver o style1, aplica direto nos elementos.
  const nodes = svgElementRef.value.querySelectorAll("ellipse, circle");
  nodes.forEach((el) => {
    (el as SVGElement).style.fill = props.nodeColor;
    (el as SVGElement).style.stroke = props.nodeStrokeColor ?? props.nodeColor;
    (el as SVGElement).style.strokeWidth = String(props.nodeStrokeWidth);
  });
};

const applyPaletteColorsIfNeeded = () => {
  if (!svgElementRef.value) return;
  if (props.nodeColorMode !== "palette") return;

  const palette = props.nodePalette ?? [];
  const nodes = svgElementRef.value.querySelectorAll("ellipse, circle");

  nodes.forEach((node, idx) => {
    const cx = parseFloat(node.getAttribute("cx") || "0");
    const cy = parseFloat(node.getAttribute("cy") || "0");
    const color = pickPaletteColor(palette, cx, cy, idx);

    const el = node as SVGElement;
    // Fill uniforme (controlado por nodeColor / CSS vars)
    el.style.fill = props.nodeColor;
    // Paleta aplicada apenas no contorno
    el.style.stroke = color;
    el.style.strokeWidth = String(props.nodeStrokeWidth);
    // deixa um pouco mais "clean" no fundo
    el.style.strokeOpacity = "0.75";
  });
};

const applyPulseIfNeeded = () => {
  if (!svgElementRef.value) return;
  if (!props.pulse) return;

  const nodes = svgElementRef.value.querySelectorAll("ellipse, circle");
  nodes.forEach((node, idx) => {
    // delays negativos: anima já "em andamento" e desencontra os nós
    const delay = -((idx % 14) * 0.14);
    (node as SVGElement).style.setProperty("--pulse-delay", `${delay}s`);
  });
};

const applyNodeColor = () => {
  // Garante que o SVG usa variáveis CSS (e não cores “hardcoded” no style).
  ensureSvgUsesCssVars();

  // Opcional: colore cada nó com uma cor da paleta.
  applyPaletteColorsIfNeeded();

  // Opcional: anima pulso.
  applyPulseIfNeeded();

  // Highlight opcional: só acontece se x/y forem fornecidos.
  if (!svgContainerRef.value || props.x === undefined || props.y === undefined)
    return;

  const svg = svgContainerRef.value.querySelector("svg");
  if (!svg) return;

  const ellipses = svg.querySelectorAll("ellipse");
  let closestEllipse: SVGElement | null = null;
  let minDistance = Infinity;

  ellipses.forEach((ellipse) => {
    const cx = parseFloat(ellipse.getAttribute("cx") || "0");
    const cy = parseFloat(ellipse.getAttribute("cy") || "0");
    const distance = Math.sqrt(
      Math.pow(cx - props.x!, 2) + Math.pow(cy - props.y!, 2),
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestEllipse = ellipse as SVGElement;
    }
  });

  ellipses.forEach((el) => {
    (el as SVGElement).style.filter = "";
  });

  if (closestEllipse && minDistance < 5) {
    (closestEllipse as SVGElement).style.filter =
      `drop-shadow(0 0 8px ${props.nodeColor})`;
  }
};

onMounted(async () => {
  if (!svgContainerRef.value) return;

  try {
    const response = await fetch(titleBgUrl);
    const svgText = await response.text();
    svgContainerRef.value.innerHTML = svgText;

    const svgElement = svgContainerRef.value.querySelector("svg");
    if (svgElement) {
      svgElementRef.value = svgElement as SVGSVGElement;
      svgElement.setAttribute("preserveAspectRatio", "xMidYMid slice");
      svgElement.style.width = "100%";
      svgElement.style.height = "100%";

      ensureSvgUsesCssVars();
      applyNodeColor();
    }
  } catch (error) {
    console.error("Erro ao carregar SVG:", error);
  }
});

watch(
  [
    () => props.x,
    () => props.y,
    () => props.nodeColor,
    () => props.nodePalette,
    () => props.nodeColorMode,
    () => props.nodeStrokeColor,
    () => props.nodeStrokeWidth,
    () => props.pulse,
    () => props.pulseDuration,
    () => props.pulseScale,
  ],
  () => {
    // As cores globais reagem automaticamente via CSS vars.
    // Aqui só garantimos o style correto e recalculamos o highlight.
    applyNodeColor();
  },
);
</script>

<template>
  <div
    class="title-bg-container"
    :style="containerStyle"
    :data-pulse="props.pulse ? 'true' : 'false'"
  >
    <div ref="svgContainerRef" class="svg-wrapper" :style="imageStyle"></div>
  </div>
</template>

<style scoped>
.title-bg-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.svg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.svg-wrapper :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
}

.svg-wrapper :deep(ellipse),
.svg-wrapper :deep(circle),
.svg-wrapper :deep(path),
.svg-wrapper :deep(polygon) {
  opacity: var(--bg-opacity, 0.3);
  transition: all 0.3s ease;
}

/* Pulso (apenas quando data-pulse=true) */
.title-bg-container[data-pulse="true"] .svg-wrapper :deep(ellipse),
.title-bg-container[data-pulse="true"] .svg-wrapper :deep(circle) {
  transform-box: fill-box;
  transform-origin: center;
  animation: titlebg-pulse var(--pulse-duration, 2.6s) ease-in-out infinite;
  animation-delay: var(--pulse-delay, 0s);
}

@keyframes titlebg-pulse {
  0% {
    transform: scale(1);
    opacity: calc(var(--bg-opacity, 0.3) * 0.85);
  }
  50% {
    transform: scale(var(--pulse-scale, 1.08));
    opacity: calc(var(--bg-opacity, 0.3) * 1.05);
  }
  100% {
    transform: scale(1);
    opacity: calc(var(--bg-opacity, 0.3) * 0.85);
  }
}
</style>
