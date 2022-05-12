import useLayoutStore from '@/store/layout'
import moment from 'moment'

export default app => {
  moment.locale('zh-cn')

  const layout = useLayoutStore()
  layout.asInitThemeConfig(app)

  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$ELEMENT = {
    size: layout.themeSize
  }
}
