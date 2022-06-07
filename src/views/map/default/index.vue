<template>
  <cv-page-layout :isFooter="false" :isHeader="false">
    <template #default="scope">
      <div id="container" :style="{ height: `${scope.mainHeight}px` }"></div>
    </template>
  </cv-page-layout>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { shallowRef } from '@vue/reactivity'
import { lazyAMapApiLoaderInstance } from '@vuemap/vue-amap'
import useLayoutStore from '@/store/layout'

/**
 * 使用 shallowRef 进行非深度监听，因为在 Vue3 所使用的 Proxy 拦截操作会
 * 改变 JSAPI 原生对象，建议 JS API 相关对象采用非响应式的普通对象来存储
 * @link https://lbs.amap.com/api/jsapi-v2/guide/webcli/map-vue1
 */
let map = shallowRef(null)
const layoutState = useLayoutStore()

onMounted(() => {
  initBaseMap()
})

onUnmounted(() => map.destroy())

layoutState.$subscribe((newVal, oldVal) => {
  if (newVal.events.key === 'themeMode') initBaseMap()
}, { detached: true })

const initBaseMap = () => {
  lazyAMapApiLoaderInstance.then(() => {
    map = new AMap.Map('container', {
      // eslint-disable-next-line max-len
      mapStyle: layoutState.themeMode === 'light' ? import.meta.env.VITE_AMAP_LIGHT_STYLES : import.meta.env.VITE_AMAP_DARK_STYLES
    })
  })
}
</script>
