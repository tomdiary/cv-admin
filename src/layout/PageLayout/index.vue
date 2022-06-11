<template>
  <div class="page-layout">
    <header v-if="isFooter" class="page-layout-header">
      <slot name="header"></slot>
    </header>
    <main class="page-layout-main">
      <slot :mainHeight="mainHeight"></slot>
    </main>
    <footer
      v-if="isFooter"
      class="page-layout-footer"
      :class="{
        'page-layout-footer-right': footerDirection === 'right',
        'page-layout-footer-left': footerDirection === 'left'
      }">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>
import {
  ref,
  watch,
  nextTick,
  onMounted
} from 'vue'
import config from '@/config'
import useLayoutStore from '@/store/layout'

const props = defineProps({
  // 是否需要底部操作栏
  isFooter: {
    default: true,
    type: Boolean
  },
  // 是否需要头部操作栏
  isHeader: {
    default: true,
    type: Boolean
  },
  // 是否需要滚动条
  isScrollY: {
    default: false,
    type: Boolean
  },
  // 控制底部操作栏水平位置：left/right
  footerDirection: {
    default: 'right',
    type: String
  }
})
const mainHeight = ref(0)
const layoutState = useLayoutStore()

watch(() => layoutState.themeSize, () => calculateSize())

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      calculateSize()
    }, 300)
  })
  window.onresize = () => {
    calculateSize()
  }
})

const calculateSize = () => {
  const layoutHeaderMarginBottom = config.interval
  const layoutHeader = document.querySelector('.page-layout-header')
  const layoutMain = document.querySelector('.page-layout-main')
  const layoutFooter = document.querySelector('.page-layout-footer')
  const calculateHooterHei = props.isHeader ? layoutHeader.offsetHeight + layoutHeaderMarginBottom : 0
  const calculateFooterHei = props.isFooter ? layoutFooter.offsetHeight : 0
  layoutMain.setAttribute(
    'style',
    `height: calc(100% - ${calculateHooterHei + calculateFooterHei}px)`
  )
  mainHeight.value = layoutMain.offsetHeight
}
</script>

<style scoped lang="scss">
.page-layout {
  height: 100%;

  .page-layout-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: $main-interval;
    padding: $main-interval;
    border-radius: 4px;
    background-color: #FFF;
  }

  .page-layout-main {}

  .page-layout-footer {
    display: flex;
    align-items: center;
    padding: $main-interval;
    border-radius: 4px;
    background-color: #FFF;
  }

  .page-layout-footer-left {
    justify-content: flex-start;
  }

  .page-layout-footer-right {
    justify-content: flex-end;
  }
}
</style>
