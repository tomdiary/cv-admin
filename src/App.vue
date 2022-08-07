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
import zhCnLocale from 'element-plus/lib/locale/lang/zh-cn'
import zhTwLocale from 'element-plus/lib/locale/lang/zh-tw'
import enLocale from 'element-plus/lib/locale/lang/en'
import jaLocale from 'element-plus/lib/locale/lang/ja'
import { languageList } from '@/config/dataSource'

const locale = ref('')
const layoutState = useLayoutStore()

watch(() => layoutState.themeLanguage, (newVal) => {
  console.log(newVal, languageList)
})

onMounted(() => initBaseData())

const initBaseData = () => {
  const item = ""
}
</script>
