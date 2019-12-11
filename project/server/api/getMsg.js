var express = require('express');
var query = require('../db');
const router = express.Router();
// 返回前端两用户之间的消息

router.post('/',async (req,res)=>{
    const {uid,ruid} = req.body;
    // 返回的内容有：当前用户与接收用户的所有消息，并按照时间排序
    // 以及接收用户的uname,头像
    // const uid = 'k3i297def';
    // const ruid = 'k3plo3nv1';
    var obj = new Object();
    // 双方的 uname，uid，headimg
    var uidInfo = await query('select uid,uname,headimg from user where uid=?',[uid]);
    uidInfo = JSON.parse(JSON.stringify(uidInfo));
    var ruidInfo = await query('select uid,uname,headimg from user where uid=?',[ruid]);
    ruidInfo = JSON.parse(JSON.stringify(ruidInfo));
    // console.log(uidInfo,ruidInfo);
    obj.uidInfo = uidInfo[0];
    obj.ruidInfo = ruidInfo[0];

    // 判断sendEvent中是否有 uid和ruid
    var aid1 = await query('select aid from sendEvent where a_uid=? and b_uid=?',[uid,ruid]);
    aid1 = JSON.parse(JSON.stringify(aid1));// 当前登录用户发出的
    var aid2 = await query('select aid from sendEvent where a_uid=? and b_uid=?',[ruid,uid]);
    aid2 = JSON.parse(JSON.stringify(aid2));// 对方用户发出的

    // 迄今为止写过最长的一个三目运算符，哈哈哈awsl
    var aid = (aid1.length==0||aid2.length==0) ? ((aid1.length==0&&aid2.length==0) ? [] : (aid1.length==0 ? [aid2[0].aid] :[aid1[0].aid])) : [aid1[0].aid,aid2[0].aid];
    console.log(aid);
    if(aid.length === 2){// 双方发送过消息
        var msg = await query('select bid,context,aid from sendMes where aid=? or aid=? order by bid asc',[aid[0],aid[1]]);
        msg = JSON.parse(JSON.stringify(msg));

        for(var i=0;i<msg.length;i++){
            if(msg[i].aid === aid[0]){// 该消息是当前登录用户发送的
                msg[i].sender = 'me';
            }else{// 该消息是 ruid发送的
                msg[i].sender = 'he';
            }
        }
        // console.log(msg)
        obj.msg = msg;
        return res.send(obj);
    }else if(aid.length === 1){// 只有一方发送过消息
        var msg = await query('select bid,context,aid from sendMes where aid=? order by bid asc',[aid[0]]);
        msg = JSON.parse(JSON.stringify(msg));
        console.log(msg);
        // 要判断是 uid发送过消息还是 ruid发送过
        var whosend = aid1.length===0 ? 'ruidsend' : 'uidsend';
        if(whosend === 'ruidsend'){
            for(var j=0;j<msg.length;j++){
                msg[j].sender = 'he'
            }
        }else{
            for(var j=0;j<msg.length;j++){
                msg[j].sender = 'me'
            }
        }
        obj.msg = msg;
        return res.send(obj);
    }else{// 没有发送过消息，返回空
        return res.send({msg:''});
    }
    
});

module.exports = router;