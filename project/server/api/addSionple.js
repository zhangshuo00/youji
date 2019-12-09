var express = require('express');
var query = require('../db');
const fs = require('fs');
const router = express.Router();
// 新增笔记api

router.post('/',async (req,res)=>{
    // 请求中须携带的数据 uid，tags，title，context，isShare，添加图片的路径img_path
    // post请求中的 imgData需要是一个数组的形式 imgData:['','','']
    const {uid,tags,title,context,isShare,imgData} = req.body;
    // const uid = 'k3i297def';
    // const tags = '测试2';
    // const title = '测试测试';
    // const context = '家乐鸡粉四间房了司法局未播放机无法焦距的v耳机架的更多见收购的精神电视剧定时关机搜被动句dove';
    // const isShare = 1;
    var chdate = new Date();// 创建笔记的时间
    month = chdate.getMonth()+1;
    chdate = chdate.getFullYear() + '-' + month + '-' + chdate.getDate();
    // console.log(chdate);
    // 该分类的 tag_id
    var tag_id = await query('select tag_id from tagsName where tags=?',[tags]);
    tag_id = JSON.parse(JSON.stringify(tag_id))[0].tag_id;

    // 处理base64格式的图片
    if(imgData.length === 1){
        var img_path = 'images/'+uid+tags+title+'0.jpg';
        var base64Data = imgData[0].replace(/^data:image\/\w+;base64,/,"");
        var dataBuffer = Buffer.from(base64Data,'base64');
        fs.writeFileSync('../src/images/'+uid+tags+title+'0.jpg',dataBuffer);
        
        await query('insert into chapter (uid,title,tag_id,context,chdate,isShare,ch_headimg) values(?,?,?,?,?,?,?)',[uid,title,tag_id,context,chdate,isShare,img_path]);
        return res.send({msg:'success'});
    }else if(imgData.length > 1){
        // 默认设置第一张图片为 ch_headimg
        var img_path = 'images/'+uid+tags+title+'0.jpg';
        var base64Data = imgData[0].replace(/^data:image\/\w+;base64,/,"");
        var dataBuffer = Buffer.from(base64Data,'base64');
        fs.writeFileSync('../src/images/'+uid+tags+title+'0.jpg',dataBuffer);
        
        await query('insert into chapter (uid,title,tag_id,context,chdate,isShare,ch_headimg) values(?,?,?,?,?,?,?)',[uid,title,tag_id,context,chdate,isShare,img_path]);
        // 获取新增文章的chid
        var chid = await query('select chid from chapter where uid=? and title=?',[uid,title]);
        chid = JSON.parse(JSON.stringify(chid))[0].chid;
        // 其余图片写入images中，并将文章的chid写入images的chid中
        for(var j=1;j<imgData.length;j++){
            var imgs_path = 'images/'+uid+tags+title+[j]+'.jpg';
            base64Data = imgData[j].replace(/^data:image\/\w+;base64,/,"");
            dataBuffer = Buffer.from(base64Data,'base64');
            fs.writeFileSync('../src/images/'+uid+tags+title+[j]+'.jpg',dataBuffer);

            await query('insert into images (img_path,chid) values(?,?)',[imgs_path,chid]);
        }
        return res.send({msg:'success'});
    }
    // await query('insert into chapter (uid,title,tag_id,context,chdate,isShare,ch_headimg) values(?,?,?,?,?,?,?)',[uid,title,tag_id,context,chdate,isShare,ch_headimg]);
    
    
});

module.exports = router;