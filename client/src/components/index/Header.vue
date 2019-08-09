<template>
     <div class="header">
        <ul class="header-list">
            <li class="left">
                <img src="../../assets/logo.png" alt="米修" class="logo">
                <span class="title">遨科在线后台管理系统</span>
            </li>
            <li class="right">
                <img class="head" :src="user.avatar" alt="">
                <!-- <el-row id="el-row" class="block-col-2">
                    <el-col :span="6"> -->
                        <div class="mess">
                            <span class="demonstration">欢迎</span>
                            <p class="name">{{user.name }}</p>
                        </div>
                        <el-dropdown trigger="click" id="down" @command="setFun">
                            <span class="el-dropdown-link">
                                <i class="el-icon--right el-icon-caret-bottom"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <router-link :to='{name: "personal"}'>
                                    <el-dropdown-item icon="el-icon-s-check">个人信息</el-dropdown-item>
                                </router-link>
                                <el-dropdown-item command='quit' icon="el-icon-upload">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    <!-- </el-col>
                </el-row> -->
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations} from 'vuex'
import { mapActions} from 'vuex'

export default {
    // data(){
    //     return {
    //         user: this.$store.state.user
    //     }
    // },
    computed: {
        user(){
            return this.$store.getters.user
        }
    },
    methods: {
        setFun: function(item){
            switch(item){
                case 'quit': 
                    this.quit();
                    break;
                default: 
                    break;
            }
        },
        quit: function(){
            if(localStorage.eleToken){
                localStorage.removeItem('eleToken'); //清除token
                this.$store.dispatch('clearUser')  //重新设置state
                this.$router.push('/'); //跳转到登录页面
            }
           
        }
    }
}
</script>



<style scoped>
    .wrapper .header{
        position: relative;
        height: 10vh;
        background: #324057;
    }
    .header-list{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        justify-content: space-between;
        width: 98%;
        height: 70%;
        align-items: center;
    }
    .header-list li{
        height: 100%;
    }
    .header .logo,.header .head{
        width: auto;
        height: 100%;
        vertical-align: top
    }
    .title{
        display: inline-block;
        height: 100%;
        line-height: 50px;
        font-size: 24px;
        color: #fff;
        font-weight: 700;
        margin-left: 20px
    }
    .head{
        border-radius: 50%;
        margin-right: 10px
    }
    .right{
        display: flex;
        flex-wrap: nowrap
    }
    #el-row{
        display: inline-block;
        height: 100%;
    }
    #down{
        position: absolute;
        top: 50%;
        transform: translate(0,-50%);
        right: 0
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #fff;
    }
    .mess{
        margin-right: 20px;
        margin-top: 2px
    }
    .demonstration{
        font-size: 12px;
        color: #fff;
    }
    .name{
        color: #409eff;
        font-size: 14px;
        font-weight: 700
    }
</style>

