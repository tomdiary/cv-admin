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

// 全局挂载api
window.$api = api

async function bootstrap() {
  const app = createApp(App)

  initRouter(app)

  initComponents(app)

  initStore(app)

  initConfig(app)

  initLanguage(app)

  initDirective(app)

  app.mount('#cv-admin')
}

bootstrap()
