var express = require('express');
var query = require('../db')
const router = express.Router();

router.get('/',async (req,res)=>{
    var results = await query('SELECT topic_name FROM topic');
    results = JSON.parse(JSON.stringify(results));

    res.send(results)
});

module.exports = router;