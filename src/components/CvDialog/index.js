import { defineComponent, h, watch, nextTick, ref, onMounted } from 'vue'
import { ElDialog } from 'element-plus'
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
    showClose: {
      default: false,
      type: Boolean
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const dialogTop = ref(0)

    const onWindowResize = () => {
      const bodyHeight = document.body.offsetHeight
      const elDialogHeight = document.querySelector('.el-dialog').offsetHeight
      dialogTop.value = (bodyHeight - elDialogHeight) / 2
    }

    const headerSlots = h('div', {
      class: 'cv-dialog-header',
      innerHTML: props.title
    })

    onMounted(() => {
      window.addEventListener('resize', onWindowResize)
    })

    watch(() => props.modelValue, (newVal, oldVal) => {
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
        slots.default && slots.default()
      ],
      header: () => headerSlots,
      footer: slots.footer && slots.footer()
    })
  }
})
