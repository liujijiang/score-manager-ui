<template>
  <div>
    <el-card shadow="always">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashBoard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>用户管理</a>
        </el-breadcrumb-item>
      </el-breadcrumb>

      <div class="block">
        <div class="item" style="margin-right:1%">用户名：</div>
        <div class="item" style="margin-right: 3%">
          <el-input v-model="username" placeholder="用户姓名" size="small"></el-input>
        </div>

        <span class="demonstration" style="margin-right:1%">权限:</span>
        <el-cascader v-model="role" :options="roleOptions" style="margin-right: 3%" size="small"></el-cascader>

        <div class="button">
          <el-button type="primary" size="small" round @click="select()">查询</el-button>
          <el-button type="success" size="small" round @click="reset()">重置</el-button>
        </div>

        <el-button
          type="primary"
          icon="el-icon-plus"
          class="item"
          circle
          style="margin-left: 80%;"
          @click="dialogVisible = true"
        ></el-button>

        <template>
          <el-table
            :data="tableData"
            style="width: 100%; margin-top: 3%"
            :row-class-name="tableRowClassName"
            v-loading="loading"
          >
            <el-table-column prop="username" label="用户名" width="100"></el-table-column>

            <el-table-column prop="nickName" label="昵称" width="80"></el-table-column>

            <el-table-column prop="email" label="电子邮件" width="180"></el-table-column>

            <el-table-column prop="password" label="密码" width="280"></el-table-column>

            <el-table-column prop="roles" label="权限" width="150"></el-table-column>

            <el-table-column label="操作" width="300">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleSendEmail(scope.$index, scope.row)">发邮件</el-button>
                <el-button size="mini" type="success" @click="handleAddRole(scope.$index, scope.row)">授权</el-button>
                <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.$index, scope.row)">
                  <el-button size="mini" type="danger" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 100]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </template>
      </div>
    </el-card>

    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="40%">
      <el-form :model="insertUserForm">
        <el-form-item label="用户姓名" :label-width="formLabelWidth">
          <el-input v-model="insertUserForm.username" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="insertUserForm.password" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" :label-width="formLabelWidth">
          <el-input v-model="insertUserForm.nickName" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件" :label-width="formLabelWidth">
          <el-input v-model="insertUserForm.email" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertUser()" :loading="insertLoading">提 交</el-button>
      </span>
    </el-dialog>

    <el-drawer :visible.sync="drawer" :with-header="false" size="32%">
      <h2>修改用户信息</h2>

      <el-form :model="updateUserForm">
        <el-form-item label="用户姓名" :label-width="formLabelWidth">
          <el-input v-model="updateUserForm.username" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="updateUserForm.password" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" :label-width="formLabelWidth">
          <el-input v-model="updateUserForm.nickName" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件" :label-width="formLabelWidth">
          <el-input v-model="updateUserForm.email" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>
      </el-form>

      <el-button @click="drawer = false">取 消</el-button>
      <el-button type="primary" @click="updateUser()" :loading="updateLoading">提 交</el-button>
    </el-drawer>

    <el-dialog title="授 权" :visible.sync="dialogVisibleAddRole" width="40%">
      <el-form :model="addRoleForm">
        <el-form-item label="权 限" :label-width="formLabelWidth">
          <el-cascader
            v-model="addRoleForm.roleName"
            :options="roleOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAddRole = false">取 消</el-button>
        <el-button type="primary" @click="addRole()" :loading="insertRoleLoading">提 交</el-button>
      </span>
    </el-dialog>

    <el-dialog title="发 邮 件" :visible.sync="dialogVisibleSendEmail" width="40%">
      <el-form :model="sendEmailForm">
        <el-form-item label="信 息" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="sendEmailForm.msg"
            maxlength="30"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSendEmail = false">取 消</el-button>
        <el-button type="primary" @click="sendEmail()" :loading="sendEmailLoading">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: '',
      roleOptions: [],
      username: '',
      radio1: '1',
      tableData: [],
      page: 1,
      size: 10,
      total: 10,
      loading: false,
      dialogVisible: false,
      drawer: false,
      insertUserForm: {
        username: '',
        password: '',
        nickName: '',
        email: ''
      },
      updateUserForm: {
        username: '',
        password: '',
        nickName: '',
        email: ''
      },
      formLabelWidth: '80px',
      insertLoading: false,
      updateLoading: false,
      addRoleForm: {
        roleName: '',
        username: ''
      },
      dialogVisibleAddRole: false,
      dialogVisibleSendEmail: false,
      sendEmailForm: {
        mailAddress: '',
        msg: ''
      },
      insertRoleLoading: false,
      sendEmailLoading: false,
    }
  },
  created() {
    this.queryRoleNames()
    this.queryUserPage()
  },
  methods: {
    handleSendEmail(index, row) {
      this.sendEmailForm.mailAddress = row.email

      this.dialogVisibleSendEmail = true
    },
    async sendEmail() {
      this.sendEmailLoading = true
      const { data: res } = await this.$http.post(
        'user/sendEmail',
        this.sendEmailForm
      )

      if (res.code == 200) {
        this.$message.success('发送成功')
        this.dialogVisibleSendEmail = false
      } else {
        this.$message.error(res.message)
      }
      this.sendEmailLoading = false
    },
    handleAddRole(index, row) {
      this.addRoleForm.username = row.username
      this.dialogVisibleAddRole = true
    },
    async addRole() {
      this.insertRoleLoading = true
      const { data: res } = await this.$http.post(
        'user/addRole',
        this.addRoleForm
      )

      if (res.code == 200) {
        this.$message.success('授权成功')
        this.dialogVisibleAddRole = false
        this.queryUserPage()
      } else {
        this.$message.error(res.message)
      }

      this.insertRoleLoading = false
    },
    handleEdit(index, row) {
      this.updateUserForm.username = row.username
      this.updateUserForm.password = ''
      this.updateUserForm.nickName = row.nickName
      this.updateUserForm.email = row.email
      this.drawer = true
    },
    async updateUser() {
      this.updateLoading = true

      const { data: res } = await this.$http.post(
        'user/updateUser',
        this.updateUserForm
      )

      if (res.code == 200) {
        this.$message.success('更新成功')
        this.drawer = false
        this.queryUserPage()
      } else {
        this.$message.error(res.message)
      }

      this.updateLoading = false
    },
    async insertUser() {
      this.insertLoading = true
      const { data: res } = await this.$http.post(
        'user/register',
        this.insertUserForm
      )

      if (res.code == 200) {
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.queryUserPage()
        this.insertUserForm.username = ''
        this.insertUserForm.password = ''
        this.insertUserForm.nickName = ''
        this.insertUserForm.email = ''
      } else {
        this.$message.error(res.message)
      }
      this.insertLoading = false
    },
    handleDelete(index, row) {
      this.deleteUser(row.username)
    },
    async deleteUser(username) {
      const { data: res } = await this.$http.post('user/deleteUser', {
        username: username
      })

      if (res.code == 200) {
        this.$message.success('删除成功')
        this.queryUserPage()
      } else {
        this.$message.error(res.message)
      }
    },
    select() {
      this.queryUserPage()
    },
    reset() {
      this.username = ''
      this.role = ''

      this.queryUserPage()
    },
    async queryRoleNames() {
      const { data: res } = await this.$http.get('role/queryAllRoleNames')

      this.roleOptions = res.data
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    handleSizeChange(val) {
      this.size = val
      this.queryUserPage()
    },
    handleCurrentChange(val) {
      this.page = val
      this.queryUserPage()
    },
    async queryUserPage() {
      this.loading = true
      const { data: res } = await this.$http.post('user/queryUserPage', {
        username: this.username,
        roleName: this.role,
        page: this.page - 1,
        size: this.size
      })

      if (res.code == 200) {
        this.tableData = res.data.content
        this.total = res.data.total
      } else {
        this.$message.error('服务器错误')
      }

      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.block {
  margin-top: 3%;
}
.item {
  float: left;
}
.button {
  margin-top: 2%;
}
</style>