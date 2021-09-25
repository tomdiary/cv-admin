<template>
  <div class="login">
    <div class="login-box">
      <div class="decorate-box">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="core-login">
        <h2 class="login-title">用户登录</h2>
        <el-form ref="formRef" :model="formData" size="default">
          <el-form-item>
            <el-input
                class="username"
                v-model="formData.username"
                placeholder="用户名"
                clearable>
              <svg-icon slot="prefix" icon-class="username" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
                class="password"
                show-password
                v-model="formData.password"
                placeholder="密码"
                clearable>
              <svg-icon slot="prefix" icon-class="password" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="code">
              <el-input v-model="formData.code" placeholder="验证码"></el-input>
              <div class="code-img"></div>
            </div>
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

<script>
import { reactive, ref } from 'vue'

export default {
  setup(props) {
    const formData = reactive({
      username: 'admin',
      password: '123456',
      isPasswd: false,
      code: ''
    })
    const loading = ref(false)

    const onSubmit = () => {
      loading.value = true
    }

    return {
      formData,
      loading,
      onSubmit
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep(.el-form) {

  .username, .password, .code {

    .el-input__inner {
      padding: 26px 20px 26px 50px !important;
      color: #FFF !important;
      font-size: 18px !important;
      background-color: transparent !important;
      border: 2px solid #16A3EA;
      border-radius: 0 !important;

      &::-webkit-input-placeholder {
        color: #FFF;
      }
    }

    .el-input__prefix {
      margin-left: 10px;
      display: flex;
      align-items: center;

      .svg-icon {
        color: #FFF;
        font-size: 24px;
      }
    }
  }

  .el-checkbox {
    display: flex;
    align-items: center;

    .el-checkbox__input {

      .el-checkbox__inner {
        width: 20px;
        height: 20px;
        border: 1px solid #16A3EA;
        background-color: transparent;

        &::after {
          width: 6px;
          height: 8px;
          //left: -50%;
          //top: -50%;
          transform-origin: 50% 50%;
        }
      }
    }

    .el-checkbox__label {
      color: #FFF !important;
      font-size: 18px;
    }
  }

  .el-button {
    width: 100%;
    height: 56px;
    border-color: #1F5FFF;
    background-color: #1F5FFF !important;
    font-size: 20px;
    letter-spacing: 2px;
  }

  .code {

    .el-input__inner {
      padding: 26px 20px !important;
    }
  }
}

.login {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: $main-color;

  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 534px;
    height: 562px;
    z-index: 1000;
    border: 2px solid #16A3EA;
    background-color: rgba(13, 127, 205, 0.1);

    .decorate-box {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      z-index: -1;

      span {
        position: absolute;
        width: 38px;
        height: 38px;
      }

      span:nth-child(1) {
        left: -3px;
        top: -3px;
        border-left: 5px solid #16A3EA;
        border-top: 5px solid #16A3EA;
      }

      span:nth-child(2) {
        right: -3px;
        top: -3px;
        border-right: 5px solid #16A3EA;
        border-top: 5px solid #16A3EA;
      }

      span:nth-child(3) {
        left: -3px;
        bottom: -3px;
        border-left: 5px solid #16A3EA;
        border-bottom: 5px solid #16A3EA;
      }

      span:nth-child(4) {
        right: -3px;
        bottom: -3px;
        border-right: 5px solid #16A3EA;
        border-bottom: 5px solid #16A3EA;
      }
    }

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
        color: #FFF;
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
