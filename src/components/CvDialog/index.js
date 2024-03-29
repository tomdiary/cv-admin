import { defineComponent, h, watch, nextTick, ref, onMounted } from 'vue'
import { ElDialog, ElIcon, ElScrollbar } from 'element-plus'
import { FullScreen, Close } from '@element-plus/icons-vue'
import './index.scss'

export default defineComponent({
  name: 'CvDialog',
  props: {
    ...ElDialog.props, // https://element-plus.org/zh-CN/component/dialog.html#%E5%B1%9E%E6%80%A7
    title: {
      default: 'cv-admin',
      type: String
    },
    modelValue: {
      default: false,
      type: Boolean
    },
    // Dialog 的自定义类名
    customClass: {
      default: 'cv-dialog',
      type: String
    },
    class: {
      default: 'cv-dialog',
      type: String
    },
    showClose: {
      default: false,
      type: Boolean
    },
    openDelay: {
      default: 100,
      type: Number
    },
    // 是否开启全屏
    isFullscreen: {
      default: false,
      type: Boolean
    },
    closeDelay: {
      default: 150,
      type: Number
    }
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit, slots }) {
    const dialogTop = ref(0)

    const onWindowResize = () => {
      const bodyHeight = document.body.offsetHeight
      const elDialogHeight = document.querySelector('.el-dialog').offsetHeight
      dialogTop.value = (bodyHeight - elDialogHeight) / 2
    }

    const headerSlots = h('div', {
      class: 'cv-dialog-header'
    }, [
      headerContainer({ emit, slots, props }),
      headerAction({ emit, slots, props })
    ])

    onMounted(() => {
      window.addEventListener('resize', onWindowResize)
    })

    watch(() => props.modelValue, newVal => {
      if (newVal) nextTick(() => onWindowResize())
    })

    return () => h(ElDialog, {
      // 待优化，可改为批量导入 props
      top: `${dialogTop.value}px`, // Dialog CSS 中的 margin-top 值
      modelValue: props.modelValue, // 是否显示 Dialog
      title: props.title, // Dialog 对话框 Dialog 的标题
      width: props.width, // Dialog 的宽度
      draggable: props.draggable, // 为 Dialog 启用可拖拽功能
      customClass: props.customClass, // Dialog 的自定义类名
      showClose: props.showClose, // 是否显示关闭按钮
      appendToBody: props.appendToBody, // Dialog 自身是否插入至 body 元素上。
      'onUpdate:modelValue': (value) => emit('update:modelValue', value)
    }, {
      default: () => [
        defaultWrapper({ emit, slots, props })
      ],
      header: () => headerSlots,
      footer: slots.footer && slots.footer()
    })
  }
})

const defaultWrapper = ({ emit, slots, props }) => {
  const clientHeight = document.body.clientHeight
  const dialogTotalHei = clientHeight - (clientHeight * 0.2)
  const maxHeight = dialogTotalHei - 59 * 2

  return h(ElScrollbar,
    {
      maxHeight,
      viewStyle: {
        padding: '20px 30px'
      }
    },
    [
      slots.default && slots.default()
    ]
  )
}

const headerContainer = ({ emit, slots, props }) => h('div', {
  class: 'header-title',
  innerHTML: props.title
})

const headerAction = ({ emit, slots, props }) => h('div', {
    class: 'header-action'
  }, [
    props.isFullscreen && h('span', {
      class: 'action-icon'
    }, [
      h(ElIcon,
        {
          color: '#606266',
          size: 18
        },
        [
          h(FullScreen)
        ])
    ]),
    h('span', {
      class: 'action-icon',
      onClick: () => emit('close')
    }, [
      h(ElIcon, {
          color: '#606266',
          size: 20
        },
        [
          h(Close)
        ])
    ])
  ]
)
