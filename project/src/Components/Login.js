import React,{Component} from 'react';
import '../css/Login.css';
import store from './UserId';
//登录页

export default class Login extends Component{
  constructor(props){
    super(props)
    this.state = store.getState();
    store.subscribe(()=>{
      this.setState(store.getState())
    })
  }
  //使用redux共享userID与登陆状态login
  Cheaking=()=> {
    fetch('')
        .then((res)=>res.json())
        .then((res)=>{
          let action = {
            type:'change_userID',
            value:res.data.userID,
            login:res.data.login,
          }
          store.dispatch(action)
        })
    if(this.state.data.login === true){
      window.location = '/sort';
    }
  }
  render(){
    return(
      <div>
        <p className = 'log-login'>登录</p>
        <form className="log-center" action="" method="POST">
            <img className='log-img'></img>
            <input type='Email' className='log-email' placeholder='  Email' name='email'></input>
            <input type='password' className='log-email' placeholder='  密码' name='password'></input>
            <a className='log-forget'>忘记密码？</a>
            <input type = 'submit' className = 'log-submit' value='登录'
              onClick={() => this.Cheaking()}>
            </input>
        </form> 
        <a className='log-reg'>新用户？点击这里注册</a>
      </div>
    )
  }
}