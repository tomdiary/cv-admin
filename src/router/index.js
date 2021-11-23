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
    meta: { title: '登录' },
    component: () => import('@views/login/index.vue')
  }
]

const authorityRoutes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: () => import('@lay/index.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true },
        component: () => import('@views/dashboard/index.vue')
      }
    ]
  },
  {
    path: '/table',
    redirect: '/table/default',
    component: () => import('@lay/index.vue'),
    meta: { title: '表格', icon: 'table' },
    children: [
      {
        path: 'default',
        name: 'TableDefault',
        meta: { title: '默认表格' },
        component: () => import('@views/table/default/index.vue')
      },
      {
        path: 'merge',
        name: 'TableMerge',
        meta: { title: '表格合并行/列' },
        component: () => import('@views/table/merge/index.vue')
      }
    ]
  },
  {
    path: '/map',
    redirect: '/map/default',
    component: () => import('@lay/index.vue'),
    meta: { title: '高德地图', icon: 'map' },
    children: [
      {
        path: 'default',
        name: 'MapDefault',
        meta: { title: '默认表格' },
        component: () => import('@views/map/default/index.vue')
      }
    ]
  },
  {
    path: '/cvc',
    redirect: '/cvc/list',
    component: () => import('@lay/index.vue'),
    meta: { title: '组件库', icon: 'cvc' },
    children: [
      {
        path: 'list',
        name: 'CvcList',
        meta: { title: '组件列表' },
        component: () => import('@views/cvc/list/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...authorityRoutes]
})

export default router
