<template>
  <div class="menu-edit">
    <cv-dialog
      title="菜单管理"
      width="40%"
      draggable
      @close="$emit('close')"
      v-model="dialogStatus">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="父节点" prop="parentId">
          <el-tree-select
            v-model="formData.parentId"
            style="width: 100%;"
            :render-after-expand="false"
            show-checkbox
            check-strictly
            :data="menuList"
            placeholder="请选择父节点">
          </el-tree-select>
        </el-form-item>
        <el-row :gutter="20" style="margin-bottom: 18px;">
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-select v-model="formData.type" style="width: 100%;" placeholder="请选择类型">
                <el-option
                  v-for="item in menuTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名" prop="menuName">
              <el-input v-model="formData.menuName" placeholder="请填写菜单名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="formData.type === 6" style="margin-bottom: 18px;">
          <el-col :span="12">
            <el-form-item label="按钮类型" prop="btnType">
              <el-select v-model="formData.btnType" clearable @change="btnTypeChange" style="width: 100%;" placeholder="请选择按钮类型">
                <el-option
                  v-for="item in btnTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="按钮标记" prop="btnSign">
              <el-input style="width: 100%;" v-model="formData.btnSign" placeholder="请选择按钮类型" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 18px;">
          <el-col :span="12">
            <el-form-item label="菜单图标" prop="menuIcon">
              <el-input v-model="formData.menuIcon" :disabled="[1, 4, 6].includes(formData.type)" placeholder="请填写菜单图标" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input-number style="width: 100%;" v-model="formData.sort" controls-position="right" :min="1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 18px;">
          <el-col :span="12">
            <el-form-item label="组件名" prop="componentName">
              <el-input v-model="formData.componentName" :disabled="[1, 4, 6].includes(formData.type)" placeholder="请填写组件名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组件路径" prop="componentUrl">
              <el-input v-model="formData.componentUrl" :disabled="[1, 4, 6].includes(formData.type)" placeholder="请填写组件路径" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 18px;">
          <el-col :span="12">
            <el-form-item label="路由地址" prop="routeAddress">
              <el-input v-model="formData.routeAddress" :disabled="[6].includes(formData.type)" placeholder="请填写路由地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路由参数" prop="routeParams">
              <el-input v-model="formData.routeParams" :disabled="[1, 4, 6].includes(formData.type)" placeholder="请填写路由参数" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 18px;">
          <el-col :span="12">
            <el-form-item label="菜单状态" prop="menuStatus">
              <el-radio-group v-model="formData.menuStatus" :disabled="[6].includes(formData.type)">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示状态" prop="showStatus">
              <el-radio-group v-model="formData.showStatus" :disabled="[1, 4, 6].includes(formData.type)">
                <el-radio :label="1">显示</el-radio>
                <el-radio :label="0">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 18px;">
          <el-col :span="12">
            <el-form-item label="是否缓存" prop="keep">
              <el-radio-group v-model="formData.keep" :disabled="[1, 4, 6].includes(formData.type)">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否固定" prop="affix">
              <el-radio-group v-model="formData.affix" :disabled="[1, 4, 6].includes(formData.type)">
                <el-radio :label="1">显示</el-radio>
                <el-radio :label="0">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template v-slot:footer>
        <div class="footer">
          <el-button type="primary">{{ $t('reset') }}</el-button>
          <el-button type="primary" @click="onSubmit">{{ $t('submit') }}</el-button>
        </div>
      </template>
    </cv-dialog>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { v5 as uuidv5 } from 'uuid'
import moment from 'moment'
import CvDialog from '@com/CvDialog'
import { menuTypeList, btnTypeList } from '@/config/dataSource'

const emit = defineEmits(['submit', 'reset', 'close'])
const props = defineProps({
  type: {
    default: 0,
    type: Number
  },
  status: {
    default: false,
    type: Boolean
  },
  menuList: {
    default: () => {
      return []
    },
    type: Array
  },
  parentData: {
    default: () => {
      return {}
    },
    type: [Object]
  }
})
const dialogStatus = computed(() => props.status)
console.log(props.parentData)
let formData = reactive({
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
  ...props.parentData
})

const btnTypeChange = (event) => {
  if (event) {
    const item = btnTypeList.find(it => it.value === event)
    formData.menuName = item.label
    formData.btnSign = item.value
  } else {
    formData.menuName = ''
    formData.btnSign = ''
  }
}

const onSubmit = () => {
  if (!props.type) formData.uuid = uuidv5(String(moment().valueOf()), uuidv5.URL)
  const menuStringify = localStorage.getItem('CV_SOURCE_MENU_DATA')
  const menu = menuStringify ? JSON.parse(menuStringify) : []
  menu.push(formData)
  emit('submit', menu)
}

</script>
