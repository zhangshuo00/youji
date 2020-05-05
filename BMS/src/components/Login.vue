<template>
    <div id="login">
        <div class="login-form">
            <el-form style="margin-top:15%" :label-position="left" label-width="80px" :model="formLabelAlign">
                <el-form-item label="账 号：">
                    <el-input style="width:90%;float:left" v-model="name"></el-input>
                </el-form-item>
                <el-form-item label="密 码：">
                    <el-input style="width:90%;float:left" placeholder="请输入密码" v-model="password" show-password></el-input>
                </el-form-item>
            </el-form>
            <el-button style="width:120px" type="primary" @click="login()" round>登 录</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            name: '',
            password: ''
        }
    },
    methods: {
        login: function(){
            this.axios.get('/backLogin',{
                params:{
                    user: this.name,
                    password: this.password
                }
            })
            .then(res=>{
                console.log(res);
                if(res.msg === 'success'){
                    // 跳转进主页
                }else{
                    // 返回具体信息
                }
            })
        }
    }
}
</script>

<style>
#login{
    margin: 0 auto;
    width: 98%;
    height: 98%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/backgroundimg.jpg');
    background-size:100% 100%;
}
.login-form{
    width: 30%;
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #DCDFE6;
    border-radius: 15px;
}
</style>