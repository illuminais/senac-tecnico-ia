<script setup lang="ts">
import memeUrl from "../public/memes/shocked.jpg";
</script>

<template>
  <span class="meme-inline">
    <img :src="memeUrl" class="meme-img" alt="meme" />
  </span>
</template>

<style scoped>
.meme-inline {
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.3em;
}

.meme-img {
  width: auto;
  height: 1.2em;
  border-radius: 4px;
  animation: meme-spin-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes meme-spin-in {
  0% {
    transform: rotate(-360deg) scale(0.3);
  }
  50% {
    transform: rotate(20deg) scale(1.1);
  }
  70% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}

@media (min-width: 640px) {
  .meme-img {
    height: 1.5em;
  }
}

@media (min-width: 1024px) {
  .meme-img {
    height: 2em;
  }
}
</style>
