<script setup lang="ts">
import { nextTick, ref } from "vue";

const props = withDefaults(
  defineProps<{
    src: string;
    zoomFrom?: number;
    zoomTo?: number;
    duration?: number;
    origin?: string;
    width?: string;
    startPaused?: boolean;
    grayscale?: boolean;
    pixelated?: boolean;
  }>(),
  {
    zoomFrom: 1,
    zoomTo: 200,
    duration: 5,
    origin: "55% 45%",
    width: "300px",
    startPaused: true,
    grayscale: true,
    pixelated: true,
  },
);

const paused = ref(props.startPaused);
const animEnabled = ref(true);

const play = () => {
  paused.value = false;
};

const pause = () => {
  paused.value = true;
};

const replay = async () => {
  // volta pro frame inicial e deixa pausado (aí você aperta Play)
  paused.value = true;
  animEnabled.value = false;
  await nextTick();
  animEnabled.value = true;
};
</script>

<template>
  <div>
    <div class="img-zoom-frame">
      <img
        :src="props.src"
        :class="[
          'img-zoom',
          grayscale ? 'img-grayscale' : '',
          pixelated ? 'img-pixelated' : '',
          animEnabled ? 'img-zoom-animated' : '',
        ]"
        :style="{
          '--zoom-from': props.zoomFrom,
          '--zoom-to': props.zoomTo,
          '--zoom-origin': props.origin,
          '--zoom-width': props.width,
          '--zoom-duration': `${props.duration}s`,
          animationPlayState: paused ? 'paused' : 'running',
        }"
      />
    </div>

    <div class="mt-4 flex items-center justify-center gap-3">
      <button
        class="px-4 py-2 rounded-lg border border-white/25 bg-slate-900/40 hover:bg-slate-900/60"
        type="button"
        @click="replay"
      >
        Replay
      </button>

      <button
        v-if="paused"
        class="px-4 py-2 rounded-lg border border-white/25 bg-slate-900/40 hover:bg-slate-900/60"
        type="button"
        @click="play"
      >
        Play
      </button>
      <button
        v-else
        class="px-4 py-2 rounded-lg border border-white/25 bg-slate-900/40 hover:bg-slate-900/60"
        type="button"
        @click="pause"
      >
        Pause
      </button>
    </div>
  </div>
</template>
