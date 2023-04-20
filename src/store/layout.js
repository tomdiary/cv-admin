import { defineStore } from 'pinia'
import config from '@/config'
import * as styleSource from '@/config/styleSource'
import * as themeStyle from '@/utils/themeStyle'
import moment from 'moment'

const useLayoutStore = defineStore('layoutStore', {
  persist: {
    key: 'LAYOUT_STORE',
    storage: localStorage,
    // 部分数据持久化
    paths: [
      'sidebarStatus',
      'themeMode',
      'themeSize',
      'themeFont',
      'fontFamily',
      'themeColor',
      'language',
      'theme',
      'breadcrumbStatus'
    ]
  },
  state: () => ({
    sidebarStatus: null,
    themeMode: null,
    themeSize: null,
    fontFamily: null,
    language: null,
    themeColor: null,
    breadcrumbStatus: null,
    theme: null
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
      this.asThemeColorChange(this.theme)
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
    // 主题变更
    asThemeColorChange(theme) {
      this.themeColor = theme || config.themeColor
      const {
        Cv_Color_Primary,
        Cv_Color_Success,
        Cv_Color_Warning,
        Cv_Color_Danger,
        Cv_Color_Info,
        Cv_Color_Error,
        Cv_Sidebar_Bg_Color,
        Cv_Header_Bg_Color,
        Cv_Tags_View_Bg_Color
      } = { ...styleSource }[this.themeColor]

      document.body.style.setProperty('--el-menu-hover-bg-color', Cv_Color_Primary)
      document.body.style.setProperty('--el-menu-active-color', '#FFFFFF')
      document.body.style.setProperty('--el-menu-bg-color', '#272C34')
      document.body.style.setProperty('--el-menu-text-color', '#FFFFFF')
      document.body.style.setProperty('--el-menu-hover-text-color', '#FFFFFF')
      document.body.style.setProperty('--el-border-radius-base', '2px')
      // 菜单侧边栏
      document.body.style.setProperty('--cv-sidebar-bg-color', Cv_Sidebar_Bg_Color)
      // 顶部栏
      document.body.style.setProperty('--cv-header-bg-color', Cv_Header_Bg_Color)
      // tags view
      document.body.style.setProperty('--cv-tags-view-bg-color', Cv_Tags_View_Bg_Color)

      themeStyle.tsWeightColor('primary', Cv_Color_Primary)
      themeStyle.tsWeightColor('success', Cv_Color_Success)
      themeStyle.tsWeightColor('warning', Cv_Color_Warning)
      themeStyle.tsWeightColor('danger', Cv_Color_Danger)
      themeStyle.tsWeightColor('info', Cv_Color_Info)
      themeStyle.tsWeightColor('error', Cv_Color_Error)
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
