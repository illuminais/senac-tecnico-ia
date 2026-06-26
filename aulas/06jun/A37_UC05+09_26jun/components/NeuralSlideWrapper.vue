<script setup lang="ts">
import { ref, computed } from "vue";
import TitleBg from "./TitleBg.vue";

interface Props {
  /** Índice do slide atual (baseado em 0) */
  slideIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  slideIndex: 0,
});

// Permite navegação manual para debug
const currentIndex = ref(props.slideIndex);

const canGoPrevious = computed(() => currentIndex.value > 0);
const canGoNext = computed(() => currentIndex.value < 10); // Total de slides - 1

const goToPrevious = () => {
  if (canGoPrevious.value) {
    currentIndex.value--;
  }
};

const goToNext = () => {
  if (canGoNext.value) {
    currentIndex.value++;
  }
};
</script>

<template>
  <div class="neural-slide-wrapper">
    <TitleBg :slideIndex="currentIndex" />

    <!-- Debug controls (remover em produção) -->
    <div class="debug-controls" v-if="false">
      <button @click="goToPrevious" :disabled="!canGoPrevious">
        ← Anterior
      </button>
      <span>Slide {{ currentIndex + 1 }} / 11</span>
      <button @click="goToNext" :disabled="!canGoNext">Próximo →</button>
    </div>
  </div>
</template>

<style scoped>
.neural-slide-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.debug-controls {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  gap: 15px;
  align-items: center;
  color: white;
}

.debug-controls button {
  background: #4a90e2;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.debug-controls button:hover:not(:disabled) {
  background: #357abd;
}

.debug-controls button:disabled {
  background: #666;
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
