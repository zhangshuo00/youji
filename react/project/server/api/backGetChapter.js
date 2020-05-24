var express = require('express');
var query = require('../db');
const router = express.Router();

router.get('/',async (req,res)=>{
    // 返回数据库中 chapter表中所有文章的数据
    const { key } = req.query;
    if(key === 'admin'){
        var result = await query('select * from chapter');
        result = JSON.parse(JSON.stringify(result));
    
        return res.send(result);
    }else{
        return res.send({"msg":"key error"})
    }
});

module.exports = router;