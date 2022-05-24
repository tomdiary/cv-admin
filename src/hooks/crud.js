import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

export const crudHooks = ({ requestType }) => {
  const pageTotal = ref(0) // 总条数
  const tableLoadingText = ref('拼命加载中') // 表格加载文字
  const tableEmptyDes = ref('暂无数据') // 表格空数据描述
  const fullscreenLoading = ref(false) // 提交按钮状态
  const dialogCrudStatus = ref(false) // dialog新增/编辑状态
  const tableLoading = ref(false) // 表格loadding
  const tableSourceData = ref([]) // 自定义分页数据源
  const multipleSelection = ref([]) // 表格多选
  const tableData = ref([]) // 数据源
  const pageData = ref({
    page: 1,
    pageSize: 10
  }) // 分页
  const queryForm = ref({}) // 查询参数

  onMounted(() => {
    initBaseData(requestType.list, { ...queryForm.value, ...pageData.value })
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

  const editAction = () => {}

  const submitData = (request) => {}

  const queryAction = () => {
  }

  const resetAction = () => {
    queryForm.value = {}
    pageData.value = { page: 1, pageSize: 10 }
    initBaseData(requestType.list, { ...queryForm.value, ...pageData.value })
  }

  const exportAction = () => {}

  const importAction = () => {}

  const pageCurrentChange = (request, page) => {
    pageData.value.page = page
    initBaseData(request, { ...queryForm.value, ...pageData.value })
  }

  const pageSizeChange = (request, pageSize) => {
    pageData.value.page = 1
    pageData.value.pageSize = pageSize
    initBaseData(request, { ...queryForm.value, ...pageData.value })
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
    queryAction,
    resetAction,
    editAction,
    delAction,
    importAction,
    exportAction,
    pageSizeChange,
    pageCurrentChange,
    tableSelectionChange
  }
}
