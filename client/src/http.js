import axios from 'axios'
import { Message, Loading } from 'element-ui';
import router from './router.js'


let loading;
// 开始动画
function startLoading(){
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0.7)'
    });
}
// 结束动画
function endLoading(){
    loading.close()
}

// 请求拦截
axios.interceptors.request.use(
    config =>{
        startLoading();
        // 当请求成功时 设置请求头(此登录账号)统一权限认证
        if(localStorage.getItem('eleToken')){
            config.headers.Authorization = localStorage.getItem('eleToken')
        }
        return config
    },
    error =>{
        return Promise.reject(error)
    }
);

// 响应拦截
axios.interceptors.response.use(
    response =>{
        endLoading();
        return response;
    },
    error =>{
        endLoading();
        Message.error(error.response.data);
        // 当响应失败时
        const status = error.response.status;
        // 401代表此token过期
        if(status == 401){
            Message({
                type: 'error',
                message: 'token失效,请重新登录!'
            });
            // 当token值失效 就删掉此token
            localStorage.removeItem('eleToken');
            router.push('/')
            console.log(this)
        }
        return Promise.reject(error)
    }
)
export default axios



