<template>
  <div>
    <el-card shadow="always">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashBoard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>学生成绩管理</a>
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

        <span class="demonstration" style="margin-right:1%">课程:</span>
        <el-cascader
          v-model="course"
          :options="courseOptions"
          @change="handleCourseChange"
          style="margin-right: 3%"
          size="small"
        ></el-cascader>

        <template>
          <el-radio v-model="radio1" label="1">升序</el-radio>
          <el-radio v-model="radio1" label="2">降序</el-radio>
        </template>
        <div class="button">
          <el-button type="primary" size="small" round @click="select()">查询</el-button>
          <el-button type="success" size="small" round @click="reset()">重置</el-button>
        </div>

        <el-button
          type="primary"
          class="item"
          icon="el-icon-plus"
          circle
          style="margin-left: 90%; margin-top: -20px"
          @click="dialogVisible = true"
        ></el-button>
        <template>
          <el-table
            :data="tableData"
            style="width: 100%; margin-top: 3%"
            :row-class-name="tableRowClassName"
            v-loading="loading1"
          >
            <el-table-column prop="course.name" fixed label="课程名" width="100"></el-table-column>
            <el-table-column prop="course.examMethod" label="考试方式" width="100"></el-table-column>

            <el-table-column prop="course.number" label="课程编号" width="100"></el-table-column>
            <el-table-column prop="course.totalCredits" label="总学分" width="100"></el-table-column>

            <el-table-column prop="courseMark.name" label="课程标记" width="100"></el-table-column>
            <el-table-column prop="courseNature.name" label="课程性质" width="100"></el-table-column>

            <el-table-column prop="createDate" label="添加日期" width="100"></el-table-column>
            <el-table-column prop="credits" label="学分" width="100"></el-table-column>

            <el-table-column prop="gradePoint" label="绩点" width="100"></el-table-column>
            <el-table-column prop="invalid" label="是否作废" width="100"></el-table-column>

            <el-table-column prop="schoolYear" label="学年" width="100"></el-table-column>
            <el-table-column prop="score" label="成绩" width="100"></el-table-column>

            <el-table-column prop="scoreNature.name" label="成绩性质" width="100"></el-table-column>
            <el-table-column prop="student.name" fixed label="学生姓名" width="100"></el-table-column>

            <el-table-column prop="student.number" label="学生编号" width="100"></el-table-column>

            <el-table-column label="操作" fixed="right" width="140">
              <template slot-scope="scope">
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

    <el-dialog title="添 加 学 生 成 绩" :visible.sync="dialogVisible" width="40%">
      <el-form :model="insertScoreForm">
        <el-form-item label="课程名" label-width="140px">
          <el-cascader
            v-model="insertScoreForm.courseName"
            :options="courseOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="课程性质" label-width="140px">
          <el-cascader
            v-model="insertScoreForm.courseNatureName"
            :options="courseNatureOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="成绩" label-width="140px">
          <el-slider v-model="insertScoreForm.score" :step="0.1" show-input></el-slider>
        </el-form-item>

        <el-form-item label="成绩性质" label-width="140px">
          <el-cascader
            v-model="insertScoreForm.scoreNatureName"
            :options="scoreNatureOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="是否作废" label-width="140px">
          <el-radio-group v-model="insertScoreForm.invalid">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="课程标记" label-width="140px">
          <el-cascader
            v-model="insertScoreForm.courseMarkName"
            :options="courseMarkOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="学年" label-width="140px">
          <el-input-number v-model="insertScoreForm.schoolYear" :min="1" :max="6" label="学年"></el-input-number>
        </el-form-item>

        <el-form-item label="学期" label-width="140px">
          <el-input-number v-model="insertScoreForm.semester" :min="1" :max="2" label="学年"></el-input-number>
        </el-form-item>

        <el-form-item label="学生姓名" label-width="140px">
          <el-cascader
            v-model="insertScoreForm.studentName"
            :options="studentNameOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertScore()" :loading="insertButtonLoading">提 交</el-button>
      </span>
    </el-dialog>

    <el-drawer :visible.sync="drawer" :with-header="false" size="32%">
      <h2>修 改 成 绩</h2>

      <el-form :model="updateCourseTakenFrom">
        <el-form-item label="课程名(不可改)" label-width="140px">
          <el-cascader
            v-model="updateCourseTakenFrom.courseName"
            :options="courseOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="课程性质" label-width="140px">
          <el-cascader
            v-model="updateCourseTakenFrom.courseNatureName"
            :options="courseNatureOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="成绩" label-width="140px">
          <el-slider v-model="updateCourseTakenFrom.score" :step="0.1" show-input></el-slider>
        </el-form-item>

        <el-form-item label="成绩性质(不可改)" label-width="140px">
          <el-cascader
            v-model="updateCourseTakenFrom.scoreNatureName"
            :options="scoreNatureOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="是否作废" label-width="140px">
          <el-radio-group v-model="updateCourseTakenFrom.invalid">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="课程标记" label-width="140px">
          <el-cascader
            v-model="updateCourseTakenFrom.courseMarkName"
            :options="courseMarkOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="学年" label-width="140px">
          <el-input-number v-model="updateCourseTakenFrom.schoolYear" :min="1" :max="6" label="学年"></el-input-number>
        </el-form-item>

        <el-form-item label="学期" label-width="140px">
          <el-input-number v-model="updateCourseTakenFrom.semester" :min="1" :max="2" label="学年"></el-input-number>
        </el-form-item>

        <el-form-item label="学生姓名(不可改)" label-width="140px">
          <el-cascader
            v-model="updateCourseTakenFrom.studentName"
            :options="studentNameOptions"
            size="small"
            style="width: 310px"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <el-button class="updateButton" @click="drawer = false">取 消</el-button>
      <el-button
        class="updateButton"
        type="primary"
        @click="updateScore()"
        :loading="updateInstituteLoading"
      >提 交</el-button>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      institure: '',
      institureOptions: [],
      course: '',
      courseOptions: [],
      studentName: '',
      radio1: '1',
      tableData: [],
      page: 1,
      size: 10,
      total: 10,
      dialogVisible: false,
      drawer: false,
      insertScoreForm: {
        courseName: '',
        courseNatureName: '',
        score: '',
        scoreNatureName: '',
        invalid: '否',
        courseMarkName: '',
        schoolYear: '',
        semester: '',
        studentName: ''
      },
      insertButtonLoading: false,
      updateInstituteLoading: false,
      loading1: false,
      courseNatureOptions: [],
      scoreNatureOptions: [],
      courseMarkOptions: [],
      studentNameOptions: [],
      updateCourseTakenFrom: {
        courseName: '',
        courseNatureName: '',
        score: '',
        scoreNatureName: '',
        invalid: '否',
        courseMarkName: '',
        schoolYear: '',
        semester: '',
        studentName: ''
      }
    }
  },
  created() {
    this.queryInstitute()
    this.queryCourseNames()

    this.queryCourseNatureNames()
    this.queryScoreNatureNames()
    this.queryCourseMarkNames()
    this.queryStudentNames()

    this.queryCourseTakenPage()
  },
  methods: {
    handleCourseChange(value) {},
    handleEdit(index, row) {
      this.updateCourseTakenFrom.courseName = row.course.name
      this.updateCourseTakenFrom.courseNatureName = row.courseNature.name
      this.updateCourseTakenFrom.score = row.score
      this.updateCourseTakenFrom.scoreNatureName = row.scoreNature.name
      this.updateCourseTakenFrom.invalid = row.invalid
      this.updateCourseTakenFrom.courseMarkName = row.courseMark.name
      this.updateCourseTakenFrom.schoolYear = row.schoolYear
      this.updateCourseTakenFrom.semester = row.semester
      this.updateCourseTakenFrom.studentName = row.student.name

      this.drawer = true
    },
    handleDelete(index, row) {
      this.deleteCourseTaken(
        row.course.name,
        row.student.name,
        row.scoreNature.name
      )
    },
    async deleteCourseTaken(courseName, studentName, scoreNatureName) {
      const { data: res } = await this.$http.post(
        'courseTaken/deleteCourseTaken',
        {
          courseName: courseName,
          studentName: studentName,
          scoreNatureName: scoreNatureName
        }
      )

      if (res.code == 200) {
        this.$message.success('删除成功')
        this.queryCourseTakenPage()
      } else {
        this.$message.error(res.message)
      }
    },
    select() {
      this.queryCourseTakenPage()
    },
    reset() {
      this.studentName = ''
      this.institure = ''
      this.course = ''
      this.radio1 = '1'

      this.queryCourseTakenPage()
    },
    async queryCourseTakenPage() {
      this.loading1 = true
      const { data: res } = await this.$http.post(
        'courseTaken/queryCourseTakenPage',
        {
          page: this.page - 1,
          size: this.size,
          studentName: this.studentName,
          instituteName: this.institure,
          courseName: this.course,
          orderFlag: this.radio1
        }
      )

      if (res.code == 200) {
        this.tableData = res.data.content
        this.total = res.data.totalElements
      } else {
        this.$message.error(res.message)
      }
      this.loading1 = false
    },
    async queryInstitute() {
      const { data: res } = await this.$http.get('institute/queryInstitute')

      if (res.code == 200) {
        this.institureOptions = res.data
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
    async queryCourseNames() {
      const { data: res } = await this.$http.get('course/queryCourseNames')
      if (res.code == 200) {
        this.courseOptions = res.data
      }
    },
    handleSizeChange(val) {
      this.size = val

      this.queryCourseTakenPage()
    },
    handleCurrentChange(val) {
      this.page = val
      this.queryCourseTakenPage()
    },
    async insertScore() {
      const { data: res } = await this.$http.post(
        'courseTaken/insertCourseTaken',
        this.insertScoreForm
      )

      if (res.code == 200) {
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.queryCourseTakenPage()
      } else {
        this.$message.error(res.message)
      }
    },
    async updateScore() {
      const { data: res } = await this.$http.post(
        'courseTaken/updateCourseTaken',
        this.updateCourseTakenFrom
      )

      if (res.code == 200) {
        this.$message.success('更新成功')
        this.drawer = false
        this.queryCourseTakenPage()
      } else {
        this.$message.error(res.message)
      }
    },
    async queryCourseNatureNames() {
      const { data: res } = await this.$http.get(
        'courseNature/queryCourseNatureNames'
      )

      if (res.code == 200) {
        this.courseNatureOptions = res.data
      }
    },
    async queryScoreNatureNames() {
      const { data: res } = await this.$http.get(
        'scoreNature/queryScoreNatureNames'
      )

      if (res.code == 200) {
        this.scoreNatureOptions = res.data
      }
    },
    async queryCourseMarkNames() {
      const { data: res } = await this.$http.get(
        'courseMark/queryCourseMarkNames'
      )

      if (res.code == 200) {
        this.courseMarkOptions = res.data
      }
    },
    async queryStudentNames() {
      const { data: res } = await this.$http.get('student/queryStudentNames')

      if (res.code == 200) {
        this.studentNameOptions = res.data
      }
    },
    async getExcel() {
      window.open('http://localhost:9898/api/courseTaken/getExcel')
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