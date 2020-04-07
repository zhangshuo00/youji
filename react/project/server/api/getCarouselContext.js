var express = require('express');
var query = require('../db');
const router = express.Router();

router.post('/',async (req,res)=>{
    const {chid} = req.body;

    res.send(ok)
});

module.exports = router;