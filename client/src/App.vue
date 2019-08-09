<template>
  <div id="app">
    <my-home></my-home>
  </div>
</template>


<script>
import Home from './views/Home.vue'
import jwt_decode from 'jwt-decode'

export default {
    components: {
      'my-home': Home
    },
    // 在全局中也设定一下token  防止用户刷新时token消失
    created(){
      if(localStorage.getItem('eleToken')){
        const decode = jwt_decode(localStorage.getItem('eleToken'));
        this.$store.dispatch('setAuthenticated',!this.isEmpty(decode));
        this.$store.dispatch('setUser',decode);
      }
    },
    methods: {
      // 判断是否为空
          isEmpty: function(value){
              return value == undefined || value == null || 
                    (typeof value == 'object' && Object.keys(value).length === 0) ||
                    (typeof value == 'string' && value.trim().length === 0)
          }
    }
}
</script>

<style>
  html,body{
    width: 100%;
  }
  body,ul,li,a,p{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
  }
</style>
