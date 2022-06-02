<template>
  <cv-page-layout :isFooter="false" :isHeader="false">
    <template #default="scope">
      <div id="container" :style="{ height: `${scope.mainHeight}px` }"></div>
    </template>
  </cv-page-layout>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { lazyAMapApiLoaderInstance } from '@vuemap/vue-amap'

const map = ref(null)

onMounted(() => {
  initBaseMap()
})

onUnmounted(() => console.log(map)) // 待优化，需要增加销毁地图功能

const initBaseMap = () => {
  lazyAMapApiLoaderInstance.then(() => {
    map.value = new AMap.Map('container')
  })
}
</script>
