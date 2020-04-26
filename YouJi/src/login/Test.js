import React, { Component } from 'react';
import { View, Text, Image, TextInput, AsyncStorage, TouchableOpacity, ImageBackground, ToastAndroid, response, StyleSheet } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { myFetch } from '../utils'
export default class Sign extends Component {
  //信息验证页
  constructor() {
    super();
    this.state = {
      uemail: '',//邮箱
      vcode: '',//验证码
      issigning: false,
      isding: true,
      number:60
    }
  }
  // componentDidMount(){
  // }

  userhandle = (text) => {
    this.setState({ uemail: text })
  }
  vcodehandle = (text) => {
    this.setState({ vcode: text })
  }
  // pwdhandle = (text)=>{
  //     this.setState({pwd:text})
  // } 
  vode = () => {
    this.setState({ isding: false })
    //this.setState((state)=>{ return { isding: false }})
    var num = 60;
      var timer = setInterval( () =>{
          
          num--;
            if (num <= 0) {
                clearInterval(timer);
                this.setState({ isding: true,number:num })
            }
            else {
              this.setState({ isding: false,number:num })
              // console.log(num);
            }
        }, 1000);
    const post = {
      uemail: this.state.uemail,
    }
    console.log(post);

    fetch('http://majia.hbsdduckhouse.club/getCode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(data => {
        // 返回数据格式：{msg: "success/pwdErr/notExist"}
        console.log(data);
        this.setState({ issigning: false })
        //this.setState({vcode:data.vcode})
      })

  }

  voded = () => {
  
    this.setState({ issigning: true })
    const post = {
      uemail: this.state.uemail,
      vcode: this.state.vcode
    }
    console.log(post);
    Actions.Password({ uemail: this.state.uemail });

    fetch('http://majia.hbsdduckhouse.club/verifyCode', {
      method: 'POST',// 发起post请求
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.msg === 'success') {

          console.log(JSON.stringify(data))
          this.setState({ issigning: false })
          Actions.Password({ uemail: this.state.uemail });
          // Actions.Password();
        } else if (data.msg === 'error') {
          ToastAndroid.show('验证码不正确', 100)
          this.setState({ issigning: false })
        }
      })
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

            {/* <View
            style={styles.email}>

            <TextInput 
                onChangeText={this.pwdhandle}
                placeholder="昵称" 
                secureTextEntry={true}
            />
          </View> */}

            <View
              style={styles.email}>

              <TextInput placeholder="Email"
                onChangeText={this.userhandle}
              />
            </View>



            <View
              style={styles.email2}>

              <TextInput placeholder="验证码"
                onChangeText={this.vcodehandle}
              />

            </View>
            {
              this.state.isding
                ? <TouchableOpacity
                  style={styles.signp2}
                  onPress={this.vode}>
                  <Text>获取验证码</Text>
                </TouchableOpacity>
                : <View
                  style={styles.signp1}
            ><Text>倒计时{this.state.number}</Text></View>
            }


            <TouchableOpacity
              style={styles.signp}
              onPress={this.voded}>
              <Text>验证</Text>
            </TouchableOpacity>


          </View>
          {
            this.state.issigning
              ? <View><Text>正在验证。。。</Text></View>
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
    opacity: 0.5,
    borderRadius: 20,
    textAlign: 'left',
    fontSize: 20,
    marginBottom: 10,
    borderColor: "green",
    borderStyle: "solid",
    borderWidth: 1,
  },
  email2: {
    width: '45%',
    height: '10%',
    marginLeft: '-20%',
    marginTop: '5%',
    lineHeight: 20,
    opacity: 0.5,
    borderRadius: 20,
    textAlign: 'left',
    fontSize: 20,
    marginBottom: 10,
    borderColor: "green",
    borderStyle: "solid",
    borderWidth: 1,
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
    borderColor: "green",
    borderStyle: "solid",
    borderWidth: 1,
  },
  signp2: {
    width: '20%',
    height: '9%',
    marginLeft: '50%',
    backgroundColor: '#ccc',
    marginTop: '-9%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: "green",
    borderStyle: "solid",
    borderWidth: 1,
  },
  signp1: {
    width: '20%',
    height: '9%',
    marginLeft: '50%',
    backgroundColor: '#8796a5',
    marginTop: '-9%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: "green",
    borderStyle: "solid",
    borderWidth: 1,
  }
});