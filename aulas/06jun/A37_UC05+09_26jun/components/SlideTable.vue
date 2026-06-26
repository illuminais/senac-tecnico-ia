<script setup lang="ts">
/**
 * SlideTable — Wrapper component for styled, centered tables in slides.
 *
 * Usage: wrap any markdown table block with <SlideTable> </SlideTable>
 * to get full centering on both x and y axes, with a consistent
 * card container that matches the Neural Slides theme.
 *
 * Props:
 *   - compact   — reduce cell padding for dense data
 *   - fullWidth — force table to span 100% of wrapper width
 */
withDefaults(
  defineProps<{
    compact?: boolean;
    fullWidth?: boolean;
  }>(),
  {
    compact: false,
    fullWidth: false,
  }
);
</script>

<template>
  <div class="slide-table-wrapper" :class="{ 'slide-table--full': fullWidth }">
    <div class="slide-table-inner" :class="{ 'slide-table--compact': compact }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Outer wrapper — centers content on both axes inside the slide flow */
.slide-table-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0.25em auto;
}

/* Inner container — card visual + scroll safety */
.slide-table-inner {
  width: auto;
  max-width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  /* subtle border matches card glows in the theme */
  border: 1px solid var(--theme-card-border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  background: var(--theme-card-bg);
  backdrop-filter: blur(4px);
}

/* Full-width variant */
.slide-table--full .slide-table-inner {
  width: 100%;
}

/* Compact variant — strip extra padding */
.slide-table--compact :deep(th),
.slide-table--compact :deep(td) {
  padding: 0.35em 0.75em !important;
  font-size: 0.85rem !important;
}
</style>
