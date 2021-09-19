<template>
  <div class="page-layout">
    <header class="page-layout-header">
      <slot name="header"></slot>
    </header>
    <main class="page-layout-main">
      <slot :mainHeight="mainHeight"></slot>
    </main>
    <footer v-if="isFooter" :class="{
      'page-layout-footer': true,
      'page-layout-footer-right': footerDirection === 'right',
      'page-layout-footer-left': footerDirection === 'left'
      }">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import { toRefs, reactive, nextTick, onMounted } from 'vue'
import config from '@/config'

export default {
  props: {
    isFooter: {
      default: true,
      type: Boolean
    },
    footerDirection: {
      default: 'right',
      type: String
    }
  },
  setup(props) {
    const state = reactive({
      mainHeight: 0
    })

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
      layoutMain.setAttribute(
          'style',
          `height: calc(100% - ${layoutHeader.offsetHeight + layoutHeaderMarginBottom + (props.isFooter ? layoutFooter.offsetHeight : 0)}px)`
      )
      state.mainHeight = layoutMain.offsetHeight
    }

    return { ...toRefs(state) }
  }
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
