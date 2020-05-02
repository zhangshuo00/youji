var express = require('express');
var query = require('../db');
var router = express.Router();
// 删除用户的指定搜索历史

router.post('/',async(req,res)=>{
    const { uid, keyword } = req.body;

    var keyid = await query('select keyid from searchHistory where keyword=?',[keyword]);
    keyid = JSON.parse(JSON.stringify(keyid))[0].keyid;
    await query('delete from userSearchHistory where uid=? and keyid=?',[uid,keyid]);
    
    res.send({"msg":"success"});
     
});

module.exports = router;