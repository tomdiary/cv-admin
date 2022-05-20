<template>
  <el-config-provider :size="layoutState.gtThemeSize">
    <div id="app">
      <router-view />
    </div>
  </el-config-provider>
</template>

<script setup>
import useLayoutStore from '@/store/layout'

const layoutState = useLayoutStore()
</script>
