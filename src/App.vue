<template>
  <div id="app">
    <el-container style="border: 1px solid #eee">
      <el-header class="el-mainheader" style="text-align:right">
        <div style="margin-left:30px;float: left;font-size: 18px;line-height: 60px">项目管理</div>
        <el-dropdown style="margin-right: 15px;font-size: 18px;">
          <el-badge is-dot class="item">任务列表</el-badge>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>任务1</el-dropdown-item>
            <el-dropdown-item>任务2</el-dropdown-item>
            <el-dropdown-item>任务3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown style="margin-right: 15px;font-size: 18px;">
          <el-badge is-dot class="item" >消息列表</el-badge>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息1</el-dropdown-item>
            <el-dropdown-item>消息2</el-dropdown-item>
            <el-dropdown-item>消息3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>任务中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <myaside/>
        <transition name="slide">
          <router-view></router-view>
        </transition>
      </el-container>
    </el-container>
    <el-dialog
            title="登录"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
      <el-form ref="form" status-icon  label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="une"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input type="password" autocomplete="off" v-model="pwd"></el-input>
        </el-form-item>
      </el-form>
      <el-alert style="margin-top: 5px" v-if="error" title="用户名或密码错误" type="error"></el-alert>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import myaside from "components/aside/aside.vue"
import {request4} from 'network/request.js'
import {Loading} from "element-ui";
export default {
  name: 'App',
  components: {
    myaside,
  },
  data(){
    return {
      une:'',
      pwd:'',
      dialogVisible: false,
      error:false,
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('取消登录？')
              .then(()=> {
                this.dialogVisible = false
                done();
              })
              .catch(()=> {});
    },
    login(){
      request4({
        method: 'post',
        url: '/login',
        data: {
          username: this.une,
          password: this.pwd,
        }
      }).then(res=>{
        //console.log(res)
        this.getuserinfo(res.data.token)
        setTimeout(() => {
          this.getuserinfo(res.data.token)
        }, 90000);
        let user={}
        user.login = true
        this.$store.commit('login',user)
        this.dialogVisible = false
        let loadingInstance  = Loading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        loadingInstance.close();
      }).catch(err=>{
        console.log(err)
        this.error = true
      });
    },
    getuserinfo(token){
      request4({
        method: 'get',
        url: '/userinfo',
        headers: {"Authorization":token}
      }).then(res=>{
        console.log(res)
        let user={}
        user.login = true
        this.$store.commit('login',user)
        this.dialogVisible = false
        let loadingInstance  = Loading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        loadingInstance.close();
      }).catch(err=>{
        console.log(err)
        this.error = true
      });
    }
  },
  created() {
    this.$store.dispatch('showloding')
    if(!this.$store.state.user.login){
      this.dialogVisible = true
    }
  }
}
</script>

<style>
  .el-mainheader {
    background-color: #B3C0D1;
    color: #333;
    line-height: 30px;
  }

  .el-mainaside {
    color: #333;
  }
</style>
