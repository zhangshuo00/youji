var express = require('express');
var query = require('../db');
const router = express.Router();

router.post('/',async (req,res)=>{
    // 当前登录用户uid，需要删除文章的chid
    const {uid,chid} = req.body;

    await query('delete from images where chid=?',[chid[i].chid]);// 删除文章对应的图片
    await query('delete from userCollection where chid=?',[chid[i].chid]);// 删除文章对应收藏
    await query('delete from userLikes where chid=?',[chid[i].chid]);// 删除文章对应的喜欢
    await query('delete from chapter where chid=? and uid=?',[chid,uid]);// 删除文章
    
    res.send({msg:'success'});
});

module.exports = router;