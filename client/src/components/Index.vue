<template>
    <div class="wrapper">
        <zy-header></zy-header>
         <el-container id="content" >
            <el-aside width="160px" height='100%' >
                <el-row class="menu_page">
                    <el-col >
                        <el-menu  class="el-menu-vertical-demo" :unique-opened=true
                            background-color="#384055" text-color="#fff"
                            active-text-color="#409eff" > 
                            <!-- unique-opened=true -->
                            <router-link :to='{name: "main1"}' exact>
                                <el-menu-item index=0>
                                    <template slot="title">
                                        <i class="el-icon-s-platform" ></i>
                                        <span>首页</span>
                                    </template>
                                </el-menu-item>
                            </router-link>
                            <el-submenu :index=parentMenu.path v-for="(parentMenu,pindex) in parentMenus" :key="pindex">
                                <template slot="title">
                                    <i :class="parentMenu.icon"></i>
                                    <span>{{ parentMenu.name }}</span>
                                </template>
                                <router-link v-for="(children,indexSmall) in parentMenu.childrens" :key="indexSmall" :to='children.path' exact>
                                    <el-menu-item :index="children.path" :class="children.icon"> {{ children.name }}</el-menu-item>
                                </router-link>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main id="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Header from './index/Header.vue'
import jwt_decode from 'jwt-decode'
export default {
    components: {
        'zy-header': Header
    },
    data(){
        return {
            parentMenus: [
                {   
                    path: 'fund',
                    icon: 'el-icon-c-scale-to-original',
                    name: '资金管理',
                    childrens: [
                        { path: '/index/fund', icon: 'el-icon-s-fold', name: '资金流水'}
                    ]
                },
                {
                    path: 'personal',
                    icon: 'el-icon-document-copy',
                    name: '信息管理',
                    childrens: [
                        { path: '/index/personal', icon: 'el-icon-user', name: '个人信息'}
                    ] 
                }
            ]
        }
    }
}
</script>
<style scoped>
    #content{
        height: 90vh;
    }
    .el-aside{
        height: 100% !important
    }
    .el-main{
        overflow: hidden !important
    }
</style>


