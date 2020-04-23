var express = require('express');
var query = require('../db');
const router = express.Router();
// 修改密码的api

router.post('/',async (req,res)=>{
    const { uemail,upassword,vcode } = req.body;

    // 对比用户发送验证码与数据库中验证码
    var dataCode = await query('SELECT Vcode FROM user WHERE uemail=?',[uemail])
    dataCode = JSON.parse(JSON.stringify(dataCode))[0].Vcode
    console.log(dataCode)

    if(dataCode === vcode){
        await query('update user set upassword=?,Vcode=? where uemail=?',[upassword,'',uemail]);
        res.send({msg:'success'});
    }else{
        res.send({msg:'vcode error'})
    }
    
});

module.exports = router;