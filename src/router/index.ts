import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
  },
  {
    path: '/writing',
    name: 'writing',
    component: () => import('@/pages/WritingPage.vue'),
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('@/pages/ResumePage.vue'),
  },
  {
    // Living style guide for the design system (not linked in the nav)
    path: '/system',
    name: 'system',
    component: () => import('@/pages/SystemPage.vue'),
  },
  {
    // Catch-all — redirect unknown paths to home
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
