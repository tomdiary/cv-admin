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
import zhCN from './zh-CN'
import zhTW from './zh-TW'

export const initLanguage = app => {
  const layoutStore = useLayoutStore()

  const locale = languageList.find(item => item.value === layoutStore.language)

  const messages = {
    zh_CN: { ...zhCN, ...zhCnLocale },
    zh_TW: { ...zhTW, ...zhTwLocale },
    en: { ...en, ...enLocale.el },
    es: { ...es, ...esLocale.el },
    ja: { ...ja, ...jaLocale.el },
  }

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: locale ? locale.i18n : config.i18nLocale,
    messages: messages
  })

  app.use(i18n)
}