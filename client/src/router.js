import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Register from  './components/Register.vue'
import Index from './components/Index.vue'
import ErrorPage from './components/404.vue'
// 二级
import Main1 from './components/index/Main1.vue'
import Fund from './components/index/Fund.vue'
import Personal from './components/index/PersonalDetails.vue'

import { Message } from 'element-ui';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [   
    {
      path: '/',
      name: 'login',
      component: Login    
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/index/main1',
      // 二级
      children: [
       { path: '/index/main1', name: 'main1',component: Main1},
       { path: '/index/fund', name: 'fund',component: Fund,},
       { path: '/index/personal', name: 'personal',component: Personal}
      ]
    },
    {
      path: '/404',
      name: '404',
      component: ErrorPage
    },
    {
      path: '*',
      redirect: '/404'
    },
  ]
})
// 全局守卫
router.beforeEach((to,from,next) =>{
  const isLogin  = localStorage.getItem('eleToken') ? true : false;
  if(isLogin){
    next();
  }else{
    if(to.path == '/' || to.path == '/register'){
      next()
    }else{
      Message({
        type: 'error',
        message: '请先登录!'
      })
      next('/')
    }
  }
})

export default router
// 

// 安装 npm install jwt-decode  解析token
// 此token在后端有设定过期时间 在routes文件夹下的api文件夹下的uesrs.js中 这个值expiresIn: 3600(代表保质期3600s)