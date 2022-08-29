<template>
  <el-form
    label-position="left"
    label-width="140px"
    :model="formData"
    style="max-width: 460px">
    <cv-title title="常规配置"></cv-title>
    <el-form-item label="主题模式">
      <el-select
          v-model="formData.themeMode"
          @change="themeItemChange('asThemeModeChange', $event)"
          placeholder="请选择">
        <el-option
            v-for="item in themeModeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="字体设置">
      <el-select
          v-model="formData.fontFamily"
          @change="themeItemChange('asFontFamilyChange', $event)"
          placeholder="请选择">
        <el-option
            v-for="item in fontFamilyList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="主题大小">
      <el-select
          v-model="formData.themeSize"
          @change="themeItemChange('asThemeSizeChange', $event)"
          placeholder="请选择">
        <el-option
            v-for="item in themeSizeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="国际化">
      <el-select
          v-model="formData.language"
          @change="themeItemChange('asLanguageChange', $event)"
          placeholder="请选择">
        <el-option
            v-for="item in languageList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <cv-title title="颜色配置">
      <svg-icon icon-class="table" />
    </cv-title>
    <el-form-item label="主题颜色">
      <el-color-picker
          v-model="formData.themeColor"
          :predefine="predefineColors"
          @change="themeItemChange('asThemeColorChange', $event)">
      </el-color-picker>
    </el-form-item>
    <el-form-item label="面包屑">
      <el-switch
          v-model="formData.breadcrumbStatus"
          @change="themeItemChange('asBreadcrumbChange', $event)">
      </el-switch>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import {
  themeModeList,
  themeSizeList,
  languageList,
  fontFamilyList,
  predefineColors
} from '@/config/dataSource'
import useLayoutStore from '@/store/layout'

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
