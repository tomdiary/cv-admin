<template>
  <view class="not-found">
    <div class="title">抱歉!</div>
    <div class="vice-title">当前页面不存在...</div>
    <p class="description">请检查您输入的网址是否正确，或点击下面的按钮返回首页。</p>
    <el-button @click="onBack">返回首页</el-button>
  </view>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const onBack = () => router.push({ path: '/' })
</script>

<style scoped lang="scss">
.not-found {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
