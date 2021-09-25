/**
 * @description Vuex主配置文件
 * @author TomDiary
 * @link https://www.7b3.rog or https://github.com/tomdiary
 */
import { createStore } from 'vuex'

import app from './moduels/app'
import user from './moduels/user'

export default createStore({
  modules: {
    app,
    user
  }
})
