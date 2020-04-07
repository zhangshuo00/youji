var express = require('express');
var query = require('../db');
const router = express.Router();

router.get('/',async (req,res)=>{
    // 后台管理系统获取所有用户的信息，并进行增删改查
    var result = await query('select * from user');
    result = JSON.parse(JSON.stringify(result));

    res.send(result);
});

module.exports = router;