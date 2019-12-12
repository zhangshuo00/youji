var express = require('express');
var query = require('../db');
const router = express.Router();
// 删除笔记分类，需要用户判断是否同时删除该分类下所有的文章

router.post('/',async (req,res)=>{
    // 当前登录用户的uid，要删除的分类名
    const {uid,tags} = req.body;
    // 该分类名的 tag_id
    var tag_id = await query('select tag_id from tagsName where tags=?',[tags]);
    tag_id = JSON.parse(JSON.stringify(tag_id))[0].tag_id;

    // 删除该分类下的所有文章
    await query('delete from chapter where uid=? and tag_id=?',[uid,tag_id]);
    // 删除该登录用户下的该分类
    await query('delete from userTags where uid=? and tag_id=?',[uid,tag_id]);
    res.send({msg:'success'});
});

module.exports = router;