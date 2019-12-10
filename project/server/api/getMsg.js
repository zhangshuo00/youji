var express = require('express');
var query = require('../db');
const router = express.Router();
// 返回前端两用户之间的消息

router.post('/',async (req,res)=>{
    const {uid,ruid} = req.body;
    // 返回的内容有：当前用户与接收用户的所有消息，并按照时间排序
    // 以及接收用户的uname,头像
});

module.exports = router;