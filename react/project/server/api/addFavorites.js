var express = require('express');
var query = require('../db');
const router = express.Router();
// 添加收藏文章请求api

router.post('/',async (req,res)=>{
    const {uid,chid} = req.body;
    // const uid = 'k3mimknra';
    // const chid = 4;
    await query('insert into userCollection (uid,chid) values(?,?)',[uid,chid]);
    var favorites = await query('select favorites from chapter where chid=?',[chid]);
    favorites = JSON.parse(JSON.stringify(favorites))[0].favorites;
    favorites ++;
    // console.log(favorites);
    await query('update chapter set favorites=? where chid=?',[favorites,chid]);

    res.send({msg:'success'});

});

module.exports = router;