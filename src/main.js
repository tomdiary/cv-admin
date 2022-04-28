/**
 * @description 主配置文件
 * @author TomDiary
 * @link https://www.7b3.rog or https://github.com/tomdiary
 */
import { createApp } from 'vue'
import setupStore from '@/store'
import router from '@/router'
import App from '@/App.vue'
import { SvgIcon } from '@com'
import api from '@/api'

// style
import '@/styles/index.scss'
import 'element-plus/dist/index.css'

// 全局挂载api
window.$api = api

const app = createApp(App)

app.config.globalProperties.$ELEMENT = {
  size: 'small'
}

async function bootstrap() {
  app.use(router)

  app.component('svg-icon', SvgIcon)

  setupStore(app)

  app.mount('#cv-admin')
}

bootstrap()
