import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import AulaView from './views/AulaView.vue'
import AdminView from './views/AdminView.vue'
import AvaliacoesView from './views/AvaliacoesView.vue'
import AvaliacaoView from './views/AvaliacaoView.vue'
import AuthCallbackView from './views/AuthCallbackView.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/aula/:slug', component: AulaView },
    { path: '/avaliacoes', component: AvaliacoesView },
    { path: '/avaliacao/:id', component: AvaliacaoView },
    { path: '/admin', component: AdminView },
    { path: '/auth/callback', component: AuthCallbackView },
  ],
})

createApp(App).use(router).mount('#app')
