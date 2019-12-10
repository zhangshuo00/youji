var express = require('express');
var query = require('../db');
var router = express.Router();
// 笔记详情页 api

router.post('/',async (req,res)=>{
    // 前端发起post请求中携带的参数有
    // uid，tags（当前文章的分类），chid（当前文章的chid，包含在笔记sion页返回的数据中）
    const {uid,chid} = req.body;
    // const chid = 1;
    // 需要返回的内容有 头图img_path，标题 title，笔记分类tags，
    // 文章内容context，文章内容图片img_path
    var result = await query('select title,tag_id,context,ch_headimg,favorites,likes from chapter where chid=?',[chid]);
    result = JSON.parse(JSON.stringify(result));

    var tag_id = result[0].tag_id;
    var tags = await query('select tags from tagsName where tag_id=?',[tag_id]);
    tags = JSON.parse(JSON.stringify(tags))[0].tags;
    result[0].tags = tags;

    var imgpath = await query('select img_path from images where chid=?',[chid]);
    imgpath = JSON.parse(JSON.stringify(imgpath));

    result[0].imgPath = imgpath;
    res.send(result);
    // [{"title":"测试文章",
    // "context":"现在一天比一天冷了，出门穿什么这是一个值得深思熟虑的问题，穿少了会着凉，穿多了就显胖，颜色靓丽太惹人眼球，色彩单一又显老气，出门穿什么，这是一个严肃认真的问题，应该细细思考。",
    // "ch_headimg":"../images/ch_headimg1.jpg","tags":"测试1",
    // "favorites":20,"likes":100
    // ,"imgPath":[{"img_path":"../images/chapterImg1.jpg"},{"img_path":"../images/chapterImg2.jpg"},{"img_path":"../images/chapterImg3.jpg"}]}]
});

module.exports = router; 