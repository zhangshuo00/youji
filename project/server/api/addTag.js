var express = require('express');
var query = require('../db');
var router = express.Router();
const fs = require('fs');
// 新增笔记分类页api

router.post('/',async (req,res)=>{
    // 前端发起请求的参数中包括：uid（即当前用户id），tagName（即用户键入的笔记名）
    // imgPath（目前先不用）
    const{uid,tagName,imgData} = req.body;
    // console.log(imgData)
    // const uid = 'k3i297def';
    // const tagName = '测试4';
    var a = 0;
    var b = 0;
    // 比较用户新增的笔记名在 tagsName中是否已存在
    var existedTagName = await query('select tags from tagsName');
    existedTagName = JSON.parse(JSON.stringify(existedTagName));
    for(var i=0;i<existedTagName.length;i++){
        if(tagName === existedTagName[i].tags){
            // 用户新增笔记名已存在于库中
            var tag_id = await query('select tag_id from tagsName where tags=?',[existedTagName[i].tags]);
            tag_id = JSON.parse(JSON.stringify(tag_id))[0].tag_id;
            a = 1;
            break;
        }
    }
    if(a === 0){// 笔记分类名
        await query('INSERT INTO tagsName (tags) VALUES (?)',[tagName]);
        var tag_id = await query('select tag_id from tagsName where tags=?',[tagName]);
        tag_id = JSON.parse(JSON.stringify(tag_id))[0].tag_id;
        console.log(tag_id);
    }
    // 该uid下是否有 tag_id，如果有，返回已存在的 msg
    // 没有，则在userTags中新增，并返回成功的msg
    var userOwnChid = await query('select tag_id from userTags where uid=?',[uid]);
    userOwnChid = JSON.parse(JSON.stringify(userOwnChid));
    for(var j=0;i<userOwnChid.length;j++){
        if(userOwnChid[i].tag_id === tag_id){
            b = 1;
            return res.send({msg:'tag already exists'});
            // 当提交的笔记名已存在时，返回
        }
    }
    if(b === 0){// 该uid下没有该笔记分类
        // 接收base64格式的图片保存到本地 images路径下，并将路径写入数据库相应位置
        var img_path = 'images/'+uid+tagName+'.jpg';
        var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = Buffer.from(base64Data,'base64');
        fs.writeFileSync('../src/images/'+uid+tagName+'.jpg',dataBuffer);

        await query('insert into images (img_path) values(?)',[img_path]);

        var img_id = await query('select img_id from images where img_path=?',[img_path]);
        img_id = JSON.parse(JSON.stringify(img_id))[0].img_id;
        // console.log(img_id);

        await query('insert into userTags (uid,tag_id,img_id) values(?,?,?)',[uid,tag_id,img_id]);

        return res.send({msg:'success'});
        // 创建成功时返回
    }
});

module.exports = router;