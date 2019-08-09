import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './http.js'

// import { Message, Loading } from 'element-ui';


Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.axios = axios
// Vue.prototype.message = Message
// Vue.prototype.loading = Loading

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/**
 * 关于添加数据方法:
 *    因为提交按钮是在fund组件的子组件dialog中 所以当添加一条数据到数据库中时 不会自动刷新 或者页面上直接显示添加的内容 
 * 必须刷新一次才可
 * 有两种解决办法: 
 *    1. 将fund中展示的数据传递到子组件dialog中 然后子组件在添加成功时 把返回的当前添加内容直接push到fund组件传过来的数据 
 * 因为此数据是数组(引用类型) 所以子组件改变其内容 父组件就会跟着改变
 *    2. 在子组件中通过this.$emit()方法自定义事件 父组件添加这个事件并触发一个方法 此方法即是重新get数据
 * 优缺点:
 *    第一种方法没有再次向后端请求数据 节省性能   但当用户点击提交按钮时即刻添加没有loading效果
 *    第二种方法与第一种相反
 */

// 打包上传到heroku   下载heroku cli  
//登录 命令 heroku login
// 创建heroku   命令heroku create
// 进入网站 settings可以修改文件名

// 开发环境下使用本地地址 上线就上传服务器也就是heroku地址
// 修改后端代码
// 1.在config下创建keys_dev.js  ---> 开发环境下 (将keys.js中代码全部拷贝进去)
// 2.在config下创建keys_prod.js ---> 线上环境  将keys.js中代码值改成变量形式 process.env.....
// 3.在heroku网站中选中settings 点击Reveal Config Vars 
// 4.将第二步设置的变量名放进key值中 相对应的具体值放进value中 点击add 如果有多的就继续添加
// 打包准备工作: 将前端代码中package.json中private值改为false
// 5.打包前端代码 cd到前端代码文件 命令 npm run build
// 6.在后端代码server.js文件中添加前端执行代码 具体代码在文件中寻找
// 7.移出前端代码 再新建文件夹 将移出的前端代码中dist文件拷贝到新建文件夹中
// 8.进入后端代码package.json文件中 注释掉scipts对象中除了start属性以外的所有属性值
// 9. 打开网页找到Deploy 按照上面步骤
    // a.命令git init  实例化仓库
    // b.命令heroku git:remote -a vue-item1   连接远程仓库地址
    // c.命令git add . 将所有文件上传到服务器
    // d.命令git status 可以查看确认当前上传的文件
    // e.命令git commit -am "make it better" 确认上传
    // f.命令git push heroku master 最终上传
    // g.命令heroku open 打开页面 页面的网址即使需要的地址

// 若要修改前端文件 那么 先把后端文件package.json中注释的文件先解开, 然后将前端文件再移进来
//  然后重新执行5,7,8,9步骤