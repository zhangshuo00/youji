var express = require('express');
var query = require('../db');
const fs = require('fs');
const router = express.Router();
// 修改个人信息页的api

router.post('/',async (req,res)=>{
    const {uid,uname,usex,signature,imgData} = req.body;

    // const uid = 'k3i297def';
    // const uname = '天马行空';
    // const usex = '男';
    // const signature = '我不懒，所以我写了点啥'
    var img_path = 'images/'+uid+uname+'.jpg';
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = Buffer.from(base64Data,'base64');
    fs.writeFileSync('../src/images/'+uid+uname+'.jpg',dataBuffer);


    await query('update user set uname=?,usex=?,signature=?,headimg=? where uid=?',[uname,usex,signature,img_path,uid]);
    res.send({msg:'success'});
});

module.exports = router;