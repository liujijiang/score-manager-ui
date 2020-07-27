<template>
  <div>
    <el-card shadow="always">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashBoard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>学院管理</a>
        </el-breadcrumb-item>
      </el-breadcrumb>

      <div class="block">
        <template>
          <el-table
            :data="tableData"
            style="width: 100%; margin-top: 3%"
            :row-class-name="tableRowClassName"
            v-loading="loading"
          >
            <el-table-column fixed prop="name" label="姓名" width="230"></el-table-column>
            <el-table-column fixed prop="createDate" label="创建日期" width="230"></el-table-column>
            <el-table-column fixed prop="studentNum" label="学生人数" width="150"></el-table-column>

            <el-table-column fixed prop="professionNum" label="专业数量" width="150"></el-table-column>

            <el-table-column fixed prop="courseNum" label="课程数量" width="150"></el-table-column>

            <el-table-column fixed="right" label="操作" width="140">
              <template slot-scope="scope">
                <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.$index, scope.row)">
                  <el-button size="mini" type="danger" slot="reference">删除</el-button>
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
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>

          <div class="item">
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              style="margin-left: 1500%; marigin-top: 1%"
              @click="dialogVisible = true"
            ></el-button>
          </div>
        </template>
      </div>
    </el-card>

    <el-dialog title="添加学院" :visible.sync="dialogVisible" width="40%">
      <el-form :model="insertInstituteForm">
        <el-form-item label="学院名" label-width="140px">
          <el-input
            v-model="insertInstituteForm.instituteName"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>

        <el-form-item label="专业名（可以多个，‘，’分开）" label-width="140px">
          <el-input
            v-model="insertInstituteForm.professions"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertInstitute()" :loading="insertButtonLoading">提 交</el-button>
      </span>
    </el-dialog>

    <el-drawer :visible.sync="drawer" :with-header="false" size="32%">
      <h2>修改学院</h2>

      <el-form :model="updateInstituteForm">
        <el-form-item label="学院名" label-width="140px">
          <el-input
            v-model="updateInstituteForm.instituteName"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>

        <el-form-item label="专业名（可以多个，‘，’分开）" label-width="140px">
          <el-input
            v-model="updateInstituteForm.professions"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-button class="updateButton" @click="drawer = false">取 消</el-button>
      <el-button
        class="updateButton"
        type="primary"
        @click="updateInstitute()"
        :loading="updateInstituteLoading"
      >提 交</el-button>
    </el-drawer>
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
      insertInstituteForm: {
        instituteName: '',
        professions: ''
      },
      insertButtonLoading: false,
      drawer: false,
      updateInstituteForm: {
        instituteName: '',
        professions: ''
      },
      updateInstituteLoading: false
    }
  },
  created() {
    this.queryInstitutePage()
  },
  methods: {
    handleEdit(index, row) {
      this.updateInstituteForm.instituteName = row.name

      this.drawer = true
    },
    async updateInstitute() {
      this.updateInstituteLoading = true

      const { data: res } = await this.$http.post(
        'institute/updateInstitute',
        this.updateInstituteForm
      )

      if (res.code == 200) {
        this.$message.success('更新成功')
        this.queryInstitutePage()
        this.drawer = false
        this.updateInstituteForm.professions = ''
      } else {
        this.$message.error(res.message)
      }

      this.updateInstituteLoading = false
    },
    handleDelete(index, row) {
      this.deleteInstitute(row.name)
    },
    async deleteInstitute(instituteName) {
      const { data: res } = await this.$http.post('institute/deleteInstitute', {
        instituteName: instituteName
      })

      if (res.code == 200) {
        this.$message.success('删除成功')
        this.queryInstitutePage()
      } else {
        this.$message.error('学院存在课程或教师，无法删除')
      }
    },
    handleSizeChange(val) {
      this.size = val
      this.queryInstitutePage()
    },
    handleCurrentChange(val) {
      this.page = val
      this.queryInstitutePage()
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },

    async insertInstitute() {
      this.insertButtonLoading = true

      const { data: res } = await this.$http.post(
        'institute/insertInstitute',
        this.insertInstituteForm
      )

      if (res.code == 200) {
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.queryInstitutePage()
        this.insertInstituteForm.professions = ''
      } else {
        this.$message.error(res.message)
      }

      this.insertButtonLoading = false
    },
    async queryInstitutePage() {
      this.loading = true
      const { data: res } = await this.$http.post(
        'institute/queryInstitutePage',
        {
          page: this.page - 1,
          size: this.size
        }
      )
      if (res.code == 200) {
        this.tableData = res.data.content
        this.total = res.data.total
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
</style>