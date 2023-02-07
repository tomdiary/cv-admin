import { createI18n } from 'vue-i18n'
import config from '@/config'
import useLayoutStore from '@/store/layout'
import { languageList } from '@/config/dataSource'
import zhCnLocale from 'element-plus/lib/locale/lang/zh-cn'
import zhTwLocale from 'element-plus/lib/locale/lang/zh-tw'
import enLocale from 'element-plus/lib/locale/lang/en'
import jaLocale from 'element-plus/lib/locale/lang/ja'
import esLocale from 'element-plus/lib/locale/lang/es'
import en from './locales/en'
import es from './locales/es'
import ja from './locales/ja'
import zhCN from './locales/zh-cn'
import zhTW from './locales/zh-tw'

export const initLanguage = app => {
  const layoutStore = useLayoutStore()

  const locale = languageList.find(item => item.value === layoutStore.language)

  const messages = {
    zh_CN: { ...zhCN, ...zhCnLocale.el },
    zh_TW: { ...zhTW, ...zhTwLocale.el },
    en: { ...en, ...enLocale.el },
    es: { ...es, ...esLocale.el },
    ja: { ...ja, ...jaLocale.el }
  }

  const i18n = createI18n({
    legacy: false, // 使用 Composition API 模式，则需要将其设置为 false
    globalInjection: true, // 全局注入 $t 函数
    locale: locale ? locale.i18n : config.i18nLocale,
    fallbackLocale: 'zh_CN', // 缺省时默认使用 zh_CN
    messages
  })

  app.use(i18n)
}
