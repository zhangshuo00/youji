var express = require('express');
var query = require('../db');
const router = express.Router();
// 用户发送消息的api

router.post('/',async (req,res)=>{
    const {uid,ruid,msg} = req.body;
    // 当前用户的uid和接收方的uid，以及发送的消息内容

    // 
});

module.exports = router;