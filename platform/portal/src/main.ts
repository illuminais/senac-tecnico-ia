import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import AulaView from './views/AulaView.vue'
import AdminView from './views/AdminView.vue'
import AvaliacoesView from './views/AvaliacoesView.vue'
import AvaliacaoView from './views/AvaliacaoView.vue'
import CalendarioView from './views/CalendarioView.vue'
import AdminCalendarioView from './views/AdminCalendarioView.vue'
import ForgotPasswordView from './views/ForgotPasswordView.vue'
import ResetPasswordView from './views/ResetPasswordView.vue'
import GoogleCallbackView from './views/GoogleCallbackView.vue'
import EntrarView from './views/EntrarView.vue'
import StudentGoogleCallbackView from './views/StudentGoogleCallbackView.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/aula/:slug', component: AulaView },
    { path: '/avaliacoes', component: AvaliacoesView },
    { path: '/avaliacao/:id', component: AvaliacaoView },
    { path: '/calendario', component: CalendarioView },
    { path: '/admin', component: AdminView },
    { path: '/admin/calendario', component: AdminCalendarioView },
    { path: '/admin/esqueci-senha', component: ForgotPasswordView },
    { path: '/admin/reset-senha', component: ResetPasswordView },
    { path: '/admin/google-callback', component: GoogleCallbackView },
    { path: '/entrar', component: EntrarView },
    { path: '/entrar/google-callback', component: StudentGoogleCallbackView },
  ],
})

createApp(App).use(router).mount('#app')
