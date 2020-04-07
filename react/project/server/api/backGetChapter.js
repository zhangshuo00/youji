var express = require('express');
var query = require('../db');
const router = express.Router();

router.get('/',async (req,res)=>{
    // 返回数据库中 chapter表中所有文章的数据
    var result = await query('select * from chapter');
    result = JSON.parse(JSON.stringify(result));

    res.send(result);
});

module.exports = router;