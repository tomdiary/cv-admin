import { createI18n } from 'vue-i18n'
import config from '@/config'
import useLayoutStore from '@/store/layout'
import { languageList } from '@/config/dataSource'
import zhCnLocale from 'element-plus/lib/locale/lang/zh-cn'
import zhTwLocale from 'element-plus/lib/locale/lang/zh-tw'
import enLocale from 'element-plus/lib/locale/lang/en'
import jaLocale from 'element-plus/lib/locale/lang/ja'
import esLocale from 'element-plus/lib/locale/lang/es'
import en from './en'
import es from './es'
import ja from './ja'
import zhCN from './zh-cn'
import zhTW from './zh-tw'

export const initLanguage = app => {
  const layoutStore = useLayoutStore()

  const locale = languageList.find(item => item.value === layoutStore.language)

  const messages = {
    zh_CN: { ...zhCN, ...zhCnLocale },
    zh_TW: { ...zhTW, ...zhTwLocale },
    en: { ...en, ...enLocale.el },
    es: { ...es, ...esLocale.el },
    ja: { ...ja, ...jaLocale.el }
  }

  const i18n = createI18n({
    legacy: false, // 使用 Composition API 模式，则需要将其设置为 false
    globalInjection: true, // 全局注入 $t 函数
    locale: locale ? locale.i18n : config.i18nLocale,
    messages
  })

  app.use(i18n)
}