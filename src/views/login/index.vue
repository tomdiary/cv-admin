<template>
  <div class="login">

  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      baseInitData()
    })

    const baseInitData = () => {
      $api.userLogin({ username: 'admin', password: '123456' }).then(res => {
        console.log(res)
      })
    }

    return {
      baseInitData
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  background-color: $main-color;
}
</style>
