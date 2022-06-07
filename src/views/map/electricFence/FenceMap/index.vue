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
      <el-button type="primary" text bg>添加围栏</el-button>
      <el-button type="warning" text bg>清除围栏</el-button>
      <el-button type="primary" text bg>开始编辑</el-button>
      <el-button type="primary" text bg>结束编辑</el-button>
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
import { onMounted, onUnmounted, ref } from 'vue'
import { shallowRef } from '@vue/reactivity'
import { lazyAMapApiLoaderInstance } from '@vuemap/vue-amap'

/**
 * 使用 shallowRef 进行非深度监听，因为在 Vue3 所使用的 Proxy 拦截操作会
 * 改变 JSAPI 原生对象，建议 JS API 相关对象采用非响应式的普通对象来存储
 * @link https://lbs.amap.com/api/jsapi-v2/guide/webcli/map-vue1
 */
let map = shallowRef(null)
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
