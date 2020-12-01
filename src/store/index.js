import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
  },
  actions: {
    creataxios(){
      let that = this
      let myaxios = axios.create({});
      myaxios.interceptors.request.use((config)=>{
        // 在发送请求之前做些什么
        if(config.url=="/analysis/uploadfile"||config.url=="/analysis/sendselect"){
          this.fileloading = true
        }
        else{
          this.imgloading = true
        }
        return config;
      }, function (error) {
        // 对请求错误做些什么

        console.log(error)
        return Promise.reject(error);
      });

      // 添加响应拦截器
      myaxios.interceptors.response.use((response)=> {
        // 对响应数据做点什么
        if(response.config.url=="/analysis/uploadfile"||response.config.url=="/analysis/sendselect"){
          this.fileloading = false
        }
        else{
          this.imgloading = false
        }
        //console.log(response)
        return response;
      }, function (error) {
        // 对响应错误做点什么
        that.fileloading = false
        that.imgloading = false
        //console.log(error)
        //that.makeToast('danger',"error")
        return Promise.reject(error);
      });
      return myaxios
    },
  },
  modules: {
  }
})
