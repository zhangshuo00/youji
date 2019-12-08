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
var sionple = require('./api/sionple');
var addTag = require('./api/addTag');
var addSionple = require('./api/addSionple');
var personal = require('./api/personal');
var userDetail = require('./api/userDetail');
var editPerInfo = require('./api/editPerInfo');
var discover = require('./api/discover');
var getCarousel = require('./api/getCarousel');
var me = require('./api/me');
var getFollowUser = require('./api/getFollowUser');
var backGetUsers = require('./api/backGetUsers');
var backLogin = require('./api/backLogin');
var backGetChapter = require('./api/backGetChapter');
var getUserCount = require('./api/getUserCount');

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
app.use('/listSort',listSort);// 笔记分类页api
app.use('/sionple',sionple);// 笔记详情页api
app.use('/addTag',addTag);// 新增笔记分类页 api
app.use('/addSionple',addSionple);// 新增笔记 api
app.use('/personal',personal);// 个人信息页 api
app.use('/userDetail',userDetail);// 侧边栏 api
app.use('/editPerInfo',editPerInfo);// 修改个人信息 api
app.use('/discover',discover);// 发现页文章块的 api
app.use('/getCarousel',getCarousel);// 获取轮播图的api
app.use('/me',me);// 我页面的 api
app.use('/getFollowUser',getFollowUser);// 获取关注用户列表


// 后台系统接口
app.use('/backLogin',backLogin);// 后台登录接口
app.use('/backGetUsers',backGetUsers);// 获取所有用户的信息
app.use('/backGetChapter',backGetChapter);// 获取所有文章的信息
app.use('/getUserCount',getUserCount);// 获取用户数量、文章数量，分享的文章数量

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