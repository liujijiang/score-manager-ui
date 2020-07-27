<template>
  <div>
    <el-select v-model="value" placeholder="请选择" class="select">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-button icon="el-icon-search" circle @click="handleInstitureChange()" class="button"></el-button>
    <ve-histogram :data="chartData"></ve-histogram>
    <ve-pie :data="chartData"></ve-pie>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        columns: ['学院名', '平均成绩', '总学分'],
        rows: []
      },
      options: [],
      value: ''
    }
  },
  created() {
    this.queryInstitute()
  },
  methods: {
    async queryInstitute() {
      const { data: res } = await this.$http.get('institute/queryInstitute')
      this.options = res.data
      this.value = this.options[0].value
      this.handleInstitureChange()
    },
    async handleInstitureChange() {
      const { data: res } = await this.$http.post('courseTaken/getData', {
        instituteName: this.value
      })

      if (res.code == 200) {
        this.chartData.rows = res.data
      } else {
      }
    }
  }
}
</script>

<style lang="less" scoped>
.select {
  margin-left: 10%;
}
.button {
  margin-left: 5%;
}
</style>