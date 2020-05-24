var express = require('express');
var query = require('../db');
const router = express.Router();
// 获取轮播图的 imgpath

router.get('/',async (req,res)=>{
    var result = await query('select * from carousel');
    result = JSON.parse(JSON.stringify(result));
    res.send(result);
    // [{"car_id":1,"car_imgpath":"images/carousel1.jpg","car_context":"系统公告：本次更新新增功能"},
    // {"car_id":2,"car_imgpath":"images/carousel2.jpg","car_context":"我在有纪看雪"},
    // {"car_id":3,"car_imgpath":"images/carousel3.jpg","car_context":"2019最佳购物体验"}]
});

module.exports = router;