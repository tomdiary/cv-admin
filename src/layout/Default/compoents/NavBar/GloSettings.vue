<template>
  <el-form
    label-position="left"
    label-width="140px"
    :model="formData"
    style="max-width: 460px">
    <cv-title :title="$t('gloSettings.defaultConfig')"></cv-title>
    <el-form-item :label="$t('gloSettings.themMode')">
      <el-select
          v-model="formData.themeMode"
          @change="themeItemChange('asThemeModeChange', $event)"
          :placeholder="$t('pleaseChoose')">
        <el-option
            v-for="item in themeModeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('gloSettings.fontSettings')">
      <el-select
          v-model="formData.fontFamily"
          @change="themeItemChange('asFontFamilyChange', $event)"
          :placeholder="$t('pleaseChoose')">
        <el-option
            v-for="item in fontFamilyList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('gloSettings.themeSize')">
      <el-select
          v-model="formData.themeSize"
          @change="themeItemChange('asThemeSizeChange', $event)"
          :placeholder="$t('pleaseChoose')">
        <el-option
            v-for="item in themeSizeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('gloSettings.language')">
      <el-select
          v-model="formData.language"
          @change="languageChange"
          :placeholder="$t('pleaseChoose')">
        <el-option
            v-for="item in languageList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <cv-title :title="$t('gloSettings.colorConfig')" />
    <el-form-item :label="$t('gloSettings.themeColor')">
      <el-select
        v-model="formData.themeColor"
        @change="themeItemChange('asThemeColorChange', $event)"
        :placeholder="$t('pleaseChoose')">
        <el-option
          v-for="item in themeMatchColors"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('gloSettings.breadcrumbStatus')">
      <el-switch
          v-model="formData.breadcrumbStatus"
          @change="themeItemChange('asBreadcrumbChange', $event)">
      </el-switch>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  themeModeList,
  themeSizeList,
  languageList,
  fontFamilyList,
  predefineColors,
  themeMatchColors
} from '@/config/dataSource'
import useLayoutStore from '@/store/layout'

const route = useRoute()
const router = useRouter()
const { path, query } = route
const layoutStore = useLayoutStore()
const formData = reactive({
  themeMode: layoutStore.themeMode,
  themeSize: layoutStore.themeSize,
  fontFamily: layoutStore.fontFamily,
  language: layoutStore.language,
  themeColor: layoutStore.themeColor,
  breadcrumbStatus: layoutStore.breadcrumbStatus,
})

const themeItemChange = (themeItem, e) => layoutStore[themeItem](e)

const languageChange = event => {
  layoutStore.asLanguageChange(event).then(() => {
    // router.replace({ path: `/redirect${path}`, query }) // TODO 无法实时更新国际化
    window.location.reload()
  })
}
</script>

<style scoped lang="scss">
.el-form {

  .el-form-item label:after {
    content: "";
    display: inline-block;
    width: 100%;
  }

  .el-form-item__label {
    text-align: justify;
    height: 50px;
  }

  .el-form-item.is-required .el-form-item__label:before {
    content: none !important;
  }
}
</style>
