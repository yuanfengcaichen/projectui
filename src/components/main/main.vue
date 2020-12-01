<template>
    <el-container style="border: 1px solid #eee">
        <el-header style="font-size: 18px;line-height: 60px">
            <div style="float: left">首页</div>
            <div style="float: right;padding-top: 20px">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-header>

        <el-main>
        </el-main>
    </el-container>
</template>

<script>
    import {request4} from 'network/request.js'
    export default {
        name: "main",
        components:{
        },
        methods:{
            getuserinfo(){
                request4({
                    method: 'post',
                    url: '/analysis/test',
                    data: {
                        firstName: 'Fred',
                        lastName: 'Flintstone'
                    }
                }).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                });
            }
        },
        created() {
            this.getuserinfo()
        }
    }
</script>

<style scoped>

</style>