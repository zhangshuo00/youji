var express = require('express');
var query = require('../db');
const router = express.Router();
// 修改密码的api

router.post('/',async (req,res)=>{
    const { uemail,upassword } = req.body;

    // 验证成功后，修改该用户密码
    await query('UPDATE user SET upassword=?,Vcode=? WHERE uemail=?',[upassword,'',uemail]);
    res.send({msg:'success'});
    
});

module.exports = router;