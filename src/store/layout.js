import { defineStore } from 'pinia'
import config from '@/config'
import moment from 'moment'

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
          'themeFont',
          'themeLanguage'
        ]
      }
    ]
  },
  state: () => ({
    sidebarStatus: null,
    themeMode: null,
    themeSize: null,
    fontFamily: null,
    themeLanguage: null
  }),
  getters: {
    gtSidebarStatus: state => state.sidebarStatus !== 'open'
  },
  actions: {
    // 初始化主题配置
    asInitThemeConfig() {
      if ((!this.themeMode && config.themeMode === 'auto') || this.themeMode === 'auto') {
        this.asThemeModeAuto()
      } else if (!this.themeMode && config.themeMode !== 'auto') {
        this.themeMode = config.themeMode
        document.documentElement.dataset.mode = config.themeMode
      } else {
        document.documentElement.dataset.mode = this.themeMode
      }
      if (!this.fontFamily) this.asFontFamilyChange(config.fontFamily)
      if (!this.themeSize) this.themeSize = config.themeSize
      if (!this.themeLanguage) this.themeLanguage = config.themeLanguage
      if (!this.sidebarStatus) this.sidebarStatus = config.sidebarStatus
    },
    asSidebarStatus() {
      this.sidebarStatus = this.sidebarStatus === 'close' ? 'open' : 'close'
    },
    asThemeMode(mode) {
      if (mode === 'auto') return this.asThemeModeAuto()
      document.documentElement.dataset.mode = mode
      this.themeMode = mode
    },
    asFontFamilyChange(fontFamily) {
      this.fontFamily = fontFamily
      document.body.setAttribute('style', `font-family: '${fontFamily}' !important`)
    },
    asThemeModeAuto() {
      const currentTime = moment().valueOf()
      const lightTime = moment(config.lightTime, 'HH:mm:ss').valueOf()
      const darkTime = moment(config.darkTime, 'HH:mm:ss').valueOf()
      this.themeMode = 'auto'
      if (currentTime < lightTime || currentTime > darkTime) document.documentElement.dataset.mode = 'dark'
      else document.documentElement.dataset.mode = 'light'
    }
  }
})
