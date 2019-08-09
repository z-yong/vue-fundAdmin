<template>
    <div class="wrapper">
        <p class="title">遨科在线后台管理系统</p>
        <div class="box">
             <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model.number="ruleForm.email" placeholder='请输入邮箱'></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder='请输入密码'></el-input>
                </el-form-item>
                <el-form-item class="submit">
                    <el-button class="submit-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
            <div class="bottom">
                <p>还没有账号？ 现在</p>
                <router-link :to="{name: 'register'}">注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
// 引入解析token工具
import jwt_decode from 'jwt-decode'

export default {
    data(){
        return {
            ruleForm: {
               email: '',
               password:'',
            },
            rules: {
                email: [
                    {required: true, message: '用户名不能为空', trigger: 'blur' },    
                ],
                password: [
                    {required: true, message: '用户名不能为空', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        submitForm: function(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.axios.post('api/users/login',this.ruleForm).then(data =>{
                        const { token } = data.data //等同于 ==>   const token = data.data.tokens
                        // 成功即存储token
                        localStorage.setItem('eleToken',token)
                        this.$message({
                            type: 'sucess',
                            message: '登录成功!'
                        })
                        // 解析token
                        const decode  = jwt_decode(token);                
                        // 将解析后的token存储到vuex中
                        // 是否授权 为空即false
                        this.$store.dispatch('setAuthenticated',!this.isEmpty(decode))
                        // 存储用户信息
                        this.$store.dispatch('setUser',decode)
                        // 跳转到首页
                        this.$router.push('/index')
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 判断是否为空
        isEmpty: function(value){
            return value == undefined || value == null || 
                   (typeof value == 'object' && Object.keys(value).length === 0) ||
                   (typeof value == 'string' && value.trim().length === 0)
        }
    }

}
</script>


<style scoped>
    .wrapper{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: url('../assets/bg.jpg') no-repeat;
        background-position: center;
        background-size: cover
    }
    .title{
        text-align: center;
        margin: 50px auto;
        font-size: 30px;
        color: #fff;
        font-weight: 700
    }
     .box{
        position: relative;
        max-width: 340px;
        height: 180px;
        background: #fff;
        margin: 80px auto;
        padding: 30px 30px 30px 0px
    }
    .submit-btn{
        min-width:240px;
        background: #00f;
        color: #Fff;
        padding: 10px 2px;
        border: 1px solid #00f;
        border-radius: 4px;
        margin-left: -20px
    }
    .bottom{
        text-align: right;
        margin-right: -15px;
        font-size: 14px
    }
    .bottom p{
        display: inline-block;
    }
    .bottom a:hover{
        text-decoration: underline
    }
</style>

