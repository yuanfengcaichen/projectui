import Vue from 'vue'
import Vuex from 'vuex'

import { Loading } from 'element-ui';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      islogin: false,
    }
  },
  mutations: {
    login(user){
      this.state.user = user
    }
  },
  actions: {
    checklogin(){
      return this.state.user.islogin
    },
    showloding(){
      Loading.service({
        lock: !this.state.user.islogin,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }
  },
  modules: {
  }
})
