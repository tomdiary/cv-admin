import { h, ref, onMounted, nextTick } from 'vue'
import { ElScrollbar } from 'element-plus'
import config from '@/config'
import useLayoutStore from '@/store/layout'
import './index.scss'

export default {
  name: 'CvLayout',
  props: {
    // 是否需要头部操作栏
    isHeader: {
      default: true,
      type: Boolean
    },
    // 是否需要底部操作栏
    isFooter: {
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
  },
  setup(props, { slots }) {
    const mainHeight = ref(0)
    const layoutState = useLayoutStore()
    const { header, main: _defaultSlot, footer } = slots

    const headerRender = h('header', {
      class: 'cv-layout-header'
    }, header && header())

    const mainRender = h('main', {
      class: 'cv-layout-main'
    }, _defaultSlot && _defaultSlot({ height: mainHeight }))

    const mainScrollbar = h(ElScrollbar, [h(mainRender)])

    const footerRender = h('footer', {
      class: {
        'cv-layout-footer': true,
        'cv-layout-footer-right': props.footerDirection === 'right',
        'cv-layout-footer-left': props.footerDirection === 'left'
      }
    }, footer && footer())

    const calculateSize = () => {
      const layoutHeaderMarginBottom = config.interval
      const layoutHeader = document.querySelector('.cv-layout-header')
      const layoutMain = document.querySelector('.cv-layout-main')
      const elScrollbar = document.querySelector('.cv-layout .el-scrollbar')
      const layoutFooter = document.querySelector('.cv-layout-footer')
      const calculateHooterHei = props.isHeader ? layoutHeader.offsetHeight + layoutHeaderMarginBottom : 0
      const calculateFooterHei = props.isFooter ? layoutFooter.offsetHeight : 0
      layoutMain.setAttribute(
        'style',
        `height: calc(100% - ${calculateHooterHei + calculateFooterHei}px)`
      )
      elScrollbar.setAttribute(
        'style',
        `height: calc(100% - ${calculateHooterHei + calculateFooterHei}px)`
      )
      mainHeight.value = layoutMain.offsetHeight
    }

    layoutState.$subscribe((newVal, oldVal) => {
      if (['themeSize'].includes(newVal.events.key)) calculateSize()
    }, { detached: true })

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

    const layout = h('div', {
      class: 'cv-layout'
    }, [
      props.isHeader ? headerRender : null,
      props.isScrollY ? mainScrollbar : mainRender,
      props.isFooter ? footerRender : null
    ])
    return () => layout
  }
}
