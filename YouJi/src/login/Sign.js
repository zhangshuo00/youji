import React, { Component } from 'react';
import { View, Text, Image, TextInput, AsyncStorage, TouchableOpacity, ImageBackground, ToastAndroid, StyleSheet } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { regExp } from './RegExp'

export default class Sign extends Component {
  //注册页
  constructor() {
    super();
    this.state = {
      uname: '',
      upassword: '',
      uemail: '',
      issigning: false,
      CodeValidate: true,
      checking: true,
      registration_date: '',
    }
  }
  userhandle = (text) => {
    this.setState({ uname: text })
  }
  pwdhandle = (text) => {
    this.setState({ upassword: text })
  }
  emailhandle = (text) => {
    this.setState({ uemail: text })
  }
  checkUname = () => {
    if (regExp.Reg_Uname.test(this.state.uname)) {
      console.log('ok')
      

    }
    else {
      ToastAndroid.show('用户名不能超过7个汉字或14个字符', 100);
      this.setState({ checking: false })
    }
  }
  checkPassword = () => {
    if (regExp.Reg_PassWord.test(this.state.upassword)) {
      console.log('ok')
      

    }
    else {
      ToastAndroid.show('密码在8-14位', 100);
      this.setState({ checking: false })
    }
  }
  checkEmail = () => {
    if (regExp.Reg_email.test(this.state.uemail)) {
      console.log('ok')
      
    }
    else {
      ToastAndroid.show('邮箱格式不正确', 100);
      this.setState({ checking: false })
    }
  }
  sign = () => {
    if (this.state.checking == false) {
      ToastAndroid.show('输入不符合规范', 100);
    } else {
      this.setState({ issigning: true })

      let now = new Date();
      let year = now.getFullYear()
      let month = now.getMonth() + 1
      let day = now.getDate() + 1
      now = new Date(year + '/' + month + '/' + day)
      this.setState({ registration_date: now }, () => {
        let post = {
          uname: this.state.uname,
          uemail: this.state.uemail,
          upassword: this.state.upassword,
          registration_date: this.state.registration_date,
        }
        console.log(post);

        fetch('http://majia.hbsdduckhouse.club/sign', {
          method: 'POST',// 发起post请求
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(post)
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.setState({ issigning: false })
            Actions.login();
          })
      })
      console.log(now);


    }


    // myFetch.post('/sign',{
    //     username:this.state.username,
    //     pwd:this.state.pwd,
    //     email:this.state.email,
    //   }
    // ).then(res=>{
    //     AsyncStorage.setItem('usersign',JSON.stringify(res.data))
    //         .then(()=>{
    //             console.log(JSON.stringify(res.data))
    //             this.setState({issigning:false})
    //             Actions.login();
    //         })
    // })
  }
  render() {
    return (
      <ImageBackground
        source={require("../images/sign.jpg")}
        style={{ width: '100%', height: '100%' }}
      >

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View
            style={{ alignItems: 'center' }}>

            <View
              style={styles.email}>

              <TextInput
                onChangeText={this.userhandle}
                onBlur={this.checkUname}
                placeholder="昵称"
              />
            </View>

            <View
              style={styles.email}>

              <TextInput placeholder="Email"
                onChangeText={this.emailhandle}
                onBlur={this.checkEmail}
              />
            </View>
            <View
              style={styles.email}>

              <TextInput
                onChangeText={this.pwdhandle}
                onBlur={this.checkPassword}
                placeholder="密码"
                secureTextEntry={true}
              />
            </View>


            <TouchableOpacity
              style={styles.signp}
              onPress={this.sign}>
              <Text style={{ color: 'white', fontSize: 20 }}>注册</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{

                marginTop: 100,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => Actions.login()}>
              <Text>已有账户，点击登陆</Text>
            </TouchableOpacity>
          </View>
          {
            this.state.issigning
              ? <View><Text>正在注册。。。</Text></View>
              : null
          }
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  email: {
    width: '70%',
    height: '10%',
    marginLeft: '5%',
    marginTop: '5%',
    lineHeight: 20,
    opacity: 0.8,
    borderRadius: 20,
    textAlign: 'left',
    fontSize: 20,
    marginBottom: 10,
    borderColor: "blue",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: 'white'
  },
  signp: {
    width: '65%',
    height: '9%',
    marginLeft: '5%',
    backgroundColor: '#ccc',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 1,
    backgroundColor: 'blue',
    opacity: 0.6
  }

});