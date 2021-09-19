/**
 * @description 主配置文件
 * @author TomDiary
 * @link https://www.7b3.rog or https://github.com/tomdiary
 */
import { createApp } from 'vue'
import {ElMenu, ElMenuItem, ElMenuItemGroup, ElSubMenu} from 'element-plus'
import router from './router'
import store from '@/store'
import { SvgIcon } from '@/components'
import App from './App.vue'

// style
import './styles/index.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
  .use(store)
  .use(ElMenu)
  .use(ElSubMenu)
  .use(ElMenuItem)
  .use(ElMenuItemGroup)
  .component('svg-icon', SvgIcon)
app.mount('#cv-admin')
