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
var discoverSearch = require('./api/discoverSearch');
var getMsg = require('./api/getMsg');
var getMsgList = require('./api/getMsgList');
var sendMsg = require('./api/sendMsg');
var addFavorites = require('./api/addFavorites');
var cancelCollection = require('./api/cancelCollection');
var addLike = require('./api/addLike');
var cancelLike = require('./api/cancelLike');
var modifyPwd = require('./api/modifyPwd');
var forgetPwd = require('./api/forgetPwd');
var delTags = require('./api/delTags');
var delSionple = require('./api/delSionple');
var getCarouselContext = require('./api/getCarouselContext');
var followUser = require('./api/followUser');
var cancelFollowUser = require('./api/cancelFollowUser');
var getCode = require('./api/getVerifCode');
var verifyCode = require('./api/verifyCode');
var getSearchHistory = require('./api/getSearchHistory');
var addSearchHistory = require('./api/addSearchHistory');
var delSearchHistory = require('./api/delSearchHistory');
var getTopics = require('./api/getTopics');
var getAmount = require('./api/getAmount');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));


app.use('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
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
app.use('/discoverSearch',discoverSearch);// 搜索接口
app.use('/getMsgList',getMsgList);// 获取消息列表接口
app.use('/getMsg',getMsg);// 获取对话详情
app.use('/sendMsg',sendMsg);// 发送消息接口
app.use('/addFavorites',addFavorites);// 添加收藏文章
app.use('/cancelCollection',cancelCollection);// 取消收藏文章
app.use('/addLike',addLike);// 添加喜欢文章
app.use('/cancelLike',cancelLike);// 取消喜欢文章
app.use('/modifyPwd',modifyPwd);// 修改密码
app.use('/forgetPwd',forgetPwd);// 忘记密码
app.use('/delTags',delTags);// 删除分类
app.use('/delSionple',delSionple);// 删除文章
app.use('/getCarouselContext',getCarouselContext);// 获取轮播图文章详情
app.use('/followUser',followUser);// 关注用户
app.use('/cancelFollowUser',cancelFollowUser);// 取消关注用户
app.use('/getCode',getCode);// 获取验证码
app.use('/verifyCode',verifyCode);// 校验验证码
app.use('/getSearchHistory',getSearchHistory);// 获取用户的搜索历史
app.use('/addSearchHistory',addSearchHistory);// 为用户添加搜索历史
app.use('/delSearchHistory',delSearchHistory);// 删除用户指定搜索历史
app.use('/getTopics',getTopics);// 获取所有的话题

// 后台系统接口
app.use('/backLogin',backLogin);// 后台登录接口
app.use('/backGetUsers',backGetUsers);// 获取所有用户的信息
app.use('/backGetChapter',backGetChapter);// 获取所有文章的信息
app.use('/getUserCount',getUserCount);// 获取用户数量、文章数量，分享的文章数量
app.use('/getAmount',getAmount);// 获取用户数量

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