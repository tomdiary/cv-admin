/**
 * @description Vuex主配置文件
 * @author TomDiary
 * @link https://github.com/tomdiary
 */
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPluginPersist)

export function initStore(app) {
  app.use(store)
}
