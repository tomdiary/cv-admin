import { defineStore } from 'pinia'
import config from '@/config'

export const useLayoutStore = defineStore('layoutStore', {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'layout_store',
        storage: localStorage,
        paths: [
          'sidebarStatus',
          'themeMode',
          'themeSize',
          'themeLanguage'
        ]
      }
    ]
  },
  state: () => ({
    sidebarStatus: null,
    themeMode: null,
    themeSize: null,
    themeLanguage: null
  }),
  getters: {
    gtSidebarStatus: state => state.sidebarStatus !== 'open'
  },
  actions: {
    // 初始化主题配置
    asInitThemeConfig() {
      if (!this.themeMode) {
        this.themeMode = config.themeMode
        document.documentElement.dataset.mode = config.themeMode
      } else {
        document.documentElement.dataset.mode = this.themeMode
      }
      if (!this.themeSize) this.themeSize = config.themeSize
      if (!this.themeLanguage) this.themeLanguage = config.themeLanguage
      if (!this.sidebarStatus) this.sidebarStatus = config.sidebarStatus
    },
    asSidebarStatus() {
      this.sidebarStatus = this.sidebarStatus === 'close' ? 'open' : 'close'
    },
    asThemeMode(mode) {
      this.themeMode = mode
      document.documentElement.dataset.mode = mode
    }
  }
})
