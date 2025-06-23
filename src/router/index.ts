import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/recipe/management',
      name: 'management',
      component: () => import('../views/recipe/ManageView.vue'),
    },
    {
      path: '/recipe/query',
      name: 'query',
      component: () => import('../views/recipe/QueryView.vue'),
    },
    {
      path: '/recipe/simulation',
      name: 'simulation',
      component: () => import('../views/recipe/SimulationView.vue'),
    },
  ],
})

export default router
