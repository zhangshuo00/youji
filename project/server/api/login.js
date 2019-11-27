var express = require('express');
var mysql = require('../db');
var router = express.Router();

router.post('/',(req,res)=>{
    console.log(req.body);
    var getEmail = req.body.email;
    var getPwd = req.body.pwd;
    var result = mysql.query('select * from chapter',function(result){
        res.send(result);
        console.log(result);
    });
    console.log(result);
    res.end('ok');
});
router.get('/',(req,res)=>{
    console.log(req);
    res.json([
        {id:1,username:'zhangsan'}
    ])
})
module.exports = router;