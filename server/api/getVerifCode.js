var express = require('express');
var query = require('../db');
var gmail = require('../gmail');
var GenVerificationCode = require('../GenVerificationCode')
const router = express.Router();

router.post('/',async (req,res)=>{
    const { uemail } = req.body;

    // 生成一个四位随机验证码
    var vcode = GenVerificationCode();

    // 更新数据库中该用户的验证码字段为已生成的code
    await query('UPDATE user SET Vcode=? where uemail=?',[vcode,uemail]);

    // 向用户邮箱发送验证码
    gmail(uemail,vcode)

    res.send({msg:'ok'})
    // res.send({msg:'success'})
});

module.exports = router;