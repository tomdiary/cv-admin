<template>
  <div class="sidebar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="sidebar-container">
        <el-menu
            :router="true"
            :unique-opened="true"
            :collapse-transition="false"
            :collapse="layoutStore.gtSidebarStatus"
            :default-active="defaultRouter"
            class="sidebar-menu">
          <el-menu-item index="/dashboard">
            <svg-icon icon-class="dashboard" />
            <template #title>仪表盘</template>
          </el-menu-item>
          <el-sub-menu index="/com">
            <template #title>
              <svg-icon icon-class="com" />
              <span>组件库</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/com/list">组件列表</el-menu-item>
              <el-menu-item index="/com/table">表格</el-menu-item>
              <el-menu-item index="/com/dialog">对话框</el-menu-item>
              <el-menu-item index="/com/icons">图标</el-menu-item>
              <el-menu-item index="/com/calendar">日历</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="/echarts">
            <template #title>
              <svg-icon icon-class="echarts" />
              <span>ECharts</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/echarts/default">默认ECharts</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="/table">
            <template #title>
              <svg-icon icon-class="table" />
              <span>表格</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/table/default">默认表格</el-menu-item>
              <el-menu-item index="/table/merge">合并行/列</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="/map">
            <template #title>
              <svg-icon icon-class="map" />
              <span>高德地图</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/map/default">默认地图</el-menu-item>
              <el-menu-item index="/map/electric-fence">电子围栏</el-menu-item>
              <el-menu-item index="/map/area-preview">行政区域预览</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import useLayoutStore from '@/store/layout'

defineProps({
  defaultRouter: {
    default: '/',
    type: String
  }
})
const layoutStore = useLayoutStore()
</script>
