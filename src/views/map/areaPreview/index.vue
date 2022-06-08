<template>
  <div class="area-preview">
    <cv-page-layout :is-footer="false" :is-header="false">
      <template #default="scope">
        <div id="area-preview-map" :style="{ height: `${scope.mainHeight}px` }"></div>
      </template>
    </cv-page-layout>
  </div>
</template>

<script setup>
import { shallowRef } from '@vue/reactivity'
import { onMounted, onUnmounted } from 'vue'
import { lazyAMapApiLoaderInstance } from '@vuemap/vue-amap'

let map = shallowRef(null)

onMounted(() => {
  initBaseMap()
})

onUnmounted(() => map?.destroy())

const initBaseMap = () => {
  lazyAMapApiLoaderInstance.then(() => {
    map = new AMap.Map('area-preview-map', {
      zoom: 12
    })

    AMapUI.loadUI(['ui/geo/DistrictExplorer', 'lib/$'], DistrictExplorer => {
      initMapPage(DistrictExplorer)
    })
  })
}

const initMapPage = DistrictExplorer => {
  const districtExplorer = new DistrictExplorer({ map }) // 创建一个实例
  const adcode = 100000 // 全国的区划编码

  districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
    if (error) {
      console.error(error)
      return
    }
    // 绘制载入的区划节点
    renderAreaNode(districtExplorer, areaNode)
  })
}

const renderAreaNode = (districtExplorer, areaNode) => {
  // 清除已有的绘制内容
  districtExplorer.clearFeaturePolygons()

  // just some colors
  const colors = ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00']

  // 绘制子级区划
  districtExplorer.renderSubFeatures(areaNode, (feature, i) => {
    const fillColor = colors[i % colors.length]
    const strokeColor = colors[colors.length - 1 - (i % colors.length)]

    return {
      cursor: 'default',
      bubble: true,
      strokeColor, // 线颜色
      strokeOpacity: 1, // 线透明度
      strokeWeight: 1, // 线宽
      fillColor, // 填充色
      fillOpacity: 0.35 // 填充透明度
    }
  })

  // 绘制父级区划，仅用黑色描边
  districtExplorer.renderParentFeature(areaNode, {
    cursor: 'default',
    bubble: true,
    strokeColor: 'black', // 线颜色
    fillColor: null,
    strokeWeight: 3 // 线宽
  })

  // 更新地图视野以适合区划面
  map.setFitView(districtExplorer.getAllFeaturePolygons())
}
</script>

<style scoped lang="scss">
.area-preview {
  height: 100%;
}
</style>
