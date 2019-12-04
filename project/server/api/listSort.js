var express = require('express');
var router = express.Router();
var query = require('../db');
// 笔记分类页的请求数据

router.post('/',async (req,res)=>{
    // 获取前端返回的 uid
    const uid = 'k3i297def';
    console.log(req.body);
    // const {uid} = req.body;
    var tags = [];
    // 根据uid从数据库中查找相应的分类
    var tagId = await query('select tag_id,img_id from userTags where uid = ?',[uid]);
    tagId = JSON.parse(JSON.stringify(tagId));// tag_id,根据tag_id ,找到tags
    // console.log(tagId);
    for(var i =0;i<tagId.length;i++){
        var a = new Object();
        var result = await query('select tags from tagsName where tag_id=?',[tagId[i].tag_id]);
        result = JSON.parse(JSON.stringify(result));
        a.tags = result[0].tags;

        var results = await query('select img_path from images where img_id=?',[tagId[i].img_id]);
        results = JSON.parse(JSON.stringify(results));
        a.img_path = results[0].img_path;
        tags.push(a);
    }
    res.send(tags);
    // [{"tags":"测试3","img_path":"../images/tagsImgTest.jpg"},{"tags":"测试3","img_path":"../images/tagsImgTest.jpg"},{"tags":"测试3","img_path":"../images/tagsImgTest.jpg"}]
})
module.exports = router;