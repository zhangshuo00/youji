import React, { Component } from 'react';
//import {HashRouter as Router,Route}from 'react-router-dom';
import './sign.css'


export default class App extends Component {
  render() {
    return (
      // <Router>
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
        <p className='sign-p2'>已有账户了，点击登陆</p>
      </div>
      // </Router>
    )
  }
}

