var express = require('express');
var query = require('../db');
const router = express.Router();
// 返回前端两用户之间的消息

router.get('/',async (req,res)=>{
    // const {uid,ruid} = req.body;
    // 返回的内容有：当前用户与接收用户的所有消息，并按照时间排序
    // 以及接收用户的uname,头像
    const uid = 'k3i297def';
    const ruid = 'k3mimknra';
    // 判断sendEvent中是否有 uid和ruid
    var aid1 = await query('select aid from sendEvent where a_uid=? and b_uid=?',[uid,ruid]);
    aid1 = JSON.parse(JSON.stringify(aid1));
    var aid2 = await query('select aid from sendEvent where a_uid=? and b_uid=?',[ruid,uid]);
    aid2 = JSON.parse(JSON.stringify(aid2));

    // 迄今为止写过最长的一个三目运算符，哈哈哈awsl
    var aid = (aid1.length==0||aid2.length==0) ? ((aid1.length==0&&aid2.length==0) ? [] : (aid1.length==0 ? [aid2[0].aid] :[aid1[0].aid])) : [aid1[0].aid,aid2[0].aid];
    console.log(aid);
    if(aid.length === 2){
        var msg = await query('select bid,context from sendMes where aid=? or aid=? order by bid asc',[aid[0],aid[1]]);
        msg = JSON.parse(JSON.stringify(msg));
        console.log(msg)
    }
    
    res.send('ok')
});

module.exports = router;