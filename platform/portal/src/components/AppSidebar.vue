<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { BookOpen, ClipboardCheck, Calendar, MessageSquare, ChevronLeft, ChevronRight, LogIn, LogOut } from 'lucide-vue-next'
import { useStudentAuth } from '@/composables/useStudentAuth'
import { useAdminAuth, WORKER } from '@/composables/useAdminAuth'
import { useSidebar } from '@/composables/useSidebar'

const route = useRoute()
const { token: studentToken, user: studentUser, logout: studentLogout, isLoggedIn } = useStudentAuth()
const { token: adminToken } = useAdminAuth()
const { collapsed, toggle } = useSidebar()

const navItems = [
  { to: '/', label: 'Aulas', icon: BookOpen },
  { to: '/avaliacoes', label: 'Avaliações', icon: ClipboardCheck },
  { to: '/calendario', label: 'Calendário', icon: Calendar },
]

// Badge de "avaliação nova" (sprint 04) — só pergunta ao servidor se logado,
// resposta leve (não carrega a lista inteira só pra acender o pontinho).
// Some quando o aluno abre /avaliacoes (AvaliacoesView chama marcar-vistas).
const hasNovidade = ref(false)

onMounted(async () => {
  if (!isLoggedIn.value) return
  try {
    const res = await fetch(`${WORKER}/api/avaliacoes/novidade`, {
      headers: { Authorization: `Bearer ${studentToken.value}` },
    })
    if (res.ok) hasNovidade.value = (await res.json()).hasNovidade
  } catch {
    // silencioso — badge só não acende, não trava a sidebar
  }
})

// Só aparecem com sessão de admin ativa (`useAdminAuth` — cookie separado do
// aluno). Verde (não neural-accent) de propósito, pra marcar visualmente que
// é uma rota de professor, mesma cor do destaque "Aula de Hoje".
const adminNavItems = [
  { to: '/admin/avaliacoes', label: 'Avaliações (Admin)', icon: ClipboardCheck },
  { to: '/admin/calendario', label: 'Calendário (Admin)', icon: Calendar },
  { to: '/admin/mensagem', label: 'Mensagem', icon: MessageSquare },
]

function linkClass(to: string) {
  return route.path === to
    ? 'text-neural-accent sm:bg-neural-800'
    : 'text-gray-400 hover:text-white'
}

function adminLinkClass(to: string) {
  return route.path === to
    ? 'text-green-400 sm:bg-neural-800'
    : 'text-green-400/70 hover:text-green-400'
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
      class="relative flex flex-1 flex-col items-center justify-center gap-0.5 px-2 py-1.5 text-xs font-medium transition rounded-lg
             sm:flex-none sm:flex-row sm:justify-start sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
      :class="[linkClass(item.to), collapsed ? 'sm:justify-center' : '']"
    >
      <span class="relative shrink-0">
        <component :is="item.icon" :size="18" />
        <span
          v-if="item.to === '/avaliacoes' && hasNovidade"
          class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400"
          title="Avaliação nova"
        />
      </span>
      <span :class="collapsed ? 'sm:hidden' : ''">{{ item.label }}</span>
    </RouterLink>

    <template v-if="adminToken">
      <div class="hidden sm:block h-px bg-neural-700 my-2" />
      <RouterLink
        v-for="item in adminNavItems"
        :key="item.to"
        :to="item.to"
        :title="item.label"
        class="flex flex-1 flex-col items-center justify-center gap-0.5 px-2 py-1.5 text-xs font-medium transition rounded-lg
               sm:flex-none sm:flex-row sm:justify-start sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
        :class="[adminLinkClass(item.to), collapsed ? 'sm:justify-center' : '']"
      >
        <component :is="item.icon" :size="18" class="shrink-0" />
        <span :class="collapsed ? 'sm:hidden' : ''">{{ item.label }}</span>
      </RouterLink>
    </template>

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
