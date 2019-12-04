var express = require('express');
var query = require('../db');
var router = express.Router();
// 笔记列表页

router.post('/',async (req,res)=>{
    // 前端发送post请求携带 uid,tags(用户所点击的笔记分类)
    const {uid,tags} = req.body;
    console.log(uid,tags)
    // const uid = 'k3i297def';
    // const tags = '测试1';
    const tagId = await query('select tag_id from tagsName where tags=?',[tags]);
    // console.log(JSON.parse(JSON.stringify(tagId))[0].tag_id)
    const tag_id = JSON.parse(JSON.stringify(tagId))[0].tag_id;
    const result = await query('select chid,title,chdate,ch_headimg from chapter where tag_id=? and uid=?',[tag_id,uid]);
    res.send(result);
    // [{"chid":1,"title":"测试文章","chdate":"2019-11-27T16:00:00.000Z","ch_headimg":"../images/ch_headimg1.jpg"},
    // {"chid":4,"title":"测试文章3","chdate":"2019-11-30T16:00:00.000Z","ch_headimg":"../images/ch_headimg4.jpg"}]
})

module.exports = router;
