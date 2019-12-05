var express = require('express');
var query = require('../db');
const router = express.Router();

router.get('/',async (req,res)=>{
    // const {uid} = req.body;
    const uid = 'k3i297def';
    var array = new Array();

    var result = await query('select foluid from followUsers where uid=?',[uid]);
    result = JSON.parse(JSON.stringify(result));
    for(var i=0;i<result.length;i++){
        var n = await query('select uname,headimg from user where uid=?',[result[i].foluid]);
        n = JSON.parse(JSON.stringify(n))[0];
        array[i] = n;
        console.log(n)
    }

    res.send(array);
    // [{"uname":"李四","headimg":"images/lisi.jpg"},{"uname":"甄勇敢","headimg":null}]
});

module.exports = router;