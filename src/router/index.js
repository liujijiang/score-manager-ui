import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login'
import DashBoard from '../components/DashBoard'
import Register from '../components/Register'
import Home from '../components/Home'
import StudentScoreManage from '../components/StudentScoreManage'
import CourseManage from '../components/CourseManage'
import StudentInfoManage from '../components/StudentInfoManage'
import TeacherManage from '../components/TeacherManage'
import UserManager from '../components/UserManager'
import InstituteManage from '../components/InstituteManage'
import CourseAttribute from '../components/CourseAttribute'
import RoleManage from '../components/RoleManage'

Vue.use(VueRouter)

const routes = [
  {
    name: '/',
    path: '/',
    redirect: '/login'
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
  },
  {
    name: 'register',
    path: '/register',
    component: Register
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    children: [
      {
        name: 'dashBoard',
        path: '/dashBoard',
        component: DashBoard
      },
      {
        name: 'studentScoreManage',
        path: '/studentScoreManage',
        component: StudentScoreManage
      },
      {
        name: 'courseManage',
        path: '/courseManage',
        component: CourseManage
      },
      {
        name: 'studentInfoManage',
        path: '/studentInfoManage',
        component: StudentInfoManage
      },
      {
        name: 'teacherManage',
        path: '/teacherManage',
        component: TeacherManage
      },
      {
        name: 'userManager',
        path: '/userManager',
        component: UserManager
      },
      {
        name: 'instituteManage',
        path: '/instituteManage',
        component: InstituteManage
      },
      {
        name: 'courseAttribute',
        path: '/courseAttribute',
        component: CourseAttribute
      },
      {
        name: 'roleManage',
        path: '/roleManage',
        component: RoleManage
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

//路由拦截器
router.beforeEach((to, from, next) => {

  // 访问登录页 就 放行
  if (to.path == '/login') return next();

  //获取token
  const tokenStr = window.sessionStorage.getItem('auth');

  //判断token 没有token 强制路由到登录见面
  if (!tokenStr) {
    return next('/login');
  }

  return next();
})


export default router
