<script setup lang="ts">
// Puramente decorativo: efeito visual de rede neural nas bordas
// esquerda/direita da tela, atrás do conteúdo das views.
</script>

<template>
  <div
    class="fixed inset-0 -z-10 bg-left bg-repeat-y pointer-events-none w-[23%]"
    style="
      background-image: url('/neural-edge-tile.png');
      -webkit-mask-image: linear-gradient(to right, black 0%, black 20%, transparent 100%);
      mask-image: linear-gradient(to right, black 0%, black 20%, transparent 100%);
    "
  />
  <div
    class="absolute inset-0 -z-10 bg-right bg-repeat-y pointer-events-none w-[23%]"
    style="
      background-image: url('/neural-edge-tile.png');
      -webkit-mask-image: linear-gradient(to right, black 0%, black 10%, transparent 100%);
      mask-image: linear-gradient(to right, black 0%, black 10%, transparent 100%);
    "
  />
</template>
