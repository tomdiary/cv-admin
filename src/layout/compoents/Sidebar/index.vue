<template>
  <div class="sidebar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="sidebar-container">
        <el-menu
            :router="true"
            :unique-opened="true"
            :default-active="defaultRouter"
            class="sidebar-menu">
          <el-menu-item index="/dashboard">
            <svg-icon icon-class="dashboard" />
            <template #title>仪表盘</template>
          </el-menu-item>
          <el-sub-menu index="/cvc">
            <template #title>
              <svg-icon icon-class="cvc" />
              <span>组件库</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/cvc/list">组件列表</el-menu-item>
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
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  props: {
    defaultRouter: {
      defaults: '/',
      type: String
    },
    layoutSidebar: {
      defaults: true,
      type: Boolean
    }
  }
}
</script>
