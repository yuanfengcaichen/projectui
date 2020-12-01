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
        <Aside/>
        <transition name="slide">
          <router-view></router-view>
        </transition>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "components/aside/aside.vue"
//import Main from "components/main/main.vue"
export default {
  name: 'App',
  components: {
    Aside,
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
