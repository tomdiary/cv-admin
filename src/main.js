/**
 * @description 主配置文件
 * @author TomDiary
 * @link https://www.7b3.rog or https://github.com/tomdiary
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from './router'
import store from '@/store'
import App from './App.vue'

// style
import './styles/index.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#cv-app')
