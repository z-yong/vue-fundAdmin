import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
    SET_AUTHENTICATED: 'SET_AUTHENTICATED',
    SET_UESR: 'SET_UESR'
}

const state = {
  isAuthenticated: false,
  user: {}
}
const getters = {
  isAuthenticated: state =>{
    return state.isAuthenticated
  },
  user: state =>{
    return state.user
  }
}
const mutations = {
  [types.SET_AUTHENTICATED](state,isAuthenticated){
    if(isAuthenticated){
      return state.isAuthenticated = true
    }else{
      return state.isAuthenticated = false
    }
  },
  [types.SET_UESR](state,user){
    if(user){
      return state.user = user
    }else{
      return state.user = {}
    }
  }
}
const actions = {
  setAuthenticated :(context,isAuthenticated) =>{
    return context.commit(types.SET_AUTHENTICATED,isAuthenticated)
  },
  setUser: (context,user) =>{
    context.commit(types.SET_UESR,user)
  },
  // clearUser: context =>{
  //   context.commit(types.SET_AUTHENTICATED,false);
  //   context.commit(types.SET_UESR,null)
  // }
  // ES6写法
  clearUser: ({ commit }) =>{
    commit(types.SET_AUTHENTICATED,false);
    commit(types.SET_UESR,null)
  }
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
