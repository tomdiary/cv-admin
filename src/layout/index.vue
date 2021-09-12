<template>
  <div class="layout">
    <div class="layout-container">
      <sidebar />
      <div class="layout-main">
        <header class="layout-header">
          <nav-bar />
          <tags-view />
        </header>
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { AppMain, Sidebar, NavBar, TagsView } from './compoents'

export default {
  components: {
    AppMain,
    Sidebar,
    NavBar,
    TagsView
  }
}
</script>

<style scoped lang="scss">
.layout {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;

  .layout-container {

    .layout-main {

    }
  }
}
</style>