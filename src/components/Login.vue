<template>
  <div>
    <el-card class="main1">
      <transition name="el-zoom-in-center" appear="true">
        <el-card shadow="always" class="card">
          <h1 class="title">SDUT-学生成绩管理系统</h1>
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item class="formInput" label="用户名" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item class="formInput" label="密码" prop="password">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
          </el-form>
          <el-button class="button1" type="primary" @click="login()" :loading="this.loading">登录</el-button>
          <!-- <el-button class="button2" type="success" @click="register()">注册</el-button> -->
        </el-card>
      </transition>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      styles: {
        backgroundImage:
          'url(' + require('../assets/logo.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      show: false,
      timer: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    async login() {
      this.loading = true

      const { data: res } = await this.$http.post('user/login', this.form)

      if (res.code != 200) {
        this.$message.error(res.message)
      } else {
        this.$message.success('登录成功')
        window.sessionStorage.setItem('auth', res.data.token)
        window.sessionStorage.setItem('username', res.data.username)
        this.$router.push('/dashBoard')
      }

      this.loading = false
    },
    register() {
      this.$router.push('/register')
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
  height: 300px;
  margin-left: 30%;
  margin-top: 15%;
}
.button1 {
  margin-left: 43%;
}
.title {
  margin-left: 10%;
}
</style>