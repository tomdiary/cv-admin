/**
 * @description 主配置文件
 * @author TomDiary
 * @link https://www.7b3.rog or https://github.com/tomdiary
 */
import { createApp } from 'vue'
import {
  ElScrollbar,
  ElButton,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElEmpty
} from 'element-plus'
import router from '@/router'
import store from '@/store'
import App from './App.vue'
import { SvgIcon } from '@/components'

// style
import '@/styles/index.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)

// element-ui 配置
app.config.globalProperties.$ELEMENT = { size: 'small' }

app.use(router)
  .use(store)
  .use(ElScrollbar)
  .use(ElButton)
  .use(ElTable)
  .use(ElTableColumn)
  .use(ElPagination)
  .use(ElMenu)
  .use(ElSubMenu)
  .use(ElMenuItem)
  .use(ElMenuItemGroup)
  .use(ElEmpty)
  .component('svg-icon', SvgIcon)
app.mount('#cv-admin')
