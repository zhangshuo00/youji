var express = require('express');
var query = require('../db');
const router = express.Router();

router.get('/',async (req,res)=>{
    var count = {};
    // 返回用户数量
    var userCount = await query('select count(uid) as ucount from user');
    userCount = JSON.parse(JSON.stringify(userCount))[0].ucount;
    count.userCount = userCount;
    // console.log(userCount);
    var chapterCount = await query('select count(chid) as ccount from chapter');
    chapterCount = JSON.parse(JSON.stringify(chapterCount))[0].ccount;
    count.chapterCount = chapterCount

    res.send(count);
});

module.exports = router;