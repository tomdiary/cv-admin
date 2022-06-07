import moment from 'moment'
import { initAMapApiLoader } from '@vuemap/vue-amap'
import useLayoutStore from '@/store/layout'

export const initConfig = app => {
  const layout = useLayoutStore()

  initAMapApiLoader({
    key: import.meta.env.VITE_AMAP_KEY,
    version: '2.0',
    securityJsCode: import.meta.env.VITE_AMAP_KEY_SECRET // 仅限开发环境使用
    // serviceHost: '您的代理服务器域名或地址/_AMapService' // 推荐生产环境使用，具体配置请参考 https://lbs.amap.com/api/jsapi-v2/guide/abc/load
  })
  moment.locale('zh-cn')
  layout.asInitThemeConfig(app)
}
