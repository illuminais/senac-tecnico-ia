<script setup lang="ts">
import { useNav, useSlideContext, configs } from "@slidev/client";
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useOverflowGuard } from "../composables/useOverflowGuard";
import senacLogoUrl from "../public/assets/senac-logo.png?url";

const { currentPage, total } = useNav();
const { $frontmatter } = useSlideContext();

const footerRef = ref<HTMLElement | null>(null);
const { isOverflowing } = useOverflowGuard(footerRef, currentPage);

const author = (configs as any).author ?? "Leonardo Zanini";
const courseTitle = (configs as any).courseTitle ?? (configs as any).title ?? "Técnico em Inteligência Artificial";
const aulaNum = computed(() => ($frontmatter as any)?.aulaNum ?? (configs as any).aulaNum ?? "");
const footerLogo = (configs as any).footerLogo ?? senacLogoUrl;

const themeOptions = [
  { value: "dark", label: "Escuro" },
  { value: "light", label: "Claro" },
];

const currentTheme = ref("dark");
const showThemePicker = ref(false);

function setTheme(theme: string) {
  currentTheme.value = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("neural-theme", theme);
  showThemePicker.value = false;
}

function togglePicker() {
  showThemePicker.value = !showThemePicker.value;
}

function closePicker(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (!target.closest(".theme-selector")) {
    showThemePicker.value = false;
  }
}

onMounted(() => {
  const saved = localStorage.getItem("neural-theme");
  if (saved === "light") {
    currentTheme.value = "light";
    document.documentElement.setAttribute("data-theme", "light");
  }
  document.addEventListener("click", closePicker);
});

onUnmounted(() => {
  document.removeEventListener("click", closePicker);
});
</script>

<template>
  <footer ref="footerRef" class="global-footer">
    <div class="footer-left flex items-center gap-2">
      <img :src="footerLogo" class="footer-logo" alt="Logo" />
      <div>{{ courseTitle }}</div>
    </div>
    <div class="footer-center">{{ aulaNum }}</div>
    <div class="footer-right flex items-center gap-4">
    
      <div>{{ author }}</div>
      <div class="opacity-40">|</div>
      <div>{{ currentPage }} / {{ total }}</div>
        <div class="theme-selector relative">
        <button class="theme-btn" @click="togglePicker" :title="'Tema: ' + (currentTheme === 'light' ? 'Claro' : 'Escuro')">
          <svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </button>
        <div v-if="showThemePicker" class="theme-picker" @click.stop>
          <button
            v-for="opt in themeOptions"
            :key="opt.value"
            class="theme-option"
            :class="{ active: currentTheme === opt.value }"
            @click="setTheme(opt.value)"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>
  </footer>

  <!-- Aviso de overflow — só aparece em dev (npm run dev) -->
  <div v-if="isOverflowing" class="overflow-badge" aria-label="Conteúdo transbordando a altura do slide">
    ⚠️ OVERFLOW — conteúdo ultrapassa a altura do slide
  </div>
</template>

<style scoped>
.global-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 24px;
  background-color: var(--theme-footer-bg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  font-size: 0.72rem;
  color: var(--theme-footer-text);
  z-index: 100;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.15);
  gap: 0.75rem;
  border-top: 1px solid var(--theme-footer-border);
  line-height: 1;
}

.footer-logo {
  height: 1rem;
  width: auto;
  object-fit: contain;
  opacity: 0.75;
}

[data-theme="light"] .footer-logo {
  filter: invert(1);
}

.footer-right {
  flex: 0;
  text-align: right;
  white-space: nowrap;
  font-weight: 600;
  color: var(--theme-footer-text-strong);
}

.footer-center {
  flex: 1;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.theme-selector {
  display: flex;
  align-items: center;
}

.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: transparent;
  border: 1px solid var(--theme-footer-text);
  border-radius: 50%;
  cursor: pointer;
  color: var(--theme-footer-text);
  transition: all 0.2s ease;
  padding: 0;
}

.theme-btn:hover {
  color: var(--theme-footer-text-strong);
  border-color: var(--theme-footer-text-strong);
}

.theme-icon {
  width: 12px;
  height: 12px;
}

.theme-picker {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 4px;
  background: rgba(30, 41, 59, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  padding: 2px;
  backdrop-filter: blur(8px);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  min-width: 90px;
}

.theme-option {
  display: block;
  width: 100%;
  padding: 4px 10px;
  font-size: 0.72rem;
  color: var(--theme-footer-text-strong);
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.theme-option:hover {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.9);
}

.theme-option.active {
  color: #37fa10;
}

/* ── Overflow guard — só visível em dev ─────────────────────────── */
.overflow-badge {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: rgba(239, 68, 68, 0.92);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  text-align: center;
  padding: 3px 8px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  pointer-events: none;
  border-bottom: 2px solid #dc2626;
}
</style>
