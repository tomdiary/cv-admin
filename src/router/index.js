/**
 * @description 路由主配置文件
 * @author TomDiary
 * @link https://github.com/tomdiary
 */
import NProgress from 'nprogress'
import { createRouter, createWebHashHistory } from 'vue-router'
import { getPageTitle } from '@/utils'

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import('@views/login/index.vue')
  },
  {
    path: '/redirect',
    component: () => import('@lay/index.vue'),
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@views/redirect/index.vue')
      }
    ]
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
        meta: { title: '默认地图', layoutPadding: false },
        component: () => import('@views/map/default/index.vue')
      },
      {
        path: 'electric-fence',
        name: 'MapElectricFence',
        meta: { title: '电子围栏' },
        component: () => import('@views/map/electricFence/index.vue')
      },
      {
        path: 'area-preview',
        name: 'MapAreaPreview',
        meta: { title: '行政区域预览', layoutPadding: false },
        component: () => import('@views/map/areaPreview/index.vue')
      }
    ]
  },
  {
    path: '/echarts',
    redirect: '/echarts/default',
    component: () => import('@lay/index.vue'),
    meta: { title: 'ECharts', icon: 'echarts' },
    children: [
      {
        path: 'default',
        name: 'EChartsDefault',
        meta: { title: '默认ECharts' },
        component: () => import('@/views/echarts/default/index.vue')
      }
    ]
  },
  {
    path: '/com',
    redirect: '/com/list',
    component: () => import('@lay/index.vue'),
    meta: { title: '组件库', icon: 'com' },
    children: [
      {
        path: 'list',
        name: 'ComList',
        meta: { title: '组件列表', layoutPadding: false },
        component: () => import('@views/com/list/index.vue')
      },
      {
        path: 'dialog',
        name: 'ComDialog',
        meta: { title: '对话框' },
        component: () => import('@views/com/dialog/index.vue')
      },
      {
        path: 'list',
        name: 'ComList',
        meta: { title: '组件列表', layoutPadding: false },
        component: () => import('@views/com/list/index.vue')
      },
      {
        path: 'icons',
        name: 'ComIcons',
        meta: { title: '图标' },
        component: () => import('@views/com/icons/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...authorityRoutes]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  next()
})

router.afterEach((to) => {
  NProgress.done()
  document.title = getPageTitle(to.meta.title)
})

export const initRouter = app => {
  app.use(router)
}
