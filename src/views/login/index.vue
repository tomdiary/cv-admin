<template>
  <div class="login">
    <div class="login-box">
      <div class="core-login">
        <h2 class="login-title">用户登录</h2>
        <el-form label-position="left" ref="formRef" :model="formData" :rules="formRules" size="default">
          <el-form-item prop="username">
            <el-input class="username" v-model="formData.username" placeholder="请输入用户名">
              <template #prefix>
                <el-icon size="18" class="el-input__icon"><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="password" show-password v-model="formData.password" placeholder="请输入密码">
              <template #prefix>
                <el-icon size="18" class="el-input__icon"><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="formData.isPasswd">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Lock, User } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'
import md5 from 'md5'

const router = useRouter()
const store = useUserStore()
const formData = reactive({
  username: 'admin',
  password: '123456',
  isPasswd: false
})
const formRef = ref(null)
const loading = ref(false)
const formRules = reactive({
  username: [
    { required: true, message: '请填写账号', trigger: 'blur' },
    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请填写密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
  ]
})

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return false
    loading.value = true
    const userInfo = {
      username: formData.username,
      password: md5(formData.password)
    }
    store.atUserLogin(userInfo).then(res => {
      if (res.code === 200) {
        setInterval(() => {
          loading.value = false
          router.push({ path: '/' })
        }, 2500)
      } else {
        setInterval(() => (loading.value = false), 1500)
      }
    })
  })
}
</script>

<style scoped lang="scss">
::v-deep(.el-form) {

  .username, .password, .code {

    .el-input__wrapper {
      padding: 8px 12px;
      background-color: #293443;
      border: 1px solid #3E4957;
      box-shadow: none;

      .el-input__inner, .el-icon {
        color: #d3d3e8;
      }
    }
  }

  .el-checkbox {
    display: flex;
    align-items: center;

    .el-checkbox__input {

      .el-checkbox__inner {
        border: 1px solid $main-color;
        background-color: transparent;
      }
    }

    .el-checkbox__label {
      color: #FFF !important;
    }
  }

  .el-button {
    width: 100%;
    height: 46px;
    border-color: $main-color;
    background-color: $main-color !important;
    letter-spacing: 2px;
  }
}

.login {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #2D3A4B;

  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 534px;
    height: 490px;
    z-index: 1000;

    .core-login {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 50px 40px;
      z-index: 2000;

      .login-title {
        margin-bottom: 50px;
        color: #FFFFFF;
        font-size: 32px;
        text-align: center;
        letter-spacing: 6px;
      }

      .code {
        display: flex;
        align-items: center;
        justify-content: center;

        .code-img {
          width: 218px;
          height: 56px;
          margin-left: 16px;
          background-color: #F6F9F7;
        }
      }
    }
  }
}
</style>
