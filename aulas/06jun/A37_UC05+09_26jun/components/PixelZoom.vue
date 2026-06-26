<script setup lang="ts">
/**
 * PixelZoom — imagem ampliada com overlay de valores de pixel (v-click).
 *
 * Uso no slides.md:
 *   <PixelZoom
 *     src="/assets/lola-classificacao.jpeg"
 *     :zoom="213"
 *     origin="55.02% 55.02%"
 *     width="300px"
 *     :pixels="[0,20,60,110,...]"
 *     :cols="10"
 *     :rows="6"
 *   />
 */
const props = withDefaults(
  defineProps<{
    /** Caminho da imagem */
    src: string;
    /** Valores de pixel a exibir no overlay (v-click) */
    pixels?: number[];
    /** Número de colunas do grid de pixels */
    cols?: number;
    /** Número de linhas do grid de pixels */
    rows?: number;
    /** Nível de zoom da imagem (CSS var --zoom) */
    zoom?: number;
    /** Origem do transform-origin (CSS var --zoom-origin) */
    origin?: string;
    /** Largura base da imagem (CSS var --zoom-width) */
    width?: string;
    /** Aplica filtro grayscale + alto contraste */
    grayscale?: boolean;
    /** Modo pixelado (image-rendering: pixelated) */
    pixelated?: boolean;
    /** Exibir barra de escala 0→255 abaixo da imagem */
    showScale?: boolean;
  }>(),
  {
    pixels: () => [],
    cols: 10,
    rows: 6,
    zoom: 213,
    origin: "55.02% 55.02%",
    width: "300px",
    grayscale: true,
    pixelated: true,
    showScale: true,
  },
);
</script>

<template>
  <div class="pixel-zoom-wrapper">
    <!-- Frame principal da imagem -->
    <div class="img-zoom-frame">
      <img
        :src="props.src"
        class="img-zoom"
        :class="{
          'img-pixelated': props.pixelated,
          'filter grayscale contrast-[8] brightness-[0.62]': props.grayscale,
        }"
        :style="`--zoom: ${props.zoom}; --zoom-origin: ${props.origin}; --zoom-width: ${props.width}`"
      />

      <!-- Overlay de pixels (revelado por v-click) -->
      <div
        v-if="props.pixels.length > 0"
        v-click
        class="pixel-grid absolute inset-0 z-[3] gap-px p-px"
        :style="`
          display: grid;
          grid-template-columns: repeat(${props.cols}, 1fr);
          grid-template-rows: repeat(${props.rows}, 1fr);
        `"
      >
        <div
          v-for="(n, i) in props.pixels"
          :key="i"
          class="flex items-center justify-center w-full h-full font-mono text-[16px] leading-none text-white"
          style="text-shadow: 0 2px 2px rgba(0, 0, 0, 0.95)"
        >
          {{ String(n).padStart(3, "0") }}
        </div>
      </div>
    </div>

    <!-- Barra de escala 0 (preto) → 255 (branco) -->
    <div
      v-if="props.showScale"
      class="scale-bar flex justify-between mt-2 border border-white text-xl bg-gradient-to-l from-white to-black rounded-xl px-4 w-full"
    >
      <p class="scale-label-dark font-bold">0 PRETO</p>
      <p class="scale-label-light font-bold">255 BRANCO</p>
    </div>
  </div>
</template>

<style scoped>
.pixel-zoom-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Reutiliza as classes do tema; se não estiverem disponíveis globalmente,
   defina aqui como fallback. */
.img-zoom-frame {
  width: min(520px, 88vw);
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
  isolation: isolate;
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.28);
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.img-pixelated {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

.img-zoom {
  width: var(--zoom-width, 220px);
  transform: scale(var(--zoom, 4));
  transform-origin: var(--zoom-origin, 55% 45%);
  display: block;
}

.scale-bar {
  height: 2.5rem;
  align-items: center;
}

/* Label escuro (lado preto do gradiente) — texto branco */
.scale-label-dark {
  color: #fff;
  margin: 0;
  line-height: 1;
}

/* Label claro (lado branco do gradiente) — texto preto */
.scale-label-light {
  color: #000;
  margin: 0;
  line-height: 1;
}
</style>
