<template>
  <div>
    <el-card shadow="always">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashBoard' }">首 页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>课程管理</a>
        </el-breadcrumb-item>
      </el-breadcrumb>

      <div class="block">
        <div class="item" style="margin-right:1%">课程名或编号：</div>
        <div class="item" style="margin-right: 3%">
          <el-input v-model="courseName" placeholder="课程名" size="small"></el-input>
        </div>
        <div class="item" style="margin-right:1%">学 院：</div>

        <div class="item">
          <el-cascader
            v-model="institure"
            :options="institureOptions"
            @change="handleInstitureChange"
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
            <el-table-column prop="name" label="课程名" width="150"></el-table-column>
            <el-table-column prop="number" label="编号" width="70"></el-table-column>
            <el-table-column prop="examMethod" label="考核方式" width="150"></el-table-column>

            <el-table-column prop="totalCredits" label="总学分" width="70"></el-table-column>
            <el-table-column prop="category.name" label="课程类别" width="150"></el-table-column>
            <el-table-column prop="institute.name" label="开课学院" width="180"></el-table-column>

            <el-table-column prop="createDate" label="创建日期" width="180"></el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-popconfirm
                  title="这是一段内容确定删除吗？"
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

    <el-dialog title="添加一个新的课程" :visible.sync="dialogVisible" width="40%">
      <el-form :model="insertCourseForm">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="insertCourseForm.name" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="课程编号" :label-width="formLabelWidth">
          <el-input v-model="insertCourseForm.number" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="总学分" :label-width="formLabelWidth">
          <el-input v-model="insertCourseForm.totalCredits" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="考核方式" :label-width="formLabelWidth">
          <el-input v-model="insertCourseForm.examMethod" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="学院名称" :label-width="formLabelWidth">
          <el-cascader
            v-model="insertCourseForm.instituteName"
            :options="institureOptions"
            size="small"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="课程类别" :label-width="formLabelWidth">
          <el-cascader
            v-model="insertCourseForm.categoryName"
            :options="categoryOptions"
            size="small"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="教师姓名" :label-width="formLabelWidth">
          <el-cascader
            v-model="insertCourseForm.teacherName"
            :options="teacherOptions"
            size="small"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertCourse()">提 交</el-button>
      </span>
    </el-dialog>

    <el-drawer :visible.sync="drawer" :with-header="false" size="32%">
      <h2>修改课程信息</h2>

      <el-form :model="updateCourseForm">
        <el-form-item label="课程名称(不可改)" :label-width="formLabelWidth1">
          <el-input v-model="updateCourseForm.name" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="课程编号" :label-width="formLabelWidth1">
          <el-input v-model="updateCourseForm.number" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="总学分" :label-width="formLabelWidth1">
          <el-input v-model="updateCourseForm.totalCredits" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="考核方式" :label-width="formLabelWidth1">
          <el-input v-model="updateCourseForm.examMethod" autocomplete="off" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="学院名称" :label-width="formLabelWidth1">
          <el-input
            v-model="updateCourseForm.instituteName"
            autocomplete="off"
            style="width: 320px"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程类别" :label-width="formLabelWidth1">
          <el-cascader
            v-model="updateCourseForm.categoryName"
            :options="categoryOptions"
            size="small"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="教师姓名" :label-width="formLabelWidth1">
          <el-cascader
            v-model="updateCourseForm.teacherName"
            :options="teacherOptions"
            size="small"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <el-button @click="drawer = false">取 消</el-button>
      <el-button type="primary" @click="updateCourse()">提 交</el-button>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      institure: '',
      institureOptions: [],
      courseName: '',
      radio1: '1',
      tableData: [],
      page: 1,
      size: 10,
      total: 10,
      loading: false,
      dialogVisible: false,
      insertCourseForm: {
        name: '',
        number: '',
        examMethod: '',
        totalCredits: '',
        instituteName: '',
        categoryName: '',
        teacherName: ''
      },
      updateCourseForm: {
        name: '',
        number: '',
        examMethod: '',
        totalCredits: '',
        instituteName: '',
        categoryName: '',
        teacherName: ''
      },
      teacherOptions: [],
      formLabelWidth: '120px',
      drawer: false,
      formLabelWidth1: '80px',
      categoryOptions: []
    }
  },
  created() {
    this.queryInstitute()
    this.queryCourseAllPage()
    this.queryTeacher()
    this.querycategoryNames()
  },
  methods: {
    handleInstitureChange(value) {
      this.queryCourseAllPage()
    },
    handleCourseChange(value) {},
    handleEdit(index, row) {
      this.updateCourseForm.name = row.name
      this.updateCourseForm.number = row.number
      this.updateCourseForm.examMethod = row.examMethod
      this.updateCourseForm.totalCredits = row.totalCredits
      this.updateCourseForm.instituteName = row.institute.name
      this.updateCourseForm.categoryName = row.category.name
      this.updateCourseForm.teacherName = row.teacherName

      this.drawer = true
    },
    async updateCourse() {
      const { data: res } = await this.$http.post(
        'course/updateCourse',
        this.updateCourseForm
      )

      if (res.code != 200) {
        this.$message.error(res.message)
      } else {
        this.$message.success('更新成功')

        this.queryCourseAllPage()
      }

      this.drawer = false
    },
    handleDelete(index, row) {
      this.deleteCourse(row.name)
    },
    async deleteCourse(deleteName) {
      const { data: res } = await this.$http.post('course/deleteCourse', {
        name: deleteName
      })

      if (res.code == 200) {
        this.$message.success(res.data)
      } else {
        this.$message.error('删除失败')
      }

      this.queryCourseAllPage()
    },
    select() {
      this.queryCourseAllPage()
    },
    reset() {
      this.courseName = ''
      this.institure = ''
      this.queryCourseAllPage()
    },
    handleSizeChange(val) {
      this.size = val
      this.queryCourseAllPage()
    },
    handleCurrentChange(val) {
      this.page = val
      this.queryCourseAllPage()
    },
    async queryInstitute() {
      const { data: res } = await this.$http.get('institute/queryInstitute')

      this.institureOptions = res.data
    },
    async queryCourseAllPage() {
      this.loading = true
      const { data: res } = await this.$http.post('course/queryCoursePage', {
        page: this.page - 1,
        size: this.size,
        courseName: this.courseName,
        instituteName: this.institure
      })
      if (res.code == 200) {
        this.tableData = res.data.content
        this.total = res.data.totalElements
        this.loading = false
      } else {
        this.$message.error(res.message)
        this.loading = false
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    async insertCourse() {
      const { data: res } = await this.$http.post(
        'course/insertCourse',
        this.insertCourseForm
      )

      if (res.code == 200) {
        this.$message.success('添加成功')
        this.queryCourseAllPage()
        this.dialogVisible = false

        this.insertCourseForm.name = ''
        this.insertCourseForm.number = ''
        this.insertCourseForm.examMethod = ''
        this.insertCourseForm.totalCredits = ''
        this.insertCourseForm.instituteName = ''
        this.insertCourseForm.categoryName = ''
        this.insertCourseForm.teacherName = ''
      } else {
        this.$message.error('添加失败')
      }
    },
    async queryTeacher() {
      const { data: res } = await this.$http.get('teacher/queryTeacherNames')

      this.teacherOptions = res.data
    },
    async querycategoryNames() {
      const { data: res } = await this.$http.get('courseCategory/queryNames')

      this.categoryOptions = res.data
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
</style>