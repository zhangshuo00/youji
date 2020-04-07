var express = require('express');
var query = require('../db');
const router = express.Router();

router.post('/',async (req,res)=>{
    var {uid} = req.body;
    // const uid = 'k3i297def';
    var result = await query('select headimg,uname,uemail from user where uid=?',[uid]);
    result = JSON.parse(JSON.stringify(result));

    res.send(result);
    // [{"headimg":"../images/zhangsan.jpg","uname":"张三","uemail":"zhangsan@qq.com"}]
});

module.exports = router;