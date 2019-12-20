var express = require('express');
var query = require('../db');
const router = express.Router();

router.post('/',async (req,res)=>{
    const {keywords} = req.body;
    // const keywords = '王';
    const reg = new RegExp(keywords,'gi');
    var array = new Array();

    var uname = await query('select * from user');
    uname = JSON.parse(JSON.stringify(uname));
    // console.log(uname);
    for(var i=0;i<uname.length;i++){
        if(reg.exec(uname[i].uname)){
            // console.log(uname[i].uname);
            array.push(uname[i])
        }
    }

    res.send(array);
});

module.exports = router;