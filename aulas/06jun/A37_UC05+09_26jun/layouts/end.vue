<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { configs } from "@slidev/client";
import SlideBackground from "../components/SlideBackground.vue";
import SlideFooter from "../components/SlideFooter.vue";

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const props = withDefaults(
  defineProps<{
    bgPreset?: "default" | "animate" | "palette";
    /** Envolve o conteúdo em um card glassmorphism */
    card?: boolean;
    /** URL da foto de avatar — fallback: configs.avatar do frontmatter global */
    avatar?: string;
    /** Handle do GitHub — fallback: configs.github do frontmatter global */
    github?: string;
    /** URL completa do perfil — gerada automaticamente a partir de `github` se omitida */
    profileUrl?: string;
  }>(),
  {
    bgPreset: "default",
    card: true,
    avatar: "",
    github: "",
    profileUrl: "",
  },
);

// Lê do frontmatter global como fallback (define uma vez no cabeçalho do slides.md)
const resolvedGithub = computed(
  () => props.github || (configs as any).github || "",
);
const resolvedAvatar = computed(
  () =>
    props.avatar ||
    (configs as any).avatar ||
    (resolvedGithub.value
      ? `https://github.com/${resolvedGithub.value}.png?size=256`
      : ""),
);

const resolvedProfileUrl = computed(
  () =>
    props.profileUrl ||
    (resolvedGithub.value ? `https://github.com/${resolvedGithub.value}` : ""),
);

const bgOpacity = computed(() =>
  props.bgPreset === "palette" || props.bgPreset === "animate" ? 0.3 : 0.1,
);
</script>

<template>
  <div
    class="slidev-layout end relative flex flex-col items-center justify-center h-full"
  >
    <SlideBackground
      v-bind="attrs"
      :preset="props.bgPreset"
      :x="250"
      :y="100"
      :zoom="1"
      nodeColor="#ffffff"
      :backgroundOpacity="bgOpacity"
    />
    <div class="content-wrapper">
      <div :class="props.card ? 'slide-card' : undefined">
        <slot />
      </div>

      <!-- Card de perfil: exibido quando avatar ou github estiverem disponíveis -->
      <div v-if="resolvedAvatar || resolvedGithub" class="profile-card">
        <img
          v-if="resolvedAvatar"
          :src="resolvedAvatar"
          alt="Foto de perfil"
          class="profile-avatar"
        />
        <div v-if="resolvedGithub" class="profile-info">
          <p class="profile-label">GitHub:</p>
          <a
            :href="resolvedProfileUrl"
            target="_blank"
            rel="noreferrer"
            class="profile-link"
          >
            github.com/{{ resolvedGithub }}
          </a>
        </div>
      </div>
    </div>
    <SlideFooter />
  </div>
</template>

<style scoped>
.end {
  position: relative;
  height: 100%;
}

.content-wrapper {
  position: relative;
  z-index: 10;
}

/* Título principal */
.content-wrapper :deep(h1) {
  margin-bottom: 0.5rem;
}

/* Subtítulo */
.content-wrapper :deep(h2) {
  font-size: 1.875rem;
  font-weight: 500;
  color: var(--slidev-theme-text-muted);
  margin-top: 1rem;
  margin-bottom: 2rem;
}

/* Parágrafos */
.content-wrapper :deep(p) {
  font-size: 1.125rem;
  color: var(--theme-text);
  opacity: 0.85;
}

/* Card de perfil (avatar + github) */
.profile-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.profile-avatar {
  width: 7rem;
  height: 7rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  object-fit: cover;
}

.profile-info {
  text-align: left;
}

.profile-label {
  margin: 0 0 4px;
  font-size: 1rem;
  color: rgba(226, 232, 240, 0.7);
}

.profile-link {
  font-size: 1.875rem;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 4px;
  color: var(--theme-text-strong);
  transition: color 0.2s ease;
}

.profile-link:hover {
  color: #37fa10;
}
</style>
