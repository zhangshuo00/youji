const express = require('express');
const path = require('path');
var query = require('./db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const proxy = require('express-http-proxy');

var login = require('./api/login');
var sign = require('./api/sign');
var sion = require('./api/sion');
var listSort = require('./api/listSort');

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
    // console.log(req);
    res.send('ok');
})
app.use('/login',login);// 登录页api
app.use('/sign',sign);// 注册页api
app.use('/sion',sion);// 笔记列表页api
app.use('/listSort',listSort);

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
    console.log('server start on 8080...');
})
module.exports = app;