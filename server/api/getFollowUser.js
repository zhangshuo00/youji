var express = require('express');
var query = require('../db');
const router = express.Router();

router.post('/',async (req,res)=>{
    const {uid} = req.body;
    // const uid = 'k3i297def';
    var chidArray = new Array();
    var chapterArray = new Array();

    var foluid = await query('select foluid from followUsers where uid=?',[uid]);
    if(!foluid.length){ // 没有关注用户
        return res.send({"msg":"null"})
    }else{ // 有关注用户
        foluid = JSON.parse(JSON.stringify(foluid));

        // 关注用户所分享的笔记 chid
        for(var i=0,len=foluid.length; i<len; i++){
            var chid_result = await query('SELECT chid FROM chapter WHERE uid=? and isShare=1',[foluid[i].foluid]);

            // 判断该用户是否有符合条件的笔记chid
            if(!chid_result){ // 没有符合条件的笔记
                continue;
            }else{ // 否则
                chid_result = JSON.parse(JSON.stringify(chid_result));
                for(var j=0;j<chid_result.length;j++){
                    chidArray.push(chid_result[j].chid)
                }
            }
        }
        function quickSort(arr){ // 对所有符合条件的 chid进行排序，完成后的顺序大概是时间的顺序
            if(arr.length<=1){
                return arr;
            }
            var index = Math.floor(arr.length/2);
            var temp = arr.splice(index,1);
            var left = [];
            var right = [];
            for(var i=0;i<arr.length;i++){
                if(arr[i]<temp){
                    left.push(arr[i]);
                }else{
                    right.push(arr[i]);
                }
            }
            return quickSort(left).concat(temp,quickSort(right));
        }
        chidArray = quickSort(chidArray);

        for(var k=0;k<chidArray.length;k++){
            var chapter = await query('SELECT * FROM chapter WHERE chid=?',[chidArray[k]]);
            chapter = JSON.parse(JSON.stringify(chapter))[0];
            chapterArray.push(chapter);
        }

        // 截取context的前二十个字符
        for(var i=0;i<chapterArray.length;i++){
            // 该笔记的所有图片
            var imgArray = new Array();
            var chid = chapterArray[i].chid;
            var imgPath = await query('select img_path from images where chid=?',[chid]);
            imgPath = JSON.parse(JSON.stringify(imgPath));

            for(var j=0;j<imgPath.length;j++){
                imgArray[j] = imgPath[j].img_path
            }
            chapterArray[i].img_path = imgArray;

            // 笔记的内容
            chapterArray[i].context = chapterArray[i].context.slice(0,20)+'...';
            var userInfo = await query('select uname,headimg from user where uid=?',[chapterArray[i].uid]);
            userInfo = JSON.parse(JSON.stringify(userInfo))[0];
            chapterArray[i].uname = userInfo.uname;
            chapterArray[i].headimg = userInfo.headimg;

            // 文章的话题
            if(chapterArray[i].topic_id){// 非空
                var topicName = await query('SELECT topic_name FROM topic WHERE topic_id=?',[chapterArray[i].topic_id]);
                topicName = JSON.parse(JSON.stringify(topicName))[0];
                chapterArray[i].topic_id = topicName.topic_name;
            }else{
                chapterArray[i].topic_id = 'null'
            }
        }
        return res.send(chapterArray)
    }
});

module.exports = router;