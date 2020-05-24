var express = require('express');
var query = require('../db');
const router = express.Router();
// 个人信息页api

router.post('/',async (req,res)=>{
    // 请求需携带的参数 uid(当前登录用户，以及查看的用户)
    const {uid,ruid} = req.body;
    var isCol = 0;
    // const uid = 'k3i297def';
    var result = await query('select uname,headimg,signature from user where uid=?',[ruid]);
    result = JSON.parse(JSON.stringify(result));
    //在followUsers表中查找uid是否关注 ruid
    var a = await query('select foluid from followUsers where uid=?',[uid]);
    a = JSON.parse(JSON.stringify(a));
    if(a.length === 0){// 没有关注的用户
        result[0].isCol = isCol;
    }else{// 有关注的用户
        for(var i=0;i<a.length;i++){
            if(ruid === a[i].foluid){
                isCol = 1;//已关注当前用户
            }
        }
        result[0].isCol = isCol;
    }

    

    res.send(result);
    // [{"uname":"张三","headimg":"../images/zhangsan.jpg","signature":"这个人很懒，什么都没有写"}]
});

module.exports = router;