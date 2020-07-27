<template>
  <div>
    <el-card shadow="always">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashBoard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>属性管理</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <div class="block">
        <!-- 分割线 -->

        <el-card shadow="hover" class="card_one">
          <h1>课 程 性 质</h1>
          <el-table
            :data="tableDataCourseNature"
            style="width: 300px; margin-top: 3%"
            :row-class-name="tableRowClassName"
            v-loading="loadingCourseNature"
          >
            <el-table-column prop="name" label="课程性质" width="150"></el-table-column>

            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <el-popconfirm
                  title="确定删除吗？"
                  @onConfirm="handleDeleteCourseNature(scope.$index, scope.row)"
                >
                  <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference"></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="item"
            @size-change="handleSizeChangeCourseNature"
            @current-change="handleCurrentChangeCourseNature"
            :current-page="pageCourseNature"
            :page-sizes="[10, 20, 30, 100]"
            :page-size="sizeCourseNature"
            layout="prev, pager, next"
            :total="totalCourseNature"
          ></el-pagination>

          <div class="item">
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              style="margin-left: 150%; marigin-top: 1%"
              @click="dialogVisibleCourseNature = true"
            ></el-button>
          </div>
        </el-card>

        <!-- 分割线 -->

        <el-card shadow="hover" class="card_one">
          <h1>成 绩 性 质</h1>

          <el-table
            :data="tableDataScoreNature"
            style="width: 300px; margin-top: 3%"
            :row-class-name="tableRowClassName"
            v-loading="loadingScoreNature"
          >
            <el-table-column prop="name" label="课程性质" width="150"></el-table-column>

            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <el-popconfirm
                  title="确定删除吗？"
                  @onConfirm="handleDeleteScoreNature(scope.$index, scope.row)"
                >
                  <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference"></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="item"
            @size-change="handleSizeChangeScoreNature"
            @current-change="handleCurrentChangeScoreNature"
            :current-page="pageScoreNature"
            :page-sizes="[10, 20, 30, 100]"
            :page-size="sizeScoreNature"
            layout="prev, pager, next"
            :total="totalScoreNature"
          ></el-pagination>

          <div class="item">
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              style="margin-left: 150%; marigin-top: 1%"
              @click="dialogVisibleScoreNature = true"
            ></el-button>
          </div>
        </el-card>

        <!-- 分割线 -->

        <el-card shadow="hover" class="card_one">
          <h1>课 程 类 别</h1>

          <el-table
            :data="tableDataCourseCategory"
            style="width: 300px; margin-top: 3%"
            :row-class-name="tableRowClassName"
            v-loading="loadingCourseCategory"
          >
            <el-table-column prop="name" label="课程性质" width="150"></el-table-column>

            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <el-popconfirm
                  title="确定删除吗？"
                  @onConfirm="handleDeleteCourseCategory(scope.$index, scope.row)"
                >
                  <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference"></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="item"
            @size-change="handleSizeChangeCourseCategory"
            @current-change="handleCurrentChangeCourseCategory"
            :current-page="pageCourseCategory"
            :page-sizes="[10, 20, 30, 100]"
            :page-size="sizeCourseCategory"
            layout="prev, pager, next"
            :total="totalCourseCategory"
          ></el-pagination>

          <div class="item">
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              style="margin-left: 150%; marigin-top: 1%"
              @click="dialogVisibleCourseCategory = true"
            ></el-button>
          </div>
        </el-card>

        <!-- 分割线 -->

        <el-card shadow="hover">
          <h1>课 程 标 记</h1>

          <el-table
            :data="tableDataCourseMark"
            style="width: 300px; margin-top: 3%"
            :row-class-name="tableRowClassName"
            v-loading="loadingCourseMark"
          >
            <el-table-column prop="name" label="课程性质" width="150"></el-table-column>

            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <el-popconfirm
                  title="确定删除吗？"
                  @onConfirm="handleDeleteCourseMark(scope.$index, scope.row)"
                >
                  <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference"></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="item"
            @size-change="handleSizeChangeCourseMark"
            @current-change="handleCurrentChangeCourseMark"
            :current-page="pageCourseMark"
            :page-sizes="[10, 20, 30, 100]"
            :page-size="sizeCourseMark"
            layout="prev, pager, next"
            :total="totalCourseMark"
          ></el-pagination>

          <div class="item">
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              style="margin-left: 150%; marigin-top: 1%"
              @click="dialogVisibleCourseMark = true"
            ></el-button>
          </div>
        </el-card>

        <el-card shadow="hover" class="card_two">
          <h1>学 历</h1>

          <el-table
            :data="tableDataEducation"
            style="width: 600px; margin-top: 3%"
            :row-class-name="tableRowClassName"
            v-loading="loadingEducation"
          >
            <el-table-column prop="name" label="课程性质" width="150"></el-table-column>
            <el-table-column prop="year" label="课程性质" width="150"></el-table-column>

            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <el-popconfirm
                  title="确定删除吗？"
                  @onConfirm="handleDeleteEducation(scope.$index, scope.row)"
                >
                  <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference"></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="item"
            @size-change="handleSizeChangeEducation"
            @current-change="handleCurrentChangeEducation"
            :current-page="pageEducation"
            :page-sizes="[10, 20, 30, 100]"
            :page-size="sizeEducation"
            layout="prev, pager, next"
            :total="totalEducation"
          ></el-pagination>

          <div class="item">
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              style="margin-left: 380%; marigin-top: 1%"
              @click="dialogVisibleEducation = true"
            ></el-button>
          </div>
        </el-card>
      </div>
    </el-card>

    <!-- 分割线 -->

    <el-dialog title="添加课程性质" :visible.sync="dialogVisibleCourseNature" width="40%">
      <el-form :model="insertCourseNatureForm">
        <el-form-item label="课程性质名" label-width="formLabelWidth">
          <el-input
            v-model="insertCourseNatureForm.name"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleCourseNature = false">取 消</el-button>
        <el-button
          type="primary"
          @click="insertCourseNature()"
          :loading="insertButtonLoadingCourseNature"
        >提 交</el-button>
      </span>
    </el-dialog>

    <!-- 分割线 -->

    <el-dialog title="添加成绩性质" :visible.sync="dialogVisibleScoreNature" width="40%">
      <el-form :model="insertScoreNatureForm">
        <el-form-item label="课程性质名" label-width="formLabelWidth">
          <el-input
            v-model="insertScoreNatureForm.name"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleScoreNature = false">取 消</el-button>
        <el-button
          type="primary"
          @click="insertScoreNature()"
          :loading="insertButtonLoadingScoreNature"
        >提 交</el-button>
      </span>
    </el-dialog>

    <!-- 分割线 -->

    <el-dialog title="添加课程类别" :visible.sync="dialogVisibleCourseCategory" width="40%">
      <el-form :model="insertCourseCategoryForm">
        <el-form-item label="课程性质名" label-width="formLabelWidth">
          <el-input
            v-model="insertCourseCategoryForm.name"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleCourseCategory = false">取 消</el-button>
        <el-button
          type="primary"
          @click="insertCourseCategory()"
          :loading="insertButtonLoadingCourseCategory"
        >提 交</el-button>
      </span>
    </el-dialog>

    <!-- 分割线 -->

    <el-dialog title="添加课程标记" :visible.sync="dialogVisibleCourseMark" width="40%">
      <el-form :model="insertCourseMarkForm">
        <el-form-item label="课程性质名" label-width="formLabelWidth">
          <el-input
            v-model="insertCourseMarkForm.name"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleCourseMark = false">取 消</el-button>
        <el-button
          type="primary"
          @click="insertCourseMark()"
          :loading="insertButtonLoadingCourseMark"
        >提 交</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加学历" :visible.sync="dialogVisibleEducation" width="40%">
      <el-form :model="insertEducationForm">
        <el-form-item label="学历名" label-width="formLabelWidth">
          <el-input
            v-model="insertEducationForm.name"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>
        <el-form-item label="学制" label-width="formLabelWidth">
          <el-input
            v-model="insertEducationForm.year"
            autocomplete="off"
            size="mini"
            style="width: 320px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEducation = false">取 消</el-button>
        <el-button
          type="primary"
          @click="insertEducation()"
          :loading="insertButtonLoadingEducation"
        >提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableDataCourseNature: [],
      pageCourseNature: 1,
      sizeCourseNature: 10,
      totalCourseNature: 10,
      loadingCourseNature: false,
      dialogVisibleCourseNature: false,
      formLabelWidth: '80px',
      insertCourseNatureForm: {
        name: ''
      },
      insertButtonLoadingCourseNature: false,

      // 分割线
      tableDataScoreNature: [],
      pageScoreNature: 1,
      sizeScoreNature: 10,
      totalScoreNature: 10,
      loadingScoreNature: false,
      dialogVisibleScoreNature: false,
      insertScoreNatureForm: {
        name: ''
      },
      insertButtonLoadingScoreNature: false,

      // 分割线

      tableDataCourseCategory: [],
      pageCourseCategory: 1,
      sizeCourseCategory: 10,
      totalCourseCategory: 10,
      loadingCourseCategory: false,
      dialogVisibleCourseCategory: false,
      insertCourseCategoryForm: {
        name: ''
      },
      insertButtonLoadingCourseCategory: false,

      // 分割线

      tableDataCourseMark: [],
      pageCourseMark: 1,
      sizeCourseMark: 10,
      totalCourseMark: 10,
      loadingCourseMark: false,
      dialogVisibleCourseMark: false,
      insertCourseMarkForm: {
        name: ''
      },
      insertButtonLoadingCourseMark: false,

      tableDataEducation: [],
      pageEducation: 1,
      sizeEducation: 10,
      totalEducation: 10,
      loadingEducation: false,
      dialogVisibleEducation: false,
      insertEducationForm: {
        name: '',
        year: '',
      },
      insertButtonLoadingEducation: false
    }
  },
  created() {
    this.queryCourseNaturePage()
    this.queryScoreNaturePage()
    this.queryCourseCategoryPage()
    this.queryCourseMarkPage()
    this.queryEducationPage()
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

    handleDeleteCourseNature(index, row) {
      this.deleteCourseNature(row.name)
    },
    async deleteCourseNature(CourseNatureName) {
      const { data: res } = await this.$http.post(
        'courseNature/deleteCourseNature',
        {
          name: CourseNatureName
        }
      )

      if (res.code == 200) {
        this.$message.success('删除成功')
        this.queryCourseNaturePage()
      } else {
        this.$message.error(res.message)
      }
    },
    handleSizeChangeCourseNature(val) {
      this.size = val
    },
    handleCurrentChangeCourseNature(val) {
      this.page = val
    },

    async insertCourseNature() {
      this.insertButtonLoadingCourseNature = true

      const { data: res } = await this.$http.post(
        'courseNature/insertCourseNature',
        {
          name: this.insertCourseNatureForm.name
        }
      )

      if (res.code == 200) {
        this.$message.success('添加成功')
        this.dialogVisibleCourseNature = false
        this.insertCourseNatureForm.name = ''
        this.queryCourseNaturePage()
      } else {
        this.$message.error(res.message)
      }

      this.insertButtonLoadingCourseNature = false
    },
    async queryCourseNaturePage() {
      this.loadingCourseNature = true

      const { data: res } = await this.$http.post(
        'courseNature/queryCourseNaturePage',
        {
          page: this.pageCourseNature - 1,
          size: this.sizeCourseNature
        }
      )

      if (res.code == 200) {
        this.tableDataCourseNature = res.data.content
        this.totalCourseNature = res.data.totalElements
      } else {
        this.$message.error(res.message)
      }

      this.loadingCourseNature = false
    },

    // 分割线

    handleDeleteScoreNature(index, row) {
      this.deleteScoreNature(row.name)
    },
    async deleteScoreNature(ScoreNatureName) {
      const { data: res } = await this.$http.post(
        'scoreNature/deleteScoreNature',
        {
          name: ScoreNatureName
        }
      )

      if (res.code == 200) {
        this.$message.success('删除成功')
        this.queryScoreNaturePage()
      } else {
        this.$message.error(res.message)
      }
    },
    handleSizeChangeScoreNature(val) {
      this.size = val
      this.queryScoreNaturePage()
    },
    handleCurrentChangeScoreNature(val) {
      this.page = val
      this.queryScoreNaturePage()
    },

    async insertScoreNature() {
      this.insertButtonLoadingScoreNature = true

      const { data: res } = await this.$http.post(
        'scoreNature/insertScoreNature',
        {
          name: this.insertScoreNatureForm.name
        }
      )

      if (res.code == 200) {
        this.$message.success('添加成功')
        this.dialogVisibleScoreNature = false
        this.insertScoreNatureForm.name = ''
        this.queryScoreNaturePage()
      } else {
        this.$message.error(res.message)
      }

      this.insertButtonLoadingScoreNature = false
    },
    async queryScoreNaturePage() {
      this.loadingScoreNature = true

      const { data: res } = await this.$http.post(
        'scoreNature/queryScoreNaturePage',
        {
          page: this.pageScoreNature - 1,
          size: this.sizeScoreNature
        }
      )

      if (res.code == 200) {
        this.tableDataScoreNature = res.data.content
      } else {
        this.$message.error(res.message)
      }

      this.loadingScoreNature = false
    },

    // 分割线

    handleDeleteCourseCategory(index, row) {
      this.deleteCourseCategory(row.name)
    },
    async deleteCourseCategory(CourseCategoryName) {
      const { data: res } = await this.$http.post(
        'courseCategory/deleteCourseCategory',
        {
          name: CourseCategoryName
        }
      )

      if (res.code == 200) {
        this.$message.success('删除成功')
        this.queryCourseCategoryPage()
      } else {
        this.$message.error(res.message)
      }
    },
    handleSizeChangeCourseCategory(val) {
      this.size = val
      this.queryCourseCategoryPage()
    },
    handleCurrentChangeCourseCategory(val) {
      this.page = val
      this.queryCourseCategoryPage()
    },

    async insertCourseCategory() {
      this.insertButtonLoadingCourseCategory = true

      const { data: res } = await this.$http.post(
        'courseCategory/insertCourseCategory',
        {
          name: this.insertCourseCategoryForm.name
        }
      )

      if (res.code == 200) {
        this.$message.success('添加成功')
        this.dialogVisibleCourseCategory = false
        this.insertCourseCategoryForm.name = ''
        this.queryCourseCategoryPage()
      } else {
        this.$message.error(res.message)
      }

      this.insertButtonLoadingCourseCategory = false
    },
    async queryCourseCategoryPage() {
      this.loadingCourseCategory = true

      const { data: res } = await this.$http.post(
        'courseCategory/queryCourseCategoryPage',
        {
          page: this.pageCourseCategory - 1,
          size: this.sizeCourseCategory
        }
      )

      if (res.code == 200) {
        this.tableDataCourseCategory = res.data.content
        this.totalCourseCategory = res.data.totalElements
      } else {
        this.$message.error(res.message)
      }

      this.loadingCourseCategory = false
    },

    // 分割线

    handleDeleteCourseMark(index, row) {
      this.deleteCourseMark(row.name)
    },
    async deleteCourseMark(CourseMarkName) {
      const { data: res } = await this.$http.post(
        'courseMark/deleteCourseMark',
        {
          name: CourseMarkName
        }
      )

      if (res.code == 200) {
        this.$message.success('删除成功')
        this.queryCourseMarkPage()
      } else {
        this.$message.error(res.message)
      }
    },
    handleSizeChangeCourseMark(val) {
      this.size = val
      this.queryCourseMarkPage()
    },
    handleCurrentChangeCourseMark(val) {
      this.page = val
      this.queryCourseMarkPage()
    },

    async insertCourseMark() {
      this.insertButtonLoadingCourseMark = true

      const { data: res } = await this.$http.post(
        'courseMark/insertCourseMark',
        {
          name: this.insertCourseMarkForm.name
        }
      )

      if (res.code == 200) {
        this.$message.success('添加成功')
        this.dialogVisibleCourseMark = false
        this.queryCourseMarkPage()
        this.insertCourseMarkForm.name = ''
      } else {
        this.$message.error(res.message)
      }

      this.insertButtonLoadingCourseMark = false
    },
    async queryCourseMarkPage() {
      this.loadingCourseMark = true

      const { data: res } = await this.$http.post(
        'courseMark/queryCourseMarkPage',
        {
          page: this.pageCourseMark - 1,
          size: this.sizeCourseMark
        }
      )

      if (res.code == 200) {
        this.tableDataCourseMark = res.data.content
        this.totalCourseMark = res.data.totalElements
      } else {
        this.$message.error(res.message)
      }

      this.loadingCourseMark = false
    },

    handleDeleteEducation(index, row) {
      this.deleteEducation(row.name)
    },
    async deleteEducation(Education) {
      const { data: res } = await this.$http.post(
        'education/deleteEducation',
        {
          name: Education
        }
      )

      if (res.code == 200) {
        this.$message.success('删除成功')
        this.queryEducationPage()
      } else {
        this.$message.error(res.message)
      }
    },
    handleSizeChangeEducation(val) {
      this.size = val
      this.queryEducationPage()
    },
    handleCurrentChangeEducation(val) {
      this.page = val
      this.queryEducationPage()
    },

    async insertEducation() {
      this.insertButtonLoadingEducation = true

      const { data: res } = await this.$http.post(
        'education/insertEducation',
        {
          name: this.insertEducationForm.name,
          time: this.insertEducationForm.year,
        }
      )

      if (res.code == 200) {
        this.$message.success('添加成功')
        this.dialogVisibleEducation = false
        this.insertEducationForm.name = ''
        this.insertEducationForm.year = ''
        this.queryEducationPage()
      } else {
        this.$message.error(res.message)
      }

      this.insertButtonLoadingEducation = false
    },
    async queryEducationPage() {
      this.loadingEducation = true

      const { data: res } = await this.$http.post(
        'education/queryEducationPage',
        {
          page: this.pageEducation - 1,
          size: this.sizeEducation
        }
      )

      if (res.code == 200) {
        this.tableDataEducation = res.data.content
        this.totalEducation = res.data.totalElements
      } else {
        this.$message.error(res.message)
      }

      this.loadingEducation = false
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
.card_one {
  width: 260px;
  float: left;
  margin-left: 9px;
  margin-bottom: 70px;
}
.card_two {
  width: 460px;
  margin-left: 9px;
  margin-bottom: 30px;
}
</style>