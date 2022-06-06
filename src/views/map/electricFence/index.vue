<template>
  <div class="electric-fence">
    <cv-page-layout footer-direction="right">
      <template #header>
        <el-button type="primary" :icon="Plus" @click="editAction(0)">新增</el-button>
        <el-button type="warning" :disabled="actionStatusDisabled(0)" :icon="Edit" @click="editAction(1)">编辑</el-button>
        <el-button type="danger" :disabled="actionStatusDisabled(1)" :icon="Delete" @click="delAction">删除</el-button>
        <el-button type="primary" :icon="Search" @click="queryAction">查询</el-button>
        <el-button type="info" :icon="Refresh" @click="resetAction">重置</el-button>
        <el-button type="primary" :icon="Download" @click="exportAction">导出</el-button>
        <el-button type="primary" :icon="Upload" @click="importAction">导入</el-button>
      </template>
      <template #default="scope">
        <el-table
            stripe
            border
            :data="tableData"
            v-loading="tableLoading"
            :element-loading-text="tableLoadingText"
            @selection-change="tableSelectionChange"
            :height="scope.mainHeight">
          <template #empty>
            <el-empty ref="tableEmpty" :description="tableEmptyDes" :image-size="100" />
          </template>
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column type="index" label="#" align="center" />
          <el-table-column prop="numbering" label="围栏编号" align="center" />
          <el-table-column label="围栏名称" align="center">
            <template #default="tableScope">{{ tableScope.row.fenceData.name }}</template>
          </el-table-column>
          <el-table-column prop="terminal" width="150" label="终端号" align="center" />
          <el-table-column prop="orderNumber" width="200" label="订单号" align="center" />
          <el-table-column prop="mileage" width="150" label="里程" align="center" />
          <el-table-column prop="createTime" label="创建时间" align="center" />
        </el-table>
      </template>
      <template #footer>
        <el-pagination
          background
          :disabled="tableLoading"
          @size-change="pageSizeChange(requestType.list, $event)"
          @current-change="pageCurrentChange(requestType.list, $event)"
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="pageData.page"
          :page-size="pageData.pageSize"
          :total="pageTotal">
        </el-pagination>
      </template>
    </cv-page-layout>
    <el-dialog
      v-model="dialogCrudStatus"
      :title="`${dialogCrudTitle}电子围栏`"
      destroy-on-close
      center
      width="50%">
      <fence-map />
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { crudHooks } from '@/hooks/crud'
import { Delete, Edit, Download, Search, Plus, Upload, Refresh } from '@element-plus/icons-vue'
import FenceMap from './FenceMap'

const requestType = reactive({
  add: 'addElectricFence',
  edit: 'editElectricFence',
  del: 'deleteElectricFence',
  list: 'getElectricFenceList'
})

const {
  tableData,
  pageData,
  pageTotal,
  tableEmptyDes,
  tableLoading,
  tableLoadingText,
  dialogCrudStatus,
  dialogCrudTitle,
  tableSelectionChange,
  actionStatusDisabled,
  pageCurrentChange,
  pageSizeChange,
  queryAction,
  resetAction,
  editAction,
  delAction,
  importAction,
  exportAction
} = crudHooks({ requestType })
</script>

<style scoped lang="scss">
.electric-fence {
  height: 100%;
}
</style>
