var express = require('express');
var query = require('../db');
const router = express.Router();
// 获取轮播图的 imgpath

router.get('/',async (req,res)=>{
    var result = await query('select car_imgpath from carousel');
    result = JSON.parse(JSON.stringify(result));
    res.send(result);
    // [{"car_imgpath":"images/carousel1.jpg"},{"car_imgpath":"images/carousel2.jpg"},{"car_imgpath":"images/carousel3.jpg"}]
});

module.exports = router;