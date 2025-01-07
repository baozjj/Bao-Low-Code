import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MainPage/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/MainPage/index.vue'),
    },
  ],
})

export default router
