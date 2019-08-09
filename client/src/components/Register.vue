<template>
    <div class="wrapper">
        <p class="title">遨科在线后台管理系统</p>
        <div class="box">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model.number="ruleForm.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model.number="ruleForm.email" placeholder='请输入邮箱'></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder='请输入密码'></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input type="password" v-model="ruleForm.password2" autocomplete="off" placeholder='请输入重复密码'></el-input>
                </el-form-item>
                <el-form-item label="选择身份">
                    <el-select v-model="ruleForm.identity" placeholder='请选择身份'>
                        <el-option label='管理员' value='manager'></el-option>
                        <el-option label='员工' value='employee'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="submit">
                    <el-button class="submit-btn" type="primary" @click="submitForm('ruleForm')">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- <div class="loading">
            <svg class="img" xmlns='http://www.w3.org/2000/svg' version='1.1'>
                <circle class="circle move" cx = "150" cy = "100" r = '40' fill = 'none'></circle>
            </svg>
        </div> -->
        <!-- <el-table v-loading="loading" :data="tableData" style="width: 100%">  -->
            <!-- <el-table-column prop="date"  label="日期"  width="180"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column> -->
        <!-- </el-table> -->
    </div>
</template>

<script>
export default {
    data(){
        // 在return的规则里面使用validatePass2
         var validatePass2 = (rule, value, callback) => {
            if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                name: '',
                email:'',
                password: '',
                password2: '',
                identity: ''
            },
            rules: {
                name: [
                    {required: true, message: '用户名不能为空', trigger: 'blur' },
                    {min: 2,max: 20,message: '长度在2-20之间', trigger: 'blur'}
                ],
                email: [
                     {type: 'email', required: true, message: '邮箱格式不正确', trigger: 'blur' },
                ],
                password: [
                     {required: true, message: '密码不能为空', trigger: 'blur' },
                     {min: 6, max: 30, message: '密码长度在6-30之间'}
                ],
                password2: [
                     {required: true, message: '重复密码不能为空', trigger: 'blur' },
                     {validator: validatePass2,trigger: 'blur'}
                ],
            },
            loading: true
        }
    },
    methods: {
        submitForm: function(formName){
            this.$refs[formName].validate((valid) => {
                if(!this.ruleForm.identity){
                    alert('请选择身份');
                }
                if (valid && this.ruleForm.identity) {
                    this.axios.post('api/users/register',this.ruleForm).then(response =>{
                        console.log(response);
                        this.$message({
                            type: 'sucess',
                            message: '注册成功！'
                        })
                        this.$router.push('/')
                    },error =>{
                        console.log(error)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
        width: 400px;
        height: 350px;
        background: #fff;
        margin: 50px auto;
        padding: 20px 30px 30px 0
    }
    .submit-btn{
        min-width:260px;
        background: #00f;
        color: #Fff;
        border: 1px solid #00f;
        padding: 10px 2px;
        border-radius: 4px
    }
    /* 加载蒙层 */
    .loading{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: 1px solid red;
        background-color: rgb(51, 35, 35,0.7)
    }
    .loading .img{
        position: absolute;
        top: 42%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .circle{
        stroke: aquamarine;
        stroke-width: 4px;
        /* 以125px为一段线 150px为一段空 一次循环 */
        stroke-dasharray: 150px; 
        transform-origin: 50% 68%;
        /* 往回缩150px */
        /* stroke-dashoffset: 150px; */
    }
    .move{
        animation: move 3s linear
    }
    @keyframes move{
        100%{
            transform: rotate(1060deg)
        }
    }
</style>

