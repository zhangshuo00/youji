var express = require('express');
var query = require('../db');
const router = express.Router();
// 取消关注用户

router.post('/',async (req,res)=>{
    // 当前登录用户uid，查看的用户的ruid
    const {uid,ruid} = req.body;
    // 在followUsers表中删除对应项
    await query('delete from followUsers where uid=? and foluid=?',[uid,ruid]);

    res.send({msg:'success'});
});

module.exports = router;