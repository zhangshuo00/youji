var express = require('express');
var query = require('../db');
const router = express.Router();
// 发现页的搜索api

router.post('/',async(req,res)=>{
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
    for(var j=0;j<array.length;j++){
        results[j] = result[array[j]];
        results[j].context = results[j].context.slice(0,50)
    }

    res.send(results);
    // [{"chid":7,"uid":"k3i297def","title":"React笔记（一）","tag_id":15,"context":"react 是一个用于构建用户界面的JavaScript库\r\nreact 主要用于构建UI，很多人认","chdate":"2019-12-11","isShare":1,"ch_headimg":"images/reactnote1.jpg","favorites":8,"likes":2},
    // {"chid":9,"uid":"k3i297def","title":"React笔记（二）","tag_id":15,"context":"new roughViz.BarH(\n  {\n    element: '#vis0',\n    t","chdate":"2019-12-4","isShare":1,"ch_headimg":"images/reactnote2.jpg","favorites":3,"likes":14}]
});

module.exports = router;