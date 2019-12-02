var express = require('express');
var query = require('../db');
var router = express.Router();
// 登录页

router.post('/',async (req,res)=>{
    // 用户提交的email和password
    const {getEmail, getPwd} = req.body;
    // var getEmail = req.body.uemail;
    // var getPwd = req.body.upassword;
    // var getEmail = 'zhangsan@qq.com';
    // var getPwd = 'zhangsan';
    // 从数据库中获取user表进行对比
    const result = await query('select * from user');
    for(var i=0;i<result.length;i++){
        if(result[i].uemail === getEmail){
            if(result[i].upassword === getPwd){
                var returnUid = result[i].uid;
                return res.send({msg:'success',uid:returnUid});
            }else{
                return res.send({msg:'pwdError'})
            }
        }
        continue;
    }
    return res.send({msg:'notExist'})

});
// 暂未使用该接口
// router.get('/',(req,res)=>{
//     var result = mysql.query('select * from userStore',(result)=>{
//         // console.log(result);
//         return res.send(result)
//     });
// })
module.exports = router;