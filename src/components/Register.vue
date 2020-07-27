<template>
  <div>
    <el-card class="main1">
      <el-card shadow="always" class="card">
        <h1 class="title">SDUT-SCORE-MANAGER</h1>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item class="formInput" label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item class="formInput" label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item class="formInput" label="昵称">
            <el-input v-model="form.nickName"></el-input>
          </el-form-item>
          <el-form-item class="formInput" label="电子邮件">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="button1" type="success" @click="register()">注册并登录</el-button>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        nickName: '',
        email: ''
      }
    }
  },
  created() {},
  methods: {
    async register() {
      const { data: res } = await this.$http.post('user/register', this.form)

      if (res.code != 200) {
        this.$message.error(res.message)
      } else {
        this.$message.success('注册成功')

        this.$router.push('/dashBoard')
      }
    }
  }
}
</script>

<style lang="less" scoped>
html,
body,
.main1 {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 780px;
  position: relative;
  top: 0;
  bottom: 0;
}
.formInput {
  width: 90%;
}
.card {
  width: 40%;
  height: 420px;
  margin-left: 30%;
  margin-top: 10%;
}
.button1 {
  margin-left: 33%;
}
.title {
  margin-left: 10%;
}
</style>