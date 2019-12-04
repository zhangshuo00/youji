var express = require('express');
var query = require('../db');
const router = express.Router();
// 新增笔记api

router.post('/',async (req,res)=>{
    // 请求中须携带的数据 uid，tags，title，context，isShare，添加图片的路径img_path
    // 
    const {uid,tags,title,context,isShare} = req.body;
    // const uid = 'k3i297def';
    // const tags = '测试2';
    // const title = '测试测试';
    // const context = '家乐鸡粉四间房了司法局未播放机无法焦距的v耳机架的更多见收购的精神电视剧定时关机搜被动句dove';
    // const isShare = 1;
    var chdate = new Date();// 创建笔记的时间
    month = chdate.getMonth()+1;
    chdate = chdate.getFullYear() + '-' + month + '-' + chdate.getDate();
    // console.log(chdate);

    var tag_id = await query('select tag_id from tagsName where tags=?',[tags]);
    tag_id = JSON.parse(JSON.stringify(tag_id))[0].tag_id;

    await query('insert into chapter (uid,title,tag_id,context,chdate,isShare) values(?,?,?,?,?,?)',[uid,title,tag_id,context,chdate,isShare]);
    
    res.send({msg:'success'});
});

module.exports = router;