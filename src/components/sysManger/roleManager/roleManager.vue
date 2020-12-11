<template>
    <el-container style="border: 1px solid #eee">
        <el-header style="font-size: 18px;line-height: 60px">
            <div style="float: left;padding-top: 15px">
                <el-page-header @back="goBack" content="角色管理">
                </el-page-header>
            </div>
            <div style="float: right;padding-top: 20px">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                    <el-breadcrumb-item>角色管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-header>

        <el-main>
            <el-button-group style="margin-bottom: 10px">
                <el-button type="primary" icon="el-icon-document" @click="newmodal()">新建</el-button>
                <el-button type="primary" icon="el-icon-delete" @click="deleteitem()">删除</el-button>
                <el-button type="primary" icon="el-icon-refresh" @click="refresh()">刷新</el-button>
            </el-button-group>
            <el-table
                    :data="roleList"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="rid"
                        label="角色编号"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="role_name"
                        label="角色名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="role_info"
                        label="角色信息"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="is_lock"
                        label="是否启用"
                        width="120">
                    <template slot-scope="scope">
                        {{scope.row.is_lock==0?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="create_time"
                        label="创建时间"
                        width="200">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
                        <el-button type="text" size="small" @click="update(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="getroleperes(scope.row.rid)">修改权限</el-button>
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
        <el-drawer title="角色信息" :visible.sync="editdrawer" :with-header="false" :before-close="edithandleClose" ref="editdrawer">
          <el-form style="margin-top: 30px">
              <el-form-item label="角色id" :label-width="'100px'" v-if="false">
                  <el-input v-model="rid" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="角色名称" :label-width="'90px'">
                  <el-input v-model="role_name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" :label-width="'90px'">
                  <el-input v-model="role_info" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="启用" :label-width="'90px'">
                  <el-switch v-model="is_lock"> </el-switch>
              </el-form-item>
          </el-form>
            <div class="demo-drawer__footer">
                <el-button @click="canceleditForm">取 消</el-button>
                <el-button type="primary" @click="$refs.editdrawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
            </div>
        </el-drawer>
        <el-drawer title="权限设置" :visible.sync="drawer" :with-header="false" :before-close="handleClose" ref="drawer">
            <el-checkbox-group v-model="rpermisses" class="checkboxgroup">
                <el-checkbox class="checkbox" v-for="permiss in Allpermisses" :label="permiss.permission_info" :key="permiss.perid">{{permiss.permission_info}}</el-checkbox>
            </el-checkbox-group>
            <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
            </div>
        </el-drawer>
    </el-container>
</template>

<script>
    import {request4} from 'network/request.js'
    export default {
        name: "roleManager",
        data() {
            return {
                roleList: [],
                editdrawer: false,
                multipleSelection: [],
                pageNum: 1,
                pageSize: 5,
                total: 1,
                drawer: false,
                loading: false,
                timer: null,
                rid:0,
                role_name:'',
                role_info:'',
                is_lock:false,
                Allpermisses: [],
                rpermisses: [],
            }
        },
        computed: {
            token(){
                return this.$store.state.user.token
            }
        },
        methods: {
            getplist(){//获取全部角色
                let that = this;
                request4({
                    method: 'get',
                    url: '/roles',
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                    },
                    headers: {"Authorization":this.token}
                }).then(res=>{
                    //console.log(res)
                    that.roleList = res.data.list
                    that.total = res.data.total
                }).catch(err=>{
                    console.log(err)
                    this.error = true
                });
            },
            getAllpermiss(){//获取全部权限
                let that = this;
                request4({
                    method: 'get',
                    url: '/permisses',
                    params: {
                    },
                    headers: {"Authorization":this.token}
                }).then(res=>{
                    //console.log(res)
                    that.Allpermisses = res.data.list
                }).catch(err=>{
                    console.log(err)
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
                this.rid=0;
                this.role_name='';
                this.role_info='';
                this.is_lock = true;
                this.editdrawer = true;
            },
            update(row){
                this.rid=row.rid;
                this.role_name=row.role_name;
                this.role_info=row.role_info;
                this.is_lock = row.is_lock==0?true:false
                this.editdrawer = true;
            },
            deleteitem(){
                if(this.multipleSelection.length!=0){
                    let that = this;
                    let rids = [];
                    for(let i=0;i<this.multipleSelection.length;i++){
                        rids.push(this.multipleSelection[i].rid)
                    }
                    this.$confirm('确认删除？')
                        .then(() => {
                            request4({
                                method: 'delete',
                                url: '/role',
                                data: {"rids" : rids},
                                headers: {"Authorization":this.token}
                            }).then(res=>{
                                if(res.data.result==200&&res.data.type=='delete'){
                                    that.$message({message: '角色删除成功',type: 'success'});
                                }
                                that.getplist()
                            }).catch(err=>{
                                console.log(err)
                                that.$message({  message: '操作失败', type: 'error' });
                            })
                            that.multipleSelection = []
                        })
                        .catch(() => {});
                }
            },
            refresh(){
                this.getplist()
                this.getAllpermiss()
                setTimeout(()=>{this.$message({ message: '刷新成功', type: 'success' })},1200)
            },
            getroleperes(rid){//获取当前选则角色的权限列表
                this.rid = rid
                this.rpermisses = []
                let that = this;
                request4({
                    method: 'get',
                    url: '/role_permisses',
                    params: {
                        rid: rid,
                    },
                    headers: {"Authorization":this.token}
                }).then(res=>{
                    //console.log(res)
                    for(let i=0;i<res.data.list.length; i++){
                        that.rpermisses.push(res.data.list[i].permission_info)
                    }
                    that.drawer = true
                }).catch(err=>{
                    console.log(err)
                    this.error = true
                });
            },
            handleClose() {
                let that = this;
                if (this.loading) {
                    return;
                }
                this.$confirm('确定要提交表单吗？')
                    .then(() => {
                        this.loading = true;
                        this.timer = setTimeout(() => {
                            request4({
                                method: 'post',
                                url: '/permisses',
                                data: {
                                    rid: this.rid,
                                    rpermisses:this.rpermisses
                                },
                                headers: {"Authorization":this.token}
                            }).then(res=>{
                                if(res.data.result==200){
                                    that.$message({
                                        message: '权限修改成功',
                                        type: 'success'
                                    });
                                }
                            }).catch(err=>{
                                console.log(err)
                                that.$message({
                                    message: '修改失败',
                                    type: 'error'
                                });
                            });
                            this.drawer = false;
                            // 动画关闭需要一定的时间
                            setTimeout(() => {
                                this.loading = false;
                            }, 400);
                        }, 1000);
                    })
            },
            edithandleClose(){
                let that = this;
                this.$confirm('确定要提交表单吗？')
                        .then(() => {
                            this.loading = true;
                            this.timer = setTimeout(() => {
                                request4({
                                    method: 'post',
                                    url: '/role',
                                    data: {
                                        rid:this.rid,
                                        role_name:this.role_name,
                                        role_info:this.role_info,
                                        is_lock:this.is_lock==true?0:1,
                                    },
                                    headers: {"Authorization":this.token}
                                }).then(res=>{
                                    if(res.data.result==200&&res.data.type=='add'){
                                        that.$message({message: '角色添加成功',type: 'success'});
                                    }
                                    else if(res.data.result==200&&res.data.type=='edit'){
                                        that.$message({message: '角色信息修改成功',type: 'success'});
                                    }
                                    that.getplist()
                                }).catch(err=>{
                                    console.log(err)
                                    that.$message({
                                        message: '操作失败',
                                        type: 'error'
                                    });
                                });
                                this.editdrawer = false;
                                // 动画关闭需要一定的时间
                                setTimeout(() => {
                                    this.loading = false;
                                }, 400);
                            }, 500);
                        })
            },
            cancelForm() {
                this.loading = false;
                this.drawer = false;
                clearTimeout(this.timer);
            },
            canceleditForm(){
                this.editdrawer = false;
            }
        },
        created() {
            this.getplist()
            this.getAllpermiss()
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .checkboxgroup{
        padding-top: 20px;
        padding-left: 30px;
    }
    .checkbox{
        display: block;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .demo-drawer__footer{
        transform: translate(80%, -50%);
        position: fixed;
        bottom: 25px;
    }
</style>