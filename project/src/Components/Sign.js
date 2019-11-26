import React, { Component } from 'react';
//import {HashRouter as Router,Route}from 'react-router-dom';
import '../css/Sign.css';
import {Link,Route} from 'react-router-dom'; 



export default class App extends Component {
  render() {
    let url = this.props.match.url
    return (
      // <Router>
      <div>
      <div>
        <form clsaaName="sign-form" action="" method="post">
        <p className='sign-p1'>注册</p>
        <div className='sign-div'>
          {/* <img src="my-app\src\img\1.jpg" className='sign-img'></img> */}
          <input className='sign-input1' placeholder="昵称"></input>
          <input className='sign-input2' placeholder="Email"></input>
          <input className='sign-input2' placeholder="密码"></input>
          <input className='sign-button' type="button" value="注册"></input>
        </div>
        </form>
        <Link to={{pathname:url+'/login',state:{url:url+'/login'}}} className='sign-p2'>已有账户了，点击登陆</Link>
      </div>
      <div>
        <Route path={`${url}/login`} component={} />
      </div>
      </div>
      // </Router>
    )
  }
}
