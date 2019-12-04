var express = require('express');
var query = require('../db');
var GenNonDuplicateID = require('../GenNonDuplicateID');
var router = express.Router();
// 注册页

router.post('/',async (req,res)=>{
    // 用户提交的昵称、邮箱和密码
    const {uname,uemail,upassword} = req.body;
    // const uname = 'lisi';
    // const uemail = 'lisi@qq.com'
    // const upassword = 'wangwu';

    // 先判断用户提交的email是否已经注册过
    var existEmail = await query('select uemail from user');
    existEmail = JSON.parse(JSON.stringify(existEmail));
    for(var i=0;i<existEmail.length;i++){
        if(uemail === existEmail[i].uemail){
            return res.send({msg:'ueamil exists'})
        }
    }
    // console.log(existEmail)
    // console.log(uname,uemail,upassword)
    var uid = GenNonDuplicateID(1);
    // 向数据库的 userStore表中写入数据，uid统一使用时间戳生成
    await query('INSERT INTO user(uid,uemail,uname,upassword) VALUES(?,?,?,?)',[uid,uemail,uname,upassword]);
    return res.send({msg:'signSuccess'});
})
module.exports = router;