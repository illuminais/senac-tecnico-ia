<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { BookOpen, ClipboardCheck, Calendar, ChevronLeft, ChevronRight, LogIn, LogOut } from 'lucide-vue-next'
import { useStudentAuth } from '@/composables/useStudentAuth'
import { useSidebar } from '@/composables/useSidebar'

const route = useRoute()
const { user: studentUser, logout: studentLogout, isLoggedIn } = useStudentAuth()
const { collapsed, toggle } = useSidebar()

const navItems = [
  { to: '/', label: 'Aulas', icon: BookOpen },
  { to: '/avaliacoes', label: 'Avaliações', icon: ClipboardCheck },
  { to: '/calendario', label: 'Calendário', icon: Calendar },
]

function linkClass(to: string) {
  return route.path === to
    ? 'text-neural-accent sm:bg-neural-800'
    : 'text-gray-400 hover:text-white'
}
</script>

<template>
  <!--
    Mobile: barra fixa no rodapé, itens em linha (tab bar), ícone + label — sem collapse.
    Desktop (sm:+): sidebar fixa à direita, retrátil (w-56 <-> w-16), indicador de login preso ao fim.
  -->
  <aside
    class="fixed z-20 flex bg-neural-900/95 backdrop-blur-sm border-neural-700
           inset-x-0 bottom-0 border-t items-center justify-around px-2 py-2
           sm:inset-x-auto sm:left-auto sm:right-0 sm:top-0 sm:bottom-0
           sm:border-t-0 sm:border-l sm:flex-col sm:items-stretch sm:justify-start
           sm:px-3 sm:py-6 sm:gap-1 sm:transition-[width]"
    :class="collapsed ? 'sm:w-16' : 'sm:w-56'"
  >
    <RouterLink to="/" title="Início" class="hidden sm:flex justify-center mb-4">
      <img src="/assets/senac-logo.png" alt="SENAC" class="w-10 h-auto object-contain" />
    </RouterLink>

    <button
      type="button"
      @click="toggle"
      class="hidden sm:flex items-center rounded-lg p-2 mb-3 text-gray-400 hover:text-white hover:bg-neural-800 transition"
      :class="collapsed ? 'justify-center' : 'self-end'"
      :title="collapsed ? 'Expandir menu' : 'Recolher menu'"
    >
      <ChevronRight v-if="collapsed" :size="18" />
      <ChevronLeft v-else :size="18" />
    </button>

    <RouterLink
      v-for="item in navItems"
      :key="item.to"
      :to="item.to"
      :title="item.label"
      class="flex flex-1 flex-col items-center justify-center gap-0.5 px-2 py-1.5 text-xs font-medium transition rounded-lg
             sm:flex-none sm:flex-row sm:justify-start sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
      :class="[linkClass(item.to), collapsed ? 'sm:justify-center' : '']"
    >
      <component :is="item.icon" :size="18" class="shrink-0" />
      <span :class="collapsed ? 'sm:hidden' : ''">{{ item.label }}</span>
    </RouterLink>

    <div
      class="flex flex-1 flex-col items-center justify-center gap-0.5 px-2 py-1.5
             sm:flex-none sm:flex-row sm:items-center sm:justify-start sm:gap-2 sm:px-3 sm:py-2
             sm:mt-auto sm:pt-4 sm:border-t sm:border-neural-700"
      :class="collapsed ? 'sm:justify-center' : ''"
    >
      <template v-if="isLoggedIn">
        <img
          v-if="studentUser?.picture"
          :src="studentUser.picture"
          :alt="studentUser?.name ?? 'Aluno'"
          :title="studentUser?.name ?? studentUser?.email ?? 'Aluno'"
          class="w-8 h-8 rounded-full shrink-0 object-cover"
        />
        <span
          class="text-xs text-gray-400 truncate max-w-full"
          :class="collapsed ? 'hidden' : 'hidden sm:block'"
        >
          {{ studentUser?.name ?? studentUser?.email ?? 'Aluno' }}
        </span>
        <button
          @click="studentLogout"
          title="Sair"
          class="flex items-center gap-1 text-xs sm:text-sm text-gray-400 hover:text-white transition"
        >
          <LogOut :size="16" class="shrink-0" />
          <span :class="collapsed ? 'sm:hidden' : ''">Sair</span>
        </button>
      </template>
      <RouterLink
        v-else
        to="/entrar"
        title="Entrar"
        class="flex items-center gap-1 text-xs sm:text-sm text-gray-400 hover:text-white transition"
      >
        <LogIn :size="16" class="shrink-0" />
        <span :class="collapsed ? 'sm:hidden' : ''">Entrar</span>
      </RouterLink>
    </div>
  </aside>
</template>
