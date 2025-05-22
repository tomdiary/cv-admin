import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

const useUserStore = defineStore('userStore', {
  persist: {
    key: 'USER_STORE',
    storage: localStorage,
    paths: [
      'accessToken',
      'refreshToken',
      'userInfo'
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
          ElMessage.success('登录成功')
          this.accessToken = accessToken
          this.refreshToken = refreshToken
          this.userInfo = userInfo
          resolve(response)
        }).catch(error => reject(error))
      })
    },
    atUserLogout() {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('USER_STORE')
        resolve()
      })
    }
  }
})

export default useUserStore
