<template>
  <div class="table-merge">
    <page-layout :is-footer="false">
      <template #header>
        <el-button type="primary">主要按钮</el-button>
      </template>
      <template #default="scope">
        <el-table
            stripe
            border
            :data="tableData"
            :height="scope.mainHeight"
            :span-method="tableSpanMethod"
            style="width: 100%">
          <template #empty>
            <el-empty ref="tableEmpty" :image-size="100"></el-empty>
          </template>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="name" label="名称" align="center"></el-table-column>
          <el-table-column prop="code" label="编号" align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        </el-table>
      </template>
    </page-layout>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import PageLayout from '@lay/PageLayout'

const state = reactive({
  rowList: [],
  spanArr: [],
  position: 0,
  tableData: [
    {
      id: 1,
      name: '亚马逊',
      code: 'MZ2424O24P2423',
      email: '345345@amazon.com',
      phone: '+86-999-10928942'
    },
    {
      id: 2,
      name: '亚马逊',
      code: 'MZ2424O24P2423',
      email: '235354534@amazon.com',
      phone: '+86-999-10929242'
    },
    {
      id: 3,
      name: '亚马逊',
      code: 'MZ2424O24P2423',
      email: '24342523@amazon.com',
      phone: '+86-999-19823942'
    },
    {
      id: 4,
      name: '苹果',
      code: 'OZ2421824JA423',
      email: '235235345@iclod.com',
      phone: '+86-999-19829842'
    },
    {
      id: 5,
      name: '微软',
      code: 'EW222RT424Z243',
      email: 'mkhu23fsa@microsoft.com',
      phone: '+86-999-19837298'
    },
    {
      id: 6,
      name: '微软',
      code: 'EW222RT424Z243',
      email: 'mnzc23e@microsoft.com',
      phone: '+86-999-98278272'
    }
  ]
})
const rowList = ref([])
const spanArr = ref([])
const position = ref(0)
const tableData = ref([
  {
    id: 1,
    name: '亚马逊',
    code: 'MZ2424O24P2423',
    email: '345345@amazon.com',
    phone: '+86-999-10928942'
  },
  {
    id: 2,
    name: '亚马逊',
    code: 'MZ2424O24P2423',
    email: '235354534@amazon.com',
    phone: '+86-999-10929242'
  },
  {
    id: 3,
    name: '亚马逊',
    code: 'MZ2424O24P2423',
    email: '24342523@amazon.com',
    phone: '+86-999-19823942'
  },
  {
    id: 4,
    name: '苹果',
    code: 'OZ2421824JA423',
    email: '235235345@iclod.com',
    phone: '+86-999-19829842'
  },
  {
    id: 5,
    name: '微软',
    code: 'EW222RT424Z243',
    email: 'mkhu23fsa@microsoft.com',
    phone: '+86-999-19837298'
  },
  {
    id: 6,
    name: '微软',
    code: 'EW222RT424Z243',
    email: 'mnzc23e@microsoft.com',
    phone: '+86-999-98278272'
  }
])

onMounted(() => {
  baseInitData()
})

const baseInitData = () => {
  state.tableData.forEach((item, index) => {
    if (index === 0) {
      state.spanArr.push(1)
      state.position = 0
    } else if (state.tableData[index].code === state.tableData[index - 1].code) {
      state.spanArr[state.position] += 1
      state.spanArr.push(0)
    } else {
      state.spanArr.push(1)
      state.position = index
    }
  })
}

const tableSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (columnIndex < 3) {
    const _row = state.spanArr[rowIndex]
    const _col = _row > 0 ? 1 : 0
    return {
      rowspan: _row,
      colspan: _col
    }
  }
}
</script>

<style scoped lang="scss">
.table-merge {
  height: 100%;
}
</style>
