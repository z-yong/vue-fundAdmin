<template>
    <div class="wrapper">
        <ul class="list">
            <li class="img">
                <img class="head" :src="user.avatar" alt="">
            </li>
            <li class="message">
               <div class="messBox">
                    <p>姓名: <span>{{ user.name }}</span></p>
                    <p>身份: <span>{{ user.identity === 'manager' ? '管理员' : '普通员工' }}</span> </p>
               </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    // data(){
    //     return {
    //         user: ''
    //     }
    // },
    computed: {
        user(){
            return this.$store.getters.user;
        }
    }
    // created(){
    //     this.user = this.$store.state.user;
    //     if(this.user.identity == "manager"){
    //         this.user.identity = '管理员'
    //     }else if(this.user.identity == 'employee'){
    //         this.user.identity = '普通员工'
    //     }
    // }
}
</script>



<style scoped>
    .wrapper,.list{
        height: 100%;
    }
    .list li{
        display: inline-block;
        height: 100%;
    }
    .img{
        position: relative;
        width: 33%;
    }
    .img img{
        width: 150px;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 50%
    }
    .message{
        position: relative;
        width: 67%;
        background: #eee
    }
    .message .messBox{
        position: absolute;
        top: 36%;
        transform: translate(0,-50%)
    }
    .messBox p{
        font-size: 20px;
        height: 50px;
        margin-left: 30px;
        font-weight: 700
    }
    .messBox p span{
        font-weight: 500;
        line-height: 50px;
        font-size: 18px;
        margin-left: 10px
    }
</style>

