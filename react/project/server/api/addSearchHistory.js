var express = require('express');
var query = require('../db');
var router = express.Router();
// 获取用户的搜索历史

router.post('/',async(req,res)=>{
    const { uid, keyword } = req.body;
    var exists = false;

    // 先在searchHistory表中查询是否有重复记录
    var allHistory = await query('select keyword from searchHistory');
    allHistory = JSON.parse(JSON.stringify(allHistory));
    // res.send(allHistory)

    for(var i=0;i<allHistory.length;i++){
        // 如果有该记录，则查询userSearchHistory中是否存在对应关系
        if(keyword === allHistory[i].keyword){
            exists = true;
            var keyid = await query('select keyid from searchHistory where keyword=?',[keyword]);
            keyid = JSON.parse(JSON.stringify(keyid))[0].keyid;

            await query('insert into userSearchHistory (uid,keyid) values (?,?)',[uid,keyid]);
            return res.send({"msg":"success"});
        }else{
            continue;
        }
    }

    // 如果没有，在searchHistory中添加
    // 在userSearchHistory中添加对应关系，返回 success
    if(!exists){
        await query('insert into searchHistory (keyword) values (?)',[keyword]);
        var keyid = await query('select keyid from searchHistory where keyword=?',[keyword]);
        keyid = JSON.parse(JSON.stringify(keyid))[0].keyid;
        // console.log(keyid);

        await query('insert into userSearchHistory (uid,keyid) values (?,?)',[uid,keyid]);
        return res.send({"msg":"success"});
    }
     
});

module.exports = router;