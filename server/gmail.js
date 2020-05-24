const nodemailer = require('nodemailer');

function gmail(toEmail,vcode){
    // 创建发送邮件的请求对象
    var transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port: 465,
        secure: true,
        auth: {
            user: 'easonzhang443@qq.com',
            pass: 'swavdjhqhfywbhia'
        }
    })

    var mailObj = {
        from: '"有纪"<easonzhang443@qq.com>',
        to: toEmail, //接收方邮箱
        subject: '您的账户正在修改密码，测试验证码',
        html: '<h1>验证码：'+ vcode +'</h1>'
    }

    transporter.sendMail(mailObj,(err)=>{
        console.log(err)
        console.log('error')
    })
}

module.exports = gmail
