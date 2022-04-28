/**
 * @description Vuex主配置文件
 * @author TomDiary
 * @link https://www.7b3.rog or https://github.com/tomdiary
 */
import { createPinia } from 'pinia'

const store = createPinia()

export default function initStore(app) {
  app.use(store)
}
