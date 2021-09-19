<template>
  <div class="layout">
    <div class="layout-container">
      <header class="layout-header">
        <nav-bar />
      </header>
      <div class="layout-wrapper">
        <div class="layout-sidebar">
          <sidebar :default-router="defaultRouter" />
        </div>
        <div class="layout-main">
          <tags-view />
          <app-main />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppMain, Sidebar, NavBar, TagsView } from './compoents'

export default {
  data() {
    return {
      defaultRouter: '/'
    }
  },
  components: {
    AppMain,
    Sidebar,
    NavBar,
    TagsView
  },
  watch: {
    $route: {
      handler(route) {
        this.defaultRouter = route.path || '/'
      },
      immediate: true
    }
  }
}
</script>

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
    background-color: $main-color;
  }

  .layout-wrapper {
    position: relative;
    height: calc(100% - #{$header-hei});

    .layout-sidebar {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: $sidebar-width;
      background-color: $main-color;
    }

    .layout-main {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      left: $sidebar-width;
    }
  }
}
</style>
