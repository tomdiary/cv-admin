/**
 * @description Vuex主配置文件
 * @author TomDiary
 * @link https://github.com/tomdiary
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersistedstate)

export function initStore(app) {
  app.use(store)
}
