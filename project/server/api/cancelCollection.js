var express = require('express');
var query = require('../db');
const router = express.Router();
// 取消收藏文章

router.post('/',async (req,res)=>{
    const {uid,chid} = req.body;
    // const uid = 'k3mimknra';
    // const chid = 3;
    // 前端在发起请求的时候已经判断过该文章是否被收藏
    await query('delete from userCollection where uid=? and chid=?',[uid,chid]);
    var favorites = await query('select favorites from chapter where chid=?',[chid]);
    favorites = JSON.parse(JSON.stringify(favorites))[0].favorites;
    favorites --;
    await query('update chapter set favorites=? where chid=?',[favorites,chid]);

    res.send({msg:'success'});
});

module.exports = router;