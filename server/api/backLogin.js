var express = require('express');
var query = require('../db');
const router = express.Router();

router.get('/',async (req,res)=>{
    const { aduser, adpassword } = req.query;
    // const aduser = 'admin', adpassword = 'admin';
    // console.log(req.params,req.query,req.body)

    var result = await query('select * from adminuser');
    result = JSON.parse(JSON.stringify(result));
    // console.log(result)
    for(var i=0;i<result.length;i++){
        if(result[i].aduser === aduser){
            if(result[i].adpassword === adpassword){
                return res.send({msg:'success'});
            }else{
                return res.send({msg:'pwderror'});
            }
        }
        continue;
    }
    return res.send({msg:'adusererror'})
});

module.exports = router;