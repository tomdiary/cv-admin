import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

export const useUserStore = defineStore('userStore', {
  persist: {
    enabled: true,
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
          const { data } = response
          if (!data.code) {
            ElNotification.success('登录成功')
            this.accessToken = data.data.accessToken
            this.refreshToken = data.data.refreshToken
            this.userInfo = data.data.userInfo
            useRouter.push({ path: '/' })
            resolve(data)
          } else {
            ElNotification.warning(data.msg)
            resolve(data)
          }
        }).catch(error => reject(error))
      })
    }
  }
})
