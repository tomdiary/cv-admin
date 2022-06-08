<template>
  <div class="fence-map">
    <div class="fence-header">
      <el-select v-model="fenceVal" placeholder="请选择" style="margin-right: 12px">
        <el-option
          v-for="item in fenceOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" @click="addFence({})" text bg>添加围栏</el-button>
      <el-button type="warning" @click="clearFence" text bg>清除围栏</el-button>
      <el-button type="primary" @click="startEdit" text bg>开始编辑</el-button>
      <el-button type="primary" @click="endEdit" text bg>结束编辑</el-button>
    </div>
    <div class="fence-main">
      <div class="map-search">
          <el-select
            style="width: 100%"
            filterable
            remote
            @change="searchMapChange"
            popper-class="search-map-select"
            v-model="mapSearchVal"
            :loading="mapSearchLoading"
            :remote-method="mapSearch"
            placeholder="请输入关键字">
          <el-option
            v-for="item in searchCity"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            <div class="address">
              <span class="address-top">{{ item.name }}</span>
              <el-tooltip
                effect="dark"
                :content="`${item.district}${Array.isArray(item.address) ? '' : item.address}`"
                placement="top">
                <span class="address-bottom">
                  {{ item.district }}{{ Array.isArray(item.address) ? '' : item.address }}
                </span>
              </el-tooltip>
            </div>
          </el-option>
        </el-select>
      </div>
      <div id="fence-map-wrapper"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, isShallow } from 'vue'
import { shallowRef } from '@vue/reactivity'
import { lazyAMapApiLoaderInstance } from '@vuemap/vue-amap'
import useLayoutStore from '@/store/layout'

/**
 * 使用 shallowRef 进行非深度监听，因为在 Vue3 所使用的 Proxy 拦截操作会
 * 改变 JSAPI 原生对象，建议 JS API 相关对象采用非响应式的普通对象来存储
 * @link https://lbs.amap.com/api/jsapi-v2/guide/webcli/map-vue1
 */
let map = shallowRef(null)
let circleFence = shallowRef(null)
let circleEditor = shallowRef(null)
let polygonFence = shallowRef(null)
let polygonEditor = shallowRef(null)
let rectangleEditor = shallowRef(null)
let rectangleFence = shallowRef(null)
const layoutStore = useLayoutStore()
const fenceVal = ref(0)
const mapSearchVal = ref('')
const searchCity = ref([])
const mapSearchLoading = ref(false)
const fenceOption = [
  { value: 0, label: '矩形' },
  { value: 1, label: '多边形' },
  { value: 2, label: '圆形' }
]

onMounted(() => {
  initBaseMap()
})

onUnmounted(() => map?.destroy())

const initBaseMap = () => {
  lazyAMapApiLoaderInstance.then(() => {
    map = new AMap.Map('fence-map-wrapper', {
      zoom: 12
    })
  })
}

const mapSearch = query => {
  if (query !== '') {
    mapSearchLoading.value = true
    AMap.plugin('AMap.AutoComplete', () => {
      const autoOptions = {
        city: '全国'
      }
      const autoComplete = new AMap.Autocomplete(autoOptions)
      autoComplete.search(query, (status, result) => {
        mapSearchLoading.value = false
        searchCity.value = result.tips.filter(item => item.id !== '')
      })
    })
  } else {
    searchCity.value = []
  }
}

const searchMapChange = id => {
  const arr = searchCity.value.find(item => item.id === id)
  if (arr) {
    map.clearMap()
    const marker = new AMap.Marker({
      position: arr.location
    })
    map.add(marker)
    map.setFitView()
  }
}
// 添加围栏
const addFence = (dataSource = {}) => {
  clearFence()
  const isDataSourceEmpy = !Object.keys(dataSource).length
  // 矩形围栏
  if (fenceVal.value === 0) {
    const visualRange = map.getBounds() // 可视范围
    const southWestLng = isDataSourceEmpy ? visualRange.southWest.lng : dataSource.rightBottomX
    const southWestLat = isDataSourceEmpy ? visualRange.southWest.lat : dataSource.leftTopY
    const northEastLng = isDataSourceEmpy ? visualRange.northEast.lng : dataSource.leftTopX
    const northEastLat = isDataSourceEmpy ? visualRange.northEast.lat : dataSource.rightBottomY
    // eslint-disable-next-line max-len
    const southWest = isDataSourceEmpy ? new AMap.LngLat(southWestLng + 0.020000, southWestLat + 0.020000) : new AMap.LngLat(southWestLng, southWestLat)
    // eslint-disable-next-line max-len
    const northEast = isDataSourceEmpy ? new AMap.LngLat(northEastLng - 0.020000, northEastLat - 0.020000) : new AMap.LngLat(northEastLng, northEastLat)
    const bounds = new AMap.Bounds(southWest, northEast)
    rectangleFence = new AMap.Rectangle({
      bounds,
      strokeColor: layoutStore.themeColor,
      strokeWeight: 6,
      strokeOpacity: 0.3,
      strokeDasharray: [30, 10],
      strokeStyle: 'dashed',
      fillColor: layoutStore.themeColor,
      fillOpacity: 0.5,
      cursor: 'pointer',
      zIndex: 50
    })
    map.add(rectangleFence) // 添加矩形
    map.setFitView([rectangleFence]) // 缩放到合适的级别
    AMap.plugin(['AMap.RectangleEditor'], () => {
      rectangleEditor = new AMap.RectangleEditor(map, rectangleFence)
    })
  }
  // 多边形围栏
  if (fenceVal.value === 1) {
    const visualRangeArr = []
    const visualRange = map.getCenter()
    const { lng, lat } = visualRange
    if (isDataSourceEmpy) {
      visualRangeArr.push([lng, lat])
      visualRangeArr.push([lng, lat - 0.03])
      visualRangeArr.push([lng - 0.03, lat - 0.03])
      visualRangeArr.push([lng - 0.03, lat])
    } else {
      dataSource.map(item => visualRangeArr.push([item.x, item.y]))
    }
    polygonFence = new AMap.Polygon({
      map,
      path: visualRangeArr,
      isOutline: true,
      borderWeight: 3,
      strokeColor: layoutStore.themeColor,
      strokeWeight: 6,
      strokeOpacity: 0.2,
      fillOpacity: 0.4,
      fillColor: layoutStore.themeColor,
      zIndex: 50
    })
    map.add(polygonFence) // 添加多边形
    map.setFitView([polygonFence]) // 缩放到合适的级别
    AMap.plugin(['AMap.PolygonEditor'], () => {
      polygonEditor = new AMap.PolygonEditor(map, polygonFence)
    })
  }
  // 圆形围栏
  if (fenceVal.value === 2) {
    const visualRange = map.getCenter()
    // eslint-disable-next-line max-len
    const bounds = isDataSourceEmpy ? [visualRange.lng, visualRange.lat] : [dataSource.centerX, dataSource.centerY]
    circleFence = new AMap.Circle({
      center: bounds,
      radius: isDataSourceEmpy ? 7000 : dataSource.radius,
      borderWeight: 3,
      strokeColor: layoutStore.themeColor,
      strokeWeight: 6,
      strokeOpacity: 0.3,
      fillOpacity: 0.4,
      strokeStyle: 'dashed',
      strokeDasharray: [10, 10],
      fillColor: layoutStore.themeColor,
      zIndex: 50
    })
    map.add(circleFence) // 添加矩形
    map.setFitView([circleFence]) // 缩放到合适的级别
    AMap.plugin(['AMap.CircleEditor'], () => {
      circleEditor = new AMap.CircleEditor(map, circleFence)
    })
  }
}
// 清除围栏
const clearFence = () => {
  // 矩形
  if (!isShallow(rectangleEditor)) {
    rectangleEditor.close()
    rectangleEditor = shallowRef(null)
  }
  if (!isShallow(rectangleFence)) {
    map.remove(rectangleFence)
    rectangleFence = shallowRef(null)
  }
  // 多边形
  if (!isShallow(polygonEditor)) {
    polygonEditor.close()
    polygonEditor = shallowRef(null)
  }
  if (!isShallow(polygonFence)) {
    map.remove(polygonFence)
    polygonFence = shallowRef(null)
  }
  // 圆形
  if (!isShallow(circleEditor)) {
    circleEditor.close()
    circleEditor = shallowRef(null)
  }
  if (!isShallow(circleFence)) {
    map.remove(circleFence)
    circleFence = shallowRef(null)
  }
}
// 开始编辑
const startEdit = () => {
  if (fenceVal.value === 0 && !isShallow(rectangleEditor)) rectangleEditor.open()
  if (fenceVal.value === 1 && !isShallow(polygonEditor)) polygonEditor.open()
  if (fenceVal.value === 2 && !isShallow(circleEditor)) circleEditor.open()
}
// 结束编辑
const endEdit = () => {
  if (fenceVal.value === 0 && !isShallow(rectangleEditor)) rectangleEditor.close()
  if (fenceVal.value === 1 && !isShallow(polygonEditor)) polygonEditor.close()
  if (fenceVal.value === 2 && !isShallow(circleEditor)) circleEditor.close()
}
</script>

<style scoped lang="scss">
.fence-map {

  .fence-header {
    margin-bottom: 12px;
  }

  .fence-main {
    position: relative;
    height: 50vh;

    .map-search {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 260px;
      z-index: 500;
    }

    #fence-map-wrapper {
      height: 100%;
    }
  }
}
</style>
