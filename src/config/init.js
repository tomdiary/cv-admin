import { useLayoutStore } from '@/store/layout'

export default app => {
  const layout = useLayoutStore()
  layout.asInitThemeConfig()
}
