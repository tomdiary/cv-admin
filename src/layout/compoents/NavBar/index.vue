<template>
  <div class="nav-bar">
    <div class="logo">LOGO</div>
    <div class="nav-bar-option">
      <div class="operation-bar-left">
        <section class="operation-item" @click="sidebarToggle">
          <el-icon>
            <Expand v-if="layoutStore.gtSidebarStatus" />
            <Fold v-else />
          </el-icon>
        </section>
      </div>
      <div class="operation-bar-right">
        <section class="operation-item" @click="settingsToggle">
          <el-icon>
            <Operation />
          </el-icon>
        </section>
        <section class="operation-item">
          <el-icon>
            <Share />
          </el-icon>
        </section>
      </div>
    </div>
    <el-drawer
        v-model="state.settingStatus"
        custom-class="global-settings"
        :with-header="false">
      <GloSettings />
    </el-drawer>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useLayoutStore } from '@/store/layout'
import GloSettings from './GloSettings.vue'
import { Share, Operation, Fold, Expand } from '@element-plus/icons-vue'

const state = reactive({
  settingStatus: true
})
const layoutStore = useLayoutStore()

const settingsToggle = () => (state.settingStatus = !state.settingStatus)
const sidebarToggle = () => layoutStore.asSidebarStatus()
</script>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  flex-wrap: nowrap;
  height: 100%;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: $sidebar-sm-width;
    height: 100%;
    font-size: 20px;
    letter-spacing: 1px;
  }

  .nav-bar-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - #{$sidebar-sm-width});
    height: 100%;

    .operation-bar-left,
    .operation-bar-right {
      display: flex;
    }

    .operation-bar-right  {
      padding-right: 20px;
    }

    .operation-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: $operation-hei;
      height: $operation-hei;
      cursor: pointer;

      .el-icon {
        font-size: 20px;
      }
    }

    .operation-item:hover {
      background-color: #CCC;
    }
  }
}
</style>
