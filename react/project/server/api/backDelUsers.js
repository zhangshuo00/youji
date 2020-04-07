var express = require('express');
var query = require('../db');
const router = express.Router();

router.post('/',async(req,res)=>{
    const {uid} = req.body;

    await query('delete from user where uid=?',[uid]);
    res.send({msg:'success'})

});

module.exports = router;