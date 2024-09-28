import { createWebHistory, createRouter } from 'vue-router';

import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import GuessView from '@/views/GuessView.vue';
import AccountView from '@/views/AccountView.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'LoginView', component: LoginView },
    { path: '/dashboard', name: 'DashboardView', component: DashboardView },
    { path: '/guess/:playlistId', name: 'GuessView', component: GuessView, props: true },
    { path: '/account', name: 'AccountView', component: AccountView },
  ],
});
