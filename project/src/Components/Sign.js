import React, { Component } from 'react';
//import {HashRouter as Router,Route}from 'react-router-dom';
import '../css/Sign.css';
import {Link,Route} from 'react-router-dom'; 
import Login from './Login';



export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      uname:'',
      uemail:'',
      upassword:''
    }
  }
  onChange(e){// 当input内改变时，将value值写入state
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    const post ={
      uname:this.state.uname,
      uemail:this.state.uemail,
      upassword:this.state.upassword
    }
    console.log(post);
    fetch('/sign',{
      method:'POST',// 发起post请求
      mode:'cors',// 跨域请求模式
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(post)
    })
    .then(res=>res.json())
    .then(data=>{
      // 
      console.log(data);
      // 根据返回的消息，渲染响应的页面
    })
  }
  render() {
    let url = this.props.match.url
    return (
      // <Router>
      <div>
      <div>
        <form clsaaName="sign-form"  onSubmit={this.onSubmit.bind(this)}>
        <p className='sign-p1'>注册</p>
        <div className='sign-div'>
          {/* <img src="my-app\src\img\1.jpg" className='sign-img'></img> */}
          <input onChange={this.onChange.bind(this)} className='sign-input1' placeholder="昵称" name="uname"></input>
          <input onChange={this.onChange.bind(this)} className='sign-input2' placeholder="Email" name="uemail"></input>
          <input onChange={this.onChange.bind(this)} className='sign-input2' placeholder="密码" name="upassword"></input>
          <input className='sign-button' type="submit" value="注册"></input>
        </div>
        </form>
        <Link to={{pathname:url+'/login',state:{url:url+'/login'}}}><p className='sign-p2'>已有账户了，点击登陆</p></Link>
      </div>
      <div>
        <Route path={`${url}/login`} component={Login} />
      </div>
      </div>
      // </Router>
    )
  }
}
