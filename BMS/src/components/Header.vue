<template>
    <div id="header">
        <div class="header-left">
            <span>有纪后台管理系统</span>
        </div>

        <div class="header-right">
            <el-menu router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item style="margin-left:30px;font-size:16px" index="/home/echarts">首页</el-menu-item>
                <el-menu-item style="margin-left:30px;font-size:16px" index="/home/user">用户</el-menu-item>
                <el-menu-item style="margin-left:30px;font-size:16px" index="/home/essay">文章</el-menu-item>
                <el-menu-item style="margin-left:30px;font-size:16px" index="/home/comments">评论</el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    name: 'header'
}
</script>

<style>
#header{
    display: flex;
    flex-direction: row;
}
.header-left{
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #409EFF;
}
.header-right{
    width: 40%;
}
.header-login{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.header-search{
    width: 20%;
    margin-left: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-input{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
</style>