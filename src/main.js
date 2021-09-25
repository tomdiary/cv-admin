/**
 * @description 主配置文件
 * @author TomDiary
 * @link https://www.7b3.rog or https://github.com/tomdiary
 */
import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import App from '@/App.vue'
import { SvgIcon } from '@com'
import api from '@/api'
import { setupProdMockServer } from '../mock'

// style
import '@/styles/index.scss'
import 'element-plus/dist/index.css'

setupProdMockServer()

// 全局挂载api
window.$api = api

const app = createApp(App)

app.config.globalProperties.$ELEMENT = {
  size: 'small'
}

app.use(router)
  .use(store)
  .component('svg-icon', SvgIcon)
app.mount('#cv-admin')
