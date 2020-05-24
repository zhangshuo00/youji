var express = require('express');
var query = require('../db');
const router = express.Router();

router.get('/',async (req,res)=>{
    // 后台管理系统获取所有用户的信息，并进行增删改查
    const { key } = req.query;
    if(key === 'admin'){
        var result = await query('select * from user');
        result = JSON.parse(JSON.stringify(result));
    
        return res.send(result);
    }else{
        return res.send({"msg":"key error"})
    }

});

module.exports = router;