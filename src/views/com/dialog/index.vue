<template>
  <el-row class="mb-4">
    <el-button @click="openBasicDialog">初始弹窗</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
  <cv-dialog title="初始弹窗" width="30%" draggable @close="basicDialogStatus = false" v-model="basicDialogStatus">
    <el-form :model="formData" label-position="left" label-width="80px">
      <el-form-item label="VIN">
        <el-input v-model="formData.vin" />
      </el-form-item>
      <el-form-item label="车牌">
        <el-input v-model="formData.carNum" />
      </el-form-item>
      <el-form-item label="终端号">
        <el-input v-model="formData.terminalNum" />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <div class="footer">
        <el-button type="info">{{ $t('reset') }}</el-button>
        <el-button type="primary">{{ $t('submit') }}</el-button>
      </div>
    </template>
  </cv-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import CvDialog from '@com/CvDialog'

const basicDialogStatus = ref(false)
const formData = reactive({
  vin: '',
  carNum: '',
  terminalNum: ''
})

const openBasicDialog = () => {
  basicDialogStatus.value = !basicDialogStatus.value
}
</script>

<style scoped lang="scss">
</style>
