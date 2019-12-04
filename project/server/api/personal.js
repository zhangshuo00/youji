var express = require('express');
var query = require('../db');
const router = express.Router();
// 个人信息页api

router.post('/',async (req,res)=>{
    // 请求需携带的参数 uid
    const {uid} = req.body;
    // const uid = 'k3i297def';
    
    var result = await query('select uname,headimg,signature from user where uid=?',[uid]);
    result = JSON.parse(JSON.stringify(result));

    res.send(result);
    // [{"uname":"张三","headimg":"../images/zhangsan.jpg","signature":"这个人很懒，什么都没有写"}]
});

module.exports = router;