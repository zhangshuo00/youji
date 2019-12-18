var express = require('express');
var query = require('../db');
const router = express.Router();
// 忘记密码的接口

router.post('/',async(req,res)=>{
    const {uid,uemail,uname} = req.body;
    // const uid = 121212,uemail='zhangsan@qq.com',uname=33333;
    var a = 0,b = 0;

    var aemail = await query('select uemail from user');
    aemail = JSON.parse(JSON.stringify(aemail));
    console.log(aemail);
    for(var i =0;i<aemail.length;i++){
        if(aemail[i].uemail === uemail){
            a = 1;
            // 邮箱验证成功
            var auid = await query('select uid from user where uemail=?',[aemail[i].uemail]);
            auid = JSON.parse(JSON.stringify(auid));
            if(auid[0].uid === uid){
                // uid验证成功
                b = 1;
                return res.send({msg:'success'});
            }
            if(b === 0){
                return res.send({msg:'uid not match'});
            }
        }
    }
    if(a === 0){
        return res.send({msg:'uemail not exist'});
    }

});

module.exports = router;