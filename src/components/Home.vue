<template>
  <div>
    <el-container>
      <el-header>
        
        <h1  style="float: left;"> Welcome: {{this.username}} </h1>
        <h1 class="text">SDUT-学生成绩管理系统</h1>
        <el-button class="button" type="success" @click="out()">退出登录</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
            unique-opened
          >
            <el-menu-item index="0" route="/dashBoard">
              <i class="el-icon-setting"></i>
              <span slot="title">dashBoard</span>
            </el-menu-item>

            <el-menu-item index="1" route="/studentScoreManage">
              <i class="el-icon-grape"></i>
              <span slot="title">学生成绩管理</span>
            </el-menu-item>

            <el-menu-item index="2" route="/studentInfoManage">
              <i class="el-icon-cherry"></i>
              <span slot="title">学生信息管理</span>
            </el-menu-item>

            <el-menu-item index="4" route="/instituteManage">
              <i class="el-icon-orange"></i>
              <span slot="title">学院管理</span>
            </el-menu-item>

            <el-menu-item index="7" route="/courseAttribute">
              <i class="el-icon-lollipop"></i>
              <span slot="title">属性</span>
            </el-menu-item>

            <el-menu-item index="3" route="/courseManage">
              <i class="el-icon-watermelon"></i>
              <span slot="title">课程管理</span>
            </el-menu-item>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-pear"></i>
                <span>教师</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1" route="/teacherManage">教师管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-apple"></i>
                <span>用户</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="6-1" route="/userManager">用户管理</el-menu-item>
                <el-menu-item index="6-2" route="/roleManage">权限管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.username = window.sessionStorage.getItem('username')
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    out() {
      window.sessionStorage.setItem('auth', '')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.text {
  margin-left: 30%;
  float: left;
}
.button {
  float: left;
  margin-left: 24%;
  margin-top: 1%;
}
</style>