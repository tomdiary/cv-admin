import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

export const crudHooks = ({ requestType }) => {
  const pageTotal = ref(0) // 总条数
  const tableLoadingText = ref('拼命加载中') // 表格加载文字
  const tableEmptyDes = ref('暂无数据') // 表格空数据描述
  // const fullscreenLoading = ref(false) // 提交按钮状态
  const dialogCrudTitle = ref('添加/标记') // dialog标题
  const dialogCrudStatus = ref(false) // dialog新增/编辑状态
  const tableLoading = ref(false) // 表格 Loading
  // const tableSourceData = ref([]) // 自定义分页数据源
  const multipleSelection = ref([]) // 表格多选
  const tableData = ref([]) // 数据源
  const pageData = ref({
    page: 1,
    pageSize: 10
  }) // 分页
  const queryForm = ref({}) // 查询参数

  onMounted(async () => {
    await initBaseData(requestType.list, { ...queryForm.value, ...pageData.value })
  })

  const initBaseData = async(request, queryData) => {
    tableLoading.value = true
    const { code, msg, data } = await $api[request](queryData)
    if (code !== 200) {
      tableLoading.value = false
      return ElMessage.warning(msg)
    }
    tableLoading.value = false
    tableData.value = data.data
    pageTotal.value = data.total
  }

  const delAction = () => {}

  const editAction = (type = 1) => {
    dialogCrudStatus.value = true
    dialogCrudTitle.value = type ? '编辑' : '新增'
  }

  // const submitData = (request) => {}

  const queryAction = () => {
  }

  const resetAction = async () => {
    queryForm.value = {}
    pageData.value = { page: 1, pageSize: 10 }
    await initBaseData(requestType.list, {...queryForm.value, ...pageData.value})
   }

  const exportAction = () => {}

  const importAction = () => {}

  const pageCurrentChange = async (request, page) => {
    pageData.value.page = page
    await initBaseData(request, { ...queryForm.value, ...pageData.value })
  }

  const pageSizeChange = async (request, pageSize) => {
    pageData.value.page = 1
    pageData.value.pageSize = pageSize
    await initBaseData(request, { ...queryForm.value, ...pageData.value })
  }

  /**
   * 检测是否符合单选/多选
   * @param {*} type number，0-单选，1-多选
   * @returns Boolean
   */
  const actionStatusDisabled = (type = 0) => {
    return (!type ? multipleSelection.value.length > 1 || !multipleSelection.value.length : !multipleSelection.value.length)
  }

  /**
   * 表格多选
   * @param {*} val [{}, ...]
   */
  const tableSelectionChange = val => (multipleSelection.value = val)

  return {
    tableData,
    pageData,
    queryForm,
    pageTotal,
    initBaseData,
    tableEmptyDes,
    tableLoading,
    tableLoadingText,
    dialogCrudStatus,
    dialogCrudTitle,
    queryAction,
    resetAction,
    editAction,
    delAction,
    importAction,
    exportAction,
    pageSizeChange,
    pageCurrentChange,
    tableSelectionChange,
    actionStatusDisabled
  }
}
