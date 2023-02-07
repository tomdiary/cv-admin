<template>
  <div class="layout" :class="[layoutStore.gtSidebarStatus ? 'collapse-close' : 'collapse-open']">
    <div class="layout-container">
      <header class="layout-header">
        <NavBar />
      </header>
      <div class="layout-wrapper">
        <div class="layout-sidebar">
          <Sidebar :defaultRouter="defaultRouter" />
        </div>
        <div class="layout-main">
          <TagsView />
          <AppMain />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useLayoutStore from '@/store/layout'
import { AppMain, Sidebar, NavBar, TagsView } from './compoents'

const route = useRoute()
const defaultRouter = ref('/')
const layoutStore = useLayoutStore()

watch(route, (newVal, oldVal) => (defaultRouter.value = newVal.path || '/'))

onMounted(() => {
  defaultRouter.value = route.path
})
</script>

<style lang="scss">
.layout:not(.collapse-open) {
  .nav-bar {

    .logo {
      width: $sidebar-sm-width;
    }

    .nav-bar-option {
      width: calc(100% - #{$sidebar-sm-width});
    }
  }

  .layout-sidebar {
    width: $sidebar-sm-width;
  }

  .layout-main {
    left: $sidebar-sm-width;
  }

  .svg-icon {
    margin-right: 0;
  }
}

.layout:not(.collapse-close) {
  .nav-bar {

    .logo {
      width: $sidebar-width;
    }

    .nav-bar-option {
      width: calc(100% - #{$sidebar-width});
    }
  }

  .layout-sidebar {
    width: $sidebar-width;
  }

  .layout-main {
    left: $sidebar-width;
  }
}
</style>

<style scoped lang="scss">
.layout, .layout-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.layout {

  .layout-header {
    height: $header-hei;
    background-color: $header-bgc;
  }

  .layout-wrapper {
    position: relative;
    height: calc(100% - #{$header-hei});

    .layout-sidebar {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 100;
      transition: width 0.28s;
      background-color: $sidebar-bgc;
    }

    .layout-main {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      transition: left 0.28s;
      overflow: hidden;
    }
  }
}
</style>
