<template>
  <div class="table">
    <cv-page-layout :isHeader="false" :isFooter="false">
      <template #default="scope">
        <cv-table :area-height="scope.mainHeight" :data="vehicleData" :header-list="headerList"></cv-table>
      </template>
    </cv-page-layout>
  </div>
</template>

<script setup>
import { reactive, h } from 'vue'
import CvTable from '@com/CvTable'
import { ElTag, ElProgress } from 'element-plus'

const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]
const headerList = reactive([
  {
    type: 'selection',
    width: 50
  },
  {
    label: 'ID',
    prop: 'id'
  },
  {
    label: 'VIN',
    prop: 'vin'
  },
  {
    label: '类型',
    prop: 'type',
    default: ({ row, column, $index }) => {
      if ($index !== -1 && row.type === 0) return h(ElTag, { type: 'success' }, () => '油动')
      if ($index !== -1 && row.type === 1) return h(ElTag, { type: 'warning' }, () => '混合动力')
      if ($index !== -1 && row.type === 2) return h(ElTag, { type: 'info' }, () => '纯电动')
    }
  },
  {
    label: '防冻液',
    prop: 'antifreezing',
    default: ({ row, column, $index }) => {
      if ($index !== -1) return h(ElProgress, { percentage: row.antifreezing, color: customColors })
    }
  },
  {
    label: '车牌',
    prop: 'carNum'
  },
  {
    label: '地址',
    prop: 'address',
    width: 300
  }
])
const vehicleData = reactive([
  {
    id: 1000,
    type: 0,
    order: 'IO20000000',
    vin: 'AUET100000000000000',
    carNum: '京A00000',
    antifreezing: 92,
    address: '北京市海淀区中关村大街1号'
  },
  {
    id: 1001,
    type: 2,
    order: 'IO20000001',
    vin: 'AUET100000000000001',
    carNum: '京A00001',
    antifreezing: 48,
    address: '北京市海淀区颐和园路4号'
  },
  {
    id: 1002,
    type: 1,
    order: 'IO20000002',
    vin: 'AUET100000000000002',
    carNum: '京A00002',
    antifreezing: 60,
    address: '北京市顺义区石门东路29号怡和家苑2号楼底商复制粘贴4S店'
  },
  {
    id: 1003,
    type: 1,
    order: 'IO20000003',
    vin: 'AUET100000000000003',
    carNum: '京A00003',
    antifreezing: 30,
    address: '北京市昌平区政府街30号复制粘贴旗舰店'
  },
  {
    id: 1004,
    type: 0,
    order: 'IO20000004',
    vin: 'AUET100000000000004',
    carNum: '京A00004',
    antifreezing: 16,
    address: '北京市昌平区八达岭路1号'
  },
  {
    id: 1005,
    type: 0,
    order: 'IO20000005',
    vin: 'AUET100000000000005',
    carNum: '京A00005',
    antifreezing: 81,
    address: '北京市丰台区宛平西路20号'
  },
  {
    id: 1006,
    type: 0,
    order: 'IO20000006',
    vin: 'AUET100000000000006',
    carNum: '京A00006',
    antifreezing: 100,
    address: '北京市东城区金鱼胡同2号院3号楼102（复制粘贴杂货店）'
  }
])
</script>

<style scoped lang="scss">
.table {
  height: 100%;
}
</style>
