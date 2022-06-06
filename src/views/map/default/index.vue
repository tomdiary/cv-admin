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
import useLayoutStore from '@/store/layout'

const map = ref(null)
const layoutState = useLayoutStore()

onMounted(() => {
  initBaseMap()
})

onUnmounted(() => console.log(map)) // 待优化，需要增加销毁地图功能

layoutState.$subscribe((newVal, oldVal) => {
  if (newVal.events.key === 'themeMode') initBaseMap()
}, { detached: true })

const initBaseMap = () => {
  lazyAMapApiLoaderInstance.then(() => {
    map.value = new AMap.Map('container', {
      // eslint-disable-next-line max-len
      mapStyle: layoutState.themeMode === 'light' ? import.meta.env.VITE_AMAP_LIGHT_STYLES : import.meta.env.VITE_AMAP_DARK_STYLES
    })
  })
}
</script>
