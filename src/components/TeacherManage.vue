<template>
  <div>
    <el-card shadow="always">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashBoard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>教师管理</a>
        </el-breadcrumb-item>
      </el-breadcrumb>

      <div class="block">
        <div class="item" style="margin-right:1%">教师名或编号：</div>
        <div class="item" style="margin-right: 3%">
          <el-input v-model="teacherName" placeholder="教师名" size="small"></el-input>
        </div>
        <div class="item" style="margin-right:1%">学 院：</div>

        <div class="item">
          <el-cascader
            v-model="institute"
            :options="institureOptions"
            style="margin-right: 3%"
            size="small"
          ></el-cascader>
        </div>

        <div class="item">
          <el-button type="primary" size="small" round @click="select()">查 询</el-button>
        </div>

        <div class="item">
          <el-button type="success" size="small" round @click="reset()">重 置</el-button>
        </div>

        <el-button
          type="primary"
          icon="el-icon-plus"
          circle
          style="margin-left: 20%"
          @click="dialogVisible = true"
        ></el-button>


        <template>
          <el-table
            :data="tableData"
            style="width: 100%; margin-top: 3%"
            :row-class-name="tableRowClassName"
            v-loading="loading"
          >
            <el-table-column prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="number" label="编号" width="70"></el-table-column>
            <el-table-column prop="sex" label="性别" width="70"></el-table-column>

            <el-table-column prop="money" label="薪资" width="70"></el-table-column>
            <el-table-column prop="time" label="入职日期" width="120"></el-table-column>
            <el-table-column prop="birthday" label="生日" width="120"></el-table-column>
            <el-table-column prop="createDate" label="记录日期" width="180"></el-table-column>

            <el-table-column prop="institute.name" label="所属学院" width="180"></el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-popconfirm
                  title="确定删除吗？"
                  @onConfirm="handleDelete(scope.$index, scope.row)"
                >
                  <el-button size="mini" type="danger" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.page"
            :page-sizes="[10, 20, 30, 100]"
            :page-size="this.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total"
          ></el-pagination>
        </template>
      </div>
    </el-card>

    <el-dialog title="添加教师" :visible.sync="dialogVisible" width="40%">
      <el-form :model="insertTeacherForm">
        <el-form-item label="教师姓名" :label-width="formLabelWidth">
          <el-input v-model="insertTeacherForm.name" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="教师性别" style="margin-left: 50px">
          <el-radio-group v-model="insertTeacherForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="教师编号" :label-width="formLabelWidth">
          <el-input v-model="insertTeacherForm.number" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="教师生日" :label-width="formLabelWidth">
          <el-date-picker
            type="date"
            placeholder="教师生日"
            v-model="insertTeacherForm.birthday"
            style="width: 80%;"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="教师薪资" :label-width="formLabelWidth">
          <el-input v-model="insertTeacherForm.money" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="所属学院" :label-width="formLabelWidth">
          <el-cascader
            v-model="insertTeacherForm.instituteName"
            :options="institureOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="入职时间" :label-width="formLabelWidth">
          <el-date-picker
            type="date"
            placeholder="入职时间"
            v-model="insertTeacherForm.time"
            style="width: 80%;"
          ></el-date-picker>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertTeacher()" :loading="insertLoading">提 交</el-button>
      </span>
    </el-dialog>

    <el-drawer :visible.sync="drawer" :with-header="false" size="32%">
      <h2>修改教师信息</h2>

      <el-form :model="updateTeacherForm">
        <el-form-item label="教师姓名" :label-width="formLabelWidth">
          <el-input v-model="updateTeacherForm.name" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="教师性别" style="margin-left: 50px">
          <el-radio-group v-model="updateTeacherForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="教师编号" :label-width="formLabelWidth">
          <el-input v-model="updateTeacherForm.number" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="教师生日" :label-width="formLabelWidth">
          <el-date-picker
            type="date"
            placeholder="教师生日"
            v-model="updateTeacherForm.birthday"
            style="width: 80%;"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="教师薪资" :label-width="formLabelWidth">
          <el-input v-model="updateTeacherForm.money" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="所属学院" :label-width="formLabelWidth">
          <el-cascader
            v-model="updateTeacherForm.instituteName"
            :options="institureOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="入职时间" :label-width="formLabelWidth">
          <el-date-picker
            type="date"
            placeholder="入职时间"
            v-model="updateTeacherForm.time"
            style="width: 80%;"
          ></el-date-picker>
        </el-form-item>
      </el-form>

      <el-button @click="drawer = false">取 消</el-button>
      <el-button type="primary" @click="updateTeacher()" :loading="updateLoading">提 交</el-button>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      institute: '',
      institureOptions: [],
      teacherName: '',
      radio1: '1',
      tableData: [],
      page: 1,
      size: 10,
      total: 10,
      loading: false,
      dialogVisible: false,
      formLabelWidth: '120px',
      drawer: false,
      formLabelWidth1: '80px',
      insertTeacherForm: {
        name: '',
        sex: '',
        number: '',
        birthday: '',
        money: '',
        instituteName: '',
        time: ''
      },
      updateTeacherForm: {
        name: '',
        sex: '',
        number: '',
        birthday: '',
        money: '',
        instituteName: '',
        time: ''
      },
      updateLoading: false,
      insertLoading: false,
    }
  },
  created() {
    this.queryInstitute()
    this.queryTeacherPage()
  },
  methods: {
    handleEdit(index, row) {
      this.updateTeacherForm.name = row.name
      this.updateTeacherForm.sex = row.sex
      this.updateTeacherForm.number = row.number
      this.updateTeacherForm.birthday = row.birthday
      this.updateTeacherForm.money = row.money
      this.updateTeacherForm.instituteName = row.institute.name
      this.updateTeacherForm.time = row.time

      this.drawer = true
    },
    async updateTeacher(){
      this.updateLoading = true
        const {data:res} = await this.$http.post('teacher/updateTeacher',this.updateTeacherForm)

        if (res.code == 200){
            this.$message.success('修改成功')
            this.drawer = false
            this.queryTeacherPage()
        } else {
            this.$message.error(修改失败)
        }

        this.updateLoading = false
    },
    handleDelete(index, row) {
      this.deleteTeacher(row.name)
    },
    async deleteTeacher(teacherName) {
      const { data: res } = await this.$http.post('teacher/deleteTeacher', {
        name: teacherName
      })

      if (res.code == 200) {
        this.$message.success('删除成功')
        this.queryTeacherPage()
      } else {
        this.$message.error('删除失败')
      }
    },
    select() {
      this.queryTeacherPage()
    },
    reset() {
      this.institute = ''
      this.teacherName = ''
      this.queryTeacherPage()
    },
    async queryInstitute() {
      const { data: res } = await this.$http.get('institute/queryInstitute')

      this.institureOptions = res.data
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
      this.queryTeacherPage()
    },
    handleCurrentChange(val) {
      this.page = val
      this.queryTeacherPage()
    },
    async queryTeacherPage() {
      this.loading = true
      const { data: res } = await this.$http.post('teacher/queryTeacherPage', {
        page: this.page - 1,
        size: this.size,
        teacherName: this.teacherName,
        instituteName: this.institute
      })

      if (res.code != 200) {
        this.$message.error(res.message)
      } else {
        this.tableData = res.data.content
        this.total = res.data.totalElements
      }

      this.loading = false
    },
    async insertTeacher() {
      this.insertLoading = true
      const { data: res } = await this.$http.post(
        'teacher/insertTeacher',
        this.insertTeacherForm
      )

      if (res.code == 200) {
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.queryTeacherPage()
      } else {
        this.$message.error('添加失败')
      }
      this.insertLoading = false
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
  margin-right: 2%;
}
.button {
  margin-top: 2%;
}
</style>