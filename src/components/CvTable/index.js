import {
  h,
  ref,
  reactive,
  onMounted,
  nextTick
} from 'vue'
import {
  ElTable,
  ElTableColumn,
  ElPagination
} from 'element-plus'
import './index.scss'

export default {
  name: 'CvTable',
  props: {
    ...ElTable.props,
    data: {
      default: [],
      type: Array
    },
    areaHeight: {
      default: 0,
      type: [Number, String],
      required: true
    },
    headerList: {
      default: [],
      type: Array
    },
    defaultHeaderConfig: {
      default: () => ({
        align: 'center',
        'show-overflow-tooltip': true
      }),
      type: Object
    }
  },
  emits: [],
  setup(props, { slots, emit }) {

    const tableHeight = ref(0)

    onMounted(() => {
      nextTick(() => {
        setTimeout(() => {
          const { tableHei } = calculateSize({ props })
          tableHeight.value = tableHei
        }, 500)
      })
    })

    window.addEventListener('resize', () => {
      const { tableHei } = calculateSize({ props })
      tableHeight.value = tableHei
    })

    const tableProps = reactive({ ...props, height: tableHeight })

    return () => h(
      'div',
      {
        class: 'cv-table',
        style: {
          height: '100%'
        }
      },
      [
        tableWrapper({ props: tableProps, slots, emit }),
        footerWrapper({ props, slots, emit })
      ]
    )
  }
}

const calculateSize = ({ props }) => {
  const tableFooter = document.querySelector('.cv-table .table-footer')
  const tableHei = props.areaHeight - tableFooter.offsetHeight
  return { tableHei }
}

const footerWrapper = ({ props, slots, emit }) => {
  return h(
    'div',
    {
      class: 'table-footer'
    },
    [
      h(
        ElPagination,
        {
          background: true,
          layout: 'prev, pager, next',
          total: 1000
        }
      )
    ]
  )
}

const tableWrapper = ({ props, slots, emit }) => {
  const { append, default: _defaultSlot, empty } = slots

  const defaultSlot = _defaultSlot && _defaultSlot() || tableDefaultSlot({ props, slots, emit })
  const appendSlot = append && append()
  const emptySlot = empty && empty()

  return h(
    ElTable,
    props,
    {
      append: () => appendSlot,
      empty: () => emptySlot,
      default: () => defaultSlot,
    }
  )
}

const tableDefaultSlot = ({ props, slots, emit }) => {
  return props.headerList.map((item, index) => {
    const { default: _default, header: _header } = item

    return h(
      ElTableColumn,
      {
        ...item,
        ...props.defaultHeaderConfig
      },
      {
        header: event => _header && _header(event) || item.label,
        default: event => _default && _default(event)
      }
    )
  })
}
