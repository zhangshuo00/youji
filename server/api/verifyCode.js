var express = require('express');
var query = require('../db');
var router = express.Router();
// 校验验证码

router.post('/',async (req,res)=>{
    const { vcode,uemail } = req.body;

    var dataCode = await query('SELECT Vcode FROM user WHERE uemail=?',[uemail])
    dataCode = JSON.parse(JSON.stringify(dataCode))[0].Vcode;

    if(dataCode === vcode){
        res.send({msg:'success'});
    }else{
        res.send({msg:'error'})
    }
});

module.exports = router;