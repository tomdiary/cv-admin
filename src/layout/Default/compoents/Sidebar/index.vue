<template>
  <div class="cv-default-sidebar">
    <el-scrollbar wrap-class="custom-scrollbar" view-class="custom-scrollbar-wrapper">
      <div class="cv-default-sidebar-menu">
        <el-menu
            router
            unique-opened
            :collapse-transition="false"
            :collapse="layoutStore.gtSidebarStatus"
            :popper-effect="layoutStore.gtThemeMode"
            :default-active="defaultRouter"
            class="sidebar-menu">
          <el-menu-item index="/dashboard">
            <el-icon>
              <svg-icon icon-class="dashboard" />
            </el-icon>
            <span class="menu-item-title">仪表盘</span>
          </el-menu-item>
          <el-menu-item index="/menu">
            <el-icon>
              <svg-icon icon-class="com" />
            </el-icon>
            <span class="menu-item-title">菜单</span>
          </el-menu-item>
          <el-sub-menu index="/com">
            <template #title>
              <el-icon>
                <svg-icon icon-class="com" />
              </el-icon>
              <span class="menu-item-title">组件库</span>
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
              <el-icon>
                <svg-icon icon-class="echarts" />
              </el-icon>
              <span class="menu-item-title">ECharts</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/echarts/default">默认ECharts</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="/table">
            <template #title>
              <el-icon>
                <svg-icon icon-class="table" />
              </el-icon>
              <span class="menu-item-title">表格</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/table/default">默认表格</el-menu-item>
              <el-menu-item index="/table/merge">合并行/列</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="/map">
            <template #title>
              <el-icon>
                <svg-icon icon-class="map" />
              </el-icon>
              <span class="menu-item-title">高德地图</span>
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
import { Delete, Edit, Download, Search, Plus, Upload, Refresh } from '@element-plus/icons-vue'

defineProps({
  defaultRouter: {
    default: '/',
    type: String
  }
})
const layoutStore = useLayoutStore()
</script>

<style lang="scss">
.cv-default-sidebar {
  height: 100%;
  border-right: 1px solid $cv-border-color;

  .custom-scrollbar {

    .custom-scrollbar-wrapper {

      .cv-default-sidebar-menu {

        .sidebar-menu {
          border-right: none;
          background-color: $sidebar-bgc;

          .svg-icon {
            color: $sidebar-icon-color;
          }

          .el-menu-item {
            position: relative;
            color: $sidebar-font-color;
            border-left: 4px solid transparent;
          }

          .el-menu-item:is(.is-active) {
            color: $sidebar-text-active-color;
            background-color: $sidebar-menu-item-bgc-active;
            border-color: $sidebar-menu-item-border-active;
          }

          .el-sub-menu {

            .el-menu {
              background-color: $sidebar-menu-group-bgc;
            }
          }


          & > .el-menu-item:hover {
            color: $sidebar-text-hover-color;
            background-color: $sidebar-menu-hover-bgc;

            .svg-icon {
              color: $sidebar-icon-hover-color;
            }
          }

          & > .el-sub-menu {

            & > .el-sub-menu__title {
              color: $sidebar-font-color;
            }

            & > .el-sub-menu__title:hover {
              background-color: $sidebar-menu-hover-bgc;
            }

            & > .el-menu {
              //padding: 10px 0;
              //box-shadow: inset 0 0 19px -7px #000;

              .el-menu-item-group {

                .el-menu-item-group__title {
                  display: none;
                }

                .el-menu-item {
                  height: $sidebar-hei;
                  line-height: $sidebar-hei;
                  color: $sidebar-font-color;
                }

                .el-menu-item.is-active {
                }

                .el-menu-item:hover {
                  color: $sidebar-text-hover-color;
                  background-color: $sidebar-menu-hover-bgc;
                }
              }
            }
          }
        }
      }
    }
  }
}

.layout:not(.collapse-open) {

  .sidebar-menu {

    .el-sub-menu__title,
    .el-menu-item .el-menu-tooltip__trigger {
      // justify-content: center;
    }

    .el-menu-item {
      border-left: none !important;
    }
  }
}

.layout:not(.collapse-close) {

  .menu-item-title {
    margin-left: 8px;
  }
}

</style>
