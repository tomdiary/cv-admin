<template>
  <div class="nav-bar">
    <div class="logo">CV-ADMIN</div>
    <div class="nav-bar-option">
      <div class="operation-bar-left">
        1
      </div>
      <div class="operation-bar-right">
        1
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  flex-wrap: nowrap;
  height: 100%;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: $sidebar-width;
    height: 100%;
    color: #FFF;
    font-size: 20px;
    letter-spacing: 1px;
  }

  .nav-bar-option {
    display: flex;
    justify-content: space-between;
    width: calc(100% - #{$sidebar-width});
    height: 100%;

    .operation-bar-left {

    }

    .operation-bar-right {

    }
  }
}
</style>
