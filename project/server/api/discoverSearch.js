var express = require('express');
var query = require('../db');
const router = express.Router();
// 发现页的搜索api

router.get('/',async(req,res)=>{
    const { keywords } = req.body;
    // const keywords = '笔记';
    const reg = new RegExp(keywords,'gi');
    var array = new Array();
    var results = new Array();
    
    var result = await query('select * from chapter where isShare=1');
    result = JSON.parse(JSON.stringify(result));
    for(var i=0;i<result.length;i++){
        if(reg.exec(result[i].title)){
            // console.log('ok',result[i].title)
            array.push(i);
        }
    }
    // console.log(array);
    for(var j=0;j<array.length;j++){
        results[j] = result[array[j]]
    }

    res.send(results);

});

module.exports = router;