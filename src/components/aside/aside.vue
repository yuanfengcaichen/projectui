<template>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1','2', '3']">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>项目管理</template>
                <el-menu-item index="1-1">项目列表</el-menu-item>
                <el-menu-item index="1-2">项目阶段</el-menu-item>
                <el-menu-item index="1-3">阶段任务</el-menu-item>
                <el-menu-item index="1-4">任务分配</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>用户中心</template>
                <el-menu-item index="2-1">用户信息</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
                <el-menu-item index="3-1">用户管理</el-menu-item>
                <el-menu-item index="3-2">角色管理</el-menu-item>
                <el-menu-item index="3-3">权限管理</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: "aside"
    }
</script>

<style scoped>

</style>