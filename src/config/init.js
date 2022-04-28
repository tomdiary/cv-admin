import { useLayoutStore } from '@/store/layout'
import config from '@/config'

export default app => {
  const layout = useLayoutStore()
  layout.asInitThemeMode(config.themeMode)
}
