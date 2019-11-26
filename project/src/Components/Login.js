import React,{Component} from 'react';
import '../css/Login.css';

export default class Login extends Component{
  render(){
    return(
      <div>
        <p className = 'log-login'>登录</p>
        <form className="log-center" action="" method="POST">
            <img className='log-img'></img>
            <input type='Email' className='log-email' placeholder='  Email'></input>
            <input type='password' className='log-email' placeholder='  密码'></input>
            <a className='log-forget'>忘记密码？</a>
            <input type = 'submit' className = 'log-submit' value='登录'></input>
        </form> 
        <a className='log-reg'>新用户？点击这里注册</a>
      </div>
    )
  }
}