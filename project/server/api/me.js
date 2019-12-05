var express = require('express');
var query = require('../db');
const router = express.Router();
// 我 api

router.post('/',async (req,res)=>{
    // post请求参数中携带 当前登录用户的 uid
    
    const {uid} = req.body;
    // const uid = 'k3i297def';
    // 需要返回的有 headimg，uname，signature，uemail
    var result = await query('select * from user where uid=?',[uid]);
    result = JSON.parse(JSON.stringify(result));

    // 收藏的文章的数目
    var chapterCounts = await query('select count(chid) as ccount from userCollection where uid=?',[uid]);
    chapterCounts = JSON.parse(JSON.stringify(chapterCounts))[0].ccount

    // 关注的用户数
    var userCounts = await query('select count(foluid) as ucount from followUsers where uid=?',[uid]);
    userCounts = JSON.parse(JSON.stringify(userCounts))[0].ucount;

    result[0].chapterCounts = chapterCounts;
    result[0].userCounts = userCounts;

    // 当前用户收藏的文章的 uid,uname,headimg,context
    var array = new Array();
    var colchid = await query('select chid from userCollection where uid=?',[uid]);
    colchid = JSON.parse(JSON.stringify(colchid));
    console.log(colchid);
    for(var i=0;i<colchid.length;i++){
        var n = await query('select * from chapter where chid=?',[colchid[i].chid]);
        n = JSON.parse(JSON.stringify(n))[0];
        n.context = n.context.slice(0,20);
        // 获取当前文章的作者信息
        var m = await query('select uname,headimg from user where uid=?',[n.uid]);
        m = JSON.parse(JSON.stringify(m))[0];
        n.uname = m.uname;
        n.headimg = m.headimg;

        array[i] = n;
        // console.log(n);
    }
    result[1] = array;
    res.send(result);
    // [
        // {"uid":"k3i297def","uemail":"zhangsan@qq.com","uname":"张三","headimg":"images/zhangsan.jpg","usex":"男","signature":"遇到什么困难都不要怕，微笑着面对它，加油，奥利给！","upassword":"zhangsan","chapterCounts":5,"userCounts":2},
        // [{"chid":3,"uid":"k3mimknra","title":"考驾照的第一天","tag_id":1,"context":"测试测试查得紧了福建省代理费发大水啦发动","chdate":"2019-12-02","isShare":1,"ch_headimg":"images/ch_headimg1.jpg","favorites":45,"likes":89,"uname":"李四","headimg":"images/lisi.jpg"},
        // {"chid":2,"uid":"k3i297def","title":"第一次尝试宫保鸡丁","tag_id":1,"context":"1.鸡肉洗净切丁，葱姜切片，加入适量料酒","chdate":"2019-12-02","isShare":1,"ch_headimg":"images/ch_headimg2.jpg","favorites":35,"likes":56,"uname":"张三","headimg":"images/zhangsan.jpg"},
        // {"chid":1,"uid":"k3i297def","title":"瞎写点啥","tag_id":1,"context":"现在一天比一天冷了，出门穿什么这是一个值","chdate":"2019-11-28","isShare":1,"ch_headimg":"images/ch_headimg1.jpg","favorites":20,"likes":100,"uname":"张三","headimg":"images/zhangsan.jpg"},
        // {"chid":4,"uid":"k3i297def","title":"考驾照的第一天","tag_id":2,"context":"考驾照最关注的无非就是科目二和科目三了吧","chdate":"2019-12-01","isShare":1,"ch_headimg":"images/ch_headimg2.jpg","favorites":90,"likes":102,"uname":"张三","headimg":"images/zhangsan.jpg"},
        // {"chid":6,"uid":"k3i297def","title":"考驾照的第二天","tag_id":2,"context":"科目三是真实上路的，意味着你会遇到很多社","chdate":"2019-12-03","isShare":1,"ch_headimg":"images/ch_headimg2.jpg","favorites":12,"likes":10,"uname":"张三","headimg":"images/zhangsan.jpg"}]
    // ]

});

module.exports = router;