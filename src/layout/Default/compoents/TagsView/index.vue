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
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeName = ref('Dashboard')
</script>

<style scoped lang="scss">
.tags-view {
  height: $tags-view-hei;
  box-shadow: $cv-box-shadow;
  z-index: 1000;
}
</style>
