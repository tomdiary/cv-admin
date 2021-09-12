/**
 * @description 路由主配置文件
 * @author TomDiary
 * @link https://www.7b3.rog or https://github.com/tomdiary
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    redirect: 'dashboard',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: { title: '首页' },
        component: () => import('@/views/dashboard/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router