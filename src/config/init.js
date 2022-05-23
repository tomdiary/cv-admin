import moment from 'moment'
import useLayoutStore from '@/store/layout'

export const initConfig = app => {
  moment.locale('zh-cn')

  const layout = useLayoutStore()
  layout.asInitThemeConfig(app)
}
