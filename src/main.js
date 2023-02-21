/**
 * @description 主配置文件
 * @author TomDiary
 * @link https://github.com/tomdiary
 */
import { createApp } from 'vue'
import { initStore } from '@/store'
import { initComponents } from '@/components/init'
import { initDirective } from '@/directive'
import { initConfig } from '@/config'
import { initLanguage } from '@/language'
import { initRouter } from '@/router'
import App from '@/App.vue'
import api from '@/api'
import '@/styles/index.scss'

async function bootstrap() {
  const app = createApp(App)
  // 全局挂载api
  window.$api = api
  initRouter(app) // 初始化路由
  initComponents(app) // 初始化组件
  initStore(app) // 初始化状态管理
  initConfig(app) // 初始化配置项
  initLanguage(app) // 初始化国际化
  initDirective(app) // 初始化自定义指令
  app.mount('#cv-admin')
}

await bootstrap()
