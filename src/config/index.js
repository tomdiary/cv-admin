import moment from 'moment'
import useLayoutStore from '@/store/layout'
import { initAMapApiLoader } from '@vuemap/vue-amap'

export default {
  title: 'CV-ADMIN', // 标题
  interval: 12, // 间隔
  fontFamily: 'siyuan-black-body-conventional', // 更多字体请参考 src/config/dataSource
  sidebarStatus: 'close', // 侧边栏：open-展开、close-收回
  themeMode: 'auto', // 主题模式：light-白天、dark-黑夜、auto-自动
  themeSize: 'default', // 主题大小：large-大、default-默认、small-小
  themeColor: '#006E7F', // 主题颜色
  theme: 'BASIC_STYLE_GREEN_WHITE', // 主题
  breadcrumbStatus: false, // 面包屑状态
  headerBgColor: '#272C34', // 头部背景色
  headerFontColor: '#FFFFFF', // 头部字体颜色
  menuBgColor: '#272C34', // 菜单背景颜色
  menuFontColor: '#FFFFFF', // 菜单字体颜色
  language: 'zh-cn', // 国际化
  i18nLocale: 'zh_CN', // 国际化
  lightTime: '08:00:00',
  darkTime: '19:00:00'
}

export const initConfig = app => {
  const layout = useLayoutStore()

  initAMapApiLoader({
    key: import.meta.env.VITE_AMAP_KEY,
    version: import.meta.env.VITE_AMAP_VERSION,
    securityJsCode: import.meta.env.VITE_AMAP_KEY_SECRET // 仅限开发环境使用
    // serviceHost: '您的代理服务器域名或地址/_AMapService' // 推荐生产环境使用，具体配置请参考 https://lbs.amap.com/api/jsapi-v2/guide/abc/load
  })
  moment.locale('zh-cn')
  layout.asInitThemeConfig(app)

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const callback = (e) => {
    console.log(e)
    const prefersDarkMode = e.matches
    if (prefersDarkMode) {
      console.log(prefersDarkMode)
    }
  }

  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', callback)
  } else if (typeof media.addListener === 'function') {
    media.addListener(callback)
  }
}

