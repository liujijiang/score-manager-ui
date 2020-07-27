import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入网络请求axios
import axios from 'axios'

//挂载到配置中  之后就可以使用this.$http 发送请求
Vue.prototype.$http = axios

//配置请求根路径
axios.defaults.baseURL = 'http://localhost:9898/api/'

//配置请求拦截器    每次向服务器中发送请求都会拦截请求 在其中加上token 用来验证会话
axios.interceptors.request.use(config => {

  //配置每次发送请求的请求头 在其中加上 token
 // config.headers.Authorization = 'Bearer' + window.sessionStorage.getItem('auth');
  axios.defaults.headers.common['auth'] = 'Bearer' + window.sessionStorage.getItem('auth');
  //在最后必须return config
  return config;
})


// 配置elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


import VCharts from 'v-charts'
Vue.use(VCharts)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
