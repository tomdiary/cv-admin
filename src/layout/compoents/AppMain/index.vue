<template>
  <div class="app-main" :class="layoutType">
    <router-view />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'

const route = useRoute()
const layoutType = ref('main-is-padding')

onBeforeMount(() => {
  initLayoutPadding(route.meta.layoutPadding)
})

onBeforeRouteLeave((to, from) => {
  initLayoutPadding(to.meta.layoutPadding)
})

// 根据路由元信息(meta)中的 layoutPadding 判断是否需要 padding，true-需要，false-不需要，如果为空默认需要
const initLayoutPadding = status => {
  layoutType.value = typeof status === 'boolean' && !status ? 'main-no-padding' : 'main-is-padding'
}
</script>

<style scoped lang="scss">
.app-main {
}

.main-is-padding {
  height: calc(100% - #{$tags-view-hei + $main-padding * 2});
  padding: $main-padding;
}

.main-no-padding {
  height: calc(100% - #{$tags-view-hei});
}
</style>
