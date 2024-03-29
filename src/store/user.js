import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore('userStore', {
  persist: {
    persist: true,
    strategies: [
      {
        key: 'user_store',
        storage: localStorage,
        paths: [
          'accessToken',
          'refreshToken',
          'userInfo'
        ]
      }
    ]
  },
  state: () => ({
    accessToken: null,
    refreshToken: null,
    userInfo: null
  }),
  getters: {},
  actions: {
    atUserLogin(formData) {
      return new Promise((resolve, reject) => {
        $api.userLogin(formData).then(response => {
          const { accessToken, refreshToken, userInfo } = response.data
          if (response.code === 200) {
            resolve(response.data)
            ElMessage.success('登录成功')
            this.accessToken = accessToken
            this.refreshToken = refreshToken
            this.userInfo = userInfo
          } else {
            ElMessage.warning(response.msg)
            resolve(response.data)
          }
        }).catch(error => reject(error))
      })
    }
  }
})
