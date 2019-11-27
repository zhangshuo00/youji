const express = require('express');
const path = require('path');
var mysql = require('./db');
var login = require('./api/login');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const proxy = require('express-http-proxy');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/',(req,res)=>{
    var result = mysql.query('select * from chapter',function(result){
        res.send(result);
        console.log(result);
    });
    console.log(result);
    // console.log(req);
})
app.use('/login',login);

// catch 404 and forward to error handler
// app.use(function(req,res,next){
//     var err = new Error('not found');
//     err.status = 404;
//     next(err);
// })
// // error handler
// app.use(function(err, req, res/*, next*/) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     // res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     res.status(err.status || 500);
//     res.end('error');
// });

app.listen(8080,(err)=>{
    if(err) console.error(err);
    // var host = server.address().address;
    // var port = server.address().port;
    console.log('host,port');
})
module.exports = app;