<template>
  <div>
    <el-card shadow="always">
      <el-breadcrumb separator="/" class="item">
        <el-breadcrumb-item :to="{ path: '/dashBoard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>学生信息管理</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-tooltip content="导出Excel" placement="top">
          <el-button class="excelButton" size="mini" type="success" icon="el-icon-download" round @click="getExcel()">导出Excel</el-button>
        </el-tooltip>

      <div class="block">
        <div class="item" style="margin-right:1%">学生姓名或学号：</div>
        <div class="item" style="margin-right: 3%">
          <el-input v-model="studentName" placeholder="学生姓名" size="small"></el-input>
        </div>

        <span class="demonstration" style="margin-right:1%">学院:</span>
        <el-cascader
          v-model="institure"
          :options="institureOptions"
          style="margin-right: 3%"
          size="small"
        ></el-cascader>

        <span class="demonstration" style="margin-right:1%">学历:</span>
        <el-cascader
          v-model="education"
          :options="educationOptions"
          style="margin-right: 3%"
          size="small"
        ></el-cascader>

        <template>
          <el-radio v-model="radio1" label="1">男</el-radio>
          <el-radio v-model="radio1" label="2">女</el-radio>
        </template>

        <div class="item">
          <div class="button">
            <el-button type="primary" size="small" round @click="select()">查询</el-button>
            <el-button type="success" size="small" round @click="reset()">重置</el-button>
          </div>
        </div>

        

        <div class="item">
          <el-button
            type="primary"
            icon="el-icon-plus"
            circle
            style="margin-left: 2100%; marigin-top: 1%"
            @click="dialogVisible = true"
          ></el-button>
        </div>

        <template>
          <el-table
            :data="tableData"
            style="width: 100%; margin-top: 3%"
            :row-class-name="tableRowClassName"
            v-loading="loading"
          >
            <el-table-column fixed prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="nation" label="民族" width="50"></el-table-column>

            <el-table-column prop="number" label="学号" width="130"></el-table-column>

            <el-table-column prop="sex" label="性别" width="50"></el-table-column>

            <el-table-column prop="birthday" label="生日" width="110"></el-table-column>
            <el-table-column prop="hometown" label="籍贯" width="180"></el-table-column>

            <el-table-column prop="address" label="现住址" width="180"></el-table-column>

            <el-table-column prop="birthPlace" label="生源地" width="180"></el-table-column>

            <el-table-column prop="time" label="入学时间" width="110"></el-table-column>
            <el-table-column prop="institute.name" label="学院" width="180"></el-table-column>

            <el-table-column fixed="right" label="操作" width="140">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
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

    <el-dialog title="添加学生" :visible.sync="dialogVisible" width="40%">
      <el-form :model="insertStudentForm">
        <el-form-item label="学生姓名" :label-width="formLabelWidth">
          <el-input
            v-model="insertStudentForm.name"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>

        <el-form-item label="学生性别" style="margin-top: -10px">
          <el-radio-group v-model="insertStudentForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="学生编号" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-input
            v-model="insertStudentForm.number"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>

        <el-form-item label="学生民族" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-input
            v-model="insertStudentForm.nation"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>

        <el-form-item label="学生生日" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-date-picker
            type="date"
            placeholder="学生生日"
            size="mini"
            v-model="insertStudentForm.birthday"
            style="width: 80%;"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="所属学院" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-cascader
            v-model="insertStudentForm.instituteName"
            :options="institureOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="学历" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-cascader
            v-model="insertStudentForm.educationName"
            :options="educationOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="入学时间" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-date-picker
            type="date"
            placeholder="入学时间"
            size="mini"
            v-model="insertStudentForm.time"
            style="width: 80%;"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="学生籍贯" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-input
            v-model="insertStudentForm.hometown"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>

        <el-form-item label="生源地" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-input
            v-model="insertStudentForm.birthPlace"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>

        <el-form-item label="现住址" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-input
            v-model="insertStudentForm.address"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertStudent()" :loading="insertButtonLoading">提 交</el-button>
      </span>
    </el-dialog>

    <el-drawer :visible.sync="drawer" :with-header="false" size="32%">
      <h2>修改学生信息</h2>

      <el-form :model="updateStudentForm">
        <el-form-item label="学生姓名" :label-width="formLabelWidth">
          <el-input
            v-model="updateStudentForm.name"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>

        <el-form-item label="学生性别" style="margin-top: -10px">
          <el-radio-group v-model="updateStudentForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="学生编号" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-input
            v-model="updateStudentForm.number"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>

        <el-form-item label="学生民族" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-input
            v-model="updateStudentForm.nation"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>

        <el-form-item label="学生生日" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-date-picker
            type="date"
            placeholder="学生生日"
            size="mini"
            v-model="updateStudentForm.birthday"
            style="width: 80%;"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="所属学院" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-cascader
            v-model="updateStudentForm.instituteName"
            :options="institureOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="学历" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-cascader
            v-model="updateStudentForm.educationName"
            :options="educationOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="入学时间" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-date-picker
            type="date"
            placeholder="入学时间"
            size="mini"
            v-model="updateStudentForm.time"
            style="width: 80%;"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="学生籍贯" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-input
            v-model="updateStudentForm.hometown"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>

        <el-form-item label="生源地" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-input
            v-model="updateStudentForm.birthPlace"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>

        <el-form-item label="现住址" :label-width="formLabelWidth" style="margin-top: -10px">
          <el-input
            v-model="updateStudentForm.address"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-button @click="drawer = false">取 消</el-button>
      <el-button type="primary" @click="updateStudent()" :loading="updateStudentLoading">提 交</el-button>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      institure: '',
      institureOptions: [],
      education: '',
      educationOptions: [],
      studentName: '',
      radio1: '0',
      tableData: [],
      page: 1,
      size: 10,
      total: 10,
      loading: false,
      dialogVisible: false,
      formLabelWidth: '80px',
      insertStudentForm: {
        name: '',
        number: '',
        time: '',
        educationName: '',
        sex: '',
        birthday: '',
        nation: '',
        hometown: '',
        birthPlace: '',
        address: '',
        instituteName: ''
      },
      insertButtonLoading: false,
      drawer: false,
      updateStudentForm: {
        name: '',
        number: '',
        time: '',
        educationName: '',
        sex: '',
        birthday: '',
        nation: '',
        hometown: '',
        birthPlace: '',
        address: '',
        instituteName: ''
      },
      updateStudentLoading: false
    }
  },
  created() {
    this.queryInstitute()
    this.queryEducation()
    this.queryEducationPage()
  },
  methods: {
    handleEdit(index, row) {
      this.updateStudentForm.name = row.name
      this.updateStudentForm.number = row.number
      this.updateStudentForm.time = row.number
      this.updateStudentForm.time = row.time
      this.updateStudentForm.sex = row.sex
      this.updateStudentForm.birthday = row.birthday
      this.updateStudentForm.nation = row.nation
      this.updateStudentForm.hometown = row.hometown
      this.updateStudentForm.birthPlace = row.birthPlace
      this.updateStudentForm.address = row.address

      this.drawer = true
    },
    async updateStudent() {
      this.updateStudentLoading = true

      const { data: res } = await this.$http.post(
        'student/updateStudent',
        this.updateStudentForm
      )

      if (res.code == 200) {
        this.$message.success('修改成功')
        this.queryEducationPage()
        this.drawer = false
      } else {
        this.$message.error(res.message)
      }

      this.updateStudentLoading = false
    },
    handleDelete(index, row) {
      this.deleteStudent(row.name)
    },
    async deleteStudent(studentName) {
      const { data: res } = await this.$http.post('student/deleteStudent', {
        name: studentName
      })

      if (res.code == 200) {
        this.$message.success('删除成功')
        this.queryEducationPage()
      } else {
        this.$message.error(res.message)
      }
    },
    select() {
      this.queryEducationPage()
    },
    reset() {
      this.studentName = ''
      this.institure = ''
      this.education = ''
      this.radio1 = '0'

      this.queryEducationPage()
    },
    handleSizeChange(val) {
      this.size = val
      this.queryEducationPage()
    },
    handleCurrentChange(val) {
      this.page = val
      this.queryEducationPage()
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    async queryInstitute() {
      const { data: res } = await this.$http.get('institute/queryInstitute')

      if (res.code == 200) {
        this.institureOptions = res.data
      }
    },
    async queryEducation() {
      const { data: res } = await this.$http.get(
        'education/queryEducationNames'
      )

      if (res.code == 200) {
        this.educationOptions = res.data
      }
    },
    async queryEducationPage() {
      this.loading = true

      const { data: res } = await this.$http.post('student/queryStudentPage', {
        name: this.studentName,
        institute: this.institure,
        education: this.education,
        sex: this.radio1,
        page: this.page - 1,
        size: this.size
      })

      if (res.code == 200) {
        this.tableData = res.data.content

        this.total = res.data.totalElements
      } else {
        this.$message.error(res.data)
      }

      this.loading = false
    },

    async insertStudent() {
      this.insertButtonLoading = true
      const { data: res } = await this.$http.post(
        'student/insertStudent',
        this.insertStudentForm
      )

      if (res.code == 200) {
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.queryEducationPage()

        this.insertStudentForm = ''
      } else {
        this.$message.error(res.message)
      }

      this.insertButtonLoading = false
    },
    async getExcel() {
      window.open('http://localhost:9898/api/student/getExcel')
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
.excelButton{
  margin-left: 90%;
}
</style>