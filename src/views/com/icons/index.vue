<template>
  <div class="com-icons">
    <el-tabs type="border-card" style="height: 100%;">
      <el-tab-pane label="Fontisto">
        <div class="icons-list">
          <template v-for="(item, index) in fontistoData" :key="index">
            <div class="icon-item">
              <i :class="`fi ${item}`"></i>
            </div>
          </template>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-ui">
        <div class="icons-list">
          <div class="icon-item">
              <el-icon>
                <component :is="Refresh" />
              </el-icon>
            </div>
          <template v-for="(item, index) in elementIconNameList" :key="index">
            <div class="icon-item">
              <el-icon>
                <component :is="item" />
              </el-icon>
            </div>
          </template>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Iconify">
        <Icon icon="ant-design:aliyun-outlined" color="red" width="1024" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { Icon } from '@iconify/vue'

const fontistoData = ref([])
const elementIconNameList = shallowRef([])

onMounted(() => {
  nextTick(() => {
    const tabsDOM = document.querySelector('.com-icons .el-tabs__header')
    const tabsContentDOM = document.querySelector('.com-icons .el-tabs__content')
    tabsContentDOM.setAttribute(
      'style',
      `height: calc(100% - ${tabsDOM.offsetHeight}px)`
    )
  })
  initFontistoData()
})

const initFontistoData = () => {
  const fontistoFile = import.meta.glob('fontisto/css/fontisto/fontisto.min.css', { as: 'raw', eager: true })
  const fileContent = fontistoFile[Object.keys(fontistoFile)[0]]
  const fileIconsList = fileContent.match(/.fi*(?!-border|-stack|-rectangle|-curve|-ellipse)(-\w+)*:before/g)
  const iconsNameList = fileIconsList.map(item => item.split(':')[0].split('.')[1])
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    elementIconNameList.value.push(component)
  }
  fontistoData.value = iconsNameList
  console.log(elementIconNameList)
}
</script>

<style lang="scss">
.el-tabs__content {
  padding: 0 !important;

  .el-tab-pane {
    height: 100% !important;
    overflow-y: auto;
  }
}
</style>

<style scoped lang="scss">
.com-icons {
  height: 100%;
}

.icons-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .icon-item {
    display: flex;
    align-items: center;
    justify-content: center;
    // flex-grow: 1;
    width: 50px;
    height: 50px;
    flex-basis: 50px;

    .ft {
      font-size: 20px;
    }
  }

  .icon-item:hover {
    background-color: $cv-fill-color-light;
    cursor: pointer;
  }
}
</style>
