var express = require('express');
var query = require('../db');
const router = express.Router();

router.get('/',async (req,res)=>{
    const { key } = req.query;

    if(key === 'admin'){
        var amount = await query('SELECT * FROM statistics');
        amount = JSON.parse(JSON.stringify(amount));

        return res.send(amount)
    }else{
        return res.send({"msg":"key error"})
    }
});

module.exports = router;