var express = require('express');
var query = require('../db');
const router = express.Router();
// 用户发送消息的api

router.post('/',async (req,res)=>{
    const {uid,ruid,msg} = req.body;
    // 当前用户的uid和接收方的uid，以及发送的消息内容
    // const uid = 'k3i297def',ruid = 'k3plo3nv1';
    // const msg = '你快回劳资一句';
    
    // 先在 sendEvent中查找是否有对应的auid，buid
    var aid1 = await query('select aid from sendEvent where a_uid=? and b_uid=?',[uid,ruid]);
    aid1 = JSON.parse(JSON.stringify(aid1));
    var aid2 = await query('select aid from sendEvent where a_uid=? and b_uid=?',[ruid,uid]);
    aid2 = JSON.parse(JSON.stringify(aid2));

    // 迄今为止写过最长的一个三目运算符，哈哈哈awsl
    var aid = (aid1.length==0||aid2.length==0) ? ((aid1.length==0&&aid2.length==0) ? [] : (aid1.length==0 ? [aid2[0].aid] :[aid1[0].aid])) : [aid1[0].aid,aid2[0].aid];
    if(aid.length === 1){// 即只有一方发送了消息，需要判断当前用户是否是发送方
        var a_uid = await query('select a_uid from sendEvent where aid=?',[aid[0]]);
        a_uid = JSON.parse(JSON.stringify(a_uid))[0].a_uid;
        // 判断a_uid是否为当前登录用户
        if(a_uid === uid){
            var sm_date = getNowDate();
            console.log(sm_date);
            await query('insert into sendMes (context,sm_date,aid) values(?,?,?)',[msg,sm_date,aid[0]]);
            
            return res.send({msg:'success'});
        }else{// 不是的话，在sendEvent中新增
            await query('insert into sendEvent (a_uid,b_uid) values(?,?)',[uid,ruid]);
            var newaid0 = await query('select aid from sendEvent where a_uid=? and b_uid=?',[uid,ruid]);
            newaid0 = JSON.parse(JSON.stringify(newaid0))[0].aid;
            var sm_date = getNowDate();
            console.log(sm_date);
            await query('insert into sendMes (context,sm_date,aid) values(?,?,?)',[msg,sm_date,newaid0]);

            return res.send({msg:'success'});
        }
    }else if(aid.length === 2){// 双方之前发送过消息，将msg存入 a_uid为uid的aid中即可
        var currentaid = await query('select aid from sendEvent where a_uid=?',[uid]);
        currentaid = JSON.parse(JSON.stringify(currentaid))[0].aid;
        var sm_date = getNowDate();
        console.log(sm_date);
        await query('insert into sendMes (context,sm_date,aid) values(?,?,?)',[msg,sm_date,currentaid]);

        return res.send({msg:'success'});

    }else{// 双方之前未发送过消息
        await query('insert into sendEvent (a_uid,b_uid) values(?,?)',[uid,ruid]);
        var newaid1 = await query('select aid from sendEvent where a_uid=? and b_uid=?',[uid,ruid]);
        newaid1 = JSON.parse(JSON.stringify(newaid1))[0].aid;
        var sm_date = getNowDate();
        console.log(sm_date);
        await query('insert into sendMes (context,sm_date,aid) values(?,?,?)',[msg,sm_date,newaid1]);

        return res.send({msg:'success'});
    }
});

// 获取当前时间，并返回yyyy-mm-dd hh:mm:ss的格式
function getNowDate(){
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '-'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return(Y+M+D+h+m+s);
}

module.exports = router;