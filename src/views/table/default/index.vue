<template>
  <div class="table-default">
    <cv-page-layout footer-direction="right">
      <template #header>
        <el-button type="primary" :icon="Plus" @clcik="editAction(0)">新增</el-button>
        <el-button type="warning" :icon="Edit" @click="editAction(1)">编辑</el-button>
        <el-button type="danger" :icon="Delete" @click="delAction">删除</el-button>
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
            <el-empty ref="tableEmpty" :description="tableEmptyDes" :image-size="100"></el-empty>
          </template>
          <el-table-column
            type="index"
            label="#"
            align="center">
          </el-table-column>
          <el-table-column
            prop="vin"
            label="VIN"
            align="center">
          </el-table-column>
          <el-table-column
            prop="carNum"
            width="150"
            label="车牌"
            align="center">
          </el-table-column>
          <el-table-column
            prop="terminal"
            width="150"
            label="终端号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="address"
            show-overflow-tooltip
            label="地址"
            align="center">
          </el-table-column>
          <el-table-column
            prop="customerName"
            label="客户"
            align="center">
          </el-table-column>
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
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { crudHooks } from '@/hooks/crud'
import { Delete, Edit, Download, Search, Plus, Upload, Refresh } from '@element-plus/icons-vue'

const requestType = reactive({
  add: 'addVehicle',
  edit: 'editVehicle',
  del: 'deleteVehicle',
  list: 'getVehicleList'
})

const {
  tableData,
  pageData,
  queryForm,
  pageTotal,
  tableEmptyDes,
  tableLoading,
  tableLoadingText,
  tableSelectionChange,
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
.table-default {
  height: 100%;
}
</style>
