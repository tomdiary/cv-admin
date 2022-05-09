<template>
  <el-form
    label-position="left"
    label-width="100px"
    :model="formData"
    style="max-width: 460px">
    <el-form-item label="主题模式">
      <el-select v-model="formData.themeMode" @change="themeModeChange" placeholder="请选择">
        <el-option
            v-for="item in themeModeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="字体设置">
      <el-select v-model="formData.fontFamily" @change="fontFamilyChange" placeholder="请选择">
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
      <el-select v-model="formData.language" placeholder="请选择">
        <el-option
            v-for="item in languageList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="主题颜色">
      <el-color-picker
          v-model="formData.themeColor"
          :predefine="predefineColors"
          @change="themeColorChange">
      </el-color-picker>
    </el-form-item>
    <el-form-item label="面包屑">
      <el-button type="primary">Primary</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import {
  themeModeList,
  themeSizeList,
  languageList,
  fontFamilyList,
  predefineColors
} from '@/config/dataSource'
import { useLayoutStore } from '@/store/layout'

const layoutStore = useLayoutStore()
const formData = ref({
  themeMode: layoutStore.themeMode,
  themeSize: layoutStore.themeSize,
  fontFamily: layoutStore.fontFamily,
  language: layoutStore.themeLanguage,
  themeColor: layoutStore.themeColor
})

const themeModeChange = e => layoutStore.asThemeMode(e)
const fontFamilyChange = e => layoutStore.asFontFamilyChange(e)
const themeColorChange = e => layoutStore.asThemeColorChange(e)
const themeItemChange = (themeItem, e) => layoutStore[themeItem](e)
</script>

