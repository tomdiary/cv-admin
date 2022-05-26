<template>
  <el-tabs type="border-card">
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
      <Icon icon="ant-design:aliyun-outlined" color="red" width="1024" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const fontistoData = ref([])

onMounted(() => {
  initFontistoData()
})

const initFontistoData = () => {
  const data = import.meta.globEager('fontisto/css/fontisto/fontisto.min.css')
  const fileContent = data[Object.keys(data)[0]].default
  const fileIconsList = fileContent.match(/.fi*(?!-border|-stack|-rectangle|-curve|-ellipse)(-\w+)*:before/g)
  // const fileIconsList = fileContent.match(/.fi*(-\w+)*:before/g)
  // const fileIconsList = fileContent.match(/.fi*(-\w+|-\w+-\w+|-\w+-\w+-\w+):before/g)
  // const fileIconsList = fileContent.match(/.fi-.*?\w+\:before/g)
  console.log(fileIconsList)
  const iconsNameList = fileIconsList.map(item => item.split(':')[0].split('.')[1])
  fontistoData.value = iconsNameList
}
</script>

<style scoped lang="scss">
.icons-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

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
