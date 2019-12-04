var express = require('express');
var query = require('../db');
const router = express.Router();
// 修改个人信息页的api

router.get('/',async (req,res)=>{
    // const {uid,uname,usex,signature} = req.body;

    const uid = 'k3i297def';
    const uname = '天马行空';
    const usex = '男';
    const signature = '我不懒，所以我写了点啥'

    await query('insert into table user (uname,usex,signature) values(?,?,?)',[uname,usex,signature]);
    res.send({msg:'success'});
});

module.exports = router;