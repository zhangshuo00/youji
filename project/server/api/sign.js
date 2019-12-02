var express = require('express');
var query = require('../db');
var GenNonDuplicateID = require('../GenNonDuplicateID');
var router = express.Router();
// 注册页

router.post('/',async (req,res)=>{
    // 用户提交的昵称、邮箱和密码
    const {uname,uemail,upassword} = req.body;
    console.log(uname,uemail,upassword)
    var uid = GenNonDuplicateID(1);
    // 向数据库的 userStore表中写入数据，uid统一使用时间戳生成
    const rows = await query('INSERT INTO user(uid,uemail,uname,upassword) VALUES(?,?,?,?)',[uid,uemail,uname,upassword]);
    res.send({msg:'signSuccess'});
})
module.exports = router;