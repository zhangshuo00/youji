var express = require('express');
var query = require('../db');
const router = express.Router();
// 修改密码的api

router.post('/',async (req,res)=>{
    const {uid,upassword} = req.body;

    await query('update user set upassword=? where uid=?',[upassword,uid]);
    res.send({msg:'success'});
});

module.exports = router;