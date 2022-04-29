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
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="主题大小">
      <el-select v-model="formData.themeSize" placeholder="请选择">
        <el-option
            v-for="item in themeSizeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="国际化">
      <el-select v-model="formData.language" placeholder="请选择">
        <el-option
            v-for="item in languageList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="主题颜色">
    </el-form-item>
    <el-form-item label="面包屑">
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import {
  themeModeList,
  themeSizeList,
  languageList
} from '@/config/dataSource'
import { useLayoutStore } from '@/store/layout'

const layoutStore = useLayoutStore()
const formData = ref({
  themeMode: layoutStore.themeMode,
  themeSize: layoutStore.themeSize,
  language: layoutStore.themeLanguage
})

const themeModeChange = e => layoutStore.asThemeMode(e)
</script>

