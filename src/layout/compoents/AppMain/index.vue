<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.app-main {
  height: calc(100% - #{$tags-view-hei + $main-padding * 2});
  padding: $main-padding;
}
</style>
