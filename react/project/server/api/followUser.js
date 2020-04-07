var express = require('express');
var query = require('../db');
const router = express.Router();
// 关注用户

router.post('/',async (req,res)=>{
    // 当前登录用户uid，查看的用户的ruid
    const {uid,ruid} = req.body;
    // 在followUsers表中添加对应项
    await query('insert into followUsers (uid,foluid) values(?,?)',[uid,ruid]);

    res.send({msg:'success'});
});

module.exports = router;