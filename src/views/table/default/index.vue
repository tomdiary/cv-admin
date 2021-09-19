<template>
  <div class="table-default">
    <page-layout footer-direction="right">
      <template #header>
        <el-button type="primary">主要按钮</el-button>
      </template>
      <template #default="scope">
        <el-table
            stripe
            border
            :data="tableData"
            :height="scope.mainHeight"
            style="width: 100%">
          <template #empty>
            <el-empty ref="tableEmpty" :image-size="100"></el-empty>
          </template>
          <el-table-column type="index" label="#" align="center"></el-table-column>
          <el-table-column prop="date" label="日期" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="address" label="地址" align="center"></el-table-column>
        </el-table>
      </template>
      <template #footer>
        <el-pagination background layout="prev, pager, next" :total="pageTotal"></el-pagination>
      </template>
    </page-layout>
  </div>
</template>

<script>
import { toRefs, reactive, onMounted } from 'vue'
import PageLayout from '@/layout/PageLayout'

export default {
  components: {
    PageLayout
  },
  setup(props) {
    const state = reactive({
      pageTotal: 232,
      tableData: []
    })

    onMounted(() => {
      baseInitData()
    })

    const baseInitData = () => {
      for(let i = 0; i < 26; i++) {
        state.tableData.push({
          date: '2021-10-05 12:10:42',
          name: '柒比叁',
          address: '江苏省南京市雨花台区'
        })
      }
    }

    return {
      ...toRefs(state),
      baseInitData
    }
  }
}
</script>

<style scoped lang="scss">
.table-default {
  height: 100%;
}
</style>
