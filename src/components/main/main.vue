<template>
    <el-container style="border: 1px solid #eee">
        <el-header style="font-size: 18px;line-height: 60px">
            <div style="float: left;padding-top: 15px">
                <el-page-header @back="goBack" content="首页">
                </el-page-header>
            </div>
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
    //import {Loading} from "element-ui";

    export default {
        name: "mymain",
        data(){
            return{

            }
        },
        components:{
        },
        computed:{
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
            },
        },
        created() {
            //展示加载

            // let user={}
            // user.login = true
            // setTimeout(() => {
            //     this.$store.commit('login',user)
            // }, 2000);
            //
            // let loadingInstance  = Loading.service({
            //     lock: true,
            //     text: 'Loading',
            //     spinner: 'el-icon-loading',
            //     background: 'rgba(0, 0, 0, 0.7)'
            // });
            // loadingInstance.close();
        },
    }
</script>

<style scoped>

</style>