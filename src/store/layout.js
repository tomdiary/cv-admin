import { defineStore } from 'pinia'
import config from '@/config'
import moment from 'moment'
import { calculateWeightColor } from '@/utils'

const useLayoutStore = defineStore('layoutStore', {
  persist: {
    persist: true,
    strategies: [
      {
        key: 'layout_store',
        storage: localStorage,
        paths: [
          'sidebarStatus',
          'themeMode',
          'themeSize',
          'themeFont',
          'fontFamily',
          'themeColor',
          'language',
          'breadcrumbStatus'
        ]
      }
    ]
  },
  state: () => ({
    sidebarStatus: null,
    themeMode: null,
    themeSize: null,
    fontFamily: null,
    language: null,
    themeColor: null,
    breadcrumbStatus: null
  }),
  getters: {
    gtSidebarStatus: state => state.sidebarStatus !== 'open',
    gtThemeMode: state => state.themeMode,
    gtThemeSize: state => state.themeSize
  },
  actions: {
    // 初始化主题配置
    asInitThemeConfig(app) {
      if ((!this.themeMode && config.themeMode === 'auto') || this.themeMode === 'auto') {
        this.asThemeModeAuto()
      } else if (!this.themeMode && config.themeMode !== 'auto') {
        this.themeMode = config.themeMode
        document.documentElement.classList.add(config.themeMode)
      } else {
        document.documentElement.classList.add(this.themeMode)
      }
      this.asFontFamilyChange(this.fontFamily)
      this.asThemeColorChange(this.themeColor)
      this.asThemeSizeChange(this.themeSize)
      this.asBreadcrumbChange(this.breadcrumbStatus)
      this.asLanguageChange(this.language)
      if (!this.sidebarStatus) this.sidebarStatus = config.sidebarStatus
    },
    asSidebarStatus() {
      this.sidebarStatus = this.sidebarStatus === 'close' ? 'open' : 'close'
    },
    asThemeSizeChange(size) {
      this.themeSize = size || config.themeSize
    },
    asLanguageChange(language) {
      return new Promise(resolve => {
        this.language = language || config.language
        document.documentElement.lang = this.language
        resolve(this.language)
      })
    },
    asThemeModeChange(mode) {
      if (mode === 'auto') return this.asThemeModeAuto()
      document.documentElement.classList.remove(mode === 'dark' ? 'light' : 'dark')
      document.documentElement.classList.add(mode)
      this.themeMode = mode
    },
    asThemeColorChange(color) {
      this.themeColor = color || config.themeColor
      document.body.style.setProperty('--el-color-primary', this.themeColor)
      document.body.style.setProperty('--el-menu-hover-bg-color', this.themeColor)
      document.body.style.setProperty('--el-menu-active-color', '#FFFFFF')
      document.body.style.setProperty('--el-menu-bg-color', '#272C34')
      document.body.style.setProperty('--el-menu-text-color', '#FFFFFF')
      document.body.style.setProperty('--el-menu-hover-text-color', '#FFFFFF')
      document.body.style.setProperty('--el-border-radius-base', '2px')
      document.body.style.setProperty(
        '--el-color-primary-light-3',
        calculateWeightColor(this.themeColor, '#FFFFFF', 0.3)
      )
      document.body.style.setProperty(
        '--el-color-primary-light-5',
        calculateWeightColor(this.themeColor, '#FFFFFF', 0.5)
      )
      document.body.style.setProperty(
        '--el-color-primary-light-7',
        calculateWeightColor(this.themeColor, '#FFFFFF', 0.7)
      )
      document.body.style.setProperty(
        '--el-color-primary-light-8',
        calculateWeightColor(this.themeColor, '#FFFFFF', 0.8)
      )
      document.body.style.setProperty(
        '--el-color-primary-light-9',
        calculateWeightColor(this.themeColor, '#FFFFFF', 0.9)
      )
      document.body.style.setProperty(
        '--el-color-primary-dark-2',
        calculateWeightColor(this.themeColor, '#000000', 0.2)
      )
    },
    asFontFamilyChange(fontFamily) {
      this.fontFamily = fontFamily || config.fontFamily
      // document.body.style.fontFamily = this.fontFamily
    },
    asBreadcrumbChange(status) {
      this.breadcrumbStatus = typeof status === 'boolean' ? status : config.breadcrumbStatus
    },
    asThemeModeAuto() {
      this.themeMode = 'auto'
      const currentTime = moment().valueOf()
      const lightTime = moment(config.lightTime, 'HH:mm:ss').valueOf()
      const darkTime = moment(config.darkTime, 'HH:mm:ss').valueOf()
      if (document.documentElement.classList.contains('dark')) document.documentElement.classList.remove('dark')
      if (document.documentElement.classList.contains('light')) document.documentElement.classList.remove('light')
      document.documentElement.classList.add(currentTime < lightTime || currentTime > darkTime ? 'dark' : 'light')
    }
  }
})

export default useLayoutStore
