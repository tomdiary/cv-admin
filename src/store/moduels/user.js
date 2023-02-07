/**
 * @description 主配置文件
 * @author TomDiary
 * @link https://www.7b3.rog or https://github.com/tomdiary
 */
import router from '@/router'
import { ElNotification } from 'element-plus'
import { cvLocalStorage } from '@util/util.storage'

export const state = {
  accessToken: cvLocalStorage.get('access_token') || '',
  refreshToken: cvLocalStorage.get('refresh_token') || '',
  userInfo: cvLocalStorage.get('user_info') || {}
}

export const getters = {}

export const mutations = {
  SET_USER_TOKEN: (state, data) => {
    state.accessToken = data.accessToken
    state.refreshToken = data.refreshToken
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

export const actions = {
  atUserLogin({ commit }, formData) {
    return new Promise((resolve, reject) => {
      $api.userLogin(formData).then(response => {
        const { data } = response
        if (!data.code) {
          ElNotification.success('登录成功')
          commit('SET_USER_TOKEN', {
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken
          })
          commit('SET_USER_INFO', data.data.userInfo)
          cvLocalStorage.set('user_info', data.data.userInfo)
          cvLocalStorage.set('access_token', data.data.accessToken)
          cvLocalStorage.set('refresh_token', data.data.refreshToken)
          resolve(data)
        } else {
          ElNotification.warning(data.msg)
          resolve(data)
        }
      }).catch(error => reject(error))
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
