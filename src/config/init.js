import { useLayoutStore } from '@/store/layout'
import moment from 'moment'

export default app => {
  moment.locale('zh-cn')

  const layout = useLayoutStore()
  layout.asInitThemeConfig()
}
