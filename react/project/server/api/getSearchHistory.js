var express = require('express');
var query = require('../db');
var router = express.Router();
// 获取用户的搜索历史

router.post('/',async(req,res)=>{
    const {uid} = req.body;
    // const uid = 'k3mimknra';
    var keyWordArray = []

    var keyID = await query('select keyid from userSearchHistory where uid=?',[uid]);
    keyID = JSON.parse(JSON.stringify(keyID));

    for(var i=0,len=keyID.length;i<len;i++){
        var keyWord = await query('select keyword from searchHistory where keyid=?',[keyID[i].keyid]);
        keyWord = JSON.parse(JSON.stringify(keyWord));
        keyWordArray.push(keyWord[0].keyword)
    }

    res.send({"uid":uid,"keyword":keyWordArray})
});

module.exports = router;