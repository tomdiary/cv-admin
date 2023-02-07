<template>
  <div class="tags-view">
    <el-tabs v-model="activeName" type="card" class="cv-tags-tabs">
      <el-tab-pane label="首页" :closable="false" name="Dashboard">
        <template #label>
          <el-icon>
            <House />
          </el-icon>
          <span>首页</span>
        </template>
      </el-tab-pane>
      <el-tab-pane label="组件列表" closable name="ComList" />
      <el-tab-pane label="对话框" closable name="ComDialog" />
      <el-tab-pane label="图标1" closable name="ComIcons1" />
      <el-tab-pane label="图标2" closable name="ComIcons2" />
      <el-tab-pane label="图标3" closable name="ComIcons3" />
      <el-tab-pane label="图标4" closable name="ComIcons4" />
      <el-tab-pane label="图标5" closable name="ComIcons5" />
      <el-tab-pane label="图标6" closable name="ComIcons6" />
      <el-tab-pane label="图标7" closable name="ComIcons7" />
      <el-tab-pane label="图标8" closable name="ComIcons8" />
      <el-tab-pane label="图标9" closable name="ComIcons9" />
      <el-tab-pane label="图标10" closable name="ComIcons10" />
      <el-tab-pane label="图标11" closable name="ComIcons11" />
      <el-tab-pane label="图标12" closable name="ComIcons12" />
      <el-tab-pane label="图标13" closable name="ComIcons13" />
      <el-tab-pane label="图标14" closable name="ComIcons14" />
      <el-tab-pane label="图标15" closable name="ComIcons15" />
      <el-tab-pane label="图标16" closable name="ComIcons16" />
      <el-tab-pane label="图标17" closable name="ComIcons17" />
      <el-tab-pane label="图标18" closable name="ComIcons18" />
      <el-tab-pane label="图标19" closable name="ComIcons19" />
      <el-tab-pane label="图标20" closable name="ComIcons20" />
      <el-tab-pane label="图标21" closable name="ComIcons21" />
      <el-tab-pane label="图标22" closable name="ComIcons22" />
      <el-tab-pane label="图标23" closable name="ComIcons23" />
      <el-tab-pane label="图标24" closable name="ComIcons24" />
      <el-tab-pane label="图标25" closable name="ComIcons25" />
      <el-tab-pane label="图标26" closable name="ComIcons26" />
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { House } from '@element-plus/icons-vue'

const activeName = ref('Dashboard')
</script>

<style scoped lang="scss">
.tags-view {
  height: $tags-view-hei;
  background-color: $tags-view-bgc;
  box-shadow: $cv-box-shadow;
  z-index: 1000;
}
</style>
