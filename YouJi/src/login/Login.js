import React, {Component} from 'react';
import {View, Text, Image, TextInput, AsyncStorage, TouchableOpacity,ImageBackground,ToastAndroid,StyleSheet} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
// import {myFetch} from '../utils'
export default class Login extends Component {
  //登陆页
    constructor(){
        super();
        this.state = {
            uemail:'',
            upassword:'',
            isloading:false
        }
    }
    emailhandle = (text)=>{
        this.setState({uemail:text})
    }
    pwdhandle = (text)=>{
        this.setState({upassword:text})
    }
    login = ()=>{
        this.setState({isloading:true})

        const post ={
          uemail:this.state.uemail,
          upassword:this.state.upassword
        }
        console.log(post);

        fetch('http://majia.hbsdduckhouse.club/login',{
          method:'POST',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
          // 返回数据格式：{msg: "success/pwdErr/notExist"}
          console.log(data);
          if(data.msg === 'success'){
            AsyncStorage.setItem('uid',data.uid)
                .then(()=>{
                    console.log(JSON.stringify(data.uid))
                    this.setState({isloading:false})
                    Actions.homePage();
                })
          }else if(data.msg === 'pwdError'){
            ToastAndroid.show('密码不正确',100)
            this.setState({isloading:false})
          }else{
            ToastAndroid.show('用户不存在',100)
            this.setState({isloading:false})
          }
        })
        // myFetch.post('/login',{
        //     email:this.state.email,
        //     pwd:this.state.pwd}
        // ).then(res=>{
        //     // 根据返回状态进行判断，正确时跳转首页
        //     // if(res){

        //     // }
        //     AsyncStorage.setItem('user',JSON.stringify(res.data))
        //         .then(()=>{
        //             console.log(JSON.stringify(res.data))
        //             this.setState({isloading:false})
        //             Actions.homePage();
        //         })
        // })
    } 
  render() {
    return (
      <ImageBackground 
      source={require("../images/back-login.jpg")} 
      style={{width: '100%', height: '100%'}}
  >
 
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
            <Image
            style={{marginBottom:'5%'}}
            source={require('../images/logo.png')}
          />
          <View
            style={styles.email}>

            <TextInput placeholder="Email" 
                onChangeText={this.emailhandle}
            />
          </View>
          <View
            style={styles.email}>

            <TextInput 
                onChangeText={this.pwdhandle}
                placeholder="密码" 
                secureTextEntry={true}
            />
          </View>

          <TouchableOpacity 
                style={{marginLeft:'-50%'}}
                onPress={()=>Actions.Test()}>
                <Text style={{fontSize:12}}>忘记密码?</Text>
          </TouchableOpacity>


            <TouchableOpacity 
                style={styles.loginp}
                onPress={this.login}>
                <Text>登录</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{

                    marginTop: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={()=>Actions.Sign()}>
                <Text>新用户？点击这里注册</Text>
            </TouchableOpacity>
        </View>
        {
            this.state.isloading
            ?<View><Text>正在登录。。。</Text></View>
            :null
        }
      </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  email:{
    width: '70%',
    height: '10%',
    marginLeft: '5%',
    lineHeight: 20,
    opacity: 0.5,
    borderRadius: 20,
    textAlign:'left',
    fontSize: 20,
    marginBottom: 10,
    borderColor: "blue",
    borderStyle: "solid",
    borderWidth: 1,
  },
  loginp:{
    width: '65%',
    height: '9%',       
    marginLeft: '5%',
    backgroundColor: '#ccc',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: "blue",
    borderStyle: "solid",
    borderWidth: 1,
}
  
});