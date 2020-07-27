<template>
  <div>
    <el-card shadow="always">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashBoard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>权限管理</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <div class="block">
        <!-- 分割线 -->

        <el-card shadow="hover" class="card">
          <el-table :data="tableData" :row-class-name="tableRowClassName" v-loading="loading">
            <el-table-column prop="name" label="角色" width="250"></el-table-column>

            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.$index, scope.row)">
                  <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference"></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="item"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 100]"
            :page-size="size"
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>

          <div class="item">
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              style="margin-left: 150%; marigin-top: 1%"
              @click="dialogVisible = true"
            ></el-button>
          </div>
        </el-card>
      </div>
    </el-card>

    <!-- 分割线 -->

    <el-dialog title="添 加 权 限" :visible.sync="dialogVisible" width="40%">
      <el-form :model="insertRoleForm">
        <el-form-item label="角色名" label-width="formLabelWidth">
          <el-input
            v-model="insertRoleForm.name"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertRole()" :loading="insertButtonLoading">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      size: 10,
      total: 10,
      loading: false,
      dialogVisible: false,
      formLabelWidth: '80px',
      insertRoleForm: {
        name: ''
      },
      insertButtonLoading: false
    }
  },
  created() {
    this.queryRolePage()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },

    // 分割线

    handleDelete(index, row) {
        this.deleteRole(row.name)
    },
    async deleteRole(name) {
        const {data:res} = await this.$http.post('role/deleteRole', {
            name: name
        })

        if (res.code == 200){
            this.$message.success('删除成功')
            this.queryRolePage()
        } else {
            this.$message.error('这个权限正在被使用中')
        }
    },
    handleSizeChange(val) {
      this.size = val
      this.queryRolePage()
    },
    handleCurrentChange(val) {
      this.page = val
      this.queryRolePage()
    },

    async insertRole() {
      this.insertButtonLoading = true

      const { data: res } = await this.$http.post('role/insertRole', {
        name: this.insertRoleForm.name
      })

      if (res.code == 200) {
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.insertRoleForm.name = ''
        this.queryRolePage()
      } else {
        this.$message.error(res.message)
      }

      this.insertButtonLoading = false
    },
    async queryRolePage() {
      this.loading = true

      const { data: res } = await this.$http.post('role/queryRolePage', {
        page: this.page - 1,
        size: this.size
      })

      if (res.code == 200) {
        this.tableData = res.data.content
        this.total = res.data.totalElements
      } else {
        this.$message.error(res.message)
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
.updateButton {
  margin-left: 160px;
}
.card {
  width: 65%;
  margin-left: 15%;
}
</style>