<script setup lang="ts">
/**
 * MLToast — toast de revelação por clique (bottom-right).
 *
 * Uso no slides.md (após criar o componente no tema):
 *   <MLToast title="TÍTULO EM CAIXA ALTA">
 *     Conteúdo em **markdown** ou HTML simples.
 *   </MLToast>
 *
 * O v-click já está embutido: o toast aparece no próximo clique.
 */
defineProps<{
  /** Texto da label principal (uppercase, verde) */
  title: string;
}>();
</script>

<template>
  <div v-click class="ml-toast">
    <div class="ml-toast__label">{{ title }}</div>
    <div class="ml-toast__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ml-toast {
  position: fixed;
  right: 10px;
  bottom: 48px;
  z-index: 9999;
  max-width: min(460px, 92vw);
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  pointer-events: none;

  /* Entrada animada */
  transform: translateY(8px);
  opacity: 0;
  animation: ml-toast-in 300ms ease-out forwards;
}

.ml-toast__label {
  font-size: 1.25rem;
  text-transform: uppercase;
  color: #a7f3d0;
  margin-bottom: 6px;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.ml-toast__body {
  font-size: 1rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.92);
  text-align: left;
}

/* Herda negrito com cor verde */
.ml-toast__body :deep(strong) {
  color: #a7f3d0;
  font-weight: 700;
}

/* Listas dentro do toast */
.ml-toast__body :deep(ul),
.ml-toast__body :deep(ol) {
  margin: 0;
  padding-left: 1.25rem;
}

.ml-toast__body :deep(li) {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.92);
  margin-top: 4px;
}

/* Parágrafos dentro do toast sem margem extra */
.ml-toast__body :deep(p) {
  margin: 0 0 4px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.92);
}

@keyframes ml-toast-in {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
