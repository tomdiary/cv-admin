/**
 * @description 路由主配置文件
 * @author TomDiary <https://github.com/tomdiary>
 * @firstTime 2022-09-13
 * @lastTime 2023-01-30 11:36
 */
import NProgress from 'nprogress'
import { createRouter, createWebHashHistory } from 'vue-router'
import comRouter from '@/router/modules/com'
import mapRouter from '@/router/modules/map'
import topRouter from '@/router/modules/top'
import tableRouter from '@/router/modules/table'
import echartsRouter from '@/router/modules/echarts'
import { getPageTitle } from '@/utils'

/**
 * 以下是具体路由菜单配置项
 *
 * path: '/user',           路由地址
 * name: 'User',            路由唯一名称
 * redirect: '/user/info',  重定向路由地址（例如当路由地址是 user 时，会自动被重定向到 user/info 页面下）
 * component: User,         组件地址
 * meta: {
 *   id: '22-23-12',        菜单唯一标记
 *   title: 'table',        菜单名称
 *   icon: 'table',         菜单图标：需要使用svg
 *   roles: ['admin'],      角色控制
 *   badge: 0,              菜单徽章
 *   keep: 1,               菜单缓存：1-开启，0-禁用
 *   type: 0,               菜单类型：0-目录，1-菜单，2-按钮，3-独立页面，4-弹窗页面
 *   link: 0,               是否外链：1-是，0-否
 *   show: 1,               显示状态（控制菜单是否隐藏）：1-显示，0-隐藏
 *   status: 1,             菜单状态（控制菜单是否可用）：1-启用，0-禁用
 *   affix: 1,              是否固定（用于tags-view，开启后不可关闭）：1-启用，0-禁用
 *   breadcrumb: 1,         面包屑：1-启用，0-禁用
 * }
 */

// 基础路由
const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/redirect',
    component: () => import('@ld'),
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  }
]

// 动态路由
const authorityRoutes = [
  topRouter,
  mapRouter,
  tableRouter,
  echartsRouter,
  comRouter,
  {
    path: '/assistant',
    redirect: '/assistant/default',
    component: () => import('@lay/Assistant/index.vue'),
    meta: { title: '子页面', icon: 'assistant' },
    children: [
      {
        path: 'default',
        name: 'EChartsDefault',
        meta: { title: '默认ECharts' },
        component: () => import('@/views/echarts/default/index.vue')
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
