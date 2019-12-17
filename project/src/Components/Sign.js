
import React, { Component } from 'react';
import '../css/Sign.css';
import {Link,Route} from 'react-router-dom'; 
import Login from './Login';



export default class App extends Component {
  //注册页
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
    fetch('http://localhost:8080/sign',{
      method:'POST',// 发起post请求
      // mode:'cors',// 跨域请求模式
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
    return (
      // <Router>
      <div>
        <div className='sign-page'>
          <form className="sign-form" style={{paddingTop:'50px'}}  onSubmit={this.onSubmit.bind(this)}>
          <p className='sign-p1'></p>
          <div className='sign-div'>
            {/* <img src="my-app\src\img\1.jpg" className='sign-img'></img> */}
            <input onChange={this.onChange.bind(this)} className='sign-input1' placeholder="昵称" name="uname"></input>
            <input onChange={this.onChange.bind(this)} className='sign-input2' placeholder="Email" name="uemail"></input>
            <input onChange={this.onChange.bind(this)} className='sign-input2' placeholder="密码" name="upassword"></input>
            <input className='sign-button' type="submit" value="注册"></input>
          </div>
          </form>
          <Link to='/index.html#/login'><p className='sign-p2'>已有账户了，点击登陆</p></Link>
        </div>
        {/* <div style={{paddingBottom:'35px'}}>
          <Route path={`login`} component={Login} />
        </div> */}
      </div>
      // </Router>
    )
  }
}