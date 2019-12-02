var express = require('express');
var query = require('../db');
var router = express.Router();
// 笔记详情页 api

router.post('/',async (req,res)=>{
    // 前端发起post请求中携带的参数有
    // uid，tags（当前文章的分类），chid（当前文章的chid，包含在笔记sion页返回的数据中）
    const {uid,tags,chid} = req.body;
    // 需要返回的内容有 头图img_path，标题 title，笔记分类tags，
    // 文章内容context，文章内容图片img_path
    var result = await query('select ')
});

module.exports = router;