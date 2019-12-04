import React,{Component} from 'react';
import '../css/Login.css';
// import store from './UserId';
//登录页

export default class Login extends Component{
  constructor(){
    super();
    this.state = {
      uemail:'',
      upassword:''
    }
  }
  onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    const post ={
      uemail:this.state.uemail,
      upassword:this.state.upassword
    }
    console.log(post);
    fetch('/login',{
      method:'POST',
      mode:'cors',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(post)
    })
    .then(res=>res.json())
    .then(data=>{
      // 返回数据格式：{msg: "success/pwdErr/notExist"}
      console.log(data);
      // 根据返回的消息，渲染响应的页面
    })
  }
  render(){
    return(
      <div>
        <p className = 'log-login'>登录</p>
        <form id="form" className="log-center" onSubmit={this.onSubmit.bind(this)}>
            <img className='log-img'></img>
            <input onChange={this.onChange.bind(this)} type='Email' className='log-email' placeholder='  Email' name="uemail"></input>
            <input onChange={this.onChange.bind(this)} type='password' className='log-email' placeholder='  密码' name="upassword"></input>
            <a className='log-forget'>忘记密码？</a>
            <input onClick={this.get} type = 'submit' className = 'log-submit' value='登录'></input>
        </form> 
        <a className='log-reg'>新用户？点击这里注册</a>
      </div>
    )
  }
}