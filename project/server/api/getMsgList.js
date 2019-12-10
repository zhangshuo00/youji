var express = require('express');
var query = require('../db');
const router = express.Router();
// 返回当前登录用户的消息列表

router.get('/',async (req,res)=>{
    // const {uid} = req.body;
    const uid = 'k3i297def';
    // 返回的内容有：相应用户的头像，uid，uname，最近一条消息
    var array = new Array();
    // 
    var caller1 = await query('select b_uid from sendEvent where a_uid=?',[uid]);
    caller1 = JSON.parse(JSON.stringify(caller1));
    for(var i=0;i<caller1.length;i++){
        array.push(caller1[i].b_uid);
    }
    // 
    var caller2 = await query('select a_uid from sendEvent where b_uid=?',[uid]);
    caller2 = JSON.parse(JSON.stringify(caller2));
    for(var j=0;j<caller2.length;j++){
        array.push(caller2[j].a_uid)
    }
    // 加入一个数组，进行去重
    function unique(arr){
        return Array.from(new Set(arr));
    }
    array = unique(array);
    for(var n=0;n<array.length;n++){
        // 对话列表的用户 uid
        var callerInfo = await query('select uid,uname,headimg from user where uid=?',[array[n]]);
        callerInfo = JSON.parse(JSON.stringify(callerInfo));
        console.log(callerInfo);
        var aid = await query('select aid from sendEvent where a_uid=? or b_uid=?',[array[n],array[n]]);
        aid = JSON.parse(JSON.stringify(aid));
        console.log(aid)
    }
    res.send('ok');
});

module.exports = router;