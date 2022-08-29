<template>
  <el-config-provider :locale="locale" :size="layoutState.gtThemeSize">
    <div id="app">
      <router-view />
    </div>
  </el-config-provider>
</template>

<script setup>
import { watch, onMounted, ref } from 'vue'
import useLayoutStore from '@/store/layout'
import { ElConfigProvider } from 'element-plus'
import zhCnLocale from 'element-plus/lib/locale/lang/zh-cn'
import zhTwLocale from 'element-plus/lib/locale/lang/zh-tw'
import enLocale from 'element-plus/lib/locale/lang/en'
import jaLocale from 'element-plus/lib/locale/lang/ja'
import esLocale from 'element-plus/lib/locale/lang/es'

let locale = ref(zhCnLocale)
const layoutState = useLayoutStore()

watch(() => layoutState.language, newVal => languageChange(newVal))

onMounted(() => initBaseData())

const initBaseData = () => languageChange(layoutState.language)

const languageChange = language => {
  switch (language) {
    case 'zh-cn':
      locale.value = zhCnLocale
      break
    case 'zh-tw':
      locale.value = zhTwLocale
      break
    case 'en':
      locale.value = enLocale
      break
    case 'ja':
      locale.value = jaLocale
      break
    case 'es':
      locale.value = esLocale
      break
    default:
      locale.value = zhCnLocale
      break
  }
}
</script>
