<template>
    <el-container style="border: 1px solid #eee">
        <el-header style="font-size: 18px;line-height: 60px">
            <div style="float: left;padding-top: 15px">
                <el-page-header @back="goBack" content="用户列表">
                </el-page-header>
            </div>
            <div style="float: right;padding-top: 20px">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-header>

        <el-main>
            <el-button-group style="margin-bottom: 10px">
                <el-button type="primary" icon="el-icon-document" @click="newmodal()">新建</el-button>
                <el-button type="primary" icon="el-icon-edit" @click="update()">修改</el-button>
                <el-button type="primary" icon="el-icon-delete" @click="deleteitem()">删除</el-button>
                <el-button type="primary" icon="el-icon-refresh" @click="refresh()">刷新</el-button>
            </el-button-group>
            <el-table
                    :data="userList"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="uid"
                        label="用户编号"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="用户名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="userrole.role_name"
                        label="角色"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="create_time"
                        label="创建时间"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="is_lock"
                        label="是否锁定"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small">修改权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style="margin-top: 10px">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[5, 10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import {request4} from 'network/request.js'
    export default {
        name: "userManager",
        data() {
            return {
                userList: [],
                multipleSelection: [],
                pageNum: 1,
                pageSize: 5,
                total: 1,
            }
        },
        computed: {
            token(){
                return this.$store.state.user.token
            }
        },
        methods: {
            getplist(){
                let that = this;
                request4({
                    method: 'get',
                    url: '/users',
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                    },
                    headers: {"Authorization":this.token}
                }).then(res=>{
                    console.log(res)
                    that.userList = res.data.list
                    that.total = res.data.total
                }).catch(err=>{
                    console.log(err)
                    this.error = true
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClick(row) {
                console.log(row);
            },
            handleSizeChange(val) {
                //console.log(`每页 ${val} 条`);
                this.pageSize = val
                this.getplist()
            },
            handleCurrentChange(val) {
                //console.log(`当前页: ${val}`);
                this.pageNum = val
                this.getplist()
            },
            newmodal(){

            },
            update(){

            },
            deleteitem(){
                console.log(this.multipleSelection)
            },
            refresh(){
                this.getplist()
                this.$message({ message: '刷新成功', type: 'success' });
            }
        },
        created() {
            this.getplist()
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>