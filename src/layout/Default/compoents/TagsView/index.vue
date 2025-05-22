<template>
  <div class="tags-view">
    <el-tabs v-model="activeName" type="card" class="cv-tags-tabs">
      <el-tab-pane label="首页" :closable="false" name="Dashboard">
        <template #label>
          <svg-icon icon-class="dashboard" />
          <span class="tag-title">首页</span>
        </template>
      </el-tab-pane>
      <el-tab-pane label="组件列表" closable name="ComList">
        <template #label>
          <svg-icon icon-class="com" />
          <span class="tag-title">组件列表</span>
        </template>
      </el-tab-pane>
      <el-tab-pane label="图标库" closable name="IconList">
        <template #label>
          <svg-icon icon-class="echarts" />
          <span class="tag-title">图标库</span>
        </template>
      </el-tab-pane>
      <el-tab-pane label="高德地图" closable name="Map">
        <template #label>
          <svg-icon icon-class="map" />
          <span class="tag-title">高德地图</span>
        </template>
      </el-tab-pane>
      <el-tab-pane label="VueJS" closable name="VueJS">
        <template #label>
          <svg-icon icon-class="vuejs" />
          <span class="tag-title">VueJS</span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-icon :size="20" class="el-icon--right">
          <MoreFilled />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MoreFilled } from '@element-plus/icons-vue'

const activeName = ref('Dashboard')
</script>

<style scoped lang="scss">
.tags-view {
  display: flex;
  flex-wrap: nowrap;
  height: $tags-view-hei;
  box-shadow: $cv-box-shadow;
  z-index: 1000;
  border-top: 1px solid $cv-border-color;
  border-bottom: 1px solid $cv-border-color;

  .el-tabs {
    width: calc(100% - 50px);
  }

  .el-dropdown {
    width: 40px;
    margin-right: 10px;

    .el-dropdown-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      cursor: pointer;
    }
  }
}
</style>
