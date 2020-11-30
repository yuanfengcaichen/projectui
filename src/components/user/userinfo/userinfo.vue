<template>
    <el-container style="border: 1px solid #eee">
        <el-header style="font-size: 18px;line-height: 60px">
            <div style="float: left">Userinfo</div>
            <div style="float: right;padding-top: 20px">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>用户中心</el-breadcrumb-item>
                    <el-breadcrumb-item>用户信息</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-header>

        <el-main>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>用户信息</span>
<!--                            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'用户信息 ' + o }}
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="16">
                    <el-card class="box-card">
                        <div class="block">
                            <el-timeline>
                                <el-timeline-item
                                    v-for="(activity, index) in activities"
                                    :key="index"
                                    :icon="activity.icon"
                                    :type="activity.type"
                                    :color="activity.color"
                                    size="large"
                                    placement="top"
                                    :timestamp="activity.timestamp">
                                    <el-card>
                                        <h4>{{activity.title}}</h4>
                                        <p>{{activity.content}}</p>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "userinfo",
        data() {
            return {
                activities: [{
                    title: 'title',
                    content: '支持使用图标',
                    timestamp: '2018-04-12 20:46',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-more'
                }, {
                    title: 'title',
                    content: '支持自定义颜色',
                    timestamp: '2018-04-03 20:46',
                    color: '#0bbd87'
                }, {
                    title: 'title',
                    content: '支持自定义尺寸',
                    timestamp: '2018-04-03 20:46',
                    size: 'large'
                }, {
                    title: 'title',
                    content: '默认样式的节点',
                    timestamp: '2018-04-03 20:46'
                }]
            };
        }
    }
</script>

<style scoped>

    .item {
        margin-bottom: 18px;
    }
</style>