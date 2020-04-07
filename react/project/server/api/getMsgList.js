var express = require('express');
var query = require('../db');
const router = express.Router();
// 返回当前登录用户的消息列表

router.post('/',async (req,res)=>{
    const {uid} = req.body;
    // const uid = 'k3i297def';
    // 返回的内容有：相应用户的头像，uid，uname，最近一条消息
    var array = new Array();
    var msgList = new Array();
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
    array = unique(array);

    for(var n=0;n<array.length;n++){
        var obj = new Object();
        var aid = new Array();

        // 对话列表的用户 uid以及uname，headimg
        var callerInfo = await query('select uid,uname,headimg from user where uid=?',[array[n]]);
        callerInfo = JSON.parse(JSON.stringify(callerInfo));
        obj = callerInfo[0]
        // 
        var aid1 = await query('select aid from sendEvent where a_uid=? and b_uid=?',[uid,array[n]]);
        aid1 = JSON.parse(JSON.stringify(aid1));// 当前用户发送给其他用户的 aid
        var aid2 = await query('select aid from sendEvent where a_uid=? and b_uid=?',[array[n],uid]);
        aid2 = JSON.parse(JSON.stringify(aid2));// 其他用户发送给当前用户的 aid
        // 
        if(isNull(aid1)===0 && isNull(aid2)===1){
            aid[0] = aid2[0].aid;
        }else if(isNull(aid1)===1 && isNull(aid2)===0){
            aid[0] = aid1[0].aid;
        }else{
            aid[0] = aid1[0].aid;
            aid[1] = aid2[0].aid;
        }
        // 选取两人信息中时间最近的
        // 如果两人有对话，即aid的length为2
        if(aid.length === 2){
            var msg = await query('select * from sendMes where aid=? or aid=? order by sm_date desc',[aid[0],aid[1]]);
            msg = JSON.parse(JSON.stringify(msg));
        }else if(aid.length === 1){// 如果只有一方有，则aid的length为1
            var msg = await query('select * from sendMes where aid=? order by sm_date desc',[aid[0]]);
            msg = JSON.parse(JSON.stringify(msg));
        }
        // console.log(msg[0]);
        obj.aid = aid;
        obj.context = msg[0].context;
        obj.sm_date = msg[0].sm_date;
        // console.log(obj)
        msgList[n] = obj;
    }

    res.send(msgList);
    // [{"uid":"k3mimknra","uname":"李四","headimg":"images/lisi.jpg","aid":[1,2],"context":"是吗，谢谢夸奖，哈哈"},
    // {"uid":"k3pizakqv","uname":"甄勇敢","headimg":null,"aid":[3],"context":"加油！奥利给！"}]
});


// 数组去重函数
function unique(arr){
    return Array.from(new Set(arr));
}
// 判断数组是否为空
function isNull(arr){
    return arr.length === 0 ? 0 : 1;
}
// 转换时间格式函数
function formatUTC(utc_datetime) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0, T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
    var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06
  
    // 处理成为时间戳
    timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp / 1000;
  
    // 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp + 8 * 60 * 60;
  
    // 时间戳转为时间
    var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    return beijing_datetime;
}
module.exports = router;