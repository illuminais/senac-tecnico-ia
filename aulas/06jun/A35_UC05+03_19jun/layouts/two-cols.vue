<script setup lang="ts">
import TwoColsText from "./two-cols-text.vue";
</script>

<template>
  <TwoColsText>
    <slot />
    <template #right>
      <slot name="right" />
    </template>
  </TwoColsText>
</template>
