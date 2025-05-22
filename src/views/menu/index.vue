<template>
  <div class="menu cv-wrapper">
    <cv-page-layout :is-footer="false">
      <template #header>
        <el-button type="primary" :icon="Plus" @click="editAction(0)">{{ $t('add') }}</el-button>
        <el-button type="primary" :icon="Search" @click="queryAction">{{ $t('query') }}</el-button>
        <el-button type="primary" :icon="Refresh" @click="resetAction">{{ $t('reset') }}</el-button>
      </template>
      <template #default="scope">
        <el-table
            stripe
            border
            row-key="uuid"
            :data="parentMenuList"
            v-loading="tableLoading"
            element-loading-text="加载中..."
            :height="scope.mainHeight">
          <el-table-column prop="menuName" label="菜单名"></el-table-column>
          <el-table-column prop="routeAddress" label="路由地址" align="center"></el-table-column>
          <el-table-column prop="componentName" label="组件名" align="center"></el-table-column>
          <el-table-column prop="componentUrl" label="组件路径" align="center"></el-table-column>
          <el-table-column prop="sort" label="序号" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button link type="primary" @click="editAction(0, scope)" size="small">{{ $t('add') }}</el-button>
              <el-button link type="success" @click="editAction(1, scope)" size="small">{{ $t('edit') }}</el-button>
              <el-popconfirm title="确认需要删除吗？" v-if="!scope.row.children" hide-icon @confirm="delAction(scope)">
                <template #reference>
                  <el-button link type="danger" size="small">{{ $t('delete') }}</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </cv-page-layout>
  </div>
  <EditCom
    :type="editType"
    v-if="basicDialogStatus"
    :status="basicDialogStatus"
    :menuList="parentMenuList"
    :parentData="formData"
    @submit="submitAction"
    @close="closeAction" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Plus, Refresh } from '@element-plus/icons-vue'
import EditCom from './modules/Edit.vue'

const parentMenuList = ref([])
const tableLoading = ref(false)
const dialogLoading = ref(false)
const basicDialogStatus = ref(false)
const editType = ref(0)
const formData = ref({
  type: 1, // 类型
  sort: 1, // 排序
  uuid: '', // 子节点ID
  parentId: '', // 父节点
  menuName: '', // 菜单名
  btnSign: '', // 按钮标记
  menuIcon: '', // 菜单图标
  menuStatus: 1, // 菜单状态
  showStatus: 1, // 显示状态
  componentName: '', // 组件名
  componentUrl: '', // 组件路径
  routeAddress: '', // 路由地址
  routeParams: '', // 路由参数
  keep: 1, // 是否缓存
  affix: 0, // 是否固定
})

onMounted(() => initBasicData())

const initBasicData = () => {
  const menuStringify = localStorage.getItem('CV_SOURCE_MENU_DATA')
  menuTree(menuStringify ? JSON.parse(menuStringify) : [])
}

const menuTree = (menu) => {
  const data = $bu.buildTree(menu, { rootParentIdValues: '', idField: 'uuid' })
  parentMenuList.value = data
}

const delAction = (scope) => {
  const menuStringify = localStorage.getItem('CV_SOURCE_MENU_DATA')
  const menu = menuStringify ? JSON.parse(menuStringify) : []
  if (menu && menu.length) {
    const menuIndex = menu.findIndex(itme => itme.uuid === scope.row.uuid)
    if (menuIndex !== -1) {
      menu.splice(menuIndex, 1)
      ElMessage.success('删除成功')
      localStorage.setItem('CV_SOURCE_MENU_DATA', JSON.stringify(menu))
      menuTree(menu)
    }
  }
}
const queryAction = () => initBasicData()

const resetAction = () => initBasicData()

const closeAction = () => {
  basicDialogStatus.value = !basicDialogStatus.value
}

const editAction = (type, scope) => {
  editType.value = type
  basicDialogStatus.value = !basicDialogStatus.value
  if (scope && type === 1) {
    console.log(scope.row)
    const { type, sort, uuid, parentId, menuName, btnSign, menuIcon, menuStatus, showStatus, componentName, componentUrl, routeAddress, routeParams, keep, affix } = scope.row
    formData.value = { type, sort, uuid, parentId, menuName, btnSign, menuIcon, menuStatus, showStatus, componentName, componentUrl, routeAddress, routeParams, keep, affix }
  } else if (scope && type === 0) {
    formData.value = {
      type: 1, // 类型
      sort: 1, // 排序
      uuid: '', // 子节点ID
      parentId: scope.row.uuid, // 父节点
      menuName: '', // 菜单名
      btnSign: '', // 按钮标记
      menuIcon: '', // 菜单图标
      menuStatus: 1, // 菜单状态
      showStatus: 1, // 显示状态
      componentName: '', // 组件名
      componentUrl: '', // 组件路径
      routeAddress: '', // 路由地址
      routeParams: '', // 路由参数
      keep: 1, // 是否缓存
      affix: 0, // 是否固定
    }
  } else {
    formData.value = {
      type: 1, // 类型
      sort: 1, // 排序
      uuid: '', // 子节点ID
      parentId: '', // 父节点
      menuName: '', // 菜单名
      btnSign: '', // 按钮标记
      menuIcon: '', // 菜单图标
      menuStatus: 1, // 菜单状态
      showStatus: 1, // 显示状态
      componentName: '', // 组件名
      componentUrl: '', // 组件路径
      routeAddress: '', // 路由地址
      routeParams: '', // 路由参数
      keep: 1, // 是否缓存
      affix: 0, // 是否固定
    }
  }
}

const submitAction = (menu) => {
  dialogLoading.value = !basicDialogStatus.value
  localStorage.setItem('CV_SOURCE_MENU_DATA', JSON.stringify(menu))
  ElMessage.success(!editType.value ? '添加成功' : '编辑成功')
  setTimeout(() => {
    basicDialogStatus.value = !basicDialogStatus.value
    dialogLoading.value = !dialogLoading.value
    menuTree(menu)
  }, 1800)
}
</script>
