var express = require('express');
var query = require('../db');
const router = express.Router();
// 发现页api

router.get('/',async (req,res)=>{
    // 发现页显示的内容所有用户都相同，所以使用get请求
    // 需要返回的有：轮播图的img_path，每个文章的块（uid，uname，headimg，
    // context的前20个字符，两个文章的img_path，该文章的喜欢数和收藏数

    var result = await query('select * from chapter where isShare=?',[1]);
    result = JSON.parse(JSON.stringify(result));
    // 截取context的前二十个字符
    for(var i=0;i<result.length;i++){
        // 文章的图片路径
        var array = new Array();
        var chid = result[i].chid;
        var imgPath = await query('select img_path from images where chid=?',[chid]);
        imgPath = JSON.parse(JSON.stringify(imgPath));
        // console.log(imgPath);
        for(var j=0;j<imgPath.length;j++){
            array[j] = imgPath[j].img_path
        }
        result[i].img_path = array;
        // 文章的内容
        result[i].context = result[i].context.slice(0,20)+'...';
        var userInfo = await query('select uname,headimg from user where uid=?',[result[i].uid]);
        userInfo = JSON.parse(JSON.stringify(userInfo))[0];
        result[i].uname = userInfo.uname;
        result[i].headimg = userInfo.headimg;
    }

    // 获取当前文章的用户信息

    res.send(result);
    // [{"chid":1,"uid":"k3i297def","title":"瞎写点啥","tag_id":1,"context":"现在一天比一天冷了，出门穿什么这是一个值","chdate":"2019-11-28","isShare":1,"ch_headimg":"images/dangao.jpg","favorites":20,"likes":100,"img_path":["images/chapterImg1.jpg","images/chapterImg2.jpg","images/chapterImg3.jpg"],"uname":"张三","headimg":"images/zhangsan.jpg"},
    // {"chid":2,"uid":"k3i297def","title":"第一次尝试宫保鸡丁","tag_id":1,"context":"1.鸡肉洗净切丁，葱姜切片，加入适量料酒","chdate":"2019-12-02","isShare":1,"ch_headimg":"images/meishi1.jpg","favorites":35,"likes":56,"img_path":["images/sort-test1.jpg","images/chapterImg4.jpg","images/meishi1.jpg","images/meishi2.jpg","images/meishi3.jpg"],"uname":"张三","headimg":"images/zhangsan.jpg"},
});

module.exports = router;