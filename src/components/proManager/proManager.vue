<template>
    <el-container style="border: 1px solid #eee">
        <el-header style="font-size: 18px;line-height: 60px">
            <div style="float: left;padding-top: 15px">
                <el-page-header @back="goBack" content="项目列表">
                </el-page-header>
            </div>
            <div style="float: right;padding-top: 20px">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>项目管理</el-breadcrumb-item>
                    <el-breadcrumb-item>项目列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-header>

        <el-main>
            <el-button-group style="margin-bottom: 10px">
                <el-button type="primary" icon="el-icon-document">新建</el-button>
                <el-button type="primary" icon="el-icon-edit">修改</el-button>
                <el-button type="primary" icon="el-icon-delete">删除</el-button>
                <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
            </el-button-group>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="date"
                        label="日期"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="province"
                        label="省份"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="市区"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="zip"
                        label="邮编"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style="margin-top: 10px">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "proManager",
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClick(row) {
                console.log(row);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },

        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                }],
                multipleSelection: [],
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
            }
        }
    }
</script>

<style scoped>

</style>