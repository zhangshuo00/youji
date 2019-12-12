var express = require('express');
var query = require('../db');
const router = express.Router();

router.post('/',async (req,res)=>{
    // 当前登录用户uid，需要删除文章的chid
    const {uid,chid} = req.body;
    
    
});

module.exports = router;