<template>
  <div class="nav-bar">
    <div class="logo">
      <div v-if="!layoutStore.gtSidebarStatus" class="logo-normal">
        <svg-icon icon-class="vuejs" />
        <h1>cv-admin</h1>
      </div>
      <div v-else class="logo-zoom-out">
        <svg-icon icon-class="vuejs" />
      </div>
    </div>
    <div class="nav-bar-option">
      <div class="operation-bar-left">
        <section class="operation-item" @click="sidebarToggle">
          <el-icon>
            <DArrowRight v-if="layoutStore.gtSidebarStatus" />
            <DArrowLeft v-else />
          </el-icon>
        </section>
      </div>
      <div class="operation-bar-right">
        <section class="operation-item">
          <el-icon>
            <Search />
          </el-icon>
        </section>
        <section class="operation-item">
          <el-icon>
            <FullScreen />
          </el-icon>
        </section>
        <section class="operation-item">
          <el-icon>
            <Refresh />
          </el-icon>
        </section>
        <section class="operation-item">
          <el-badge is-dot class="badge-item">
            <el-icon>
              <Bell />
            </el-icon>
          </el-badge>
        </section>
        <section class="operation-item" @click="settingsToggle">
          <el-icon>
            <Setting />
          </el-icon>
        </section>
        <el-dropdown @command="onCommand">
          <span class="el-dropdown-link">
            <el-avatar shape="square" :size="28" :src="avatar" />
            <span class="nickname">Avecle soleil丶</span>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="A1">个人信息</el-dropdown-item>
              <el-dropdown-item command="A2">修改密码</el-dropdown-item>
              <el-dropdown-item command="A3" disabled>切换角色</el-dropdown-item>
              <el-dropdown-item command="A4">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <el-drawer
        v-model="state.settingStatus"
        :open-delay="100"
        :close-delay="150"
        class="cv-global-settings"
        modal-class="cv-global-settings-modal"
        :with-header="false">
      <GloSettings />
    </el-drawer>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import useLayoutStore from '@/store/layout'
import useUserStore from '@/store/moduels/user'
import GloSettings from './GloSettings.vue'
import { ElMessageBox } from 'element-plus'
import { ArrowDown, FullScreen, Search, DArrowLeft, DArrowRight, Refresh, Bell, Setting } from '@element-plus/icons-vue'
import avatar from '@/assets/images/29516632319712.jpg'

const state = reactive({
  settingStatus: false
})
const router = useRouter()
const userStore = useUserStore()
const layoutStore = useLayoutStore()

const settingsToggle = () => (state.settingStatus = !state.settingStatus)
const sidebarToggle = () => layoutStore.asSidebarStatus()
const onCommand = async (event) => {
  if (event === 'A4') {
    ElMessageBox.confirm(
      '确认需要退出登录吗？',
      '温馨提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await userStore.atUserLogout()
      router.push({ path: '/login' })
    })
  }
}
</script>

<style scoped lang="scss">
.badge-item {
  margin-top: 6px;
}

.nav-bar {
  display: flex;
  flex-wrap: nowrap;
  height: 100%;

  .logo {
    font-size: 20px;
    letter-spacing: 1px;
    color: #FFF;
    border-right: 1px solid $cv-border-color;

    .svg-icon {
      font-size: 36px;
    }

    .logo-normal, .logo-zoom-out {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      h1 {
        font-size: 22px;
      }
    }
  }

  .nav-bar-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
      height: $operation-hei;
      padding: 0 10px;
      cursor: pointer;

      .el-icon {
        font-size: 18px;
        color: $cv-font-color;
      }
    }

    .el-dropdown {
      margin-left: 10px;
      align-items: center;

      .el-dropdown-link {
        cursor: pointer;
        color: $cv-font-color;
        display: flex;
        align-items: center;

        .el-avatar {
          border: 1px solid #CCC;
          border-radius: 6px;
        }

        .nickname {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
