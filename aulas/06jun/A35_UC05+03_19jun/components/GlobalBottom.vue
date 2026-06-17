<script setup lang="ts">
import { useOverflowStore } from "../composables/useOverflowStore";

/**
 * GlobalBottom.vue — componente global do Slidev (renderizado em todos os slides).
 *
 * Exibe um painel fixo no canto superior direito listando TODOS os números de
 * slides que estouraram a altura, acumulados à medida que o usuário navega em
 * modo dev (`npm run dev`).
 *
 * Para limpar o histórico, recarregue a página (F5).
 */
const isDevMode = (import.meta as any).env?.DEV;
const { list, hasAny } = useOverflowStore();
</script>

<template>
  <div v-if="isDevMode && hasAny" class="overflow-panel">
    <span class="overflow-panel-icon">⚠️</span>
    <span class="overflow-panel-label">OVERFLOW</span>
    <span class="overflow-panel-divider">|</span>
    <span class="overflow-panel-slides">slides: {{ list.join(", ") }}</span>
  </div>
</template>

<style scoped>
.overflow-panel {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9999;
  background: rgba(185, 28, 28, 0.92);
  color: #fff;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-family: ui-monospace, monospace;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 130, 130, 0.45);
  pointer-events: none;
  user-select: none;
}

.overflow-panel-label {
  font-weight: 700;
  letter-spacing: 0.04em;
}

.overflow-panel-divider {
  opacity: 0.4;
}

.overflow-panel-slides {
  opacity: 0.9;
}
</style>
